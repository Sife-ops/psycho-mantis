import * as click from "@psycho-mantis/lib/db/click";
import * as db_ from "@psycho-mantis/lib/db";
import { APIGatewayProxyEventV2, Context } from "aws-lambda";
import { Config } from "@serverless-stack/node/config";
import { ExecutionContext } from "graphql-helix";
import { JwtPayload, verify } from "jsonwebtoken";
import { LobbyCollection } from "@psycho-mantis/lib/db/lobby";
import { UserEntityType } from "@psycho-mantis/lib/db/user/user";

interface Request {
  event: APIGatewayProxyEventV2;
  context: Context;
  execution: ExecutionContext;
}

interface Payload extends JwtPayload {
  userId: string;
  lobbyId: string;
}

export class Ctx {
  db = db_;
  game;
  jwtPayload;
  lobbyCollection;
  request;
  users;

  private constructor(c: {
    game?: Game;
    lobbyCollection: LobbyCollection;
    request: Request;
    users: UserEntityType[];
    jwtPayload: Payload;
  }) {
    this.game = c.game;
    this.jwtPayload = c.jwtPayload;
    this.lobbyCollection = c.lobbyCollection;
    this.request = c.request;
    this.users = c.users;
  }

  static async init(c: { request: Request }) {
    const token = c.request.event.headers.authorization; // todo: if not defined
    if (!token) throw new Error("missing token");

    let jwtPayload: Payload;
    try {
      jwtPayload = verify(token, Config.WEB_TOKEN_SECRET) as Payload;
    } catch (e) {
      console.log(e);
      throw new Error("failed to verify token");
    }

    const lobbyCollection = await db_.lobby.model.collections
      .lobby({ lobbyId: jwtPayload.lobbyId })
      .go()
      .then((e) => e.data);
    if (!lobbyCollection) throw new Error("missing lobbyCollection");

    const users = await Promise.all(
      lobbyCollection.PlayerEntity.map((player) =>
        db_.user.model.entities.UserEntity.get({
          userId: player.userId,
        })
          .go()
          .then((res) => res.data)
          .then((data) => data!)
      )
    );

    const { gameTitle } = lobbyCollection.LobbyEntity[0];
    let game: Game | undefined;
    if (gameTitle) {
      game = await Game.init({ gameTitle, lobbyId: jwtPayload.lobbyId });
    }

    return new Ctx({
      game,
      jwtPayload,
      lobbyCollection,
      request: c.request,
      users,
    });
  }

  getLobby() {
    return this.lobbyCollection.LobbyEntity[0];
  }

  getLobbyPlayers() {
    return this.lobbyCollection.PlayerEntity;
  }

  getViewer(): UserEntityType {
    return this.users.find((e) => e.userId === this.jwtPayload.userId)!;
  }

  getGm(): UserEntityType {
    return this.users.find((e) => e.userId === this.getLobby().userId)!;
  }

  isViewerGm(): boolean {
    return this.getViewer().userId === this.getGm().userId;
  }

  getGame() {
    if (!this.game) throw new Error("missing game");
    return this.game;
  }
}

class Game {
  clickCollection;

  private constructor(c: {
    //
    clickCollection?: click.GameCollection;
  }) {
    this.clickCollection = c.clickCollection;
  }

  static async init(c: { gameTitle: string; lobbyId: string }) {
    switch (c.gameTitle) {
      case "Click": {
        const clickCollection = await db_.click.model.collections
          .lobby({ lobbyId: c.lobbyId })
          .go()
          .then((e) => e.data);
        return new Game({ clickCollection });
      }

      default: {
        throw new Error("no such gameTitle");
      }
    }
  }

  getClickCollection() {
    if (!this.clickCollection) throw new Error("game not found");
    return this.clickCollection;
  }
}

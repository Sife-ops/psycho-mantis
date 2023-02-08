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
  lobbyCollection;
  request;
  user;

  private constructor(c: {
    game?: Game;
    lobbyCollection: LobbyCollection;
    request: Request;
    user: UserEntityType;
  }) {
    this.game = c.game;
    this.lobbyCollection = c.lobbyCollection;
    this.request = c.request;
    this.user = c.user;
  }

  static async init(c: { request: Request }) {
    const token = c.request.event.headers.authorization; // todo: if not defined
    if (!token) throw new Error("missing token");

    let lobbyId: string, userId: string;
    try {
      ({ lobbyId, userId } = verify(token, Config.WEB_TOKEN_SECRET) as Payload);
    } catch (e) {
      console.log(e);
      throw new Error("failed to verify token");
    }

    const [user, lobbyCollection] = await Promise.all([
      db_.user.model.entities.UserEntity.get({ userId })
        .go()
        .then((e) => e.data),
      db_.lobby.model.collections
        .lobby({ lobbyId })
        .go()
        .then((e) => e.data),
    ]);
    if (!user) throw new Error("missing user");
    if (!lobbyCollection) throw new Error("missing lobbyCollection");

    const { gameTitle } = lobbyCollection.LobbyEntity[0];
    let game: Game | undefined;
    if (gameTitle) {
      game = await Game.init({ gameTitle, gameId: lobbyId });
    }

    return new Ctx({
      game,
      lobbyCollection,
      request: c.request,
      user,
    });
  }

  getLobby() {
    return this.lobbyCollection.LobbyEntity[0];
  }

  getLobbyPlayers() {
    return this.lobbyCollection.PlayerEntity;
  }

  isGm() {
    return this.getLobby().userId === this.user.userId;
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

  static async init(c: { gameTitle: string; gameId: string }) {
    switch (c.gameTitle) {
      case "Click": {
        const clickCollection = await db_.click.model.collections
          .game({ gameId: c.gameId })
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

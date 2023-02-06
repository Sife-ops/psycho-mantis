import * as db_ from "@psycho-mantis/lib/model";
import { APIGatewayProxyEventV2, Context } from "aws-lambda";
import { Config } from "@serverless-stack/node/config";
import { ExecutionContext } from "graphql-helix";
import { GameCollection } from "@psycho-mantis/lib/model/lobby";
import { JwtPayload, verify } from "jsonwebtoken";

interface User {
  userId: string;
  username: string;
  discriminator: string;
  avatar: string;
}

interface Request {
  event: APIGatewayProxyEventV2;
  context: Context;
  execution: ExecutionContext;
}

interface Payload extends JwtPayload {
  userId: string;
  gameId: string;
}

export class Ctx {
  db = db_;
  request;
  user;
  lobby;

  private constructor(c: {
    user: User;
    lobby: GameCollection;
    request: Request;
  }) {
    this.request = c.request;
    this.user = c.user;
    this.lobby = c.lobby;
  }

  static async init(c: { request: Request }) {
    const token = c.request.event.headers.authorization; // todo: if not defined
    const { gameId, userId } = verify(
      token!,
      Config.WEB_TOKEN_SECRET
    ) as Payload;

    const user = await db_.user.model.entities.UserEntity.get({ userId })
      .go()
      .then((e) => e.data);
    if (!user) throw new Error("missing user");

    const lobby = await db_.lobby.model.collections
      .game({ gameId })
      .go()
      .then((e) => e.data);

    return new Ctx({
      request: c.request,
      user,
      lobby,
    });
  }
}

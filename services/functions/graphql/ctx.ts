import * as db_ from "@psycho-mantis/lib/db";
import { APIGatewayProxyEventV2, Context } from "aws-lambda";
import { Config } from "@serverless-stack/node/config";
import { ExecutionContext } from "graphql-helix";
import { LobbyCollection } from "@psycho-mantis/lib/db/lobby";
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
  lobbyId: string;
}

export class Ctx {
  db = db_;
  lobbyCollection;
  request;
  user;

  private constructor(c: {
    lobbyCollection: LobbyCollection;
    request: Request;
    user: User;
  }) {
    this.lobbyCollection = c.lobbyCollection;
    this.request = c.request;
    this.user = c.user;
  }

  static async init(c: { request: Request }) {
    const token = c.request.event.headers.authorization; // todo: if not defined
    if (!token) throw new Error("missing token");

    const { lobbyId, userId } = verify(
      token,
      Config.WEB_TOKEN_SECRET
    ) as Payload;

    const user = await db_.user.model.entities.UserEntity.get({ userId })
      .go()
      .then((e) => e.data);
    if (!user) throw new Error("missing user");

    const lobbyCollection = await db_.lobby.model.collections
      .lobby({ lobbyId })
      .go()
      .then((e) => e.data);

    return new Ctx({
      lobbyCollection,
      request: c.request,
      user,
    });
  }
}

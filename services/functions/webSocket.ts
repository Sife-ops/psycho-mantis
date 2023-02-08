import { APIGatewayProxyHandler, APIGatewayProxyHandlerV2 } from "aws-lambda";
import * as db from "@psycho-mantis/lib/db";

const fn = (s: string) => {
  return {
    statusCode: 200,
    headers: { "Content-Type": "text/plain" },
    body: s,
  };
};

export const connect: APIGatewayProxyHandlerV2 = async (event) => {
  console.log("connect");
  return fn("connected");
};

export const disconnect: APIGatewayProxyHandler = async (event) => {
  console.log("disconnect");

  await db.lobby.model.entities.ConnectionEntity.delete({
    connectionId: event.requestContext.connectionId!,
  }).go();

  return fn("disconnected");
};

export const default_: APIGatewayProxyHandler = async (event) => {
  console.log("default");

  const parsedBody = JSON.parse(event.body!);
  switch (parsedBody.action) {
    case "save-connection": {
      // todo: delete current connection?
      await db.lobby.model.entities.ConnectionEntity.create({
        connectionId: event.requestContext.connectionId!,
        lobbyId: parsedBody.data.lobbyId,
      }).go();

      return fn("connection saved");
    }

    case "ping": {
      return fn("pong");
    }

    default: {
      return { statusCode: 404, body: "unknown action" };
    }
  }
};

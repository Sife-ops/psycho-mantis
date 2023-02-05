import AWS from "aws-sdk";
import * as commands from "./commands";
import nacl from "tweetnacl";
import { Config } from "@serverless-stack/node/config";
import { Ctx } from "./ctx";
import { runner } from "@psycho-mantis/bot/runner";
import { messageResponse } from "./common";

import {
  APIGatewayProxyEventV2,
  APIGatewayProxyResultV2,
  Handler,
} from "aws-lambda";
import { Queue } from "@serverless-stack/node/queue";
import fetch from "node-fetch";

const sqs = new AWS.SQS();

export const api: Handler<
  APIGatewayProxyEventV2,
  APIGatewayProxyResultV2<any>
> = async (event) => {
  try {
    const body = JSON.parse(event.body!);

    switch (body.type) {
      case 1: {
        const verified = nacl.sign.detached.verify(
          Buffer.from(event.headers["x-signature-timestamp"]! + event.body),
          Buffer.from(event.headers["x-signature-ed25519"]!, "hex"),
          Buffer.from(Config.BOT_PUBLIC_KEY, "hex")
        );

        if (!verified) {
          throw new Error("verification failed");
        } else {
          return {
            statusCode: 200,
            body: event.body,
          };
        }
      }

      case 2: {
        // const ctx = await Ctx.init({ interactionBody: body });
        // await Promise.all(ctx.onboardUsers());
        // const commandName = ctx.getCommandName(0);

        // if (!["game", "foo"].includes(commandName)) {
        //   try {
        //     const { started, playerIndex } = ctx.getGame();
        //     if (!started) throw new Error("game not started");
        //     if (ctx.getPlayer().playerIndex !== playerIndex) {
        //       throw new Error("not your turn");
        //     }
        //     if (ctx.getRound() < 2 && !["place", "end"].includes(commandName)) {
        //       throw new Error("not allowed");
        //     }
        //   } catch (e: any) {
        //     return genericResponse(e.message);
        //   }
        // }

        // const result = await runner(commands, commandName, ctx);
        // if (result.mutations) {
        //   await Promise.all(result.mutations);
        // }
        // return result.response;

        await sqs
          .sendMessage({
            QueueUrl: Queue.botQueue.queueUrl,
            MessageBody: JSON.stringify({
              interactionBody: body,
              // interactionResult: message,
            }),
          })
          .promise();

        // return messageResponse({ content: "bar" });
        return {
          type: 5,
        };
      }

      default: {
        throw new Error("unknown request type");
      }
    }
  } catch (e) {
    console.log(e);
    return {
      statusCode: 401,
    };
  }
};

export const consumer = async (event: any) => {
  try {
    // console.log(event.Records[0].body);
    const messageBody = JSON.parse(event.Records[0].body);
    const { application_id, token } = messageBody.interactionBody;
    console.log(application_id, token);

    const a = await fetch(
      `https://discord.com/api/v10/webhooks/${application_id}/${token}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bot ${Config.BOT_TOKEN}`,
        },
        body: JSON.stringify({
          content: "yeah",
        }),
      }
    );

    console.log(JSON.stringify(a.json()));

    // const ctx = await Ctx.init(messageBody);
    // const result = await runner(commands, ctx.getCommandName(0), ctx);
    // await Promise.all([...(result ? result.mutations : [])]);
    // await Promise.all(ctx.allMessages({ action: "update" }));
  } catch (e) {
    console.log(e);
    return;
  }
};

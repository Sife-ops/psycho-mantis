import * as commands from "./commands";
import nacl from "tweetnacl";
import { Config } from "@serverless-stack/node/config";
import { Ctx } from "./ctx";
import { Queue } from "@serverless-stack/node/queue";
import { runner } from "@psycho-mantis/bot/runner";
import { sqs } from "./common";

import {
  APIGatewayProxyEventV2,
  APIGatewayProxyResultV2,
  Handler,
} from "aws-lambda";

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
        await sqs
          .sendMessage({
            QueueUrl: Queue.botQueue.queueUrl,
            MessageBody: JSON.stringify({
              interactionBody: body,
            }),
          })
          .promise();

        // todo: ephemeral depending on command
        // const a = new Options({ interactionBody: body });

        return {
          type: 5,
          data: {
            flags: 64,
          },
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
  const messageBody = JSON.parse(event.Records[0].body);
  const ctx = await Ctx.init(messageBody);

  try {
    await Promise.all(ctx.onboardUsers());

    const { response, mutations } = await runner(
      commands,
      ctx.options.getCommandName(0),
      ctx
    );

    await Promise.all([
      ...(mutations ? mutations : []),
      ...(response ? [ctx.followUp(response)] : []),
    ]);
  } catch (e) {
    console.log(e);
    await ctx.followUp({
      content: "todo: sorry",
    });
  }
};

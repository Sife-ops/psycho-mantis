import * as db from "@psycho-mantis/lib/db";
import AWS from "aws-sdk";
import fetch, { RequestInit, Response } from "node-fetch";
import { Config } from "@serverless-stack/node/config";
import { UserEntityType } from "@psycho-mantis/lib/db/user/user";
import { WebSocketApi } from "@serverless-stack/node/api";
import { z } from "zod";

/*
 * aws
 */

export const sqs = new AWS.SQS();
export const wsApi = new AWS.ApiGatewayManagementApi({
  endpoint: WebSocketApi.webSocketApi.url.split("wss://")[1],
});

/*
 * schema
 */

export const optionSchema = z.object({
  name: z.string(),
  type: z.number(),
  value: z.union([z.string(), z.number()]).optional(),
  options: z.array(z.any()).optional(),
});
export type OptionSchema = z.infer<typeof optionSchema>;

/*
 * functions
 */

const apiUrl = "https://discord.com/api/v10"; // todo: move to constants

export const fetchDiscord = async (
  e: string,
  i: RequestInit
): Promise<Response> => {
  // todo: zod
  return fetch(`${apiUrl}${e}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bot ${Config.BOT_TOKEN}`,
    },
    ...i,
    body: JSON.stringify(i.body),
  });
};

export const onboardUser = async (user: UserEntityType & { id: string }) => {
  return db.user.model.entities.UserEntity.get({ userId: user.id })
    .go()
    .then((e) => e.data)
    .then(async (u) => {
      if (!u) {
        await db.user.model.entities.UserEntity.create({
          userId: user.id,
          username: user.username,
          discriminator: user.discriminator,
          avatar: user.avatar || "",
        }).go();
        return;
      }

      if (
        u.avatar !== user.avatar ||
        u.discriminator !== user.discriminator ||
        u.username !== user.username
      ) {
        await db.user.model.entities.UserEntity.update({
          userId: u.userId,
        })
          .set({
            username: user.username,
            discriminator: user.discriminator,
            avatar: user.avatar,
          })
          .go();
      }
    });
};

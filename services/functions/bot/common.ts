// import { model } from "@bombadil/core/model";
import AWS from "aws-sdk";
import { UserEntityType } from "@psycho-mantis/lib/model/user/user";
import { z } from "zod";
import * as db from "@psycho-mantis/lib/model";
import fetch, { RequestInit } from "node-fetch";
import { Config } from "@serverless-stack/node/config";

/*
 * aws
 */

export const sqs = new AWS.SQS();

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

export const fetchDiscord = async <T = any>(
  e: string,
  i: RequestInit
): Promise<T> => {
  // todo: zod
  return fetch(`${apiUrl}${e}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bot ${Config.BOT_TOKEN}`,
    },
    ...i,
    body: JSON.stringify(i.body),
  }).then((e) => e.json() as T);
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

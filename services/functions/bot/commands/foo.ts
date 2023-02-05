import fetch from "node-fetch";
import { Command } from "../runner";
import { Config } from "@serverless-stack/node/config";
import { messageResponse } from "@psycho-mantis/bot/common";

export const foo: Command = {
  handler: async () => {
    return {
      // response: messageResponse({ content: "bar", }),
      response: { type: 1 },
    };
  },
};

// todo: consumer process
export const foo_: Command = {
  handler: async (ctx) => {
    const channelId = ctx.getChannelId();
    const userId = ctx.getUserId();

    const data = await fn<{ id: string }>(`/channels/${channelId}/threads`, {
      name: "lobby",
    });

    await fn(`/channels/${data.id}/messages`, {
      content: `<@${userId}> created a lobby`,
    });

    return {
      response: messageResponse({
        flags: 64,
        content: `new lobby <#${data.id}>`,
      }),
    };
  },
};

const apiUrl = "https://discord.com/api/v10"; // todo: move to constants

// todo: move to common
const fn = async <T>(e: string, o: Record<string, any>): Promise<T> => {
  // todo: zod
  return fetch(`${apiUrl}${e}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bot ${Config.BOT_TOKEN}`,
    },
    body: JSON.stringify(o),
  }).then((e) => e.json() as T);
};

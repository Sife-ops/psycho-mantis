import fetch from "node-fetch";
import { Command } from "../runner";
import { Config } from "@serverless-stack/node/config";
import { genericResponse } from "@psycho-mantis/bot/common";

export const foo: Command = {
  handler: async (ctx) => {
    const channelId = ctx.getChannelId();
    console.log(channelId);

    const response = await fetch(
      `https://discord.com/api/v10/channels/${channelId}/threads`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bot ${Config.BOT_TOKEN}`,
        },
        body: JSON.stringify({
          name: "reeeeeeeEEeeeE",
        }),
      }
    );
    const data = await response.json();
    console.log(JSON.stringify(data));

    return {
      response: genericResponse("bar"),
    };
  },
};

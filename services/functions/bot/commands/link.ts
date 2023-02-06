import { Config } from "@serverless-stack/node/config";
import { StaticSite } from "@serverless-stack/node/site";
import { sign } from "jsonwebtoken";
import { Command } from "../runner";

export const link: Command = {
  handler: async (ctx) => {
    if (!ctx.hasLobby()) {
      return {
        response: {
          content: "lobby not found",
        },
      };
    }

    const token = sign(
      { userId: ctx.getUserId(), lobbyId: ctx.getLobby().lobbyId },
      Config.WEB_TOKEN_SECRET
    );

    const baseUrl = Config.STAGE.includes("local")
      ? "http://localhost:3000"
      : StaticSite.site.url;

    return {
      response: {
        embeds: [
          {
            title: "Lobby URL",
            description: `don't share links`,
            url: `${baseUrl}/game?jwt=${token}`,
            // color: 0xff0000,
          },
        ],
      },
    };
  },
};

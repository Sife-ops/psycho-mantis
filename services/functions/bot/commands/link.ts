import { Command } from "../runner";

export const link: Command = {
  handler: async (ctx) => {
    if (!ctx.hasGame()) {
      return {
        response: {
          content: "game not found",
        },
      };
    }

    return {
      response: {
        embeds: [
          {
            title: "Lobby URL",
            description: `don't share links`,
            // url: `${url}/user/${prognosticatorId}`,
            url: "https://amazon.com",
            // color: 0xff0000,
          },
        ],
      },
    };
  },
};

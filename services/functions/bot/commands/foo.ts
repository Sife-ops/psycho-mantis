import { Command } from "../runner";

export const foo: Command = {
  handler: async (ctx) => {
    return {
      mutations: [
        ctx.followUp({
          content: "bar",
        }),
      ],
    };
  },
};

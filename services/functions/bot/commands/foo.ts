import { Command } from "../runner";

export const foo: Command = {
  handler: async () => {
    return {
      response: {
        content: "bar",
      },
    };
  },
};

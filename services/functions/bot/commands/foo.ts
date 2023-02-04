import { Command } from "../runner";
import { genericResponse } from "@psycho-mantis/bot/common";

export const foo: Command = {
  handler: async () => {
    return {
      response: genericResponse("bar"),
    };
  },
};

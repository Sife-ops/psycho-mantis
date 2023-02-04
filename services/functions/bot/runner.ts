import { Ctx } from "./ctx";
import { z } from "zod";

type CommandResult = {
  mutations?: Array<Promise<any>>;
  response: Record<string, any>;
};

export type CommandHandler = (ctx: Ctx) => Promise<CommandResult>;

export interface Command {
  schema?: z.AnyZodObject;
  handler: CommandHandler;
}

export const runner = (
  commands: Record<string, Command>,
  commandName: string,
  ctx: Ctx
): Promise<CommandResult> => {
  const command = commands[commandName];

  if (command.schema) {
    command.schema.parse(ctx.interactionBody);
  }

  return command.handler(ctx);
};

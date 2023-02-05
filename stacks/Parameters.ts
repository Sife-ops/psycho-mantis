import { StackContext, Config } from "@serverless-stack/resources";

export function Parameters({ stack }: StackContext) {
  const botPublicKey = new Config.Secret(stack, "BOT_PUBLIC_KEY");
  const botToken = new Config.Secret(stack, "BOT_TOKEN");

  return {
    botPublicKey,
    botToken,
  };
}

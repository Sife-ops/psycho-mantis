import { Database } from "./Database";

import {
  use,
  StackContext,
  Api as ApiGateway,
  Config,
} from "@serverless-stack/resources";

export function Api({ stack }: StackContext) {
  const db = use(Database);
  const botPublicKey = new Config.Secret(stack, "BOT_PUBLIC_KEY");
  const botToken = new Config.Secret(stack, "BOT_TOKEN");

  const api = new ApiGateway(stack, "api", {
    defaults: {
      function: {
        bind: [db.lobbyTable, db.userTable, botPublicKey, botToken],
      },
    },
    routes: {
      "POST /graphql": {
        type: "graphql",
        function: {
          handler: "functions/graphql/graphql.handler",
        },
        pothos: {
          schema: "services/functions/graphql/schema.ts",
          output: "graphql/schema.graphql",
          commands: [
            "npx genql --output ./graphql/genql --schema ./graphql/schema.graphql --esm",
          ],
        },
      },
    },
  });

  stack.addOutputs({
    API: api.url,
  });

  return {
    api,
    botToken
  }
}

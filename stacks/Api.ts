import { Parameters } from "./Parameters";
import { Database } from "./Database";

import {
  use,
  StackContext,
  Api as ApiGateway,
  Config,
} from "@serverless-stack/resources";

export function Api({ stack }: StackContext) {
  const db = use(Database);
  const param = use(Parameters);

  const api = new ApiGateway(stack, "api", {
    defaults: {
      function: {
        bind: [db.lobbyTable, db.userTable, param.botPublicKey, param.botToken],
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

  return api;
}

import { Parameters } from "./Parameters";
import { Database } from "./Database";

import {
  use,
  StackContext,
  Api as ApiGateway,
  WebSocketApi,
} from "@serverless-stack/resources";

export function Api({ stack }: StackContext) {
  const db = use(Database);
  const param = use(Parameters);

  const webSocketApi = new WebSocketApi(stack, "webSocketApi", {
    defaults: {
      function: {
        bind: [db.roomTable, db.userTable, db.clickTable],
      },
    },
    routes: {
      $connect: "functions/webSocket.connect",
      $disconnect: "functions/webSocket.disconnect",
      $default: "functions/webSocket.default_",
    },
  });

  const api = new ApiGateway(stack, "api", {
    defaults: {
      function: {
        bind: [
          db.clickTable,
          db.roomTable,
          db.userTable,
          param.botPublicKey,
          param.botToken,
          param.webTokenSecret,
          webSocketApi,
        ],
        permissions: ["execute-api"],
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
    WS_API: webSocketApi.url,
  });

  return {
    api,
    webSocketApi,
  };
}

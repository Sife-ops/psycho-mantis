import {
  use,
  StackContext,
  StaticSite,
  Queue,
} from "@serverless-stack/resources";

import { Api } from "./Api";
import { Database } from "./Database";

export function Web({ stack }: StackContext) {
  const api = use(Api);
  const db = use(Database);

  // const site = new StaticSite(stack, "site", {
  //   path: "web",
  //   buildCommand: "npm run build",
  //   buildOutput: "dist",
  //   environment: {
  //     VITE_GRAPHQL_URL: api.url + "/graphql",
  //   },
  // });

  const botQueue = new Queue(stack, "botQueue", {
    consumer: {
      function: {
        bind: [db.lobbyTable, db.userTable, api.botToken],
        // environment: { HANDLER_TYPE: "consumer" },
        // permissions: ["execute-api"],
        handler: "functions/bot/main.consumer",
      },
    },
  });

  api.api.addRoutes(stack, {
    "POST /bot": {
      function: {
        // bind: [site],
        bind: [botQueue],
        // environment: { HANDLER_TYPE: "api" },
        handler: "functions/bot/main.api",
      },
    },
  });

  stack.addOutputs({
    // SITE: site.url,
    QUEUE: botQueue.queueUrl,
  });
}

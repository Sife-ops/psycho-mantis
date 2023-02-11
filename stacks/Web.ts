import { Api } from "./Api";
import { Database } from "./Database";
import { Parameters } from "./Parameters";

import {
  use,
  StackContext,
  StaticSite,
  Function,
} from "@serverless-stack/resources";

export function Web({ stack }: StackContext) {
  const api = use(Api);
  const db = use(Database);
  const param = use(Parameters);

  const site = new StaticSite(stack, "site", {
    path: "web",
    buildCommand: "npm run build",
    buildOutput: "dist",
    environment: {
      VITE_API_URL: api.api.url,
      VITE_WS_API_URL: api.webSocketApi.url,
    },
  });

  const botLambda = new Function(stack, "botLambda", {
    bind: [
      api.webSocketApi,
      db.clickTable,
      db.lobbyTable,
      db.userTable,
      param.botToken,
      param.webTokenSecret,
      site,
    ],
    permissions: ["execute-api"],
    handler: "functions/bot/main.consumer",
  });

  api.api.addRoutes(stack, {
    "POST /bot": {
      function: {
        bind: [botLambda],
        handler: "functions/bot/main.api",
      },
    },
  });

  stack.addOutputs({
    SITE: site.url,
    FUNCTION: botLambda.functionName,
  });
}

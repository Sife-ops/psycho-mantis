import { use, StackContext, StaticSite } from "@serverless-stack/resources";
import { Api } from "./Api";

export function Web({ stack }: StackContext) {
  const api = use(Api);

  // const site = new StaticSite(stack, "site", {
  //   path: "web",
  //   buildCommand: "npm run build",
  //   buildOutput: "dist",
  //   environment: {
  //     VITE_GRAPHQL_URL: api.url + "/graphql",
  //   },
  // });

  api.addRoutes(stack, {
    "POST /bot": {
      function: {
        // bind: [site],
        handler: "functions/bot/main.bot",
      },
    },
  });

  // stack.addOutputs({
  //   SITE: site.url,
  // });

}

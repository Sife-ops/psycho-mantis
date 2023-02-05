import { App } from "@serverless-stack/resources";
import { Web } from "./Web";
import { Database } from "./Database";
import { Api } from "./Api";
import { Parameters } from "./Parameters";

export default function main(app: App) {
  app.setDefaultFunctionProps({
    runtime: "nodejs16.x",
    srcPath: "services",
    bundle: {
      format: "esm",
    },
  });
  app
    .stack(Parameters)
    .stack(Database)
    .stack(Api)
    .stack(Web);
}

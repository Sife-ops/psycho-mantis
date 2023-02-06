import { Ctx } from "./ctx";
import { GraphQLHandler } from "@serverless-stack/node/graphql";
import { schema } from "./schema";

export const handler = GraphQLHandler({
  schema,
  context: async (request) => {
    return await Ctx.init({ request });
  },
});

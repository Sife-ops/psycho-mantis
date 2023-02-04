import { schema } from "./schema";
import { GraphQLHandler } from "@serverless-stack/node/graphql";
import { lobby, user } from "@psycho-mantis/lib/model";

export const handler = GraphQLHandler({
  schema,
  context: async (req) => {
    return {
      ...req,
      model: {
        lobby: lobby.model,
        user: user.model,
      },
    };
  },
});

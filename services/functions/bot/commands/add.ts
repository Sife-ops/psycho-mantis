import { fetchDiscord } from "../common";
import { Command } from "../runner";

export const add: Command = {
  handler: async (ctx) => {
    const userId = ctx.options.getOptionValue("player") as string;

    if (ctx.getPlayers().find((p) => p.userId === userId)) {
      return {
        response: {
          content: "player already added",
        },
      };
    }

    const { application_id, token } = ctx.interactionBody;

    return {
      mutations: [
        ctx.db.lobby.model.entities.PlayerEntity.create({
          gameId: ctx.getGame().gameId,
          userId,
        }).go(),

        fetchDiscord(
          `/webhooks/${application_id}/${token}/messages/@original`,
          { method: "DELETE" }
        ),

        fetchDiscord(`/channels/${ctx.getChannelId()}/messages`, {
          body: {
            content: `<@${userId}> added to lobby`,
          },
        }),
      ],
    };
  },
};

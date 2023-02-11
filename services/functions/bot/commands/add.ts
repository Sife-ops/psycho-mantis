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

    await ctx.db.room.model.entities.PlayerEntity.create({
      roomId: ctx.getRoom().roomId,
      userId,
    }).go();

    return {
      mutations: [
        ...ctx.allMessages({ action: "update-room" }),

        fetchDiscord(
          `/webhooks/${application_id}/${token}/messages/@original`,
          { method: "DELETE" }
        ),

        fetchDiscord(`/channels/${ctx.getChannelId()}/messages`, {
          body: {
            content: `<@${userId}> added to room`,
          },
        }),
      ],
    };
  },
};

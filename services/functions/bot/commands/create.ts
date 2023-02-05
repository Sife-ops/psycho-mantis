import { Command } from "../runner";
import { fetchDiscord } from "@psycho-mantis/bot/common";

export const create: Command = {
  handler: async (ctx) => {
    const channelId = ctx.getChannelId();
    const userId = ctx.getUserId();
    const name = ctx.options.getOptionValue("name");

    const thread = await fetchDiscord(`/channels/${channelId}/threads`, {
      body: { name },
    }).then(async (res) => (await res.json()) as { id: string });

    await fetchDiscord(`/channels/${thread.id}/messages`, {
      body: {
        content: `<@${userId}> created the lobby. Message \`/link\` for URL.`,
      },
    });

    return {
      response: {
        content: `<#${thread.id}> has been created`,
      },
      mutations: [
        ctx.db.lobby.model.entities.GameEntity.create({
          channelId: thread.id,
          userId,
        })
          .go()
          .then((e) => e.data)
          .then(({ gameId }) =>
            ctx.db.lobby.model.entities.PlayerEntity.create({
              gameId,
              userId,
            }).go()
          ),
      ],
    };
  },
};

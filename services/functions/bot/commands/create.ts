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
      mutations: [
        ctx.db.lobby.model.entities.LobbyEntity.create({
          channelId: thread.id,
          userId,
        })
          .go()
          .then((e) => e.data)
          .then(({ lobbyId }) =>
            ctx.db.lobby.model.entities.PlayerEntity.create({
              lobbyId,
              userId,
            }).go()
          ),
        ctx.followUp({
          content: `<#${thread.id}> has been created`,
        }),
      ],
    };
  },
};

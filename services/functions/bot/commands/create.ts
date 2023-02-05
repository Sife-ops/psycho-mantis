import { Command } from "../runner";
import { fetchDiscord } from "@psycho-mantis/bot/common";

export const create: Command = {
  handler: async (ctx) => {
    const channelId = ctx.getChannelId();
    const userId = ctx.getUserId();

    const thread = await fetchDiscord<{ id: string }>(
      `/channels/${channelId}/threads`,
      {
        body: {
          // todo: custom lobby name
          name: "Psycho Mantis",
        },
      }
    );

    await fetchDiscord(`/channels/${thread.id}/messages`, {
      body: {
        content: `<@${userId}> created the lobby`,
      },
    });

    return {
      response: {
        content: `<#${thread.id}> has been created`,
      },
      mutations: [
        ctx.db.lobby.model.entities.GameEntity.create({
          channelId,
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

import { Command } from "../runner";
import { fetchDiscord } from "@psycho-mantis/bot/common";

export const create: Command = {
  handler: async (ctx) => {
    const channelId = ctx.getChannelId();
    const userId = ctx.getUserId();

    const data = await fetchDiscord<{ id: string }>(
      `/channels/${channelId}/threads`,
      {
        body: {
          name: "Psycho Mantis",
        },
      }
    );

    return {
      response: {
        content: `new lobby <#${data.id}>`,
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

        fetchDiscord(`/channels/${data.id}/messages`, {
          body: {
            content: `<@${userId}> created a lobby`,
          },
        }),
      ],
    };
  },
};

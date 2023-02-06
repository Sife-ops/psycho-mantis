import { builder } from "../builder";
import { GameEntityType } from "@psycho-mantis/lib/db/lobby/entities/game";
import { LobbyPlayerType } from "./lobby-player";

export const LobbyType = builder.objectRef<GameEntityType>("Lobby");
LobbyType.implement({
  fields: (t) => ({
    userId: t.exposeID("userId"),
    channelId: t.exposeString("channelId"),
    gameId: t.exposeString("gameId"),

    players: t.field({
      type: [LobbyPlayerType],
      resolve: async (p, _, ctx) => {
        return await ctx.model.lobby.entities.PlayerEntity.query
          .game_({ gameId: p.gameId })
          .go()
          .then((e) => e.data);
      },
    }),
  }),
});

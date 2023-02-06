import { builder } from "../builder";
import { LobbyEntityType } from "@psycho-mantis/lib/db/lobby/entities/lobby";
import { LobbyPlayerType } from "./lobby-player";

export const LobbyType = builder.objectRef<LobbyEntityType>("Lobby");
LobbyType.implement({
  fields: (t) => ({
    userId: t.exposeID("userId"),
    channelId: t.exposeString("channelId"),
    lobbyId: t.exposeString("lobbyId"),

    players: t.field({
      type: [LobbyPlayerType],
      resolve: async (p, _, ctx) => {
        return await ctx.db.lobby.model.entities.PlayerEntity.query
          .lobby_({ lobbyId: p.lobbyId })
          .go()
          .then((e) => e.data);
      },
    }),
  }),
});

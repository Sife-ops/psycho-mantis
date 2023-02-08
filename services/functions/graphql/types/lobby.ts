import { builder } from "../builder";
import { LobbyEntityType } from "@psycho-mantis/lib/db/lobby/entities/lobby";
import { LobbyPlayerType } from "./lobby-player";
import { UserType } from "./user";

export const LobbyType = builder.objectRef<LobbyEntityType>("Lobby");
LobbyType.implement({
  fields: (t) => ({
    channelId: t.exposeID("channelId"),
    lobbyId: t.exposeString("lobbyId"),
    gameTitle: t.exposeString("gameTitle"),
    started: t.exposeBoolean("started"),

    players: t.field({
      type: [LobbyPlayerType],
      resolve: async (_, __, ctx) => ctx.getLobbyPlayers(),
    }),
  }),
});

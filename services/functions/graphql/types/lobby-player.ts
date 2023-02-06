import * as lobby from "@psycho-mantis/lib/db/lobby/entities";
import { UserType } from "./user";
import { builder } from "../builder";

export const LobbyPlayerType = builder.objectRef<lobby.PlayerEntityType>(
  "LobbyPlayer"
);
LobbyPlayerType.implement({
  fields: (t) => ({
    userId: t.exposeID("userId"),
    playerId: t.exposeString("playerId"),
    gameId: t.exposeString("gameId"),

    user: t.field({
      type: UserType,
      resolve: async (p, _, ctx) => {
        return await ctx.model.user.entities.UserEntity.query
          .user({ userId: p.userId })
          .go()
          .then((e) => e.data[0]);
      },
    }),
  }),
});

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
    lobbyId: t.exposeString("lobbyId"),
    team: t.exposeString("team"),

    isGm: t.boolean({
      resolve: (p, __, ctx) => p.userId === ctx.getGm().userId,
    }),

    user: t.field({
      type: UserType,
      resolve: (p, _, ctx) =>
        ctx.users.find((user) => user.userId === p.userId)!,
    }),
  }),
});

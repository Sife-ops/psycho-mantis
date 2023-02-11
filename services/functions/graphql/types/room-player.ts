import * as room from "@psycho-mantis/lib/db/room/entities";
import { UserType } from "./user";
import { builder } from "../builder";

export const RoomPlayerType = builder.objectRef<room.PlayerEntityType>(
  "RoomPlayer"
);
RoomPlayerType.implement({
  fields: (t) => ({
    userId: t.exposeID("userId"),
    playerId: t.exposeString("playerId"),
    roomId: t.exposeString("roomId"),
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

import { builder } from "../builder";
import { RoomEntityType } from "@psycho-mantis/lib/db/room/entities/room";
import { RoomPlayerType } from "./room-player";
import { UserType } from "./user";

export const RoomType = builder.objectRef<RoomEntityType>("Room");
RoomType.implement({
  fields: (t) => ({
    channelId: t.exposeID("channelId"),
    roomId: t.exposeString("roomId"),
    gameTitle: t.exposeString("gameTitle"),
    started: t.exposeBoolean("started"),

    players: t.field({
      type: [RoomPlayerType],
      resolve: async (_, __, ctx) => ctx.getRoomPlayers(),
    }),
  }),
});

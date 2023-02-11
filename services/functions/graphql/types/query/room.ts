import { builder } from "../../builder";
import { RoomType } from "../room";

builder.queryFields((t) => ({
  room: t.field({
    type: RoomType,
    resolve: (_, __, ctx) => ctx.getRoom(),
  }),
}));

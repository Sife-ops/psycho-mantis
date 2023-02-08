import { builder } from "../../builder";
import { LobbyType } from "../lobby";

builder.queryFields((t) => ({
  lobby: t.field({
    type: LobbyType,
    resolve: (_, __, ctx) => ctx.getLobby(),
  }),
}));

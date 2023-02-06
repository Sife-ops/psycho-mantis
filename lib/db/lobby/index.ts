import * as Entity from "./entities";
import { Service } from "electrodb";

export type Model = {
  LobbyEntity: typeof Entity.LobbyEntity;
  PlayerEntity: typeof Entity.PlayerEntity;
};

export const model = new Service<Model>({
  LobbyEntity: Entity.LobbyEntity,
  PlayerEntity: Entity.PlayerEntity,
});

export interface LobbyCollection {
  LobbyEntity: Entity.LobbyEntityType[];
  PlayerEntity: Entity.PlayerEntityType[];
}

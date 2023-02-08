import * as Entity from "./entities";
import { Service } from "electrodb";

export type Model = {
  ConnectionEntity: typeof Entity.ConnectionEntity;
  LobbyEntity: typeof Entity.LobbyEntity;
  PlayerEntity: typeof Entity.PlayerEntity;
};

export const model = new Service<Model>({
  ConnectionEntity: Entity.ConnectionEntity,
  LobbyEntity: Entity.LobbyEntity,
  PlayerEntity: Entity.PlayerEntity,
});

export interface LobbyCollection {
  ConnectionEntity: Entity.ConnectionEntityType[];
  LobbyEntity: Entity.LobbyEntityType[];
  PlayerEntity: Entity.PlayerEntityType[];
}

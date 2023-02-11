import * as Entity from "./entities";
import { Service } from "electrodb";

export type Model = {
  ConnectionEntity: typeof Entity.ConnectionEntity;
  RoomEntity: typeof Entity.RoomEntity;
  PlayerEntity: typeof Entity.PlayerEntity;
};

export const model = new Service<Model>({
  ConnectionEntity: Entity.ConnectionEntity,
  RoomEntity: Entity.RoomEntity,
  PlayerEntity: Entity.PlayerEntity,
});

export interface RoomCollection {
  ConnectionEntity: Entity.ConnectionEntityType[];
  RoomEntity: Entity.RoomEntityType[];
  PlayerEntity: Entity.PlayerEntityType[];
}

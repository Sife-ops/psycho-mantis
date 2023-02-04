import * as Entity from "./entities";
import { Service } from "electrodb";

export type Model = {
  GameEntity: typeof Entity.GameEntity;
  PlayerEntity: typeof Entity.PlayerEntity;
};

export const model = new Service<Model>({
  GameEntity: Entity.GameEntity,
  PlayerEntity: Entity.PlayerEntity,
});

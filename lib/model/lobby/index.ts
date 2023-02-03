import * as Entity from "./entities";
import { Service } from "electrodb";

export type Model = {
  UserEntity: typeof Entity.UserEntity;
};

export const model = new Service<Model>({
  UserEntity: Entity.UserEntity,
});

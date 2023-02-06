import { UserEntity } from "./user";
import { Service } from "electrodb";

export type Model = {
  UserEntity: typeof UserEntity;
};

export const model = new Service<Model>({
  UserEntity: UserEntity,
});

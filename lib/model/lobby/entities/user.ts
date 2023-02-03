import { Entity, EntityItem } from "electrodb";
import { Configuration } from "../config";
//

export const UserEntity = new Entity(
  {
    indexes: {
      user: {
        pk: {
          field: "pk",
          composite: ["userId"],
        },
        sk: {
          field: "sk",
          composite: [],
        },
      },

      user_: {
        collection: "user",
        index: "gsi1",
        pk: {
          field: "gsi1pk",
          composite: ["userId"],
        },
        sk: {
          field: "gsi1sk",
          composite: [],
        },
      },
    },

    attributes: {
      userId: {
        type: "string",
        required: true,
      },

      username: {
        type: "string",
        required: true,
      },

      discriminator: {
        type: "string",
        required: true,
      },

      avatar: {
        type: "string",
        required: true,
      },
    },

    model: {
      version: "1",
      entity: "User",
      service: "psycho-mantis",
    },
  },
  Configuration
);

export type UserEntityType = EntityItem<typeof UserEntity>;

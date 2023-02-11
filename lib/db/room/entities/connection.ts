import { Configuration } from "../config";
import { Entity, EntityItem } from "electrodb";
import { ulid } from "ulid";

export const ConnectionEntity = new Entity(
  {
    indexes: {
      connection: {
        pk: {
          field: "pk",
          composite: ["connectionId"],
        },
        sk: {
          field: "sk",
          composite: [],
        },
      },

      room_: {
        collection: "room",
        index: "gsi1",
        pk: {
          field: "gsi1pk",
          composite: ["roomId"],
        },
        sk: {
          field: "gsi1sk",
          composite: ["connectionId"],
        },
      },
    },

    attributes: {
      connectionId: {
        type: "string",
        required: true,
        default: () => ulid(),
      },

      roomId: {
        type: "string",
        required: true,
      },
    },

    model: {
      version: "1",
      entity: "Connection",
      service: "psycho-mantis",
    },
  },
  Configuration
);

export type ConnectionEntityType = EntityItem<typeof ConnectionEntity>;

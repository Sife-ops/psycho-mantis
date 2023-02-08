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

      lobby_: {
        collection: "lobby",
        index: "gsi1",
        pk: {
          field: "gsi1pk",
          composite: ["lobbyId"],
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

      lobbyId: {
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

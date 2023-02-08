import { Configuration } from "../config";
import { Entity, EntityItem } from "electrodb";
import { ulid } from "ulid";

export const GameEntity = new Entity(
  {
    indexes: {
      channel: {
        pk: {
          field: "pk",
          composite: ["channelId"],
        },
        sk: {
          field: "sk",
          composite: ["lobbyId"],
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
          composite: ["lobbyId"],
        },
      },

      lobby_: {
        collection: "lobby",
        index: "gsi2",
        pk: {
          field: "gsi2pk",
          composite: ["lobbyId"],
        },
        sk: {
          field: "gsi2sk",
          composite: [],
        },
      },
    },

    attributes: {
      channelId: {
        type: "string",
        required: true,
      },

      userId: {
        type: "string",
        required: true,
      },

      lobbyId: {
        type: "string",
        required: true,
      },
    },

    model: {
      version: "1",
      entity: "Game",
      service: "psycho-mantis",
    },
  },
  Configuration
);

export type GameEntityType = EntityItem<typeof GameEntity>;

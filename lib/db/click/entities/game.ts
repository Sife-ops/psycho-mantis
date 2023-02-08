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
          composite: ["gameId"],
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
          composite: ["gameId"],
        },
      },

      game_: {
        collection: "game",
        index: "gsi2",
        pk: {
          field: "gsi2pk",
          composite: ["gameId"],
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

      gameId: {
        type: "string",
        required: true,
        default: () => ulid(),
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

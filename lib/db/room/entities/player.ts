import { Configuration } from "../config";
import { Entity, EntityItem } from "electrodb";
import { ulid } from "ulid";

export const PlayerEntity = new Entity(
  {
    indexes: {
      player: {
        pk: {
          field: "pk",
          composite: ["playerId"],
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
          composite: ["userId"],
        },
      },

      user_: {
        collection: "user",
        index: "gsi2",
        pk: {
          field: "gsi2pk",
          composite: ["userId"],
        },
        sk: {
          field: "gsi2sk",
          composite: ["roomId"],
        },
      },

      player_: {
        collection: "player",
        index: "gsi3",
        pk: {
          field: "gsi3pk",
          composite: ["playerId"],
        },
        sk: {
          field: "gsi3sk",
          composite: [],
        },
      },
    },

    attributes: {
      playerId: {
        type: "string",
        required: true,
        default: () => ulid(),
      },

      userId: {
        type: "string",
        required: true,
      },

      roomId: {
        type: "string",
        required: true,
      },

      team: {
        type: "string",
        required: true,
        default: "",
      },
    },

    model: {
      version: "1",
      entity: "Player",
      service: "psycho-mantis",
    },
  },
  Configuration
);

export type PlayerEntityType = EntityItem<typeof PlayerEntity>;

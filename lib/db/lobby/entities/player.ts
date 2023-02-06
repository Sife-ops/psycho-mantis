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
          composite: ["userId"],
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

      lobbyId: {
        type: "string",
        required: true,
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

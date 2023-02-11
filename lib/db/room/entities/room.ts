import { Configuration } from "../config";
import { Entity, EntityItem } from "electrodb";
import { ulid } from "ulid";

export const RoomEntity = new Entity(
  {
    indexes: {
      channel: {
        pk: {
          field: "pk",
          composite: ["channelId"],
        },
        sk: {
          field: "sk",
          composite: ["roomId"],
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
          composite: [],
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
    },

    attributes: {
      channelId: {
        type: "string",
        required: true,
      },

      roomId: {
        type: "string",
        required: true,
        default: () => ulid(),
      },

      userId: {
        type: "string",
        required: true,
      },

      gameTitle: {
        type: "string",
        required: true,
        default: "",
      },

      started: {
        type: "boolean",
        required: true,
        default: false,
      },
    },

    model: {
      version: "1",
      entity: "Room",
      service: "psycho-mantis",
    },
  },
  Configuration
);

export type RoomEntityType = EntityItem<typeof RoomEntity>;

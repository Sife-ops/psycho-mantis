import * as db_ from "@psycho-mantis/lib/db";
import * as room from "@psycho-mantis/lib/db/room";
import { OptionSchema, onboardUser, fetchDiscord, wsApi } from "./common";

export class Options {
  private interactionBody;

  constructor(c: { interactionBody: any }) {
    this.interactionBody = c.interactionBody;
  }

  getFlatOptions(): OptionSchema[][] {
    const recurse = (options: OptionSchema[]): OptionSchema[][] => {
      if (!options || options.length < 1) return [];
      const firstOption = options[0];
      if (firstOption.options && firstOption.options.length > 0) {
        return [[firstOption], ...recurse(firstOption.options)];
      }
      return [options];
    };

    const {
      data: { name, options, type },
    } = this.interactionBody;

    return [
      [
        {
          name,
          options,
          type,
        },
      ],
      ...recurse(options),
    ];
  }

  getCommandName(index: number): string {
    return this.getFlatOptions()[index][0].name;
  }

  getOptionValue(optionName: string): string | number {
    const flatOptions = this.getFlatOptions();
    const value = flatOptions[flatOptions.length - 1].find(
      (option) => option.name === optionName
    )?.value;
    if (!value) throw new Error(`option not found: "${optionName}"`);
    return value;
  }
}

export class Ctx {
  db = db_;
  interactionBody;
  roomCollection;
  options;

  private constructor(c: {
    interactionBody: any;
    roomCollection?: room.RoomCollection;
  }) {
    this.interactionBody = c.interactionBody;
    this.roomCollection = c.roomCollection;
    this.options = new Options({ interactionBody: c.interactionBody });
  }

  static async init({ interactionBody }: { interactionBody: any }) {
    const roomCollection = await db_.room.model.entities.RoomEntity.query
      .channel({ channelId: interactionBody.channel_id })
      // .where(({ active }, { eq }) => eq(active, true))
      .go()
      .then(({ data }) => data[0])
      .then((room) => {
        if (!room) return undefined;
        return db_.room.model.collections
          .room({ roomId: room.roomId })
          .go()
          .then((e) => e.data);
      });

    return new Ctx({
      interactionBody,
      roomCollection,
    });
  }

  followUp(body: Record<string, any>) {
    const { application_id, token } = this.interactionBody;
    return fetchDiscord(`/webhooks/${application_id}/${token}`, {
      body,
    });
  }

  // websocket
  messageClient(connectionId: string, message: any) {
    return new Promise((resolve, reject) => {
      wsApi.postToConnection(
        {
          ConnectionId: connectionId,
          Data: JSON.stringify(message),
        },

        (err, data) => {
          if (err) {
            console.log("err is", err);
            reject(err);
          }

          resolve(data);
        }
      );
    });
  }

  allMessages(message: any) {
    try {
      return this.getRoomCollection().ConnectionEntity.map(
        ({ connectionId }) => this.messageClient(connectionId, message)
      );
    } catch {
      return [];
    }
  }

  // body
  getChannelId(): string {
    return this.interactionBody.channel_id;
  }

  getUser() {
    return this.interactionBody.member.user;
  }

  getUserId(): string {
    return this.getUser().id;
  }

  // room
  getRoomCollection() {
    if (!this.roomCollection) throw new Error("missing roomCollection");
    return this.roomCollection;
  }

  hasRoom() {
    return !!this.roomCollection;
  }

  getRoom() {
    return this.getRoomCollection().RoomEntity[0];
  }

  // player
  getPlayers() {
    return this.getRoomCollection().PlayerEntity;
  }

  getResolvedUsers() {
    return this.interactionBody.data.resolved.users;
  }

  // onboard
  onboardMember() {
    return onboardUser(this.getUser());
  }

  onboardResolved() {
    try {
      const resolved = this.getResolvedUsers();
      return Object.keys(resolved)
        .map((key) => resolved[key])
        .map((user) => onboardUser(user));
    } catch {
      return [];
    }
  }

  onboardUsers() {
    return [this.onboardMember(), ...this.onboardResolved()];
  }
}

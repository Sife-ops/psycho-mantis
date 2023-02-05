import * as db_ from "@psycho-mantis/lib/model";
import * as lobby from "@psycho-mantis/lib/model/lobby";
import { OptionSchema, onboardUser, fetchDiscord } from "./common";

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
  interactionBody;
  gameCollection;
  options;
  db = db_;

  private constructor(c: {
    interactionBody: any;
    gameCollection?: lobby.GameCollection;
  }) {
    this.interactionBody = c.interactionBody;
    this.gameCollection = c.gameCollection;
    this.options = new Options({ interactionBody: c.interactionBody });
  }

  static async init({ interactionBody }: { interactionBody: any }) {
    const gameCollection = await db_.lobby.model.entities.GameEntity.query
      .channel({ channelId: interactionBody.channel_id })
      // .where(({ active }, { eq }) => eq(active, true))
      .go()
      .then(({ data }) => data[0])
      .then((game) => {
        if (!game) return undefined;
        return db_.lobby.model.collections
          .game({ gameId: game.gameId })
          .go()
          .then((e) => e.data);
      });

    return new Ctx({
      interactionBody,
      gameCollection,
    });
  }

  //
  followUp(body: Record<string, any>) {
    const { application_id, token } = this.interactionBody;
    return fetchDiscord(`/webhooks/${application_id}/${token}`, {
      body,
    });
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

  // game
  getGameCollection() {
    if (!this.gameCollection) throw new Error("missing gameCollection");
    return this.gameCollection;
  }

  hasGame() {
    return !!this.gameCollection;
  }

  getGame() {
    return this.getGameCollection().GameEntity[0];
  }

  // player
  getPlayers() {
    return this.getGameCollection().PlayerEntity;
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

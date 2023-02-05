// import { model } from "@bombadil/core/model";
import { UserEntityType } from "@psycho-mantis/lib/model/user/user";
import { z } from "zod";
import * as db from "@psycho-mantis/lib/model";

/*
 * schema
 */

export const envSchema = z.object({
  PUBLIC_KEY: z.string(),
  ONBOARD_QUEUE: z.string(),
  WEB_URL: z.string(),
});

export const eventSchema = z.object({
  body: z.string(),
  headers: z.object({
    "x-signature-ed25519": z.string(),
    "x-signature-timestamp": z.string(),
  }),
});

export const memberSchema = z.object({
  user: z.object({
    id: z.string(),
  }),
});

export const optionSchema = z.object({
  name: z.string(),
  type: z.number(),
  value: z.union([z.string(), z.number()]).optional(),
  options: z.array(z.any()).optional(),
});
export type OptionSchema = z.infer<typeof optionSchema>;

export const usersSchema = z.record(
  z.object({
    avatar: z.string(),
    discriminator: z.string(),
    id: z.string(),
    username: z.string(),
  })
);
type UsersSchema = z.infer<typeof usersSchema>;

export const dataSchema = z.object({
  name: z.string(),
  options: z.array(optionSchema).optional(),
  type: z.number(),
});
type DataSchema = z.infer<typeof dataSchema>;

export const bodySchema = z.object({
  channel_id: z.string(),
  data: dataSchema,
  member: memberSchema,
  type: z.number(),
});

/*
 * functions
 */

export const rollOne = (): number => {
  return [1, 2, 3, 4, 5, 6][Math.floor(Math.random() * 6)];
};

export const rollTwo = (): number => {
  return rollOne() + rollOne();
};

export const messageResponse = (data: Record<string, any>) => {
  return {
    type: 4,
    data,
  };
};

// export const genericResult = (
//   content: string,
//   mutations: Promise<any>[] = []
// ) => {
//   return {
//     mutations: mutations,
//     response: genericResponse(content),
//   };
// };

// todo: sus
export const getResolvedUser = (users: UsersSchema, userId: string) => {
  const user = users[userId];
  if (!user) throw new Error("missing user");
  return user;
};

export const onboardUser = async (user: UserEntityType & { id: string }) => {
  return db.user.model.entities.UserEntity.get({ userId: user.id })
    .go()
    .then((e) => e.data)
    .then(async (u) => {
      if (!u) {
        await db.user.model.entities.UserEntity.create({
          userId: user.id,
          username: user.username,
          discriminator: user.discriminator,
          avatar: user.avatar || "",
        }).go();
        return;
      }

      if (
        u.avatar !== user.avatar ||
        u.discriminator !== user.discriminator ||
        u.username !== user.username
      ) {
        await db.user.model.entities.UserEntity.update({
          userId: u.userId,
        })
          .set({
            username: user.username,
            discriminator: user.discriminator,
            avatar: user.avatar,
          })
          .go();
      }
    });
};

const terrainResources: Record<
  "pasture" | "fields" | "mountains" | "hills" | "forest" | "desert",
  "wool" | "grain" | "ore" | "brick" | "lumber" | "none"
> = {
  pasture: "wool",
  fields: "grain",
  mountains: "ore",
  hills: "brick",
  forest: "lumber",
  desert: "none",
};

export const terrainResource = <
  T extends {
    terrain: "pasture" | "fields" | "mountains" | "hills" | "forest" | "desert";
  }
>(
  t: T
) => {
  return {
    ...t,
    resource: terrainResources[t.terrain],
  };
};

export const randomNoRepeat = <T>(array: T[]) => {
  let copy = array.slice(0);
  return () => {
    if (copy.length < 1) {
      copy = array.slice(0);
    }
    let index = Math.floor(Math.random() * copy.length);
    let item = copy[index];
    copy.splice(index, 1);
    return item;
  };
};

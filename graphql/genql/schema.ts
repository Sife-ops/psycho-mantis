import {FieldsSelection,Observable} from '@genql/runtime'

export type Scalars = {
    String: string,
    ID: string,
    Boolean: boolean,
}

export interface Mutation {
    mello: Scalars['String']
    __typename: 'Mutation'
}

export interface Query {
    hello: Scalars['String']
    room: Room
    __typename: 'Query'
}

export interface Room {
    channelId: Scalars['ID']
    gameTitle: Scalars['String']
    players: RoomPlayer[]
    roomId: Scalars['String']
    started: Scalars['Boolean']
    __typename: 'Room'
}

export interface RoomPlayer {
    isGm: Scalars['Boolean']
    playerId: Scalars['String']
    roomId: Scalars['String']
    team: Scalars['String']
    user: User
    userId: Scalars['ID']
    __typename: 'RoomPlayer'
}

export interface User {
    avatar: Scalars['String']
    discriminator: Scalars['String']
    userId: Scalars['ID']
    username: Scalars['String']
    __typename: 'User'
}

export interface MutationRequest{
    mello?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface QueryRequest{
    hello?: boolean | number
    room?: RoomRequest
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface RoomRequest{
    channelId?: boolean | number
    gameTitle?: boolean | number
    players?: RoomPlayerRequest
    roomId?: boolean | number
    started?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface RoomPlayerRequest{
    isGm?: boolean | number
    playerId?: boolean | number
    roomId?: boolean | number
    team?: boolean | number
    user?: UserRequest
    userId?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface UserRequest{
    avatar?: boolean | number
    discriminator?: boolean | number
    userId?: boolean | number
    username?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}


const Mutation_possibleTypes: string[] = ['Mutation']
export const isMutation = (obj?: { __typename?: any } | null): obj is Mutation => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isMutation"')
  return Mutation_possibleTypes.includes(obj.__typename)
}



const Query_possibleTypes: string[] = ['Query']
export const isQuery = (obj?: { __typename?: any } | null): obj is Query => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isQuery"')
  return Query_possibleTypes.includes(obj.__typename)
}



const Room_possibleTypes: string[] = ['Room']
export const isRoom = (obj?: { __typename?: any } | null): obj is Room => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isRoom"')
  return Room_possibleTypes.includes(obj.__typename)
}



const RoomPlayer_possibleTypes: string[] = ['RoomPlayer']
export const isRoomPlayer = (obj?: { __typename?: any } | null): obj is RoomPlayer => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isRoomPlayer"')
  return RoomPlayer_possibleTypes.includes(obj.__typename)
}



const User_possibleTypes: string[] = ['User']
export const isUser = (obj?: { __typename?: any } | null): obj is User => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isUser"')
  return User_possibleTypes.includes(obj.__typename)
}


export interface MutationPromiseChain{
    mello: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>})
}

export interface MutationObservableChain{
    mello: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>})
}

export interface QueryPromiseChain{
    hello: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    room: (RoomPromiseChain & {get: <R extends RoomRequest>(request: R, defaultValue?: FieldsSelection<Room, R>) => Promise<FieldsSelection<Room, R>>})
}

export interface QueryObservableChain{
    hello: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    room: (RoomObservableChain & {get: <R extends RoomRequest>(request: R, defaultValue?: FieldsSelection<Room, R>) => Observable<FieldsSelection<Room, R>>})
}

export interface RoomPromiseChain{
    channelId: ({get: (request?: boolean|number, defaultValue?: Scalars['ID']) => Promise<Scalars['ID']>}),
    gameTitle: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    players: ({get: <R extends RoomPlayerRequest>(request: R, defaultValue?: FieldsSelection<RoomPlayer, R>[]) => Promise<FieldsSelection<RoomPlayer, R>[]>}),
    roomId: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    started: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Promise<Scalars['Boolean']>})
}

export interface RoomObservableChain{
    channelId: ({get: (request?: boolean|number, defaultValue?: Scalars['ID']) => Observable<Scalars['ID']>}),
    gameTitle: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    players: ({get: <R extends RoomPlayerRequest>(request: R, defaultValue?: FieldsSelection<RoomPlayer, R>[]) => Observable<FieldsSelection<RoomPlayer, R>[]>}),
    roomId: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    started: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Observable<Scalars['Boolean']>})
}

export interface RoomPlayerPromiseChain{
    isGm: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Promise<Scalars['Boolean']>}),
    playerId: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    roomId: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    team: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    user: (UserPromiseChain & {get: <R extends UserRequest>(request: R, defaultValue?: FieldsSelection<User, R>) => Promise<FieldsSelection<User, R>>}),
    userId: ({get: (request?: boolean|number, defaultValue?: Scalars['ID']) => Promise<Scalars['ID']>})
}

export interface RoomPlayerObservableChain{
    isGm: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Observable<Scalars['Boolean']>}),
    playerId: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    roomId: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    team: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    user: (UserObservableChain & {get: <R extends UserRequest>(request: R, defaultValue?: FieldsSelection<User, R>) => Observable<FieldsSelection<User, R>>}),
    userId: ({get: (request?: boolean|number, defaultValue?: Scalars['ID']) => Observable<Scalars['ID']>})
}

export interface UserPromiseChain{
    avatar: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    discriminator: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    userId: ({get: (request?: boolean|number, defaultValue?: Scalars['ID']) => Promise<Scalars['ID']>}),
    username: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>})
}

export interface UserObservableChain{
    avatar: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    discriminator: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    userId: ({get: (request?: boolean|number, defaultValue?: Scalars['ID']) => Observable<Scalars['ID']>}),
    username: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>})
}
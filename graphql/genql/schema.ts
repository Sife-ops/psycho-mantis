import {FieldsSelection,Observable} from '@genql/runtime'

export type Scalars = {
    ID: string,
    String: string,
    Boolean: boolean,
}

export interface Lobby {
    channelId: Scalars['ID']
    gameTitle: Scalars['String']
    lobbyId: Scalars['String']
    players: LobbyPlayer[]
    started: Scalars['Boolean']
    __typename: 'Lobby'
}

export interface LobbyPlayer {
    isGm: Scalars['Boolean']
    lobbyId: Scalars['String']
    playerId: Scalars['String']
    team: Scalars['String']
    user: User
    userId: Scalars['ID']
    __typename: 'LobbyPlayer'
}

export interface Mutation {
    mello: Scalars['String']
    __typename: 'Mutation'
}

export interface Query {
    hello: Scalars['String']
    lobby: Lobby
    __typename: 'Query'
}

export interface User {
    avatar: Scalars['String']
    discriminator: Scalars['String']
    userId: Scalars['ID']
    username: Scalars['String']
    __typename: 'User'
}

export interface LobbyRequest{
    channelId?: boolean | number
    gameTitle?: boolean | number
    lobbyId?: boolean | number
    players?: LobbyPlayerRequest
    started?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface LobbyPlayerRequest{
    isGm?: boolean | number
    lobbyId?: boolean | number
    playerId?: boolean | number
    team?: boolean | number
    user?: UserRequest
    userId?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface MutationRequest{
    mello?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface QueryRequest{
    hello?: boolean | number
    lobby?: LobbyRequest
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


const Lobby_possibleTypes: string[] = ['Lobby']
export const isLobby = (obj?: { __typename?: any } | null): obj is Lobby => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isLobby"')
  return Lobby_possibleTypes.includes(obj.__typename)
}



const LobbyPlayer_possibleTypes: string[] = ['LobbyPlayer']
export const isLobbyPlayer = (obj?: { __typename?: any } | null): obj is LobbyPlayer => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isLobbyPlayer"')
  return LobbyPlayer_possibleTypes.includes(obj.__typename)
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



const User_possibleTypes: string[] = ['User']
export const isUser = (obj?: { __typename?: any } | null): obj is User => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isUser"')
  return User_possibleTypes.includes(obj.__typename)
}


export interface LobbyPromiseChain{
    channelId: ({get: (request?: boolean|number, defaultValue?: Scalars['ID']) => Promise<Scalars['ID']>}),
    gameTitle: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    lobbyId: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    players: ({get: <R extends LobbyPlayerRequest>(request: R, defaultValue?: FieldsSelection<LobbyPlayer, R>[]) => Promise<FieldsSelection<LobbyPlayer, R>[]>}),
    started: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Promise<Scalars['Boolean']>})
}

export interface LobbyObservableChain{
    channelId: ({get: (request?: boolean|number, defaultValue?: Scalars['ID']) => Observable<Scalars['ID']>}),
    gameTitle: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    lobbyId: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    players: ({get: <R extends LobbyPlayerRequest>(request: R, defaultValue?: FieldsSelection<LobbyPlayer, R>[]) => Observable<FieldsSelection<LobbyPlayer, R>[]>}),
    started: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Observable<Scalars['Boolean']>})
}

export interface LobbyPlayerPromiseChain{
    isGm: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Promise<Scalars['Boolean']>}),
    lobbyId: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    playerId: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    team: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    user: (UserPromiseChain & {get: <R extends UserRequest>(request: R, defaultValue?: FieldsSelection<User, R>) => Promise<FieldsSelection<User, R>>}),
    userId: ({get: (request?: boolean|number, defaultValue?: Scalars['ID']) => Promise<Scalars['ID']>})
}

export interface LobbyPlayerObservableChain{
    isGm: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Observable<Scalars['Boolean']>}),
    lobbyId: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    playerId: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    team: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    user: (UserObservableChain & {get: <R extends UserRequest>(request: R, defaultValue?: FieldsSelection<User, R>) => Observable<FieldsSelection<User, R>>}),
    userId: ({get: (request?: boolean|number, defaultValue?: Scalars['ID']) => Observable<Scalars['ID']>})
}

export interface MutationPromiseChain{
    mello: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>})
}

export interface MutationObservableChain{
    mello: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>})
}

export interface QueryPromiseChain{
    hello: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    lobby: (LobbyPromiseChain & {get: <R extends LobbyRequest>(request: R, defaultValue?: FieldsSelection<Lobby, R>) => Promise<FieldsSelection<Lobby, R>>})
}

export interface QueryObservableChain{
    hello: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    lobby: (LobbyObservableChain & {get: <R extends LobbyRequest>(request: R, defaultValue?: FieldsSelection<Lobby, R>) => Observable<FieldsSelection<Lobby, R>>})
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
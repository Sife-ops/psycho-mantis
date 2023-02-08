
var Lobby_possibleTypes = ['Lobby']
export var isLobby = function(obj) {
  if (!obj || !obj.__typename) throw new Error('__typename is missing in "isLobby"')
  return Lobby_possibleTypes.includes(obj.__typename)
}



var LobbyPlayer_possibleTypes = ['LobbyPlayer']
export var isLobbyPlayer = function(obj) {
  if (!obj || !obj.__typename) throw new Error('__typename is missing in "isLobbyPlayer"')
  return LobbyPlayer_possibleTypes.includes(obj.__typename)
}



var Mutation_possibleTypes = ['Mutation']
export var isMutation = function(obj) {
  if (!obj || !obj.__typename) throw new Error('__typename is missing in "isMutation"')
  return Mutation_possibleTypes.includes(obj.__typename)
}



var Query_possibleTypes = ['Query']
export var isQuery = function(obj) {
  if (!obj || !obj.__typename) throw new Error('__typename is missing in "isQuery"')
  return Query_possibleTypes.includes(obj.__typename)
}



var User_possibleTypes = ['User']
export var isUser = function(obj) {
  if (!obj || !obj.__typename) throw new Error('__typename is missing in "isUser"')
  return User_possibleTypes.includes(obj.__typename)
}

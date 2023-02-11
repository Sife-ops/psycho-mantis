
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



var Room_possibleTypes = ['Room']
export var isRoom = function(obj) {
  if (!obj || !obj.__typename) throw new Error('__typename is missing in "isRoom"')
  return Room_possibleTypes.includes(obj.__typename)
}



var RoomPlayer_possibleTypes = ['RoomPlayer']
export var isRoomPlayer = function(obj) {
  if (!obj || !obj.__typename) throw new Error('__typename is missing in "isRoomPlayer"')
  return RoomPlayer_possibleTypes.includes(obj.__typename)
}



var User_possibleTypes = ['User']
export var isUser = function(obj) {
  if (!obj || !obj.__typename) throw new Error('__typename is missing in "isUser"')
  return User_possibleTypes.includes(obj.__typename)
}

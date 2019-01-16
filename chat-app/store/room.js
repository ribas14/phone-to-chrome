const GOT_ROOM = 'GOT_ROOM';
const GOT_ROOM_STRING = 'GOT_ROOM_STRING';

export const gotRoom = room => ({ type: GOT_ROOM, room });
export const gotRoomStringQr = roomStringQr => ({ type: GOT_ROOM_STRING, roomStringQr });

const reducer = (state = {}, action) => {
  switch (action.type) {
  case GOT_ROOM:
    return action.room;
  case GOT_ROOM_STRING:
    return action.roomStringQr;
  default:
    return state;
  }
};
export default reducer;
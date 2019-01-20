const GOT_ROOM = 'GOT_ROOM';
const GOT_ROOM_STRING = 'GOT_ROOM_STRING';
const CLEAN_ROOM = 'CLEAN_ROOM';

export const gotRoom = room => ({ type: GOT_ROOM, room });
export const gotRoomStringQr = roomStringQr => ({ type: GOT_ROOM_STRING, roomStringQr });
export const cleanRoom = () => ({ type: CLEAN_ROOM });

const reducer = (state = {}, action) => {
  switch (action.type) {
  case GOT_ROOM:
    return action.room;
  case GOT_ROOM_STRING:
    return action.roomStringQr;
  case CLEAN_ROOM:
    action.room = {}
    action.roomStringQr = ''
    return null;
  default:
    return state;
  }
};
export default reducer;
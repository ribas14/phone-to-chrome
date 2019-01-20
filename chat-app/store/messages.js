const GOT_MESSAGES = "GOT_MESSAGES";
const GOT_NEW_MESSAGE = "GOT_NEW_MESSAGE";
const CLEAN = "CLEAN";

export const gotMessages = messages => ({ type: GOT_MESSAGES, messages });
export const cleanMessages = () => ({ type: CLEAN })
export const gotNewMessage = message => ({ type: GOT_NEW_MESSAGE, message });

const reducer = (state = [], action) => {
  switch (action.type) {
    case GOT_MESSAGES:
      return action.messages ? action.messages : [];
    case GOT_NEW_MESSAGE:
      return [action.message, ...state];
    case CLEAN:
      action.messages = []
      return action.messages ? action.messages : [];
    default:
      return state;
  }
};
export default reducer;

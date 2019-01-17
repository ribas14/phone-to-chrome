const GOT_USER = 'GOT_USER';
const GOT_USER_STRING = 'GOT_USER_STRING';
const CLEAN_USER = 'CLEAN_USER';

export const gotUser = user => ({ type: GOT_USER, user });
export const gotStringQr = stringQr => ({ type: GOT_USER_STRING, stringQr });
export const cleanUser = () => ({ type: CLEAN_USER });

const reducer = (state = {}, action) => {
  switch (action.type) {
  case GOT_USER:
    return action.user;
  case GOT_USER_STRING:
    return action.stringQr;
  case CLEAN_USER:
    action.user = {}
    action.stringQr = ''
    return null;
  default:
    return state;
  }
};
export default reducer;
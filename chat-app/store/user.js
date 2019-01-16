const GOT_USER = 'GOT_USER';
const GOT_USER_STRING = 'GOT_USER_STRING';

export const gotUser = user => ({ type: GOT_USER, user });
export const gotStringQr = stringQr => ({ type: GOT_USER_STRING, stringQr });

const reducer = (state = {}, action) => {
  switch (action.type) {
  case GOT_USER:
    return action.user;
  case GOT_USER_STRING:
    return action.stringQr;
  default:
    return state;
  }
};
export default reducer;
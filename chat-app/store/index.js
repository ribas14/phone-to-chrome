import { createStore, combineReducers } from "redux";
import messages, { gotMessages, gotNewMessage } from "./messages";
import user, { gotUser, gotNewUser } from "./user";
import socket from "./socket";

var navigate;
const reducers = combineReducers({ messages, user });
const store = createStore(reducers);

export default store;
export * from "./messages";

export const login = (credentials, navigation) => {
  socket.emit("newUser", credentials);
  navigate = navigation.navigate;
};
export const openChat = user => {
  socket.emit("chat", user);
};
export const sendMessage = (text, sender) => {
  socket.emit("message", { text, sender });
};

socket.on("priorMessages", messages => {
  if (messages)
    store.dispatch(gotMessages(messages));
});
socket.on("userCreated", response => {
  const { user } = response;
  store.dispatch(gotUser(user));
  navigate("Chat");
});
// socket.on("newUser", user => {
//   store.dispatch(gotNewUser(user));
// });
socket.on("incomingMessage", message => {
  store.dispatch(gotNewMessage(message));
});

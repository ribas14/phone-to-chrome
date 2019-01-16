import { createStore, combineReducers } from "redux";
import messages, { gotMessages, gotNewMessage } from "./messages";
import user, { gotUser } from "./user";
import room, { gotRoom } from "./room";
import socket from "./socket";

var navigate;
const reducers = combineReducers({ messages, user, room });
const store = createStore(reducers);

export default store;
export * from "./messages";

export const login = (credentials, navigation) => {
  let stringQr = "42fqapk5wpj"
  let roomStringQr = "nemz5vhx1kf"
  socket.emit("newStringQr", { stringQr, roomStringQr});
  navigate = navigation.navigate;
};
export const openChat = (user, room) => {
  socket.emit("chat", { user, room });
};
export const sendMessage = (text, sender, room) => {
  socket.emit("message", { text, sender, room });
};

socket.on("priorMessages", messages => {
  if (messages)
    store.dispatch(gotMessages(messages));
});
socket.on("incomingMessage", message => {
  store.dispatch(gotNewMessage(message));
});

socket.on("userCreated", response => {
  const { user, room } = response;
  store.dispatch(gotUser(user));
  store.dispatch(gotRoom(room));
  navigate("Chat");
});
// socket.on("newUser", user => {
//   store.dispatch(gotNewUser(user));
// });



import { createStore, combineReducers } from "redux";
import messages, {
  gotMessages,
  gotNewMessage,
  cleanMessages
} from "./messages";
import user, { gotUser, gotStringQr, cleanUser } from "./user";
import room, { gotRoom, gotRoomStringQr, cleanRoom } from "./room";
import socket from "./socket";
import { AsyncStorage } from "react-native";

var navigate;
const reducers = combineReducers({ messages, user, room });
const store = createStore(reducers);

export default store;
export * from "./messages";

export const login = (credentials, navigation) => {
  let stringQr;
  let roomStringQr;

  navigate = navigation.navigate;
  if (!credentials) {
    navigate("ScanScreen");
  } else {
    stringQr = credentials.stringQr;
    store.dispatch(gotStringQr(stringQr));

    roomStringQr = credentials.roomStringQr;
    store.dispatch(gotRoomStringQr(roomStringQr));

    socket.emit("newStringQr", { stringQr, roomStringQr });
    qrCodeRead(roomStringQr)
  }
};
export const openChat = (user, room) => {
  socket.emit("chat", { user, room });
};
export const sendMessage = (text, sender, room) => {
  socket.emit("message", { text, sender, room });
};

export const qrCodeRead = (room) => {
  socket.emit("qrCodeReadOnMobile", room);
};

export const cleanStorage = () => {
  navigate("ScanScreen");
  AsyncStorage.clear();
  store.dispatch(cleanMessages());
  store.dispatch(cleanUser());
  store.dispatch(cleanRoom());
}

socket.on("cleanStorage", () => {
  cleanStorage()
});

socket.on("priorMessages", messages => {
  if (messages) store.dispatch(gotMessages(messages));
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

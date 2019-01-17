import io from "../socket.io.js";

export default function () {
  var socket = io('ws://localhost:3000');
  console.log(socket)
  socket.emit('teste', { hello: 'world' });

};
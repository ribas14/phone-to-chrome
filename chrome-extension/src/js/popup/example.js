import io from "../socket.io.js";

export default function () {
  var socket = io('ws://10.1.100.28:3000');
  console.log(socket)
  socket.emit('teste', { hello: 'world' });

};
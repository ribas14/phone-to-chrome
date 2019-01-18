import io from 'socket.io-client';
const socket = io('http://144.202.17.15/');
socket.connect();
export default socket;
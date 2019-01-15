import io from 'socket.io-client';
const socket = io('http://10.1.100.28:3000');
socket.connect();
export default socket;
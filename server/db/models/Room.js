const conn = require('../conn');
const { Sequelize } = conn;

const Room = conn.define('room', {
  roomStringQr: Sequelize.STRING,
});

module.exports = Room;
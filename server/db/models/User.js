const conn = require('../conn');
const { Sequelize } = conn;

const User = conn.define('user', {
  stringQr: Sequelize.STRING,
});

module.exports = User;
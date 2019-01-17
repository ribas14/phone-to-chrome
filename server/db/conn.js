const Sequelize = require('sequelize');
const conn = new Sequelize('postgres://ribas:142406@localhost/chat_app_db');

module.exports = conn;
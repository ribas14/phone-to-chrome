const conn = require('./conn');
const Conversation = require('./models/Conversation');
const Message = require('./models/Message');
const User = require('./models/User');
const Room = require('./models/Room');

// User.hasMany(Conversation);
Room.hasMany(User);
Conversation.belongsTo(Room, { as: 'room' });
Message.belongsTo(Conversation);
Conversation.hasMany(Message);
Conversation.hasMany(User);

module.exports = {
  conn,
  models: {
    Conversation,
    User,
    Message,
    Room
  }
};
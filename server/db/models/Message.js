
const conn = require('../conn');
const { Sequelize } = conn;

const Message = conn.define('message', {
  text: Sequelize.STRING(1234),
  user: Sequelize.JSON,
  _id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true
  }
});

module.exports = Message;

Message.createMessage = (text, sender, room) => {
    return Promise.all([
      Message.create({
        text,
        user: {
          _id: sender.id,
          name: sender.name
        }
      }),
      conn.models.conversation.findOrCreateConversation(room.id)
    ])
      .then(([message, conversation]) => message.setConversation(conversation));
  };
const conn = require("../conn");
const { Sequelize } = conn;
const { Op } = Sequelize;

const Conversation = conn.define("conversation", {});

Conversation.findOrCreateConversation = function(roomId) {
  return Conversation.findOne({
    where: {
      roomId: roomId,
    },
    include: [conn.models.message],
    order: [[conn.models.message, "createdAt", "DESC"]]
  }).then(conversation => {
    if (conversation) {
      return conversation;
    } else {
      return Conversation.create(
        {
          roomId: roomId,
        },
        {
          include: [conn.models.message],
          order: [[conn.models.message, "createdAt", "DESC"]]
        }
      );
    }
  });
};

module.exports = Conversation;

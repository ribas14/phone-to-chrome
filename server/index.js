const server = require("http")
  .createServer()
  .listen(3000);
const conn = require("./db").conn;
const io = require("socket.io")(server);
const { Room, User, Conversation, Message } = require("./db").models;

// IMPORTANTE
// remover force: true antes do deploy
// conn.sync({ logging: false, force: true });
conn.sync({ logging: false });
const mobileSockets = {};

io.on("connection", socket => {
  socket.on("newStringQr", credentials => {
    const { stringQr, roomStringQr } = credentials;

    socket.join(roomStringQr);

    Promise.all([
      Room.findOrCreate({
        where: {
          roomStringQr
        }
      }),
      Room.findOne()
    ]).then(([room]) => {
      Promise.all([
        User.findOrCreate({
          where: {
            stringQr
          },
          roomId: room[0].id
        }),
        User.findOne()
      ]).then(([user]) => {
        mobileSockets[room[0].id] = socket.id;
        socket.emit("userCreated", { room: room[0], user: user[0] });
        Conversation.findOrCreateConversation(room[0].id).then(conversation =>
          socket.emit("priorMessages", conversation.messages)
        );
      });
    });
  });

  socket.on("chat", (obj) => {
    Conversation.findOrCreateConversation(obj.user.room.id).then(conversation =>
      socket.emit("priorMessages", conversation.messages)
    );
  });

  socket.on("newId", (obj) => {
    io.in(obj).emit("cleanStorage");
  });

  socket.on("qrCodeReadOnMobile", (obj) => {
    io.in(obj).emit("qrCodeReadOnMobile");
  });

  socket.on("message", ({ text, sender, room }) => {
    Message.createMessage(text, sender, room).then(message => {
      io.in(room.roomStringQr).emit("incomingMessage", message);
    });
  });
});

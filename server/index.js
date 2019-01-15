const server = require('http').createServer().listen(3000);
const conn = require('./db').conn;
const io = require('socket.io')(server);
const { User, Conversation, Message } = require('./db').models;

// IMPORTANTE
// remover force: true antes do deploy
// conn.sync({ logging: false, force: true });
conn.sync({ logging: false });
const mobileSockets = {};

io.on('connection', socket => {
  socket.on('newStringQr', credentials => {
    console.log(credentials)
    const stringQr = credentials;
    Promise.all([
      User.findOrCreate({
        where: {
          stringQr
        } 
      }), 
      User.findOne()
    ])
      .then(([user]) => {
        mobileSockets[user[0].id] = socket.id;
        socket.emit('userCreated', { user: user[0] });
        Conversation.findOrCreateConversation(user[0].id)
        .then(conversation => socket.emit('priorMessages', conversation.messages));
      });
  });

  socket.on('chat', user => {
    Conversation.findOrCreateConversation(user.id)
      .then(conversation => socket.emit('priorMessages', conversation.messages));
  });

  socket.on('message', ({ text, sender }) => { 
    console.log(text)
    Message.createMessage(text, sender)
      .then(message => {
        socket.emit('incomingMessage', message);
        const receiverSocketId = mobileSockets[sender.id];
        socket.to(receiverSocketId).emit('incomingMessage', message);
      });
  });
});

const app = require('./app');
const socket = require('socket.io');
const cors = require('cors');

require('./error-handling')(app);

const PORT = process.env.PORT || 5000;

app.use(cors());
const server = app.listen(PORT, () => {
  console.log(`Server listening on port http://localhost:${PORT}`);
});
let io;

if (process.env.ENVLOCAL) {
  console.log('LOCAL adding CORS');
  io = require('socket.io')(server, {
    cors: {
      origin: 'http://localhost:3000', // allow to server to accept request from different origin
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
      credentials: true, // allow session cookie from browser to pass through
    },
  });
} else {
  console.log('build app');
  io = require('socket.io')(server);
}

io.on('connection', (socket) => {
  const id = socket.handshake.query.id;
  socket.join(id);
  console.log('new connection');

  socket.on('send-message', ({ recipients, text }) => {
    recipients.forEach((recipient) => {
      const newRecipients = recipients.filter((r) => r !== recipient);
      newRecipients.push(id);
      socket.broadcast.to(recipient).emit('receive-message', {
        recipients: newRecipients,
        sender: id,
        text,
      });
    });
  });
});

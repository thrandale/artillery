const httpServer = require('http').createServer(handler);
const io = require('socket.io')(httpServer);
const PORT = 9096;
httpServer.listen(PORT, function () {
  console.log('Socket.io Args Server listening on %s', PORT);
});

io.on('connection', function (socket) {
  socket.on('join', (channel) => {
    socket.join(channel);
    socket.emit('new_user_join', `Welcome to ${channel}`);
  });

  socket.on('message', (channel, ...message) => {
    console.log(channel);
    console.log(message);
    io.in(channel).emit('message_response', channel, ...message);
  });

  socket.on('new_server_version', (message1, message2, callback) => {
    callback(message1, message2);
  });
});

function handler(req, res) {
  res.writeHead(404);
  res.end('No http pages here');
}

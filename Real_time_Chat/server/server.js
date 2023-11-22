const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);
const path = require('path');

app.use(express.static(__dirname));


io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });

  socket.on('chat message', (user,msg) => {
    console.log('message: '+ user +' : '+ msg);
    io.emit('chat message', user, msg);
  });

});


app.get('/chat_room', (req, res) => {
  console.log('chat room');
  res.sendFile(path.join(__dirname, '../client/client.html'));
});

app.listen(3000, () => {
  console.log('listening on port 3000');
});
// const http = require('http');
import http from 'http';
import sio from 'socket.io';

import app from '../app/app';
// const app = require('../app/app');

const port = process.env.PORT || 3002;

const server = http.createServer(app);

server.listen(port, () => {
  console.log(`server running on port: ${port}`)
});

const io = sio(server);

io.on('connection', socket => {
  console.log('New User Connected');

  socket.username = 'Anonymous';
  socket.on('user_name', data => {
    socket.username = data.username;
  });

  socket.on('message', data => {
    io.sockets.emit('new_message', {message: data.message, username: data.username});
  });

  socket.on('typing', data => {
    socket.broadcast.emit('typing', {username: socket.username});
  });
});


export default server;

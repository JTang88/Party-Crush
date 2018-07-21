import express from 'express';
import http from 'http';
import SocketIo from 'socket.io';
import { each } from 'lodash';
import Rooms from './rooms';
import clientEvents from './clientEvents/index';

const app = express();
const server = http.Server(app)
const io = SocketIo(server);
const rooms = new Rooms(io);

io.on('connection', (client) => {
  console.log('client connected');
  const { query } = client.handshake;
  console.log('here is query', query)
  const room = rooms.findOrCreate(query);

  client.join(room.id);  

  each(clientEvents, (handler, event) => {
    client.on(event, handler.bind(null, { io, client, room, rooms }));
  });
});

const port = process.env.PORT || 3113;
server.listen(port, () => console.log(`socket server listening on port ${port}`));

// ================================================

// var app = require('express')();
// var server = require('http').Server(app);
// var io = require('socket.io')(server);

// // server.listen(80);

// app.get('/', function (req, res) {
//   res.sendfile(__dirname + '/index.html');
// });

// io.on('connection', function (socket) {
//   socket.emit('news', { hello: 'world' });
//   socket.on('my other event', function (data) {
//     console.log(data);
//   });
// });




// import http from 'http';
// import SocketIo from 'socket.io';
// import { each } from 'lodash';
// import Rooms from './rooms';
// import clientEvents from './clientEvents/index';

// const server = http.createServer();
// const io = SocketIo(server);
// const rooms = new Rooms(io);

// io.on('connection', (client) => {
//   console.log('client connected');
//   const { query } = client.handshake;
//   console.log('here is query', query)
//   const room = rooms.findOrCreate(query);

//   client.join(room.id, () =>  { 
//     let rooms = Object.keys(client.rooms);
//     console.log(rooms); // [ <socket.id>, 'room 237' ]
//   });

//   each(clientEvents, (handler, event) => {
//     client.on(event, handler.bind(null, { io, client, room, rooms }));
//   });
// });

// const port = process.env.PORT || 3113;
// server.listen(port, () => console.log(`socket server listening on port ${port}`));
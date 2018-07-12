import http from 'http';
import SocketIo from 'socket.io';
import { each } from 'lodash';
import Rooms from './rooms';
import clientEvents from './clientEvents/index';

const server = http.createServer();
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
import axios from 'axios'

export const serverInitialState = ({ client, room, io }) => {
  io
    .in(room.id)
    .emit('server.initialState', {
    clientId: client.id,
    ...room,
  }, console.log('===============here is room =======================', room));
};


export const addParticipant = ({ client, room, io }, payload) => {
  room.participants.push(payload)
  io
    .in(room.id)
    .emit('server.participantAdded', {
    clientId: client.id,
    ...room,
  }, console.log('here is room when addParticipant ====', room));
};

export const addMatch = ({ client, room, io }, payload) => {
  room.matches = Object.assign(room.matches, payload)
  io
    .in(room.id)
    .emit('server.matchAdded', {
      clientId: client.id,
      ...room,
    }, console.log('here is room when addMatch ====', room));
};

export const handleClientDisconnect = async ({ io, client, room, rooms }) => {
  io.of('/').in(room.id).clients((err, clients) => {
    console.log('here are all the clients in this room before delete', clients)
    const index = clients.indexOf(client.id);
    if (index > -1) {
      clients.splice(index, 1);
      console.log('here are all the clients in this room after delete', clients)
    }
    if (clients.length === 0) {
      axios.delete(`${process.env.REST_SERVER_URL}/api/delete-room`, {
        params: {
          roomId: room.id
        }
      });
      delete rooms.store[room.id]
    }
  })
};

// export const serverRun = ({ io, room }, stdout) => {
//   io
//     .in(room.get('id'))
//     .emit('server.run', { stdout });
// };

// export const serverMessage = ({ io, room }, message) => {
//   io
//     .in(room.get('id'))
//     .emit('server.message', message);
// };
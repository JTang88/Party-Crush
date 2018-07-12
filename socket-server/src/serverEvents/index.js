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
  }, console.log('===============here is room =======================', room));
};

// export const serverChanged = ({ io, room }) => {
//   const roomId = room.get('id');
//   const text = room.get('text');
//   io
//     .in(roomId)
//     .emit('server.changed', { text });
// };

export const serverLeave = ({ io, room, rooms }) => {
  delete rooms.store[room.id]
  io
    .in(room.get('id'))
    .emit('server.leave');
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
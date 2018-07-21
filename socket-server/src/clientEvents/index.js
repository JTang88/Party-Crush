import {
  serverInitialState,
  addParticipant,
  addMatch,
  handleClientDisconnect,
} from '../serverEvents';

const clientReady = ({ io, client, room }) => {
  console.log('client ready heard');
  serverInitialState({ io, client, room });
};

const clientAddParticipant = ({ io, client, room }, payload) => {
  console.log('client adds participant');
  addParticipant({ io, client, room }, payload);
};

const clientAddMatch = ({ io, client, room }, payload) => {
  console.log('client adds match')
  addMatch({ io, client, room }, payload)
}

const clientDisconnect = ({ io, client, room, rooms }) => {
  console.log('client disconnected');
  handleClientDisconnect({ io, client, room, rooms });
};



const clientEmitters = {
  'client.ready': clientReady,
  'client.addUser': clientAddParticipant,
  'client.addMatch': clientAddMatch,
  'client.disconnect': clientDisconnect,
};

export default clientEmitters;
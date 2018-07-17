import axios from 'axios';

import {
  serverInitialState,
  addParticipant,
  addMatch,
  serverChanged,
  serverLeave,
  serverRun,
  serverMessage,
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
// const clientUpdate = ({ io, client, room }, payload) => {
//   console.log('client update heard. payload.text = ', payload.text);
//   room.set('text', payload.text);
//   serverChanged({ io, client, room });
// };

const clientDisconnect = ({ io, room }) => {
  console.log('client disconnected');
  serverLeave({ io, room });
};

// const clientRun = async ({ io, room }) => {
//   console.log('running code from client. room.get("text") = ', room.get('text'));

//   const url = process.env.CODERUNNER_SERVICE_URL;
//   const code = room.get('text');

//   try {
//     const { data } = await axios.post(`${url}/submit-code`, { code });
//     const stdout = data;
//     serverRun({ io, room }, stdout);
//   } catch (e) {
//     console.log('error posting to coderunner service from socket server. e = ', e);
//   }
// };

// const clientMessage = ({ io, room }, payload) => {
//   console.log('client message heard');
//   serverMessage({ io, room }, payload);
// };

const clientEmitters = {
  'client.ready': clientReady,
  'client.addUser': clientAddParticipant,
  'client.addMatch': clientAddMatch,
  // 'client.update': clientUpdate,
  'client.disconnect': clientDisconnect,
  // 'client.run': clientRun,
  // 'client.message': clientMessage,
};

export default clientEmitters;
import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import io from 'socket.io-client';
// import { throttle } from 'lodash';
import Progress from './Progress'
import Waiting from './Waiting'

@inject('CurrentUserStore', 'RoomStore')
@observer

class Crush extends Component {
  componentDidMount() {
    let { 
      CurrentUserStore: { currentUserDetails, host, participantAdded }, 
      RoomStore: { details: { roomId, numberOfParticipants } } 
    } = this.props;

    this.socket = io(process.env.REACT_APP_SOCKET_SERVER_URL, {
      query: {
        roomId,
        numberOfParticipants,
      }
    });

    this.socket.on('connect', () => {
      this.socket.emit('client.ready');
    });

    this.socket.on('server.initialState', (data) => {
      this.props.RoomStore.details = data;
      
      console.log('here is participantAdded prior to update', participantAdded)


      if(!participantAdded) {
        this.socket.emit('client.addUser', Object.assign({}, currentUserDetails));
        participantAdded = true
      }
    });

    this.socket.on('server.participantAdded', (data) => {
      this.props.RoomStore.details = data;
    });
    // this.socket.on('server.changed', ({ text }) => {
    //   this.setState({ text });
    // });

    // this.socket.on('server.run', ({ stdout }) => {
    //   this.setState({ stdout });
    // });
  }

  // handleChange = throttle((editor, metadata, value) => {
  //   this.socket.emit('client.update', { text: value });
  // }, 250)


  render() {
    const { RoomStore: { details: { numberOfParticipants, participants } } } = this.props;

    if (Number(numberOfParticipants) === participants.length) {
      return <Progress />
    }
    return <Waiting />
  }
}

export default Crush;
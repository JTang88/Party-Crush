import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { toJS } from 'mobx';
import io from 'socket.io-client';
import { throttle } from 'lodash';
import ChooseCrush from './ChooseCrush'
import Waiting from './Waiting'

@inject('CurrentUserStore', 'RoomStore')
@observer

class Crush extends Component {
  async componentDidMount() {
    let { 
      CurrentUserStore: { currentUserDetails, toggleParticipantAdded }, 
      RoomStore: { replaceRoomDetails, details: { roomId, numberOfParticipants } } 
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

    this.socket.on('server.initialState', async (data) => {
      replaceRoomDetails(data);
      if(sessionStorage.getItem('participantAdded') !== 'true') {
        console.log('here is currentUserDetails', toJS(currentUserDetails))

        this.socket.emit('client.addUser', Object.assign({}, currentUserDetails));


        sessionStorage.setItem('participantAdded', 'true')
      }
    });

    this.socket.on('server.participantAdded', (data) => {
      console.log('here is how I get data', data)
      replaceRoomDetails(data);
    });

    // this.socket.on('server.participantAdded', throttle((data) => {
    //   replaceRoomDetails(data);
    // }, 250));

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
    const { RoomStore: { participantsToCome } } = this.props;

    if (participantsToCome === 0) {
      return <ChooseCrush />
    }
    return <Waiting />
  }
}

export default Crush;
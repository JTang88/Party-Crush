import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import io from 'socket.io-client';
import ChooseCrush from './ChooseCrush'
import Waiting from './Waiting'
import Progress from './Progress';
import Result from './Result'

@inject('CurrentUserStore', 'RoomStore')
@observer

class Crush extends Component {
  state = {
    matchAdded: JSON.parse(sessionStorage.getItem('matchAdded')),
  };

  componentDidMount() {
    let { 
      CurrentUserStore: { currentUserDetails }, 
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
        this.socket.emit('client.addUser', Object.assign({}, currentUserDetails));
        sessionStorage.setItem('participantAdded', 'true')
      }
    });

    this.socket.on('server.participantAdded', (data) => {
      replaceRoomDetails(data);
    });

    this.socket.on('server.matchAdded', (data) => {
      console.log('here is the data I get back from addMatch', data)
      replaceRoomDetails(data);
    });
  }

  handleChooseCrush = (participantId) => {
    this.socket.emit('client.addMatch', { [this.props.CurrentUserStore.currentUserDetails.id]: participantId }) 
    sessionStorage.setItem('matchAdded', 'true')
    this.setState({ matchAdded: true })
  }

  render() {
    const { RoomStore: { animationRan, participantsToCome, allhaveChosenCrush } } = this.props;
    console.log('here is allhaveChosenCrush', allhaveChosenCrush)

    if (participantsToCome === 0 && !this.state.matchAdded) {
      return <ChooseCrush handleChooseCrush={this.handleChooseCrush} />
    } else if (this.state.matchAdded && !animationRan) {
      return <Progress />
    } else if (allhaveChosenCrush && animationRan) {
      return <Result />
    }
    return <Waiting />
  }
}

export default Crush;
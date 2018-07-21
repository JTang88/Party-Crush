import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { withRouter } from 'react-router-dom'
import { toJS } from 'mobx';
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

    console.log('here is pathname', this.props.location.pathname)
    console.log('here is roomId', roomId)


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
        this.socket.emit('client.addUser', toJS(currentUserDetails));
        sessionStorage.setItem('participantAdded', 'true')
      }
    });

    this.socket.on('server.participantAdded', (data) => {
      console.log('here is clientId', data.clientId)
      replaceRoomDetails(data);
    });

    this.socket.on('server.matchAdded', (data) => {
      console.log('here is the data I get back from addMatch', data)
      replaceRoomDetails(data);
    });
    
    window.addEventListener("unload", () => { 
      console.log('window unloaded!')
      this.socket.emit('client.disconnect') });    
  }


  handleChooseCrush = (participantId) => {
    this.socket.emit('client.addMatch', { [this.props.CurrentUserStore.currentUserDetails.id]: participantId }) 
    sessionStorage.setItem('matchAdded', 'true')
    this.setState({ matchAdded: true })
  }

  render() {
    const { RoomStore: { animationRan, participantsToCome, allhaveChosenCrush } } = this.props;

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

export default withRouter(Crush);
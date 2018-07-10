import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import io from 'socket.io-client';
import { throttle } from 'lodash';

@inject('CurrentUserStore', 'RoomStore')
@observer

class Crush extends Component {
  componentDidMount() {
    const { CurrentUserStore: { currentUserDetails }, RoomStore: { details: { roomId, numberOfParticipants } } } = this.props;
    this.socket = io(process.env.REACT_APP_SOCKET_SERVER_URL, {
      query: {
        currentUserDetails,
        roomId,
        numberOfParticipants,
      }
    });

    this.socket.on('connect', () => {
      this.socket.emit('client.ready');
    });

    this.socket.on('server.initialState', ({ numberOfParticipants, currentUserDetails, clientId }) => {
      console.log('here is numberOfParticipants', numberOfParticipants)
      // this.setState({ id, text });
    });

    this.socket.on('server.changed', ({ text }) => {
      this.setState({ text });
    });

    this.socket.on('server.run', ({ stdout }) => {
      this.setState({ stdout });
    });
  }

  handleChange = throttle((editor, metadata, value) => {
    this.socket.emit('client.update', { text: value });
  }, 250)


  render() {
    return (
      <div >
        Here is Crush!
      </div>
    );
  }
}

export default Crush;
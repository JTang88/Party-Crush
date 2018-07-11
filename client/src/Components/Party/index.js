import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import WrongParty from './WrongParty';
import Crush from './Crush';
import axios from 'axios';

@inject('CurrentUserStore')
@inject('RoomStore')
@observer

class Party extends Component {
  state = {
    varified: false,
    exist: null,
  }

  async componentDidMount () {
    const { RoomStore, location: { pathname } } = this.props;
    const { data: { exist, numberOfParticipants, roomId } } = await axios.post(`${process.env.REACT_APP_REST_SERVER_URL}/api/verify`, {
      roomId: pathname.substring(1, pathname.length),
    });

    if (exist) {
      RoomStore.details.numberOfParticipants = numberOfParticipants;
      RoomStore.details.roomId = roomId;
      this.setState({
        varified: true,
        exist,
      })
    } else {
      this.setState({
        varified: true,
        exist,
      })
    }
  }

  render() {
    if (this.state.varified) {
      return this.state.exist ? <Crush /> : <WrongParty />
    } else {
      return <div>Loading</div>
    }
  }
}

export default Party
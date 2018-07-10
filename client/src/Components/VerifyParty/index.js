import React, { Component } from 'react';
import WrongParty from './WrongParty';
import Crush from './Crush';
import axios from 'axios';

class VerifyParty extends Component {
  state = {
    varified: false,
    exist: null,
  }

  async componentDidMount () {
    const { pathname } = this.props.location
    console.log('here is pathname in VerifyParty', pathname)
    const { data: { exist } } = await axios.post(`${process.env.REACT_APP_REST_SERVER_URL}/api/verify`, {
      roomId: pathname.substring(1, pathname.length),
    });
    console.log('here is exist', exist)
    if (exist) {
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

export default VerifyParty
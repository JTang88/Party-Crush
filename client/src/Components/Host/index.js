import React, { Component } from 'react';
import { inject, observer } from 'mobx-react'; 
import axios from 'axios';
import { Typography, TextField, Button } from '@material-ui/core';
import './index.css';

@inject('CurrentUserStore')
@observer

class Host extends Component {
  state = {
    numberOfParticipants: '',
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleStart = async () => {
    const { history } = this.props;
    const { data: { roomId } }  = await axios.post(`${process.env.REACT_APP_REST_SERVER_URL}/api/new-room`, {
      numberOfParticipants: this.state.numberOfParticipants
    });
    sessionStorage.setItem('currentUserIsHost', 'true')
    history.push(`/${roomId}`)
  }

  render() {
    console.log('here is props in Host', this.props)
    return (
      <div className="host-container">
        <div className="host-text-wrap">
          <Typography
            color="inherit"
            variant="display1"
            align="center"
            gutterBottom
          >
            Starting a new party crush game?
          </Typography>
          <Typography
            color="inherit"
            variant="body1"
            align="center"
            gutterBottom
          >
            please insert the number of party participants below to start
          </Typography>
          <TextField
            id="numberOfParticipants"
            label="Number of Participants"
            name="numberOfParticipants"
            color="inherit"
            value={this.state.numberOfParticipants}
            onChange={this.handleChange}
            margin="normal"
          />
          <div>
            <Button
              variant="contained"
              color="secondary"
              onClick={this.handleStart}
            >
              Start
            </Button>
          </div>
        </div>
      </div>
    )
  }
}

export default Host


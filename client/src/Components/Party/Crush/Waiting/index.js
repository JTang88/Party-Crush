import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { Typography, CircularProgress, withStyles } from '@material-ui/core';
import './index.css';

const styles = {
  root: {
    marginTop: 30,
  }
}

@inject('RoomStore')
@observer

class Waiting extends Component {
  render() {
    const {
      RoomStore: { participantsToCome },
      classes: { root }
    } = this.props;

    return (
      <div className='waiting-container'>
        <Typography
          variant='title'
          color='inherit'
          align='center'
        >
          {`Waiting for ${participantsToCome} more participants to arrive!`}
        </Typography>
        <CircularProgress className={root} color='secondary' />
      </div>
    )
  }
}

export default withStyles(styles)(Waiting)

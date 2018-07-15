import React, { Component } from 'react';
import { Typography, withStyles } from '@material-ui/core';
import { inject, observer } from 'mobx-react';
import { toJS } from 'mobx';
import './index.css';

const styles = {
  sub: {
    width: 250,
    margin: 'auto'
  }
}

@inject('RoomStore')
@observer

class ChooseCrush extends Component {
  render () {
    const { classes: { sub } } = this.props;
    const { details: { participants } } = this.props.RoomStore
    console.log('here is participants', toJS(participants))
    return (
      <div className='choose-crush-container' >
        <Typography
          className={sub}
          variant='title'
          color='inherit'
          align='center'
        >
          Now, let us know who you have a crush on,
          we won't tell unless he or she likes you too!
        </Typography>
        {
          participants.map(participant => 
            <div>
              {participant.name}
              <img className='photo' src={participant.picture.data.url} alt="photo" />
            </div>
          )
        }
      </div>
    )
  }
}
  

export default  withStyles(styles)(ChooseCrush)
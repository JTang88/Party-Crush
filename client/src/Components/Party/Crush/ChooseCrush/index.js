import React, { Component } from 'react';
import { Typography, withStyles, Paper, Button } from '@material-ui/core';
import { inject, observer } from 'mobx-react';
import { toJS } from 'mobx';
import './index.css';

const styles = {
  sub: {
    width: 250,
    margin: 'auto'
  },
  paper: {
    width: 210,
    minHeight: 250,
    padding: '15px 0px 15px 0px',
    margin: '50px auto 50px auto',
    textAlign: 'center',
  }
}

@inject('RoomStore')
@observer

class ChooseCrush extends Component {
  render () {
    const { classes: { sub, paper } } = this.props;
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
            <Paper className={paper}>
              <Typography
                variant='title'
                color='primary'
                gutterBottom
              >
                {participant.name}
              </Typography>
              <div>
                <img className='photo' src={participant.picture.data.url} alt={`${participant.name}'s profile`} />
              </div>
              <Button
                variant='contained'
                color='primary'
              >
               Crush
              </Button>
            </Paper>
          )
        }
      </div>
    )
  }
}
  

export default  withStyles(styles)(ChooseCrush)
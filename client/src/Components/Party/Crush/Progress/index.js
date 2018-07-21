import React, { Component } from 'react'
import { inject, observer } from 'mobx-react';
import { withStyles, Paper, Typography, Grid, CircularProgress, Icon } from '@material-ui/core';
import { toJS } from 'mobx';
import matchChose from '../../../../lib/matchChose';
import AllSetAnimation from './AllSetAnimation';
import './index.css';

const styles = {
  title: {
    width: 250,
    margin: 'auto'
  },
  sub: {
    position: 'absolute',
    bottom: 15,
    width: 130,
    transform: 'translate(0, 10%)'
  },
  paper: {
    position: 'relative',
    width: 250,
    maxHeight: 60,
    padding: '5px 5px 5px 10px',
    margin: '50px auto 50px auto',
  },
  circle: {
    margin: '7px 0 0 10px',
  },
  icon: {
    fontSize: 50,
    margin: 'auto',
    color: '#2ed573'
  }
}

@inject('RoomStore')
@observer

class Progress extends Component {
  render () {
    console.log('here is what RoomStore.details now look like', toJS(this.props.RoomStore.details));
    const { toggleAnimationRan, classes: { title, paper, circle, icon, sub }, RoomStore: { allhaveChosenCrush, details: { participants, matches } } } = this.props
    return (
      <div className='progress-container'>
        <Typography
          className={title}
          variant='title'
          color='inherit'
          align='center'
        >
          Almost there!, we are just waiting for other party crushers to decide on their crush!
        </Typography>
        {
          participants.map(participant =>
            <Paper key={participant.id} className={paper}>
              <Grid container>
                <Grid item sm={3}>
                  <img className='progress-photo' src={participant.picture.data.url} alt={`${participant.name}'s profile`} />
                </Grid>
                <Grid item sm={6}>
                  <Typography
                    className={sub}
                    variant='body2'
                    color='primary'
                    paragraph={false}
                  > 
                    {
                      matchChose(matches, participant.id) ? 
                        `${participant.name.substring(0, participant.name.indexOf(' '))} has found a crush` :
                        `${participant.name.substring(0, participant.name.indexOf(' '))} is deciding...`
                    }
                  </Typography>
                </Grid>
                <Grid item sm={3}>
                  {
                    matchChose(matches, participant.id) ? 
                      <Icon color='primary' className={icon}>done</Icon> :
                      <CircularProgress className={circle} color='primary' />
                  }
                </Grid>
              </Grid>
            </Paper>
          )
        }
        {
          allhaveChosenCrush? 
            <AllSetAnimation toggleAnimationRan={toggleAnimationRan}/> :
            null
         }
      </div>
    )
  }
}

export default withStyles(styles)(Progress);
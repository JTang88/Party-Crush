import React, { Component } from 'react';
import { withStyles, Typography } from '@material-ui/core'
import { inject, observer } from 'mobx-react';
import getMatches from '../../../../lib/getMatches';
import getParticipantById from '../../../../lib/getParticipantById';
import './index.css';

const styles = {
  sub: {
    width: 200,
    margin: 'auto'
  }
}

@inject('RoomStore')
@observer

class Result extends Component {
  state = {
    getMatches: getMatches(this.props.RoomStore.details.matches)
  }

  render () {
    const { details: { participants } } = this.props.RoomStore
    return (
      <div className='result-container' >
        <Typography variant='display3' color='inherit' align='center' >
          Congrats!
        </Typography>
        {
          this.state.getMatches.length === 0 ? 
            <Typography variant='title' color='inherit' align='center' className={this.props.classes.sub}>
              No one likes each other at this party...
            </Typography> :
            this.state.getMatches.map((match, i) => {
              let m1;
              let m2;
              for (let x in match) {
                m1 = getParticipantById(x, participants)
                m2 = getParticipantById(match[x], participants)
              }
              return (
                <div className='heart' key={Object.keys(this.state.getMatches)[i]} >
                  <div className='matched-1-wrap'>
                    <img className='matched-photo' src={m1.picture.data.url} alt={`${m1.name}'s profile`} />
                    <Typography variant='body2' color='inherit'>
                      {m1.name.substring(0, m1.name.indexOf(' '))}
                    </Typography>
                  </div>
                  <div className='clearfix' />
                  <div className='matched-2-wrap'>
                    <img className='matched-photo' src={m2.picture.data.url} alt={`${m2.name}'s profile`} />
                    <Typography variant='body2' color='inherit'>
                      {m2.name.substring(0, m2.name.indexOf(' '))}
                    </Typography>
                  </div>
                  <div className='clearfix' />
                </div>
              )
            })
          }
          {
            this.state.getMatches.length === 0 ? null :
            <Typography variant='title' color='inherit' align='center' className={this.props.classes.sub}>
              for having a crush on each other
            </Typography>
          }
        </div>
 
    )
  }
}

export default withStyles(styles)(Result);
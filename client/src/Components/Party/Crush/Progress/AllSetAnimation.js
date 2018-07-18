import React, { Component } from 'react'
import { withStyles, Typography } from '@material-ui/core';
import { inject, observer } from 'mobx-react';
import './index.css';

const styles = {
  animation: {
    opacity: 1,
    animationName: 'fadeInOpacity',
    animationIterationCount: 1,
    animationTimingFunction: 'ease-in',
    animationDuration: '1s',
  } 
}

@inject('RoomStore')
@observer

class AllSetAnimation extends Component {
  componentDidMount () {
    setTimeout(() => this.props.RoomStore.toggleAnimationRan(), 1670)
  }

  render () {
    return (
      <Typography className={this.props.classes.animation} color='secondary' variant='display2' align='center'>
        All set!
      </Typography>
    )
  }
}

export default withStyles(styles)(AllSetAnimation);


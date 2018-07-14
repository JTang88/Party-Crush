import React from 'react';
import FacebookLogin from 'react-facebook-login'
import { observer, inject } from 'mobx-react';
import { Typography, Paper, withStyles } from '@material-ui/core';
import './index.css'

const styles = {
  paperRoot: {
    width: 300,
    height: 300,
    borderRadius: 20,
    padding: '60px 40px 0px 40px',
    margin: 'auto',
  },
}

const Login = ({ CurrentUserStore, history, location, classes: { paperRoot } }) => {

  const componentClicked = async (e) => {
    await localStorage.setItem('authenticated', 'true')
    if (location.from) {
      history.push(`${location.from}`);
    } else {
      history.push('/');
    }
  };

  const responseFacebook = async (response) => {
    CurrentUserStore.currentUserDetails = response;
  }

  console.log('here is history in Login', history)
  return (
    <div className="login-container">
      <Typography
        variant='display4'
        color="inherit"
      >
        PARTY
      </Typography>
      <Typography
        variant='display4'
        color="inherit"
        gutterBottom
      >
        CRUSH
      </Typography>
      <Paper className={paperRoot} >
        <Typography
          variant='title'
          color="primary"
          gutterBottom
        >
          Welcome to Party Crush!
        </Typography>
        <div className="face-login-wrap">
          <FacebookLogin
            appId="237618007038254"
            fields="name,email,picture"
            onClick={componentClicked}
            callback={responseFacebook}
          />
        </div>
        <Typography
          variant='body2'
          color="primary"
          gutterBottom
        >
          * Log in with facebook to continue
        </Typography>
      </Paper>
    </div>
  )
};


const LoginWithStyles = withStyles(styles)(Login);

export default inject('CurrentUserStore')(observer(LoginWithStyles))

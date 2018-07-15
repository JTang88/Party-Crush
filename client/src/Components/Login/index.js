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

const Login = ({ CurrentUserStore: { setCurrentUserDetails }, history, location, classes: { paperRoot } }) => {

  const responseFacebook = async (response) => {
    await setCurrentUserDetails(response);
    await sessionStorage.setItem('authenticated', 'true')
    if (location.from) {
      history.push(`${location.from}`);
    } else {
      history.push('/');
    }
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
            fields="name,email,picture.width(150).height(150)"
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

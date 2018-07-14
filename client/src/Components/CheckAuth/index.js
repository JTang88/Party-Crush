import React from 'react'; 
import { Redirect } from 'react-router-dom';

const CheckAuth = ({ component: Component, ...props }) => 
  sessionStorage.getItem('authenticated') === 'true' ? 
    <Component {...props} /> : 
    <Redirect 
      to={{
        pathname: '/login',
        from: props.location.pathname
      }}
    />
 

export default CheckAuth;
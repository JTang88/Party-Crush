import React from 'react'; 
import { Redirect } from 'react-router-dom';

const CheckAuth = ({ component: Component, ...props }) => 
  localStorage.getItem('authenticated') === 'true' ? 
    <Component {...props} /> : 
    <Redirect 
      to={{
        pathname: '/login',
        from: props.location.pathname
      }}
    />


// const CheckAuth = ({ component: Component, ...props }) => {
//   console.log('here is props.history', props.location)
//   return localStorage.getItem('authenticated') === 'true' ?
//     <Component {...props} /> :
//     <Redirect
//       to={{
//         pathname: '/login',
//         from: props.location.pathname
//       }}
//     />
 
// }
 

export default CheckAuth;
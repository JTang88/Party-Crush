import React from 'react';
import { Switch, Route } from 'react-router-dom';
import CheckAuth from '../CheckAuth';
import Login from '../Login';
import Host from '../Host';
import VerifyParty from '../VerifyParty'

const App = () =>
  <div>
    <Switch>
      <Route path="/login" component={Login} />
      <Route exact path='/' component={(props) => (
        <CheckAuth component={Host} {...props} />
      )} />
      <Route path='/:roomId' component={(props) => (
        <CheckAuth component={VerifyParty} {...props} />
      )} />
    </Switch>
  </div>


export default App;

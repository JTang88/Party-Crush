import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'mobx-react';
import { MuiThemeProvider } from '@material-ui/core/styles';

import './index.css';
import App from './Components/App';
import theme from './theme';
import RoomStore from './stores/room';
import CurrentUserStore from './stores/currentUser';
import registerServiceWorker from './registerServiceWorker';

console.log('here is CUrrentUserStore before provider', CurrentUserStore)

ReactDOM.render((
  <BrowserRouter>
    <MuiThemeProvider theme={theme}>
      <Provider
        RoomStore={RoomStore}
        CurrentUserStore={CurrentUserStore}
      >
        <App />
      </Provider>
    </MuiThemeProvider>
  </BrowserRouter>
), document.getElementById('root'));
registerServiceWorker();


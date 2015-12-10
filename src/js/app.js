import 'babel/polyfill';

import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import { Route } from 'react-router';
import history from './utilites/history';
import { RelayRouter } from 'react-router-relay';

ReactDOM.render((
  <RelayRouter history={history}>
    <Route path="/" component={App}>
      
    </Route>
  </RelayRouter>
), document.getElementById('root'));

import 'babel/polyfill';
import '../scss/app.scss';

import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import Landing from './components/Landing';
import { Route, IndexRoute } from 'react-router';
import history from './utilities/history';
import { RelayRouter } from 'react-router-relay';

ReactDOM.render((
  <RelayRouter history={history}>
    <Route path="/" component={App}>
      <IndexRoute component={Landing} />
    </Route>
  </RelayRouter>
), document.getElementById('root'));

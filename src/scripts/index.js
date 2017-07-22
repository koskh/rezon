import React from 'react';
import ReactDOM from 'react-dom';


import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';

import { Switch, Route } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import { ConnectedRouter, routerReducer, routerMiddleware } from 'react-router-redux';

import Reducers from './store/reducers';

import 'bootstrap/dist/css/bootstrap.css';
import '../styles/global.pcss';

import DefaultLayout from './layouts/Default';
import LoginLayout from './layouts/Login';

const history = createHistory();
const middleware = routerMiddleware(history);

const store = createStore(
    combineReducers({
        ...Reducers,
        router: routerReducer
    }),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    applyMiddleware(middleware)
);

ReactDOM.render(
  <Provider store={store}>
    {/* ConnectedRouter will use the store from Provider automatically */}
    <ConnectedRouter history={history}>
      <Switch>
        <Route path="/login" component={LoginLayout} />
        <Route path="/" component={DefaultLayout} />
      </Switch>
    </ConnectedRouter>
  </Provider>,
    document.getElementById('root')
);

// require('es6-promise').polyfill();

import React from 'react';
import ReactDOM from 'react-dom';


import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { Provider } from 'react-redux';


import { Switch, Route } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import { ConnectedRouter, routerReducer, routerMiddleware } from 'react-router-redux';

import 'bootstrap/dist/css/bootstrap.css';
import '../styles/global.pcss';

import Reducers from './store/reducers';

import DefaultLayout from './layouts/Default';
import LoginLayout from './layouts/Login';

const history = createHistory();
const routerMiiddleware = routerMiddleware(history);

const store = createStore(
    combineReducers({
        ...Reducers,
        router: routerReducer
    }),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    applyMiddleware(routerMiiddleware, thunkMiddleware)
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

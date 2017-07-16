// @flow

import 'bootstrap/dist/css/bootstrap.css';

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route, IndexRoute, browserHistory } from 'react-router';

import DefaultLayout from './layouts/Default';
import LoginLayout from './layouts/Login';

import Home from './features/Home';
import Login from './features/Login';
import NotFound from './features/NotFound';
import FormSample from './features/FormValidationSample';


ReactDOM.render(
  <Router history={browserHistory}>
    <Route path="/" component={DefaultLayout}>
      <IndexRoute component={Home} />
      <Route path="home" component={Home} />
      <Route path="form-sample" component={FormSample} />
      <Route path="404" component={NotFound} />
    </Route>
  </Router>
    , document.getElementById('root'));


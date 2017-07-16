import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.css';
import '../styles/global.pcss';

import DefaultLayout from './layouts/Default';
import LoginLayout from './layouts/Login';


ReactDOM.render(
  <BrowserRouter >
    <main>
      <Switch>
        <Route path="/login" component={LoginLayout} />
        <Route path="/" component={DefaultLayout} />
      </Switch>
    </main>
  </BrowserRouter>
    , document.getElementById('root'));


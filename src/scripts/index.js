// @flow

import 'bootstrap/dist/css/bootstrap.css';

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import Home from './features/Home';
import Login from './features/Login';
import NotFound from './features/NotFound';
import FormSample from './features/FormValidationSample';


// import Dump from './components/Dump';

// const hello = <div className="box"><span className="span-class">Responsive</span><b>Hello</b> world !!!</div>;


// class App extends Component {
//
//     // constructor(props) {
//     //     super(props);
//     //     // (this: any).onBtnClick = this.onBtnClick.bind(this);
//     //     // (this: any).onFormChange = this.onFormChange.bind(this);
//     // }
//
//
//     render() {
//         return (
//           <div className="container">
//             <div className="header">
//                     footer
//                 </div>
//             <div className="body">
//                     child
//                 </div>
//             <div className="footer">
//                     footer
//                 </div>
//           </div>
//         );
//     }
// }

ReactDOM.render(
  <Router history={browserHistory} >
      <Route path="/" component={}
  </Router>
, document.getElementById('root'));

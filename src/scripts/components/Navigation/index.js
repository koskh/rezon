// @Flow
import React from 'react';
import { NavLink } from 'react-router-dom';
// import cn from 'classnames';

import style from './index.pcss';

const Navigation = ({ match }) =>  (
  <nav className={`nav bg-faded ${style['nav-custom']}`}>
    <NavLink to={`${match.url}home`} className="nav-link">Home</NavLink>
    <NavLink to={`${match.url}form-sample`} className="nav-link">Form sample</NavLink>
    <NavLink to={`${match.url}login`} className="nav-link">Login</NavLink>
  </nav>
);

export default Navigation;

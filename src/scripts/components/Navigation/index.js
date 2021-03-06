// @Flow
import * as React from 'react';
import { NavLink } from 'react-router-dom';
// import cn from 'classnames';

import DropDown from '../Dropdown';

// import style from './index.pcss';

const Navigation = ({ match }) => (
    <nav className={'nav bg-light '}>
        <NavLink to={`${match.url}home`} className="nav-link">Home</NavLink>
        <NavLink to={`${match.url}form-sample`} className="nav-link">Form sample</NavLink>
        <NavLink to={`${match.url}redux`} className="nav-link">DumpRedux</NavLink>
        <NavLink to={`${match.url}samples`} className="nav-link">Sample components</NavLink>

        <NavLink to={`${match.url}login`} className="nav-link">Login</NavLink>
        <DropDown title="User name" className="btn-link" />

    </nav>
);

export default Navigation;

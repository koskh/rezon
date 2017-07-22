import React, {Component} from 'react';

// import {createStore, combineReducers} from 'redux';

import {Provider, connect} from 'react-redux';

// import dumpReducer from './store/reducer';

// import * as types from './store/constants';

import reset from './store/actions/reset';
import fetch from './store/actions/fetch';


// const reducers = {dumpReduxComponent: dumpReducer};
//
// const reducer = combineReducers(reducers);
//
// const store = createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());


// const unsubscribe = store.subscribe(() =>
//     console.log(store.getState())
// );

// store.dispatch(fetchAction());
// store.dispatch(resetAction());

class List extends React.Component {

    render() {
        return (
            <div>
                List component >>>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {dumpReduxComponent: state.dumpReduxComponent, route: state.route};
}

List = connect(mapStateToProps, {fetch, reset})(List);

export default class extends React.Component {

    render() {
        return (
            <div>
                <h3>redux here >>></h3>
                <List/>
            </div>
        );
    }
}

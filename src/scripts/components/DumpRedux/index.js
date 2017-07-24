import React, { Component } from 'react';

// import {createStore, combineReducers} from 'redux';

import { Provider, connect } from 'react-redux';

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

class DumpRedux extends React.Component {

    componentDidMount() {
        this.props.fetch();
        // debugger;
    }


    render() {
        console.log()
        return (
          <div>
            <h3>redux here >>></h3>
          </div>
        );
    }
}

function mapStateToProps(state) {
    return { dumpReduxComponent: state.dumpReduxComponent, router: state.router };
}

export default connect(mapStateToProps, { fetch })(DumpRedux);

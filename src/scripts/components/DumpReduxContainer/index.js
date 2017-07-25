// @flow

import { connect } from 'react-redux';

// import reset from './store/actions/reset';
import fetch from './store/actions/fetch';

import Componnent from './_components';

function mapStateToProps({dumpReduxComponent, router}: State) {
    return { dumpReduxComponent, router};
}

export default connect(mapStateToProps, { fetch, sd: 'sds' })(Componnent);

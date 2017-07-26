// @flow

import { connect } from 'react-redux';

// import reset from './store/actions/reset';
// import fetch from './store/actions/fetch';
import { makeFetch, cancelFetch} from './store/actions/fetch';

import Componnent from './_components';

function mapStateToProps({dumpReduxComponent, router}: State) {
    return { dumpReduxComponent, router};
}

export default connect(mapStateToProps, { makeFetch, cancelFetch })(Componnent);

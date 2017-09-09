// @flow
import { connect } from 'react-redux';

import { makeFetch, cancelFetch} from './store/actions/fetch';

import Component from './_components';

function mapStateToProps({dumpReduxComponent, router}: State) {
    return { dumpReduxComponent, router};
}

export default connect(mapStateToProps, { makeFetch, cancelFetch })(Component);

// @flow
import _ from 'lodash';
import React from 'react';

import axios from 'axios';

import PendingIndicator from '../../PendingIndicator';

type Props = {
    makeFetch: Function,
    cancelFetch: Function,
    dumpReduxComponent: {
        isFetching: boolean,
        data?: any,
        error?: any
    }
    // children?: React.Children
}
//
// type DefaultProps = {
//     data: Object
// };

class DumpReduxComponent extends React.Component {
    props: Props;

    // static defaultProps: DefaultProps = {
    //     data: {}
    // };

    componentDidMount() {
        this.props.makeFetch();

        // setTimeout(() =>{
        //     this.props.cancelFetch();
        // }, 2750);
    }

    componentWillUnmount() {
        this.props.cancelFetch();
    }


    render() {
        const { data, isFetching, error} = this.props.dumpReduxComponent;

        return (
          <section className="row">
            <PendingIndicator pending={isFetching} message={error && error.message}>
                Загруженна информация: {data && data.test1 && _.join(data.test1)}
            </PendingIndicator>
          </section>
        );
    }
}

export default DumpReduxComponent;

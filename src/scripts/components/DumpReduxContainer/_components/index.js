// @flow
import _ from 'lodash';
import React from 'react';

import PendingIndicator from '../../PendingIndicator';

type Props = {
    fetch: Function,
    dumpReduxComponent: {
        isFetching: boolean,
        data?: any
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
        this.props.fetch();
        // debugger;
    }

    componentWillUnmount() {

    }


    render() {
        const { data, isFetching } = this.props.dumpReduxComponent;

        return (
          <section className="row">
            <PendingIndicator pending={isFetching}>
                Загруженна информация:<br />
              {data && data.test1 && _.join(data.test1)}
            </PendingIndicator>
          </section>
        );
    }
}

export default DumpReduxComponent;

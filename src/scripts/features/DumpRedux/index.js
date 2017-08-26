import * as React from 'react';
// import Header from '../../components/page-header';

import DumpReduxContainer from '../../components/DumpReduxContainer';

export default class Home extends React.Component {
    componentWillMount() {
        document.title = 'DumpRedux· компонент';
    }

    render() {
        return (
            <article>
                <h1>DumpRedux страница приложения</h1>
                <DumpReduxContainer />
            </article>
        );
    }
}

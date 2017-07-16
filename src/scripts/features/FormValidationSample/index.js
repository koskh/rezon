import React from 'react';
// import Header from '../../components/page-header';

export default class Home extends React.Component {
    componentWillMount() {
        document.title = 'FormValidationSample · Пример валидационной формы';
    }

    render() {
        return (
            <article>
                <h1>FormValidationSample · Пример валидационной формы</h1>
                <p>FormValidationSample · Пример валидационной формы</p>
            </article>
        );
    }
}

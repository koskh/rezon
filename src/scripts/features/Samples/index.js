// @flow
import React from 'react';


import PendingIndicator from '../../components/PendingIndicator';

export default class Home extends React.Component {
    componentWillMount() {
        document.title = 'Sample components';
    }

    render() {
        return (
          <article>
            <h1>Примеры компонентов</h1>
            <div className="row">
              <div className="col-2"> Идикатор загрузки</div>
              <div className="col-5"><PendingIndicator pending /></div>
              <div className="col-5"><PendingIndicator pending={false} /> fetching is done.</div>
            </div>
          </article>
        );
    }
}

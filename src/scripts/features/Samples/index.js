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
              <div className="col-3"><PendingIndicator pending /></div>
              <div className="col-3"><PendingIndicator pending={false}>Fetching is done.</PendingIndicator></div>
              <div className="col-3"><PendingIndicator pending={false} errorMessage="Ошибка получения данных">Fetching is done.</PendingIndicator></div>
            </div>
              <div className="row">
                  <div className="col-2"> Идикатор загрузки в действии</div>
                  <div className="col-3"><PendingIndicator pending /></div>
              </div>
          </article>
        );
    }
}

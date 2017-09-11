// import history from 'history';
// import errors from '../constants/errors';
// import getErrorType from '../utilities/get-error-type';
//
// const errorMessages = {
//     NETWORK_ERROR: 'Отсутствует подключение к сети',
//     NOT_FOUND: 'Запрашиваемый ресурс отсутствует на сервере'
// };
//

import * as React from 'react';
import ReactDOM from 'react-dom';
import InernalServerError from '../components/500';

import history from './history';

const statuses = {
    badRequest: 400,
    unauthorized: 401,
    forbidden: 403,
    notFound: 404,
    requestTimeout: 408,
    internalServerError: 500,
    badGateway: 503
};

export default {
    failure(error) {
        if (error.response) {
            if (error.response.status === statuses.notFound)
                history.push('/404');

            if (error.response.status === statuses.unauthorized)
                history.push(`/login?return=${window.location.pathname}`);

            if (error.response.status === statuses.badRequest)
                return Promise.reject(error.response);

            if (error.response.status === statuses.internalServerError) {
                // // модальн окно с "500" само добавляется в body
                // const div = document.createElement('div');
                // div.className = 'internal-server-error';
                // const element = document.body.insertBefore(div, document.body.firstChild);
                // ReactDOM.render(<InernalServerError container={div} />, element);

                // модальное окно с 500 добавляется в предопределенное место
                const container = document.getElementById('internal-server-error');
                ReactDOM.render(<InernalServerError container={container} />, container);
            }

        }

        return Promise.reject(error);
    }
};


// export default { requests, response};

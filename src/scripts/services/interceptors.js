// import history from 'history';
// import errors from '../constants/errors';
// import getErrorType from '../utilities/get-error-type';
//
// const errorMessages = {
//     NETWORK_ERROR: 'Отсутствует подключение к сети',
//     NOT_FOUND: 'Запрашиваемый ресурс отсутствует на сервере'
// };
//

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
        }

        return Promise.reject(error);
    }
};


// export default { requests, response};

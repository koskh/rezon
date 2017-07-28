// import history from 'history';
// import errors from '../constants/errors';
// import getErrorType from '../utilities/get-error-type';
//
// const errorMessages = {
//     NETWORK_ERROR: 'Отсутствует подключение к сети',
//     NOT_FOUND: 'Запрашиваемый ресурс отсутствует на сервере'
// };
//

import history from './createHistory';

export default {
    failure(error) {
        // debugger;
        history.push('samples');
        // debugger;
        // if (error.response) {
            // if (error.response.status === 400) {
            //     history.push('/')
        //         history.push(`/login?return=${window.location.pathname}`);
        //     }
        //
        //     let name = error.response.statusText;
        //
        //     if (error.message === 'Network Error') {
        //         name = error.message;
        //     }
        //
        //     const type = getErrorType(name);
        //     const message = error.response.data;
        //
        //     return Promise.reject({ name, type, message: message.length ? message : (errorMessages[type] || '') });
        // }

        return Promise.reject(error);
    }
};


// export default { requests, response};

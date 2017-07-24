// @flow
import axios from 'axios';
import urls from './urls';

const http = axios.create({
    headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'Cache-control': 'no-cache',
        'If-Modified-Since': 'Mon, 26 Jul 1997 05:00:00 GMT',
        Pragma: 'no-cache'
    },
    timeout: 60000,
    withCredentials: true
});

// http.interceptors.response.use(undefined, response.failure);

// export const auth = {
//     login(user) {
//         return http.post(urls.request('auth/login'), user);
//     },
//
//     fetchPhone(login) {
//         return http.get(urls.request('auth/phone', login));
//     },
//
//     fetchCode(login) {
//         return http.post(urls.request('auth/code'), { login });
//     },
//
//     confirmCode({ login, code }) {
//         return http.post(urls.request('auth/code/confirm'), { login, code });
//     },
//
//     createPassword({ login, code, password }) {
//         return http.post(urls.request('auth/password'), { login, code, password });
//     }
// };

export const common = {
    references() {
        return http.get(urls('references'));
    }
}

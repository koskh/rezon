import config from './config';

//eslint-disable-next-line
const modifier = require(`./${PROJECT_ENV}.json`);


export default { ...config, ...modifier };

// export default {
//     serverApi: 'http://localhost:3000',
//     localStorageTokenKey: 'some.token',
//     tokenLifetimeSeconds: 600
// };

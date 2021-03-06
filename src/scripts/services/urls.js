// @flow
import invariant from 'invariant';
import config from '../../config';

const apiPatch: string = `${config.serverApi}/api`;

const urls: {[key: string]: any} = {
    references: () => `${apiPatch}/references`,
    references2: userId => `${apiPatch}/references2/${userId}`,

    'auth/login': () => `${apiPatch}/auth/login`,
    'utils/random': (min, max) => `${apiPatch}/utils/random/${min}/${max}`,

};

export default (name: string, ...args?: Array<any>): string => {
    invariant(urls[name], 'The name url must be in urls[]');
    return urls[name](...args);
};

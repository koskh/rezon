// @flow
import config from '../../config';

const apiPatch: string = `${config.serverApi}/api`;

const urls: {[key: string]: any} = {
    references: () => `${apiPatch}/references`
};

export default (name: string, ...args?: Array<any>): string => urls[name] ? urls[name].apply(undefined, args) : '';

// @flow
import _ from 'lodash';

import { FETCH_REQUEST, FETCH_SUCCESS, FETCH_FAILURE, FETCH_CANCEL } from '../constants';
import { createAction } from '../../../../store/utilities';

import { utils } from '../../../../services/api';

export const request: ThunkAction = createAction(FETCH_REQUEST);
export const success: ThunkAction = createAction(FETCH_SUCCESS);
export const failure: ThunkAction = createAction(FETCH_FAILURE);
// export const cancel: ThunkAction = createAction(FETCH_CANCEL);


const Requests: Array<AjaxRequest> = [];

export function makeFetch({ min, max }: {[filed: string]: any}): Function {
    return async (dispatch: Dispatch): Promise<any> => {
        dispatch(request({ error: null, errors: null }));

        try {
            const request1 = utils.random({ min, max });
            Requests.push(request1);
            const response = await request1.promise;
            dispatch(success({ ...response.data }));
        } catch (response) {
            dispatch(failure({ ...response.data }));
        }
    };
}


export function cancelFetch() {
    return () => {
        _.each(Requests, req => {
            req.cancel('Operation canceled by the user.');
        });
    };
}

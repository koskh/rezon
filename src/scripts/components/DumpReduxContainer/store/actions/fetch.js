// @flow
import _ from 'lodash';

import { FETCH_REQUEST, FETCH_SUCCESS, FETCH_FAILURE, FETCH_CANCEL } from '../constants';
import { createAction } from '../../../../store/utilities';

import { common } from '../../../../services/api';

export const request: ThunkAction = createAction(FETCH_REQUEST);
export const success: ThunkAction = createAction(FETCH_SUCCESS);
export const failure: ThunkAction = createAction(FETCH_FAILURE);
// export const cancel: ThunkAction = createAction(FETCH_CANCEL);


const Requests: Array<AjaxRequest> = [];

export function makeFetch(): Function {
    return async (dispatch: Dispatch): Promise<any> => {
        dispatch(request({ error: null }));

        try {
            // // паралельн загрузк
            // const request1 = common.references();
            // const request2 = common.references2({ userId: 123, method: 'get'});
            //
            // Requests.push(request1);
            // const response1 = await request1.promise;
            //
            // Requests.push(request2);
            // const response2 = await request2.promise;

            // последовательн загрузка
            const request1 = common.references();
            Requests.push(request1);
            const response1 = await request1.promise;

            const request2 = common.references2({ userId: 123, method: 'post', data: response1.data });
            Requests.push(request2);
            const response2 = await request2.promise;

            const response = { ...response1.data, ...response2.data };
            // console.log(response);

            dispatch(success({ data: response }));
        } catch (error) {
            dispatch(failure({ error }));
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

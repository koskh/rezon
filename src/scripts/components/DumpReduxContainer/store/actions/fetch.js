// @flow
import { FETCH_REQUEST, FETCH_SUCCESS, FETCH_FAILURE, FETCH_CANCEL } from '../constants';
import { createAction } from '../../../../store/utilities';

import { common } from '../../../../services/api';

export const request: ThunkAction = createAction(FETCH_REQUEST);
export const success: ThunkAction = createAction(FETCH_SUCCESS);
export const failure: ThunkAction = createAction(FETCH_FAILURE);
// export const cancel: ThunkAction = createAction(FETCH_CANCEL);


let Request: AjaxRequest;

export function makeFetch(): Function {
    Request = common.references();

    return async (dispatch: Dispatch): Promise<any> => {
        dispatch(request({ error: null }));

        try {
            const response = await Request.promise;
            dispatch(success({ data: response.data }));
        } catch (error) {
            dispatch(failure({ error }));
        }
    };
}


// export default (): Function => {
//     Request = common.references();
//
//     return (dispatch): Promise<Any> => {
//         dispatch(request());
//
//         return Request.promise
//             .then(
//                 response => { console.log('response: ', response); dispatch(success({ data: response.data })); },
//                 error => {console.log('error: ', error); dispatch(failure(error)); }
//             )};
// };
//
export function cancelFetch() {
    return () => {
        Request.cancel('Operation canceled by the user.');
        // dispatch(cancel());
    };
}

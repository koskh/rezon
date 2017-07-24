// @flow
import { FETCH_REQUEST, FETCH_SUCCESS, FETCH_FAILURE } from '../constants';
import { createAction } from '../../../../store/utilities';

import { common } from '../../../../services/api';

export const request: ThunkAction = createAction(FETCH_REQUEST);
export const success: ThunkAction = createAction(FETCH_SUCCESS);
export const failure: ThunkAction = createAction(FETCH_FAILURE);


// export default (): Function => {
//     return (dispatch, getState): Promise<Any> => {
//         dispatch(request());
//         return common.references()
//             .then(
//                 response => { console.log('response: ', response); dispatch(success({ data: response.data })); },
//                 error => dispatch(failure(error)));
//     };
// };

export default function (): Function {
    return async (dispatch: Dispatch): Promise<any> => {
        dispatch(request());
        try {
            const response = await common.references();
            dispatch(success({ data: response.data }));
        } catch (error) {
            dispatch(failure({ error }));
        }
    };
}

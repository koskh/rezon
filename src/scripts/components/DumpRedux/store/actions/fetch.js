import { FETCH_REQUEST, FETCH_SUCCESS, FETCH_FAILURE } from '../constants';
import { createAction } from '../../../../store/utilities';

import { common } from '../../../../services/api';

export const request = createAction(FETCH_REQUEST);
export const success = createAction(FETCH_SUCCESS);
export const failure = createAction(FETCH_FAILURE);


export default () => {
    return (dispatch, getState) => {
        dispatch(request());
        return common.references()
            .then(
                response => { console.log('response: ', response); dispatch(success({ data: response.data })); },
                error => dispatch(failure(error)));
    };
};

// export default function () {
//     return async (dispatch, getState) => {
//         dispatch(request());
//
//         try {
//             const response = await common.references();
//             dispatch(success({ data: response.data }));
//         } catch (error) {
//             dispatch(failure({ error }));
//         }
//     };
// }

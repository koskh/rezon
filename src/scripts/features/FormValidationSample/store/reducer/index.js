// @flow
import * as types from '../constants';
import { createReducer, nextState } from '../../../../store/utilities';


export type ComponentReduxState = { //
    data: any,
    error: any,
    errors: any,
    meta: any,
    isPending: boolean,
    isUpdated: boolean
}

const initialState: ComponentReduxState = {
    data: null,
    error: null,
    errors: null,
    meta: null,
    isPending: false,
    isUpdated: false
};

export const actions: ReducerActions = {
    [types.FETCH_REQUEST]: (state, { payload }) => nextState(state, { isPending: true, isUpdated: false, ...payload }),
    //
    [types.FETCH_SUCCESS]: (state, { payload }) => nextState(state, { isPending: false, isUpdated: true, ...payload }),
    //
    [types.FETCH_FAILURE]: (state, { payload }) => nextState(state, { isPending: false, isUpdated: false, ...payload }),

    [types.FETCH_CANCEL]: state => nextState(state, { isPending: false }),

    // [types.UPDATE_REQUEST]: (state, { payload }) => nextState(state, { isUpdating: true, ...payload }),
    //
    // [types.UPDATE_SUCCESS]: state => nextState(state, { isUpdating: false }),
    //
    // [types.UPDATE_FAILURE]: (state, { error }) => nextState(state, { isUpdating: false, errors: { ...state.errors, updating: error.message } }),

    // [types.RESET]: () => ({ ...initialState })
};

export default createReducer(initialState, actions);

// @flow
import * as types from '../constants';
import { createReducer, nextState } from '../../../../store/utilities';


const initialState: State = {
    id: null,
    isFetching: false,
    isUpdating: false
};

export const actions: ReducerActions = {
    [types.FETCH_REQUEST]: state => nextState(state, { isFetching: true }),
    //
    [types.FETCH_SUCCESS]: (state, { payload }) =>  nextState(state, { isFetching: false, data: payload.data }),
    //
    [types.FETCH_FAILURE]: (state, { payload }) => nextState(state, { isFetching: false, ...payload}),

    // [types.UPDATE_REQUEST]: (state, { payload }) => nextState(state, { isUpdating: true, ...payload }),
    //
    // [types.UPDATE_SUCCESS]: state => nextState(state, { isUpdating: false }),
    //
    // [types.UPDATE_FAILURE]: (state, { error }) => nextState(state, { isUpdating: false, errors: { ...state.errors, updating: error.message } }),

    [types.RESET]: () => ({ ...initialState })
};

export default createReducer(initialState, actions);

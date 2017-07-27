// // @flow
// import * as types from '../constants';
// import { createReducer, nextState } from '../../../../store/utilities';
//
//
// const initialState: {} = {
//     id: null,
//     data: null,
//     isFetching: false,
//     isUpdating: false
// };
//
// export const actions: ReducerActions = {
//     [types.FETCH_REQUEST]: (state, { payload }) => nextState(state, { isFetching: true, ...payload}),
//     //
//     [types.FETCH_SUCCESS]: (state, { payload }) =>  nextState(state, { isFetching: false, data: payload.data }),
//     //
//     [types.FETCH_FAILURE]: (state, { payload }) => nextState(state, { isFetching: false, ...payload }),
//
//     [types.FETCH_CANCEL]: state => nextState(state, { isFetching: false }),
//
//
//     [types.RESET]: () => ({ ...initialState })
// };
//
// export default createReducer(initialState, actions);

// @flow
export default (initialStateForKey: {}, handlers: {[string]: ReducerAction}) => (state: State = initialStateForKey, action: ReduxAction): State => {
    return handlers[action.type] ? handlers[action.type](state, action) : state;
};

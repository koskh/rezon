export default (initialStateForKey, handlers) => (state = initialStateForKey, action) => {
    return handlers[action.type] ? handlers[action.type](state, action) : state;
};
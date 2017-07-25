/* eslint-disable no-undef */
declare type Type = string;
declare type ReduxAction= {type: Type, payload: ?{}};
declare type ThunkAction= (...args: Array<any>)=>State;
declare type ReducerAction= (state: State, action: {type: Type, payload: any}) => State; // действ редюсера
declare type ReducerActions = {[handler: Type]: ReducerAction};

declare type State= {
    dumpReduxComponent: {},
    router: {}
};


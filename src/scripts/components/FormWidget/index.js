// @flow

/*
 * Компонент-виджет встраиваемый в валидац форму
 * validationState : {[field: string]: state: string} - статусы раскрашивания в соответсвии с bootstrap4
 * feedbackText  {[field: string] : msg: string} - текст подсказки, ошибки, и т.д.
 */

import React from 'react';
// import classNames from 'classnames';

// import {
//     stateClasses, // классы состояния formGroup, в соотв с bs4 :validationStates
// } from '../FormGroup/shared';

import type { validationStates } from '../FormValidation'; // TODO: вынести в shared


type Props = {
    id?: string,
    name?: ?string,
    options?: any,
    defaultValue: {[field: string]: any},
    onChange: Function,
    validationState: ?validationStates, // {[field: string]: validationStates}, // css класс раскрашив поля ввода
    feedbackText: {[field: string]: string}, // текст ошибки, подсказки, инфо и тд.
    onChange: Function
    // children?: React.Children
};


type State = {
    value: {[field: string]: any} // значения полей виджета
};


class FormGroup extends React.Component <Props, State>{
    // props: Props;
    // state: State;
    static defaultProps: Props = {
        id: '',
        // type: 'input',
        name: null,
        options: null,
        defaultValue: {},
        validationState: null,
        feedbackText: {},
        onChange: () => {
        },
    };

    constructor(props: any) {
        super(props);
        this.state = {
            value: props.defaultValue
        };
    }

    // onChange = ({ target }: SyntheticInputEvent): void => {
    // this.props.onChange && this.props.onChange(this.props.name, target.value);
    // this.setState({ value: target.value });
    // };

    // getValue() {
    //     return this.state.value;
    // }

    // render(): React.Element<any> {
    //     // const { id, type, name, defaultValue, validationState, feedbackText } = this.props;
    //
    //     // const validationStateClass: string = (validationState && stateClasses[validationState]) || '';
    //
    //
    //     return (
    //         <div>Dumb FormWidget</div>
    //     );
    // }
}

export default FormGroup;

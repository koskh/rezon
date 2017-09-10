// @flow

/*
 * Компонент- фабрика "строчки ввода" в форме
 * строчка ввода = заголовок + какой то тип инпута + вывод ошибки-подсказки
 * validationState - статусы раскрашивания в соответсвии с bootstrap4
 * feedbackText - текст подсказки, ошибки, и т.д.
 */

import * as React from 'react';
import classNames from 'classnames';

import Input from './_components/Input/index';
import Password from './_components/Password/index';

import type { validationStates } from '../../validator/validator';

export const stateClasses: { [key: validationStates]: string } = { // CSS классы цветных статусов
    success: 'is-valid',
    warning: 'is-warning',
    error: 'is-invalid',
    default: ''
};

export type InputTypes = 'date' | 'suggest' | 'text' | 'input' | 'password';
export const Components: { [key: InputTypes]: React.createClass } = { // возможн компоненты ввода данных
    // date: null,
    // suggest: null,
    // text: null,
    password: Password,
    input: Input
};

type Props = {
    id: string,
    type: InputTypes, // тип поля ввода, т.к. есть в defaultProps, Flow позволяет не передав
    name: string,
    label: string,
    className: string,
    options: any,
    defaultValue: any,
    helperText: string,
    onChange: Function,
    validationState: validationStates, // css класс раскрашив поля ввода
    feedbackText: string, // текст ошибки, подсказки, инфо и тд.
    onChange: Function
};


// type State = {
//     value: string
// }

export class FormGroup extends React.Component<Props> {
    props: Props;
    // state: State;
    static defaultProps: Props = {
        id: '',
        type: 'input',
        name: '',
        label: '',
        className: '',
        options: null,
        defaultValue: null,
        helperText: '',
        validationState: 'default',
        feedbackText: '',
        onChange: () => {
        },
    };

    // constructor(props: any) {
    //     super(props);
    // this.state = {
    //     value: props.defaultValue
    // };
    // }

    onChange = ({ target }: SyntheticInputEvent<*>) => {
        this.props.onChange && this.props.onChange(this.props.name, target.value);
        // this.setState({ value: target.value });
    };

    // getValue() {
    //     return this.state.value;
    // }

    render(): React.Element<any> {
        const { id, type, name, label, defaultValue, helperText, validationState, feedbackText } = this.props;

        const validationStateClass: string = (validationState && stateClasses[validationState]) || '';

        const Comp: React.createClass = Components[type];
        if (Comp === undefined)
            throw new Error('FormGroup need known type from type "InputTypes"');

        return (
            <div className={classNames('form-group', 'row', validationStateClass)}>
                <label htmlFor={id} className="col-sm-2 col-form-label">{label}</label>
                <div className="col-sm-10">

                    { Comp && <Comp id={id} name={name} defaultValue={defaultValue} className={validationStateClass} onChange={this.onChange} /> }

                    <div className="invalid-feedback">{feedbackText}</div>
                    <small className="form-text text-muted">{helperText}</small>
                </div>
            </div>
        );
    }
}

export default FormGroup;

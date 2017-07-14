// @flow

/*
 * Компонент стандартной "строчки ввода" в форме
 * строчки ввода = заголовок + какой то тип инпута
 * Components - возможн компоненты ввода данных
 * validationState - статусы раскрашивания в соответсвии с bootstrap4
 * feedbackText - текст подсказки, ошибки, и т.д.
 */

import React from 'react';
import classNames from 'classnames';

import { stateClasses, Components } from './shared'; // классы состояния formGroup, в соотв с bs4

import type { validationStates } from '../FormValidation';
import type { InputTypes } from './shared';


type Props = {
    id?: string,
    type: InputTypes, // тип поля ввода
    name?: ?string,
    options?: any,
    defaultValue?: any,
    onChange: Function,
    validationState?: ?validationStates, // css класс раскрашив поля ввода
    feedbackText?: ?string,  // текст ошибки, подсказки, инфо и тд.
    onChange?: Function
    // children?: React.Children
};

// type DefaultProps = {
//     id: string,
//     type: InputTypes,
//     onChange: Function,
//     name: string,
//     options: any,
//     defaultValue: any,
//     validationState: validationStates,
//     feedbackText: string,
//     onChange: Function,
// };


// type State = {
//     value: string
// }


class FormGroup extends React.Component {
    props: Props;
    // state: State;
    static defaultProps: Props = {
        id: '',
        type: 'input',
        name: null,
        options: null,
        defaultValue: null,
        validationState: null,
        feedbackText: null,
        onChange: () => {
        },
        // children: null
    };

    constructor(props: any) {
        super(props);
        // this.state = {
        //     value: props.defaultValue
        // };

        (this: any).onChange = this.onChange.bind(this);
    }


    onChange({ target }: SyntheticInputEvent) {
        this.props.onChange && this.props.onChange(this.props.name, target.value);
        // this.setState({ value: target.value });
    }

    // getValue() {
    //     return this.state.value;
    // }

    render(): React.Element<any> {
        const { id, type, name, defaultValue, validationState, feedbackText } = this.props;

        const validationStateClass: string = (validationState && stateClasses[validationState]) || '';

        const Comp: ReactClass<any> = Components[type];
        if (Comp === undefined)
            throw new Error('FormGroup need known type from InputTypes');

        return (
          <div className={classNames('form-group', 'row', validationStateClass)}>
            <label htmlFor={id} className="col-sm-2 col-form-label">Email address</label>
            <div className="col-sm-10">

              {
                Comp && <Comp id={id} name={name} defaultValue={defaultValue} placeholder="Placeholder...." onChange={this.onChange} />
              }

              <div className="form-control-feedback">{feedbackText}</div>
              <small className="form-text text-muted">We will never share your email with anyone else.</small>
            </div>
          </div>
        );
    }
}

export default FormGroup;

// @flow

/*
* Компонент стандартной "строчки ввода" в форме
* строчки ввода = заголовок + какой то тип инпута
* validationState - статусы раскрашивания в соответсвии с bootstrap4
* feedbackText - текст подсказки, ошибки, и т.д.
*/

// import _ from 'lodash';

import React from 'react';
import classNames from 'classnames';

import Input from '../Input';

import type { validationStates } from '../FormValidation';


type InputTypes = 'date' | 'suggest' | 'text' | 'input';

// классы состояния formGroup, в соотв с bs4
const stateClasses: { [key: validationStates]: string } = {
    success: 'has-success',
    warning: 'has-warning',
    error: 'has-danger',
    info: 'has-info',
    stateless: ''
};

type Props = {
    id?: string,
    type: InputTypes, // тип поля ввода
    name?: string,
    options?: any,
    defaultValue?: any,
    onChange: Function,
    validationState?: validationStates, // css класс раскрашив поля ввода
    feedbackText?: string,  // текст ошибки, подсказки, инфо и тд.
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


type State = {
    value: string
}


class FormGroup extends React.Component {
    props: Props;
    state: State;
    static defaultProps: Props = {
        id: 'xxx-xxx-xx',
        type: 'input',
        name: '',
        options: null,
        defaultValue: null,
        validationState: 'stateless',
        feedbackText: '',
        onChange: () => {
        },
        // children: null
    };

    constructor(props: any) {
        super(props);
        this.state = {
            value: props.defaultValue
        };

        this.onChangeParentsHandler = props.onChange;

        (this: any).onChange = this.onChange.bind(this);
    }

    onChangeParentsHandler: Function = () => {
    };

    onChange({ target }: SyntheticInputEvent) {
        this.onChangeParentsHandler(this.props.name, target.value);
        // this.setState({ value: target.value });
    }

    // getValue() {
    //     return this.state.value;
    // }

    render() {
        const { id, type, name, defaultValue, validationState, feedbackText } = this.props;

        const validationStateClass: string = (validationState && stateClasses[validationState]) || '';

        // return <Comp {...common} />;
        return (
          <div className={classNames('form-group', 'row', validationStateClass)}>
            <label htmlFor={id} className="col-sm-2 col-form-label">Email address</label>
            <div className="col-sm-10">
              <Input id={id} defaultValue={defaultValue} placeholder="Placeholder...." onChange={this.onChange} />
              <div className="form-control-feedback">{feedbackText}</div>
              <small className="form-text text-muted">We will never share your email with anyone else.</small>
            </div>
          </div>
        );
    }
}

export default FormGroup;

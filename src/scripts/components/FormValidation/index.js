// @flow

import React from 'react';
// import classNames from 'classnames';
import FormGroup from '../FormGroup';

export type validationStates = 'success' | 'warning' | 'error' | 'info';

type Props = {
    // type: InputTypes,
    // id?: string,
    // options?: any,
    // defaultValue?: any,
    // onChange: Function,
    // validationState?: validationStates,
    // feedbackText?: string,
    schema?: {},
    children?: React.Children
};

type DefaultProps = {
    schema: {},
    children: React.Children
};

// type State = {
// value: string
// }
//
// function renderChildren(props: any) {
//     return React.Children.map(props.children, child => {
//         if (child.type === FormGroup)
//             return React.cloneElement(child, { name: props.name });
//
//         return child;
//     });
// }


class FormValidation extends React.Component {
    props: Props;
    // state: State;
    static defaultProps: DefaultProps = {
        schema: {},
        children: null
    };

    constructor(props: any) {
        super(props);
        // this.state = {
        // value: props.defaultValue
        // };

        (this: any).onFormChange = this.onFormChange.bind(this);
    }


    onFormChange(name: string, value: any) {
        // this.setState({ value: target.value });
        // this.onChangeParentHandler(this.getValue());
        console.log('onFormChange name:value =>', name, value);

        this.validateField(name, value);
    }

    validateField(nameField: string, valueField: any, options?: {} = {}) { // валидация поля

    }

    setFiledState(nameField: string, state: validationStates) {

    }

    renderChildren(props: any) {
        return React.Children.map(props.children, child => {
            if (child.type === FormGroup)
                return React.cloneElement(child, { onChange: this.onFormChange });

            return child;
        });
    }

    render() {
        return (
          <form>
            {this.renderChildren(this.props)}
          </form>
        );
    }
}

export default FormValidation;


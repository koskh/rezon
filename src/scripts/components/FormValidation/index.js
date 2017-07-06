// @flow

import React from 'react';
// import classNames from 'classnames';
import FormGroup from '../FormGroup';

export type validationStates = 'success' | 'warning' | 'error' | 'info';

type schema = {
    [key: string]: {
        type?: {
            convert: Function,
            msg: string
        },
        inputRules?: [{
            validate: Function,
            msg: string
        }]
    }
}

type Props = {
    schema?: schema,
    children?: React.Children
};

type DefaultProps = {
    schema: schema,
    children: React.Children
};

type State = {
    data: {
        [key: string]: any
    },
    errorsFields: {
        [key: string]: Array<string>
    }
};


class FormValidation extends React.Component {
    props: Props;
    state: State;

    static defaultProps: DefaultProps = {
        schema: {},
        children: null
    };

    constructor(props: any) {
        super(props);
        this.state = {
            data: {},
            errorsFields: {}
        };

        (this: any).onFormChange = this.onFormChange.bind(this);
    }


    onFormChange(nameField: string, valueField: any) {
        // для обработки пустого инпута
        let value: any = valueField.trim();

        // конверт значения, из текстов в нужн формат
        const ErrorConvertDefaultValue = undefined; // return undefined; определем, что возвращ при ошибке конвертации
        value = this.convertField(
            nameField,
            value,
            (name, msgs) => {
                this.setErrorsFields(name, msgs);
                return ErrorConvertDefaultValue;
            }
        );

        if (value !== ErrorConvertDefaultValue) {
            const validateErrors: Array<string> = this.validateField(nameField, value);
            this.setErrorsFields(nameField, validateErrors);
        }

        const data = { ...this.state.data, [nameField]: value };
        this.setState({ data });

        // debugger;
    }

    convertField(nameField: string, valueField: any, onError: Function): any { // конвертация поля
        if (valueField !== '' && this.props.schema && this.props.schema[nameField] && this.props.schema[nameField].type) {
            const type = this.props.schema[nameField].type;
            const atConverted = type.convert(valueField);
            if (atConverted === undefined || (typeof atConverted === 'number' && isNaN(atConverted)))
                return onError(nameField, [type.msg]);

            return atConverted;
        }

        return valueField;
    }

    validateField(nameField: string, valueField: any, options?: {} = {}): Array<string> { // валидация поля
        const errors = [];

        if (!(this.props.schema && this.props.schema[nameField]))
            return errors;


        if (this.props.schema[nameField].inputRules) {
            const inputRules = this.props.schema[nameField].inputRules;

            for (let i = 0; i < inputRules.length; i++) {
                const rule = inputRules[i];
                if (!rule.validate(valueField)) {
                    errors.push(rule.msg);
                    break;
                }
            }

            return errors;
        }

        return errors;
    }

    setErrorsFields(nameField: string, errorsField: Array<string>): void {
        const errorsFields = { ...this.state.errorsFields, [nameField]: errorsField };
        this.setState({ errorsFields });
    }

    setFormErrors(): void {

    }


    // setFiledState(nameField: string, state: validationStates): void {
    //
    // }

    renderChildren(props: any, state: any) {
        function getValidationState(nameField: string, formState: any): validationStates {
            return formState.errorsFields[nameField] && formState.errorsFields[nameField].length > 0 ? 'error' : 'info';
        }
        function getFeedbackText(nameField: string, formState: any): string {
            return formState.errorsFields[nameField] && formState.errorsFields[nameField].length > 0 ? formState.errorsFields[nameField].join(',') : '';
        }

        return React.Children.map(props.children, child => {
            if (child.type === FormGroup) {
                const name = child.props.name;

                const validationState: validationStates = getValidationState(name, state);
                const feedbackText: string =  getFeedbackText(name, state);

                return React.cloneElement(child, { onChange: this.onFormChange, validationState, feedbackText });
            }

            return child;
        });
    }

    render() {
        return (
          <form>
            {this.renderChildren(this.props, this.state)}
          </form>
        );
    }
}

export default FormValidation;


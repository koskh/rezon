// @flow

import _ from 'lodash';
import React from 'react';
// import classNames from 'classnames';
import FormGroup from '../FormGroup';

export type validationStates = 'success' | 'warning' | 'error' | 'info';

type schema = {
    [key: string]: {
        type?: {
            convert: (value: string) => any,
            msg: string
        },
        inputRules?: [{
            validate: Function,
            msg: string
        }],
        logicRules?: [{
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
    model: {
        data: {
            [key: string]: any
        },
        inputErrorsFields: {
            [key: string]: Array<string>
        },
        logicErrorsFields: {
            [key: string]: Array<string>
        }
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
            model: {
                data: {},
                inputErrorsFields: {},
                logicErrorsFields: {},
            }
        };

        (this: any).onFormChange = this.onFormChange.bind(this);
    }


    onFormChange(nameField: string, valueField: any) {
        // текущ ошибки валидации
        // let inputErrorsFields = this.state.inputErrorsFields;
        // let logicErrorsFields = this.state.logicErrorsFields;
        const model = this.state.model;

        // для обработки пустого инпута
        // let value: any = valueField.trim(); // TODO:?
        let value = valueField;

        // конверт значения, из текстов в нужн формат
        const ErrorConvertDefaultValue = undefined; // return undefined; определем, что возвращ при ошибке конвертации
        value = this.convertField(
            nameField,
            value,
            (name, msgs) => {
                model.inputErrorsFields = { ...model.inputErrorsFields, [name]: msgs };
                return ErrorConvertDefaultValue;
            }
        );
        model.data = { ...model.data, [nameField]: value };


        if (value !== ErrorConvertDefaultValue) {
            const validateInputErrors: Array<string> = this.validateInputRules(nameField, value);
            model.inputErrorsFields = { ...model.inputErrorsFields, [nameField]: validateInputErrors };


            const e = _.every(model.inputErrorsFields, (val, key) => {
                return val.length === 0;
            });

            if (e) {
                _.each(model.data, (val, key) => {
                    const validateLogicErrors: Array<string> = this.validateLogicRules(key, model.data);
                    model.logicErrorsFields = { ...model.logicErrorsFields, [key]: validateLogicErrors };
                });
            }
        }

        // debugger;


        // const data: { [key: string]: any } = { ...this.state.data, [nameField]: value };
        this.setState({ model });

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

    validateInputRules(nameField: string, valueField: any): Array<string> { // валидация вводимых данных
        const errors = [];

        if (!(this.props.schema && this.props.schema[nameField]))
            return errors;

        const fieldSchema = this.props.schema[nameField];

        if (fieldSchema.inputRules) {
            for (let i = 0; i < fieldSchema.inputRules.length; i += 1) {
                const rule = fieldSchema.inputRules[i];
                if (!rule.validate(valueField, this.state.model.data)) {
                    errors.push(rule.msg);
                    return errors;
                }
            }
        }

        // if (fieldSchema.logicRules) {
        //     for (let i = 0; i < fieldSchema.logicRules.length; i += 1) {
        //         const rule = fieldSchema.logicRules[i];
        //         if (!rule.validate(valueField, this.state.data)) {
        //             errors.push(rule.msg);
        //             return errors;
        //         }
        //     }
        // }

        return errors;
    }

    // валидация логически зависящих полей, производ после всех валидно введенных полей, по всем полям формы
    validateLogicRules(nameField: string, currentData: any): Array<string> {
        const errors = [];

        if (!(this.props.schema && this.props.schema[nameField]))
            return errors;

        const fieldSchema = this.props.schema[nameField];

        if (fieldSchema.logicRules) {
            for (let i = 0; i < fieldSchema.logicRules.length; i += 1) {
                const rule = fieldSchema.logicRules[i];
                if (!rule.validate(currentData)) {
                    errors.push(rule.msg);
                    return errors;
                }
            }
        }

        return errors;
    }


    // setErrorsFields(nameField: string, errorsField: Array<string>): void {
    //     const errorsFields = { ...this.state.errorsFields, [nameField]: errorsField };
    //     this.setState({ errorsFields });
    // }

    // setFormErrors(): void {
    //
    // }


    // setFiledState(nameField: string, state: validationStates): void {
    //
    // }

    renderChildren(props: any, state: any) {
        function getValidationState(nameField: string, formState: any): validationStates {
            return (formState.model.inputErrorsFields[nameField] && formState.model.inputErrorsFields[nameField].length > 0) ||
            (formState.model.logicErrorsFields[nameField] && formState.model.logicErrorsFields[nameField].length > 0)
                ? 'error' : 'info';
        }

        function getFeedbackText(nameField: string, formState: any): string {
            return (formState.model.inputErrorsFields[nameField] && formState.model.inputErrorsFields[nameField].length > 0) ||
            (formState.model.logicErrorsFields[nameField] && formState.model.logicErrorsFields[nameField].length > 0)
                ? formState.model.inputErrorsFields[nameField].join(',') || formState.model.logicErrorsFields[nameField].join(',') : '';
        }

        return React.Children.map(props.children, child => {
            if (child.type === FormGroup) {
                const name = child.props.name;

                const validationState: validationStates = getValidationState(name, state);
                const feedbackText: string = getFeedbackText(name, state);

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


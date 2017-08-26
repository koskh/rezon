// @flow

import _ from 'lodash';
import * as React from 'react';
// import classNames from 'classnames';

import FormGroup from '../FormGroup';
import { convertField, validateRules } from './validator/validator';

import type { ValidatorResultObject } from './validator/validator';
import type { Schema } from './validator/schema';

export type validationStates = 'success' | 'warning' | 'error' | 'info' | 'default';

export type DataFields = { [key: string]: any }; // значения полей формы
export type ErrorsFields = { [key: string]: Array<string> }; // ошибки формы
export type FormModel = { // содержимое валидационной формы
    data: DataFields, // данные полей
    inputErrorsFields: ErrorsFields, // ошибки ввода
    logicErrorsFields: ErrorsFields // ошибки зависимых полей
}

type Props = {
    className: string,
    schema: Schema,
    children: React.Node
};

type State = {
    model: FormModel
};


class FormValidation extends React.Component<Props, State> {
    props: Props;
    state: State;

    static defaultProps: Props = {
        className: '',
        schema: {},
        children: null
    };

    constructor(props: any) {
        super(props);

        const model: FormModel = this._initializeFormModel(this.props.schema);
        this.state = { model };

        // this.state = {
        //     model: {
        //         data: {},
        //         inputErrorsFields: {},
        //         logicErrorsFields: {},
        //     }
        // };
    }

    _initializeFormModel = (schema: Schema): FormModel => {
        const result = {
            data: {},
            inputErrorsFields: {},
            logicErrorsFields: {},
        };

        _.each(schema, (v, k) => {
            result.data[k] = undefined;
            result.inputErrorsFields[k] = [];
            result.logicErrorsFields[k] = [];
        });

        return result;
    };


    onFormChange = (nameField: string, valueField: any) => {
        const schema = this.props.schema;
        let { data, inputErrorsFields, logicErrorsFields } = this.state.model; // текущ сосстояние, обход однонаправленности

        const converted: ValidatorResultObject = convertField(nameField, valueField, schema); // конверт значения в нужн формат

        data = { ...data, [nameField]: converted.result };
        inputErrorsFields = { ...inputErrorsFields, [nameField]: converted.errors };

        if (converted.errors.length === 0) { // удачно сконвертили и получили значение
            // валидир введен данные
            const inputValidated: ValidatorResultObject = validateRules(nameField, data, 'inputRules', schema);
            inputErrorsFields = { ...inputErrorsFields, [nameField]: inputValidated.errors };

            // валидац созависим полей
            // если все поля заполнены без ошибок
            if (_.every(inputErrorsFields, val => {
                return val.length === 0;
            })) {
                _.each(data, (valueFld, nameFld) => {
                    const logicValidated: ValidatorResultObject = validateRules(nameFld, data, 'logicRules', schema);
                    logicErrorsFields = { ...logicErrorsFields, [nameFld]: logicValidated.errors };
                });
            } else
                logicErrorsFields[nameField] = []; // приоритет ошибок у невалидного заполнения
        }

        this.setState({ model: { data, inputErrorsFields, logicErrorsFields } });
    };

    _getValidationState(nameField: string, formModel: FormModel): validationStates {
        if (formModel.inputErrorsFields[nameField] && formModel.inputErrorsFields[nameField].length > 0)
            return 'error';

        if (formModel.logicErrorsFields[nameField] && formModel.logicErrorsFields[nameField].length > 0)
            return 'error';

        return 'default';
    }

    _getFeedbackText(nameField: string, formModel: FormModel): string {
        if (formModel.inputErrorsFields[nameField] && formModel.inputErrorsFields[nameField].length > 0)
            return formModel.inputErrorsFields[nameField].join(',');

        if (formModel.logicErrorsFields[nameField] && formModel.logicErrorsFields[nameField].length > 0)
            return formModel.logicErrorsFields[nameField].join(',');

        return '';
    }

    _renderChildren(props: any) {
        return React.Children.map(props.children, child => {
            if (child.props.isValidated) {
                const name: string = child.props.name;
                const model = this.state.model;

                const validationState: validationStates = this._getValidationState(name, model);
                const feedbackText: string = this._getFeedbackText(name, model);

                return React.cloneElement(child, { onChange: this.onFormChange, validationState, feedbackText });
            }

            return child;
        });
    }

    render() {
        return (
            <form className={this.props.className}>
                {this._renderChildren(this.props)}
            </form>
        );
    }
}

export default FormValidation;


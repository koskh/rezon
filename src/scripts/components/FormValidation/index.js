// @flow

import _ from 'lodash';
import React from 'react';
// import classNames from 'classnames';

import FormGroup from '../FormGroup';
import { convertField, validateInputRules, validateLogicRules } from './validator/validator';

import type { ValidatorResultObject } from './validator/validator';
import type { Schema } from './validator/schema';
export type validationStates = 'success' | 'warning' | 'error' | 'info' | 'default';

type Props = {
    schema: Schema,
    children: React.Children
};


export type DataFields = { [key: string]: any }; // значения полей формы
export type ErrorsFields = { [key: string]: Array<string> }; // ошибки формы
export type FormModel = { // содержимое валидационной формы
    data: DataFields, // данные полей
    inputErrorsFields: ErrorsFields, // ошибки ввода
    logicErrorsFields: ErrorsFields // ошибки зависимых полей
}


type State = {
    model: FormModel
};


class FormValidation extends React.Component {
    props: Props;
    state: State;

    static defaultProps: Props = {
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
    }


    onFormChange = (nameField: string, valueField: any) => {
        const schema = this.props.schema;
        let { data, inputErrorsFields, logicErrorsFields } = this.state.model; // текущ сосстояние, обход однонаправленности

        const converted: ValidatorResultObject = convertField(nameField, valueField, schema); // конверт значения в нужн формат

        data = { ...data, [nameField]: converted.result };
        inputErrorsFields = { ...inputErrorsFields, [nameField]: converted.errors };

        if (converted.errors.length === 0) { // удачно сконвертили и получили значение
            // валидир введен данные
            const inputValidated: ValidatorResultObject = validateInputRules(nameField, data[nameField], schema);
            inputErrorsFields = { ...inputErrorsFields, [nameField]: inputValidated.errors };

            // валидац созависим полей
            // если все поля заполнены без ошибок
            if (_.every(inputErrorsFields, val => {
                return val.length === 0;
            })) {
                _.each(data, (valueFld, nameFld) => {
                    const logicValidated: ValidatorResultObject = validateLogicRules(nameFld, data, schema);
                    logicErrorsFields = { ...logicErrorsFields, [nameFld]: logicValidated.errors };
                });
            } else
                logicErrorsFields = {}; // приоритет ошибок у невалидного заполнения
        }

        this.setState({ model: { data, inputErrorsFields, logicErrorsFields } });
    }


    renderChildren(props: any, model: FormModel) {
        function getValidationState(nameField: string, formModel: FormModel): validationStates {
            if (formModel.inputErrorsFields[nameField] && formModel.inputErrorsFields[nameField].length > 0)
                return 'error';

            if (formModel.logicErrorsFields[nameField] && formModel.logicErrorsFields[nameField].length > 0)
                return 'error';

            return 'info';
        }

        function getFeedbackText(nameField: string, formModel: FormModel): string {
            if (formModel.inputErrorsFields[nameField] && formModel.inputErrorsFields[nameField].length > 0)
                return formModel.inputErrorsFields[nameField].join(',');

            if (formModel.logicErrorsFields[nameField] && formModel.logicErrorsFields[nameField].length > 0)
                return formModel.logicErrorsFields[nameField].join(',');

            return '';
        }

        return React.Children.map(props.children, child => {
            if (child.type === FormGroup) {
                const name: string = child.props.name;

                const validationState: validationStates = getValidationState(name, model);
                const feedbackText: string = getFeedbackText(name, model);

                return React.cloneElement(child, { onChange: this.onFormChange, validationState, feedbackText });
            }

            return child;
        });
    }

    render() {
        return (
          <form>
            {this.renderChildren(this.props, this.state.model)}
          </form>
        );
    }
}

export default FormValidation;


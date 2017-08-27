// @flow

import _ from 'lodash';
import * as React from 'react';
// import classNames from 'classnames';

import FormStateFeedback from './_components/FormStateFeedback';
import { convertField, validateRules, getValidationState, getFeedbackText } from './validator/validator';

import type { ValidatorResultObject, validationStates } from './validator/validator';
import type { Schema } from './validator/schema';


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

    _renderChildren(props: any) {
        return React.Children.map(props.children, child => {
            const id = child.props.id || _.uniqueId('frm-vldtn_');

            if (child.props.isValidated) {
                const name: string = child.props.name;
                const model = this.state.model;

                const validationState: validationStates = getValidationState(name, model);
                const feedbackText: string = getFeedbackText(name, model);

                return React.cloneElement(child, { id, onChange: this.onFormChange, validationState, feedbackText });
            }

            return child;
        });
    }

    render() {
        // const FormErrors = this._getFormErrors();

        return (
            <form className={this.props.className}>

                {this._renderChildren(this.props)}

                <FormStateFeedback formModel={this.state.model} />
            </form>
        );
    }
}

export default FormValidation;


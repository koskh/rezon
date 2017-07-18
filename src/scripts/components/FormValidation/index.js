// @flow

import _ from 'lodash';

import React from 'react';
// import classNames from 'classnames';

import FormGroup from '../FormGroup';
import { convertField } from './validator';
import schema from '../../features/FormValidationSample/schema';

export type validationStates = 'success' | 'warning' | 'error' | 'info' | 'default';
export type Schema = {
    [key: string]: {
        type?: { // приведение получаемого значения к требуемому типу
            convert: (value: string) => any,
            msg: string
        },
        inputRules?: Array<{ // валидация ввода
            validate: (value: any) => boolean,
            msg: string
        }>,
        logicRules?: Array<{ // валидация логики (валидность относительно других полей)
            validate: (attrs: any) => boolean,
            msg: string
        }>
    }
}

type Props = {
    schema?: Schema,
    children?: React.Children
};

// type DefaultProps = {
//     schema: schema,
//     children: React.Children
// };

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
        const model = this.state.model; // текущ сосстояние, обход однонаправленности

        // конверт значения, из текстов в нужн формат
        const converted = convertField(
            nameField,
            valueField,
            schema
        );



        model.data = { ...model.data, [nameField]: converted.result };

        if (model.inputErrorsFields[nameField].length === 0) { // удачно сконвертили и получили значение
            // валидир введен данные
            const validateInputErrors: Array<string> = this.validateInputRules(nameField, model.data[nameField]);
            model.inputErrorsFields = { ...model.inputErrorsFields, [nameField]: validateInputErrors };

            // валидац созависим полей
            // если все поля заполнены без ошибок
            if (_.every(model.inputErrorsFields, val => {
                return val.length === 0;
            })) {
                _.each(model.data, (val, key) => {
                    const validateLogicErrors: Array<string> = this.validateLogicRules(key, model.data);
                    model.logicErrorsFields = { ...model.logicErrorsFields, [key]: validateLogicErrors };
                });
            } else
                model.logicErrorsFields = {}; // приоритет ошибок у невалидного заполнения
        }

        this.setState({ model });
    }

    // convertField(nameField: string, valueField: any, inputErrorsFields: ErrorsFields): any { // конвертация поля
    //     if (valueField !== '' && this.props.schema && this.props.schema[nameField] && this.props.schema[nameField].type) {
    //         const type = this.props.schema[nameField].type;
    //         const convertedValue = type.convert(valueField);
    //
    //         if (convertedValue === undefined || (typeof convertedValue === 'number' && isNaN(convertedValue))) {
    //             //eslint-disable-next-line
    //             inputErrorsFields[nameField] = [type.msg];
    //             return undefined;
    //         }
    //
    //         //eslint-disable-next-line
    //         inputErrorsFields[nameField] = [];
    //         return convertedValue;
    //     }
    //
    //     //eslint-disable-next-line
    //     inputErrorsFields[nameField] = [];
    //     return valueField;
    // }

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

        return errors;
    }

    // валидация логически зависящих полей, производ после всех валидно введенных полей, по всем полям формы
    validateLogicRules(nameField: string, currentData: DataFields): Array<string> {
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


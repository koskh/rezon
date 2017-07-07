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
    model: { // содержимое валидационной формы
        data: { // данные полей
            [key: string]: any
        },
        inputErrorsFields: { // ошибки ввода
            [key: string]: Array<string>
        },
        logicErrorsFields: { // ошибки зависимых полей
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
        const model = this.state.model; // текущ сосстояние, обход однонаправленности

        // конверт значения, из текстов в нужн формат
        // const ErrorConvertDefaultValue = undefined; // return undefined; определем, что возвращ при ошибке конвертации
        const convertedValue = this.convertField(
            nameField,
            valueField,
            model.inputErrorsFields
        );


        model.data = {...model.data, [nameField]: convertedValue};

        if (model.inputErrorsFields[nameField].length === 0) { // удачно сконвертили и получили значение
            // валидир введен данные
            const validateInputErrors: Array<string> = this.validateInputRules(nameField, model.data[nameField]);
            model.inputErrorsFields = {...model.inputErrorsFields, [nameField]: validateInputErrors};

            // валидац созависим полей
            // если все поля заполнены без ошибок
            const e = _.every(model.inputErrorsFields, val => {
                return val.length === 0;
            });

            if (e) {
                _.each(model.data, (val, key) => {
                    const validateLogicErrors: Array<string> = this.validateLogicRules(key, model.data);
                    model.logicErrorsFields = {...model.logicErrorsFields, [key]: validateLogicErrors};
                });
            }
        }

        this.setState({model});

        // debugger;
    }

    convertField(nameField: string, valueField: any, inputErrorsFields: any): any { // конвертация поля
        if (valueField !== '' && this.props.schema && this.props.schema[nameField] && this.props.schema[nameField].type) {
            const type = this.props.schema[nameField].type;
            const convertedValue = type.convert(valueField);

            if (convertedValue === undefined || (typeof convertedValue === 'number' && isNaN(convertedValue))) {
                //eslint-disable-next-line
                inputErrorsFields[nameField] = [type.msg];
                return undefined;
            }

            //eslint-disable-next-line
            inputErrorsFields[nameField] = [];
            return convertedValue;
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


    renderChildren(props: any, model: any) {
        function getValidationState(nameField: string, formModel: any): validationStates {
            if (formModel.inputErrorsFields[nameField] && formModel.inputErrorsFields[nameField].length > 0)
                return 'error';

            if (formModel.logicErrorsFields[nameField] && formModel.logicErrorsFields[nameField].length > 0)
                return 'error';

            return 'info';
        }

        function getFeedbackText(nameField: string, formModel: any): string {
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

                return React.cloneElement(child, {onChange: this.onFormChange, validationState, feedbackText});
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


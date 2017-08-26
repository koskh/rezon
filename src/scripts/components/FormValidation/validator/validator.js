// @flow

/* Валидатор.
*  Получает на вход имя поля, значение, валидирует по переданной схеме.
*/

import type { Schema } from './schema';
import type { FormModel } from '../';

export type validationStates = 'success' | 'warning' | 'error' | 'info' | 'default';

export type ValidatorResultObject = { result: any, errors: Array<string> };

// конвертация поля
export function convertField(nameField: string, valueField: any, schema: Schema): ValidatorResultObject {
    //eslint-disable-next-line
    let result = undefined;
    let errors = [];

    if (schema === undefined)
        throw new Error('Validator.convertField need schema');

    if (valueField !== '' && schema[nameField] && schema[nameField].type) {
        const type = schema[nameField].type;
        const convertedValue = schema[nameField].type.convert(valueField);

        if (convertedValue === undefined || (typeof convertedValue === 'number' && isNaN(convertedValue))) {
            result = undefined;
            errors = [type.msg];
        } else
            result = convertedValue;
    } else
        result = valueField;

    return { result, errors };
}

// валидация  полей
export function validateRules(nameField: string, attributes: any, type: 'inputRules' | 'logicRules', schema: Schema): ValidatorResultObject {
    let result = true;
    const errors = [];

    if (schema === undefined)
        throw new Error('Validator.validateLogicRules need schema');

    if (schema[nameField] && schema[nameField][type]) {
        const rules = schema[nameField][type];
        for (let i = 0; i < rules.length; i += 1) {
            const rule = rules[i];
            if (!rule.validate(attributes)) {
                result = false;
                errors.push(rule.msg);
                break;
            }
        }
    }

    return { result, errors };
}

//
export function getValidationState(nameField: string, formModel: FormModel): validationStates {
    if (formModel.inputErrorsFields[nameField] && formModel.inputErrorsFields[nameField].length > 0)
        return 'error';

    if (formModel.logicErrorsFields[nameField] && formModel.logicErrorsFields[nameField].length > 0)
        return 'error';

    return 'default';
}

export function getFeedbackText(nameField: string, formModel: FormModel): string {
    if (formModel.inputErrorsFields[nameField] && formModel.inputErrorsFields[nameField].length > 0)
        return formModel.inputErrorsFields[nameField].join(',');

    if (formModel.logicErrorsFields[nameField] && formModel.logicErrorsFields[nameField].length > 0)
        return formModel.logicErrorsFields[nameField].join(',');

    return '';
}

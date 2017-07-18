// @flow

/* Валидатор.
*  Получает на вход имя поля, значение, валидирует по переданной схеме.
*/

import type { Schema } from './schema';

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

// валидаця ввода
export function validateInputRules(nameField: string, valueField: any, schema: Schema): ValidatorResultObject {
    let result = true;
    let errors = [];

    if (schema === undefined)
        throw new Error('Validator.validateInputRules need schema');

    if (schema[nameField] && schema[nameField].inputRules) {
        const rules = schema[nameField].inputRules;
        for (let i = 0; i < rules.length; i += 1) {
            const rule = rules[i];
            if (!rule.validate(valueField)) {
                result = false;
                errors = [rule.msg];
                break;
            }
        }
    }

    return { result, errors };
}

// валидация созависимых полей
export function validateLogicRules(nameField: string, attributes: any, schema: Schema): ValidatorResultObject {
    let result = true;
    const errors = [];

    if (schema === undefined)
        throw new Error('Validator.validateLogicRules need schema');

    if (schema[nameField] && schema[nameField].logicRules) {
        const rules = schema[nameField].logicRules;
        for (let i = 0; i < rules.length; i += 1) {
            const rule = rules[i];
            if (!rule.validate(attributes)) {
                result = false;
                errors.push(rule.msg);
            }
        }
    }

    return { result, errors };
}

// @flow

/* Валидатор.
*  Получает на вход имя поля, значение, валидирует по переданной схеме.
*/
import type { DataFields, ErrorsFields, FormModel, Schema } from './';

export type validatorResultObject = {result: any, errors: Array<string>};

// конвертация поля
export function convertField(nameField: string , valueField: any , schema: Schema = {}): validatorResultObject {
    let result;
    let errors = [];

    if (valueField !== ''  && schema[nameField] && schema[nameField].type) {
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

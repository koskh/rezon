// @flow
import { extract } from '../../../utilities/number/index';

// types
import type { Schema } from '../../../components/FormValidation/validator/schema';

const schema: Schema = {
    min: {
        type: {
            convert(value) {
                return extract(value);
            },
            msg: 'Min: Неверный формат данных. Разрешено только число'
        },
        inputRules: [
            {
                validate(attrs) {
                    return attrs.min !== '';
                },
                msg: 'Min: Не может быть пустым'
            },

            {
                validate(attrs) {
                    return attrs.min >= 0 && attrs.min <= 100;
                },
                msg: 'Min: Число должно находиться в интервале 0-100'
            },
            {
                validate(attrs) {
                    return attrs.min > 5;
                },
                msg: 'Min: Число должно быть больше 5'
            }
        ],

    },

    max: {

        type: {
            convert(value) {
                return extract(value);
            },
            msg: 'Max: Неверный формат данных. Разрешено только число'
        },
        inputRules: [
            {
                validate(attrs) {
                    return attrs.max !== '';
                },
                msg: 'Max: Не может быть пустым'
            },

            {
                validate(attrs) {
                    return attrs.max >= 0 && attrs.max <= 100;
                },
                msg: 'Max: Число должно находиться в интервале 0-100'
            },
            {
                validate(attrs) {
                    return attrs.max > 10;
                },
                msg: 'Max: Число должно быть больше 10'
            },
            // {
            //         validate(attrs) {
            //             return attrs.email2 === attrs.email;
            //         },
            //         msg: 'Знечения полей email и email2 должны быть равны'
            //     }
        ],

        logicRules: [
            {
                validate(attrs) {
                    return attrs.max > attrs.min;
                },
                msg: 'Max: Значение поля Max должно быть больше значения поля Min'
            }
        ]
    },
};

export default schema;

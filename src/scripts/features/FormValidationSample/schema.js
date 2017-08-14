// @flow
import { extract } from '../../utilities/number';

// types
import type { Schema } from '../../components/FormValidation/validator/schema';

const schema: Schema = {
    email: {
        type: {
            convert(value) {
                return extract(value);
            },
            msg: 'Неверный формат данных. Разрешено только число.'
        },
        inputRules: [
            {
                validate(attrs) {
                    return attrs.email !== '';
                },
                msg: 'Не может быть пустым'
            },

            {
                validate(attrs) {
                    return attrs.email >= 0 && attrs.email <= 100;
                },
                msg: 'Число должно находиться в интервале 0-100'
            },
            {
                validate(attrs) {
                    return attrs.email >= 50;
                },
                msg: 'Число должно быть больше 50'
            }
        ],

    },

    email2: {

        type: {
            convert(value) {
                return extract(value);
            },
            msg: 'Неверный формат данных. Разрешено только число.'
        },
        inputRules: [
            {
                validate(attrs) {
                    return attrs.email2 !== '';
                },
                msg: 'Не может быть пустым'
            },
            // {
            //     validate(value, attrs) {
            //         return value === attrs.email;
            //     },
            //     msg: 'Знечения полей email2 и email должны быть равны'
            // }
            {
                validate(attrs) {
                    return attrs.email2 >= 0 && attrs.email2 <= 100;
                },
                msg: 'Число должно находиться в интервале 0-100'
            },
            {
                validate(attrs) {
                    return attrs.email2 >= 50;
                },
                msg: 'Число должно быть больше 50'
            },
            // {
            //         validate(attrs) {
            //             return attrs.email2 === attrs.email;
            //         },
            //         msg: 'Знечения полей email и email2 должны быть равны'
            //     }
        ],

        // logicRules: [
        //     {
        //         validate(attrs) {
        //             return attrs.email2 === attrs.email;
        //         },
        //         msg: 'Знечения полей email и email2 должны быть равны'
        //     }
        // ]
    },
};

export default schema;

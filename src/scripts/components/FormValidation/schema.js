import extractNumber from '../../utilities/number/extract';

export default {
    email: {
        type: {
            convert(value) {
                return extractNumber(value);
            },
            msg: 'Неверный формат данных. Разрешено только число.'
        },
        inputRules: [
            {
                validate(value) {
                    return value !== '';
                },
                msg: 'Не может быть пустым'
            },

            {
                validate(value) {
                    return value >= 0 && value <= 100;
                },
                msg: 'Число должно находиться в интервале 0-100'
            },
            {
                validate(value) {
                    return value >= 50;
                },
                msg: 'Число должно быть больше 50'
            },
            // {
            //     validate(value, attrs) {
            //         return value === attrs.email1;
            //     },
            //     msg: 'Знечения полей email и email2 должны быть равны'
            // }
        ],

    },

    email2: {

        type: {
            convert(value) {
                return extractNumber(value);
            },
            msg: 'Неверный формат данных. Разрешено только число.'
        },
        inputRules: [
            {
                validate(value) {
                    return value !== '';
                },
                msg: 'Не может быть пустым'
            },
            // {
            //     validate(value, attrs) {
            //         return value === attrs.email;
            //     },
            //     msg: 'Знечения полей email2 и email должны быть равны'
            // }
            // {
            //     validate(value) {
            //         return value >= 0 && value <= 100;
            //     },
            //     msg: 'Число должно находиться в интервале 0-100'
            // },
            // {
            //     validate(value) {
            //         return value >= 50;
            //     },
            //     msg: 'Число должно быть больше 50'
            // }
        ],

        logicRules: [
            {
                validate(attrs) {
                    return attrs.email2 === attrs.email;
                },
                msg: 'Знечения полей email и email2 должны быть равны'
            }
        ]
    },
};

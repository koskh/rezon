export default {
    email: {
        // required: [
        //     {
        //         validate(value) {
        //             return value.trim().length > 0;
        //         },
        //         msg: 'не может быть пустым'
        //     }
        // ],

        type: {
            convert(value) {
                return value;
            },
            message: 'Неверный формат данных. Разрешено только число.'
        },
        inputRules: [
            {
                validate(value) {
                    return value.trim().length > 0;
                },
                msg: 'не может быть пустым'
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
            }
        ],

        // logicRules: [
        //     {
        //         validate(attrs) {
        //             return attrs.name >= attrs.surname;
        //         },
        //         message: 'Знечение поля NAME должно быть больше или равно значению поля SURNAME'
        //     }
        // ]
    },

    email2: {
        // required: [
        //     {
        //         validate(value) {
        //             return value.trim().length > 0;
        //         },
        //         msg: 'не может быть пустым'
        //     }
        // ],

        // type: {
        //     convert(value) {
        //         return extractFloat(value);
        //     },
        //     message: 'Неверный формат данных. Разрешено только число.'
        // },
        inputRules: [
            {
                validate(value) {
                    return value.trim().length > 0;
                },
                msg: 'не может быть пустым'
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
            }
        ],

        // logicRules: [
        //     {
        //         validate(attrs) {
        //             return attrs.name >= attrs.surname;
        //         },
        //         message: 'Знечение поля NAME должно быть больше или равно значению поля SURNAME'
        //     }
        // ]
    },
};

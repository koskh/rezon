export default {
    email: {
        type: {
            convert(value) {
                return parseFloat(value);
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
            }
        ],

    },

    email2: {

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
                msg: 'Не может быть пустым'
            },
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

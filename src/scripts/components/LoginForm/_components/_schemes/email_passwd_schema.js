// @flow
// import { extract } from '../../utilities/number';

// types
import type { Schema } from '../../../../components/FormValidation/validator/schema';

const schema: Schema = {
    EmailPassword: {
        inputRules: [
            {
                validate(value) {
                    return value.EmailPassword.email !== '';
                },
                msg: 'Email Не может быть пустым'
            },

            {
                validate(value) {
                    return value.EmailPassword.password !== '';
                },
                msg: 'Password Не может быть пустым'
            },
        ],
    },
};

export default schema;

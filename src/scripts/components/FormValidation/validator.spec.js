import _ from 'lodash';
import React from 'react';
import { expect } from 'chai';
// import { shallow } from 'enzyme';
import sinon from 'sinon';

import { extract } from '../../utilities/number';

import { convertField } from './validator';

const schema_fixture = {
    field1: {
        type: {
            convert(value) {
                return extract(value);
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

        ],

    },

    field2: {
        type: {
            convert(value) {
                return extract(value);
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

const nameField = 'field1';
const emptyString = '';
const numberString = '123';
const mixedString = '123crt';
//
describe('components/FormValidation/Validator: ConvertField', () => {
    it('default returns "empty" result object', () => {
        expect(convertField()).to.eql({ result: undefined, errors: [] });
    });

    it('default returns not converted value in resul tobject', () => {
        expect(convertField(nameField, mixedString, {})).to.eql({ result: mixedString, errors: [] });
    });

    it('empty string not converted', () => {
        expect(convertField(nameField, emptyString, schema_fixture)).to.eql({ result: emptyString, errors: [] });
    });

    it('can converts by schema.type.convert', () => {
        expect(convertField(nameField, numberString, schema_fixture)).to.eql({ result: 123, errors: [] });
    });
    it('If can\'t converts by schema.type.convert return {result: undefined, errors:[...]}', () => {
        expect(convertField(nameField, mixedString, schema_fixture)).to.eql({ result: undefined, errors: [schema_fixture[nameField].type.msg] });
    });
});


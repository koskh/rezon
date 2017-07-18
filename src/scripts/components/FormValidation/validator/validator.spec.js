import _ from 'lodash';
import React from 'react';
import { expect } from 'chai';
// import { shallow } from 'enzyme';
import sinon from 'sinon';

import { extract } from '../../../utilities/number/index';

import { convertField, validateInputRules, validateLogicRules } from './validator';

const schema = {
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
        // type: {
        //     convert(value) {
        //         return extract(value);
        //     },
        //     msg: 'Неверный формат данных. Разрешено только число.'
        // },
        // inputRules: [
        //     {
        //         validate(value) {
        //             return value !== '';
        //         },
        //         msg: 'Не может быть пустым'
        //     },
        // ],

        logicRules: [
            {
                validate(attrs) {
                    return attrs.field1 === attrs.field2;
                },
                msg: 'Знечения полей field1 и field2 должны быть равны'
            }
        ]
    },
    field3: {
        // type: {
        //     convert(value) {
        //         return extract(value);
        //     },
        //     msg: 'Неверный формат данных. Разрешено только число.'
        // },
        // inputRules: [
        //     {
        //         validate(value) {
        //             return value !== '';
        //         },
        //         msg: 'Не может быть пустым'
        //     },
        // ],

        // logicRules: [
        //     {
        //         validate(attrs) {
        //             return attrs.email2 === attrs.email;
        //         },
        //         msg: 'Знечения полей email и email2 должны быть равны'
        //     }
        // ]
    },
    field4: {
        logicRules: [
            {
                validate(attrs) {
                    return attrs.field4 === attrs.field2;
                },
                msg: 'Знечения полей field4 и field2 должны быть равны'
            },
            {
                validate(attrs) {
                    return attrs.field4 === attrs.field3;
                },
                msg: 'Знечения полей field4 и field3 должны быть равны'
            },
            {
                validate(attrs) {
                    return attrs.field4 === attrs.field2;
                },
                msg: 'Знечения полей field4 и field2 должны быть равны'
            }
        ]
    }
};

const firstField = 'field1';
const emptyString = '';
const numberString = '123';
const mixedString = '123crt';

const notValidNumberValue = 123;
const validNumberValue = 52;

const fieldWithoutType = 'field2';
const fieldHasLogic = 'field2';
const notSchemeField = 'abrakadabra';

const fieldWithoutAllRules = 'field3';
const fieldWithHavyLogic = 'field4';
const notValidModel = { field1: 56, field2: 59, field3: 1, field4: 2 };
const validModel = { field1: 56, field2: 56, field3: 56, field4: 56 };


describe('components/FormValidation/Validator: ConvertField', () => {
    it('can\'t work without schema', () => {
        expect(() => convertField()).to.throw();
        expect(() => convertField(firstField, mixedString)).to.throw();
    });

    it('default returns not converted value in resul tobject', () => {
        expect(convertField(firstField, mixedString, {})).to.eql({ result: mixedString, errors: [] });
    });

    it('empty string not converted', () => {
        expect(convertField(firstField, emptyString, schema)).to.eql({ result: emptyString, errors: [] });
    });

    it('can converts by schema.type.convert', () => {
        expect(convertField(firstField, numberString, schema)).to.eql({ result: 123, errors: [] });
    });

    it('If can\'t converts by schema.type.convert return {result: undefined, errors:[...]}', () => {
        expect(convertField(firstField, mixedString, schema)).to.eql({ result: undefined, errors: [schema[firstField].type.msg] });
    });

    it('not converted if hasn\'t type for field', () => {
        expect(convertField(fieldWithoutType, mixedString, schema)).to.eql({ result: mixedString, errors: [] });
    });

    it('not converted if hasn\'t field in scheme', () => {
        expect(convertField(notSchemeField, mixedString, schema)).to.eql({ result: mixedString, errors: [] });
    });
});


describe('components/FormValidation/Validator: validateInputRules', () => {
    it('can\'t work without schema', () => {
        expect(() => validateInputRules()).to.throw();
        expect(() => validateInputRules(firstField, mixedString)).to.throw();
    });

    it('not validate if hasn\'t field in scheme', () => {
        expect(validateInputRules(notSchemeField, notValidNumberValue, schema)).to.eql({ result: true, errors: [] });
    });

    it('not validate if hasn\'t inputRules for field', () => {
        expect(validateInputRules(fieldWithoutType, notValidNumberValue, schema)).to.eql({ result: true, errors: [] });
    });


    it('validate value by scheme', () => {
        expect(validateInputRules(firstField, emptyString, schema).result).to.equal(false);
        expect(validateInputRules(firstField, emptyString, schema).errors.length).not.equal(0);

        expect(validateInputRules(firstField, emptyString, schema)).to.eql({ result: false, errors: [schema[firstField].inputRules[0].msg] });
        expect(validateInputRules(firstField, notValidNumberValue, schema)).to.eql({ result: false, errors: [schema[firstField].inputRules[1].msg] });
        expect(validateInputRules(firstField, validNumberValue, schema)).to.eql({ result: true, errors: [] });
    });
});

describe('components/FormValidation/Validator: validateLogicRules', () => {
    it('can\'t work without schema', () => {
        expect(() => validateLogicRules()).to.throw();
        expect(() => validateLogicRules(firstField, mixedString)).to.throw();
    });

    it('not validate if hasn\'t field in scheme', () => {
        expect(validateLogicRules(notSchemeField, notValidNumberValue, schema)).to.eql({ result: true, errors: [] });
    });

    it('not validate if hasn\'t inputRules for field', () => {
        expect(validateLogicRules(fieldWithoutAllRules, notValidNumberValue, schema)).to.eql({ result: true, errors: [] });
    });

    it('Model is valid by input, but its invalidate by logic', () => {
        expect(validateLogicRules(firstField, validModel, schema)).to.eql({ result: true, errors: [] });
        expect(validateLogicRules(fieldHasLogic, notValidModel, schema)).to.eql({ result: false, errors: [schema[fieldHasLogic].logicRules[0].msg] });
        expect(validateLogicRules(fieldWithoutAllRules, validModel, schema)).to.eql({ result: true, errors: [] });
    });

    it('validate all attributes in not valid model by scheme and return all logic errors', () => {
        expect(validateLogicRules(fieldWithHavyLogic, notValidModel, schema).result).to.equal(false);
        expect(validateLogicRules(fieldWithHavyLogic, notValidModel, schema).errors.length).not.equal(0);


        expect(validateLogicRules(fieldWithHavyLogic, notValidModel, schema)).to.eql({
            result: false,
            errors: [
                schema[fieldWithHavyLogic].logicRules[0].msg,
                schema[fieldWithHavyLogic].logicRules[1].msg,
                schema[fieldWithHavyLogic].logicRules[2].msg
            ] });
    });

    it('validate all attributes in valid model by scheme ', () => {
        expect(validateLogicRules(firstField, validModel, schema)).to.eql({ result: true, errors: [] });
        expect(validateLogicRules(fieldHasLogic, validModel, schema)).to.eql({ result: true, errors: [] });
        expect(validateLogicRules(fieldWithoutAllRules, validModel, schema)).to.eql({ result: true, errors: [] });
        expect(validateLogicRules(fieldHasLogic, validModel, schema)).to.eql({ result: true, errors: [] });
    });
});


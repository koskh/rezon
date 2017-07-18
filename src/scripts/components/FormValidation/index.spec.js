import _ from 'lodash';
import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import sinon from 'sinon';

import FormValidation from '.';

// import {extract} from '../../utilities/';

const schema_fixture= {
    email: {
        type: {
            convert(value) {
                return number.extract(value);
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



//
// const NodeName = 'NodeName';
// const ComponentValue = 'Value';
// const WrongValidationState = 'abrakadabra';
const WrongType = 'abrakadabra';
// const DefaultComponent = Components.input;
//
describe('components/FormValidation: Component', () => {
    it('default renders without errors', () => {
        expect(shallow(<FormValidation />)).to.have.length(1);
    });

    // it('validationState set classes in right places', () => {
    //     _.each(stateClasses, (v, k) => {
    //         expect(shallow(<FormGroup validationState={k} />).find(`.form-group.${v}`), `stateClass: ${k} -> "${v}"`).to.have.length(1);
    //     });
    // });
    //
    // it('unknown validationState is not rendered', () => {
    //     expect(shallow(<FormGroup validationState={WrongValidationState} />).find(`.form-group.${WrongValidationState}`)).to.have.length(0);
    // });
    //
    //
    // it('feedbackText is rendered', () => {
    //     expect(shallow(<FormGroup feedbackText="feedbackText" />).contains(<div className="form-control-feedback">feedbackText</div>)).to.equal(true);
    // });
});
//
// describe('components/FormGroup: children', () => {
//     it('renders Input as default ', () => {
//         expect(shallow(<FormGroup />)).to.have.length(1);
//         expect(shallow(<FormGroup />).find(DefaultComponent)).to.have.length(1);
//     });
//
//     it('renders all type Components', () => {
//         _.each(Components, (v, k) => {
//             expect(shallow(<FormGroup type={k} />).find(Components[k])).to.have.length(1);
//         });
//     });
//
//     it('throw new Error if has not right type children', () => {
//         expect(() => {
//             shallow(<FormGroup type={WrongType} />);
//         }).to.throw();
//     });
//
//     it('simulates onChange events on default Input', () => {
//         const onChange = sinon.spy();
//         shallow(<FormGroup onChange={onChange} />).find(DefaultComponent).simulate('change',  { target: { value: ComponentValue } });
//         expect(onChange.calledWith(null, ComponentValue)).to.equal(true);
//     });
//
//     it('simulates onChange events on all type  Components', () => {
//         const onChange = sinon.spy();
//         _.each(Components, (v, k) => {
//             shallow(<FormGroup type={k} onChange={onChange} name={NodeName} />).find(Components[k]).simulate('change',  { target: { value: ComponentValue } });
//             expect(onChange.calledWith(NodeName, ComponentValue)).to.equal(true);
//         });
//     });
// });

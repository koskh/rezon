import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import sinon from 'sinon';

import FormGroup from '.';

describe('components/FormGroup', () => {
    it('renders without errors', () => {
        expect(shallow(<FormGroup />)).to.have.length(1);
    });

    it('throw new Error if hasnt right type ', () => {
        expect(() => { shallow(<FormGroup type="abrakadabra" />); }).to.throw();
    });

    it('validationState set classes in right places', () => {

    });
    //
    // it('simulates change events', () => {
    //     const onChange = sinon.spy();
    //     const wrapper = shallow(<Input onChange={onChange} />);
    //
    //     wrapper.simulate('change', { target: { value: 'My new value' } });
    //     expect(onChange.calledOnce).to.equal(true);
    //     expect(onChange.calledWith({ target: { value: 'My new value' } })).to.equal(true);
    // });
});

import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import sinon from 'sinon';

import FormGroup from '.';

describe('components/FormGroup', () => {
    it('renders without errors', () => {
        expect(shallow(<Input />)).to.have.length(1);
    });

    // it('contains spec with an expectation', () => {
    //     expect(shallow(<Input />).is('.form-control')).to.equal(true);
    //     expect(shallow(<Input className="form-control-2" />).is('.form-control.form-control-2')).to.equal(true);
    // });
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

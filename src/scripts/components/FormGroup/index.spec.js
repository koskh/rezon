import _ from 'lodash';
import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import sinon from 'sinon';

import { stateClasses } from './shared';

import FormGroup from '.';

describe('components/FormGroup: common', () => {
    it('default renders without errors', () => {
        expect(shallow(<FormGroup />)).to.have.length(1);
    });

    it('validationState set classes in right places', () => {
        _.each(stateClasses, (v, k) => {
            expect(shallow(<FormGroup validationState={k} />).find(`.form-group.${v}`), `stateClass: ${k} -> "${v}"`).to.have.length(1);
        });
        // expect(shallow(<FormGroup validationState={v} feedbackText="abrakadabra" />)).to.have.length(1);
    });

    it('validationState has not found ', () => {
        expect(shallow(<FormGroup validationState="abrakadabra" />)).to.have.length(1);
    });

    it('validationState has not found ', () => {
        expect(shallow(<FormGroup validationState="abrakadabra" />)).to.have.length(1);
    });

    it('render feedbackText ', () => {
        expect(shallow(<FormGroup feedbackText="abrakadabra" />).contains(<div className="form-control-feedback">abrakadabra</div>)).to.equal(true);
    });
});

describe('components/FormGroup: children', () => {
    it('throw new Error if has not right type children ', () => {
        expect(() => {
            shallow(<FormGroup type="abrakadabra" />);
        }).to.throw();
    });
});

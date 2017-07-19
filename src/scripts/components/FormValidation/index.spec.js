import _ from 'lodash';
import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import sinon from 'sinon';

import FormValidation from '.';
import FormGroup from '../FormGroup';

import { extract } from '../../utilities/number';

import schema from './validator/fixtures/test-shema';


//
// const NodeName = 'NodeName';
// const ComponentValue = 'Value';
// const WrongValidationState = 'abrakadabra';
// const WrongType = 'abrakadabra';
// const DefaultComponent = Components.input;
//

const Form = <FormValidation />;

describe('components/FormValidation: Component', () => {
    it('default renders without errors', () => {
        expect(shallow(<FormValidation />)).to.have.length(1);
    });
});

describe('components/FormValidation: Validation', () => {
    it('default renders without errors', () => {
        expect(shallow(Form)).to.have.length(1);
    });
});

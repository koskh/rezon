import * as React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import sinon from 'sinon';

import InternalServerErrorModal from './index';

describe('components/dump', () => {
    it('renders without errors', () => {
        const dump = shallow(<InternalServerErrorModal />);
        expect(dump).to.have.length(1);
    });
});

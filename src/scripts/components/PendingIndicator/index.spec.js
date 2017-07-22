import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import sinon from 'sinon';

import PendingIndicator from '.';
import Indicator from './_components/Indicator';

import Dump from '../../components/Dump';


describe('components/PendingIndicator', () => {
    it('renders without errors', () => {
        const dump = shallow(<PendingIndicator />);
        expect(dump).to.have.length(1);
        expect(dump.find(Indicator)).to.have.length(0);
    });

    it('renders indicator then pending', () => {
        const dump = shallow(<PendingIndicator pending="true"><Dump /></PendingIndicator>);
        expect(dump).to.have.length(1);
        expect(dump.find(Indicator)).to.have.length(1);
        expect(dump.find(Dump)).to.have.length(0);
    });

    it('renders  child without errors and no pending state', () => {
        const dump = shallow(<PendingIndicator><Dump /></PendingIndicator>);
        expect(dump).to.have.length(1);
        expect(dump.find(Dump)).to.have.length(1);
        expect(dump.find(Indicator)).to.have.length(0);
    });

    it('renders error message', () => {
        const errorMessage = 'error Message';
        const dump = shallow(<PendingIndicator errorMessage={errorMessage}><Dump /></PendingIndicator>);

        expect(dump).to.have.length(1);
        expect(dump.find(Dump)).to.have.length(0);
        expect(dump.find(Indicator)).to.have.length(0);
        expect(dump.contains(<div>{errorMessage}</div>)).to.equal(true);
    });
});

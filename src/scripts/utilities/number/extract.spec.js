import { expect } from 'chai';

import extract from './extract';

describe('Extract number from string value', () => {
    it('extract("") should return NaN', () => {
        expect(extract('')).to.be.NaN;
    });

    it('extract() should return NaN', () => {
        expect(extract()).to.be.NaN;
    });

    it('extract("123") should return 123', () => {
        expect(extract('123')).to.eq(123);
    });

    it('extract(" 123") should return NaN', () => {
        expect(extract(' 123 ')).to.be.NaN;
    });

    it('extract("123,45") should return 123.45', () => {
        expect(extract('123.45')).to.eq(123.45);
    });
});

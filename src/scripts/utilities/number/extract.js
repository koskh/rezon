// @flow

const regex = /^[+-]?\d+([.,]\d+)?$/;

module.exports = function (value: string): number {
    if (value.length === 0)
        return NaN;

    if (!regex.test(value))
        return NaN;

    return parseFloat(value.replace(',', '.'));
};

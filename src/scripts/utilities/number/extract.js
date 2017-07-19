// @flow

const regex = /^[+-]?\d+([.,]\d+)?$/;

export default function (value: string): number {
    if (value === undefined)
        return NaN;

    //eslint-disable-next-line
    value = `${value}`;

    if (value.length === 0)
        return NaN;

    if (!regex.test(value))
        return NaN;

    return parseFloat(value.replace(',', '.'));
}

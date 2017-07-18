// @flow

const regex = /^[+-]?\d+([.,]\d+)?$/;

export default function (value: string): number {
    if (value === undefined)
        return NaN;
    if (value.length === 0)
        return NaN;

    if (!regex.test(value))
        return NaN;

    return parseFloat(value.replace(',', '.'));
}

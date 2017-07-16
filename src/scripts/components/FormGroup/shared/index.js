// @flow

import Input from '../../Input';

import type { validationStates } from '../../FormValidation';
import type { InputTypes } from '../';

export const stateClasses: { [key: validationStates]: string } = { // CSS цветных статусов
    success: 'has-success',
    warning: 'has-warning',
    error: 'has-danger',
    info: 'has-info'
};

export const Components: { [key: InputTypes]: ReactClass<any> } = { // возможн компоненты ввода данных
    // date: null,
    // suggest: null,
    // text: null,
    input: Input
};


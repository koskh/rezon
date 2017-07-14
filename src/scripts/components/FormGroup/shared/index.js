// @flow

import type { validationStates } from '../../FormValidation';

export type InputTypes = 'date' | 'suggest' | 'text' | 'input';

export const stateClasses: { [key: validationStates]: string } = {
    success: 'has-success',
    warning: 'has-warning',
    error: 'has-danger',
    info: 'has-info'
};


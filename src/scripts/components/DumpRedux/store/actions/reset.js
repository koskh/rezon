import { RESET } from '../constants';
import { createAction } from '../../../../store/utilities';

const reset = createAction(RESET);

export default () => { console.log('reset'); return reset()};

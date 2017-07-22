import { FETCH_REQUEST } from '../constants';
import { createAction } from '../../../../store/utilities';

const fetchRequest = createAction(FETCH_REQUEST);

export default () =>  fetchRequest();

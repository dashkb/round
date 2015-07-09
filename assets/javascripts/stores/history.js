import { createStore } from '../lib';
import {
  HISTORY_FETCH_START,
  HISTORY_FETCH_SUCCESS,
  HISTORY_FETCH_FAILURE
} from '../constants/actions';

const defaultState = {
  history: []
};

export default createStore(defaultState, {
  [HISTORY_FETCH_SUCCESS]: (state, { history }) => ({ history }),
  [HISTORY_FETCH_FAILURE]: (state) => ({
    history: []
  }),
});

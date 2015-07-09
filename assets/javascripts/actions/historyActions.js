import { client } from '../lib';
import {
  HISTORY_FETCH_START,
  HISTORY_FETCH_SUCCESS,
  HISTORY_FETCH_FAILURE
} from '../constants/actions';

export function fetch() {
  return dispatch => {
    dispatch({type: HISTORY_FETCH_START});

    client.get('history').then(
      (result) => dispatch({ ...result, type: HISTORY_FETCH_SUCCESS }),
      (error) => dispatch({ error, type: HISTORY_FETCH_FAILURE })
    );
  }
}

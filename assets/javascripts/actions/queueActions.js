import { client } from '../lib';
import {
  QUEUE_ADD,
  QUEUE_REMOVE,
  QUEUE_CLEAR,
  QUEUE_UP,
  QUEUE_DOWN,
  QUEUE_FETCH_START,
  QUEUE_FETCH_SUCCESS,
  QUEUE_FETCH_FAILURE
} from '../constants/actions';

export function add(track) {
  return {
    track,
    type: QUEUE_ADD
  };
}
export function remove(track) {
  return {
    track,
    type: QUEUE_REMOVE
  };
}
export function clear() {
  return {type: QUEUE_CLEAR};
}
export function up(track) {
  return {
    track,
    type: QUEUE_UP
  };
}
export function down(track) {
  return {
    track,
    type: QUEUE_DOWN
  };
}
export function send(name) {
  return (dispatch, getState) => {
    const data = {
      name,
      ids: getState().Queue.queue.map(t => t.id)
    };

    // We don't care about the result of saving at this point. We will wait to clear until the response, at least.
    // TODO add some sort of notification system and try to save again?
    client.post('queue', { data }).then(
      result => dispatch(clear()),
      error  => console.warn(error)
    );
  }
}
export function fetch() {
  return dispatch => {
    dispatch({type: QUEUE_FETCH_START});

    client.get('queue').then(
      (result) => dispatch({ ...result, type: QUEUE_FETCH_SUCCESS }),
      (error) => dispatch({ error, type: QUEUE_FETCH_FAILURE })
    );
  }
}

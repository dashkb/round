import { client } from '../lib';
import {
  STATUS_STREAM_START,
  STATUS_STREAM_STOP,
  STATUS_STREAM_UPDATE
} from '../constants/actions';

const refreshInterval = 1 * 1000;

export function update() {
  return dispatch => {
    client.get('status').then(
      result => {
        dispatch({ ...result, type: STATUS_STREAM_UPDATE })
      },
      error  => {
        console.warn('Status updated failure! Pausing poll for 10 seconds.', error);
        dispatch(stopStream());
        setTimeout(() => dispatch(startStream()), refreshInterval * 10);
      }
    );
  }
}
export function startStream() {
  return (dispatch, getState) => {
    const { timer } = getState().Status;

    // Already have an active stream going, don't start a new one.
    if (timer) {
      return;
    }

    dispatch(update());
    return dispatch({
      timer: setInterval(() => dispatch(update()), refreshInterval),
      type: STATUS_STREAM_START
    });
  }
}
export function stopStream() {
  return (dispatch, getState) => {
    const { timer } = getState().Status;

    // No timer, nothing to do!
    if (!timer) {
      return;
    }

    clearInterval(timer);
    return dispatch({type: STATUS_STREAM_STOP});
  }
}

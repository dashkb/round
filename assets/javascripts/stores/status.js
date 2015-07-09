import { createStore } from '../lib';
import {
  STATUS_STREAM_START,
  STATUS_STREAM_STOP,
  STATUS_STREAM_UPDATE
} from '../constants/actions';

const defaultState = {
  playing: false,
  paused:  false,
  stopped: true
};

export default createStore(defaultState, {
  [STATUS_STREAM_START]: (state, action) => {
    return {
      ...state,
      timer: action.timer
    };
  },
  [STATUS_STREAM_STOP]: (state) => {
    return {
      ...state,
      timer: null
    };
  },
  [STATUS_STREAM_UPDATE]: (state, action) => ({
    ...state,
    playing:  (action.state === 'playing'),
    paused:   (action.state === 'paused'),
    stopped:  (action.state === 'stopped'),
    position: action.position,
    track:    action.now_playing
  })
});

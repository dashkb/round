import { createStore } from '../lib';
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

const defaultState = {
  queue: [], // Things to be queued
  upcoming: [] // Things already queued
};

function getPosition(queue, track) {
  return queue.indexOf(track);
}
function swapPosition(queue, from, to) {
  if (from > to) {
    let tmp = from;
    to = from;
    from = tmp;
  }

  const front = queue.slice(0, from);
  const back  = queue.slice(to + 1);
  return front.concat(queue[to], queue[from], back);
}

export default createStore(defaultState, {
  [QUEUE_ADD]: (state, { track }) => {
    let { queue } = state;
    if (queue.length < 10 && queue.indexOf(track) === -1) {
      queue = queue.concat(track);
    }

    return {
      ...state,
      queue
    };
  },
  [QUEUE_REMOVE]: (state, { track }) => ({
    ...state,
    queue: state.queue.filter(obj => obj !== track)
  }),
  [QUEUE_CLEAR]: (state) => ({
    ...state,
    queue: []
  }),
  [QUEUE_UP]: (state, { track }) => {
    let pos = getPosition(state.queue, track);

    if (pos === 0) {
      return state;
    } else {
      return {
        ...state,
        queue: swapPosition(state.queue, pos, pos - 1)
      };
    }
  },
  [QUEUE_DOWN]: (state, { track }) => {
    let pos = getPosition(state.queue, track);

    if (pos === state.queue.length - 1) {
      return state;
    } else {
      return {
        ...state,
        queue: swapPosition(state.queue, pos, pos + 1)
      };
    }
  },
  [QUEUE_FETCH_SUCCESS]: (state, { upcoming }) => ({
    ...state,
    upcoming
  }),
  [QUEUE_FETCH_FAILURE]: (state) => ({
    ...state,
    upcoming: []
  }),
});

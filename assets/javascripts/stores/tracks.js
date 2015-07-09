import { createStore } from '../lib';
import {
  TRACK_FETCH_START,
  TRACK_FETCH_COMPLETE,
  TRACK_FETCH_SUCCESS,
  TRACK_FETCH_FAILURE
} from '../constants/actions';

const defaultState = {
  loaded: false,
  tracks: []
};

export default createStore(defaultState, {
  [TRACK_FETCH_START]: (state) => ({
    ...state,
    loading: true
  }),
  [TRACK_FETCH_COMPLETE]: (state) => ({
    ...state,
    loading: false,
    loaded:  true
  }),
  [TRACK_FETCH_SUCCESS]: (state, action) => ({
    ...state,
    page:    action.page,
    pages:   action.pages,
    tracks:  state.tracks.concat(action.results)
  }),
  [TRACK_FETCH_FAILURE]: (state, action) => ({
    ...state,
    loading: false,
    loaded:  false,
    error:   action.error
  })
});

import { createStore } from '../lib';
import {
  ARTIST_FETCH_START,
  ARTIST_FETCH_COMPLETE,
  ARTIST_FETCH_SUCCESS,
  ARTIST_FETCH_FAILURE
} from '../constants/actions';

const defaultState = {
  loaded: false,
  artists: []
};

export default createStore(defaultState, {
  [ARTIST_FETCH_START]: (state) => ({
    ...state,
    loading: true
  }),
  [ARTIST_FETCH_COMPLETE]: (state) => ({
    ...state,
    loading: false,
    loaded:  true
  }),
  [ARTIST_FETCH_SUCCESS]: (state, action) => ({
    ...state,
    page:    action.page,
    pages:   action.pages,
    artists:  state.artists.concat(action.results)
  }),
  [ARTIST_FETCH_FAILURE]: (state, action) => ({
    ...state,
    loading: false,
    loaded:  false,
    error:   action.error
  })
});

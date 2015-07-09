import { createStore } from '../lib';
import {
  ALBUM_FETCH_START,
  ALBUM_FETCH_COMPLETE,
  ALBUM_FETCH_SUCCESS,
  ALBUM_FETCH_FAILURE
} from '../constants/actions';

const defaultState = {
  loaded: false,
  albums: []
};

export default createStore(defaultState, {
  [ALBUM_FETCH_START]: (state) => ({
    ...state,
    loading: true
  }),
  [ALBUM_FETCH_COMPLETE]: (state) => ({
    ...state,
    loading: false,
    loaded:  true
  }),
  [ALBUM_FETCH_SUCCESS]: (state, action) => ({
    ...state,
    page:    action.page,
    pages:   action.pages,
    albums:  state.albums.concat(action.results)
  }),
  [ALBUM_FETCH_FAILURE]: (state, action) => ({
    ...state,
    loading: false,
    loaded:  false,
    error:   action.error
  })
});

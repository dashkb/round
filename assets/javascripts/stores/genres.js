import { createStore } from '../lib';
import {
  GENRE_FETCH_START,
  GENRE_FETCH_COMPLETE,
  GENRE_FETCH_SUCCESS,
  GENRE_FETCH_FAILURE
} from '../constants/actions';

const defaultState = {
  loaded: false,
  genres: []
};

export default createStore(defaultState, {
  [GENRE_FETCH_START]: (state) => ({
    ...state,
    loading: true
  }),
  [GENRE_FETCH_COMPLETE]: (state) => ({
    ...state,
    loading: false,
    loaded:  true
  }),
  [GENRE_FETCH_SUCCESS]: (state, action) => ({
    ...state,
    page:    action.page,
    pages:   action.pages,
    genres:  state.genres.concat(action.results)
  }),
  [GENRE_FETCH_FAILURE]: (state, action) => ({
    ...state,
    loading: false,
    loaded:  false,
    error:   action.error
  })
});

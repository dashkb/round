import { createStore } from '../lib';
import {
  BROWSE_SELECT_GENRE,
  BROWSE_SELECT_ARTIST,
  BROWSE_SET_SEARCH
} from '../constants/actions';

const defaultState = {};

export default createStore(defaultState, {
  [BROWSE_SELECT_GENRE]: (state, action) => {
    if (state.genre === action.id) {
      return {
        ...state,
        genre: null
      };
    } else {
      return {
        ...state,
        genre: action.id
      };
    }
  },
  [BROWSE_SELECT_ARTIST]: (state, action) => {
    if (state.artist === action.id) {
      return {
        ...state,
        artist: null
      };
    } else {
      return {
        ...state,
        artist: action.id
      };
    }
  },
  [BROWSE_SET_SEARCH]: (state, action) => ({
    ...state,
    search: action.search
  })
});

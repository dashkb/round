import { createStore } from '../lib';
import {
  ACCESS_LIST_FETCH_START,
  ACCESS_LIST_FETCH_SUCCESS,
  ACCESS_LIST_FETCH_FAILURE,
  ACCESS_LIST_BLACKLIST,
  ACCESS_LIST_BLACKLIST_SUCCESS,
  ACCESS_LIST_BLACKLIST_FAILED,
  ACCESS_LIST_WHITELIST,
  ACCESS_LIST_WHITELIST_SUCCESS,
  ACCESS_LIST_WHITELIST_FAILED,
  ACCESS_LIST_REMOVE,
  ACCESS_LIST_REMOVE_SUCCESS,
  ACCESS_LIST_REMOVE_FAILED
} from '../constants/actions';

const defaultState = {
  loading: false
};

export default createStore(defaultState, {
  [ACCESS_LIST_FETCH_START]: (state) => ({
    ...state,
    loading: true
  }),
  [ACCESS_LIST_FETCH_SUCCESS]: (state, action) => ({
    loading: false,
    allowed_genres:  new Set(action.allow_genres),
    blocked_genres:  new Set(action.block_genres),
    allowed_artists: new Set(action.allow_artists),
    blocked_artists: new Set(action.block_artists),
    saved_lists:     action.saved_lists
  }),
  [ACCESS_LIST_FETCH_FAILURE]: (state) => ({
    ...state,
    loading: false
  }),
  [ACCESS_LIST_BLACKLIST_SUCCESS]: (state, action) => {
    let listName = `blocked_${action.store}s`,
        list     = state[listName] || new Set();

    return {
      ...state,
      [listName]: list.add(action.item)
    }
  },
  [ACCESS_LIST_WHITELIST_SUCCESS]: (state, action) => {
    let listName = `allowed_${action.store}s`,
        list     = state[listName] || new Set();

    return {
      ...state,
      [listName]: list.add(action.item)
    }
  },
  [ACCESS_LIST_REMOVE_SUCCESS]: (state, action) => {
    // TODO look at ImmutableJS for an immutable set -_-
    state[`blocked_${action.store}s`] && state[`blocked_${action.store}s`].delete(action.item);
    state[`allowed_${action.store}s`] && state[`allowed_${action.store}s`].delete(action.item);

    return state;
  },
  [ACCESS_LIST_BLACKLIST_FAILED]: (state, action) => {
    alert('Unable to blacklist item as it would prevent any tracks from playing.');
    alert(action.error);
    return state;
  },
  [ACCESS_LIST_WHITELIST_FAILED]: (state, action) => {
    alert('Unable to whitelist item as it would prevent any tracks from playing.');
    return state;
  }
});

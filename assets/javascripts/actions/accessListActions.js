import { client } from '../lib';
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

export function fetch() {
  return dispatch => {
    dispatch({type: ACCESS_LIST_FETCH_START});

    client.get('admin/access_lists').then(
      (result) => dispatch({ ...result, type: ACCESS_LIST_FETCH_SUCCESS }),
      (error) => dispatch({ error, type: ACCESS_LIST_FETCH_FAILURE })
    );
  };
}

export function blacklist(store, item) {
  return dispatch => {
    dispatch({type: ACCESS_LIST_BLACKLIST});

    const data = { store, allowed: false, id: item.id };
    client.post('admin/access_lists', { data }).then(
      (result) => dispatch({ store, item, type: ACCESS_LIST_BLACKLIST_SUCCESS }),
      (error) => dispatch({ error, type: ACCESS_LIST_BLACKLIST_FAILURE })
    );
  };
}
export function whitelist(store, item) {
  return dispatch => {
    dispatch({type: ACCESS_LIST_WHITELIST});

    const data = { store, allowed: true, id: item.id };
    return client.post('admin/access_lists', { data }).then(
      (result) => dispatch({ store, item, type: ACCESS_LIST_WHITELIST_SUCCESS }),
      (error) => dispatch({ error, type: ACCESS_LIST_WHITELIST_FAILURE })
    );
  };
}
export function remove(store, item) {
  return dispatch => {
    dispatch({type: ACCESS_LIST_REMOVE});

    const data = { store, id: item.id };
    client.del('admin/access_lists', { data }).then(
      (result) => dispatch({ store, item, type: ACCESS_LIST_REMOVE_SUCCESS }),
    );
  };
}

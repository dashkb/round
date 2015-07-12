import { client } from '../lib';
import {
  ACCESS_LIST_FETCH_START,
  ACCESS_LIST_FETCH_SUCCESS,
  ACCESS_LIST_FETCH_FAILED,
  ACCESS_LIST_CLEAR_START,
  ACCESS_LIST_CLEAR_SUCCESS,
  ACCESS_LIST_CLEAR_FAILED,
  ACCESS_LIST_BLACKLIST,
  ACCESS_LIST_BLACKLIST_SUCCESS,
  ACCESS_LIST_BLACKLIST_FAILED,
  ACCESS_LIST_WHITELIST,
  ACCESS_LIST_WHITELIST_SUCCESS,
  ACCESS_LIST_WHITELIST_FAILED,
  ACCESS_LIST_REMOVE,
  ACCESS_LIST_REMOVE_SUCCESS,
  ACCESS_LIST_REMOVE_FAILED,
  ACCESS_LIST_SAVE,
  ACCESS_LIST_LOAD
} from '../constants/actions';

export function fetch() {
  return dispatch => {
    dispatch({type: ACCESS_LIST_FETCH_START});

    client.get('admin/access_lists').then(
      (result) => dispatch({ ...result, type: ACCESS_LIST_FETCH_SUCCESS }),
      (error) => dispatch({ error, type: ACCESS_LIST_FETCH_FAILED })
    );
  };
}
export function clear() {
  return dispatch => {
    dispatch({type: ACCESS_LIST_CLEAR_START});

    client.post('admin/access_lists/clear').then(
      (result) => dispatch({ ...result, type: ACCESS_LIST_CLEAR_SUCCESS }),
      (error) => dispatch({ error, type: ACCESS_LIST_CLEAR_FAILED })
    );
  };
}

export function blacklist(store, item) {
  return dispatch => {
    dispatch({type: ACCESS_LIST_BLACKLIST});

    const data = { store, allowed: false, id: item.id };
    client.post('admin/access_lists', { data }).then(
      (result) => dispatch({ store, item, type: ACCESS_LIST_BLACKLIST_SUCCESS }),
      (error) => dispatch({ error, type: ACCESS_LIST_BLACKLIST_FAILED })
    );
  };
}
export function whitelist(store, item) {
  return dispatch => {
    dispatch({type: ACCESS_LIST_WHITELIST});

    const data = { store, allowed: true, id: item.id };
    return client.post('admin/access_lists', { data }).then(
      (result) => dispatch({ store, item, type: ACCESS_LIST_WHITELIST_SUCCESS }),
      (error) => dispatch({ error, type: ACCESS_LIST_WHITELIST_FAILED })
    );
  };
}
export function remove(store, item) {
  return dispatch => {
    dispatch({type: ACCESS_LIST_REMOVE});

    const data = { store, id: item.id };
    client.del('admin/access_lists', { data }).then(
      (result) => dispatch({ store, item, type: ACCESS_LIST_REMOVE_SUCCESS }),
      (error) => dispatch({ error, type: ACCESS_LIST_REMOVE_FAILED })
    );
  };
}

export function save(name) {
  return dispatch => {
    const data = { name };
    client.post('admin/access_lists/save', { data }).then(
      (result) => dispatch({ name, type: ACCESS_LIST_SAVE })
    );
  };
}
export function load(id) {
  return dispatch => {
    const data = { id };
    client.post('admin/access_lists/load', { data }).then(
      (result) => dispatch({ id, type: ACCESS_LIST_LOAD })
    );
  };
}

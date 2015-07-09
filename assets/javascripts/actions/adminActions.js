import { client } from '../lib';
import {
  ADMIN_LOGIN,
  ADMIN_LOGOUT,
  ADMIN_PLAY,
  ADMIN_PAUSE,
  ADMIN_SKIP
} from '../constants/actions';

const stayLoggedInFor = 5 * 60 * 1000;
const passwords = new Set(['test']);

export function login(password) {
  return (dispatch, getState) => {
    // Nothing to do if we're alread an admin.
    if (getState().Admin.isAdmin) {
      return;
    }

    if (passwords.has(password)) {
      dispatch({
        timer: setTimeout(() => dispatch(logout()), stayLoggedInFor),
        type: ADMIN_LOGIN
      });
    }
  }
}
export function logout() {
  return (dispatch, getState) => {
    const { timer } = getState().Admin;

    if (timer) {
      clearTimeout(timer);
    }

    dispatch({type: ADMIN_LOGOUT});
  }
}

export function play() {
  return (dispatch, getState) => {
    if (!getState().Admin.isAdmin) {
      return;
    }

    client.get('admin/play').then(
      result => dispatch({type: ADMIN_PLAY})
    );
  }
}
export function pause() {
  return (dispatch, getState) => {
    if (!getState().Admin.isAdmin) {
      return;
    }

    client.get('admin/pause').then(
      result => dispatch({type: ADMIN_PAUSE})
    );
  }
}
export function skip() {
  return (dispatch, getState) => {
    if (!getState().Admin.isAdmin) {
      return;
    }

    client.get('admin/skip').then(
      result => dispatch({type: ADMIN_SKIP})
    );
  }
}

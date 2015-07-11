import { client } from '../lib';
import {
  ADMIN_LOGIN,
  ADMIN_LOGOUT,
  ADMIN_PLAY,
  ADMIN_PLAY_NOW,
  ADMIN_PAUSE,
  ADMIN_SKIP
} from '../constants/actions';

const stayLoggedInFor = 5 * 60 * 1000;
const passwords = new Set(['test']);

function requireAdmin(callback) {
  return (dispatch, getState) => {
    if (!getState().Admin.isAdmin) {
      return;
    } else {
      callback(dispatch, getState);
    }
  }
}

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
  return requireAdmin((dispatch, getState) => {
    client.get('admin/play').then(
      result => dispatch({type: ADMIN_PLAY})
    );
  });
}
export function pause() {
  return requireAdmin((dispatch, getState) => {
    client.get('admin/pause').then(
      result => dispatch({type: ADMIN_PAUSE})
    );
  });
}
export function skip() {
  return requireAdmin((dispatch, getState) => {
    client.get('admin/skip').then(
      result => dispatch({type: ADMIN_SKIP})
    );
  });
}
export function playNow(track) {
  return requireAdmin((dispatch, getState) => {
    let data = { id: track.id };

    client.post('admin/play', { data }).then(
      result => dispatch({type: ADMIN_PLAY_NOW})
    );
  });
}

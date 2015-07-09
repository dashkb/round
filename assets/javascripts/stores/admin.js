import { createStore } from '../lib';
import {
  ADMIN_LOGIN,
  ADMIN_LOGOUT
} from '../constants/actions';

const defaultState = {
  isAdmin: false
};

export default createStore(defaultState, {
  [ADMIN_LOGIN]: (state, action) => {
    return {
      timer: action.timer,
      isAdmin: true
    }
  },
  [ADMIN_LOGOUT]: (state) => {
    return {isAdmin: false};
  }
});

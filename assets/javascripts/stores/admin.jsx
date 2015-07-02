import createStore from 'flux/store';
import ajax from 'lib/ajax';
import * as AdminActions from 'actions/admin';

let access_time = 5 * 60 * 1000; // 5 minutes
let passwords = [
  'test'
];

export default createStore('Admin Controls', {
  initialize: function() {
    this.isAdmin = false;
    this.timeout = null;

    this.dispatch(AdminActions.login).to(this.tryToLogin);
    this.dispatch(AdminActions.logout).to(this.forceLogout);
    this.dispatch(AdminActions.skip).to(this.skip);
    this.dispatch(AdminActions.pause).to(this.pause);
    this.dispatch(AdminActions.play).to(this.play);
  },

  tryToLogin: function(payload) {
    if (!this.timeout) {
      this.isAdmin = (passwords.indexOf(payload.password) >= 0);
      this.timeout = setTimeout(this.forceLogout.bind(this), access_time);
    }

    this.trigger();
  },

  forceLogout: function() {
    this.timeout = null;
    this.isAdmin = false;
    this.trigger();
  },

  skip: function() {
    if (this.isAdmin) {
      ajax('/api/admin/skip', () => this.trigger());
    }
  },
  pause: function() {
    if (this.isAdmin) {
      ajax('/api/admin/pause', () => this.trigger());
    }
  },
  play: function() {
    if (this.isAdmin) {
      ajax('/api/admin/play', () => this.trigger());
    }
  },

  public: {
    isAdmin: function() {
      return this.isAdmin;
    }
  }
});

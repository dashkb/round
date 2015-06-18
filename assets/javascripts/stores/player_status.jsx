import { createStore } from '../flux';
import ajax from '../ajax';
import { IdentFactory } from '../utils';
import * as StatusActions from '../actions/player_status';

let streamIdent = new IdentFactory('Streaming');

let statusStore = createStore('Player Status', {
  initialize: function() {
    this.status = {};
    this.streamID = null;

    this.dispatch(StatusActions.fetch).to(this.fetchStatus);
    this.dispatch(StatusActions.startStream).to(this.startStream);
    this.dispatch(StatusActions.stopStream).to(this.stopStream);
  },

  fetchStatus: function(payload) {
    let self = this,
        wait = (payload.interval || 1000);

    ajax('/api/status', function(status) {
      self.updateStatus({ status });

      if (self.streamID === payload.streamID) {
        let handler = () => StatusActions.fetch(payload.streamID, wait);
        self.streamTimer = setTimeout(handler, wait);
      }
    });
  },

  updateStatus: function(payload) {
    this.status = payload.status;
    this.trigger();
  },

  startStream: function(payload) {
    if (this.streamID) {
      return false;
    }

    let streamID = streamIdent.next();
    this.streamID = streamID;
    this.trigger();
    this.fetchStatus({ streamID, interval: payload.interval });
  },
  stopStream: function(payload) {
    if (!this.streamID) {
      return false;
    }

    this.streamID = null;
    clearTimeout(this.streamTimer);
    this.trigger();
  },

  public: {
    getStatus: function() {
      return this.status;
    }
  }
});

export default statusStore;

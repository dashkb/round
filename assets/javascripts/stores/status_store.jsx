import createStore from 'flux/store';
import ajax from 'lib/ajax';
import IdentFactory from 'lib/ident_factory';
import * as StatusActions from 'actions/player_status';

let streamIdent = new IdentFactory('Streaming');

export default createStore('Player Status', {
  initialize: function() {
    this.status = {};
    this.streamID = null;
    this.count = 0;

    this.dispatch(StatusActions.fetch).to(this.fetchStatus);
    this.dispatch(StatusActions.startStream).to(this.startStream);
    this.dispatch(StatusActions.stopStream).to(this.stopStream);
  },

  fetchStatus: function(payload) {
    let wait = (payload.interval || 1000);

    ajax({
      method: 'get',
      url:    '/api/status',
      success: status => {
        this.updateStatus({ status });

        if (this.streamID === payload.streamID) {
          let handler = () => StatusActions.fetch(payload.streamID, wait);
          this.streamTimer = setTimeout(handler, wait);
        }
      },
      failure: () => {
        console.error(`Failed to fetch status, waiting for ${wait * 10}ms before trying again.`);

        if (this.streamID === payload.streamID) {
          let handler = () => StatusActions.fetch(payload.streamID, wait);
          this.streamTimer = setTimeout(handler, wait * 10);
        }
      }
    });
  },

  updateStatus: function(payload) {
    this.status = payload.status;
    this.trigger();
  },

  startStream: function(payload) {
    this.count += 1;

    if (!this.streamID) {
      let streamID = streamIdent.next();
      this.streamID = streamID;
      setTimeout(() => this.fetchStatus({ streamID, interval: payload.interval }));
    }

    this.trigger();
  },
  stopStream: function(payload) {
    this.count = Math.max(0, this.count - 1);

    if (this.count === 0 && this.streamID) {
      this.streamID = null;
      clearTimeout(this.streamTimer);
    }

    this.trigger();
  },

  public: {
    getStatus: function() {
      return {
        status:   this.status.state,
        position: this.status.position,
        playing:  this.status.now_playing
      }
    }
  }
});

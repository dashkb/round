import createStore from 'flux/store';
import ajax from 'lib/ajax';
import * as QueueActions from 'actions/queue';

export default createStore('Queue Builder', {
  initialize: function() {
    this.queue = Array();

    this.dispatch(QueueActions.add).to(this.addTrack);
    this.dispatch(QueueActions.remove).to(this.removeTrack);
    this.dispatch(QueueActions.moveUp).to(this.moveUp);
    this.dispatch(QueueActions.moveDown).to(this.moveDown);
    this.dispatch(QueueActions.clear).to(this.clear);
    this.dispatch(QueueActions.send).to(this.send);
  },

  has: function(track) {
    for (let entry of this.queue) {
      if (entry.id === track.id) {
        return true;
      }
    }

    return false;
  },

  addTrack: function(payload) {
    if (!this.has(payload.track)) {
      this.queue.push(payload.track);
    }
    this.trigger();
  },

  removeTrack: function(payload) {
    this.queue = this.queue.filter(track => track.id !== payload.track.id)
    this.trigger();
  },

  moveUp: function(payload) {
    let position = this.getPosition(payload.track);
    if (position > 0)
      this.swapPosition(position, position - 1);

    this.trigger();
  },
  moveDown: function(payload) {
    let position = this.getPosition(payload.track);
    if (position >= 0 && position < this.queue.length - 1)
      this.swapPosition(position, position + 1);

    this.trigger();
  },

  clear: function(payload) {
    this.queue = Array();
    this.trigger();
  },

  send: function(payload) {
    let queue = this.queue.map(track => track.id);

    ajax({
      method: 'post',
      url:    '/api/queue',
      data:   {ids: queue, name: payload.name},
      success: () => {
        this.queue = Array();
        if (typeof(payload.callback) === 'function') {
          payload.callback();
        }
      },
      failure: () => {
        alert('Failed to save queue! Try again or ask for assistance.');
      },
      abort: () => {
        alert('Aborted saving the queue! Try again or ask for assistance.');
      }
    });
  },

  swapPosition: function(from, to) {
    let tmp = this.queue[to];
    this.queue[to] = this.queue[from];
    this.queue[from] = tmp;
  },
  getPosition: function(track) {
    return this.queue.indexOf(track);
  },

  public: {
    getQueue: function() {
      return this.queue;
    }
  }
});

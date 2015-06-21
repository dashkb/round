import { createStore } from '../flux';

let trackStore = createStore('Tracks', {
  initialize: function(options) {
    this.tracks = options.tracks;
  },

  public: {
    getAll: function() {
      return this.tracks;
    }
  }
});

export default trackStore;

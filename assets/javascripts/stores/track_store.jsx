import { createStore } from 'flux';

export default createStore('Tracks', {
  initialize: function(options) {
    this.tracks = options.tracks;
  },

  public: {
    getAll: function() {
      return this.tracks;
    }
  }
});

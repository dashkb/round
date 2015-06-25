import { createStore } from 'flux';

export default createStore('Artists', {
  initialize: function(options) {
    this.artists = options.artists;
  },

  public: {
    getAll: function() { return this.artists; }
  }
});

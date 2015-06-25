import { createStore } from 'flux';

export default createStore('Genres', {
  initialize: function(options) {
    this.genres = options.genres;
  },

  public: {
    getAll: function() { return this.genres; }
  }
});

import { createStore } from '../flux';

let genreStore = createStore('Genres', {
  initialize: function(options) {
    this.genres = options.genres;
  },

  public: {
    getAll: function() { return this.genres; }
  }
});

export default genreStore;

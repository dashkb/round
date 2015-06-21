import { createStore } from '../flux';

let artistStore = createStore('Artists', {
  initialize: function(options) {
    this.artists = options.artists;
  },

  public: {
    getAll: function() {
      return this.artists;
    }
  }
});

export default artistStore;

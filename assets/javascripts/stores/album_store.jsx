import { createStore } from '../flux';

let albumStore = createStore('Albums', {
  initialize: function(options) {
    this.albums = options.albums;
  },

  public: {
    getAll: function() {
      return this.albums;
    }
  }
});

export default albumStore;

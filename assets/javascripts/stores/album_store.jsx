import createStore from 'flux/store';

export default createStore('Albums', {
  initialize: function(options) {
    this.albums = options.albums;
  },

  public: {
    getAll: function() {
      return this.albums;
    }
  }
});

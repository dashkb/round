window.App =
  start: ->
    log.setLevel log.levels.DEBUG
    Deferred.installInto(Zepto)
    @$page = ($ '#page')

    @searchView = new @SearchView
    @searchView.render().appendTo @$page

  searchIsTooShort: ->
    _.each [@trackView, @artistView, @albumView], (view) ->
      view?.destroy()

  gotSearchResult: (data) ->
    newTrackView = new @CollectionView
      collection: new Backbone.Collection data.tracks
      type: 'track'
      heading: 'Tracks'
    .render()

    newArtistView = new @CollectionView
      collection: new Backbone.Collection data.artists
      type: 'artist'
      heading: 'Artists'
    .render()

    newAlbumView = new @CollectionView
      collection: new Backbone.Collection data.albums
      type: 'album'
      heading: 'Albums'

    @trackView?.destroy()
    @trackView = newTrackView
    @trackView.appendTo @$page

    @artistView?.destroy()
    @artistView = newArtistView
    @artistView.appendTo @$page

    @albumView?.destroy()
    @albumView = newArtistView
    @albumView.appendTo @$page


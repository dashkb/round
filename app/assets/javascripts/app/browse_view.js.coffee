class App.BrowseView extends App.View
  template: JST['browse']
  initialize: ->
    @genres  = App.genres
    @artists = App.artists

    @on 'show', => @trackView.render()

  render: ->
    _.tap super(), =>
      @genreView?.destroy()
      @artistView?.destroy()

      @genreView = new App.CollectionView
        el: (@$ '.genres')
        collection: @genres
        type: 'genre'
        heading: 'Genres'
      .render()

      @artistView = new App.CollectionView
        el: (@$ '.artists')
        collection: @artists
        type: 'artist'
        heading: 'Artists'
      .render()

      @trackView = new App.TrackView
        el: (@$ '.tracks')
      .render()

  events:
    'activate': 'activate'
    'deactivate': 'deactivate'

  deactivate: (e, type) ->
    e.stopPropagation()
    if thing.type == 'artist'
      @artist = undefined
      @filterTracks()
    else if thing.type == 'genre'
      @genre = undefined
      @filterArtists()

  activate: (e, thing) ->
    e.stopPropagation()
    if thing.type == 'artist'
      @artist = App.artists.findWhere id: thing.id
      @filterTracks()
    else if thing.type == 'genre'
      @genre = App.genres.findWhere id: thing.id
      @filterArtists()

  filterArtists: ->
    if @query
      @artists = App.artists.filter (artist) =>
        artist.get('name').indexOf(@query) != -1
    else if @genre
      @artists = App.artists.filter (artist) =>
        artist.get('genre_ids').indexOf(@genre.id) != -1
    else
      @artists = App.artists

    @artists = new Backbone.Collection @artists
    @artistView.collection = @artists
    @artistView.render()


  filterTracks: ->
    @ajax?.abort()
    @ajax = $.get "/browse/artists/#{@artist.get 'id'}.json"
    @ajax.success (data) =>
      @trackView.data = data
      @trackView.render()

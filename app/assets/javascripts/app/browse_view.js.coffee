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
        showAllLine: true
      .render()

      @artistView = new App.CollectionView
        el: (@$ '.artists')
        collection: @artists
        type: 'artist'
        heading: 'Artists'
        showAllLine: true
      .render()

      @trackView = new App.TrackView
        el: (@$ '.tracks')
      .render()

  events:
    'activate': 'activate'
    'deactivate': 'deactivate'
    'input input.filter': 'queryChanged'

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
      if thing.id == 'all'
        @artist = undefined
      else
        @artist = App.artists.findWhere id: thing.id

      @filterTracks()
    else if thing.type == 'genre'
      if thing.id == 'all'
        @genre = undefined
      else
        @genre = App.genres.findWhere id: thing.id

      @artist = undefined
      @filterArtists()

  filterArtists: ->
    if @query
      @artists = new Backbone.Collection (
        App.artists.filter (artist) =>
          artist.get('name').indexOf(@query) != -1
      )
    else if @genre
      @artists = new Backbone.Collection (
        App.artists.filter (artist) =>
          artist.get('genre_ids').indexOf(@genre.id) != -1
      )
    else
      @artists = App.artists

    @artistView.collection = @artists
    @artistView.render()
    @filterTracks()


  filterTracks: ->
    @ajax?.abort()
    if @artist
      @ajax = $.get "/browse/artists/#{@artist.get 'id'}.json"
      @ajax.success (data) =>
        @trackView.applyData data
        @trackView.render()
    else
      @trackView.applyData undefined
      @trackView.render()

  queryChanged: _.throttle (e) ->
    @ajax?.abort()

    val = ($ e.target).val()
    @query = if val.length >= 3 then val else undefined

    @genreView.applyFilter @query unless @genre
    @artistView.applyFilter @query unless @artist

    if @artist
      @trackView.applyFilter @query
    else
      if @query
        @ajax = $.get "/search?term=#{@query}"
        @ajax.success (data) =>
          @trackView.applyData data
          @trackView.render()
      else
        @trackView.applyData undefined
        @trackView.render()

  , 2000, leading: false

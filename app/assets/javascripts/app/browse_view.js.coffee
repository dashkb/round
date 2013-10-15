class App.BrowseView extends App.View
  template: JST['browse']
  events:
    'activate': 'activate'
    'deactivate': 'deactivate'
    'input input.filter': 'queryChanged'
    'click span.reset': 'resetEverything'

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
    ($ 'span.reset').fadeIn()
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
    if @genre
      @artists = new Backbone.Collection (
        App.artists.filter (artist) =>
          artist.get('genre_ids').indexOf(@genre.id) != -1
      )
    else if @query
      @artists = new Backbone.Collection (
        App.artists.filter (artist) =>
          artist.get('name').indexOf(@query) != -1
      )
    else
      @artists = App.artists

    @artistView.collection = @artists
    @artistView.render()
    @filterTracks()


  filterTracks: ->
    _.tap new $.Deferred, (p) =>
      @ajax?.abort()
      @unspin()
      if @artist
        @ajax = $.get "/browse/artists/#{@artist.get 'id'}.json"
        @ajax.success (data) =>
          @trackView.applyData data
          @trackView.render()
          p.resolve()
      else
        @trackView.applyData undefined
        @trackView.render()
        p.resolve()

  queryChanged: _.throttle (e) ->
    ($ 'span.reset').fadeIn()
    @ajax?.abort()
    @unspin()

    val = ($ e.target).val()
    @query = if val.length >= 3 then val else undefined

    if @query
      @genreView.applyFilter @query unless @genre || @artist
      @artistView.applyFilter @query unless @artist

      if @artist
        @filterTracks().then =>
          @trackView.applyFilter @query
      else
        @spin()
        @ajax = $.get "/search?term=#{@query}"
        @ajax.success (data) =>
          @unspin()
          @trackView.applyData data
    else
      @spin()
      @trackView.applyData undefined
      _.each [@trackView, @artistView, @genreView], (view) =>
        view.applyFilter undefined

      @unspin()

  , 1000, leading: false

  spin: ->
    log.info 'spinning'
    ($ '.icon-search').addClass 'hide'
    ($ '.icon-spinner').removeClass 'hide'

  unspin: ->
    ($ '.icon-spinner').addClass 'hide'
    ($ '.icon-search').removeClass 'hide'

  resetEverything: ->
    @query = undefined
    @ajax?.abort()
    @unspin()
    @artist = undefined
    @genre = undefined
    ($ 'span.reset').fadeOut()
    @render()

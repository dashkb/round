window.App =
  start: ->
    log.setLevel log.levels.DEBUG
    Deferred.installInto(Zepto)
    @csrf_token = ($ 'meta[name="csrf-token"]').attr('content')
    @$spinner   = ($ '#app-spinner')
    @$page      = ($ '#page')
    @setupAjax()

    @searchView = new @SearchView
    @searchView.render().appendTo @$page

    @nowPlayingView = new @NowPlayingView
    @nowPlayingView.render().appendTo ($ '#top-nav .topnav-main')

    setInterval =>
      $.get '/player/status', (response) =>
        nowPlaying = if response.now_playing? then new Backbone.Model(response.now_playing) else null
        @playerStatus =
          nowPlaying: nowPlaying
          queue: new Backbone.Collection response.queue
        @trigger 'player status update'
    , 2000

  resetSearch: ->
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
    .render()

    @trackView?.destroy()
    @trackView = newTrackView
    @trackView.appendTo @$page

    @artistView?.destroy()
    @artistView = newArtistView
    @artistView.appendTo @$page

    @albumView?.destroy()
    @albumView = newAlbumView
    @albumView.appendTo @$page

  setupAjax: ->
    spinnerTimeout = null

    ($ document).on 'ajaxSend', (event, xhr) =>
      if spinnerTimeout
        clearTimeout spinnerTimeout
        spinnerTimeout = null

      @$spinner.removeClass('icon-usd').addClass('icon-spin icon-spinner')
      xhr.setRequestHeader 'X-CSRF-Token', @csrf_token
      xhr.setRequestHeader 'Accept', 'application/json'
      xhr.cache = false

    ($ document).on 'ajaxError', (args...) =>
      log.debug "request error", args...

    ($ document).on 'ajaxComplete', =>
      spinnerTimeout = setTimeout =>
        @$spinner.removeClass('icon-spin icon-spinner').addClass('icon-usd')
      , 500


_.extend App, Backbone.Events

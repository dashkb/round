window.App =
  idleTimeout: 60000
  pollInterval: 7000
  start: ->
    log.setLevel log.levels.DEBUG
    @csrf_token = ($ 'meta[name="csrf-token"]').attr('content')
    @$spinner   = ($ '#app-spinner')
    @setupAjax()

    ($ '#queue-link').on 'click', => page '/queue'
    ($ '#search-link').on 'click', => page '/search'
    ($ document).on 'touch', => @touched()

    @nowPlayingView = new @NowPlayingView el: ($ '#now-playing')
    @nowPlayingView.render()

    @subViews =
      idle: new @IdleView el: ($ '#idle')
      browse: new @BrowseView el: ($ '#browse')
      queue: new @QueueView
        el: ($ '#queue')
        type: 'track'
        heading: 'Play Queue'
        emptyMessage: 'Play Queue is Empty!'
      search: new @SearchView el: ($ '#search')
      tim: new @TimView el: ($ '#tim')
      playlists: new @PlaylistsView el: ($ '#playlists')

    _.each @subViews, (view) -> view.render()

    setInterval =>
      $.get "/player/status?now=#{Date.now()}", (response) =>
        nowPlaying = if response.now_playing? then new Backbone.Model(response.now_playing) else null
        @playerStatus =
          nowPlaying: nowPlaying
          queue: new Backbone.Collection response.queue
        @trigger 'player status update'
    , @pollInterval

    @lastTouchAt = Date.now()
    setTimeout =>
      setInterval =>
        @checkLastTouch()
      , 2000
    , 300

    page()

  show: (viewToShow) ->
    _.each @subViews, (view, key) ->
      if key == viewToShow then view.show() else view.hide()

  browse: (type, id) ->
    @subViews.browse.reset type, id
    @show 'browse'

  touched: ->
    @lastTouchAt = Date.now()
    @show 'search' if @subViews.idle.shown

  checkLastTouch: ->
    @show 'idle' if Date.now() - @lastTouchAt > @idleTimeout

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

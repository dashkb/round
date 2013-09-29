window.App =
  idleTimeout: 30000
  pollInterval: 7000
  start: ->
    log.setLevel log.levels.DEBUG
    Deferred.installInto(Zepto)
    @csrf_token = ($ 'meta[name="csrf-token"]').attr('content')
    @$spinner   = ($ '#app-spinner')
    @setupAjax()

    @idleView = new @IdleView el: ($ '#idle')
    @idleView.render()

    @browseView = new @BrowseView el: ($ '#browse')
    @browseView.render()

    @queueView = new @QueueView
      el: ($ '#queue')
      type: 'track'
      heading: 'Play Queue'
      emptyMessage: 'Play Queue is Empty!'
    .render()
    ($ '#queue-link').on 'click', => page '/queue'

    @searchView = new @SearchView el: ($ '#search')
    @searchView.render()
    ($ '#search-link').on 'click', => page '/search'

    @nowPlayingView = new @NowPlayingView el: ($ '#now-playing')
    @nowPlayingView.render()

    @timView = new @TimView el: ($ '#tim')
    @timView.render()

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
    log.info "App.show #{viewToShow.constructor.name}"
    _.each [@searchView, @queueView, @browseView, @timView, @idleView], (view) ->
      if view == viewToShow then view.show() else view.hide()

  browse: (type, id) ->
    @show @browseView.reset type, id

  touched: ->
    @lastTouchAt = Date.now()
    @show @searchView if @idleView.shown

  checkLastTouch: ->
    @show @idleView if Date.now() - @lastTouchAt > @idleTimeout

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

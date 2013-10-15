window.App =
  idleTimeout: 60000
  pollInterval: 7000
  resetTimeout: 5000
  queueMax: 10
  start: ->
    log.setLevel log.levels.INFO
    @csrf_token = ($ 'meta[name="csrf-token"]').attr('content')
    @$spinner   = ($ '#app-spinner')
    @setupAjax()

    ($ document).on 'click', => @touched()

    @artists = new Backbone.Collection
    @artists.comparator = 'sort_name'
    @artists.add window.artists

    @genres = new Backbone.Collection
    @genres.comparator = 'name'
    @genres.add window.genres

    if TryMeSuckaz.userIsTim
      ($ 'body').addClass 'tim'

    @subViews =
      idle: new @IdleView el: ($ '#idle')
      browse: new @BrowseView el: ($ '#browse')
      queue: new @QueueView
        el: ($ '#queue')
        type: 'track'
        heading: 'Play Queue'
        emptyMessage: 'Play Queue is Empty!'
      tim: new @TimView el: ($ '#tim')
      missing_albums: new @MissingAlbumsView el: ($ '#missingAlbums')
      justQueued: new @JustQueuedView el: ($ '#justQueued')

    _.each @subViews, (view) -> view.render()

    @getPlayerStatus()
    setInterval =>
      @getPlayerStatus()
    , @pollInterval

    @lastTouchAt = Date.now()
    setTimeout =>
      setInterval =>
        @checkLastTouch()
      , 2000
    , 300

    @subViews.browse.on 'show', =>
      @browseSession ?= []

    @subViews.idle.on 'show', =>
      @browseSession = undefined
      App.subViews.browse.resetEverything()

    ($ '#back-button').click -> page '/idle'
    ($ 'body').on 'click', '.btn-group.player button', (e) =>
      action = ($ e.currentTarget).data 'action'
      return if action == 'none'
      $.post "/player/#{action}"
      ($ 'body .btn-group.player').hide()

    page()

  show: (viewToShow) ->
    @touched()
    _.each @subViews, (view, key) ->
      if key == viewToShow then view.show() else view.hide()

  browse: (type, id) ->
    @subViews.browse.reset type, id
    @show 'browse'

  touched: ->
    @lastTouchAt = Date.now()

  checkLastTouch: ->
    if TryMeSuckaz.userIsTim
      window.location.href = "/untimify"

    return if @subViews.idle.shown

    if Date.now() - @lastTouchAt > @idleTimeout
      page '/idle'

  getPlayerStatus: ->
    $.get "/player/status?now=#{Date.now()}", (response) =>
      nowPlaying = if response.now_playing? then new Backbone.Model(response.now_playing) else null
      queueMaxLock = parseInt(response.queue_max_lock)
      if isNaN(queueMaxLock)
        queueMaxLock = undefined

      @playerStatus =
        nowPlaying: nowPlaying
        queue: new Backbone.Collection response.queue,
          model: @Track
        state: response.state
        whitelist: response.whitelist
        queueMaxLock: queueMaxLock
      @trigger 'player status update'

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


  isWhitelisted: (type, item) ->
    _.any @playerStatus?.whitelist?[type], (thing) ->
      return parseInt(thing.id) == item.id

_.extend App, Backbone.Events

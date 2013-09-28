window.App =
  pollInterval: 7000
  start: ->
    log.setLevel log.levels.DEBUG
    Deferred.installInto(Zepto)
    @csrf_token = ($ 'meta[name="csrf-token"]').attr('content')
    @$spinner   = ($ '#app-spinner')
    @setupAjax()


    @idleView = new @IdleView el: ($ '#idle')
    @idleView.render()

    @queueView = new @QueueView el: ($ '#queue')
    @queueView.render()

    @searchView = new @SearchView el: ($ '#search')
    @searchView.render().show()

    @nowPlayingView = new @NowPlayingView
    @nowPlayingView.render().appendTo ($ '#top-nav .topnav-main')

    setInterval =>
      $.get "/player/status?now=#{Date.now()}", (response) =>
        nowPlaying = if response.now_playing? then new Backbone.Model(response.now_playing) else null
        @playerStatus =
          nowPlaying: nowPlaying
          queue: new Backbone.Collection response.queue
        @trigger 'player status update'
    , @pollInterval

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

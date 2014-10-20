define [
  'lib/view'
  'stache!./status'
], (
  View
  template
) ->
  formatTime = (time) ->
    minutes = Math.floor(time / 60)
    seconds = "#{Math.round(time % 60)}"
    seconds = "0#{seconds}" if seconds.length is 1

    "#{minutes}:#{seconds}"

  # Status View listens to updates on `app:status` and renders a little controller
  class StatusView extends View
    'className' : 'status-view'
    'template'  : template

    render: ->
      @listenTo(app, 'status', @updateStatus)
      super
      @updateStatus()
      return this

    updateStatus: ->
      if app.playerStatus.state is 'stopped'
        @stopped()
      else
        @playing()

    stopped: ->
      @$('.playing').hide()
      @$('.stopped').show()

    playing: ->
      @$('.playing').show()
      @$('.stopped').hide()

      playing = app.playerStatus.now_playing

      @$('.track-title').html(playing.name)
      @$('.artist-name').html(playing.artist.name)
      @$('.state').html(app.playerStatus.state)

      @$('.length').html(formatTime(playing.runtime))
      @$('.position').html(formatTime(app.playerStatus.position))

      progress = "#{Math.round((app.playerStatus.position / playing.runtime) * 100)}%"
      @$('.progress-bar').css('width', progress)

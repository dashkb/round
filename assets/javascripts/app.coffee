define [
  'underscore'
  'backbone'
  'collections/genres'
  'collections/artists'
  'collections/albums'
  'collections/tracks'
], (
  _
  Backbone
  Genres
  Artists
  Albums
  Tracks
) ->
  class RoundApp
    playerStatus:
      state: 'stopped'

    constructor: ->
      @genres  = new Genres
      @artists = new Artists
      @albums  = new Albums
      @tracks  = new Tracks

    start: ->
      startStatus()

    stop: ->
      stopStatus()

  statusOn = false

  startStatus = ->
    statusOn = true
    fetchStatus()

  stopStatus = ->
    statusOn = false

  fetchStatus = ->
    return unless statusOn

    $.getJSON('/api/status')
      .done(doneStatus)
      .fail(failStatus)

  doneStatus = (data) ->
    wait = 1000
    # If nothing is playing at all let's slow polling, we will speed it back up once we have a track playing or paused
    wait = 5000 if data.status is 'stopped'

    app.playerStatus = data
    app.trigger('status', data)

    setTimeout(fetchStatus, wait)
  failStatus = ->
    setTimeout(fetchStatus, 5000)

  _.extend(RoundApp.prototype, Backbone.Events)
  app = window.app = new RoundApp

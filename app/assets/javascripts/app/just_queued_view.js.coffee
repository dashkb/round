class App.JustQueuedView extends App.View
  template: JST['just_queued']
  events:
    'show': -> @render()
    'click .btn-primary': -> page '/browse'
    'click .btn-success': 'doneBrowsing'

  doneBrowsing: ->
    $.post '/player/queue',
      track_ids: _.map App.browseSession, (track) -> track.id
    .then =>
      (@$ '.current').addClass 'hide'
      (@$ '.done').removeClass 'hide'
      setTimeout ->
        App.subViews.browse.resetEverything()
        page '/idle'
      , App.resetTimeout

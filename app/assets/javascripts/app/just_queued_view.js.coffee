class App.JustQueuedView extends App.View
  template: JST['just_queued']
  events:
    'show': -> @render()
    'click .btn-primary': -> page '/browse'
    'click .btn-success': 'doneBrowsing'

  render: ->
    @templateHelpers =
      queueMax: App.playerStatus?.queueMaxLock || App.queueMax

  doneBrowsing: ->
    name = (@$ '.name input').val()

    $.post '/player/queue',
      track_ids: _.map App.browseSession, (track) -> track.id
      name: name
    .then =>
      $heading = (@$ '.done .panel-heading')
      if name? && name != ''
        $heading.text "Thanks, #{name}!"
      else
        $heading.text "Thanks, nameless person!"

      (@$ '.current').addClass 'hide'
      (@$ '.done').removeClass 'hide'
      setTimeout ->
        App.subViews.browse.resetEverything()
        page '/idle'
      , App.resetTimeout

class App.JustQueuedView extends App.View
  template: JST['just_queued']
  events:
    'show': -> @render()
    'click .btn-primary': -> page '/browse'
    'click .btn-success': 'doneBrowsing'

  doneBrowsing: ->
    log.error "Would actually queue stuff"
    page '/idle'

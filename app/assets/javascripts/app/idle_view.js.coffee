class App.IdleView extends App.View
  template: JST['idle']
  events:
    'click .btn-pick': 'browseClicked'
    'click .btn-queue': 'queueClicked'

  browseClicked: (e) ->
    page '/browse'

  queueClicked: (e) ->
    page '/queue'

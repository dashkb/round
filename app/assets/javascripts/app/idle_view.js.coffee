class App.IdleView extends App.View
  template: JST['idle']
  events:
    'click .btn-pick': 'browseClicked'
    'click .btn-queue': 'queueClicked'
    'click .go-to-tim': -> page '/tim'

  browseClicked: (e) ->
    page '/browse'

  queueClicked: (e) ->
    page '/queue'

  show: ->
    _.tap super(), =>
      @listenTo App, 'player status update', => @render()

  hide: ->
    _.tap super(), =>
      @stopListening()

class App.QueueView extends App.CollectionView
  hide: ->
    _.tap super(), =>
      ($ '#queue-link').removeClass('active')
      @stopListening App, 'player status update'

  show: ->
    _.tap super(), =>
      ($ '#queue-link').addClass('active')
      @listenTo App, 'player status update', => @render()
      @render()

  render: ->
    _.merge @templateHelpers, emptyMessage: @emptyMessage
    @collection = App.playerStatus?.queue
    super()

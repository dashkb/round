class App.QueueView extends App.CollectionView
  initialize: ->
    @on 'show', =>
      @listenTo App, 'player status update', => @render()
      @render()

    @on 'hide', =>
      @stopListening App, 'player status update'

  render: ->
    _.merge @templateHelpers, emptyMessage: @emptyMessage
    @collection = App.playerStatus?.queue
    super()

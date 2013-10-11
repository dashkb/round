class App.QueueView extends App.CollectionView
  initialize: (opts) ->
    _.tap super(opts), =>
      @on 'show', =>
        ($ '#back-button').removeClass 'hide'
        @listenTo App, 'player status update', => @render()
        @render()

      @on 'hide', =>
        ($ '#back-button').addClass 'hide'
        @stopListening App, 'player status update'

  render: ->
    @collection = App.playerStatus?.queue
    super()

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

      _.merge @templateHelpers,
        showTimControls: true

  render: ->
    @collection = App.playerStatus?.queue
    super()

  events:
    'click button.move-up': 'swapUp'
    'click button.move-down': 'swapDown'
    'click button.unqueue': 'unqueue'
    'click button.play-now': 'playNow'
    'click button': 'spinButton'

  spinButton: (e) ->
    ($ e.currentTarget).html ($ "<icon class='icon-spinner icon-spin'>")
    setTimeout ->
      App.getPlayerStatus()
    , 200

  trackIdForButtonClick: (e) ->
    ($ e.currentTarget).parent().parent().data 'track-id'

  unqueue: (e) ->
    if TryMeSuckaz.userIsTim
      id = @trackIdForButtonClick e

      $.post '/player/unqueue',
        track_id: id

  playNow: (e) ->
    if TryMeSuckaz.userIsTim
      id = @trackIdForButtonClick e

      $.post '/player/play_now',
        track_id: id

  swapUp: (e) ->
    if TryMeSuckaz.userIsTim
      id = @trackIdForButtonClick e

      $.post '/player/swap',
        track_id: id
        direction: 'up'

  swapDown: (e) ->
    if TryMeSuckaz.userIsTim
      id = @trackIdForButtonClick e

      $.post '/player/swap',
        track_id: id
        direction: 'down'

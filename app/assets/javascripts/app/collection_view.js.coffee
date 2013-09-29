class App.CollectionView extends App.View
  template: JST['collection']
  initialize: (opts) ->
    _.tap super(_.omit opts, 'type', 'heading', 'minimal'), =>
      {@type, @heading, @minimal, @emptyMessage} = opts
      @type ||= @heading?.toLowerCase().substr(0, @heading.length - 1)
      @templateHelpers =
        itemTpl: JST[@type]
        type: @type
        heading: @heading
        minimal: @minimal

  events:
    'click .track .queue-button': 'queueTrack'
    'click .browse-button': 'browse'

  queueTrack: (event) ->
    App.touched()
    event.stopPropagation()
    track_id = ($ event.currentTarget).parent().data('track-id')
    $.post "/player/queue.json?track_id=#{track_id}",
      dataType: 'json'
    .then (response) =>
      App.trigger 'queue track', track_id
    .then null, (args...) =>
      log.error "Error queueing track", args...

  browse: (event) ->
    _.tap ($ event.target).parent(), (clicked) ->
      page "/browse/#{clicked.data 'type'}/#{clicked.data 'id'}"

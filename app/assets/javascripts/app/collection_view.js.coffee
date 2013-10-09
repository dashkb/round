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
        emptyMessage: @emptyMessage

  events:
    'click .item': 'itemClicked'
    'click .track': 'trackClicked'

  itemClicked: (e) ->
    App.touched()
    $clicked = $ e.currentTarget
    @$active?.removeClass 'active'

    if $clicked[0] == @$active?[0]
      @$active = undefined
      @bubble 'deactivate', $clicked.data 'type'
    else
      @$active = $ e.currentTarget
      @$active.toggleClass 'active'
      @bubble 'activate',
        type: @$active.data 'type'
        id: @$active.data 'id'

  trackClicked: (e) ->
    console.error 'NYI', e

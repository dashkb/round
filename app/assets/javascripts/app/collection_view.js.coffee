class App.CollectionView extends App.View
  template: JST['collection']
  initialize: (opts) ->
    _.tap super(_.omit opts, 'type', 'heading', 'minimal'), =>
      {@type, @heading, @minimal, @emptyMessage, @showAllLine} = opts
      @type ||= @heading?.toLowerCase().substr(0, @heading.length - 1)
      @templateHelpers =
        itemTpl: JST[@type]
        type: @type
        heading: @heading
        minimal: @minimal
        emptyMessage: @emptyMessage
        showAllLine: @showAllLine

  events:
    'click .item': 'itemClicked'
    'click .track': 'trackClicked'

  render: ->
    _.tap super(), =>
      @$active = @$ '.list-group-item[data-id="all"]'

  itemClicked: (e) ->
    App.touched()
    $clicked = $ e.currentTarget
    @$active?.removeClass 'active'
    @activeId = undefined

    unless $clicked.hasClass 'active'
      @$active = $ e.currentTarget
      @$active.toggleClass 'active'
      @$active[0].scrollIntoViewIfNeeded()
      @activeId = @$active.data 'id'
      @bubble 'activate',
        type: @$active.data 'type'
        id: @activeId

  applyFilter: (@filter) ->
    if @filter?
      @origCollection ||= @collection
      @collection = new Backbone.Collection @origCollection.filter (item) =>
        item.get('name').match @filter
    else
      @collection = @origCollection
      @origCollection = undefined

    @render()
    if @activeId
      (@$ ".list-group-item[data-id='#{@activeId}']").click()



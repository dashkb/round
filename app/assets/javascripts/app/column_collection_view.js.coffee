class App.ColumnCollectionView extends App.View
  template: JST['column_collection']
  initialize: (opts = {}) ->
    {@collections, @default} = opts
    super _.omit opts, 'collections', 'default'
    @templateHelpers = collections: @collections

    @on 'show', =>
      (@$ "li.activate[data-collection-key=#{@default}]").click()

    @on 'destroy', =>
      if @columnViews && @columnViews.length
        _.each @columnViews, (view) ->
          view.destroy()

  events:
    'click li.activate': 'activateColumn'

  activateColumn: (event) ->
    event.stopPropagation()
    (@$ 'li').removeClass 'active'
    $clicked = ($ event.currentTarget)
    $clicked.addClass 'active'
    _.each @columnViews, (view, key) =>
      if key == $clicked.data 'collectionKey'
        view.show()
      else
        view.hide()


  render: ->
    _.tap super(), =>
      @$columns = (@$ '.columns')
      @columnViews = _.reduce @collections, (out, collection, key) =>
        out[key] = new App.CollectionView
          collection: collection
          minimal: true
          heading: key

        out
      , {}

      _.each @columnViews, (view) =>
        view.render().appendTo(@$columns).hide()


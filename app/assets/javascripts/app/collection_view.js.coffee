class App.CollectionView extends App.View
  template: JST['collection']
  initialize: (opts) ->
    _.tap super(_.omit opts, 'type'), =>
      {@type} = opts
      @templateHelpers =
        itemTpl: JST[@type]


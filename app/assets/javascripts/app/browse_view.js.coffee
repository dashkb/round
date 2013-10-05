class App.BrowseView extends App.View
  reset: (@type, @modelId) ->
    _.tap @, =>
      $.get("/browse/#{@type}s/#{@modelId}").then (data) =>
        @model = new Backbone.Model data[@type]
        @collections = _.omit data, @type
        @render()
      .then null, (err) =>
        log.error "ERROR FETCHING FOR BROWSE"

  render: ->
    _.tap super(), =>
      resultView = new App.ColumnCollectionView
        collections: _.reduce @collections, (out, collection, key) ->
          out[key] = new Backbone.Collection collection
          out
        , {}
      .render()

      @resultView?.destroy()
      @resultView = resultView.appendTo @$el

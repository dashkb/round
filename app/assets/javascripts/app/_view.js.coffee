class App.View extends Backbone.View
  bubble: (args...) -> @$el.trigger args...; @trigger args...
  templateHelpers: {}
  initialize: (args...) ->
    log.debug '--'
    log.debug "Initializing view: #{@constructor.name}"
    log.debug @model, @collection
    super args...

  render: ->
    _.tap @, =>
      @$el.html @template _.merge @templateHelpers,
        model: @model,
        collection: @collection

  appendTo: (el) ->
    _.tap @, =>
      @$el.appendTo el
      @trigger 'show'

  insertBefore: (el) ->
    _.tap @, =>
      @$el.insertBefore el
      @trigger 'show'

  hide: ->
    _.tap @, =>
      @$el.addClass 'hide'
      @trigger 'hide'

  show: ->
    _.tap @, =>
      @$el.removeClass 'hide'
      @trigger 'show'

  destroy: ->
    return if @__destroyed__
    @__destroyed__ = true
    @bubble 'destroy'
    @stopListening()
    @remove()
    @


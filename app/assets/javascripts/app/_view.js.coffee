class App.View extends Backbone.View
  bubble: (args...) -> @$el.trigger args...; @trigger args...
  templateHelpers: {}
  initialize: (args...) ->
    log.debug '--'
    log.debug "Initializing view: #{@constructor.name}"
    log.debug @model, @collection
    super args...
    @shown = not @$el.hasClass 'hide'

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
      if @shown
        @shown = false
        @$el.addClass 'hide'
        @trigger 'hide'

  show: ->
    _.tap @, =>
      unless @shown
        @shown = true
        @$el.removeClass 'hide'
        @trigger 'show'

  destroy: ->
    return if @__destroyed__
    @__destroyed__ = true
    @bubble 'destroy'
    @stopListening()
    @remove()
    @


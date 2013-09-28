class App.View extends Backbone.View
  bubble: (args...) -> @$el.trigger args...; @trigger args...
  templateHelpers: {}
  initialize: (args...) ->
    super args...
    log.debug '--'
    log.debug "Initializing view: #{@constructor.name}"
    log.debug @model, @collection
    @shown = not @$el.hasClass 'hide'

  render: ->
    _.tap @, =>
      if @template
        @$el.html @template _.merge @templateHelpers,
          model: @model,
          collection: @collection

  appendTo: (el) ->
    _.tap @, =>
      @$el.appendTo el
      @bubble 'show'

  insertBefore: (el) ->
    _.tap @, =>
      @$el.insertBefore el
      @bubble 'show'

  hide: ->
    _.tap @, =>
      if @shown
        @shown = false
        @$el.addClass 'hide'
        @bubble 'hide'

  show: ->
    _.tap @, =>
      unless @shown
        @shown = true
        @$el.removeClass 'hide'
        @bubble 'show'

  destroy: ->
    return if @__destroyed__
    @__destroyed__ = true
    @bubble 'destroy'
    @stopListening()
    @remove()
    @


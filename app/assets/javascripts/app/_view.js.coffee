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

      if @model
        @bindModel()
        @listenTo @model, 'change', @bindModel

  appendTo: (el) ->
    _.tap @, =>
      @$el.appendTo el
      @trigger 'show'

  insertBefore: (el) ->
    _.tap @, =>
      @$el.insertBefore el
      @trigger 'show'

  bindModel: ->
    return unless @model
    _.each @modelBindings(), (binding) ->
      if binding.text?
        binding.$el.html binding.text.call()
      #binder.attrs?.call()

  modelBindings: ->
    return unless @model && @$el
    @bindings ?= (@$ '.bind').map (i, el) =>
      $el = $ el
      _.merge @bindersFor($el), $el: $el

  bindersFor: ($el) ->
    text  = $el.text()
    attrs = $el.attrs()

    text: =>
      text.replace /\{([^}]+)\}/g, (match, expr) =>
        expr = expr.split ' '
        val = _.escape @model.get _.last expr
        if expr.length == 2 && expr[0] == 'md'
          val = marked val
        val
    attrs: =>

  destroy: ->
    return if @__destroyed__
    @__destroyed__ = true
    @bubble 'destroy'
    @stopListening()
    @remove()
    @


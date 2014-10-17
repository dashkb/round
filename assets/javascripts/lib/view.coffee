define [
  'underscore'
  'backbone'
], (
  _
  Backbone
) ->
  class View extends Backbone.View
    render: ->
      if _.isFunction(@template)
        context = @templateContext?() or {}
        content = @template(context)
        @$el.html(content)
      return this

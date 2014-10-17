define [
  'lib/view'
  'views/status'
  'stache!./layout'
], (
  View
  StatusView
  template
) ->
  class LayoutPage extends View
    'id'       : 'layout'
    'template' : template

    initialize: ->
      @panes = {}

    render: ->
      super
      @set('#status', new StatusView)
      return this

    remove: ->
      super
      for target, pane of @panes
        pane.remove()

    set: (target, view) ->
      @panes[target]?.remove()
      @panes[target] = view
      @$(target).html(view.render().el)

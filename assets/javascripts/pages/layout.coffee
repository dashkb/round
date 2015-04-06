define [
  'lib/view'
  'views/admin'
  'views/status'
  'stache!./layout'
], (
  View
  AdminView
  StatusView
  template
) ->
  class LayoutPage extends View
    'id'       : 'layout'
    'template' : template

    initialize: ->
      @panes = {}
      @status = new StatusView
      @admin  = new AdminView

      @listenTo(app, 'change:admin', @checkAdmin)

    hideStatus: -> @unset('#status') if @has('#status')
    showStatus: -> @set('#status', @status) unless @has('#status')

    render: ->
      super
      @set('#status', @status)
      @set('#admin', @admin)
      return this

    remove: ->
      super
      @unset(target) for target, pane of @panes

    checkAdmin: ->
      @set('#admin', @admin) if @$el.is(':visible')

    has: (target) -> @panes[target]?

    set: (target, view) ->
      @unset(target)
      @panes[target] = view
      @$(target).html(view.render().el)

    unset: (target) ->
      @panes[target]?.remove()
      @panes[target] = null

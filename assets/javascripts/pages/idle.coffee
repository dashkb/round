define [
  'backbone'
  'lib/view'
  'views/status'
  'stache!./idle'
], (
  Backbone
  View
  StatusView
  template
) ->
  class IdlePage extends View
    'id'       : 'idle-page'
    'template' : template

    events:
      'click .browse'  : 'browse'
      'click .queue'   : 'queue'
      'click .history' : 'history'

    initialize: ->
      @status = new StatusView

    render: ->
      super
      @$('.status').html(@status.render().el)
      return this

    remove: ->
      super
      @status.remove()

    browse:  -> Backbone.history.navigate('/browse', trigger: true)
    queue:   -> Backbone.history.navigate('/browse', trigger: true)
    history: -> Backbone.history.navigate('/browse', trigger: true)

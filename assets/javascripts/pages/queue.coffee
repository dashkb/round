define [
  'lib/view'
], (
  View
) ->
  class QueuePage extends View
    render: ->
      @$el.html('Queue Page')
      return this

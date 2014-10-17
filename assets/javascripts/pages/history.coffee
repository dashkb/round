define [
  'lib/view'
], (
  View
) ->
  class HistoryPage extends View
    render: ->
      @$el.html('History Page')
      return this

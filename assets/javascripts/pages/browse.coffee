define [
  'lib/view'
], (
  View
) ->
  class BrowsePage extends View
    render: ->
      @$el.html('Browse Page')
      return this

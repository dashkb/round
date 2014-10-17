define [
  'lib/view'
], (
  View
) ->
  class AdminPage extends View
    render: ->
      @$el.html('Admin Page')
      return this

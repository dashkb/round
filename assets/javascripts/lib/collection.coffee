define [
  'jquery'
  'underscore'
  'backbone'
], (
  $
  _
  Backbone
) ->
  class Collection extends Backbone.Collection
    # An extension to fetch that iterates through all available pages
    fetchAllPages: ->
      url = _.result(this, 'url')

      success = (data) =>
        @set(data.results, remove: false)
        if data.page == data.pages
          @trigger('sync', this, data, {})
        else
          @trigger('sync:page', this, data, {})
          fetch(data.page + 1)

      fetch = (page) -> $.getJSON(url, {page: page}).done(success)
      fetch(1)

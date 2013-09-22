class App.SearchView extends App.View
  template: JST['search']
  events:
    'input input': 'queryChanged'

  render: ->
    _.tap super(), =>
      @$searchBox = (@$ 'input')

  queryChanged: ->
    @__queryChanged ?= _.throttle =>
      query = @$searchBox.val()
      $.get("/search?term=#{query}").then (data) =>
        App.gotSearchResult data
      .then null, (args...) =>
        log.error "Error searching tracks"
        log.error args...
    , 2000

    @__queryChanged()

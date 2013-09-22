class App.SearchView extends App.View
  minSearchLength: 4
  template: JST['search']
  events:
    'input input': 'queryChanged'

  render: ->
    @templateHelpers.minSearchLength = @minSearchLength
    _.tap super(), =>
      @$searchBox = (@$ 'input')
      @$tooShortNotice = (@$ '.too-short-notice')

  queryChanged: ->
    @__queryChanged ?= _.throttle =>
      query = @$searchBox.val()

      if query.length >= @minSearchLength
        @$tooShortNotice.addClass 'hide'
        $.get("/search?term=#{query}").then (data) =>
          App.gotSearchResult data
        .then null, (args...) =>
          log.error "Error searching tracks"
          log.error args...
      else
        App.searchIsTooShort()
        @$tooShortNotice.removeClass 'hide'
    , 3000
    @__queryChanged()

class App.SearchView extends App.View
  searchThrottle: 3000
  minSearchLength: 3
  template: JST['search']
  events:
    'keydown form': 'stopSubmit'
    'input input': 'queryChanged'
    'click .clear-button': 'clearQuery'
    'show': -> ($ '#search-link').addClass('active')
    'hide': -> ($ '#search-link').removeClass('active')

  render: ->
    @templateHelpers.minSearchLength = @minSearchLength
    _.tap super(), =>
      @$searchBox = (@$ 'input')
      @$tooShortNotice = (@$ '.too-short-notice')

  clearQuery: (event) ->
    event.stopPropagation()
    @$searchBox.val ''

  queryChanged: ->
    App.touched()
    @__queryChanged ?= _.throttle =>
      query = @$searchBox.val()

      if query.length >= @minSearchLength
        @$tooShortNotice.addClass 'hide'
        $.get("/search?term=#{query}").then (data) =>
          @gotResult data
        .then null, (args...) =>
          log.error "Error searching tracks"
          log.error args...
      else
        @reset()
        @$tooShortNotice.removeClass 'hide'
    , @searchThrottle
    @__queryChanged()

  reset: ->
    @resultView?.destroy()

  gotResult: (data) ->
    @reset()
    @resultView = new App.ColumnCollectionView
      collections:
        'Genres': new Backbone.Collection data.genres
        'Artists': new Backbone.Collection data.artists
        'Albums': new Backbone.Collection data.albums
        'Tracks': new Backbone.Collection data.tracks
      default: 'Tracks' # TODO remember
    .render().appendTo @$el

  stopSubmit: (event) ->
    if event.keyCode == 13
      event.preventDefault()
      @$searchBox.blur()


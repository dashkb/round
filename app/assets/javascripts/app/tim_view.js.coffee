class App.TimView extends App.View
  model: new Backbone.Model
  template: JST['tim']
  show: ->
    _.tap super(), =>
      if TryMeSuckaz.userIsTim
        @refresh()
        @refreshInterval = setInterval =>
          @refresh()
        , 5000

  events: ->
    'click a.playlists': -> page '/playlists'

  hide: ->
    _.tap super(), =>
      clearInterval @refreshInterval

  refresh: ->
    $.get('/tim/things').then (data) =>
      if data.status == 'not timified'
        TryMeSuckaz.userIsTim = false
      else
        @model = new Backbone.Model data

      @render()
    .then null, (err) =>
      log.error "ERROR FETCHING DATA" # TODO

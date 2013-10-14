class App.MissingAlbumsView extends App.View
  model: new Backbone.Model
  template: JST['missing_albums']
  show: ->
    _.tap super(), =>
      @refresh()

  refresh: ->
    $.get('/tim/missing_albums_data').then (data) =>
      if data.status == 'not timified'
        TryMeSuckaz.userIsTim = false
      else  
        @model = new Backbone.Model data
        
      @render()
      $('#fixAlbumArtContainer').height($('body').height() - $('#missingAlbums .panel-heading').height());

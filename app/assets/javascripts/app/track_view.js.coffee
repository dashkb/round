class App.TrackView extends App.View
  template: JST['tracks']
  render: ->
    @templateHelpers =
      data: @data
      tracksForAlbum: @tracksForAlbum
    super()

  tracksForAlbum: (album) ->
    _.filter @data.tracks, (track) ->
      track.album_id == album.id

  events:
    'click button.btn-primary': 'queueTrack'

  queueTrack: (event) ->
    id    = $(event.target).parent().data('track-id')
    track = _.find @data.tracks, (track) -> track.id == id
    App.browseSession.push new Backbone.Model(track)
    page '/justQueued'

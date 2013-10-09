class App.TrackView extends App.View
  template: JST['tracks']
  render: ->
    @templateHelpers =
      data: @data
      tracksForAlbum: @tracksForAlbum
    super()

  tracksForAlbum: (album) ->
    @data.tracks.filter (track) ->
      track.album_id == album.id

class App.TrackView extends App.View
  template: JST['tracks']
  render: ->
    unless @templateHelpers.data?
      @templateHelpers =
        data: @data
        tracksForAlbum: @tracksForAlbum
        albumsForArtist: @albumsForArtist

    try
      if @templateHelpers.data?
        @templateHelpers.data?.artists ?= _.uniq (
          _.compact _.map @templateHelpers.data.tracks, (track) -> track.artist
        ), 'id'

        @templateHelpers.data?.albums ?= _.uniq (
          _.compact _.map @templateHelpers.data.tracks, (track) -> track.album
        ), 'id'
    catch
      debugger

    super()

  albumsForArtist: (artist) =>
    _.filter @templateHelpers.data.albums, (album) ->
      album.artist_id == artist.id

  tracksForAlbum: (album) =>
    _.filter @templateHelpers.data.tracks, (track) ->
      track.album_id == album.id

  events:
    'click button.btn-primary': 'queueTrack'

  queueTrack: (event) ->
    id    = $(event.target).parent().data('track-id')
    track = _.find @data.tracks, (track) -> track.id == id
    App.browseSession.push new Backbone.Model(track)
    page '/justQueued'

  applyData: (@data) ->
    @templateHelpers.data = @data
    @render()

  applyFilter: (filter) ->
    @filter = filter || undefined

    unless @filter
      log.info "Unfiltering tracks"
      @templateHelpers.data = @data
    else
      log.info "Filtering tracks"
      @templateHelpers.data = @filterData()

    @render()

  filterData: ->
    _.tap (_.cloneDeep @data), (data) =>
      data.tracks = _.filter data.tracks, (track) =>
        track.name.match @filter

define [
  'lib/collection'
  'models/track'
], (
  Collection
  Track
) ->
  class Tracks extends Collection
    'model' : Track
    'url'   : '/api/tracks'

    fetchAllPages: ->
      @once 'sync', ->
        @comparator = (item) ->
          artist = app.artists.get(item.get('artist'))
          album  = app.albums.get(item.get('album'))
          [artist.get('name'), album.get('name'), item.get('track_num')]
        @sort()
        @comparator = null

      super

define [
  'collections/genres'
  'collections/artists'
  'collections/albums'
  'collections/tracks'
], (
  Genres
  Artists
  Albums
  Tracks
) ->
  class RoundApp
    constructor: ->
      @genres  = new Genres
      @artists = new Artists
      @albums  = new Albums
      @tracks  = new Tracks

  app = new RoundApp

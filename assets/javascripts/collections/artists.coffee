define [
  'lib/collection'
  'models/artist'
], (
  Collection
  Artist
) ->
  class Artists extends Collection
    'model' : Artist
    'url'   : '/api/artists'

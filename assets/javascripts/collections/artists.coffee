define [
  'lib/collection'
  'models/artist'
], (
  Collection
  Artist
) ->
  class Artists extends Collection
    'comparator' : 'name'
    'model'      : Artist
    'url'        : '/api/artists'

define [
  'lib/collection'
  'models/track'
], (
  Collection
  Track
) ->
  class Tracks extends Collection
    'comparator' : 'name'
    'model'      : Track
    'url'        : '/api/tracks'

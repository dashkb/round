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

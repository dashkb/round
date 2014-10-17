define [
  'lib/collection'
  'models/album'
], (
  Collection
  Album
) ->
  class Albums extends Collection
    'model' : Album
    'url'   : '/api/albums'

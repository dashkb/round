define [
  'lib/collection'
  'models/album'
], (
  Collection
  Album
) ->
  class Albums extends Collection
    'comparator' : 'name'
    'model'      : Album
    'url'        : '/api/albums'

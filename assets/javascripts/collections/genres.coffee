define [
  'lib/collection'
  'models/genre'
], (
  Collection
  Genre
) ->
  class Genres extends Collection
    'comparator' : 'name'
    'model'      : Genre
    'url'        : '/api/genres'

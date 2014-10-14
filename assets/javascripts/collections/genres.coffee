define [
  'collection'
  'models/genre'
], (
  Collection
  Genre
) ->
  class Genres extends Collection
    'model' : Genre
    'url'   : '/api/genres'

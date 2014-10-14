require.config
  'baseUrl' : '/assets'
  'urlArgs' : "bust=#{+new Date()}"

  paths:
    'collection' : '/assets/lib/collection'
    'model'      : '/assets/lib/model'
    'view'       : '/assets/lib/view'

require [
  'app'
  'loader'
  'router'
], (
  app
  Loader
  Router
) ->
  loader = new Loader
  router = new Router

  loader.dequeue()

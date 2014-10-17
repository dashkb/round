require.config
  'baseUrl' : '/assets'
  'urlArgs' : "bust=#{+new Date()}"

  paths:
    'collection' : '/assets/lib/collection'
    'model'      : '/assets/lib/model'
    'view'       : '/assets/lib/view'

require [
  'jquery'
  'backbone'
  'app'
  'loader'
  'router'
], (
  $
  Backbone
  app
  Loader
  Router
) ->
  loader = new Loader
  router = new Router

  $('body').append(loader.render().el)
  loader.dequeue ->
    loader.remove()
    Backbone.history.start(pushState: true)

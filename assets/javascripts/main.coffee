require.config
  'baseUrl' : '/assets'
  'urlArgs' : "bust=#{+new Date()}"

require [
  'backbone'
  'app'
  'loader'
  'router'
  'pages/layout'
], (
  Backbone
  app
  Loader
  Router
  LayoutPage
) ->
  layout = new LayoutPage
  loader = new Loader
  router = new Router(layout: layout)

  $body = document.querySelector('body')

  $body.appendChild(loader.render().el)
  loader.dequeue ->
    loader.remove()
    $body.appendChild(layout.render().el)
    app.start()
    Backbone.history.start(pushState: true)

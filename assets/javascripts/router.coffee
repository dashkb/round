define [
  'backbone'
  'pages/idle'
  'pages/browse'
  'pages/queue'
  'pages/history'
  'pages/admin'
], (
  Backbone
  IdlePage
  BrowsePage
  QueuePage
  HistoryPage
  AdminPage
) ->
  class Router extends Backbone.Router
    routes:
      ''        : 'idle'
      'browse'  : 'browse'
      'queue'   : 'queue'
      'history' : 'history'
      'admin'   : 'admin'

    initialize: (options) ->
      @layout = options.layout

    idle: -> @setPage(new IdlePage)

    browse: -> @setPage(new BrowsePage)

    queue: -> @setPage(new QueuePage)

    history: -> @setPage(new HistoryPage)

    admin: -> @setPage(new AdminPage)

    setPage: (page) ->
      @layout.set('#content', page)

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

    idle: ->
      @layout.hideStatus()
      @setPage(new IdlePage)

    browse: ->
      @layout.showStatus()
      @setPage(new BrowsePage)

    queue: ->
      @layout.showStatus()
      @setPage(new QueuePage)

    history: ->
      @layout.showStatus()
      @setPage(new HistoryPage)

    admin: ->
      @layout.showStatus()
      @setPage(new AdminPage)

    setPage: (page) ->
      @layout.set('#content', page)

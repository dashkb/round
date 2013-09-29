route = (path, args...) ->
  page path, (ctx, next)->
    log.info "Routing #{path}"
    App.touched()
    next()
  , args...

route '/', ->
  App.show App.searchView

route '/admin', ->
  App.show App.adminView

route '/search', ->
  App.show App.searchView

route '/queue', ->
  App.show App.queueView

route '/idle', ->
  App.show App.idleView

route '/browse/:genre/:id', (ctx) ->
  App.browse ctx.params.genre, ctx.params.id

route '/tim', ->
  App.show App.timView

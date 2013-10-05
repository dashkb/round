redirect = (ctx, path) ->
  log.info "Router: redirect #{ctx.canonicalPath} -> #{path}"
  ctx.canonicalPath = path
  ctx.save()
  page path

route = (path, args...) ->
  page path, (ctx, next)->
    log.info "Routing #{path}"
    App.touched()
    next()
  , args...

route '/', (ctx) ->
  redirect ctx, '/search'

route '/browse', ->
  App.show 'browse'

route '/search', ->
  App.show 'search'

route '/queue', ->
  App.show 'queue'

route '/idle', ->
  App.show 'idle'

route '/browse/:genre/:id', (ctx) ->
  App.browse ctx.params.genre, ctx.params.id

route '/tim', ->
  App.show 'tim'

route '/playlists', ->
  App.show 'playlists'

route '*', (ctx) ->
  redirect ctx, '/'

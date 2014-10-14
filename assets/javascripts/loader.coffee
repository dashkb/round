define [
  'app'
  'view'
], (
  app
  View
) ->
  class Loader extends View
    constructor: ->
      @listenTo(app.genres,  'sync', -> @done('genres'))
      @listenTo(app.artists, 'sync', -> @done('artists'))
      @listenTo(app.albums , 'sync', -> @done('albums'))
      @listenTo(app.tracks,  'sync', -> @done('tracks'))

      @queue = [
        app.genres,
        app.artists,
        app.albums,
        app.tracks
      ]

    done: (type) ->
      console.log('finished', type)
      @dequeue()

    dequeue: ->
      next = @queue.shift()
      if next?
        next.fetchAllPages()
      else
        console.log('all done')

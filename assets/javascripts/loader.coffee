define [
  'lib/view'
], (
  View
) ->
  class Loader extends View
    'id' : 'app-loader'

    initialize: ->
      @queue = ['genres', 'artists', 'albums', 'tracks']

    render: ->
      @$el.html('<h1>Loading Data</h1>')
      return this

    done: (type, done) -> @dequeue(done)

    dequeue: (done) ->
      type = @queue.shift()
      if (obj = app[type])?
        @update(type)
        @listenToOnce(obj, 'sync', => @done(type, done))
        obj.fetchAllPages()
      else
        @update('Finished Loading')
        done()

    update: (type) ->
      @$('h1').html("Loading #{type}...")

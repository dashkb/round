define [
  'jquery'
  'backbone'
  'lib/view'
  'stache!./queue'
], (
  $
  Backboke
  View
  template
) ->
  class QueueView extends View
    'template' : template

    events:
      'click .queue-now': 'sendQueue'
      'click .cancel': -> Backbone.history.navigate('/', trigger: true)
      'click .remove': 'removeItem'
      'click .move-up': 'moveUp'
      'click .move-down': 'moveDown'

    initialize: ->
      @listenTo(@collection, 'clear sort', @render)

    templateContext: ->
      length: @collection.length
      entries: @collection.map (entry) =>
        track = app.tracks.get(entry.id)
        artist = app.artists.get(track.get('artist'))

        {
          'id'           : track.id
          'name'         : track.get('name')
          'artist'       : artist.get('name')
          'canMoveUp?'   : (entry.position > 0)
          'canMoveDown?' : (entry.position + 1 < @collection.length)
        }

    sendQueue: ->
      if @collection.length is 0
        alert('You have nothing prepared to queue!')
        return

      name = prompt('Enter a name for mocking purposes, or click cancel to go back to browsing')
      return if name is null

      $.post('/api/queue', {ids: @collection.order, name: name})
        .done (data) =>
          console.log(data)
          @collection.clear()
          Backbone.history.navigate('/', trigger: true)

    removeItem: (e) ->
      e.preventDefault()
      li = $(e.target).closest('li')
      @collection.remove(li.data('id'))

    moveUp: (e) ->
      e.preventDefault()
      li = $(e.target).closest('li')
      @collection.up(li.data('id'))

    moveDown: (e) ->
      e.preventDefault()
      li = $(e.target).closest('li')
      @collection.down(li.data('id'))

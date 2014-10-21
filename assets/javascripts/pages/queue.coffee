define [
  'lib/view'
  'stache!./queue'
], (
  View
  template
) ->
  class QueuePage extends View
    'id'       : 'queue-page'
    'template' : template

    events:
      'click .back-home': -> Backbone.history.navigate('/', trigger: true)

    initialize: ->
      @items = []
      $.getJSON('/api/queue').done(@update.bind(this))

    templateContext: ->
      length: @items.length
      entries: @items.map (entry) ->
        track = app.tracks.get(entry.track)
        artist = app.artists.get(track.get('artist'))

        {
          id:        track.id
          name:      track.get('name')
          artist:    artist.get('name')
          requester: entry.requested_by
        }

    update: (data) ->
      @items = data
      @render()

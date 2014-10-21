define [
  'lib/view'
  'stache!./history'
], (
  View
  template
) ->
  class HistoryPage extends View
    'id'       : 'history-page'
    'template' : template

    events:
      'click .back-home': -> Backbone.history.navigate('/', trigger: true)

    initialize: ->
      @items = []
      $.getJSON('/api/history').done(@update.bind(this))

    templateContext: ->
      length: @items.length
      entries: @items.map (entry) ->
        track = app.tracks.get(entry.track)
        artist = app.artists.get(track.get('artist'))

        {
          id:        track.id
          name:      track.get('name')
          artist:    artist.get('name')
          played_at: entry.played_at
        }

    update: (data) ->
      @items = data
      @render()

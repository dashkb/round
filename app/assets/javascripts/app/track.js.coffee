class App.Track extends Backbone.Model
  queueIds: -> App.playerStatus?.queue.map (track) -> track.id
  browseIds: -> _.map App.browseSession, (track) -> track.id
  queueable: -> @queueableById @.id
  queueableById: (id) ->
    inQueue = _.contains @queueIds(), id
    inBrowseSession = _.contains @browseIds(), id

    !(inQueue || inBrowseSession)


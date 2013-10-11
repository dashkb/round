class App.Track extends Backbone.Model
  queueableById: (id) ->
    queueIds = App.playerStatus?.queue.map (track) -> track.id
    browseIds =  _.map App.browseSession, (track) -> track.id

    inQueue = _.contains queueIds, id
    inBrowseSession = _.contains browseIds, id

    !(inQueue || inBrowseSession)

  queueable: ->
    inQueue = App.playerStatus?.queue.contains @
    # ugh, I suck
    inBrowseSession = _.contains App.browseSession, @

    !(inQueue || inBrowseSession)

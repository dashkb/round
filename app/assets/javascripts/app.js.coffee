$ -> App.start()

window.App =
  start: ->
    Deferred.installInto(Zepto)
    console.log "hooray"


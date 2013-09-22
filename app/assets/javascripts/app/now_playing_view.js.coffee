class App.NowPlayingView extends App.View
  className: 'navbar-text now-playing'
  template: JST['now_playing']

  initialize: ->
    @listenTo App, 'player status update', =>
      @model = App.playerStatus.nowPlaying
      @render()

define [
  'jquery'
  'lib/view'
  'stache!./admin_login'
  'stache!./admin_control'
], (
  $
  View
  template_login
  template_control
) ->
  class AdminPage extends View
    className: 'btn-group'

    template: (context) ->
      if app.is_admin
        template_control(context)
      else
        template_login(context)

    events:
      'click .login': 'tryToLogin'
      'click .toggle': 'togglePlayer'
      'click .skip': 'skipTrack'

    render: ->
      super
      @toggleStatus()
      @handleStatus()
      return this

    tryToLogin: ->
      password = prompt('Enter your password')
      @checkPassword password, ->
        app.makeAdmin()
        alert('You are now an admin for 5 minutes.')

    checkPassword: (password, cb) ->
      if password is 'test'
        cb()

    handleStatus: ->
      return if @stateWas is app.playerStatus.state

      @stateWas = app.playerStatus.state
      if @stateWas is 'playing'
        @$('.fa-pause').hide()
        @$('.fa-play').show()
      else
        @$('.fa-play').hide()
        @$('.fa-pause').show()

    toggleStatus: ->
      if app.is_admin
        @listenTo(app, 'status', @handleStatus)
      else
        @stopListening(app, 'status')

    togglePlayer: ->
      if app.playerStatus.state is 'playing'
        $.getJSON('/api/admin/pause')
      else
        $.getJSON('/api/admin/play')

    skipTrack: ->
      console.log('SKIP')
      $.getJSON('/api/admin/skip')

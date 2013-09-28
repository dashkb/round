class App.IdleView extends App.View
  template: JST['idle']
  events:
    'click': 'touched'
    'touch': 'touched'

  touched: ->
    App.touched()

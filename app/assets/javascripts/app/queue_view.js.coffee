class App.QueueView extends App.View
  template: JST['queue']
  events:
    'show': -> ($ '#queue-link').addClass('active')
    'hide': -> ($ '#queue-link').removeClass('active')

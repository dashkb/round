require.config
  'baseUrl' : '/assets'
  'urlArgs' : "bust=#{+new Date()}"

  paths:
    'Collection' : '/assets/lib/Collection'
    'Model'      : '/assets/lib/Model'
    'Router'     : '/assets/lib/Router'
    'View'       : '/assets/lib/View'

require [
  'App'
], (
  App
) ->
  alert('Hey')

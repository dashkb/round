Round::Application.routes.draw do
  resources :artists, only: [:index, :show]

  get '/player/status', to: 'player#status'
  post '/player/queue', to: 'player#queue'
  get '/search', to: 'search#search'

  root to: 'search#search'
end

Round::Application.routes.draw do
  resources :artists, only: [:index, :show]

  get :search, to: 'search#search'
  get :queue, to: 'player#queue'

  root to: 'search#search'
end

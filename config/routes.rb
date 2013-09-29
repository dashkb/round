Round::Application.routes.draw do
  %w{genres artists tracks albums}.each do |thing|
    get "/browse/#{thing}/:id", to: "#{thing}#browse"
  end

  get '/player/status', to: 'player#status'
  post '/player/queue', to: 'player#queue'
  get '/search', to: 'search#search'

  root to: 'search#search'
  get '/*path', to: 'application#render_frontend'
end

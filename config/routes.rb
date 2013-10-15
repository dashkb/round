Round::Application.routes.draw do
  %w{genres artists tracks albums}.each do |thing|
    get "/browse/#{thing}/:id", to: "#{thing}#browse"
  end

  get '/timify', to: 'tim#timify'
  get '/untimify', to: 'tim#untimify'
  get '/tim/things', to: 'tim#things'
  get '/tim/missing_albums_data', to: 'tim#missing_albums_data'
  post '/tim/art_upload/:id', to: 'tim#art_upload'
  post '/tim/whitelist', to: 'tim#whitelist'
  post '/tim/lock_queue_max', to: 'tim#lock_queue_max'

  get '/player/status', to: 'player#status'

  %w{play pause skip unqueue play_now swap rocket}.each do |action|
    post "/player/#{action}", to: "player##{action}"
  end

  post '/player/queue', to: 'player#queue'
  get '/search', to: 'search#search'

  root to: 'search#search'
  get '/*path', to: 'application#render_frontend'
end

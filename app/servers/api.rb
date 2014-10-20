require 'sinatra/json'
require 'lib/paginator'
require 'lib/player_service'
require 'lib/queue_service'

class ApiServer < Sinatra::Base
  helpers Sinatra::JSON

  before do
    content_type 'text/json', :charset => 'utf-8'
  end

  get '/genres' do
    pager = Paginator.new(Genre, params.slice('page'))
    json pager.as_json
  end
  get '/artists' do
    pager = Paginator.new(Artist, params.slice('page'))
    json pager.as_json
  end
  get '/albums' do
    pager = Paginator.new(Album, params.slice('page'))
    json pager.as_json
  end
  get '/tracks' do
    pager = Paginator.new(Track, params.slice('page'))
    json pager.as_json
  end

  get '/status' do
    json PlayerService.status
  end

  get '/queue' do
    json QueueService.all.map(&:to_i)
  end
  post '/queue' do
    track = Track[params[:id]]
    if track.nil?
      status 404
      json status: 'not found'
    else
      QueueService.add(track)
      json status: 'OK'
    end
  end

  get '/history' do
    json History.order('played_at DESC').limit(50)
  end
end

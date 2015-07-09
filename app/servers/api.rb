require 'sinatra/json'
require 'lib/paginator'
require 'lib/access_list_service'
require 'lib/player_service'
require 'lib/queue_service'

class ApiServer < Sinatra::Base
  helpers Sinatra::JSON

  before do
    content_type 'text/json', :charset => 'utf-8'
  end

  use Rack::Cors do
    allow do
      origins 'http://localhost:8080'
      resource '*',
        methods: [:get, :post, :put, :delete, :options]
    end
  end

  options '*' do
    headers['Access-Control-Allow-Methods'] = 'GET,POST,PUT,DELETE,OPTIONS'
    headers['Access-Control-Allow-Origin']  = 'http://localhost:8080'
    headers['Access-Control-Allow-Headers'] = 'Accepts,Content-Type'

    halt 200
  end

  get '/init-data' do
    content_type 'text/javascript', :charset => 'utf-8'
    headers['Content-Encoding'] = 'gzip'
    $init_data ||= File.read('dist/init-data.js.gz')
  end

  get '/genres' do
    pager = Paginator.new(Genre, params.slice('page', 'per_page'))
    json pager
  end
  get '/artists' do
    pager = Paginator.new(Artist, params.slice('page', 'per_page'))
    json pager
  end
  get '/albums' do
    pager = Paginator.new(Album, params.slice('page', 'per_page'))
    json pager
  end
  get '/tracks' do
    pager = Paginator.new(Track, params.slice('page', 'per_page').merge(
      order: [:genre_id, :artist_id, :album_id, :track_num]
    ))
    json pager
  end

  get '/status' do
    json PlayerService.status
  end

  get '/queue' do
    json(upcoming: QueueService.all.as_json(deep: true))
  end
  post '/queue' do
    data = JSON.parse(request.body.read)

    data['ids'].each do |id|
      if id.is_a?(Array)
        id = id.last
      end

      track = Track[id]
      next unless track.present?

      selection = Selection.create(
        track_id: id,
        queued_at: Time.now,
        requested_by: data['name']
      )
      QueueService.add(selection)
    end

    json status: 'OK'
  end

  get '/history' do
    json(history: History.order(Sequel.desc(:played_at)).limit(50).as_json(deep: true))
  end

  get '/admin/pause' do
    PlayerService.pause
    json status: 'OK'
  end
  get '/admin/play' do
    PlayerService.play
    json status: 'OK'
  end
  get '/admin/skip' do
    PlayerService.skip
    json status: 'OK'
  end

  get '/admin/access_lists' do
    json AccessListService.to_hash(with_records: true)
  end
  post '/admin/access_lists' do
    data = JSON.parse(request.body.read)

    if data['allowed']
      AccessListService.whitelist(data['store'], data['id'])
    else
      AccessListService.blacklist(data['store'], data['id'])
    end

    json status: 'OK'
  end
  delete '/admin/access_lists' do
    data = JSON.parse(request.body.read)
    AccessListService.remove(data['store'], data['id'])

    json status: 'OK'
  end
end

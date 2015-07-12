require 'sinatra/json'
require 'lib/paginator'
require 'lib/access_list_service'
require 'lib/player_service'
require 'lib/queue_service'

class ApiServer < Sinatra::Base
  helpers Sinatra::JSON

  before do
    content_type 'text/json', :charset => 'utf-8'

    if request.content_type == 'application/json'
      request.body.rewind
      body = request.body.read.to_s

      if body
        params.merge!(JSON.parse(body))
      end
    end
  end

  use Rack::Cors do
    allow do
      origins '*'
      resource '*',
        methods: [:get, :post, :put, :delete, :options]
    end
  end

  options '*' do
    headers['Access-Control-Allow-Methods'] = 'GET,POST,PUT,DELETE,OPTIONS'
    headers['Access-Control-Allow-Origin']  = '*'
    headers['Access-Control-Allow-Headers'] = 'Accepts,Content-Type'

    halt 200
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
    params['ids'].each do |id|
      if id.is_a?(Array)
        id = id.last
      end

      track = Track[id]
      next unless track.present?

      selection = Selection.create(
        track_id: id,
        queued_at: Time.now,
        requested_by: params['name']
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

  # Queue a track at the top of the list and then skip the current track so it plays immediately!
  post '/admin/play' do
    track = Track[params['id']]
    halt(404) if track.nil?

    selection = Selection.create(
      track_id: track.id,
      queued_at: Time.now,
      requested_by: params['name']
    )
    QueueService.addTop(selection)
    PlayerService.skip

    json status: 'OK'
  end

  get '/admin/skip' do
    PlayerService.skip

    json status: 'OK'
  end

  get '/admin/access_lists' do
    json AccessListService.to_hash(with_records: true).merge(
      saved_lists: AccessList.all.as_json(shallow: true)
    )
  end
  post '/admin/access_lists' do
    # We need to check if this change will limit the number of available tracks too much.
    previous = AccessListService.read

    if params['allowed']
      AccessListService.whitelist(params['store'], params['id'])
    else
      AccessListService.blacklist(params['store'], params['id'])
    end

    if AccessListService.scope.count == 0
      AccessListService.write(previous)

      json error: 'This change would block all tracks!'
      return 422
    else
      json status: 'OK'
    end
  end
  delete '/admin/access_lists' do
    AccessListService.remove(params['store'], params['id'])

    json status: 'OK'
  end
  post '/admin/access_lists/clear' do
    AccessListService.clear

    json status: 'OK'
  end

  post '/admin/access_lists/save' do
    if params['name'].blank?
      halt(422)
    else
      AccessList.create(
        name: params['name'],
        list: AccessListService.read
      )

      json status: 'OK'
    end
  end
  post '/admin/access_lists/load' do
    list = AccessList[params['id']]

    if list.nil?
      halt(404)
    else
      AccessListService.write(list.list)

      json status: 'OK'
    end
  end
end

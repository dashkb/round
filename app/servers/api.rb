require 'sinatra/json'
require 'lib/paginator'
require 'lib/player_service'
require 'lib/queue_service'

class ApiServer < Sinatra::Base
  helpers Sinatra::JSON

  before do
    content_type 'text/json', :charset => 'utf-8'
  end

  get '/init-data' do
    content_type 'text/javascript', :charset => 'utf-8'
    headers['Content-Encoding'] = 'gzip'

    unless $init_data
      data = <<-JS
        var GENRES  = #{JSON.generate(Genre.order(:sort_name, :name).map(&:as_json))};
        var ARTISTS = #{JSON.generate(Artist.order(:sort_name, :name).map(&:as_json))};
        var ALBUMS  = #{JSON.generate(Album.order(:sort_name, :name).map(&:as_json))};
        var TRACKS  = #{JSON.generate(Track.order(:sort_name, :name).map { |t| t.as_json(deep: true) })};
        JS

      $init_data = StringIO.new.tap do |io|
        gz = Zlib::GzipWriter.new(io)
        begin
          gz.write(data)
        ensure
          gz.close
        end
      end.string
    end

    return $init_data
  end

  get '/genres' do
    pager = Paginator.new(Genre, params.slice('page'))
    json pager
  end
  get '/artists' do
    pager = Paginator.new(Artist, params.slice('page'))
    json pager
  end
  get '/albums' do
    pager = Paginator.new(Album, params.slice('page'))
    json pager
  end
  get '/tracks' do
    pager = Paginator.new(Track, params.slice('page'))
    json pager
  end

  get '/status' do
    json PlayerService.status
  end

  get '/queue' do
    json QueueService.all
  end
  post '/queue' do
    params[:ids].each do |id|
      track = Track[id]
      next unless track.present?

      selection = Selection.create(
        track_id: id,
        queued_at: Time.now,
        requested_by: params[:name]
      )
      QueueService.add(selection)
    end

    json status: 'OK'
  end

  get '/history' do
    json History.order(Sequel.desc(:played_at)).limit(50)
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
end

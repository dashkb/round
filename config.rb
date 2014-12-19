require 'bundler'
Bundler.require
require 'sinatra/base'
require 'active_support/core_ext'

Dotenv.load

APP_ROOT = File.expand_path('..', __FILE__)
$LOAD_PATH.unshift(APP_ROOT) unless $LOAD_PATH.include?(APP_ROOT)

module Round
  extend self

  def controller_endpoint
    ENV.fetch('CONTROLLER_ENDPOINT', 'ipc://round-player')
  end

  def database
    @database ||= Sequel.connect(self.database_url)
  end
  def database_url
    @database_url ||= ENV.fetch('DATABASE_URL', 'sqlite://db/round.db')
  end

  def redis
    @redis ||= Redis.new(host: redis_url.host, port: redis_url.port, password: redis_url.password)
  end
  def redis_url
    @redis_url ||= URI.parse(ENV.fetch('REDIS_URL', 'redis://localhost:5200'))
  end

  def zmq_client
    @zmq_client ||= create_zmq_client
  end

  def vlc_host
    ENV.fetch('VLC_HOST', '127.0.0.1')
  end
  def vlc_port
    ENV.fetch('VLC_PORT', 9999)
  end
  def vlc_path
    ENV.fetch('VLC_PATH', '/Applications/VLC.app/Contents/MacOS/VLC')
  end

  def init
    # Setup connections early (so we fail fast)
    self.database
    self.redis

    require 'app/models/source'
    require 'app/models/genre'
    require 'app/models/artist'
    require 'app/models/artist_genre'
    require 'app/models/album'
    require 'app/models/track'
    require 'app/models/history'
    require 'app/models/selection'
  end

  private
  def create_zmq_client
    require 'lib/zmq_client'
    ZmqClient.new(controller_endpoint)
  end
end

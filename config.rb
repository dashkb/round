require 'bundler'
Bundler.require
require 'sinatra/base'

root_path = File.expand_path('..', __FILE__)
$LOAD_PATH.unshift(root_path) unless $LOAD_PATH.include?(root_path)

module Round
  extend self

  def database
    @database ||= Sequel.connect(self.database_url)
  end
  def database_url
    ENV.fetch('DATABASE_URL', 'sqlite://db/round.db')
  end

  def init
    self.database # Go ahead and connect

    require 'app/models/source'
    require 'app/models/genre'
    require 'app/models/artist'
    require 'app/models/artist_genre'
    require 'app/models/album'
    require 'app/models/track'
    require 'app/models/history'
    require 'app/models/selection'
  end
end

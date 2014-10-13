require 'bundler'
Bundler.require
require 'sinatra/base'

module Round
  extend self

  def database
    @database ||= Sequel.connect(self.database_url)
  end
  def database_url
    ENV.fetch('DATABASE_URL', 'sqlite://db/round.db')
  end
end

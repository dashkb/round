require File.expand_path('../config.rb', __FILE__)
Round.init

map '/api' do
  require 'app/servers/api'
  run ApiServer
end
map '/assets' do
  require 'app/servers/assets'
  run AssetsServer
end
map '/' do
  require 'app/servers/views'
  run ViewServer
end

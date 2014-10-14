require 'sinatra/json'
require 'lib/paginator'

class ApiServer < Sinatra::Base
  helpers Sinatra::JSON

  before do
    content_type 'text/json', :charset => 'utf-8'
  end

  get '/genres' do
    pager = Paginator.new(Genre, params.slice(:page))
    json pager.as_json
  end
  get '/artists' do
    pager = Paginator.new(Artist, params.slice(:page))
    json pager.as_json
  end
  get '/albums' do
    pager = Paginator.new(Album, params.slice(:page))
    json pager.as_json
  end
  get '/tracks' do
    pager = Paginator.new(Track, params.slice(:page))
    json pager.as_json
  end
end

class ViewServer < Sinatra::Base
  get '/favicon.ico' do
    status 404
  end

  get /.*/ do
    File.read(File.join(APP_ROOT, 'assets', 'index.html'))
  end
end

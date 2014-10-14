class ViewServer < Sinatra::Base
  get /.*/ do
    File.read(File.join(APP_ROOT, 'assets', 'index.html'))
  end
end

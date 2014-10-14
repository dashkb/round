class ViewServer < Sinatra::Base
  get /.*/ do
    File.read(File.expand_path('../assets/index.html', __FILE__))
  end
end

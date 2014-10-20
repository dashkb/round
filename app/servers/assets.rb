require 'lib/asset_builder'

class AssetsServer < Sinatra::Base
  set :javascripts_paths, [
    File.join(APP_ROOT, 'assets', 'javascripts'),
    File.join(APP_ROOT, 'vendor', 'javascripts')
  ]
  set :stylesheets_paths, [
    File.join(APP_ROOT, 'assets', 'stylesheets'),
    File.join(APP_ROOT, 'vendor', 'stylesheets')
  ]
  set :image_paths, [
    File.join(APP_ROOT, 'assets', 'images'),
    File.join(APP_ROOT, 'vendor', 'images')
  ]
  set :font_paths, [
    File.join(APP_ROOT, 'assets', 'fonts'),
    File.join(APP_ROOT, 'vendor', 'fonts')
  ]

  get '/main.js' do
    content_type 'text/javascript'
    File.read(File.join(APP_ROOT, 'dist', 'main.js'))
  end
  get %r{^/(.*)?\.html} do |asset|
    content_type 'text/javascript'

    settings.javascripts_paths.each do |folder|
      if File.exist?(filepath = File.join(folder, "#{asset}.mustache"))
        return File.read(filepath)
      end
    end

    status 404
  end
  get %r{^/(.*)?\.js} do |asset|
    content_type 'text/javascript'

    settings.javascripts_paths.each do |folder|
      if File.exist?(filepath = File.join(folder, "#{asset}.js"))
        return File.read(filepath)
      elsif File.exist?(filepath = File.join(folder, "#{asset}.coffee"))
        return AssetBuilder.coffeescript(filepath)
      end
    end

    status 404
  end
  get %r{^/(.*)?\.css} do |asset|
    content_type 'text/css'

    settings.stylesheets_paths.each do |folder|
      if File.exist?(filepath = File.join(folder, "#{asset}.css"))
        return File.read(filepath)
      elsif File.exist?(filepath = File.join(folder, "#{asset}.scss"))
        return AssetBuilder.scss(filepath)
      end
    end

    status 404
  end
  get %r{^/(.*)?\.(png|gif|jpeg)} do |asset, ext|
    settings.image_paths.each do |folder|
      filepath = File.join(folder, "#{asset}.#{ext}")
      if File.exist?(filepath)
        content_type ext.to_sym
        return File.read(filepath)
      end
    end

    status 404
  end
end

require 'lib/asset_builder'

class AssetsServer < Sinatra::Base
  set :javascripts_paths, [
    File.expand_path('../assets/javascripts', __FILE__),
    File.expand_path('../vendor/javascripts', __FILE__)
  ]
  set :stylesheets_paths, [
    File.expand_path('../assets/stylesheets', __FILE__),
    File.expand_path('../vendor/stylesheets', __FILE__)
  ]
  set :image_paths, [
    File.expand_path('../assets/images', __FILE__),
    File.expand_path('../vendor/images', __FILE__)
  ]
  set :font_paths, [
    File.expand_path('../assets/fonts', __FILE__),
    File.expand_path('../vendor/fonts', __FILE__)
  ]

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

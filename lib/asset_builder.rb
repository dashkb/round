module AssetBuilder
  extend self

  def cache
    @cache ||= Hash.new
  end
  def cached?(path)
    return cache.key?(path) && File.stat(path).mtime < cache[path][:cached_at]
  end
  def get(path)
    unless cached?(path)
      cache[path] = {
        cached_at: Time.now,
        content:   yield(File.read(path))
      }
    end

    cache[path][:content]
  end

  def coffeescript(path)
    get(path) do |raw|
      puts "BUILDING COFFEE #{path}"
      CoffeeScript.compile(raw)
    end
  end
  def scss(path)
    get(path) do |raw|
      puts "BUILDING SASS #{path}"
      Sass::Engine.new(raw, syntax: :scss).render
    end
  end
end

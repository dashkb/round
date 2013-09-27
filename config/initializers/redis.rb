uri = URI.parse(ENV['REDIS_URL'] || ENV['REDISTOGO_URL'])
REDIS = Redis.new host: uri.host, port: uri.port, password: uri.password

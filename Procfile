web: unicorn -c config/unicorn.rb -p $PORT
redis: redis-server config/redis.conf --port $PORT
player: bundle exec rake play

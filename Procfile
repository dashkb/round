web: bundle exec unicorn --port $PORT -c config/unicorn.rb
player: bundle exec rake player
redis: redis-server config/redis.conf --port $PORT

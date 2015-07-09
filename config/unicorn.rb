working_directory File.expand_path('../', __dir__)
worker_processes  3
timeout           15

preload_app true
listen      "127.0.0.1:#{ENV['PORT']}"

# We can't init anything until after we fork because reasons
after_fork do |server, worker|
  Round.init
end

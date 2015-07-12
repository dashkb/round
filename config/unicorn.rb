working_directory File.expand_path('../', __dir__)
worker_processes  3
timeout           15

preload_app true

# We can't init anything until after we fork because reasons
after_fork do |server, worker|
  Round.init
end

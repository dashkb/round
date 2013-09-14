# Add your own tasks in files placed in lib/tasks ending in .rake,
# for example lib/tasks/capistrano.rake, and they will automatically be available to Rake.

require File.expand_path('../config/application', __FILE__)

Round::Application.load_tasks

$stdout.sync = true
$trap_signals_like_a_boss = Proc.new do
  %w{INT KILL TERM}.each do |sig|
    Signal.trap(sig) do
      stop
    end
  end
end

task play: :environment do
  require Rails.root.join 'lib', 'player'
  Player.start
end

task control: :environment do
  require Rails.root.join 'lib', 'controller'
  Controller.start
end

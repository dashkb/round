require File.expand_path('../config.rb', __FILE__)

namespace :db do
  desc 'Run migrations'
  task :migrate, [:version] do |t, args|
    Sequel.extension(:migration)

    if args[:version]
      puts "Migrating to version #{args[:version]}"
      Sequel::Migrator.run(Round.database, "db/migrations", target: args[:version].to_i)
    else
      puts "Migrating to latest version"
      Sequel::Migrator.run(Round.database, "db/migrations")
    end
  end
end

task :pry do
  Round.init
  require 'lib/access_list_service'
  require 'lib/player_service'
  require 'lib/queue_service'
  binding.pry
end

task :player do
  Round.init
  require 'lib/player'
  Player.start
end

namespace :import do
  desc 'import media from a filesystem'
  task :filesystem do
    root = ENV.fetch('SOURCE_ROOT') { raise 'you must specify a SOURCE_ROOT' }
    name = ENV.fetch('SOURCE_NAME') { raise 'you must specify a SOURCE_NAME' }
    Round.init

    source   = Source.where(name: name).first
    updating = true

    if source.nil?
      source   = Source.create(name: name, root: root)
      updating = false
    end

    puts "#{updating ? 'Updating' : 'Creating'} source #{source.name}"

    require 'find'
    require 'lib/importer/file'

    importer = Importer::File.new(source)
    counter = 0
    started = Time.now
    iteration = Time.now

    Find.find(source.root) do |path|
      next unless importer.supported?(path)
      imported = importer.import(path)

      warn(imported) unless imported == true
      if (counter += 1) % 100 == 0
        elapsed = Time.now - started
        iterated = Time.now - iteration
        puts "[%-6s] Finished %d tracks (iteration took %s seconds)!" % [elapsed.round(4), counter, iterated]
        iteration = Time.now
      end
    end
  end
end

task :whitelist do
  Round.init
  require 'lib/access_list_service'
  require 'lib/player_service'
  require 'lib/queue_service'

  AccessListService.clear
  Genre.all.each do |genre|
    print "Whitelist #{genre.name}? [y/N] "
    answer = STDIN.gets.chomp.downcase

    if answer == 'y'
      AccessListService.whitelist(:genre, genre.id)
    end
  end
end

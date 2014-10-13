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
  binding.pry
end

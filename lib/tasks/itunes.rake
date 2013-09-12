require File.join Rails.root, 'lib', 'itunes_lib_parser'

desc 'Read an iTunes library into the db (options: FILE=path)'
namespace :itunes do
  task :read => [:environment] do
    [Track, Artist, Album, Genre].each &:destroy_all

    counter = 0
    start_time = Time.now

    handler = ItunesLibParser.new
    handler.on_track do |track|
      Track.import track

      if (counter += 1) % 1000 == 0
        puts "Finished #{counter} tracks"
        puts "#{Time.now - start_time} elapsed"
      end
    end

    file = File.open ENV['FILE'], 'r'
    Ox.sax_parse handler, file
  end
end

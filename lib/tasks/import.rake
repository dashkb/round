require File.join Rails.root, 'lib', 'itunes_lib_parser'

desc 'Read an iTunes library into the db (options: FILE=path)'
namespace :import do
  task :itunes => [:environment] do
    source = Source.create name: ENV['SOURCE_NAME']
    raise "#{source.errors.to_a}" unless source.valid?

    counter = 0
    start_time = Time.now

    handler = ItunesLibParser.new
    handler.on_track do |track|
      Track.import track, source

      if (counter += 1) % 1000 == 0
        puts "Finished #{counter} tracks"
        puts "#{Time.now - start_time} elapsed"
      end
    end

    file = File.open ENV['FILE'], 'r'
    Ox.sax_parse handler, file
  end

  task :filesystem => [:environment] do
    source = Source.create name: ENV['SOURCE_NAME']
    raise "#{source.errors.to_a}" unless source.valid?

    # TODO Ivan:
    # All you need to do is iterate through your tracks
    # passing hashes to Track.import
    # That method is expecting the following keys:
    # required: 'Artist', 'Album Artist', 'Album'
    # 'Genre', 'Total Time', 'Track Number', 'Location'
    # optional: 'Sort Name', 'Sort Artist', 'Sort Album'
    # 'Track Count'
    #
    # Track.import will take care of creating artists and albums
    # and associating them for you, or detecting existing ones
    # and using those associations. It will return the created Track
    # if you want to make any further modifications.  Martin's
    # library import takes about a half an hour; so don't waste
    # too much time.  We'll make sure we have a rails console available
    # to fix errors like 'Sphongle' or whatever at the burn.
    #
    # Track.import takes a Source as well
    # and honestly should probably be Source#import(track)
    # but I will deal with that later
  end
end

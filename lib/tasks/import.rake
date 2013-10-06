require File.join Rails.root, 'lib', 'itunes_lib_parser'
require 'find'
require 'fileutils'
require 'taglib'

START_AT = ENV['START_AT'] ? ENV['START_AT'].to_i : 0

desc 'Read an iTunes library into the db (options: FILE=path)'
namespace :import do
  task :itunes => [:environment] do
    source = Source.find_or_initialize_by({
      name: ENV['SOURCE_NAME'],
      root_path: "itunes-#{ENV['SOURCE_NAME']}"
    })

    raise "#{source.errors.to_a}" unless source.valid?
    is_update = !source.new_record?
    source.save

    puts "#{is_update ? 'Updating' : 'Importing'} #{ENV['SOURCE_NAME']}"

    counter = 0
    start_time = Time.now

    handler = ItunesLibParser.new
    handler.on_track do |track|
      if counter >= START_AT
        Track.import track, source, update: is_update
      end

      if (counter += 1) % 1000 == 0
        puts "Finished #{counter} tracks"
        puts "#{Time.now - start_time} elapsed"
      end
    end

    file = File.open ENV['FILE'], 'r'
    Ox.sax_parse handler, file
  end

  task :art => [:environment] do
    album = Album.missing_art_album
    while not album.nil?
      album.try_get_art
      album = Album.missing_art_album
    end
  end

  task :check => [:environment] do
    total = Track.count
    count = 0
    bad_count = 0
    Track.find_each do |t|
      unless File.exist? t.local_path
        puts "Track(#{t.id}) has broken path: '#{t.local_path}'"
        bad_count += 1
      end
      count += 1
      puts "#{count} tracks checked" if (count % 1000 == 0)
    end

    puts "#{bad_count} broken paths out of #{count} tracks"
  end

  task :filesystem => [:environment] do
    source = Source.find_or_initialize_by_name_and_root_path ENV['SOURCE_NAME'], ENV['ROOT_PATH']
    raise "#{source.errors.to_a}" unless source.valid?
    raise "The given path does not exist." unless Dir.exist? source.root_path
    raise "Relative paths are forbidden!" unless source.root_path.start_with? '/'
    is_update = !source.new_record?
    source.save

    valid_exts = ['.mp3', '.m4a']

    root = Pathname.new(source.root_path)

    counter = 0
    start_time = Time.now

    puts "#{is_update ? 'Updating' : 'Importing'} #{ENV['SOURCE_NAME']}"

    Find.find(source.root_path) do |path|
      rel_path = Pathname.new(path).relative_path_from(root)
      if valid_exts.include? rel_path.extname

        did_import = false

        TagLib::FileRef.open(path.to_s) do |fileref|
          unless fileref.null?
            tag = fileref.tag
            properties = fileref.audio_properties

            result = {
              'Name' => tag.title,
              'Artist' => tag.artist,
              'Album Artist' => tag.artist,
              'Album' => tag.album,
              'Genre' => tag.genre,
              'Total Time' => properties.length,
              'Track Number' => tag.track,
              'Location' => rel_path.to_s,
              'Year' => tag.year
            }
            Track.import(result, source, update: is_update)
            did_import = true
          end
        end

        puts "Warning: did not import #{rel_path.to_s} because the tag could not be read" unless did_import
        if did_import && (counter += 1) % 1000 == 0
          puts "Finished #{counter} tracks"
          puts "#{Time.now - start_time} elapsed"
        end
      end
    end
  end
end

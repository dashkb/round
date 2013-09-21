class Track < ActiveRecord::Base
  belongs_to :artist
  belongs_to :album
  belongs_to :genre
  belongs_to :source

  validates :name, :file, :source,  presence: true
  validates :file, :uniqueness => { :scope => :source_id }

  def local_path
    if source.path_fix.present?
      eval source.path_fix
    else
      File.join(source.root_path, file)
    end
  end

  def self.import(track_attrs, source, opts = {})
    opts.reverse_merge!({update: false})

    track = if opts[:update]
      Track.find_or_initialize_by({
        file: track_attrs['Location'],
        source_id: source.id
      })
    else
      nil
    end

    artist = Artist.find_or_create_by({
      name: track_attrs['Artist'].downcase
    }) do |artist|
      artist.update_attributes display_name: track_attrs['Artist']
    end

    album_artist = if track_attrs['Album Artist'].present?
      Artist.find_or_create_by({
        name: track_attrs['Album Artist'].downcase,
      })
    else
      artist
    end

    # Snag sort name from album artist if needed/possible
    if artist.id == album_artist.id && artist.sort_name.blank?
      [artist, album_artist].each do |a|
        a.update_attributes sort_name: track_attrs['Sort Artist']
      end
    end

    album = album_artist.albums.find_or_create_by({
     name: track_attrs['Album'].downcase
    }) do |album|
      album.update_attributes({
        display_name: track_attrs['Album'],
        sort_name: track_attrs['Sort Album']
      })
    end

    genre = Genre.find_or_initialize_by({
      name: track_attrs['Genre'].downcase
    }) do |genre|
      genre.update_attributes display_name: track_attrs['Genre'] if genre
    end

    attributes = {
      itunes_id: track_attrs['Track ID'],
      name: track_attrs['Name'].try(:downcase),
      display_name: track_attrs['Name'],
      sort_name: track_attrs['Sort Name'],
      runtime: track_attrs['Total Time'],
      track_number: track_attrs['Track Number'],
      track_count: track_attrs['Track Count'],
      year: track_attrs['Year'],
      file: track_attrs['Location'],
      compilation: track_attrs['Compilation'].present?,
      album: album,
      artist: artist,
      genre: genre
    }

    if track
      track.update_attributes attributes
    else
      track = source.tracks.create attributes
    end

    track
  end
end

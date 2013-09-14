class Track < ActiveRecord::Base
  belongs_to :artist
  belongs_to :album
  belongs_to :genre

  validates :name, presence: true

  def local_path
    Rails.root.join 'loop.mp3'
  end

  def self.import(track)
    artist = Artist.find_or_initialize_by_name track['Artist'].downcase rescue nil
    artist.update_attributes display_name: track['Artist'] if artist

    album_artist = if track['Album Artist'].present?
      Artist.find_or_initialize_by({
        name: track['Album Artist'].downcase,
      }) rescue artist
    else
      artist
    end

    if artist && artist.id == album_artist.id && artist.sort_name.blank?
      [artist, album_artist].each do |a|
        a.update_attributes sort_name: track['Sort Artist']
      end
    end

    album = album_artist.albums.find_or_initialize_by_name track['Album'].downcase rescue nil
    album.update_attributes({
      display_name: track['Album'],
      sort_name: track['Sort Album']
    }) if album

    genre = Genre.find_or_initialize_by_name track['Genre'].downcase rescue nil
    genre.update_attributes display_name: track['Genre'] if genre

    create({
      itunes_id: track['Track ID'],
      name: track['Name'].try(:downcase),
      display_name: track['Name'],
      sort_name: track['Sort Name'],
      runtime: track['Total Time'],
      track_number: track['Track Number'],
      track_count: track['Track Count'],
      year: track['Year'],
      file: track['Location'],
      compilation: track['Compilation'].present?,
      album: album,
      artist: artist,
      genre: genre,
      source: ENV['TRACK_SOURCE']
    })
  end
end

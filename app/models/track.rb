class Track < Sequel::Model
  many_to_one :source
  many_to_one :genre
  many_to_one :artist
  many_to_one :album
  one_to_many :histories
  one_to_many :selections

  def to_s
    "#{artist} - #{self.name}"
  end

  def local_path
    File.join(source.root, self.filename)
  end

  def as_json(deep=false)
    json = {
      id:        self.id,
      genre:     self.genre_id,
      artist:    self.artist_id,
      album:     self.album_id,
      name:      self.name,
      sort_name: self.sort_name,
      runtime:   self.runtime,
      track_num: self.track_num.to_s.rjust(2, '0')
    }

    if deep
      json[:genre]  = genre.as_json
      json[:artist] = artist.as_json
      json[:album]  = album.as_json
    end

    return json
  end
end

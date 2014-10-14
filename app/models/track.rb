class Track < Sequel::Model
  many_to_one :source
  many_to_one :genre
  many_to_one :artist
  many_to_one :album
  one_to_many :histories
  one_to_many :selections

  def as_json
    {
      id:        self.id,
      genre:     self.genre_id,
      artist:    self.artist_id,
      album:     self.album_id,
      name:      self.name,
      sort_name: self.sort_name
    }
  end
end

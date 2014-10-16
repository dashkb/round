class Artist < Sequel::Model
  one_to_many :albums
  one_to_many :tracks
  one_to_many :artists_genres
  many_to_many :genres

  def to_s
    self.name
  end

  def as_json
    {
      id:        self.id,
      genres:    self.genres.map(&:id),
      name:      self.name,
      sort_name: self.sort_name
    }
  end
end

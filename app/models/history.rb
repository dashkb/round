class History < Sequel::Model
  many_to_one :track

  def as_json(options={})
    {
      id:        self.id,
      track:     self.track_id,
      played_at: self.played_at
    }
  end
end

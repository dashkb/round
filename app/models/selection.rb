class Selection < Sequel::Model
  many_to_one :track
  one_to_one :history

  def as_json(options={})
    {
      id:           self.id,
      track:        self.track_id,
      queued_at:    self.queued_at,
      requested_by: self.requested_by
    }
  end
end

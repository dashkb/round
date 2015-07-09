class History < Sequel::Model
  many_to_one :track
  many_to_one :selection

  def as_json(options={})
    json = {
      id:        self.id,
      track:     self.track_id,
      selection: self.selection_id,
      played_at: self.played_at
    }

    if options[:deep]
      json[:track] = track.as_json(deep: true)
      json[:selection] = selection.as_json(deep: false)
    end

    return json
  end
end

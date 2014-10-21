class Genre < Sequel::Model
  def as_json(options={})
    {
      id:        self.id,
      name:      self.name,
      sort_name: self.sort_name
    }
  end
end

class AccessList < Sequel::Model
  plugin :serialization, :json, :list

  def as_json(options={})
    json = {
      id:   self.id,
      name: self.name,
      list: self.list,
    }

    if options[:shallow]
      json.delete(:list)
    end

    return json
  end
end

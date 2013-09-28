class << ActiveRecord::Base
  def as_json
    super.merge({
      type: self.class.name.downcase
    })
  end
end

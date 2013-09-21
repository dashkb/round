class Source < ActiveRecord::Base
  has_many :tracks
  validates :name, :root_path, presence: true, uniqueness: true
end

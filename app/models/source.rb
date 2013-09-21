class Source < ActiveRecord::Base
  has_many :tracks

  validates :name, :root_path, presence: true
  validates :name, :root_path, uniqueness: true
end

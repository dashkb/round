class Album < ActiveRecord::Base
  belongs_to :artist
  has_many :tracks

  validates :name, :artist, presence: true
  validates :name, :uniqueness => { :scope => :artist_id }
end

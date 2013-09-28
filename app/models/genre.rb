class Genre < ActiveRecord::Base
  has_many :tracks
  has_many :artist_genres
  has_many :artists, through: :artist_genres

  validates :name, presence: true
  validates :name, uniqueness: true
end

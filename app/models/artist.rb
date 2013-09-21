class Artist < ActiveRecord::Base
  has_many :tracks
  has_many :albums
  has_many :genres, through: :artist_genres

  validates :name, presence: true
  validates :name, uniqueness: true
end

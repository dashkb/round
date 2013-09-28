class Artist < ActiveRecord::Base
  has_many :tracks
  has_many :albums
  has_many :artist_genres
  has_many :genres, through: :artist_genres

  validates :name, presence: true

  def to_s
    display_name
  end
end

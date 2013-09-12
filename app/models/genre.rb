class Genre < ActiveRecord::Base
  has_many :tracks
  has_many :artists, through: :artist_genres
end

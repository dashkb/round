class Artist < Sequel::Model
  one_to_many :albums
  one_to_many :tracks
  many_to_many :genres
end

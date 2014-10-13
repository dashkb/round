class Track < Sequel::Model
  many_to_one :source
  many_to_one :genre
  many_to_one :artist
  many_to_one :album
  one_to_many :histories
  one_to_many :selections
end

class ArtistGenre < Sequel::Model
  set_primary_key [:artist_id, :genre_id]

  many_to_one :artist
  many_to_one :genre
end

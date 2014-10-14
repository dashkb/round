class ArtistGenre < Sequel::Model(:artists_genres)
  set_primary_key [:artist_id, :genre_id]

  many_to_one :artist
  many_to_one :genre
end

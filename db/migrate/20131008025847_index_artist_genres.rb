class IndexArtistGenres < ActiveRecord::Migration
  def change
    add_index :artist_genres, :artist_id
    add_index :artist_genres, :genre_id
  end
end

class UnderpArtistGenres < ActiveRecord::Migration
  def change
    rename_column :artist_genres, :artist_id_id, :artist_id
    rename_column :artist_genres, :genre_id_id, :genre_id
  end
end

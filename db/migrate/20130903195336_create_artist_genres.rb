class CreateArtistGenres < ActiveRecord::Migration
  def change
    create_table :artist_genres, id: false do |t|
      t.references :artist_id
      t.references :genre_id
    end
  end
end

class CreateTracks < ActiveRecord::Migration
  def change
    create_table :tracks do |t|
      t.string :itunes_id
      t.text :name
      t.text :display_name
      t.text :file
      t.text :sort_name
      t.integer :track_number
      t.integer :track_count
      t.integer :year
      t.integer :runtime
      t.boolean :compilation
      t.references :album_artist
      t.references :album
      t.references :artist
      t.references :genre
      t.index :name
    end
  end
end

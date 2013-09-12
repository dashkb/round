class CreateTracks < ActiveRecord::Migration
  def change
    create_table :tracks do |t|
      t.string :itunes_id
      t.string :name
      t.string :display_name
      t.string :file
      t.string :sort_name
      t.string :source
      t.integer :track_number
      t.integer :track_count
      t.integer :year
      t.integer :runtime
      t.boolean :compilation
      t.references :album_artist
      t.references :album
      t.references :artist
      t.references :genre

      t.timestamps
    end
  end
end

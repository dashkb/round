class CreateAlbums < ActiveRecord::Migration
  def change
    create_table :albums do |t|
      t.string :name
      t.string :display_name
      t.string :sort_name
      t.references :artist

      t.index :name

      t.timestamps
    end
  end
end

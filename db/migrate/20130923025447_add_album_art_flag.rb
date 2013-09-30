class AddAlbumArtFlag < ActiveRecord::Migration
  def change
    add_column :albums, :art_checked, :boolean, :default => false, :null => false
  end
end

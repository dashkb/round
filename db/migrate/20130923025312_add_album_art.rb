class AddAlbumArt < ActiveRecord::Migration
  def self.up
    add_attachment :albums, :art
  end

  def self.down
    remove_attachment :albums, :art
  end
end

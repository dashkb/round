class CreateArtists < ActiveRecord::Migration
  def change
    create_table :artists do |t|
      t.string :name
      t.string :display_name
      t.string :sort_name
      t.index :name
    end

  end
end

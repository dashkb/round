class CreateGenres < ActiveRecord::Migration
  def change
    create_table :genres do |t|
      t.string :name
      t.string :display_name

      t.index :name

      t.timestamps
    end
  end
end

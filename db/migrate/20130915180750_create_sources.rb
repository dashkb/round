class CreateSources < ActiveRecord::Migration
  def change
    create_table :sources do |t|
      t.string :name
      t.text :root_path
      t.text :path_fix
    end
  end
end

class CreateSources < ActiveRecord::Migration
  def change
    create_table :sources do |t|
      t.string :name
      t.string :root_path
    end

    add_reference :tracks, :source, index: true
  end
end

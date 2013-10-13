class CreateSelections < ActiveRecord::Migration
  def change
    create_table :selections do |t|
      t.references :track
      t.string :name

      t.timestamps
    end
  end
end

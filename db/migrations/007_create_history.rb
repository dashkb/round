Sequel.migration do
  change do
    create_table(:histories) do
      primary_key :id
      Integer :track_id, null: false, index: true
      Integer :selection_id, index: true
      DateTime :played_at, null: false, index: true
    end
  end
end

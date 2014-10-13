Sequel.migration do
  change do
    create_table(:selections) do
      primary_key :id
      Integer :track_id, null: false, index: true
      Integer :history_id
      DateTime :queued_at, null: false, index: true
      String :requested_by, index: true
    end
  end
end

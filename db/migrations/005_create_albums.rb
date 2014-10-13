Sequel.migration do
  change do
    create_table(:albums) do
      primary_key :id
      String :name,      null: false, index: true
      String :raw_name,  null: false
      String :sort_name
      Integer :track_count, default: 0
      FalseClass :compilation
    end
  end
end

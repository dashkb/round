Sequel.migration do
  change do
    create_table(:genres) do
      primary_key :id
      String :name,      null: false, index: true
      String :raw_name,  null: false
      String :sort_name, null: false
    end
  end
end

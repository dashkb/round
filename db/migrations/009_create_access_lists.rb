Sequel.migration do
  change do
    create_table(:access_lists) do
      primary_key :id
      String :name, null: false
      String :list, text: true, null: false, default: '{}'
    end
  end
end

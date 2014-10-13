Sequel.migration do
  change do
    create_table(:sources) do
      primary_key :id
      String :name, null: false
      String :root, text: true
    end
  end
end

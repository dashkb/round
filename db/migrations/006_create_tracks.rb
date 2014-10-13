Sequel.migration do
  change do
    create_table(:tracks) do
      primary_key :id
      Integer :source_id, null: false
      Integer :genre_id,  null: false
      Integer :artist_id
      Integer :album_id,  null: false
      Integer :track_num
      Integer :year
      Integer :runtime
      String :name,      null: false, index: true
      String :raw_name,  null: false
      String :sort_name, null: false
      String :filename,  null: false, text: true
      String :itunes_id
    end
  end
end

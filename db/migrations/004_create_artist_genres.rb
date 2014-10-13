Sequel.migration do
  change do
    create_table(:artists_genres) do
      Integer :artist_id, null: false, index: true
      Integer :genre_id, null: false, index: true
    end
  end
end

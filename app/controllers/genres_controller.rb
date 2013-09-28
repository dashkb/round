class GenresController < ApplicationController
  def browse
    genre = Genre.find params[:id]
    respond_with({
      genre: genre,
      artists: genre.artists,
    })
  end
end

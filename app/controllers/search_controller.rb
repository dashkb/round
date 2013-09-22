class SearchController < ApplicationController
  respond_to :json

  def search
    regex = ".*#{params[:term]}.*"
    respond_with({
      artists: (Artist.where "name ~* ?", regex),
      albums: (Album.where "name ~* ?", regex),
      tracks: (Track.where "name ~* ?", regex)
    })
  end
end
class SearchController < ApplicationController
  def search
    regex = ".*#{params[:term]}.*"
    respond_with({
      tracks: (Track.where "name ~* ?", regex)
    })
  end
end

class SearchController < ApplicationController
  def search
    scope = Track.joins(:artist, :album)
    where = "tracks.name ~* ? or artists.name ~* ? or albums.name ~* ?"
    regex = ".*#{params[:term]}.*"

    respond_with({
      tracks: scope.where(where, regex, regex, regex)
    })
  end
end

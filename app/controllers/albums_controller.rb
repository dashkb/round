class AlbumsController < ApplicationController
  def browse
    album = Album.includes(:tracks).find params[:id]
    respond_with({
      album: album,
      tracks: album.tracks
    })
  end
end

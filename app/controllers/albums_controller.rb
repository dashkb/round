class AlbumsController < ApplicationController
  def browse
    album = Album.includes(:tracks).find params[:id]
    respond_with({
      album: album,
      tracks: album.tracks
    })
  end

  def index
    raise 'wtf' unless params[:artist_id].present?

    respond_with(
      Album.includes(:tracks).where(artist_id: params[:artist_id]).load
    )
  end
end

class ArtistsController < ApplicationController
  respond_to :json

  def index
    respond_with Artist.all
  end

  def show
    respond_with (Artist.find params[:id])
  end

  def search
    respond_with (Artist.where "name ~* ?", ".*#{params[:term]}.*")
  end
end

require Rails.root.join 'lib', 'player_service'

class PlayerController < ApplicationController
  respond_to :json

  def queue
    track = Track.find params[:track_id]

    reply = PlayerService.queue track

    respond_with reply
  end
end

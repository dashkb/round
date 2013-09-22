require Rails.root.join 'lib', 'player_service'

class PlayerController < ApplicationController
  respond_to :json

  def queue
    track = Track.find params[:track_id]

    reply = PlayerService.queue track

    render nothing: true, status: 200
  end

  def status
    respond_with PlayerService.status
  end
end

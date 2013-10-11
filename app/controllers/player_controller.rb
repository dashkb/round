require Rails.root.join 'lib', 'player_service'

class PlayerController < ApplicationController
  respond_to :json

  def queue
    if params[:track_id].present?
      queue_track params[:track_id]
    elsif params[:track_ids].present?
      params[:track_ids].each do |track_id|
        queue_track track_id
      end
    end

    render json: {status: 200}, status: 200
  end

  def status
    respond_with PlayerService.status
  end

  private
  def queue_track(track_id)
    PlayerService.queue Track.find(track_id)
  end
end

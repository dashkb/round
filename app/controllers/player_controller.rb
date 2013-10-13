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

  %w{status play pause next}.each do |api_method|
    define_method api_method do
      response = PlayerService.send(api_method)

      if response.is_a?(Hash)
        respond_with response
      else
        render json: {status: 200}, status: 200
      end
    end
  end

  private
  def queue_track(track_id)
    track = Track.find track_id
    PlayerService.queue track
    Selection.create track: track, name: params[:name]
  end
end

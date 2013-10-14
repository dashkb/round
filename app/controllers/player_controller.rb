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

  %w{status play pause skip}.each do |api_method|
    define_method api_method do
      render text: "Must be Tim...", status: 401 unless tim? || api_method == 'status'
      response = PlayerService.send(api_method)

      if response.is_a?(Hash)
        respond_with response
      else
        render json: {status: 200}, status: 200
      end
    end
  end

  %w{play_now unqueue rocket}.each do |api_method|
    define_method api_method do
      render text: "Must be Tim...", status: 401 unless tim?

      QueueService.send(api_method, params[:track_id])
      render json: {status: 200}, status: 200
    end
  end

  def swap
    render text: "Must be Tim...", status: 401 unless tim?
    QueueService.swap params

    render json: {status: 200}, status: 200
  end

  private
  def queue_track(track_id)
    track = Track.find track_id
    PlayerService.queue track
    Selection.create track: track, name: params[:name]
  end
end

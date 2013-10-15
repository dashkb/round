class TimController < ApplicationController
  protect_from_forgery except: :art_upload

  def timify
    if REDIS.sismember 'tim-passwords', params[:password]
      session[:tim] = true
    end

    redirect_to '/tim'
  end

  def untimify
    session[:tim] = nil
    redirect_to '/'
  end

  def things
    if session[:tim]
      respond_with REDIS.hgetall('app-settings')
    else
      respond_with({status: 'not timified'})
    end
  end

  def whitelist
    list = nil

    if params[:clear].present?
      list = {}
    elsif params[:remove].present?
      list = QueueService.read_whitelist
      list[params[:key]] ||= []
      list[params[:key]].reject! { |hash|
        hash['id'] == params[:id] }
    else
      list = QueueService.read_whitelist
      list[params[:key]] ||= []
      list[params[:key]] << params.slice(:name, :id)
    end

    QueueService.write_whitelist list

    render json: list.to_json
  end

  def missing_albums_data
    if session[:tim]
      albums = Album.joins(:artist).where('art_file_name IS NULL').order('artists.name, name').limit(100).all
      respond_with({
        albums: albums
      })
    else
      respond_with({status: 'not timified'})
    end
  end

  def art_upload
    album = Album.find(params[:id])
    if params.include? :album and params[:album].include? :art
      album.art = params[:album][:art]
      album.save
    end
    redirect_to '/tim/missing_albums'
  end

  def lock_queue_max
    QueueService.lock_max params[:new_max]

    render json: {status: 'ok'}
  end
end

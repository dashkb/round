class TimController < ApplicationController
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
end

class ApplicationController < ActionController::Base
  respond_to :json
  protect_from_forgery with: :exception

  rescue_from ActionController::UnknownFormat, ActionController::RoutingError do
    render_frontend
  end

  def render_frontend
    render text: 'hello', layout: true
  end

  def tim?
    !!session[:tim]
  end
  helper_method :tim?
end

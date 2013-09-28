class ApplicationController < ActionController::Base
  respond_to :json
  protect_from_forgery with: :exception

  rescue_from ActionController::UnknownFormat do
    render_frontend
  end

  def render_frontend
    render text: 'hello', layout: true
  end
end

class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception

  rescue_from ActionController::UnknownFormat do
    render_frontend
  end

  def render_frontend
    render text: 'hello', layout: true
  end
end

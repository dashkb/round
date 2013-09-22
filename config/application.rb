require File.expand_path('../boot', __FILE__)


# Pick the frameworks you want:
require "active_record/railtie"
require "action_controller/railtie"
require "action_mailer/railtie"
require "sprockets/railtie"
# require "rails/test_unit/railtie"

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(:default, Rails.env)
Dotenv.load


module Round
  class Application < Rails::Application
    $LOAD_PATH << Rails.root.join('lib')
    config.assets.paths << Rails.root.join('app', 'assets', 'font')
    config.assets.precompile += %w( .svg .eot .woff .ttf )
  end
end

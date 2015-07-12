require 'lib/controller'
require 'lib/device/core_audio'
require 'lib/device/fake'
require 'lib/interface'
require 'lib/queue_service'

# Manages threads that control and play audio.
module Player
  extend self

  # Prevent anyone from including this module, it should be used directly (via class methods)
  def self.extended(base)
    raise RuntimeError, 'do not include Player, use directly'
  end

  def controller
    @controller ||= Controller.new(interface)
  end

  def device
    @device ||= load_device_class.new(interface)
  end
  def device=(device)
    raise RuntimeError, 'cannot change the device while player is started' if started?
    @device = device
  end
  def load_device_class
    device_name = ENV.fetch('DEVICE') { default_device_name }
    require "lib/device/#{device_name}"
    "Device::#{device_name.camelcase}".constantize
  end
  def default_device_name
    platform = Gem::Platform.local
    case platform.to_s
    when 'x86_64-linux' then 'vlc'
    when 'darwin' then 'core_audio'
    else
      warn("Unknown platform, '#{platform}', cannot determine proper device for handling music. Falling back to Fake")
      'fake'
    end
  end

  def interface
    @interface ||= Interface.new
  end

  def started?; @started == true; end
  def stopped?; not started?; end

  def start
    return if started?
    trap
    register
    @started = true

    interface.info("Starting All Threads")

    [
      controller.start,
      device.start,
      interface.start
    ].each(&:join)
  end
  def stop
    return if stopped?
    @started = false

    interface.info("Stopping All Threads")

    controller.stop
    device.stop
    interface.stop
  end

  def api_status
    {
      now_playing: device.now_playing.as_json(deep: true),
      position:    device.position,
      state:       device.paused? ? 'paused' : 'playing'
    }
  end
  def api_skip
    device.skip
    'OK'
  end
  def api_pause
    device.pause
    'OK'
  end
  def api_play
    device.play
    'OK'
  end

  protected
  def trap
    # Only allow traps to be set once
    return if @trapped
    @trapped = true
    at_exit do
      stop
    end
  end
  def register
    controller.on(:status, method(:api_status))
    controller.on(:skip, method(:api_skip))
    controller.on(:pause, method(:api_pause))
    controller.on(:play, method(:api_play))
  end
end

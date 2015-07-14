module Device
  class Audite
    include ThreadRunner
    include Device

    def initialize(interface)
      super

      @buffer_size = 2 ** 12
      @device_name = ENV['AUDITE_DEVICE'] || 'hdmi'

      puts 'REQUIRE'
      require 'audite'
      puts 'REQUIRED'
      @device = ::Audite.new(@buffer_size, @device_name)

      @device.events.on(:complete) do
        @playing = false
      end

      @playing = false
    end

    def pause
      info("PAUSE")
      @device.stop_stream
    end
    def stop
      info("STOP")
      @device.stop_stream
      super
    end

    def playing?
      sleep 1
      @playing
    end

    def position
      @device.position.to_i
    end

    protected
    def play_track(track)
      @device.load(track.local_path)
      @device.start_stream unless @device.active
      @playing = true
      super
    end
  end
end

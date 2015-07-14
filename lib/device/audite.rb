module Device
  class Audite
    include ThreadRunner
    include Device

    def initialize(interface)
      super

      @buffer_size = 2 ** 14
      @device_name = ENV['AUDITE_DEVICE']

      require 'audite'
      @device = ::Audite.new(@buffer_size, @device_name)

      @device.events.on(:complete) do
        puts "DONE WITH TRACK!"
        @playing = false
      end

      @playing = false
    end

    def pause
      @device.stop_stream
      super
    end
    def stop
      @device.stop_stream
      @playing = false
      super
    end
    def skip
      @playing = false
      super
    end

    def playing?
      sleep 0.5
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

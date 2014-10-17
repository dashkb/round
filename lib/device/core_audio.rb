require 'lib/audio_file'
require 'lib/device'
require 'lib/queue_service'
require 'lib/thread_runner'

module Device
  class CoreAudio
    include ThreadRunner
    include Device

    def initialize(interface)
      super

      @buffer_size = 2 ** 16
      @device      = ::CoreAudio.default_output_device
      @buffer      = @device.output_buffer(@buffer_size)
    end

    def start
      @buffer.start
      super
    end
    def stop
      super
      @buffer.stop
    end

    # If you pause this will get way out of wack... fuck it. Don't pause!
    def position
      Time.now.to_i - (@started_at || Time.now.to_i)
    end

    def playing?
      if (buffer = read_buffer)
        @started_at ||= Time.now.to_i
        @buffer << buffer
        return true
      else
        return false
      end
    end

    protected
    def stop_current
      @audio_file.try(:close)

      @audio_file  = nil
      super
    end

    def play_track(track)
      super
      @audio_file = AudioFile.new(track.local_path)
      @started_at = nil

      unless @audio_file.okay?
        error("Audio file could not be read")
        stop_current
      end
    end

    def read_buffer
      @audio_file.try(:okay?) && @audio_file.read(@buffer_size)
    end
  end
end

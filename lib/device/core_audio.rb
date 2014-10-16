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

    def position
      @audio_file.position
    end

    def playing?
      if (buffer = read_buffer)
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
      @audio_file  = AudioFile.new(track.local_path)

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

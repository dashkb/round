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
      @channels    = @device.output_stream.channels
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
        @buffer << fill_channels(buffer)
        return true
      else
        return false
      end
    rescue => e
      error("Error: #{e.message}")
      return false
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

    # If we are playing on a device with more channels than the device we need to fill the rest of the channels with 0
    # data (silence).
    def fill_channels(buffer)
      if buffer.dim <  @channels
        full = NArray.sint(@channels, @buffer_size)
        @buffer_size.times do |i|
          full[i * @channels + 0] = buffer[i * buffer.dim + 0]
          full[i * @channels + 1] = buffer[i * buffer.dim + 1]
        end

        return full
      elsif buffer.dim > @channels
        # We don't currently support down-sampling tracks with more channels than we support
        return nil
      else
        return buffer
      end
    end
  end
end

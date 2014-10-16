require 'lib/audio_file'
require 'lib/queue_service'
require 'lib/thread_runner'

module Device
  class CoreAudio
    include ThreadRunner

    attr_reader :now_playing

    def initialize(interface)
      super

      @buffer_size = 2 ** 16
      @device      = ::CoreAudio.default_output_device
      @buffer      = @device.output_buffer(@buffer_size)
      @paused      = false
      @now_playing = nil
    end

    def paused?; @paused == true; end
    def playing?; not paused?; end

    def start
      @buffer.start
      super
    end
    def stop
      super
      @buffer.stop
    end

    def pause
      @paused = true
    end
    def play(track=nil)
      @paused = false

      if track.present?
        stop_current
        start_new(track)
      end
    end
    def skip
      stop_current
      next_from_queue
    end

    def process
      if paused?
        info("Player paused")
        sleep 1
      elsif (buffer = read_buffer)
        info("Playing #{@now_playing}: #{@audio_file.position} / #{@now_playing.runtime}")
        @buffer << buffer
        sleep 1
      else
        stop_current
        next_from_queue
      end
    end

    private
    def stop_current
      @audio_file.try(:close)

      @audio_file  = nil
      @now_playing = nil
    end

    def start_new(track)
      @now_playing = track
      @audio_file  = AudioFile.new(track.local_path)

      unless @audio_file.okay?
        error("Audio file could not be read")
        stop_current
      end
    end

    def read_buffer
      @audio_file.try(:okay?) && @audio_file.read(@buffer_size)
    end

    def next_from_queue
      track = QueueService.next

      if track.nil?
        warn("No track in queue")
        sleep 2
      else
        start_new(track)
      end
    end
  end
end

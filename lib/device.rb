module Device
  def self.included(base)
    base.send(:include, InstanceMethods)
  end

  module InstanceMethods
    def now_playing
      @now_playing
    end

    def paused?; @paused == true; end
    def playing?; not paused?; end

    def pause
      @paused = true
    end
    def play(track=nil)
      @paused = false

      if track.present?
        stop_current
        play_track(track)
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
      elsif playing?
        status_line
        sleep 1
      else
        info("Fetch next track")
        stop_current
        next_from_queue
      end
    end

    def status_line
      @ui_count ||= 1
      if (@ui_count -= 1) == 0
        @ui_count = 5
        info(info_line)
      end
    end
    def info_line
      "Playing [#{format_playtime(position)}] #{@now_playing}"
    end

    def position
      0
    end

    protected
    def stop_current
      @now_playing = nil
    end

    def play_track(track)
      @now_playing = track
    end

    def next_from_queue
      track = QueueService.next

      if track.nil?
        warn("No track in queue")
        sleep 2
      else
        play_track(track)
      end
    end

    def format_playtime(position)
      "#{format_time(position)}/#{format_time(@now_playing.runtime)}"
    end
    def format_time(time)
      minutes = time / 60
      seconds = time % 60
      "#{minutes}:#{seconds.to_s.rjust(2, '0')}"
    end
  end
end

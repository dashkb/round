require 'lib/device'
require 'lib/queue_service'
require 'lib/thread_runner'

module Device
  class Fake
    include ThreadRunner
    include Device

    def playing?
      sleep 1
      @now_playing.present? && position < @now_playing.runtime
    end

    def position
      return 0 if @started_at.nil?
      (Time.now - @started_at).round
    end

    protected
    def stop_current
      @started_at = nil
      super
    end

    def play_track(track)
      super
      @started_at = Time.now
    end
  end
end

module Device
  class Vlc
    include ThreadRunner
    include Device

    def bind_host
      Round.vlc_host
    end
    def bind_port
      Round.vlc_port
    end
    def vlc_path
      Round.vlc_path
    end
    def vlc_command
      "#{vlc_path} --intf rc --rc-host #{bind_host}:#{bind_port}"
    end
    def client
      @client ||= ::VLC::Client.new(bind_host, bind_port)
    end

    def start
      start_vlc
      client.connect
      super
    end
    def start_vlc
      puts "Starting VLC..."
      @stdin, @stdout, @stderr, @wait_thr = Open3.popen3(vlc_command)
      sleep 2
    end

    def stop
      super
      client.disconnect
      shutdown_vlc
    end
    def shutdown_vlc
      puts "Shutdown VLC (#{@wait_thr.pid})"
      @stdin.close
      @stdout.close
      @stderr.close
      @wait_thr.value
    end

    def pause
      super
      client.pause
    end
    def play(track=nil)
      super
      client.play
    end
    def skip
      client.stop
    end

    def playing?
      sleep 0.5

      3.times do |n|
        begin
          sleep 0.1
          return true if client.playing?
        rescue => e
          puts "Failed to get VLC status attempt #{n}: #{e.message}"
        end
      end

      false
    end

    def position
      client.time
    end

    private
    def play_track(track)
      client.play(track.local_path)
      super
    end
  end
end

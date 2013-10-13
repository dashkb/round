require 'queue_service'
require 'audio_file'

class Player
  include Singleton

  def self.start; instance.start end
  def self.stop;  instance.stop end
  def self.endpoint; 'ipc://round-player' end

  def initialize
    STDOUT.sync = true
    @buffer_size = 2 ** 16 # TODO make adjustable
    @device      = CoreAudio.default_output_device
    @buffer      = @device.output_buffer @buffer_size
    trap_signals
  end

  def respond(cmd)
    cmd = cmd.split(' ')
    self.send "api_#{cmd.first}", *cmd[1..-1]
  end

  def trap_signals
    %w{INT KILL TERM}.each do |sig|
      Signal.trap(sig) do
        stop
      end
    end
  end

  def start
    return if @started
    @started = Time.now

    @buffer.start
    @playThread = Thread.new do
      trap_signals
      loop { playerTick }
    end

    @serviceThread = Thread.new do
      # http://zeromq.github.io/rbzmq/classes/ZMQ/Socket.html
      @zmq         = ZMQ::Context.new
      @socket      = @zmq.socket ZMQ::REP

      @socket.bind self.class.endpoint
      puts "Player listening at #{self.class.endpoint}"
      trap_signals
      loop { serviceTick }
    end

    [@serviceThread, @playThread].each &:join
  end

  def stop
    @playThread.kill
    @serviceThread.kill
    @buffer.stop
    [@socket, @zmq].each &:close
    @started = nil
  end

  def serviceTick
    if msg = @socket.recv
      begin
        puts "Got #{msg}"
        @socket.send respond(msg)
      rescue StandardError => e
        @socket.send "#{e}\n#{e.backtrace}"
      end
    end
  end

  # Executes in the player thread
  def playerTick
    @nowPlaying = nil if @skip
    @skip = false

    if @pause
      puts "Player is paused"
      sleep 1
    elsif @nowPlaying && buf = @nowPlaying[:audiofile].read(@buffer_size)
      # Sweet we got some audio, play that shit
      # Won't return until the audio has played
      # TODO watch possible pause/stop lag?
      trackPosition = @nowPlaying[:audiofile].position
      puts "#{@nowPlaying[:track]} - #{@nowPlaying[:audiofile].position_str} / #{@nowPlaying[:track].length_str}" if trackPosition % 10 == 0

      unless @nowPlaying[:audiofile].fake?
        @buffer << buf
      else
        sleep 1
      end
    else
      # clear old track
      @nowPlaying = nil

      # Sleeps the player thread until a new
      # track is enqueued
      if track = QueueService.next
        puts "Playing #{track}"
        @nowPlaying = {
          track: track,
          audiofile: AudioFile.new(track.local_path)
        }

        unless @nowPlaying[:audiofile].ok?
          puts "track was no good"
          @nowPlaying = nil
        end
      else
        sleep 2
      end
    end
  end

  private
  def api_queue(track_id)
    QueueService.push Track.find(track_id)

    'OK'
  end

  def api_status
    return {
      now_playing: (@nowPlaying[:track].id rescue nil),
      queue: QueueService.all,
      state: (@pause || @stop) ? 'stopped' : 'playing'
    }.to_json
  end

  def api_skip
    @skip = true

    'OK'
  end

  def api_pause
    @pause = true

    'OK'
  end

  def api_play
    @pause = false
    @stop = false

    'OK'
  end
end

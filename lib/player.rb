class Player
  include Singleton

  def self.start; instance.start end
  def self.stop;  instance.stop end
  def self.endpoint; 'ipc://round-player' end

  def initialize
    @buffer_size = 2 ** 16 # TODO make adjustable
    @device      = CoreAudio.default_output_device
    @buffer      = @device.output_buffer @buffer_size
    @queue       = Queue.new
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
    if @nowPlaying && buf = @nowPlaying[:audiofile].read(@buffer_size)
      # Sweet we got some audio, play that shit
      # Won't return until the audio has played
      # TODO watch possible pause/stop lag?
      puts "Loading the buffer"
      @buffer << buf
    else
      # Sleeps the player thread until a new
      # track is enqueued
      @nowPlaying = @queue.deq
      puts "got a track"
      playerTick
    end
  end

  private
  class AudioFile
    attr_reader :position

    def initialize(path)
      begin
        path.gsub! '%20', ' '
        puts "Opening #{path.to_s}"
        @cafile = CoreAudio::AudioFile.new path.to_s
      rescue StandardError => e
        puts "Error opening audio file: "
        puts e.to_s
      end
    end

    def read(frames)
      @position ||= 0
      @position += frames / @cafile.rate
      @cafile.read frames
    end
  end

  def api_play(track_id)
    track = Track.find track_id
    @queue.clear
    @nowPlaying = nil
    @queue.push(
      track: track,
      audiofile: AudioFile.new(track.local_path)
    )

    track.name
  end

  def api_queue(track_id)
    track = Track.find track_id
    @queue.push(
      track: track,
      audiofile: AudioFile.new(track.local_path)
    )

    track.name
  end
end

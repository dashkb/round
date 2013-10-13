require Rails.root.join 'lib', 'player'

module PlayerService
  def self.queue(track)
    socket.send "queue #{track.id}"
    socket.recv
  end

  def self.pause
    socket.send "pause"
    socket.recv
  end

  def self.play
    socket.send "play"
    socket.recv
  end

  def self.status
    socket.send "status"
    reply = JSON.parse(socket.recv)
    return {
      now_playing: (Track.find(reply['now_playing']) rescue nil),
      queue: reply['queue'].map { |id| Track.find id },
      state: reply['state']
    }
  end

  def self.socket
    @socket ||= begin
      @zmq = ZMQ::Context.new
      @zmq.socket(ZMQ::REQ).tap do |socket|
        socket.connect Player.endpoint

        %w{INT KILL TERM}.each do |sig|
          Signal.trap(sig) do
            socket.close
            @zmq.close
          end
        end
      end
    end
  end
end

require Rails.root.join 'lib', 'player'

module PlayerService
  def self.queue(track)
    Rails.logger.debug "Sending `play #{track.id}`"
    socket.send "play #{track.id}"
    reply = socket.recv
    Rails.logger.debug "Got #{reply}"
    reply
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

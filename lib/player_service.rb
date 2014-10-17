module PlayerService
  extend self

  # Prevent anyone from including this module, it should be used directly (via class methods)
  def self.extended(base)
    raise RuntimeError, 'do not include Player, use directly'
  end

  def status
    send('status')
  end
  def queue(track)
    send('queue', track)
  end
  def skip
    send('skip')
  end
  def pause
    send('pause')
  end
  def play
    send('play')
  end

  def send(*args)
    JSON.parse(Round.zmq_client.send(args.join(' ')))
  rescue ZmqClient::ServerDown
    {status: 'zmq server down'}
  end

  def context
    @context ||= ZMQ::Context.new
  end
  def socket
    @socket ||= context.socket(ZMQ::REQ).tap do |socket|
      socket.connect(Round.controller_endpoint)
      trap
    end
  end

  private
  def trap
    %w{INT KILL TERM QUIT EXIT}.each do |signal|
      Signal.trap(signal) do
        socket.close
        context.close
      end
    end
  end
end

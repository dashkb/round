class ZmqClient
  class SendFailed < RuntimeError
    def initialize(msg)
      super("ZeroMQ send failed: #{msg}")
    end
  end
  class ServerDown < RuntimeError
    def initialize
      super("ZeroMQ server is not responding")
    end
  end

  def initialize(endpoint, retries = 3, timeout = 0.1)
    @endpoint = endpoint
    @retries  = retries
    @timeout  = timeout

    connect
    at_exit do
      @socket.close
    end
  end

  def send(msg)
    @retries.times do |try|
      raise SendFailed.new(msg) unless @socket.send(msg)
      if ZMQ.select([@socket], nil, nil, @timeout)
        content = @socket.recv
        yield(content) if block_given?
        return content
      else
        @socket.close
        connect
      end
    end

    raise ServerDown
  end

  private
  def connect
    @context = ZMQ::Context.new(1)
    @socket  = @context.socket(ZMQ::REQ)

    @socket.setsockopt(ZMQ::LINGER, 0)
    @socket.connect(@endpoint)
  end
end

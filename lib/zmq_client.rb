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

  def initialize(endpoint, retries = 3, timeout = 0.5)
    @endpoint = endpoint
    @retries  = retries
    @timeout  = timeout

    @connected = false
    @at_exited = false
  end

  def connected?
    @connected == true
  end

  def send(msg)
    connect! unless connected?

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
  rescue ZMQ::Error => e
    # If we hit this error, reconnect and resend!
    if e.message =~ /Cross thread violation for/
      reconnect!
      return send(msg)
    end

    raise
  end

  def connect!
    return if connected?

    connect
    @connected = true

    unless @at_exited
      at_exit { disconnect! }
      @at_exited = true
    end
  end

  def disconnect!
    return unless connected?

    begin
      @socket.close
    rescue ZMQ::Error => e
    end

    @connected = false
  end

  def reconnect!
    disconnect!
    connect!
  end

  private
  def connect
    @context ||= ZMQ::Context.new(1)
    @socket  = @context.socket(ZMQ::REQ)

    #@socket.setsockopt(ZMQ::LINGER, 0)
    @socket.connect(@endpoint)
  end
end

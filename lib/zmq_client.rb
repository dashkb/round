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
      sleep(0.1)
      reconnect!
      return send(msg)
    end

    raise e
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
    puts "NEED TO RECONNECT!"
    disconnect!
    connect!
  end

  private
  def connect
    attempts = 5

    begin
      @context ||= ZMQ::Context.new(1)
      puts "USE SOCKET #{ZMQ::REQ}"
      @socket = @context.socket(ZMQ::REQ)

      @socket.connect(@endpoint)
    rescue ZMQ::Error => e
      if attempts > 0
        puts "CONNECT ATTEMPT #{6 - attempt} FAILED"
        attempts -= 1

        sleep(0.1)
        retry
      else
        puts "FAILED AFTER 5 ATTEMPTS"
        raise e
      end
    end
  end
end

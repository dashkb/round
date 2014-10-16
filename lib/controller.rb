require 'lib/thread_runner'

class Controller
  include ThreadRunner

  def endpoint
    Round.controller_endpoint
  end
  def events
    @events ||= Hash.new
  end
  def context
    @context ||= ZMQ::Context.new
  end
  def socket
    @socket ||= context.socket(ZMQ::REP)
  end

  def stop
    super
    socket.close
    context.close
  end

  def run
    socket.bind(self.endpoint)
    info("Controller listening on #{self.endpoint}")
    super
  end

  def process
    if msg = socket.recv
      begin
        debug("Received #{msg}")
        socket.send(response(msg))
      rescue StandardError => e
        error(e.message)
      end
    end
  end

  def response(msg)
    cmd, *args = msg.split(' ')

    if events[msg]
      resp = events[msg].call(*args)
      unless resp.is_a?(Hash)
        resp = {status: resp}
      end
    else
      resp = {status: 'no handler'}
    end

    JSON.dump(resp)
  end

  def on(event, callback)
    events[event.to_s] = callback
  end
end

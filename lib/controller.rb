require 'readline'
require Rails.root.join 'lib', 'player'

class Controller
  include Singleton

  def self.start; instance.start end

  def trap_signals
    %w{INT KILL TERM}.each do |sig|
      Signal.trap(sig) do
        [@socket, @zmq].each &:close
      end
    end
  end

  def initialize
    @zmq    = ZMQ::Context.new
    @socket = @zmq.socket ZMQ::REQ
  end

  def start
    @socket.connect Player.endpoint
    trap_signals

    while line = Readline.readline('command> ')
      cmd = line.chomp
      @socket.send cmd

      puts @socket.recv
    end
  end
end

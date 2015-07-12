require 'thread'
require 'lib/thread_runner'

# This class is very similar to Logger, but works under a Trap and allows us to ensure all messages get pushed out.
class Interface
  include ThreadRunner

  DEBUG   = 0
  INFO    = 1
  WARN    = 2
  ERROR   = 3
  FATAL   = 4
  UNKNOWN = 5

  def initialize(device=STDOUT)
    @device  = device
    @level   = INFO
    @queue   = Queue.new

    # Don't batch that output!
    device.sync = true
  end

  def stop
    super
    info("Flushing Interface")

    # Ensure all messages get dumped!
    process until @queue.empty?
  end

  def level=(level); @level = level; end
  def visible?(level); @level <= level; end

  def debug(message, program=nil);   add(DEBUG, message, program); end
  def info(message, program=nil);    add(INFO, message, program); end
  def warn(message, program=nil);    add(WARN, message, program); end
  def error(message, program=nil);   add(ERROR, message, program); end
  def fatal(message, program=nil);   add(FATAL, message, program); end
  def unknown(message, program=nil); add(UNKNOWN, message, program); end

  def add(level, message, program=nil)
    @queue.enq({
      level:   level,
      time:    Time.now,
      message: message,
      program: program
    })
  end

  def process
    if @queue.empty?
      sleep 0.01
      return
    end

    entry = @queue.deq(true)
    write(entry) if visible?(entry[:level])
  rescue ThreadError => err
    Kernel.warn("Interface thread error: #{err}")
    sleep 0.01
  rescue Exception => ignored
    Kernel.warn("Interface writing failed: #{ignored}")
  end

  def write(entry)
    entry = format(entry) if entry.is_a?(Hash)
    @device.puts(entry)
  end

  def format(entry)
    message = entry[:message]

    if entry[:program].present?
      message = "#{entry[:program]}: #{message}"
    end

    "[%s#%d] %5s -- %s" % [
      format_time(entry[:time]),
      $$,
      format_level(entry[:level]),
      message
    ]
  end
  def format_time(time)
    time.strftime("%Y-%m-%dT%H:%M:%S.") << "%06d " % time.usec
  end
  def format_level(level)
    %w(DEBUG INFO WARN ERROR FATAL UNKNOWN)[level]
  end
end

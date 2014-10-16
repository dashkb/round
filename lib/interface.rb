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
    @interface = self # For ThreadRunner

    @device  = device
    @level   = INFO
    @queue   = Queue.new
  end

  def stop
    super
    info("Flushing Interface")

    # Ensure all messages get dumped!
    process until @queue.empty?
  end

  def level=(level); @level = level; end
  def visible?(level); @level <= level; end

  def debug(message);   add(DEBUG, message); end
  def info(message);    add(INFO, message); end
  def warn(message);    add(WARN, message); end
  def error(message);   add(ERROR, message); end
  def fatal(message);   add(FATAL, message); end
  def unknown(message); add(UNKNOWN, message); end

  def add(level, message)
    @queue.enq({
      level:   level,
      time:    Time.now,
      message: message
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
    "[%s#%d] %5s -- %s" % [
      format_time(entry[:time]),
      $$,
      format_level(entry[:level]),
      entry[:message]
    ]
  end
  def format_time(time)
    time.strftime("%Y-%m-%dT%H:%M:%S.") << "%06d " % time.usec
  end
  def format_level(level)
    %w(DEBUG INFO WARN ERROR FATAL UNKNOWN)[level]
  end
end

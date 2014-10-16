module ThreadRunner
  def initialize(interface)
    @interface = interface
  end

  def program; self.class.name; end

  def start
    @started = true
    info("Starting")
    @worker = Thread.new { run }
  end
  def stop
    @started = false
    info("Stopping")
    @worker.kill
  end

  def started?; @started == true; end
  def stopped?; not started?; end

  def run
    process while started?
  end

  def process
    sleep 0.1
  end

  def debug(message);   @interface.debug(message, program); end
  def info(message);    @interface.info(message, program); end
  def warn(message);    @interface.warn(message, program); end
  def error(message);   @interface.error(message, program); end
  def fatal(message);   @interface.fatal(message, program); end
  def unknown(message); @interface.unknown(message, program); end
end

module ThreadRunner
  def initialize(interface)
    @interface = interface
  end

  def start
    @started = true
    @interface.info("Starting #{self.class.name}")
    @worker = Thread.new { run }
  end

  def stop
    @started = false
    @interface.info("Stopping #{self.class.name}")
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
end

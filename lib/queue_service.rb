module QueueService
  def self.queue
    # this is our threadsafe queue, we're only going to keep the
    # next track on here
    @queue ||= Queue.new
  end


  # responsible for returning a track to play
  def self.next
    queue.deq
  end

  # queue a track
  def self.push(track)
    queue.push track
  end

  def self.map
    []
  end
end

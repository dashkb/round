module QueueService
  QUEUE = 'queue:main'

  # responsible for returning a track to play
  def self.next
    if next_id = REDIS.lpop(QUEUE)
      Track.find next_id
    end
  end

  # queue a track
  def self.push(track)
    REDIS.rpush QUEUE, track.id
  end

  def self.all
    REDIS.lrange(QUEUE, 0, -1)
  end
end

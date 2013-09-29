module QueueService
  QUEUE = 'queue:main'
  SETTINGS = 'app-settings'

  # responsible for returning a track to play
  def self.next
    if next_id = REDIS.lpop(QUEUE)
      REDIS.hset SETTINGS, 'queue mode', 'queue'
      Track.find next_id
    else
      REDIS.hset SETTINGS, 'queue mode', 'auto'
      auto_select
    end
  end

  # queue a track
  def self.push(track)
    REDIS.rpush QUEUE, track.id
    REDIS.hset SETTINGS, 'queue length', REDIS.llen(QUEUE)
  end

  def self.all
    REDIS.lrange(QUEUE, 0, -1)
  end

  def self.auto_select
    REDIS.hset SETTINGS, 'queue length', 0
    Track.offset(rand(Track.count)).first
  end
end

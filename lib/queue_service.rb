module QueueService
  QUEUE = 'queue:main'
  SETTINGS = 'app-settings'

  # responsible for returning a track to play
  def self.next
    if next_id = REDIS.lpop(QUEUE)
      REDIS.hmset(SETTINGS,
        'queue mode', 'queue',
        'queue length', REDIS.llen(QUEUE)
      )

      Track.find next_id
    else
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
    REDIS.hmset(SETTINGS,
      'queue mode', 'auto',
      'queue length', 0
    )

    Track.offset(rand(Track.count)).first
  end
end

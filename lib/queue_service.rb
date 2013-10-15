module QueueService
  QUEUE = 'queue:main'
  SETTINGS = 'app-settings'
  WHITELIST = 'whitelist'

  # responsible for returning a track to play
  def self.next
    if next_id = REDIS.lpop(QUEUE)
      REDIS.hmset(SETTINGS,
        'queue mode', 'queue',
        'queue length', REDIS.llen(QUEUE)
      )

      begin
        Track.find next_id
      rescue
        self.next
      end
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

  def self.read_whitelist
    JSON.parse(REDIS.get(WHITELIST) || '{}')
  end

  def self.write_whitelist(hash)
    REDIS.set WHITELIST, hash.to_json
  end

  def self.auto_select
    REDIS.hmset(SETTINGS,
      'queue mode', 'auto',
      'queue length', 0
    )

    sql = read_whitelist.reduce("") do |sql, pair|
      ids = pair.last.map { |item| item['id'] }.join ','
      unless ids.empty?
        sql += ' or ' if sql != ''
        sql += "#{pair.first}_id IN (#{ids})"
      end
    end

    tracks = Track.where(sql)
    tracks.offset(rand(tracks.count)).first
  end

  def self.swap(opts)
    REDIS.watch QUEUE

    queue = REDIS.lrange QUEUE, 0, -1
    index = queue.index opts[:track_id]
    queue.delete opts[:track_id]
    queue.insert (opts[:direction] == 'up' ? index - 1 : index + 1), opts[:track_id]

    REDIS.multi do
      REDIS.del QUEUE
      queue.compact.each do |track_id|
        REDIS.rpush QUEUE, track_id
      end
    end
  end

  def self.rocket(track_id)
    REDIS.watch QUEUE

    queue = REDIS.lrange QUEUE, 0, -1
    index = queue.index track_id
    new_queue = queue.drop index
    new_queue += (queue - new_queue)

    REDIS.multi do
      REDIS.del QUEUE
      new_queue.compact.each do |track_id|
        REDIS.rpush QUEUE, track_id
      end
    end
  end

  def self.unqueue(track_id)
    REDIS.lrem QUEUE, 0, track_id
  end

  def self.play_now(track_id)
    unqueue track_id
    REDIS.lpush QUEUE, track_id
    PlayerService.skip
  end
end

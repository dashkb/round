require 'lib/access_list_service'

module QueueService
  QUEUE_NAME  = 'queue:main'

  extend self

  # Prevent anyone from including this module, it should be used directly (via class methods)
  def self.extended(base)
    raise RuntimeError, 'do not include QueueService, use directly'
  end

  def next
    next_from_queue || pick_random
  end
  def all
    Round.redis.lrange(QUEUE_NAME, 0, -1)
  end
  def add(track)
    Round.redis.rpush(QUEUE_NAME, track.id)
  end
  def remove(track)
    Round.redis.lrem(QUEUE_NAME, 0, track.id)
  end
  def clear
    Round.redis.del(QUEUE_NAME)
  end

  def next_from_queue
    while next_id = Round.redis.lpop(QUEUE_NAME)
      track = Track[next_id]
      return track if track.present?
    end
  end

  def pick_random
    access_lists = AccessListService.to_hash

    query = Track
    unless access_lists[:allow_genres].empty?
      query = query.where(genre_id: access_lists[:allow_genres])
    end
    unless access_lists[:block_genres].empty?
      query = query.exclude(genre_id: access_lists[:block_genres])
    end

    unless access_lists[:allow_artists].empty?
      query = query.where(artist_id: access_lists[:allow_artists])
    end
    unless access_lists[:block_artists].empty?
      query = query.exclude(artist_id: access_lists[:block_artists])
    end

    offset = 1 + (rand * (query.count) - 1).round
    query.offset(offset).limit(1).first
  end
end

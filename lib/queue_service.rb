require 'lib/access_list_service'

module QueueService
  QUEUE_NAME  = 'queue:main'

  extend self

  # Prevent anyone from including this module, it should be used directly (via class methods)
  def self.extended(base)
    raise RuntimeError, 'do not include QueueService, use directly'
  end

  def next
    add_history(next_from_queue || pick_random)
  end
  def all
    Round.redis.lrange(QUEUE_NAME, 0, -1).map { |id| Selection[id] }
  end
  def add(selection)
    Round.redis.rpush(QUEUE_NAME, selection.id)
  end
  def remove(track)
    Round.redis.lrem(QUEUE_NAME, 0, selection.id)
  end
  def clear
    Round.redis.del(QUEUE_NAME)
  end

  def next_from_queue
    while next_id = Round.redis.lpop(QUEUE_NAME)
      @selection = Selection[next_id]
      return @selection.track if @selection.present?
      @selection = nil
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

  def add_history(track)
    data = {track_id: track.id, played_at: Time.now}
    if @selection.present?
      data[:selection_id] = @selection.id
      @selection = nil
    end
    History.create(data)
    return track
  end
end

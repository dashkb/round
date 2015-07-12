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
  def addTop(selection)
    Round.redis.lpush(QUEUE_NAME, selection.id)
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
    end
  end

  def pick_random(try_again: true)
    access_lists = AccessListService.to_hash
    queries = {genre: [], artist: []}
    values  = []

    unless access_lists[:allow_genres].empty?
      queries[:genre] << 'genre_id IN ?'
      values << access_lists[:allow_genres]
    end
    unless access_lists[:block_genres].empty?
      queries[:genre] << 'genre_id NOT IN ?'
      values << access_lists[:block_genres]
    end

    unless access_lists[:allow_artists].empty?
      queries[:artist] << 'artist_id IN ?'
      values << access_lists[:allow_artists]
    end
    unless access_lists[:block_artists].empty?
      queries[:artist] << 'artist_id NOT IN ?'
      values << access_lists[:block_artists]
    end

    query = [];
    unless queries[:genre].empty?
      query << "(#{queries[:genre].join(' AND ')})"
    end
    unless queries[:artist].empty?
      query << "(#{queries[:artist].join(' AND ')})"
    end

    query = Track.where(query.join(' OR '), *values)
    offset = 1 + (rand * (query.count) - 1).round
    track = query.offset(offset).limit(1).first

    if track.nil? && try_again
      # Access List is probably fucked up some how. Clear out any invalid genres or artists then try again
      AccessListService.clear_invalid!
      return pick_random(try_again: false)
    else
      return track
    end
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

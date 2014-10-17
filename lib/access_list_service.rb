module AccessListService
  QUEUE_NAME = 'access_lists'

  extend self

  # Prevent anyone from including this module, it should be used directly (via class methods)
  def self.extended(base)
    raise RuntimeError, 'do not include QueueService, use directly'
  end

  def read
    JSON.parse(Round.redis.get(QUEUE_NAME) || '{}')
  end
  def write(list)
    Round.redis.set(QUEUE_NAME, JSON.dump(list))
  end

  def whitelist(type, item_id)
    add(type, item_id, true)
  end
  def blacklist(type, item_id)
    add(type, item_id, false)
  end

  # - type is either genre or artist
  # - item_id is the id of the type given
  # - allow is true or false
  def add(type, item_id, allow)
    list = read
    list[type.to_s] ||= {}
    list[type.to_s][item_id] = allow

    write(list)
  end

  # - type is either genre or artist
  # - item_id is the id of the type given
  def remove(type, item_id)
    list = read
    list[type.to_s] ||= {}
    list[type.to_s].delete(item_id)

    write(list)
  end

  def clear
    write({})
  end

  def to_hash
    result = {
      allow_genres: [],
      block_genres: [],
      allow_artists: [],
      block_artists: []
    }

    list = AccessListService.read
    (list['genre'] || {}).each do |genre_id, allow|
      if allow
        result[:allow_genres] << genre_id
      else
        result[:block_genres] << genre_id
      end
    end
    (list['artist'] || {}).each do |artist_id, allow|
      if allow
        result[:allow_artists] << artist_id
      else
        result[:block_artists] << artist_id
      end
    end

    return result
  end
  def build_hash(type)
  end
end

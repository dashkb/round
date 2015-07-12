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
    list[type.to_s].delete(item_id.to_s)

    write(list)
  end

  def clear
    write({})
  end

  def clear_invalid!
    lists = self.read

    if lists['genre']
      lists['genre'].reject! { |id, allow| Genre[id].nil? }
    end
    if lists['artist']
      lists['artist'].reject! { |id, allow| Artist[id].nil? }
    end

    write(lists)
  end

  def scope
    access_lists=self.to_hash
    query = Track

    unless access_lists[:allow_genres].blank?
      query = query.where(genre_id: access_lists[:allow_genres])
    end
    unless access_lists[:block_genres].blank?
      query = query.exclude(genre_id: access_lists[:block_genres])
    end
    unless access_lists[:allow_artists].blank?
      query = query.where(artist_id: access_lists[:allow_artists])
    end
    unless access_lists[:block_artists].blank?
      query = query.exclude(artist_id: access_lists[:block_artists])
    end

    return query
  end

  def to_hash(with_records: false)
    result = {
      allow_genres: [],
      block_genres: [],
      allow_artists: [],
      block_artists: []
    }

    list = self.read
    (list['genre'] || {}).each do |genre_id, allow|
      record = Genre[genre_id]
      next if record.nil?

      if allow
        result[:allow_genres] << (with_records ? record : genre_id)
      else
        result[:block_genres] << (with_records ? record : genre_id)
      end
    end
    (list['artist'] || {}).each do |artist_id, allow|
      record = Artist[artist_id]
      next if record.nil?

      if allow
        result[:allow_artists] << (with_records ? record : artist_id)
      else
        result[:block_artists] << (with_records ? record : artist_id)
      end
    end

    return result
  end
  def build_hash(type)
  end
end

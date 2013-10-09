class Artist < ActiveRecord::Base
  has_many :tracks
  has_many :albums
  has_many :artist_genres
  has_many :genres, through: :artist_genres

  validates :name, presence: true

  after_save { ApplicationController.new.expire_fragment 'artists-and-genres-bootstrap'}

  def to_s
    display_name
  end

  def sort_name
    read_attribute(:sort_name) || name
  end

  def as_json(opts = {})
    super(opts).merge({
      genre_ids: genre_ids
    })
  end
end

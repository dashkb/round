module Importer
  class Track
    class NullRecord
      # Everything is nil on a null record!
      def method_missing(method, *args); nil; end

      def present?; false; end
      def blank?; true; end
      def empty?; true; end
    end
    def null_record(key)
      NullRecord.new unless @meta[key].present?
    end

    def self.call(meta, source)
      new(meta, source).call
    end

    def initialize(meta, source)
      @meta   = meta
      @source = source
    end

    def valid?
      missing_metadata.empty?
    end
    def invalid?; not valid?; end
    def missing_metadata
      @missing_metadata ||= ['Artist', 'Album', 'Name'].select { |key| @meta[key].blank? }
    end

    def call
      if invalid?
        return "Missing required metadata: #{missing_metadata.join(', ')}"
      end

      @meta['Genre']        ||= 'Unknown'
      @meta['Track Number'] ||= 0

      if @meta['Sort Artist'].present? && @meta['Album Artist'].blank? && artist.sort_name.blank?
        artist.sort_name = @meta['Sort Artist']
      end
      [artist, album, genre].compact.each(&:save)

      if Artist.where(name: 'Air').count > 1
        binding.pry
      end

      if artist.genres.none? { |g| g.id == genre.id }
        artist.add_genre(genre)
      end

      track.artist       = artist
      track.album        = album
      track.genre        = genre
      track.track_num    = @meta['Track Number']
      track.year         = @meta['Year']
      track.runtime      = @meta['Total Time']
      track.name         = @meta['Name']
      track.raw_name     = @meta['Name'].downcase
      track.sort_name    = @meta['Sort Name'] || @meta['Name']
      track.itunes_id    = @meta['Track ID']

      track.save
    end

    def track
      @track ||= (find_track or build_track)
    end
    def find_track
      Track.where(
        filename: @meta['Location'],
        source_id: @source.id
      ).first
    end
    def build_track
      Track.new(
        filename: @meta['Location'],
        source_id: @source.id
      )
    end

    def artist
      @artist ||= (null_record('Artist') or find_artist or build_artist)
    end
    def find_artist
      Artist.where(
        raw_name: @meta['Artist'].downcase
      ).first
    end
    def build_artist
      Artist.new(
        name:     @meta['Artist'],
        raw_name: @meta['Artist'].downcase
      )
    end

    def album_artist
      if @meta['Album Artist'].present?
        @album_artist ||= (find_album_artist or build_album_artist)
      end
    end
    def find_album_artist
      Artist.where(
        raw_name: @meta['Album Artist'].downcase
      ).first
    end
    def build_album_artist
      Artist.new(
        name:     @meta['Album Artist'],
        raw_name: @meta['Album Artist'].downcase
      )
    end

    def album
      @album ||= (null_record('Album') or find_album or build_album)
    end
    def find_album
      Album.where(
        raw_name: @meta['Album'].downcase
      ).first
    end
    def build_album
      Album.new(
        name:        @meta['Album'],
        raw_name:    @meta['Album'].downcase,
        sort_name:   @meta['Sort Album']
      )
    end

    def genre
      @genre ||= (null_record('Genre') or find_genre or build_genre)
    end
    def find_genre
      Genre.where(
        raw_name: @meta['Genre'].downcase
      ).first
    end
    def build_genre
      Genre.create(
        name:      @meta['Genre'],
        raw_name:  @meta['Genre'].downcase,
        sort_name: @meta['Sort Genre'] || @meta['Genre']
      )
    end
  end
end

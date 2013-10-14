require 'taglib'

class Album < ActiveRecord::Base
  belongs_to :artist
  has_many :tracks

  has_attached_file :art, :styles => { :full => ["100%", :png], :medium => ["300x300>", :png], :thumb => ["100x100>", :png], :tiny => ["50x50>", :png] }, :default_url => "http://placekitten.com/:style_size"

  Paperclip.interpolates :style_size do |attachment, style|
    return "50/50" if style == :tiny
    return "100/100" if style == :thumb
    return "300/300" if style == :medium
    "500/500"
  end

  validates :name, :artist, presence: true

  def as_json(opts = {})
    result = super opts.reverse_merge({
      include: [:artist]
    })

    result.merge({
      'art_full' => art.url(:full),
      'art_medium' => art.url(:medium),
      'art_thumb' => art.url(:thumb),
      'art_tiny' => art.url(:tiny)
    })
  end

  def self.missing_art_album
    Album.where(:art_checked => false).first
  end

  def try_get_art
    if self.art.exists?
      self.art_checked = true
      save
      return
    end

    tracks.each do |track|
      ext = Pathname.new(track.file).extname

      if (ext == '.m4a')
        TagLib::MP4::File.open(track.local_path) do |mp4_file|
          mp4art = nil
          if (!mp4_file.nil? && !mp4_file.tag.nil? && !mp4_file.tag.item_list_map['covr'].nil?)
            mp4art = mp4_file.tag.item_list_map['covr'].to_cover_art_list.first
          end
          unless mp4art.nil?
            f = StringIO.new(mp4art.data)
            f.class.class_eval { attr_accessor :original_filename }
            ext = (mp4art.format == TagLib::MP4::CoverArt::PNG) ? '.png' : '.jpg'
            f.original_filename = 'album' + ext
            self.art = f
            self.art_checked = true
            if valid?
              save
              return true
            else
              raise errors
            end
          end
        end
      elsif (ext == '.mp3')
        TagLib::MPEG::File.open(track.local_path) do |mp3_file|
          tag = mp3_file.id3v2_tag
          unless tag.nil?
            cover = tag.frame_list('APIC').first
            unless cover.nil?

              f = StringIO.new(cover.picture)
              f.class.class_eval { attr_accessor :original_filename }
              ext = 'nil'
              puts 'Got mime type: ' + cover.mime_type
              begin
                mime_type = cover.mime_type
                mime_type = 'image/jpeg' if mime_type.downcase == 'image/jpg'
                ext = MIME::Types[mime_type].first.extensions.first
              rescue
              end
              f.original_filename = 'album' + ext
              begin
                self.art = f
              rescue
                self.art = nil
                self.save
              end
              self.art_checked = true
              if valid?
                save
                return true
              else
                self.reload
                self.art_checked = true
                self.save
              end
            end
          end
        end
      end
    end

    self.art_checked = true
    save
    false
  end
end

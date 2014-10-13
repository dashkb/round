require 'taglib'
require 'lib/track_importer'

class FileImporter
  def initialize(source)
    @source = source
    @root = Pathname.new(source.root)
  end

  def supported?(path)
    %w{.mp4 .mp3}.include?(File.extname(path))
  end

  def import(path)
    relative = Pathname.new(path).relative_path_from(@root)
    fileref  = TagLib::FileRef.new(path.to_s)

    return "Unable to open FileRef for #{relative.to_s}!" if fileref.nil?

    tags  = fileref.tag
    props = fileref.audio_properties

    return "Unable to read tags for #{relative.to_s}" if tags.nil?
    return "Unable to read properties for #{relative.to_s}" if props.nil?

    meta = {
      'Name'         => tags.title,
      'Artist'       => tags.artist,
      'Album Artist' => tags.artist,
      'Album'        => tags.album,
      'Genre'        => tags.genre,
      'Total Time'   => props.length,
      'Track Number' => tags.track,
      'Location'     => relative.to_s,
      'Year'         => tags.year
    }

    if TrackImporter.call(meta, @source)
      true
    else
      "Unable to save track for #{relative.to_s}"
    end
  ensure
    fileref.close unless fileref.nil?
  end
end

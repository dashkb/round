class AudioFile
  attr_reader :path, :position

  def initialize(path)
    @path = path.gsub('%20', ' ')
    @okay = false
    @position = 0

    open
  end

  def okay?; @okay == true; end

  def open
    @file = CoreAudio::AudioFile.new(@path)
    @okay = true
  rescue StandardError => e
    warn("Failed to open audio file #{@path}: #{e.message}")
    @okay = false
  end

  def close
    @file.close if okay?
  end

  def read(frames)
    return nil unless okay?

    @position += frames / @file.rate
    @file.read(frames)
  end
end

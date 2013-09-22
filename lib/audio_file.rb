class AudioFile
  attr_reader :position

  def initialize(path)
    begin
      path.gsub! '%20', ' '
      puts "Opening #{path.to_s}"
      @cafile = CoreAudio::AudioFile.new path.to_s
      @ok = true
    rescue StandardError => e
      puts "Error opening audio file: "
      puts e.to_s
      @ok = false
    end
  end

  def ok?
    @ok || false
  end

  def position_str
    m, s = position.divmod 60
    "%d:%02d" % [m, s]
  end

  def read(frames)
    @position ||= 0
    @position += frames / @cafile.rate
    @cafile.read frames
  end
end


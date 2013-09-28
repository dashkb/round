class AudioFile
  attr_reader :position, :fake

  def initialize(path)
    begin
      path.gsub! '%20', ' '
      puts "Opening #{path.to_s}"
      @cafile = CoreAudio::AudioFile.new path.to_s
      @ok = true
    rescue StandardError => e
      puts "Error opening audio file: "
      puts e.to_s

      if ENV['FAKE_PLAYER'] && Rails.env.development?
        @ok = true
        @fake = true
        puts "But that's fine coz it's fake mode, we are 15 seconds long"
      else
        @ok = false
      end
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

    unless @fake
      @position += frames / @cafile.rate
      @cafile.read frames
    else
      (@position += frames / 44100) > 15 ? nil : true
    end
  end
end


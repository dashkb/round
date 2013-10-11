class AudioFile
  @@fake = !!ENV['FAKE_PLAYER']
  @@fake_length = 160
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

      if @@fake && Rails.env.development?
        @ok = true
        puts "But that's fine coz it's fake mode, we are #{@@fake_length} seconds long"
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

  def fake?
    !!@@fake
  end

  def read(frames)
    @position ||= 0

    unless @@fake
      @position += frames / @cafile.rate
      @cafile.read frames
    else
      (@position += frames / 44100) > @@fake_length ? nil : true
    end
  end
end


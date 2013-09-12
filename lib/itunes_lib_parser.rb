require 'ox'

class ItunesLibParser
  def initialize
    @scope = []
  end

  def on_track(&block)
    @track_callback = block
  end

  def start_element(name)
    @scope.push @el if @el
    @el = {'%name' => name}

    if name == :dict && @last_key == 'Tracks'
      @in_tracks = true
    end

    if @in_tracks && name == :dict
      @track = {}
    end

    if @track && name == :true
      @track[@last_key] = true
    end

    if @track && name == :false
      @track[@last_key] = false
    end
  end

  def end_element(name)
    if name != @el['%name']
      raise "wtf got #{name} expected #{@el['%name']}"
    end

    # just finished a <key> element, save it
    if @el['%name'] == :key
      @last_key = @el['%text']
    end

    if @track && name == :dict
      # end of track dict
      @track_callback.call @track
      @track = nil
    elsif @in_tracks && name == :dict
      # end of track list dict
      @in_tracks = false
    end

    if @track && name != :key
      @track[@last_key] ||= @el['%text']
    end

    @el = @scope.pop
  end

  def attr(k, v)
    @el[k] = v if @el
  end

  def text(val)
    @el['%text'] = val if @el
  end
end


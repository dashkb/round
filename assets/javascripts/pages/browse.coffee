define [
  'underscore'
  'lib/model'
  'lib/view'
  'collections/queue'
  'views/queue'
  'stache!./browse'
], (
  _
  Model
  View
  Queue
  QueueView
  template
) ->
  class CollectionView extends View
    'tagName' : 'ul'

    initialize: ->
      @listenTo(@model, 'change:search', @renderAll)

    click: (e) ->
      @model.set('chosen', e.target.dataset.id) if @model?

    each: (callback) ->
      @collection.each (record) =>
        return if @searchPass(record) is false
        return if @filterPass(record) is false
        callback(record)

    searchPass: (record) ->
      query = @model.get('search')
      return unless query?.length >= 3

      return @searchRecord(record, query)

    searchRecord: (record, query) ->
      value = record.get('name')
      return value.toLowerCase().indexOf(query.toLowerCase()) >= 0

    filterPass: (record) ->
      filterBy = parseInt(@model.get('filter'))
      filterOn = @filterOn

      return true if _.isNaN(filterBy) or not filterOn?

      value = record.get(filterOn)
      if _.isArray(value)
        return value.indexOf(filterBy) >= 0
      else
        return (value is filterBy)

    render: ->
      @renderAll()
      return this

    renderAll: ->
      frag = document.createDocumentFragment()
      @each (record) => frag.appendChild(@renderRecord(record))
      @$el.html(frag)

    remove: ->
      @$('li').off('click')
      super

    renderRecord: (record) ->
      li = document.createElement('li')
      li.dataset.id = record.id
      li.innerHTML = record.get('name')
      li.addEventListener('click', @click.bind(this))
      return li

  class GenreList extends CollectionView
    click: (e) ->
      chosen = e.target.dataset.id
      if @model.get('chosen') is chosen
        @model.unset('chosen')
      else
        @model.set('chosen', chosen)

  class ArtistList extends CollectionView
    'filterOn' : 'genres'

  class TrackList extends CollectionView
    'filterOn' : 'artist'

    each: (callback) ->
      noFilter = _.isNaN(parseInt(@model.get('filter')))
      noSearch = not (@model.get('search')?.length >= 3)
      return if noFilter and noSearch
      super

    searchRecord: (record, query) ->
      return true if super
      value = app.albums.get(record.get('album'))?.get('name')
      return value && value.toLowerCase().indexOf(query.toLowerCase()) >= 0

    renderRecord: (record) ->
      li = super
      album = app.albums.get(record.get('album'))
      li.innerHTML = "#{record.get('track_num')}. #{record.get('name')} <small>on #{album.get('name')}</small>"
      return li

  class BrowsePage extends View
    'id'       : 'browse-page'
    'template' : template

    events:
      'keyup [name="search"]': 'search'

    initialize: ->
      @search = _.debounce(@search, 500)

      @genre  = new Model()
      @artist = new Model()
      @track  = new Model()
      @queue  = new Queue()

      @genres  = new GenreList(collection: app.genres, model: @genre)
      @artists = new ArtistList(collection: app.artists, model: @artist)
      @tracks  = new TrackList(collection: app.tracks, model: @track)
      @queues  = new QueueView(collection: @queue)

      @listenTo(@genre, 'change:chosen', @updateGenre)
      @listenTo(@artist, 'change:chosen', @updateArtist)
      @listenTo(@track, 'change:chosen', @queueTrack)

    render: ->
      super
      @$('.genres').html(@genres.render().el)
      @$('.artists').html(@artists.render().el)
      @$('.tracks').html(@tracks.render().el)
      @$('.queue').html(@queues.render().el)
      return this

    remove: ->
      super
      @genres.remove()
      @artists.remove()
      @tracks.remove()
      @queues.remove()

    updateGenre: ->
      @artist.set('filter', @genre.get('chosen'))
      @artists.renderAll()

    updateArtist: ->
      @track.set('filter', @artist.get('chosen'))
      @tracks.renderAll()

    queueTrack: ->
      if @queue.length < 10
        @queue.push(@track.get('chosen'))
      else
        alert('You may only queue 10 tracks at a time!')

    search: (e) ->
      @artist.set('search', e.target.value)
      @track.set('search', e.target.value)

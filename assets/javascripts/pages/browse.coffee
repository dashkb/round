define [
  'lib/model'
  'lib/view'
  'app'
  'stache!./browse'
], (
  Model
  View
  app
  template
) ->
  class CollectionView extends View
    'tagName' : 'ul'

    click: (e) ->
      @model.set('chosen', e.target.dataset.id) if @model?

    each: (callback) ->
      @collection.each (record) =>
        if @filterPass(record)
          callback(record)

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

    renderRecord: (record) ->
      li = super
      album = app.albums.get(record.get('album'))
      li.innerHTML = "#{record.get('name')} <small>on #{album.get('name')}</small>"
      return li

  class BrowsePage extends View
    'id'       : 'browse-page'
    'template' : template

    initialize: ->
      @genre  = new Model()
      @artist = new Model()
      @track  = new Model()

      @genres  = new GenreList(collection: app.genres, model: @genre)
      @artists = new ArtistList(collection: app.artists, model: @artist)
      @tracks  = new TrackList(collection: app.tracks, model: @track)

      @listenTo(@genre, 'change:chosen', @updateGenre)
      @listenTo(@artist, 'change:chosen', @updateArtist)
      @listenTo(@track, 'change:chosen', @queueTrack)

    render: ->
      super
      @$('.genres').html(@genres.render().el)
      @$('.artists').html(@artists.render().el)
      return this

    remove: ->
      super
      @genres.remove()
      @artists.remove()
      @tracks.remove()

    updateGenre: ->
      @artist.set('filter', @genre.get('chosen'))
      @artists.renderAll()

    updateArtist: ->
      @track.set('filter', @artist.get('chosen'))
      @tracks.remove()
      @$('.tracks').html(@tracks.render().el)

    queueTrack: ->
      console.log(@track.get('chosen'))
      $.post('/api/queue', {id: @track.get('chosen')})
        .done(-> alert('Track Queued!'))

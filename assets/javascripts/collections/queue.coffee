define [
  'backbone'
], (
  Backbone
) ->
  class Queue
    constructor: ->
      @items  = {}
      @order  = []
      @length = 0

      @has = Object::hasOwnProperty.bind(@items)

    map: (callback) -> @order.map (id) => callback(@items[id])
    each: (callback) -> @order.each (id) => callback(@items[id])

    clear: ->
      @items = {}
      @order = []
      @length = 0

      @trigger('clear', this)

    at: (idx) -> @items[@order[idx]]

    push: (id) ->
      return if @has(id)
      @items[id] = {id: id}
      @order.push(id)
      @length += 1

      @updatePositions()
      @trigger('add', @items[id], this)

    remove: (id) ->
      return unless @has(id)
      item = @items[id]
      delete @items[id]

      @order = @order.filter (n) -> id isnt n
      @length -= 1
      @updatePositions()

      @trigger('remove', item, this)

    up: (id) ->
      return unless @has(id)

      item  = @items[id]
      return if item.position is 0
      @swap(item.position)

    down: (id) ->
      return unless @has(id)
      item = @items[id]
      return if (item.position + 1) is @length
      @swap(item.position + 1)

    swap: (pos) ->
      id     = @order[pos]
      top    = @order.slice(0, pos)
      bottom = @order.slice(pos + 1)
      above  = top.pop()

      @order = top.concat(id, above, bottom)
      @updatePositions()

    updatePositions: ->
      @order.forEach (n, i) => @items[n].position = i
      @trigger('sort', this)

  _.extend(Queue.prototype, Backbone.Events)

  return Queue

class App.BreadcrumbView extends App.View
  template: JST['breadcrumb']
  initialize: -> @crumbs = []
  isEmpty: -> @crumbs.length == 0
  clear: -> @crumbs = []; @render()
  push: (text, link) -> @crumbs.push [text, link]; @render()
  pop: -> @crumbs.pop(); @render()

  render: ->
    @templateHelpers = {crumbs: @crumbs}
    @$el.empty()

    _.tap @, =>
      if @isEmpty()
        @$el.addClass 'hide'
      else
        @$el.removeClass 'hide'
        super()

  events:
    'click a': (event) ->
      event.preventDefault()
      $clicked = ($ event.currentTarget)
      text = $clicked.html()

      @pop() until (_.last @crumbs)[0] == text
      page $clicked.data 'link'

class Paginator
  def initialize(model, options={})
    @model    = model
    @page     = (options['page'] || 1).to_i
    @per_page = (options['per_page'] || 500).to_i
    @offset   = (@page - 1) * @per_page
    @query    = (options[:conditions] || {})
    @order    = options[:order] || [:name]
  end

  def pages
    @pages ||= (@model.where(@query).count / @per_page) + 1
  end

  def results
    @results ||= @model.where(@query).order(*@order).limit(@per_page).offset(@offset)
  end

  def as_json(options={})
    {
      page:    @page,
      pages:   self.pages,
      results: self.results.map { |o| o.as_json(deep: true) }
    }
  end
end

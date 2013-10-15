if Rails.env.production?
  `rm -rf #{Rails.root}/tmp/cache`

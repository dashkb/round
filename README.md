## Setting up the Thing

* [Homebrew](http://brew.sh/) - you probably have this already
    * Run `brew -v` to verify
    * If not, `ruby -e "$(curl -fsSL https://raw.github.com/mxcl/homebrew/go)"`
* Ruby 2.0 - `rvm install 2.0.0`
* [Postgres.app](http://postgresapp.com/)
    * Or install Postgres however you'd like, if you know how / already have
* [Redis](http://redis.io) - `brew install redis`
* Foreman, installed globally `gem install foreman`
* A slightly out of date 0mq
    * `brew tap homebrew/versions`
    * `brew install zeromq22`
* Taglib - `brew install taglib` -- not strictly 100% required
* This repository - `git clone git@github.com:dashkb/round`
    * The remaining steps assume you are in your clone
* Run bundler - `bundle`
* Set up your DB
    * `bundle exec rake db:create db:migrate`
* Start the iTunes library import
    * `bundle exec rake import:itunes SOURCE_NAME=kyle FILE=/path/to/itunes.xml`
    * File paths with spaces in them need to either be in quotes or have the spaces escaped
* Get coffee / tour europe / catch up on sleep
* Start the rails app, redis, and player daemon `foreman start`
    * Kill with `CTRL + C`


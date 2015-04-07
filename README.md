# CYMK (Choose Your Music Kiosk)

This branch is a complete rewrite of CYMK. There are several goals behind the rewrite, but the primary goal is to make the
interface as snappy as possible. We are moving away from a Rails application and using Sinatra, and the services are rewritten
to use threads cleanly. This rewrite also returns us to CoreAudio for complete control over audio (although VLC is still
supported).

## Setup

You'll want to install [RVM](https://rvm.io/) to manage ruby versions (the one included with OSX quickly falls out of
date) and [Homebrew](http://brew.sh/) to install some system level packages. Once you've installed both, run through
these steps in a terminal:

```
$ rvm install 2.2.1
$ brew install sqlite redis zmq node
$ gem install bundler foreman
$ npm install -g gulp
$ bundle install
$ npm install
$ gulp
```

When developing locally, you can use the "Fake" player by creating a `.env` file with the following contents:

```
DEVICE=fake
```

This will pretend to play tracks, but does not require the files to actually exist.

## Starting

Starting the entire platform is as simple as running `foreman start`. Javascript serving has been a little wonky through
Sinatra, so we are currently using Gulp to build assets. To watch for Coffeescript changes, simply run `gulp watch`.

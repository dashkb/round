# CYMK (Choose Your Music Kiosk)

This branch is a complete rewrite of CYMK. There are several goals behind the rewrite, but the primary goal is to make the
interface as snappy as possible. We are moving away from a Rails application and using Sinatra, and the services are rewritten
to use threads cleanly.

## Setup

You'll want to install [RVM](https://rvm.io/) to manage ruby versions (the one included with OSX quickly falls out of
date) and [Homebrew](http://brew.sh/) to install some system level packages. Once you've installed both, run through
these steps in a terminal:

*Note: node is only required if you are changing the Javascript assets. The `build/` directory contains all of the
assets already built for you!*

```
$ rvm install 2.2.1
$ brew install sqlite redis node taglib
$ gem install bundler foreman
$ bundle install
$ npm install
$ bundle exec rake db:migrate
```

Ubuntu version (do this instead of brew):
```
$ sudo apt-get install sqlite3 redis-server nodejs libtag1-dev
```


When developing locally, you can use the `Fake` player by creating a `.env` file with the following contents:

```
DEVICE=fake
```

This will pretend to play tracks, but does not require the files to actually exist.

## Importing Tracks

*Note: the iTunes Importer is not yet ready, but will be in time for primetime.*

Importing tracks is done by running the following command:

```
bundle exec rake import:filesystem SOURCE_NAME=name-of-source SOURCE_ROOT=/path/to/Music
```

Presently only mp4 and mp3 files are supported. When the iTunes Importer is ready the command will be:

```
bundle exec rake import:itunes SOURCE_NAME=name-of-source FILE=/path/to/iTunesLibrary.xml
```

## Starting

Starting the entire platform is as simple as running `foreman start`.

Stylesheets are built on the fly as requested, no manual build is required.

Javascripts are built using WebPack. Call `npm run build` to generate the bundle files (and maps for debugging).

# Player

The Player is separated into three distinct parts: the Controller, the Device and the Interface. All three parts are
started by the `player` rake task and live in a single ruby process.

## Controller

The Controller is a simple receiver for ZeroMQ that responds to commands and triggers a callback registered in the
Player. There are currently 4 commands:

 * `status` returns information about the state of the Device: what song is playing (if any), the current position of
   the song in seconds, and whether or not the device is "paused". This response is used to drive the Now Playing
   component on the front-end.
 * `play` tells the device to start playing if it is paused or stopped.
 * `pause` does the opposite of `play`.
 * `skip` forces the device to move on to the next song.

## Device

The Device class is the meat of the player. Currently there are 3 different devices support:

 * `Fake` is a noop device that pretends to play tracks. This exists to make local development easier to manage, as the
   track files do not need to actaully exist on a File System.
 * `CoreAudio` is for OSX specifically; it directly connects to the CoreAudio system of the OS and pushes raw bits
   through. It will automatically handle filling extra channels if they are present (eg. if you are plugged into HDMI).
 * `VLC` drives an instance of VLC, useful for non-OSX environments or if you encounter issues with `CoreAudio`.

## Interface

The Interface handles displaying info messages to the terminal.

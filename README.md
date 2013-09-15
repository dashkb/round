### Prereqs

* foreman, installed globally
  * `gem install foreman`
* a slightly out of date zmq
  * `brew tap homebrew/versions`
  * `brew install zeromq22`

### Proof of concept: gapless loop

* `bundle` (obvs)
* `foreman start` starts the rails app and the player daemon
* `bundle exec rake control` starts the controller prompt

## Controller commands

* `play [id]` currently necessary to start playback, takes a track id
  * will empty the queue and restart playback if called with during playback
* `queue [id]` adds to the queue, takes a track id

Currently all tracks will play this two-bar loop in the root directory.
Play the loop once, let it stop.
Then play the loop and queue it a bunch more times.
Gapless boom.

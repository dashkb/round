# CYMK (Choose Your Music Kiosk)

This branch is a complete rewrite of CYMK. There are several goals behind the rewrite, but the primary goal is to make the
interface as snappy as possible. We are moving away from a Rails application and using Sinatra, and the services are rewritten
to use threads cleanly. This rewrite also returns us to CoreAudio for complete control over audio.

## Todo

All of these should be moved to issues for better tracking and descriptions. This is simply an initial list.

* [ ] Frontend Javascript (James Logsdon)
  * [ ] Home screen
  * [ ] Browse
    * [ ] Genre / Artist List
    * [ ] Track List
    * [ ] Queue Builder
    * [ ] Search
  * [ ] History
  * [ ] Queue List
  * [ ] Admin Mode
    * [ ] Whitelist / Blacklist on Browse
    * [ ] Manage Queue (up, down, rocket)
    * [ ] Player Control (pause, skip)
    * [ ] Manage Whitelist / Blacklist
* [ ] Frontend Styles (Martin Parets)

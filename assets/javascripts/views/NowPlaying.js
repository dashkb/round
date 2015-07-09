import React from 'react';
import { Link } from 'react-router';
import NowPlayingComponent from '../components/NowPlaying';

export default class NowPlaying {
  render() {
    return (
      <div>
        <NowPlayingComponent id="now-playing" />

        <nav>
          <Link to="browse">Browse</Link>
          <Link to="queue">Queue</Link>
        </nav>
      </div>
    );
  }
}

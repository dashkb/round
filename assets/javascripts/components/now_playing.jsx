import React from 'react';
import Component from 'component';

export default class NowPlaying extends Component {
  render() {
    return (
      <div className="now-playing">
        <button onClick={this.clickTo('browse')}>Browse and Play</button>
        <button onClick={this.clickTo('queue')}>View Queue</button>
      </div>
    );
  }
}

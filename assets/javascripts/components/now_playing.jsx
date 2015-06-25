import React from 'react';
import Component from 'component';
import Mixins from 'mixins';
import * as StatusActions from 'actions/player_status';
import StatusStore from 'stores/status_store';

export default class NowPlaying extends Component {
  componentDidMount() {
    StatusActions.startStream();
  }
  componentWillUnmount() {
    StatusActions.stopStream();
  }
  onStatusChange() {
    return StatusStore.getStatus();
  }

  render() {
    return (
      <div className="now-playing">
        <button onClick={this.clickTo('browse')}>Browse and Play</button>
        <button onClick={this.clickTo('queue')}>View Queue</button>
      </div>
    );
  }
}

Mixins(NowPlaying, [
  StatusStore.listenWith('onStatusChange')
])

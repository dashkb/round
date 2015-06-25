import React from 'react';
import Component from 'component';
import Mixins from 'mixins';
import * as StatusActions from 'actions/player_status';
import StatusStore from 'stores/status_store';

export default class PlayerStatus extends Component {
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
    if (this.state.status === 'playing' || this.state.status === 'paused') {
      return this.renderPlaying();
    } else {
      return this.renderStopped();
    }
  }

  formatTime(time) {
    let minutes = Math.floor(time / 60),
        seconds = Math.round(time % 60).toString();

    if (seconds.length === 1) {
      seconds = `0${seconds}`;
    }

    return `${minutes}:${seconds}`;
  }
  progressSize() {
    return `${Math.round((this.state.position / this.state.playing.runtime) * 100)}%`;
  }

  renderPlaying() {
    return (
      <section id="status">
        <span className="state">{this.state.status}</span>
        <h3 className="track-title">{this.state.playing.name}</h3>
        <h4 className="artist-name">{this.state.playing.artist.name}</h4>

        <div className="runtime">
          <span className="position">{this.formatTime(this.state.position)}</span>
          /
          <span className="length">{this.formatTime(this.state.playing.runtime)}</span>
        </div>
        <div className="progress">
          <div className="progress-bar" style={{width: this.progressSize()}} />
        </div>
      </section>
    );
  }
  renderStopped() {
    return (
      <section id="status">
      </section>
    );
  }
}

Mixins(PlayerStatus, [
  StatusStore.listenWith('onStatusChange')
])

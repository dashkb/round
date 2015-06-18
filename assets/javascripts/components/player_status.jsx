import React from 'react';
import * as StatusActions from '../actions/player_status';
import StatusStore from '../stores/player_status';

let statusUpdateHandler = function() {
  let status = StatusStore.getStatus();
  let state = {
    playing:  status.state === 'playing',
    paused:   status.state === 'paused',
    stopped:  status.state === 'stopped',
    status:   status.state,
    position: status.position,
    track:    status.now_playing
  };

  this.setState(state);
};

class PlayerStatus extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    StatusActions.startStream();
    StatusStore.register(statusUpdateHandler, this);
  }
  componentWillMount() {
    statusUpdateHandler.call(this);
  }
  componentWillUnmount() {
    StatusActions.stopStream();
    StatusStore.unregister(statusUpdateHandler, this);
  }

  render() {
    if (this.state.playing || this.state.paused) {
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
    return `${Math.round((this.state.position / this.state.track.runtime) * 100)}%`;
  }

  renderPlaying() {
    return (
      <section id="status">
        <span className="state">{this.state.status}</span>
        <h3 className="track-title">{this.state.track.name}</h3>
        <h4 className="artist-name">{this.state.track.artist.name}</h4>

        <div className="runtime">
          <span className="position">{this.formatTime(this.state.position)}</span>
          /
          <span className="length">{this.formatTime(this.state.track.runtime)}</span>
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

export default PlayerStatus;

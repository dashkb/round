import React, { PropTypes } from 'react';
import { connect } from 'redux/react';
import { slice } from '../lib';
import ProgressBar from './ProgressBar';
import { statusActions } from '../actions';

@connect(state => slice(state.Status, 'playing', 'paused', 'stopped', 'position', 'track'))
export default class NowPlaying {
  static propTypes = {
    playing:  PropTypes.bool,
    paused:   PropTypes.bool,
    stopped:  PropTypes.bool,
    position: PropTypes.number,
    track:    PropTypes.object,
    id:       PropTypes.string.isRequired
  }

  render() {
    if (this.props.stopped) {
      return (
        <section id={this.props.id}>Nothing Playing! You should pick a song...</section>
      );
    }

    const { position, track } = this.props;

    return (
      <section id={this.props.id}>
        <h3 className="track-title">{track.name}</h3>
        <h4 className="artist-name">{track.artist.name}</h4>

        <div className="runtime">
          <span className="position">{this.formatTime(position)}</span>
          /
          <span className="length">{this.formatTime(track.runtime)}</span>
        </div>

        <ProgressBar current={position} maximum={track.runtime}/>
      </section>
    );
  }

  formatTime(time) {
    let minutes = Math.floor(time / 60),
        seconds = Math.round(time % 60).toString();

    if (seconds.length === 1) {
      seconds = `0${seconds}`;
    }

    return `${minutes}:${seconds}`;
  }
}

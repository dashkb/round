import React from 'react';
import Component from 'component';
import TrackStore from 'stores/tracks';

export default class TrackList extends Component {
  _getInitialState() {
    return {
      tracks: TrackStore.getAll()
    };
  }

  map(fn) {
    let mapping = Array();

    for (let track of this.state.tracks) {
      if (this.isVisible(track)) {
        mapping.push(fn(track));
      }
    }

    return mapping;
  }
  isVisible(track) {
    if (this.props.artistScope) {
      return track.artist.id === this.props.artistScope;
    }
    if (this.props.searchTerm) {
      return (
        this.searchField(track.name) ||
          this.searchField(track.artist.name) ||
          this.searchField(track.album.name)
      );
    }

    return false;
  }
  searchField(field) {
    return field.toLowerCase().indexOf(this.props.searchTerm.toLowerCase()) >= 0;
  }

  render() {
    return (
      <ul className="tracks">
      {this.map(track => {
        return (
          <li key={track.id} onClick={this.clickHandler(track)}>
            {track.track_num}.&nbsp;
            {track.name}&nbsp;
            <small>
              <strong>{track.album.name}</strong>&nbsp;
              by&nbsp;
              <strong>{track.artist.name}</strong>
            </small>
          </li>
        );
      })}
      </ul>
    );
  }

  clickHandler(track) {
    return this.props.onSelect.bind(null, track);
  }
}

TrackList.propTypes = {
  onSelect: React.PropTypes.func.isRequired,
  searchTerm: React.PropTypes.string,
  artistScope: React.PropTypes.number
};

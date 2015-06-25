import React from 'react';
import Component from 'component';
import ArtistStore from 'stores/artist_store';

export default class ArtistList extends Component {
  _getInitialState() {
    return {
      artists: ArtistStore.getAll()
    };
  }

  map(fn) {
    let mapping = Array();

    for (let artist of this.state.artists) {
      if (this.isVisible(artist)) {
        mapping.push(fn(artist));
      }
    }

    return mapping;
  }
  isVisible(artist) {
    if (this.props.searchTerm) {
      return this.searchField(artist.name);
    }
    if (this.props.genreScope) {
      return artist.genres.indexOf(this.props.genreScope) >= 0;
    }

    return true;
  }
  searchField(field) {
    return field.toLowerCase().indexOf(this.props.searchTerm.toLowerCase()) >= 0;
  }

  render() {
    return (
      <ul className="artists">
      {this.map(artist => {
        return <li key={artist.id} onClick={this.clickHandler(artist)}>{artist.name}</li>;
      })}
      </ul>
    );
  }

  clickHandler(artist) {
    return this.props.onSelect.bind(null, artist.id);
  }
}

ArtistList.propTypes = {
  onSelect: React.PropTypes.func.isRequired,
  searchTerm: React.PropTypes.string,
  genreScope: React.PropTypes.number
};

import React from 'react';
import Component from 'component';
import { ArtistList, GenreList, Queue, SearchBox, TrackList } from './browse';
import * as QueueActions from 'actions/queue';

export default class Browse extends Component {
  _getInitialState() {
    return {
      searchTerm: null,
      genreScope: null,
      artistScope: null
    };
  }

  render() {
    return (
      <div id="browse-page">
        <section className="search">
          <SearchBox onUpdate={this.doSearch} />
        </section>
        <section id="genres">
          <GenreList onSelect={this.selectGenre} />
        </section>
        <section id="artists">
          <ArtistList
            onSelect={this.selectArtist}
            searchTerm={this.state.searchTerm}
            genreScope={this.state.genreScope} />
        </section>
        <section id="tracks">
          <TrackList
            onSelect={this.selectTrack}
            searchTerm={this.state.searchTerm}
            artistScope={this.state.artistScope} />
        </section>
        <Queue />
      </div>
    );
  }

  doSearch(searchTerm) {
    this.setState({ searchTerm });
  }

  selectTrack(track) {
    QueueActions.add(track);
  }

  selectArtist(artistScope) {
    // Clear the scoping if we click the same item again
    if (this.state.artistScope === artistScope) {
      this.setState({artistScope: null});
    } else {
      this.setState({ artistScope });
    }
  }

  selectGenre(genreScope) {
    // Clear the scoping if we click the same item again
    if (this.state.genreScope === genreScope) {
      this.setState({genreScope: null});
    } else {
      this.setState({ genreScope });
    }
  }
}

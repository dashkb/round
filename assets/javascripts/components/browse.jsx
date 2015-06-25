import React from 'react';
import Component from 'component';
import ArtistList from './browse/artists';
import GenreList from './browse/genres';
import Queue from './browse/queue';
import SearchBox from './browse/search_box';
import TrackList from './browse/tracks';

class List extends Component {
  mapFiltered(func) {
    var ret = [];
    for (let item of this.state.list) {
      if (this.shouldShow(item)) {
        ret.push(func(item));
      }
    }
    return ret;
  }

  shouldShow(item) {
    return this.scopePass(item) && this.filterPass(item);
  }
  // Scoping should be redefined in concrete classes
  scopePass(item) {
    return true;
  }
  filterPass(item) {
    if (this.props.searchTerm && this.props.searchTerm.length > 2) {
      let check = (item.name.toLowerCase().indexOf(this.props.searchTerm.toLowerCase()) >= 0);
      return check;
    }

    return true;
  }
}

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
    console.log('Add to queue', track);
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

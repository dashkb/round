import React from 'react';
import { Link } from 'react-router';
import assign from 'lodash.assign';
import { connectToStores } from '../flux/store';
import { debounce } from '../utils';
import * as SearchActions from '../actions/search';
import { GenreStore, ArtistStore, TrackStore } from '../stores';

class List extends React.Component {
  render() {
    return (
      <ul className={this.props.className}>
      {this.mapFiltered(this.renderItem.bind(this))}
      </ul>
    );
  }

  renderItem(item) {
    return (
      <li key={item.id} onClick={this.onClick.bind(this, item.id)}>{item.name}</li>
    );
  }

  onClick(itemID) {
    this.props.onClick(itemID);
  }

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
List.propTypes = {
  className: React.PropTypes.string,
  searchTerm: React.PropTypes.string,
  scopeBy: React.PropTypes.node,
  onClick: React.PropTypes.func
};
class GenreList extends List {
  constructor(props) {
    super(assign({}, props, {className: 'genres'}))

    this.state = {
      list:   GenreStore.getAll(),
    };
  }
}
class ArtistList extends List {
  constructor(props) {
    super(assign({}, props, {className: 'artists'}))

    this.state = {
      list: ArtistStore.getAll()
    };
  }

  scopePass(item) {
    if (typeof(this.props.scopeBy) === 'number') {
      return (item.genres.indexOf(this.props.scopeBy) >= 0)
    }

    return true;
  }
}
class TrackList extends List {
  constructor(props) {
    super(assign({}, props, {className: 'tracks'}))

    this.state = {
      list: TrackStore.getAll()
    };
  }

  shouldShow(item) {
    if (typeof(this.props.scopeBy) !== 'number' && !(this.props.searchTerm && this.props.searchTerm.length > 2)) {
      return false;
    } else {
      return super.shouldShow(item);
    }
  }

  scopePass(item) {
    if (typeof(this.props.scopeBy) === 'number') {
      return (item.artist === this.props.scopeBy);
    }

    return true;
  }
}

class SearchBox extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      searchTerm: ''
    };
  }

  render() {
    return (
      <input
        type="search" ref="search"
        className="search-box"
        placeholder="Search by Artist, Album or Track"
        onKeyUp={this.updateSearch.bind(this)} />
    );
  }

  updateSearch() {
    if (this.updateTimer) {
      clearTimeout(this.updateTimer);
    }
    this.updateTimer = setTimeout(this.doUpdate.bind(this), 150);
  }

  doUpdate() {
    console.log('Do Update');
    let searchTerm = this.refs.search.getDOMNode().value;
    this.setState({ searchTerm });
    this.props.onUpdate(searchTerm);
    delete this.updateTimer;
  }
}
SearchBox.propTypes = {
  onUpdate: React.PropTypes.func
};

class Browse extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      searchTerm: null,
      genreScope: null,
      artistScope: null
    };
  }

  render() {
    return (
      <div id="browse-page">
        <section className="search">
          <SearchBox
            onUpdate={this.doSearch.bind(this)} />
        </section>
        <section className="genres">
          <GenreList
            onClick={this.clickGenre.bind(this)} />
        </section>
        <section className="artists">
          <ArtistList
            searchTerm={this.state.searchTerm}
            scopeBy={this.state.genreScope}
            onClick={this.clickArtist.bind(this)} />
        </section>
        <section className="tracks">
          <TrackList
            searchTerm={this.state.searchTerm}
            scopeBy={this.state.artistScope}
            onClick={this.clickTrack.bind(this)} />
        </section>
        <section className="queue">
        </section>
      </div>
    );
  }

  doSearch(searchTerm) {
    this.setState({ searchTerm });
  }

  clickTrack(trackScope) {
  }

  clickArtist(artistScope) {
    // Clear the scoping if we click the same item again
    if (this.state.artistScope === artistScope) {
      this.setState({artistScope: null});
    } else {
      this.setState({ artistScope });
    }
  }

  clickGenre(genreScope) {
    // Clear the scoping if we click the same item again
    if (this.state.genreScope === genreScope) {
      this.setState({genreScope: null});
    } else {
      this.setState({ genreScope });
    }
  }
}

export default Browse;

import React from 'react';
import { Link } from 'react-router';
import assign from 'lodash.assign';
import { debounce } from '../utils';
import { GenreStore, ArtistStore, TrackStore } from '../stores';

class List extends React.Component {
  render() {
    return (
      <ul className={this.props.className}>
      {this.state.list.map(this.renderItem.bind(this))}
      </ul>
    );
  }
  renderItem(item) {
    return (
      <li key={item.id} onClick={this.onClick}>{item.name}</li>
    );
  }
}
List.propTypes = {
  className: React.PropTypes.string,
};
class GenreList extends List {
  constructor(props) {
    super(assign({}, props, {className: 'genres'}))

    this.state = {
      list: GenreStore.getAll(),
    };
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
        value={this.state.searchTerm}
        onKeyUp={this.updateSearch.bind(this)} />
    );
  }

  updateSearch() {
    let now = Date.now();
    if (!this.updateTimer) {
      this.updateTimer = setTimeout(this.doUpdate.bind(this), 100);
    }
  }

  doUpdate() {
    let searchTerm = this.refs.search.getDOMNode().value;
    this.setState({ searchTerm });
    //SetSearchTerm(searchTerm);
    delete this.updateTimer;
  }
}

class Browse extends React.Component {
  render() {
    return (
      <div id="browse-page">
        <section className="search"><SearchBox/></section>
        //onChange={this.doSearch} placeholder="Search by Artist, Album or Track"/>
        <section className="genres"><GenreList/></section>
        <section className="artists"></section>
        <section className="tracks"></section>
        <section className="queue"></section>
      </div>
    );
  }

  renderGenre(genre) {
    return (
      <li onClick={this.selectGenre}>{genre.name}</li>
    );
  }

  doSearch(searchTerm) {
    console.log('search for', searchTerm);
  }
}

export default Browse;

import React, { PropTypes } from 'react';
import { connect } from 'redux/react';
import { debounce } from '../lib';
import { accessListActions, adminActions, browseActions, queueActions } from '../actions';

@connect(state => ({})) // So we get this.props.dispatch!
class SearchBox {
  componentWillMount() {
    this.sendUpdateLater = debounce(this.sendUpdate.bind(this), 150);
  }

  render() {
    return (
      <section className="search">
        <input
          type="search" ref="search"
          className="search-box"
          placeholder="Search by Artist, Album or Track"
          onChange={this.sendUpdateLater} />
      </section>
    );
  }

  sendUpdate() {
    const searchTerm = this.refs.search.getDOMNode().value;
    if (searchTerm.length >= 3) {
      this.props.dispatch(browseActions.setSearch(searchTerm));
    }
  }
}

class FilterList {
  static propTypes = {
    items:   PropTypes.array.isRequired,
    genre:   PropTypes.number,
    artist:  PropTypes.number,
    allowed: PropTypes.instanceOf(Set),
    blocked: PropTypes.instanceOf(Set),
    search:  PropTypes.string
  }

  isVisible(item) {
    return true;
  }

  clickHandler() {
    // no-op
  }

  checkAccess(list, item) {
    if (list) {
      for (let entry of list) {
        if (entry.id === item.id) {
          return true;
        }
      }
    }
    return false;
  }
  isBlocked(item) {
    return this.checkAccess(this.props.blocked, item);
  }
  isAllowed(item) {
    return this.checkAccess(this.props.allowed, item);
  }

  accessListButtons(type, item) {
    if (!this.props.isAdmin) {
      return;
    } else if (this.isAllowed(item)) {
      return <button onClick={this.removeHandler(type, item)}>Remove Whitelist</button>;
    } else if (this.isBlocked(item)) {
      return <button onClick={this.removeHandler(type, item)}>Remove Blacklist</button>;
    } else {
      return (
        <div className="btn-group">
          <button onClick={this.whitelistHandler(type, item)}>Whitelist</button>
          <button onClick={this.blacklistHandler(type, item)}>Blacklist</button>
        </div>
      );
    }
  }

  removeHandler(type, item) {
    return () => this.props.dispatch(accessListActions.remove(type, item))
  }
  whitelistHandler(type, item) {
    return () => this.props.dispatch(accessListActions.whitelist(type, item))
  }
  blacklistHandler(type, item) {
    return () => this.props.dispatch(accessListActions.blacklist(type, item))
  }

  render() {
    const items = this.props.items;

    return (
      <ul className={this.props.className}>
        {items.map(item => {
          if (this.isVisible(item)) {
            return this.renderItem(item);
          }
        })}
      </ul>
    );
  }
}

@connect(state => ({
  items:   state.Genres.genres,
  allowed: state.AccessList.allowed_genres,
  blocked: state.AccessList.blocked_genres,
  isAdmin: state.Admin.isAdmin
}))
class GenreList extends FilterList {
  renderItem(genre) {
    // If we're an admin we want to see the Blacklist/Whitelist buttons.
    return (
      <li key={genre.id}>
        <a onClick={this.clickHandler(genre)}>{genre.name}</a>
        {this.accessListButtons('genre', genre)}
      </li>
    );
  }

  clickHandler(genre) {
    return () => this.props.dispatch(browseActions.selectGenre(genre.id))
  }
}

@connect(state => ({
  items:   state.Artists.artists,
  genre:   state.Browse.genre,
  search:  state.Browse.search,
  allowed: state.AccessList.allowed_artists,
  blocked: state.AccessList.blocked_artists,
  isAdmin: state.Admin.isAdmin
}))
class ArtistList extends FilterList {
  isVisible(artist) {
    if (this.props.search) {
      return artist.name.toLowerCase().indexOf(this.props.search.toLowerCase()) >= 0;
    }
    if (this.props.genre) {
      return artist.genres.indexOf(this.props.genre) >= 0;
    }

    return true;
  }

  renderItem(artist) {
    return (
      <li key={artist.id}>
        <a onClick={this.clickHandler(artist)}>{artist.name}</a>
        {this.accessListButtons('artist', artist)}
      </li>
    );
  }

  clickHandler(artist) {
    return () => this.props.dispatch(browseActions.selectArtist(artist.id))
  }
}

@connect(state => ({
  items:   state.Tracks.tracks,
  artist:  state.Browse.artist,
  search:  state.Browse.search,
  isAdmin: state.Admin.isAdmin
}))
class TrackList extends FilterList {
  isVisible(track) {
    if (this.props.artist) {
      return track.artist.id === this.props.artist;
    }
    if (this.props.search) {
      return (
        this.searchField(track.name) ||
        this.searchField(track.artist.name) ||
        this.searchField(track.album.name)
      );
    }

    return false;
  }
  searchField(field) {
    return field.toLowerCase().indexOf(this.props.search.toLowerCase()) >= 0;
  }

  renderItem(track) {
    let playNowButton;
    if (this.props.isAdmin) {
      playNowButton = <button className="play-now" onClick={this.playNowHandler(track)}>Play Now!</button>;
    }

    return (
      <li key={track.id} onClick={this.clickHandler(track)}>
        <a onClick={this.clickHandler(track)}>
          {track.track_num}. {track.name}
          <small>
            {' on '}
            <strong>{track.album.name}</strong>
            {' by '}
            <strong>{track.artist.name}</strong>
          </small>
        </a>
        {playNowButton}
      </li>
    );
  }

  clickHandler(track) {
    return () => this.props.dispatch(queueActions.add(track))
  }
  playNowHandler(track) {
    return () => this.props.dispatch(adminActions.playNow(track))
  }
}

@connect(state => ({
  queue: state.Queue.queue
}))
class QueueList {
  static propTypes = {
    queue: PropTypes.array.isRequired
  }
  static contextTypes = {
    router: PropTypes.object.isRequired
  }

  render() {
    const { queue } = this.props;

    return (
      <section className="queue">
        {queue.length} / 10 items ready to queue.
        <button onClick={this.sendQueue.bind(this)}>Queue Now</button>
        <button onClick={this.cancelQueue.bind(this)}>Cancel</button>

        <ol className="queue-list">
        {queue.map(track => {
          return (
            <li key={track.id}>
              {track.name} by {track.artist.name}
              <a className="remove" onClick={this.removeHandler(track)}>X</a>
              <a className="move-up" onClick={this.moveUpHandler(track)}>U</a>
              <a className="move-down" onClick={this.moveDownHandler(track)}>D</a>
            </li>
          );
        })}
        </ol>
      </section>
    );
  }

  cancelQueue() {
    this.props.dispatch(queueActions.clear());
    this.context.router.transitionTo('/');
  }

  sendQueue() {
    if (this.props.queue.length === 0) {
      alert('You have nothing to queue!');
      return;
    }

    let name = prompt('Enter a name for mocking purposes, or click cancel to go back to browsing');
    if (name === null) {
      return;
    }

    this.props.dispatch(queueActions.send(name));
    this.context.router.transitionTo('/');
  }

  removeHandler(track) {
    return () => this.props.dispatch(queueActions.remove(track));
  }
  moveUpHandler(track) {
    return () => this.props.dispatch(queueActions.up(track));
  }
  moveDownHandler(track) {
    return () => this.props.dispatch(queueActions.down(track));
  }
}

@connect(state => ({})) // Gives us this.props.dispatch
export default class Browse {
  componentWillMount() {
    this.updateData();

    // Refresh the access lists every couple of seconds so it doesn't get super stale
    this.timer = setInterval(() => this.updateData(), 2 * 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  render() {
    return (
      <div id="browse-page">
        <SearchBox />
        <GenreList className="genres" />
        <ArtistList className="artists" />
        <TrackList className="tracks" />
        <QueueList />
      </div>
    );
  }

  updateData() {
    this.props.dispatch(accessListActions.fetch());
  }
}

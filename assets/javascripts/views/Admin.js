import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'redux/react';
import { accessListActions } from '../actions';

@connect(state => ({
  ...state.AccessList,
  isAdmin: state.Admin.isAdmin
}))
export default class Admin {
  static propTypes = {
    allowed_genres:  PropTypes.instanceOf(Set),
    blocked_genres:  PropTypes.instanceOf(Set),
    allowed_artists: PropTypes.instanceOf(Set),
    blocked_artists: PropTypes.instanceOf(Set),
    isAdmin: PropTypes.bool.isRequired
  }
  static contextTypes = {
    router: PropTypes.object.isRequired
  }

  componentWillMount() {
    this.updateData();

    // Refresh the access lists every couple of seconds so it doesn't get super stale
    this.timer = setInterval(() => this.updateData(), 2 * 1000);
  }
  componentWillUnmount() {
    clearInterval(this.timer);
  }

  render() {
    if (!this.props.isAdmin) {
      setTimeout(() => this.context.router.transitionTo('/'), 1);
      return <div/>;
    }

    return (
      <div>
        <nav>
          <Link to="/">Now Playing</Link>
          <Link to="browse">Browse</Link>
          <Link to="queue">Queue</Link>
        </nav>

        <h3>Allowed Genres</h3>
        {this.showList('genre', 'allowed')}

        <h3>Blocked Genres</h3>
        {this.showList('genre', 'blocked')}

        <h3>Allowed Artists</h3>
        {this.showList('artist', 'allowed')}

        <h3>Blocked Artists</h3>
        {this.showList('artist', 'blocked')}
      </div>
    );
  }

  showList(store, type) {
    const list = this.props[`${type}_${store}s`];
    if (!list || list.length === 0) {
      return (
        <p><strong>Nothing here</strong></p>
      );
    }

    let items = [];
    for (let entry of list) {
      items.push(
        <li key={`${store}_${type}_${entry.id}`}>
          {entry.name}
          <button className="btn" onClick={this.clearEntry(store, entry)}>Remove</button>
        </li>
      );
    }

    return <ul>{items}</ul>;
  }

  clearEntry(store, item) {
    return () => this.props.dispatch(accessListActions.remove(store, item));
  }

  updateData() {
    this.props.dispatch(accessListActions.fetch());
  }
}

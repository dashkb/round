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
    saved_lists:     PropTypes.array,
    isAdmin: PropTypes.bool.isRequired
  }
  static contextTypes = {
    router: PropTypes.object.isRequired
  }

  componentWillMount() {
    this.updateData();
    this.boundSave = ::this.saveList;

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
      <div id="dashboard">
        <nav>
          <Link to="/">Now Playing</Link>
          <Link to="browse">Browse</Link>
          <Link to="queue">Queue</Link>
        </nav>

        <button className="save-list" onClick={this.boundSave}>Save this List!</button>

        <section className="rules">
          <h3>Allowed Genres</h3>
          {this.showList('genre', 'allowed')}

          <h3>Blocked Genres</h3>
          {this.showList('genre', 'blocked')}

          <h3>Allowed Artists</h3>
          {this.showList('artist', 'allowed')}

          <h3>Blocked Artists</h3>
          {this.showList('artist', 'blocked')}
        </section>
        <ul className="lists">
        {this.props.saved_lists.map(list => {
          return (
            <li key={list.id}>
              {list.name}{' '}
              <button onClick={this.loadHandler(list)}>Load!</button>
            </li>
          );
        })}
        </ul>
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

  saveList() {
    let name = prompt('Give me a name for the list.');
    if (name === null) {
      return;
    }

    this.props.dispatch(accessListActions.save(name));
  }
  loadHandler(list) {
    return () => this.props.dispatch(accessListActions.load(list.id));
  }

  updateData() {
    this.props.dispatch(accessListActions.fetch());
  }
}

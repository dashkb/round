import React, { PropTypes } from 'react';
import moment from 'moment';
import { Link } from 'react-router';
import { connect } from 'redux/react';
import { queueActions, historyActions } from '../actions';

@connect(state => ({
  upcoming: state.Queue.upcoming,
  history:  state.History.history
}))
export default class Queue {
  static propTypes = {
    upcoming: PropTypes.array.isRequired,
    history:  PropTypes.array.isRequired
  }

  componentWillMount() {
    this.updateData();

    // Refresh the upcoming queue and history list every couple of seconds so it doesn't get super stale
    this.timer = setInterval(() => this.updateData(), 5 * 1000);
  }
  componentWillUnmount() {
    clearInterval(this.timer);
  }

  render() {
    const { history } = this.props;

    return (
      <section id="queue">
        <nav>
          <Link to="/">Now Playing</Link>
          <Link to="browse">Browse</Link>
        </nav>

        <h1>Upcoming Tracks</h1>
        {this.props.upcoming.length === 0 ? this.renderNothingComing() : this.renderUpcoming()}

        <h3>Recently Played</h3>
        <ol>
          {history.map(history => {
            let { track, selection } = history;

            let chosenBy;
            if (selection) {
              chosenBy = <small>(requested by <strong>{selection.requested_by})</strong></small>;
            }

            return (
              <li key={history.id}>
                <strong>{track.name}</strong>
                <small>
                  {' off of '}
                  <strong>{track.album.name}</strong>
                  {' by '}
                  <strong>{track.artist.name}</strong>
                </small>
                {' '}
                <em>{moment(history.played_at).fromNow()}</em> {chosenBy}
              </li>
            );
          })}
        </ol>
      </section>
    );
  }

  renderUpcoming() {
    const { upcoming } = this.props;

    return (
      <ol>
        {upcoming.map(selection => {
          return <li key={selection.id}>{selection.track.name}</li>;
        })}
      </ol>
    );
  }
  renderNothingComing() {
    return (
      <p><strong>There is nothing queued!</strong></p>
    );
  }

  updateData() {
    this.props.dispatch(queueActions.fetch());
    this.props.dispatch(historyActions.fetch());
  }
}

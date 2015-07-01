import React from 'react';
import Component from 'component';
import ajax from 'lib/ajax';

export default class Queue extends Component {
  _getInitialState() {
    return {
      queue: Array()
    };
  }

  componentDidMount() {
    // This is not FLUX at all, but we only need the data on this page and only on load. So we cheat :P
    ajax('/api/queue', queue => {
      this.setState({ queue })
    });
  }

  render() {
    return (
      <div className="queue">
        <button onClick={this.clickTo('browse')}>Browse and Play</button>
        <button onClick={this.clickTo('app')}>Go Back Home</button>

        <ol className="queue-list">
        {this.state.queue.map(entry => {
          return (
            <li key={entry.id}>{entry.track.artist.name} - {entry.track.name} requested by {entry.requested_by}</li>
          );
        })}
        </ol>
      </div>
    );
  }
}

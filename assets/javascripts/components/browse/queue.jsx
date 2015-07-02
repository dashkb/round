import React from 'react';
import Component from 'component';
import Mixins from 'mixins';
import * as QueueActions from 'actions/queue';
import QueueStore from 'stores/queue';

export default class Queue extends Component {
  onQueueChange() {
    return {
      queue: QueueStore.getQueue()
    };
  }

  render() {
    return (
      <section className="queue">
        {this.state.queue.length} / 10 items ready to queue.
        <button onClick={this.sendQueue}>Queue Now</button>
        <button onClick={this.cancelQueue}>Cancel</button>

        <ol className="queue-list">
        {this.state.queue.map(track => {
          return (
            <li key={track.id}>
              {track.name} by {track.artist.name}
              <a href="#" className="remove" onClick={this.removeHandler(track)}>X</a>
              <a href="#" className="move-up" onClick={this.moveUpHandler(track)}>U</a>
              <a href="#" className="move-down" onClick={this.moveDownHandler(track)}>D</a>
            </li>
          );
        })}
        </ol>
      </section>
    );
  }

  removeHandler(track) {
    return () => QueueActions.remove(track);
  }
  moveUpHandler(track) {
    return () => QueueActions.moveUp(track);
  }
  moveDownHandler(track) {
    return () => QueueActions.moveDown(track);
  }

  sendQueue() {
    if (this.state.queue.length === 0) {
      alert('You have nothing to queue!');
      return;
    }

    let name = prompt('Enter a name for mocking purposes, or click cancel to go back to browsing');
    if (!name) {
      return;
    }

    QueueActions.send(name, () => this.transitionTo('app'));
  }
  cancelQueue() {
    QueueActions.clear();
    this.transitionTo('app');
  }
}

Mixins(Queue, [
  QueueStore.listenWith('onQueueChange')
])

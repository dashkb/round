import React from 'react';
import Component from 'component';

export default class Queue extends Component {
  sendToQueue() {
  }

  render() {
    return (
      <section className="queue">
        <button onClick={this.sendToQueue}>Queue Now</button>
        <button onClick={this.clickTo('app')}>Cancel</button>
      </section>
    );
  }
}

import React from 'react';
import Component from 'component';

export default class Queue extends Component {
  render() {
    return (
      <div className="queue">
        <button onClick={this.clickTo('browse')}>Browse and Play</button>
        <button onClick={this.clickTo('app')}>Go Back Home</button>
      </div>
    );
  }
}

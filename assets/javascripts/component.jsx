import React from 'react';
import assign from 'lodash.assign';

export default class Component extends React.Component {
  constructor(props, shouldAutoBind = true) {
    super(props);

    this.state = assign({}, this._getInitialState(), this.state);

    if (shouldAutoBind) {
      this.autoBind();
    }
  }

  bind(methods) {
    for (let method of methods) {
      this[method] = this[method].bind(this);
    }
  }

  autoBind() {
    let methods = Object.getOwnPropertyNames(this.constructor.prototype)
      .filter(prop => typeof(this[prop]) === 'function');

    this.bind(methods);
  }

  _getInitialState() {
    return {};
  }
}

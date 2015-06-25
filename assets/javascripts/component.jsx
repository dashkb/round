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

  transitionTo(name) {
    this.context.router.transitionTo(name);
  }
  clickTo(name) {
    return () => this.context.router.transitionTo(name);
  }

  _getInitialState() {
    return {};
  }
}
Component.contextTypes = {
  router: React.PropTypes.func.isRequired
};

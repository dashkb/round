import assign from 'lodash.assign';
import { Dispatcher, start } from './';
import { assert, IdentFactory } from '../utils';

function makeToFn(context, action, prereqs=[]) {
  return function(callback) {
    if (typeof callback === 'string')
      callback = context[callback];
    callback = callback.bind(context);

    let id = Dispatcher.register(action.id, callback, prereqs);
    context.dispatcherIdsByAction[action] = id;
    return id;
  };
}

let baseStore = {
  register: function(callback, context=null) {
    this[_callbacks].push({
      callback: callback,
      context:  context
    });
  },
  unregister: function(callback) {
    this[_callbacks] = this[_callbacks].filter((spec) => spec.callback === callback);
  },

  listen: function(property, fn) {
    return this.mountingResponse(function() {
      let state = {};
      state[property] = fn();
      this.setState(state);
    });
  },
  listenWith: function(stateFnName) {
    return this.mountingResponse(function() {
      this.setState(this[stateFnName]());
    });
  },

  mountingResponse: function(callback) {
    let store = this;
    return {
      componentWillMount:   function() { callback.call(this); },
      componentDidMount:    function() { store.register(callback, this); },
      componentWillUnmount: function() { store.unregister(callback, this); }
    };
  }
};
let baseImpl = {
  trigger: function() {
    for (let spec of this[_callbacks]) {
      let {callback, context} = spec;
      if (context) {
        callback.call(context);
      } else {
        callback();
      }
    }
  },
  dispatch: function(action) {
    assert(this.dispatcherIdsByAction[action] === undefined,
          `Store ${this.displayName} attempted to register twice for action ${action.displayName}.`)

    let context = this;

    function after(...args) {
      return {to: makeToFn(context, action, args)};
    }

    return {after: after, to: makeToFn(context, action)};
  }
};

let _callbacks = Symbol('callbacks');
export default function createStore(displayName, options) {
  let store = assign({displayName: displayName}, baseStore),
      impl  = assign({}, baseImpl);

  impl[_callbacks] = [];
  impl.dispatcherIdsByAction = {};
  store._private = impl;

  // Used by assignment below. If the incoming property is a function bind it to the implementation object
  function maybeBind(key, val) {
    if (val instanceof Function) {
      return val.bind(impl);
    } else {
      return val;
    }
  }

  for (let prop of Object.keys(options)) {
    switch (prop) {
      case 'initialize': break;
      case 'public':
        assign(store, options[prop], maybeBind);
        assign(impl,  options[prop], maybeBind);
        break;
      default:
        impl[prop] = maybeBind(prop, options[prop]);
    }
  }

  if (options.initialize) {
    impl.dispatch(start).to(options.initialize);
  }

  return store;
}

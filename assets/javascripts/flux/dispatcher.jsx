import assert from 'lib/assert';
import IdentFactory from 'lib/ident_factory';

let dispatcherIdents   = new IdentFactory('Dispatcher'),
    _callbacksByAction = Symbol('callbacksByAction'),
    _isStarted         = Symbol('isStarted'),
    _isFinished        = Symbol('isFinished'),
    _isDispatching     = Symbol('isDispatching'),
    _payload           = Symbol('payload');

class Dispatcher {
  constructor() {
    this[_callbacksByAction] = {};
    this[_isStarted]         = {};
    this[_isFinished]        = {};
    this[_isDispatching]     = false;
    this[_payload]           = null;
  }

  get isDispatching() {
    return this[_isDispatching];
  }

  register(action, callback, prereqs=[]) {
    if (this[_callbacksByAction][action] === undefined)
      this[_callbacksByAction][action] = {};

    let id = dispatcherIdents.next();
    this[_callbacksByAction][action][id] = {
      callback: callback,
      prereqs:  prereqs
    };
    return id;
  }
  unregister(action, id) {
    assert(this[_callbacksByAction][action] && this[_callbacksByAction][action][id],
          `Dispatcher.unregister(${action.displayName}, ${id}) does not map to a registered callback.`);

    delete this[_callbacksByAction][action][id];
  }

  waitFor(action, stores) {
    assert(this.isDispatching,
          'Dispatcher.waitFor must be called while dispatching.');

    for (let store of stores) {
      let id = store._private.dispatcherIdsByAction[action];
      if (this[_isStarted][id]) {
        assert(this[_isFinished][id],
              `Dispatcher.waitFor encountered circular dependency trying to wait for ${id} during action ${action.displayName}`);
        return;
      }

      assert(this[_callbacksByAction][action][id],
            `Dispatcher.waitFor ${id} is not a registered callback for ${action.displayName}.`);
      this.invokeCallback(action, id);
    }
  }

  dispatch(payload) {
    assert(!this.isDispatching,
          'Dispatcher.dispatch cannot be called during dispatch.');

    this.startDispatching(payload);
    try {
      let action = payload.__action;
      if (this[_callbacksByAction][action] === undefined)
        return;

      for (let id of Object.keys(this[_callbacksByAction][action])) {
        if (!this[_isStarted][id])
          this.invokeCallback(action, id);
      }
    } finally {
      this.stopDispatching();
    }
  }

  invokeCallback(action, id) {
    this[_isStarted][id] = true;

    let { callback, prereqs } = this[_callbacksByAction][action][id];
    this.waitFor(action, prereqs);
    callback(this[_payload]);

    this[_isFinished][id] = true;
  }

  startDispatching(payload) {
    this[_isStarted]     = {};
    this[_isFinished]    = {};
    this[_payload]       = payload;
    this[_isDispatching] = true;
  }
  stopDispatching() {
    this[_payload]       = null;
    this[_isDispatching] = false;
  }
}

let dispatcher = new Dispatcher();
export default dispatcher;

import { start, Dispatcher } from './';
import assert from 'lib/assert';

function makeDeferred(context, fn) {
  if (typeof fn === 'string')
    fn = context[fn];

  return function(...args) {
    setTimeout(function() {
      switch (args.length) {
        case 0: return fn.call(context);
        case 1: return fn.call(context, args[0]);
        case 2: return fn.call(context, args[0], args[1]);
        default: return fn.apply(context, args);
      }
    }, 1);
  };
}

export default function createDeferredTask(displayName, options) {
  // !P or Q is the same as P implies Q, i.e., assert fails if P is true and Q is false
  assert(!options.action || options.task,
        `Deferred Task ${displayName} declared an action, it must declare a task.`);
  assert(!options.task || options.action,
        `Deferred Task ${displayName} declared a task, it must declare an action.`);

  let task = { displayName };

  // Used by assignment below. If the incoming property is a function bind it to the task object
  function maybeBind(key, val) {
    if (val instanceof Function) {
      return val.bind(task);
    } else {
      return val;
    }
  }

  for (let prop of Object.keys(options)) {
    switch (prop) {
      case 'initialize': break;
      case 'task': break;
      case 'action': break;
      default:
        task[prop] = maybeBind(prop, options[prop]);
    }
  }

  task.dispatch = function(action) {
    assert(this.dispatcherIdsByAction[action] === undefined,
          `Deferred Task ${task.displayName} attempted to register twice for action ${action.displayName}.`)

    function to(callback) {
      let deferred = makeDeferred(task, callback),
          id = Dispatcher.register(action.id, deferred);

      task.dispatcherIdsByAction[action.id] = id;
      return id;
    }

    return { to };
  }
  task.dispatcherIdsByAction = {};

  if (options.initialize)
    task.dispatch(start).to(options.initialize);
  if (options.action && options.task)
    task.dispatch(options.action).to(options.task);

  return task;
}

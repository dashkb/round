export function assert(check, message) {
  if (check) return true;

  let data = Array.prototype.slice.call(arguments, 2);
  let dataIndex = 0;
  let placed = message.replace(/%s/g, () => (data[dataIndex++] || 'unknown'));
  let error = new Error(`Assertion failed: ${placed}`);

  // Start the stacktrace before the call to assert
  error.framesToPop = 1;

  throw error;
}

export function debounce(func, wait, immediate=false) {
  let timeout, args, context, timestamp, result;

  let later = function() {
    let last = Date.now() - timestamp;

    if (last < wait && last >= 0) {
      timeout = setTimeout(later, wait - last);
    } else {
      timeout = null;
      if (!immediate) {
        result = func.apply(context, args);
        if (!timeout) context = args = null;
      }
    }
  };

  return function() {
    context = this;
    args = arguments;
    timestamp = Date.now();

    let callNow = immediate && !timeout;
    if (!timeout) timeout = setTimeout(later, wait);
    if (callNow) {
      result = func.apply(context, args);
      context = args = null;
    }

    return result;
  };
}

export function throttle(func, wait, options={}) {
  let timeout  = null,
      previous = 0,
      context, args, result;

  let later = function() {
    previous = options.leading === false ? 0 : Date.now();
    timeout = null;
    result = func.apply(context, args);
    if (!timeout) context = args = null;
  };

  return function() {
    let now = Date.now();
    if (!previous && options.leading === false) previous = now;
    let remaining = wait - (now - previous);
    context = this;
    args = arguments;
    if (remaining <= 0 || remaining > wait) {
      if (timeout) {
        clearTimeout(timeout);
        timeout = null;
      }
      previous = now;
      result = func.apply(context, args);
      if (!timeout) context = args = null;
    } else if (!timeout && options.trailing !== false) {
      timeout = setTimeout(later, remaining);
    }

    return result;
  };
};

let _prefix    = Symbol('prefix'),
    _lastIdent = Symbol('lastIdent');
class IdentFactory {
  constructor(prefix) {
    this[_prefix]    = prefix;
    this[_lastIdent] = 1;
  }

  next() {
    return `${this[_prefix]}_${this[_lastIdent]++}`;
  }
}
export {IdentFactory}

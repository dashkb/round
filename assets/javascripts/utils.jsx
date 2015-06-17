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

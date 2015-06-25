let _prefix    = Symbol('prefix'),
    _lastIdent = Symbol('lastIdent');

export default class IdentFactory {
  constructor(prefix) {
    this[_prefix]    = prefix;
    this[_lastIdent] = 1;
  }

  next() {
    return `${this[_prefix]}_${this[_lastIdent]++}`;
  }
}

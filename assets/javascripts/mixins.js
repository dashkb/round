import assign from 'lodash.assign';
import assert from 'lib/assert';
import callSplat from 'lib/call_splat';

let getType       = obj => Object.prototype.toString.call(obj),
    isNull        = obj => getType(obj) === '[object Null]',
    isUndefined   = obj => getType(obj) === '[object Undefined]',
    isObject      = obj => getType(obj) === '[object Object]',
    isFunction    = obj => getType(obj) === '[object Function]',
    isDefined     = obj => !isUndefined(obj) && !isNull(obj),
    isDefinedOnce = (...objs) => objs.filter(isDefined).length === 1;

function apply(context, fn, args) {
  return isFunction(fn) && callSplat(fn, context, args);
}

function getDefaultRules() {
  return {
    // Lifecycle methods
    componentWillMount:        Mixins.MANY,
    componentDidMount:         Mixins.MANY,
    componentWillReceiveProps: Mixins.MANY,
    shouldComponentUpdate:     Mixins.ONCE,
    componentWillUpdate:       Mixins.MANY,
    componentDidUpdate:        Mixins.MANY,
    componentWillUnmount:      Mixins.MANY,

    // Compatibility hack
    getDefaultProps:           Mixins.MANY_MERGED,
    getInitialState:           Mixins.MANY_MERGED
  };
}

export default function Mixins(factory, mixins = [], options = {}) {
  let defaultRule = options.defaultRule || Mixins.ONCE,
      rules       = assign({}, getDefaultRules(), options.rules);

  for (let mixin of mixins.reverse()) {
    for (let propName of Object.keys(mixin)) {
      if (propName === 'getInitialState') {
        propName = '_getInitialState';
      }

      let rule      = rules[propName] || defaultRule,
          protoProp = factory.prototype[propName],
          mixinProp = mixin[propName];

      switch(propName) {
        case 'getDefaultProps':
          factory.defaultProps = assign(factory.defaultProps || {}, apply(this, mixinProp));
          break;
        case 'propTypes':
          factory.propTypes = assign(factory.propTypes || {}, apply(this, mixinProp));
          break;
        case 'statics':
          assign(factory, mixinProp);
          break;
        default:
          if (isFunction(mixinProp)) {
            factory.prototype[propName] = rule(protoProp, mixinProp, propName);
          }
          break;
      }
    }
  }
}

Mixins.ONCE = function(protoProp, mixinProp, propName) {
  assert(isDefinedOnce(protoProp, mixinProp),
        `You are attempting to call \`${propName}\` on your component more than once. This conflict may be due to a mixin.`);

  return function(...args) {
    return apply(this, protoProp || mixinProp, args);
  };
};
Mixins.MANY = function(protoProp, mixinProp, propName, shouldMerge = false) {
  return function(...args) {
    apply(this, mixinProp, args);
    return apply(this, protoProp, args);
  };
};
Mixins.MANY_MERGED = function(protoProp, mixinProp, propName) {
  return function(...args) {
    let mixinResult = apply(this, mixinProp, args) || {};
    let protoResult = apply(this, protoProp, args) || {};

    assert(isObject(prototypeResult) && isObject(mixinResult),
          `\`${propName}\` must return an object or null.`);

    return assign(assign({}, mixinResult), protoResult);
  };
};

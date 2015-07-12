webpackJsonp([0],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _createClass = __webpack_require__(1)['default'];
	
	var _classCallCheck = __webpack_require__(6)['default'];
	
	var _interopRequireDefault = __webpack_require__(7)['default'];
	
	var _interopRequireWildcard = __webpack_require__(8)['default'];
	
	var _react = __webpack_require__(9);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactRouter = __webpack_require__(165);
	
	var _reactRouter2 = _interopRequireDefault(_reactRouter);
	
	var _reactRouterLibBrowserHistory = __webpack_require__(193);
	
	var _reactRouterLibBrowserHistory2 = _interopRequireDefault(_reactRouterLibBrowserHistory);
	
	var _redux = __webpack_require__(195);
	
	var _reduxReact = __webpack_require__(205);
	
	var _componentsLoader = __webpack_require__(218);
	
	var _componentsLoader2 = _interopRequireDefault(_componentsLoader);
	
	var _viewsRoutes = __webpack_require__(293);
	
	var _viewsRoutes2 = _interopRequireDefault(_viewsRoutes);
	
	var _stores = __webpack_require__(395);
	
	var stores = _interopRequireWildcard(_stores);
	
	var _actions = __webpack_require__(274);
	
	var history = new _reactRouterLibBrowserHistory2['default']();
	var redux = (0, _redux.createRedux)(stores);
	
	var SplashScreen = (function () {
	  function SplashScreen() {
	    _classCallCheck(this, _SplashScreen);
	  }
	
	  _createClass(SplashScreen, [{
	    key: 'render',
	    value: function render() {
	      if (this.props.loaded) {
	        return _react2['default'].createElement(_reactRouter2['default'], { history: history, children: _viewsRoutes2['default'] });
	      } else {
	        return _react2['default'].createElement(_componentsLoader2['default'], null);
	      }
	    }
	  }], [{
	    key: 'propTypes',
	    value: {
	      loaded: _react2['default'].PropTypes.bool.isRequired
	    },
	    enumerable: true
	  }]);
	
	  var _SplashScreen = SplashScreen;
	  SplashScreen = (0, _reduxReact.connect)(function (state) {
	    return {
	      loaded: state.Genres.loaded && state.Artists.loaded && state.Albums.loaded && state.Tracks.loaded
	    };
	  })(SplashScreen) || SplashScreen;
	  SplashScreen = (0, _reduxReact.provide)(redux)(SplashScreen) || SplashScreen;
	  return SplashScreen;
	})();
	
	// The streaming is always used for the player status stuff, so we start it at boot time and never stop it!
	redux.dispatch(_actions.statusActions.startStream());
	_react2['default'].render(_react2['default'].createElement(SplashScreen, null), document.body);

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _Object$defineProperty = __webpack_require__(2)["default"];
	
	exports["default"] = (function () {
	  function defineProperties(target, props) {
	    for (var i = 0; i < props.length; i++) {
	      var descriptor = props[i];
	      descriptor.enumerable = descriptor.enumerable || false;
	      descriptor.configurable = true;
	      if ("value" in descriptor) descriptor.writable = true;
	
	      _Object$defineProperty(target, descriptor.key, descriptor);
	    }
	  }
	
	  return function (Constructor, protoProps, staticProps) {
	    if (protoProps) defineProperties(Constructor.prototype, protoProps);
	    if (staticProps) defineProperties(Constructor, staticProps);
	    return Constructor;
	  };
	})();
	
	exports.__esModule = true;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(3), __esModule: true };

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	var $ = __webpack_require__(4);
	module.exports = function defineProperty(it, key, desc){
	  return $.setDesc(it, key, desc);
	};

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var global = typeof self != 'undefined' ? self : Function('return this')()
	  , core   = {}
	  , defineProperty = Object.defineProperty
	  , hasOwnProperty = {}.hasOwnProperty
	  , ceil  = Math.ceil
	  , floor = Math.floor
	  , max   = Math.max
	  , min   = Math.min;
	// The engine works fine with descriptors? Thank's IE8 for his funny defineProperty.
	var DESC = !!function(){
	  try {
	    return defineProperty({}, 'a', {get: function(){ return 2; }}).a == 2;
	  } catch(e){ /* empty */ }
	}();
	var hide = createDefiner(1);
	// 7.1.4 ToInteger
	function toInteger(it){
	  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
	}
	function desc(bitmap, value){
	  return {
	    enumerable  : !(bitmap & 1),
	    configurable: !(bitmap & 2),
	    writable    : !(bitmap & 4),
	    value       : value
	  };
	}
	function simpleSet(object, key, value){
	  object[key] = value;
	  return object;
	}
	function createDefiner(bitmap){
	  return DESC ? function(object, key, value){
	    return $.setDesc(object, key, desc(bitmap, value));
	  } : simpleSet;
	}
	
	function isObject(it){
	  return it !== null && (typeof it == 'object' || typeof it == 'function');
	}
	function isFunction(it){
	  return typeof it == 'function';
	}
	function assertDefined(it){
	  if(it == undefined)throw TypeError("Can't call method on  " + it);
	  return it;
	}
	
	var $ = module.exports = __webpack_require__(5)({
	  g: global,
	  core: core,
	  html: global.document && document.documentElement,
	  // http://jsperf.com/core-js-isobject
	  isObject:   isObject,
	  isFunction: isFunction,
	  that: function(){
	    return this;
	  },
	  // 7.1.4 ToInteger
	  toInteger: toInteger,
	  // 7.1.15 ToLength
	  toLength: function(it){
	    return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
	  },
	  toIndex: function(index, length){
	    index = toInteger(index);
	    return index < 0 ? max(index + length, 0) : min(index, length);
	  },
	  has: function(it, key){
	    return hasOwnProperty.call(it, key);
	  },
	  create:     Object.create,
	  getProto:   Object.getPrototypeOf,
	  DESC:       DESC,
	  desc:       desc,
	  getDesc:    Object.getOwnPropertyDescriptor,
	  setDesc:    defineProperty,
	  setDescs:   Object.defineProperties,
	  getKeys:    Object.keys,
	  getNames:   Object.getOwnPropertyNames,
	  getSymbols: Object.getOwnPropertySymbols,
	  assertDefined: assertDefined,
	  // Dummy, fix for not array-like ES3 string in es5 module
	  ES5Object: Object,
	  toObject: function(it){
	    return $.ES5Object(assertDefined(it));
	  },
	  hide: hide,
	  def: createDefiner(0),
	  set: global.Symbol ? simpleSet : hide,
	  each: [].forEach
	});
	/* eslint-disable no-undef */
	if(typeof __e != 'undefined')__e = core;
	if(typeof __g != 'undefined')__g = global;

/***/ },
/* 5 */
/***/ function(module, exports) {

	module.exports = function($){
	  $.FW   = false;
	  $.path = $.core;
	  return $;
	};

/***/ },
/* 6 */
/***/ function(module, exports) {

	"use strict";
	
	exports["default"] = function (instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError("Cannot call a class as a function");
	  }
	};
	
	exports.__esModule = true;

/***/ },
/* 7 */
/***/ function(module, exports) {

	"use strict";
	
	exports["default"] = function (obj) {
	  return obj && obj.__esModule ? obj : {
	    "default": obj
	  };
	};
	
	exports.__esModule = true;

/***/ },
/* 8 */
/***/ function(module, exports) {

	"use strict";
	
	exports["default"] = function (obj) {
	  if (obj && obj.__esModule) {
	    return obj;
	  } else {
	    var newObj = {};
	
	    if (obj != null) {
	      for (var key in obj) {
	        if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
	      }
	    }
	
	    newObj["default"] = obj;
	    return newObj;
	  }
	};
	
	exports.__esModule = true;

/***/ },
/* 9 */,
/* 10 */,
/* 11 */,
/* 12 */,
/* 13 */,
/* 14 */,
/* 15 */,
/* 16 */,
/* 17 */,
/* 18 */,
/* 19 */,
/* 20 */,
/* 21 */,
/* 22 */,
/* 23 */,
/* 24 */,
/* 25 */,
/* 26 */,
/* 27 */,
/* 28 */,
/* 29 */,
/* 30 */,
/* 31 */,
/* 32 */,
/* 33 */,
/* 34 */,
/* 35 */,
/* 36 */,
/* 37 */,
/* 38 */,
/* 39 */,
/* 40 */,
/* 41 */,
/* 42 */,
/* 43 */,
/* 44 */,
/* 45 */,
/* 46 */,
/* 47 */,
/* 48 */,
/* 49 */,
/* 50 */,
/* 51 */,
/* 52 */,
/* 53 */,
/* 54 */,
/* 55 */,
/* 56 */,
/* 57 */,
/* 58 */,
/* 59 */,
/* 60 */,
/* 61 */,
/* 62 */,
/* 63 */,
/* 64 */,
/* 65 */,
/* 66 */,
/* 67 */,
/* 68 */,
/* 69 */,
/* 70 */,
/* 71 */,
/* 72 */,
/* 73 */,
/* 74 */,
/* 75 */,
/* 76 */,
/* 77 */,
/* 78 */,
/* 79 */,
/* 80 */,
/* 81 */,
/* 82 */,
/* 83 */,
/* 84 */,
/* 85 */,
/* 86 */,
/* 87 */,
/* 88 */,
/* 89 */,
/* 90 */,
/* 91 */,
/* 92 */,
/* 93 */,
/* 94 */,
/* 95 */,
/* 96 */,
/* 97 */,
/* 98 */,
/* 99 */,
/* 100 */,
/* 101 */,
/* 102 */,
/* 103 */,
/* 104 */,
/* 105 */,
/* 106 */,
/* 107 */,
/* 108 */,
/* 109 */,
/* 110 */,
/* 111 */,
/* 112 */,
/* 113 */,
/* 114 */,
/* 115 */,
/* 116 */,
/* 117 */,
/* 118 */,
/* 119 */,
/* 120 */,
/* 121 */,
/* 122 */,
/* 123 */,
/* 124 */,
/* 125 */,
/* 126 */,
/* 127 */,
/* 128 */,
/* 129 */,
/* 130 */,
/* 131 */,
/* 132 */,
/* 133 */,
/* 134 */,
/* 135 */,
/* 136 */,
/* 137 */,
/* 138 */,
/* 139 */,
/* 140 */,
/* 141 */,
/* 142 */,
/* 143 */,
/* 144 */,
/* 145 */,
/* 146 */,
/* 147 */,
/* 148 */,
/* 149 */,
/* 150 */,
/* 151 */,
/* 152 */,
/* 153 */,
/* 154 */,
/* 155 */,
/* 156 */,
/* 157 */,
/* 158 */,
/* 159 */,
/* 160 */,
/* 161 */,
/* 162 */,
/* 163 */,
/* 164 */,
/* 165 */,
/* 166 */,
/* 167 */,
/* 168 */,
/* 169 */,
/* 170 */,
/* 171 */,
/* 172 */,
/* 173 */,
/* 174 */,
/* 175 */,
/* 176 */,
/* 177 */,
/* 178 */,
/* 179 */,
/* 180 */,
/* 181 */,
/* 182 */,
/* 183 */,
/* 184 */,
/* 185 */,
/* 186 */,
/* 187 */,
/* 188 */,
/* 189 */,
/* 190 */,
/* 191 */,
/* 192 */,
/* 193 */,
/* 194 */,
/* 195 */,
/* 196 */,
/* 197 */,
/* 198 */,
/* 199 */,
/* 200 */,
/* 201 */,
/* 202 */,
/* 203 */,
/* 204 */,
/* 205 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }
	
	function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }
	
	var _libReact = __webpack_require__(206);
	
	_defaults(exports, _interopRequireWildcard(_libReact));

/***/ },
/* 206 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _react = __webpack_require__(9);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _componentsCreateAll = __webpack_require__(207);
	
	var _componentsCreateAll2 = _interopRequireDefault(_componentsCreateAll);
	
	var _createAll = (0, _componentsCreateAll2['default'])(_react2['default']);
	
	var Provider = _createAll.Provider;
	var Connector = _createAll.Connector;
	var provide = _createAll.provide;
	var connect = _createAll.connect;
	exports.Provider = Provider;
	exports.Connector = Connector;
	exports.provide = provide;
	exports.connect = connect;

/***/ },
/* 207 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	exports['default'] = createAll;
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _createProvider = __webpack_require__(208);
	
	var _createProvider2 = _interopRequireDefault(_createProvider);
	
	var _createProvideDecorator = __webpack_require__(209);
	
	var _createProvideDecorator2 = _interopRequireDefault(_createProvideDecorator);
	
	var _createConnector = __webpack_require__(211);
	
	var _createConnector2 = _interopRequireDefault(_createConnector);
	
	var _createConnectDecorator = __webpack_require__(216);
	
	var _createConnectDecorator2 = _interopRequireDefault(_createConnectDecorator);
	
	function createAll(React) {
	  // Wrapper components
	  var Provider = (0, _createProvider2['default'])(React);
	  var Connector = (0, _createConnector2['default'])(React);
	
	  // Higher-order components (decorators)
	  var provide = (0, _createProvideDecorator2['default'])(React, Provider);
	  var connect = (0, _createConnectDecorator2['default'])(React, Connector);
	
	  return { Provider: Provider, Connector: Connector, provide: provide, connect: connect };
	}
	
	module.exports = exports['default'];

/***/ },
/* 208 */
/***/ function(module, exports) {

	"use strict";
	
	exports.__esModule = true;
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	exports["default"] = createProvider;
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }
	
	function createProvider(React) {
	  var Component = React.Component;
	  var PropTypes = React.PropTypes;
	
	  var reduxShape = PropTypes.shape({
	    subscribe: PropTypes.func.isRequired,
	    dispatch: PropTypes.func.isRequired,
	    getState: PropTypes.func.isRequired
	  });
	
	  return (function (_Component) {
	    function Provider(props, context) {
	      _classCallCheck(this, Provider);
	
	      _Component.call(this, props, context);
	      this.state = { redux: props.redux };
	    }
	
	    _inherits(Provider, _Component);
	
	    Provider.prototype.getChildContext = function getChildContext() {
	      return { redux: this.state.redux };
	    };
	
	    Provider.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
	      var redux = this.state.redux;
	      var nextRedux = nextProps.redux;
	
	      if (redux !== nextRedux) {
	        var nextDispatcher = nextRedux.getDispatcher();
	        redux.replaceDispatcher(nextDispatcher);
	      }
	    };
	
	    Provider.prototype.render = function render() {
	      var children = this.props.children;
	
	      return children();
	    };
	
	    _createClass(Provider, null, [{
	      key: "propTypes",
	      value: {
	        redux: reduxShape.isRequired,
	        children: PropTypes.func.isRequired
	      },
	      enumerable: true
	    }, {
	      key: "childContextTypes",
	      value: {
	        redux: reduxShape.isRequired
	      },
	      enumerable: true
	    }]);
	
	    return Provider;
	  })(Component);
	}
	
	module.exports = exports["default"];

/***/ },
/* 209 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	exports['default'] = createProvideDecorator;
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }
	
	var _utilsGetDisplayName = __webpack_require__(210);
	
	var _utilsGetDisplayName2 = _interopRequireDefault(_utilsGetDisplayName);
	
	function createProvideDecorator(React, Provider) {
	  var Component = React.Component;
	
	  return function provide(redux) {
	    return function (DecoratedComponent) {
	      return (function (_Component) {
	        function ProviderDecorator() {
	          _classCallCheck(this, ProviderDecorator);
	
	          if (_Component != null) {
	            _Component.apply(this, arguments);
	          }
	        }
	
	        _inherits(ProviderDecorator, _Component);
	
	        ProviderDecorator.prototype.render = function render() {
	          var _this = this;
	
	          return React.createElement(
	            Provider,
	            { redux: redux },
	            function () {
	              return React.createElement(DecoratedComponent, _this.props);
	            }
	          );
	        };
	
	        _createClass(ProviderDecorator, null, [{
	          key: 'displayName',
	          value: 'Provider(' + (0, _utilsGetDisplayName2['default'])(DecoratedComponent) + ')',
	          enumerable: true
	        }, {
	          key: 'DecoratedComponent',
	          value: DecoratedComponent,
	          enumerable: true
	        }]);
	
	        return ProviderDecorator;
	      })(Component);
	    };
	  };
	}
	
	module.exports = exports['default'];

/***/ },
/* 210 */
/***/ function(module, exports) {

	'use strict';
	
	exports.__esModule = true;
	exports['default'] = getDisplayName;
	
	function getDisplayName(Component) {
	  return Component.displayName || Component.name || 'Component';
	}
	
	module.exports = exports['default'];

/***/ },
/* 211 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	exports['default'] = createConnector;
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }
	
	var _utilsIdentity = __webpack_require__(212);
	
	var _utilsIdentity2 = _interopRequireDefault(_utilsIdentity);
	
	var _utilsShallowEqual = __webpack_require__(213);
	
	var _utilsShallowEqual2 = _interopRequireDefault(_utilsShallowEqual);
	
	var _utilsIsPlainObject = __webpack_require__(214);
	
	var _utilsIsPlainObject2 = _interopRequireDefault(_utilsIsPlainObject);
	
	var _invariant = __webpack_require__(215);
	
	var _invariant2 = _interopRequireDefault(_invariant);
	
	function createConnector(React) {
	  var Component = React.Component;
	  var PropTypes = React.PropTypes;
	
	  return (function (_Component) {
	    function Connector(props, context) {
	      _classCallCheck(this, Connector);
	
	      _Component.call(this, props, context);
	
	      this.unsubscribe = context.redux.subscribe(this.handleChange.bind(this));
	      this.state = this.selectState(props, context);
	    }
	
	    _inherits(Connector, _Component);
	
	    Connector.prototype.shouldComponentUpdate = function shouldComponentUpdate(nextProps, nextState) {
	      return !this.isSliceEqual(this.state.slice, nextState.slice) || !(0, _utilsShallowEqual2['default'])(this.props, nextProps);
	    };
	
	    Connector.prototype.isSliceEqual = function isSliceEqual(slice, nextSlice) {
	      var isRefEqual = slice === nextSlice;
	      if (isRefEqual) {
	        return true;
	      } else if (typeof slice !== 'object' || typeof nextSlice !== 'object') {
	        return isRefEqual;
	      }
	      return (0, _utilsShallowEqual2['default'])(slice, nextSlice);
	    };
	
	    Connector.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
	      if (nextProps.select !== this.props.select) {
	        // Force the state slice recalculation
	        this.handleChange(nextProps);
	      }
	    };
	
	    Connector.prototype.componentWillUnmount = function componentWillUnmount() {
	      this.unsubscribe();
	    };
	
	    Connector.prototype.handleChange = function handleChange() {
	      var props = arguments[0] === undefined ? this.props : arguments[0];
	
	      var nextState = this.selectState(props, this.context);
	      this.setState(nextState);
	    };
	
	    Connector.prototype.selectState = function selectState(props, context) {
	      var state = context.redux.getState();
	      var slice = props.select(state);
	
	      (0, _invariant2['default'])((0, _utilsIsPlainObject2['default'])(slice), 'The return value of `select` prop must be an object. Instead received %s.', slice);
	
	      return { slice: slice };
	    };
	
	    Connector.prototype.render = function render() {
	      var children = this.props.children;
	      var slice = this.state.slice;
	      var dispatch = this.context.redux.dispatch;
	
	      return children(_extends({ dispatch: dispatch }, slice));
	    };
	
	    _createClass(Connector, null, [{
	      key: 'contextTypes',
	      value: {
	        redux: PropTypes.object.isRequired
	      },
	      enumerable: true
	    }, {
	      key: 'propTypes',
	      value: {
	        children: PropTypes.func.isRequired,
	        select: PropTypes.func.isRequired
	      },
	      enumerable: true
	    }, {
	      key: 'defaultProps',
	      value: {
	        select: _utilsIdentity2['default']
	      },
	      enumerable: true
	    }]);
	
	    return Connector;
	  })(Component);
	}
	
	module.exports = exports['default'];

/***/ },
/* 212 */
/***/ function(module, exports) {

	"use strict";
	
	exports.__esModule = true;
	exports["default"] = identity;
	
	function identity(value) {
	  return value;
	}
	
	module.exports = exports["default"];

/***/ },
/* 213 */
/***/ function(module, exports) {

	"use strict";
	
	exports.__esModule = true;
	exports["default"] = shallowEqual;
	
	function shallowEqual(objA, objB) {
	  if (objA === objB) {
	    return true;
	  }
	
	  var keysA = Object.keys(objA);
	  var keysB = Object.keys(objB);
	
	  if (keysA.length !== keysB.length) {
	    return false;
	  }
	
	  // Test for A's keys different from B.
	  var hasOwn = Object.prototype.hasOwnProperty;
	  for (var i = 0; i < keysA.length; i++) {
	    if (!hasOwn.call(objB, keysA[i]) || objA[keysA[i]] !== objB[keysA[i]]) {
	      return false;
	    }
	  }
	
	  return true;
	}
	
	module.exports = exports["default"];

/***/ },
/* 214 */
/***/ function(module, exports) {

	'use strict';
	
	exports.__esModule = true;
	exports['default'] = isPlainObject;
	
	function isPlainObject(obj) {
	  return obj ? typeof obj === 'object' && Object.getPrototypeOf(obj) === Object.prototype : false;
	}
	
	module.exports = exports['default'];

/***/ },
/* 215 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule invariant
	 */
	
	'use strict';
	
	/**
	 * Use invariant() to assert state which your program assumes to be true.
	 *
	 * Provide sprintf-style format (only %s is supported) and arguments
	 * to provide information about what broke and what you were
	 * expecting.
	 *
	 * The invariant message will be stripped in production, but the invariant
	 * will remain to ensure logic does not differ in production.
	 */
	
	var invariant = function(condition, format, a, b, c, d, e, f) {
	  if (process.env.NODE_ENV !== 'production') {
	    if (format === undefined) {
	      throw new Error('invariant requires an error message argument');
	    }
	  }
	
	  if (!condition) {
	    var error;
	    if (format === undefined) {
	      error = new Error(
	        'Minified exception occurred; use the non-minified dev environment ' +
	        'for the full error message and additional helpful warnings.'
	      );
	    } else {
	      var args = [a, b, c, d, e, f];
	      var argIndex = 0;
	      error = new Error(
	        'Invariant Violation: ' +
	        format.replace(/%s/g, function() { return args[argIndex++]; })
	      );
	    }
	
	    error.framesToPop = 1; // we don't care about invariant's own frame
	    throw error;
	  }
	};
	
	module.exports = invariant;
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(11)))

/***/ },
/* 216 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	exports['default'] = createConnectDecorator;
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }
	
	var _utilsGetDisplayName = __webpack_require__(210);
	
	var _utilsGetDisplayName2 = _interopRequireDefault(_utilsGetDisplayName);
	
	var _utilsShallowEqualScalar = __webpack_require__(217);
	
	var _utilsShallowEqualScalar2 = _interopRequireDefault(_utilsShallowEqualScalar);
	
	function createConnectDecorator(React, Connector) {
	  var Component = React.Component;
	
	  return function connect(select) {
	    return function (DecoratedComponent) {
	      return (function (_Component) {
	        function ConnectorDecorator() {
	          _classCallCheck(this, ConnectorDecorator);
	
	          if (_Component != null) {
	            _Component.apply(this, arguments);
	          }
	        }
	
	        _inherits(ConnectorDecorator, _Component);
	
	        ConnectorDecorator.prototype.shouldComponentUpdate = function shouldComponentUpdate(nextProps) {
	          return !(0, _utilsShallowEqualScalar2['default'])(this.props, nextProps);
	        };
	
	        ConnectorDecorator.prototype.render = function render() {
	          var _this = this;
	
	          return React.createElement(
	            Connector,
	            { select: function (state) {
	                return select(state, _this.props);
	              } },
	            function (stuff) {
	              return React.createElement(DecoratedComponent, _extends({}, stuff, _this.props));
	            }
	          );
	        };
	
	        _createClass(ConnectorDecorator, null, [{
	          key: 'displayName',
	          value: 'Connector(' + (0, _utilsGetDisplayName2['default'])(DecoratedComponent) + ')',
	          enumerable: true
	        }, {
	          key: 'DecoratedComponent',
	          value: DecoratedComponent,
	          enumerable: true
	        }]);
	
	        return ConnectorDecorator;
	      })(Component);
	    };
	  };
	}
	
	module.exports = exports['default'];

/***/ },
/* 217 */
/***/ function(module, exports) {

	'use strict';
	
	exports.__esModule = true;
	exports['default'] = shallowEqualScalar;
	
	function shallowEqualScalar(objA, objB) {
	  if (objA === objB) {
	    return true;
	  }
	
	  if (typeof objA !== 'object' || objA === null || typeof objB !== 'object' || objB === null) {
	    return false;
	  }
	
	  var keysA = Object.keys(objA);
	  var keysB = Object.keys(objB);
	
	  if (keysA.length !== keysB.length) {
	    return false;
	  }
	
	  // Test for A's keys different from B.
	  var hasOwn = Object.prototype.hasOwnProperty;
	  for (var i = 0; i < keysA.length; i++) {
	    if (!hasOwn.call(objB, keysA[i])) {
	      return false;
	    }
	
	    var valA = objA[keysA[i]];
	    var valB = objB[keysA[i]];
	
	    if (valA !== valB || typeof valA === 'object' || typeof valB === 'object') {
	      return false;
	    }
	  }
	
	  return true;
	}
	
	module.exports = exports['default'];

/***/ },
/* 218 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _createClass = __webpack_require__(1)['default'];
	
	var _classCallCheck = __webpack_require__(6)['default'];
	
	var _Object$values = __webpack_require__(219)['default'];
	
	var _interopRequireDefault = __webpack_require__(7)['default'];
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	
	var _react = __webpack_require__(9);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _redux = __webpack_require__(195);
	
	var _reduxReact = __webpack_require__(205);
	
	var _lib = __webpack_require__(223);
	
	var _ProgressBar = __webpack_require__(273);
	
	var _ProgressBar2 = _interopRequireDefault(_ProgressBar);
	
	var _actions = __webpack_require__(274);
	
	var loadingShape = _react.PropTypes.shape({
	  loading: _react.PropTypes.bool,
	  loaded: _react.PropTypes.bool,
	  page: _react.PropTypes.number,
	  pages: _react.PropTypes.number
	});
	
	var Loader = (function () {
	  function Loader() {
	    _classCallCheck(this, _Loader);
	  }
	
	  _createClass(Loader, [{
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      // Stagger the start of loading, starting with tracks, to keep the progress bar from jumping back and forth as we
	      // get more page counts. The delay is arbitrary.
	      var dispatch = this.props.dispatch;
	
	      var delay = 10;
	      var fetchFor = function fetchFor(actions) {
	        return dispatch(actions.fetch());
	      };
	      var delayIf = function delayIf(check, actions, offset) {
	        if (!check.loading && !check.loaded) {
	          setTimeout(function () {
	            return fetchFor(actions);
	          }, delay * offset);
	          return offset + 1;
	        } else {
	          return offset;
	        }
	      };
	
	      var offset = 0;
	      offset = delayIf(this.props.tracks, _actions.genreActions, offset);
	      offset = delayIf(this.props.genres, _actions.trackActions, offset);
	      offset = delayIf(this.props.artists, _actions.artistActions, offset);
	      offset = delayIf(this.props.albums, _actions.albumActions, offset);
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var stores = _Object$values((0, _lib.slice)(this.props, 'genres', 'artists', 'albums', 'tracks'));
	
	      var adder = function adder(memo, current) {
	        return memo + (current || 0);
	      };
	      var totalPages = (0, _lib.pluck)(stores, 'pages').reduce(adder, 0);
	      var loadedPages = (0, _lib.pluck)(stores, 'page').reduce(adder, 0);
	
	      return _react2['default'].createElement(_ProgressBar2['default'], { current: loadedPages, maximum: totalPages });
	    }
	  }], [{
	    key: 'propTypes',
	    value: {
	      genres: loadingShape.isRequired,
	      artists: loadingShape.isRequired,
	      albums: loadingShape.isRequired,
	      tracks: loadingShape.isRequired
	    },
	    enumerable: true
	  }]);
	
	  var _Loader = Loader;
	  Loader = (0, _reduxReact.connect)(function (state) {
	    var toSlice = ['loading', 'loaded', 'page', 'pages'];
	
	    return {
	      genres: _lib.slice.apply(undefined, [state.Genres].concat(toSlice)),
	      artists: _lib.slice.apply(undefined, [state.Artists].concat(toSlice)),
	      albums: _lib.slice.apply(undefined, [state.Albums].concat(toSlice)),
	      tracks: _lib.slice.apply(undefined, [state.Tracks].concat(toSlice))
	    };
	  })(Loader) || Loader;
	  return Loader;
	})();
	
	exports['default'] = Loader;
	module.exports = exports['default'];

/***/ },
/* 219 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(220), __esModule: true };

/***/ },
/* 220 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(221);
	module.exports = __webpack_require__(4).core.Object.values;

/***/ },
/* 221 */
/***/ function(module, exports, __webpack_require__) {

	// http://goo.gl/XkBrjD
	var $    = __webpack_require__(4)
	  , $def = __webpack_require__(222);
	function createObjectToArray(isEntries){
	  return function(object){
	    var O      = $.toObject(object)
	      , keys   = $.getKeys(O)
	      , length = keys.length
	      , i      = 0
	      , result = Array(length)
	      , key;
	    if(isEntries)while(length > i)result[i] = [key = keys[i++], O[key]];
	    else while(length > i)result[i] = O[keys[i++]];
	    return result;
	  };
	}
	$def($def.S, 'Object', {
	  values:  createObjectToArray(false),
	  entries: createObjectToArray(true)
	});

/***/ },
/* 222 */
/***/ function(module, exports, __webpack_require__) {

	var $          = __webpack_require__(4)
	  , global     = $.g
	  , core       = $.core
	  , isFunction = $.isFunction;
	function ctx(fn, that){
	  return function(){
	    return fn.apply(that, arguments);
	  };
	}
	// type bitmap
	$def.F = 1;  // forced
	$def.G = 2;  // global
	$def.S = 4;  // static
	$def.P = 8;  // proto
	$def.B = 16; // bind
	$def.W = 32; // wrap
	function $def(type, name, source){
	  var key, own, out, exp
	    , isGlobal = type & $def.G
	    , isProto  = type & $def.P
	    , target   = isGlobal ? global : type & $def.S
	        ? global[name] : (global[name] || {}).prototype
	    , exports  = isGlobal ? core : core[name] || (core[name] = {});
	  if(isGlobal)source = name;
	  for(key in source){
	    // contains in native
	    own = !(type & $def.F) && target && key in target;
	    if(own && key in exports)continue;
	    // export native or passed
	    out = own ? target[key] : source[key];
	    // prevent global pollution for namespaces
	    if(isGlobal && !isFunction(target[key]))exp = source[key];
	    // bind timers to global for call from export context
	    else if(type & $def.B && own)exp = ctx(out, global);
	    // wrap global constructors for prevent change them in library
	    else if(type & $def.W && target[key] == out)!function(C){
	      exp = function(param){
	        return this instanceof C ? new C(param) : C(param);
	      };
	      exp.prototype = C.prototype;
	    }(out);
	    else exp = isProto && isFunction(out) ? ctx(Function.call, out) : out;
	    // export
	    exports[key] = exp;
	    if(isProto)(exports.prototype || (exports.prototype = {}))[key] = out;
	  }
	}
	module.exports = $def;

/***/ },
/* 223 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _interopRequireDefault = __webpack_require__(7)['default'];
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	
	var _client2 = __webpack_require__(224);
	
	var _client3 = _interopRequireDefault(_client2);
	
	exports.client = _client3['default'];
	
	var _createStore2 = __webpack_require__(256);
	
	var _createStore3 = _interopRequireDefault(_createStore2);
	
	exports.createStore = _createStore3['default'];
	
	var _debounce2 = __webpack_require__(257);
	
	var _debounce3 = _interopRequireDefault(_debounce2);
	
	exports.debounce = _debounce3['default'];
	
	var _paginatedFetch = __webpack_require__(258);
	
	var _paginatedFetch2 = _interopRequireDefault(_paginatedFetch);
	
	exports.paginatedFetcher = _paginatedFetch2['default'];
	
	var _pluck2 = __webpack_require__(271);
	
	var _pluck3 = _interopRequireDefault(_pluck2);
	
	exports.pluck = _pluck3['default'];
	
	var _slice2 = __webpack_require__(272);
	
	var _slice3 = _interopRequireDefault(_slice2);
	
	exports.slice = _slice3['default'];

/***/ },
/* 224 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _createClass = __webpack_require__(1)['default'];
	
	var _classCallCheck = __webpack_require__(6)['default'];
	
	var _Promise = __webpack_require__(225)['default'];
	
	var _interopRequireDefault = __webpack_require__(7)['default'];
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	
	var _superagent = __webpack_require__(253);
	
	var _superagent2 = _interopRequireDefault(_superagent);
	
	function formatUrl(path) {
	  return 'http://localhost:5000/api/' + path;
	}
	
	var Client = (function () {
	  function Client() {
	    _classCallCheck(this, Client);
	  }
	
	  _createClass(Client, [{
	    key: 'get',
	    value: function get() {
	      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	        args[_key] = arguments[_key];
	      }
	
	      return this.request.apply(this, ['get'].concat(args));
	    }
	  }, {
	    key: 'post',
	    value: function post() {
	      for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
	        args[_key2] = arguments[_key2];
	      }
	
	      return this.request.apply(this, ['post'].concat(args));
	    }
	  }, {
	    key: 'put',
	    value: function put() {
	      for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
	        args[_key3] = arguments[_key3];
	      }
	
	      return this.request.apply(this, ['put'].concat(args));
	    }
	  }, {
	    key: 'patch',
	    value: function patch() {
	      for (var _len4 = arguments.length, args = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
	        args[_key4] = arguments[_key4];
	      }
	
	      return this.request.apply(this, ['patch'].concat(args));
	    }
	  }, {
	    key: 'del',
	    value: function del() {
	      for (var _len5 = arguments.length, args = Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
	        args[_key5] = arguments[_key5];
	      }
	
	      return this.request.apply(this, ['del'].concat(args));
	    }
	  }, {
	    key: 'request',
	    value: function request(method, path, options) {
	      return new _Promise(function (resolve, reject) {
	        var request = _superagent2['default'][method](formatUrl(path));
	
	        if (options && options.params) {
	          request.query(options.params);
	        }
	        if (options && options.data) {
	          request.send(options.data);
	        }
	
	        request.end(function (err, res) {
	          if (err) {
	            reject(err);
	          } else {
	            resolve(res.body);
	          }
	        });
	      });
	    }
	  }]);
	
	  return Client;
	})();
	
	var client = new Client();
	exports['default'] = client;
	module.exports = exports['default'];

/***/ },
/* 225 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(226), __esModule: true };

/***/ },
/* 226 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(227);
	__webpack_require__(233);
	__webpack_require__(238);
	__webpack_require__(241);
	module.exports = __webpack_require__(4).core.Promise;

/***/ },
/* 227 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// 19.1.3.6 Object.prototype.toString()
	var cof = __webpack_require__(228)
	  , tmp = {};
	tmp[__webpack_require__(229)('toStringTag')] = 'z';
	if(__webpack_require__(4).FW && cof(tmp) != 'z'){
	  __webpack_require__(232)(Object.prototype, 'toString', function toString(){
	    return '[object ' + cof.classof(this) + ']';
	  }, true);
	}

/***/ },
/* 228 */
/***/ function(module, exports, __webpack_require__) {

	var $        = __webpack_require__(4)
	  , TAG      = __webpack_require__(229)('toStringTag')
	  , toString = {}.toString;
	function cof(it){
	  return toString.call(it).slice(8, -1);
	}
	cof.classof = function(it){
	  var O, T;
	  return it == undefined ? it === undefined ? 'Undefined' : 'Null'
	    : typeof (T = (O = Object(it))[TAG]) == 'string' ? T : cof(O);
	};
	cof.set = function(it, tag, stat){
	  if(it && !$.has(it = stat ? it : it.prototype, TAG))$.hide(it, TAG, tag);
	};
	module.exports = cof;

/***/ },
/* 229 */
/***/ function(module, exports, __webpack_require__) {

	var global = __webpack_require__(4).g
	  , store  = __webpack_require__(230)('wks');
	module.exports = function(name){
	  return store[name] || (store[name] =
	    global.Symbol && global.Symbol[name] || __webpack_require__(231).safe('Symbol.' + name));
	};

/***/ },
/* 230 */
/***/ function(module, exports, __webpack_require__) {

	var $      = __webpack_require__(4)
	  , SHARED = '__core-js_shared__'
	  , store  = $.g[SHARED] || ($.g[SHARED] = {});
	module.exports = function(key){
	  return store[key] || (store[key] = {});
	};

/***/ },
/* 231 */
/***/ function(module, exports, __webpack_require__) {

	var sid = 0;
	function uid(key){
	  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++sid + Math.random()).toString(36));
	}
	uid.safe = __webpack_require__(4).g.Symbol || uid;
	module.exports = uid;

/***/ },
/* 232 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(4).hide;

/***/ },
/* 233 */
/***/ function(module, exports, __webpack_require__) {

	var set   = __webpack_require__(4).set
	  , $at   = __webpack_require__(234)(true)
	  , ITER  = __webpack_require__(231).safe('iter')
	  , $iter = __webpack_require__(235)
	  , step  = $iter.step;
	
	// 21.1.3.27 String.prototype[@@iterator]()
	__webpack_require__(237)(String, 'String', function(iterated){
	  set(this, ITER, {o: String(iterated), i: 0});
	// 21.1.5.2.1 %StringIteratorPrototype%.next()
	}, function(){
	  var iter  = this[ITER]
	    , O     = iter.o
	    , index = iter.i
	    , point;
	  if(index >= O.length)return step(1);
	  point = $at(O, index);
	  iter.i += point.length;
	  return step(0, point);
	});

/***/ },
/* 234 */
/***/ function(module, exports, __webpack_require__) {

	// true  -> String#at
	// false -> String#codePointAt
	var $ = __webpack_require__(4);
	module.exports = function(TO_STRING){
	  return function(that, pos){
	    var s = String($.assertDefined(that))
	      , i = $.toInteger(pos)
	      , l = s.length
	      , a, b;
	    if(i < 0 || i >= l)return TO_STRING ? '' : undefined;
	    a = s.charCodeAt(i);
	    return a < 0xd800 || a > 0xdbff || i + 1 === l
	      || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
	        ? TO_STRING ? s.charAt(i) : a
	        : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
	  };
	};

/***/ },
/* 235 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $                 = __webpack_require__(4)
	  , cof               = __webpack_require__(228)
	  , classof           = cof.classof
	  , assert            = __webpack_require__(236)
	  , assertObject      = assert.obj
	  , SYMBOL_ITERATOR   = __webpack_require__(229)('iterator')
	  , FF_ITERATOR       = '@@iterator'
	  , Iterators         = __webpack_require__(230)('iterators')
	  , IteratorPrototype = {};
	// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
	setIterator(IteratorPrototype, $.that);
	function setIterator(O, value){
	  $.hide(O, SYMBOL_ITERATOR, value);
	  // Add iterator for FF iterator protocol
	  if(FF_ITERATOR in [])$.hide(O, FF_ITERATOR, value);
	}
	
	module.exports = {
	  // Safari has buggy iterators w/o `next`
	  BUGGY: 'keys' in [] && !('next' in [].keys()),
	  Iterators: Iterators,
	  step: function(done, value){
	    return {value: value, done: !!done};
	  },
	  is: function(it){
	    var O      = Object(it)
	      , Symbol = $.g.Symbol;
	    return (Symbol && Symbol.iterator || FF_ITERATOR) in O
	      || SYMBOL_ITERATOR in O
	      || $.has(Iterators, classof(O));
	  },
	  get: function(it){
	    var Symbol = $.g.Symbol
	      , getIter;
	    if(it != undefined){
	      getIter = it[Symbol && Symbol.iterator || FF_ITERATOR]
	        || it[SYMBOL_ITERATOR]
	        || Iterators[classof(it)];
	    }
	    assert($.isFunction(getIter), it, ' is not iterable!');
	    return assertObject(getIter.call(it));
	  },
	  set: setIterator,
	  create: function(Constructor, NAME, next, proto){
	    Constructor.prototype = $.create(proto || IteratorPrototype, {next: $.desc(1, next)});
	    cof.set(Constructor, NAME + ' Iterator');
	  }
	};

/***/ },
/* 236 */
/***/ function(module, exports, __webpack_require__) {

	var $ = __webpack_require__(4);
	function assert(condition, msg1, msg2){
	  if(!condition)throw TypeError(msg2 ? msg1 + msg2 : msg1);
	}
	assert.def = $.assertDefined;
	assert.fn = function(it){
	  if(!$.isFunction(it))throw TypeError(it + ' is not a function!');
	  return it;
	};
	assert.obj = function(it){
	  if(!$.isObject(it))throw TypeError(it + ' is not an object!');
	  return it;
	};
	assert.inst = function(it, Constructor, name){
	  if(!(it instanceof Constructor))throw TypeError(name + ": use the 'new' operator!");
	  return it;
	};
	module.exports = assert;

/***/ },
/* 237 */
/***/ function(module, exports, __webpack_require__) {

	var $def            = __webpack_require__(222)
	  , $redef          = __webpack_require__(232)
	  , $               = __webpack_require__(4)
	  , cof             = __webpack_require__(228)
	  , $iter           = __webpack_require__(235)
	  , SYMBOL_ITERATOR = __webpack_require__(229)('iterator')
	  , FF_ITERATOR     = '@@iterator'
	  , KEYS            = 'keys'
	  , VALUES          = 'values'
	  , Iterators       = $iter.Iterators;
	module.exports = function(Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCE){
	  $iter.create(Constructor, NAME, next);
	  function createMethod(kind){
	    function $$(that){
	      return new Constructor(that, kind);
	    }
	    switch(kind){
	      case KEYS: return function keys(){ return $$(this); };
	      case VALUES: return function values(){ return $$(this); };
	    } return function entries(){ return $$(this); };
	  }
	  var TAG      = NAME + ' Iterator'
	    , proto    = Base.prototype
	    , _native  = proto[SYMBOL_ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT]
	    , _default = _native || createMethod(DEFAULT)
	    , methods, key;
	  // Fix native
	  if(_native){
	    var IteratorPrototype = $.getProto(_default.call(new Base));
	    // Set @@toStringTag to native iterators
	    cof.set(IteratorPrototype, TAG, true);
	    // FF fix
	    if($.FW && $.has(proto, FF_ITERATOR))$iter.set(IteratorPrototype, $.that);
	  }
	  // Define iterator
	  if($.FW || FORCE)$iter.set(proto, _default);
	  // Plug for library
	  Iterators[NAME] = _default;
	  Iterators[TAG]  = $.that;
	  if(DEFAULT){
	    methods = {
	      keys:    IS_SET            ? _default : createMethod(KEYS),
	      values:  DEFAULT == VALUES ? _default : createMethod(VALUES),
	      entries: DEFAULT != VALUES ? _default : createMethod('entries')
	    };
	    if(FORCE)for(key in methods){
	      if(!(key in proto))$redef(proto, key, methods[key]);
	    } else $def($def.P + $def.F * $iter.BUGGY, NAME, methods);
	  }
	};

/***/ },
/* 238 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(239);
	var $           = __webpack_require__(4)
	  , Iterators   = __webpack_require__(235).Iterators
	  , ITERATOR    = __webpack_require__(229)('iterator')
	  , ArrayValues = Iterators.Array
	  , NL          = $.g.NodeList
	  , HTC         = $.g.HTMLCollection
	  , NLProto     = NL && NL.prototype
	  , HTCProto    = HTC && HTC.prototype;
	if($.FW){
	  if(NL && !(ITERATOR in NLProto))$.hide(NLProto, ITERATOR, ArrayValues);
	  if(HTC && !(ITERATOR in HTCProto))$.hide(HTCProto, ITERATOR, ArrayValues);
	}
	Iterators.NodeList = Iterators.HTMLCollection = ArrayValues;

/***/ },
/* 239 */
/***/ function(module, exports, __webpack_require__) {

	var $          = __webpack_require__(4)
	  , setUnscope = __webpack_require__(240)
	  , ITER       = __webpack_require__(231).safe('iter')
	  , $iter      = __webpack_require__(235)
	  , step       = $iter.step
	  , Iterators  = $iter.Iterators;
	
	// 22.1.3.4 Array.prototype.entries()
	// 22.1.3.13 Array.prototype.keys()
	// 22.1.3.29 Array.prototype.values()
	// 22.1.3.30 Array.prototype[@@iterator]()
	__webpack_require__(237)(Array, 'Array', function(iterated, kind){
	  $.set(this, ITER, {o: $.toObject(iterated), i: 0, k: kind});
	// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
	}, function(){
	  var iter  = this[ITER]
	    , O     = iter.o
	    , kind  = iter.k
	    , index = iter.i++;
	  if(!O || index >= O.length){
	    iter.o = undefined;
	    return step(1);
	  }
	  if(kind == 'keys'  )return step(0, index);
	  if(kind == 'values')return step(0, O[index]);
	  return step(0, [index, O[index]]);
	}, 'values');
	
	// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
	Iterators.Arguments = Iterators.Array;
	
	setUnscope('keys');
	setUnscope('values');
	setUnscope('entries');

/***/ },
/* 240 */
/***/ function(module, exports) {

	module.exports = function(){ /* empty */ };

/***/ },
/* 241 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $        = __webpack_require__(4)
	  , ctx      = __webpack_require__(243)
	  , cof      = __webpack_require__(228)
	  , $def     = __webpack_require__(222)
	  , assert   = __webpack_require__(236)
	  , forOf    = __webpack_require__(244)
	  , setProto = __webpack_require__(246).set
	  , same     = __webpack_require__(242)
	  , species  = __webpack_require__(247)
	  , SPECIES  = __webpack_require__(229)('species')
	  , RECORD   = __webpack_require__(231).safe('record')
	  , PROMISE  = 'Promise'
	  , global   = $.g
	  , process  = global.process
	  , isNode   = cof(process) == 'process'
	  , asap     = process && process.nextTick || __webpack_require__(248).set
	  , P        = global[PROMISE]
	  , isFunction     = $.isFunction
	  , isObject       = $.isObject
	  , assertFunction = assert.fn
	  , assertObject   = assert.obj
	  , Wrapper;
	
	function testResolve(sub){
	  var test = new P(function(){});
	  if(sub)test.constructor = Object;
	  return P.resolve(test) === test;
	}
	
	var useNative = function(){
	  var works = false;
	  function P2(x){
	    var self = new P(x);
	    setProto(self, P2.prototype);
	    return self;
	  }
	  try {
	    works = isFunction(P) && isFunction(P.resolve) && testResolve();
	    setProto(P2, P);
	    P2.prototype = $.create(P.prototype, {constructor: {value: P2}});
	    // actual Firefox has broken subclass support, test that
	    if(!(P2.resolve(5).then(function(){}) instanceof P2)){
	      works = false;
	    }
	    // actual V8 bug, https://code.google.com/p/v8/issues/detail?id=4162
	    if(works && $.DESC){
	      var thenableThenGotten = false;
	      P.resolve($.setDesc({}, 'then', {
	        get: function(){ thenableThenGotten = true; }
	      }));
	      works = thenableThenGotten;
	    }
	  } catch(e){ works = false; }
	  return works;
	}();
	
	// helpers
	function isPromise(it){
	  return isObject(it) && (useNative ? cof.classof(it) == 'Promise' : RECORD in it);
	}
	function sameConstructor(a, b){
	  // library wrapper special case
	  if(!$.FW && a === P && b === Wrapper)return true;
	  return same(a, b);
	}
	function getConstructor(C){
	  var S = assertObject(C)[SPECIES];
	  return S != undefined ? S : C;
	}
	function isThenable(it){
	  var then;
	  if(isObject(it))then = it.then;
	  return isFunction(then) ? then : false;
	}
	function notify(record){
	  var chain = record.c;
	  // strange IE + webpack dev server bug - use .call(global)
	  if(chain.length)asap.call(global, function(){
	    var value = record.v
	      , ok    = record.s == 1
	      , i     = 0;
	    function run(react){
	      var cb = ok ? react.ok : react.fail
	        , ret, then;
	      try {
	        if(cb){
	          if(!ok)record.h = true;
	          ret = cb === true ? value : cb(value);
	          if(ret === react.P){
	            react.rej(TypeError('Promise-chain cycle'));
	          } else if(then = isThenable(ret)){
	            then.call(ret, react.res, react.rej);
	          } else react.res(ret);
	        } else react.rej(value);
	      } catch(err){
	        react.rej(err);
	      }
	    }
	    while(chain.length > i)run(chain[i++]); // variable length - can't use forEach
	    chain.length = 0;
	  });
	}
	function isUnhandled(promise){
	  var record = promise[RECORD]
	    , chain  = record.a || record.c
	    , i      = 0
	    , react;
	  if(record.h)return false;
	  while(chain.length > i){
	    react = chain[i++];
	    if(react.fail || !isUnhandled(react.P))return false;
	  } return true;
	}
	function $reject(value){
	  var record = this
	    , promise;
	  if(record.d)return;
	  record.d = true;
	  record = record.r || record; // unwrap
	  record.v = value;
	  record.s = 2;
	  record.a = record.c.slice();
	  setTimeout(function(){
	    // strange IE + webpack dev server bug - use .call(global)
	    asap.call(global, function(){
	      if(isUnhandled(promise = record.p)){
	        if(isNode){
	          process.emit('unhandledRejection', value, promise);
	        } else if(global.console && console.error){
	          console.error('Unhandled promise rejection', value);
	        }
	      }
	      record.a = undefined;
	    });
	  }, 1);
	  notify(record);
	}
	function $resolve(value){
	  var record = this
	    , then;
	  if(record.d)return;
	  record.d = true;
	  record = record.r || record; // unwrap
	  try {
	    if(then = isThenable(value)){
	      // strange IE + webpack dev server bug - use .call(global)
	      asap.call(global, function(){
	        var wrapper = {r: record, d: false}; // wrap
	        try {
	          then.call(value, ctx($resolve, wrapper, 1), ctx($reject, wrapper, 1));
	        } catch(e){
	          $reject.call(wrapper, e);
	        }
	      });
	    } else {
	      record.v = value;
	      record.s = 1;
	      notify(record);
	    }
	  } catch(e){
	    $reject.call({r: record, d: false}, e); // wrap
	  }
	}
	
	// constructor polyfill
	if(!useNative){
	  // 25.4.3.1 Promise(executor)
	  P = function Promise(executor){
	    assertFunction(executor);
	    var record = {
	      p: assert.inst(this, P, PROMISE),       // <- promise
	      c: [],                                  // <- awaiting reactions
	      a: undefined,                           // <- checked in isUnhandled reactions
	      s: 0,                                   // <- state
	      d: false,                               // <- done
	      v: undefined,                           // <- value
	      h: false                                // <- handled rejection
	    };
	    $.hide(this, RECORD, record);
	    try {
	      executor(ctx($resolve, record, 1), ctx($reject, record, 1));
	    } catch(err){
	      $reject.call(record, err);
	    }
	  };
	  __webpack_require__(251)(P.prototype, {
	    // 25.4.5.3 Promise.prototype.then(onFulfilled, onRejected)
	    then: function then(onFulfilled, onRejected){
	      var S = assertObject(assertObject(this).constructor)[SPECIES];
	      var react = {
	        ok:   isFunction(onFulfilled) ? onFulfilled : true,
	        fail: isFunction(onRejected)  ? onRejected  : false
	      };
	      var promise = react.P = new (S != undefined ? S : P)(function(res, rej){
	        react.res = assertFunction(res);
	        react.rej = assertFunction(rej);
	      });
	      var record = this[RECORD];
	      record.c.push(react);
	      if(record.a)record.a.push(react);
	      if(record.s)notify(record);
	      return promise;
	    },
	    // 25.4.5.1 Promise.prototype.catch(onRejected)
	    'catch': function(onRejected){
	      return this.then(undefined, onRejected);
	    }
	  });
	}
	
	// export
	$def($def.G + $def.W + $def.F * !useNative, {Promise: P});
	cof.set(P, PROMISE);
	species(P);
	species(Wrapper = $.core[PROMISE]);
	
	// statics
	$def($def.S + $def.F * !useNative, PROMISE, {
	  // 25.4.4.5 Promise.reject(r)
	  reject: function reject(r){
	    return new (getConstructor(this))(function(res, rej){ rej(r); });
	  }
	});
	$def($def.S + $def.F * (!useNative || testResolve(true)), PROMISE, {
	  // 25.4.4.6 Promise.resolve(x)
	  resolve: function resolve(x){
	    return isPromise(x) && sameConstructor(x.constructor, this)
	      ? x : new this(function(res){ res(x); });
	  }
	});
	$def($def.S + $def.F * !(useNative && __webpack_require__(252)(function(iter){
	  P.all(iter)['catch'](function(){});
	})), PROMISE, {
	  // 25.4.4.1 Promise.all(iterable)
	  all: function all(iterable){
	    var C      = getConstructor(this)
	      , values = [];
	    return new C(function(res, rej){
	      forOf(iterable, false, values.push, values);
	      var remaining = values.length
	        , results   = Array(remaining);
	      if(remaining)$.each.call(values, function(promise, index){
	        C.resolve(promise).then(function(value){
	          results[index] = value;
	          --remaining || res(results);
	        }, rej);
	      });
	      else res(results);
	    });
	  },
	  // 25.4.4.4 Promise.race(iterable)
	  race: function race(iterable){
	    var C = getConstructor(this);
	    return new C(function(res, rej){
	      forOf(iterable, false, function(promise){
	        C.resolve(promise).then(res, rej);
	      });
	    });
	  }
	});

/***/ },
/* 242 */
/***/ function(module, exports) {

	module.exports = Object.is || function is(x, y){
	  return x === y ? x !== 0 || 1 / x === 1 / y : x != x && y != y;
	};

/***/ },
/* 243 */
/***/ function(module, exports, __webpack_require__) {

	// Optional / simple context binding
	var assertFunction = __webpack_require__(236).fn;
	module.exports = function(fn, that, length){
	  assertFunction(fn);
	  if(~length && that === undefined)return fn;
	  switch(length){
	    case 1: return function(a){
	      return fn.call(that, a);
	    };
	    case 2: return function(a, b){
	      return fn.call(that, a, b);
	    };
	    case 3: return function(a, b, c){
	      return fn.call(that, a, b, c);
	    };
	  } return function(/* ...args */){
	      return fn.apply(that, arguments);
	    };
	};

/***/ },
/* 244 */
/***/ function(module, exports, __webpack_require__) {

	var ctx  = __webpack_require__(243)
	  , get  = __webpack_require__(235).get
	  , call = __webpack_require__(245);
	module.exports = function(iterable, entries, fn, that){
	  var iterator = get(iterable)
	    , f        = ctx(fn, that, entries ? 2 : 1)
	    , step;
	  while(!(step = iterator.next()).done){
	    if(call(iterator, f, step.value, entries) === false){
	      return call.close(iterator);
	    }
	  }
	};

/***/ },
/* 245 */
/***/ function(module, exports, __webpack_require__) {

	var assertObject = __webpack_require__(236).obj;
	function close(iterator){
	  var ret = iterator['return'];
	  if(ret !== undefined)assertObject(ret.call(iterator));
	}
	function call(iterator, fn, value, entries){
	  try {
	    return entries ? fn(assertObject(value)[0], value[1]) : fn(value);
	  } catch(e){
	    close(iterator);
	    throw e;
	  }
	}
	call.close = close;
	module.exports = call;

/***/ },
/* 246 */
/***/ function(module, exports, __webpack_require__) {

	// Works with __proto__ only. Old v8 can't work with null proto objects.
	/* eslint-disable no-proto */
	var $      = __webpack_require__(4)
	  , assert = __webpack_require__(236);
	function check(O, proto){
	  assert.obj(O);
	  assert(proto === null || $.isObject(proto), proto, ": can't set as prototype!");
	}
	module.exports = {
	  set: Object.setPrototypeOf || ('__proto__' in {} // eslint-disable-line
	    ? function(buggy, set){
	        try {
	          set = __webpack_require__(243)(Function.call, $.getDesc(Object.prototype, '__proto__').set, 2);
	          set({}, []);
	        } catch(e){ buggy = true; }
	        return function setPrototypeOf(O, proto){
	          check(O, proto);
	          if(buggy)O.__proto__ = proto;
	          else set(O, proto);
	          return O;
	        };
	      }()
	    : undefined),
	  check: check
	};

/***/ },
/* 247 */
/***/ function(module, exports, __webpack_require__) {

	var $       = __webpack_require__(4)
	  , SPECIES = __webpack_require__(229)('species');
	module.exports = function(C){
	  if($.DESC && !(SPECIES in C))$.setDesc(C, SPECIES, {
	    configurable: true,
	    get: $.that
	  });
	};

/***/ },
/* 248 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $      = __webpack_require__(4)
	  , ctx    = __webpack_require__(243)
	  , cof    = __webpack_require__(228)
	  , invoke = __webpack_require__(249)
	  , cel    = __webpack_require__(250)
	  , global             = $.g
	  , isFunction         = $.isFunction
	  , html               = $.html
	  , process            = global.process
	  , setTask            = global.setImmediate
	  , clearTask          = global.clearImmediate
	  , MessageChannel     = global.MessageChannel
	  , counter            = 0
	  , queue              = {}
	  , ONREADYSTATECHANGE = 'onreadystatechange'
	  , defer, channel, port;
	function run(){
	  var id = +this;
	  if($.has(queue, id)){
	    var fn = queue[id];
	    delete queue[id];
	    fn();
	  }
	}
	function listner(event){
	  run.call(event.data);
	}
	// Node.js 0.9+ & IE10+ has setImmediate, otherwise:
	if(!isFunction(setTask) || !isFunction(clearTask)){
	  setTask = function(fn){
	    var args = [], i = 1;
	    while(arguments.length > i)args.push(arguments[i++]);
	    queue[++counter] = function(){
	      invoke(isFunction(fn) ? fn : Function(fn), args);
	    };
	    defer(counter);
	    return counter;
	  };
	  clearTask = function(id){
	    delete queue[id];
	  };
	  // Node.js 0.8-
	  if(cof(process) == 'process'){
	    defer = function(id){
	      process.nextTick(ctx(run, id, 1));
	    };
	  // Modern browsers, skip implementation for WebWorkers
	  // IE8 has postMessage, but it's sync & typeof its postMessage is object
	  } else if(global.addEventListener && isFunction(global.postMessage) && !global.importScripts){
	    defer = function(id){
	      global.postMessage(id, '*');
	    };
	    global.addEventListener('message', listner, false);
	  // WebWorkers
	  } else if(isFunction(MessageChannel)){
	    channel = new MessageChannel;
	    port    = channel.port2;
	    channel.port1.onmessage = listner;
	    defer = ctx(port.postMessage, port, 1);
	  // IE8-
	  } else if(ONREADYSTATECHANGE in cel('script')){
	    defer = function(id){
	      html.appendChild(cel('script'))[ONREADYSTATECHANGE] = function(){
	        html.removeChild(this);
	        run.call(id);
	      };
	    };
	  // Rest old browsers
	  } else {
	    defer = function(id){
	      setTimeout(ctx(run, id, 1), 0);
	    };
	  }
	}
	module.exports = {
	  set:   setTask,
	  clear: clearTask
	};

/***/ },
/* 249 */
/***/ function(module, exports) {

	// Fast apply
	// http://jsperf.lnkit.com/fast-apply/5
	module.exports = function(fn, args, that){
	  var un = that === undefined;
	  switch(args.length){
	    case 0: return un ? fn()
	                      : fn.call(that);
	    case 1: return un ? fn(args[0])
	                      : fn.call(that, args[0]);
	    case 2: return un ? fn(args[0], args[1])
	                      : fn.call(that, args[0], args[1]);
	    case 3: return un ? fn(args[0], args[1], args[2])
	                      : fn.call(that, args[0], args[1], args[2]);
	    case 4: return un ? fn(args[0], args[1], args[2], args[3])
	                      : fn.call(that, args[0], args[1], args[2], args[3]);
	    case 5: return un ? fn(args[0], args[1], args[2], args[3], args[4])
	                      : fn.call(that, args[0], args[1], args[2], args[3], args[4]);
	  } return              fn.apply(that, args);
	};

/***/ },
/* 250 */
/***/ function(module, exports, __webpack_require__) {

	var $        = __webpack_require__(4)
	  , document = $.g.document
	  , isObject = $.isObject
	  // in old IE typeof document.createElement is 'object'
	  , is = isObject(document) && isObject(document.createElement);
	module.exports = function(it){
	  return is ? document.createElement(it) : {};
	};

/***/ },
/* 251 */
/***/ function(module, exports, __webpack_require__) {

	var $redef = __webpack_require__(232);
	module.exports = function(target, src){
	  for(var key in src)$redef(target, key, src[key]);
	  return target;
	};

/***/ },
/* 252 */
/***/ function(module, exports, __webpack_require__) {

	var SYMBOL_ITERATOR = __webpack_require__(229)('iterator')
	  , SAFE_CLOSING    = false;
	try {
	  var riter = [7][SYMBOL_ITERATOR]();
	  riter['return'] = function(){ SAFE_CLOSING = true; };
	  Array.from(riter, function(){ throw 2; });
	} catch(e){ /* empty */ }
	module.exports = function(exec){
	  if(!SAFE_CLOSING)return false;
	  var safe = false;
	  try {
	    var arr  = [7]
	      , iter = arr[SYMBOL_ITERATOR]();
	    iter.next = function(){ safe = true; };
	    arr[SYMBOL_ITERATOR] = function(){ return iter; };
	    exec(arr);
	  } catch(e){ /* empty */ }
	  return safe;
	};

/***/ },
/* 253 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Module dependencies.
	 */
	
	var Emitter = __webpack_require__(254);
	var reduce = __webpack_require__(255);
	
	/**
	 * Root reference for iframes.
	 */
	
	var root = 'undefined' == typeof window
	  ? (this || self)
	  : window;
	
	/**
	 * Noop.
	 */
	
	function noop(){};
	
	/**
	 * Check if `obj` is a host object,
	 * we don't want to serialize these :)
	 *
	 * TODO: future proof, move to compoent land
	 *
	 * @param {Object} obj
	 * @return {Boolean}
	 * @api private
	 */
	
	function isHost(obj) {
	  var str = {}.toString.call(obj);
	
	  switch (str) {
	    case '[object File]':
	    case '[object Blob]':
	    case '[object FormData]':
	      return true;
	    default:
	      return false;
	  }
	}
	
	/**
	 * Determine XHR.
	 */
	
	request.getXHR = function () {
	  if (root.XMLHttpRequest
	      && (!root.location || 'file:' != root.location.protocol
	          || !root.ActiveXObject)) {
	    return new XMLHttpRequest;
	  } else {
	    try { return new ActiveXObject('Microsoft.XMLHTTP'); } catch(e) {}
	    try { return new ActiveXObject('Msxml2.XMLHTTP.6.0'); } catch(e) {}
	    try { return new ActiveXObject('Msxml2.XMLHTTP.3.0'); } catch(e) {}
	    try { return new ActiveXObject('Msxml2.XMLHTTP'); } catch(e) {}
	  }
	  return false;
	};
	
	/**
	 * Removes leading and trailing whitespace, added to support IE.
	 *
	 * @param {String} s
	 * @return {String}
	 * @api private
	 */
	
	var trim = ''.trim
	  ? function(s) { return s.trim(); }
	  : function(s) { return s.replace(/(^\s*|\s*$)/g, ''); };
	
	/**
	 * Check if `obj` is an object.
	 *
	 * @param {Object} obj
	 * @return {Boolean}
	 * @api private
	 */
	
	function isObject(obj) {
	  return obj === Object(obj);
	}
	
	/**
	 * Serialize the given `obj`.
	 *
	 * @param {Object} obj
	 * @return {String}
	 * @api private
	 */
	
	function serialize(obj) {
	  if (!isObject(obj)) return obj;
	  var pairs = [];
	  for (var key in obj) {
	    if (null != obj[key]) {
	      pairs.push(encodeURIComponent(key)
	        + '=' + encodeURIComponent(obj[key]));
	    }
	  }
	  return pairs.join('&');
	}
	
	/**
	 * Expose serialization method.
	 */
	
	 request.serializeObject = serialize;
	
	 /**
	  * Parse the given x-www-form-urlencoded `str`.
	  *
	  * @param {String} str
	  * @return {Object}
	  * @api private
	  */
	
	function parseString(str) {
	  var obj = {};
	  var pairs = str.split('&');
	  var parts;
	  var pair;
	
	  for (var i = 0, len = pairs.length; i < len; ++i) {
	    pair = pairs[i];
	    parts = pair.split('=');
	    obj[decodeURIComponent(parts[0])] = decodeURIComponent(parts[1]);
	  }
	
	  return obj;
	}
	
	/**
	 * Expose parser.
	 */
	
	request.parseString = parseString;
	
	/**
	 * Default MIME type map.
	 *
	 *     superagent.types.xml = 'application/xml';
	 *
	 */
	
	request.types = {
	  html: 'text/html',
	  json: 'application/json',
	  xml: 'application/xml',
	  urlencoded: 'application/x-www-form-urlencoded',
	  'form': 'application/x-www-form-urlencoded',
	  'form-data': 'application/x-www-form-urlencoded'
	};
	
	/**
	 * Default serialization map.
	 *
	 *     superagent.serialize['application/xml'] = function(obj){
	 *       return 'generated xml here';
	 *     };
	 *
	 */
	
	 request.serialize = {
	   'application/x-www-form-urlencoded': serialize,
	   'application/json': JSON.stringify
	 };
	
	 /**
	  * Default parsers.
	  *
	  *     superagent.parse['application/xml'] = function(str){
	  *       return { object parsed from str };
	  *     };
	  *
	  */
	
	request.parse = {
	  'application/x-www-form-urlencoded': parseString,
	  'application/json': JSON.parse
	};
	
	/**
	 * Parse the given header `str` into
	 * an object containing the mapped fields.
	 *
	 * @param {String} str
	 * @return {Object}
	 * @api private
	 */
	
	function parseHeader(str) {
	  var lines = str.split(/\r?\n/);
	  var fields = {};
	  var index;
	  var line;
	  var field;
	  var val;
	
	  lines.pop(); // trailing CRLF
	
	  for (var i = 0, len = lines.length; i < len; ++i) {
	    line = lines[i];
	    index = line.indexOf(':');
	    field = line.slice(0, index).toLowerCase();
	    val = trim(line.slice(index + 1));
	    fields[field] = val;
	  }
	
	  return fields;
	}
	
	/**
	 * Return the mime type for the given `str`.
	 *
	 * @param {String} str
	 * @return {String}
	 * @api private
	 */
	
	function type(str){
	  return str.split(/ *; */).shift();
	};
	
	/**
	 * Return header field parameters.
	 *
	 * @param {String} str
	 * @return {Object}
	 * @api private
	 */
	
	function params(str){
	  return reduce(str.split(/ *; */), function(obj, str){
	    var parts = str.split(/ *= */)
	      , key = parts.shift()
	      , val = parts.shift();
	
	    if (key && val) obj[key] = val;
	    return obj;
	  }, {});
	};
	
	/**
	 * Initialize a new `Response` with the given `xhr`.
	 *
	 *  - set flags (.ok, .error, etc)
	 *  - parse header
	 *
	 * Examples:
	 *
	 *  Aliasing `superagent` as `request` is nice:
	 *
	 *      request = superagent;
	 *
	 *  We can use the promise-like API, or pass callbacks:
	 *
	 *      request.get('/').end(function(res){});
	 *      request.get('/', function(res){});
	 *
	 *  Sending data can be chained:
	 *
	 *      request
	 *        .post('/user')
	 *        .send({ name: 'tj' })
	 *        .end(function(res){});
	 *
	 *  Or passed to `.send()`:
	 *
	 *      request
	 *        .post('/user')
	 *        .send({ name: 'tj' }, function(res){});
	 *
	 *  Or passed to `.post()`:
	 *
	 *      request
	 *        .post('/user', { name: 'tj' })
	 *        .end(function(res){});
	 *
	 * Or further reduced to a single call for simple cases:
	 *
	 *      request
	 *        .post('/user', { name: 'tj' }, function(res){});
	 *
	 * @param {XMLHTTPRequest} xhr
	 * @param {Object} options
	 * @api private
	 */
	
	function Response(req, options) {
	  options = options || {};
	  this.req = req;
	  this.xhr = this.req.xhr;
	  // responseText is accessible only if responseType is '' or 'text' and on older browsers
	  this.text = ((this.req.method !='HEAD' && (this.xhr.responseType === '' || this.xhr.responseType === 'text')) || typeof this.xhr.responseType === 'undefined')
	     ? this.xhr.responseText
	     : null;
	  this.statusText = this.req.xhr.statusText;
	  this.setStatusProperties(this.xhr.status);
	  this.header = this.headers = parseHeader(this.xhr.getAllResponseHeaders());
	  // getAllResponseHeaders sometimes falsely returns "" for CORS requests, but
	  // getResponseHeader still works. so we get content-type even if getting
	  // other headers fails.
	  this.header['content-type'] = this.xhr.getResponseHeader('content-type');
	  this.setHeaderProperties(this.header);
	  this.body = this.req.method != 'HEAD'
	    ? this.parseBody(this.text ? this.text : this.xhr.response)
	    : null;
	}
	
	/**
	 * Get case-insensitive `field` value.
	 *
	 * @param {String} field
	 * @return {String}
	 * @api public
	 */
	
	Response.prototype.get = function(field){
	  return this.header[field.toLowerCase()];
	};
	
	/**
	 * Set header related properties:
	 *
	 *   - `.type` the content type without params
	 *
	 * A response of "Content-Type: text/plain; charset=utf-8"
	 * will provide you with a `.type` of "text/plain".
	 *
	 * @param {Object} header
	 * @api private
	 */
	
	Response.prototype.setHeaderProperties = function(header){
	  // content-type
	  var ct = this.header['content-type'] || '';
	  this.type = type(ct);
	
	  // params
	  var obj = params(ct);
	  for (var key in obj) this[key] = obj[key];
	};
	
	/**
	 * Parse the given body `str`.
	 *
	 * Used for auto-parsing of bodies. Parsers
	 * are defined on the `superagent.parse` object.
	 *
	 * @param {String} str
	 * @return {Mixed}
	 * @api private
	 */
	
	Response.prototype.parseBody = function(str){
	  var parse = request.parse[this.type];
	  return parse && str && (str.length || str instanceof Object)
	    ? parse(str)
	    : null;
	};
	
	/**
	 * Set flags such as `.ok` based on `status`.
	 *
	 * For example a 2xx response will give you a `.ok` of __true__
	 * whereas 5xx will be __false__ and `.error` will be __true__. The
	 * `.clientError` and `.serverError` are also available to be more
	 * specific, and `.statusType` is the class of error ranging from 1..5
	 * sometimes useful for mapping respond colors etc.
	 *
	 * "sugar" properties are also defined for common cases. Currently providing:
	 *
	 *   - .noContent
	 *   - .badRequest
	 *   - .unauthorized
	 *   - .notAcceptable
	 *   - .notFound
	 *
	 * @param {Number} status
	 * @api private
	 */
	
	Response.prototype.setStatusProperties = function(status){
	  // handle IE9 bug: http://stackoverflow.com/questions/10046972/msie-returns-status-code-of-1223-for-ajax-request
	  if (status === 1223) {
	    status = 204;
	  }
	
	  var type = status / 100 | 0;
	
	  // status / class
	  this.status = status;
	  this.statusType = type;
	
	  // basics
	  this.info = 1 == type;
	  this.ok = 2 == type;
	  this.clientError = 4 == type;
	  this.serverError = 5 == type;
	  this.error = (4 == type || 5 == type)
	    ? this.toError()
	    : false;
	
	  // sugar
	  this.accepted = 202 == status;
	  this.noContent = 204 == status;
	  this.badRequest = 400 == status;
	  this.unauthorized = 401 == status;
	  this.notAcceptable = 406 == status;
	  this.notFound = 404 == status;
	  this.forbidden = 403 == status;
	};
	
	/**
	 * Return an `Error` representative of this response.
	 *
	 * @return {Error}
	 * @api public
	 */
	
	Response.prototype.toError = function(){
	  var req = this.req;
	  var method = req.method;
	  var url = req.url;
	
	  var msg = 'cannot ' + method + ' ' + url + ' (' + this.status + ')';
	  var err = new Error(msg);
	  err.status = this.status;
	  err.method = method;
	  err.url = url;
	
	  return err;
	};
	
	/**
	 * Expose `Response`.
	 */
	
	request.Response = Response;
	
	/**
	 * Initialize a new `Request` with the given `method` and `url`.
	 *
	 * @param {String} method
	 * @param {String} url
	 * @api public
	 */
	
	function Request(method, url) {
	  var self = this;
	  Emitter.call(this);
	  this._query = this._query || [];
	  this.method = method;
	  this.url = url;
	  this.header = {};
	  this._header = {};
	  this.on('end', function(){
	    var err = null;
	    var res = null;
	
	    try {
	      res = new Response(self);
	    } catch(e) {
	      err = new Error('Parser is unable to parse the response');
	      err.parse = true;
	      err.original = e;
	      return self.callback(err);
	    }
	
	    self.emit('response', res);
	
	    if (err) {
	      return self.callback(err, res);
	    }
	
	    if (res.status >= 200 && res.status < 300) {
	      return self.callback(err, res);
	    }
	
	    var new_err = new Error(res.statusText || 'Unsuccessful HTTP response');
	    new_err.original = err;
	    new_err.response = res;
	    new_err.status = res.status;
	
	    self.callback(err || new_err, res);
	  });
	}
	
	/**
	 * Mixin `Emitter`.
	 */
	
	Emitter(Request.prototype);
	
	/**
	 * Allow for extension
	 */
	
	Request.prototype.use = function(fn) {
	  fn(this);
	  return this;
	}
	
	/**
	 * Set timeout to `ms`.
	 *
	 * @param {Number} ms
	 * @return {Request} for chaining
	 * @api public
	 */
	
	Request.prototype.timeout = function(ms){
	  this._timeout = ms;
	  return this;
	};
	
	/**
	 * Clear previous timeout.
	 *
	 * @return {Request} for chaining
	 * @api public
	 */
	
	Request.prototype.clearTimeout = function(){
	  this._timeout = 0;
	  clearTimeout(this._timer);
	  return this;
	};
	
	/**
	 * Abort the request, and clear potential timeout.
	 *
	 * @return {Request}
	 * @api public
	 */
	
	Request.prototype.abort = function(){
	  if (this.aborted) return;
	  this.aborted = true;
	  this.xhr.abort();
	  this.clearTimeout();
	  this.emit('abort');
	  return this;
	};
	
	/**
	 * Set header `field` to `val`, or multiple fields with one object.
	 *
	 * Examples:
	 *
	 *      req.get('/')
	 *        .set('Accept', 'application/json')
	 *        .set('X-API-Key', 'foobar')
	 *        .end(callback);
	 *
	 *      req.get('/')
	 *        .set({ Accept: 'application/json', 'X-API-Key': 'foobar' })
	 *        .end(callback);
	 *
	 * @param {String|Object} field
	 * @param {String} val
	 * @return {Request} for chaining
	 * @api public
	 */
	
	Request.prototype.set = function(field, val){
	  if (isObject(field)) {
	    for (var key in field) {
	      this.set(key, field[key]);
	    }
	    return this;
	  }
	  this._header[field.toLowerCase()] = val;
	  this.header[field] = val;
	  return this;
	};
	
	/**
	 * Remove header `field`.
	 *
	 * Example:
	 *
	 *      req.get('/')
	 *        .unset('User-Agent')
	 *        .end(callback);
	 *
	 * @param {String} field
	 * @return {Request} for chaining
	 * @api public
	 */
	
	Request.prototype.unset = function(field){
	  delete this._header[field.toLowerCase()];
	  delete this.header[field];
	  return this;
	};
	
	/**
	 * Get case-insensitive header `field` value.
	 *
	 * @param {String} field
	 * @return {String}
	 * @api private
	 */
	
	Request.prototype.getHeader = function(field){
	  return this._header[field.toLowerCase()];
	};
	
	/**
	 * Set Content-Type to `type`, mapping values from `request.types`.
	 *
	 * Examples:
	 *
	 *      superagent.types.xml = 'application/xml';
	 *
	 *      request.post('/')
	 *        .type('xml')
	 *        .send(xmlstring)
	 *        .end(callback);
	 *
	 *      request.post('/')
	 *        .type('application/xml')
	 *        .send(xmlstring)
	 *        .end(callback);
	 *
	 * @param {String} type
	 * @return {Request} for chaining
	 * @api public
	 */
	
	Request.prototype.type = function(type){
	  this.set('Content-Type', request.types[type] || type);
	  return this;
	};
	
	/**
	 * Set Accept to `type`, mapping values from `request.types`.
	 *
	 * Examples:
	 *
	 *      superagent.types.json = 'application/json';
	 *
	 *      request.get('/agent')
	 *        .accept('json')
	 *        .end(callback);
	 *
	 *      request.get('/agent')
	 *        .accept('application/json')
	 *        .end(callback);
	 *
	 * @param {String} accept
	 * @return {Request} for chaining
	 * @api public
	 */
	
	Request.prototype.accept = function(type){
	  this.set('Accept', request.types[type] || type);
	  return this;
	};
	
	/**
	 * Set Authorization field value with `user` and `pass`.
	 *
	 * @param {String} user
	 * @param {String} pass
	 * @return {Request} for chaining
	 * @api public
	 */
	
	Request.prototype.auth = function(user, pass){
	  var str = btoa(user + ':' + pass);
	  this.set('Authorization', 'Basic ' + str);
	  return this;
	};
	
	/**
	* Add query-string `val`.
	*
	* Examples:
	*
	*   request.get('/shoes')
	*     .query('size=10')
	*     .query({ color: 'blue' })
	*
	* @param {Object|String} val
	* @return {Request} for chaining
	* @api public
	*/
	
	Request.prototype.query = function(val){
	  if ('string' != typeof val) val = serialize(val);
	  if (val) this._query.push(val);
	  return this;
	};
	
	/**
	 * Write the field `name` and `val` for "multipart/form-data"
	 * request bodies.
	 *
	 * ``` js
	 * request.post('/upload')
	 *   .field('foo', 'bar')
	 *   .end(callback);
	 * ```
	 *
	 * @param {String} name
	 * @param {String|Blob|File} val
	 * @return {Request} for chaining
	 * @api public
	 */
	
	Request.prototype.field = function(name, val){
	  if (!this._formData) this._formData = new root.FormData();
	  this._formData.append(name, val);
	  return this;
	};
	
	/**
	 * Queue the given `file` as an attachment to the specified `field`,
	 * with optional `filename`.
	 *
	 * ``` js
	 * request.post('/upload')
	 *   .attach(new Blob(['<a id="a"><b id="b">hey!</b></a>'], { type: "text/html"}))
	 *   .end(callback);
	 * ```
	 *
	 * @param {String} field
	 * @param {Blob|File} file
	 * @param {String} filename
	 * @return {Request} for chaining
	 * @api public
	 */
	
	Request.prototype.attach = function(field, file, filename){
	  if (!this._formData) this._formData = new root.FormData();
	  this._formData.append(field, file, filename);
	  return this;
	};
	
	/**
	 * Send `data`, defaulting the `.type()` to "json" when
	 * an object is given.
	 *
	 * Examples:
	 *
	 *       // querystring
	 *       request.get('/search')
	 *         .end(callback)
	 *
	 *       // multiple data "writes"
	 *       request.get('/search')
	 *         .send({ search: 'query' })
	 *         .send({ range: '1..5' })
	 *         .send({ order: 'desc' })
	 *         .end(callback)
	 *
	 *       // manual json
	 *       request.post('/user')
	 *         .type('json')
	 *         .send('{"name":"tj"})
	 *         .end(callback)
	 *
	 *       // auto json
	 *       request.post('/user')
	 *         .send({ name: 'tj' })
	 *         .end(callback)
	 *
	 *       // manual x-www-form-urlencoded
	 *       request.post('/user')
	 *         .type('form')
	 *         .send('name=tj')
	 *         .end(callback)
	 *
	 *       // auto x-www-form-urlencoded
	 *       request.post('/user')
	 *         .type('form')
	 *         .send({ name: 'tj' })
	 *         .end(callback)
	 *
	 *       // defaults to x-www-form-urlencoded
	  *      request.post('/user')
	  *        .send('name=tobi')
	  *        .send('species=ferret')
	  *        .end(callback)
	 *
	 * @param {String|Object} data
	 * @return {Request} for chaining
	 * @api public
	 */
	
	Request.prototype.send = function(data){
	  var obj = isObject(data);
	  var type = this.getHeader('Content-Type');
	
	  // merge
	  if (obj && isObject(this._data)) {
	    for (var key in data) {
	      this._data[key] = data[key];
	    }
	  } else if ('string' == typeof data) {
	    if (!type) this.type('form');
	    type = this.getHeader('Content-Type');
	    if ('application/x-www-form-urlencoded' == type) {
	      this._data = this._data
	        ? this._data + '&' + data
	        : data;
	    } else {
	      this._data = (this._data || '') + data;
	    }
	  } else {
	    this._data = data;
	  }
	
	  if (!obj || isHost(data)) return this;
	  if (!type) this.type('json');
	  return this;
	};
	
	/**
	 * Invoke the callback with `err` and `res`
	 * and handle arity check.
	 *
	 * @param {Error} err
	 * @param {Response} res
	 * @api private
	 */
	
	Request.prototype.callback = function(err, res){
	  var fn = this._callback;
	  this.clearTimeout();
	  fn(err, res);
	};
	
	/**
	 * Invoke callback with x-domain error.
	 *
	 * @api private
	 */
	
	Request.prototype.crossDomainError = function(){
	  var err = new Error('Origin is not allowed by Access-Control-Allow-Origin');
	  err.crossDomain = true;
	  this.callback(err);
	};
	
	/**
	 * Invoke callback with timeout error.
	 *
	 * @api private
	 */
	
	Request.prototype.timeoutError = function(){
	  var timeout = this._timeout;
	  var err = new Error('timeout of ' + timeout + 'ms exceeded');
	  err.timeout = timeout;
	  this.callback(err);
	};
	
	/**
	 * Enable transmission of cookies with x-domain requests.
	 *
	 * Note that for this to work the origin must not be
	 * using "Access-Control-Allow-Origin" with a wildcard,
	 * and also must set "Access-Control-Allow-Credentials"
	 * to "true".
	 *
	 * @api public
	 */
	
	Request.prototype.withCredentials = function(){
	  this._withCredentials = true;
	  return this;
	};
	
	/**
	 * Initiate request, invoking callback `fn(res)`
	 * with an instanceof `Response`.
	 *
	 * @param {Function} fn
	 * @return {Request} for chaining
	 * @api public
	 */
	
	Request.prototype.end = function(fn){
	  var self = this;
	  var xhr = this.xhr = request.getXHR();
	  var query = this._query.join('&');
	  var timeout = this._timeout;
	  var data = this._formData || this._data;
	
	  // store callback
	  this._callback = fn || noop;
	
	  // state change
	  xhr.onreadystatechange = function(){
	    if (4 != xhr.readyState) return;
	
	    // In IE9, reads to any property (e.g. status) off of an aborted XHR will
	    // result in the error "Could not complete the operation due to error c00c023f"
	    var status;
	    try { status = xhr.status } catch(e) { status = 0; }
	
	    if (0 == status) {
	      if (self.timedout) return self.timeoutError();
	      if (self.aborted) return;
	      return self.crossDomainError();
	    }
	    self.emit('end');
	  };
	
	  // progress
	  var handleProgress = function(e){
	    if (e.total > 0) {
	      e.percent = e.loaded / e.total * 100;
	    }
	    self.emit('progress', e);
	  };
	  if (this.hasListeners('progress')) {
	    xhr.onprogress = handleProgress;
	  }
	  try {
	    if (xhr.upload && this.hasListeners('progress')) {
	      xhr.upload.onprogress = handleProgress;
	    }
	  } catch(e) {
	    // Accessing xhr.upload fails in IE from a web worker, so just pretend it doesn't exist.
	    // Reported here:
	    // https://connect.microsoft.com/IE/feedback/details/837245/xmlhttprequest-upload-throws-invalid-argument-when-used-from-web-worker-context
	  }
	
	  // timeout
	  if (timeout && !this._timer) {
	    this._timer = setTimeout(function(){
	      self.timedout = true;
	      self.abort();
	    }, timeout);
	  }
	
	  // querystring
	  if (query) {
	    query = request.serializeObject(query);
	    this.url += ~this.url.indexOf('?')
	      ? '&' + query
	      : '?' + query;
	  }
	
	  // initiate request
	  xhr.open(this.method, this.url, true);
	
	  // CORS
	  if (this._withCredentials) xhr.withCredentials = true;
	
	  // body
	  if ('GET' != this.method && 'HEAD' != this.method && 'string' != typeof data && !isHost(data)) {
	    // serialize stuff
	    var serialize = request.serialize[this.getHeader('Content-Type')];
	    if (serialize) data = serialize(data);
	  }
	
	  // set header fields
	  for (var field in this.header) {
	    if (null == this.header[field]) continue;
	    xhr.setRequestHeader(field, this.header[field]);
	  }
	
	  // send stuff
	  this.emit('request', this);
	  xhr.send(data);
	  return this;
	};
	
	/**
	 * Expose `Request`.
	 */
	
	request.Request = Request;
	
	/**
	 * Issue a request:
	 *
	 * Examples:
	 *
	 *    request('GET', '/users').end(callback)
	 *    request('/users').end(callback)
	 *    request('/users', callback)
	 *
	 * @param {String} method
	 * @param {String|Function} url or callback
	 * @return {Request}
	 * @api public
	 */
	
	function request(method, url) {
	  // callback
	  if ('function' == typeof url) {
	    return new Request('GET', method).end(url);
	  }
	
	  // url first
	  if (1 == arguments.length) {
	    return new Request('GET', method);
	  }
	
	  return new Request(method, url);
	}
	
	/**
	 * GET `url` with optional callback `fn(res)`.
	 *
	 * @param {String} url
	 * @param {Mixed|Function} data or fn
	 * @param {Function} fn
	 * @return {Request}
	 * @api public
	 */
	
	request.get = function(url, data, fn){
	  var req = request('GET', url);
	  if ('function' == typeof data) fn = data, data = null;
	  if (data) req.query(data);
	  if (fn) req.end(fn);
	  return req;
	};
	
	/**
	 * HEAD `url` with optional callback `fn(res)`.
	 *
	 * @param {String} url
	 * @param {Mixed|Function} data or fn
	 * @param {Function} fn
	 * @return {Request}
	 * @api public
	 */
	
	request.head = function(url, data, fn){
	  var req = request('HEAD', url);
	  if ('function' == typeof data) fn = data, data = null;
	  if (data) req.send(data);
	  if (fn) req.end(fn);
	  return req;
	};
	
	/**
	 * DELETE `url` with optional callback `fn(res)`.
	 *
	 * @param {String} url
	 * @param {Function} fn
	 * @return {Request}
	 * @api public
	 */
	
	request.del = function(url, fn){
	  var req = request('DELETE', url);
	  if (fn) req.end(fn);
	  return req;
	};
	
	/**
	 * PATCH `url` with optional `data` and callback `fn(res)`.
	 *
	 * @param {String} url
	 * @param {Mixed} data
	 * @param {Function} fn
	 * @return {Request}
	 * @api public
	 */
	
	request.patch = function(url, data, fn){
	  var req = request('PATCH', url);
	  if ('function' == typeof data) fn = data, data = null;
	  if (data) req.send(data);
	  if (fn) req.end(fn);
	  return req;
	};
	
	/**
	 * POST `url` with optional `data` and callback `fn(res)`.
	 *
	 * @param {String} url
	 * @param {Mixed} data
	 * @param {Function} fn
	 * @return {Request}
	 * @api public
	 */
	
	request.post = function(url, data, fn){
	  var req = request('POST', url);
	  if ('function' == typeof data) fn = data, data = null;
	  if (data) req.send(data);
	  if (fn) req.end(fn);
	  return req;
	};
	
	/**
	 * PUT `url` with optional `data` and callback `fn(res)`.
	 *
	 * @param {String} url
	 * @param {Mixed|Function} data or fn
	 * @param {Function} fn
	 * @return {Request}
	 * @api public
	 */
	
	request.put = function(url, data, fn){
	  var req = request('PUT', url);
	  if ('function' == typeof data) fn = data, data = null;
	  if (data) req.send(data);
	  if (fn) req.end(fn);
	  return req;
	};
	
	/**
	 * Expose `request`.
	 */
	
	module.exports = request;


/***/ },
/* 254 */
/***/ function(module, exports) {

	
	/**
	 * Expose `Emitter`.
	 */
	
	module.exports = Emitter;
	
	/**
	 * Initialize a new `Emitter`.
	 *
	 * @api public
	 */
	
	function Emitter(obj) {
	  if (obj) return mixin(obj);
	};
	
	/**
	 * Mixin the emitter properties.
	 *
	 * @param {Object} obj
	 * @return {Object}
	 * @api private
	 */
	
	function mixin(obj) {
	  for (var key in Emitter.prototype) {
	    obj[key] = Emitter.prototype[key];
	  }
	  return obj;
	}
	
	/**
	 * Listen on the given `event` with `fn`.
	 *
	 * @param {String} event
	 * @param {Function} fn
	 * @return {Emitter}
	 * @api public
	 */
	
	Emitter.prototype.on =
	Emitter.prototype.addEventListener = function(event, fn){
	  this._callbacks = this._callbacks || {};
	  (this._callbacks[event] = this._callbacks[event] || [])
	    .push(fn);
	  return this;
	};
	
	/**
	 * Adds an `event` listener that will be invoked a single
	 * time then automatically removed.
	 *
	 * @param {String} event
	 * @param {Function} fn
	 * @return {Emitter}
	 * @api public
	 */
	
	Emitter.prototype.once = function(event, fn){
	  var self = this;
	  this._callbacks = this._callbacks || {};
	
	  function on() {
	    self.off(event, on);
	    fn.apply(this, arguments);
	  }
	
	  on.fn = fn;
	  this.on(event, on);
	  return this;
	};
	
	/**
	 * Remove the given callback for `event` or all
	 * registered callbacks.
	 *
	 * @param {String} event
	 * @param {Function} fn
	 * @return {Emitter}
	 * @api public
	 */
	
	Emitter.prototype.off =
	Emitter.prototype.removeListener =
	Emitter.prototype.removeAllListeners =
	Emitter.prototype.removeEventListener = function(event, fn){
	  this._callbacks = this._callbacks || {};
	
	  // all
	  if (0 == arguments.length) {
	    this._callbacks = {};
	    return this;
	  }
	
	  // specific event
	  var callbacks = this._callbacks[event];
	  if (!callbacks) return this;
	
	  // remove all handlers
	  if (1 == arguments.length) {
	    delete this._callbacks[event];
	    return this;
	  }
	
	  // remove specific handler
	  var cb;
	  for (var i = 0; i < callbacks.length; i++) {
	    cb = callbacks[i];
	    if (cb === fn || cb.fn === fn) {
	      callbacks.splice(i, 1);
	      break;
	    }
	  }
	  return this;
	};
	
	/**
	 * Emit `event` with the given args.
	 *
	 * @param {String} event
	 * @param {Mixed} ...
	 * @return {Emitter}
	 */
	
	Emitter.prototype.emit = function(event){
	  this._callbacks = this._callbacks || {};
	  var args = [].slice.call(arguments, 1)
	    , callbacks = this._callbacks[event];
	
	  if (callbacks) {
	    callbacks = callbacks.slice(0);
	    for (var i = 0, len = callbacks.length; i < len; ++i) {
	      callbacks[i].apply(this, args);
	    }
	  }
	
	  return this;
	};
	
	/**
	 * Return array of callbacks for `event`.
	 *
	 * @param {String} event
	 * @return {Array}
	 * @api public
	 */
	
	Emitter.prototype.listeners = function(event){
	  this._callbacks = this._callbacks || {};
	  return this._callbacks[event] || [];
	};
	
	/**
	 * Check if this emitter has `event` handlers.
	 *
	 * @param {String} event
	 * @return {Boolean}
	 * @api public
	 */
	
	Emitter.prototype.hasListeners = function(event){
	  return !! this.listeners(event).length;
	};


/***/ },
/* 255 */
/***/ function(module, exports) {

	
	/**
	 * Reduce `arr` with `fn`.
	 *
	 * @param {Array} arr
	 * @param {Function} fn
	 * @param {Mixed} initial
	 *
	 * TODO: combatible error handling?
	 */
	
	module.exports = function(arr, fn, initial){  
	  var idx = 0;
	  var len = arr.length;
	  var curr = arguments.length == 3
	    ? initial
	    : arr[idx++];
	
	  while (idx < len) {
	    curr = fn.call(null, curr, arr[idx], ++idx, arr);
	  }
	  
	  return curr;
	};

/***/ },
/* 256 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports["default"] = createStore;
	
	function createStore(initialState, handlers) {
	  return function (state, action) {
	    if (state === undefined) state = initialState;
	
	    if (handlers[action.type]) {
	      return handlers[action.type](state, action);
	    } else {
	      return state;
	    }
	  };
	}
	
	module.exports = exports["default"];

/***/ },
/* 257 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports["default"] = debounce;
	
	function debounce(func, delay) {
	  var timer = null;
	
	  return function () {
	    var _this = this;
	
	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }
	
	    clearTimeout(timer);
	    timer = setTimeout(function () {
	      return func.apply(_this, args);
	    }, delay);
	  };
	}
	
	module.exports = exports["default"];

/***/ },
/* 258 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _extends = __webpack_require__(259)['default'];
	
	var _slicedToArray = __webpack_require__(265)['default'];
	
	var _interopRequireDefault = __webpack_require__(7)['default'];
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	exports['default'] = paginatedFetcher;
	
	var _client = __webpack_require__(224);
	
	var _client2 = _interopRequireDefault(_client);
	
	function paginatedFetch(options) {
	  var dispatch = options.dispatch;
	  var pageNumber = options.pageNumber;
	  var perPage = options.perPage;
	  var path = options.path;
	  var action = options.action;
	
	  var _options$types = _slicedToArray(options.types, 4);
	
	  var START = _options$types[0];
	  var COMPLETE = _options$types[1];
	  var SUCCESS = _options$types[2];
	  var FAILURE = _options$types[3];
	
	  function success(result) {
	    dispatch(_extends({}, result, {
	      type: SUCCESS
	    }));
	
	    if (result.page < result.pages) {
	      dispatch(action(pageNumber + 1, perPage));
	    } else {
	      dispatch({ type: COMPLETE });
	    }
	  }
	  function failure(error) {
	    dispatch({
	      type: FAILURE,
	      error: error
	    });
	  }
	
	  dispatch({ type: START });
	  _client2['default'].get(path + '?page=' + pageNumber + '&per_page=' + perPage).then(success, failure);
	}
	
	function paginatedFetcher(path, actions) {
	  return function fetch() {
	    var pageNumber = arguments.length <= 0 || arguments[0] === undefined ? 1 : arguments[0];
	    var perPage = arguments.length <= 1 || arguments[1] === undefined ? 250 : arguments[1];
	
	    return function (dispatch) {
	      return paginatedFetch({
	        dispatch: dispatch, pageNumber: pageNumber, perPage: perPage,
	        action: fetch,
	        types: actions,
	        path: path
	      });
	    };
	  };
	}
	
	module.exports = exports['default'];

/***/ },
/* 259 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _Object$assign = __webpack_require__(260)["default"];
	
	exports["default"] = _Object$assign || function (target) {
	  for (var i = 1; i < arguments.length; i++) {
	    var source = arguments[i];
	
	    for (var key in source) {
	      if (Object.prototype.hasOwnProperty.call(source, key)) {
	        target[key] = source[key];
	      }
	    }
	  }
	
	  return target;
	};
	
	exports.__esModule = true;

/***/ },
/* 260 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(261), __esModule: true };

/***/ },
/* 261 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(262);
	module.exports = __webpack_require__(4).core.Object.assign;

/***/ },
/* 262 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.3.1 Object.assign(target, source)
	var $def = __webpack_require__(222);
	$def($def.S, 'Object', {assign: __webpack_require__(263)});

/***/ },
/* 263 */
/***/ function(module, exports, __webpack_require__) {

	var $        = __webpack_require__(4)
	  , enumKeys = __webpack_require__(264);
	// 19.1.2.1 Object.assign(target, source, ...)
	/* eslint-disable no-unused-vars */
	module.exports = Object.assign || function assign(target, source){
	/* eslint-enable no-unused-vars */
	  var T = Object($.assertDefined(target))
	    , l = arguments.length
	    , i = 1;
	  while(l > i){
	    var S      = $.ES5Object(arguments[i++])
	      , keys   = enumKeys(S)
	      , length = keys.length
	      , j      = 0
	      , key;
	    while(length > j)T[key = keys[j++]] = S[key];
	  }
	  return T;
	};

/***/ },
/* 264 */
/***/ function(module, exports, __webpack_require__) {

	var $ = __webpack_require__(4);
	module.exports = function(it){
	  var keys       = $.getKeys(it)
	    , getDesc    = $.getDesc
	    , getSymbols = $.getSymbols;
	  if(getSymbols)$.each.call(getSymbols(it), function(key){
	    if(getDesc(it, key).enumerable)keys.push(key);
	  });
	  return keys;
	};

/***/ },
/* 265 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _getIterator = __webpack_require__(266)["default"];
	
	var _isIterable = __webpack_require__(269)["default"];
	
	exports["default"] = (function () {
	  function sliceIterator(arr, i) {
	    var _arr = [];
	    var _n = true;
	    var _d = false;
	    var _e = undefined;
	
	    try {
	      for (var _i = _getIterator(arr), _s; !(_n = (_s = _i.next()).done); _n = true) {
	        _arr.push(_s.value);
	
	        if (i && _arr.length === i) break;
	      }
	    } catch (err) {
	      _d = true;
	      _e = err;
	    } finally {
	      try {
	        if (!_n && _i["return"]) _i["return"]();
	      } finally {
	        if (_d) throw _e;
	      }
	    }
	
	    return _arr;
	  }
	
	  return function (arr, i) {
	    if (Array.isArray(arr)) {
	      return arr;
	    } else if (_isIterable(Object(arr))) {
	      return sliceIterator(arr, i);
	    } else {
	      throw new TypeError("Invalid attempt to destructure non-iterable instance");
	    }
	  };
	})();
	
	exports.__esModule = true;

/***/ },
/* 266 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(267), __esModule: true };

/***/ },
/* 267 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(238);
	__webpack_require__(233);
	__webpack_require__(268);
	module.exports = __webpack_require__(4).core.getIterator;

/***/ },
/* 268 */
/***/ function(module, exports, __webpack_require__) {

	var core  = __webpack_require__(4).core
	  , $iter = __webpack_require__(235);
	core.isIterable  = $iter.is;
	core.getIterator = $iter.get;

/***/ },
/* 269 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(270), __esModule: true };

/***/ },
/* 270 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(238);
	__webpack_require__(233);
	__webpack_require__(268);
	module.exports = __webpack_require__(4).core.isIterable;

/***/ },
/* 271 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports["default"] = pluck;
	
	function pluck(objects, property) {
	  return objects.map(function (obj) {
	    return obj[property];
	  });
	}
	
	module.exports = exports["default"];

/***/ },
/* 272 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _getIterator = __webpack_require__(266)["default"];
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports["default"] = slice;
	
	function slice(obj) {
	  var newObj = {};
	
	  var _iteratorNormalCompletion = true;
	  var _didIteratorError = false;
	  var _iteratorError = undefined;
	
	  try {
	    for (var _len = arguments.length, keys = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	      keys[_key - 1] = arguments[_key];
	    }
	
	    for (var _iterator = _getIterator(keys), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	      var key = _step.value;
	
	      newObj[key] = obj[key];
	    }
	  } catch (err) {
	    _didIteratorError = true;
	    _iteratorError = err;
	  } finally {
	    try {
	      if (!_iteratorNormalCompletion && _iterator["return"]) {
	        _iterator["return"]();
	      }
	    } finally {
	      if (_didIteratorError) {
	        throw _iteratorError;
	      }
	    }
	  }
	
	  return newObj;
	}
	
	module.exports = exports["default"];

/***/ },
/* 273 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _createClass = __webpack_require__(1)["default"];
	
	var _classCallCheck = __webpack_require__(6)["default"];
	
	var _interopRequireDefault = __webpack_require__(7)["default"];
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _react = __webpack_require__(9);
	
	var _react2 = _interopRequireDefault(_react);
	
	var ProgressBar = (function () {
	  function ProgressBar() {
	    _classCallCheck(this, ProgressBar);
	  }
	
	  _createClass(ProgressBar, [{
	    key: "render",
	    value: function render() {
	      var _props = this.props;
	      var current = _props.current;
	      var maximum = _props.maximum;
	
	      var progress = maximum === 0 ? 0 : Math.round(current / maximum * 100);
	      var style = {
	        width: progress + "%"
	      };
	
	      return _react2["default"].createElement(
	        "div",
	        { className: "progress" },
	        _react2["default"].createElement("div", { className: "progress-bar", style: style })
	      );
	    }
	  }], [{
	    key: "propTypes",
	    value: {
	      current: _react.PropTypes.number.isRequired,
	      maximum: _react.PropTypes.number.isRequired
	    },
	    enumerable: true
	  }]);
	
	  return ProgressBar;
	})();
	
	exports["default"] = ProgressBar;
	module.exports = exports["default"];

/***/ },
/* 274 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _interopRequireWildcard = __webpack_require__(8)['default'];
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	
	var _accessListActions2 = __webpack_require__(275);
	
	var _accessListActions = _interopRequireWildcard(_accessListActions2);
	
	exports.accessListActions = _accessListActions;
	
	var _adminActions2 = __webpack_require__(277);
	
	var _adminActions = _interopRequireWildcard(_adminActions2);
	
	exports.adminActions = _adminActions;
	
	var _artistActions2 = __webpack_require__(285);
	
	var _artistActions = _interopRequireWildcard(_artistActions2);
	
	exports.artistActions = _artistActions;
	
	var _albumActions2 = __webpack_require__(286);
	
	var _albumActions = _interopRequireWildcard(_albumActions2);
	
	exports.albumActions = _albumActions;
	
	var _browseActions2 = __webpack_require__(287);
	
	var _browseActions = _interopRequireWildcard(_browseActions2);
	
	exports.browseActions = _browseActions;
	
	var _genreActions2 = __webpack_require__(288);
	
	var _genreActions = _interopRequireWildcard(_genreActions2);
	
	exports.genreActions = _genreActions;
	
	var _historyActions2 = __webpack_require__(289);
	
	var _historyActions = _interopRequireWildcard(_historyActions2);
	
	exports.historyActions = _historyActions;
	
	var _queueActions2 = __webpack_require__(290);
	
	var _queueActions = _interopRequireWildcard(_queueActions2);
	
	exports.queueActions = _queueActions;
	
	var _statusActions2 = __webpack_require__(291);
	
	var _statusActions = _interopRequireWildcard(_statusActions2);
	
	exports.statusActions = _statusActions;
	
	var _trackActions2 = __webpack_require__(292);
	
	var _trackActions = _interopRequireWildcard(_trackActions2);
	
	exports.trackActions = _trackActions;

/***/ },
/* 275 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _extends = __webpack_require__(259)['default'];
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	exports.fetch = fetch;
	exports.blacklist = blacklist;
	exports.whitelist = whitelist;
	exports.remove = remove;
	exports.save = save;
	exports.load = load;
	
	var _lib = __webpack_require__(223);
	
	var _constantsActions = __webpack_require__(276);
	
	function fetch() {
	  return function (dispatch) {
	    dispatch({ type: _constantsActions.ACCESS_LIST_FETCH_START });
	
	    _lib.client.get('admin/access_lists').then(function (result) {
	      return dispatch(_extends({}, result, { type: _constantsActions.ACCESS_LIST_FETCH_SUCCESS }));
	    }, function (error) {
	      return dispatch({ error: error, type: _constantsActions.ACCESS_LIST_FETCH_FAILURE });
	    });
	  };
	}
	
	function blacklist(store, item) {
	  return function (dispatch) {
	    dispatch({ type: _constantsActions.ACCESS_LIST_BLACKLIST });
	
	    var data = { store: store, allowed: false, id: item.id };
	    _lib.client.post('admin/access_lists', { data: data }).then(function (result) {
	      return dispatch({ store: store, item: item, type: _constantsActions.ACCESS_LIST_BLACKLIST_SUCCESS });
	    }, function (error) {
	      return dispatch({ error: error, type: ACCESS_LIST_BLACKLIST_FAILURE });
	    });
	  };
	}
	
	function whitelist(store, item) {
	  return function (dispatch) {
	    dispatch({ type: _constantsActions.ACCESS_LIST_WHITELIST });
	
	    var data = { store: store, allowed: true, id: item.id };
	    return _lib.client.post('admin/access_lists', { data: data }).then(function (result) {
	      return dispatch({ store: store, item: item, type: _constantsActions.ACCESS_LIST_WHITELIST_SUCCESS });
	    }, function (error) {
	      return dispatch({ error: error, type: ACCESS_LIST_WHITELIST_FAILURE });
	    });
	  };
	}
	
	function remove(store, item) {
	  return function (dispatch) {
	    dispatch({ type: _constantsActions.ACCESS_LIST_REMOVE });
	
	    var data = { store: store, id: item.id };
	    _lib.client.del('admin/access_lists', { data: data }).then(function (result) {
	      return dispatch({ store: store, item: item, type: _constantsActions.ACCESS_LIST_REMOVE_SUCCESS });
	    }, function (error) {
	      return dispatch({ error: error, type: ACCESS_LIST_REMOVE_FAILURE });
	    });
	  };
	}
	
	function save(name) {
	  return function (dispatch) {
	    var data = { name: name };
	    _lib.client.post('admin/access_lists/save', { data: data }).then(function (result) {
	      return dispatch({ name: name, type: _constantsActions.ACCESS_LIST_SAVE });
	    });
	  };
	}
	
	function load(id) {
	  return function (dispatch) {
	    var data = { id: id };
	    _lib.client.post('admin/access_lists/load', { data: data }).then(function (result) {
	      return dispatch({ id: id, type: _constantsActions.ACCESS_LIST_LOAD });
	    });
	  };
	}

/***/ },
/* 276 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	var GENRE_FETCH_START = 'GENRE_FETCH_START';
	exports.GENRE_FETCH_START = GENRE_FETCH_START;
	var GENRE_FETCH_COMPLETE = 'GENRE_FETCH_COMPLETE';
	exports.GENRE_FETCH_COMPLETE = GENRE_FETCH_COMPLETE;
	var GENRE_FETCH_SUCCESS = 'GENRE_FETCH_SUCCESS';
	exports.GENRE_FETCH_SUCCESS = GENRE_FETCH_SUCCESS;
	var GENRE_FETCH_FAILURE = 'GENRE_FETCH_FAILURE';
	
	exports.GENRE_FETCH_FAILURE = GENRE_FETCH_FAILURE;
	var ARTIST_FETCH_START = 'ARTIST_FETCH_START';
	exports.ARTIST_FETCH_START = ARTIST_FETCH_START;
	var ARTIST_FETCH_COMPLETE = 'ARTIST_FETCH_COMPLETE';
	exports.ARTIST_FETCH_COMPLETE = ARTIST_FETCH_COMPLETE;
	var ARTIST_FETCH_SUCCESS = 'ARTIST_FETCH_SUCCESS';
	exports.ARTIST_FETCH_SUCCESS = ARTIST_FETCH_SUCCESS;
	var ARTIST_FETCH_FAILURE = 'ARTIST_FETCH_FAILURE';
	
	exports.ARTIST_FETCH_FAILURE = ARTIST_FETCH_FAILURE;
	var ALBUM_FETCH_START = 'ALBUM_FETCH_START';
	exports.ALBUM_FETCH_START = ALBUM_FETCH_START;
	var ALBUM_FETCH_COMPLETE = 'ALBUM_FETCH_COMPLETE';
	exports.ALBUM_FETCH_COMPLETE = ALBUM_FETCH_COMPLETE;
	var ALBUM_FETCH_SUCCESS = 'ALBUM_FETCH_SUCCESS';
	exports.ALBUM_FETCH_SUCCESS = ALBUM_FETCH_SUCCESS;
	var ALBUM_FETCH_FAILURE = 'ALBUM_FETCH_FAILURE';
	
	exports.ALBUM_FETCH_FAILURE = ALBUM_FETCH_FAILURE;
	var TRACK_FETCH_START = 'TRACK_FETCH_START';
	exports.TRACK_FETCH_START = TRACK_FETCH_START;
	var TRACK_FETCH_COMPLETE = 'TRACK_FETCH_COMPLETE';
	exports.TRACK_FETCH_COMPLETE = TRACK_FETCH_COMPLETE;
	var TRACK_FETCH_SUCCESS = 'TRACK_FETCH_SUCCESS';
	exports.TRACK_FETCH_SUCCESS = TRACK_FETCH_SUCCESS;
	var TRACK_FETCH_FAILURE = 'TRACK_FETCH_FAILURE';
	
	exports.TRACK_FETCH_FAILURE = TRACK_FETCH_FAILURE;
	var ACCESS_LIST_FETCH_START = 'ACCESS_LIST_FETCH_START';
	exports.ACCESS_LIST_FETCH_START = ACCESS_LIST_FETCH_START;
	var ACCESS_LIST_FETCH_SUCCESS = 'ACCESS_LIST_FETCH_SUCCESS';
	exports.ACCESS_LIST_FETCH_SUCCESS = ACCESS_LIST_FETCH_SUCCESS;
	var ACCESS_LIST_FETCH_FAILURE = 'ACCESS_LIST_FETCH_FAILURE';
	exports.ACCESS_LIST_FETCH_FAILURE = ACCESS_LIST_FETCH_FAILURE;
	var ACCESS_LIST_BLACKLIST = 'ACCESS_LIST_BLACKLIST';
	exports.ACCESS_LIST_BLACKLIST = ACCESS_LIST_BLACKLIST;
	var ACCESS_LIST_BLACKLIST_SUCCESS = 'ACCESS_LIST_BLACKLIST';
	exports.ACCESS_LIST_BLACKLIST_SUCCESS = ACCESS_LIST_BLACKLIST_SUCCESS;
	var ACCESS_LIST_BLACKLIST_FAILURE = 'ACCESS_LIST_BLACKLIST';
	exports.ACCESS_LIST_BLACKLIST_FAILURE = ACCESS_LIST_BLACKLIST_FAILURE;
	var ACCESS_LIST_WHITELIST = 'ACCESS_LIST_WHITELIST';
	exports.ACCESS_LIST_WHITELIST = ACCESS_LIST_WHITELIST;
	var ACCESS_LIST_WHITELIST_SUCCESS = 'ACCESS_LIST_WHITELIST';
	exports.ACCESS_LIST_WHITELIST_SUCCESS = ACCESS_LIST_WHITELIST_SUCCESS;
	var ACCESS_LIST_WHITELIST_FAILURE = 'ACCESS_LIST_WHITELIST';
	exports.ACCESS_LIST_WHITELIST_FAILURE = ACCESS_LIST_WHITELIST_FAILURE;
	var ACCESS_LIST_REMOVE = 'ACCESS_LIST_REMOVE';
	exports.ACCESS_LIST_REMOVE = ACCESS_LIST_REMOVE;
	var ACCESS_LIST_REMOVE_SUCCESS = 'ACCESS_LIST_REMOVE';
	exports.ACCESS_LIST_REMOVE_SUCCESS = ACCESS_LIST_REMOVE_SUCCESS;
	var ACCESS_LIST_REMOVE_FAILURE = 'ACCESS_LIST_REMOVE';
	exports.ACCESS_LIST_REMOVE_FAILURE = ACCESS_LIST_REMOVE_FAILURE;
	var ACCESS_LIST_SAVE = 'ACCESS_LIST_SAVE';
	exports.ACCESS_LIST_SAVE = ACCESS_LIST_SAVE;
	var ACCESS_LIST_LOAD = 'ACCESS_LIST_LOAD';
	
	exports.ACCESS_LIST_LOAD = ACCESS_LIST_LOAD;
	var ADMIN_LOGIN = 'ADMIN_LOGIN';
	exports.ADMIN_LOGIN = ADMIN_LOGIN;
	var ADMIN_LOGOUT = 'ADMIN_LOGOUT';
	exports.ADMIN_LOGOUT = ADMIN_LOGOUT;
	var ADMIN_PLAY = 'ADMIN_PLAY';
	exports.ADMIN_PLAY = ADMIN_PLAY;
	var ADMIN_PLAY_NOW = 'ADMIN_PLAY_NOW';
	exports.ADMIN_PLAY_NOW = ADMIN_PLAY_NOW;
	var ADMIN_PAUSE = 'ADMIN_PAUSE';
	exports.ADMIN_PAUSE = ADMIN_PAUSE;
	var ADMIN_SKIP = 'ADMIN_SKIP';
	
	exports.ADMIN_SKIP = ADMIN_SKIP;
	var STATUS_STREAM_START = 'STATUS_STREAM_START';
	exports.STATUS_STREAM_START = STATUS_STREAM_START;
	var STATUS_STREAM_STOP = 'STATUS_STREAM_STOP';
	exports.STATUS_STREAM_STOP = STATUS_STREAM_STOP;
	var STATUS_STREAM_UPDATE = 'STATUS_STREAM_UPDATE';
	
	exports.STATUS_STREAM_UPDATE = STATUS_STREAM_UPDATE;
	var BROWSE_SELECT_GENRE = 'BROWSE_SELECT_GENRE';
	exports.BROWSE_SELECT_GENRE = BROWSE_SELECT_GENRE;
	var BROWSE_SELECT_ARTIST = 'BROWSE_SELECT_ARTIST';
	exports.BROWSE_SELECT_ARTIST = BROWSE_SELECT_ARTIST;
	var BROWSE_SET_SEARCH = 'BROWSE_SET_SEARCH';
	
	exports.BROWSE_SET_SEARCH = BROWSE_SET_SEARCH;
	var QUEUE_ADD = 'QUEUE_ADD';
	exports.QUEUE_ADD = QUEUE_ADD;
	var QUEUE_REMOVE = 'QUEUE_REMOVE';
	exports.QUEUE_REMOVE = QUEUE_REMOVE;
	var QUEUE_CLEAR = 'QUEUE_CLEAR';
	exports.QUEUE_CLEAR = QUEUE_CLEAR;
	var QUEUE_UP = 'QUEUE_UP';
	exports.QUEUE_UP = QUEUE_UP;
	var QUEUE_DOWN = 'QUEUE_DOWN';
	exports.QUEUE_DOWN = QUEUE_DOWN;
	var QUEUE_SAVE = 'QUEUE_SAVE';
	exports.QUEUE_SAVE = QUEUE_SAVE;
	var QUEUE_FETCH_START = 'QUEUE_FETCH_START';
	exports.QUEUE_FETCH_START = QUEUE_FETCH_START;
	var QUEUE_FETCH_SUCCESS = 'QUEUE_FETCH_SUCCESS';
	exports.QUEUE_FETCH_SUCCESS = QUEUE_FETCH_SUCCESS;
	var QUEUE_FETCH_FAILURE = 'QUEUE_FETCH_FAILURE';
	
	exports.QUEUE_FETCH_FAILURE = QUEUE_FETCH_FAILURE;
	var HISTORY_FETCH_START = 'HISTORY_FETCH_START';
	exports.HISTORY_FETCH_START = HISTORY_FETCH_START;
	var HISTORY_FETCH_SUCCESS = 'HISTORY_FETCH_SUCCESS';
	exports.HISTORY_FETCH_SUCCESS = HISTORY_FETCH_SUCCESS;
	var HISTORY_FETCH_FAILURE = 'HISTORY_FETCH_FAILURE';
	exports.HISTORY_FETCH_FAILURE = HISTORY_FETCH_FAILURE;

/***/ },
/* 277 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _Set = __webpack_require__(278)['default'];
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	exports.login = login;
	exports.logout = logout;
	exports.play = play;
	exports.pause = pause;
	exports.skip = skip;
	exports.playNow = playNow;
	
	var _lib = __webpack_require__(223);
	
	var _constantsActions = __webpack_require__(276);
	
	var stayLoggedInFor = 5 * 60 * 1000;
	var passwords = new _Set(['test']);
	
	function requireAdmin(callback) {
	  return function (dispatch, getState) {
	    if (!getState().Admin.isAdmin) {
	      return;
	    } else {
	      callback(dispatch, getState);
	    }
	  };
	}
	
	function login(password) {
	  return function (dispatch, getState) {
	    // Nothing to do if we're alread an admin.
	    if (getState().Admin.isAdmin) {
	      return;
	    }
	
	    if (passwords.has(password)) {
	      dispatch({
	        timer: setTimeout(function () {
	          return dispatch(logout());
	        }, stayLoggedInFor),
	        type: _constantsActions.ADMIN_LOGIN
	      });
	    }
	  };
	}
	
	function logout() {
	  return function (dispatch, getState) {
	    var timer = getState().Admin.timer;
	
	    if (timer) {
	      clearTimeout(timer);
	    }
	
	    dispatch({ type: _constantsActions.ADMIN_LOGOUT });
	  };
	}
	
	function play() {
	  return requireAdmin(function (dispatch, getState) {
	    _lib.client.get('admin/play').then(function (result) {
	      return dispatch({ type: _constantsActions.ADMIN_PLAY });
	    });
	  });
	}
	
	function pause() {
	  return requireAdmin(function (dispatch, getState) {
	    _lib.client.get('admin/pause').then(function (result) {
	      return dispatch({ type: _constantsActions.ADMIN_PAUSE });
	    });
	  });
	}
	
	function skip() {
	  return requireAdmin(function (dispatch, getState) {
	    _lib.client.get('admin/skip').then(function (result) {
	      return dispatch({ type: _constantsActions.ADMIN_SKIP });
	    });
	  });
	}
	
	function playNow(track) {
	  return requireAdmin(function (dispatch, getState) {
	    var data = { id: track.id };
	
	    _lib.client.post('admin/play', { data: data }).then(function (result) {
	      return dispatch({ type: _constantsActions.ADMIN_PLAY_NOW });
	    });
	  });
	}

/***/ },
/* 278 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(279), __esModule: true };

/***/ },
/* 279 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(227);
	__webpack_require__(233);
	__webpack_require__(238);
	__webpack_require__(280);
	__webpack_require__(283);
	module.exports = __webpack_require__(4).core.Set;

/***/ },
/* 280 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var strong = __webpack_require__(281);
	
	// 23.2 Set Objects
	__webpack_require__(282)('Set', function(get){
	  return function Set(){ return get(this, arguments[0]); };
	}, {
	  // 23.2.3.1 Set.prototype.add(value)
	  add: function add(value){
	    return strong.def(this, value = value === 0 ? 0 : value, value);
	  }
	}, strong);

/***/ },
/* 281 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $        = __webpack_require__(4)
	  , ctx      = __webpack_require__(243)
	  , safe     = __webpack_require__(231).safe
	  , assert   = __webpack_require__(236)
	  , forOf    = __webpack_require__(244)
	  , step     = __webpack_require__(235).step
	  , $has     = $.has
	  , set      = $.set
	  , isObject = $.isObject
	  , hide     = $.hide
	  , isExtensible = Object.isExtensible || isObject
	  , ID       = safe('id')
	  , O1       = safe('O1')
	  , LAST     = safe('last')
	  , FIRST    = safe('first')
	  , ITER     = safe('iter')
	  , SIZE     = $.DESC ? safe('size') : 'size'
	  , id       = 0;
	
	function fastKey(it, create){
	  // return primitive with prefix
	  if(!isObject(it))return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
	  if(!$has(it, ID)){
	    // can't set id to frozen object
	    if(!isExtensible(it))return 'F';
	    // not necessary to add id
	    if(!create)return 'E';
	    // add missing object id
	    hide(it, ID, ++id);
	  // return object id with prefix
	  } return 'O' + it[ID];
	}
	
	function getEntry(that, key){
	  // fast case
	  var index = fastKey(key), entry;
	  if(index !== 'F')return that[O1][index];
	  // frozen object case
	  for(entry = that[FIRST]; entry; entry = entry.n){
	    if(entry.k == key)return entry;
	  }
	}
	
	module.exports = {
	  getConstructor: function(wrapper, NAME, IS_MAP, ADDER){
	    var C = wrapper(function(that, iterable){
	      assert.inst(that, C, NAME);
	      set(that, O1, $.create(null));
	      set(that, SIZE, 0);
	      set(that, LAST, undefined);
	      set(that, FIRST, undefined);
	      if(iterable != undefined)forOf(iterable, IS_MAP, that[ADDER], that);
	    });
	    __webpack_require__(251)(C.prototype, {
	      // 23.1.3.1 Map.prototype.clear()
	      // 23.2.3.2 Set.prototype.clear()
	      clear: function clear(){
	        for(var that = this, data = that[O1], entry = that[FIRST]; entry; entry = entry.n){
	          entry.r = true;
	          if(entry.p)entry.p = entry.p.n = undefined;
	          delete data[entry.i];
	        }
	        that[FIRST] = that[LAST] = undefined;
	        that[SIZE] = 0;
	      },
	      // 23.1.3.3 Map.prototype.delete(key)
	      // 23.2.3.4 Set.prototype.delete(value)
	      'delete': function(key){
	        var that  = this
	          , entry = getEntry(that, key);
	        if(entry){
	          var next = entry.n
	            , prev = entry.p;
	          delete that[O1][entry.i];
	          entry.r = true;
	          if(prev)prev.n = next;
	          if(next)next.p = prev;
	          if(that[FIRST] == entry)that[FIRST] = next;
	          if(that[LAST] == entry)that[LAST] = prev;
	          that[SIZE]--;
	        } return !!entry;
	      },
	      // 23.2.3.6 Set.prototype.forEach(callbackfn, thisArg = undefined)
	      // 23.1.3.5 Map.prototype.forEach(callbackfn, thisArg = undefined)
	      forEach: function forEach(callbackfn /*, that = undefined */){
	        var f = ctx(callbackfn, arguments[1], 3)
	          , entry;
	        while(entry = entry ? entry.n : this[FIRST]){
	          f(entry.v, entry.k, this);
	          // revert to the last existing entry
	          while(entry && entry.r)entry = entry.p;
	        }
	      },
	      // 23.1.3.7 Map.prototype.has(key)
	      // 23.2.3.7 Set.prototype.has(value)
	      has: function has(key){
	        return !!getEntry(this, key);
	      }
	    });
	    if($.DESC)$.setDesc(C.prototype, 'size', {
	      get: function(){
	        return assert.def(this[SIZE]);
	      }
	    });
	    return C;
	  },
	  def: function(that, key, value){
	    var entry = getEntry(that, key)
	      , prev, index;
	    // change existing entry
	    if(entry){
	      entry.v = value;
	    // create new entry
	    } else {
	      that[LAST] = entry = {
	        i: index = fastKey(key, true), // <- index
	        k: key,                        // <- key
	        v: value,                      // <- value
	        p: prev = that[LAST],          // <- previous entry
	        n: undefined,                  // <- next entry
	        r: false                       // <- removed
	      };
	      if(!that[FIRST])that[FIRST] = entry;
	      if(prev)prev.n = entry;
	      that[SIZE]++;
	      // add to index
	      if(index !== 'F')that[O1][index] = entry;
	    } return that;
	  },
	  getEntry: getEntry,
	  // add .keys, .values, .entries, [@@iterator]
	  // 23.1.3.4, 23.1.3.8, 23.1.3.11, 23.1.3.12, 23.2.3.5, 23.2.3.8, 23.2.3.10, 23.2.3.11
	  setIter: function(C, NAME, IS_MAP){
	    __webpack_require__(237)(C, NAME, function(iterated, kind){
	      set(this, ITER, {o: iterated, k: kind});
	    }, function(){
	      var iter  = this[ITER]
	        , kind  = iter.k
	        , entry = iter.l;
	      // revert to the last existing entry
	      while(entry && entry.r)entry = entry.p;
	      // get next entry
	      if(!iter.o || !(iter.l = entry = entry ? entry.n : iter.o[FIRST])){
	        // or finish the iteration
	        iter.o = undefined;
	        return step(1);
	      }
	      // return step by kind
	      if(kind == 'keys'  )return step(0, entry.k);
	      if(kind == 'values')return step(0, entry.v);
	      return step(0, [entry.k, entry.v]);
	    }, IS_MAP ? 'entries' : 'values' , !IS_MAP, true);
	  }
	};

/***/ },
/* 282 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $     = __webpack_require__(4)
	  , $def  = __webpack_require__(222)
	  , $iter = __webpack_require__(235)
	  , BUGGY = $iter.BUGGY
	  , forOf = __webpack_require__(244)
	  , assertInstance = __webpack_require__(236).inst
	  , INTERNAL = __webpack_require__(231).safe('internal');
	
	module.exports = function(NAME, wrapper, methods, common, IS_MAP, IS_WEAK){
	  var Base  = $.g[NAME]
	    , C     = Base
	    , ADDER = IS_MAP ? 'set' : 'add'
	    , proto = C && C.prototype
	    , O     = {};
	  if(!$.DESC || !$.isFunction(C) || !(IS_WEAK || !BUGGY && proto.forEach && proto.entries)){
	    // create collection constructor
	    C = common.getConstructor(wrapper, NAME, IS_MAP, ADDER);
	    __webpack_require__(251)(C.prototype, methods);
	  } else {
	    C = wrapper(function(target, iterable){
	      assertInstance(target, C, NAME);
	      target[INTERNAL] = new Base;
	      if(iterable != undefined)forOf(iterable, IS_MAP, target[ADDER], target);
	    });
	    $.each.call('add,clear,delete,forEach,get,has,set,keys,values,entries'.split(','),function(KEY){
	      var chain = KEY == 'add' || KEY == 'set';
	      if(KEY in proto)$.hide(C.prototype, KEY, function(a, b){
	        var result = this[INTERNAL][KEY](a === 0 ? 0 : a, b);
	        return chain ? this : result;
	      });
	    });
	    if('size' in proto)$.setDesc(C.prototype, 'size', {
	      get: function(){
	        return this[INTERNAL].size;
	      }
	    });
	  }
	
	  __webpack_require__(228).set(C, NAME);
	
	  O[NAME] = C;
	  $def($def.G + $def.W + $def.F, O);
	  __webpack_require__(247)(C);
	
	  if(!IS_WEAK)common.setIter(C, NAME, IS_MAP);
	
	  return C;
	};

/***/ },
/* 283 */
/***/ function(module, exports, __webpack_require__) {

	// https://github.com/DavidBruant/Map-Set.prototype.toJSON
	__webpack_require__(284)('Set');

/***/ },
/* 284 */
/***/ function(module, exports, __webpack_require__) {

	// https://github.com/DavidBruant/Map-Set.prototype.toJSON
	var $def  = __webpack_require__(222)
	  , forOf = __webpack_require__(244);
	module.exports = function(NAME){
	  $def($def.P, NAME, {
	    toJSON: function toJSON(){
	      var arr = [];
	      forOf(this, false, arr.push, arr);
	      return arr;
	    }
	  });
	};

/***/ },
/* 285 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	
	var _lib = __webpack_require__(223);
	
	var _constantsActions = __webpack_require__(276);
	
	var fetch = (0, _lib.paginatedFetcher)('artists', [_constantsActions.ARTIST_FETCH_START, _constantsActions.ARTIST_FETCH_COMPLETE, _constantsActions.ARTIST_FETCH_SUCCESS, _constantsActions.ARTIST_FETCH_FAILURE]);
	exports.fetch = fetch;

/***/ },
/* 286 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	
	var _lib = __webpack_require__(223);
	
	var _constantsActions = __webpack_require__(276);
	
	var fetch = (0, _lib.paginatedFetcher)('albums', [_constantsActions.ALBUM_FETCH_START, _constantsActions.ALBUM_FETCH_COMPLETE, _constantsActions.ALBUM_FETCH_SUCCESS, _constantsActions.ALBUM_FETCH_FAILURE]);
	exports.fetch = fetch;

/***/ },
/* 287 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	exports.selectGenre = selectGenre;
	exports.selectArtist = selectArtist;
	exports.setSearch = setSearch;
	
	var _constantsActions = __webpack_require__(276);
	
	function selectGenre(id) {
	  return {
	    id: id,
	    type: _constantsActions.BROWSE_SELECT_GENRE
	  };
	}
	
	function selectArtist(id) {
	  return {
	    id: id,
	    type: _constantsActions.BROWSE_SELECT_ARTIST
	  };
	}
	
	function setSearch(search) {
	  return {
	    search: search,
	    type: _constantsActions.BROWSE_SET_SEARCH
	  };
	}

/***/ },
/* 288 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	
	var _lib = __webpack_require__(223);
	
	var _constantsActions = __webpack_require__(276);
	
	var fetch = (0, _lib.paginatedFetcher)('genres', [_constantsActions.GENRE_FETCH_START, _constantsActions.GENRE_FETCH_COMPLETE, _constantsActions.GENRE_FETCH_SUCCESS, _constantsActions.GENRE_FETCH_FAILURE]);
	exports.fetch = fetch;

/***/ },
/* 289 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _extends = __webpack_require__(259)['default'];
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	exports.fetch = fetch;
	
	var _lib = __webpack_require__(223);
	
	var _constantsActions = __webpack_require__(276);
	
	function fetch() {
	  return function (dispatch) {
	    dispatch({ type: _constantsActions.HISTORY_FETCH_START });
	
	    _lib.client.get('history').then(function (result) {
	      return dispatch(_extends({}, result, { type: _constantsActions.HISTORY_FETCH_SUCCESS }));
	    }, function (error) {
	      return dispatch({ error: error, type: _constantsActions.HISTORY_FETCH_FAILURE });
	    });
	  };
	}

/***/ },
/* 290 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _extends = __webpack_require__(259)['default'];
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	exports.add = add;
	exports.remove = remove;
	exports.clear = clear;
	exports.up = up;
	exports.down = down;
	exports.send = send;
	exports.fetch = fetch;
	
	var _lib = __webpack_require__(223);
	
	var _constantsActions = __webpack_require__(276);
	
	function add(track) {
	  return {
	    track: track,
	    type: _constantsActions.QUEUE_ADD
	  };
	}
	
	function remove(track) {
	  return {
	    track: track,
	    type: _constantsActions.QUEUE_REMOVE
	  };
	}
	
	function clear() {
	  return { type: _constantsActions.QUEUE_CLEAR };
	}
	
	function up(track) {
	  return {
	    track: track,
	    type: _constantsActions.QUEUE_UP
	  };
	}
	
	function down(track) {
	  return {
	    track: track,
	    type: _constantsActions.QUEUE_DOWN
	  };
	}
	
	function send(name) {
	  return function (dispatch, getState) {
	    var data = {
	      name: name,
	      ids: getState().Queue.queue.map(function (t) {
	        return t.id;
	      })
	    };
	
	    // We don't care about the result of saving at this point. We will wait to clear until the response, at least.
	    // TODO add some sort of notification system and try to save again?
	    _lib.client.post('queue', { data: data }).then(function (result) {
	      return dispatch(clear());
	    }, function (error) {
	      return console.warn(error);
	    });
	  };
	}
	
	function fetch() {
	  return function (dispatch) {
	    dispatch({ type: _constantsActions.QUEUE_FETCH_START });
	
	    _lib.client.get('queue').then(function (result) {
	      return dispatch(_extends({}, result, { type: _constantsActions.QUEUE_FETCH_SUCCESS }));
	    }, function (error) {
	      return dispatch({ error: error, type: _constantsActions.QUEUE_FETCH_FAILURE });
	    });
	  };
	}

/***/ },
/* 291 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _extends = __webpack_require__(259)['default'];
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	exports.update = update;
	exports.startStream = startStream;
	exports.stopStream = stopStream;
	
	var _lib = __webpack_require__(223);
	
	var _constantsActions = __webpack_require__(276);
	
	var refreshInterval = 1 * 1000;
	
	function update() {
	  return function (dispatch) {
	    _lib.client.get('status').then(function (result) {
	      dispatch(_extends({}, result, { type: _constantsActions.STATUS_STREAM_UPDATE }));
	    }, function (error) {
	      console.warn('Status updated failure! Pausing poll for 10 seconds.', error);
	      dispatch(stopStream());
	      setTimeout(function () {
	        return dispatch(startStream());
	      }, refreshInterval * 10);
	    });
	  };
	}
	
	function startStream() {
	  return function (dispatch, getState) {
	    var timer = getState().Status.timer;
	
	    // Already have an active stream going, don't start a new one.
	    if (timer) {
	      return;
	    }
	
	    dispatch(update());
	    return dispatch({
	      timer: setInterval(function () {
	        return dispatch(update());
	      }, refreshInterval),
	      type: _constantsActions.STATUS_STREAM_START
	    });
	  };
	}
	
	function stopStream() {
	  return function (dispatch, getState) {
	    var timer = getState().Status.timer;
	
	    // No timer, nothing to do!
	    if (!timer) {
	      return;
	    }
	
	    clearInterval(timer);
	    return dispatch({ type: _constantsActions.STATUS_STREAM_STOP });
	  };
	}

/***/ },
/* 292 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	
	var _lib = __webpack_require__(223);
	
	var _constantsActions = __webpack_require__(276);
	
	var fetch = (0, _lib.paginatedFetcher)('tracks', [_constantsActions.TRACK_FETCH_START, _constantsActions.TRACK_FETCH_COMPLETE, _constantsActions.TRACK_FETCH_SUCCESS, _constantsActions.TRACK_FETCH_FAILURE]);
	exports.fetch = fetch;

/***/ },
/* 293 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _interopRequireDefault = __webpack_require__(7)['default'];
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	
	var _react = __webpack_require__(9);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactRouter = __webpack_require__(165);
	
	var _App = __webpack_require__(296);
	
	var _App2 = _interopRequireDefault(_App);
	
	var _NowPlaying = __webpack_require__(294);
	
	var _NowPlaying2 = _interopRequireDefault(_NowPlaying);
	
	var _Browse = __webpack_require__(298);
	
	var _Browse2 = _interopRequireDefault(_Browse);
	
	var _Queue = __webpack_require__(307);
	
	var _Queue2 = _interopRequireDefault(_Queue);
	
	var _Admin = __webpack_require__(394);
	
	var _Admin2 = _interopRequireDefault(_Admin);
	
	exports['default'] = _react2['default'].createElement(
	  _reactRouter.Route,
	  { component: _App2['default'] },
	  _react2['default'].createElement(_reactRouter.Route, { path: '/', component: _NowPlaying2['default'] }),
	  _react2['default'].createElement(_reactRouter.Route, { path: '/browse', component: _Browse2['default'] }),
	  _react2['default'].createElement(_reactRouter.Route, { path: '/queue', component: _Queue2['default'] }),
	  _react2['default'].createElement(_reactRouter.Route, { path: '/admin', component: _Admin2['default'] })
	);
	module.exports = exports['default'];

/***/ },
/* 294 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _createClass = __webpack_require__(1)['default'];
	
	var _classCallCheck = __webpack_require__(6)['default'];
	
	var _interopRequireDefault = __webpack_require__(7)['default'];
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	
	var _react = __webpack_require__(9);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactRouter = __webpack_require__(165);
	
	var _componentsNowPlaying = __webpack_require__(295);
	
	var _componentsNowPlaying2 = _interopRequireDefault(_componentsNowPlaying);
	
	var NowPlaying = (function () {
	  function NowPlaying() {
	    _classCallCheck(this, NowPlaying);
	  }
	
	  _createClass(NowPlaying, [{
	    key: 'render',
	    value: function render() {
	      return _react2['default'].createElement(
	        'div',
	        null,
	        _react2['default'].createElement(_componentsNowPlaying2['default'], { id: 'now-playing' }),
	        _react2['default'].createElement(
	          'nav',
	          null,
	          _react2['default'].createElement(
	            _reactRouter.Link,
	            { to: 'browse' },
	            'Browse'
	          ),
	          _react2['default'].createElement(
	            _reactRouter.Link,
	            { to: 'queue' },
	            'Queue'
	          )
	        )
	      );
	    }
	  }]);
	
	  return NowPlaying;
	})();
	
	exports['default'] = NowPlaying;
	module.exports = exports['default'];

/***/ },
/* 295 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _createClass = __webpack_require__(1)['default'];
	
	var _classCallCheck = __webpack_require__(6)['default'];
	
	var _interopRequireDefault = __webpack_require__(7)['default'];
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	
	var _react = __webpack_require__(9);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reduxReact = __webpack_require__(205);
	
	var _lib = __webpack_require__(223);
	
	var _ProgressBar = __webpack_require__(273);
	
	var _ProgressBar2 = _interopRequireDefault(_ProgressBar);
	
	var _actions = __webpack_require__(274);
	
	var NowPlaying = (function () {
	  function NowPlaying() {
	    _classCallCheck(this, _NowPlaying);
	  }
	
	  _createClass(NowPlaying, [{
	    key: 'render',
	    value: function render() {
	      if (this.props.stopped) {
	        return _react2['default'].createElement(
	          'section',
	          { id: this.props.id },
	          'Nothing Playing! You should pick a song...'
	        );
	      }
	
	      var _props = this.props;
	      var position = _props.position;
	      var track = _props.track;
	
	      return _react2['default'].createElement(
	        'section',
	        { id: this.props.id },
	        _react2['default'].createElement(
	          'h3',
	          { className: 'track-title' },
	          track.name
	        ),
	        _react2['default'].createElement(
	          'h4',
	          { className: 'artist-name' },
	          track.artist.name
	        ),
	        _react2['default'].createElement(
	          'div',
	          { className: 'runtime' },
	          _react2['default'].createElement(
	            'span',
	            { className: 'position' },
	            this.formatTime(position)
	          ),
	          '/',
	          _react2['default'].createElement(
	            'span',
	            { className: 'length' },
	            this.formatTime(track.runtime)
	          )
	        ),
	        _react2['default'].createElement(_ProgressBar2['default'], { current: position, maximum: track.runtime })
	      );
	    }
	  }, {
	    key: 'formatTime',
	    value: function formatTime(time) {
	      var minutes = Math.floor(time / 60),
	          seconds = Math.round(time % 60).toString();
	
	      if (seconds.length === 1) {
	        seconds = '0' + seconds;
	      }
	
	      return minutes + ':' + seconds;
	    }
	  }], [{
	    key: 'propTypes',
	    value: {
	      playing: _react.PropTypes.bool,
	      paused: _react.PropTypes.bool,
	      stopped: _react.PropTypes.bool,
	      position: _react.PropTypes.number,
	      track: _react.PropTypes.object,
	      id: _react.PropTypes.string.isRequired
	    },
	    enumerable: true
	  }]);
	
	  var _NowPlaying = NowPlaying;
	  NowPlaying = (0, _reduxReact.connect)(function (state) {
	    return (0, _lib.slice)(state.Status, 'playing', 'paused', 'stopped', 'position', 'track');
	  })(NowPlaying) || NowPlaying;
	  return NowPlaying;
	})();
	
	exports['default'] = NowPlaying;
	module.exports = exports['default'];

/***/ },
/* 296 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _createClass = __webpack_require__(1)['default'];
	
	var _classCallCheck = __webpack_require__(6)['default'];
	
	var _interopRequireDefault = __webpack_require__(7)['default'];
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	
	var _react = __webpack_require__(9);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactRouter = __webpack_require__(165);
	
	var _componentsAdminPanel = __webpack_require__(297);
	
	var _componentsAdminPanel2 = _interopRequireDefault(_componentsAdminPanel);
	
	var _componentsNowPlaying = __webpack_require__(295);
	
	var _componentsNowPlaying2 = _interopRequireDefault(_componentsNowPlaying);
	
	var App = (function () {
	  function App() {
	    _classCallCheck(this, App);
	  }
	
	  _createClass(App, [{
	    key: 'render',
	    value: function render() {
	      return _react2['default'].createElement(
	        'div',
	        null,
	        _react2['default'].createElement(
	          'section',
	          { id: 'content' },
	          this.props.children
	        ),
	        _react2['default'].createElement(_componentsAdminPanel2['default'], null),
	        _react2['default'].createElement(_componentsNowPlaying2['default'], { id: 'status' })
	      );
	    }
	  }]);
	
	  return App;
	})();
	
	exports['default'] = App;
	module.exports = exports['default'];

/***/ },
/* 297 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _createClass = __webpack_require__(1)['default'];
	
	var _classCallCheck = __webpack_require__(6)['default'];
	
	var _interopRequireDefault = __webpack_require__(7)['default'];
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	
	var _react = __webpack_require__(9);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _redux = __webpack_require__(195);
	
	var _reduxReact = __webpack_require__(205);
	
	var _actions = __webpack_require__(274);
	
	var AdminPanel = (function () {
	  function AdminPanel() {
	    _classCallCheck(this, _AdminPanel);
	  }
	
	  _createClass(AdminPanel, [{
	    key: 'componentWillMount',
	    value: function componentWillMount() {
	      this.boundLogin = this.login.bind(this);
	      this.actions = (0, _redux.bindActionCreators)(_actions.adminActions, this.props.dispatch);
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      if (!this.props.isAdmin) {
	        return _react2['default'].createElement(
	          'section',
	          { id: 'admin' },
	          _react2['default'].createElement(
	            'div',
	            { className: 'btn-group' },
	            _react2['default'].createElement(
	              'button',
	              { className: 'btn btn-default login' },
	              _react2['default'].createElement('i', { onClick: this.boundLogin, className: 'fa fa-2x fa-gear' })
	            )
	          )
	        );
	      }
	
	      var toggleButton = undefined;
	      if (this.props.playing) {
	        toggleButton = _react2['default'].createElement(
	          'button',
	          { className: 'btn btn-default pause', onClick: this.actions.pause },
	          _react2['default'].createElement('i', { className: 'fa fa-2x fa-pause' })
	        );
	      } else {
	        toggleButton = _react2['default'].createElement(
	          'button',
	          { className: 'btn btn-default play', onClick: this.actions.play },
	          _react2['default'].createElement('i', { className: 'fa fa-2x fa-play' })
	        );
	      }
	
	      return _react2['default'].createElement(
	        'section',
	        { id: 'admin' },
	        _react2['default'].createElement(
	          'div',
	          { className: 'btn-group' },
	          toggleButton,
	          _react2['default'].createElement(
	            'button',
	            { className: 'btn btn-default skip', onClick: this.actions.skip },
	            _react2['default'].createElement('i', { className: 'fa fa-2x fa-forward' })
	          ),
	          _react2['default'].createElement(
	            'button',
	            { className: 'btn btn-default dash', onClick: this.clickTo('admin') },
	            _react2['default'].createElement('i', { className: 'fa fa-2x fa-dashboard' })
	          )
	        )
	      );
	    }
	  }, {
	    key: 'login',
	    value: function login() {
	      var password = prompt('Enter your password!');
	      this.actions.login(password);
	    }
	  }, {
	    key: 'clickTo',
	    value: function clickTo(page) {
	      var _this = this;
	
	      return function () {
	        return _this.context.router.transitionTo(page);
	      };
	    }
	  }], [{
	    key: 'propTypes',
	    value: {
	      isAdmin: _react.PropTypes.bool.isRequired
	    },
	    enumerable: true
	  }, {
	    key: 'contextTypes',
	    value: {
	      router: _react.PropTypes.object.isRequired
	    },
	    enumerable: true
	  }]);
	
	  var _AdminPanel = AdminPanel;
	  AdminPanel = (0, _reduxReact.connect)(function (state) {
	    return {
	      isAdmin: state.Admin.isAdmin,
	      status: state.Status.playing
	    };
	  })(AdminPanel) || AdminPanel;
	  return AdminPanel;
	})();
	
	exports['default'] = AdminPanel;
	module.exports = exports['default'];

/***/ },
/* 298 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _createClass = __webpack_require__(1)['default'];
	
	var _classCallCheck = __webpack_require__(6)['default'];
	
	var _get = __webpack_require__(299)['default'];
	
	var _inherits = __webpack_require__(304)['default'];
	
	var _getIterator = __webpack_require__(266)['default'];
	
	var _Set = __webpack_require__(278)['default'];
	
	var _interopRequireDefault = __webpack_require__(7)['default'];
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	
	var _react = __webpack_require__(9);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reduxReact = __webpack_require__(205);
	
	var _lib = __webpack_require__(223);
	
	var _actions = __webpack_require__(274);
	
	// So we get this.props.dispatch!
	
	var SearchBox = (function () {
	  function SearchBox() {
	    _classCallCheck(this, _SearchBox);
	  }
	
	  _createClass(SearchBox, [{
	    key: 'componentWillMount',
	    value: function componentWillMount() {
	      this.sendUpdateLater = (0, _lib.debounce)(this.sendUpdate.bind(this), 150);
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      return _react2['default'].createElement(
	        'section',
	        { className: 'search' },
	        _react2['default'].createElement('input', {
	          type: 'search', ref: 'search',
	          className: 'search-box',
	          placeholder: 'Search by Artist, Album or Track',
	          onChange: this.sendUpdateLater })
	      );
	    }
	  }, {
	    key: 'sendUpdate',
	    value: function sendUpdate() {
	      var searchTerm = this.refs.search.getDOMNode().value;
	      if (searchTerm.length >= 3) {
	        this.props.dispatch(_actions.browseActions.setSearch(searchTerm));
	      }
	    }
	  }]);
	
	  var _SearchBox = SearchBox;
	  SearchBox = (0, _reduxReact.connect)(function (state) {
	    return {};
	  })(SearchBox) || SearchBox;
	  return SearchBox;
	})();
	
	var FilterList = (function () {
	  function FilterList() {
	    _classCallCheck(this, FilterList);
	  }
	
	  _createClass(FilterList, [{
	    key: 'isVisible',
	    value: function isVisible(item) {
	      return true;
	    }
	  }, {
	    key: 'clickHandler',
	    value: function clickHandler() {}
	  }, {
	    key: 'checkAccess',
	    value: function checkAccess(list, item) {
	      if (list) {
	        var _iteratorNormalCompletion = true;
	        var _didIteratorError = false;
	        var _iteratorError = undefined;
	
	        try {
	          for (var _iterator = _getIterator(list), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	            var entry = _step.value;
	
	            if (entry.id === item.id) {
	              return true;
	            }
	          }
	        } catch (err) {
	          _didIteratorError = true;
	          _iteratorError = err;
	        } finally {
	          try {
	            if (!_iteratorNormalCompletion && _iterator['return']) {
	              _iterator['return']();
	            }
	          } finally {
	            if (_didIteratorError) {
	              throw _iteratorError;
	            }
	          }
	        }
	      }
	      return false;
	    }
	  }, {
	    key: 'isBlocked',
	    value: function isBlocked(item) {
	      return this.checkAccess(this.props.blocked, item);
	    }
	  }, {
	    key: 'isAllowed',
	    value: function isAllowed(item) {
	      return this.checkAccess(this.props.allowed, item);
	    }
	  }, {
	    key: 'accessListButtons',
	    value: function accessListButtons(type, item) {
	      if (!this.props.isAdmin) {
	        return;
	      } else if (this.isAllowed(item)) {
	        return _react2['default'].createElement(
	          'button',
	          { onClick: this.removeHandler(type, item) },
	          'Remove Whitelist'
	        );
	      } else if (this.isBlocked(item)) {
	        return _react2['default'].createElement(
	          'button',
	          { onClick: this.removeHandler(type, item) },
	          'Remove Blacklist'
	        );
	      } else {
	        return _react2['default'].createElement(
	          'div',
	          { className: 'btn-group' },
	          _react2['default'].createElement(
	            'button',
	            { onClick: this.whitelistHandler(type, item) },
	            'Whitelist'
	          ),
	          _react2['default'].createElement(
	            'button',
	            { onClick: this.blacklistHandler(type, item) },
	            'Blacklist'
	          )
	        );
	      }
	    }
	  }, {
	    key: 'removeHandler',
	    value: function removeHandler(type, item) {
	      var _this = this;
	
	      return function () {
	        return _this.props.dispatch(_actions.accessListActions.remove(type, item));
	      };
	    }
	  }, {
	    key: 'whitelistHandler',
	    value: function whitelistHandler(type, item) {
	      var _this2 = this;
	
	      return function () {
	        return _this2.props.dispatch(_actions.accessListActions.whitelist(type, item));
	      };
	    }
	  }, {
	    key: 'blacklistHandler',
	    value: function blacklistHandler(type, item) {
	      var _this3 = this;
	
	      return function () {
	        return _this3.props.dispatch(_actions.accessListActions.blacklist(type, item));
	      };
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var _this4 = this;
	
	      var items = this.props.items;
	
	      return _react2['default'].createElement(
	        'ul',
	        { className: this.props.className },
	        items.map(function (item) {
	          if (_this4.isVisible(item)) {
	            return _this4.renderItem(item);
	          }
	        })
	      );
	    }
	  }], [{
	    key: 'propTypes',
	    value: {
	      items: _react.PropTypes.array.isRequired,
	      genre: _react.PropTypes.number,
	      artist: _react.PropTypes.number,
	      allowed: _react.PropTypes.instanceOf(_Set),
	      blocked: _react.PropTypes.instanceOf(_Set),
	      search: _react.PropTypes.string
	    },
	    enumerable: true
	  }]);
	
	  return FilterList;
	})();
	
	var GenreList = (function (_FilterList) {
	  function GenreList() {
	    _classCallCheck(this, _GenreList);
	
	    _get(Object.getPrototypeOf(_GenreList.prototype), 'constructor', this).apply(this, arguments);
	  }
	
	  _inherits(GenreList, _FilterList);
	
	  _createClass(GenreList, [{
	    key: 'renderItem',
	    value: function renderItem(genre) {
	      // If we're an admin we want to see the Blacklist/Whitelist buttons.
	      return _react2['default'].createElement(
	        'li',
	        { key: genre.id },
	        _react2['default'].createElement(
	          'a',
	          { onClick: this.clickHandler(genre) },
	          genre.name
	        ),
	        this.accessListButtons('genre', genre)
	      );
	    }
	  }, {
	    key: 'clickHandler',
	    value: function clickHandler(genre) {
	      var _this5 = this;
	
	      return function () {
	        return _this5.props.dispatch(_actions.browseActions.selectGenre(genre.id));
	      };
	    }
	  }]);
	
	  var _GenreList = GenreList;
	  GenreList = (0, _reduxReact.connect)(function (state) {
	    return {
	      items: state.Genres.genres,
	      allowed: state.AccessList.allowed_genres,
	      blocked: state.AccessList.blocked_genres,
	      isAdmin: state.Admin.isAdmin
	    };
	  })(GenreList) || GenreList;
	  return GenreList;
	})(FilterList);
	
	var ArtistList = (function (_FilterList2) {
	  function ArtistList() {
	    _classCallCheck(this, _ArtistList);
	
	    _get(Object.getPrototypeOf(_ArtistList.prototype), 'constructor', this).apply(this, arguments);
	  }
	
	  _inherits(ArtistList, _FilterList2);
	
	  _createClass(ArtistList, [{
	    key: 'isVisible',
	    value: function isVisible(artist) {
	      if (this.props.search) {
	        return artist.name.toLowerCase().indexOf(this.props.search.toLowerCase()) >= 0;
	      }
	      if (this.props.genre) {
	        return artist.genres.indexOf(this.props.genre) >= 0;
	      }
	
	      return true;
	    }
	  }, {
	    key: 'renderItem',
	    value: function renderItem(artist) {
	      return _react2['default'].createElement(
	        'li',
	        { key: artist.id },
	        _react2['default'].createElement(
	          'a',
	          { onClick: this.clickHandler(artist) },
	          artist.name
	        ),
	        this.accessListButtons('artist', artist)
	      );
	    }
	  }, {
	    key: 'clickHandler',
	    value: function clickHandler(artist) {
	      var _this6 = this;
	
	      return function () {
	        return _this6.props.dispatch(_actions.browseActions.selectArtist(artist.id));
	      };
	    }
	  }]);
	
	  var _ArtistList = ArtistList;
	  ArtistList = (0, _reduxReact.connect)(function (state) {
	    return {
	      items: state.Artists.artists,
	      genre: state.Browse.genre,
	      search: state.Browse.search,
	      allowed: state.AccessList.allowed_artists,
	      blocked: state.AccessList.blocked_artists,
	      isAdmin: state.Admin.isAdmin
	    };
	  })(ArtistList) || ArtistList;
	  return ArtistList;
	})(FilterList);
	
	var TrackList = (function (_FilterList3) {
	  function TrackList() {
	    _classCallCheck(this, _TrackList);
	
	    _get(Object.getPrototypeOf(_TrackList.prototype), 'constructor', this).apply(this, arguments);
	  }
	
	  _inherits(TrackList, _FilterList3);
	
	  _createClass(TrackList, [{
	    key: 'isVisible',
	    value: function isVisible(track) {
	      if (this.props.artist) {
	        return track.artist.id === this.props.artist;
	      }
	      if (this.props.search) {
	        return this.searchField(track.name) || this.searchField(track.artist.name) || this.searchField(track.album.name);
	      }
	
	      return false;
	    }
	  }, {
	    key: 'searchField',
	    value: function searchField(field) {
	      return field.toLowerCase().indexOf(this.props.search.toLowerCase()) >= 0;
	    }
	  }, {
	    key: 'renderItem',
	    value: function renderItem(track) {
	      var playNowButton = undefined;
	      if (this.props.isAdmin) {
	        playNowButton = _react2['default'].createElement(
	          'button',
	          { className: 'play-now', onClick: this.playNowHandler(track) },
	          'Play Now!'
	        );
	      }
	
	      return _react2['default'].createElement(
	        'li',
	        { key: track.id, onClick: this.clickHandler(track) },
	        _react2['default'].createElement(
	          'a',
	          { onClick: this.clickHandler(track) },
	          track.track_num,
	          '. ',
	          track.name,
	          _react2['default'].createElement(
	            'small',
	            null,
	            ' on ',
	            _react2['default'].createElement(
	              'strong',
	              null,
	              track.album.name
	            ),
	            ' by ',
	            _react2['default'].createElement(
	              'strong',
	              null,
	              track.artist.name
	            )
	          )
	        ),
	        playNowButton
	      );
	    }
	  }, {
	    key: 'clickHandler',
	    value: function clickHandler(track) {
	      var _this7 = this;
	
	      return function () {
	        return _this7.props.dispatch(_actions.queueActions.add(track));
	      };
	    }
	  }, {
	    key: 'playNowHandler',
	    value: function playNowHandler(track) {
	      var _this8 = this;
	
	      return function () {
	        return _this8.props.dispatch(_actions.adminActions.playNow(track));
	      };
	    }
	  }]);
	
	  var _TrackList = TrackList;
	  TrackList = (0, _reduxReact.connect)(function (state) {
	    return {
	      items: state.Tracks.tracks,
	      artist: state.Browse.artist,
	      search: state.Browse.search,
	      isAdmin: state.Admin.isAdmin
	    };
	  })(TrackList) || TrackList;
	  return TrackList;
	})(FilterList);
	
	var QueueList = (function () {
	  function QueueList() {
	    _classCallCheck(this, _QueueList);
	  }
	
	  _createClass(QueueList, [{
	    key: 'componentWillMount',
	    value: function componentWillMount() {
	      this.boundSend = this.sendQueue.bind(this);
	      this.boundCancel = this.cancelQueue.bind(this);
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var _this9 = this;
	
	      var queue = this.props.queue;
	
	      return _react2['default'].createElement(
	        'section',
	        { className: 'queue' },
	        queue.length,
	        ' / 10 items ready to queue.',
	        _react2['default'].createElement(
	          'button',
	          { onClick: this.boundSend },
	          'Queue Now'
	        ),
	        _react2['default'].createElement(
	          'button',
	          { onClick: this.boundCancel },
	          'Cancel'
	        ),
	        _react2['default'].createElement(
	          'ol',
	          { className: 'queue-list' },
	          queue.map(function (track) {
	            return _react2['default'].createElement(
	              'li',
	              { key: track.id },
	              track.name,
	              ' by ',
	              track.artist.name,
	              _react2['default'].createElement(
	                'a',
	                { className: 'remove', onClick: _this9.removeHandler(track) },
	                'X'
	              ),
	              _react2['default'].createElement(
	                'a',
	                { className: 'move-up', onClick: _this9.moveUpHandler(track) },
	                'U'
	              ),
	              _react2['default'].createElement(
	                'a',
	                { className: 'move-down', onClick: _this9.moveDownHandler(track) },
	                'D'
	              )
	            );
	          })
	        )
	      );
	    }
	  }, {
	    key: 'cancelQueue',
	    value: function cancelQueue() {
	      this.props.dispatch(_actions.queueActions.clear());
	      this.context.router.transitionTo('/');
	    }
	  }, {
	    key: 'sendQueue',
	    value: function sendQueue() {
	      if (this.props.queue.length === 0) {
	        alert('You have nothing to queue!');
	        return;
	      }
	
	      var name = prompt('Enter a name for mocking purposes, or click cancel to go back to browsing');
	      if (name === null) {
	        return;
	      }
	
	      this.props.dispatch(_actions.queueActions.send(name));
	      this.context.router.transitionTo('/');
	    }
	  }, {
	    key: 'removeHandler',
	    value: function removeHandler(track) {
	      var _this10 = this;
	
	      return function () {
	        return _this10.props.dispatch(_actions.queueActions.remove(track));
	      };
	    }
	  }, {
	    key: 'moveUpHandler',
	    value: function moveUpHandler(track) {
	      var _this11 = this;
	
	      return function () {
	        return _this11.props.dispatch(_actions.queueActions.up(track));
	      };
	    }
	  }, {
	    key: 'moveDownHandler',
	    value: function moveDownHandler(track) {
	      var _this12 = this;
	
	      return function () {
	        return _this12.props.dispatch(_actions.queueActions.down(track));
	      };
	    }
	  }], [{
	    key: 'propTypes',
	    value: {
	      queue: _react.PropTypes.array.isRequired
	    },
	    enumerable: true
	  }, {
	    key: 'contextTypes',
	    value: {
	      router: _react.PropTypes.object.isRequired
	    },
	    enumerable: true
	  }]);
	
	  var _QueueList = QueueList;
	  QueueList = (0, _reduxReact.connect)(function (state) {
	    return {
	      queue: state.Queue.queue
	    };
	  })(QueueList) || QueueList;
	  return QueueList;
	})();
	
	// Gives us this.props.dispatch
	
	var Browse = (function () {
	  function Browse() {
	    _classCallCheck(this, _Browse);
	  }
	
	  _createClass(Browse, [{
	    key: 'componentWillMount',
	    value: function componentWillMount() {
	      var _this13 = this;
	
	      this.updateData();
	
	      // Refresh the access lists every couple of seconds so it doesn't get super stale
	      this.timer = setInterval(function () {
	        return _this13.updateData();
	      }, 2 * 1000);
	    }
	  }, {
	    key: 'componentWillUnmount',
	    value: function componentWillUnmount() {
	      clearInterval(this.timer);
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      return _react2['default'].createElement(
	        'div',
	        { id: 'browse-page' },
	        _react2['default'].createElement(SearchBox, null),
	        _react2['default'].createElement(GenreList, { className: 'genres' }),
	        _react2['default'].createElement(ArtistList, { className: 'artists' }),
	        _react2['default'].createElement(TrackList, { className: 'tracks' }),
	        _react2['default'].createElement(QueueList, null)
	      );
	    }
	  }, {
	    key: 'updateData',
	    value: function updateData() {
	      this.props.dispatch(_actions.accessListActions.fetch());
	    }
	  }]);
	
	  var _Browse = Browse;
	  Browse = (0, _reduxReact.connect)(function (state) {
	    return {};
	  })(Browse) || Browse;
	  return Browse;
	})();
	
	exports['default'] = Browse;
	module.exports = exports['default'];

	// no-op

/***/ },
/* 299 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _Object$getOwnPropertyDescriptor = __webpack_require__(300)["default"];
	
	exports["default"] = function get(_x, _x2, _x3) {
	  var _again = true;
	
	  _function: while (_again) {
	    var object = _x,
	        property = _x2,
	        receiver = _x3;
	    desc = parent = getter = undefined;
	    _again = false;
	    if (object === null) object = Function.prototype;
	
	    var desc = _Object$getOwnPropertyDescriptor(object, property);
	
	    if (desc === undefined) {
	      var parent = Object.getPrototypeOf(object);
	
	      if (parent === null) {
	        return undefined;
	      } else {
	        _x = parent;
	        _x2 = property;
	        _x3 = receiver;
	        _again = true;
	        continue _function;
	      }
	    } else if ("value" in desc) {
	      return desc.value;
	    } else {
	      var getter = desc.get;
	
	      if (getter === undefined) {
	        return undefined;
	      }
	
	      return getter.call(receiver);
	    }
	  }
	};
	
	exports.__esModule = true;

/***/ },
/* 300 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(301), __esModule: true };

/***/ },
/* 301 */
/***/ function(module, exports, __webpack_require__) {

	var $ = __webpack_require__(4);
	__webpack_require__(302);
	module.exports = function getOwnPropertyDescriptor(it, key){
	  return $.getDesc(it, key);
	};

/***/ },
/* 302 */
/***/ function(module, exports, __webpack_require__) {

	var $        = __webpack_require__(4)
	  , $def     = __webpack_require__(222)
	  , isObject = $.isObject
	  , toObject = $.toObject;
	$.each.call(('freeze,seal,preventExtensions,isFrozen,isSealed,isExtensible,' +
	  'getOwnPropertyDescriptor,getPrototypeOf,keys,getOwnPropertyNames').split(',')
	, function(KEY, ID){
	  var fn     = ($.core.Object || {})[KEY] || Object[KEY]
	    , forced = 0
	    , method = {};
	  method[KEY] = ID == 0 ? function freeze(it){
	    return isObject(it) ? fn(it) : it;
	  } : ID == 1 ? function seal(it){
	    return isObject(it) ? fn(it) : it;
	  } : ID == 2 ? function preventExtensions(it){
	    return isObject(it) ? fn(it) : it;
	  } : ID == 3 ? function isFrozen(it){
	    return isObject(it) ? fn(it) : true;
	  } : ID == 4 ? function isSealed(it){
	    return isObject(it) ? fn(it) : true;
	  } : ID == 5 ? function isExtensible(it){
	    return isObject(it) ? fn(it) : false;
	  } : ID == 6 ? function getOwnPropertyDescriptor(it, key){
	    return fn(toObject(it), key);
	  } : ID == 7 ? function getPrototypeOf(it){
	    return fn(Object($.assertDefined(it)));
	  } : ID == 8 ? function keys(it){
	    return fn(toObject(it));
	  } : __webpack_require__(303).get;
	  try {
	    fn('z');
	  } catch(e){
	    forced = 1;
	  }
	  $def($def.S + $def.F * forced, 'Object', method);
	});

/***/ },
/* 303 */
/***/ function(module, exports, __webpack_require__) {

	// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
	var $ = __webpack_require__(4)
	  , toString = {}.toString
	  , getNames = $.getNames;
	
	var windowNames = typeof window == 'object' && Object.getOwnPropertyNames
	  ? Object.getOwnPropertyNames(window) : [];
	
	function getWindowNames(it){
	  try {
	    return getNames(it);
	  } catch(e){
	    return windowNames.slice();
	  }
	}
	
	module.exports.get = function getOwnPropertyNames(it){
	  if(windowNames && toString.call(it) == '[object Window]')return getWindowNames(it);
	  return getNames($.toObject(it));
	};

/***/ },
/* 304 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _Object$create = __webpack_require__(305)["default"];
	
	exports["default"] = function (subClass, superClass) {
	  if (typeof superClass !== "function" && superClass !== null) {
	    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
	  }
	
	  subClass.prototype = _Object$create(superClass && superClass.prototype, {
	    constructor: {
	      value: subClass,
	      enumerable: false,
	      writable: true,
	      configurable: true
	    }
	  });
	  if (superClass) subClass.__proto__ = superClass;
	};
	
	exports.__esModule = true;

/***/ },
/* 305 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(306), __esModule: true };

/***/ },
/* 306 */
/***/ function(module, exports, __webpack_require__) {

	var $ = __webpack_require__(4);
	module.exports = function create(P, D){
	  return $.create(P, D);
	};

/***/ },
/* 307 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _createClass = __webpack_require__(1)['default'];
	
	var _classCallCheck = __webpack_require__(6)['default'];
	
	var _interopRequireDefault = __webpack_require__(7)['default'];
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	
	var _react = __webpack_require__(9);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _moment = __webpack_require__(308);
	
	var _moment2 = _interopRequireDefault(_moment);
	
	var _reactRouter = __webpack_require__(165);
	
	var _reduxReact = __webpack_require__(205);
	
	var _actions = __webpack_require__(274);
	
	var Queue = (function () {
	  function Queue() {
	    _classCallCheck(this, _Queue);
	  }
	
	  _createClass(Queue, [{
	    key: 'componentWillMount',
	    value: function componentWillMount() {
	      var _this = this;
	
	      this.updateData();
	
	      // Refresh the upcoming queue and history list every couple of seconds so it doesn't get super stale
	      this.timer = setInterval(function () {
	        return _this.updateData();
	      }, 5 * 1000);
	    }
	  }, {
	    key: 'componentWillUnmount',
	    value: function componentWillUnmount() {
	      clearInterval(this.timer);
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var history = this.props.history;
	
	      return _react2['default'].createElement(
	        'section',
	        { id: 'queue' },
	        _react2['default'].createElement(
	          'nav',
	          null,
	          _react2['default'].createElement(
	            _reactRouter.Link,
	            { to: '/' },
	            'Now Playing'
	          ),
	          _react2['default'].createElement(
	            _reactRouter.Link,
	            { to: 'browse' },
	            'Browse'
	          )
	        ),
	        _react2['default'].createElement(
	          'h1',
	          null,
	          'Upcoming Tracks'
	        ),
	        this.props.upcoming.length === 0 ? this.renderNothingComing() : this.renderUpcoming(),
	        _react2['default'].createElement(
	          'h3',
	          null,
	          'Recently Played'
	        ),
	        _react2['default'].createElement(
	          'ol',
	          null,
	          history.map(function (history) {
	            var track = history.track;
	            var selection = history.selection;
	
	            var chosenBy = undefined;
	            if (selection) {
	              chosenBy = _react2['default'].createElement(
	                'small',
	                null,
	                '(requested by ',
	                _react2['default'].createElement(
	                  'strong',
	                  null,
	                  selection.requested_by,
	                  ')'
	                )
	              );
	            }
	
	            return _react2['default'].createElement(
	              'li',
	              { key: history.id },
	              _react2['default'].createElement(
	                'strong',
	                null,
	                track.name
	              ),
	              _react2['default'].createElement(
	                'small',
	                null,
	                ' off of ',
	                _react2['default'].createElement(
	                  'strong',
	                  null,
	                  track.album.name
	                ),
	                ' by ',
	                _react2['default'].createElement(
	                  'strong',
	                  null,
	                  track.artist.name
	                )
	              ),
	              ' ',
	              _react2['default'].createElement(
	                'em',
	                null,
	                (0, _moment2['default'])(history.played_at).fromNow()
	              ),
	              ' ',
	              chosenBy
	            );
	          })
	        )
	      );
	    }
	  }, {
	    key: 'renderUpcoming',
	    value: function renderUpcoming() {
	      var upcoming = this.props.upcoming;
	
	      return _react2['default'].createElement(
	        'ol',
	        null,
	        upcoming.map(function (selection) {
	          return _react2['default'].createElement(
	            'li',
	            { key: selection.id },
	            selection.track.name
	          );
	        })
	      );
	    }
	  }, {
	    key: 'renderNothingComing',
	    value: function renderNothingComing() {
	      return _react2['default'].createElement(
	        'p',
	        null,
	        _react2['default'].createElement(
	          'strong',
	          null,
	          'There is nothing queued!'
	        )
	      );
	    }
	  }, {
	    key: 'updateData',
	    value: function updateData() {
	      this.props.dispatch(_actions.queueActions.fetch());
	      this.props.dispatch(_actions.historyActions.fetch());
	    }
	  }], [{
	    key: 'propTypes',
	    value: {
	      upcoming: _react.PropTypes.array.isRequired,
	      history: _react.PropTypes.array.isRequired
	    },
	    enumerable: true
	  }]);
	
	  var _Queue = Queue;
	  Queue = (0, _reduxReact.connect)(function (state) {
	    return {
	      upcoming: state.Queue.upcoming,
	      history: state.History.history
	    };
	  })(Queue) || Queue;
	  return Queue;
	})();
	
	exports['default'] = Queue;
	module.exports = exports['default'];

/***/ },
/* 308 */,
/* 309 */,
/* 310 */,
/* 311 */,
/* 312 */,
/* 313 */,
/* 314 */,
/* 315 */,
/* 316 */,
/* 317 */,
/* 318 */,
/* 319 */,
/* 320 */,
/* 321 */,
/* 322 */,
/* 323 */,
/* 324 */,
/* 325 */,
/* 326 */,
/* 327 */,
/* 328 */,
/* 329 */,
/* 330 */,
/* 331 */,
/* 332 */,
/* 333 */,
/* 334 */,
/* 335 */,
/* 336 */,
/* 337 */,
/* 338 */,
/* 339 */,
/* 340 */,
/* 341 */,
/* 342 */,
/* 343 */,
/* 344 */,
/* 345 */,
/* 346 */,
/* 347 */,
/* 348 */,
/* 349 */,
/* 350 */,
/* 351 */,
/* 352 */,
/* 353 */,
/* 354 */,
/* 355 */,
/* 356 */,
/* 357 */,
/* 358 */,
/* 359 */,
/* 360 */,
/* 361 */,
/* 362 */,
/* 363 */,
/* 364 */,
/* 365 */,
/* 366 */,
/* 367 */,
/* 368 */,
/* 369 */,
/* 370 */,
/* 371 */,
/* 372 */,
/* 373 */,
/* 374 */,
/* 375 */,
/* 376 */,
/* 377 */,
/* 378 */,
/* 379 */,
/* 380 */,
/* 381 */,
/* 382 */,
/* 383 */,
/* 384 */,
/* 385 */,
/* 386 */,
/* 387 */,
/* 388 */,
/* 389 */,
/* 390 */,
/* 391 */,
/* 392 */,
/* 393 */,
/* 394 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _createClass = __webpack_require__(1)['default'];
	
	var _classCallCheck = __webpack_require__(6)['default'];
	
	var _extends = __webpack_require__(259)['default'];
	
	var _getIterator = __webpack_require__(266)['default'];
	
	var _Set = __webpack_require__(278)['default'];
	
	var _interopRequireDefault = __webpack_require__(7)['default'];
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	
	var _react = __webpack_require__(9);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactRouter = __webpack_require__(165);
	
	var _reduxReact = __webpack_require__(205);
	
	var _actions = __webpack_require__(274);
	
	var Admin = (function () {
	  function Admin() {
	    _classCallCheck(this, _Admin);
	  }
	
	  _createClass(Admin, [{
	    key: 'componentWillMount',
	    value: function componentWillMount() {
	      var _this = this;
	
	      this.updateData();
	      this.boundSave = this.saveList.bind(this);
	
	      // Refresh the access lists every couple of seconds so it doesn't get super stale
	      this.timer = setInterval(function () {
	        return _this.updateData();
	      }, 2 * 1000);
	    }
	  }, {
	    key: 'componentWillUnmount',
	    value: function componentWillUnmount() {
	      clearInterval(this.timer);
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var _this2 = this;
	
	      if (!this.props.isAdmin) {
	        setTimeout(function () {
	          return _this2.context.router.transitionTo('/');
	        }, 1);
	        return _react2['default'].createElement('div', null);
	      }
	
	      return _react2['default'].createElement(
	        'div',
	        { id: 'dashboard' },
	        _react2['default'].createElement(
	          'nav',
	          null,
	          _react2['default'].createElement(
	            _reactRouter.Link,
	            { to: '/' },
	            'Now Playing'
	          ),
	          _react2['default'].createElement(
	            _reactRouter.Link,
	            { to: 'browse' },
	            'Browse'
	          ),
	          _react2['default'].createElement(
	            _reactRouter.Link,
	            { to: 'queue' },
	            'Queue'
	          )
	        ),
	        _react2['default'].createElement(
	          'button',
	          { className: 'save-list', onClick: this.boundSave },
	          'Save this List!'
	        ),
	        _react2['default'].createElement(
	          'section',
	          { className: 'rules' },
	          _react2['default'].createElement(
	            'h3',
	            null,
	            'Allowed Genres'
	          ),
	          this.showList('genre', 'allowed'),
	          _react2['default'].createElement(
	            'h3',
	            null,
	            'Blocked Genres'
	          ),
	          this.showList('genre', 'blocked'),
	          _react2['default'].createElement(
	            'h3',
	            null,
	            'Allowed Artists'
	          ),
	          this.showList('artist', 'allowed'),
	          _react2['default'].createElement(
	            'h3',
	            null,
	            'Blocked Artists'
	          ),
	          this.showList('artist', 'blocked')
	        ),
	        _react2['default'].createElement(
	          'ul',
	          { className: 'lists' },
	          (this.props.saved_lists || []).map(function (list) {
	            return _react2['default'].createElement(
	              'li',
	              { key: list.id },
	              list.name,
	              ' ',
	              _react2['default'].createElement(
	                'button',
	                { onClick: _this2.loadHandler(list) },
	                'Load!'
	              )
	            );
	          })
	        )
	      );
	    }
	  }, {
	    key: 'showList',
	    value: function showList(store, type) {
	      var list = this.props[type + '_' + store + 's'];
	      if (!list || list.length === 0) {
	        return _react2['default'].createElement(
	          'p',
	          null,
	          _react2['default'].createElement(
	            'strong',
	            null,
	            'Nothing here'
	          )
	        );
	      }
	
	      var items = [];
	      var _iteratorNormalCompletion = true;
	      var _didIteratorError = false;
	      var _iteratorError = undefined;
	
	      try {
	        for (var _iterator = _getIterator(list), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	          var entry = _step.value;
	
	          items.push(_react2['default'].createElement(
	            'li',
	            { key: store + '_' + type + '_' + entry.id },
	            entry.name,
	            _react2['default'].createElement(
	              'button',
	              { className: 'btn', onClick: this.clearEntry(store, entry) },
	              'Remove'
	            )
	          ));
	        }
	      } catch (err) {
	        _didIteratorError = true;
	        _iteratorError = err;
	      } finally {
	        try {
	          if (!_iteratorNormalCompletion && _iterator['return']) {
	            _iterator['return']();
	          }
	        } finally {
	          if (_didIteratorError) {
	            throw _iteratorError;
	          }
	        }
	      }
	
	      return _react2['default'].createElement(
	        'ul',
	        null,
	        items
	      );
	    }
	  }, {
	    key: 'clearEntry',
	    value: function clearEntry(store, item) {
	      var _this3 = this;
	
	      return function () {
	        return _this3.props.dispatch(_actions.accessListActions.remove(store, item));
	      };
	    }
	  }, {
	    key: 'saveList',
	    value: function saveList() {
	      var name = prompt('Give me a name for the list.');
	      if (name === null) {
	        return;
	      }
	
	      this.props.dispatch(_actions.accessListActions.save(name));
	    }
	  }, {
	    key: 'loadHandler',
	    value: function loadHandler(list) {
	      var _this4 = this;
	
	      return function () {
	        return _this4.props.dispatch(_actions.accessListActions.load(list.id));
	      };
	    }
	  }, {
	    key: 'updateData',
	    value: function updateData() {
	      this.props.dispatch(_actions.accessListActions.fetch());
	    }
	  }], [{
	    key: 'propTypes',
	    value: {
	      allowed_genres: _react.PropTypes.instanceOf(_Set),
	      blocked_genres: _react.PropTypes.instanceOf(_Set),
	      allowed_artists: _react.PropTypes.instanceOf(_Set),
	      blocked_artists: _react.PropTypes.instanceOf(_Set),
	      saved_lists: _react.PropTypes.array,
	      isAdmin: _react.PropTypes.bool.isRequired
	    },
	    enumerable: true
	  }, {
	    key: 'contextTypes',
	    value: {
	      router: _react.PropTypes.object.isRequired
	    },
	    enumerable: true
	  }]);
	
	  var _Admin = Admin;
	  Admin = (0, _reduxReact.connect)(function (state) {
	    return _extends({}, state.AccessList, {
	      isAdmin: state.Admin.isAdmin
	    });
	  })(Admin) || Admin;
	  return Admin;
	})();
	
	exports['default'] = Admin;
	module.exports = exports['default'];

/***/ },
/* 395 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _interopRequireDefault = __webpack_require__(7)['default'];
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	
	var _access_list = __webpack_require__(396);
	
	var _access_list2 = _interopRequireDefault(_access_list);
	
	exports.AccessList = _access_list2['default'];
	
	var _admin = __webpack_require__(398);
	
	var _admin2 = _interopRequireDefault(_admin);
	
	exports.Admin = _admin2['default'];
	
	var _albums = __webpack_require__(399);
	
	var _albums2 = _interopRequireDefault(_albums);
	
	exports.Albums = _albums2['default'];
	
	var _artists = __webpack_require__(400);
	
	var _artists2 = _interopRequireDefault(_artists);
	
	exports.Artists = _artists2['default'];
	
	var _browse = __webpack_require__(401);
	
	var _browse2 = _interopRequireDefault(_browse);
	
	exports.Browse = _browse2['default'];
	
	var _genres = __webpack_require__(402);
	
	var _genres2 = _interopRequireDefault(_genres);
	
	exports.Genres = _genres2['default'];
	
	var _history = __webpack_require__(403);
	
	var _history2 = _interopRequireDefault(_history);
	
	exports.History = _history2['default'];
	
	var _queue = __webpack_require__(404);
	
	var _queue2 = _interopRequireDefault(_queue);
	
	exports.Queue = _queue2['default'];
	
	var _status = __webpack_require__(405);
	
	var _status2 = _interopRequireDefault(_status);
	
	exports.Status = _status2['default'];
	
	var _tracks = __webpack_require__(406);
	
	var _tracks2 = _interopRequireDefault(_tracks);
	
	exports.Tracks = _tracks2['default'];

/***/ },
/* 396 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _extends = __webpack_require__(259)['default'];
	
	var _defineProperty = __webpack_require__(397)['default'];
	
	var _Set = __webpack_require__(278)['default'];
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	
	var _createStore;
	
	var _lib = __webpack_require__(223);
	
	var _constantsActions = __webpack_require__(276);
	
	var defaultState = {
	  loading: false
	};
	
	exports['default'] = (0, _lib.createStore)(defaultState, (_createStore = {}, _defineProperty(_createStore, _constantsActions.ACCESS_LIST_FETCH_START, function (state) {
	  return _extends({}, state, {
	    loading: true
	  });
	}), _defineProperty(_createStore, _constantsActions.ACCESS_LIST_FETCH_SUCCESS, function (state, action) {
	  return {
	    loading: false,
	    allowed_genres: new _Set(action.allow_genres),
	    blocked_genres: new _Set(action.block_genres),
	    allowed_artists: new _Set(action.allow_artists),
	    blocked_artists: new _Set(action.block_artists),
	    saved_lists: action.saved_lists
	  };
	}), _defineProperty(_createStore, _constantsActions.ACCESS_LIST_FETCH_FAILURE, function (state) {
	  return _extends({}, state, {
	    loading: false
	  });
	}), _defineProperty(_createStore, _constantsActions.ACCESS_LIST_BLACKLIST_SUCCESS, function (state, action) {
	  var listName = 'blocked_' + action.store + 's',
	      list = state[listName] || new _Set();
	
	  return _extends({}, state, _defineProperty({}, listName, list.add(action.item)));
	}), _defineProperty(_createStore, _constantsActions.ACCESS_LIST_WHITELIST_SUCCESS, function (state, action) {
	  var listName = 'allowed_' + action.store + 's',
	      list = state[listName] || new _Set();
	
	  return _extends({}, state, _defineProperty({}, listName, list.add(action.item)));
	}), _defineProperty(_createStore, _constantsActions.ACCESS_LIST_REMOVE_SUCCESS, function (state, action) {
	  // TODO look at ImmutableJS for an immutable set -_-
	  state['blocked_' + action.store + 's'] && state['blocked_' + action.store + 's']['delete'](action.item);
	  state['allowed_' + action.store + 's'] && state['allowed_' + action.store + 's']['delete'](action.item);
	
	  return state;
	}), _createStore));
	module.exports = exports['default'];

/***/ },
/* 397 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _Object$defineProperty = __webpack_require__(2)["default"];
	
	exports["default"] = function (obj, key, value) {
	  if (key in obj) {
	    _Object$defineProperty(obj, key, {
	      value: value,
	      enumerable: true,
	      configurable: true,
	      writable: true
	    });
	  } else {
	    obj[key] = value;
	  }
	
	  return obj;
	};
	
	exports.__esModule = true;

/***/ },
/* 398 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _defineProperty = __webpack_require__(397)['default'];
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	
	var _createStore;
	
	var _lib = __webpack_require__(223);
	
	var _constantsActions = __webpack_require__(276);
	
	var defaultState = {
	  isAdmin: false
	};
	
	exports['default'] = (0, _lib.createStore)(defaultState, (_createStore = {}, _defineProperty(_createStore, _constantsActions.ADMIN_LOGIN, function (state, action) {
	  return {
	    timer: action.timer,
	    isAdmin: true
	  };
	}), _defineProperty(_createStore, _constantsActions.ADMIN_LOGOUT, function (state) {
	  return { isAdmin: false };
	}), _createStore));
	module.exports = exports['default'];

/***/ },
/* 399 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _extends = __webpack_require__(259)['default'];
	
	var _defineProperty = __webpack_require__(397)['default'];
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	
	var _createStore;
	
	var _lib = __webpack_require__(223);
	
	var _constantsActions = __webpack_require__(276);
	
	var defaultState = {
	  loaded: false,
	  albums: []
	};
	
	exports['default'] = (0, _lib.createStore)(defaultState, (_createStore = {}, _defineProperty(_createStore, _constantsActions.ALBUM_FETCH_START, function (state) {
	  return _extends({}, state, {
	    loading: true
	  });
	}), _defineProperty(_createStore, _constantsActions.ALBUM_FETCH_COMPLETE, function (state) {
	  return _extends({}, state, {
	    loading: false,
	    loaded: true
	  });
	}), _defineProperty(_createStore, _constantsActions.ALBUM_FETCH_SUCCESS, function (state, action) {
	  return _extends({}, state, {
	    page: action.page,
	    pages: action.pages,
	    albums: state.albums.concat(action.results)
	  });
	}), _defineProperty(_createStore, _constantsActions.ALBUM_FETCH_FAILURE, function (state, action) {
	  return _extends({}, state, {
	    loading: false,
	    loaded: false,
	    error: action.error
	  });
	}), _createStore));
	module.exports = exports['default'];

/***/ },
/* 400 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _extends = __webpack_require__(259)['default'];
	
	var _defineProperty = __webpack_require__(397)['default'];
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	
	var _createStore;
	
	var _lib = __webpack_require__(223);
	
	var _constantsActions = __webpack_require__(276);
	
	var defaultState = {
	  loaded: false,
	  artists: []
	};
	
	exports['default'] = (0, _lib.createStore)(defaultState, (_createStore = {}, _defineProperty(_createStore, _constantsActions.ARTIST_FETCH_START, function (state) {
	  return _extends({}, state, {
	    loading: true
	  });
	}), _defineProperty(_createStore, _constantsActions.ARTIST_FETCH_COMPLETE, function (state) {
	  return _extends({}, state, {
	    loading: false,
	    loaded: true
	  });
	}), _defineProperty(_createStore, _constantsActions.ARTIST_FETCH_SUCCESS, function (state, action) {
	  return _extends({}, state, {
	    page: action.page,
	    pages: action.pages,
	    artists: state.artists.concat(action.results)
	  });
	}), _defineProperty(_createStore, _constantsActions.ARTIST_FETCH_FAILURE, function (state, action) {
	  return _extends({}, state, {
	    loading: false,
	    loaded: false,
	    error: action.error
	  });
	}), _createStore));
	module.exports = exports['default'];

/***/ },
/* 401 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _extends = __webpack_require__(259)['default'];
	
	var _defineProperty = __webpack_require__(397)['default'];
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	
	var _createStore;
	
	var _lib = __webpack_require__(223);
	
	var _constantsActions = __webpack_require__(276);
	
	var defaultState = {};
	
	exports['default'] = (0, _lib.createStore)(defaultState, (_createStore = {}, _defineProperty(_createStore, _constantsActions.BROWSE_SELECT_GENRE, function (state, action) {
	  if (state.genre === action.id) {
	    return _extends({}, state, {
	      genre: null
	    });
	  } else {
	    return _extends({}, state, {
	      genre: action.id
	    });
	  }
	}), _defineProperty(_createStore, _constantsActions.BROWSE_SELECT_ARTIST, function (state, action) {
	  if (state.artist === action.id) {
	    return _extends({}, state, {
	      artist: null
	    });
	  } else {
	    return _extends({}, state, {
	      artist: action.id
	    });
	  }
	}), _defineProperty(_createStore, _constantsActions.BROWSE_SET_SEARCH, function (state, action) {
	  return _extends({}, state, {
	    search: action.search
	  });
	}), _createStore));
	module.exports = exports['default'];

/***/ },
/* 402 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _extends = __webpack_require__(259)['default'];
	
	var _defineProperty = __webpack_require__(397)['default'];
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	
	var _createStore;
	
	var _lib = __webpack_require__(223);
	
	var _constantsActions = __webpack_require__(276);
	
	var defaultState = {
	  loaded: false,
	  genres: []
	};
	
	exports['default'] = (0, _lib.createStore)(defaultState, (_createStore = {}, _defineProperty(_createStore, _constantsActions.GENRE_FETCH_START, function (state) {
	  return _extends({}, state, {
	    loading: true
	  });
	}), _defineProperty(_createStore, _constantsActions.GENRE_FETCH_COMPLETE, function (state) {
	  return _extends({}, state, {
	    loading: false,
	    loaded: true
	  });
	}), _defineProperty(_createStore, _constantsActions.GENRE_FETCH_SUCCESS, function (state, action) {
	  return _extends({}, state, {
	    page: action.page,
	    pages: action.pages,
	    genres: state.genres.concat(action.results)
	  });
	}), _defineProperty(_createStore, _constantsActions.GENRE_FETCH_FAILURE, function (state, action) {
	  return _extends({}, state, {
	    loading: false,
	    loaded: false,
	    error: action.error
	  });
	}), _createStore));
	module.exports = exports['default'];

/***/ },
/* 403 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _defineProperty = __webpack_require__(397)['default'];
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	
	var _createStore;
	
	var _lib = __webpack_require__(223);
	
	var _constantsActions = __webpack_require__(276);
	
	var defaultState = {
	  history: []
	};
	
	exports['default'] = (0, _lib.createStore)(defaultState, (_createStore = {}, _defineProperty(_createStore, _constantsActions.HISTORY_FETCH_SUCCESS, function (state, _ref) {
	  var history = _ref.history;
	  return { history: history };
	}), _defineProperty(_createStore, _constantsActions.HISTORY_FETCH_FAILURE, function (state) {
	  return {
	    history: []
	  };
	}), _createStore));
	module.exports = exports['default'];

/***/ },
/* 404 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _extends = __webpack_require__(259)['default'];
	
	var _defineProperty = __webpack_require__(397)['default'];
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	
	var _createStore;
	
	var _lib = __webpack_require__(223);
	
	var _constantsActions = __webpack_require__(276);
	
	var defaultState = {
	  queue: [], // Things to be queued
	  upcoming: [] // Things already queued
	};
	
	function getPosition(queue, track) {
	  return queue.indexOf(track);
	}
	function swapPosition(queue, from, to) {
	  if (from > to) {
	    var tmp = from;
	    to = from;
	    from = tmp;
	  }
	
	  var front = queue.slice(0, from);
	  var back = queue.slice(to + 1);
	  return front.concat(queue[to], queue[from], back);
	}
	
	exports['default'] = (0, _lib.createStore)(defaultState, (_createStore = {}, _defineProperty(_createStore, _constantsActions.QUEUE_ADD, function (state, _ref) {
	  var track = _ref.track;
	  var queue = state.queue;
	
	  if (queue.length < 10 && queue.indexOf(track) === -1) {
	    queue = queue.concat(track);
	  }
	
	  return _extends({}, state, {
	    queue: queue
	  });
	}), _defineProperty(_createStore, _constantsActions.QUEUE_REMOVE, function (state, _ref2) {
	  var track = _ref2.track;
	  return _extends({}, state, {
	    queue: state.queue.filter(function (obj) {
	      return obj !== track;
	    })
	  });
	}), _defineProperty(_createStore, _constantsActions.QUEUE_CLEAR, function (state) {
	  return _extends({}, state, {
	    queue: []
	  });
	}), _defineProperty(_createStore, _constantsActions.QUEUE_UP, function (state, _ref3) {
	  var track = _ref3.track;
	
	  var pos = getPosition(state.queue, track);
	
	  if (pos === 0) {
	    return state;
	  } else {
	    return _extends({}, state, {
	      queue: swapPosition(state.queue, pos, pos - 1)
	    });
	  }
	}), _defineProperty(_createStore, _constantsActions.QUEUE_DOWN, function (state, _ref4) {
	  var track = _ref4.track;
	
	  var pos = getPosition(state.queue, track);
	
	  if (pos === state.queue.length - 1) {
	    return state;
	  } else {
	    return _extends({}, state, {
	      queue: swapPosition(state.queue, pos, pos + 1)
	    });
	  }
	}), _defineProperty(_createStore, _constantsActions.QUEUE_FETCH_SUCCESS, function (state, _ref5) {
	  var upcoming = _ref5.upcoming;
	  return _extends({}, state, {
	    upcoming: upcoming
	  });
	}), _defineProperty(_createStore, _constantsActions.QUEUE_FETCH_FAILURE, function (state) {
	  return _extends({}, state, {
	    upcoming: []
	  });
	}), _createStore));
	module.exports = exports['default'];

/***/ },
/* 405 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _extends = __webpack_require__(259)['default'];
	
	var _defineProperty = __webpack_require__(397)['default'];
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	
	var _createStore;
	
	var _lib = __webpack_require__(223);
	
	var _constantsActions = __webpack_require__(276);
	
	var defaultState = {
	  playing: false,
	  paused: false,
	  stopped: true
	};
	
	exports['default'] = (0, _lib.createStore)(defaultState, (_createStore = {}, _defineProperty(_createStore, _constantsActions.STATUS_STREAM_START, function (state, action) {
	  return _extends({}, state, {
	    timer: action.timer
	  });
	}), _defineProperty(_createStore, _constantsActions.STATUS_STREAM_STOP, function (state) {
	  return _extends({}, state, {
	    timer: null
	  });
	}), _defineProperty(_createStore, _constantsActions.STATUS_STREAM_UPDATE, function (state, action) {
	  return _extends({}, state, {
	    playing: action.state === 'playing',
	    paused: action.state === 'paused',
	    stopped: action.state === 'stopped',
	    position: action.position,
	    track: action.now_playing
	  });
	}), _createStore));
	module.exports = exports['default'];

/***/ },
/* 406 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _extends = __webpack_require__(259)['default'];
	
	var _defineProperty = __webpack_require__(397)['default'];
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	
	var _createStore;
	
	var _lib = __webpack_require__(223);
	
	var _constantsActions = __webpack_require__(276);
	
	var defaultState = {
	  loaded: false,
	  tracks: []
	};
	
	exports['default'] = (0, _lib.createStore)(defaultState, (_createStore = {}, _defineProperty(_createStore, _constantsActions.TRACK_FETCH_START, function (state) {
	  return _extends({}, state, {
	    loading: true
	  });
	}), _defineProperty(_createStore, _constantsActions.TRACK_FETCH_COMPLETE, function (state) {
	  return _extends({}, state, {
	    loading: false,
	    loaded: true
	  });
	}), _defineProperty(_createStore, _constantsActions.TRACK_FETCH_SUCCESS, function (state, action) {
	  return _extends({}, state, {
	    page: action.page,
	    pages: action.pages,
	    tracks: state.tracks.concat(action.results)
	  });
	}), _defineProperty(_createStore, _constantsActions.TRACK_FETCH_FAILURE, function (state, action) {
	  return _extends({}, state, {
	    loading: false,
	    loaded: false,
	    error: action.error
	  });
	}), _createStore));
	module.exports = exports['default'];

/***/ }
]);
//# sourceMappingURL=bundle.js.map
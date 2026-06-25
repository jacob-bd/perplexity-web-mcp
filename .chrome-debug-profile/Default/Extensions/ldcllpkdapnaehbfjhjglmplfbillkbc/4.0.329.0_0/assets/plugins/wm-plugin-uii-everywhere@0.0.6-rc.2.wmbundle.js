/* WalkMe Module */ typeof _walkmeInternals !== 'undefined' && _walkmeInternals.wmloader && _walkmeInternals.wmloader.define('wm-plugin-uii-everywhere@0.0.6-rc.2@prelib', {"name":"wm-plugin-uii-everywhere","version":"0.0.6-rc.2","toolbelt":"2.0.2","packageDate":"2025-09-25T09:42:38.039Z","entry":"prelib"}, function (__wmplugin__) {  
var wmbundle;
/******/ (function() { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 498:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

module.exports = __webpack_require__(483);



/***/ }),

/***/ 949:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

"use strict";

Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.getConfig = getConfig;
var getCtx = (__webpack_require__(257)/* .getCtx */ .yK);
function getEnv() {
  // check if process and env are defined
  if (typeof process !== 'undefined' && process.env && process.env.ENV) {
    return process.env.ENV;
  }
  var settingsFile = getCtx().get('SettingsFile');
  var cdnUrl = settingsFile.getCdnServerName();
  if (cdnUrl.indexOf('qa') > -1) {
    return 'qa';
  }
  if (cdnUrl.indexOf('eu') > -1) {
    return 'eu-prod';
  }
  return 'prod';
}
function getConfig() {
  return {
    prod: {
      UII_EVERYWHERE_GATEWAY_URL: 'https://papi.walkme.com/deepui/api/everywhere-gateway',
      LLM_COMPLETION_URL: 'https://papi.walkme.com/deepui/api/am/op/completions',
      UII_EVERYWHERE_ENGINE_URL: 'https://papi.walkme.com/deepui/api/everywhere-engine'
    },
    'eu-prod': {
      UII_EVERYWHERE_GATEWAY_URL: 'https://eu-papi.walkme.com/deepui/api/everywhere-gateway',
      LLM_COMPLETION_URL: 'https://eu-papi.walkme.com/deepui/api/am/op/completions',
      UII_EVERYWHERE_ENGINE_URL: 'https://eu-papi.walkme.com/deepui/api/everywhere-engine'
    },
    qa: {
      UII_EVERYWHERE_GATEWAY_URL: 'https://papi.walkmeqa.com/deepui/api/everywhere-gateway',
      LLM_COMPLETION_URL: 'https://papi.walkmeqa.com/deepui/api/am/op/completions',
      UII_EVERYWHERE_ENGINE_URL: 'https://papi.walkmeqa.com/deepui/api/everywhere-engine'
    },
    local: {
      UII_EVERYWHERE_GATEWAY_URL: 'https://localhost:3007',
      LLM_COMPLETION_URL: 'https://papi.walkmeqa.com/deepui/api/am/op/completions',
      UII_EVERYWHERE_ENGINE_URL: 'https://localhost:3000'
    }
  }[getEnv()];
}


/***/ }),

/***/ 483:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

"use strict";

var createPluginEntry = (__webpack_require__(257)/* .createPluginEntry */ .mJ);
module.exports = createPluginEntry(function (registerPlugin) {
  var UII = (__webpack_require__(589)/* .UII */ .a);
  registerPlugin(new UII());
});


/***/ }),

/***/ 114:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

"use strict";

Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.AsyncQueue = void 0;
exports.taskGenerator = taskGenerator;
var _logger = __webpack_require__(681);
var _marked = /*#__PURE__*/_regeneratorRuntime().mark(taskGenerator);
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t.return || t.return(); } finally { if (u) throw o; } } }; }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator.return && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, catch: function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _asyncIterator(r) { var n, t, o, e = 2; for ("undefined" != typeof Symbol && (t = Symbol.asyncIterator, o = Symbol.iterator); e--;) { if (t && null != (n = r[t])) return n.call(r); if (o && null != (n = r[o])) return new AsyncFromSyncIterator(n.call(r)); t = "@@asyncIterator", o = "@@iterator"; } throw new TypeError("Object is not async iterable"); }
function AsyncFromSyncIterator(r) { function AsyncFromSyncIteratorContinuation(r) { if (Object(r) !== r) return Promise.reject(new TypeError(r + " is not an object.")); var n = r.done; return Promise.resolve(r.value).then(function (r) { return { value: r, done: n }; }); } return AsyncFromSyncIterator = function AsyncFromSyncIterator(r) { this.s = r, this.n = r.next; }, AsyncFromSyncIterator.prototype = { s: null, n: null, next: function next() { return AsyncFromSyncIteratorContinuation(this.n.apply(this.s, arguments)); }, return: function _return(r) { var n = this.s.return; return void 0 === n ? Promise.resolve({ value: r, done: !0 }) : AsyncFromSyncIteratorContinuation(n.apply(this.s, arguments)); }, throw: function _throw(r) { var n = this.s.return; return void 0 === n ? Promise.reject(r) : AsyncFromSyncIteratorContinuation(n.apply(this.s, arguments)); } }, new AsyncFromSyncIterator(r); }
var AsyncQueue = exports.AsyncQueue = /*#__PURE__*/function () {
  function AsyncQueue() {
    var debounceTime = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    _classCallCheck(this, AsyncQueue);
    this.running = false;
    this.debounceTime = debounceTime; // milliseconds between tasks
  }
  return _createClass(AsyncQueue, [{
    key: "run",
    value: function () {
      var _run = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee(generatorFn) {
        var _this = this;
        var generator, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, _value, task;
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              this.running = true;
              generator = generatorFn();
              _iteratorNormalCompletion = true;
              _didIteratorError = false;
              _context.prev = 4;
              _iterator = _asyncIterator(generator);
            case 6:
              _context.next = 8;
              return _iterator.next();
            case 8:
              _step = _context.sent;
              _iteratorNormalCompletion = _step.done;
              _context.next = 12;
              return _step.value;
            case 12:
              _value = _context.sent;
              if (_iteratorNormalCompletion) {
                _context.next = 29;
                break;
              }
              task = _value;
              _context.prev = 15;
              _context.next = 18;
              return task();
            case 18:
              _context.next = 23;
              break;
            case 20:
              _context.prev = 20;
              _context.t0 = _context["catch"](15);
              _logger.uiieLogger.ddAndErrorLog('AsyncQueue task failed', {
                errorMessage: _context.t0.message,
                errorStack: _context.t0.stack
              });
            case 23:
              if (!(this.debounceTime > 0)) {
                _context.next = 26;
                break;
              }
              _context.next = 26;
              return new Promise(function (resolve) {
                return setTimeout(resolve, _this.debounceTime);
              });
            case 26:
              _iteratorNormalCompletion = true;
              _context.next = 6;
              break;
            case 29:
              _context.next = 35;
              break;
            case 31:
              _context.prev = 31;
              _context.t1 = _context["catch"](4);
              _didIteratorError = true;
              _iteratorError = _context.t1;
            case 35:
              _context.prev = 35;
              _context.prev = 36;
              if (!(!_iteratorNormalCompletion && _iterator.return != null)) {
                _context.next = 40;
                break;
              }
              _context.next = 40;
              return _iterator.return();
            case 40:
              _context.prev = 40;
              if (!_didIteratorError) {
                _context.next = 43;
                break;
              }
              throw _iteratorError;
            case 43:
              return _context.finish(40);
            case 44:
              return _context.finish(35);
            case 45:
              this.running = false;
            case 46:
            case "end":
              return _context.stop();
          }
        }, _callee, this, [[4, 31, 35, 45], [15, 20], [36,, 40, 44]]);
      }));
      function run(_x) {
        return _run.apply(this, arguments);
      }
      return run;
    }()
  }]);
}();
function taskGenerator(tasks, taskHandler) {
  var _iterator2, _step2, _loop;
  return _regeneratorRuntime().wrap(function taskGenerator$(_context4) {
    while (1) switch (_context4.prev = _context4.next) {
      case 0:
        _iterator2 = _createForOfIteratorHelper(tasks);
        _context4.prev = 1;
        _loop = /*#__PURE__*/_regeneratorRuntime().mark(function _loop() {
          var task;
          return _regeneratorRuntime().wrap(function _loop$(_context3) {
            while (1) switch (_context3.prev = _context3.next) {
              case 0:
                task = _step2.value;
                _context3.next = 3;
                return /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
                  return _regeneratorRuntime().wrap(function _callee2$(_context2) {
                    while (1) switch (_context2.prev = _context2.next) {
                      case 0:
                        _context2.prev = 0;
                        _context2.next = 3;
                        return taskHandler(task);
                      case 3:
                        _context2.next = 8;
                        break;
                      case 5:
                        _context2.prev = 5;
                        _context2.t0 = _context2["catch"](0);
                        _logger.uiieLogger.ddAndErrorLog('taskGenerator: runInIdle failed', {
                          selector: session.selector,
                          errorMessage: _context2.t0.message,
                          errorStack: _context2.t0.stack
                        });
                      case 8:
                      case "end":
                        return _context2.stop();
                    }
                  }, _callee2, null, [[0, 5]]);
                }));
              case 3:
              case "end":
                return _context3.stop();
            }
          }, _loop);
        });
        _iterator2.s();
      case 4:
        if ((_step2 = _iterator2.n()).done) {
          _context4.next = 8;
          break;
        }
        return _context4.delegateYield(_loop(), "t0", 6);
      case 6:
        _context4.next = 4;
        break;
      case 8:
        _context4.next = 13;
        break;
      case 10:
        _context4.prev = 10;
        _context4.t1 = _context4["catch"](1);
        _iterator2.e(_context4.t1);
      case 13:
        _context4.prev = 13;
        _iterator2.f();
        return _context4.finish(13);
      case 16:
      case "end":
        return _context4.stop();
    }
  }, _marked, null, [[1, 10, 13, 16]]);
}


/***/ }),

/***/ 421:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.copilot = void 0;
var _logger = __webpack_require__(681);
var _consts = __webpack_require__(736);
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
var MIN_INTERACTION_TIME = 30 * _consts.SEC_TO_MS;
var DEFAULT_VALIDATION_PROMPT = "Please assist me in evaluating the content of a user field. \
Please make sure that the input for this field is clear and detailed. It's important that the user avoids vague or incomplete explanations. ֿ\
The comprehensive input is vital for efficient processing and accurate results";
var TOOLTIP_MESSAGE = "Hi there! I noticed you're having some trouble with this field. \
Don't worry, I'm here to assist! Simply finish and exit the field, and I'll offer suggestions for improvements.";
var COPILOT_STORAGE_KEY = 'wm-uiie-use-copilot';
var getCtx = (__webpack_require__(257)/* .getCtx */ .yK);
var Types = {
  existing: 'existing',
  runtime: 'runtime'
};
var copilot = exports.copilot = {
  init: function init(captureIdsData) {
    var siteConfig = getCtx().get('SiteConfigManager').get();
    var _ref = siteConfig && siteConfig.Custom || {},
      copilotConfig = _ref.copilotConfig;
    var _ref2 = copilotConfig || {},
      _ref2$defaultMinInter = _ref2.defaultMinInteractionTime,
      defaultMinInteractionTime = _ref2$defaultMinInter === void 0 ? MIN_INTERACTION_TIME : _ref2$defaultMinInter,
      _ref2$defaultValidati = _ref2.defaultValidationPrompt,
      defaultValidationPrompt = _ref2$defaultValidati === void 0 ? DEFAULT_VALIDATION_PROMPT : _ref2$defaultValidati;
    this.config = {
      defaultMinInteractionTime: defaultMinInteractionTime,
      defaultValidationPrompt: defaultValidationPrompt
    };
    this.runtimeSmartTipId = 1;
    this.smartTipsCreated = {};
    try {
      var automatonCaptureObj = this.getAutomatonCaptureIdsObj();
      this.captureIdsMap = this.createCaptureIdsMap(captureIdsData, automatonCaptureObj);
      this.initializeExistingSmartTipsWindowMap();
      if (Object.keys(this.captureIdsMap).length > 0) {
        _logger.uiieLogger.ddAndLog('Copilot captureIds smartTips initialized:', Object.keys(this.captureIdsMap));
      }
    } catch (e) {
      _logger.uiieLogger.ddAndErrorLog('Error initializing copilot captureIds', e);
      return false;
    }
    return true;
  },
  initializeExistingSmartTipsWindowMap: function initializeExistingSmartTipsWindowMap() {
    window._uiieConditions = {};
    this.window_uii = window._uiieConditions;
    for (var _i = 0, _Object$entries = Object.entries(this.captureIdsMap); _i < _Object$entries.length; _i++) {
      var _Object$entries$_i = _slicedToArray(_Object$entries[_i], 2),
        captureId = _Object$entries$_i[0],
        captureIdData = _Object$entries$_i[1];
      if (captureIdData.type === Types.existing) {
        this.window_uii[captureId] = 0;
      }
    }
  },
  shouldUseCopilot: function shouldUseCopilot() {
    return window.localStorage.getItem(COPILOT_STORAGE_KEY) === 'true';
  },
  getCaptureIdConditions: function getCaptureIdConditions(captureId) {
    return this.captureIdsMap[captureId].conditions;
  },
  activateExistingSmartTip: function activateExistingSmartTip(captureId) {
    _logger.uiieLogger.ddAndLog('Activating existing smartTip:', captureId);
    this.window_uii[captureId] = 1;
    return true;
  },
  createRuntimeSmartTip: function createRuntimeSmartTip(captureId, validationPrompt) {
    if (this.smartTipsCreated[captureId]) {
      _logger.uiieLogger.ddAndLog('SmartTip for this capture id already created:', captureId);
      return false;
    }
    _logger.uiieLogger.ddAndLog('Creating runtime smartTip:', captureId);
    var smartTipSetsManager = _walkmeInternals.ctx.get('SmartTipSetsManager');
    if (!smartTipSetsManager || !smartTipSetsManager.addRuntimeSet) {
      return false;
    }
    var smartTip = smartTipSetsManager.addRuntimeSet({
      captureId: captureId,
      deployableId: this.runtimeSmartTipId++,
      AIContext: validationPrompt,
      runtimeSettings: {
        TooltipText: TOOLTIP_MESSAGE
      }
    });
    if (!smartTip) {
      return false;
    }
    this.smartTipsCreated[captureId] = smartTip;
    return true;
  },
  activateSmartTip: function activateSmartTip(captureId) {
    if (!captureId || !this.captureIdsMap[captureId]) {
      return false;
    }
    if (this.captureIdsMap[captureId].type === Types.existing) {
      return this.activateExistingSmartTip(captureId);
    } else if (this.captureIdsMap[captureId].type === Types.runtime) {
      return this.createRuntimeSmartTip(captureId, this.captureIdsMap[captureId].validationPrompt);
    }
    return false;
  },
  deactivateExistingSmartTip: function deactivateExistingSmartTip(captureId) {
    if (captureId && this.captureIdsMap[captureId]) {
      _logger.uiieLogger.ddAndLog('Deactivating SmartTip:', captureId);
      this.window_uii[captureId] = 0;
      return true;
    }
    return false;
  },
  getAutomatonCaptureIdsObj: function getAutomatonCaptureIdsObj() {
    var automatonCaptureIds = window._deepUiInternals && window._deepUiInternals.getUiieCaptureIds && window._deepUiInternals.getUiieCaptureIds();
    return automatonCaptureIds.reduce(function (a, v) {
      return _objectSpread(_objectSpread({}, a), {}, _defineProperty({}, v, true));
    }, {});
  },
  isValidCaptureIdData: function isValidCaptureIdData(captureId, captureIdData) {
    if (!Types[captureIdData.type]) {
      _logger.uiieLogger.ddAndErrorLog('Invalid captureId type:', captureIdData.type, captureId);
      return false;
    }
    if (!captureIdData.conditions || captureIdData.conditions.length === 0) {
      _logger.uiieLogger.ddAndErrorLog('Missing conditions for captureId:', captureId);
      return false;
    }
    return true;
  },
  fillMissingValues: function fillMissingValues(captureIdData) {
    if (captureIdData.conditions.time === 0) {
      captureIdData.conditions.time = this.config.defaultMinInteractionTime;
    }
    if (captureIdData.type === Types.runtime) {
      captureIdData.validationPrompt = captureIdData.validationPrompt || this.config.defaultValidationPrompt;
    }
    return captureIdData;
  },
  createCaptureIdsMap: function createCaptureIdsMap(captureIdsData, automatonCaptureObj) {
    var _this = this;
    if (!captureIdsData) {
      return {};
    }
    return Object.keys(captureIdsData).reduce(function (a, captureId) {
      return automatonCaptureObj[captureId] && _this.isValidCaptureIdData(captureId, captureIdsData[captureId]) ? _objectSpread(_objectSpread({}, a), {}, _defineProperty({}, captureId, _this.fillMissingValues(captureIdsData[captureId]))) : a;
    }, {});
  },
  checkSimpleCondition: function checkSimpleCondition(conditionThreshold, currentValue) {
    return conditionThreshold && currentValue > conditionThreshold;
  },
  checkTimeExceeded: function checkTimeExceeded(startTimeStamp, currentTimeStamp, minimumInteractionTime) {
    return minimumInteractionTime && startTimeStamp > 0 && currentTimeStamp - startTimeStamp > minimumInteractionTime * _consts.SEC_TO_MS;
  }
};


/***/ }),

/***/ 318:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

"use strict";

Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.loadFile = loadFile;
var _helpers = __webpack_require__(591);
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator.return && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, catch: function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
var getCtx = (__webpack_require__(257)/* .getCtx */ .yK);
var DEEPUI_PATH = 'deepui/uii/assets';
var FOLDER_NAME = 'everywhere';
function loadFile(_x) {
  return _loadFile.apply(this, arguments);
}
function _loadFile() {
  _loadFile = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee(filePath) {
    var commonUtils, guid, settingsFile, cdnUrl, url;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          commonUtils = getCtx().get('CommonUtils');
          guid = (0, _helpers.getUserGuid)();
          settingsFile = getCtx().get('SettingsFile');
          cdnUrl = settingsFile.getCdnServerName();
          url = "".concat(cdnUrl, "/").concat(DEEPUI_PATH, "/").concat(FOLDER_NAME, "/").concat(filePath);
          if (!(commonUtils.loadJsonFile && guid)) {
            _context.next = 7;
            break;
          }
          return _context.abrupt("return", new Promise(function (resolve, reject) {
            return commonUtils.loadJsonFile(url, resolve, reject);
          }));
        case 7:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return _loadFile.apply(this, arguments);
}


/***/ }),

/***/ 458:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

"use strict";

Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.deleteItem = deleteItem;
exports.getAllItems = getAllItems;
exports.getItem = getItem;
exports.openDB = openDB;
exports.putItem = putItem;
var _consts = __webpack_require__(736);
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator.return && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, catch: function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; } // Generic IndexedDB utility
function openDB(dbName, storeName) {
  var dbVersion = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
  var keyPath = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : _consts.SKILL_DISCOVERY_STORE_KEY_PATH;
  return new Promise(function (resolve, reject) {
    var request = indexedDB.open(dbName, dbVersion);
    request.onupgradeneeded = function (event) {
      try {
        var db = event.target.result;
        if (!db.objectStoreNames.contains(storeName)) {
          db.createObjectStore(storeName, {
            keyPath: keyPath
          });
        }
      } catch (err) {
        // Abort the transaction to avoid partial upgrades
        event.target.transaction.abort();
        reject(err);
      }
    };
    request.onsuccess = function (event) {
      resolve(event.target.result);
    };
    request.onerror = function (event) {
      reject(event.target.error);
    };
    request.onblocked = function () {
      reject(new Error('IndexedDB open blocked'));
    };
  });
}
function getItem(_x, _x2, _x3) {
  return _getItem.apply(this, arguments);
}
function _getItem() {
  _getItem = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee(dbName, storeName, key) {
    var keyPath,
      dbVersion,
      db,
      _args = arguments;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          keyPath = _args.length > 3 && _args[3] !== undefined ? _args[3] : _consts.SKILL_DISCOVERY_STORE_KEY_PATH;
          dbVersion = _args.length > 4 && _args[4] !== undefined ? _args[4] : 1;
          _context.next = 4;
          return openDB(dbName, storeName, dbVersion, keyPath);
        case 4:
          db = _context.sent;
          return _context.abrupt("return", new Promise(function (resolve, reject) {
            var tx = db.transaction(storeName, 'readonly');
            var store = tx.objectStore(storeName);
            var req = store.get(key);
            req.onsuccess = function () {
              return resolve(req.result);
            };
            req.onerror = function () {
              return reject(req.error);
            };
          }));
        case 6:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return _getItem.apply(this, arguments);
}
function putItem(_x4, _x5, _x6) {
  return _putItem.apply(this, arguments);
}
function _putItem() {
  _putItem = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee2(dbName, storeName, item) {
    var keyPath,
      dbVersion,
      db,
      _args2 = arguments;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          keyPath = _args2.length > 3 && _args2[3] !== undefined ? _args2[3] : _consts.SKILL_DISCOVERY_STORE_KEY_PATH;
          dbVersion = _args2.length > 4 && _args2[4] !== undefined ? _args2[4] : 1;
          _context2.next = 4;
          return openDB(dbName, storeName, dbVersion, keyPath);
        case 4:
          db = _context2.sent;
          return _context2.abrupt("return", new Promise(function (resolve, reject) {
            var tx = db.transaction(storeName, 'readwrite');
            var store = tx.objectStore(storeName);
            var req = store.put(item);
            req.onsuccess = function () {
              return resolve();
            };
            req.onerror = function () {
              return reject(req.error);
            };
          }));
        case 6:
        case "end":
          return _context2.stop();
      }
    }, _callee2);
  }));
  return _putItem.apply(this, arguments);
}
function deleteItem(_x7, _x8, _x9) {
  return _deleteItem.apply(this, arguments);
}
function _deleteItem() {
  _deleteItem = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee3(dbName, storeName, key) {
    var keyPath,
      dbVersion,
      db,
      _args3 = arguments;
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          keyPath = _args3.length > 3 && _args3[3] !== undefined ? _args3[3] : _consts.SKILL_DISCOVERY_STORE_KEY_PATH;
          dbVersion = _args3.length > 4 && _args3[4] !== undefined ? _args3[4] : 1;
          _context3.next = 4;
          return openDB(dbName, storeName, dbVersion, keyPath);
        case 4:
          db = _context3.sent;
          return _context3.abrupt("return", new Promise(function (resolve, reject) {
            var tx = db.transaction(storeName, 'readwrite');
            var store = tx.objectStore(storeName);
            var req = store.delete(key);
            req.onsuccess = function () {
              return resolve();
            };
            req.onerror = function () {
              return reject(req.error);
            };
          }));
        case 6:
        case "end":
          return _context3.stop();
      }
    }, _callee3);
  }));
  return _deleteItem.apply(this, arguments);
}
function getAllItems(_x10, _x11) {
  return _getAllItems.apply(this, arguments);
}
function _getAllItems() {
  _getAllItems = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee4(dbName, storeName) {
    var keyPath,
      dbVersion,
      db,
      _args4 = arguments;
    return _regeneratorRuntime().wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          keyPath = _args4.length > 2 && _args4[2] !== undefined ? _args4[2] : _consts.SKILL_DISCOVERY_STORE_KEY_PATH;
          dbVersion = _args4.length > 3 && _args4[3] !== undefined ? _args4[3] : 1;
          _context4.next = 4;
          return openDB(dbName, storeName, dbVersion, keyPath);
        case 4:
          db = _context4.sent;
          return _context4.abrupt("return", new Promise(function (resolve, reject) {
            var tx = db.transaction(storeName, 'readonly');
            var store = tx.objectStore(storeName);
            var req = store.getAll();
            req.onsuccess = function () {
              return resolve(req.result);
            };
            req.onerror = function () {
              return reject(req.error);
            };
          }));
        case 6:
        case "end":
          return _context4.stop();
      }
    }, _callee4);
  }));
  return _getAllItems.apply(this, arguments);
}


/***/ }),

/***/ 598:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

"use strict";

Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.formatPrompt = formatPrompt;
Object.defineProperty(exports, "getPrompt", ({
  enumerable: true,
  get: function get() {
    return _helpers.getPrompt;
  }
}));
exports.queryLlm = queryLlm;
exports.sendInputAnalysis = sendInputAnalysis;
var _config = __webpack_require__(949);
var _logger = __webpack_require__(681);
var _http = __webpack_require__(52);
var _helpers = __webpack_require__(591);
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator.return && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, catch: function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function queryLlm(_x) {
  return _queryLlm.apply(this, arguments);
}
function _queryLlm() {
  _queryLlm = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee(_ref) {
    var prompt, config, uiieFunc, headers, payload, start, response, end, llmTime;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          prompt = _ref.prompt, config = _ref.config, uiieFunc = _ref.uiieFunc;
          if (!(!prompt || !config)) {
            _context.next = 3;
            break;
          }
          return _context.abrupt("return");
        case 3:
          _context.prev = 3;
          headers = createLlmRequestHeaders({
            aiManagerMsaGuid: config.aiManagerMsaGuid,
            uiieApp: config.uiieApp,
            uiieFunc: uiieFunc,
            uiieAppVersion: config.uiieAppVersion
          });
          payload = createLlmRequestPayload({
            prompt: prompt,
            config: config
          });
          start = performance.now();
          _context.next = 9;
          return getLlmCompletion(payload, headers);
        case 9:
          response = _context.sent;
          end = performance.now();
          llmTime = (end - start) / 1000;
          _logger.uiieLogger.ddAndLog("LLM query took ".concat(llmTime), {
            llmTime: llmTime
          });
          return _context.abrupt("return", response);
        case 16:
          _context.prev = 16;
          _context.t0 = _context["catch"](3);
          _logger.uiieLogger.ddAndErrorLog('Error querying LLM', {
            error: _context.t0
          });
        case 19:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[3, 16]]);
  }));
  return _queryLlm.apply(this, arguments);
}
function sendInputAnalysis(_x2) {
  return _sendInputAnalysis.apply(this, arguments);
}
function _sendInputAnalysis() {
  _sendInputAnalysis = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee2(payload) {
    var SEND_INPUT_ANALYSIS_URL, headers;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          SEND_INPUT_ANALYSIS_URL = "".concat((0, _config.getConfig)().UII_EVERYWHERE_GATEWAY_URL, "/uiie/inputQuality");
          headers = {
            'Content-Type': 'application/json',
            'x-wmdu-euguid': window._walkMe.getEndUserId(),
            'x-wmdu-uguid': window._walkMe.getUserGuid(),
            'x-wmdu-envid': window._walkMe.getEnvId()
          };
          sendData({
            url: SEND_INPUT_ANALYSIS_URL,
            payload: payload,
            headers: headers,
            logContext: 'Input Analysis'
          });
        case 3:
        case "end":
          return _context2.stop();
      }
    }, _callee2);
  }));
  return _sendInputAnalysis.apply(this, arguments);
}
function createLlmRequestHeaders(_ref2) {
  var aiManagerMsaGuid = _ref2.aiManagerMsaGuid,
    uiieApp = _ref2.uiieApp,
    uiieFunc = _ref2.uiieFunc,
    uiieAppVersion = _ref2.uiieAppVersion;
  return {
    msaId: aiManagerMsaGuid || window._walkMe.getEndUserId(),
    systemId: window._walkMe.getUserGuid(),
    'Content-Type': 'application/json',
    appVer: uiieAppVersion,
    app: uiieApp,
    func: uiieFunc
  };
}
function createLlmRequestPayload(_ref3) {
  var prompt = _ref3.prompt,
    config = _ref3.config;
  return {
    stream: false,
    messages: [{
      role: 'user',
      content: "".concat(prompt)
    }],
    temperature: config.llmDefaultTemperature,
    frequency_penalty: config.llmDefaultFrequencyPenalty,
    presence_penalty: config.llmDefaultPresencePenalty,
    max_tokens: config.llmDefaultMaxTokens,
    top_p: config.llmTopP,
    stop: null
  };
}
function getLlmCompletion(_x3, _x4) {
  return _getLlmCompletion.apply(this, arguments);
}
function _getLlmCompletion() {
  _getLlmCompletion = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee3(payload, headers) {
    var AI_MANAGER_URL, response;
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          AI_MANAGER_URL = "".concat((0, _config.getConfig)().LLM_COMPLETION_URL);
          _context3.prev = 1;
          _context3.next = 4;
          return (0, _http.postData)(AI_MANAGER_URL, {
            body: JSON.stringify(payload),
            headers: headers,
            timeout: 50000
          });
        case 4:
          response = _context3.sent;
          return _context3.abrupt("return", response);
        case 8:
          _context3.prev = 8;
          _context3.t0 = _context3["catch"](1);
          _logger.uiieLogger.ddAndErrorLog('Error getting LLM completion');
          throw _context3.t0;
        case 12:
        case "end":
          return _context3.stop();
      }
    }, _callee3, null, [[1, 8]]);
  }));
  return _getLlmCompletion.apply(this, arguments);
}
function formatPrompt(_ref4) {
  var metaData = _ref4.metaData,
    prompt = _ref4.prompt;
  if (prompt) {
    var formatted = prompt.replace(/\#%{(.*?)}%#/g, function (match, variable) {
      return metaData[variable] || match;
    });
    var unmatched = formatted.match(/\#%{(.*?)}%#/g);
    if (unmatched) {
      return '';
    }
    return formatted;
  }
}


/***/ }),

/***/ 681:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

"use strict";

Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.log = log;
exports.logWithTime = logWithTime;
exports.uiieLogger = void 0;
var meta = _interopRequireWildcard(__webpack_require__(286));
var _consts = __webpack_require__(736);
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var getCtx = (__webpack_require__(257)/* .getCtx */ .yK);
var logger = getCtx().get('PrelibLogger');
function log() {
  var logRecord = Array().slice.call(arguments);
  logRecord.unshift('[ UIIE ]');
  logger.write.apply(logger, logRecord);
}
function padWithLeadingZeros(hours, minutes, seconds, ms) {
  var paddedHours = hours < 10 ? '0' + hours : hours;
  var paddedMinutes = minutes < 10 ? '0' + minutes : minutes;
  var paddedSeconds = seconds < 10 ? '0' + seconds : seconds;
  var paddedMs = ms < 100 ? ms < 10 ? '00' + ms : '0' + ms : ms;
  return "".concat(paddedHours, ":").concat(paddedMinutes, ":").concat(paddedSeconds, ".").concat(paddedMs);
}
function getLogTime() {
  var date = new Date();
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var seconds = date.getSeconds();
  var ms = date.getMilliseconds();
  return padWithLeadingZeros(hours, minutes, seconds, ms);
}
function ddAndLogHelper(msg, data) {
  var level = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'info';
  try {
    log(msg, data);
    getCtx().get('EventCollectorLogger').log(level, "[ UIIE ] - ".concat(msg), _objectSpread({
      plugin_name: meta.name,
      plugin_version: meta.version
    }, data));
  } catch (err) {}
}
var Logger = /*#__PURE__*/function () {
  function Logger() {
    _classCallCheck(this, Logger);
    this.debugThreshold = _consts.DEBUG_THRESHOLD_LOG;
    this.errorThreshold = _consts.ERROR_THRESHOLD_LOG;
  }
  return _createClass(Logger, [{
    key: "ddAndErrorLog",
    value: function ddAndErrorLog(msg) {
      var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      if (Math.random() < this.errorThreshold) {
        ddAndLogHelper(msg, data, 'error');
      }
    }
  }, {
    key: "ddAndWarnLog",
    value: function ddAndWarnLog(msg) {
      var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      if (Math.random() < this.debugThreshold) {
        ddAndLogHelper(msg, data, 'warn');
      }
    }
  }, {
    key: "ddAndLog",
    value: function ddAndLog(msg) {
      var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      if (Math.random() < this.debugThreshold) {
        ddAndLogHelper(msg, data);
      }
    }
  }, {
    key: "setErrorThreshold",
    value: function setErrorThreshold(newThreshold) {
      this.errorThreshold = newThreshold;
    }
  }, {
    key: "setDebugThreshold",
    value: function setDebugThreshold(newThreshold) {
      this.debugThreshold = newThreshold;
    }
  }]);
}();
function logWithTime() {
  var logRecord = Array().slice.call(arguments);
  logRecord.unshift("[".concat(getLogTime(), "]"));
  log.apply(null, logRecord);
}
var uiieLogger = exports.uiieLogger = new Logger();


/***/ }),

/***/ 78:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.metaDataFilters = void 0;
var _logger = __webpack_require__(681);
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
var maxLevels = 15;
function findClosestCousins(element, selector) {
  var levels = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : maxLevels;
  try {
    var currentElement = element;
    var levelCount = 0;
    while (currentElement && currentElement.tagName && levelCount < levels) {
      var tagName = currentElement.tagName.toLowerCase();
      if (tagName === 'body') {
        break;
      }
      if (currentElement.parentElement !== null && currentElement.parentElement !== undefined) {
        currentElement = currentElement.parentElement;
      } else if (currentElement.parentNode !== null && currentElement.parentNode !== undefined && currentElement.parentNode.host !== undefined) {
        currentElement = currentElement.parentNode.host;
      }
      var cousins = wmjQuery(currentElement).find(selector);
      if (cousins.length > 0) {
        return {
          cousins: cousins,
          level: levelCount
        };
      }
      levelCount++;
    }
    return {
      cousins: wmjQuery(),
      level: levelCount
    };
  } catch (e) {
    (0, _logger.log)('Error traversing DOM:', e);
    return {
      cousins: wmjQuery(),
      level: levels
    };
  }
}
var getAxAttributes = function getAxAttributes(element) {
  var attributes = Array.from(element.attributes);
  var ariaAttributes = attributes.filter(function (attr) {
    return attr.name.startsWith('aria-') || attr.name === 'role';
  });
  if (ariaAttributes.length === 0) {
    return undefined;
  }
  var ariaObject = {};
  ariaAttributes.forEach(function (attr) {
    ariaObject[attr.name] = element.getAttribute(attr.name);
  });
  return ariaObject;
};
var getFirstVisible = function getFirstVisible(elem) {
  return elem.filter(':deepui_visible').filter(':first');
};
var labelFor = function labelFor(elemId) {
  return "label[for='".concat(CSS.escape(elemId), "']");
};
var metaDataFilters = exports.metaDataFilters = [{
  origin: 'labelForElementId',
  searcher: function searcher(elem) {
    var labelElem = getFirstVisible(wmjQuery(labelFor(elem.id)));
    if (labelElem.length) {
      var accessibility = getAxAttributes(labelElem[0]);
      return {
        name: labelElem.text(),
        accessibility: accessibility
      };
    }
  }
}, {
  origin: 'closestNestedLabelForElementId',
  searcher: function searcher(elem) {
    var _findClosestCousins = findClosestCousins(elem, labelFor(elem.id)),
      cousins = _findClosestCousins.cousins,
      level = _findClosestCousins.level;
    var labelElem = getFirstVisible(cousins);
    if (labelElem.length) {
      var axAttributes = getAxAttributes(labelElem[0]);
      return {
        name: labelElem.text(),
        accessibility: _objectSpread({
          level: level
        }, axAttributes)
      };
    }
  }
}, {
  origin: 'closestNestedLabel',
  searcher: function searcher(elem) {
    var _findClosestCousins2 = findClosestCousins(elem, 'label'),
      cousins = _findClosestCousins2.cousins,
      level = _findClosestCousins2.level;
    var labelElem = getFirstVisible(cousins);
    if (labelElem.length) {
      var axAttributes = getAxAttributes(labelElem[0]);
      return {
        name: labelElem.text(),
        accessibility: _objectSpread({
          level: level
        }, axAttributes)
      };
    }
  }
}, {
  origin: 'aria-labelledby',
  searcher: function searcher(elem) {
    var _findClosestCousins3 = findClosestCousins(elem, '[aria-labelledby]'),
      cousins = _findClosestCousins3.cousins,
      level = _findClosestCousins3.level;
    var labelledByElem = getFirstVisible(cousins);
    if (labelledByElem.length) {
      var labelElem = getFirstVisible(wmjQuery("[id=\"".concat(CSS.escape(labelledByElem[0].getAttribute('aria-labelledby')), "\"]")));
      if (labelElem.length) {
        var axAttributes = getAxAttributes(labelElem[0]);
        return {
          name: labelElem.text(),
          accessibility: _objectSpread({
            level: level
          }, axAttributes)
        };
      }
    }
  }
}].concat(_toConsumableArray(['aria-label', 'role'].map(function (axData) {
  return {
    origin: axData,
    searcher: function searcher(elem) {
      var _findClosestCousins4 = findClosestCousins(elem, "[".concat(axData, "]"), 10),
        cousins = _findClosestCousins4.cousins,
        level = _findClosestCousins4.level;
      var ariaLabelElem = getFirstVisible(cousins);
      if (ariaLabelElem.length) {
        var axAttributes = getAxAttributes(ariaLabelElem[0]);
        return {
          name: ariaLabelElem.attr(axData),
          accessibility: _objectSpread({
            level: level
          }, axAttributes)
        };
      }
    }
  };
})), _toConsumableArray(['h1', 'h2', 'h3'].map(function (hTag) {
  return {
    origin: hTag,
    searcher: function searcher(elem) {
      var _findClosestCousins5 = findClosestCousins(elem, "".concat(hTag), 1000),
        cousins = _findClosestCousins5.cousins,
        level = _findClosestCousins5.level;
      var hElem = getFirstVisible(cousins);
      if (hElem.length) {
        var axAttributes = getAxAttributes(hElem[0]);
        return {
          name: hElem.text(),
          accessibility: _objectSpread({
            level: level
          }, axAttributes)
        };
      }
    }
  };
})));


/***/ }),

/***/ 375:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

"use strict";

Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.getContext = getContext;
var _config = __webpack_require__(949);
var _http = __webpack_require__(52);
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator.return && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, catch: function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function getExistingContextFromDataJson(valueToMatch, dataFile) {
  for (var key in dataFile) {
    if (key === 'default') continue;
    var regex = new RegExp(key);
    if (regex.test(valueToMatch)) {
      return dataFile[key].context || null;
    }
  }
  return null;
}
function getContext(_x, _x2) {
  return _getContext.apply(this, arguments);
}
function _getContext() {
  _getContext = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee(sessionData, dataFile) {
    var groupingStrategy, existingContextFromDataFile, url, res;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          groupingStrategy = dataFile.default.groupingStrategy;
          existingContextFromDataFile = getExistingContextFromDataJson(sessionData[groupingStrategy], dataFile);
          if (!existingContextFromDataFile) {
            _context.next = 4;
            break;
          }
          return _context.abrupt("return", existingContextFromDataFile);
        case 4:
          url = "".concat((0, _config.getConfig)().UII_EVERYWHERE_ENGINE_URL, "/uiie/platform-context");
          _context.next = 7;
          return (0, _http.fetchData)({
            url: url,
            query: {
              valueToMatch: sessionData[groupingStrategy],
              userGuid: window._walkMe.getUserGuid()
            },
            logContext: 'platform context'
          });
        case 7:
          res = _context.sent;
          if (!(res && res.data)) {
            _context.next = 10;
            break;
          }
          return _context.abrupt("return", res.data.platformContext);
        case 10:
          return _context.abrupt("return", null);
        case 11:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return _getContext.apply(this, arguments);
}


/***/ }),

/***/ 780:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

"use strict";

Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.skillDiscovery = exports.inputTyping = void 0;
var _logger = __webpack_require__(681);
var _dom = __webpack_require__(342);
var _dataLoader = __webpack_require__(318);
var _copilot = __webpack_require__(421);
var _consts = __webpack_require__(736);
var _helpers = __webpack_require__(591);
var _config = __webpack_require__(949);
var meta = _interopRequireWildcard(__webpack_require__(286));
var _metadata = __webpack_require__(78);
var _http = __webpack_require__(52);
var skillDiscoveryDb = _interopRequireWildcard(__webpack_require__(458));
var llmService = _interopRequireWildcard(__webpack_require__(598));
var _asyncQueue = __webpack_require__(114);
var _walkmex = __webpack_require__(300);
var platformContextService = _interopRequireWildcard(__webpack_require__(375));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator.return && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, catch: function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var getCtx = (__webpack_require__(257)/* .getCtx */ .yK);
var copyFlag = false;
var reportSessionThreshold = _consts.REPORT_THRESHOLD;
var captureDomThreshold = _consts.CAPTURE_DOM_THRESHOLD;
var interactionTimeToLog = _consts.PERF_THRESHOLD_TO_LOG;
var SessionElement = /*#__PURE__*/function () {
  function SessionElement(sessionId) {
    _classCallCheck(this, SessionElement);
    this.browserSessionId = sessionId;
    this.hashedEndUserId = (0, _helpers.getHashedEndUserId)();
    this.initSession({}, true);
  }
  return _createClass(SessionElement, [{
    key: "initSession",
    value: function initSession(_ref) {
      var _this = this;
      var interaction = _ref.interaction,
        currElement = _ref.currElement,
        selector = _ref.selector,
        insideIframe = _ref.insideIframe;
      var init = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      Object.keys(this).forEach(function (key) {
        if (key !== 'browserSessionId' && key !== 'hashedEndUserId') {
          delete _this[key];
        }
      });
      this.keyTypeInCount = 0;
      this.deleteCount = 0;
      this.valueLength = 0;
      this.existingValueLength = 0;
      this.metaDataTimeThresholdExceededCounter = 0;
      this.reportSession = false;
      this.domCaptureFailed = false;
      this.insideIframe = insideIframe || false;
      this.domCaptured = false;
      this.textPasted = false;
      this.version = meta.version;
      if (!init) {
        this.userGuid = (0, _helpers.getUserGuid)();
        this.walkmeEnv = (0, _helpers.getEnvId)();
        this.platform = (0, _helpers.getPlatform)();
        this.selector = selector;
        this.tagName = currElement.tagName;
        this.existingValue = interaction.value;
        this.value = interaction.value;
        this.domInnerHTML = null;
        this.elementHtml = null;
        if (interaction.value !== undefined) {
          this.valueOrigin = interaction.valueOrigin;
          this.valueLength = interaction.value.length;
          this.existingValueLength = interaction.value.length;
        }
        this.startTimestamp = interaction.timestamp;
        this.lastTimestamp = interaction.timestamp;
        this.url = window.location.href;
        this.element = currElement;
        this.reportSession = Math.random() <= reportSessionThreshold && this.isElementToCapture();
        if (this.reportSession) {
          (0, _logger.log)("REPORT SESSION");
        }
      }
    }
  }, {
    key: "isElementToCapture",
    value: function isElementToCapture() {
      return this.tagName !== 'BODY';
    }
  }]);
}();
function isCharCodePunctuation(charCode) {
  // All ascii code for punctuation
  return 32 <= charCode && charCode <= 47 || 58 <= charCode && charCode <= 64 || 91 <= charCode && charCode <= 96 || 123 <= charCode && charCode <= 126 || 166 <= charCode && charCode <= 223 || 240 <= charCode && charCode <= 255;
}
function isCharCodeNum(charCode) {
  return _consts.CHAR_CODE.zero <= charCode && charCode <= _consts.CHAR_CODE.nine;
}
function getMaskedKey(key, code) {
  if (!key) {
    return;
    // A special key with a specific side
  } else if (_consts.sideSpecificKeyCodes.has(code)) {
    return code;
    // A special key
  } else if (key.length !== 1) {
    return key;
  } else if (isCharCodeNum(key.charCodeAt())) {
    return _consts.REPLACE_CHARS.replaceDigitCode;
  } else if (isCharCodePunctuation(key.charCodeAt())) {
    return key;
  }
  return _consts.REPLACE_CHARS.replaceLetterCode;
}
function getMaskedValue(value) {
  return _toConsumableArray(value).map(function (char) {
    var charCode = char.charCodeAt();
    if (isCharCodeNum(charCode)) {
      return _consts.REPLACE_CHARS.replaceDigit;
    } else if (isCharCodePunctuation(charCode)) {
      return char;
    }
    return _consts.REPLACE_CHARS.replaceLetter;
  }).join('');
}
var EventInteraction = /*#__PURE__*/_createClass(function EventInteraction(currEvent, currElement) {
  _classCallCheck(this, EventInteraction);
  // Event data
  this.type = currEvent.type;
  this.timestamp = Date.now();
  this.eventTimestamp = currEvent.timeStamp;

  // Input data
  this.keyCode = currEvent.keyCode;
  this.key = currEvent.key;
  this.keyMasked = getMaskedKey(currEvent.key, currEvent.code);
  this.code = currEvent.code;
  this.metaKey = currEvent.metaKey;
  this.shiftKey = currEvent.shiftKey;
  this.value = '';
  this.valueOrigin = 'none';
  if (currElement.value) {
    this.value = currElement.value;
    this.valueOrigin = 'element.value';
  } else if (currElement.innerText) {
    this.value = currElement.innerText;
    this.valueOrigin = 'element.innerText';
  }
  if (this.value !== undefined) {
    this.valueLength = this.value.length;
  }
  this.copiedText = undefined;
  this.copiedTextMasked = undefined;
  if (currEvent.type === 'paste' && currEvent.clipboardData) {
    this.copiedText = currEvent.clipboardData.getData('text/plain');
    this.copiedTextMasked = getMaskedValue(this.copiedText);
  }
});
function toggleListeners(_ref2) {
  var nativeIframe = _ref2.nativeIframe,
    element = _ref2.element,
    handler = _ref2.handler,
    events = _ref2.events,
    add = _ref2.add,
    _ref2$eventsToPriorit = _ref2.eventsToPrioritizeCapture,
    eventsToPrioritizeCapture = _ref2$eventsToPriorit === void 0 ? [] : _ref2$eventsToPriorit;
  var nativeAdd = nativeIframe.contentWindow.document.addEventListener;
  var nativeRemove = nativeIframe.contentWindow.document.removeEventListener;
  events.forEach(function (event) {
    if (add) {
      if (eventsToPrioritizeCapture.indexOf(event) > -1) {
        nativeAdd.apply(element, [event, handler, {
          capture: true
        }]);
      } else {
        nativeAdd.apply(element, [event, handler]);
      }
    } else {
      nativeRemove.apply(element, [event, handler]);
    }
  });
}
function getElement(event) {
  if (event.iframeTarget) {
    return event.iframeTarget;
  }
  var elementToReturn = event.target;
  var path = event.composedPath();
  if (path) {
    elementToReturn = path[0];
  }
  return elementToReturn;
}
var inputTyping = exports.inputTyping = {
  init: function init() {
    (0, _logger.log)('START EVERYWHERE');
    var siteConfig = getCtx().get('SiteConfigManager').get();
    var _ref3 = siteConfig && siteConfig.Custom || {},
      uii = _ref3.uii;
    var _ref4 = uii || {},
      _ref4$collectInput = _ref4.collectInput,
      collectInput = _ref4$collectInput === void 0 ? false : _ref4$collectInput,
      _ref4$saveDom = _ref4.saveDom,
      saveDom = _ref4$saveDom === void 0 ? false : _ref4$saveDom,
      _ref4$sendSession = _ref4.sendSession,
      sendSession = _ref4$sendSession === void 0 ? false : _ref4$sendSession,
      _ref4$loadData = _ref4.loadData,
      loadData = _ref4$loadData === void 0 ? false : _ref4$loadData,
      _ref4$useCopilot = _ref4.useCopilot,
      useCopilot = _ref4$useCopilot === void 0 ? false : _ref4$useCopilot,
      _ref4$useFieldIntegri = _ref4.useFieldIntegrityAI,
      useFieldIntegrityAI = _ref4$useFieldIntegri === void 0 ? false : _ref4$useFieldIntegri,
      _ref4$useSkillDiscove = _ref4.useSkillDiscovery,
      useSkillDiscovery = _ref4$useSkillDiscove === void 0 ? false : _ref4$useSkillDiscove,
      _ref4$interactionTime = _ref4.interactionTimeThreshold,
      interactionTimeThreshold = _ref4$interactionTime === void 0 ? _consts.INTERACTION_TIME_THRESHOLD : _ref4$interactionTime,
      _ref4$interactionKeyC = _ref4.interactionKeyCountThreshold,
      interactionKeyCountThreshold = _ref4$interactionKeyC === void 0 ? _consts.INTERACTION_KEY_COUNT_THRESHOLD : _ref4$interactionKeyC,
      _ref4$reportThreshold = _ref4.reportThreshold,
      reportThreshold = _ref4$reportThreshold === void 0 ? _consts.REPORT_THRESHOLD : _ref4$reportThreshold,
      _ref4$captureThreshol = _ref4.captureThreshold,
      captureThreshold = _ref4$captureThreshol === void 0 ? _consts.CAPTURE_DOM_THRESHOLD : _ref4$captureThreshol,
      _ref4$perfThresholdTo = _ref4.perfThresholdToLog,
      perfThresholdToLog = _ref4$perfThresholdTo === void 0 ? _consts.PERF_THRESHOLD_TO_LOG : _ref4$perfThresholdTo,
      _ref4$maxCaptureMetad = _ref4.maxCaptureMetadataTimeMs,
      maxCaptureMetadataTimeMs = _ref4$maxCaptureMetad === void 0 ? _consts.MAX_CAPTURE_METADATA_TIME_MS : _ref4$maxCaptureMetad,
      _ref4$eventsToPriorit = _ref4.eventsToPrioritizeCapture,
      eventsToPrioritizeCapture = _ref4$eventsToPriorit === void 0 ? [] : _ref4$eventsToPriorit,
      _ref4$sessionFieldVal = _ref4.sessionFieldValueMinimumLength,
      sessionFieldValueMinimumLength = _ref4$sessionFieldVal === void 0 ? _consts.SESSION_FIELD_VALUE_MINIMUM_LENGTH : _ref4$sessionFieldVal,
      _ref4$fieldValueMinim = _ref4.fieldValueMinimumWords,
      fieldValueMinimumWords = _ref4$fieldValueMinim === void 0 ? _consts.FIELD_VALUE_MINIMUM_WORDS : _ref4$fieldValueMinim,
      _ref4$aiManagerMsaGui = _ref4.aiManagerMsaGuid,
      aiManagerMsaGuid = _ref4$aiManagerMsaGui === void 0 ? '' : _ref4$aiManagerMsaGui,
      _ref4$uiieFieldScoreF = _ref4.uiieFieldScoreFunc,
      uiieFieldScoreFunc = _ref4$uiieFieldScoreF === void 0 ? _consts.UIIE_FIELD_SCORE_FUNC : _ref4$uiieFieldScoreF,
      _ref4$uiieApp = _ref4.uiieApp,
      uiieApp = _ref4$uiieApp === void 0 ? _consts.UIIE_APP : _ref4$uiieApp,
      _ref4$uiieAppVersion = _ref4.uiieAppVersion,
      uiieAppVersion = _ref4$uiieAppVersion === void 0 ? _consts.UIIE_APP_VERSION : _ref4$uiieAppVersion,
      _ref4$uiieSkillDiscov = _ref4.uiieSkillDiscoveryFunc,
      uiieSkillDiscoveryFunc = _ref4$uiieSkillDiscov === void 0 ? _consts.UIIE_SKILL_DISCOVERY_FUNC : _ref4$uiieSkillDiscov,
      _ref4$llmTopP = _ref4.llmTopP,
      llmTopP = _ref4$llmTopP === void 0 ? _consts.UIIE_TOP_P : _ref4$llmTopP,
      _ref4$llmDefaultTempe = _ref4.llmDefaultTemperature,
      llmDefaultTemperature = _ref4$llmDefaultTempe === void 0 ? _consts.DEFAULT_TEMPERATURE : _ref4$llmDefaultTempe,
      _ref4$llmDefaultFrequ = _ref4.llmDefaultFrequencyPenalty,
      llmDefaultFrequencyPenalty = _ref4$llmDefaultFrequ === void 0 ? _consts.DEFAULT_FREQUENCY_PENALTY : _ref4$llmDefaultFrequ,
      _ref4$llmDefaultPrese = _ref4.llmDefaultPresencePenalty,
      llmDefaultPresencePenalty = _ref4$llmDefaultPrese === void 0 ? _consts.DEFAULT_PRESENCE_PENALTY : _ref4$llmDefaultPrese,
      _ref4$llmDefaultMaxTo = _ref4.llmDefaultMaxTokens,
      llmDefaultMaxTokens = _ref4$llmDefaultMaxTo === void 0 ? _consts.DEFAULT_MAX_TOKENS : _ref4$llmDefaultMaxTo,
      _ref4$fieldRelevanceT = _ref4.fieldRelevanceThreshold,
      fieldRelevanceThreshold = _ref4$fieldRelevanceT === void 0 ? _consts.FIELD_RELEVANCE_THRESHOLD : _ref4$fieldRelevanceT,
      _ref4$useDeepUi = _ref4.useDeepUi,
      useDeepUi = _ref4$useDeepUi === void 0 ? true : _ref4$useDeepUi;
    reportSessionThreshold = reportThreshold;
    captureDomThreshold = captureThreshold;
    this.domCaptureAttemptCounter = 0;
    this.captureDomFlag = Math.random() < captureDomThreshold;
    if (this.captureDomFlag) {
      (0, _logger.log)("CAPTURE DOM");
    }
    interactionTimeToLog = perfThresholdToLog;
    this.config = {
      collectInput: collectInput === 'true',
      saveDom: saveDom === 'true',
      sendSession: sendSession === 'true',
      shouldLoadDataFile: loadData === 'true',
      useCopilot: useCopilot === 'true' && _copilot.copilot.shouldUseCopilot(),
      useFieldIntegrityAI: useFieldIntegrityAI === 'true',
      useSkillDiscovery: useSkillDiscovery === 'true',
      interactionTimeThreshold: interactionTimeThreshold,
      interactionKeyCountThreshold: interactionKeyCountThreshold,
      maxCaptureMetadataTimeMs: maxCaptureMetadataTimeMs,
      eventsToPrioritizeCapture: eventsToPrioritizeCapture,
      sessionFieldValueMinimumLength: sessionFieldValueMinimumLength,
      aiManagerMsaGuid: aiManagerMsaGuid,
      uiieFieldScoreFunc: uiieFieldScoreFunc,
      uiieSkillDiscoveryFunc: uiieSkillDiscoveryFunc,
      uiieApp: uiieApp,
      uiieAppVersion: uiieAppVersion,
      llmTopP: llmTopP,
      llmDefaultTemperature: llmDefaultTemperature,
      llmDefaultFrequencyPenalty: llmDefaultFrequencyPenalty,
      llmDefaultPresencePenalty: llmDefaultPresencePenalty,
      llmDefaultMaxTokens: llmDefaultMaxTokens,
      fieldRelevanceThreshold: fieldRelevanceThreshold,
      fieldValueMinimumWords: fieldValueMinimumWords,
      useDeepUi: useDeepUi
    };
    this.dataFile = null;
    this.loadDataFile();
    this.currSession = new SessionElement(getCtx().get('GuidGenerator').generateGuid());
    if (this.isEditorWalkmeEnv()) {
      return;
    }
    _logger.uiieLogger.ddAndLog('UII EVERYWHERE', {
      UIIE_config: _objectSpread(_objectSpread({}, this.config), {}, {
        reportSessionThreshold: reportSessionThreshold,
        captureDomThreshold: captureDomThreshold,
        interactionTimeToLog: interactionTimeToLog,
        fieldRelevanceThreshold: fieldRelevanceThreshold
      })
    });
    this.initializeTrackingParameters();
    this.recordEvent = this.recordEvent.bind(this);
    this.beforeUnloadHandler = this.beforeUnloadHandler.bind(this);
    this.recordError = this.recordError.bind(this);
    this.startWindowListeners();
    this.startTrackingListeners();
  },
  shutdown: function shutdown() {
    this.stopTrackingListeners();
    this.stopWindowListeners();
  },
  processDataFile: function processDataFile() {
    skillDiscovery.suggestActionableSkills();
    skillDiscovery.processPendingRequests();
  },
  loadDataFile: function () {
    var _loadDataFile = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
      var loadStartTime, guid, filePath, skills_catalog_map, skills_catalog;
      return _regeneratorRuntime().wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            if (!this.config.shouldLoadDataFile) {
              _context.next = 19;
              break;
            }
            loadStartTime = Date.now();
            guid = (0, _helpers.getUserGuid)();
            filePath = "".concat(guid, "/").concat(_consts.DATA_FILE_NAME);
            _context.prev = 4;
            _context.next = 7;
            return (0, _dataLoader.loadFile)(filePath);
          case 7:
            this.dataFile = _context.sent;
            skills_catalog_map = this.dataFile.skills.reduce(function (acc, _ref5) {
              var id = _ref5.id,
                title = _ref5.title,
                modelDescription = _ref5.modelDescription;
              acc[id] = {
                name: title,
                description: modelDescription,
                id: id
              };
              return acc;
            }, {});
            skills_catalog = JSON.stringify(this.dataFile.skills.map(function (_ref6) {
              var id = _ref6.id,
                title = _ref6.title,
                modelDescription = _ref6.modelDescription;
              return {
                id: id,
                name: title,
                description: modelDescription
              };
            }));
            this.dataFile.skills_catalog_map = skills_catalog_map;
            this.dataFile.skills_catalog = skills_catalog;
            this.processDataFile();
            _logger.uiieLogger.ddAndLog('Data file loaded', {
              milliseconds: Date.now() - loadStartTime
            });
            _context.next = 19;
            break;
          case 16:
            _context.prev = 16;
            _context.t0 = _context["catch"](4);
            _logger.uiieLogger.ddAndWarnLog("Couldn't fetch data file", {
              error: _context.t0
            });
          case 19:
          case "end":
            return _context.stop();
        }
      }, _callee, this, [[4, 16]]);
    }));
    function loadDataFile() {
      return _loadDataFile.apply(this, arguments);
    }
    return loadDataFile;
  }(),
  initializeTrackingParameters: function initializeTrackingParameters() {
    var _this2 = this;
    this.filterRunsCounter = new Map();
    _metadata.metaDataFilters.forEach(function (filter) {
      _this2.filterRunsCounter.set(filter.origin, 0);
    });
    this.interactionSequence = [];
    this.typingOccurred = false;
    this.valueEntered = false;
    this.sessionToSend = false;
    this.metaOn = false;
    this.findMetaData = false;
    this.sendDomRetryCount = 0;
    this.interactionTimeExceeded = false;
    this.interactionTimeExceededCounter = 0;
    copyFlag = false;
  },
  startWindowListeners: function startWindowListeners() {
    var nativeIframe = (0, _dom.getNativeProxy)();
    toggleListeners({
      nativeIframe: nativeIframe,
      element: window,
      events: ['visibilitychange', 'beforeunload'],
      handler: this.beforeUnloadHandler,
      add: true
    });
  },
  stopWindowListeners: function stopWindowListeners() {
    var nativeIframe = (0, _dom.getNativeProxy)();
    toggleListeners({
      nativeIframe: nativeIframe,
      element: window,
      events: ['visibilitychange', 'beforeunload'],
      handler: this.beforeUnloadHandler,
      add: false
    });
  },
  startTrackingListeners: function startTrackingListeners() {
    (0, _logger.log)('################# START LISTENERS ################');
    var nativeIframe = (0, _dom.getNativeProxy)();
    toggleListeners({
      nativeIframe: nativeIframe,
      element: window,
      events: _consts.eventsToTrack,
      handler: this.recordEvent,
      add: true,
      eventsToPrioritizeCapture: this.config.eventsToPrioritizeCapture
    });
    toggleListeners({
      nativeIframe: nativeIframe,
      element: window,
      events: ['error'],
      handler: this.recordError,
      add: true
    });
  },
  stopTrackingListeners: function stopTrackingListeners() {
    (0, _logger.log)('$$$$$$$$$$$$$ STOP LISTENERS $$$$$$$$$$$$$');
    var nativeIframe = (0, _dom.getNativeProxy)();
    toggleListeners({
      nativeIframe: nativeIframe,
      element: window,
      events: _consts.eventsToTrack,
      handler: this.recordEvent,
      add: false
    });
    toggleListeners({
      nativeIframe: nativeIframe,
      element: window,
      events: ['error'],
      handler: this.recordError,
      add: false
    });
  },
  beforeUnloadHandler: function () {
    var _beforeUnloadHandler = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee2(event) {
      return _regeneratorRuntime().wrap(function _callee2$(_context2) {
        while (1) switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            (0, _logger.log)(event.type);
            (0, _logger.log)(document.visibilityState);
            if (event.type === 'beforeunload') {
              this.stopTrackingListeners();
              this.stopWindowListeners();
            } else if (event.type === 'visibilitychange') {
              if (document.visibilityState === 'hidden') {
                this.stopTrackingListeners();
              } else if (document.visibilityState === 'visible') {
                this.initializeTrackingParameters();
                this.startTrackingListeners();
              }
            }
            _context2.next = 6;
            return this.trackInteraction(event, window);
          case 6:
            _context2.next = 11;
            break;
          case 8:
            _context2.prev = 8;
            _context2.t0 = _context2["catch"](0);
            _logger.uiieLogger.ddAndErrorLog('beforeUnloadHandler', {
              errorMessage: _context2.t0.message,
              errorStack: _context2.t0.stack
            });
          case 11:
          case "end":
            return _context2.stop();
        }
      }, _callee2, this, [[0, 8]]);
    }));
    function beforeUnloadHandler(_x) {
      return _beforeUnloadHandler.apply(this, arguments);
    }
    return beforeUnloadHandler;
  }(),
  recordError: function recordError(event, source, lineno, colno, error) {
    if (event && event.isTrusted) {
      return;
    }
    _logger.uiieLogger.ddAndErrorLog('recordError', {
      event: event,
      source: source,
      lineno: lineno,
      colno: colno,
      error: error
    });
  },
  recordEvent: function () {
    var _recordEvent = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee3(event) {
      var interactionType, start, element, executionTime;
      return _regeneratorRuntime().wrap(function _callee3$(_context3) {
        while (1) switch (_context3.prev = _context3.next) {
          case 0:
            interactionType = event.type;
            _context3.prev = 1;
            start = performance.now();
            element = getElement(event);
            _context3.next = 6;
            return this.trackInteraction(event, element);
          case 6:
            executionTime = performance.now() - start;
            if (executionTime > interactionTimeToLog) {
              if (!this.interactionTimeExceeded) {
                this.interactionTimeExceeded = true;
                _logger.uiieLogger.ddAndLog("recordEvent Execution time exceeded threshold", {
                  interactionType: interactionType,
                  executionTime: executionTime
                });
              }
              this.interactionTimeExceededCounter += 1;
            }
            _context3.next = 13;
            break;
          case 10:
            _context3.prev = 10;
            _context3.t0 = _context3["catch"](1);
            _logger.uiieLogger.ddAndErrorLog('recordEvent', {
              errorMessage: _context3.t0.message,
              errorStack: _context3.t0.stack
            });
          case 13:
          case "end":
            return _context3.stop();
        }
      }, _callee3, this, [[1, 10]]);
    }));
    function recordEvent(_x2) {
      return _recordEvent.apply(this, arguments);
    }
    return recordEvent;
  }(),
  adaptDomData: function adaptDomData(domData) {
    var list = domData.list,
      url = domData.url,
      domClientId = domData.domClientId,
      split = domData.split,
      ifrId = domData.ifrId,
      encrypted = domData.encrypted,
      dictionary = domData.dictionary,
      blockedPhrases = domData.blockedPhrases,
      lexicon = domData.lexicon,
      meta = domData.meta,
      page = domData.page,
      browser = domData.browser;
    var domDataToSend = _defineProperty({
      url: url,
      list: list,
      domClientId: domClientId,
      split: split,
      ifrId: ifrId,
      encrypted: encrypted,
      dictionary: dictionary,
      blockedPhrases: blockedPhrases,
      lexicon: lexicon || _consts.DEFAULT_LEXICON_OBJECT,
      browser: browser,
      pageData: page,
      meta: meta,
      formAnalysis: {
        sessionMeta: {
          platformId: this.currSession.platform
        }
      },
      formAnalysisThreshold: 1
    }, "meta", {
      uiiEverywhere: true
    });
    return domDataToSend;
  },
  findNode: function findNode(element) {
    if (!this.dom) {
      return;
    }
    var thisArg = this;
    return this.dom.list.find(function (item, index) {
      return thisArg.dom.originalElementsList[index] === element;
    });
  },
  captureDom: function () {
    var _captureDom = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee4(fromSessionToSend) {
      var domElement, start, executionTime;
      return _regeneratorRuntime().wrap(function _callee4$(_context4) {
        while (1) switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            if (this.currSession.element) {
              _context4.next = 4;
              break;
            }
            _logger.uiieLogger.ddAndErrorLog("Curr session element doesnt exist", {
              url: this.currSessions.url
            });
            return _context4.abrupt("return");
          case 4:
            domElement = this.findNode(this.currSession.element);
            if (!domElement) {
              _context4.next = 9;
              break;
            }
            (0, _logger.log)("Element already captured in dom ".concat(this.dom.domClientId));
            _context4.next = 20;
            break;
          case 9:
            start = performance.now(); // await here because there is a lazy loading of the relevent libraries inside this function call
            _context4.next = 12;
            return window._deepUiInternals.captureDomForUiie(false, window, undefined, false, true);
          case 12:
            this.dom = _context4.sent;
            this.dom['sent'] = false;
            this.currSession.domCaptured = true;
            executionTime = performance.now() - start;
            (0, _logger.log)("Capture Dom Execution time: ".concat(executionTime, "ms"));
            domElement = this.findNode(this.currSession.element);
            this.domCaptureAttemptCounter = 0;
            this.currSession.domCaptureFailed = false;
          case 20:
            this.currSession.domClientId = this.dom.domClientId;
            if (domElement) {
              _context4.next = 25;
              break;
            }
            _logger.uiieLogger.ddAndWarnLog('Element not found in dom', {
              elementId: this.currSession.element.id,
              elementType: this.currSession.element.type,
              elementClass: this.currSession.element.className
            });
            this.currSession.missingDeepuiIdReason = "Element is missing from dom. Capture fromSessionToSend=".concat(fromSessionToSend);
            return _context4.abrupt("return");
          case 25:
            this.currSession.deepuiId = domElement.deepUi_id;
            _context4.next = 34;
            break;
          case 28:
            _context4.prev = 28;
            _context4.t0 = _context4["catch"](0);
            _logger.uiieLogger.ddAndErrorLog('Capture Dom failed!', {
              errorMessage: _context4.t0.message,
              errorStack: _context4.t0.stack
            });
            this.domCaptureAttemptCounter += 1;
            if (this.domCaptureAttemptCounter === _consts.MAX_DOM_CAPTURE_ATTEMPTS) {
              _logger.uiieLogger.ddAndErrorLog('Capture Dom retries exceeded!', {
                url: this.currSession.url
              });
            }
            this.currSession.domCaptureFailed = true;
          case 34:
          case "end":
            return _context4.stop();
        }
      }, _callee4, this, [[0, 28]]);
    }));
    function captureDom(_x3) {
      return _captureDom.apply(this, arguments);
    }
    return captureDom;
  }(),
  sendSession: function () {
    var _sendSession = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee5(sessionToSave) {
      var SEND_SESSION_URL, response;
      return _regeneratorRuntime().wrap(function _callee5$(_context5) {
        while (1) switch (_context5.prev = _context5.next) {
          case 0:
            SEND_SESSION_URL = "".concat((0, _config.getConfig)().UII_EVERYWHERE_GATEWAY_URL, "/sendSession");
            if (!(this.config.sendSession !== true || sessionToSave.reportSession !== true)) {
              _context5.next = 4;
              break;
            }
            (0, _logger.log)("DIDN'T SAVE SESSION");
            return _context5.abrupt("return");
          case 4:
            (0, _logger.log)('SAVE SESSION');
            _logger.uiieLogger.ddAndLog('Send Session', {
              uiieData: {
                domClientId: sessionToSave.domClientId,
                domCaptured: sessionToSave.domCaptured,
                url: sessionToSave.url,
                insideIframe: sessionToSave.insideIframe,
                interactionTimeExceededCounter: sessionToSave.interactionTimeExceededCounter
              }
            });
            _context5.prev = 6;
            _context5.next = 9;
            return (0, _http.postData)(SEND_SESSION_URL, {
              headers: {
                'Content-Type': 'application/json',
                'x-wmdu-euguid': window._walkMe.getEndUserId(),
                'x-wmdu-uguid': window._walkMe.getUserGuid(),
                'x-wmdu-envid': window._walkMe.getEnvId()
              },
              body: JSON.stringify(sessionToSave),
              timeout: 5000
            });
          case 9:
            response = _context5.sent;
            if (!response.success) {
              _context5.next = 12;
              break;
            }
            return _context5.abrupt("return");
          case 12:
            _logger.uiieLogger.ddAndErrorLog("Save Session not successful! - status: ".concat(response), data);
            _context5.next = 18;
            break;
          case 15:
            _context5.prev = 15;
            _context5.t0 = _context5["catch"](6);
            _logger.uiieLogger.ddAndErrorLog('Send Session failed!', {
              errorMessage: _context5.t0.message,
              errorStack: _context5.t0.stack
            });
          case 18:
          case "end":
            return _context5.stop();
        }
      }, _callee5, this, [[6, 15]]);
    }));
    function sendSession(_x4) {
      return _sendSession.apply(this, arguments);
    }
    return sendSession;
  }(),
  saveSession: function () {
    var _saveSession = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee6(sessionToSave) {
      return _regeneratorRuntime().wrap(function _callee6$(_context6) {
        while (1) switch (_context6.prev = _context6.next) {
          case 0:
            _context6.prev = 0;
            _context6.next = 3;
            return this.sendSession(sessionToSave);
          case 3:
            _context6.next = 8;
            break;
          case 5:
            _context6.prev = 5;
            _context6.t0 = _context6["catch"](0);
            _logger.uiieLogger.ddAndErrorLog('Save Session failed!', {
              errorMessage: _context6.t0.message,
              errorStack: _context6.t0.stack
            });
          case 8:
          case "end":
            return _context6.stop();
        }
      }, _callee6, this, [[0, 5]]);
    }));
    function saveSession(_x5) {
      return _saveSession.apply(this, arguments);
    }
    return saveSession;
  }(),
  getSessionToSend: function getSessionToSend() {
    var sessionToSave = Object.assign({}, this.currSession);
    sessionToSave.valueMasked = getMaskedValue(sessionToSave.value);
    if (!this.config.collectInput) {
      sessionToSave.value = '';
      delete sessionToSave.existingValue;
    }
    return sessionToSave;
  },
  getSequenceToSend: function getSequenceToSend() {
    if (this.config.collectInput) {
      return this.interactionSequence;
    }
    return this.interactionSequence.map(function (interaction) {
      var interactionToSave = Object.assign({}, interaction);
      interactionToSave.valueMasked = getMaskedValue(interactionToSave.value);
      delete interactionToSave.keyCode;
      delete interactionToSave.code;
      delete interactionToSave.key;
      delete interactionToSave.metaKey;
      delete interactionToSave.shiftKey;
      delete interactionToSave.value;
      delete interactionToSave.copiedText;
      return interactionToSave;
    });
  },
  getSessionData: function getSessionData() {
    var sessionToSave = Object.assign({}, this.getSessionToSend());
    var element = (0, _helpers.getElementParentByLevels)(sessionToSave.element.parentElement, _consts.ELEMENT_PARENT_LEVELS);
    sessionToSave.domInnerHTML = element ? element.innerHTML : '';
    sessionToSave.elementHtml = element ? element.outerHTML : '';
    sessionToSave.pageTitle = document.title;
    delete sessionToSave.element;
    return sessionToSave;
  },
  captureAndSendDom: function () {
    var _captureAndSendDom = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee7() {
      var fromSessionToSend,
        _args7 = arguments;
      return _regeneratorRuntime().wrap(function _callee7$(_context7) {
        while (1) switch (_context7.prev = _context7.next) {
          case 0:
            fromSessionToSend = _args7.length > 0 && _args7[0] !== undefined ? _args7[0] : false;
            _context7.prev = 1;
            if (!this.shouldCaptureDom()) {
              _context7.next = 6;
              break;
            }
            (0, _logger.log)("SHOULD CAPTURE DOM");
            _context7.next = 6;
            return this.captureDom(fromSessionToSend);
          case 6:
            if (this.shouldSendDom()) {
              (0, _logger.log)("SHOULD SEND DOM");
              this.sendDom();
            }
            _context7.next = 13;
            break;
          case 9:
            _context7.prev = 9;
            _context7.t0 = _context7["catch"](1);
            _logger.uiieLogger.ddAndErrorLog('captureAndSendDom', _context7.t0);
            throw _context7.t0;
          case 13:
          case "end":
            return _context7.stop();
        }
      }, _callee7, this, [[1, 9]]);
    }));
    function captureAndSendDom() {
      return _captureAndSendDom.apply(this, arguments);
    }
    return captureAndSendDom;
  }(),
  shouldSendDom: function shouldSendDom() {
    return this.dom && this.dom['sent'] === false && this.currSession.reportSession && this.captureDomFlag && this.config.saveDom && this.config.useDeepUi;
  },
  sendDom: function sendDom() {
    this.sendDomRetryCount += 1;
    if (this.sendDomRetryCount > _consts.MAX_CAPTURE_DOM_RETRIES) {
      return;
    } else if (this.sendDomRetryCount === _consts.MAX_CAPTURE_DOM_RETRIES) {
      _logger.uiieLogger.ddAndErrorLog('Send Dom retries!', {
        url: this.dom.url
      });
      return;
    }
    var adaptedRes = this.adaptDomData(this.dom);
    var domToSend = JSON.parse(JSON.stringify(adaptedRes));
    _logger.uiieLogger.ddAndLog('Send Dom', {
      uiieData: {
        domClientId: domToSend.domClientId,
        url: domToSend.url,
        listLength: domToSend.list && domToSend.list.length
      }
    });
    (0, _helpers.tryAsync)(window._deepUiInternals.sendDom, 'Send Dom failed!', domToSend, _consts.CAPTURE_DOM_URL);
    this.dom['sent'] = true;
  },
  aggregateMetaData: function () {
    var _aggregateMetaData = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee8() {
      var _this3 = this;
      var currFilter;
      return _regeneratorRuntime().wrap(function _callee8$(_context8) {
        while (1) switch (_context8.prev = _context8.next) {
          case 0:
            if (!(this.valueEntered && this.findMetaData === false)) {
              _context8.next = 17;
              break;
            }
            currFilter = _metadata.metaDataFilters.find(function (filter) {
              return _this3.filterRunsCounter.get(filter.origin) < _consts.MAX_METADATA_RETRIES;
            });
            if (currFilter) {
              _context8.next = 5;
              break;
            }
            this.findMetaData = true;
            return _context8.abrupt("return");
          case 5:
            _context8.prev = 5;
            _context8.next = 8;
            return Promise.race([this.runFindMetaData(currFilter), new Promise(function (_, reject) {
              return setTimeout(reject, _this3.config.maxCaptureMetadataTimeMs);
            })]);
          case 8:
            _context8.next = 14;
            break;
          case 10:
            _context8.prev = 10;
            _context8.t0 = _context8["catch"](5);
            this.findMetaData = false;
            this.currSession.metaDataTimeThresholdExceededCounter += 1;
          case 14:
            _context8.prev = 14;
            this.filterRunsCounter.set(currFilter.origin, this.filterRunsCounter.get(currFilter.origin) + 1);
            return _context8.finish(14);
          case 17:
          case "end":
            return _context8.stop();
        }
      }, _callee8, this, [[5, 10, 14, 17]]);
    }));
    function aggregateMetaData() {
      return _aggregateMetaData.apply(this, arguments);
    }
    return aggregateMetaData;
  }(),
  shouldCaptureDom: function shouldCaptureDom() {
    return this.sessionToSend && !this.currSession.domClientId && this.domCaptureAttemptCounter < _consts.MAX_CAPTURE_DOM_RETRIES && !this.currSession.domCaptureFailed && this.currSession.reportSession && this.captureDomFlag && this.config.saveDom && this.config.useDeepUi;
  },
  checkTimeCondition: function checkTimeCondition(currInteraction) {
    return this.currSession.startTimestamp > 0 && currInteraction.timestamp - this.currSession.startTimestamp > this.config.interactionTimeThreshold;
  },
  checkKeyCountCondition: function checkKeyCountCondition() {
    return this.currSession.keyTypeInCount > this.config.interactionKeyCountThreshold;
  },
  checkSendingCondition: function checkSendingCondition(interaction) {
    if (!this.currSession.reportSession) {
      return;
    }
    if (this.valueEntered && (this.checkTimeCondition(interaction) || this.checkKeyCountCondition())) {
      this.sessionToSend = true;
    }
  },
  runFindMetaData: function () {
    var _runFindMetaData = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee9(filter) {
      var origin, searcher, currSession, metaData, name, accessibility, trimmedMetaData;
      return _regeneratorRuntime().wrap(function _callee9$(_context9) {
        while (1) switch (_context9.prev = _context9.next) {
          case 0:
            origin = filter.origin, searcher = filter.searcher;
            currSession = this.currSession;
            _context9.prev = 2;
            _context9.next = 5;
            return (0, _helpers.runInIdleAsync)(function () {
              return searcher(currSession.element);
            });
          case 5:
            metaData = _context9.sent;
            if (metaData) {
              name = metaData.name, accessibility = metaData.accessibility;
              trimmedMetaData = (0, _helpers.trimIfString)(name);
              currSession[origin] = trimmedMetaData;
              if (accessibility) {
                currSession["".concat(origin, "-meta")] = accessibility;
              }
            }
            this.filterRunsCounter.set(origin, _consts.MAX_METADATA_RETRIES);
            _context9.next = 13;
            break;
          case 10:
            _context9.prev = 10;
            _context9.t0 = _context9["catch"](2);
            _logger.uiieLogger.ddAndErrorLog("error in FindMetaData: ".concat(_context9.t0.message), {
              errorMessage: _context9.t0.message,
              errorStack: _context9.t0.stack
            });
          case 13:
          case "end":
            return _context9.stop();
        }
      }, _callee9, this, [[2, 10]]);
    }));
    function runFindMetaData(_x6) {
      return _runFindMetaData.apply(this, arguments);
    }
    return runFindMetaData;
  }(),
  hasTypingOccurred: function hasTypingOccurred(interaction) {
    return interaction.key && interaction.key.length === 1;
  },
  recordTyping: function recordTyping(interaction) {
    if (interaction.type === 'keydown') {
      if (interaction.keyCode === _consts.META_LEFT || interaction.keyCode === _consts.META_RIGHT || interaction.keyCode === _consts.CONTROL) {
        this.metaOn = true;
      }
      if (this.metaOn && interaction.keyCode === _consts.KEY_V) {
        copyFlag = true;
      } else if (this.hasTypingOccurred(interaction)) {
        if (!this.typingOccurred) {
          this.typingOccurred = true;
        }
        this.currSession.keyTypeInCount += 1;
      }
      if (_consts.DELETE_KEYS[interaction.keyCode]) {
        this.currSession.deleteCount += 1;
      }
    }
    if (interaction.type === 'keyup') {
      if (_consts.typingKeyCodes.hasOwnProperty(interaction.keyCode)) {
        // keyup resulted of keyboard interaction
        if (interaction.keyCode === _consts.META_LEFT || interaction.keyCode === _consts.META_RIGHT || interaction.keyCode === _consts.CONTROL) {
          this.metaOn = false;
          if (copyFlag) {
            copyFlag = false;
            if (interaction.value.length > 0) {
              this.currSession.textPasted = true;
              this.typingOccurred = true;
              this.currSession.keyTypeInCount += this.getClipboardDataLength(interaction);
            }
          }
        }
      } else {
        // keyup resulted of mouse interaction -> autocomplete
        if (this.currSession.value !== interaction.value) {
          if (interaction.value.length > 0) {
            this.typingOccurred = true;
            this.currSession.textPasted = true;
          }
          this.currSession.keyTypeInCount = interaction.value.length;
        }
      }
      this.checkValueWasEntered(interaction);
      this.currSession.value = interaction.value;
      this.currSession.valueLength = interaction.value.length;
      this.currSession.lastTimestamp = interaction.timestamp;
    }
    interaction.keyTypeInCount = this.currSession.keyTypeInCount;
  },
  getClipboardDataLength: function getClipboardDataLength(interaction) {
    if (!interaction.clipboardText) {
      return interaction.value.length - this.currSession.value.length;
    }
    return interaction.clipboardText.length;
  },
  checkValueWasEntered: function checkValueWasEntered(interaction) {
    if (this.typingOccurred && this.currSession.value !== interaction.value && !this.valueEntered) {
      this.valueEntered = true;
    }
  },
  validateSessionFieldValue: function validateSessionFieldValue(sessionData) {
    return sessionData.valueLength >= inputTyping.config.sessionFieldValueMinimumLength && sessionData.value.split(' ').length > inputTyping.config.fieldValueMinimumWords;
  },
  isEditorWalkmeEnv: function isEditorWalkmeEnv() {
    if (this.currSession.walkmeEnv === _consts.PREVIEW_MODE || this.currSession.walkmeEnv === _consts.PLAY_MODE) {
      _logger.uiieLogger.ddAndWarnLog('WalkMe Editor Mode! Everywhere is disabled');
      getCtx().get('CommonEvents').raiseEvent(_consts.SHUTDOWN_EVERYWHERE_EVENT);
      return true;
    }
    return false;
  },
  trackInteraction: function () {
    var _trackInteraction = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee10(event, currElement) {
      var interaction, sessionToSave, selector;
      return _regeneratorRuntime().wrap(function _callee10$(_context10) {
        while (1) switch (_context10.prev = _context10.next) {
          case 0:
            interaction = new EventInteraction(event, currElement);
            if (!(this.currSession.element !== currElement)) {
              _context10.next = 16;
              break;
            }
            if (!this.sessionToSend) {
              this.checkSendingCondition(interaction);
            }
            (0, _logger.log)("Change Element!! ".concat(this.sessionToSend));
            if (!this.sessionToSend) {
              _context10.next = 11;
              break;
            }
            _context10.next = 7;
            return this.captureAndSendDom(true);
          case 7:
            sessionToSave = this.getSessionData();
            sessionToSave.interactionTimeExceededCounter = this.interactionTimeExceededCounter;
            skillDiscovery.enqueue(sessionToSave);
            this.saveSession(sessionToSave);
          case 11:
            this.initializeTrackingParameters();
            selector = (0, _dom.getXPath)(currElement);
            this.currSession.initSession({
              interaction: interaction,
              currElement: currElement,
              selector: selector,
              insideIframe: event.hasOwnProperty('iframeTarget')
            });
            if (!this.isEditorWalkmeEnv()) {
              _context10.next = 16;
              break;
            }
            return _context10.abrupt("return");
          case 16:
            this.recordTyping(interaction);
            if (!this.sessionToSend) {
              this.checkSendingCondition(interaction);
            }
            _context10.next = 20;
            return Promise.all([this.aggregateMetaData(), this.captureAndSendDom()]);
          case 20:
            this.interactionSequence.push(interaction);
          case 21:
          case "end":
            return _context10.stop();
        }
      }, _callee10, this);
    }));
    function trackInteraction(_x7, _x8) {
      return _trackInteraction.apply(this, arguments);
    }
    return trackInteraction;
  }()
};
var skillDiscovery = exports.skillDiscovery = {
  asyncQueue: new _asyncQueue.AsyncQueue(_consts.DEFAULT_ASYNC_QUEUE_TIMEOUT),
  shouldSuggestSkill: function shouldSuggestSkill() {
    return window.localStorage.getItem(_consts.UII_SKILL_SUGGESTION_KEY) === 'true';
  },
  suggestActionableSkills: function () {
    var _suggestActionableSkills = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee11() {
      var _yield$this$getAction, _yield$this$getAction2, skill, _yield$this$getAction3, promptPlaceholders;
      return _regeneratorRuntime().wrap(function _callee11$(_context11) {
        while (1) switch (_context11.prev = _context11.next) {
          case 0:
            if (!(!inputTyping.dataFile || !inputTyping.dataFile.default || !inputTyping.dataFile.default.pagePrompt)) {
              _context11.next = 2;
              break;
            }
            return _context11.abrupt("return");
          case 2:
            _context11.prev = 2;
            _context11.next = 5;
            return this.getActionableSkills({
              config: inputTyping.config,
              dataFile: inputTyping.dataFile
            });
          case 5:
            _yield$this$getAction = _context11.sent;
            _yield$this$getAction2 = _yield$this$getAction.skill;
            skill = _yield$this$getAction2 === void 0 ? null : _yield$this$getAction2;
            _yield$this$getAction3 = _yield$this$getAction.promptPlaceholders;
            promptPlaceholders = _yield$this$getAction3 === void 0 ? null : _yield$this$getAction3;
            if (skill) {
              _context11.next = 13;
              break;
            }
            _logger.uiieLogger.ddAndWarnLog('No skill returned from LLM');
            return _context11.abrupt("return");
          case 13:
            this.saveSkill({
              llmAnswer: JSON.stringify(skill),
              genericData: promptPlaceholders,
              promptId: inputTyping.dataFile.default.pagePromptId,
              userGuid: window._walkMe.getUserGuid()
            });
            if ((0, _helpers.validateSkillBody)(skill) && this.shouldSuggestSkill()) {
              (0, _walkmex.suggestAction)(skill);
            }
            _context11.next = 20;
            break;
          case 17:
            _context11.prev = 17;
            _context11.t0 = _context11["catch"](2);
            _logger.uiieLogger.ddAndErrorLog('Suggest Skills failed!', {
              errorMessage: _context11.t0.message,
              errorStack: _context11.t0.stack
            });
          case 20:
          case "end":
            return _context11.stop();
        }
      }, _callee11, this, [[2, 17]]);
    }));
    function suggestActionableSkills() {
      return _suggestActionableSkills.apply(this, arguments);
    }
    return suggestActionableSkills;
  }(),
  processPendingRequests: function () {
    var _processPendingRequests = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee12() {
      var _this4 = this;
      var sessions;
      return _regeneratorRuntime().wrap(function _callee12$(_context12) {
        while (1) switch (_context12.prev = _context12.next) {
          case 0:
            if (!(!inputTyping.dataFile || !inputTyping.dataFile.default)) {
              _context12.next = 2;
              break;
            }
            return _context12.abrupt("return");
          case 2:
            _context12.prev = 2;
            _context12.next = 5;
            return skillDiscoveryDb.getAllItems(_consts.SKILL_DISCOVERY_DB, _consts.SKILL_DISCOVERY_STORE, _consts.SKILL_DISCOVERY_STORE_KEY_PATH);
          case 5:
            sessions = _context12.sent;
            _context12.next = 8;
            return this.asyncQueue.run(function () {
              return (0, _asyncQueue.taskGenerator)(sessions, _this4.runInIdle.bind(_this4));
            });
          case 8:
            _context12.next = 13;
            break;
          case 10:
            _context12.prev = 10;
            _context12.t0 = _context12["catch"](2);
            _logger.uiieLogger.ddAndErrorLog('processPendingSkillDiscovery failed!', {
              errorMessage: _context12.t0.message,
              errorStack: _context12.t0.stack
            });
          case 13:
          case "end":
            return _context12.stop();
        }
      }, _callee12, this, [[2, 10]]);
    }));
    function processPendingRequests() {
      return _processPendingRequests.apply(this, arguments);
    }
    return processPendingRequests;
  }(),
  getActionableSkills: function () {
    var _getActionableSkills = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee13(_ref7) {
      var config, dataFile, _data, _data$platform_name, platform_name, _data$platform_contex, platform_context, _data$pagePrompt, pagePrompt, _data$custom_context, custom_context, promptPlaceholders, formattedPrompt, skill;
      return _regeneratorRuntime().wrap(function _callee13$(_context13) {
        while (1) switch (_context13.prev = _context13.next) {
          case 0:
            config = _ref7.config, dataFile = _ref7.dataFile;
            _context13.prev = 1;
            _logger.uiieLogger.ddAndLog("Skill discovery started");
            _data = (0, _helpers.getUiiFAData)(dataFile);
            if (_data) {
              _context13.next = 7;
              break;
            }
            _logger.uiieLogger.ddAndWarnLog('No prompt data found for actionable skill discovery');
            return _context13.abrupt("return");
          case 7:
            _data$platform_name = _data.platform_name, platform_name = _data$platform_name === void 0 ? '' : _data$platform_name, _data$platform_contex = _data.platform_context, platform_context = _data$platform_contex === void 0 ? '' : _data$platform_contex, _data$pagePrompt = _data.pagePrompt, pagePrompt = _data$pagePrompt === void 0 ? '' : _data$pagePrompt, _data$custom_context = _data.custom_context, custom_context = _data$custom_context === void 0 ? (0, _helpers.summarizePageForLLM)() : _data$custom_context;
            promptPlaceholders = {
              url: window.location.href,
              pageTitle: document.title,
              platform_name: platform_name,
              platform_context: platform_context,
              custom_context: custom_context,
              startTimestamp: Date.now(),
              selector: '/'
            };
            formattedPrompt = llmService.getPrompt(promptPlaceholders, pagePrompt);
            if (formattedPrompt) {
              _context13.next = 13;
              break;
            }
            _logger.uiieLogger.ddAndErrorLog("Prompt data is empty or params are missing");
            return _context13.abrupt("return");
          case 13:
            _context13.next = 15;
            return llmService.queryLlm({
              prompt: formattedPrompt,
              config: config,
              uiieFunc: config.uiieSkillDiscoveryFunc
            });
          case 15:
            skill = _context13.sent;
            _logger.uiieLogger.ddAndLog('Skill Suggestion LLM result', {
              skill: skill
            });
            if (!(skill && skill.choices && skill.choices[0])) {
              _context13.next = 19;
              break;
            }
            return _context13.abrupt("return", {
              skill: JSON.parse(skill.choices[0].message.content),
              promptPlaceholders: promptPlaceholders
            });
          case 19:
            _context13.next = 25;
            break;
          case 21:
            _context13.prev = 21;
            _context13.t0 = _context13["catch"](1);
            _logger.uiieLogger.ddAndErrorLog('getActionableSkills failed', {
              errorMessage: _context13.t0.message
            });
            throw _context13.t0;
          case 25:
          case "end":
            return _context13.stop();
        }
      }, _callee13, null, [[1, 21]]);
    }));
    function getActionableSkills(_x9) {
      return _getActionableSkills.apply(this, arguments);
    }
    return getActionableSkills;
  }(),
  queryLlmAndSaveSkill: function () {
    var _queryLlmAndSaveSkill = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee14(_ref8) {
      var sessionData, config, dataFile, llmResult, domInnerHTML, value, elementHtml, url, pageTitle, _dataFile$default, _dataFile$default$pla, defaultPlatformContext, _dataFile$default$pla2, platform_name, _dataFile$default$pro, prompt, context, platform_context, skills_catalog, formattedPrompt, response, _url, selector, startTimestamp, userGuid, _pageTitle;
      return _regeneratorRuntime().wrap(function _callee14$(_context14) {
        while (1) switch (_context14.prev = _context14.next) {
          case 0:
            sessionData = _ref8.sessionToSave, config = _ref8.config, dataFile = _ref8.dataFile;
            _context14.prev = 1;
            _logger.uiieLogger.ddAndLog("Skill discovery started");
            domInnerHTML = sessionData.domInnerHTML, value = sessionData.value, elementHtml = sessionData.elementHtml, url = sessionData.url, pageTitle = sessionData.pageTitle;
            _dataFile$default = dataFile.default, _dataFile$default$pla = _dataFile$default.platform_context, defaultPlatformContext = _dataFile$default$pla === void 0 ? '' : _dataFile$default$pla, _dataFile$default$pla2 = _dataFile$default.platform_name, platform_name = _dataFile$default$pla2 === void 0 ? '' : _dataFile$default$pla2, _dataFile$default$pro = _dataFile$default.prompt, prompt = _dataFile$default$pro === void 0 ? '' : _dataFile$default$pro;
            _context14.next = 7;
            return platformContextService.getContext(sessionData, dataFile);
          case 7:
            context = _context14.sent;
            if (context) {
              platform_context = context;
            } else {
              platform_context = defaultPlatformContext;
            }
            skills_catalog = inputTyping.dataFile.skills_catalog || '[]';
            formattedPrompt = llmService.getPrompt({
              domInnerHTML: domInnerHTML,
              value: value,
              elementHtml: elementHtml,
              url: url,
              pageTitle: pageTitle,
              platform_context: platform_context,
              platform_name: platform_name,
              skills_catalog: skills_catalog
            }, prompt);
            if (formattedPrompt) {
              _context14.next = 14;
              break;
            }
            _logger.uiieLogger.ddAndErrorLog("Prompt data is empty or params are missing");
            return _context14.abrupt("return");
          case 14:
            _context14.next = 16;
            return llmService.queryLlm({
              prompt: formattedPrompt,
              config: config,
              uiieFunc: config.uiieSkillDiscoveryFunc
            });
          case 16:
            llmResult = _context14.sent;
            if (!llmResult) {
              _context14.next = 23;
              break;
            }
            response = JSON.parse(llmResult.choices[0].message.content);
            if (response.selected_skill_id && response.selection_description && inputTyping.dataFile.skills_catalog_map[response.selected_skill_id]) {
              (0, _walkmex.suggestActionWithModal)({
                actionName: inputTyping.dataFile.skills_catalog_map[response.selected_skill_id].name,
                description: inputTyping.dataFile.skills_catalog_map[response.selected_skill_id].description,
                skillId: response.selected_skill_id,
                userGuid: sessionData.userGuid
              });
            }
            _url = sessionData.url, selector = sessionData.selector, startTimestamp = sessionData.startTimestamp, userGuid = sessionData.userGuid, _pageTitle = sessionData.pageTitle;
            _context14.next = 23;
            return this.saveSkill({
              llmAnswer: llmResult.choices[0].message.content,
              genericData: {
                startTimestamp: startTimestamp,
                url: _url,
                selector: selector,
                pageTitle: _pageTitle
              },
              promptId: dataFile.default.promptId,
              userGuid: userGuid
            });
          case 23:
            _context14.next = 29;
            break;
          case 25:
            _context14.prev = 25;
            _context14.t0 = _context14["catch"](1);
            _logger.uiieLogger.ddAndErrorLog('Error during skill discovery', {
              error: _context14.t0,
              userGuid: sessionData.userGuid,
              url: sessionData.url
            });
            throw _context14.t0;
          case 29:
          case "end":
            return _context14.stop();
        }
      }, _callee14, this, [[1, 25]]);
    }));
    function queryLlmAndSaveSkill(_x10) {
      return _queryLlmAndSaveSkill.apply(this, arguments);
    }
    return queryLlmAndSaveSkill;
  }(),
  // async LLM query in idle
  runInIdle: function () {
    var _runInIdle = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee16(sessionToSave) {
      var _this5 = this;
      return _regeneratorRuntime().wrap(function _callee16$(_context16) {
        while (1) switch (_context16.prev = _context16.next) {
          case 0:
            _context16.prev = 0;
            _context16.next = 3;
            return (0, _helpers.runInIdleAsync)(/*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee15() {
              return _regeneratorRuntime().wrap(function _callee15$(_context15) {
                while (1) switch (_context15.prev = _context15.next) {
                  case 0:
                    return _context15.abrupt("return", _this5.queryLlmAndSaveSkill({
                      sessionToSave: sessionToSave,
                      config: inputTyping.config,
                      dataFile: inputTyping.dataFile
                    }));
                  case 1:
                  case "end":
                    return _context15.stop();
                }
              }, _callee15);
            })));
          case 3:
            _context16.next = 5;
            return skillDiscoveryDb.deleteItem(_consts.SKILL_DISCOVERY_DB, _consts.SKILL_DISCOVERY_STORE, sessionToSave.selector);
          case 5:
            _context16.next = 10;
            break;
          case 7:
            _context16.prev = 7;
            _context16.t0 = _context16["catch"](0);
            _logger.uiieLogger.ddAndErrorLog('Async processPendingSkillDiscovery - handleSkillDiscovery failed!', {
              errorMessage: _context16.t0.message,
              errorStack: _context16.t0.stack,
              sessionToSave: sessionToSave
            });
          case 10:
          case "end":
            return _context16.stop();
        }
      }, _callee16, null, [[0, 7]]);
    }));
    function runInIdle(_x11) {
      return _runInIdle.apply(this, arguments);
    }
    return runInIdle;
  }(),
  saveSkill: function () {
    var _saveSkill = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee17(payload) {
      var SEND_SKILL_DISCOVERY_URL, headers;
      return _regeneratorRuntime().wrap(function _callee17$(_context17) {
        while (1) switch (_context17.prev = _context17.next) {
          case 0:
            SEND_SKILL_DISCOVERY_URL = "".concat((0, _config.getConfig)().UII_EVERYWHERE_GATEWAY_URL, "/uiie/skill-discovery");
            headers = {
              'Content-Type': 'application/json',
              'x-wmdu-euguid': window._walkMe.getEndUserId(),
              'x-wmdu-uguid': window._walkMe.getUserGuid(),
              'x-wmdu-envid': window._walkMe.getEnvId()
            };
            _context17.next = 4;
            return (0, _http.sendData)({
              url: SEND_SKILL_DISCOVERY_URL,
              payload: payload,
              headers: headers,
              logContext: 'Skill Discovery'
            });
          case 4:
            return _context17.abrupt("return", _context17.sent);
          case 5:
          case "end":
            return _context17.stop();
        }
      }, _callee17);
    }));
    function saveSkill(_x12) {
      return _saveSkill.apply(this, arguments);
    }
    return saveSkill;
  }(),
  checkPromptData: function checkPromptData(dataFile) {
    return dataFile && dataFile.default && dataFile.default.prompt && dataFile.default.promptId;
  },
  shouldRun: function shouldRun(sessionData) {
    return inputTyping.config.useSkillDiscovery && Math.random() <= inputTyping.config.fieldRelevanceThreshold && inputTyping.validateSessionFieldValue(sessionData) && this.checkPromptData(inputTyping.dataFile);
  },
  enqueue: function () {
    var _enqueue = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee18(sessionToSave) {
      var selector, prevSession, shouldUpdate, prevWords, currWords;
      return _regeneratorRuntime().wrap(function _callee18$(_context18) {
        while (1) switch (_context18.prev = _context18.next) {
          case 0:
            _context18.prev = 0;
            if (this.shouldRun(sessionToSave)) {
              _context18.next = 3;
              break;
            }
            return _context18.abrupt("return");
          case 3:
            selector = sessionToSave.selector;
            if (selector) {
              _context18.next = 7;
              break;
            }
            _logger.uiieLogger.ddAndWarnLog('No selector found for session, skipping skill discovery queue.', {
              sessionToSave: sessionToSave
            });
            return _context18.abrupt("return");
          case 7:
            _context18.next = 9;
            return skillDiscoveryDb.getItem(_consts.SKILL_DISCOVERY_DB, _consts.SKILL_DISCOVERY_STORE, selector);
          case 9:
            prevSession = _context18.sent;
            shouldUpdate = false;
            if (!prevSession) {
              shouldUpdate = true;
            } else {
              prevWords = (0, _helpers.wordCount)(prevSession.value);
              currWords = (0, _helpers.wordCount)(sessionToSave.value);
              if (Math.abs(currWords - prevWords) >= _consts.WORD_COUNT_THRESHOLD) {
                shouldUpdate = true;
              }
            }
            if (!shouldUpdate) {
              _context18.next = 18;
              break;
            }
            _context18.next = 15;
            return skillDiscoveryDb.putItem(_consts.SKILL_DISCOVERY_DB, _consts.SKILL_DISCOVERY_STORE, sessionToSave);
          case 15:
            _logger.uiieLogger.ddAndLog('Skill discovery session queued', {
              selector: selector
            });
            _context18.next = 19;
            break;
          case 18:
            _logger.uiieLogger.ddAndLog('Skill discovery session not updated (no major change)', {
              selector: selector
            });
          case 19:
            _context18.next = 24;
            break;
          case 21:
            _context18.prev = 21;
            _context18.t0 = _context18["catch"](0);
            _logger.uiieLogger.ddAndErrorLog('handleSkillDiscovery failed!', {
              errorMessage: _context18.t0.message,
              errorStack: _context18.t0.stack,
              error: _context18.t0,
              sessionToSave: sessionToSave
            });
          case 24:
          case "end":
            return _context18.stop();
        }
      }, _callee18, this, [[0, 21]]);
    }));
    function enqueue(_x13) {
      return _enqueue.apply(this, arguments);
    }
    return enqueue;
  }()
};


/***/ }),

/***/ 300:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

"use strict";

Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.suggestAction = suggestAction;
exports.suggestActionWithModal = suggestActionWithModal;
var _consts = __webpack_require__(736);
var _htmlElements = __webpack_require__(912);
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var hideActionCondition = {
  displayConditions: {
    nodeDepth: 0,
    nodeType: "Func",
    funcName: "UrlEquals",
    funcArgs: {
      UrlInput: "9999999"
    },
    ConditionId: "d94bcb8998c14bbe800b55520cbb1fc6"
  }
};
function hiddenIawtAction(skill) {
  var freePrompt = "/iawt ".concat(skill.description);
  var action = {
    actionType: _consts.WALKMEX_ACTION_TYPE_PROCESS_TEXT,
    arguments: {
      freePrompt: freePrompt,
      textSource: _consts.WALKMEX_ACTION_ARGUMENT_TEXT_SOURCE
    }
  };
  var displayText = skill.actionName;
  return addSuggestionToActionBar(_objectSpread({
    action: action,
    icon: _consts.WALKMEX_AI_MESSAGE_ICON,
    tooltip: _consts.WALKMEX_UII_SKILL_TOOLTIP,
    displayText: displayText,
    category: _consts.WALKMEX_SUGGESTION_CATEGORY
  }, hideActionCondition));
}
function suggestAction(skill) {
  var freePrompt = "/iawt ".concat(skill.actionable_next_steps);
  var action = {
    actionType: _consts.WALKMEX_ACTION_TYPE_PROCESS_TEXT,
    arguments: {
      freePrompt: freePrompt,
      textSource: _consts.WALKMEX_ACTION_ARGUMENT_TEXT_SOURCE
    }
  };
  var displayText = skill.actionable_skill_name;
  addSuggestionToActionBar({
    action: action,
    icon: _consts.WALKMEX_AI_MESSAGE_ICON,
    tooltip: _consts.WALKMEX_UII_SKILL_TOOLTIP,
    displayText: displayText,
    category: _consts.WALKMEX_SUGGESTION_CATEGORY
  });
}
function suggestActionWithModal(skill) {
  var iawtActionId = hiddenIawtAction(skill);
  if (!iawtActionId) {
    return;
  }
  window.uii = {
    showModalAndRunSkill: function showModalAndRunSkill() {
      (0, _htmlElements.showActionPopup)({
        actionName: skill.actionName,
        description: skill.description,
        actionId: iawtActionId,
        skillId: skill.skillId,
        userGuid: window._walkMe.getUserGuid()
      });
    }
  };
  var action = {
    actionType: 'runFunction',
    arguments: {
      functionPath: 'uii.showModalAndRunSkill'
    }
  };
  var displayText = skill.actionName;
  addSuggestionToActionBar({
    action: action,
    icon: _consts.WALKMEX_AI_MESSAGE_ICON,
    tooltip: _consts.WALKMEX_UII_SKILL_TOOLTIP,
    displayText: displayText,
    category: _consts.WALKMEX_SUGGESTION_CATEGORY
  });
}
function addSuggestionToActionBar(action) {
  if (!WalkMeAPI || !WalkMeAPI.walkmex || !WalkMeAPI.walkmex.actions) {
    return;
  }
  try {
    return WalkMeAPI.walkmex.actions.add(action);
  } catch (error) {
    uiieLogger.ddAndErrorLog('Error adding suggestion to action bar', {
      errorMessage: error.message,
      errorStack: error.stack
    });
  }
}


/***/ }),

/***/ 589:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

"use strict";

var _logger = __webpack_require__(681);
var _uii = __webpack_require__(780);
var _dom = __webpack_require__(342);
var _consts = __webpack_require__(736);
var getCtx = (__webpack_require__(257)/* .getCtx */ .yK);
function shutdownEveywhere() {
  (0, _logger.log)('UII EVERYWHERE - Shutdown');
  _uii.inputTyping.shutdown();
  (0, _dom.stopIframeDiscovery)();
}
function startEverywhere() {
  if (window === window.top) {
    (0, _dom.startIframeDiscovery)();
    var siteConfig = getCtx().get('SiteConfigManager').get();
    var _ref = siteConfig && siteConfig.Custom || {},
      uii = _ref.uii;
    var _ref2 = uii || {},
      _ref2$initThreshold = _ref2.initThreshold,
      initThreshold = _ref2$initThreshold === void 0 ? _consts.INIT_THRESHOLD : _ref2$initThreshold,
      _ref2$errorLogsThresh = _ref2.errorLogsThreshold,
      errorLogsThreshold = _ref2$errorLogsThresh === void 0 ? _consts.ERROR_THRESHOLD_LOG : _ref2$errorLogsThresh,
      _ref2$debugLogsThresh = _ref2.debugLogsThreshold,
      debugLogsThreshold = _ref2$debugLogsThresh === void 0 ? _consts.DEBUG_THRESHOLD_LOG : _ref2$debugLogsThresh;
    _logger.uiieLogger.setDebugThreshold(debugLogsThreshold);
    _logger.uiieLogger.setErrorThreshold(errorLogsThreshold);
    if (Math.random() <= initThreshold) {
      try {
        _uii.inputTyping.init();
        window._uiieInternals = {
          recordEvent: _uii.inputTyping.recordEvent
        };
      } catch (error) {
        _logger.uiieLogger.ddAndErrorLog('UII EVERYWHERE - Uncaught Error', error);
      }
    } else {
      _logger.uiieLogger.ddAndLog('UII EVERYWHERE - Not initialized');
    }
  } else {
    (0, _logger.log)('INSIDE IFRAME');
  }
}
function UII() {
  var _this = this;
  _this.run = run;
  _this.walkmeReady = false;
  _this.deepuiReady = false;
  function ctor() {
    _this.eventsListener = getCtx().get('EventsListener');
  }
  function run() {
    (0, _logger.log)('Start run, waiting for walkme events');
    _this.eventsListener.on('WalkMeReady', function () {
      (0, _logger.log)('WalkMeReady');
      _this.walkmeReady = true;
      startEverywhere();
    });
    _this.eventsListener.on('DeepUiReady', function () {
      (0, _logger.log)('DeepUiReady');
      _this.deepuiReady = true;
    });
    _this.eventsListener.on('UIChanged', function () {
      if (_this.walkmeReady) {
        _uii.skillDiscovery.processPendingRequests();
      }
    });
    _this.eventsListener.once('DataLoadedEvent', function () {
      (0, _logger.log)('DataLoadedEvent');
      (0, _dom.getNativeProxy)();
    });
    _this.eventsListener.on(_consts.SHUTDOWN_EVERYWHERE_EVENT, function () {
      shutdownEveywhere();
    });
    return null;
  }
  ctor();
}
exports.a = UII;


/***/ }),

/***/ 736:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

"use strict";

Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.typingKeyCodes = exports.sideSpecificKeyCodes = exports.keyCodes = exports.inputKeyCodes = exports.eventsToTrack = exports.eventTypesWithComposedPath = exports.combinationKeyCodes = exports.WORD_COUNT_THRESHOLD = exports.WALKMEX_UII_SKILL_TOOLTIP = exports.WALKMEX_SUGGESTION_CATEGORY = exports.WALKMEX_AI_MESSAGE_ICON = exports.WALKMEX_ACTION_TYPE_PROCESS_TEXT = exports.WALKMEX_ACTION_ARGUMENT_TEXT_SOURCE = exports.UII_SKILL_SUGGESTION_KEY = exports.UII_NATIVE_PROXY = exports.UIIE_TOP_P = exports.UIIE_SKILL_DISCOVERY_FUNC = exports.UIIE_FIELD_SCORE_FUNC = exports.UIIE_APP_VERSION = exports.UIIE_APP = exports.TAB = exports.STRING_TYPE = exports.SKILL_DISCOVERY_STORE_KEY_PATH = exports.SKILL_DISCOVERY_STORE = exports.SKILL_DISCOVERY_DB_VERSION = exports.SKILL_DISCOVERY_DB = exports.SHUTDOWN_EVERYWHERE_EVENT = exports.SESSION_FIELD_VALUE_MINIMUM_LENGTH = exports.SEC_TO_MS = exports.REPORT_THRESHOLD = exports.REPLACE_CHARS = exports.PREVIEW_MODE = exports.PLAY_MODE = exports.PERF_THRESHOLD_TO_LOG = exports.NO_DATA = exports.META_RIGHT = exports.META_LEFT = exports.MAX_METADATA_RETRIES = exports.MAX_DOM_CAPTURE_ATTEMPTS = exports.MAX_CAPTURE_METADATA_TIME_MS = exports.MAX_CAPTURE_DOM_RETRIES = exports.LABELS_TO_ENCRYPT = exports.KEY_V = exports.INTERACTION_TIME_THRESHOLD = exports.INTERACTION_KEY_COUNT_THRESHOLD = exports.INIT_THRESHOLD = exports.IFRAME_EXPLORATION_INTERVAL = exports.FIELD_VALUE_MINIMUM_WORDS = exports.FIELD_RELEVANCE_THRESHOLD = exports.ERROR_THRESHOLD_LOG = exports.ENCRYPT_DELIM = exports.ELEMENT_PARENT_LEVELS = exports.DELETE_KEYS = exports.DELETE = exports.DEFAULT_TEMPERATURE = exports.DEFAULT_PRESENCE_PENALTY = exports.DEFAULT_MAX_TOKENS = exports.DEFAULT_LEXICON_OBJECT = exports.DEFAULT_FREQUENCY_PENALTY = exports.DEFAULT_ASYNC_QUEUE_TIMEOUT = exports.DEBUG_THRESHOLD_LOG = exports.DATA_FILE_NAME = exports.CONTROL = exports.CHAR_CODE = exports.CAPTURE_DOM_URL = exports.CAPTURE_DOM_THRESHOLD = exports.BACKSPACE = void 0;
var _config = __webpack_require__(949);
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var keyCodes = exports.keyCodes = {
  3: 'Break',
  8: 'Backspace',
  9: 'Tab',
  12: 'Clear',
  13: 'Enter',
  16: 'Shift',
  17: 'Control',
  18: 'Alt',
  19: 'Pause',
  20: 'CapsLock',
  21: 'KanaMode',
  22: 'HangulMode',
  23: 'JunjaMode',
  24: 'FinalMode',
  25: 'HanjaMode',
  27: 'Escape',
  28: 'Convert',
  29: 'NonConvert',
  30: 'Accept',
  31: 'ModeChange',
  32: 'Space',
  33: 'PageUp',
  34: 'PageDown',
  35: 'End',
  36: 'Home',
  37: 'ArrowLeft',
  38: 'ArrowUp',
  39: 'ArrowRight',
  40: 'ArrowDown',
  41: 'Select',
  42: 'Print',
  43: 'Execute',
  44: 'PrintScreen',
  45: 'Insert',
  46: 'Delete',
  48: '0',
  49: '1',
  50: '2',
  51: '3',
  52: '4',
  53: '5',
  54: '6',
  55: '7',
  56: '8',
  57: '9',
  65: 'A',
  66: 'B',
  67: 'C',
  68: 'D',
  69: 'E',
  70: 'F',
  71: 'G',
  72: 'H',
  73: 'I',
  74: 'J',
  75: 'K',
  76: 'L',
  77: 'M',
  78: 'N',
  79: 'O',
  80: 'P',
  81: 'Q',
  82: 'R',
  83: 'S',
  84: 'T',
  85: 'U',
  86: 'V',
  87: 'W',
  88: 'X',
  89: 'Y',
  90: 'Z',
  91: 'MetaLeft',
  92: 'MetaRight',
  93: 'ContextMenu',
  96: 'Numpad0',
  97: 'Numpad1',
  98: 'Numpad2',
  99: 'Numpad3',
  100: 'Numpad4',
  101: 'Numpad5',
  102: 'Numpad6',
  103: 'Numpad7',
  104: 'Numpad8',
  105: 'Numpad9',
  106: 'NumpadMultiply',
  107: 'NumpadAdd',
  108: 'NumpadSeparator',
  109: 'NumpadSubtract',
  110: 'NumpadDecimal',
  111: 'NumpadDivide',
  112: 'F1',
  113: 'F2',
  114: 'F3',
  115: 'F4',
  116: 'F5',
  117: 'F6',
  118: 'F7',
  119: 'F8',
  120: 'F9',
  121: 'F10',
  122: 'F11',
  123: 'F12',
  124: 'F13',
  125: 'F14',
  126: 'F15',
  127: 'F16',
  128: 'F17',
  129: 'F18',
  130: 'F19',
  131: 'F20',
  132: 'F21',
  133: 'F22',
  134: 'F23',
  135: 'F24',
  144: 'NumLock',
  145: 'ScrollLock',
  160: 'ShiftLeft',
  161: 'ShiftRight',
  162: 'ControlLeft',
  163: 'ControlRight',
  164: 'AltLeft',
  165: 'AltRight',
  166: 'BrowserBack',
  167: 'BrowserForward',
  168: 'BrowserRefresh',
  169: 'BrowserStop',
  170: 'BrowserSearch',
  171: 'BrowserFavorites',
  172: 'BrowserHome',
  173: 'VolumeMute',
  174: 'VolumeDown',
  175: 'VolumeUp',
  176: 'MediaTrackNext',
  177: 'MediaTrackPrevious',
  178: 'MediaStop',
  179: 'MediaPlayPause',
  180: 'LaunchMail',
  181: 'SelectMedia',
  182: 'LaunchApplication1',
  183: 'LaunchApplication2',
  186: 'Semicolon',
  187: 'Equal',
  188: 'Comma',
  189: 'Minus',
  190: 'Period',
  191: 'Slash',
  192: 'Backquote',
  219: 'BracketLeft',
  220: 'Backslash',
  221: 'BracketRight',
  222: 'Quote'
  // Add more key codes and names as needed
};
var combinationKeyCodes = exports.combinationKeyCodes = {
  16: 'Shift',
  17: 'Control',
  18: 'Alt',
  91: 'MetaLeft',
  92: 'MetaRight',
  162: 'ControlLeft',
  163: 'ControlRight',
  164: 'AltLeft',
  165: 'AltRight'
};
var typingKeyCodes = exports.typingKeyCodes = {
  8: 'Backspace',
  12: 'Clear',
  13: 'Enter',
  16: 'Shift',
  17: 'Control',
  18: 'Alt',
  20: 'CapsLock',
  32: 'Space',
  35: 'End',
  37: 'ArrowLeft',
  38: 'ArrowUp',
  39: 'ArrowRight',
  40: 'ArrowDown',
  41: 'Select',
  45: 'Insert',
  46: 'Delete',
  48: '0',
  49: '1',
  50: '2',
  51: '3',
  52: '4',
  53: '5',
  54: '6',
  55: '7',
  56: '8',
  57: '9',
  65: 'A',
  66: 'B',
  67: 'C',
  68: 'D',
  69: 'E',
  70: 'F',
  71: 'G',
  72: 'H',
  73: 'I',
  74: 'J',
  75: 'K',
  76: 'L',
  77: 'M',
  78: 'N',
  79: 'O',
  80: 'P',
  81: 'Q',
  82: 'R',
  83: 'S',
  84: 'T',
  85: 'U',
  86: 'V',
  87: 'W',
  88: 'X',
  89: 'Y',
  90: 'Z',
  91: 'MetaLeft',
  92: 'MetaRight',
  93: 'ContextMenu',
  96: 'Numpad0',
  97: 'Numpad1',
  98: 'Numpad2',
  99: 'Numpad3',
  100: 'Numpad4',
  101: 'Numpad5',
  102: 'Numpad6',
  103: 'Numpad7',
  104: 'Numpad8',
  105: 'Numpad9',
  106: 'NumpadMultiply',
  107: 'NumpadAdd',
  108: 'NumpadSeparator',
  109: 'NumpadSubtract',
  110: 'NumpadDecimal',
  111: 'NumpadDivide',
  144: 'NumLock',
  160: 'ShiftLeft',
  161: 'ShiftRight',
  162: 'ControlLeft',
  163: 'ControlRight',
  164: 'AltLeft',
  165: 'AltRight',
  186: 'Semicolon',
  187: 'Equal',
  188: 'Comma',
  189: 'Minus',
  190: 'Period',
  191: 'Slash',
  192: 'Backquote',
  219: 'BracketLeft',
  220: 'Backslash',
  221: 'BracketRight',
  222: 'Quote'
  // Add more key codes and names as needed
};
var inputKeyCodes = exports.inputKeyCodes = {
  8: 'Backspace',
  12: 'Clear',
  13: 'Enter',
  32: 'Space',
  48: '0',
  49: '1',
  50: '2',
  51: '3',
  52: '4',
  53: '5',
  54: '6',
  55: '7',
  56: '8',
  57: '9',
  65: 'A',
  66: 'B',
  67: 'C',
  68: 'D',
  69: 'E',
  70: 'F',
  71: 'G',
  72: 'H',
  73: 'I',
  74: 'J',
  75: 'K',
  76: 'L',
  77: 'M',
  78: 'N',
  79: 'O',
  80: 'P',
  81: 'Q',
  82: 'R',
  83: 'S',
  84: 'T',
  85: 'U',
  86: 'V',
  87: 'W',
  88: 'X',
  89: 'Y',
  90: 'Z',
  96: 'Numpad0',
  97: 'Numpad1',
  98: 'Numpad2',
  99: 'Numpad3',
  100: 'Numpad4',
  101: 'Numpad5',
  102: 'Numpad6',
  103: 'Numpad7',
  104: 'Numpad8',
  105: 'Numpad9',
  106: 'NumpadMultiply',
  107: 'NumpadAdd',
  108: 'NumpadSeparator',
  109: 'NumpadSubtract',
  110: 'NumpadDecimal',
  111: 'NumpadDivide',
  144: 'NumLock',
  186: 'Semicolon',
  187: 'Equal',
  188: 'Comma',
  189: 'Minus',
  190: 'Period',
  191: 'Slash',
  192: 'Backquote',
  219: 'BracketLeft',
  220: 'Backslash',
  221: 'BracketRight',
  222: 'Quote'
  // Add more key codes and names as needed
};
var sideSpecificKeyCodes = exports.sideSpecificKeyCodes = new Set(['MetaLeft', 'MetaRight', 'NumpadMultiply', 'NumpadAdd', 'NumpadSeparator', 'NumpadSubtract', 'NumpadDecimal', 'NumpadDivide', 'NumpadEnter', 'NumLock', 'ShiftLeft', 'ShiftRight', 'ControlLeft', 'ControlRight', 'AltLeft', 'AltRight', 'Space']);
var CONTROL = exports.CONTROL = 17;
var KEY_V = exports.KEY_V = 86;
var META_LEFT = exports.META_LEFT = 91;
var META_RIGHT = exports.META_RIGHT = 92;
var TAB = exports.TAB = 9;
var BACKSPACE = exports.BACKSPACE = 8;
var DELETE = exports.DELETE = 46;
var DELETE_KEYS = exports.DELETE_KEYS = _defineProperty(_defineProperty({}, BACKSPACE, true), DELETE, true);
var SEC_TO_MS = exports.SEC_TO_MS = 1000;
var INTERACTION_TIME_THRESHOLD = exports.INTERACTION_TIME_THRESHOLD = 3 * SEC_TO_MS;
var PREVIEW_MODE = exports.PREVIEW_MODE = 1;
var PLAY_MODE = exports.PLAY_MODE = 2;
var INTERACTION_KEY_COUNT_THRESHOLD = exports.INTERACTION_KEY_COUNT_THRESHOLD = 5;
var REPORT_THRESHOLD = exports.REPORT_THRESHOLD = 0.1;
var INIT_THRESHOLD = exports.INIT_THRESHOLD = 0.3;
var PERF_THRESHOLD_TO_LOG = exports.PERF_THRESHOLD_TO_LOG = 50;
var CAPTURE_DOM_THRESHOLD = exports.CAPTURE_DOM_THRESHOLD = 0.1;
var UII_NATIVE_PROXY = exports.UII_NATIVE_PROXY = 'wm-uiie-native-proxy';
var IFRAME_EXPLORATION_INTERVAL = exports.IFRAME_EXPLORATION_INTERVAL = 5 * SEC_TO_MS;
var ERROR_THRESHOLD_LOG = exports.ERROR_THRESHOLD_LOG = 1;
var DEBUG_THRESHOLD_LOG = exports.DEBUG_THRESHOLD_LOG = 0.5;
var SHUTDOWN_EVERYWHERE_EVENT = exports.SHUTDOWN_EVERYWHERE_EVENT = 'ShutdownUIIEverywhere';
var MAX_CAPTURE_DOM_RETRIES = exports.MAX_CAPTURE_DOM_RETRIES = 3;
var MAX_METADATA_RETRIES = exports.MAX_METADATA_RETRIES = 3;
var MAX_CAPTURE_METADATA_TIME_MS = exports.MAX_CAPTURE_METADATA_TIME_MS = 100;
var MAX_DOM_CAPTURE_ATTEMPTS = exports.MAX_DOM_CAPTURE_ATTEMPTS = 3;
var SESSION_FIELD_VALUE_MINIMUM_LENGTH = exports.SESSION_FIELD_VALUE_MINIMUM_LENGTH = 50;
var FIELD_VALUE_MINIMUM_WORDS = exports.FIELD_VALUE_MINIMUM_WORDS = 6;
var UIIE_FIELD_SCORE_FUNC = exports.UIIE_FIELD_SCORE_FUNC = 'scoreFieldRelevance';
var UIIE_APP = exports.UIIE_APP = 'uii-test';
var UIIE_APP_VERSION = exports.UIIE_APP_VERSION = '1.0.0';
var DEFAULT_TEMPERATURE = exports.DEFAULT_TEMPERATURE = 0;
var DEFAULT_FREQUENCY_PENALTY = exports.DEFAULT_FREQUENCY_PENALTY = 0;
var DEFAULT_PRESENCE_PENALTY = exports.DEFAULT_PRESENCE_PENALTY = 0;
var UIIE_TOP_P = exports.UIIE_TOP_P = 0.95;
var DEFAULT_MAX_TOKENS = exports.DEFAULT_MAX_TOKENS = 2000;
var FIELD_RELEVANCE_THRESHOLD = exports.FIELD_RELEVANCE_THRESHOLD = 0.1;
var UIIE_SKILL_DISCOVERY_FUNC = exports.UIIE_SKILL_DISCOVERY_FUNC = 'skillDiscovery';
var CAPTURE_DOM_URL = exports.CAPTURE_DOM_URL = '/api/everywhere-gateway/saveDom';
var eventsToTrack = exports.eventsToTrack = ['mousedown', 'keydown', 'keyup', 'paste'];
var eventTypesWithComposedPath = exports.eventTypesWithComposedPath = new Set(['focusin', 'mousedown', 'keydown', 'keypress', 'beforeinput', 'input', 'mouseup', 'paste', 'keyup']);
var REPLACE_CHARS = exports.REPLACE_CHARS = {
  replaceLetter: 'x',
  replaceDigit: '0',
  replaceLetterCode: 'KeyLetter',
  replaceDigitCode: 'KeyDigit'
};
var CHAR_CODE = exports.CHAR_CODE = {
  zero: '0'.charCodeAt(),
  nine: '9'.charCodeAt()
};
var ENCRYPT_DELIM = exports.ENCRYPT_DELIM = "\u03BE";
var DEFAULT_LEXICON_OBJECT = exports.DEFAULT_LEXICON_OBJECT = {
  language: 'NA'
};
var LABELS_TO_ENCRYPT = exports.LABELS_TO_ENCRYPT = ['h1', 'h2', 'h3', 'labelForElementId', 'closestNestedLabelForElementId', 'closestNestedLabel'];
var DATA_FILE_NAME = exports.DATA_FILE_NAME = 'data.json';
var ELEMENT_PARENT_LEVELS = exports.ELEMENT_PARENT_LEVELS = 5;
var SKILL_DISCOVERY_DB = exports.SKILL_DISCOVERY_DB = 'skillDiscoveryDB';
var SKILL_DISCOVERY_STORE = exports.SKILL_DISCOVERY_STORE = 'skillDiscoveryStore';
var SKILL_DISCOVERY_DB_VERSION = exports.SKILL_DISCOVERY_DB_VERSION = 1;
var SKILL_DISCOVERY_STORE_KEY_PATH = exports.SKILL_DISCOVERY_STORE_KEY_PATH = 'selector';
var WORD_COUNT_THRESHOLD = exports.WORD_COUNT_THRESHOLD = 5;
var DEFAULT_ASYNC_QUEUE_TIMEOUT = exports.DEFAULT_ASYNC_QUEUE_TIMEOUT = 3000;
var NO_DATA = exports.NO_DATA = 'no data';
var STRING_TYPE = exports.STRING_TYPE = 'string';
var WALKMEX_SUGGESTION_CATEGORY = exports.WALKMEX_SUGGESTION_CATEGORY = 'suggestions';
var WALKMEX_AI_MESSAGE_ICON = exports.WALKMEX_AI_MESSAGE_ICON = "AIMessage";
var WALKMEX_UII_SKILL_TOOLTIP = exports.WALKMEX_UII_SKILL_TOOLTIP = "UII Skill";
var WALKMEX_ACTION_TYPE_PROCESS_TEXT = exports.WALKMEX_ACTION_TYPE_PROCESS_TEXT = 'processText';
var WALKMEX_ACTION_ARGUMENT_TEXT_SOURCE = exports.WALKMEX_ACTION_ARGUMENT_TEXT_SOURCE = 'page';
var UII_SKILL_SUGGESTION_KEY = exports.UII_SKILL_SUGGESTION_KEY = 'uiiSkillSuggestion';


/***/ }),

/***/ 342:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

"use strict";

Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.createNativeProxy = createNativeProxy;
exports.discoverIframes = discoverIframes;
exports.getNativeProxy = getNativeProxy;
exports.getXPath = getXPath;
exports.initiateInputTypingInIframe = initiateInputTypingInIframe;
exports.startIframeDiscovery = startIframeDiscovery;
exports.stopIframeDiscovery = stopIframeDiscovery;
var _consts = __webpack_require__(736);
var _logger = __webpack_require__(681);
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
var intervalId = null;
function getXPath(element) {
  try {
    // Selector
    var selector = '';
    // Element handler
    var currentElement = element;

    // Handle window element case
    if (currentElement === window) {
      selector = '/window';
    }

    // Do action until we reach html element
    var _loop = function _loop() {
      // Get element tag name
      var tagName = currentElement.tagName.toLowerCase();

      // Finish selector if found root element
      if (tagName === 'html') {
        selector = "/html".concat(selector);
        return 1; // break
      }

      // Get parent element
      var parentElement = undefined;
      if (currentElement.parentElement !== null && currentElement.parentElement !== undefined) {
        parentElement = currentElement.parentElement;
      } else if (currentElement.parentNode !== null && currentElement.parentNode !== undefined && currentElement.parentNode.host !== undefined) {
        parentElement = currentElement.parentNode.host;
      }

      // Count children
      if (parentElement.childElementCount > 1) {
        // Get children of parent element
        var parentsChildren = _toConsumableArray(parentElement.children);
        // Count current tag
        var tag = [];
        parentsChildren.forEach(function (child) {
          if (child.tagName.toLowerCase() === tagName) tag.push(child); // Append to tag
        });

        // Is only of type
        if (tag.length === 1) {
          // Append tag to selector
          selector = "/".concat(tagName).concat(selector);
        } else {
          // Get position of current element in tag
          var position = tag.indexOf(currentElement) + 1;
          // Append tag to selector
          selector = "/".concat(tagName, "[").concat(position, "]").concat(selector);
        }
      } else {
        //* Current element has no siblings
        // Append tag to selector
        selector = "/".concat(tagName).concat(selector);
      }

      // Set parent element to current element
      currentElement = parentElement;
    };
    while (currentElement && currentElement.tagName) {
      if (_loop()) break;
    }
    return selector;
  } catch (e) {
    return 'error';
  }
}
function createNativeProxy() {
  // Create dummy iframe to steal its fresh console object
  var iframe = document.createElement('iframe');

  // Add iframe to current window's scope in a hidden state
  iframe.id = _consts.UII_NATIVE_PROXY;
  iframe.classList.add('walkme-to-remove');
  iframe.style.display = 'none';
  document.body.insertAdjacentElement('beforeend', iframe);
  return iframe;
}
function getNativeProxy() {
  var nativeIframe = document.getElementById(_consts.UII_NATIVE_PROXY);
  if (nativeIframe === null) {
    nativeIframe = createNativeProxy();
  }
  return nativeIframe;
}
function recordIframeEvents(event) {
  return window.top._uiieInternals && window.top._uiieInternals.recordEvent(event);
}
function bubbleEventToTopWindow(event) {
  try {
    var newEvent = new event.constructor(event.type, event);
    newEvent.iframeTarget = event.target;
    if (_consts.eventTypesWithComposedPath.has(event.type)) {
      var path = event.composedPath();
      if (path) {
        newEvent.iframeTarget = path[0];
      }
    }
    recordIframeEvents(newEvent);
  } catch (error) {
    _logger.uiieLogger.ddAndErrorLog('Error in bubbleEventToTopWindow', {
      url: window.location.href,
      topUrl: window.top.location.href,
      errorMessage: error.message,
      errorStack: error.stack
    });
  }
}
function initiateInputTypingInIframe(iframe) {
  try {
    if (iframe.dataset.inputTypingInitiated === 'true' || iframe.classList.contains('walkme-to-remove')) {
      return;
    }
    (0, _logger.log)('Registering events in iframe', iframe.contentWindow.document.domain);
    iframe.dataset.inputTypingInitiated = 'true';
    _consts.eventsToTrack.forEach(function (eventName) {
      iframe.contentWindow.document.addEventListener(eventName, bubbleEventToTopWindow);
    });
  } catch (error) {
    _logger.uiieLogger.ddAndErrorLog('Error in initiateInputTyping', {
      url: window.location.href,
      errorMessage: error.message,
      errorStack: error.stack
    });
  }
}
function discoverIframes() {
  var iframes = document.getElementsByTagName('iframe');
  var sameDomainIframes = Array.from(iframes).filter(function (iframe) {
    try {
      return !!iframe.contentWindow.document;
    } catch (error) {
      // Ignore errors (usually due to same-origin policy)
      return false;
    }
  });
  sameDomainIframes.forEach(initiateInputTypingInIframe);
}
function startIframeDiscovery() {
  intervalId = setInterval(discoverIframes, _consts.IFRAME_EXPLORATION_INTERVAL);
}
function stopIframeDiscovery() {
  clearInterval(intervalId);
}


/***/ }),

/***/ 591:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

"use strict";

Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.defer = defer;
exports.encryptMap = encryptMap;
exports.encryptValue = encryptValue;
exports.findElement = findElement;
exports.getElementParentByLevels = getElementParentByLevels;
exports.getEnvId = getEnvId;
exports.getHashedEndUserId = getHashedEndUserId;
exports.getPlatform = getPlatform;
exports.getPrompt = getPrompt;
exports.getUiiFAData = getUiiFAData;
exports.getUserGuid = getUserGuid;
exports.measureTimeMs = measureTimeMs;
exports.runInIdleAsync = runInIdleAsync;
exports.summarizePageForLLM = summarizePageForLLM;
exports.trimIfString = trimIfString;
exports.tryAsync = tryAsync;
exports.validateSkillBody = validateSkillBody;
exports.wordCount = void 0;
var _logger = __webpack_require__(681);
var _consts = __webpack_require__(736);
var _llm = __webpack_require__(598);
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator.return && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, catch: function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
var getCtx = (__webpack_require__(257)/* .getCtx */ .yK);
function getEnvId() {
  return _walkMe && _walkMe.getEnvId && _walkMe.getEnvId();
}
function getUserGuid() {
  return _walkMe && _walkMe.getUserGuid && _walkMe.getUserGuid();
}
function getEndUserId() {
  return _walkMe && _walkMe.getEndUserId && _walkMe.getEndUserId();
}
function getPlatform() {
  var platform;
  if (window._deepUiInternals && window._deepUiInternals.getPlatforms) {
    platform = window._deepUiInternals.getPlatforms()[0];
  }
  return platform || 0;
}
function generateHash(str, salt) {
  if (!str || !salt) {
    return;
  }
  str += salt;
  var hash = 0;
  if (str.length === 0) return hash;
  for (var i = 0; i < str.length; i++) {
    var char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash &= hash; // Convert to 32 bit integer
  }
  return hash.toString();
}
function getHashedEndUserId() {
  var userGUID = getUserGuid();
  var endUserGUID = getEndUserId();
  if (!userGUID || !endUserGUID) {
    return;
  }
  return generateHash(endUserGUID, userGUID);
}
function tryAsync(_x, _x2) {
  return _tryAsync.apply(this, arguments);
}
function _tryAsync() {
  _tryAsync = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee(fn, errorMessage) {
    var _len,
      params,
      _key,
      _args = arguments;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          for (_len = _args.length, params = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
            params[_key - 2] = _args[_key];
          }
          _context.next = 4;
          return fn.apply(void 0, params);
        case 4:
          _context.next = 9;
          break;
        case 6:
          _context.prev = 6;
          _context.t0 = _context["catch"](0);
          _logger.uiieLogger.ddAndErrorLog(errorMessage, {
            errorMessage: _context.t0.message,
            errorStack: _context.t0.stack
          });
        case 9:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[0, 6]]);
  }));
  return _tryAsync.apply(this, arguments);
}
function defer() {
  var deferred = {};
  deferred.promise = new Promise(function (resolve, reject) {
    deferred.resolve = function (value) {
      deferred.value = value;
      resolve(value);
    };
    deferred.reject = reject;
  });
  return deferred;
}
var _domSessionManager;
function getDomSessionManager() {
  if (!_domSessionManager) {
    _domSessionManager = getCtx().get('DOMSessionManager');
  }
  return _domSessionManager;
}
function runInIdle(fn) {
  getDomSessionManager().idle(fn);
}
function runInIdleAsync(fn) {
  return new Promise(function (resolve, reject) {
    runInIdle(function () {
      try {
        resolve(fn());
      } catch (error) {
        reject(error);
      }
    });
  });
}
var _elementFinder;
function getElementFinder() {
  if (!_elementFinder) {
    _elementFinder = getCtx().get('ElementFinder');
  }
  return _elementFinder;
}
function findElement() {
  var _getElementFinder;
  return (_getElementFinder = getElementFinder()).findElement.apply(_getElementFinder, arguments);
}
function measureTimeMs(func) {
  var start = performance.now();
  var result = func();
  var end = performance.now();
  var timeMs = end - start;
  return {
    result: result,
    timeMs: timeMs
  };
}
function trimIfString(str) {
  return typeof str === 'string' ? str.trim() : str;
}
function encryptValue(value) {
  if (!value) {
    return value;
  }
  if (value.length <= 3) {
    return "".concat(value).concat(_consts.ENCRYPT_DELIM).concat(value.length);
  }
  try {
    return "".concat(wmjQuery.fn.encrypt(value, '', wmjQuery.fn.salt, [])).concat(_consts.ENCRYPT_DELIM).concat(value.length);
  } catch (error) {
    _logger.uiieLogger.ddAndErrorLog(errorMessage, {
      errorMessage: error.message,
      errorStack: error.stack
    });
    return '';
  }
}
function encryptMap(map, keysToEncrypt) {
  try {
    keysToEncrypt.forEach(function (key) {
      if (map[key]) {
        map[key] = encryptValue(map[key]);
      }
    });
    return map;
  } catch (error) {
    _logger.uiieLogger.ddAndErrorLog(errorMessage, {
      errorMessage: error.message,
      errorStack: error.stack
    });
    return {};
  }
}
function getPrompt(metaData, prompt) {
  if (!prompt || !metaData) {
    return;
  }
  return (0, _llm.formatPrompt)({
    metaData: metaData,
    prompt: prompt
  });
}
;
function getElementParentByLevels(element, levels) {
  var node = element;
  if (!node || !node.parentElement || levels <= 0) {
    return node;
  }
  for (var i = 0; i < levels; i++) {
    node = node.parentElement ? node.parentElement : node;
    if (node && !node.parentElement || i === levels - 1) {
      break;
    }
  }
  return node;
}
var wordCount = exports.wordCount = function wordCount(str) {
  return (str || '').trim().split(/\s+/).length;
};
function validateSkillBody(skill) {
  if (!skill || !skill.actionable_skill_name || !skill.actionable_next_steps || _typeof(skill.actionable_skill_name) !== _consts.STRING_TYPE || _typeof(skill.actionable_next_steps) !== _consts.STRING_TYPE || skill.actionable_skill_name === _consts.NO_DATA || skill.actionable_next_steps === _consts.NO_DATA) {
    return false;
  }
  return true;
}
function summarizePageForLLM() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
    _ref$perSectionChars = _ref.perSectionChars,
    perSectionChars = _ref$perSectionChars === void 0 ? 600 : _ref$perSectionChars,
    _ref$maxTotalChars = _ref.maxTotalChars,
    maxTotalChars = _ref$maxTotalChars === void 0 ? 12000 : _ref$maxTotalChars;
  var sections = [];
  var H_QUERY = 'h1, h2, h3, h4, h5, h6';

  // Collect sections by heading
  var headings = _toConsumableArray(document.body.querySelectorAll(H_QUERY));
  var takeText = function takeText(el) {
    return el.innerText.replace(/\s+/g, ' ').trim();
  };
  if (headings.length === 0) {
    // No headings—just chunk body text
    var t = document.body.innerText.replace(/\s+/g, ' ').trim();
    return t.slice(0, maxTotalChars) + (t.length > maxTotalChars ? '…' : '');
  }
  for (var i = 0; i < headings.length; i++) {
    var h = headings[i];
    var next = headings[i + 1];
    var container = document.createRange();
    container.setStartAfter(h);
    if (next) container.setEndBefore(next);else container.setEndAfter(document.body);
    var text = takeText(h) + ': ' + takeText(container.commonAncestorContainer);
    sections.push(text.slice(0, perSectionChars));
  }
  var out = "Summary by section:\n";
  for (var _i = 0, _sections = sections; _i < _sections.length; _i++) {
    var s = _sections[_i];
    if ((out + s + '\n\n').length > maxTotalChars) break;
    out += '- ' + s + '\n';
  }
  return out.trim();
}
;
function getUiiFAData(dataFile) {
  var url = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : window.location.href;
  if (!dataFile || _typeof(dataFile) !== 'object') {
    return;
  }
  for (var _i2 = 0, _Object$keys = Object.keys(dataFile); _i2 < _Object$keys.length; _i2++) {
    var key = _Object$keys[_i2];
    if (key === 'default') continue;
    try {
      var regex = new RegExp(key);
      if (regex.test(url)) {
        return _objectSpread(_objectSpread({
          custom_context: 'none'
        }, dataFile.default), dataFile[key]);
      }
    } catch (error) {
      _logger.uiieLogger.ddAndWarnLog("Invalid regex in dataFile key: ".concat(key), {
        error: error.message
      });
    }
  }
  return dataFile.default;
}


/***/ }),

/***/ 912:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.showActionPopup = showActionPopup;
var _http = __webpack_require__(52);
var _config = __webpack_require__(949);
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator.return && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, catch: function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function injectCopilotPopupStyles() {
  if (document.getElementById('wm-copilot-popup-style')) return;
  var style = document.createElement('style');
  style.id = 'wm-copilot-popup-style';
  style.textContent = "\n    .wm-copilot-action-popup {\n        position: fixed;\n        background: #fff;\n        border-radius: 12px;\n        box-shadow: 0 8px 32px rgba(30,41,59,0.18);\n        min-width: 280px;\n        max-width: 340px;\n        width: 100%;\n        padding: 0;\n        font-family: 'Segoe UI', 'Arial', sans-serif;\n        animation: copilot-popup-in 0.2s;\n        z-index: 9999;\n        cursor: grab;\n    }\n    @keyframes copilot-popup-in {\n        from { transform: translateY(24px) scale(0.98); opacity: 0; }\n        to   { transform: none; opacity: 1; }\n    }\n    .wm-copilot-action-popup-header {\n        display: flex;\n        align-items: center;\n        justify-content: space-between;\n        padding: 14px 18px 6px 18px;\n        border-bottom: 1px solid #f0f2f7;\n        cursor: grab;\n        user-select: none;\n    }\n    .wm-copilot-action-popup-title {\n        font-size: 1.1rem;\n        font-weight: 600;\n        color: #1e293b;\n        letter-spacing: 0.01em;\n    }\n    .wm-copilot-action-popup-close {\n        background: none;\n        border: none;\n        font-size: 1.3rem;\n        color: #64748b;\n        cursor: pointer;\n        transition: color 0.15s;\n    }\n    .wm-copilot-action-popup-close:hover {\n        color: #334155;\n    }\n    .wm-copilot-action-popup-description {\n        padding: 12px 18px;\n        font-size: 0.98rem;\n        color: #334155;\n        line-height: 1.5;\n    }\n    .wm-copilot-action-popup-buttons {\n        display: flex;\n        gap: 10px;\n        justify-content: space-between;\n        padding: 12px 18px 14px 18px;\n        border-top: 1px solid #f0f2f7;\n    }\n    .wm-copilot-action-like,\n    .wm-copilot-action-dislike,\n    .wm-copilot-action-run {\n        background: #f1f5f9;\n        border: none;\n        border-radius: 6px;\n        padding: 7px 14px;\n        font-size: 0.98rem;\n        color: #334155;\n        cursor: pointer;\n        font-weight: 500;\n        transition: background 0.15s, color 0.15s;\n    }\n    .wm-copilot-action-like[aria-pressed=\"true\"] {\n        background: #e0f2fe;\n        color: #0ea5e9;\n    }\n    .wm-copilot-action-dislike[aria-pressed=\"true\"] {\n        background: #fee2e2;\n        color: #ef4444;\n    }\n    .wm-copilot-action-run {\n        background: #3b82f6;\n        color: #fff;\n        font-weight: 600;\n    }\n    .wm-copilot-action-run:hover {\n        background: #2563eb;\n    }\n    @media (max-width: 480px) {\n        .wm-copilot-action-popup {\n            left: 2vw !important;\n            min-width: 0;\n            max-width: 98vw;\n            padding: 0;\n        }\n        .wm-copilot-action-popup-header,\n        .wm-copilot-action-popup-description,\n        .wm-copilot-action-popup-buttons {\n            padding-left: 8px;\n            padding-right: 8px;\n        }\n    }\n    ";
  document.head.appendChild(style);
}
function ensurePopupStyles() {
  injectCopilotPopupStyles();
}
var sendFeedback = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee(skillId, userGuid) {
    var isPositive,
      SEND_SKILL_DISCOVERY_FEEDBACK_URL,
      headers,
      _args = arguments;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          isPositive = _args.length > 2 && _args[2] !== undefined ? _args[2] : true;
          SEND_SKILL_DISCOVERY_FEEDBACK_URL = "".concat((0, _config.getConfig)().UII_EVERYWHERE_ENGINE_URL, "/uiie/skill-discovery/feedback");
          headers = {
            'Content-Type': 'application/json',
            'x-wmdu-euguid': window._walkMe.getEndUserId(),
            'x-wmdu-uguid': window._walkMe.getUserGuid(),
            'x-wmdu-envid': window._walkMe.getEnvId()
          };
          (0, _http.sendData)({
            url: SEND_SKILL_DISCOVERY_FEEDBACK_URL,
            payload: {
              skillId: skillId,
              userGuid: userGuid,
              isPositive: isPositive
            },
            headers: headers,
            logContext: 'Skill Feedback'
          });
        case 4:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return function sendFeedback(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

// ===== Action Popup with Position and Drag =====
function showActionPopup() {
  var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
    _ref2$actionName = _ref2.actionName,
    actionName = _ref2$actionName === void 0 ? "Action Name" : _ref2$actionName,
    _ref2$description = _ref2.description,
    description = _ref2$description === void 0 ? "Action description goes here." : _ref2$description,
    _ref2$actionId = _ref2.actionId,
    actionId = _ref2$actionId === void 0 ? null : _ref2$actionId,
    _ref2$skillId = _ref2.skillId,
    skillId = _ref2$skillId === void 0 ? null : _ref2$skillId,
    _ref2$userGuid = _ref2.userGuid,
    userGuid = _ref2$userGuid === void 0 ? null : _ref2$userGuid,
    _ref2$bottom = _ref2.bottom,
    bottom = _ref2$bottom === void 0 ? 95 : _ref2$bottom,
    _ref2$left = _ref2.left,
    left = _ref2$left === void 0 ? 150 : _ref2$left;
  ensurePopupStyles();
  var existing = document.getElementById("walkme-copilot-action-popup");
  if (existing) existing.remove();

  // Build popup HTML
  var popup = document.createElement("div");
  popup.id = "walkme-copilot-action-popup";
  popup.className = "wm-copilot-action-popup";
  popup.style.bottom = "".concat(bottom, "px");
  popup.style.left = "".concat(left, "px");
  popup.innerHTML = "\n      <div class=\"wm-copilot-action-popup-header\">\n        <span class=\"wm-copilot-action-popup-title\">".concat(actionName, "</span>\n        <button class=\"wm-copilot-action-popup-close\" aria-label=\"Close\">&times;</button>\n      </div>\n      <div class=\"wm-copilot-action-popup-description\">").concat(description, "</div>\n      <div class=\"wm-copilot-action-popup-buttons\">\n        <div style=\"\n    display: flex;\n    justify-content: space-between;\n    gap: 10px;\n    \">        \n            <button class=\"wm-copilot-action-like\" type=\"button\" title=\"Like\" aria-pressed=\"false\">\uD83D\uDC4D</button>\n            <button class=\"wm-copilot-action-dislike\" type=\"button\" title=\"Dislike\" aria-pressed=\"false\">\uD83D\uDC4E</button>\n        </div>\n        <div>\n            <button class=\"wm-copilot-action-run\" type=\"button\">Run</button>\n        </div>\n      </div>\n    ");

  // Make draggable
  var isDragging = false,
    dragStartX = 0,
    dragStartY = 0,
    startLeft = 0,
    startTop = 0;
  var header = popup.querySelector(".wm-copilot-action-popup-header");
  header.addEventListener("mousedown", function (e) {
    isDragging = true;
    dragStartX = e.clientX;
    dragStartY = e.clientY;
    startLeft = parseInt(popup.style.left, 10);
    startTop = parseInt(popup.style.top, 10);
    document.body.style.userSelect = "none";
  });
  document.addEventListener("mousemove", function (e) {
    if (!isDragging) return;
    var dx = e.clientX - dragStartX;
    var dy = e.clientY - dragStartY;
    popup.style.left = "".concat(startLeft + dx, "px");
    popup.style.top = "".concat(startTop + dy, "px");
  });
  document.addEventListener("mouseup", function () {
    if (isDragging) {
      isDragging = false;
      document.body.style.userSelect = "";
    }
  });

  // Button handlers
  var closeBtn = popup.querySelector(".wm-copilot-action-popup-close");
  var likeBtn = popup.querySelector(".wm-copilot-action-like");
  var dislikeBtn = popup.querySelector(".wm-copilot-action-dislike");
  var runBtn = popup.querySelector(".wm-copilot-action-run");
  closeBtn.addEventListener("click", function () {
    return popup.remove();
  });
  likeBtn.addEventListener("click", /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          likeBtn.setAttribute("aria-pressed", "true");
          dislikeBtn.setAttribute("aria-pressed", "false");
          _context2.next = 4;
          return sendFeedback(skillId, userGuid);
        case 4:
        case "end":
          return _context2.stop();
      }
    }, _callee2);
  })));
  dislikeBtn.addEventListener("click", /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee3() {
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          dislikeBtn.setAttribute("aria-pressed", "true");
          likeBtn.setAttribute("aria-pressed", "false");
          sendFeedback(skillId, userGuid, false);
        case 3:
        case "end":
          return _context3.stop();
      }
    }, _callee3);
  })));
  runBtn.addEventListener("click", /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee4() {
    return _regeneratorRuntime().wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          WalkMeAPI.walkmex.actions.triggerById(actionId);
          popup.remove();
        case 2:
        case "end":
          return _context4.stop();
      }
    }, _callee4);
  })));
  document.body.appendChild(popup);
}


/***/ }),

/***/ 52:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.fetchData = fetchData;
exports.getData = getData;
exports.postData = postData;
exports.sendData = sendData;
var _logger = __webpack_require__(681);
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator.return && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, catch: function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
var getCtx = (__webpack_require__(257)/* .getCtx */ .yK);
function postData(url) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var body = options.body,
    headers = options.headers,
    timeout = options.timeout;
  return new Promise(function (resolve, reject) {
    getCtx().get('WmAjax').execute({
      url: url,
      data: body,
      headers: headers,
      timeout: timeout,
      processData: false,
      type: 'POST',
      dataType: 'json',
      success: resolve,
      error: reject
    });
  });
}
function sendData(_x) {
  return _sendData.apply(this, arguments);
}
function _sendData() {
  _sendData = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee(_ref) {
    var url, payload, headers, _ref$timeout, timeout, logContext, body;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          url = _ref.url, payload = _ref.payload, headers = _ref.headers, _ref$timeout = _ref.timeout, timeout = _ref$timeout === void 0 ? 5000 : _ref$timeout, logContext = _ref.logContext;
          _context.prev = 1;
          body = JSON.stringify(payload);
          _context.next = 5;
          return postData(url, {
            headers: headers,
            body: body,
            timeout: timeout
          });
        case 5:
          _context.next = 11;
          break;
        case 7:
          _context.prev = 7;
          _context.t0 = _context["catch"](1);
          _logger.uiieLogger.ddAndErrorLog("".concat(logContext, " - Error sending data"), {
            error: _context.t0
          });
          throw _context.t0;
        case 11:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[1, 7]]);
  }));
  return _sendData.apply(this, arguments);
}
function buildUrlWithQuery(url, query) {
  var u = new URL(url);
  Object.entries(query || {}).forEach(function (_ref2) {
    var _ref3 = _slicedToArray(_ref2, 2),
      k = _ref3[0],
      v = _ref3[1];
    if (v == null) return;
    if (Array.isArray(v)) {
      v.forEach(function (val) {
        return u.searchParams.append(k, String(val));
      });
    } else {
      u.searchParams.append(k, String(v));
    }
  });
  return u.toString();
}
function getData(url) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var query = options.query,
    headers = options.headers,
    timeout = options.timeout;
  var fullUrl = buildUrlWithQuery(url, query);
  return new Promise(function (resolve, reject) {
    getCtx().get('WmAjax').execute({
      url: fullUrl,
      headers: headers,
      timeout: timeout,
      type: 'GET',
      dataType: 'json',
      success: resolve,
      error: reject
    });
  });
}
function fetchData(_x2) {
  return _fetchData.apply(this, arguments);
}
function _fetchData() {
  _fetchData = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee2(_ref4) {
    var url, query, _ref4$timeout, timeout, logContext, response;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          url = _ref4.url, query = _ref4.query, _ref4$timeout = _ref4.timeout, timeout = _ref4$timeout === void 0 ? 5000 : _ref4$timeout, logContext = _ref4.logContext;
          _context2.prev = 1;
          _context2.next = 4;
          return getData(url, {
            query: query,
            timeout: timeout
          });
        case 4:
          response = _context2.sent;
          if (!response.success) {
            _context2.next = 8;
            break;
          }
          _logger.uiieLogger.ddAndLog("".concat(logContext, " - Data fetched successfully"));
          return _context2.abrupt("return", response);
        case 8:
          _logger.uiieLogger.ddAndErrorLog("".concat(logContext, " - Data fetch failed - status: ").concat(response.status));
          return _context2.abrupt("return", response);
        case 12:
          _context2.prev = 12;
          _context2.t0 = _context2["catch"](1);
          _logger.uiieLogger.ddAndErrorLog("".concat(logContext, " - Error fetching data"), {
            error: _context2.t0
          });
          throw _context2.t0;
        case 16:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[1, 12]]);
  }));
  return _fetchData.apply(this, arguments);
}


/***/ }),

/***/ 257:
/***/ (function(__unused_webpack_module, exports) {

var __webpack_unused_export__;
/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

'use strict';

var pluginEntryManager = {
    createPluginEntry: createPluginEntry,
    getCtx: getCtx
};

var lego;

function createPluginEntry(createPluginCallback) {
    return function(getLego) {
        lego = getLego();

        createPluginCallback(registerPlugin);
    }
}

function getCtx() {
    return lego.ctx;
}

function registerPlugin(plugin) {
    lego.plugin(plugin);
}

__webpack_unused_export__ = true;
__webpack_unused_export__ = pluginEntryManager;
exports.mJ = pluginEntryManager.createPluginEntry;
exports.yK = pluginEntryManager.getCtx;



/***/ }),

/***/ 286:
/***/ (function(module) {

"use strict";
module.exports = /*#__PURE__*/JSON.parse('{"name":"wm-plugin-uii-everywhere","description":"uii main plugin","version":"0.0.6-rc.2","main":"dist/main.js","scripts":{"test":"exit 0","prebuild:common":"rm -rf dist build","build:common":"grunt build","postbuild":"node ../scripts/verify.js ../","build":"npm run build:common","build:local:common":"npm run build:common","postbuild:local:common":"mv ../local_prelib.js ../../wm-local-http-static-server/lego","build:local":"cross-env ENV=local npm run build:local:common","build:qa":"cross-env ENV=qa npm run build:local:common","build:prod":"cross-env ENV=prod npm run build:local:common","build:eu-prod":"cross-env ENV=eu-prod npm run build:local:common"},"dependencies":{"@babel/runtime-corejs3":"^7.5.5","wm-prelib-plugin-entry-manager":"^0.1.0","grunt-browserify":"^6.0.0"},"devDependencies":{"@babel/cli":"7.2.3","@babel/core":"7.3.4","@babel/plugin-transform-runtime":"^7.5.5","@babel/preset-env":"7.3.4","browserify":"^13.3.0","browserify-versionify":"^1.0.6","cross-env":"^7.0.3","envify":"^4.1.0","grunt":"^1.6.1","grunt-babel":"8.0.0","grunt-release":"^0.13.0","husky":"^4.3.6","typescript":"^5.2.2","wm-plugins-core":"^2.14.15"},"publishConfig":{"registry":"https://artifactory.walkmernd.com/artifactory/api/npm/npm/"},"pluginType":"delivery-general","wmCommit":"d81d8f761e514592346628827b41b4a042026d59","wmLegoProject":"uii/src","wmRepublishOriginalVersion":"0.0.1-jenkins-ci.20250925-090840-d81d8f76","wmRepublishDate":"2025-09-25T09:41:11.100Z","wmComment":"config issue fix"}');

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module used 'module' so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__(498);
/******/ 	wmbundle = __webpack_exports__;
/******/ 	
/******/ })()
;
/* WalkMe Module */ return wmbundle; })
//# sourceMappingURL=bundle.js.map
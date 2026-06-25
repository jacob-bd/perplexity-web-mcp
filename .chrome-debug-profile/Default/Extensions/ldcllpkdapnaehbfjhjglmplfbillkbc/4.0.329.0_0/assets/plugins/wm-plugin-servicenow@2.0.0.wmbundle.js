/* WalkMe Module */ typeof _walkmeInternals !== 'undefined' && _walkmeInternals.wmloader && _walkmeInternals.wmloader.define('wm-plugin-servicenow@2.0.0@prelib', {"name":"wm-plugin-servicenow","version":"2.0.0","toolbelt":"2.0.2","packageDate":"2025-05-05T15:12:47.681Z","entry":"prelib"}, function (__wmplugin__) {  
var wmbundle;
/******/ (function() { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 7282:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

module.exports = __webpack_require__(6343);



/***/ }),

/***/ 2070:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// This method of obtaining a reference to the global object needs to be
// kept identical to the way it is obtained in runtime.js
var g = (function() { return this })() || Function("return this")();

// Use `getOwnPropertyNames` because not all browsers support calling
// `hasOwnProperty` on the global `self` object in a worker. See #183.
var hadRuntime = g.regeneratorRuntime &&
  Object.getOwnPropertyNames(g).indexOf("regeneratorRuntime") >= 0;

// Save the old regeneratorRuntime in case it needs to be restored later.
var oldRuntime = hadRuntime && g.regeneratorRuntime;

// Force reevalutation of runtime.js.
g.regeneratorRuntime = undefined;

module.exports = __webpack_require__(5909);

if (hadRuntime) {
  // Restore the original runtime.
  g.regeneratorRuntime = oldRuntime;
} else {
  // Remove the global property added by runtime.js.
  try {
    delete g.regeneratorRuntime;
  } catch(e) {
    g.regeneratorRuntime = undefined;
  }
}



/***/ }),

/***/ 5909:
/***/ (function(module) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

!(function(global) {
  "use strict";

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  var inModule = "object" === "object";
  var runtime = global.regeneratorRuntime;
  if (runtime) {
    if (inModule) {
      // If regeneratorRuntime is defined globally and we're in a module,
      // make the exports object identical to regeneratorRuntime.
      module.exports = runtime;
    }
    // Don't bother evaluating the rest of this file if the runtime was
    // already defined globally.
    return;
  }

  // Define the runtime globally (as expected by generated code) as either
  // module.exports (if we're in a module) or a new, empty object.
  runtime = global.regeneratorRuntime = inModule ? module.exports : {};

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  runtime.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  IteratorPrototype[iteratorSymbol] = function () {
    return this;
  };

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype &&
      NativeIteratorPrototype !== Op &&
      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype =
    Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
  GeneratorFunctionPrototype.constructor = GeneratorFunction;
  GeneratorFunctionPrototype[toStringTagSymbol] =
    GeneratorFunction.displayName = "GeneratorFunction";

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      prototype[method] = function(arg) {
        return this._invoke(method, arg);
      };
    });
  }

  runtime.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  runtime.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      if (!(toStringTagSymbol in genFun)) {
        genFun[toStringTagSymbol] = "GeneratorFunction";
      }
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  runtime.awrap = function(arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value &&
            typeof value === "object" &&
            hasOwn.call(value, "__await")) {
          return Promise.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return Promise.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration. If the Promise is rejected, however, the
          // result for this iteration will be rejected with the same
          // reason. Note that rejections of yielded Promises are not
          // thrown back into the generator function, as is the case
          // when an awaited Promise is rejected. This difference in
          // behavior between yield and await is important, because it
          // allows the consumer to decide what to do with the yielded
          // rejection (swallow it and continue, manually .throw it back
          // into the generator, abandon iteration, whatever). With
          // await, by contrast, there is no opportunity to examine the
          // rejection reason outside the generator function, so the
          // only option is to throw it from the await expression, and
          // let the generator function handle the exception.
          result.value = unwrapped;
          resolve(result);
        }, reject);
      }
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new Promise(function(resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  AsyncIterator.prototype[asyncIteratorSymbol] = function () {
    return this;
  };
  runtime.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  runtime.async = function(innerFn, outerFn, self, tryLocsList) {
    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList)
    );

    return runtime.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;

        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);

        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (method === undefined) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        if (delegate.iterator.return) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError(
          "The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (! info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value;

      // Resume execution at the desired location (see delegateYield).
      context.next = delegate.nextLoc;

      // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.
      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined;
      }

    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    }

    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  Gp[toStringTagSymbol] = "Generator";

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  Gp[iteratorSymbol] = function() {
    return this;
  };

  Gp.toString = function() {
    return "[object Generator]";
  };

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  runtime.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  runtime.values = values;

  function doneResult() {
    return { value: undefined, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined;
        }

        return !! caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined;
      }

      return ContinueSentinel;
    }
  };
})(
  // In sloppy mode, unbound `this` refers to the global object, fallback to
  // Function constructor if we're in global strict mode. That is sadly a form
  // of indirect eval which violates Content Security Policy.
  (function() { return this })() || Function("return this")()
);



/***/ }),

/***/ 6601:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

module.exports = { "default": __webpack_require__(9422), __esModule: true };


/***/ }),

/***/ 7509:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

module.exports = { "default": __webpack_require__(7102), __esModule: true };


/***/ }),

/***/ 5922:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

module.exports = { "default": __webpack_require__(6496), __esModule: true };


/***/ }),

/***/ 7:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

module.exports = { "default": __webpack_require__(7372), __esModule: true };


/***/ }),

/***/ 7428:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

"use strict";

exports.__esModule = true;

var _promise = __webpack_require__(7509);

var _promise2 = _interopRequireDefault(_promise);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports["default"] = function (fn) {
  return function () {
    var gen = fn.apply(this, arguments);
    return new _promise2.default(function (resolve, reject) {
      function step(key, arg) {
        try {
          var info = gen[key](arg);
          var value = info.value;
        } catch (error) {
          reject(error);
          return;
        }

        if (info.done) {
          resolve(value);
        } else {
          return _promise2.default.resolve(value).then(function (value) {
            step("next", value);
          }, function (err) {
            step("throw", err);
          });
        }
      }

      return step("next");
    });
  };
};


/***/ }),

/***/ 839:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

"use strict";

exports.__esModule = true;

var _iterator = __webpack_require__(7);

var _iterator2 = _interopRequireDefault(_iterator);

var _symbol = __webpack_require__(5922);

var _symbol2 = _interopRequireDefault(_symbol);

var _typeof = typeof _symbol2.default === "function" && typeof _iterator2.default === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports["default"] = typeof _symbol2.default === "function" && _typeof(_iterator2.default) === "symbol" ? function (obj) {
  return typeof obj === "undefined" ? "undefined" : _typeof(obj);
} : function (obj) {
  return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof(obj);
};


/***/ }),

/***/ 4831:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

module.exports = __webpack_require__(2070);



/***/ }),

/***/ 1802:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

function clientServerLogger(ctx){
    var _this = this;
    
    var DAY_IN_MILLISECONDS = 86400000;
    var TEN_YEARS_IN_MILLISECONDS = DAY_IN_MILLISECONDS * 365 * 10;
    var WEEK_IN_MILLISECONDS = DAY_IN_MILLISECONDS * 7;
    var LOG_LEVEL = {
        ALWAYS: 1,
        DAILY: 2,
        WEEKLY: 3,
        ONCE: 4
    };
    
    var _filterMapper = {};
    var _eventsListener;
    var _storageManager;

    _this._messageQueue = [];
    _this.ConstsLogLevel = LOG_LEVEL;
    _this.sendLog = sendLog;

    function ctor() {
        _this._logsIoSender = __webpack_require__(2459)(ctx);
        _eventsListener = ctx.get('EventsListener');
        _eventsListener.on('BeforeStorageLoadedCallback', _beforeStorageLoadedHandler);
        _configureFilterMapper();
    }
    
    function _beforeStorageLoadedHandler() {
        return ctx.create('Promise', function(resolve) {
            _storageManager = ctx.get('StorageManagerFactory').byType('jstorage', true);
            _emptyQueue();
            resolve();
        });
    }

    function _configureFilterMapper() {
        _filterMapper[LOG_LEVEL.ALWAYS] = function() {
            return true;
        };
        
        _filterMapper[LOG_LEVEL.ONCE]   = _hasLogBeenSent(TEN_YEARS_IN_MILLISECONDS);
        _filterMapper[LOG_LEVEL.WEEKLY] = _hasLogBeenSent(WEEK_IN_MILLISECONDS);
        _filterMapper[LOG_LEVEL.DAILY]  = _hasLogBeenSent(DAY_IN_MILLISECONDS);
    }

    function sendLog(log) {
        if (!_storageManager) {
            _this._messageQueue.push(log);
            return;
        }

        if (_shouldSendLog(log)) {
            _this._logsIoSender.sendLog(log.message, log.extraData);
        }
    }

    function _emptyQueue() {
        _this._messageQueue.forEach(function(log) {
            _this.sendLog(log);
        });
        _this._messageQueue = [];
    }

    function _shouldSendLog(log) {
        if (!log.message || !_filterMapper[log.extraData.logLevel]) {
            return false;
        }

        return _filterMapper[log.extraData.logLevel](log.message);
    }

    function _hasLogBeenSent(expirationDate) {
        return function (message) {
            var logMessageKey = _getUniqueLogMessage(window._walkMe.getUserGuid(), window._walkMe.getEndUserGuid(), message);
            var alreadySentDate = _storageManager.getData(logMessageKey) || -1;
            var now = new Date().getTime();
    
            if (now - expirationDate > alreadySentDate) { // longer than the last stored log
                _storageManager.saveData(logMessageKey, now, expirationDate);
                return true;
            }
            return false;
        }
    }

    function _getUniqueLogMessage(userGuid, endUserGuid, message) {
        var messageWithGuid = userGuid + endUserGuid + message.split(' ').join('');
        return _hashCode(messageWithGuid);
    }

    function _hashCode(inputString) {
        var hash = 0, i, chr;
        if (inputString.length === 0) return hash;
        for (i = 0; i < inputString.length; i++) {
            chr = inputString.charCodeAt(i);
            hash = ((hash << 5) - hash) + chr;
            hash |= 0; // Convert to 32bit integer
        }
        return '' + hash;
    }

    ctor();
}

var clientServerLoggerInstance;

module.exports = function (ctx) {
    if (!clientServerLoggerInstance) {
        clientServerLoggerInstance = new clientServerLogger(ctx);
    }
    
    return clientServerLoggerInstance;
}



/***/ }),

/***/ 9422:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

__webpack_require__(8686);
module.exports = __webpack_require__(1190).Object.assign;



/***/ }),

/***/ 7102:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

__webpack_require__(514);
__webpack_require__(4615);
__webpack_require__(8986);
__webpack_require__(6125);
__webpack_require__(4783);
__webpack_require__(3129);
module.exports = __webpack_require__(1190).Promise;



/***/ }),

/***/ 6496:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

__webpack_require__(4554);
__webpack_require__(514);
__webpack_require__(9324);
__webpack_require__(8076);
module.exports = __webpack_require__(1190).Symbol;



/***/ }),

/***/ 7372:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

__webpack_require__(4615);
__webpack_require__(8986);
module.exports = (__webpack_require__(9024).f)('iterator');



/***/ }),

/***/ 5859:
/***/ (function(module) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

module.exports = function (it) {
  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
  return it;
};



/***/ }),

/***/ 3184:
/***/ (function(module) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

module.exports = function () { /* empty */ };



/***/ }),

/***/ 4064:
/***/ (function(module) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

module.exports = function (it, Constructor, name, forbiddenField) {
  if (!(it instanceof Constructor) || (forbiddenField !== undefined && forbiddenField in it)) {
    throw TypeError(name + ': incorrect invocation!');
  } return it;
};



/***/ }),

/***/ 3148:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

var isObject = __webpack_require__(2625);
module.exports = function (it) {
  if (!isObject(it)) throw TypeError(it + ' is not an object!');
  return it;
};



/***/ }),

/***/ 1856:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

// false -> Array#indexOf
// true  -> Array#includes
var toIObject = __webpack_require__(3293);
var toLength = __webpack_require__(7013);
var toAbsoluteIndex = __webpack_require__(5637);
module.exports = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIObject($this);
    var length = toLength(O.length);
    var index = toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare
    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare
      if (value != value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) if (IS_INCLUDES || index in O) {
      if (O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};



/***/ }),

/***/ 440:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

// getting tag from 19.1.3.6 Object.prototype.toString()
var cof = __webpack_require__(4441);
var TAG = __webpack_require__(46)('toStringTag');
// ES3 wrong here
var ARG = cof(function () { return arguments; }()) == 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function (it, key) {
  try {
    return it[key];
  } catch (e) { /* empty */ }
};

module.exports = function (it) {
  var O, T, B;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (T = tryGet(O = Object(it), TAG)) == 'string' ? T
    // builtinTag case
    : ARG ? cof(O)
    // ES3 arguments fallback
    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
};



/***/ }),

/***/ 4441:
/***/ (function(module) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

var toString = {}.toString;

module.exports = function (it) {
  return toString.call(it).slice(8, -1);
};



/***/ }),

/***/ 1190:
/***/ (function(module) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

var core = module.exports = { version: '2.5.5' };
if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef



/***/ }),

/***/ 4756:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

// optional / simple context binding
var aFunction = __webpack_require__(5859);
module.exports = function (fn, that, length) {
  aFunction(fn);
  if (that === undefined) return fn;
  switch (length) {
    case 1: return function (a) {
      return fn.call(that, a);
    };
    case 2: return function (a, b) {
      return fn.call(that, a, b);
    };
    case 3: return function (a, b, c) {
      return fn.call(that, a, b, c);
    };
  }
  return function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};



/***/ }),

/***/ 9080:
/***/ (function(module) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

// 7.2.1 RequireObjectCoercible(argument)
module.exports = function (it) {
  if (it == undefined) throw TypeError("Can't call method on  " + it);
  return it;
};



/***/ }),

/***/ 4459:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

// Thank's IE8 for his funny defineProperty
module.exports = !__webpack_require__(7648)(function () {
  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
});



/***/ }),

/***/ 8474:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

var isObject = __webpack_require__(2625);
var document = (__webpack_require__(3982).document);
// typeof document.createElement is 'object' in old IE
var is = isObject(document) && isObject(document.createElement);
module.exports = function (it) {
  return is ? document.createElement(it) : {};
};



/***/ }),

/***/ 5412:
/***/ (function(module) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

// IE 8- don't enum bug keys
module.exports = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');



/***/ }),

/***/ 5609:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

// all enumerable object keys, includes symbols
var getKeys = __webpack_require__(3143);
var gOPS = __webpack_require__(6380);
var pIE = __webpack_require__(1785);
module.exports = function (it) {
  var result = getKeys(it);
  var getSymbols = gOPS.f;
  if (getSymbols) {
    var symbols = getSymbols(it);
    var isEnum = pIE.f;
    var i = 0;
    var key;
    while (symbols.length > i) if (isEnum.call(it, key = symbols[i++])) result.push(key);
  } return result;
};



/***/ }),

/***/ 8887:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

var global = __webpack_require__(3982);
var core = __webpack_require__(1190);
var ctx = __webpack_require__(4756);
var hide = __webpack_require__(5669);
var has = __webpack_require__(4325);
var PROTOTYPE = 'prototype';

var $export = function (type, name, source) {
  var IS_FORCED = type & $export.F;
  var IS_GLOBAL = type & $export.G;
  var IS_STATIC = type & $export.S;
  var IS_PROTO = type & $export.P;
  var IS_BIND = type & $export.B;
  var IS_WRAP = type & $export.W;
  var exports = IS_GLOBAL ? core : core[name] || (core[name] = {});
  var expProto = exports[PROTOTYPE];
  var target = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE];
  var key, own, out;
  if (IS_GLOBAL) source = name;
  for (key in source) {
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    if (own && has(exports, key)) continue;
    // export native or passed
    out = own ? target[key] : source[key];
    // prevent global pollution for namespaces
    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
    // bind timers to global for call from export context
    : IS_BIND && own ? ctx(out, global)
    // wrap global constructors for prevent change them in library
    : IS_WRAP && target[key] == out ? (function (C) {
      var F = function (a, b, c) {
        if (this instanceof C) {
          switch (arguments.length) {
            case 0: return new C();
            case 1: return new C(a);
            case 2: return new C(a, b);
          } return new C(a, b, c);
        } return C.apply(this, arguments);
      };
      F[PROTOTYPE] = C[PROTOTYPE];
      return F;
    // make static versions for prototype methods
    })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
    if (IS_PROTO) {
      (exports.virtual || (exports.virtual = {}))[key] = out;
      // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
      if (type & $export.R && expProto && !expProto[key]) hide(expProto, key, out);
    }
  }
};
// type bitmap
$export.F = 1;   // forced
$export.G = 2;   // global
$export.S = 4;   // static
$export.P = 8;   // proto
$export.B = 16;  // bind
$export.W = 32;  // wrap
$export.U = 64;  // safe
$export.R = 128; // real proto method for `library`
module.exports = $export;



/***/ }),

/***/ 7648:
/***/ (function(module) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

module.exports = function (exec) {
  try {
    return !!exec();
  } catch (e) {
    return true;
  }
};



/***/ }),

/***/ 8126:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

var ctx = __webpack_require__(4756);
var call = __webpack_require__(7392);
var isArrayIter = __webpack_require__(924);
var anObject = __webpack_require__(3148);
var toLength = __webpack_require__(7013);
var getIterFn = __webpack_require__(9010);
var BREAK = {};
var RETURN = {};
var exports = module.exports = function (iterable, entries, fn, that, ITERATOR) {
  var iterFn = ITERATOR ? function () { return iterable; } : getIterFn(iterable);
  var f = ctx(fn, that, entries ? 2 : 1);
  var index = 0;
  var length, step, iterator, result;
  if (typeof iterFn != 'function') throw TypeError(iterable + ' is not iterable!');
  // fast case for arrays with default iterator
  if (isArrayIter(iterFn)) for (length = toLength(iterable.length); length > index; index++) {
    result = entries ? f(anObject(step = iterable[index])[0], step[1]) : f(iterable[index]);
    if (result === BREAK || result === RETURN) return result;
  } else for (iterator = iterFn.call(iterable); !(step = iterator.next()).done;) {
    result = call(iterator, f, step.value, entries);
    if (result === BREAK || result === RETURN) return result;
  }
};
exports.BREAK = BREAK;
exports.RETURN = RETURN;



/***/ }),

/***/ 3982:
/***/ (function(module) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self
  // eslint-disable-next-line no-new-func
  : Function('return this')();
if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef



/***/ }),

/***/ 4325:
/***/ (function(module) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

var hasOwnProperty = {}.hasOwnProperty;
module.exports = function (it, key) {
  return hasOwnProperty.call(it, key);
};



/***/ }),

/***/ 5669:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

var dP = __webpack_require__(7991);
var createDesc = __webpack_require__(9940);
module.exports = __webpack_require__(4459) ? function (object, key, value) {
  return dP.f(object, key, createDesc(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};



/***/ }),

/***/ 9556:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

var document = (__webpack_require__(3982).document);
module.exports = document && document.documentElement;



/***/ }),

/***/ 5540:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

module.exports = !__webpack_require__(4459) && !__webpack_require__(7648)(function () {
  return Object.defineProperty(__webpack_require__(8474)('div'), 'a', { get: function () { return 7; } }).a != 7;
});



/***/ }),

/***/ 8197:
/***/ (function(module) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

// fast apply, http://jsperf.lnkit.com/fast-apply/5
module.exports = function (fn, args, that) {
  var un = that === undefined;
  switch (args.length) {
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
  } return fn.apply(that, args);
};



/***/ }),

/***/ 9017:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = __webpack_require__(4441);
// eslint-disable-next-line no-prototype-builtins
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
  return cof(it) == 'String' ? it.split('') : Object(it);
};



/***/ }),

/***/ 924:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

// check on default Array iterator
var Iterators = __webpack_require__(4178);
var ITERATOR = __webpack_require__(46)('iterator');
var ArrayProto = Array.prototype;

module.exports = function (it) {
  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
};



/***/ }),

/***/ 3877:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

// 7.2.2 IsArray(argument)
var cof = __webpack_require__(4441);
module.exports = Array.isArray || function isArray(arg) {
  return cof(arg) == 'Array';
};



/***/ }),

/***/ 2625:
/***/ (function(module) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

module.exports = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};



/***/ }),

/***/ 7392:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

// call something on iterator step with safe closing on error
var anObject = __webpack_require__(3148);
module.exports = function (iterator, fn, value, entries) {
  try {
    return entries ? fn(anObject(value)[0], value[1]) : fn(value);
  // 7.4.6 IteratorClose(iterator, completion)
  } catch (e) {
    var ret = iterator['return'];
    if (ret !== undefined) anObject(ret.call(iterator));
    throw e;
  }
};



/***/ }),

/***/ 8520:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

'use strict';
var create = __webpack_require__(951);
var descriptor = __webpack_require__(9940);
var setToStringTag = __webpack_require__(2604);
var IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
__webpack_require__(5669)(IteratorPrototype, __webpack_require__(46)('iterator'), function () { return this; });

module.exports = function (Constructor, NAME, next) {
  Constructor.prototype = create(IteratorPrototype, { next: descriptor(1, next) });
  setToStringTag(Constructor, NAME + ' Iterator');
};



/***/ }),

/***/ 8519:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

'use strict';
var LIBRARY = __webpack_require__(4662);
var $export = __webpack_require__(8887);
var redefine = __webpack_require__(7779);
var hide = __webpack_require__(5669);
var Iterators = __webpack_require__(4178);
var $iterCreate = __webpack_require__(8520);
var setToStringTag = __webpack_require__(2604);
var getPrototypeOf = __webpack_require__(4043);
var ITERATOR = __webpack_require__(46)('iterator');
var BUGGY = !([].keys && 'next' in [].keys()); // Safari has buggy iterators w/o `next`
var FF_ITERATOR = '@@iterator';
var KEYS = 'keys';
var VALUES = 'values';

var returnThis = function () { return this; };

module.exports = function (Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED) {
  $iterCreate(Constructor, NAME, next);
  var getMethod = function (kind) {
    if (!BUGGY && kind in proto) return proto[kind];
    switch (kind) {
      case KEYS: return function keys() { return new Constructor(this, kind); };
      case VALUES: return function values() { return new Constructor(this, kind); };
    } return function entries() { return new Constructor(this, kind); };
  };
  var TAG = NAME + ' Iterator';
  var DEF_VALUES = DEFAULT == VALUES;
  var VALUES_BUG = false;
  var proto = Base.prototype;
  var $native = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT];
  var $default = $native || getMethod(DEFAULT);
  var $entries = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined;
  var $anyNative = NAME == 'Array' ? proto.entries || $native : $native;
  var methods, key, IteratorPrototype;
  // Fix native
  if ($anyNative) {
    IteratorPrototype = getPrototypeOf($anyNative.call(new Base()));
    if (IteratorPrototype !== Object.prototype && IteratorPrototype.next) {
      // Set @@toStringTag to native iterators
      setToStringTag(IteratorPrototype, TAG, true);
      // fix for some old engines
      if (!LIBRARY && typeof IteratorPrototype[ITERATOR] != 'function') hide(IteratorPrototype, ITERATOR, returnThis);
    }
  }
  // fix Array#{values, @@iterator}.name in V8 / FF
  if (DEF_VALUES && $native && $native.name !== VALUES) {
    VALUES_BUG = true;
    $default = function values() { return $native.call(this); };
  }
  // Define iterator
  if ((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])) {
    hide(proto, ITERATOR, $default);
  }
  // Plug for library
  Iterators[NAME] = $default;
  Iterators[TAG] = returnThis;
  if (DEFAULT) {
    methods = {
      values: DEF_VALUES ? $default : getMethod(VALUES),
      keys: IS_SET ? $default : getMethod(KEYS),
      entries: $entries
    };
    if (FORCED) for (key in methods) {
      if (!(key in proto)) redefine(proto, key, methods[key]);
    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
  }
  return methods;
};



/***/ }),

/***/ 3995:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

var ITERATOR = __webpack_require__(46)('iterator');
var SAFE_CLOSING = false;

try {
  var riter = [7][ITERATOR]();
  riter['return'] = function () { SAFE_CLOSING = true; };
  // eslint-disable-next-line no-throw-literal
  Array.from(riter, function () { throw 2; });
} catch (e) { /* empty */ }

module.exports = function (exec, skipClosing) {
  if (!skipClosing && !SAFE_CLOSING) return false;
  var safe = false;
  try {
    var arr = [7];
    var iter = arr[ITERATOR]();
    iter.next = function () { return { done: safe = true }; };
    arr[ITERATOR] = function () { return iter; };
    exec(arr);
  } catch (e) { /* empty */ }
  return safe;
};



/***/ }),

/***/ 418:
/***/ (function(module) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

module.exports = function (done, value) {
  return { value: value, done: !!done };
};



/***/ }),

/***/ 4178:
/***/ (function(module) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

module.exports = {};



/***/ }),

/***/ 4662:
/***/ (function(module) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

module.exports = true;



/***/ }),

/***/ 4468:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

var META = __webpack_require__(1543)('meta');
var isObject = __webpack_require__(2625);
var has = __webpack_require__(4325);
var setDesc = (__webpack_require__(7991).f);
var id = 0;
var isExtensible = Object.isExtensible || function () {
  return true;
};
var FREEZE = !__webpack_require__(7648)(function () {
  return isExtensible(Object.preventExtensions({}));
});
var setMeta = function (it) {
  setDesc(it, META, { value: {
    i: 'O' + ++id, // object ID
    w: {}          // weak collections IDs
  } });
};
var fastKey = function (it, create) {
  // return primitive with prefix
  if (!isObject(it)) return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
  if (!has(it, META)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return 'F';
    // not necessary to add metadata
    if (!create) return 'E';
    // add missing metadata
    setMeta(it);
  // return object ID
  } return it[META].i;
};
var getWeak = function (it, create) {
  if (!has(it, META)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return true;
    // not necessary to add metadata
    if (!create) return false;
    // add missing metadata
    setMeta(it);
  // return hash weak collections IDs
  } return it[META].w;
};
// add metadata on freeze-family methods calling
var onFreeze = function (it) {
  if (FREEZE && meta.NEED && isExtensible(it) && !has(it, META)) setMeta(it);
  return it;
};
var meta = module.exports = {
  KEY: META,
  NEED: false,
  fastKey: fastKey,
  getWeak: getWeak,
  onFreeze: onFreeze
};



/***/ }),

/***/ 5664:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

var global = __webpack_require__(3982);
var macrotask = (__webpack_require__(1508).set);
var Observer = global.MutationObserver || global.WebKitMutationObserver;
var process = global.process;
var Promise = global.Promise;
var isNode = __webpack_require__(4441)(process) == 'process';

module.exports = function () {
  var head, last, notify;

  var flush = function () {
    var parent, fn;
    if (isNode && (parent = process.domain)) parent.exit();
    while (head) {
      fn = head.fn;
      head = head.next;
      try {
        fn();
      } catch (e) {
        if (head) notify();
        else last = undefined;
        throw e;
      }
    } last = undefined;
    if (parent) parent.enter();
  };

  // Node.js
  if (isNode) {
    notify = function () {
      process.nextTick(flush);
    };
  // browsers with MutationObserver, except iOS Safari - https://github.com/zloirock/core-js/issues/339
  } else if (Observer && !(global.navigator && global.navigator.standalone)) {
    var toggle = true;
    var node = document.createTextNode('');
    new Observer(flush).observe(node, { characterData: true }); // eslint-disable-line no-new
    notify = function () {
      node.data = toggle = !toggle;
    };
  // environments with maybe non-completely correct, but existent Promise
  } else if (Promise && Promise.resolve) {
    var promise = Promise.resolve();
    notify = function () {
      promise.then(flush);
    };
  // for other environments - macrotask based on:
  // - setImmediate
  // - MessageChannel
  // - window.postMessag
  // - onreadystatechange
  // - setTimeout
  } else {
    notify = function () {
      // strange IE + webpack dev server bug - use .call(global)
      macrotask.call(global, flush);
    };
  }

  return function (fn) {
    var task = { fn: fn, next: undefined };
    if (last) last.next = task;
    if (!head) {
      head = task;
      notify();
    } last = task;
  };
};



/***/ }),

/***/ 1898:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

'use strict';
// 25.4.1.5 NewPromiseCapability(C)
var aFunction = __webpack_require__(5859);

function PromiseCapability(C) {
  var resolve, reject;
  this.promise = new C(function ($$resolve, $$reject) {
    if (resolve !== undefined || reject !== undefined) throw TypeError('Bad Promise constructor');
    resolve = $$resolve;
    reject = $$reject;
  });
  this.resolve = aFunction(resolve);
  this.reject = aFunction(reject);
}

module.exports.f = function (C) {
  return new PromiseCapability(C);
};



/***/ }),

/***/ 4454:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

'use strict';
// 19.1.2.1 Object.assign(target, source, ...)
var getKeys = __webpack_require__(3143);
var gOPS = __webpack_require__(6380);
var pIE = __webpack_require__(1785);
var toObject = __webpack_require__(662);
var IObject = __webpack_require__(9017);
var $assign = Object.assign;

// should work with symbols and should have deterministic property order (V8 bug)
module.exports = !$assign || __webpack_require__(7648)(function () {
  var A = {};
  var B = {};
  // eslint-disable-next-line no-undef
  var S = Symbol();
  var K = 'abcdefghijklmnopqrst';
  A[S] = 7;
  K.split('').forEach(function (k) { B[k] = k; });
  return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
}) ? function assign(target, source) { // eslint-disable-line no-unused-vars
  var T = toObject(target);
  var aLen = arguments.length;
  var index = 1;
  var getSymbols = gOPS.f;
  var isEnum = pIE.f;
  while (aLen > index) {
    var S = IObject(arguments[index++]);
    var keys = getSymbols ? getKeys(S).concat(getSymbols(S)) : getKeys(S);
    var length = keys.length;
    var j = 0;
    var key;
    while (length > j) if (isEnum.call(S, key = keys[j++])) T[key] = S[key];
  } return T;
} : $assign;



/***/ }),

/***/ 951:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
var anObject = __webpack_require__(3148);
var dPs = __webpack_require__(818);
var enumBugKeys = __webpack_require__(5412);
var IE_PROTO = __webpack_require__(5686)('IE_PROTO');
var Empty = function () { /* empty */ };
var PROTOTYPE = 'prototype';

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var createDict = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = __webpack_require__(8474)('iframe');
  var i = enumBugKeys.length;
  var lt = '<';
  var gt = '>';
  var iframeDocument;
  iframe.style.display = 'none';
  (__webpack_require__(9556).appendChild)(iframe);
  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
  // createDict = iframe.contentWindow.Object;
  // html.removeChild(iframe);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
  iframeDocument.close();
  createDict = iframeDocument.F;
  while (i--) delete createDict[PROTOTYPE][enumBugKeys[i]];
  return createDict();
};

module.exports = Object.create || function create(O, Properties) {
  var result;
  if (O !== null) {
    Empty[PROTOTYPE] = anObject(O);
    result = new Empty();
    Empty[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = createDict();
  return Properties === undefined ? result : dPs(result, Properties);
};



/***/ }),

/***/ 7991:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

var anObject = __webpack_require__(3148);
var IE8_DOM_DEFINE = __webpack_require__(5540);
var toPrimitive = __webpack_require__(5776);
var dP = Object.defineProperty;

exports.f = __webpack_require__(4459) ? Object.defineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return dP(O, P, Attributes);
  } catch (e) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};



/***/ }),

/***/ 818:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

var dP = __webpack_require__(7991);
var anObject = __webpack_require__(3148);
var getKeys = __webpack_require__(3143);

module.exports = __webpack_require__(4459) ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject(O);
  var keys = getKeys(Properties);
  var length = keys.length;
  var i = 0;
  var P;
  while (length > i) dP.f(O, P = keys[i++], Properties[P]);
  return O;
};



/***/ }),

/***/ 1177:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

var pIE = __webpack_require__(1785);
var createDesc = __webpack_require__(9940);
var toIObject = __webpack_require__(3293);
var toPrimitive = __webpack_require__(5776);
var has = __webpack_require__(4325);
var IE8_DOM_DEFINE = __webpack_require__(5540);
var gOPD = Object.getOwnPropertyDescriptor;

exports.f = __webpack_require__(4459) ? gOPD : function getOwnPropertyDescriptor(O, P) {
  O = toIObject(O);
  P = toPrimitive(P, true);
  if (IE8_DOM_DEFINE) try {
    return gOPD(O, P);
  } catch (e) { /* empty */ }
  if (has(O, P)) return createDesc(!pIE.f.call(O, P), O[P]);
};



/***/ }),

/***/ 9285:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
var toIObject = __webpack_require__(3293);
var gOPN = (__webpack_require__(5711).f);
var toString = {}.toString;

var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
  ? Object.getOwnPropertyNames(window) : [];

var getWindowNames = function (it) {
  try {
    return gOPN(it);
  } catch (e) {
    return windowNames.slice();
  }
};

module.exports.f = function getOwnPropertyNames(it) {
  return windowNames && toString.call(it) == '[object Window]' ? getWindowNames(it) : gOPN(toIObject(it));
};



/***/ }),

/***/ 5711:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
var $keys = __webpack_require__(9433);
var hiddenKeys = (__webpack_require__(5412).concat)('length', 'prototype');

exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return $keys(O, hiddenKeys);
};



/***/ }),

/***/ 6380:
/***/ (function(__unused_webpack_module, exports) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

exports.f = Object.getOwnPropertySymbols;



/***/ }),

/***/ 4043:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
var has = __webpack_require__(4325);
var toObject = __webpack_require__(662);
var IE_PROTO = __webpack_require__(5686)('IE_PROTO');
var ObjectProto = Object.prototype;

module.exports = Object.getPrototypeOf || function (O) {
  O = toObject(O);
  if (has(O, IE_PROTO)) return O[IE_PROTO];
  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectProto : null;
};



/***/ }),

/***/ 9433:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

var has = __webpack_require__(4325);
var toIObject = __webpack_require__(3293);
var arrayIndexOf = __webpack_require__(1856)(false);
var IE_PROTO = __webpack_require__(5686)('IE_PROTO');

module.exports = function (object, names) {
  var O = toIObject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) if (key != IE_PROTO) has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (has(O, key = names[i++])) {
    ~arrayIndexOf(result, key) || result.push(key);
  }
  return result;
};



/***/ }),

/***/ 3143:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var $keys = __webpack_require__(9433);
var enumBugKeys = __webpack_require__(5412);

module.exports = Object.keys || function keys(O) {
  return $keys(O, enumBugKeys);
};



/***/ }),

/***/ 1785:
/***/ (function(__unused_webpack_module, exports) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

exports.f = {}.propertyIsEnumerable;



/***/ }),

/***/ 4344:
/***/ (function(module) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

module.exports = function (exec) {
  try {
    return { e: false, v: exec() };
  } catch (e) {
    return { e: true, v: e };
  }
};



/***/ }),

/***/ 6445:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

var anObject = __webpack_require__(3148);
var isObject = __webpack_require__(2625);
var newPromiseCapability = __webpack_require__(1898);

module.exports = function (C, x) {
  anObject(C);
  if (isObject(x) && x.constructor === C) return x;
  var promiseCapability = newPromiseCapability.f(C);
  var resolve = promiseCapability.resolve;
  resolve(x);
  return promiseCapability.promise;
};



/***/ }),

/***/ 9940:
/***/ (function(module) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};



/***/ }),

/***/ 7257:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

var hide = __webpack_require__(5669);
module.exports = function (target, src, safe) {
  for (var key in src) {
    if (safe && target[key]) target[key] = src[key];
    else hide(target, key, src[key]);
  } return target;
};



/***/ }),

/***/ 7779:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

module.exports = __webpack_require__(5669);



/***/ }),

/***/ 6093:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

'use strict';
var global = __webpack_require__(3982);
var core = __webpack_require__(1190);
var dP = __webpack_require__(7991);
var DESCRIPTORS = __webpack_require__(4459);
var SPECIES = __webpack_require__(46)('species');

module.exports = function (KEY) {
  var C = typeof core[KEY] == 'function' ? core[KEY] : global[KEY];
  if (DESCRIPTORS && C && !C[SPECIES]) dP.f(C, SPECIES, {
    configurable: true,
    get: function () { return this; }
  });
};



/***/ }),

/***/ 2604:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

var def = (__webpack_require__(7991).f);
var has = __webpack_require__(4325);
var TAG = __webpack_require__(46)('toStringTag');

module.exports = function (it, tag, stat) {
  if (it && !has(it = stat ? it : it.prototype, TAG)) def(it, TAG, { configurable: true, value: tag });
};



/***/ }),

/***/ 5686:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

var shared = __webpack_require__(6692)('keys');
var uid = __webpack_require__(1543);
module.exports = function (key) {
  return shared[key] || (shared[key] = uid(key));
};



/***/ }),

/***/ 6692:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

var global = __webpack_require__(3982);
var _walkmeInternals = global._walkmeInternals || (global._walkmeInternals = {});
var store  = _walkmeInternals.coreJsShared || (_walkmeInternals.coreJsShared = {});
module.exports = function (key) {
  return store[key] || (store[key] = {});
};



/***/ }),

/***/ 4958:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

// 7.3.20 SpeciesConstructor(O, defaultConstructor)
var anObject = __webpack_require__(3148);
var aFunction = __webpack_require__(5859);
var SPECIES = __webpack_require__(46)('species');
module.exports = function (O, D) {
  var C = anObject(O).constructor;
  var S;
  return C === undefined || (S = anObject(C)[SPECIES]) == undefined ? D : aFunction(S);
};



/***/ }),

/***/ 9284:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

var toInteger = __webpack_require__(4423);
var defined = __webpack_require__(9080);
// true  -> String#at
// false -> String#codePointAt
module.exports = function (TO_STRING) {
  return function (that, pos) {
    var s = String(defined(that));
    var i = toInteger(pos);
    var l = s.length;
    var a, b;
    if (i < 0 || i >= l) return TO_STRING ? '' : undefined;
    a = s.charCodeAt(i);
    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
      ? TO_STRING ? s.charAt(i) : a
      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
  };
};



/***/ }),

/***/ 1508:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

var ctx = __webpack_require__(4756);
var invoke = __webpack_require__(8197);
var html = __webpack_require__(9556);
var cel = __webpack_require__(8474);
var global = __webpack_require__(3982);
var process = global.process;
var setTask = global.setImmediate;
var clearTask = global.clearImmediate;
var MessageChannel = global.MessageChannel;
var Dispatch = global.Dispatch;
var counter = 0;
var queue = {};
var ONREADYSTATECHANGE = 'onreadystatechange';
var defer, channel, port;
var run = function () {
  var id = +this;
  // eslint-disable-next-line no-prototype-builtins
  if (queue.hasOwnProperty(id)) {
    var fn = queue[id];
    delete queue[id];
    fn();
  }
};
var listener = function (event) {
  run.call(event.data);
};
// Node.js 0.9+ & IE10+ has setImmediate, otherwise:
if (!setTask || !clearTask) {
  setTask = function setImmediate(fn) {
    var args = [];
    var i = 1;
    while (arguments.length > i) args.push(arguments[i++]);
    queue[++counter] = function () {
      // eslint-disable-next-line no-new-func
      invoke(typeof fn == 'function' ? fn : Function(fn), args);
    };
    defer(counter);
    return counter;
  };
  clearTask = function clearImmediate(id) {
    delete queue[id];
  };
  // Node.js 0.8-
  if (__webpack_require__(4441)(process) == 'process') {
    defer = function (id) {
      process.nextTick(ctx(run, id, 1));
    };
  // Sphere (JS game engine) Dispatch API
  } else if (Dispatch && Dispatch.now) {
    defer = function (id) {
      Dispatch.now(ctx(run, id, 1));
    };
  // Browsers with MessageChannel, includes WebWorkers
  } else if (MessageChannel) {
    channel = new MessageChannel();
    port = channel.port2;
    channel.port1.onmessage = listener;
    defer = ctx(port.postMessage, port, 1);
  // Browsers with postMessage, skip WebWorkers
  // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
  } else if (global.addEventListener && typeof postMessage == 'function' && !global.importScripts) {
    defer = function (id) {
      global.postMessage(id + '', '*');
    };
    global.addEventListener('message', listener, false);
  // IE8-
  } else if (ONREADYSTATECHANGE in cel('script')) {
    defer = function (id) {
      html.appendChild(cel('script'))[ONREADYSTATECHANGE] = function () {
        html.removeChild(this);
        run.call(id);
      };
    };
  // Rest old browsers
  } else {
    defer = function (id) {
      setTimeout(ctx(run, id, 1), 0);
    };
  }
}
module.exports = {
  set: setTask,
  clear: clearTask
};



/***/ }),

/***/ 5637:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

var toInteger = __webpack_require__(4423);
var max = Math.max;
var min = Math.min;
module.exports = function (index, length) {
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};



/***/ }),

/***/ 4423:
/***/ (function(module) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

// 7.1.4 ToInteger
var ceil = Math.ceil;
var floor = Math.floor;
module.exports = function (it) {
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};



/***/ }),

/***/ 3293:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = __webpack_require__(9017);
var defined = __webpack_require__(9080);
module.exports = function (it) {
  return IObject(defined(it));
};



/***/ }),

/***/ 7013:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

// 7.1.15 ToLength
var toInteger = __webpack_require__(4423);
var min = Math.min;
module.exports = function (it) {
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};



/***/ }),

/***/ 662:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

// 7.1.13 ToObject(argument)
var defined = __webpack_require__(9080);
module.exports = function (it) {
  return Object(defined(it));
};



/***/ }),

/***/ 5776:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = __webpack_require__(2625);
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function (it, S) {
  if (!isObject(it)) return it;
  var fn, val;
  if (S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  if (typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it))) return val;
  if (!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  throw TypeError("Can't convert object to primitive value");
};



/***/ }),

/***/ 1543:
/***/ (function(module) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

var id = 0;
var px = Math.random();
module.exports = function (key) {
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};



/***/ }),

/***/ 9160:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

var global = __webpack_require__(3982);
var core = __webpack_require__(1190);
var LIBRARY = __webpack_require__(4662);
var wksExt = __webpack_require__(9024);
var defineProperty = (__webpack_require__(7991).f);
module.exports = function (name) {
  var $Symbol = core.Symbol || (core.Symbol = LIBRARY ? {} : global.Symbol || {});
  if (name.charAt(0) != '_' && !(name in $Symbol)) defineProperty($Symbol, name, { value: wksExt.f(name) });
};



/***/ }),

/***/ 9024:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

exports.f = __webpack_require__(46);



/***/ }),

/***/ 46:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

var store = __webpack_require__(6692)('wks');
var uid = __webpack_require__(1543);
var Symbol = (__webpack_require__(3982).Symbol);
var USE_SYMBOL = typeof Symbol == 'function';

var $exports = module.exports = function (name) {
  return store[name] || (store[name] =
    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
};

$exports.store = store;



/***/ }),

/***/ 9010:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

var classof = __webpack_require__(440);
var ITERATOR = __webpack_require__(46)('iterator');
var Iterators = __webpack_require__(4178);
module.exports = (__webpack_require__(1190).getIteratorMethod) = function (it) {
  if (it != undefined) return it[ITERATOR]
    || it['@@iterator']
    || Iterators[classof(it)];
};



/***/ }),

/***/ 1573:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

'use strict';
var addToUnscopables = __webpack_require__(3184);
var step = __webpack_require__(418);
var Iterators = __webpack_require__(4178);
var toIObject = __webpack_require__(3293);

// 22.1.3.4 Array.prototype.entries()
// 22.1.3.13 Array.prototype.keys()
// 22.1.3.29 Array.prototype.values()
// 22.1.3.30 Array.prototype[@@iterator]()
module.exports = __webpack_require__(8519)(Array, 'Array', function (iterated, kind) {
  this._t = toIObject(iterated); // target
  this._i = 0;                   // next index
  this._k = kind;                // kind
// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var kind = this._k;
  var index = this._i++;
  if (!O || index >= O.length) {
    this._t = undefined;
    return step(1);
  }
  if (kind == 'keys') return step(0, index);
  if (kind == 'values') return step(0, O[index]);
  return step(0, [index, O[index]]);
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
Iterators.Arguments = Iterators.Array;

addToUnscopables('keys');
addToUnscopables('values');
addToUnscopables('entries');



/***/ }),

/***/ 8686:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

// 19.1.3.1 Object.assign(target, source)
var $export = __webpack_require__(8887);

$export($export.S + $export.F, 'Object', { assign: __webpack_require__(4454) });



/***/ }),

/***/ 514:
/***/ (function() {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */




/***/ }),

/***/ 6125:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

'use strict';
var LIBRARY = __webpack_require__(4662);
var global = __webpack_require__(3982);
var ctx = __webpack_require__(4756);
var classof = __webpack_require__(440);
var $export = __webpack_require__(8887);
var isObject = __webpack_require__(2625);
var aFunction = __webpack_require__(5859);
var anInstance = __webpack_require__(4064);
var forOf = __webpack_require__(8126);
var speciesConstructor = __webpack_require__(4958);
var task = (__webpack_require__(1508).set);
var microtask = __webpack_require__(5664)();
var newPromiseCapabilityModule = __webpack_require__(1898);
var perform = __webpack_require__(4344);
var promiseResolve = __webpack_require__(6445);
var PROMISE = 'Promise';
var TypeError = global.TypeError;
var process = global.process;
var $Promise = global[PROMISE];
var isNode = classof(process) == 'process';
var empty = function () { /* empty */ };
var Internal, newGenericPromiseCapability, OwnPromiseCapability, Wrapper;
var newPromiseCapability = newGenericPromiseCapability = newPromiseCapabilityModule.f;

var USE_NATIVE = !!function () {
  try {
    // correct subclassing with @@species support
    var promise = $Promise.resolve(1);
    var FakePromise = (promise.constructor = {})[__webpack_require__(46)('species')] = function (exec) {
      exec(empty, empty);
    };
    // unhandled rejections tracking support, NodeJS Promise without it fails @@species test
    return (isNode || typeof PromiseRejectionEvent == 'function') && promise.then(empty) instanceof FakePromise;
  } catch (e) { /* empty */ }
}();

// helpers
var isThenable = function (it) {
  var then;
  return isObject(it) && typeof (then = it.then) == 'function' ? then : false;
};
var notify = function (promise, isReject) {
  if (promise._n) return;
  promise._n = true;
  var chain = promise._c;
  microtask(function () {
    var value = promise._v;
    var ok = promise._s == 1;
    var i = 0;
    var run = function (reaction) {
      var handler = ok ? reaction.ok : reaction.fail;
      var resolve = reaction.resolve;
      var reject = reaction.reject;
      var domain = reaction.domain;
      var result, then, exited;
      try {
        if (handler) {
          if (!ok) {
            if (promise._h == 2) onHandleUnhandled(promise);
            promise._h = 1;
          }
          if (handler === true) result = value;
          else {
            if (domain) domain.enter();
            result = handler(value); // may throw
            if (domain) {
              domain.exit();
              exited = true;
            }
          }
          if (result === reaction.promise) {
            reject(TypeError('Promise-chain cycle'));
          } else if (then = isThenable(result)) {
            then.call(result, resolve, reject);
          } else resolve(result);
        } else reject(value);
      } catch (e) {
        if (domain && !exited) domain.exit();
        reject(e);
      }
    };
    while (chain.length > i) run(chain[i++]); // variable length - can't use forEach
    promise._c = [];
    promise._n = false;
    if (isReject && !promise._h) onUnhandled(promise);
  });
};
var onUnhandled = function (promise) {
  task.call(global, function () {
    var value = promise._v;
    var unhandled = isUnhandled(promise);
    var result, handler, /*allowFunc*/ console;
    if (unhandled) {
      result = perform(function () {
        if (isNode) {
          process.emit('unhandledRejection', value, promise);
        } else if (handler = global.onunhandledrejection) {
          handler({ promise: promise, reason: value });
        } else if (/*allowFunc*//*allowFunc*/ (console = global.console) && console.error) {
          /*allowFunc*/ console.error('Unhandled promise rejection', value);
        }
      });
      // Browsers should not trigger `rejectionHandled` event if it was handled here, NodeJS - should
      promise._h = isNode || isUnhandled(promise) ? 2 : 1;
    } promise._a = undefined;
    if (unhandled && result.e) throw result.v;
  });
};
var isUnhandled = function (promise) {
  return promise._h !== 1 && (promise._a || promise._c).length === 0;
};
var onHandleUnhandled = function (promise) {
  task.call(global, function () {
    var handler;
    if (isNode) {
      process.emit('rejectionHandled', promise);
    } else if (handler = global.onrejectionhandled) {
      handler({ promise: promise, reason: promise._v });
    }
  });
};
var $reject = function (value) {
  var promise = this;
  if (promise._d) return;
  promise._d = true;
  promise = promise._w || promise; // unwrap
  promise._v = value;
  promise._s = 2;
  if (!promise._a) promise._a = promise._c.slice();
  notify(promise, true);
};
var $resolve = function (value) {
  var promise = this;
  var then;
  if (promise._d) return;
  promise._d = true;
  promise = promise._w || promise; // unwrap
  try {
    if (promise === value) throw TypeError("Promise can't be resolved itself");
    if (then = isThenable(value)) {
      microtask(function () {
        var wrapper = { _w: promise, _d: false }; // wrap
        try {
          then.call(value, ctx($resolve, wrapper, 1), ctx($reject, wrapper, 1));
        } catch (e) {
          $reject.call(wrapper, e);
        }
      });
    } else {
      promise._v = value;
      promise._s = 1;
      notify(promise, false);
    }
  } catch (e) {
    $reject.call({ _w: promise, _d: false }, e); // wrap
  }
};

// constructor polyfill
if (!USE_NATIVE) {
  // 25.4.3.1 Promise(executor)
  $Promise = function Promise(executor) {
    anInstance(this, $Promise, PROMISE, '_h');
    aFunction(executor);
    Internal.call(this);
    try {
      executor(ctx($resolve, this, 1), ctx($reject, this, 1));
    } catch (err) {
      $reject.call(this, err);
    }
  };
  // eslint-disable-next-line no-unused-vars
  Internal = function Promise(executor) {
    this._c = [];             // <- awaiting reactions
    this._a = undefined;      // <- checked in isUnhandled reactions
    this._s = 0;              // <- state
    this._d = false;          // <- done
    this._v = undefined;      // <- value
    this._h = 0;              // <- rejection state, 0 - default, 1 - handled, 2 - unhandled
    this._n = false;          // <- notify
  };
  Internal.prototype = __webpack_require__(7257)($Promise.prototype, {
    // 25.4.5.3 Promise.prototype.then(onFulfilled, onRejected)
    then: function then(onFulfilled, onRejected) {
      var reaction = newPromiseCapability(speciesConstructor(this, $Promise));
      reaction.ok = typeof onFulfilled == 'function' ? onFulfilled : true;
      reaction.fail = typeof onRejected == 'function' && onRejected;
      reaction.domain = isNode ? process.domain : undefined;
      this._c.push(reaction);
      if (this._a) this._a.push(reaction);
      if (this._s) notify(this, false);
      return reaction.promise;
    },
    // 25.4.5.1 Promise.prototype.catch(onRejected)
    'catch': function (onRejected) {
      return this.then(undefined, onRejected);
    }
  });
  OwnPromiseCapability = function () {
    var promise = new Internal();
    this.promise = promise;
    this.resolve = ctx($resolve, promise, 1);
    this.reject = ctx($reject, promise, 1);
  };
  newPromiseCapabilityModule.f = newPromiseCapability = function (C) {
    return C === $Promise || C === Wrapper
      ? new OwnPromiseCapability(C)
      : newGenericPromiseCapability(C);
  };
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, { Promise: $Promise });
__webpack_require__(2604)($Promise, PROMISE);
__webpack_require__(6093)(PROMISE);
Wrapper = __webpack_require__(1190)[PROMISE];

// statics
$export($export.S + $export.F * !USE_NATIVE, PROMISE, {
  // 25.4.4.5 Promise.reject(r)
  reject: function reject(r) {
    var capability = newPromiseCapability(this);
    var $$reject = capability.reject;
    $$reject(r);
    return capability.promise;
  }
});
$export($export.S + $export.F * (LIBRARY || !USE_NATIVE), PROMISE, {
  // 25.4.4.6 Promise.resolve(x)
  resolve: function resolve(x) {
    return promiseResolve(LIBRARY && this === Wrapper ? $Promise : this, x);
  }
});
$export($export.S + $export.F * !(USE_NATIVE && __webpack_require__(3995)(function (iter) {
  $Promise.all(iter)['catch'](empty);
})), PROMISE, {
  // 25.4.4.1 Promise.all(iterable)
  all: function all(iterable) {
    var C = this;
    var capability = newPromiseCapability(C);
    var resolve = capability.resolve;
    var reject = capability.reject;
    var result = perform(function () {
      var values = [];
      var index = 0;
      var remaining = 1;
      forOf(iterable, false, function (promise) {
        var $index = index++;
        var alreadyCalled = false;
        values.push(undefined);
        remaining++;
        C.resolve(promise).then(function (value) {
          if (alreadyCalled) return;
          alreadyCalled = true;
          values[$index] = value;
          --remaining || resolve(values);
        }, reject);
      });
      --remaining || resolve(values);
    });
    if (result.e) reject(result.v);
    return capability.promise;
  },
  // 25.4.4.4 Promise.race(iterable)
  race: function race(iterable) {
    var C = this;
    var capability = newPromiseCapability(C);
    var reject = capability.reject;
    var result = perform(function () {
      forOf(iterable, false, function (promise) {
        C.resolve(promise).then(capability.resolve, reject);
      });
    });
    if (result.e) reject(result.v);
    return capability.promise;
  }
});



/***/ }),

/***/ 4615:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

'use strict';
var $at = __webpack_require__(9284)(true);

// 21.1.3.27 String.prototype[@@iterator]()
__webpack_require__(8519)(String, 'String', function (iterated) {
  this._t = String(iterated); // target
  this._i = 0;                // next index
// 21.1.5.2.1 %StringIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var index = this._i;
  var point;
  if (index >= O.length) return { value: undefined, done: true };
  point = $at(O, index);
  this._i += point.length;
  return { value: point, done: false };
});



/***/ }),

/***/ 4554:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

'use strict';
// ECMAScript 6 symbols shim
var global = __webpack_require__(3982);
var has = __webpack_require__(4325);
var DESCRIPTORS = __webpack_require__(4459);
var $export = __webpack_require__(8887);
var redefine = __webpack_require__(7779);
var META = (__webpack_require__(4468).KEY);
var $fails = __webpack_require__(7648);
var shared = __webpack_require__(6692);
var setToStringTag = __webpack_require__(2604);
var uid = __webpack_require__(1543);
var wks = __webpack_require__(46);
var wksExt = __webpack_require__(9024);
var wksDefine = __webpack_require__(9160);
var enumKeys = __webpack_require__(5609);
var isArray = __webpack_require__(3877);
var anObject = __webpack_require__(3148);
var isObject = __webpack_require__(2625);
var toIObject = __webpack_require__(3293);
var toPrimitive = __webpack_require__(5776);
var createDesc = __webpack_require__(9940);
var _create = __webpack_require__(951);
var gOPNExt = __webpack_require__(9285);
var $GOPD = __webpack_require__(1177);
var $DP = __webpack_require__(7991);
var $keys = __webpack_require__(3143);
var gOPD = $GOPD.f;
var dP = $DP.f;
var gOPN = gOPNExt.f;
var $Symbol = global.Symbol;
var $JSON = global.JSON;
var _stringify = $JSON && $JSON.stringify;
var PROTOTYPE = 'prototype';
var HIDDEN = wks('_hidden');
var TO_PRIMITIVE = wks('toPrimitive');
var isEnum = {}.propertyIsEnumerable;
var SymbolRegistry = shared('symbol-registry');
var AllSymbols = shared('symbols');
var OPSymbols = shared('op-symbols');
var ObjectProto = Object[PROTOTYPE];
var USE_NATIVE = typeof $Symbol == 'function';
var QObject = global.QObject;
// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
var setter = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;

// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
var setSymbolDesc = DESCRIPTORS && $fails(function () {
  return _create(dP({}, 'a', {
    get: function () { return dP(this, 'a', { value: 7 }).a; }
  })).a != 7;
}) ? function (it, key, D) {
  var protoDesc = gOPD(ObjectProto, key);
  if (protoDesc) delete ObjectProto[key];
  dP(it, key, D);
  if (protoDesc && it !== ObjectProto) dP(ObjectProto, key, protoDesc);
} : dP;

var wrap = function (tag) {
  var sym = AllSymbols[tag] = _create($Symbol[PROTOTYPE]);
  sym._k = tag;
  return sym;
};

var isSymbol = USE_NATIVE && typeof $Symbol.iterator == 'symbol' ? function (it) {
  return typeof it == 'symbol';
} : function (it) {
  return it instanceof $Symbol;
};

var $defineProperty = function defineProperty(it, key, D) {
  if (it === ObjectProto) $defineProperty(OPSymbols, key, D);
  anObject(it);
  key = toPrimitive(key, true);
  anObject(D);
  if (has(AllSymbols, key)) {
    if (!D.enumerable) {
      if (!has(it, HIDDEN)) dP(it, HIDDEN, createDesc(1, {}));
      it[HIDDEN][key] = true;
    } else {
      if (has(it, HIDDEN) && it[HIDDEN][key]) it[HIDDEN][key] = false;
      D = _create(D, { enumerable: createDesc(0, false) });
    } return setSymbolDesc(it, key, D);
  } return dP(it, key, D);
};
var $defineProperties = function defineProperties(it, P) {
  anObject(it);
  var keys = enumKeys(P = toIObject(P));
  var i = 0;
  var l = keys.length;
  var key;
  while (l > i) $defineProperty(it, key = keys[i++], P[key]);
  return it;
};
var $create = function create(it, P) {
  return P === undefined ? _create(it) : $defineProperties(_create(it), P);
};
var $propertyIsEnumerable = function propertyIsEnumerable(key) {
  var E = isEnum.call(this, key = toPrimitive(key, true));
  if (this === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return false;
  return E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key] ? E : true;
};
var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key) {
  it = toIObject(it);
  key = toPrimitive(key, true);
  if (it === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return;
  var D = gOPD(it, key);
  if (D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key])) D.enumerable = true;
  return D;
};
var $getOwnPropertyNames = function getOwnPropertyNames(it) {
  var names = gOPN(toIObject(it));
  var result = [];
  var i = 0;
  var key;
  while (names.length > i) {
    if (!has(AllSymbols, key = names[i++]) && key != HIDDEN && key != META) result.push(key);
  } return result;
};
var $getOwnPropertySymbols = function getOwnPropertySymbols(it) {
  var IS_OP = it === ObjectProto;
  var names = gOPN(IS_OP ? OPSymbols : toIObject(it));
  var result = [];
  var i = 0;
  var key;
  while (names.length > i) {
    if (has(AllSymbols, key = names[i++]) && (IS_OP ? has(ObjectProto, key) : true)) result.push(AllSymbols[key]);
  } return result;
};

// 19.4.1.1 Symbol([description])
if (!USE_NATIVE) {
  $Symbol = function Symbol() {
    if (this instanceof $Symbol) throw TypeError('Symbol is not a constructor!');
    var tag = uid(arguments.length > 0 ? arguments[0] : undefined);
    var $set = function (value) {
      if (this === ObjectProto) $set.call(OPSymbols, value);
      if (has(this, HIDDEN) && has(this[HIDDEN], tag)) this[HIDDEN][tag] = false;
      setSymbolDesc(this, tag, createDesc(1, value));
    };
    if (DESCRIPTORS && setter) setSymbolDesc(ObjectProto, tag, { configurable: true, set: $set });
    return wrap(tag);
  };
  redefine($Symbol[PROTOTYPE], 'toString', function toString() {
    return this._k;
  });

  $GOPD.f = $getOwnPropertyDescriptor;
  $DP.f = $defineProperty;
  (__webpack_require__(5711).f) = gOPNExt.f = $getOwnPropertyNames;
  (__webpack_require__(1785).f) = $propertyIsEnumerable;
  (__webpack_require__(6380).f) = $getOwnPropertySymbols;

  if (DESCRIPTORS && !__webpack_require__(4662)) {
    redefine(ObjectProto, 'propertyIsEnumerable', $propertyIsEnumerable, true);
  }

  wksExt.f = function (name) {
    return wrap(wks(name));
  };
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, { Symbol: $Symbol });

for (var es6Symbols = (
  // 19.4.2.2, 19.4.2.3, 19.4.2.4, 19.4.2.6, 19.4.2.8, 19.4.2.9, 19.4.2.10, 19.4.2.11, 19.4.2.12, 19.4.2.13, 19.4.2.14
  'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'
).split(','), j = 0; es6Symbols.length > j;)wks(es6Symbols[j++]);

for (var wellKnownSymbols = $keys(wks.store), k = 0; wellKnownSymbols.length > k;) wksDefine(wellKnownSymbols[k++]);

$export($export.S + $export.F * !USE_NATIVE, 'Symbol', {
  // 19.4.2.1 Symbol.for(key)
  'for': function (key) {
    return has(SymbolRegistry, key += '')
      ? SymbolRegistry[key]
      : SymbolRegistry[key] = $Symbol(key);
  },
  // 19.4.2.5 Symbol.keyFor(sym)
  keyFor: function keyFor(sym) {
    if (!isSymbol(sym)) throw TypeError(sym + ' is not a symbol!');
    for (var key in SymbolRegistry) if (SymbolRegistry[key] === sym) return key;
  },
  useSetter: function () { setter = true; },
  useSimple: function () { setter = false; }
});

$export($export.S + $export.F * !USE_NATIVE, 'Object', {
  // 19.1.2.2 Object.create(O [, Properties])
  create: $create,
  // 19.1.2.4 Object.defineProperty(O, P, Attributes)
  defineProperty: $defineProperty,
  // 19.1.2.3 Object.defineProperties(O, Properties)
  defineProperties: $defineProperties,
  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
  getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
  // 19.1.2.7 Object.getOwnPropertyNames(O)
  getOwnPropertyNames: $getOwnPropertyNames,
  // 19.1.2.8 Object.getOwnPropertySymbols(O)
  getOwnPropertySymbols: $getOwnPropertySymbols
});

// 24.3.2 JSON.stringify(value [, replacer [, space]])
$JSON && $export($export.S + $export.F * (!USE_NATIVE || $fails(function () {
  var S = $Symbol();
  // MS Edge converts symbol values to JSON as {}
  // WebKit converts symbol values to JSON as null
  // V8 throws on boxed symbols
  return _stringify([S]) != '[null]' || _stringify({ a: S }) != '{}' || _stringify(Object(S)) != '{}';
})), 'JSON', {
  stringify: function stringify(it) {
    var args = [it];
    var i = 1;
    var replacer, $replacer;
    while (arguments.length > i) args.push(arguments[i++]);
    $replacer = replacer = args[1];
    if (!isObject(replacer) && it === undefined || isSymbol(it)) return; // IE8 returns string on undefined
    if (!isArray(replacer)) replacer = function (key, value) {
      if (typeof $replacer == 'function') value = $replacer.call(this, key, value);
      if (!isSymbol(value)) return value;
    };
    args[1] = replacer;
    return _stringify.apply($JSON, args);
  }
});

// 19.4.3.4 Symbol.prototype[@@toPrimitive](hint)
$Symbol[PROTOTYPE][TO_PRIMITIVE] || __webpack_require__(5669)($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
// 19.4.3.5 Symbol.prototype[@@toStringTag]
setToStringTag($Symbol, 'Symbol');
// 20.2.1.9 Math[@@toStringTag]
setToStringTag(Math, 'Math', true);
// 24.3.3 JSON[@@toStringTag]
setToStringTag(global.JSON, 'JSON', true);



/***/ }),

/***/ 4783:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

// https://github.com/tc39/proposal-promise-finally
'use strict';
var $export = __webpack_require__(8887);
var core = __webpack_require__(1190);
var global = __webpack_require__(3982);
var speciesConstructor = __webpack_require__(4958);
var promiseResolve = __webpack_require__(6445);

$export($export.P + $export.R, 'Promise', { 'finally': function (onFinally) {
  var C = speciesConstructor(this, core.Promise || global.Promise);
  var isFunction = typeof onFinally == 'function';
  return this.then(
    isFunction ? function (x) {
      return promiseResolve(C, onFinally()).then(function () { return x; });
    } : onFinally,
    isFunction ? function (e) {
      return promiseResolve(C, onFinally()).then(function () { throw e; });
    } : onFinally
  );
} });



/***/ }),

/***/ 3129:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

'use strict';
// https://github.com/tc39/proposal-promise-try
var $export = __webpack_require__(8887);
var newPromiseCapability = __webpack_require__(1898);
var perform = __webpack_require__(4344);

$export($export.S, 'Promise', { 'try': function (callbackfn) {
  var promiseCapability = newPromiseCapability.f(this);
  var result = perform(callbackfn);
  (result.e ? promiseCapability.reject : promiseCapability.resolve)(result.v);
  return promiseCapability.promise;
} });



/***/ }),

/***/ 9324:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

__webpack_require__(9160)('asyncIterator');



/***/ }),

/***/ 8076:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

__webpack_require__(9160)('observable');



/***/ }),

/***/ 8986:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

__webpack_require__(1573);
var global = __webpack_require__(3982);
var hide = __webpack_require__(5669);
var Iterators = __webpack_require__(4178);
var TO_STRING_TAG = __webpack_require__(46)('toStringTag');

var DOMIterables = ('CSSRuleList,CSSStyleDeclaration,CSSValueList,ClientRectList,DOMRectList,DOMStringList,' +
  'DOMTokenList,DataTransferItemList,FileList,HTMLAllCollection,HTMLCollection,HTMLFormElement,HTMLSelectElement,' +
  'MediaList,MimeTypeArray,NamedNodeMap,NodeList,PaintRequestList,Plugin,PluginArray,SVGLengthList,SVGNumberList,' +
  'SVGPathSegList,SVGPointList,SVGStringList,SVGTransformList,SourceBufferList,StyleSheetList,TextTrackCueList,' +
  'TextTrackList,TouchList').split(',');

for (var i = 0; i < DOMIterables.length; i++) {
  var NAME = DOMIterables[i];
  var Collection = global[NAME];
  var proto = Collection && Collection.prototype;
  if (proto && !proto[TO_STRING_TAG]) hide(proto, TO_STRING_TAG, NAME);
  Iterators[NAME] = Iterators.Array;
}



/***/ }),

/***/ 9059:
/***/ (function(module) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

module.exports = {
	toArray: toArray,
	arrForEach: arrForEach,
	arrMap: arrMap,
	arrFilter: arrFilter,
	arrReduce: arrReduce,
	concatArrays: concatArrays,
	binaryFind: binaryFind,
	arrContains: arrContains
};

function toArray(obj) {
	if(!obj || !obj.length)
		return [];
	return Array.prototype.slice.call(obj, 0);
}

function arrForEach(arr, callback) {
	for (var i = 0; i < arr.length; i++) {
		if (callback(arr[i], i) === false) {
			return;
		}
	}
}

function arrContains(arr, item) {
	var found = false;
	arrForEach(arr, function(val, i) {
		if (val === item) {
			found = true;
			return false;
		}
	});
	return found;
}

function arrMap(arr, callback) {
	var newArr = [];
	arrForEach(arr, function(val, i) {
		newArr.push(callback(val, i));
	});
	return newArr;
}

function arrFilter(arr, callback) {
	var newArr = [];
	arrForEach(arr, function(val, i) {
		if (callback(val, i)) {
			newArr.push(val);
		}
	});
	return newArr;
}

function arrReduce(arr, callback, initialValue) {
	var currVal = initialValue;
	arrForEach(arr, function(val, i) {
		currVal = callback(currVal, val, i);
	});
	return currVal;
}

function concatArrays(arrays) {
	return arrReduce(arrays, function(a, e) {
		return a.concat(e);
	}, []);
}

function binaryFind(arr, searchElement, compareFn) {
	var minIndex = 0,
		maxIndex = arr.length - 1,
		currentIndex,
		currentElement;

	if (arr.length === 0) {
		return {
			found: false,
			index: 0
		};
	}

	while (minIndex <= maxIndex) {
		currentIndex = (minIndex + maxIndex) / 2 | 0;
		currentElement = arr[currentIndex];

		if (compareFn(currentElement, searchElement) < 0) {
			minIndex = currentIndex + 1;
		}
		else if (compareFn(currentElement, searchElement) > 0) {
			maxIndex = currentIndex - 1;
		}
		else {
			return { // Modification
				found: true,
				index: currentIndex
			};
		}
	}      

	return { // Modification
		found: false,
		index: compareFn(currentElement, searchElement) < 0 ? currentIndex + 1 : currentIndex
	};
}



/***/ }),

/***/ 8082:
/***/ (function(module) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

//we used to have it in sizzle that were used in jquery 1.7.1 but it isn't being used anymore in jquery 3.3.1


var chunker = /((?:\((?:\([^()]+\)|[^()]+)+\)|\[(?:\[[^\[\]]*\]|['"][^'"]*['"]|[^\[\]'"]+)+\]|\\.|[^ >+~,(\[\\]+)+|[>+~])(\s*,\s*)?((?:.|\r|\n)*)/g;

module.exports = function(selector){
	var m, extra,
		parts = [],
		soFar = selector;
	
	// Reset the position of the chunker regexp (start from head)
	do {
		chunker.exec( "" );
		m = chunker.exec( soFar );

		if ( m ) {
			soFar = m[3];
		
			parts.push( m[1] );
		
			if ( m[2] ) {
				extra = m[3];
				break;
			}
		}
	} while ( m );

	return [parts, extra];
}


/***/ }),

/***/ 66:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

var arrUtils = __webpack_require__(9059);
var wrapUtils = __webpack_require__(7903)(wmjQuery);

function strongContains(a, b) {
	return a !== b && arrUtils.arrReduce(wmjQuery(a).children(), function(found, e) {
		e = wrapUtils.unwrapElement(e);
		return found || e === b || strongContains(e, b);
	}, false);
}

function getElementsChildren(elements) {
	var allChildren = [];
	for (var i = 0; i < elements.length; i++) {
		allChildren = allChildren.concat(getElementChildren(elements[i]));
	}
	return allChildren;
}

function getElementChildren(element) {
	if (element.querySelectorAll) {
		return arrUtils.toArray(element.querySelectorAll('*'));
	} else if (element.getElementsByTagName) {
		return arrUtils.toArray(element.getElementsByTagName('*'));
	} else {
		return [];
	}
}

module.exports = {
	strongContains: strongContains,
	getElementsChildren: getElementsChildren,
	getElementChildren: getElementChildren
};


/***/ }),

/***/ 7903:
/***/ (function(module) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

var implProps;

function unwrapElement(e) {
	for (var i = 0; i < implProps.length; i++) {
		if (e[implProps[i]]) {
			return e[implProps[i]];
		}
	}
	return e;
}

function wrapElement(e) {
	return e.__wrapper8e3dd93a60__ || e;
}

var _exports = {
	unwrapElement: unwrapElement
};

module.exports = function(wmjQuery) {
	implProps = implProps || (function() {
		var htmlTag = document.getElementsByTagName('html')[0];
		if (htmlTag.__impl4cf1e782hg__) {
			wmjQuery.fnHelpers.wrapIfNeeded = function ( elem ) {
				if (elem.length > 0) {
					return wmjQuery(elem).map(function(_, e) {
						return wrapElement(e);
					});
				}

				return wrapElement(elem);
			};
			return ['__impl4cf1e782hg__'];
		}
		return [];
	})();

	return _exports;
}


/***/ }),

/***/ 3057:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

module.exports = {
	hasNativeShadowDOM: hasNativeShadowDOM,
	hasNativeCustomElements: hasNativeCustomElements,
	getCurrentPlatformVersion: getCurrentPlatformVersion
};

var shadowVisibilityManager = __webpack_require__(3431);
var iframeUtils = __webpack_require__(228);
var cachedPlatformVersion;
var cachedVal;

function getCurrentPlatformVersion() {
	// when to invalidate cache?
	if (cachedPlatformVersion) {
		return cachedPlatformVersion.join();
	}

	var wrapUtils = __webpack_require__(7903)(wmjQuery);

	var platformName = '';
	var platformVersion = '';

	if (testAll(innerIsPolymer)) {
		platformName = 'Polymer';
		platformVersion = testAll(innerGetPolymerVersion) || '';
	} else if (testAll(innerIsWebComponenets)) {
		platformName = 'WebComponents';
		platformVersion = testAll(innerGetWebComponenetsVersion) || '';
	}

	cachedPlatformVersion = [[platformName, platformVersion].join('')];
	if (hasNativeShadowDOM()) {
		cachedPlatformVersion.push('NativeShadowDOM');
	}

	return cachedPlatformVersion.join();
}

// TODO: find a better way to identify if we have "native" functionality or not.
function hasNativeShadowDOM() {
	if (cachedVal !== undefined) {
		return cachedVal;
	}

	shadowVisibilityManager.useShadowVisible(false);
	cachedVal = testAll(innerHasNativeShadowDOM, true);
	shadowVisibilityManager.useShadowVisible(true);
	return cachedVal;
}

function innerIsPolymer(win, doc) {
	return !!win.Polymer;
}

function innerGetPolymerVersion(win, doc) {
	return win.Polymer && win.Polymer.version;
}

function innerIsWebComponenets(win, doc) {
	return !!win.WebComponents;
}

function innerGetWebComponenetsVersion(win, doc) {
	var htmlTag = doc.getElementsByTagName('html')[0];
	if (htmlTag.__impl4cf1e782hg__) {
		return '__impl4cf1e782hg__';
	}
}

function innerHasNativeShadowDOM(win, doc) {
	var res;
	if (win.Polymer && win.Polymer.Settings && win.Polymer.Settings.useShadow !== undefined) {
		res = win.Polymer.Settings.useShadow;
	}
	if (res === undefined) {
		res = wmjQuery.hasShadowContext(doc);
	}
	return res;
}

function testAll(innerTestFn, useFalse) {
	var res = innerTestFn(window, document);
	if (res || (res !== undefined && useFalse)) {
		return res;
	}
	return testIframes(document, innerTestFn, useFalse);
}

function testIframes(context, innerTestFn, useFalse) {
	var found = undefined;
	iframeUtils.traverseIframes(context, function(frame, win, doc) {
		found = innerTestFn(win, doc);
		if (found || (found !== undefined && useFalse)) {
			return false;
		}
	}, null, 0, -1);
	return found;
}

function hasNativeCustomElements() {
	return testAll(innerHasNativeCustomElements);
}

function innerHasNativeCustomElements(win) {
	if (win.Polymer && win.Polymer.Settings) {
		return win.Polymer.Settings.useNativeCustomElements;
	}
	return !(win.customElements && win.customElements.polyfillWrapFlushCallback);
}


/***/ }),

/***/ 668:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

var arrUtils = __webpack_require__(9059);

module.exports = function querySelectorSpecialContent(results, specialContent, jqSelector) {
	if (specialContent.length > 0) {
		results = results.concat(filterSpecialContent(specialContent, jqSelector));
		arrUtils.arrForEach(specialContent, function(e, i) {
			if (e.querySelectorAll) {
				results = results.concat(arrUtils.toArray(e.querySelectorAll(jqSelector)));
			}
		});
	}
	return results;
};

function filterSpecialContent(specialContent, jqSelector) {
	var content = [];
	for (var i = specialContent.length - 1; i >= 0; i--) {
		var parent = specialContent[i].parentNode;
		if (parent && parent.querySelectorAll) {
			content = content.concat(arrUtils.toArray(parent.querySelectorAll(jqSelector)));
		}
	}
	return arrUtils.arrFilter(specialContent, function(e, i) {
		return arrUtils.arrContains(content, e);
	});
}


/***/ }),

/***/ 8296:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

module.exports = {
	initPlugin: initPlugin
};

var getCtx = (__webpack_require__(9545).getCtx);
var arrUtils = __webpack_require__(9059);
var iframeUtils = __webpack_require__(228);
var shadowContainerTypesMap = __webpack_require__(7534);
var envTester = __webpack_require__(3057);
var logger = __webpack_require__(3532);
var getShadowPluginVersion = (__webpack_require__(6877).getShadowPluginVersion);

var originalExtendElementDescription;

function initPlugin() {
	getCtx().get('EventsListener').on("wm_walkmeLibLoaded", function(){
		originalExtendElementDescription = _walkmeInternals.extendElementDescription;
		_walkmeInternals.extendElementDescription = extendElementDescription;
		_makeTutorial.registerFindElementPlugin(new ShadowFindElementPlugin());
	});
}

function extendElementDescription(element, descriptionString, params) {
	line('CAPTURE ELEMENT');
	logger.log('Start extendElementDescription:');
	if (originalExtendElementDescription) {
		descriptionString = originalExtendElementDescription(element, descriptionString, params);
	}

	var jsonMock = __webpack_require__(7169)(),
		descJson = jsonMock.parse(descriptionString),
		parents = getCtx().get('ShadowJQueryBindingWrapper').run(function() {
			return getParentsList(element, descJson).reverse();
    	}),
		shadowParentsArr = [];
	for (var i = 1; i < parents.length; i++) {
		if (parents[i] && wmjQuery.fnHelpers.isInDirectShadow(parents[i - 1], parents[i])) {
			shadowParentsArr.unshift(parents[i]);
		}
	}

	var shadowTags = arrUtils.arrFilter(arrUtils.arrMap(shadowParentsArr, function(e) {
		return (e.tagName || '').toUpperCase();
	}), function(tagName) {
		return tagName && tagName !== "HTML" && tagName !== "SHADOW";
	});

	logger.log('found ' + shadowTags.length + ' shadow parents');

	if (shadowTags.length > 0) {
		logger.log('saving shadow-parents data on ElementDescription');
		
		descJson.shadow = {
			shadowTags: shadowTags,
			version: getShadowPluginVersion(),
			platformVersion: envTester.getCurrentPlatformVersion()
		};
		descriptionString = jsonMock.stringify(descJson);
	} else {
		logger.log('nothing to save - doing nothing');
	}

	logger.log('End extendElementDescription');

	return descriptionString;
}

function getParentsList(element, descJson) {
	var framesCount = (descJson.elementXpath.match(/\/(iframe|frame)\[/g) || []).length;
	if (framesCount === 0) {
		return getElementPath(element);
	}

	var path = [];
	var chain = iframeUtils.getIframeChain(element, document, framesCount, descJson);
	if (chain) {
		for (var i = 0; i < chain.length; i++) {
			path = path.concat(getElementPath(chain[i]));
		}
	}
	path = path.concat(getElementPath(element));

	return path;
}

function getElementPath(element) {
	var path = wmjQuery(element).parents().toArray().reverse();
	path.push(element);
	return path;
}

function line(title) {
	logger.log('-----------' + (title || '') + '-----------');
}

function ShadowFindElementPlugin() {
	var typesOrder = [
		shadowContainerTypesMap.shadowRoot,
		shadowContainerTypesMap.content,
		shadowContainerTypesMap.slot,
		shadowContainerTypesMap.iframe
	];

	this.extendOriginalSettings = function(identifySettings) {
		line('FIND ELEMENT');
		logger.log('### extendOriginalSettings');
		if(identifySettings.ElementDescription.customContext) {
			logger.log('element has custom context, doing nothing');
			return;
		}

		var oldDesc = identifySettings.ElementDescription;
		if (!oldDesc.shadow) {
			logger.log('ElementDescription has no shadow data - fallback to original find-element');
			return;
		}
		logger.log('ElementDescription has shadow data: ', oldDesc.shadow.shadowTags);
		if (!envTester.hasNativeShadowDOM()) {
			logger.log('document does not support native custom elements - adapting ElementDescription (xpath, autoQuery, shadowTags)');

			oldDesc.elementXpath = oldDesc.elementXpath.replace(/\/(content|slot)\[\d+\]/ig, '');
			oldDesc.autoQuery = (oldDesc.autoQuery || '').replace(/\s(content|slot)\s/ig, ' ').replace(/(content|slot)\[.*\]\s/ig, ' ');
			oldDesc.shadow.shadowTags = arrUtils.arrFilter(oldDesc.shadow.shadowTags, function(tagName) {
				tagName = (tagName || '').toLowerCase();
				return tagName !== 'content';
			});
			return;
		}
		logger.log('document supports native custom elements - do nothing');
	};

	this.extendAdaptedSettings = function(identifySettings, newDesc, out) {
		logger.log('### extendAdaptedSettings');
		if(identifySettings.ElementDescription.customContext) {
			logger.log('element has custom context, doing nothing');
			return;
		}

		var oldDesc = identifySettings.ElementDescription;
		if (!oldDesc.shadow) {
			logger.log('ElementDescription has no shadow data - fallback to original find-element');
			return;
		}
		var shadowTags = oldDesc.shadow.shadowTags;
		if (!shadowTags || shadowTags.length <= 0) {
			logger.log('ElementDescription has no shadow data - fallback to original find-element');
			return;
		}
		if (!envTester.hasNativeShadowDOM()) {
			logger.log('document does not support native shadow-dom - fallback to original find-element');
			return;
		}

		logger.log('ElementDescription has shadow data:', shadowTags);
		logger.log('searching for context');

		var contextArr = [document],
			currTagName;
		for (var i = 0; i < shadowTags.length; i++) {
			currTagName = shadowTags[i];
			contextArr = arrUtils.arrReduce(querySelectorAllArr(contextArr, currTagName), function(arr, e) {
				var s = new Set(arr);
				var _arr = arr.slice();
				for (var i = 0; i < typesOrder.length; i++) {
					if (typesOrder[i].test(e)) {
						var newElems = typesOrder[i].getRoot(e);
						newElems && newElems.forEach(function(x) {
							if(!s.has(x)){
								s.add(x);
								_arr.push(x);
							}
						})
						return _arr;
					}
				}
				if(!s.has(e)) {
					return arr.concat([e]);
				}
				return arr;
			}, []);
			if (contextArr.length === 0) {
				logger.log('did not find context', i, currTagName);
				break;
			}
		}

		logger.log('context:', contextArr);

		var tagName = newDesc.elementType;
		var suspects = wmjQuery(querySelectorAllArr(contextArr, tagName));
		suspects = wmjQuery(Array.from(new Set(suspects)));

		if (newDesc.visibilityFilter) {
			suspects = wmjQuery(suspects).filter(newDesc.visibilityFilter);
		}

		logger.log('found ' + suspects.length + ' suspects:', suspects);

		// There must be something in preDefinedSuspects in order for FE to use it (otherwise - fallback to using autoQuery).
		if (suspects.length === 0) {
			logger.log('no suspects found - abort find-element');
			suspects = wmjQuery('<not-my-div>');
		} else {
			logger.log('continuing find-element on these suspects');
		}

		if (out) {
			out.pluginName = 'jquery-shadow-dom';
			out.pluginVersion = getShadowPluginVersion();
			out.pluginCaptureVersion = oldDesc.shadow.version;
			out.capturePlatformVersion = oldDesc.shadow.platformVersion;
			out.platformVersion = envTester.getCurrentPlatformVersion();
		}

		newDesc.preDefinedSuspects = suspects;
	};

	function querySelectorAllArr(contextArr, tagName) {
		return arrUtils.arrReduce(contextArr, function(nextContextArr, currContextElement) {
			return nextContextArr.concat(arrUtils.toArray(currContextElement.querySelectorAll(tagName)));
		}, []);
	}
}



/***/ }),

/***/ 228:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

var getCtx = (__webpack_require__(9545).getCtx);

module.exports = {
	getIframeChain: getIframeChain,
	traverseIframes: traverseIframes
};

function traverseIframes(context, beforeCallback, afterCallback, level, maxDepth) {
	var frames = wmjQuery('iframe:not(#walkme-hidden-iframe,#walkme-native-functions),frame', context);
	for (var i = 0; i < frames.length; i++) {
		try {
			var win = frames[i].contentWindow;
			var doc = frames[i].contentDocument;
			
			if (!win || !doc) continue;

			if (beforeCallback(frames[i], win, doc) === false) {
				return false;
			} else if (level < maxDepth || maxDepth < 0) {
				if (traverseIframes(doc, beforeCallback, afterCallback, level + 1, maxDepth) === false) {
					afterCallback && afterCallback(frames[i], win, doc);
					return false;
				}
			}
		} catch(ex) {
			// cross-domain iframe
		}
	}
}

function getIframeChain(element, context, maxDepth, descJson) {
	var chain = [];

	traverseIframes(context, function(frame, win, doc) {
		if (wmjQuery(doc).find(element).length > 0) {
			chain = [frame];
			return false;
		}
	}, function(frame, win, doc) {
		var iframesReorderFlag;
		if (getCtx().has('FeaturesManager')) {
			var featuresManager = getCtx().get('FeaturesManager');
            iframesReorderFlag = featuresManager && featuresManager.isFeatureEnabled && featuresManager.isFeatureEnabled('iframesReorder');
		}
		if (iframesReorderFlag) {
			chain.unshift(frame);
			descJson.iframesReorderFlagAndUsed = true;
		} else {
			chain.push(frame);
		}
	}, 1, maxDepth);

	return chain;
}



/***/ }),

/***/ 750:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

var shadowDomManagerCtor = __webpack_require__(1745);

function registerToCtx(getCtx){
	if (!getCtx().has('ShadowDomjQuery')) {
		getCtx().register('ShadowDomjQuery').asCtor(shadowDomManagerCtor);
	}
}

module.exports = {
	registerToCtx: registerToCtx
}


/***/ }),

/***/ 8826:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

var getCtx = (__webpack_require__(9545).getCtx);
var arrUtils = __webpack_require__(9059);
var shadowContainerTypesOrder = __webpack_require__(2839);
var elementUtils = __webpack_require__(66);
var querySelectorSpecialContent = __webpack_require__(668);
var hasNativeShadowDOM = (__webpack_require__(3057).hasNativeShadowDOM);
var envTester = __webpack_require__(3057);
var chunkSelector = __webpack_require__(8082);
var shadowVisibilityManager = __webpack_require__(3431);
var shadowUtils = __webpack_require__(4032);

module.exports = function(wmjQuery, options) {
	var wrapUtils = __webpack_require__(7903)(wmjQuery);
	var shadowManager = __webpack_require__(2944)(options);

	function identityTransform(x) {
		return x;
	}

	function createShadowQueryOverride(queryFuncName, prefix, transform, finalize) {
		finalize = finalize || arrUtils.toArray;
		return function(context, selector) {
			return finalize(shadowQuery(context, queryFuncName, selector, prefix || '', transform || identityTransform));
		};
	}

	function shadowQuery(context, queryFuncName, selector, prefix, transform) {
		return jqShadowSimple(selector, context, queryFuncName, prefix, transform);
	}

	// function jqShadow(context, selector, results) {
	// 	var st = new Date().getTime();
	// 	var res = jqShadow1(context, selector, results);
	// 	console.log(new Date().getTime() - st);
	// 	return res;
	// }

	var walkMeBlackList = {
		'.walkme-current-language, .walkme-language': true,
		'.walkme-language': true,
		'a .walkme-open-ticket': true
	};
	function optimizedQuery(context, selector, results) {
		if (context === document && walkMeBlackList[selector]) {
			addResult(context, selector, results);
			return results;
		}
	}

	function addResult(context, selector, results) {
		var res = arrUtils.toArray(jqHelperFuncs.querySelectorAll(context, selector));
		for (i = 0; i < res.length; i++) {
			results.push(res[i]);
		}
		return results;
	}

	function jqShadow(context, selector, results) {
		results = results || [];
		var chunkRes = chunkSelector(selector),
			parts = chunkRes[0],
			extra = chunkRes[1],
			currRes = context,
			contextMatch;

		try {
			if (optimizedQuery(context, selector, results)) {
				return results;
			}
		} catch(ex) {

		}

		for (var i = 0; i < parts.length; i++) {
			if (parts[i] === '/deep/' && i < parts.length - 1) continue;
			//we sometimes tries to get an element when he is the context.
			previousRes = currRes;
			currRes = jqShadowSimple(parts[i], currRes, 'querySelectorAll', '', identityTransform);

			if(i == 0 && wmjQuery(context).is(parts[i])){
				// 	currRes = currRes.concat(previousRes); This adds mistaken elements to jq set!
			}

			if (i === 0 && parts[i].match(/^\[id=[\'\"].+[\'\"]\]$/)) {
				contextMatch = wmjQuery(context).filter(parts[i]);
				if (contextMatch && contextMatch.length > 0) {
					currRes = wmjQuery(currRes).add(arrUtils.toArray(contextMatch));
					contextMatch = undefined;
				}
			}
		}

		arrUtils.arrForEach(currRes, function(e, i) {
			results.push(e);
		});

		if ( extra ) {
			jqShadow( context, extra, results );
			sizzle.uniqueSort( results );
		}

		return results;
	}

    function jqShadowSimple(selector, context, queryFuncName, prefix, transform) {
        if (!selector) {
            return [];
        }
        // find all shadowRoot elements recursively
        var allShadowRoots;
		var res = new Set();
		var recursionDepth = 0;
		shadowUtils.findShadowRoots(context.length ? context[0] : context, res, recursionDepth);
		allShadowRoots = Array.from(res);
        
        // use filter & find to apply the selector
        var results = [];
        wmjQuery(context).each(function(i, e) {
            var fnName = typeof queryFuncName === 'function' ? queryFuncName(e) : queryFuncName;
            results = results.concat(arrUtils.toArray(transform(jqHelperFuncs[fnName](e, selector))));
        });
        var jqSelector = prefix + selector;
        arrUtils.arrForEach(allShadowRoots, function(e, i) {
            var elms = jqHelperFuncs.querySelectorAll(e, jqSelector);
            if (elms && elms.length) {
                results = results.concat(arrUtils.toArray(elms));
            }
        });
        return sizzle.uniqueSort(results);
    }

	function firstChildResult(elem, fnName) {
		for (var i = 0; i < shadowContainerTypesOrder.children.length; i++) {
			if (shadowContainerTypesOrder.children[i].test(elem)) {
				return shadowContainerTypesOrder.children[i][fnName](elem);
			}
		}
	}

	function isjQuery3() {
		return String(mtjQuery.fn.jquery).split('.')[0] === '3';
	}

	var overrides = {
		wmjQuery: {
			// TODO: override only when needed (chrome?, FF?)
			contains: function( a, b ) {
				a = wrapUtils.unwrapElement(a);
				b = wrapUtils.unwrapElement(b);
				return elementUtils.strongContains(a, b);
			},
			queryHelpers: {
				useQuerySpeedUpFuncs: false,
				getElementById: createShadowQueryOverride('getElementById', '#', function(e) {
					return e ? [e] : [];
				}, function(res) {
					return res && res.length ? res[0] : null;
				}),
				getElementsByTagName: createShadowQueryOverride(function(e) {
					// This fix is for IE11 - native getElementsByTagName() does not return 'slot' elements
					if (e.getElementsByTagName.toString().indexOf('[native code]') > 0) {
						return 'querySelectorAll';
					}
					return 'getElementsByTagName';
				}),
				getElementsByName: createShadowQueryOverride('getElementsByName'),
				getElementsByClassName: createShadowQueryOverride('getElementsByClassName', '.'),
				querySelectorAll: jqShadow
			}
		},
		sizzle: {
			siblingCheck: (function() {
				// TODO: this fix is for IE11, only replace the function for IE11
				if (wmjQuery.find.siblingCheck) {
					return function siblingCheck( a, b, ret, parent ) {
						if (arguments.length === 3) {
							parent = ret;
						} else {
							if ( a === b ) {
								return ret;
							}
						}

						if(a && b){
							parent = parent || wmjQuery.fnHelpers.parentNode(a);
							var apt = wmjQuery.fnHelpers.parentType(a, parent),
								bpt = wmjQuery.fnHelpers.parentType(b, parent);
							if (apt !== bpt) {
								return apt - bpt;
							}

							var cur = mtjQuery.fnHelpers.nextSibling(a, parent);

							while ( cur ) {
								if ( cur === b ) {
									return -1;
								}

								cur = mtjQuery.fnHelpers.nextSibling(cur, parent);
							}

							return 1;
						}
						return a ? 1 : -1;
					};
				}
			})()
		},
		fnHelpers: {
			parentNode: function( elem ) {
				var prev,
					parent = elem;
				do {
					prev = parent;
					parent = arrUtils.arrReduce(shadowContainerTypesOrder.parents, function(res, type) {
						return res || type.parent(prev);
					}, undefined);
				} while (parent && parent !== prev && parent.nodeType === 11);

				return parent;
			},
			parentType: function( elem ) {
				var parent = wmjQuery.fnHelpers.parentNode(elem);
				if (!parent) {
					return 0;
				}

				var prev,
					curParent = elem;
				do {
					prev = curParent;
					var typeIndex;
					curParent = arrUtils.arrReduce(shadowContainerTypesOrder.parents, function(res, type, i) {
						if (res) {
							return res;
						}
						var p = type.parent(prev);
						if (p) {
							typeIndex = i + 1;
							return p;
						}
					}, undefined);
					if (curParent === parent) {
						return typeIndex;
					}
				} while (curParent && curParent !== prev && curParent.nodeType === 11);

				return shadowContainerTypesOrder.length + 1;
			},
			isInShadow: function( elem ) {
				var prev = elem,
					parent;
				do {
					parent = wmjQuery.fnHelpers.parentNode(prev);
					if (wmjQuery.fnHelpers.isInDirectShadow(prev, parent)) {
						return true;
					}
					prev = parent;
				} while (parent);
				return false;
			},
			isInDirectShadow: function( elem, parent ) {
				parent = parent || wmjQuery.fnHelpers.parentNode(elem);
				if (parent && parent !== elem.parentNode) {
					return true;
				}
			},
			firstChild: function( elem ) {
				return firstChildResult(elem, 'firstChild');
			},
			firstElementChild: function( elem ) {
				return firstChildResult(elem, 'firstElementChild');
			},
			childNodes: function( elem ) {
				return firstChildResult(elem, 'childNodes');
			},
			dirParentEquals: function( cur, dir, parent ) {
				parent = parent || wmjQuery.fnHelpers.parent(cur);
				for ( cur = cur[dir]; cur; cur = cur[dir] ) {
					if (wmjQuery.fnHelpers.parentEquals(cur, parent)) {
						return cur;
					}
				}
			},
			nextSibling: function(n, parent) {
				return wmjQuery.fnHelpers.dirParentEquals(n, "nextSibling", parent);
			},
			previousSibling: function(n, parent) {
				return wmjQuery.fnHelpers.dirParentEquals(n, "previousSibling", parent);
			},
			previousSiblingArr: function(n, parents, i) {
				return wmjQuery.fnHelpers.previousSibling(n, parents[i]);
			}
		},
		fnDefs: {
			next: function( elem ) {
				if (isjQuery3()) {
					return mtjQuery.sibling( elem, [mtjQuery.fnHelpers.nextSibling, mtjQuery.fnHelpers.parentNode(elem)] );
				} else {
					return mtjQuery.nth( elem, 2, [mtjQuery.fnHelpers.nextSibling, mtjQuery.fnHelpers.parentNode(elem)] );
				}
			},
			prev: function( elem ) {
				if (isjQuery3()) {
					return mtjQuery.sibling( elem, [mtjQuery.fnHelpers.previousSibling, mtjQuery.fnHelpers.parentNode(elem)] );
				} else {
					return mtjQuery.nth( elem, 2, [mtjQuery.fnHelpers.previousSibling, mtjQuery.fnHelpers.parentNode(elem)] );
				}
			},
			nextAll: function( elem ) {
				return mtjQuery.dir( elem, [mtjQuery.fnHelpers.nextSibling, mtjQuery.fnHelpers.parentNode(elem)] );
			},
			prevAll: function( elem ) {
				return mtjQuery.dir( elem, [mtjQuery.fnHelpers.previousSibling, mtjQuery.fnHelpers.parentNode(elem)] );
			},
			nextUntil: function( elem, i, until ) {
				return mtjQuery.dir( elem, [mtjQuery.fnHelpers.nextSibling, mtjQuery.fnHelpers.parentNode(elem)], until );
			},
			prevUntil: function( elem, i, until ) {
				return mtjQuery.dir( elem, [mtjQuery.fnHelpers.previousSibling, mtjQuery.fnHelpers.parentNode(elem)], until );
			}
		},
		relative: {
			'~': (function() {
				var originalFn = wmjQuery.find.selectors.relative['~'];
				return function( checkSet, part, isXML ) {
					var parents = new Array( checkSet.length );
					for (var i = 0; i < checkSet.length; i++) {
						parents[i] = mtjQuery.fnHelpers.parentNode(checkSet[i]);
					}
					var dir = [mtjQuery.fnHelpers.previousSiblingArr, parents];
					return originalFn(checkSet, part, isXML, dir);
				};
			})()
		},
		filters: {
			// querySelectorAll does a different ":enabled" filter from jQuery ":enable"
			enabled: (function() {
				var originalFn = wmjQuery.expr.filters.enabled;
				return function(elem) {
					var func = elem && (elem.matches || elem.msMatchesSelector);
					if (func) return func.call(elem, ':enabled');
					return originalFn(elem);
				}
			})()
		}
	};

	var extendOverrides = {};
	extendOverrides[isjQuery3() ? 'siblings' : 'sibling'] = function( n, elem ) {
		var r = [],
			parent = n && mtjQuery.fnHelpers.parentNode(n);

		for ( ; n; n = n.nextSibling ) {
			if ( n.nodeType === 1 && n !== elem && (!parent || mtjQuery.fnHelpers.parentEquals(n, parent)) ) {
				r.push( n );
			}
		}

		return r;
	};

	function extendObj(obj, other) {
		var orig = {};
		for (var prop in other) {
			orig[prop] = obj[prop];
		}
		obj.extend(other);
		return orig;
	}

	function overrideObj(obj, other) {
		var orig = {};
		for (var prop in other) {
			orig[prop] = obj[prop];
			obj[prop] = other[prop];
		}
		return orig;
	}

	var sizzle;
	var jqHelperFuncs;
	function bind() {
		sizzle = wmjQuery.find;
		sizzle.sortOrder = (__webpack_require__(4992).shadowSortOrder);

		overrideObj(wmjQuery.fnHelpers, overrides.fnHelpers);
		var waitForWalkMeConfigFileLoadedEventForWMJQueryFF = false;
		getCtx().get('EventsListener').once('WalkMeConfigFileLoaded', function() {
			if (getCtx().has('FeaturesManager')) {
				waitForWalkMeConfigFileLoadedEventForWMJQueryFF = getCtx().get('FeaturesManager').isFeatureEnabled('waitForWalkMeConfigFileLoadedEventForWMJQuery');
				if (waitForWalkMeConfigFileLoadedEventForWMJQueryFF) {
					jqHelperFuncs = wmjQuery.queryHelpers;	
				}
			}
		});
		getCtx().get('EventsListener').once('wm_walkmeLibLoaded', function() {
			if (!waitForWalkMeConfigFileLoadedEventForWMJQueryFF) {
				jqHelperFuncs = wmjQuery.queryHelpers;
			}
		});

		// this is used by the editor's inspector
		wmjQuery.getShadowContext = shadowManager.getShadowContext;
		wmjQuery.getShadowRoots = shadowManager.getShadowRoots;
		wmjQuery.hasShadowContext = shadowManager.hasShadowContext;

		getCtx().register('ShadowVersion').asInstance({ get: envTester.getCurrentPlatformVersion });
		getCtx().register('ShadowJQueryBindingWrapper').asCtor(ShadowJQueryBindingWrapper);
		overrideJQuerySelectorRunner();
	}

	function ShadowJQueryBindingWrapper() {
		var originalsMap;

		this.run = function run(cb) {
	    	try {
		    	bindJQuery();
		    	var retVal = cb();
		    	unbindJQuery();
		    	return retVal;
	    	} catch (ex) {
	    		// fallback to original jquery
	    		unbindJQuery();
	    		return cb();
	    	}
		};

	    function bindJQuery() {
	    	if (!originalsMap && hasNativeShadowDOM()) {
	    		originalsMap = {
					sizzle: overrideObj(sizzle, overrides.sizzle),
					wmjQuery: overrideObj(wmjQuery, overrides.wmjQuery),
					fnDefs: overrideObj(wmjQuery.fnDefs, overrides.fnDefs),
					relative: overrideObj(wmjQuery.find.selectors.relative, overrides.relative),
					filters: overrideObj(wmjQuery.expr.filters, overrides.filters),
					extend: extendObj(wmjQuery, extendOverrides)
	    		};
	    	}
	    }

	    function unbindJQuery() {
	    	if (originalsMap) {
				overrideObj(sizzle, originalsMap.sizzle);
				overrideObj(wmjQuery, originalsMap.wmjQuery);
				overrideObj(wmjQuery.fnDefs, originalsMap.fnDefs);
				overrideObj(wmjQuery.find.selectors.relative, originalsMap.relative);
				overrideObj(wmjQuery.expr.filters, originalsMap.filters);
				extendObj(wmjQuery, originalsMap.extend);
	    		originalsMap = undefined;
	    	}
	    }
	}

	function overrideJQuerySelectorRunner() {
		var oldRun;

		getCtx().decorate('JQuerySelectorRunner', JQuerySelectorRunnerOverride);
		getCtx().register('JQuerySelectorRunnerShadow', JQuerySelectorRunnerShadow);
		getCtx().decorate('ElementUtils', ElementUtilsOverride);

		function JQuerySelectorRunnerOverride(jQuerySelectorRunner) {
			oldRun = jQuerySelectorRunner.run;

		    jQuerySelectorRunner.run = function () {
		    	var args = arrUtils.toArray(arguments);

		    	if (getCtx().get('FeaturesManager').isFeatureEnabled('disableShadowjQueryWrapper')) {
		    		return oldRun.apply(jQuerySelectorRunner, args);
		    	} else {
			    	return getCtx().get('ShadowJQueryBindingWrapper').run(function() {
			    		shadowVisibilityManager.useShadowVisible(true);
			    		return oldRun.apply(jQuerySelectorRunner, args);
			    	});
		    	}
		    };

		    return jQuerySelectorRunner;
		}

		function JQuerySelectorRunnerShadow() {
			this.run = function() {
		    	var args = arrUtils.toArray(arguments);

				return getCtx().get('ShadowJQueryBindingWrapper').run(function() {
					shadowVisibilityManager.useShadowVisible(true);
					var runner = getCtx().get('JQuerySelectorRunner');
					var runFn = oldRun || runner.run;
					return runFn.apply(runner, args);
				});
			}
		}

		function ElementUtilsOverride(elementUtils) {
			elementUtils.getChildNodes = wmjQuery.fnHelpers.childNodes;
			return elementUtils;
		}
	}

	bind();
};



/***/ }),

/***/ 7169:
/***/ (function(module) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

module.exports = function() {
	var utils = _walkMe.getCommonUtils();
	var jsonMock = {
	    parse: utils.secureEvalJSON,
	    stringify: utils.toJSON
	};
	return jsonMock;
};


/***/ }),

/***/ 3532:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

var getCtx = (__webpack_require__(9545).getCtx);
var logger = getCtx().get('PrelibLogger');

function log() {
	var logRecord = Array().slice.call(arguments);
	logRecord.unshift("[ WmJqueryShadowDom ]");
	logger.write.apply(logger, logRecord);
}

exports.log = log;


/***/ }),

/***/ 1745:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

var getCtx = (__webpack_require__(9545).getCtx);
var FEPlugin = __webpack_require__(8296);
var overRidejQuery = __webpack_require__(8826);
__webpack_require__(8940);

function shadowDomManager(){
	var _this = this;
	var didFeInit = false;
	var didShadowInit = false;
	function shadowDomManager(){

	}

	_this.initFE = function(){
		if (!didFeInit) {
			FEPlugin.initPlugin();
			didFeInit = true;
		}
	}

	_this.jqShadow = function(){
		if (!didShadowInit) {
			var options = setOptions();
			overRidejQuery(wmjQuery, options);
			didShadowInit = true;
		}
	}

	function setOptions(){
		var options = {};
		if (getCtx().has('FeaturesManager')) {
			var featuresManager = getCtx().get('FeaturesManager');
			if (featuresManager.isFeatureEnabled('shadow-dom-no-cache')) {
				options.useCache = false;
			} else if (featuresManager.isFeatureEnabled('shadow-dom-use-cache')) {
				options.useCache = true;
			}
		}
		return options;
	}

}

module.exports = shadowDomManager;


/***/ }),

/***/ 2107:
/***/ (function(module) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

module.exports = {
	hasRelevantMutation: hasRelevantMutation
};

function hasRelevantMutation(mutations) {
	if (!mutations) return false;

	// cleanMutations(mutations);

	return any(mutations, isMutationRelevant);
}

function isMutationRelevant(m) {
	var hasElementNode = false;
	var wmRes;
	if (m.addedNodes) {
		wmRes = containsRelevantElement(m.addedNodes);
		hasElementNode = hasElementNode || wmRes.hasElementNode;
		if (wmRes.res) return true;
	}
	if (m.removedNodes) {
		wmRes = containsRelevantElement(m.removedNodes);
		hasElementNode = hasElementNode || wmRes.hasElementNode;
		if (wmRes.res) return true;
	}
	if (!hasElementNode && m.target) {
		wmRes = containsRelevantElement([m.target]);
		if (wmRes.res) return true;
	}
}

/*function cleanMutations(mutations) {
	for (var i = mutations.length - 1; i >= 0; i--) {
		var a = mutations[i];
		for (var j = i - 1; j >= 0; j--) {
			var b = mutations[j];
			if (isSameNodes(a.addedNodes, b.removedNodes) || isSameNodes(a.removedNodes, b.addedNodes)) {
				mutations.splice(i, 1);
				mutations.splice(j, 1);
				break;
			}
		}
	}
}

function isSameNodes(a, b) {
	return a && a.length && b && b.length && a.length === b.length && wmjQuery(a).is(b);
}*/

var testIdRegexes = testArr([/^wm-/, /^walkme-/, /^mt_/, /^widget_/, /^mtbug_/, /^sizzle\d+/]);
var testClassRegexes = testArr([/^walkme-/, /^wmd-/]);
var testClass = function(cls) { return testClassRegexes(cls); };
var ignoredTagsRegexp = /^(link|script)$/i;

function isIgnoreElement(el, checkParent) {
	if (ignoredTagsRegexp.test(el.tagName)) return true;

	var id = el.id;
	if (id && testIdRegexes(id)) return true;

	var classes = ((el.getAttribute && el.getAttribute('class')) || '').split(/\s+/);
	if (any(classes, testClass)) return true;

	if (checkParent) {
		var parent = wmjQuery(el).parent()[0];
		if (parent) {
			return isIgnoreElement(parent);
		}
	}
}

function containsRelevantElement(nodeList) {
	if (!nodeList) return {res: false, hasElementNode: false};

	var hasElementNode = false,
		res = false;
	for (var i = 0; i < nodeList.length; i++) {
		var n = nodeList[i];
		if (n && n.nodeType === 1) {
			hasElementNode = true;
			if (!isIgnoreElement(n, true)) {
				res = true;
				break;
			}
		}
	}
	return {res: res, hasElementNode: hasElementNode};
}

function any(arr, func) {
	for(var i = 0; i < arr.length; i++){
		if(func(arr[i])) return true;
	}
	return false;
}

function testArr(regexArr) {
	return function(str) {
		return any(regexArr, function(regexp) { return regexp.test(str); });
	}
}


/***/ }),

/***/ 6877:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

var getCtx = (__webpack_require__(9545).getCtx);

module.exports = {
	isFeatureEnabled: isFeatureEnabled,
	getShadowPluginVersion: getShadowPluginVersion
};

function isFeatureEnabled(str) {
	if (getCtx().has('FeaturesManager')) {
		return getCtx().get('FeaturesManager').isFeatureEnabled(str);
	}
}

function getShadowPluginVersion(){
	if (getCtx().has('ShadowPluginVersion')) {
		return getCtx().get('ShadowPluginVersion');
	}
}


/***/ }),

/***/ 5206:
/***/ (function(module) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

function createAdderType(name) {
	return {
		add: function(shadowContext, currContext) {
			shadowContext[name].shadowRoot = shadowContext[name].shadowRoot.concat(currContext[name].shadowRoot);
			shadowContext[name].slot = shadowContext[name].slot.concat(currContext[name].slot);
			shadowContext[name].content = shadowContext[name].content.concat(currContext[name].content);
		}
	};
}

var adders = {
	containers: createAdderType('containers'),
	content: createAdderType('content')
};

module.exports = function(options) {
	var addersArr = [];
	if (!options || options.containers !== false) {
		addersArr.push(adders.containers);
	}
	if (!options || options.content !== false) {
		addersArr.push(adders.content);
	}
	return addersArr;
};


/***/ }),

/***/ 2944:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

var arrUtils = __webpack_require__(9059);
var shadowContainerTypesMap = __webpack_require__(7534);
var shadowContextUtils = __webpack_require__(6050);
var hasRelevantMutation = (__webpack_require__(2107).hasRelevantMutation);
var shadowSortOrderManager = __webpack_require__(4992);
var getCtx = (__webpack_require__(9545).getCtx);
var isFeatureEnabled = (__webpack_require__(6877).isFeatureEnabled);
var shadowUtils = __webpack_require__(4032);

var idSeq = 0,
	getTime = function() { return new Date().getTime(); },
	generateId = function() { return ++idSeq; };

module.exports = function(options) {
	var apiFunc = getShadowContextNoCache,
		cacheInited,
		wmLoaded;
	// configuration of the observer:
	var observer,
		mutationConfig = { childList: true, subtree: true, attributes: true };

	function isUseCache() {
		return options.useCache || isFeatureEnabled('shadow-dom-use-cache') || (options.useCache !== false && window._walkMe && _walkMe.getIsInEditor());
	}

	function initCache() {
		var shadowContextCache = {},
			idPropName = 'wmShadowId' + getTime(),
			lastMutationTime = 0,
			lastCacheUpdate = -1000,
			THROTTLE_TIME_MS = 500;
		apiFunc = function throttledGetShadowContext(context, options) {
			var currTime = getTime();
			var lastUpdateTime = context.wmShadowLastUpdate || 0;
			context[idPropName] = context[idPropName] || generateId();

			var cacheId = [context[idPropName], options.content, options.values].join('-');
			if (!shadowContextCache[cacheId] || (lastMutationTime > lastUpdateTime && currTime > lastUpdateTime + THROTTLE_TIME_MS)) {
				context.wmShadowLastUpdate = lastCacheUpdate = currTime;
				shadowContextCache[cacheId] = getShadowContextNoSort(context, options);
				mapShadowContextValues(shadowContextCache[cacheId], options);
			}
			return shadowContextCache[cacheId];
		};

		observer = new MutationObserver(function(mutations) {
			if (lastMutationTime <= lastCacheUpdate + THROTTLE_TIME_MS && hasRelevantMutation(mutations)) {
				lastMutationTime = getTime();
			}
		});
		 
		// pass in the target node, as well as the observer options
		observer.observe(document, mutationConfig);

		getCtx().get('EventsListener').once(getCtx().get('Consts').EVENTS.BeforeWalkmeRemoved, function() {
			observer.disconnect();
			wmLoaded = false;
			cacheInited = false;
			shadowContextCache = {};
		});
	}

	function mapShadowContextValues(shadowContext, options) {
		if (options && options.values) {
			shadowContext.values = {
				shadowRoot: arrUtils.arrMap(shadowContext.containers.shadowRoot, shadowContainerTypesMap.shadowRoot.value)
			};
			if (cacheInited) {
				arrUtils.arrForEach(shadowContext.values.shadowRoot, function(v) {
					observer.observe(v, mutationConfig);
				});
			}
		}
	}

	function getShadowContextNoSort(context, options) {
		shadowSortOrderManager.setUseShadowSortOrder(false);
		var res = shadowContextUtils.getShadowContext(context, options);
		shadowSortOrderManager.setUseShadowSortOrder(true);
		return res;
	}

	function getShadowContextNoCache(context, options) {
		var shadowContext = getShadowContextNoSort(context, options);
		mapShadowContextValues(shadowContext, options);
		return shadowContext;
	}

	function getShadowContextProxy(context, options) {
		if (wmLoaded) {
			return apiFunc(context, options);
		}
		if (window._walkMe) {
			wmLoaded = true;
		}
		if (!cacheInited && typeof MutationObserver === 'function' && isUseCache()) {
			cacheInited = true;
			initCache();
		}
		return apiFunc(context, options);
	}
	
	function getShadowContextFromArray(context, options) {
		if (!wmjQuery.isArray(context)) {
			return getShadowContextProxy(context, options);
		}

		var shadowContext = {
			containers: { shadowRoot: [], slot: [], content: [] },
			content: { shadowRoot: [], slot: [], content: [] },
			values: { shadowRoot: [] }
		};

		function append(res, key) {
			if (res[key]) {
				if (shadowContext[key].shadowRoot) Array.prototype.push.apply(shadowContext[key].shadowRoot, res[key].shadowRoot);
				if (shadowContext[key].slot) Array.prototype.push.apply(shadowContext[key].slot, res[key].slot);
				if (shadowContext[key].content) Array.prototype.push.apply(shadowContext[key].content, res[key].content);
			}
		}

		for (var i = 0; i < context.length; i++) {
			var curr = getShadowContextProxy(context[i], options);
			append(curr, 'containers');
			append(curr, 'content');
			append(curr, 'values');
		}

		return shadowContext;
	}
	
	return {
		getShadowContext: getShadowContextFromArray,
		// This function is used by the editor inspector
		getShadowRoots: function(context) {
			var allShadowRoots;
			var res = new Set();
			var recursionDepth = 0;
			shadowUtils.findShadowRoots(context, res, recursionDepth);
			allShadowRoots = Array.from(res);
			return allShadowRoots;
		},
		hasShadowContext: function(context) {
			return isContentUnreachableBySelector(this.getShadowContext(context, {
				content: true,
				stopCB: foundShadowContext
			}));
		}
	};
};

function foundShadowContext(shadowContext) {
	return shadowContext.content.shadowRoot.length > 0 ||
		shadowContext.content.slot.length > 0 ||
		shadowContext.content.content.length > 0;
}

function isContentUnreachableBySelector(shadowContext) {
	var allContent = shadowContext.content.shadowRoot.concat(shadowContext.content.slot).concat(shadowContext.content.content);
	if (allContent.length === 0) {
		return;
	}

	var tagNamesMap = arrUtils.arrReduce(allContent, function(tn, elm) {
		tn[elm.tagName] = 1;
		return tn;
	}, {});

	var selector = '';
	for (var name in tagNamesMap) {
		selector += ',' + name;
	}
	selector = selector.substr(1); // remove first ','

	var elements;
	try {
		elements = document.querySelectorAll(selector);
	} catch (ex) {
		elements = wmjQuery(selector);
	}

	for (var i = 0; i < allContent.length; i++) {
		if (!arrUtils.arrContains(elements, allContent[i])) {
			return true;
		}
	}

	return false;
}


/***/ }),

/***/ 2839:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

var shadowContainerTypesMap = __webpack_require__(7534);
module.exports = {
	parents: [
		shadowContainerTypesMap.slot,
		shadowContainerTypesMap.content,
		shadowContainerTypesMap.regular,
		shadowContainerTypesMap.shadowRoot
	],
	children: [
		shadowContainerTypesMap.shadowRoot,
		shadowContainerTypesMap.slot,
		shadowContainerTypesMap.content,
		shadowContainerTypesMap.regular
	]
};


/***/ }),

/***/ 7534:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

var arrUtils = __webpack_require__(9059);
var querySelectorSpecialContent = __webpack_require__(668);

module.exports = {
	regular: {
		test: function(e) {
			return true;
		},
		children: function(e) {
			return e.children;
		},
		childNodes: function(e) {
			return e.childNodes;
		},
		firstChild: function(e) {
			return e.firstChild;
		},
		firstElementChild: function(e) {
			return e.firstElementChild;
		},
		parent: function(e) {
			return e.parentNode;
		},
		getRoot: function(e) {
			return [e];
		}
	},
	shadowRoot: {
		test: function(e) { return this.value(e); },
		value: function(e) {
			return e.shadowRoot || wmjQuery.fnHelpers.wrapIfNeeded(e).shadowRoot;
		},
		children: function(e) {
			var shadowRoot = this.value(e);
			return (shadowRoot && shadowRoot.children) || [];
		},
		childNodes: function(e) {
			var shadowRoot = this.value(e);
			return shadowRoot && shadowRoot.childNodes;
		},
		firstChild: function(e) {
			var shadowRoot = this.value(e);
			return shadowRoot && shadowRoot.firstChild;
		},
		firstElementChild: function(e) {
			var shadowRoot = this.value(e);
			return shadowRoot && shadowRoot.firstElementChild;
		},
		parent: function(e) {
			return e.host;
		},
		getRoot: function(e) {
			return [this.value(e)];
		}
	},
	slot: {
		test: function(e) { return this.value(e).assignedNodes && wmjQuery.nodeName( e, "slot" ); },
		value: function(e) {
			return e.assignedNodes ? e : wmjQuery.fnHelpers.wrapIfNeeded(e);
		},
		children: function(e) {
			var v = this.value(e);
			return arrUtils.toArray((v.assignedNodes && v.assignedNodes(/*{ flatten:true }*/)) || []);
		},
		childNodes: function(e) {
			return this.children(e);
		},
		firstChild: function(e) {
			return this.children(e)[0];
		},
		firstElementChild: function(e) {
			return firstElementChild(this.children(e));
		},
		parent: function(e) {
			return e.assignedSlot || wmjQuery.fnHelpers.wrapIfNeeded(e).assignedSlot;
		},
		getRoot: function(e) {
			return [createQueryableCollection(this.children(e))];
		}
	},
	content: {
		test: function(e) { return this.value(e).getDistributedNodes && wmjQuery.nodeName( e, "content" ) },
		value: function(e) {
			return e.getDistributedNodes ? e : wmjQuery.fnHelpers.wrapIfNeeded(e);
		},
		children: function(e) {
			var v = this.value(e);
			return arrUtils.toArray(v.getDistributedNodes && v.getDistributedNodes() || []);
		},
		childNodes: function(e) {
			return this.children(e);
		},
		firstChild: function(e) {
			return this.children(e)[0];
		},
		firstElementChild: function(e) {
			return firstElementChild(this.children(e));
		},
		parent: function(e) {
			var v = e.getDestinationInsertionPoints ? e : wmjQuery.fnHelpers.wrapIfNeeded(e);
			if (v.getDestinationInsertionPoints) {
				var p = v.getDestinationInsertionPoints();
				// TODO: what if it has 2 parents?
				return p && p[0];
			}
		},
		getRoot: function(e) {
			return [createQueryableCollection(this.children(e))];
		}
	},
	iframe: {
		test: function(e) {
			return wmjQuery.nodeName( e, "iframe" ) && this.value(e);
		},
		value: function(e) {
			try {
				return e.contentDocument;
			} catch(ex) {
				// cross-domain iframe
			}
		},
		getRoot: function(e) {
			return [this.value(e)];
		}
	}
};

function firstElementChild(nodes) {
	var node, i = 0;
	while (node = nodes[i++]) {
        if (node.nodeType === 1) {
            return node;
        }
    }
    return null;
}

function createQueryableCollection(arr) {
	return {
		querySelectorAll: function(selector) {
			return querySelectorSpecialContent([], arr, selector);
		}
	};
}


/***/ }),

/***/ 6050:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

var isFeatureEnabled = (__webpack_require__(6877).isFeatureEnabled);
var arrUtils = __webpack_require__(9059);
var wrapUtils = __webpack_require__(7903)(wmjQuery);
var elementUtils = __webpack_require__(66);
var shadowContainerTypesMap = __webpack_require__(7534);
var adders = __webpack_require__(5206);
var shadowVisibilityManager = __webpack_require__(3431);

function getShadowContainers(context) {
	var shadowContainers = [];
	var slotContainers = [];
	var contentContainers = [];
	var jqContext = wmjQuery(context);
	for (var i = 0; i < jqContext.length; i++) {
		var e = jqContext[i];
		if (shadowContainerTypesMap.slot.test(e)) {
			slotContainers.push(e);
		}
		if (shadowContainerTypesMap.content.test(e)) {
			contentContainers.push(e);
		}
		if (shadowContainerTypesMap.shadowRoot.test(e)) {
			shadowContainers.push(e);
		} else {
			var allChildren = arrUtils.arrFilter(elementUtils.getElementChildren(e), filterShadowVisible);
			if (allChildren.length > 0) {
				shadowContainers = shadowContainers.concat(arrUtils.arrFilter(allChildren, function(e) {
					return shadowContainerTypesMap.shadowRoot.test(e);
				}));
				slotContainers = slotContainers.concat(arrUtils.arrFilter(allChildren, function(e) {
					return shadowContainerTypesMap.slot.test(e);
				}));
				contentContainers = contentContainers.concat(arrUtils.arrFilter(allChildren, function(e) {
					return shadowContainerTypesMap.content.test(e);
				}));
			}
		}
	}

	return {
		shadowRoot: wmjQuery.find.uniqueSort(arrUtils.arrMap(shadowContainers, wrapUtils.unwrapElement)),
		slot: wmjQuery.find.uniqueSort(arrUtils.arrMap(slotContainers, wrapUtils.unwrapElement)),
		content: wmjQuery.find.uniqueSort(arrUtils.arrMap(contentContainers, wrapUtils.unwrapElement))
	};
}

function filterShadowVisible(element) {
	if (!element) return false;

	if (!shadowVisibilityManager.useShadowVisible()) {
		return true;
	}

	try {
		return isVisible(element) || 
			(arrUtils.arrReduce(['slot','content','shadowRoot'], function(res, type) {
						return res || shadowContainerTypesMap[type].test(element);
					}, false)
			&& filterShadowVisible(wmjQuery.fnHelpers.parentNode(element)));
	} catch(ex) {
		return false;
	}
}

// source: https://stackoverflow.com/questions/13388616/firefox-query-selector-and-the-visible-pseudo-selector
function isVisible(elem) {
	return elem.offsetWidth > 0 || elem.offsetHeight > 0 || (elem.getClientRects && elem.getClientRects().length > 0);
}

function getShadowContent(shadowContainers, type) {
	return wmjQuery.find.uniqueSort(arrUtils.arrMap(arrUtils.concatArrays(arrUtils.arrMap(shadowContainers, function(e) {
		return arrUtils.toArray(shadowContainerTypesMap[type].children(e));
	})), wrapUtils.unwrapElement));
}

function getShadowContext(context, options) {
	options = options || {};
	var shadowContext = {
		containers: { shadowRoot: [], slot: [], content: [] },
		content: { shadowRoot: [], slot: [], content: [] }
	};
	var addersArr = adders(options);
	getShadowContextDeep(context, function(element, result) {
		for (var j = addersArr.length - 1; j >= 0; j--) {
			addersArr[j].add(shadowContext, result);
		}
		if (options.stopCB && options.stopCB(shadowContext)) {
			// stop iterating
			return false;
		}
	});
	
	return shadowContext;
}

function addContentChildren(shadowContext) {
	if (shadowContext.content) {
		shadowContext.content.shadowRoot = shadowContext.content.shadowRoot.concat(elementUtils.getElementsChildren(shadowContext.content.shadowRoot));
		shadowContext.content.slot = shadowContext.content.slot.concat(elementUtils.getElementsChildren(shadowContext.content.slot));
		shadowContext.content.content = shadowContext.content.content.concat(elementUtils.getElementsChildren(shadowContext.content.content));
	}
}

function getShadowContextDeep(context, callback) {
	var addersArr = adders();
	var containers = getShadowContainers(context);
	var content = {
		shadowRoot: getShadowContent(containers.shadowRoot, 'shadowRoot'),
		slot: getShadowContent(containers.slot, 'slot'),
		content: getShadowContent(containers.content, 'content')
	};

	if (callback(context, {
				containers: containers,
				content: content
			}) === false) {
		return;
	}

	var prevContent = content.shadowRoot.concat(content.slot).concat(content.content);
	var doNext = true;

	while (prevContent.length > 0 && doNext) {
		var moreContext = arrUtils.arrReduce(arrUtils.arrMap(prevContent, function(e){
			return getShadowContainers(e);
		}), function(moreContext, curr, i) {
			var moreShadowContent = getShadowContent(curr.shadowRoot, 'shadowRoot');
			var moreSlotContent = getShadowContent(curr.slot, 'slot');
			var moreContentContent = getShadowContent(curr.content, 'content');

			if (curr.shadowRoot.length > 0 ||
					curr.slot.length > 0 ||
					moreShadowContent.length > 0 ||
					moreSlotContent.length > 0 ||
					moreContentContent.length > 0) {
				var currResult = {
					containers: curr,
					content: {
						shadowRoot: moreShadowContent,
						slot: moreSlotContent,
						content: moreContentContent
					}
				};
				if (callback(prevContent[i], currResult) === false) {
					doNext = false;
				}

				for (var j = addersArr.length - 1; j >= 0; j--) {
					addersArr[j].add(moreContext, currResult);
				}
			}

			return moreContext;
		}, {
			containers: {shadowRoot: [], slot: [], content: []},
			content: {shadowRoot: [], slot: [], content: []}
		});

		prevContent = moreContext.content.shadowRoot.concat(moreContext.content.slot).concat(moreContext.content.content);
	}
}

module.exports = {
	getShadowContext: getShadowContext,
	getShadowContextDeep: getShadowContextDeep,
	addContentChildren: addContentChildren
};


/***/ }),

/***/ 8940:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

var getCtx = (__webpack_require__(9545).getCtx);

getCtx().register('ShadowDOMPluginSupportLevel')
	.asCtor(ShadowDOMPluginSupportLevel);

function ShadowDOMPluginSupportLevel () {
	var _this = this;
	_this.get = get;

	function get () {
		return 3;
	}
}



/***/ }),

/***/ 4992:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */


var sizzle = wmjQuery.find;
var _useShadowSortOrder = true;
var wrapUtils = __webpack_require__(7903)(wmjQuery);

var shadowSortOrder = (function() {
	var originalFn = wmjQuery.find.sortOrder;
	if (originalFn && originalFn !== wmjQuery.find.sortOrderFuncs.vanilla) {
		return function sortOrder( a, b ) {
			var func;
			if (_useShadowSortOrder &&
					(wmjQuery.fnHelpers.isInShadow(a) || wmjQuery.fnHelpers.isInShadow(b))) {
				func = sizzle.sortOrderFuncs.vanilla;
			} else {
				func = originalFn;
			}
			return func( wrapUtils.unwrapElement(a), wrapUtils.unwrapElement(b) );
		};
	} else {
		return originalFn;
	}
})();

module.exports = {
	shadowSortOrder: shadowSortOrder,
	setUseShadowSortOrder: function(val) { _useShadowSortOrder = val; }
};


/***/ }),

/***/ 4032:
/***/ (function(module) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

module.exports = { 
	findShadowRoots: function findShadowRoots(elem, res, recDepth) {
		if (recDepth >= 1000) {
			return res;
		}
		if (elem && elem.shadowRoot && elem.shadowRoot.children) {
			var children = elem.shadowRoot.children || [];
			for (var i = 0; i < children.length; i++) {
				findShadowRoots(children[i], res, recDepth + 1);
			}
		}

		if (elem && elem.children && elem.children.length) {
			for (var i = 0; i < elem.children.length; i++) {
				findShadowRoots(elem.children[i], res, recDepth + 1);
			} 
		}

		if (elem.shadowRoot){
			res.add(elem.shadowRoot);
		}	
	}
}


/***/ }),

/***/ 3431:
/***/ (function(module) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

var _useShadowVisible = true;

module.exports = {
	useShadowVisible: function(val) {
		if (val !== undefined) {
			_useShadowVisible = val;
		}
		return _useShadowVisible;
	}
};


/***/ }),

/***/ 2459:
/***/ (function(module) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

var logsIoSender = (function () {
    function logsIoSender(ctx) {
        var _this = this;
        this._ctx = ctx;
        this._messageQueue = [];
        this._eventsListener = ctx.get('EventsListener');
        this._eventsListener.on('DataLoadedEvent', function () {
            if (!_this._eventSenderErrorLogger) {
                _this._eventSenderErrorLogger = _this._ctx.get('EventSenderErrorLogger');
                _this.emptyQueue();
            }
        });
    }
    logsIoSender.prototype.sendLog = function (message, extraData) {
        if (!message) {
            return;
        }
        if (!this._eventSenderErrorLogger) {
            this.pushToQueue(message, extraData);
            return;
        }
        this._eventSenderErrorLogger.logError(message, extraData);
    };
    logsIoSender.prototype.pushToQueue = function (message, extraData) {
        this._messageQueue.push({
            message: message,
            extraData: extraData
        });
    };
    logsIoSender.prototype.emptyQueue = function () {
        for (var i = 0; i < this._messageQueue.length; i++) {
            this._eventSenderErrorLogger.logError(this._messageQueue[i].message, this._messageQueue[i].extraData);
        }
        this._messageQueue = null;
    };
    return logsIoSender;
}());
var logsIoInstance;
module.exports = function (ctx) {
    if (logsIoInstance) {
        return logsIoInstance;
    }
    else {
        logsIoInstance = new logsIoSender(ctx);
        return logsIoInstance;
    }
};



/***/ }),

/***/ 4270:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

'use strict';

exports.__esModule = true;
exports.userCtx = exports.platformCtx = exports.PLUGIN_NAME = exports.ctx = undefined;

var _wmPrelibPluginEntryManager = __webpack_require__(9545);

var ctx = exports.ctx = (0, _wmPrelibPluginEntryManager.getCtx)();
var PLUGIN_NAME = exports.PLUGIN_NAME = 'ServiceNow';
var platformCtx = exports.platformCtx = {};
var userCtx = exports.userCtx = {};


/***/ }),

/***/ 6343:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

'use strict';

var _wmPrelibPluginEntryManager = __webpack_require__(9545);

module.exports = (0, _wmPrelibPluginEntryManager.createPluginEntry)(function (registerPlugin) {
	function getServiceNowPlugin() {
		var registerShadowToCtx = (__webpack_require__(750).registerToCtx);
		registerShadowToCtx(_wmPrelibPluginEntryManager.getCtx);
		var serviceNowPlugin = (__webpack_require__(4579)/* .ServiceNow */ .E);
		return new serviceNowPlugin();
	}

	registerPlugin(getServiceNowPlugin());
});


/***/ }),

/***/ 9344:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

'use strict';

exports.__esModule = true;
exports.platformMutations = platformMutations;

var _logger = __webpack_require__(2104);

var _consts = __webpack_require__(4270);

function platformMutations() {
    var platformMutationsConfig = {
        mutationObserver: {
            whitelist: [
            //catches title mutations - addresses UI change issue where navigating within iframe within shawdow root does not trigger normal hash/history changes (i.e., on Next UI Incidents table)
            {
                type: 'childList',
                'target.tagName': 'TITLE'
            }]
        }
    };
    (0, _logger.log)('Injecting mutations config');

    _consts.ctx.register('PlatformMutationsConfig').asInstance({
        get: function get() {
            return platformMutationsConfig;
        }
    });
}


/***/ }),

/***/ 3458:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

'use strict';

exports.__esModule = true;
exports.startGetPlatformCtxAsync = undefined;

var _typeof2 = __webpack_require__(839);

var _typeof3 = _interopRequireDefault(_typeof2);

var _promise = __webpack_require__(7509);

var _promise2 = _interopRequireDefault(_promise);

var _regenerator = __webpack_require__(4831);

var _regenerator2 = _interopRequireDefault(_regenerator);

var _assign = __webpack_require__(6601);

var _assign2 = _interopRequireDefault(_assign);

var _asyncToGenerator2 = __webpack_require__(7428);

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var startGetPlatformCtxAsync = exports.startGetPlatformCtxAsync = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
    var platformResult;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return getPlatformCtxAsync();

          case 3:
            platformResult = _context.sent;

            (0, _assign2.default)(_consts.platformCtx, platformResult.platformCtx);
            (0, _assign2.default)(_consts.userCtx, platformResult.userCtx);
            (0, _logger.log)('Platform identified: ' + _consts.platformCtx.snowApp, _consts.platformCtx);
            _context.next = 12;
            break;

          case 9:
            _context.prev = 9;
            _context.t0 = _context['catch'](0);

            if (_context.t0 instanceof Error) {
              (0, _logger.reportError)(_context.t0, { source: 'getPlatformCtx' });
            } else {
              (0, _logger.log)('Failed to identify a known platform.', _consts.platformCtx);
              (0, _assign2.default)(_consts.platformCtx, _context.t0.platformCtx);
            }

          case 12:
            _context.prev = 12;

            _consts.platformCtx.deploymentMethod = getWalkmeDeploymentMethod().deploymentMethod;
            return _context.finish(12);

          case 15:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this, [[0, 9, 12, 15]]);
  }));

  return function startGetPlatformCtxAsync() {
    return _ref.apply(this, arguments);
  };
}();

var getPlatformCtxAsync = function () {
  var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2() {
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            return _context2.abrupt('return', (0, _utils.retry)(function () {
              return new _promise2.default(function (resolve, reject) {
                var platformResult = detectPlatform();
                if (platformResult.platformCtx.snowApp !== 'unknown') {
                  resolve(platformResult);
                } else {
                  (0, _logger.log)('Failed to identify a ServiceNow environment, trying again');
                  reject(platformResult);
                }
              });
            }, 30, 200));

          case 1:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }));

  return function getPlatformCtxAsync() {
    return _ref2.apply(this, arguments);
  };
}();

var _logger = __webpack_require__(2104);

var _consts = __webpack_require__(4270);

var _utils = __webpack_require__(9123);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function detectPlatform() {
  var platformCtx = {};
  var userCtx = {};
  var fingerprint = {
    ux_globals: (0, _typeof3.default)(window['ux_globals']) === 'object',
    ux_globals_initialroute: (0, _typeof3.default)(window['ux_globals']) === 'object' && (0, _typeof3.default)(window['ux_globals']['initialRoute']) === 'object',
    gsft_main: (0, _typeof3.default)(window['gsft_main']) === 'object',
    gsft_main_now: (0, _typeof3.default)(window['gsft_main']) === 'object' && (0, _typeof3.default)(window['gsft_main'].NOW) === 'object',
    isPolarisEnabled: window['gsft_main'] && window['gsft_main'].NOW && (window['gsft_main'].NOW.isPolarisEnabled === 'true' || window['gsft_main'].NOW.isPolarisEnabled === 'false'),
    now: (0, _typeof3.default)(window['NOW']) === 'object',
    sp: (0, _typeof3.default)(window['NOW']) === 'object' && (0, _typeof3.default)(window['NOW'].sp) === 'object',
    spPresence: (0, _typeof3.default)(window['NOW']) === 'object' && (0, _typeof3.default)(window['NOW'].presence_scopes) === 'object' && (0, _typeof3.default)(window['NOW'].presence_scopes[0].portal) === 'object' && typeof window['NOW'].presence_scopes[0].portal.sys_name === 'string',
    agentworkspace: window.location.pathname.includes('/workspace/agent')
  };

  try {
    if (fingerprint.ux_globals && fingerprint.ux_globals_initialroute && window['ux_globals']['initialRoute']['route'] === 'classic') {
      //e.g. /now/nav/ui/classic/params/target/incident_list.do
      platformCtx = {
        snowApp: 'now-classic',
        snowSite: window['ux_globals']['initialRoute'].context.experienceName,
        fingerprint: fingerprint
      };
      userCtx = {
        userId: window['ux_globals'].session.output.user.sys_id,
        userName: window['ux_globals'].session.output.user.userName,
        roles: window['ux_globals'].session.output.user.roles
      };
    } else if (fingerprint.ux_globals && fingerprint.ux_globals_initialroute && window['ux_globals']['initialRoute']['route'] !== 'classic') {
      //i.e. /now/cmdb/home
      platformCtx = {
        snowApp: 'now',
        snowSite: window['ux_globals']['initialRoute'].context.experienceName,
        fingerprint: fingerprint
      };
      userCtx = {
        userId: window['ux_globals'].session.output.user.sys_id,
        userName: window['ux_globals'].session.output.user.userName,
        roles: window['ux_globals'].session.output.user.roles
      };
    } else if (fingerprint.gsft_main && fingerprint.now && fingerprint.isPolarisEnabled) {
      platformCtx = {
        snowApp: 'legacy-itsm',
        snowSite: 'itsm',
        fingerprint: fingerprint
      };
      userCtx = {
        userId: window['NOW'].user.userId,
        userName: window['NOW'].user.name,
        roles: window['NOW'].user.roles
      };
    } else if (fingerprint.sp && fingerprint.spPresence) {
      //i.e. /sp
      platformCtx = {
        snowApp: 'serviceportal',
        snowSite: window['NOW'].presence_scopes[0].portal.sys_name,
        fingerprint: fingerprint
      };
      userCtx = {
        userId: window['NOW'].user_id,
        userName: window['NOW'].user_name
      };
    } else if (fingerprint.agentworkspace) {
      //i.e. /now/workspace/agent/
      platformCtx = {
        snowApp: 'agentworkspace',
        snowSite: 'agentworkspace',
        fingerprint: fingerprint
      };
      userCtx = {
        userId: window['NOW'].user.userID
      };
    } else {
      platformCtx = {
        snowApp: 'unknown',
        fingerprint: fingerprint
      };
    }
  } catch (error) {
    platformCtx = {
      snowApp: 'unknown',
      fingerprint: fingerprint,
      error: error.message
    };
  }

  return { platformCtx: platformCtx, userCtx: userCtx };
}

//function will identify if walkme is deployed via extension or via package and return
function getWalkmeDeploymentMethod() {
  switch (true) {
    case _consts.ctx.has('IsInEditor') && _consts.ctx.get('IsInEditor').get() == true:
      return { deploymentMethod: 'editor' };
    case (0, _typeof3.default)(window['_walkmeExtension']) == 'object':
      return { deploymentMethod: 'extension' };
    case (0, _typeof3.default)(window['_walkmePackage']) == 'object':
      return { deploymentMethod: 'package' };
    case window['walkmeDynamicInjector']:
      return { deploymentMethod: 'package_legacy' };
    default:
      return { deploymentMethod: 'snippet' };
  }
}


/***/ }),

/***/ 4579:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

var __webpack_unused_export__;
/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

'use strict';

__webpack_unused_export__ = true;

var _regenerator = __webpack_require__(4831);

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = __webpack_require__(7428);

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

exports.E = ServiceNow;

var _consts = __webpack_require__(4270);

var _mutations = __webpack_require__(9344);

var _logger = __webpack_require__(2104);

var _platformIdentifier = __webpack_require__(3458);

var _shadowDom = __webpack_require__(4764);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ServiceNow() {
	var initPluginFunctionsAsync = function () {
		var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
			return _regenerator2.default.wrap(function _callee$(_context) {
				while (1) {
					switch (_context.prev = _context.next) {
						case 0:
							_context.next = 2;
							return (0, _shadowDom.initShadowFunctionsAsync)(_this.shadowDomManager);

						case 2:
							_context.next = 4;
							return (0, _platformIdentifier.startGetPlatformCtxAsync)();

						case 4:

							//set useful info to the window
							window['WalkMeServiceNow'] = {
								user: _consts.userCtx
							};

						case 5:
						case 'end':
							return _context.stop();
					}
				}
			}, _callee, this);
		}));

		return function initPluginFunctionsAsync() {
			return _ref.apply(this, arguments);
		};
	}();

	var _this = this;
	_this.run = run;
	_this.initShadowFunctionsAsyncPromise, _this.shadowDomManager;

	function ctor() {
		_this.shadowDomManager = _consts.ctx.get('ShadowDomjQuery');
	}

	function run() {
		(0, _logger.log)('Init ServiceNow plugin');

		//Add the custom mutations to ctx for the mutation observer to use. It waits for the platform to be identified in case we want a per platform config
		(0, _mutations.platformMutations)();

		initPluginFunctionsAsync().then(function () {
			//Log a heartbeat with the detected platform details & outcome of shadow dom detection
			(0, _logger.reportInfo)('ServiceNow plugin done');
		}).catch(function (error) {
			(0, _logger.log)('Init ServiceNow failed', error);
			(0, _logger.reportError)(error);
		});
		return null;
	}

	ctor();
}


/***/ }),

/***/ 4764:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

'use strict';

exports.__esModule = true;
exports.initShadowFunctionsAsync = undefined;

var _regenerator = __webpack_require__(4831);

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = __webpack_require__(7428);

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var initShadowFunctionsAsync = exports.initShadowFunctionsAsync = function () {
    var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(_shadowDomManager) {
        return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        _context.next = 2;
                        return detectShadowDomAsync();

                    case 2:
                        _consts.platformCtx.shadowResult = _context.sent;

                        if (_consts.platformCtx.shadowResult.result === true) {
                            (0, _logger.log)('Shadow DOM detected using ' + _consts.platformCtx.shadowResult.type + ': ' + _consts.platformCtx.shadowResult.message + ' in ' + _consts.platformCtx.shadowResult.time + ' ms');
                            (0, _logger.log)('Running Shadow functions.');
                            _shadowDomManager.jqShadow();
                            _shadowDomManager.initFE();
                        } else {
                            (0, _logger.log)('Shadow DOM not found. Detector took ' + _consts.platformCtx.shadowResult.time + ' ms');
                            _consts.ctx.register('JQuerySelectorRunnerShadow').asFunction(function () {
                                return false;
                            });
                            (0, _logger.log)('Disabling JQuerySelectorRunnerShadow');
                        }

                    case 4:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, this);
    }));

    return function initShadowFunctionsAsync(_x) {
        return _ref.apply(this, arguments);
    };
}();

var detectShadowDomAsync = function () {
    var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2() {
        var detectStartTime, elements, knownTags, allowedUrls, filter, i, d;
        return _regenerator2.default.wrap(function _callee2$(_context2) {
            while (1) {
                switch (_context2.prev = _context2.next) {
                    case 0:
                        filter = function filter(index, url) {
                            return window.location.href.match(url);
                        };

                        detectStartTime = Date.now();
                        elements = document.body.querySelectorAll('*');
                        knownTags = ['MACROPONENT', 'SN-WORKSPACE'];
                        allowedUrls = ['service-now.com\/now\/'];

                        if (!(wmjQuery(allowedUrls).filter(filter).length > 0)) {
                            _context2.next = 7;
                            break;
                        }

                        return _context2.abrupt('return', {
                            result: true,
                            type: 'URL whitelist',
                            message: allowedUrls.toString(),
                            time: Date.now() - detectStartTime
                        });

                    case 7:
                        i = 0;

                    case 8:
                        if (!(i < elements.length)) {
                            _context2.next = 21;
                            break;
                        }

                        d = 0;

                    case 10:
                        if (!(d < knownTags.length)) {
                            _context2.next = 16;
                            break;
                        }

                        if (!elements[i].tagName.includes(knownTags[d])) {
                            _context2.next = 13;
                            break;
                        }

                        return _context2.abrupt('return', {
                            result: true,
                            type: 'ServiceNow element tag',
                            message: elements[i].tagName,
                            time: Date.now() - detectStartTime
                        });

                    case 13:
                        d++;
                        _context2.next = 10;
                        break;

                    case 16:
                        if (!elements[i].shadowRoot) {
                            _context2.next = 18;
                            break;
                        }

                        return _context2.abrupt('return', {
                            result: true,
                            type: 'element with shadow root',
                            message: elements[i].tagName,
                            time: Date.now() - detectStartTime
                        });

                    case 18:
                        i++;
                        _context2.next = 8;
                        break;

                    case 21:
                        return _context2.abrupt('return', {
                            result: false,
                            type: 'no shadom DOM found',
                            message: 'no shadom DOM found',
                            time: Date.now() - detectStartTime
                        });

                    case 22:
                    case 'end':
                        return _context2.stop();
                }
            }
        }, _callee2, this);
    }));

    return function detectShadowDomAsync() {
        return _ref2.apply(this, arguments);
    };
}();

var _consts = __webpack_require__(4270);

var _logger = __webpack_require__(2104);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }


/***/ }),

/***/ 2104:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

'use strict';

exports.__esModule = true;
exports.log = log;
exports.reportError = reportError;
exports.reportInfo = reportInfo;

var _consts = __webpack_require__(4270);

var _wmClientServerLogger = __webpack_require__(1802);

var _wmClientServerLogger2 = _interopRequireDefault(_wmClientServerLogger);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var logger = _consts.ctx.get('PrelibLogger');
var logSender = (0, _wmClientServerLogger2.default)(_consts.ctx);
var LOG_LEVEL = logSender.ConstsLogLevel;

function log(message) {
    var logRecord = Array.prototype.slice.call(arguments);
    logRecord.unshift('[ ' + _consts.PLUGIN_NAME + ' ]');
    logger.write.apply(logger, logRecord);
}

function reportError(err) {
    var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    log('ERROR: ' + err.message);

    var errData = {
        message: err instanceof Error ? err.message : err,
        stack: err instanceof Error ? err.stack : null
    };
    var extraData = {
        exception: errData,
        data: data,
        plugin: _consts.PLUGIN_NAME,
        platformDetails: _consts.platformCtx,
        level: 'error',
        logLevel: LOG_LEVEL.ALWAYS
    };

    logSender.sendLog({
        message: err.message,
        extraData: extraData
    });
}

function reportInfo(message) {
    var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    log(message);

    var extraData = {
        data: data,
        plugin: _consts.PLUGIN_NAME,
        platformDetails: _consts.platformCtx,
        level: 'info',
        logLevel: LOG_LEVEL.ALWAYS
    };

    logSender.sendLog({
        message: message,
        extraData: extraData
    });
}


/***/ }),

/***/ 9123:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

"use strict";

exports.__esModule = true;

var _promise = __webpack_require__(7509);

var _promise2 = _interopRequireDefault(_promise);

exports.retry = retry;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function retry(fn) {
    var times = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 100;
    var delay = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 200;

    return new _promise2.default(function (resolve, reject) {
        var error;
        var attempt = function attempt() {
            if (times == 0) {
                reject(error);
            } else {
                fn().then(resolve).catch(function (e) {
                    times--;
                    error = e;
                    setTimeout(function () {
                        attempt();
                    }, delay);
                });
            }
        };
        attempt();
    });
};


/***/ }),

/***/ 9545:
/***/ (function(__unused_webpack_module, exports) {

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

exports.__esModule = true;
exports["default"] = pluginEntryManager;
exports.createPluginEntry = pluginEntryManager.createPluginEntry;
exports.getCtx = pluginEntryManager.getCtx;



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
/******/ 	var __webpack_exports__ = __webpack_require__(7282);
/******/ 	wmbundle = __webpack_exports__;
/******/ 	
/******/ })()
;
/* WalkMe Module */ return wmbundle; })
//# sourceMappingURL=bundle.js.map
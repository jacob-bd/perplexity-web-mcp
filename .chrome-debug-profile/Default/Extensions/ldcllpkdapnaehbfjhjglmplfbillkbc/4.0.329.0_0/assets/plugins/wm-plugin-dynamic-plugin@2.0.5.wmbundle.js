/* WalkMe Module */ typeof _walkmeInternals !== 'undefined' && _walkmeInternals.wmloader && _walkmeInternals.wmloader.define('wm-plugin-dynamic-plugin@2.0.5@prelib', {"name":"wm-plugin-dynamic-plugin","version":"2.0.5","toolbelt":"2.0.2","packageDate":"2025-03-31T13:36:03.602Z","entry":"prelib"}, function (__wmplugin__) {  
var wmbundle;
/******/ (function() { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 6098:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

module.exports = __webpack_require__(4625);



/***/ }),

/***/ 5830:
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

module.exports = __webpack_require__(3765);

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

/***/ 3765:
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

/***/ 4121:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

module.exports = { "default": __webpack_require__(3662), __esModule: true };


/***/ }),

/***/ 5228:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

module.exports = { "default": __webpack_require__(4831), __esModule: true };


/***/ }),

/***/ 613:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

module.exports = { "default": __webpack_require__(6030), __esModule: true };


/***/ }),

/***/ 7394:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

module.exports = { "default": __webpack_require__(5792), __esModule: true };


/***/ }),

/***/ 7063:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

module.exports = { "default": __webpack_require__(8908), __esModule: true };


/***/ }),

/***/ 9076:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

"use strict";

exports.__esModule = true;

var _promise = __webpack_require__(613);

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

/***/ 9351:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

"use strict";

exports.__esModule = true;

var _iterator = __webpack_require__(7063);

var _iterator2 = _interopRequireDefault(_iterator);

var _symbol = __webpack_require__(7394);

var _symbol2 = _interopRequireDefault(_symbol);

var _typeof = typeof _symbol2.default === "function" && typeof _iterator2.default === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports["default"] = typeof _symbol2.default === "function" && _typeof(_iterator2.default) === "symbol" ? function (obj) {
  return typeof obj === "undefined" ? "undefined" : _typeof(obj);
} : function (obj) {
  return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof(obj);
};


/***/ }),

/***/ 7999:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

module.exports = __webpack_require__(5830);



/***/ }),

/***/ 570:
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
        _this._logsIoSender = __webpack_require__(3115)(ctx);
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

/***/ 3662:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

__webpack_require__(894);
module.exports = __webpack_require__(2006).Object.assign;



/***/ }),

/***/ 4831:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

__webpack_require__(5199);
module.exports = __webpack_require__(2006).Object.keys;



/***/ }),

/***/ 6030:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

__webpack_require__(2642);
__webpack_require__(2055);
__webpack_require__(8538);
__webpack_require__(2157);
__webpack_require__(6831);
__webpack_require__(4473);
module.exports = __webpack_require__(2006).Promise;



/***/ }),

/***/ 5792:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

__webpack_require__(4314);
__webpack_require__(2642);
__webpack_require__(9308);
__webpack_require__(620);
module.exports = __webpack_require__(2006).Symbol;



/***/ }),

/***/ 8908:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

__webpack_require__(2055);
__webpack_require__(8538);
module.exports = (__webpack_require__(3264).f)('iterator');



/***/ }),

/***/ 6147:
/***/ (function(module) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

module.exports = function (it) {
  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
  return it;
};



/***/ }),

/***/ 6752:
/***/ (function(module) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

module.exports = function () { /* empty */ };



/***/ }),

/***/ 7200:
/***/ (function(module) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

module.exports = function (it, Constructor, name, forbiddenField) {
  if (!(it instanceof Constructor) || (forbiddenField !== undefined && forbiddenField in it)) {
    throw TypeError(name + ': incorrect invocation!');
  } return it;
};



/***/ }),

/***/ 9148:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

var isObject = __webpack_require__(9089);
module.exports = function (it) {
  if (!isObject(it)) throw TypeError(it + ' is not an object!');
  return it;
};



/***/ }),

/***/ 2800:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

// false -> Array#indexOf
// true  -> Array#includes
var toIObject = __webpack_require__(6061);
var toLength = __webpack_require__(4869);
var toAbsoluteIndex = __webpack_require__(6645);
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

/***/ 3896:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

// getting tag from 19.1.3.6 Object.prototype.toString()
var cof = __webpack_require__(5289);
var TAG = __webpack_require__(2126)('toStringTag');
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

/***/ 5289:
/***/ (function(module) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

var toString = {}.toString;

module.exports = function (it) {
  return toString.call(it).slice(8, -1);
};



/***/ }),

/***/ 2006:
/***/ (function(module) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

var core = module.exports = { version: '2.5.5' };
if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef



/***/ }),

/***/ 4372:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

// optional / simple context binding
var aFunction = __webpack_require__(6147);
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

/***/ 184:
/***/ (function(module) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

// 7.2.1 RequireObjectCoercible(argument)
module.exports = function (it) {
  if (it == undefined) throw TypeError("Can't call method on  " + it);
  return it;
};



/***/ }),

/***/ 2587:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

// Thank's IE8 for his funny defineProperty
module.exports = !__webpack_require__(9248)(function () {
  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
});



/***/ }),

/***/ 4730:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

var isObject = __webpack_require__(9089);
var document = (__webpack_require__(2254).document);
// typeof document.createElement is 'object' in old IE
var is = isObject(document) && isObject(document.createElement);
module.exports = function (it) {
  return is ? document.createElement(it) : {};
};



/***/ }),

/***/ 1060:
/***/ (function(module) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

// IE 8- don't enum bug keys
module.exports = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');



/***/ }),

/***/ 1161:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

// all enumerable object keys, includes symbols
var getKeys = __webpack_require__(8679);
var gOPS = __webpack_require__(4188);
var pIE = __webpack_require__(1145);
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

/***/ 4119:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

var global = __webpack_require__(2254);
var core = __webpack_require__(2006);
var ctx = __webpack_require__(4372);
var hide = __webpack_require__(4597);
var has = __webpack_require__(1029);
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

/***/ 9248:
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

/***/ 1422:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

var ctx = __webpack_require__(4372);
var call = __webpack_require__(2592);
var isArrayIter = __webpack_require__(2284);
var anObject = __webpack_require__(9148);
var toLength = __webpack_require__(4869);
var getIterFn = __webpack_require__(8258);
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

/***/ 2254:
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

/***/ 1029:
/***/ (function(module) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

var hasOwnProperty = {}.hasOwnProperty;
module.exports = function (it, key) {
  return hasOwnProperty.call(it, key);
};



/***/ }),

/***/ 4597:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

var dP = __webpack_require__(3111);
var createDesc = __webpack_require__(5716);
module.exports = __webpack_require__(2587) ? function (object, key, value) {
  return dP.f(object, key, createDesc(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};



/***/ }),

/***/ 8180:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

var document = (__webpack_require__(2254).document);
module.exports = document && document.documentElement;



/***/ }),

/***/ 836:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

module.exports = !__webpack_require__(2587) && !__webpack_require__(9248)(function () {
  return Object.defineProperty(__webpack_require__(4730)('div'), 'a', { get: function () { return 7; } }).a != 7;
});



/***/ }),

/***/ 6293:
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

/***/ 5929:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = __webpack_require__(5289);
// eslint-disable-next-line no-prototype-builtins
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
  return cof(it) == 'String' ? it.split('') : Object(it);
};



/***/ }),

/***/ 2284:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

// check on default Array iterator
var Iterators = __webpack_require__(8546);
var ITERATOR = __webpack_require__(2126)('iterator');
var ArrayProto = Array.prototype;

module.exports = function (it) {
  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
};



/***/ }),

/***/ 181:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

// 7.2.2 IsArray(argument)
var cof = __webpack_require__(5289);
module.exports = Array.isArray || function isArray(arg) {
  return cof(arg) == 'Array';
};



/***/ }),

/***/ 9089:
/***/ (function(module) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

module.exports = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};



/***/ }),

/***/ 2592:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

// call something on iterator step with safe closing on error
var anObject = __webpack_require__(9148);
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

/***/ 2616:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

'use strict';
var create = __webpack_require__(1543);
var descriptor = __webpack_require__(5716);
var setToStringTag = __webpack_require__(5084);
var IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
__webpack_require__(4597)(IteratorPrototype, __webpack_require__(2126)('iterator'), function () { return this; });

module.exports = function (Constructor, NAME, next) {
  Constructor.prototype = create(IteratorPrototype, { next: descriptor(1, next) });
  setToStringTag(Constructor, NAME + ' Iterator');
};



/***/ }),

/***/ 3207:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

'use strict';
var LIBRARY = __webpack_require__(3670);
var $export = __webpack_require__(4119);
var redefine = __webpack_require__(6051);
var hide = __webpack_require__(4597);
var Iterators = __webpack_require__(8546);
var $iterCreate = __webpack_require__(2616);
var setToStringTag = __webpack_require__(5084);
var getPrototypeOf = __webpack_require__(7051);
var ITERATOR = __webpack_require__(2126)('iterator');
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

/***/ 2267:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

var ITERATOR = __webpack_require__(2126)('iterator');
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

/***/ 8658:
/***/ (function(module) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

module.exports = function (done, value) {
  return { value: value, done: !!done };
};



/***/ }),

/***/ 8546:
/***/ (function(module) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

module.exports = {};



/***/ }),

/***/ 3670:
/***/ (function(module) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

module.exports = true;



/***/ }),

/***/ 740:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

var META = __webpack_require__(1063)('meta');
var isObject = __webpack_require__(9089);
var has = __webpack_require__(1029);
var setDesc = (__webpack_require__(3111).f);
var id = 0;
var isExtensible = Object.isExtensible || function () {
  return true;
};
var FREEZE = !__webpack_require__(9248)(function () {
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

/***/ 8480:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

var global = __webpack_require__(2254);
var macrotask = (__webpack_require__(3604).set);
var Observer = global.MutationObserver || global.WebKitMutationObserver;
var process = global.process;
var Promise = global.Promise;
var isNode = __webpack_require__(5289)(process) == 'process';

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

/***/ 5194:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

'use strict';
// 25.4.1.5 NewPromiseCapability(C)
var aFunction = __webpack_require__(6147);

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

/***/ 6310:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

'use strict';
// 19.1.2.1 Object.assign(target, source, ...)
var getKeys = __webpack_require__(8679);
var gOPS = __webpack_require__(4188);
var pIE = __webpack_require__(1145);
var toObject = __webpack_require__(4646);
var IObject = __webpack_require__(5929);
var $assign = Object.assign;

// should work with symbols and should have deterministic property order (V8 bug)
module.exports = !$assign || __webpack_require__(9248)(function () {
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

/***/ 1543:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
var anObject = __webpack_require__(9148);
var dPs = __webpack_require__(1010);
var enumBugKeys = __webpack_require__(1060);
var IE_PROTO = __webpack_require__(5494)('IE_PROTO');
var Empty = function () { /* empty */ };
var PROTOTYPE = 'prototype';

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var createDict = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = __webpack_require__(4730)('iframe');
  var i = enumBugKeys.length;
  var lt = '<';
  var gt = '>';
  var iframeDocument;
  iframe.style.display = 'none';
  (__webpack_require__(8180).appendChild)(iframe);
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

/***/ 3111:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

var anObject = __webpack_require__(9148);
var IE8_DOM_DEFINE = __webpack_require__(836);
var toPrimitive = __webpack_require__(1488);
var dP = Object.defineProperty;

exports.f = __webpack_require__(2587) ? Object.defineProperty : function defineProperty(O, P, Attributes) {
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

/***/ 1010:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

var dP = __webpack_require__(3111);
var anObject = __webpack_require__(9148);
var getKeys = __webpack_require__(8679);

module.exports = __webpack_require__(2587) ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject(O);
  var keys = getKeys(Properties);
  var length = keys.length;
  var i = 0;
  var P;
  while (length > i) dP.f(O, P = keys[i++], Properties[P]);
  return O;
};



/***/ }),

/***/ 5401:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

var pIE = __webpack_require__(1145);
var createDesc = __webpack_require__(5716);
var toIObject = __webpack_require__(6061);
var toPrimitive = __webpack_require__(1488);
var has = __webpack_require__(1029);
var IE8_DOM_DEFINE = __webpack_require__(836);
var gOPD = Object.getOwnPropertyDescriptor;

exports.f = __webpack_require__(2587) ? gOPD : function getOwnPropertyDescriptor(O, P) {
  O = toIObject(O);
  P = toPrimitive(P, true);
  if (IE8_DOM_DEFINE) try {
    return gOPD(O, P);
  } catch (e) { /* empty */ }
  if (has(O, P)) return createDesc(!pIE.f.call(O, P), O[P]);
};



/***/ }),

/***/ 6933:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
var toIObject = __webpack_require__(6061);
var gOPN = (__webpack_require__(6111).f);
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

/***/ 6111:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
var $keys = __webpack_require__(8633);
var hiddenKeys = (__webpack_require__(1060).concat)('length', 'prototype');

exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return $keys(O, hiddenKeys);
};



/***/ }),

/***/ 4188:
/***/ (function(__unused_webpack_module, exports) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

exports.f = Object.getOwnPropertySymbols;



/***/ }),

/***/ 7051:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
var has = __webpack_require__(1029);
var toObject = __webpack_require__(4646);
var IE_PROTO = __webpack_require__(5494)('IE_PROTO');
var ObjectProto = Object.prototype;

module.exports = Object.getPrototypeOf || function (O) {
  O = toObject(O);
  if (has(O, IE_PROTO)) return O[IE_PROTO];
  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectProto : null;
};



/***/ }),

/***/ 8633:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

var has = __webpack_require__(1029);
var toIObject = __webpack_require__(6061);
var arrayIndexOf = __webpack_require__(2800)(false);
var IE_PROTO = __webpack_require__(5494)('IE_PROTO');

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

/***/ 8679:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var $keys = __webpack_require__(8633);
var enumBugKeys = __webpack_require__(1060);

module.exports = Object.keys || function keys(O) {
  return $keys(O, enumBugKeys);
};



/***/ }),

/***/ 1145:
/***/ (function(__unused_webpack_module, exports) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

exports.f = {}.propertyIsEnumerable;



/***/ }),

/***/ 8259:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

// most Object methods by ES6 should accept primitives
var $export = __webpack_require__(4119);
var core = __webpack_require__(2006);
var fails = __webpack_require__(9248);
module.exports = function (KEY, exec) {
  var fn = (core.Object || {})[KEY] || Object[KEY];
  var exp = {};
  exp[KEY] = exec(fn);
  $export($export.S + $export.F * fails(function () { fn(1); }), 'Object', exp);
};



/***/ }),

/***/ 632:
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

/***/ 1661:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

var anObject = __webpack_require__(9148);
var isObject = __webpack_require__(9089);
var newPromiseCapability = __webpack_require__(5194);

module.exports = function (C, x) {
  anObject(C);
  if (isObject(x) && x.constructor === C) return x;
  var promiseCapability = newPromiseCapability.f(C);
  var resolve = promiseCapability.resolve;
  resolve(x);
  return promiseCapability.promise;
};



/***/ }),

/***/ 5716:
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

/***/ 1689:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

var hide = __webpack_require__(4597);
module.exports = function (target, src, safe) {
  for (var key in src) {
    if (safe && target[key]) target[key] = src[key];
    else hide(target, key, src[key]);
  } return target;
};



/***/ }),

/***/ 6051:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

module.exports = __webpack_require__(4597);



/***/ }),

/***/ 9642:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

'use strict';
var global = __webpack_require__(2254);
var core = __webpack_require__(2006);
var dP = __webpack_require__(3111);
var DESCRIPTORS = __webpack_require__(2587);
var SPECIES = __webpack_require__(2126)('species');

module.exports = function (KEY) {
  var C = typeof core[KEY] == 'function' ? core[KEY] : global[KEY];
  if (DESCRIPTORS && C && !C[SPECIES]) dP.f(C, SPECIES, {
    configurable: true,
    get: function () { return this; }
  });
};



/***/ }),

/***/ 5084:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

var def = (__webpack_require__(3111).f);
var has = __webpack_require__(1029);
var TAG = __webpack_require__(2126)('toStringTag');

module.exports = function (it, tag, stat) {
  if (it && !has(it = stat ? it : it.prototype, TAG)) def(it, TAG, { configurable: true, value: tag });
};



/***/ }),

/***/ 5494:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

var shared = __webpack_require__(1892)('keys');
var uid = __webpack_require__(1063);
module.exports = function (key) {
  return shared[key] || (shared[key] = uid(key));
};



/***/ }),

/***/ 1892:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

var global = __webpack_require__(2254);
var _walkmeInternals = global._walkmeInternals || (global._walkmeInternals = {});
var store  = _walkmeInternals.coreJsShared || (_walkmeInternals.coreJsShared = {});
module.exports = function (key) {
  return store[key] || (store[key] = {});
};



/***/ }),

/***/ 9278:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

// 7.3.20 SpeciesConstructor(O, defaultConstructor)
var anObject = __webpack_require__(9148);
var aFunction = __webpack_require__(6147);
var SPECIES = __webpack_require__(2126)('species');
module.exports = function (O, D) {
  var C = anObject(O).constructor;
  var S;
  return C === undefined || (S = anObject(C)[SPECIES]) == undefined ? D : aFunction(S);
};



/***/ }),

/***/ 7860:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

var toInteger = __webpack_require__(311);
var defined = __webpack_require__(184);
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

/***/ 3604:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

var ctx = __webpack_require__(4372);
var invoke = __webpack_require__(6293);
var html = __webpack_require__(8180);
var cel = __webpack_require__(4730);
var global = __webpack_require__(2254);
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
  if (__webpack_require__(5289)(process) == 'process') {
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

/***/ 6645:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

var toInteger = __webpack_require__(311);
var max = Math.max;
var min = Math.min;
module.exports = function (index, length) {
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};



/***/ }),

/***/ 311:
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

/***/ 6061:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = __webpack_require__(5929);
var defined = __webpack_require__(184);
module.exports = function (it) {
  return IObject(defined(it));
};



/***/ }),

/***/ 4869:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

// 7.1.15 ToLength
var toInteger = __webpack_require__(311);
var min = Math.min;
module.exports = function (it) {
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};



/***/ }),

/***/ 4646:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

// 7.1.13 ToObject(argument)
var defined = __webpack_require__(184);
module.exports = function (it) {
  return Object(defined(it));
};



/***/ }),

/***/ 1488:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = __webpack_require__(9089);
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

/***/ 1063:
/***/ (function(module) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

var id = 0;
var px = Math.random();
module.exports = function (key) {
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};



/***/ }),

/***/ 8744:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

var global = __webpack_require__(2254);
var core = __webpack_require__(2006);
var LIBRARY = __webpack_require__(3670);
var wksExt = __webpack_require__(3264);
var defineProperty = (__webpack_require__(3111).f);
module.exports = function (name) {
  var $Symbol = core.Symbol || (core.Symbol = LIBRARY ? {} : global.Symbol || {});
  if (name.charAt(0) != '_' && !(name in $Symbol)) defineProperty($Symbol, name, { value: wksExt.f(name) });
};



/***/ }),

/***/ 3264:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

exports.f = __webpack_require__(2126);



/***/ }),

/***/ 2126:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

var store = __webpack_require__(1892)('wks');
var uid = __webpack_require__(1063);
var Symbol = (__webpack_require__(2254).Symbol);
var USE_SYMBOL = typeof Symbol == 'function';

var $exports = module.exports = function (name) {
  return store[name] || (store[name] =
    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
};

$exports.store = store;



/***/ }),

/***/ 8258:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

var classof = __webpack_require__(3896);
var ITERATOR = __webpack_require__(2126)('iterator');
var Iterators = __webpack_require__(8546);
module.exports = (__webpack_require__(2006).getIteratorMethod) = function (it) {
  if (it != undefined) return it[ITERATOR]
    || it['@@iterator']
    || Iterators[classof(it)];
};



/***/ }),

/***/ 6021:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

'use strict';
var addToUnscopables = __webpack_require__(6752);
var step = __webpack_require__(8658);
var Iterators = __webpack_require__(8546);
var toIObject = __webpack_require__(6061);

// 22.1.3.4 Array.prototype.entries()
// 22.1.3.13 Array.prototype.keys()
// 22.1.3.29 Array.prototype.values()
// 22.1.3.30 Array.prototype[@@iterator]()
module.exports = __webpack_require__(3207)(Array, 'Array', function (iterated, kind) {
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

/***/ 894:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

// 19.1.3.1 Object.assign(target, source)
var $export = __webpack_require__(4119);

$export($export.S + $export.F, 'Object', { assign: __webpack_require__(6310) });



/***/ }),

/***/ 5199:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

// 19.1.2.14 Object.keys(O)
var toObject = __webpack_require__(4646);
var $keys = __webpack_require__(8679);

__webpack_require__(8259)('keys', function () {
  return function keys(it) {
    return $keys(toObject(it));
  };
});



/***/ }),

/***/ 2642:
/***/ (function() {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */




/***/ }),

/***/ 2157:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

'use strict';
var LIBRARY = __webpack_require__(3670);
var global = __webpack_require__(2254);
var ctx = __webpack_require__(4372);
var classof = __webpack_require__(3896);
var $export = __webpack_require__(4119);
var isObject = __webpack_require__(9089);
var aFunction = __webpack_require__(6147);
var anInstance = __webpack_require__(7200);
var forOf = __webpack_require__(1422);
var speciesConstructor = __webpack_require__(9278);
var task = (__webpack_require__(3604).set);
var microtask = __webpack_require__(8480)();
var newPromiseCapabilityModule = __webpack_require__(5194);
var perform = __webpack_require__(632);
var promiseResolve = __webpack_require__(1661);
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
    var FakePromise = (promise.constructor = {})[__webpack_require__(2126)('species')] = function (exec) {
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
  Internal.prototype = __webpack_require__(1689)($Promise.prototype, {
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
__webpack_require__(5084)($Promise, PROMISE);
__webpack_require__(9642)(PROMISE);
Wrapper = __webpack_require__(2006)[PROMISE];

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
$export($export.S + $export.F * !(USE_NATIVE && __webpack_require__(2267)(function (iter) {
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

/***/ 2055:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

'use strict';
var $at = __webpack_require__(7860)(true);

// 21.1.3.27 String.prototype[@@iterator]()
__webpack_require__(3207)(String, 'String', function (iterated) {
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

/***/ 4314:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

'use strict';
// ECMAScript 6 symbols shim
var global = __webpack_require__(2254);
var has = __webpack_require__(1029);
var DESCRIPTORS = __webpack_require__(2587);
var $export = __webpack_require__(4119);
var redefine = __webpack_require__(6051);
var META = (__webpack_require__(740).KEY);
var $fails = __webpack_require__(9248);
var shared = __webpack_require__(1892);
var setToStringTag = __webpack_require__(5084);
var uid = __webpack_require__(1063);
var wks = __webpack_require__(2126);
var wksExt = __webpack_require__(3264);
var wksDefine = __webpack_require__(8744);
var enumKeys = __webpack_require__(1161);
var isArray = __webpack_require__(181);
var anObject = __webpack_require__(9148);
var isObject = __webpack_require__(9089);
var toIObject = __webpack_require__(6061);
var toPrimitive = __webpack_require__(1488);
var createDesc = __webpack_require__(5716);
var _create = __webpack_require__(1543);
var gOPNExt = __webpack_require__(6933);
var $GOPD = __webpack_require__(5401);
var $DP = __webpack_require__(3111);
var $keys = __webpack_require__(8679);
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
  (__webpack_require__(6111).f) = gOPNExt.f = $getOwnPropertyNames;
  (__webpack_require__(1145).f) = $propertyIsEnumerable;
  (__webpack_require__(4188).f) = $getOwnPropertySymbols;

  if (DESCRIPTORS && !__webpack_require__(3670)) {
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
$Symbol[PROTOTYPE][TO_PRIMITIVE] || __webpack_require__(4597)($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
// 19.4.3.5 Symbol.prototype[@@toStringTag]
setToStringTag($Symbol, 'Symbol');
// 20.2.1.9 Math[@@toStringTag]
setToStringTag(Math, 'Math', true);
// 24.3.3 JSON[@@toStringTag]
setToStringTag(global.JSON, 'JSON', true);



/***/ }),

/***/ 6831:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

// https://github.com/tc39/proposal-promise-finally
'use strict';
var $export = __webpack_require__(4119);
var core = __webpack_require__(2006);
var global = __webpack_require__(2254);
var speciesConstructor = __webpack_require__(9278);
var promiseResolve = __webpack_require__(1661);

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

/***/ 4473:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

'use strict';
// https://github.com/tc39/proposal-promise-try
var $export = __webpack_require__(4119);
var newPromiseCapability = __webpack_require__(5194);
var perform = __webpack_require__(632);

$export($export.S, 'Promise', { 'try': function (callbackfn) {
  var promiseCapability = newPromiseCapability.f(this);
  var result = perform(callbackfn);
  (result.e ? promiseCapability.reject : promiseCapability.resolve)(result.v);
  return promiseCapability.promise;
} });



/***/ }),

/***/ 9308:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

__webpack_require__(8744)('asyncIterator');



/***/ }),

/***/ 620:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

__webpack_require__(8744)('observable');



/***/ }),

/***/ 8538:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

__webpack_require__(6021);
var global = __webpack_require__(2254);
var hide = __webpack_require__(4597);
var Iterators = __webpack_require__(8546);
var TO_STRING_TAG = __webpack_require__(2126)('toStringTag');

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

/***/ 3115:
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

/***/ 3663:
/***/ (function(module) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

var PauseLibAfterStorage = (function () {
    function PauseLibAfterStorage(ctx) {
        this.DEFAULT_EVENT = 'DataLoadedEvent';
        this._ctx = ctx;
        this._promiseManager = this._ctx.get('PromiseManager');
        this._eventsListener = this._ctx.get('EventsListener');
        this._eventsTrigger = this._ctx.get('EventsTrigger');
        this._logger = this._ctx.get('PrelibLogger');
        this._eventListeners = {};
    }
    PauseLibAfterStorage.prototype.registerFunction = function (eventNameOrFuncParameter, funcParameter) {
        var eventName;
        var func;
        if (typeof eventNameOrFuncParameter == 'string') {
            eventName = eventNameOrFuncParameter.toString();
            func = funcParameter;
        }
        else {
            eventName = this.DEFAULT_EVENT;
            func = eventNameOrFuncParameter;
        }
        this.addEventListener(eventName);
        this._eventListeners[eventName].push(func);
    };
    PauseLibAfterStorage.prototype.registerEventListener = function (eventName) {
        if (typeof eventName != 'string') {
            eventName = this.DEFAULT_EVENT;
        }
        this.addEventListener(eventName);
    };
    PauseLibAfterStorage.prototype.getSiteConfig = function () {
        if (!this._siteConfig) {
            this._siteConfig = this._ctx.get('SiteConfigManager').get();
        }
    };
    PauseLibAfterStorage.prototype.generatePromise = function (eventName) {
        var promisesArray = [];
        var eventListeners = this._eventListeners[eventName];
        for (var i = 0; i < eventListeners.length; i++) {
            var result = eventListeners[i](this._siteConfig);
            if (result) {
                promisesArray.push(result);
            }
        }
        return this._promiseManager.all(promisesArray);
    };
    PauseLibAfterStorage.prototype.addEventListener = function (eventName) {
        var _this = this;
        if (!this._eventListeners[eventName]) {
            this._eventListeners[eventName] = [];
            this._eventsListener.on(eventName, function () {
                _this.getSiteConfig();
                return _this.generatePromise(eventName);
            });
        }
    };
    return PauseLibAfterStorage;
}());
;
var pauseLibAfterStorageInstance;
module.exports = function (ctx) {
    if (pauseLibAfterStorageInstance) {
        return pauseLibAfterStorageInstance;
    }
    else {
        pauseLibAfterStorageInstance = new PauseLibAfterStorage(ctx);
        return pauseLibAfterStorageInstance;
    }
};



/***/ }),

/***/ 9369:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

'use strict';

exports.__esModule = true;
exports.enhanceAutoTextSteps = enhanceAutoTextSteps;

var _logger = __webpack_require__(7334);

var _ctx = __webpack_require__(1407);

var selectorArray = ['[data-id="quickCreateRoot"]', '[data-id="editFormRoot"]']; // Array of selectors        

function enhanceAutoTextSteps(_config) {
    if (!_config) {
        (0, _logger.log)('Auto-text enhancer: Config not available');
        return;
    }
    var featuresManager = _ctx.ctx.get('FeaturesManager');
    if (!featuresManager.isFeatureEnabled("nativeTextInjector")) {
        (0, _logger.log)('Auto-text enhancer: nativeTextInjector feature is not enabled. Skipping.');
        return;
    }

    if (_config.enhanceAutoTextSteps.toLowerCase() !== "false") {
        (0, _logger.log)('Auto-text enhancer: Enhancing the auto-text function for d365 quickCreate dialogs');
        var InputGenerator = _ctx.ctx.get('InputGenerator');
        var originalText = InputGenerator.text;
        var originalRemoveText = InputGenerator.removeText;

        InputGenerator.text = function text(element, txt, reactionTime, callback, step, keepFocus, shouldSubmitInput) {
            var hasMatchingParent = selectorArray.some(function (selector) {
                return element.closest(selector).length > 0;
            });
            originalText(element, txt, reactionTime, callback, step, keepFocus, shouldSubmitInput);

            if (hasMatchingParent) {
                InputGenerator.focus(element);
                dispatchEvent(element, 'blur');
            }
        };

        InputGenerator.removeText = function removeText(element, callback) {
            var hasMatchingParent = selectorArray.some(function (selector) {
                return element.closest(selector).length > 0;
            });

            if (hasMatchingParent) {
                originalText(element, "", 100, callback);
                InputGenerator.focus(element);
                dispatchEvent(element, 'blur');
            } else {
                originalRemoveText(element, callback);
            }
        };
    } else {
        (0, _logger.log)('Auto-text enhancer: Disabled via config.');
    }
}


/***/ }),

/***/ 6240:
/***/ (function(__unused_webpack_module, exports) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

'use strict';

exports.__esModule = true;
var PLUGIN_NAME = exports.PLUGIN_NAME = 'DynamicsPlugin';
var CACHE_TIME = exports.CACHE_TIME = 60 * 60 * 24; // 24 hours
var ONCE_STORAGE_LOADED = exports.ONCE_STORAGE_LOADED = 'BeforeStorageLoadedCallback';
var DATA_LOADED = exports.DATA_LOADED = 'DataLoadedEvent';


/***/ }),

/***/ 1407:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

'use strict';

exports.__esModule = true;
exports.userCtx = exports.platformCtx = exports.ctx = undefined;

var _wmPrelibPluginEntryManager = __webpack_require__(5945);

var ctx = exports.ctx = (0, _wmPrelibPluginEntryManager.getCtx)();
var platformCtx = exports.platformCtx = {
    dynApp: '',
    dynVer: '',
    dynLang: ''
};
var userCtx = exports.userCtx = {};


/***/ }),

/***/ 3344:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

'use strict';

exports.__esModule = true;
exports.initCustomDateFormat = undefined;

var _regenerator = __webpack_require__(7999);

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = __webpack_require__(9076);

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var initCustomDateFormat = exports.initCustomDateFormat = function () {
    var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
        var datePattern;
        return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        if (!_ctx.ctx.get('FeaturesManager').isFeatureEnabled(FF_NAME)) {
                            _context.next = 15;
                            break;
                        }

                        datePattern = void 0;
                        _context.prev = 2;

                        datePattern = window['Xrm'].Utility.getGlobalContext().userSettings.dateFormattingInfo.ShortDatePattern;
                        (0, _logger.log)('Dynamics date pattern retrieved from site');
                        _context.next = 11;
                        break;

                    case 7:
                        _context.prev = 7;
                        _context.t0 = _context['catch'](2);

                        (0, _logger.log)('Dynamics date pattern not detected');
                        return _context.abrupt('return');

                    case 11:
                        if (validateDateFormat(datePattern)) {
                            _context.next = 14;
                            break;
                        }

                        (0, _logger.log)('Dynamics date pattern is invalid');
                        return _context.abrupt('return');

                    case 14:

                        // see player:components/packages/conditions/LogicRule/src/logicRule.ts@convertToTimestamp
                        if (_ctx.ctx.has('PluginConfigurationOverrides')) {
                            _ctx.ctx.get('PluginConfigurationOverrides').set(PLUGIN_OVERRIDE_DATE_FORAMT_KEY, datePattern);
                            (0, _logger.log)('Dynamics date pattern set');
                        } else {
                            (0, _logger.log)('Dynamics date pattern could not be set, missing PluginConfigurationOverrides');
                        }

                    case 15:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, this, [[2, 7]]);
    }));

    return function initCustomDateFormat() {
        return _ref.apply(this, arguments);
    };
}();

var _ctx = __webpack_require__(1407);

var _logger = __webpack_require__(7334);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PLUGIN_OVERRIDE_DATE_FORAMT_KEY = 'logicRule.dateFormat';
var FF_NAME = 'dynamicsCustomDateFormat';

function validateDateFormat(datePattern) {
    return typeof datePattern === 'string';
}


/***/ }),

/***/ 8540:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

var __webpack_unused_export__;
/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

'use strict';

__webpack_unused_export__ = true;

var _regenerator = __webpack_require__(7999);

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = __webpack_require__(9076);

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

exports.D = DynamicPlugin;

var _ctx = __webpack_require__(1407);

var _utils = __webpack_require__(17);

var _logger = __webpack_require__(7334);

var _platformUserContext = __webpack_require__(9389);

var _autoTextSteps = __webpack_require__(9369);

var _mutations = __webpack_require__(670);

var _varsRetriever = __webpack_require__(3930);

var _customDateFormat = __webpack_require__(3344);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function DynamicPlugin() {
    var requiresStorageTasks = function () {
        var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
            var config;
            return _regenerator2.default.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            config = (__webpack_require__(6444)/* .config */ .$);

                            (0, _logger.log)('Config retrieved', config);
                            (0, _utils.decorateStorageDataGetter)();
                            (0, _autoTextSteps.enhanceAutoTextSteps)(config);
                            (0, _mutations.platformMutations)();
                            (0, _varsRetriever.setUserVarsFromStorage)();
                            _context.next = 8;
                            return getPlatformCtxPromise;

                        case 8:
                            _context.next = 10;
                            return (0, _varsRetriever.getUserVars)();

                        case 10:

                            //include a heartbeat log event for reporting
                            if (!window.wmPlaySnippet) {
                                (0, _logger.reportInfo)('Dynamics plugin done loading in ' + (0, _utils.getPluginElapsedTime)() + ' seconds.');
                            }

                        case 11:
                        case 'end':
                            return _context.stop();
                    }
                }
            }, _callee, this);
        }));

        return function requiresStorageTasks() {
            return _ref.apply(this, arguments);
        };
    }();

    var _this = this;
    var _eventsListener = _ctx.ctx.get('EventsListener');
    _this.run = run;
    var holdLib = __webpack_require__(3663)(_ctx.ctx);
    var getPlatformCtxPromise = void 0;

    function run() {
        (0, _utils.resetPluginTimer)();
        (0, _logger.log)("Dynamics plugin started.");
        if ((0, _utils.runningFromUnsupportedLocation)()) {
            (0, _logger.log)('Running from unsupported location ' + window.location + '. Plugin will not load.');
            return;
        }

        //Start the platform detector
        getPlatformCtxPromise = (0, _platformUserContext.startGetPlatformCtxAsync)();

        holdLib.registerFunction('WalkMeConfigFileLoaded', requiresStorageTasks);
        _eventsListener.once('AfterWalkmeLoaded', _customDateFormat.initCustomDateFormat);

        return null;
    }
}


/***/ }),

/***/ 4625:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

'use strict';

var _wmPrelibPluginEntryManager = __webpack_require__(5945);

module.exports = (0, _wmPrelibPluginEntryManager.createPluginEntry)(function (registerPlugin) {
	var DynamicPlugin = (__webpack_require__(8540)/* .DynamicPlugin */ .D);
	registerPlugin(new DynamicPlugin());
});


/***/ }),

/***/ 670:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

'use strict';

exports.__esModule = true;
exports.platformMutations = platformMutations;

var _logger = __webpack_require__(7334);

var _ctx = __webpack_require__(1407);

function platformMutations() {
    var platformMutationsConfig = {
        mutationObserver: {
            whitelist: [
            //generic
            {
                type: "childList",
                "target.tagName": "TITLE"
            },
            //d365
            {
                type: "childList",
                "nextSibling.id": ".*quickCreate|.*Dialog"
            }, {
                type: "attributes",
                attributeName: "data-pa-landmark-active-element",
                "target.tagName": "LI"
            },
            //finops
            {
                type: "attributes",
                "attributeName": "role",
                "target.role": "dialog"
            }, {
                type: "attributes",
                "attributeName": "aria-hidden",
                "target.id": ".*_panel.*"
            }]
        }
    };
    (0, _logger.log)("Injecting mutations config");

    _ctx.ctx.register('PlatformMutationsConfig').asInstance({
        get: function get() {
            return platformMutationsConfig;
        }
    });
}


/***/ }),

/***/ 9389:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

'use strict';

exports.__esModule = true;
exports.startGetPlatformCtxAsync = undefined;

var _typeof2 = __webpack_require__(9351);

var _typeof3 = _interopRequireDefault(_typeof2);

var _promise = __webpack_require__(613);

var _promise2 = _interopRequireDefault(_promise);

var _regenerator = __webpack_require__(7999);

var _regenerator2 = _interopRequireDefault(_regenerator);

var _assign = __webpack_require__(4121);

var _assign2 = _interopRequireDefault(_assign);

var _asyncToGenerator2 = __webpack_require__(9076);

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

            (0, _assign2.default)(_ctx.platformCtx, platformResult.platformCtx);
            (0, _logger.log)('Platform & user context identified in ' + (0, _utils.getPluginElapsedTime)() + ' seconds: ' + _ctx.platformCtx.dynApp, { platformCtx: _ctx.platformCtx, userCtx: _ctx.userCtx });

            (0, _assign2.default)(_ctx.userCtx, platformResult.userCtx);
            window["WalkMeDynamics"] = _ctx.userCtx;
            window["wmDynamicsId"] = _ctx.userCtx.userName;
            (0, _logger.log)('Setting wmDynamicsId to: ' + _ctx.userCtx.userName);
            _context.next = 15;
            break;

          case 12:
            _context.prev = 12;
            _context.t0 = _context['catch'](0);

            if (_context.t0 instanceof Error) {
              (0, _logger.reportError)(_context.t0, { source: 'getPlatformCtx' });
            } else {
              (0, _logger.log)('Failed to identify a known platform after ' + (0, _utils.getPluginElapsedTime)() + ' seconds.', _ctx.platformCtx);
              (0, _assign2.default)(_ctx.platformCtx, _context.t0.platformCtx);
            }

          case 15:
            _context.prev = 15;

            _ctx.platformCtx.deploymentMethod = getWalkmeDeploymentMethod().deploymentMethod;
            return _context.finish(15);

          case 18:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this, [[0, 12, 15, 18]]);
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
                if (platformResult.platformCtx.dynApp !== 'unknown') {
                  resolve(platformResult);
                } else {
                  (0, _logger.log)('Failed to identify a Dynamics environment, trying again');
                  reject(platformResult);
                }
              });
            }, 50, 200));

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

exports.setUserIdFromUserCtx = setUserIdFromUserCtx;

var _logger = __webpack_require__(7334);

var _ctx = __webpack_require__(1407);

var _utils = __webpack_require__(17);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function setUserIdFromUserCtx() {
  if (_ctx.userCtx.userName && _ctx.userCtx.userName !== '') {
    window["wmDynamicsId"] = _ctx.userCtx.userName;
    (0, _logger.log)('Dynamic User Name found. Setting wmDyanimcsId to: ' + _ctx.userCtx.userName);
  }
}

function detectPlatform() {
  var platformCtx = {};
  var userCtx = {};
  var fingerprint = {
    xrm: (0, _typeof3.default)(window['Xrm']) === 'object',
    xrmUtility: (0, _typeof3.default)(window['Xrm']) === 'object' && ((0, _typeof3.default)(window['Xrm'].Utility) === 'object' || typeof window['Xrm'].Utility === 'function') && typeof window['Xrm'].Utility.getGlobalContext === "function" && (0, _typeof3.default)(window['Xrm'].Utility.getGlobalContext().userSettings.roles) === "object",
    xrmPageContext: (0, _typeof3.default)(window['Xrm']) === 'object' && (0, _typeof3.default)(window['Xrm'].Page) === 'object',
    clientMajorVersion: typeof window['CLIENT_MAJOR_VERSION'] === 'number',
    dynamicsUrl: window.location.hostname.indexOf("dynamics.com") !== -1,
    dyn365finops: (0, _typeof3.default)(window['$dyn']) === 'object',
    dyn365finopsUser: (0, _typeof3.default)(window['$dyn']) === 'object' && typeof window['$dyn'].user().AppVersion() === 'string' && window['$dyn'].user().AppVersion() !== "" && typeof window['$dyn'].user().Language() === 'string' && window['$dyn'].user().Language() !== "",
    businessCentral: (0, _typeof3.default)(window['DN']) === 'object' || (0, _typeof3.default)(window['BC']) === 'object',
    o365shell: (0, _typeof3.default)(window['O365ShellContext']) == 'object' && (0, _typeof3.default)(window['O365ShellContext'].BootHeaderState) == 'object'
  };

  try {
    if (fingerprint.xrmUtility) {
      platformCtx = {
        dynApp: 'd365',
        dynVer: window['Xrm'].Utility.getGlobalContext().getVersion(),
        dynLang: window['Xrm'].Utility.getGlobalContext().userSettings.languageId,
        fingerprint: fingerprint
      };
      userCtx = {
        userName: window['Xrm'].Utility.getGlobalContext().userSettings.userName,
        userId: window['Xrm'].Utility.getGlobalContext().userSettings.userId
      };
    } else if (fingerprint.xrm && fingerprint.clientMajorVersion && !fingerprint.dynamicsUrl) {
      platformCtx = {
        dynApp: 'd365legacy',
        dynVer: window['Xrm'].Page.context.getVersion(),
        dynLang: window['Xrm'].Page.context.userSettings ? window['Xrm'].Page.context.userSettings.languageId : 'not_available',
        fingerprint: fingerprint
      };
      userCtx = {
        userName: window['Xrm'].Page.context.getUserName(),
        userId: window['Xrm'].Page.context.getUserId()
      };
    } else if (fingerprint.dyn365finops && fingerprint.dyn365finopsUser) {
      platformCtx = {
        dynApp: "finops",
        dynVer: window['$dyn'].user().AppVersion(),
        dynLang: window['$dyn'].user().Language(),
        fingerprint: fingerprint
      };
      userCtx = {
        userName: window['$dyn'].user().UserName(),
        userId: window['$dyn'].user().UserGuid(),
        userEmail: window['$dyn'].user().Alias()
      };
    } else if (fingerprint.businessCentral) {
      platformCtx = {
        dynApp: "businesscentral",
        dynVer: window['DN'] && window['DN'].ClientConfiguration.currentSettings.PlatformVersion || window['BC'] && window['BC'].ClientConfiguration.currentSettings.PlatformVersion,
        dynLang: window['DN'] && window['DN'].BrowserPageSession.instance._languageInfo.name || window['BC'] && window['BC'].ClientConfiguration.currentSettings.LanguageName,
        fingerprint: fingerprint
      };
      userCtx = {
        userName: window['O365ShellContext'].BootHeaderState.meDisplayName,
        userId: window['O365ShellContext'].BootHeaderState.userEmail,
        userEmail: window['O365ShellContext'].BootHeaderState.userEmail
      };
    } else {
      platformCtx = {
        dynApp: 'unknown',
        fingerprint: fingerprint
      };
    }
  } catch (error) {
    platformCtx = {
      dynApp: 'unknown',
      fingerprint: fingerprint,
      error: error.message
    };
  }

  return { platformCtx: platformCtx, userCtx: userCtx };
}

//function will identify if walkme is deployed via extension or via package and return
function getWalkmeDeploymentMethod() {
  switch (true) {
    case _ctx.ctx.has('IsInEditor') && _ctx.ctx.get('IsInEditor').get() == true:
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

/***/ 6444:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

var __webpack_unused_export__;
/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

'use strict';

__webpack_unused_export__ = true;
exports.$ = undefined;

var _settingsValuesRetriever = __webpack_require__(4283);

var config = exports.$ = {
	enhanceAutoTextSteps: (0, _settingsValuesRetriever.getSettingsValue)('enhanceAutoTextSteps', 'true')
};


/***/ }),

/***/ 7334:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

'use strict';

exports.__esModule = true;
exports.log = log;
exports.reportError = reportError;
exports.reportInfo = reportInfo;

var _consts = __webpack_require__(6240);

var _ctx = __webpack_require__(1407);

var _wmClientServerLogger = __webpack_require__(570);

var _wmClientServerLogger2 = _interopRequireDefault(_wmClientServerLogger);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var logger = _ctx.ctx.get('PrelibLogger');
var logSender = (0, _wmClientServerLogger2.default)(_ctx.ctx);
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
        platformDetails: _ctx.platformCtx,
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
        platformDetails: _ctx.platformCtx,
        level: 'info',
        logLevel: LOG_LEVEL.ALWAYS
    };

    logSender.sendLog({
        message: message,
        extraData: extraData
    });
}


/***/ }),

/***/ 4283:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

'use strict';

exports.__esModule = true;
exports.getSettingsValue = getSettingsValue;

var _ctx = __webpack_require__(1407);

function getSettingsValue(key, defaultValue) {
	if (!key) return defaultValue;

	var objectJpath = _ctx.ctx.get('ObjectJpath');
	var config = _ctx.ctx.get('SiteConfigManager').get().Custom;

	return objectJpath.getValue(config, 'dynamicsPlugin.' + key) || defaultValue;
};


/***/ }),

/***/ 17:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

'use strict';

exports.__esModule = true;

var _typeof2 = __webpack_require__(9351);

var _typeof3 = _interopRequireDefault(_typeof2);

var _keys = __webpack_require__(5228);

var _keys2 = _interopRequireDefault(_keys);

var _promise = __webpack_require__(613);

var _promise2 = _interopRequireDefault(_promise);

exports.resetPluginTimer = resetPluginTimer;
exports.getPluginElapsedTime = getPluginElapsedTime;
exports.runningFromUnsupportedLocation = runningFromUnsupportedLocation;
exports.storeToCache = storeToCache;
exports.getCachedData = getCachedData;
exports.retry = retry;
exports.decorateStorageDataGetter = decorateStorageDataGetter;

var _logger = __webpack_require__(7334);

var _consts = __webpack_require__(6240);

var _ctx = __webpack_require__(1407);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var pluginStartTime = void 0;
var DEPTH = 4;
var MAIN_KEY = 'WalkMeDynamics';
var USER_ROLES_KEY = 'wm-dynamics-user-roles';
var USER_ATTRIBUTES_KEY = 'wm-dynamics-user-attributes';

function resetPluginTimer() {
    pluginStartTime = new Date();
}

function getPluginElapsedTime() {
    return (new Date() - pluginStartTime) / 1000;
}

function runningFromUnsupportedLocation() {
    var unsupportedLocations = [window.location.pathname.indexOf('/uclient/blank.htm') > -1, window.location.href.toLowerCase().indexOf("crmmailapp") > -1, window.location.href.indexOf(getCdnName() + '/link') === 0];
    return unsupportedLocations.some(function (location) {
        return location;
    });
}

function storeToCache(data, key) {
    var commonUtils = _ctx.ctx.get('CommonUtils');
    var clientStorageManager = _ctx.ctx.get('ClientStorageManager');
    if (!data) return;

    removeNullValues(data, DEPTH);

    data = commonUtils.toJSON(data);
    clientStorageManager.saveData("wm-dynamics-" + key, data, _consts.CACHE_TIME);
}

function getCachedData(key) {
    var clientStorageManager = _ctx.ctx.get('ClientStorageManager');
    var data = clientStorageManager.getData("wm-dynamics-" + key);
    if (data) {
        return data;
    } else {
        (0, _logger.log)('Failed to retrieve ' + key + ' from storage');
        return;
    }
}

//retry set at 20 secs (mostly for business central)
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
}
function getCdnName() {
    var snippets = [window.wmSnippet, window.wmPlaySnippet, window.wmPreviewSnippet];
    for (var i = 0; i < snippets.length; i++) {
        if (snippets[i] && snippets[i].getSettingsFile()) {
            return snippets[i].getSettingsFile().CdnServerName;
        }
    }
}

function removeNullValues(data, depth) {
    var visited = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];

    if (visited.indexOf(data) !== -1) return;
    visited.push(data);

    var keys = (0, _keys2.default)(data);

    for (var i = 0; i < keys.length; i++) {
        var key = keys[i];

        if (data[key] === null) {
            delete data[key];
        }

        if ((0, _typeof3.default)(data[key]) === 'object' && depth > 0) {
            removeNullValues(data[key], --depth, visited);
        }
    }
}

function decorateStorageDataGetter() {
    var clientStorageManager = _ctx.ctx.get('ClientStorageManager');
    var originalGetData = clientStorageManager.getData;
    var commonUtils = _ctx.ctx.get('CommonUtils');

    var data = originalGetData.apply(this, ["wm-dynamics-" + MAIN_KEY]);
    if (data) {
        try {
            data = commonUtils.secureEvalJSON(data);
            clientStorageManager.removeData(USER_ROLES_KEY);
            clientStorageManager.removeData(USER_ATTRIBUTES_KEY);
        } catch (error) {
            (0, _logger.log)('Failed to parse ' + MAIN_KEY + ' from storage');
            return null;
        }
    }

    clientStorageManager.getData = function (key) {
        try {
            switch (key) {
                case USER_ROLES_KEY:
                    {
                        return data && data.WalkMeDynamics && data.WalkMeDynamics.userRolesIds && data.WalkMeDynamics.userRoles ? { roleIds: data.WalkMeDynamics.userRolesIds, roleName: data.WalkMeDynamics.userRoles } : null;
                    }
                case USER_ATTRIBUTES_KEY:
                    {
                        return data && data.WalkMeDynamics ? data.WalkMeDynamics.userAttributes : null;
                    }
            }
        } catch (error) {
            (0, _logger.log)('Failed to decorate storage for dynamics keys, using default as fallback');
        }

        return originalGetData.apply(this, arguments);
    };
}


/***/ }),

/***/ 3930:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

'use strict';

exports.__esModule = true;
exports.getUserVars = undefined;

var _keys = __webpack_require__(5228);

var _keys2 = _interopRequireDefault(_keys);

var _regenerator = __webpack_require__(7999);

var _regenerator2 = _interopRequireDefault(_regenerator);

var _promise = __webpack_require__(613);

var _promise2 = _interopRequireDefault(_promise);

var _assign = __webpack_require__(4121);

var _assign2 = _interopRequireDefault(_assign);

var _asyncToGenerator2 = __webpack_require__(9076);

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var getUserVars = exports.getUserVars = function () {
    var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
        var promiseArray, featuresManager, rolesRetriever, getLoggedInUserRolePromise, getLoggedInUserAttributePromise;
        return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        promiseArray = [];
                        featuresManager = _ctx.ctx.get('FeaturesManager');

                        if (featuresManager.isFeatureEnabled("dynamicUsersRole")) {
                            //if the platform context not identified as dynamics, don't attempt to get roles as APIs don't exist
                            if (['d365', 'd365legacy'].indexOf(_ctx.platformCtx.dynApp) === -1) {
                                (0, _logger.log)('Dynamics365 online or legacy application not detected, not getting roles');
                            } else {
                                rolesRetriever = void 0;

                                if (_ctx.platformCtx.dynApp === 'd365d365legacy') {
                                    rolesRetriever = getLoggedInUserRoleLegacy;
                                } else {
                                    rolesRetriever = getLoggedInUserRole;
                                }

                                getLoggedInUserRolePromise = rolesRetriever().then(function (Roles) {
                                    if (Roles) {
                                        window["walkmeUserRole"] = Roles[0];
                                        window["wmRoleIds"] = Roles[1];
                                        (0, _assign2.default)(_ctx.userCtx, { "userRoles": Roles[0], "userRolesIds": Roles[1] });
                                        window["WalkMeDynamics"] = _ctx.userCtx;
                                        (0, _logger.log)('Dynamics userRoles set');
                                    }
                                }).catch(function (reject) {
                                    (0, _logger.reportError)(reject, { source: 'getLoggedInUserRole' });
                                });

                                promiseArray.push(getLoggedInUserRolePromise);
                            }
                        }

                        if (featuresManager.isFeatureEnabled("dynamicUserAttributes")) {
                            //if the platform context not identified as dynamics, don't attempt to get attributes as APIs don't exist
                            if (['d365'].indexOf(_ctx.platformCtx.dynApp) === -1) {
                                (0, _logger.log)('Dynamics365 online application not detected, not getting attributes');
                            } else {
                                getLoggedInUserAttributePromise = getLoggedInUserAttributes().then(function (Attributes) {
                                    if (Attributes) {
                                        window["walkmeUserAttributes"] = Attributes;
                                        (0, _assign2.default)(_ctx.userCtx, { "userAttributes": Attributes });
                                        window["WalkMeDynamics"] = _ctx.userCtx;

                                        var teamsList = getUserTeamsList(Attributes);
                                        window["walkmeUserTeams"] = teamsList;
                                        (0, _assign2.default)(_ctx.userCtx, { "userTeams": teamsList });
                                        window["WalkMeDynamics"] = _ctx.userCtx;
                                        (0, _logger.log)('Dynamics user attributes set');
                                    }
                                }).catch(function (reject) {
                                    (0, _logger.reportError)(reject, { source: 'getLoggedInUserAttributes' });
                                });

                                promiseArray.push(getLoggedInUserAttributePromise);
                            }
                        }

                        _context.next = 6;
                        return _promise2.default.all(promiseArray);

                    case 6:

                        //cache the new vars values
                        (0, _utils.storeToCache)({
                            WalkMeDynamics: window["WalkMeDynamics"]
                        }, "WalkMeDynamics");

                        return _context.abrupt('return', true);

                    case 8:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, this);
    }));

    return function getUserVars() {
        return _ref.apply(this, arguments);
    };
}();

//*******Get LoggedIn User Role*********


exports.setUserVarsFromStorage = setUserVarsFromStorage;

var _logger = __webpack_require__(7334);

var _utils = __webpack_require__(17);

var _ctx = __webpack_require__(1407);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getLoggedInUserRole() {

    return new _promise2.default(function (resolve, reject) {

        //if the platform context identified as dynamics online, get roles using new supported APIs (which don't require a server call)
        if (_ctx.platformCtx.dynApp === 'd365') {
            (0, _logger.log)('Getting user roles from Dynamics app');
            var userRoles = window['Xrm'].Utility.getGlobalContext().userSettings.roles;
            if (userRoles) {
                var userRoleIds = (0, _keys2.default)(userRoles._collection).map(function (role) {
                    return userRoles._collection[role].id;
                });
                var userRoleNames = (0, _keys2.default)(userRoles._collection).map(function (role) {
                    return userRoles._collection[role].name;
                }).join();
                return resolve([userRoleNames, userRoleIds]);
            } else {
                return reject(new Error('Failed to get userSettings.roles in from getGlobalContext()'));
            }
        }
        //Use legacy/depreciated APIs only if platform context identified as legacy 8.0 customer
        if (_ctx.platformCtx.dynApp === 'd365legacy') {
            try {
                (0, _logger.log)('Getting user roles from Dynamics app using OData 4.0 call');
                var roleIds = window['Xrm'].Page.context.getUserRoles();
                var serverUrl = window['Xrm'].Page.context.getClientUrl();
                var odataSelect = serverUrl + "/api/data/v8.0/roles?$select=name&$filter=";

                wmjQuery(roleIds).each(function (i) {
                    odataSelect = odataSelect + "roleid eq (" + roleIds[i] + ") or ";
                });

                //remove the trailing " or "
                odataSelect = odataSelect.substring(0, odataSelect.length - 4);

                var roleName = "";
                wmjQuery.ajax({
                    type: "GET",
                    // TODO: Make this async so we won't get the website stuck
                    async: true,
                    contentType: "application/json; charset=utf-8",
                    datatype: "json",
                    url: odataSelect,
                    beforeSend: function beforeSend(XMLHttpRequest) {
                        XMLHttpRequest.setRequestHeader("Accept", "application/json");
                        XMLHttpRequest.setRequestHeader("OData-MaxVersion", "4.0");
                        XMLHttpRequest.setRequestHeader("OData-Version", "4.0");
                    },
                    success: function success(data, textStatus, XmlHttpRequest) {
                        if (data.value.length > 0) {
                            wmjQuery(data.value).each(function (i) {
                                roleName = roleName + "," + data.value[i].name;
                            });
                        }

                        //remove the leading ","
                        if (roleName.length > 0) roleName = roleName.substring(1, roleName.length);

                        return resolve([roleName, roleIds]);
                    },
                    error: function error(XmlHttpRequest, textStatus, errorThrown) {
                        return reject(new Error('Legacy OData Select Failed: ' + textStatus + errorThrown + odataSelect));
                    }
                });
            } catch (e) {
                return reject(new Error('Failed to fetch roleNames'));
            }
        }
    });
}

//*******Get LoggedIn User Role LEGACY D365*********
function getLoggedInUserRoleLegacy() {

    return new _promise2.default(function (resolve, reject) {

        //if the platform context identified as dynamics online, get roles using new supported APIs (which don't require a server call)
        if (_ctx.platformCtx.dynApp === 'd365') {
            (0, _logger.log)('Getting user roles from Dynamics app');
            var userRoles = window['Xrm'].Utility.getGlobalContext().userSettings.roles;
            if (userRoles) {
                var userRoleIds = (0, _keys2.default)(userRoles._collection).map(function (role) {
                    return userRoles._collection[role].id;
                });
                var userRoleNames = (0, _keys2.default)(userRoles._collection).map(function (role) {
                    return userRoles._collection[role].name;
                }).join();
                return resolve([userRoleNames, userRoleIds]);
            } else {
                return reject(new Error('Failed to get userSettings.roles in from getGlobalContext()'));
            }
        }
        //Use legacy/depreciated APIs only if platform context identified as legacy 8.0 customer
        if (_ctx.platformCtx.dynApp === 'd365legacy') {
            try {
                (0, _logger.log)('Getting user roles from Dynamics app using OData 4.0 call');
                var roleIds = window['Xrm'].Page.context.getUserRoles();
                var serverUrl = window['Xrm'].Page.context.getClientUrl();
                var odataSelect = serverUrl + "/api/data/v8.0/roles?$select=name&$filter=";

                wmjQuery(roleIds).each(function (i) {
                    odataSelect = odataSelect + "roleid eq (" + roleIds[i] + ") or ";
                });

                //remove the trailing " or "
                odataSelect = odataSelect.substring(0, odataSelect.length - 4);

                var roleName = "";
                wmjQuery.ajax({
                    type: "GET",
                    // TODO: Make this async so we won't get the website stuck
                    async: true,
                    contentType: "application/json; charset=utf-8",
                    datatype: "json",
                    url: odataSelect,
                    beforeSend: function beforeSend(XMLHttpRequest) {
                        XMLHttpRequest.setRequestHeader("Accept", "application/json");
                        XMLHttpRequest.setRequestHeader("OData-MaxVersion", "4.0");
                        XMLHttpRequest.setRequestHeader("OData-Version", "4.0");
                    },
                    success: function success(data, textStatus, XmlHttpRequest) {
                        if (data.value.length > 0) {
                            wmjQuery(data.value).each(function (i) {
                                roleName = roleName + "," + data.value[i].name;
                            });
                        }

                        //remove the leading ","
                        if (roleName.length > 0) roleName = roleName.substring(1, roleName.length);
                        return resolve([roleName, roleIds]);
                    },
                    error: function error(XmlHttpRequest, textStatus, errorThrown) {
                        return reject(new Error('Legacy OData Select Failed: ' + textStatus + errorThrown + odataSelect));
                    }
                });
            } catch (e) {
                return reject(new Error('Failed to fetch roleNames'));
            }
        }
    });
}

//*******Get LoggedIn User Attributes*********
function getLoggedInUserAttributes() {
    return new _promise2.default(function (resolve, reject) {

        (0, _logger.log)('Getting user attributes from Dynamics app using WebApi call');
        var userId = window['Xrm'].Utility.getGlobalContext().userSettings.userId;
        try {
            var result = window['Xrm'].WebApi.retrieveRecord("systemuser", userId, "?$expand=teammembership_association($select=name)");
            result.then(function (data) {
                if (data) {
                    var userAttributes = data;
                    return resolve(userAttributes);
                } else {
                    return reject(new Error('Failed to fetch user attributes'));
                }
            }).catch(function (error) {
                return reject(new Error('Unable to get user attributes'));
            });
        } catch (error) {
            return reject(new Error('Unable to get user attributes using WebApi call'));
        }
    });
}

//*******Get LoggedIn User Teams*********
function getUserTeamsList(userAttributes) {
    var teamsArray = [];
    for (var i = 0; i < userAttributes.teammembership_association.length; i++) {
        teamsArray.push(userAttributes.teammembership_association[i].name);
    }
    var userTeamsList = teamsArray.join(",");
    return userTeamsList;
}

function setUserVarsFromStorage() {
    var featuresManager = _ctx.ctx.get('FeaturesManager');

    if (featuresManager.isFeatureEnabled("dynamicUsersRole")) {
        var cachedRoles = (0, _utils.getCachedData)("user-roles");
        //if roles are already in cache and not expired, set from cache before trying to update them (also means roles are available in non-dynamics views)
        if (cachedRoles && cachedRoles.roleName && cachedRoles.roleIds) {
            (0, _logger.log)('Dynamics user roles retrieved from cache');
            window["walkmeUserRole"] = cachedRoles.roleName;
            window["wmRoleIds"] = cachedRoles.roleIds;
        }
    }

    if (featuresManager.isFeatureEnabled("dynamicUserAttributes")) {
        var cachedAttributes = (0, _utils.getCachedData)("user-attributes");
        //if user attributes are already in cache and not expired, set from cache before trying to update them (also means user attributes are available in non-dynamics views)
        if (cachedAttributes && cachedAttributes.userAttributes) {
            (0, _logger.log)('Dynamics user attributes retrieved from cache');
            window["walkmeUserAttributes"] = cachedAttributes.userAttributes;
        }
    }

    var cachedD365Vars = (0, _utils.getCachedData)("WalkMeDynamics");
    //if attributes are already in cache and not expired, set from cache before trying to update them (also means user attributes are available in non-dynamics views)
    if (cachedD365Vars && cachedD365Vars.WalkMeDynamics) {
        (0, _logger.log)('Dynamics vars retrieved from cache');
        window["WalkMeDynamics"] = cachedD365Vars.WalkMeDynamics;
    }
}


/***/ }),

/***/ 5945:
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
/******/ 	var __webpack_exports__ = __webpack_require__(6098);
/******/ 	wmbundle = __webpack_exports__;
/******/ 	
/******/ })()
;
/* WalkMe Module */ return wmbundle; })
//# sourceMappingURL=bundle.js.map
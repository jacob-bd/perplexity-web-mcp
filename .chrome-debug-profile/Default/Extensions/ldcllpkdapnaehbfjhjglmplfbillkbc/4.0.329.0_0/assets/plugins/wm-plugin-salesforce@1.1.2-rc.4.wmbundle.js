/* WalkMe Module */ typeof _walkmeInternals !== 'undefined' && _walkmeInternals.wmloader && _walkmeInternals.wmloader.define('wm-plugin-salesforce@1.1.2-rc.4@prelib', {"name":"wm-plugin-salesforce","version":"1.1.2-rc.4","toolbelt":"2.0.2","packageDate":"2025-06-16T14:28:11.588Z","entry":"prelib"}, function (__wmplugin__) {  
var wmbundle;
/******/ (function() { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 1490:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

module.exports = __webpack_require__(8965);



/***/ }),

/***/ 7286:
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

module.exports = __webpack_require__(4213);

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

/***/ 4213:
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

/***/ 9972:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

module.exports = { "default": __webpack_require__(6497), __esModule: true };


/***/ }),

/***/ 9206:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

module.exports = { "default": __webpack_require__(3095), __esModule: true };


/***/ }),

/***/ 9068:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

module.exports = { "default": __webpack_require__(2751), __esModule: true };


/***/ }),

/***/ 3125:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

module.exports = { "default": __webpack_require__(1902), __esModule: true };


/***/ }),

/***/ 194:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

module.exports = { "default": __webpack_require__(1712), __esModule: true };


/***/ }),

/***/ 1063:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

module.exports = { "default": __webpack_require__(1580), __esModule: true };


/***/ }),

/***/ 7924:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

"use strict";

exports.__esModule = true;

var _promise = __webpack_require__(3125);

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

/***/ 891:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

"use strict";

exports.__esModule = true;

var _from = __webpack_require__(9972);

var _from2 = _interopRequireDefault(_from);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports["default"] = function (arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
      arr2[i] = arr[i];
    }

    return arr2;
  } else {
    return (0, _from2.default)(arr);
  }
};


/***/ }),

/***/ 1463:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

"use strict";

exports.__esModule = true;

var _iterator = __webpack_require__(1063);

var _iterator2 = _interopRequireDefault(_iterator);

var _symbol = __webpack_require__(194);

var _symbol2 = _interopRequireDefault(_symbol);

var _typeof = typeof _symbol2.default === "function" && typeof _iterator2.default === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports["default"] = typeof _symbol2.default === "function" && _typeof(_iterator2.default) === "symbol" ? function (obj) {
  return typeof obj === "undefined" ? "undefined" : _typeof(obj);
} : function (obj) {
  return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof(obj);
};


/***/ }),

/***/ 47:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

module.exports = __webpack_require__(7286);



/***/ }),

/***/ 6874:
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
        _this._logsIoSender = __webpack_require__(1595)(ctx);
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

/***/ 6497:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

__webpack_require__(9687);
__webpack_require__(8799);
module.exports = __webpack_require__(6806).Array.from;



/***/ }),

/***/ 3095:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

var core = __webpack_require__(6806);
/*allowFunc*//*allowFunc*/ var $JSON = core.JSON || (core.JSON = { stringify: JSON.stringify });
module.exports = function stringify(it) { // eslint-disable-line no-unused-vars
  return /*allowFunc*/ $JSON.stringify.apply($JSON, arguments);
};



/***/ }),

/***/ 2751:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

__webpack_require__(1759);
module.exports = __webpack_require__(6806).Object.keys;



/***/ }),

/***/ 1902:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

__webpack_require__(8946);
__webpack_require__(9687);
__webpack_require__(4490);
__webpack_require__(7645);
__webpack_require__(9855);
__webpack_require__(1033);
module.exports = __webpack_require__(6806).Promise;



/***/ }),

/***/ 1712:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

__webpack_require__(2410);
__webpack_require__(8946);
__webpack_require__(7292);
__webpack_require__(5340);
module.exports = __webpack_require__(6806).Symbol;



/***/ }),

/***/ 1580:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

__webpack_require__(9687);
__webpack_require__(4490);
module.exports = (__webpack_require__(816).f)('iterator');



/***/ }),

/***/ 7379:
/***/ (function(module) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

module.exports = function (it) {
  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
  return it;
};



/***/ }),

/***/ 8256:
/***/ (function(module) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

module.exports = function () { /* empty */ };



/***/ }),

/***/ 5584:
/***/ (function(module) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

module.exports = function (it, Constructor, name, forbiddenField) {
  if (!(it instanceof Constructor) || (forbiddenField !== undefined && forbiddenField in it)) {
    throw TypeError(name + ': incorrect invocation!');
  } return it;
};



/***/ }),

/***/ 7356:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

var isObject = __webpack_require__(6833);
module.exports = function (it) {
  if (!isObject(it)) throw TypeError(it + ' is not an object!');
  return it;
};



/***/ }),

/***/ 3408:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

// false -> Array#indexOf
// true  -> Array#includes
var toIObject = __webpack_require__(4813);
var toLength = __webpack_require__(4869);
var toAbsoluteIndex = __webpack_require__(9797);
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

/***/ 8584:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

// getting tag from 19.1.3.6 Object.prototype.toString()
var cof = __webpack_require__(8713);
var TAG = __webpack_require__(670)('toStringTag');
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

/***/ 8713:
/***/ (function(module) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

var toString = {}.toString;

module.exports = function (it) {
  return toString.call(it).slice(8, -1);
};



/***/ }),

/***/ 6806:
/***/ (function(module) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

var core = module.exports = { version: '2.5.5' };
if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef



/***/ }),

/***/ 8323:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

'use strict';
var $defineProperty = __webpack_require__(5847);
var createDesc = __webpack_require__(436);

module.exports = function (object, index, value) {
  if (index in object) $defineProperty.f(object, index, createDesc(0, value));
  else object[index] = value;
};



/***/ }),

/***/ 5380:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

// optional / simple context binding
var aFunction = __webpack_require__(7379);
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

/***/ 7224:
/***/ (function(module) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

// 7.2.1 RequireObjectCoercible(argument)
module.exports = function (it) {
  if (it == undefined) throw TypeError("Can't call method on  " + it);
  return it;
};



/***/ }),

/***/ 5979:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

// Thank's IE8 for his funny defineProperty
module.exports = !__webpack_require__(6784)(function () {
  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
});



/***/ }),

/***/ 9994:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

var isObject = __webpack_require__(6833);
var document = (__webpack_require__(9198).document);
// typeof document.createElement is 'object' in old IE
var is = isObject(document) && isObject(document.createElement);
module.exports = function (it) {
  return is ? document.createElement(it) : {};
};



/***/ }),

/***/ 5908:
/***/ (function(module) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

// IE 8- don't enum bug keys
module.exports = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');



/***/ }),

/***/ 3465:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

// all enumerable object keys, includes symbols
var getKeys = __webpack_require__(4663);
var gOPS = __webpack_require__(7900);
var pIE = __webpack_require__(6953);
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

/***/ 4103:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

var global = __webpack_require__(9198);
var core = __webpack_require__(6806);
var ctx = __webpack_require__(5380);
var hide = __webpack_require__(1285);
var has = __webpack_require__(4949);
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

/***/ 6784:
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

/***/ 3342:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

var ctx = __webpack_require__(5380);
var call = __webpack_require__(1600);
var isArrayIter = __webpack_require__(5068);
var anObject = __webpack_require__(7356);
var toLength = __webpack_require__(4869);
var getIterFn = __webpack_require__(7202);
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

/***/ 9198:
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

/***/ 4949:
/***/ (function(module) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

var hasOwnProperty = {}.hasOwnProperty;
module.exports = function (it, key) {
  return hasOwnProperty.call(it, key);
};



/***/ }),

/***/ 1285:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

var dP = __webpack_require__(5847);
var createDesc = __webpack_require__(436);
module.exports = __webpack_require__(5979) ? function (object, key, value) {
  return dP.f(object, key, createDesc(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};



/***/ }),

/***/ 1524:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

var document = (__webpack_require__(9198).document);
module.exports = document && document.documentElement;



/***/ }),

/***/ 7092:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

module.exports = !__webpack_require__(5979) && !__webpack_require__(6784)(function () {
  return Object.defineProperty(__webpack_require__(9994)('div'), 'a', { get: function () { return 7; } }).a != 7;
});



/***/ }),

/***/ 3413:
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

/***/ 7161:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = __webpack_require__(8713);
// eslint-disable-next-line no-prototype-builtins
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
  return cof(it) == 'String' ? it.split('') : Object(it);
};



/***/ }),

/***/ 5068:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

// check on default Array iterator
var Iterators = __webpack_require__(8386);
var ITERATOR = __webpack_require__(670)('iterator');
var ArrayProto = Array.prototype;

module.exports = function (it) {
  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
};



/***/ }),

/***/ 3589:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

// 7.2.2 IsArray(argument)
var cof = __webpack_require__(8713);
module.exports = Array.isArray || function isArray(arg) {
  return cof(arg) == 'Array';
};



/***/ }),

/***/ 6833:
/***/ (function(module) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

module.exports = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};



/***/ }),

/***/ 1600:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

// call something on iterator step with safe closing on error
var anObject = __webpack_require__(7356);
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

/***/ 40:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

'use strict';
var create = __webpack_require__(1447);
var descriptor = __webpack_require__(436);
var setToStringTag = __webpack_require__(6764);
var IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
__webpack_require__(1285)(IteratorPrototype, __webpack_require__(670)('iterator'), function () { return this; });

module.exports = function (Constructor, NAME, next) {
  Constructor.prototype = create(IteratorPrototype, { next: descriptor(1, next) });
  setToStringTag(Constructor, NAME + ' Iterator');
};



/***/ }),

/***/ 39:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

'use strict';
var LIBRARY = __webpack_require__(2806);
var $export = __webpack_require__(4103);
var redefine = __webpack_require__(7491);
var hide = __webpack_require__(1285);
var Iterators = __webpack_require__(8386);
var $iterCreate = __webpack_require__(40);
var setToStringTag = __webpack_require__(6764);
var getPrototypeOf = __webpack_require__(9211);
var ITERATOR = __webpack_require__(670)('iterator');
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

/***/ 5515:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

var ITERATOR = __webpack_require__(670)('iterator');
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

/***/ 8274:
/***/ (function(module) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

module.exports = function (done, value) {
  return { value: value, done: !!done };
};



/***/ }),

/***/ 8386:
/***/ (function(module) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

module.exports = {};



/***/ }),

/***/ 2806:
/***/ (function(module) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

module.exports = true;



/***/ }),

/***/ 6436:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

var META = __webpack_require__(2167)('meta');
var isObject = __webpack_require__(6833);
var has = __webpack_require__(4949);
var setDesc = (__webpack_require__(5847).f);
var id = 0;
var isExtensible = Object.isExtensible || function () {
  return true;
};
var FREEZE = !__webpack_require__(6784)(function () {
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

/***/ 3520:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

var global = __webpack_require__(9198);
var macrotask = (__webpack_require__(7124).set);
var Observer = global.MutationObserver || global.WebKitMutationObserver;
var process = global.process;
var Promise = global.Promise;
var isNode = __webpack_require__(8713)(process) == 'process';

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

/***/ 8922:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

'use strict';
// 25.4.1.5 NewPromiseCapability(C)
var aFunction = __webpack_require__(7379);

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

/***/ 1447:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
var anObject = __webpack_require__(7356);
var dPs = __webpack_require__(5986);
var enumBugKeys = __webpack_require__(5908);
var IE_PROTO = __webpack_require__(854)('IE_PROTO');
var Empty = function () { /* empty */ };
var PROTOTYPE = 'prototype';

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var createDict = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = __webpack_require__(9994)('iframe');
  var i = enumBugKeys.length;
  var lt = '<';
  var gt = '>';
  var iframeDocument;
  iframe.style.display = 'none';
  (__webpack_require__(1524).appendChild)(iframe);
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

/***/ 5847:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

var anObject = __webpack_require__(7356);
var IE8_DOM_DEFINE = __webpack_require__(7092);
var toPrimitive = __webpack_require__(6832);
var dP = Object.defineProperty;

exports.f = __webpack_require__(5979) ? Object.defineProperty : function defineProperty(O, P, Attributes) {
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

/***/ 5986:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

var dP = __webpack_require__(5847);
var anObject = __webpack_require__(7356);
var getKeys = __webpack_require__(4663);

module.exports = __webpack_require__(5979) ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject(O);
  var keys = getKeys(Properties);
  var length = keys.length;
  var i = 0;
  var P;
  while (length > i) dP.f(O, P = keys[i++], Properties[P]);
  return O;
};



/***/ }),

/***/ 2697:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

var pIE = __webpack_require__(6953);
var createDesc = __webpack_require__(436);
var toIObject = __webpack_require__(4813);
var toPrimitive = __webpack_require__(6832);
var has = __webpack_require__(4949);
var IE8_DOM_DEFINE = __webpack_require__(7092);
var gOPD = Object.getOwnPropertyDescriptor;

exports.f = __webpack_require__(5979) ? gOPD : function getOwnPropertyDescriptor(O, P) {
  O = toIObject(O);
  P = toPrimitive(P, true);
  if (IE8_DOM_DEFINE) try {
    return gOPD(O, P);
  } catch (e) { /* empty */ }
  if (has(O, P)) return createDesc(!pIE.f.call(O, P), O[P]);
};



/***/ }),

/***/ 4789:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
var toIObject = __webpack_require__(4813);
var gOPN = (__webpack_require__(879).f);
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

/***/ 879:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
var $keys = __webpack_require__(6697);
var hiddenKeys = (__webpack_require__(5908).concat)('length', 'prototype');

exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return $keys(O, hiddenKeys);
};



/***/ }),

/***/ 7900:
/***/ (function(__unused_webpack_module, exports) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

exports.f = Object.getOwnPropertySymbols;



/***/ }),

/***/ 9211:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
var has = __webpack_require__(4949);
var toObject = __webpack_require__(4870);
var IE_PROTO = __webpack_require__(854)('IE_PROTO');
var ObjectProto = Object.prototype;

module.exports = Object.getPrototypeOf || function (O) {
  O = toObject(O);
  if (has(O, IE_PROTO)) return O[IE_PROTO];
  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectProto : null;
};



/***/ }),

/***/ 6697:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

var has = __webpack_require__(4949);
var toIObject = __webpack_require__(4813);
var arrayIndexOf = __webpack_require__(3408)(false);
var IE_PROTO = __webpack_require__(854)('IE_PROTO');

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

/***/ 4663:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var $keys = __webpack_require__(6697);
var enumBugKeys = __webpack_require__(5908);

module.exports = Object.keys || function keys(O) {
  return $keys(O, enumBugKeys);
};



/***/ }),

/***/ 6953:
/***/ (function(__unused_webpack_module, exports) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

exports.f = {}.propertyIsEnumerable;



/***/ }),

/***/ 6675:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

// most Object methods by ES6 should accept primitives
var $export = __webpack_require__(4103);
var core = __webpack_require__(6806);
var fails = __webpack_require__(6784);
module.exports = function (KEY, exec) {
  var fn = (core.Object || {})[KEY] || Object[KEY];
  var exp = {};
  exp[KEY] = exec(fn);
  $export($export.S + $export.F * fails(function () { fn(1); }), 'Object', exp);
};



/***/ }),

/***/ 2488:
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

/***/ 1949:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

var anObject = __webpack_require__(7356);
var isObject = __webpack_require__(6833);
var newPromiseCapability = __webpack_require__(8922);

module.exports = function (C, x) {
  anObject(C);
  if (isObject(x) && x.constructor === C) return x;
  var promiseCapability = newPromiseCapability.f(C);
  var resolve = promiseCapability.resolve;
  resolve(x);
  return promiseCapability.promise;
};



/***/ }),

/***/ 436:
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

/***/ 8313:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

var hide = __webpack_require__(1285);
module.exports = function (target, src, safe) {
  for (var key in src) {
    if (safe && target[key]) target[key] = src[key];
    else hide(target, key, src[key]);
  } return target;
};



/***/ }),

/***/ 7491:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

module.exports = __webpack_require__(1285);



/***/ }),

/***/ 7613:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

'use strict';
var global = __webpack_require__(9198);
var core = __webpack_require__(6806);
var dP = __webpack_require__(5847);
var DESCRIPTORS = __webpack_require__(5979);
var SPECIES = __webpack_require__(670)('species');

module.exports = function (KEY) {
  var C = typeof core[KEY] == 'function' ? core[KEY] : global[KEY];
  if (DESCRIPTORS && C && !C[SPECIES]) dP.f(C, SPECIES, {
    configurable: true,
    get: function () { return this; }
  });
};



/***/ }),

/***/ 6764:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

var def = (__webpack_require__(5847).f);
var has = __webpack_require__(4949);
var TAG = __webpack_require__(670)('toStringTag');

module.exports = function (it, tag, stat) {
  if (it && !has(it = stat ? it : it.prototype, TAG)) def(it, TAG, { configurable: true, value: tag });
};



/***/ }),

/***/ 854:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

var shared = __webpack_require__(1908)('keys');
var uid = __webpack_require__(2167);
module.exports = function (key) {
  return shared[key] || (shared[key] = uid(key));
};



/***/ }),

/***/ 1908:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

var global = __webpack_require__(9198);
var _walkmeInternals = global._walkmeInternals || (global._walkmeInternals = {});
var store  = _walkmeInternals.coreJsShared || (_walkmeInternals.coreJsShared = {});
module.exports = function (key) {
  return store[key] || (store[key] = {});
};



/***/ }),

/***/ 7038:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

// 7.3.20 SpeciesConstructor(O, defaultConstructor)
var anObject = __webpack_require__(7356);
var aFunction = __webpack_require__(7379);
var SPECIES = __webpack_require__(670)('species');
module.exports = function (O, D) {
  var C = anObject(O).constructor;
  var S;
  return C === undefined || (S = anObject(C)[SPECIES]) == undefined ? D : aFunction(S);
};



/***/ }),

/***/ 3492:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

var toInteger = __webpack_require__(5943);
var defined = __webpack_require__(7224);
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

/***/ 7124:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

var ctx = __webpack_require__(5380);
var invoke = __webpack_require__(3413);
var html = __webpack_require__(1524);
var cel = __webpack_require__(9994);
var global = __webpack_require__(9198);
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
  if (__webpack_require__(8713)(process) == 'process') {
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

/***/ 9797:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

var toInteger = __webpack_require__(5943);
var max = Math.max;
var min = Math.min;
module.exports = function (index, length) {
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};



/***/ }),

/***/ 5943:
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

/***/ 4813:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = __webpack_require__(7161);
var defined = __webpack_require__(7224);
module.exports = function (it) {
  return IObject(defined(it));
};



/***/ }),

/***/ 4869:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

// 7.1.15 ToLength
var toInteger = __webpack_require__(5943);
var min = Math.min;
module.exports = function (it) {
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};



/***/ }),

/***/ 4870:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

// 7.1.13 ToObject(argument)
var defined = __webpack_require__(7224);
module.exports = function (it) {
  return Object(defined(it));
};



/***/ }),

/***/ 6832:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = __webpack_require__(6833);
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

/***/ 2167:
/***/ (function(module) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

var id = 0;
var px = Math.random();
module.exports = function (key) {
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};



/***/ }),

/***/ 680:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

var global = __webpack_require__(9198);
var core = __webpack_require__(6806);
var LIBRARY = __webpack_require__(2806);
var wksExt = __webpack_require__(816);
var defineProperty = (__webpack_require__(5847).f);
module.exports = function (name) {
  var $Symbol = core.Symbol || (core.Symbol = LIBRARY ? {} : global.Symbol || {});
  if (name.charAt(0) != '_' && !(name in $Symbol)) defineProperty($Symbol, name, { value: wksExt.f(name) });
};



/***/ }),

/***/ 816:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

exports.f = __webpack_require__(670);



/***/ }),

/***/ 670:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

var store = __webpack_require__(1908)('wks');
var uid = __webpack_require__(2167);
var Symbol = (__webpack_require__(9198).Symbol);
var USE_SYMBOL = typeof Symbol == 'function';

var $exports = module.exports = function (name) {
  return store[name] || (store[name] =
    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
};

$exports.store = store;



/***/ }),

/***/ 7202:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

var classof = __webpack_require__(8584);
var ITERATOR = __webpack_require__(670)('iterator');
var Iterators = __webpack_require__(8386);
module.exports = (__webpack_require__(6806).getIteratorMethod) = function (it) {
  if (it != undefined) return it[ITERATOR]
    || it['@@iterator']
    || Iterators[classof(it)];
};



/***/ }),

/***/ 8799:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

'use strict';
var ctx = __webpack_require__(5380);
var $export = __webpack_require__(4103);
var toObject = __webpack_require__(4870);
var call = __webpack_require__(1600);
var isArrayIter = __webpack_require__(5068);
var toLength = __webpack_require__(4869);
var createProperty = __webpack_require__(8323);
var getIterFn = __webpack_require__(7202);

$export($export.S + $export.F * !__webpack_require__(5515)(function (iter) { Array.from(iter); }), 'Array', {
  // 22.1.2.1 Array.from(arrayLike, mapfn = undefined, thisArg = undefined)
  from: function from(arrayLike /* , mapfn = undefined, thisArg = undefined */) {
    var O = toObject(arrayLike);
    var C = typeof this == 'function' ? this : Array;
    var aLen = arguments.length;
    var mapfn = aLen > 1 ? arguments[1] : undefined;
    var mapping = mapfn !== undefined;
    var index = 0;
    var iterFn = getIterFn(O);
    var length, result, step, iterator;
    if (mapping) mapfn = ctx(mapfn, aLen > 2 ? arguments[2] : undefined, 2);
    // if object isn't iterable or it's array with default iterator - use simple case
    if (iterFn != undefined && !(C == Array && isArrayIter(iterFn))) {
      for (iterator = iterFn.call(O), result = new C(); !(step = iterator.next()).done; index++) {
        createProperty(result, index, mapping ? call(iterator, mapfn, [step.value, index], true) : step.value);
      }
    } else {
      length = toLength(O.length);
      for (result = new C(length); length > index; index++) {
        createProperty(result, index, mapping ? mapfn(O[index], index) : O[index]);
      }
    }
    result.length = index;
    return result;
  }
});



/***/ }),

/***/ 5733:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

'use strict';
var addToUnscopables = __webpack_require__(8256);
var step = __webpack_require__(8274);
var Iterators = __webpack_require__(8386);
var toIObject = __webpack_require__(4813);

// 22.1.3.4 Array.prototype.entries()
// 22.1.3.13 Array.prototype.keys()
// 22.1.3.29 Array.prototype.values()
// 22.1.3.30 Array.prototype[@@iterator]()
module.exports = __webpack_require__(39)(Array, 'Array', function (iterated, kind) {
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

/***/ 1759:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

// 19.1.2.14 Object.keys(O)
var toObject = __webpack_require__(4870);
var $keys = __webpack_require__(4663);

__webpack_require__(6675)('keys', function () {
  return function keys(it) {
    return $keys(toObject(it));
  };
});



/***/ }),

/***/ 8946:
/***/ (function() {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */




/***/ }),

/***/ 7645:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

'use strict';
var LIBRARY = __webpack_require__(2806);
var global = __webpack_require__(9198);
var ctx = __webpack_require__(5380);
var classof = __webpack_require__(8584);
var $export = __webpack_require__(4103);
var isObject = __webpack_require__(6833);
var aFunction = __webpack_require__(7379);
var anInstance = __webpack_require__(5584);
var forOf = __webpack_require__(3342);
var speciesConstructor = __webpack_require__(7038);
var task = (__webpack_require__(7124).set);
var microtask = __webpack_require__(3520)();
var newPromiseCapabilityModule = __webpack_require__(8922);
var perform = __webpack_require__(2488);
var promiseResolve = __webpack_require__(1949);
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
    var FakePromise = (promise.constructor = {})[__webpack_require__(670)('species')] = function (exec) {
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
  Internal.prototype = __webpack_require__(8313)($Promise.prototype, {
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
__webpack_require__(6764)($Promise, PROMISE);
__webpack_require__(7613)(PROMISE);
Wrapper = __webpack_require__(6806)[PROMISE];

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
$export($export.S + $export.F * !(USE_NATIVE && __webpack_require__(5515)(function (iter) {
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

/***/ 9687:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

'use strict';
var $at = __webpack_require__(3492)(true);

// 21.1.3.27 String.prototype[@@iterator]()
__webpack_require__(39)(String, 'String', function (iterated) {
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

/***/ 2410:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

'use strict';
// ECMAScript 6 symbols shim
var global = __webpack_require__(9198);
var has = __webpack_require__(4949);
var DESCRIPTORS = __webpack_require__(5979);
var $export = __webpack_require__(4103);
var redefine = __webpack_require__(7491);
var META = (__webpack_require__(6436).KEY);
var $fails = __webpack_require__(6784);
var shared = __webpack_require__(1908);
var setToStringTag = __webpack_require__(6764);
var uid = __webpack_require__(2167);
var wks = __webpack_require__(670);
var wksExt = __webpack_require__(816);
var wksDefine = __webpack_require__(680);
var enumKeys = __webpack_require__(3465);
var isArray = __webpack_require__(3589);
var anObject = __webpack_require__(7356);
var isObject = __webpack_require__(6833);
var toIObject = __webpack_require__(4813);
var toPrimitive = __webpack_require__(6832);
var createDesc = __webpack_require__(436);
var _create = __webpack_require__(1447);
var gOPNExt = __webpack_require__(4789);
var $GOPD = __webpack_require__(2697);
var $DP = __webpack_require__(5847);
var $keys = __webpack_require__(4663);
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
  (__webpack_require__(879).f) = gOPNExt.f = $getOwnPropertyNames;
  (__webpack_require__(6953).f) = $propertyIsEnumerable;
  (__webpack_require__(7900).f) = $getOwnPropertySymbols;

  if (DESCRIPTORS && !__webpack_require__(2806)) {
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
$Symbol[PROTOTYPE][TO_PRIMITIVE] || __webpack_require__(1285)($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
// 19.4.3.5 Symbol.prototype[@@toStringTag]
setToStringTag($Symbol, 'Symbol');
// 20.2.1.9 Math[@@toStringTag]
setToStringTag(Math, 'Math', true);
// 24.3.3 JSON[@@toStringTag]
setToStringTag(global.JSON, 'JSON', true);



/***/ }),

/***/ 9855:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

// https://github.com/tc39/proposal-promise-finally
'use strict';
var $export = __webpack_require__(4103);
var core = __webpack_require__(6806);
var global = __webpack_require__(9198);
var speciesConstructor = __webpack_require__(7038);
var promiseResolve = __webpack_require__(1949);

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

/***/ 1033:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

'use strict';
// https://github.com/tc39/proposal-promise-try
var $export = __webpack_require__(4103);
var newPromiseCapability = __webpack_require__(8922);
var perform = __webpack_require__(2488);

$export($export.S, 'Promise', { 'try': function (callbackfn) {
  var promiseCapability = newPromiseCapability.f(this);
  var result = perform(callbackfn);
  (result.e ? promiseCapability.reject : promiseCapability.resolve)(result.v);
  return promiseCapability.promise;
} });



/***/ }),

/***/ 7292:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

__webpack_require__(680)('asyncIterator');



/***/ }),

/***/ 5340:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

__webpack_require__(680)('observable');



/***/ }),

/***/ 4490:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

__webpack_require__(5733);
var global = __webpack_require__(9198);
var hide = __webpack_require__(1285);
var Iterators = __webpack_require__(8386);
var TO_STRING_TAG = __webpack_require__(670)('toStringTag');

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

/***/ 1595:
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

/***/ 2719:
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

/***/ 6433:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

'use strict';

var getSettings = (__webpack_require__(4387).getSettings);

function isBlacklistedUrl() {
	var sfVarsBlacklist = getSettings().sfVarsBlacklist;

	if (typeof sfVarsBlacklist === 'string') {
		sfVarsBlacklist = [sfVarsBlacklist];
	}

	if (!Array.isArray(sfVarsBlacklist)) {
		return false;
	}

	return sfVarsBlacklist.some(function (url) {
		return location.href.includes(url);
	});
}

exports.isBlacklistedUrl = isBlacklistedUrl;


/***/ }),

/***/ 2280:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

'use strict';

exports.__esModule = true;
exports.log = undefined;

var _wmPrelibPluginEntryManager = __webpack_require__(3257);

var ctx = (0, _wmPrelibPluginEntryManager.getCtx)();
var logger = ctx.get('PrelibLogger');
var where = window.top == window.self ? '[TOP]' : '[IFR]';
var header = where + '[wmSalesforce]';

var parentLogStatus = 'unknown';

var earlyIframeLogs = []; // logs that come while we wait for the response of the parent

var log = function log() {
	for (var _len = arguments.length, logRecord = Array(_len), _key = 0; _key < _len; _key++) {
		logRecord[_key] = arguments[_key];
	}

	logRecord.unshift(header);

	if (window.self === window.top) {
		logger.write.apply(logger, logRecord);
	} else {
		// child logic
		if (parentLogStatus === 'unknown') {
			requestLogStatus();
			earlyIframeLogs.push(logRecord);
		} else if (parentLogStatus === 'true') {
			logger.write.apply(logger, logRecord);
		}
	}
};

var requestLogStatus = function requestLogStatus() {
	parentLogStatus = 'requesting';
	// Some inner iframes make top.postMessage to open a window from the parent
	// example of this is linkedin (EUX-5605)
	// TODO: Apply here the same logic as we will do to solve the postMessaging
	// window.top.postMessage({ type: 'wm_logger_request' }, '*');
};

var init = function init() {
	if (window.self === window.top) {
		window.addEventListener('message', function (event) {
			if (event.data && event.data.type === 'wm_logger_request') {
				var status = ctx.get('PrelibLogger').isLogEnabled().toString();
				event.source.postMessage({
					type: 'wm_logger_reply',
					value: status
				}, '*');
			}
		});
	} else {
		requestLogStatus();

		window.addEventListener('message', function (event) {
			if (event.data && event.data.type === 'wm_logger_reply') {
				if (event.data.value === 'true') {
					_walkmeInternals.ctx.get('PrelibLogger').enableLog();

					if (earlyIframeLogs.length > 0) {
						earlyIframeLogs.forEach(function (logRecord) {
							logger.write.apply(logger, logRecord);
						});

						earlyIframeLogs = [];
					}
				} else {
					_walkmeInternals.ctx.get('PrelibLogger').disableLog();
					parentLogStatus = 'unknown';
				}
			}
		});
	}
};

init();

exports.log = log;


/***/ }),

/***/ 3121:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

'use strict';

exports.__esModule = true;

var _promise = __webpack_require__(3125);

var _promise2 = _interopRequireDefault(_promise);

var _log = __webpack_require__(2280);

var _utils = __webpack_require__(4387);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ctx = (__webpack_require__(3257).getCtx)();


var sfVarsFetched = false;

var childLogic = function childLogic() {
	return new _promise2.default(function (resolve) {
		window.addEventListener('message', function (event) {
			if (!event || !event.data || event.data.action !== 'wm_reply_data_to_child') return;

			if (event.data.error) {
				(0, _log.log)('Error retrieving sfVars from parent:', event.data.error);
				sfVarsFetched = true;
				resolve();
				return;
			}

			if (event.data.sfVars) {
				(0, _log.log)('sfVars set from parent: ', event.data.sfVars);
				sfVarsFetched = true;
				window.walkme_sf_vars = event.data.sfVars;
				resolve();
				return;
			}

			if (event.data.queued) {
				(0, _log.log)('SfVars are not ready, but parent added to the waiting list');
				sfVarsFetched = true;

				ctx.get('TimerManager').setWalkmeTimeout(function () {
					(0, _log.log)('Asking variables one last time');
					requestSfVars();

					ctx.get('TimerManager').setWalkmeTimeout(function () {
						(0, _log.log)('Still no response from parent... continue loading');
						resolve();
					}, 2000);
				}, 1000);
			}
		});

		retryOperation(requestSfVars, resolve);
	});
};

var retryOperation = function retryOperation(operation, resolve) {
	var delay = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 500;
	var retries = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 10;

	if (retries < 1) {
		(0, _log.log)('Desisting, parent iframe is not responding');
		resolve();
		return;
	}

	operation();

	(0, _utils.wait)(delay).then(function () {
		if (!sfVarsFetched) {
			(0, _log.log)('Parent didnt notice that we are waiting, sending a request again');
			retryOperation(operation, resolve, delay * (11 - retries), --retries);
		}
	});
};

var requestSfVars = function requestSfVars() {
	ctx.get('TimerManager').setWalkmeTimeout(function () {
		(0, _log.log)('Requesting sfVars to parent');
		window.top.postMessage({ action: 'wm_request_data_to_parent' }, '*');
	}, 0);
};

exports["default"] = childLogic;


/***/ }),

/***/ 8940:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

'use strict';

exports.__esModule = true;

var _promise = __webpack_require__(3125);

var _promise2 = _interopRequireDefault(_promise);

var _wmPrelibPluginEntryManager = __webpack_require__(3257);

var _log = __webpack_require__(2280);

var _utils = __webpack_require__(4387);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ctx = (0, _wmPrelibPluginEntryManager.getCtx)();

function onlyStorageLogic() {
	return new _promise2.default(function (resolve) {
		retryOperation(getSfVars, resolve);
	});
}

function retryOperation(operation, resolve, delay, retries) {
	if (typeof delay === 'undefined') delay = 250;
	if (typeof retries === 'undefined') retries = 10;

	if (retries < 1) {
		(0, _log.log)('Desisting, no SfVars found in storage');
		resolve();
		return;
	}

	var sfVars = operation();

	if (sfVars) {
		resolve(sfVars);
		return;
	}

	(0, _utils.wait)(delay).then(function () {
		(0, _log.log)('SfVars not found in storage, retrying');
		var newDelay = delay * 1.05;
		retryOperation(operation, resolve, newDelay, --retries);
	});
}

function getSfVars() {
	var clientStorage = ctx.get('ClientStorageManager');

	var sfDataKey = 'wm-sf-users-data_' + ctx.get('AuditSourceManager').get();
	var rawData = clientStorage.getData(sfDataKey);
	var latestUserId = clientStorage.getData('wm-sf-lst-usr');

	try {
		var sfVars = JSON.parse(rawData)[latestUserId];
		window.walkme_sf_vars = sfVars;
		return sfVars;
	} catch (e) {
		var message = 'Error parsing sfVars from storage with latest Salesforce UserId [' + latestUserId + ']';
		(0, _log.log)(message + ': ' + e.stack);
		window.walkme_sf_vars = {
			_error: message
		};
	}
}

exports["default"] = onlyStorageLogic;


/***/ }),

/***/ 3583:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

'use strict';

exports.__esModule = true;

var _regenerator = __webpack_require__(47);

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = __webpack_require__(7924);

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _wmPrelibPluginEntryManager = __webpack_require__(3257);

var _wmSfCommonComponents = __webpack_require__(8388);

var _wmSfCommonComponents2 = _interopRequireDefault(_wmSfCommonComponents);

var _log = __webpack_require__(2280);

var _utils = __webpack_require__(4387);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ctx = (0, _wmPrelibPluginEntryManager.getCtx)();
var queue = [];
var error = void 0;

var parentLogic = function () {
	var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
		var sfVars, _error;

		return _regenerator2.default.wrap(function _callee$(_context) {
			while (1) {
				switch (_context.prev = _context.next) {
					case 0:
						(0, _log.log)('Salesforce plugin was deployed.');

						setParentListener();
						(0, _wmSfCommonComponents2.default)(ctx);

						_context.prev = 3;
						_context.next = 6;
						return ctx.get('SalesForceManager').init();

					case 6:
						sfVars = _context.sent;


						if (!sfVars || sfVars.error) {
							_error = sfVars.error || 'empty sfVars';

							processQueue({ error: _error });
							ctx.get('CommonEvents').raiseEvent('sfVarsLoaded', { error: _error });
						} else {
							processQueue({ sfVars: sfVars });
							ctx.get('CommonEvents').raiseEvent('sfVarsLoaded', { sfVars: sfVars });
						}
						_context.next = 15;
						break;

					case 10:
						_context.prev = 10;
						_context.t0 = _context['catch'](3);

						error = _context.t0;
						processQueue({ error: _context.t0 });
						ctx.get('CommonEvents').raiseEvent('sfVarsLoaded', { error: _context.t0 });

					case 15:
					case 'end':
						return _context.stop();
				}
			}
		}, _callee, undefined, [[3, 10]]);
	}));

	return function parentLogic() {
		return _ref.apply(this, arguments);
	};
}();

var processQueue = function processQueue(params) {
	if (queue.length < 1) {
		return;
	}

	ctx.get('TimerManager').setWalkmeTimeout(function () {
		(0, _log.log)('Replying to #[', queue.length, '] requests that happened before sfVars was calculated');

		// queue.forEach((f) => {
		// 	f.postMessage && f.postMessage(params, '*');
		// });

		(0, _utils.broadcast2iframes)(params);
	}, 0);
};

var setParentListener = function setParentListener() {
	(0, _log.log)('Set parent listener');

	window.addEventListener('message', function (event) {
		if (event.data && event.data.action == 'wm_request_data_to_parent') {
			var action = 'wm_reply_data_to_child';

			if (window.walkme_sf_vars) {
				(0, _log.log)('A request from [', event.origin, '] has been made and we will reply with data [', window.walkme_sf_vars, ']');
				ctx.get('TimerManager').setWalkmeTimeout(function () {
					event.source.postMessage({
						action: action,
						sfVars: window.walkme_sf_vars
					}, '*');
				}, 0);
			} else if (error) {
				(0, _log.log)('A request from [', event.origin, '] has been made but we dont have sfVars due to error [', error, ']');
				ctx.get('TimerManager').setWalkmeTimeout(function () {
					event.source.postMessage({
						action: action,
						error: error
					}, '*');
				}, 0);
			} else {
				queue.push(event.source);
				(0, _log.log)('A request from [', event.origin, '] has been made but we dont have the data, added to the Queued Requests');
				ctx.get('TimerManager').setWalkmeTimeout(function () {
					event.source.postMessage({
						action: action,
						queued: true
					}, '*');
				}, 0);
			}
		}
	});
};

exports["default"] = parentLogic;


/***/ }),

/***/ 8965:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

'use strict';

var _wmPrelibPluginEntryManager = __webpack_require__(3257);

module.exports = (0, _wmPrelibPluginEntryManager.createPluginEntry)(function (registerPlugin) {
  var SalesforcePlugin = (__webpack_require__(1495)/* .SalesforcePlugin */ .v);
  registerPlugin(new SalesforcePlugin());
});


/***/ }),

/***/ 1495:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

var __webpack_unused_export__;
/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

'use strict';

__webpack_unused_export__ = true;
exports.v = undefined;

var _promise = __webpack_require__(3125);

var _promise2 = _interopRequireDefault(_promise);

var _wmPrelibPluginEntryManager = __webpack_require__(3257);

var _wmPauseLibAfterStorage = __webpack_require__(2719);

var _wmPauseLibAfterStorage2 = _interopRequireDefault(_wmPauseLibAfterStorage);

var _parent = __webpack_require__(3583);

var _parent2 = _interopRequireDefault(_parent);

var _child = __webpack_require__(3121);

var _child2 = _interopRequireDefault(_child);

var _onlyStorage = __webpack_require__(8940);

var _onlyStorage2 = _interopRequireDefault(_onlyStorage);

var _utils = __webpack_require__(4387);

var _log = __webpack_require__(2280);

var _blacklist = __webpack_require__(6433);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ctx = (0, _wmPrelibPluginEntryManager.getCtx)();
var wait = (0, _wmPauseLibAfterStorage2.default)(ctx);

var SalesforcePlugin = exports.v = function SalesforcePlugin() {
	var run = function run() {
		wait.registerFunction('WalkMeConfigFileLoaded', getVars);
	};

	return {
		run: run
	};
};

var getVars = function getVars() {
	if ((0, _blacklist.isBlacklistedUrl)()) {
		(0, _log.log)('blacklisted url, skipping');
		return _promise2.default.resolve();
	}

	if (window === window.parent) {
		(0, _log.log)('Running [parent] logic');
		return (0, _parent2.default)();
	} else {
		(0, _log.log)('Running [child] logic');

		var settings = (0, _utils.getSettings)();
		if (settings && (settings.sfVarsOnlyStorageChild === 'true' || settings.sfVars && settings.sfVars.sfVarsOnlyStorageChild === 'true')) {
			return (0, _onlyStorage2.default)();
		}

		return (0, _child2.default)();
	}
};


/***/ }),

/***/ 4387:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

'use strict';

exports.__esModule = true;
exports.broadcast2iframes = exports.getSettings = exports.wait = undefined;

var _promise = __webpack_require__(3125);

var _promise2 = _interopRequireDefault(_promise);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ctx = (__webpack_require__(3257).getCtx)();

function wait(ms) {
    return new _promise2.default(function (resolve) {
        ctx.get('TimerManager').setWalkmeTimeout(function () {
            resolve();
        }, ms);
    });
}

function getSettings() {
    return ctx.get('CommonUtils').getJsonSettings && ctx.get('CommonUtils').getJsonSettings() || {};
}

function broadcast2iframes(message) {
    var iframes = document.getElementsByTagName('iframe');

    for (var i = 0; i < iframes.length; i++) {
        var iframe = iframes[i];
        if (iframe.contentWindow) {
            try {
                iframe.contentWindow.postMessage(message, '*');
            } catch (error) {}
        }
    }
}

exports.wait = wait;
exports.getSettings = getSettings;
exports.broadcast2iframes = broadcast2iframes;

// trigger bild comment, ignore


/***/ }),

/***/ 3257:
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



/***/ }),

/***/ 5088:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

'use strict';

Object.defineProperty(exports, "__esModule", ({
	value: true
}));
exports.CommunitySfVarsUrlBuilder = undefined;

var _log = __webpack_require__(4614);

var config = void 0;

function CommunitySfVarsUrlBuilder(_sfVarsUtils) {
	function ctor() {
		config = __webpack_require__(1696);
	}

	this.getProxyIframeUrl = function () {
		return config.communityProxyIframeUrl;
	};

	this.buildRequestUrl = function buildRequestUrl(relativeUrl) {
		if (!relativeUrl) {
			return;
		}

		var url = void 0;
		var protocol = window.location.protocol;
		var webPageBaseUrl = window.location.hostname;
		var customBaseUrl = config.sfVarsCommunityBaseUrl;
		var customBaseUrlDictionary = config.sfVarsCommunityBaseUrlDictionary;

		//in case we have custom base Url in JSON Settings we will go with this way first
		if (customBaseUrl) {
			url = protocol + '//' + customBaseUrl + relativeUrl;
			(0, _log.log)('buildRequestUrl - with custom community base url ' + url);
		}
		//in case we have a community Base Url Dictionary for multiple communities we will go with this way secondly
		else if (customBaseUrlDictionary && !!customBaseUrlDictionary[webPageBaseUrl]) {
				url = protocol + '//' + customBaseUrlDictionary[webPageBaseUrl] + relativeUrl;
				(0, _log.log)('buildRequestUrl - with custom community base url dictionary ' + url);
			}
			//and in case we don't have any custom base url or dictionary we in generate the api url by the web page url
			else if (_sfVarsUtils.getSfVarsUserContext().siteUrlPrefix) {
					url = protocol + '//' + webPageBaseUrl + _sfVarsUtils.getSfVarsUserContext().siteUrlPrefix + relativeUrl;
					(0, _log.log)('buildRequestUrl - with regular community url plus siteUrlPrefix ' + url);
				} else {
					url = protocol + '//' + webPageBaseUrl + relativeUrl;
					(0, _log.log)('buildRequestUrl - with regular community url ' + url);
				}

		(0, _log.log)('Community sfVars endpoint - ' + url);
		return url;
	};

	ctor.apply(null, arguments);
}

exports.CommunitySfVarsUrlBuilder = CommunitySfVarsUrlBuilder;


/***/ }),

/***/ 4244:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

'use strict';

Object.defineProperty(exports, "__esModule", ({
	value: true
}));
exports.SalesForceConnection = undefined;

var _typeof2 = __webpack_require__(1463);

var _typeof3 = _interopRequireDefault(_typeof2);

var _log = __webpack_require__(4614);

var _regexp = __webpack_require__(5971);

var _regexp2 = _interopRequireDefault(_regexp);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SERVICES_SOAP = '/services/Soap/u/31.0';
var SOAP_DEBUG_SHELL = '/soap/ajax/31.0/debugshell.html';

function SalesForceConnection(CookiesManager, Logger, SfVarsUtils) {
	var win = window;
	var _sforce = {};
	var _initialized = false;

	var UserContext = typeof win.UserContext != 'undefined' ? win.UserContext : {
		siteUrlPrefix: '',
		getUrl: function getUrl(url) {
			// fix URL for sites with prefixes
			if (typeof url == 'undefined' || typeof UserContext.siteUrlPrefix == 'undefined' || !UserContext.siteUrlPrefix) return url;

			if (url.indexOf('/') != 0) return url;

			if (url.indexOf(UserContext.siteUrlPrefix) == 0) return url;

			return UserContext.siteUrlPrefix + url;
		}
	};

	this.getSforce = function () {
		if (_initialized) {
			return _sforce;
		}
		return null;
	};

	_sforce.internal = {};
	/** StringBuffer */

	_sforce.StringBuffer = function () {
		this.buffer = [];

		this.append = function (s) {
			this.buffer.push(s);
			return this;
		};

		this.toString = function () {
			return this.buffer.join('');
		};
	};

	/** Base64Binary */
	_sforce.Base64Binary = function (text) {
		this.input = text;
	};

	_sforce.Base64Binary.prototype.keyStr = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';

	_sforce.Base64Binary.prototype.toString = function () {
		var output = [];
		var chr1,
		    chr2,
		    chr3 = '';
		var enc1,
		    enc2,
		    enc3,
		    enc4 = '';
		var i = 0;
		do {
			chr1 = this.input.charCodeAt(i++);
			chr2 = this.input.charCodeAt(i++);
			chr3 = this.input.charCodeAt(i++);
			enc1 = chr1 >> 2;
			enc2 = (chr1 & 3) << 4 | chr2 >> 4;
			enc3 = (chr2 & 15) << 2 | chr3 >> 6;
			enc4 = chr3 & 63;
			if (isNaN(chr2)) {
				enc3 = enc4 = 64;
			} else if (isNaN(chr3)) {
				enc4 = 64;
			}
			output.push(this.keyStr.charAt(enc1) + this.keyStr.charAt(enc2) + this.keyStr.charAt(enc3) + this.keyStr.charAt(enc4));
			chr1 = chr2 = chr3 = '';
			enc1 = enc2 = enc3 = enc4 = '';
		} while (i < this.input.length);
		return output.join('');
	};

	_sforce.Base64Binary.prototype.decode = function (input) {
		var output = [];
		var chr1,
		    chr2,
		    chr3 = '';
		var enc1,
		    enc2,
		    enc3,
		    enc4 = '';
		var i = 0;
		var base64test = /[^A-Za-z0-9\+\/\=]/g;
		if (base64test.exec(input)) {
			(0, _log.log)('There were invalid base64 characters in the input text.\n' + "Valid base64 characters are A-Z, a-z, 0-9, '+', '/', and '='\n" + 'Expect errors in decoding.');
		}
		input = input.replace(/[^A-Za-z0-9\+\/\=]/g, '');
		do {
			enc1 = this.keyStr.indexOf(input.charAt(i++));
			enc2 = this.keyStr.indexOf(input.charAt(i++));
			enc3 = this.keyStr.indexOf(input.charAt(i++));
			enc4 = this.keyStr.indexOf(input.charAt(i++));
			chr1 = enc1 << 2 | enc2 >> 4;
			chr2 = (enc2 & 15) << 4 | enc3 >> 2;
			chr3 = (enc3 & 3) << 6 | enc4;
			output.push(String.fromCharCode(chr1));
			if (enc3 != 64) {
				output.push(String.fromCharCode(chr2));
			}
			if (enc4 != 64) {
				output.push(String.fromCharCode(chr3));
			}
			chr1 = chr2 = chr3 = '';
			enc1 = enc2 = enc3 = enc4 = '';
		} while (i < input.length);
		return output.join('');
	};

	/**DateCodec.js*/

	_sforce.internal.dateToString = function (theDate) {
		var today = theDate;
		var year = today.getFullYear();
		var month = today.getMonth() + 1;
		var day = today.getDate();
		return year + '-' + month + '-' + day;
	};

	_sforce.internal.dateTimeToString = function (theDate) {
		var today = theDate;
		var year = today.getFullYear();
		var month = today.getMonth() + 1;
		var day = today.getDate();
		var hour = today.getHours();
		var minute = today.getMinutes();
		var second = today.getSeconds();

		var offset = today.getTimezoneOffset();
		var pm = offset < 0 ? '+' : '-';
		offset = Math.abs(offset);
		var hourdifference = offset / 60;
		var minutedifference = offset % 60;

		if (second <= 9) {
			second = '0' + second;
		}

		var milli = today.getMilliseconds();
		if (milli !== 0) {
			milli = '.' + milli;
			if (milli.length > 4) {
				milli = milli.substring(0, 4);
			}
			second = second + milli;
		}

		var timezone;

		if (offset === 0) {
			timezone = 'Z';
		} else {
			if (minutedifference < 10) {
				minutedifference = '0' + minutedifference;
			}
			if (hourdifference < 10) {
				hourdifference = '0' + hourdifference;
			}
			timezone = pm + hourdifference + ':' + minutedifference;
		}

		if (month <= 9) {
			month = '0' + month;
		}
		if (day <= 9) {
			day = '0' + day;
		}
		if (hour <= 9) {
			hour = '0' + hour;
		}
		if (minute <= 9) {
			minute = '0' + minute;
		}

		return year + '-' + month + '-' + day + 'T' + hour + ':' + minute + ':' + second + timezone;
	};

	_sforce.internal.stringToDate = function (source) {
		var bc = false;
		if (source === null || source.length === 0) {
			throw 'Unable to parse dateTime';
		}

		if (source.charAt(0) == '+') {
			source = source.substring(1);
		}

		if (source.charAt(0) == '-') {
			source = source.substring(1);
			bc = true;
		}

		if (source.length != 10) {
			throw 'Unable to parse date, ' + source + ' length != 10';
		}

		if (source.charAt(4) != '-' || source.charAt(7) != '-') {
			throw 'Unable to parse date';
		}

		var year = source.substring(0, 4);
		var month = source.substring(5, 7);
		var day = source.substring(8, 10);

		var date = new Date(year, month - 1, day, 0, 0, 0);
		date.setMilliseconds(0);
		return date;
	};

	_sforce.internal.stringToDateTime = function (source) {
		var bc = false;
		if (source === null || source.length === 0) {
			throw 'Unable to parse dateTime';
		}

		if (source.charAt(0) == '+') {
			source = source.substring(1);
		}
		if (source.charAt(0) == '-') {
			source = source.substring(1);
			bc = true;
		}

		if (source.length < 19) {
			throw 'Unable to parse dateTime';
		}

		if (source.charAt(4) != '-' || source.charAt(7) != '-' || source.charAt(10) != 'T') {
			throw 'Unable to parse dateTime';
		}

		if (source.charAt(13) != ':' || source.charAt(16) != ':') {
			throw 'Unable to parse dateTime';
		}

		var year = source.substring(0, 4);
		var month = source.substring(5, 7);
		var day = source.substring(8, 10);
		var hour = source.substring(11, 13);
		var min = source.substring(14, 16);
		var sec = source.substring(17, 19);

		var date = new Date(year, month - 1, day, hour, min, sec);

		var pos = 19;

		// parse optional milliseconds
		if (pos < source.length && source.charAt(pos) == '.') {
			var milliseconds = 0;
			var start = ++pos;
			while (pos < source.length && _sforce.internal.isDigit(source.charAt(pos))) {
				pos++;
			}
			var decimal = source.substring(start, pos);
			if (decimal.length == 3) {
				milliseconds = decimal;
			} else if (decimal.length < 3) {
				milliseconds = (decimal + '000').substring(0, 3);
			} else {
				milliseconds = decimal.substring(0, 3);
				if (decimal.charAt(3) >= '5') {
					++milliseconds;
				}
			}

			date.setMilliseconds(milliseconds);
		}

		var offset = date.getTimezoneOffset() * 60000;
		//offset in milli;

		// parse optional timezone
		if (pos + 5 < source.length && (source.charAt(pos) == '+' || source.charAt(pos) == '-')) {
			if (!_sforce.internal.isDigit(source.charAt(pos + 1)) || !_sforce.internal.isDigit(source.charAt(pos + 2)) || source.charAt(pos + 3) != ':' || !_sforce.internal.isDigit(source.charAt(pos + 4)) || !_sforce.internal.isDigit(source.charAt(pos + 5))) {
				throw 'Unable to parse dateTime';
			}
			var hours = (source.charAt(pos + 1) - '0') * 10 + source.charAt(pos + 2) - '0';
			var mins = (source.charAt(pos + 4) - '0') * 10 + source.charAt(pos + 5) - '0';
			var mseconds = (hours * 60 + mins) * 60 * 1000;

			// subtract milliseconds from current date to obtain GMT
			if (source.charAt(pos) == '+') {
				mseconds = -mseconds;
			}

			date = new Date(date.getTime() - offset + mseconds);
			pos += 6;
		}

		if (pos < source.length && source.charAt(pos) == 'Z') {
			pos++;
			date = new Date(date.getTime() - offset);
		}

		if (pos < source.length) {
			throw 'Unable to parse dateTime';
		}

		return date;
	};

	_sforce.internal.isDigit = function (ch) {
		if (ch == '0' || ch == '1' || ch == '2' || ch == '3' || ch == '4' || ch == '5' || ch == '6' || ch == '7' || ch == '8' || ch == '9') {
			return true;
		} else {
			return false;
		}
	};
	/** Xml */

	_sforce.Xml = function (name) {};

	_sforce.Xml.prototype.toXml = function (sobjectNs, name, writer) {
		writer.writeStartElement(name, sobjectNs);
		if (this._xsiType) {
			writer.writeXsiType(this._xsiType);
		}
		for (var f in this) {
			if ('_name' == f || '_xsiType' == f) {
				//skip
			} else {
				var val = this[f];
				if (typeof val != 'function') {
					if (typeof val == 'array') {
						for (var i = 0; i < val.length; i++) {
							this.writeValue(sobjectNs, writer, f, val[i]);
						}
					} else {
						this.writeValue(sobjectNs, writer, f, val);
					}
				}
			}
		}
		writer.writeEndElement(name, sobjectNs);
	};

	_sforce.Xml.prototype.writeValue = function (sobjectNs, writer, name, val) {
		if (val === null) {
			writer.writeNameValueNode('fieldsToNull', name);
			return;
		}
		if (typeof val === 'undefined') {
			//TODO:  throw "value for field " + name + " is undefined"; Bug: 100000000000Ufg
			return; //skip for now
		}
		if (val.toXml) {
			val.toXml(sobjectNs, name, writer);
		} else {
			writer.writeNameValueNode(name, val);
		}
	};

	_sforce.Xml.prototype.get = function (name) {
		return this[name] ? this[name] : null;
	};

	_sforce.Xml.prototype.set = function (name, value) {
		this[name] = value;
	};

	_sforce.Xml.prototype.getArray = function (name) {
		var obj = this[name];
		if (obj) {
			if (obj.join) {
				return obj;
			} else {
				return [obj];
			}
		} else {
			return [];
		}
	};

	_sforce.Xml.prototype.getBoolean = function (name) {
		return 'true' == this[name] ? true : false;
	};

	_sforce.Xml.prototype.getDate = function (name) {
		if (this[name]) {
			if (this[name].getFullYear) {
				return this[name];
			} else {
				return _sforce.internal.stringToDate(this[name]);
			}
		} else {
			return null;
		}
	};

	_sforce.Xml.prototype.getDateTime = function (name) {
		if (this[name]) {
			if (this[name].getFullYear) {
				return this[name];
			} else {
				return _sforce.internal.stringToDateTime(this[name]);
			}
		} else {
			return null;
		}
	};

	_sforce.Xml.prototype.getInt = function (name) {
		if (this[name]) {
			if (typeof this[name] === 'number') {
				return this[name];
			} else {
				return parseInt(this[name], 10);
			}
		} else {
			throw 'Unable to parse int field: ' + name;
		}
	};

	_sforce.Xml.prototype.getFloat = function (name) {
		if (this[name]) {
			if (typeof this[name] === 'number') {
				return this[name];
			} else {
				return parseFloat(this[name]);
			}
		} else {
			throw 'Unable to parse float field: ' + name;
		}
	};

	_sforce.Xml.prototype.getBase64Binary = function (name) {
		if (this[name]) {
			return _sforce.Base64Binary.prototype.decode(this[name]);
		} else {
			throw 'Unable to parse base64Binary field: ' + name;
		}
	};

	_sforce.Xml.prototype.toString = function () {
		var sb = new _sforce.StringBuffer();
		sb.append('{');

		for (var f in this) {
			var field = this[f];

			if (!field) {
				sb.append(f).append(':').append('' + field);
			} else if ((typeof field === 'undefined' ? 'undefined' : (0, _typeof3.default)(field)) == 'object') {
				sb.append(f).append(':').append(field.toString());
			} else if (field.join) {
				sb.append(f).append(':').append('[');
				for (var i = 0; i < field.length; i++) {
					sb.append(field[i]);
					if (i < field.length - 1) {
						sb.append(', ');
					}
				}
				sb.append(']');
			} else if (typeof field == 'function') {
				continue;
			} else {
				sb.append(f).append(':').append("'" + field + "'");
			}
			sb.append(', ');
		}

		sb.append('}');
		return sb.toString();
	};

	/** Debug */

	_sforce.internal.Debug = function () {
		this.output = null;
		this.trace = false;
		this.apexTrace = false;
		this.win = null;
		this.traceQueue = [];
		this.quiet = false;

		this.open = function () {
			this.println('', 'print');
		};

		this.println = function (s, type) {
			if (this.quiet) {
				return;
			}

			if (typeof println === 'function') {
				println(s, type);
				return;
			}

			if (this.win === null || !this.win.document) {
				this.output = null;
				this.win = win.open(typeof win.UserContext != 'undefined' ? UserContext.getUrl(SOAP_DEBUG_SHELL) : SOAP_DEBUG_SHELL, '', 'width=800,height=400,toolbar=no,location=no,directories=no,alwaysRaised=yes,' + 'status=no,menubar=no,scrollbars=yes,copyhistory=yes,resizable=yes');
			}

			if (this.output === null) {
				this.findOutput();
			}

			if (this.output !== null) {
				if (_sforce.debug.traceQueue.length > 0) {
					this.traceCallback();
				}
				this.win.println(s, type);
			} else {
				_sforce.debug.traceQueue.push({ message: s, type: type });
				/*allowFunc*/setTimeout(_sforce.debug.traceCallback, 1000);
			}
		};

		this.traceCallback = function () {
			_sforce.debug.findOutput();

			if (_sforce.debug.output === null) {
				/*allowFunc*/setTimeout(_sforce.debug.traceCallback, 1000);
				return;
			}

			for (var i = 0; i < _sforce.debug.traceQueue.length; i++) {
				var element = _sforce.debug.traceQueue[i];
				_sforce.debug.win.println(element.message, element.type);
			}
			_sforce.debug.traceQueue = [];
		};

		this.findOutput = function () {
			if (this.output === null) {
				this.output = this.win.document.getElementById('output');
			}
			return this.output;
		};

		this.logXml = function (str) {
			str = str.replace(/</g, '&lt;');
			str = str.replace(/>/g, '&gt;');
			str = '<textarea cols=80 rows=5 wrap=hard>' + str + '</textarea>';
			this.println(str, 'printxml');
		};

		this.log = function (str) {
			this.println(str, 'print');
		};

		this.logApex = function (response) {
			var start = response.indexOf('<debugLog>');
			var end = response.indexOf('</debugLog>');
			if (start === -1) start = 0;else start = start + '<debugLog>'.length;
			if (end === -1) end = response.length;
			var msg = response.substring(start, end);

			this.println(msg, 'printxml');
		};
	};

	_sforce.debug = new _sforce.internal.Debug();

	/** Transport */

	_sforce.internal._connections = [];

	_sforce.internal.ConnectionHolder = function (connection, callback) {
		this.connection = connection;
		this.callback = callback;
		this.timedout = false;
	};

	_sforce.Transport = function (url) {
		this.url = url;
		this.connection = null;

		this.newConnection = function () {
			try {
				this.connection = new ActiveXObject('Msxml2.XMLHTTP');
			} catch (e) {
				try {
					this.connection = new ActiveXObject('Microsoft.XMLHTTP');
				} catch (e) {
					this.connection = new XMLHttpRequest();
				}
			}

			return this.connection;
		};

		this.send = function (envelope, callback, async, timeout) {
			this.newConnection();
			if (async) {
				this.connection.onreadystatechange = this.httpConnectionCallback;
			}
			var holder = new _sforce.internal.ConnectionHolder(this.connection, callback);
			_sforce.internal._connections.push(holder);
			this.connection.open('POST', this.url, async);
			this.connection.setRequestHeader('Content-Type', 'text/xml; charset=UTF-8');
			this.connection.setRequestHeader('SOAPAction', '""');
			this.connection.setRequestHeader('Accept', 'text/xml');
			//this.connection.setRequestHeader("User-Agent", "SFAJAX 1.0"); -- avoid errors in browser c0nsole
			this.connection.send(envelope);
			if (async && typeof timeout !== 'undefined') {
				this.setTimeoutOn(holder, timeout);
			}
			if (!async) {
				this.httpConnectionCallback();
			}
		};

		this.setTimeoutOn = function (holder, timeout) {
			function abortConnection() {
				if (holder.connection.readyState !== 4) {
					holder.timedout = true;
					holder.connection.abort();
				}
			}
			/*allowFunc*/setTimeout(abortConnection, timeout);
		};

		this.httpConnectionCallback = function () {
			for (var i = 0; i < _sforce.internal._connections.length; i++) {
				var holder = _sforce.internal._connections[i];
				if (holder !== null) {
					if (holder.timedout) {
						_sforce.internal._connections[i] = null;
						_sforce.internal._connections.slice(i, 1);
						holder.callback.httpCallback('Remote invocation timed out', false);
					} else if (holder.connection.readyState == 4) {
						_sforce.internal._connections[i] = null;
						_sforce.internal._connections.slice(i, 1);
						var success = holder.connection.status == 200;
						if (_sforce.debug.trace) {
							_sforce.debug.log('Response : status - ' + holder.connection.status);
							_sforce.debug.logXml(holder.connection.responseText);
						}
						if (_sforce.debug.apexTrace) {
							_sforce.debug.logApex(holder.connection.responseText);
						}
						if (holder.connection.responseXML && holder.connection.responseXML.documentElement) {
							holder.callback.httpCallback(holder.connection.responseXML.documentElement, success);
						} else {
							holder.callback.httpCallback('Remote invocation failed, due to: ' + holder.connection.responseText + ' status code: ', holder.connection.status);
						}
					}
				}
			}
		};
	};
	/** XmlWriter */

	_sforce.XmlWriter = function () {
		this.buffer = new _sforce.StringBuffer();
		this.namespaces = {};
		this.prefixCount = 0;
		this.writingStartElement = false;
	};

	_sforce.XmlWriter.prototype.writeStartElement = function (name, namesp, prefix) {
		if (this.writingStartElement) {
			this.buffer.append('>');
		}
		this.buffer.append('<');
		var newns = false;
		if (namesp) {
			if (!this.namespaces[namesp] && this.namespaces[namesp] !== '') {
				newns = true;
			}
			if (!prefix) {
				prefix = this.getPrefix(namesp);
			}
			if (prefix !== null && prefix !== '') {
				this.buffer.append(prefix);
				this.buffer.append(':');
			}
		}

		this.buffer.append(name);
		if (newns === true) {
			this.writeNamespace(namesp, prefix);
		}
		this.writingStartElement = true;
	};

	_sforce.XmlWriter.prototype.writeEndElement = function (name, namesp) {
		if (this.writingStartElement) {
			this.buffer.append('/>');
		} else {
			this.buffer.append('</');
			if (namesp) {
				var prefix = this.getPrefix(namesp);
				if (prefix && prefix !== '') {
					this.buffer.append(prefix);
					this.buffer.append(':');
				}
			}
			this.buffer.append(name);
			this.buffer.append('>');
		}
		this.writingStartElement = false;
	};

	_sforce.XmlWriter.prototype.writeNamespace = function (namesp, prefix) {
		if (prefix && '' !== prefix) {
			this.namespaces[namesp] = prefix;
			this.buffer.append(' ');
			this.buffer.append('xmlns:');
			this.buffer.append(prefix);
		} else {
			this.namespaces[namesp] = '';
			this.buffer.append(' ');
			this.buffer.append('xmlns');
		}
		this.buffer.append('="');
		this.buffer.append(namesp);
		this.buffer.append('"');
	};

	_sforce.XmlWriter.prototype.writeText = function (text) {
		if (this.writingStartElement) {
			this.buffer.append('>');
			this.writingStartElement = false;
		} else {
			throw 'Can only write text after a start element';
		}
		if (typeof text == 'string') {
			text = text.replace(/&/g, '&amp;');
			text = text.replace(/</g, '&lt;');
			text = text.replace(/>/g, '&gt;');
		}

		this.buffer.append(text);
	};

	_sforce.XmlWriter.prototype.writeXsiType = function (xsiType) {
		this.writeNamespace('http://www.w3.org/2001/XMLSchema-instance', 'xsi');
		this.writeAttribute('xsi:type', xsiType);
	};

	_sforce.XmlWriter.prototype.writeAttribute = function (name, value) {
		this.buffer.append(' ' + name + '="' + value + '"');
	};

	_sforce.XmlWriter.prototype.getPrefix = function (namesp) {
		var prefix = this.namespaces[namesp];
		//sforce.debug.log("--------");
		//sforce.debug.log(namesp + ":" + (prefix === null ? "null":prefix) + ":");
		if (!prefix && prefix !== '') {
			prefix = 'ns' + this.prefixCount;
			this.prefixCount++;
			this.namespaces[namesp] = prefix;
			return prefix;
		}
		return prefix;
	};

	_sforce.XmlWriter.prototype.toString = function () {
		return this.buffer.toString();
	};

	/** soap writer*/
	_sforce.XmlWriter.prototype.soapNS = 'http://schemas.xmlsoap.org/soap/envelope/';

	_sforce.XmlWriter.prototype.startEnvelope = function () {
		this.writeStartElement('Envelope', this.soapNS, 'se');
	};

	_sforce.XmlWriter.prototype.endEnvelope = function () {
		this.writeEndElement('Envelope', this.soapNS);
	};

	_sforce.XmlWriter.prototype.startHeader = function () {
		this.writeStartElement('Header', this.soapNS, 'se');
	};

	_sforce.XmlWriter.prototype.endHeader = function () {
		this.writeEndElement('Header', this.soapNS);
	};

	_sforce.XmlWriter.prototype.startBody = function () {
		this.writeStartElement('Body', this.soapNS, 'se');
	};

	_sforce.XmlWriter.prototype.endBody = function () {
		this.writeEndElement('Body', this.soapNS);
	};

	_sforce.XmlWriter.prototype.writeNameValueNode = function (name, value) {
		if (value === null) {
			this.writeStartElement(name);
			this.writeNamespace('http://www.w3.org/2001/XMLSchema-instance', 'xsi');
			this.writeAttribute('xsi:nill', 'true');
			this.writeEndElement(name);
			return;
		}

		if (value.toUTCString) {
			value = _sforce.internal.dateTimeToString(value);
		}
		if (typeof value == 'boolean') {
			// boolean 'false' values get joined in string buffer,
			// so convert to strings:
			value = value ? 'true' : 'false';
		}

		if (value && value.join) {
			for (var i = 0; i < value.length; i++) {
				this.writeStartElement(name);
				this.writeText(value[i]);
				this.writeEndElement(name);
			}
		} else {
			this.writeStartElement(name);
			this.writeText(value);
			this.writeEndElement(name);
		}
	};

	/** XmlReader */

	_sforce.XmlReader = function (root) {
		this.envelope = root;
	};

	_sforce.XmlReader.prototype.getEnvelope = function () {
		if (this.isTag('Envelope', this.envelope)) {
			return this.envelope;
		}
		throw 'Unable to find soap envelope, but found ' + this.envelope.nodeName;
	};

	_sforce.XmlReader.prototype.getBody = function () {
		return this.getChild('Body', this.envelope);
	};

	_sforce.XmlReader.prototype.getHeader = function () {
		return this.getChild('Header', this.envelope);
	};

	_sforce.XmlReader.prototype.getChild = function (name, node) {
		var children = node.childNodes;
		for (var i = 0; i < children.length; i++) {
			if (children[i].nodeType == 1 && this.isTag(name, children[i])) {
				return children[i];
			}
		}
		return null;
	};

	_sforce.XmlReader.prototype.getFirstElement = function (node) {
		var children = node.childNodes;
		for (var i = 0; i < children.length; i++) {
			if (children[i].nodeType == 1) {
				return children[i];
			}
		}
		return null;
	};

	_sforce.XmlReader.prototype.isTag = function (name, node) {
		var ns = node.nodeName.split(':');
		if (ns.length == 2 && ns[1] == name) {
			return true;
		}
		if (ns.length == 1 && ns[0] == name) {
			return true;
		}
		return false;
	};

	_sforce.XmlReader.prototype.isNameValueNode = function (node) {
		var children = node.childNodes;
		for (var i = 0; i < children.length; i++) {
			if (children[i].nodeType != 3) {
				return false;
			}
		}

		return true;
	};

	_sforce.XmlReader.prototype.getTextValue = function (node) {
		if (node.nodeType == 3) {
			return node.nodeValue;
		}
		//todo: fix the hardcoded xsi prefix
		var xsiNil = node.getAttribute('xsi:nil');
		if (xsiNil == 'true') {
			return null;
		}
		var sb = '';
		var children = node.childNodes;
		for (var i = 0; i < children.length; i++) {
			if (children[i].nodeType == 3) {
				sb += children[i].nodeValue;
			} else {
				throw 'Not a simple name value node';
			}
		}
		return sb;
	};

	//todo: optimize
	/*
    sforce.XmlReader.prototype.toXmlObject2 = function(node) {
        var children = node.childNodes;
        var obj = new sforce.Xml();
        for (var i = 0; i < children.length; i++) {
            var child = children[i];
            if (child.nodeType != 1) continue;
            var name = child.nodeName;
            var index = name.indexOf(":");
            name = (index == -1) ? name : name.substring(index + 1);
            var value;
            if (this.isNameValueNode(child)) {
                value = this.getTextValue(child);
            } else {
                value = this.toXmlObject(child);
            }
            this.addToObject(obj, name, value);
        }
        return obj;
    }
    */

	_sforce.XmlReader.prototype.toXmlObject = function (n) {
		//todo: fix the hardcoded xsi prefix
		var xsiNil = n.getAttribute('xsi:nil');
		if (xsiNil == 'true') {
			return null;
		}

		var top = new _sforce.Xml();
		var stack = [];
		stack.push({ node: n, obj: top });

		while (stack.length > 0) {
			var st = stack.shift();

			for (var child = st.node.firstChild; child !== null; child = child.nextSibling) {
				if (child.nodeType != 1) {
					continue;
				}
				var name = child.nodeName;
				var index = name.indexOf(':');
				name = index == -1 ? name : name.substring(index + 1);
				var value;

				var isNameValue = true;
				var sb = '';
				for (var tc = child.firstChild; tc !== null; tc = tc.nextSibling) {
					if (tc.nodeType != 3) {
						isNameValue = false;
						break;
					} else {
						sb += tc.nodeValue;
					}
				}

				if (isNameValue) {
					if (child.getAttribute('xsi:nil') == 'true') {
						value = null;
					} else {
						value = sb;
					}
				} else {
					value = new _sforce.Xml();
					stack.push({ node: child, obj: value });
				}
				if (!st.obj[name]) {
					st.obj[name] = value;
				} else {
					if (st.obj[name].push) {
						st.obj[name].push(value);
					} else {
						var old = st.obj[name];
						if (name === 'Id' && old === value) {
							//skip, special case for dup Id in sobject
						} else {
							st.obj[name] = [];
							st.obj[name].push(old);
							st.obj[name].push(value);
						}
					}
				}
			}
		}
		return top;
	};

	/** SoapTransport */

	_sforce.SoapTransport = function () {
		this.connectionCallback = null;
		this.result = null;
		this.fault = null;
		this.isAsync = true;
		this.isArray = false;
	};

	_sforce.SoapTransport.prototype.onFailure = function (res, writer) {
		var error = 'ERROR: ........... ';
		(0, _log.log)(error + res);
		this.result = null;
	};

	_sforce.SoapTransport.prototype.send = function (url, writer, isArray, connectionCallback) {
		this.isArray = isArray;
		var transport = new _sforce.Transport(url);
		this.isAsync = connectionCallback ? true : false;
		if (this.isAsync) {
			this.connectionCallback = connectionCallback;
			transport.send(writer.toString(), this, this.isAsync, connectionCallback.timeout);
		} else {
			transport.send(writer.toString(), this, this.isAsync);
			if (this.fault !== null) {
				throw this.fault;
			}
			return this.result;
		}
	};

	_sforce.SoapTransport.prototype.httpCallback = function (response, success) {
		try {
			if (success === true) {
				var reader = new _sforce.XmlReader(response);
				var envelope = reader.getEnvelope();
				var body = reader.getBody();
				var operation = reader.getFirstElement(body);
				if (operation === null) {
					throw 'Unable to find operation response element';
				}
				var resultArray = [];
				var children = operation.childNodes;
				for (var i = 0; i < children.length; i++) {
					if (children[i].nodeType != 1) {
						continue;
					}
					if (reader.isNameValueNode(children[i])) {
						resultArray.push(reader.getTextValue(children[i]));
					} else {
						resultArray.push(reader.toXmlObject(children[i]));
					}
				}

				if (this.isArray) {
					this.result = resultArray;
				} else {
					if (resultArray.length > 1) {
						throw 'Found more than one response: ' + resultArray;
					}
					this.result = resultArray[0];
				}

				if (this.isAsync) {
					try {
						this.beforeCallback();
						if (typeof this.connectionCallback == 'function') {
							this.connectionCallback(this.result);
						} else {
							if (this.connectionCallback.onSuccess) {
								this.connectionCallback.onSuccess(this.result, this.connectionCallback.source);
							} else {
								throw 'Unable to find onSuccess method in the callback object';
							}
						}
					} finally {
						this.afterCallback();
					}
				}
			} else {
				if (typeof response.nodeName !== 'undefined') {
					var reader2 = new _sforce.XmlReader(response);
					var envelope2 = reader2.getEnvelope();
					var body2 = reader2.getBody();
					var soapfaultEl = reader2.getFirstElement(body2);
					var soapfault = reader2.toXmlObject(soapfaultEl);
					this.sendFault(soapfault);
				} else {
					this.sendFault(response);
				}
			}
		} catch (fault) {
			this.sendFault(fault);
		}
	};

	_sforce.SoapTransport.prototype.sendFault = function (fault) {
		if (this.isAsync) {
			if (this.connectionCallback.onFailure) {
				try {
					this.beforeCallback();
					this.connectionCallback.onFailure(fault, this.connectionCallback.source);
				} finally {
					this.afterCallback();
				}
			} else {
				this.onFailure(fault);
			}
		} else {
			this.fault = fault;
		}
	};

	_sforce.SoapTransport.prototype.beforeCallback = function () {};

	_sforce.SoapTransport.prototype.afterCallback = function () {};

	/** SObject */

	_sforce.SObject = function (type) {
		this.type = type;
	};

	_sforce.SObject.prototype = new _sforce.Xml('sObjects');

	/** LeadConvert */

	_sforce.LeadConvert = function () {};

	_sforce.LeadConvert.prototype = new _sforce.Xml('leadConverts');

	/** MergeRequest */

	_sforce.MergeRequest = function () {};

	_sforce.MergeRequest.prototype = new _sforce.Xml('request');

	/** QuickAction */

	_sforce.QuickAction = function () {};

	_sforce.QuickAction.prototype = new _sforce.Xml('quickActions');

	/** Connection */

	_sforce.Connection = function () {
		this.sessionId = null;
		this.updateMru = null;
		this.allowFieldTruncation = null;
		this.disableFeedTracking = null;
		this.streamingEnabled = null;
		this.allOrNone = null;
		this.client = null;
		this.defaultNamespace = null;
		this.batchSize = null;
		this.loginScopeHeader = null;
		this.emailHeader = null;
		this.assignmentRuleHeader = null;
		this.transferToUserId = null;
		this.debuggingHeader = null;
		this.serverUrl = typeof win.UserContext != 'undefined' ? UserContext.getUrl(SERVICES_SOAP) : SERVICES_SOAP;
	};

	/** internal methods */

	_sforce.internal.Parameter = function (n, v, a) {
		this.name = n;
		this.value = v;
		this.isArray = a;
	};

	_sforce.Connection.prototype.sforceNs = 'urn:partner.soap.sforce.com';
	_sforce.Connection.prototype.sobjectNs = 'sobject.partner.soap.sforce.com';

	_sforce.Connection.prototype.writeOne = function (writer, name, value, sobjectNs) {
		if (value === null) {
			writer.writeNameValueNode(name, null);
		} else if (value.toXml) {
			value.toXml(sobjectNs, name, writer);
		} else {
			writer.writeNameValueNode(name, value);
		}
	};

	_sforce.Connection.prototype.init = function (sessionId, serverUrl) {
		this.sessionId = sessionId;
		this.serverUrl = serverUrl;
	};

	_sforce.Connection.prototype.login = function (username, password) {
		var arg1 = new _sforce.internal.Parameter('username', username, false);
		var arg2 = new _sforce.internal.Parameter('password', password, false);
		var result = this.invoke('login', [arg1, arg2], false, null);
		this.sessionId = result.sessionId;
		return result;
	};

	_sforce.Connection.prototype.describeSObject = function (type, callback) {
		var arg = new _sforce.internal.Parameter('sObjectType', type, false);
		return this.invoke('describeSObject', [arg], false, callback);
	};

	_sforce.Connection.prototype.describeSObjects = function (types, callback) {
		var arg = new _sforce.internal.Parameter('sObjectType', types, true);
		return this.invoke('describeSObjects', [arg], true, callback);
	};

	_sforce.Connection.prototype.describeGlobal = function (callback) {
		return this.invoke('describeGlobal', [], false, callback);
	};

	_sforce.Connection.prototype.describeLayout = function (type, recordTypes, callback) {
		var arg1 = new _sforce.internal.Parameter('sObjectType', type, false);
		if (!recordTypes) {
			recordTypes = [];
		}
		var arg2 = new _sforce.internal.Parameter('recordTypeIds', recordTypes, true);
		return this.invoke('describeLayout', [arg1, arg2], false, callback);
	};

	_sforce.Connection.prototype.describeAvailableQuickActions = function (parentType, callback) {
		var arg = new _sforce.internal.Parameter('parentType', parentType, false);
		return this.invoke('describeAvailableQuickActions', [arg], true, callback);
	};

	_sforce.Connection.prototype.describeQuickActions = function (quickActionNames, callback) {
		var arg = new _sforce.internal.Parameter('quickActionNames', quickActionNames, true);
		return this.invoke('describeQuickActions', [arg], true, callback);
	};

	_sforce.Connection.prototype.performQuickActions = function (quickActions, callback) {
		var arg = new _sforce.internal.Parameter('quickActions', quickActions, true);
		return this.invoke('performQuickActions', [arg], true, callback);
	};

	_sforce.Connection.prototype.describeCompactLayouts = function (type, recordTypes, callback) {
		var arg = new _sforce.internal.Parameter('sObjectType', type, false);
		if (!recordTypes) {
			recordTypes = [];
		}
		var arg2 = new _sforce.internal.Parameter('recordTypeIds', recordTypes, true);
		return this.invoke('describeCompactLayouts', [arg, arg2], false, callback);
	};

	_sforce.Connection.prototype.describeTabs = function (callback) {
		return this.invoke('describeTabs', [], true, callback);
	};

	_sforce.Connection.prototype.describeFlexiPages = function (flexipageDevName, callback) {
		var arg1 = new _sforce.internal.Parameter('FlexiPage', flexipageDevName, false);
		return this.invoke('describeFlexiPages', [arg1], true, callback);
	};

	_sforce.Connection.prototype.describeTheme = function (themeNames, callback) {
		var arg = new _sforce.internal.Parameter('themeNames', themeNames, true);
		return this.invoke('describeTheme', [arg], true, callback);
	};

	_sforce.Connection.prototype.describeGlobalTheme = function (callback) {
		return this.invoke('describeGlobalTheme', [], true, callback);
	};

	_sforce.Connection.prototype.describeSoftphoneLayout = function (callback) {
		return this.invoke('describeSoftphoneLayout', [], false, callback);
	};

	_sforce.Connection.prototype.describeMiniLayout = function (type, recordTypeIds, callback) {
		var arg1 = new _sforce.internal.Parameter('sObjectType', type, false);
		var arg2 = new _sforce.internal.Parameter('recordTypeIds', recordTypeIds, true);
		return this.invoke('describeMiniLayout', [arg1, arg2], false, callback);
	};

	_sforce.Connection.prototype.describeSearchScopeOrder = function (callback) {
		return this.invoke('describeSearchScopeOrder', [], true, callback);
	};

	_sforce.Connection.prototype.create = function (sobjects, callback) {
		var arg = new _sforce.internal.Parameter('sObjects', sobjects, true);
		return this.invoke('create', [arg], true, callback);
	};

	_sforce.Connection.prototype.update = function (sobjects, callback) {
		var arg = new _sforce.internal.Parameter('sObjects', sobjects, true);
		return this.invoke('update', [arg], true, callback);
	};

	_sforce.Connection.prototype.upsert = function (externalIDFieldName, sobjects, callback) {
		var arg1 = new _sforce.internal.Parameter('externalIDFieldName', externalIDFieldName, false);
		var arg2 = new _sforce.internal.Parameter('sObjects', sobjects, true);
		return this.invoke('upsert', [arg1, arg2], true, callback);
	};

	_sforce.Connection.prototype.deleteIds = function (ids, callback) {
		var arg = new _sforce.internal.Parameter('ids', ids, true);
		return this.invoke('delete', [arg], true, callback);
	};

	_sforce.Connection.prototype.impersonateUser = function (ids, callback) {
		var arg = new _sforce.internal.Parameter('ids', ids, true);
		return this.invoke('impersonateUser', [arg], true, callback);
	};
	_sforce.Connection.prototype.query = function (queryString, callback) {
		var arg = new _sforce.internal.Parameter('queryString', queryString, false);
		return this.invoke('query', [arg], false, callback);
	};

	_sforce.Connection.prototype.queryAll = function (queryString, callback) {
		var arg = new _sforce.internal.Parameter('queryString', queryString, false);
		return this.invoke('queryAll', [arg], false, callback);
	};

	_sforce.Connection.prototype.queryMore = function (queryLocator, callback) {
		var arg = new _sforce.internal.Parameter('queryLocator', queryLocator, false);
		return this.invoke('queryMore', [arg], false, callback);
	};

	_sforce.Connection.prototype.retrieve = function (fieldList, sObjectType, ids, callback) {
		var arg1 = new _sforce.internal.Parameter('fieldList', fieldList, false);
		var arg2 = new _sforce.internal.Parameter('sObjectType', sObjectType, false);
		var arg3 = new _sforce.internal.Parameter('ids', ids, true);
		return this.invoke('retrieve', [arg1, arg2, arg3], true, callback);
	};

	_sforce.Connection.prototype.getUserInfo = function (callback) {
		return this.invoke('getUserInfo', [], false, callback);
	};

	_sforce.Connection.prototype.resetPassword = function (userId, callback) {
		var arg1 = new _sforce.internal.Parameter('userId', userId, false);
		return this.invoke('resetPassword', [arg1], false, callback);
	};

	_sforce.Connection.prototype.setPassword = function (userId, password, callback) {
		var arg1 = new _sforce.internal.Parameter('userId', userId, false);
		var arg2 = new _sforce.internal.Parameter('password', password, false);
		return this.invoke('setPassword', [arg1, arg2], false, callback);
	};

	_sforce.Connection.prototype.search = function (searchString, callback) {
		var arg1 = new _sforce.internal.Parameter('searchString', searchString, false);
		return this.invoke('search', [arg1], false, callback);
	};

	_sforce.Connection.prototype.getDeleted = function (sObjectType, startDate, endDate, callback) {
		var arg1 = new _sforce.internal.Parameter('sObjectType', sObjectType, false);
		var arg2 = new _sforce.internal.Parameter('startDate', startDate, false);
		var arg3 = new _sforce.internal.Parameter('endDate', endDate, false);
		return this.invoke('getDeleted', [arg1, arg2, arg3], false, callback);
	};

	_sforce.Connection.prototype.getUpdated = function (sObjectType, startDate, endDate, callback) {
		var arg1 = new _sforce.internal.Parameter('sObjectType', sObjectType, false);
		var arg2 = new _sforce.internal.Parameter('startDate', startDate, false);
		var arg3 = new _sforce.internal.Parameter('endDate', endDate, false);
		return this.invoke('getUpdated', [arg1, arg2, arg3], false, callback);
	};

	_sforce.Connection.prototype.getServerTimestamp = function (callback) {
		return this.invoke('getServerTimestamp', [], false, callback);
	};

	_sforce.Connection.prototype.convertLead = function (leadConverts, callback) {
		var arg1 = new _sforce.internal.Parameter('leadConverts', leadConverts, true);
		return this.invoke('convertLead', [arg1], true, callback);
	};

	_sforce.Connection.prototype.merge = function (mergeRequest, callback) {
		var arg1 = new _sforce.internal.Parameter('request', mergeRequest, true);
		return this.invoke('merge', [arg1], true, callback);
	};

	_sforce.Connection.prototype.undelete = function (ids, callback) {
		var arg1 = new _sforce.internal.Parameter('ids', ids, true);
		return this.invoke('undelete', [arg1], true, callback);
	};

	_sforce.Connection.prototype.process = function (actions, callback) {
		var arg1 = new _sforce.internal.Parameter('actions', actions, true);
		return this.invoke('process', [arg1], true, callback);
	};

	_sforce.Connection.prototype.sendEmail = function (messages, callback) {
		var arg1 = new _sforce.internal.Parameter('messages', messages, true);
		return this.invoke('sendEmail', [arg1], true, callback);
	};

	_sforce.Connection.prototype.emptyRecycleBin = function (ids, callback) {
		var arg1 = new _sforce.internal.Parameter('ids', ids, true);
		return this.invoke('emptyRecycleBin', [arg1], true, callback);
	};

	_sforce.Connection.prototype.invalidateSessions = function (sessionIds, callback) {
		var arg = new _sforce.internal.Parameter('sessionIds', sessionIds, true);
		return this.invoke('invalidateSessions', [arg], true, callback);
	};

	_sforce.Connection.prototype.logout = function (callback) {
		return this.invoke('logout', [], true, callback);
	};

	_sforce.Connection.prototype.remoteFunction = function (args) {
		if (!args.url) {
			throw 'url not defined';
		}
		if (!args.onSuccess) {
			throw 'onSuccess method not defined';
		}

		if (!args.method) {
			args.method = 'GET';
		}
		if (!args.mimeType) {
			args.mimeType = 'text/plain';
		}

		if (typeof args.async == 'undefined') {
			args.async = true;
		}

		if (typeof args.cache == 'undefined') {
			args.cache = false;
		}

		if (!(args.mimeType == 'text/plain' || args.mimeType == 'text/xml')) {
			throw 'Unknown mime type ' + args.mimeType;
		}

		if (_sforce.debug.trace) {
			_sforce.debug.log('Open connection to ... ' + args.url);
		}

		var request = new _sforce.Transport().newConnection();
		var proxyUrl = typeof win.UserContext != 'undefined' ? UserContext.getUrl('/services/proxy') : '/services/proxy';
		if (args.cache) {
			proxyUrl = proxyUrl + '?end-point-url=' + args.url;
		} else {
			proxyUrl = proxyUrl + '?no-cache=' + new Date().getTime();
		}
		request.open(args.method, proxyUrl, args.async);

		if (args.requestHeaders) {
			for (var k in args.requestHeaders) {
				if (typeof args.requestHeaders[k] != 'function') {
					request.setRequestHeader(k, args.requestHeaders[k]);
				}
			}
		}

		request.setRequestHeader('SalesforceProxy-Endpoint', args.url);
		request.setRequestHeader('SalesforceProxy-SID', this.sessionId);

		if (args.async) {
			request.onreadystatechange = _remoteFunctionCallback;
		}

		if (_sforce.debug.trace) {
			_sforce.debug.log('Sending ...');
		}

		if (args.requestData) {
			request.send(args.requestData);
		} else {
			request.send(null);
		}

		if (_sforce.debug.trace) {
			_sforce.debug.log('Done Sending ...');
		}

		if (!args.async) {
			_remoteFunctionCallback();
		}

		function _remoteFunctionCallback() {
			if (_sforce.debug.trace) {
				_sforce.debug.log('callback called ...');
			}
			if (request.readyState == 4) {
				if (request.status == 200) {
					if (args.mimeType == 'text/plain') {
						args.onSuccess(request.responseText, request);
					} else if (args.mimeType == 'text/xml') {
						if (!request.responseXML || !request.responseXML.documentElement) {
							throw 'Response not text/xml mime type: ' + request.responseText;
						}
						args.onSuccess(request.responseXML.documentElement, request);
					} else {
						throw 'unsupported mime type: ' + args.mimeType;
					}
				} else {
					if (args.onFailure) {
						args.onFailure(request.responseText, request);
					} else {
						_sforce.debug.log(request.responseText);
					}
				}
			}
		}
	};

	_sforce.Connection.prototype.writeHeader = function (writer, headerNs) {
		writer.startHeader();

		writer.writeNamespace(headerNs, 'sfns');

		if (this.sessionId !== null) {
			writer.writeStartElement('SessionHeader', headerNs);
			writer.writeNameValueNode('sessionId', this.sessionId);
			writer.writeEndElement('SessionHeader', headerNs);
		}
		if (typeof this.organizationId !== 'undefined') {
			throw 'Use sforce.connection.loginScopeHeader.organizationId instead of sforce.connection.organizationId';
		}
		if (this.loginScopeHeader !== null) {
			writer.writeStartElement('LoginScopeHeader', headerNs);
			if (this.loginScopeHeader.organizationId !== null) {
				writer.writeNameValueNode('organizationId', this.loginScopeHeader.organizationId);
			}
			if (this.loginScopeHeader.portalId !== null) {
				writer.writeNameValueNode('portalId', this.loginScopeHeader.portalId);
			}
			writer.writeEndElement('LoginScopeHeader', headerNs);
		}
		if (this.client !== null || this.defaultNamespace !== null) {
			writer.writeStartElement('CallOptions', headerNs);
			if (this.client !== null) {
				writer.writeNameValueNode('client', this.client);
			}
			if (this.defaultNamespace !== null) {
				writer.writeNameValueNode('defaultNamespace', this.defaultNamespace);
			}
			writer.writeEndElement('CallOptions', headerNs);
		}
		if (this.batchSize !== null) {
			writer.writeStartElement('QueryOptions', headerNs);
			writer.writeNameValueNode('batchSize', this.batchSize);
			writer.writeEndElement('QueryOptions', headerNs);
		}
		if (this.allowFieldTruncation !== null) {
			writer.writeStartElement('AllowFieldTruncationHeader', headerNs);
			writer.writeNameValueNode('allowFieldTruncation', this.allowFieldTruncation);
			writer.writeEndElement('AllowFieldTruncationHeader', headerNs);
		}
		if (this.disableFeedTracking !== null) {
			writer.writeStartElement('DisableFeedTrackingHeader', headerNs);
			writer.writeNameValueNode('disableFeedTracking', this.disableFeedTracking);
			writer.writeEndElement('DisableFeedTrackingHeader', headerNs);
		}
		if (this.streamingEnabled !== null) {
			writer.writeStartElement('StreamingEnabledHeader', headerNs);
			writer.writeNameValueNode('StreamingEnabled', this.streamingEnabled);
			writer.writeEndElement('StreamingEnabledHeader', headerNs);
		}
		if (this.allOrNone !== null) {
			writer.writeStartElement('AllOrNoneHeader', headerNs);
			writer.writeNameValueNode('allOrNone', this.allOrNone);
			writer.writeEndElement('AllOrNoneHeader', headerNs);
		}
		if (this.updateMru !== null) {
			writer.writeStartElement('MruHeader', headerNs);
			writer.writeNameValueNode('updateMru', this.updateMru);
			writer.writeEndElement('MruHeader', headerNs);
		}
		if (this.emailHeader !== null) {
			writer.writeStartElement('EmailHeader', headerNs);
			if (this.emailHeader.triggerAutoResponseEmail) {
				writer.writeNameValueNode('triggerAutoResponseEmail', this.emailHeader.triggerAutoResponseEmail);
			}
			if (this.emailHeader.triggerOtherEmail) {
				writer.writeNameValueNode('triggerOtherEmail', this.emailHeader.triggerOtherEmail);
			}
			if (this.emailHeader.triggerUserEmail) {
				writer.writeNameValueNode('triggerUserEmail', this.emailHeader.triggerUserEmail);
			}
			writer.writeEndElement('EmailHeader', headerNs);
		}
		if (this.assignmentRuleHeader !== null) {
			writer.writeStartElement('AssignmentRuleHeader', headerNs);
			if (this.assignmentRuleHeader.assignmentRuleId) {
				writer.writeNameValueNode('assignmentRuleId', this.assignmentRuleHeader.assignmentRuleId);
			}
			if (this.assignmentRuleHeader.useDefaultRule) {
				writer.writeNameValueNode('useDefaultRule', this.assignmentRuleHeader.useDefaultRule);
			}
			writer.writeEndElement('AssignmentRuleHeader', headerNs);
		}
		if (this.transferToUserId !== null) {
			writer.writeStartElement('UserTerritoryDeleteHeader', headerNs);
			writer.writeNameValueNode('transferToUserId', this.transferToUserId);
			writer.writeEndElement('UserTerritoryDeleteHeader', headerNs);
		}

		if (this.debuggingHeader !== null) {
			writer.writeStartElement('DebuggingHeader', headerNs);
			// Write out old style if specified
			if (this.debuggingHeader.debugLevel) {
				writer.writeNameValueNode('debugLevel', this.debuggingHeader.debugLevel);
			}
			// Write out the new style debugging categories and levels
			if (this.debuggingHeader.debugCategories) {
				var categories = this.debuggingHeader.debugCategories;
				for (var i = 0; i < categories.length; i++) {
					var catAndLevel = categories[i].split(',');

					if (catAndLevel.length == 2) {
						writer.writeStartElement('categories');
						writer.writeNameValueNode('category', catAndLevel[0]);
						writer.writeNameValueNode('level', catAndLevel[1]);
						writer.writeEndElement('categories');
					}
				}
			}
			writer.writeEndElement('DebuggingHeader', headerNs);
		}

		writer.endHeader();
	};

	_sforce.Connection.prototype.namespaceMap = [{ ns: _sforce.Connection.prototype.sforceNs, prefix: null }, { ns: _sforce.Connection.prototype.sobjectNs, prefix: 'ns1' }];

	_sforce.Connection.prototype.invoke = function (method, args, isArray, callback) {
		return this._invoke(method, args, isArray, callback, this.namespaceMap, this.serverUrl, this.sforceNs, this.sobjectNs);
	};

	_sforce.Connection.prototype._invoke = function (method, args, isArray, callback, namespaces, url, headerNs, sobjectNs) {
		if (callback) {
			if (typeof callback == 'function') {} else {
				if (!callback.onSuccess) {
					throw 'onSuccess not defined in the callback';
				}
				if (!callback.onFailure) {
					throw 'onFailure not defined in the callback';
				}
			}
		}

		var writer = new _sforce.XmlWriter();
		writer.startEnvelope();
		this.writeHeader(writer, headerNs);
		writer.startBody();
		writer.writeStartElement(method);

		for (var i = 0; i < namespaces.length; i++) {
			writer.writeNamespace(namespaces[i].ns, namespaces[i].prefix);
		}

		for (var i = 0; i < args.length; i++) {
			var arg = args[i];
			if (typeof arg.value === 'undefined') {
				throw 'arg ' + i + " '" + arg.name + "' not specified";
			}
			if (arg.value !== null) {
				if (arg.isArray && !arg.value.push) {
					throw 'arg ' + i + " '" + arg.name + "' is an array. But passed in value is not an array";
				}
				if (!arg.isArray && arg.value.push) {
					throw 'arg ' + i + " '" + arg.name + "' is not an array. But passed in value is an array";
				}
			}
			if (arg.value === null) {
				this.writeOne(writer, arg.name, null, sobjectNs);
			} else if (arg.value.push) {
				//this is an array
				for (var j = 0; j < arg.value.length; j++) {
					var obj = arg.value[j];
					if (!obj) {
						throw 'Array element at ' + j + ' is null.';
					}
					this.writeOne(writer, arg.name, obj, sobjectNs);
				}
			} else {
				this.writeOne(writer, arg.name, arg.value, sobjectNs);
			}
		}
		writer.writeEndElement(method);
		writer.endBody();
		writer.endEnvelope();
		if (_sforce.debug.trace) {
			_sforce.debug.log('Request: server- ' + url);
			_sforce.debug.logXml(writer.toString());
		}
		var transport = new _sforce.SoapTransport();
		return transport.send(url, writer, isArray, callback);
	};

	/* QueryResultIterator */

	_sforce.QueryResultIterator = function (queryResult) {
		this.queryResult = queryResult;
		this.index = 0;
		this.records = this.queryResult.getArray('records');
	};

	_sforce.QueryResultIterator.prototype.hasNext = function () {
		if (this.records.length > this.index) {
			return true;
		}
		if (this.queryResult.queryLocator !== null) {
			this.queryResult = _sforce.connection.queryMore(this.queryResult.queryLocator);
			this.records = this.queryResult.getArray('records');
			this.index = 0;
		}
		if (this.records.length > this.index) {
			return true;
		} else {
			return false;
		}
	};

	_sforce.QueryResultIterator.prototype.next = function () {
		if (this.records.length > this.index) {
			var result = this.records[this.index];
			this.index++;
			return result;
		} else {
			throw 'Index out of bound : ' + this.index;
		}
	};

	/* Email */

	_sforce.Email = function () {};

	_sforce.Email.prototype = new _sforce.Xml('messages');

	_sforce.MassEmailMessage = function () {};

	_sforce.MassEmailMessage.prototype = new _sforce.Xml('messages');
	_sforce.MassEmailMessage.prototype._xsiType = 'MassEmailMessage';

	_sforce.SingleEmailMessage = function () {};

	_sforce.SingleEmailMessage.prototype = new _sforce.Xml('messages');
	_sforce.SingleEmailMessage.prototype._xsiType = 'SingleEmailMessage';

	/* ProcessRequest */

	_sforce.ProcessRequest = function () {};

	_sforce.ProcessRequest.prototype = new _sforce.Xml('actions');

	_sforce.ProcessSubmitRequest = function () {};

	_sforce.ProcessSubmitRequest.prototype = new _sforce.Xml('actions');
	_sforce.ProcessSubmitRequest.prototype._xsiType = 'ProcessSubmitRequest';

	_sforce.ProcessWorkitemRequest = function () {};

	_sforce.ProcessWorkitemRequest.prototype = new _sforce.Xml('actions');
	_sforce.ProcessWorkitemRequest.prototype._xsiType = 'ProcessWorkitemRequest';
	/* set up connection */
	_sforce.connection = new _sforce.Connection();

	if (typeof __sfdcSiteUrlPrefix != 'undefined') {
		UserContext.siteUrlPrefix = __sfdcSiteUrlPrefix;
	}

	_sforce.connection.serverUrl = typeof win.UserContext != 'undefined' ? UserContext.getUrl(SERVICES_SOAP) : SERVICES_SOAP;

	if (typeof __sfdcSessionId != 'undefined') {
		_sforce.connection.sessionId = __sfdcSessionId;
	}

	//TODO: add ability to pass __sfdcSessionId through a CD IFrame

	function isSalesForceDomain() {
		var reg = new RegExp(_regexp2.default.sfDomain);
		return reg.test(win.document.domain);
	}

	function ctor() {
		var sid;

		// verify that the domain is salesforce and not visual.force
		// if there domain is salesforce.com we init the sforce.connection with the sid in cookie
		if (isSalesForceDomain()) {
			sid = CookiesManager.getCookie('sid');
		} else {
			if (!win.__sfdcSessionId) {
				win.__sfdcSessionId = win.sforce && win.sforce.connection && win.sforce.connection.sessionId;
			}
			// if the domain is not salesforce (and probably visual force), we look
			// for __sfdcSessionId var which is usually there
			sid = win.__sfdcSessionId;
		}

		if (!sid) {
			throw new Error('SfConnection not initialized. SessionID (sid) not found. If this is a Salesforce page, please check that Require HttpOnly attribute is disabled in Setup > Session Settings, then log out/in to Salesforce again.');
		}

		// using window.location.host and not document domain for getting the port (if exists) as well
		var serverUrl = window.location.protocol + '//' + win.location.host + SERVICES_SOAP;
		_sforce.connection.init(sid, serverUrl); /*Initialize the sforce connection*/

		_initialized = true;
	}

	ctor.apply(null, arguments);
}

exports.SalesForceConnection = SalesForceConnection;


/***/ }),

/***/ 9423:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

'use strict';

Object.defineProperty(exports, "__esModule", ({
	value: true
}));
exports.SalesForceConnectionUtils = undefined;

var _promise = __webpack_require__(3125);

var _promise2 = _interopRequireDefault(_promise);

var _wmPrelibPluginEntryManager = __webpack_require__(3257);

var _wmPromise = __webpack_require__(309);

var _log = __webpack_require__(4614);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ctx = (0, _wmPrelibPluginEntryManager.getCtx)();

function SalesForceConnectionUtils() {
	var _this = this;

	_this.injectSFConnection = function injectSFConnection(successCallback, failureCallback) {
		var salesForceConnection = ctx.get('SalesForceConnection');
		var sforceObject = salesForceConnection.getSforce();
		if (sforceObject) {
			successCallback && successCallback(sforceObject);
		} else {
			failureCallback();
		}
	};

	_this.injectSFConnectionWithPromise = function injectSFConnectionWithPromise() {
		(0, _log.log)('Injecting SFConnection...');
		return (0, _wmPromise.retry)(function () {
			return new _promise2.default(function (resolve, reject) {
				var sforceObject = ctx.get('SalesForceConnection').getSforce();
				if (sforceObject) {
					(0, _log.log)('Success, we got:', sforceObject);
					resolve(sforceObject);
				} else {
					reject('Timeout while fetching Salesforce Object.');
				}
			});
		}, 5, 200);
	};
}

exports.SalesForceConnectionUtils = SalesForceConnectionUtils;


/***/ }),

/***/ 4308:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

'use strict';

Object.defineProperty(exports, "__esModule", ({
	value: true
}));
exports.initUserContextFromServlet = undefined;

var _regenerator = __webpack_require__(47);

var _regenerator2 = _interopRequireDefault(_regenerator);

var _promise = __webpack_require__(3125);

var _promise2 = _interopRequireDefault(_promise);

var _asyncToGenerator2 = __webpack_require__(7924);

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _wmPrelibPluginEntryManager = __webpack_require__(3257);

var _log = __webpack_require__(4614);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ctx = (0, _wmPrelibPluginEntryManager.getCtx)();

var initUserContextFromServlet = function () {
	var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
		var response;
		return _regenerator2.default.wrap(function _callee$(_context) {
			while (1) {
				switch (_context.prev = _context.next) {
					case 0:
						_context.prev = 0;
						_context.next = 3;
						return new _promise2.default(function (resolve, reject) {
							wmjQuery.ajax({
								type: 'GET',
								url: '/_ui/system/context/UserContextServlet',
								dataType: 'text',
								success: resolve,
								error: function error(xhr) {
									var err = new Error('Request to UserContextServlet failed.');
									err.extraData = {
										sfUCCode: 'UserContextServlet.RequestFailed',
										sfUCServletResponse: xhr.status,
										stack: err.stack,
										// logLevel: ctx.get('SfVarsUtils').LOG_LEVEL.DAILY
										logLevel: 4
									};
									reject(err);
								}
							});
						});

					case 3:
						response = _context.sent;


						parseResponseAndCreateWindowObject(response);
						_context.next = 10;
						break;

					case 7:
						_context.prev = 7;
						_context.t0 = _context['catch'](0);

						(0, _log.log)(_context.t0); // Log the error

					case 10:
					case 'end':
						return _context.stop();
				}
			}
		}, _callee, undefined, [[0, 7]]);
	}));

	return function initUserContextFromServlet() {
		return _ref.apply(this, arguments);
	};
}();

var parseResponseAndCreateWindowObject = function parseResponseAndCreateWindowObject(data) {
	try {
		// remove "while(1);"
		var securityPrefix = 'while(1);';
		var securityPrefixIndex = data.indexOf(securityPrefix);
		if (securityPrefixIndex >= 0 && securityPrefixIndex < 8) {
			data = data.substr(securityPrefixIndex + securityPrefix.length);
		} else {
			var err = new Error('UserContextServlet response does not start with while(1)');
			err.extraData = {
				sfUCCode: 'UserContextServlet.NoSecurityPrefix',
				sfUCServletResponse: data,
				stack: err.stack,
				// logLevel: ctx.get('SfVarsUtils').LOG_LEVEL.DAILY
				logLevel: 2
			};
			throw err;
		}

		window.UserContext = window.UserContext || {};
		wmjQuery.extend(window.UserContext, /*allowFunc*/JSON.parse(data));
		window.UserContext.initializeFromServlet = window.UserContext.initializeFromServlet || function () {}; // called by an SF script
		window.UserContext.initialized = true; // prevents 3rd party init UserContext again
		window.UserContext.getUrl = window.UserContext.getUrl || function (url) {
			return url;
		}; // called by an SF script
	} catch (error) {
		(0, _log.log)(error); // Log the error
	}
};

exports.initUserContextFromServlet = initUserContextFromServlet;


/***/ }),

/***/ 7595:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

'use strict';

Object.defineProperty(exports, "__esModule", ({
	value: true
}));
exports.LightningSfVarsUrlBuilder = undefined;

var _log = __webpack_require__(4614);

function LightningSfVarsUrlBuilder(_sfVarsUtils) {
	var _config;

	function ctor() {
		_config = __webpack_require__(1696);
	}

	this.getProxyIframeUrl = function () {
		return _config.lightningProxyIframeUrl;
	};

	this.buildRequestUrl = function buildRequestUrl(relativeUrl) {
		if (!relativeUrl) {
			return;
		}

		var url = void 0;
		var vfDomainUrl = void 0;
		var webPageBaseUrl = window.location.hostname;
		var customBaseUrl = _config.sfVarsLightningBaseUrl;
		var customBaseUrlDictionary = _config.sfVarsLightningBaseUrlDictionary;
		var protocol = window.location.protocol;

		if (_sfVarsUtils.getCurrentSfEnvironment() === 'lightning') {
			vfDomainUrl = getVFUrlFromLightningUrl(webPageBaseUrl, 'wm4sf3');
			(0, _log.log)('vfDomainUrl [', vfDomainUrl, '] found using Lightning base URL');
		} else if (_sfVarsUtils.getSfVarsUserContext().vfDomainPattern) {
			vfDomainUrl = _sfVarsUtils.getSfVarsUserContext().vfDomainPattern.replace('(?:[^.]+)*', 'wm4sf3').replace('(?:[^.]+)', 'wm4sf3');
			(0, _log.log)('vfDomainUrl [', vfDomainUrl, '] found using vfDomainPattern');
		}

		if (customBaseUrl) {
			url = protocol + '//' + customBaseUrl + relativeUrl;
			(0, _log.log)('[ buildRequestUrl ] with custom lightning base url: [' + url + ']');
		}
		//in case we have a community Base Url Dictionary for multiple communities we will go with this way secondly
		else if (customBaseUrlDictionary && !!customBaseUrlDictionary[webPageBaseUrl]) {
				url = protocol + '//' + customBaseUrlDictionary[webPageBaseUrl] + relativeUrl;
				(0, _log.log)('[ buildRequestUrl ] with custom lightning base url dictionary: [' + url + ']');
			} else if (vfDomainUrl) {
				url = protocol + '//' + vfDomainUrl + relativeUrl;
				(0, _log.log)('[ buildRequestUrl ] base vfDomainPattern: [' + url + ']');
			}

		(0, _log.log)('Lightning sfVars endpoint - ' + url);
		return url;
	};

	function getVFUrlFromLightningUrl(lightningUrl, packageName) {
		var domainPattern = /^(.+?)(?:\.(sandbox|develop|trailblazer))?\.lightning\.force\.com$/;
		var match = lightningUrl.match(domainPattern);

		if (!match) {
			throw new Error('Invalid Lightning URL format.');
		}

		var domain = match[1];
		var environment = match[2] ? '.' + match[2] : '';
		var vfUrl = domain + '--' + packageName + environment + '.vf.force.com';

		return vfUrl;
	}

	ctor.apply(null, arguments);
}

exports.LightningSfVarsUrlBuilder = LightningSfVarsUrlBuilder;


/***/ }),

/***/ 1556:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

'use strict';

Object.defineProperty(exports, "__esModule", ({
	value: true
}));
exports.ApiLtngOutSfVarsRetriever = undefined;

var _typeof2 = __webpack_require__(1463);

var _typeof3 = _interopRequireDefault(_typeof2);

var _promise = __webpack_require__(3125);

var _promise2 = _interopRequireDefault(_promise);

var _regenerator = __webpack_require__(47);

var _regenerator2 = _interopRequireDefault(_regenerator);

var _stringify = __webpack_require__(9206);

var _stringify2 = _interopRequireDefault(_stringify);

var _asyncToGenerator2 = __webpack_require__(7924);

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _wmPrelibPluginEntryManager = __webpack_require__(3257);

var _log = __webpack_require__(4614);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ApiLtngOutSfVarsRetriever(_commonUtils, _timerManager, _clientStorageManager, _sfVarsUtils, _sfVarsMapper, _sfVarsEventLogger, _featuresManager) {
	var _this = this;
	var _sfVars = {};

	var config;

	function ctor() {
		config = __webpack_require__(1696);
	}

	_this.getType = function () {
		return 'ApiLtngOutSfVarsRetriever';
	};

	_this.getRetrieverResponseDetails = function () {
		return _this._retrieverResponseDetails;
	};

	_this.getUserData = function () {
		var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(sfQueryVarList) {
			var extractionVarList, data, auraConfig, _auraConfig$context, mode, fwuid, app, loaded, dn, globals, uad, token, aura, actionsData, output, response, _response$actions$, state, returnValue, res;

			return _regenerator2.default.wrap(function _callee$(_context) {
				while (1) {
					switch (_context.prev = _context.next) {
						case 0:
							if (!(isRecentSfVarsLoadFailure() && !shouldSkip4HourCheck())) {
								_context.next = 2;
								break;
							}

							throw new Error(_sfVarsUtils.MESSAGES.SKIP_AFTER_FAILURE);

						case 2:
							extractionVarList = generateSfVarStringList(sfQueryVarList);
							_context.prev = 3;
							_context.next = 6;
							return requestApp(window.location.host);

						case 6:
							data = _context.sent;
							auraConfig = data.auraConfig;
							_auraConfig$context = auraConfig.context, mode = _auraConfig$context.mode, fwuid = _auraConfig$context.fwuid, app = _auraConfig$context.app, loaded = _auraConfig$context.loaded, dn = _auraConfig$context.dn, globals = _auraConfig$context.globals, uad = _auraConfig$context.uad;
							token = auraConfig.token;
							aura = {
								context: {
									mode: mode,
									fwuid: fwuid,
									app: app,
									loaded: loaded,
									dn: dn || [],
									globals: globals || {},
									uad: uad
								},
								pageURI: window.location.path,
								token: token
							};
							actionsData = {
								actions: [{
									id: '3;a',
									descriptor: 'apex://walkme_sf.WalkmePackage/ACTION$getUserInfo',
									callingDescriptor: 'markup://walkme_sf:wmGetData',
									params: {
										requestData: extractionVarList.join(',')
									},
									version: null
								}]
							};
							output = encodeURIComponent((0, _stringify2.default)(actionsData)) + '&aura.context=' + encodeURIComponent((0, _stringify2.default)(aura.context)) + '&aura.pageURI=' + encodeURIComponent(aura.pageURI) + '&aura.token=' + encodeURIComponent(aura.token);
							_context.next = 15;
							return wmjQuery.ajax({
								url: '/aura?r=0&walkme_sf.WalkmePackage.getUserInfo=1',
								type: 'POST',
								headers: {
									'content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
								},
								data: 'message=' + output,
								xhrFields: {
									withCredentials: true
								}
							});

						case 15:
							response = _context.sent;
							_response$actions$ = response.actions[0], state = _response$actions$.state, returnValue = _response$actions$.returnValue;

							if (!(state === 'SUCCESS')) {
								_context.next = 34;
								break;
							}

							_context.prev = 18;
							res = JSON.parse(returnValue);


							(0, _log.log)('WalkMe Package Data Retrieved:', res);

							_this._retrieverResponseDetails = parsedRetrieverDetails(res);

							if (!(_this._retrieverResponseDetails.status && _this._retrieverResponseDetails.status !== 200)) {
								_context.next = 24;
								break;
							}

							throw new Error(_this._retrieverResponseDetails.message);

						case 24:

							(0, _log.log)('Received response from SF WalkMe Package!');
							if (_this._retrieverResponseDetails.status === 206) {
								_sfVarsUtils.setSfVarsUserMessages(_this._retrieverResponseDetails.message);
							}
							return _context.abrupt('return', res.data);

						case 29:
							_context.prev = 29;
							_context.t0 = _context['catch'](18);
							throw new Error('Error while parsing data from request: ' + _context.t0.stack);

						case 32:
							_context.next = 35;
							break;

						case 34:
							throw new Error('Failed to fetch SF data');

						case 35:
							_context.next = 41;
							break;

						case 37:
							_context.prev = 37;
							_context.t1 = _context['catch'](3);

							rememberFailState();
							throw _context.t1;

						case 41:
						case 'end':
							return _context.stop();
					}
				}
			}, _callee, this, [[3, 37], [18, 29]]);
		}));

		function getUserData(_x) {
			return _ref.apply(this, arguments);
		}

		return getUserData;
	}();

	function requestApp(lightningEndPointURI) {
		var applicationTag = 'walkme_sf:wmGetDataApp';
		var authToken = '{!$Api.Session_ID}';
		return new _promise2.default(function (resolve, reject) {
			var parts = applicationTag.split(':');
			var url = parts[0] + '/' + parts[1] + '.app?aura.format=JSON&aura.formatAdapter=LIGHTNING_OUT';

			var prefix;

			try {
				if (window.wmSfSiteBaseUrl) {
					prefix = window.wmSfSiteBaseUrl;
				} else if ((typeof $A === 'undefined' ? 'undefined' : (0, _typeof3.default)($A)) === 'object' && $A.get('$SfdcSite') && typeof $A.get('$SfdcSite') === 'string') {
					prefix = $A.get('$SfdcSite');
				} else if ((typeof $A === 'undefined' ? 'undefined' : (0, _typeof3.default)($A)) === 'object' && $A.get('$SfdcSite') && (typeof sfdcSite === 'undefined' ? 'undefined' : (0, _typeof3.default)(sfdcSite)) === 'object' && sfdcSite.pathPrefix) {
					prefix = $A.get('$SfdcSite').pathPrefix;
				} else if (_sfVarsUtils.getSfVarsUserContext().siteUrlPrefix && _sfVarsUtils.getSfVarsUserContext().siteUrlPrefix !== '') {
					prefix = _sfVarsUtils.getSfVarsUserContext().siteUrlPrefix;
				}
			} catch (error) {
				(0, _log.log)('No prefix found');
			}

			if (prefix) {
				(0, _log.log)('Found site prefix: ' + (0, _stringify2.default)(prefix));
				url = 'https://' + lightningEndPointURI + prefix + '/' + url;
			} else {
				url = 'https://' + lightningEndPointURI + '/' + url;
			}

			wmjQuery.ajax({
				url: url,
				type: 'GET',
				headers: {
					Authorization: 'OAuth ' + authToken
				},
				xhrFields: {
					withCredentials: true
				},
				success: function success(data, textStatus, xhr) {
					resolve(xhr);
				},
				error: function error(xhr, textStatus, errorThrown) {
					reject(xhr);
				}
			});
		});
	}

	function generateSfVarStringList(sfQueryVarList) {
		var output = void 0;
		output = _sfVarsMapper.mapLegacyToNonLegacyVars(sfQueryVarList);

		return output;
	}

	function parsedRetrieverDetails(data) {
		var retrieverResponseDetails = {};

		//2GP package
		if (data.status) {
			retrieverResponseDetails.retriever = _this.getType(), retrieverResponseDetails.status = data.status;
			retrieverResponseDetails.message = data.message;
			retrieverResponseDetails.packageVersion = data.packageVersion;
		}

		return retrieverResponseDetails;
	}
	function rememberFailState() {
		_clientStorageManager.saveData(_sfVarsUtils.SF_VARS_LAST_FAIL_KEY, new Date().getTime(), _sfVarsUtils.FAIL_EXPIRATION_TIME_SECONDS);
	}

	function shouldSkip4HourCheck() {
		var skipByConfig = config.skipLastFailCheck;
		var skipByStorage = !! /*allowFunc*/window.localStorage.getItem('wm-sf-skip4h');

		var output = skipByConfig || skipByStorage;
		if (output) (0, _log.log)('Skip the 4h validation from last error');

		return output;
	}

	function isRecentSfVarsLoadFailure() {
		var failDate = _clientStorageManager.getData(_sfVarsUtils.SF_VARS_LAST_FAIL_KEY);
		var publishDate = (0, _wmPrelibPluginEntryManager.getCtx)().get('SettingsFile').getSettingsFile().PublishDate;

		//if no recent recent failure, return false to retrieve the values from server
		if (!failDate) return false;

		//if there's a recent failure but no publish date, we can't do the check so just return true as there is a recent failure
		if (failDate && !publishDate) return true;

		//if there's a recent failure and it's more recent than the last publish, return true as nothing could have changed
		if (failDate && publishDate && failDate > publishDate) return true;

		//if in doubt, retrieve from server
		return false;
	}

	ctor.apply(null, arguments);
}

exports.ApiLtngOutSfVarsRetriever = ApiLtngOutSfVarsRetriever;


/***/ }),

/***/ 8393:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

'use strict';

Object.defineProperty(exports, "__esModule", ({
	value: true
}));
exports.AuraCmpLtngOutSfVarsRetriever = undefined;

var _regenerator = __webpack_require__(47);

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = __webpack_require__(7924);

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _wmPrelibPluginEntryManager = __webpack_require__(3257);

var _wmPromise = __webpack_require__(309);

var _log = __webpack_require__(4614);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function AuraCmpLtngOutSfVarsRetriever(_commonUtils, _timerManager, _clientStorageManager, _sfVarsUtils, _sfVarsMapper, _sfVarsEventLogger, _featuresManager) {
	var _this = this;
	var _deferred;
	var _iframe;
	var _unbind;
	var _proxyFrame;
	var _sfVars = {};
	var _fromIframeCreateTimer;
	var _fromIframeLoadTimer;
	var _messageAlreadyReceived = false;
	var _retrieverResponseDetails;

	var PROXY_VARS_FRAME_ID = 'wm-sf-vars-proxy';

	var config;

	function ctor() {
		config = __webpack_require__(1696);
	}

	_this.getType = function () {
		return 'AuraCmpLtngOutSfVarsRetriever';
	};

	_this.getRetrieverResponseDetails = function () {
		return _this._retrieverResponseDetails;
	};

	_this.getUserData = function () {
		var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(sfQueryVarList) {
			var extractionVarList, componentParams, response, mappedCompatibleVars;
			return _regenerator2.default.wrap(function _callee$(_context) {
				while (1) {
					switch (_context.prev = _context.next) {
						case 0:
							if (!(isRecentSfVarsLoadFailure() && !shouldSkip4HourCheck())) {
								_context.next = 2;
								break;
							}

							throw new Error(_sfVarsUtils.MESSAGES.SKIP_AFTER_FAILURE);

						case 2:
							_context.prev = 2;

							// To retrieve the sfVars, we will create a proxyIframe in which we will execute a query
							// by creating an iframe that will load part of the package. This code will then
							// send a message to the proxyIframe whith the information once is loaded
							extractionVarList = generateSfVarStringList(sfQueryVarList);
							componentParams = {
								"requestType": "getUserInfo",
								"requestId": "wm-salesforce-00000000",
								"requestData": extractionVarList.join(',')
							};


							createQueryIframe(componentParams);

							_context.next = 8;
							return listenToResponseFromSfPackage();

						case 8:
							response = _context.sent;
							mappedCompatibleVars = _sfVarsMapper.mapNonLegacyDataToLegacy(response);

							wmjQuery.extend(true, _sfVars, mappedCompatibleVars);

							return _context.abrupt('return', _sfVars);

						case 14:
							_context.prev = 14;
							_context.t0 = _context['catch'](2);

							rememberFailState();
							throw _context.t0;

						case 18:
							_context.prev = 18;

							// clear after
							if (_unbind) _unbind();
							return _context.finish(18);

						case 21:
						case 'end':
							return _context.stop();
					}
				}
			}, _callee, this, [[2, 14, 18, 21]]);
		}));

		function getUserData(_x) {
			return _ref.apply(this, arguments);
		}

		return getUserData;
	}();

	function createQueryIframe(componentParams) {
		var _iframe = document.createElement('iframe');
		//srcdoc is required rather than src, so that the iframe inherits the origin domain of the parent window (which is required for the lightning out component to work properly on Safari)
		_iframe.srcdoc = '<html><body></body></html>';
		_iframe.id = 'wm-lightning-out-iframe';
		_iframe.sandbox = 'allow-forms allow-pointer-lock allow-popups allow-same-origin allow-scripts';
		_iframe.style.display = 'none'; // Assuming the third parameter in _commonUtils.createIframe was for setting display to none

		_iframe.onload = function (ev) {
			var iframeDocument = ev.target.contentDocument;

			var bodyContent = '\n\t\t\t\t<div id="wm-lightningOutDiv" style="display: none;"></div>\n\t\t\t';

			iframeDocument.body.innerHTML = bodyContent;

			var scriptElement = iframeDocument.createElement('script');
			scriptElement.type = 'text/javascript';
			scriptElement.src = '/lightning/lightning.out.js';
			scriptElement.nonce = _sfVarsUtils.getNonceValue();

			scriptElement.onload = function () {
				var inlineScriptElement = iframeDocument.createElement('script');
				inlineScriptElement.type = 'text/javascript';
				scriptElement.nonce = _sfVarsUtils.getNonceValue();
				inlineScriptElement.text = '\n\t\t\t\t\t\tdocument.addEventListener("_walkmePackage_DataRetrieved", e => {\n\t\t\t\t\t\t\t\twindow.parent.postMessage({\n\t\t\t\t\t\t\t\t\tdetail: e.detail,\n\t\t\t\t\t\t\t\t\tsource: \'wmLightningOutFrame\',\n\t\t\t\t\t\t\t\t\ttype: \'_walkmePackage_DataRetrieved\'\n\t\t\t\t\t\t\t\t}, \'*\'); \n\t\t\t\t\t\t})\n\t\t\t\t\t$Lightning.use(\n\t\t\t\t\t\t"walkme_sf:wmGetDataApp",\n\t\t\t\t\t\tfunction () {\n\t\t\t\t\t\t\t$Lightning.createComponent(\n\t\t\t\t\t\t\t\t"walkme_sf:wmGetData",\n\t\t\t\t\t\t\t\t{\n\t\t\t\t\t\t\t\t\t"requestType": "' + componentParams.requestType + '",\n\t\t\t\t\t\t\t\t\t"requestId": "' + componentParams.requestId + '",\n\t\t\t\t\t\t\t\t\t"requestData": "' + componentParams.requestData + '"\n\t\t\t\t\t\t\t\t},\n\t\t\t\t\t\t\t\t"wm-lightningOutDiv",\n\t\t\t\t\t\t\t\tfunction () {\n\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t);\n\t\t\t\t\t\t},\n\t\t\t\t\t\t"https://" + "' + window.location.host + '",\n\t\t\t\t\t\t"{!$Api.Session_ID}"\n\t\t\t\t\t);\n\t\t\t\t';
				iframeDocument.body.appendChild(inlineScriptElement);
			};

			iframeDocument.body.appendChild(scriptElement);
		};

		document.body.appendChild(_iframe); // Append the iframe to the body of the document

		return _iframe;
	}

	function listenToResponseFromSfPackage() {
		var messageReceived = false;
		return new _wmPromise.timedPromise(10000, function (resolve, reject) {
			(0, _log.log)('Registering event to listen to WM Package response');

			var handleDataRetrieved = function handleDataRetrieved(e) {
				try {
					if (!e.data || !e.data.source || !e.data.type || e.data.source !== 'wmLightningOutFrame' || e.data.type !== '_walkmePackage_DataRetrieved') {
						return;
					}
					var res = JSON.parse(e.data.detail);

					(0, _log.log)("WalkMe Package Data Retrieved:", res);

					_this._retrieverResponseDetails = parsedRetrieverDetails(res);

					//Ignore responses not related to requests from this plugin "wm-salesforce-"
					if (!res.requestId || res.requestId.indexOf('wm-salesforce-') !== 0) {
						return;
					}

					if (_this._retrieverResponseDetails.status && _this._retrieverResponseDetails.status !== 200 && _this._retrieverResponseDetails.status !== 206) {
						reject(_this._retrieverResponseDetails.message);
					}

					if (messageReceived) return;
					messageReceived = true;

					(0, _log.log)('Received response from SF WalkMe Package!');
					if (_this._retrieverResponseDetails.status === 206) {
						_sfVarsUtils.setSfVarsUserMessages(_this._retrieverResponseDetails.message);
					}
					resolve(res.data);
				} catch (e) {
					reject('Error while parsing data from request: ' + e.stack);
				}
				//remove the event listener
				document.removeEventListener("message", handleDataRetrieved);
			};

			// document.addEventListener("message", handleDataRetrieved);
			_unbind = _commonUtils.registerEventHandler("message", handleDataRetrieved, false, window);
		}, 'Timeout 10s reached while waiting response from Salesforce Package (walkme_sf). Make sure the WalkMe for Salesforce Package is installed and accessible by the current user.');
	}

	function generateSfVarStringList(sfQueryVarList) {
		var output = void 0;
		output = _sfVarsMapper.mapLegacyToNonLegacyVars(sfQueryVarList);

		return output;
	}

	function parsedRetrieverDetails(data) {
		var retrieverResponseDetails = {};

		//2GP package
		if (data.status) {
			retrieverResponseDetails.retriever = _this.getType(), retrieverResponseDetails.status = data.status;
			retrieverResponseDetails.message = data.message;
			retrieverResponseDetails.packageVersion = data.packageVersion;
		}

		return retrieverResponseDetails;
	}
	function rememberFailState() {
		_clientStorageManager.saveData(_sfVarsUtils.SF_VARS_LAST_FAIL_KEY, new Date().getTime(), _sfVarsUtils.FAIL_EXPIRATION_TIME_SECONDS);
	}

	function shouldSkip4HourCheck() {
		var skipByConfig = config.skipLastFailCheck;
		var skipByStorage = !! /*allowFunc*/window.localStorage.getItem('wm-sf-skip4h');

		var output = skipByConfig || skipByStorage;
		if (output) (0, _log.log)('Skip the 4h validation from last error');

		return output;
	}

	function isRecentSfVarsLoadFailure() {
		var failDate = _clientStorageManager.getData(_sfVarsUtils.SF_VARS_LAST_FAIL_KEY);
		var publishDate = (0, _wmPrelibPluginEntryManager.getCtx)().get('SettingsFile').getSettingsFile().PublishDate;

		//if no recent recent failure, return false to retrieve the values from server
		if (!failDate) return false;

		//if there's a recent failure but no publish date, we can't do the check so just return true as there is a recent failure
		if (failDate && !publishDate) return true;

		//if there's a recent failure and it's more recent than the last publish, return true as nothing could have changed
		if (failDate && publishDate && failDate > publishDate) return true;

		//if in doubt, retrieve from server
		return false;
	}

	ctor.apply(null, arguments);
}

exports.AuraCmpLtngOutSfVarsRetriever = AuraCmpLtngOutSfVarsRetriever;


/***/ }),

/***/ 9642:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

'use strict';

Object.defineProperty(exports, "__esModule", ({
	value: true
}));
exports.AuraCmpSfVarsRetriever = undefined;

var _promise = __webpack_require__(3125);

var _promise2 = _interopRequireDefault(_promise);

var _wmPrelibPluginEntryManager = __webpack_require__(3257);

var _wmPromise = __webpack_require__(309);

var _log = __webpack_require__(4614);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function AuraCmpSfVarsRetriever(_commonUtils, _timerManager, _clientStorageManager, _sfVarsUtils, _sfVarsMapper, _sfVarsEventLogger, _featuresManager) {
	var _this = this;
	var _sfVars = {};

	var config;

	function ctor() {
		config = __webpack_require__(1696);
	}

	_this.getType = function () {
		return 'AuraCmpSfVarsRetriever';
	};

	_this.getRetrieverResponseDetails = function () {
		return _this._retrieverResponseDetails;
	};

	_this.getUserData = function getUserData(sfQueryVarList) {

		// Prevent overloading SalesForce(tm) by waiting 4h after any fail attempt
		if (isRecentSfVarsLoadFailure() && !shouldSkip4HourCheck()) {
			return _promise2.default.reject(_sfVarsUtils.MESSAGES.SKIP_AFTER_FAILURE);
		}

		generateComponents(sfQueryVarList);

		return listenToResponseFromSfPackage().then(function (response) {
			var mappedCompatibleVars = _sfVarsMapper.mapNonLegacyDataToLegacy(response);
			wmjQuery.extend(true, _sfVars, mappedCompatibleVars);

			return _sfVars;
		}).catch(function (e) {
			rememberFailState();
			throw e;
		});
	};

	function generateComponents(sfQueryVarList) {
		var extractionVarList = _sfVarsMapper.mapLegacyToNonLegacyVars(sfQueryVarList);

		var componentParams = {
			"requestType": "getUserInfo",
			"requestId": "wm-salesforce-00000000",
			"requestData": extractionVarList.join(',')
		};

		//At the point the callback for this function is called the component is created, but the server request is still happening, so we don't yet know if it was successful. 
		//We will instead listen for the custom event that says the data has been retrieved.  
		$A.createComponent("walkme_sf:wmGetData", componentParams, function () {
			return;
		});
	}

	function listenToResponseFromSfPackage() {
		var messageReceived = false;
		return new _wmPromise.timedPromise(10000, function (resolve, reject) {
			(0, _log.log)('Registering event to listen to WM Package response');

			var handlePackageLog = function handlePackageLog(e) {
				(0, _log.log)("WalkMe Package Log Emitted:", e.detail.level, e.detail.message);
			};

			var handleDataRetrieved = function handleDataRetrieved(e) {
				try {
					var res = JSON.parse(e.detail);

					(0, _log.log)("WalkMe Package Data Retrieved:", res);

					_this._retrieverResponseDetails = parsedRetrieverDetails(res);

					//Ignore responses not related to requests from this plugin "wm-salesforce-"
					if (!res.requestId || res.requestId.indexOf('wm-salesforce-') !== 0) {
						return;
					}

					if (_this._retrieverResponseDetails.status && _this._retrieverResponseDetails.status !== 200 && _this._retrieverResponseDetails.status !== 206) {
						reject(_this._retrieverResponseDetails.message);
					}

					if (messageReceived) return;
					messageReceived = true;

					(0, _log.log)('Received response from SF WalkMe Package!');
					if (_this._retrieverResponseDetails.status === 206) {
						_sfVarsUtils.setSfVarsUserMessages(_this._retrieverResponseDetails.message);
					}
					resolve(res.data);
				} catch (e) {
					reject('Error while parsing data from request: ' + e.stack);
				}
				//remove the event listener
				document.removeEventListener("_walkmePackage_DataRetrieved", handleDataRetrieved);
				document.removeEventListener("_walkmePackage_Log", handlePackageLog);
			};

			document.addEventListener("_walkmePackage_DataRetrieved", handleDataRetrieved);
			document.addEventListener("_walkmePackage_Log", handlePackageLog);
		}, 'Timeout 10s reached while waiting response from Salesforce Package (walkme_sf). Make sure the WalkMe for Salesforce Package is installed and accessible by the current user.');
	}

	function parsedRetrieverDetails(data) {
		var retrieverResponseDetails = {};

		//2GP package
		if (data.status) {
			retrieverResponseDetails.retriever = _this.getType(), retrieverResponseDetails.status = data.status;
			retrieverResponseDetails.message = data.message;
			retrieverResponseDetails.packageVersion = data.packageVersion;
		}

		return retrieverResponseDetails;
	}

	function rememberFailState() {
		_clientStorageManager.saveData(_sfVarsUtils.SF_VARS_LAST_FAIL_KEY, new Date().getTime(), _sfVarsUtils.FAIL_EXPIRATION_TIME_SECONDS);
	}

	function shouldSkip4HourCheck() {
		var skipByConfig = config.skipLastFailCheck;
		var skipByStorage = !! /*allowFunc*/window.localStorage.getItem('wm-sf-skip4h');

		var output = skipByConfig || skipByStorage;
		if (output) (0, _log.log)('Skip the 4h validation from last error');

		return output;
	}

	function isRecentSfVarsLoadFailure() {
		var failDate = _clientStorageManager.getData(_sfVarsUtils.SF_VARS_LAST_FAIL_KEY);
		var publishDate = (0, _wmPrelibPluginEntryManager.getCtx)().get('SettingsFile').getSettingsFile().PublishDate;

		//if no recent recent failure, return false to retrieve the values from server
		if (!failDate) return false;

		//if there's a recent failure but no publish date, we can't do the check so just return true as there is a recent failure
		if (failDate && !publishDate) return true;

		//if there's a recent failure and it's more recent than the last publish, return true as nothing could have changed
		if (failDate && publishDate && failDate > publishDate) return true;

		//if in doubt, retrieve from server
		return false;
	}

	ctor.apply(null, arguments);
}

exports.AuraCmpSfVarsRetriever = AuraCmpSfVarsRetriever;


/***/ }),

/***/ 3887:
/***/ (function(__unused_webpack_module, exports) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

'use strict';

Object.defineProperty(exports, "__esModule", ({
	value: true
}));
var LOG_FEATURE_SALESFORCE = 'salesforce'; //TODO:EXTRACT

function BasicSfVarsRetriever(_logger, _sfVarsUtils) {
	var _this = this;
	var _customerLog;

	function ctor() {
		_customerLog = _logger.wrapCustomerLog(LOG_FEATURE_SALESFORCE);
	}

	_this.getType = function () {
		return 'BasicSfVarsRetriever';
	};

	_this.getUserData = function getUserData() {
		var _basicSfVarsObj = {};
		var deferred = wmjQuery.Deferred();

		if (_sfVarsUtils.getSfVarsUserContext()) {
			_basicSfVarsObj.userId = _sfVarsUtils.getSfVarsUserContext().longUserId;
			_basicSfVarsObj.userName = _sfVarsUtils.getSfVarsUserContext().userName;
			_basicSfVarsObj.userLanguage = _sfVarsUtils.getSfVarsUserContext().language;

			deferred.resolve(_basicSfVarsObj);
			_customerLog('Gets basic SfVar with basicSfVars feature', 1);
		} else {
			deferred.reject('Can not get sfVars from "basicSfVars" feature');
		}

		return deferred.promise();
	};

	ctor.apply(null, arguments);
}

exports.BasicSfVarsRetriever = BasicSfVarsRetriever;


/***/ }),

/***/ 2662:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

'use strict';

Object.defineProperty(exports, "__esModule", ({
	value: true
}));
exports.LegacySfVarsRetriever = undefined;

var _typeof2 = __webpack_require__(1463);

var _typeof3 = _interopRequireDefault(_typeof2);

var _promise = __webpack_require__(3125);

var _promise2 = _interopRequireDefault(_promise);

var _wmPrelibPluginEntryManager = __webpack_require__(3257);

var _customVarsRetriver = __webpack_require__(5764);

var _log = __webpack_require__(4614);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function LegacySfVarsRetriever(_salesForceConnectionUtils, _sfVarsUtils) {
	var _this = this;

	_this.getType = function () {
		return 'LegacySfVarsRetriever';
	};

	_this.getUserData = function getUserData(sfDefaultVars) {
		(0, _log.log)('Using LegacySfVarsRetriever for ' + _sfVarsUtils.getCurrentSfEnvironment() + ' salesforce instance');

		return _salesForceConnectionUtils.injectSFConnectionWithPromise().then(function () {
			(0, _log.log)('Querying SfAPI with:', sfDefaultVars);
			return querySfAPI(sfDefaultVars);
		});
	};

	function querySfAPI(sfDefaultVars) {
		return new _promise2.default(function (resolve, reject) {
			var userInfo;

			try {
				var salesForceConnection = (0, _wmPrelibPluginEntryManager.getCtx)().get('SalesForceConnection');
				userInfo = salesForceConnection.getSforce().connection.getUserInfo();
				resolve(userInfo);
			} catch (e) {
				var err = (0, _log.parseErrorFromSF)(e);
				(0, _log.log)('Error while fetching UserInfo: ', err);
			}
		}).then(function (userInfo) {
			return new _promise2.default(function (resolve, reject) {
				try {
					var customVars = (0, _customVarsRetriver.getCustomVars)();

					// Check if userPermissionSets exists in customData, if so, remove and log
					if (customVars.includes('userPermissionSets')) {
						customVars = customVars.filter(function (item) {
							return item !== 'userPermissionSets';
						});
						_sfVarsUtils.setSfVarsUserMessages('userPermissionSets special custom var is not supported with this retriever');
					}

					// Check if userGroups exists in customData, if so, remove and log
					if (customVars.includes('userGroups')) {
						customVars = customVars.filter(function (item) {
							return item !== 'userGroups';
						});
						_sfVarsUtils.setSfVarsUserMessages('userGroups special custom var is not supported with this retriever');
					}

					var customData = getCustomVarsData(userInfo.userId, customVars);
					customData = customData && customData[0] || [];
				} catch (e) {
					customData = [];
					var err = (0, _log.parseErrorFromSF)(e);

					(0, _log.log)('Error while fetching CustomVars Data: ', err);
					(0, _log.log)('Continue loading sfVars without CustomVars...');
				}

				try {
					var sfVarsObj = createSfVarsObj(userInfo, sfDefaultVars, customData, customVars || []);
					resolve(sfVarsObj);
				} catch (e) {
					var err = (0, _log.parseErrorFromSF)(e);
					(0, _log.log)('Error while creating sfVars object', err);
					reject(e);
				}
			});
		});
	}

	function getCustomVarsData(userId, customVars) {
		if (customVars && customVars.length > 0) {
			// Selecting all the parameters
			var SOQL = 'Select ' + customVars.join(',') + " From User Where Id = '" + userId + "'";
			var salesForceConnection = (0, _wmPrelibPluginEntryManager.getCtx)().get('SalesForceConnection');

			var userExtendedFieldsXML = salesForceConnection.getSforce().connection.query(SOQL);
			return userExtendedFieldsXML.getArray('records');
		}
	}

	function createSfVarsObj(userInfo, sfVars, customData, customVars) {
		var tempObj = {};

		for (var i = 0; i < sfVars.length; i++) {
			var sfVarName = sfVars[i];
			tempObj[sfVarName] = userInfo[sfVarName];
		}

		for (var i = 0; i < customVars.length; i++) {
			getNestedValue(customVars[i], customData, tempObj);
		}

		return tempObj;
	}

	function getNestedValue(customVar, customData, tempObj) {
		var currentPath = customData;
		var varsTree = customVar.split('.');

		for (var i = 0; i < varsTree.length; i++) {
			if (varsTree[i] === '') {
				return;
			}

			currentPath = currentPath && currentPath[varsTree[i]];
			if (currentPath === null && i == varsTree.length - 1) {
				tempObj[varsTree[i]] = null;
				return;
			}

			if ((typeof currentPath === 'undefined' ? 'undefined' : (0, _typeof3.default)(currentPath)) == 'object') {
				tempObj[varsTree[i]] = {};
				tempObj = tempObj[varsTree[i]];
			} else {
				tempObj[varsTree[i]] = currentPath;
			}
		}
	}
}

exports.LegacySfVarsRetriever = LegacySfVarsRetriever;


/***/ }),

/***/ 457:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

'use strict';

Object.defineProperty(exports, "__esModule", ({
	value: true
}));
exports.NonLegacySfVarsRetriever = undefined;

var _promise = __webpack_require__(3125);

var _promise2 = _interopRequireDefault(_promise);

var _wmPrelibPluginEntryManager = __webpack_require__(3257);

var _wmPromise = __webpack_require__(309);

var _log = __webpack_require__(4614);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function NonLegacySfVarsRetriever(_commonUtils, _timerManager, _clientStorageManager, _sfVarsUtils, _sfVarsMapper, _sfVarsEventLogger, _featuresManager) {
	var _this = this;
	var _deferred;
	var _iframe;
	var _unbind;
	var _proxyFrame;
	var _sfVars = {};
	var _fromIframeCreateTimer;
	var _fromIframeLoadTimer;
	var _messageAlreadyReceived = false;
	var _retrieverResponseDetails;

	var PROXY_VARS_FRAME_ID = 'wm-sf-vars-proxy';

	var config;

	function ctor() {
		config = __webpack_require__(1696);
	}

	_this.getType = function () {
		return 'NonLegacySfVarsRetriever';
	};

	_this.getRetrieverResponseDetails = function () {
		return _this._retrieverResponseDetails;
	};

	_this.getUserData = function getUserData(sfQueryVarList) {
		var _e = false;
		var endpoints;

		// Prevent overloading SalesForce(tm) by waiting 4h after any fail attempt
		if (isRecentSfVarsLoadFailure() && !shouldSkip4HourCheck()) {
			return _promise2.default.reject(_sfVarsUtils.MESSAGES.SKIP_AFTER_FAILURE);
		}

		// To retrieve the sfVars, we will create a proxyIframe in which we will execute a query
		// by creating an iframe that will load part of the package. This code will then
		// send a message to the proxyIframe whith the information once is loaded
		return isAllNeededInfoExistsInLightning().then(function (result) {
			if (!result.neededInfoExists) {
				throw new Error('Not all needed info exists in lightning');
			}
			return generateEndpoints(sfQueryVarList);
		}).then(function (ep) {
			endpoints = ep;

			return createProxyIframe(endpoints.proxyUrl);
		}).then(function (proxyFrame) {
			// make sure we setup listener before adding the query iframe
			_timerManager.libSetTimeout(function () {
				createQueryIframe(endpoints.requestUrl, proxyFrame);
			}, 0);

			return listenToResponseFromSfPackage(proxyFrame);
		}).then(function (response) {
			var mappedCompatibleVars = _sfVarsMapper.mapNonLegacyDataToLegacy(response);
			wmjQuery.extend(true, _sfVars, mappedCompatibleVars);

			return _sfVars;
		}).catch(function (e) {
			rememberFailState();
			throw e;
		}).finally(function () {
			// clear after
			if (_unbind) _unbind();
			if (_proxyFrame) _proxyFrame.parentNode.removeChild(_proxyFrame);
		});
	};

	function isAllNeededInfoExistsInLightning() {
		var sfVarsLightningBaseUrl = (0, _wmPrelibPluginEntryManager.getCtx)().get('CommonUtils').getJsonSettings().sfVarsLightningBaseUrl;
		if (sfVarsLightningBaseUrl) {
			return _promise2.default.resolve({
				neededInfoExists: true
			});
		}

		var lightningInfo = _sfVarsUtils.getSfVarsUserContext().vfDomainPattern;

		return _promise2.default.resolve({
			neededInfoExists: lightningInfo,
			message: lightningInfo ? '' : "Can't find 'vfDomainPattern'"
		});
	}

	function createProxyIframe(url) {
		return new _wmPromise.timedPromise(2000, function (resolve, reject) {
			_proxyFrame = _commonUtils.createIframe(url, // src
			PROXY_VARS_FRAME_ID, // id
			false, // isVisible
			function () {
				resolve(_proxyFrame);
			});
		}, '2 seconds passed since proxy iframe was added');
	}

	function createQueryIframe(url, proxyFrame) {
		var container = wmjQuery(proxyFrame).contents().find('body')[0];

		var attributes = {
			sandbox: 'allow-forms allow-pointer-lock allow-popups allow-same-origin allow-scripts'
		};

		_iframe = _commonUtils.createIframe(url, // src
		'wm-sf-vars-iframe', // id
		false, // isVisible
		undefined, // no callback, the iframe will reply with a post message
		undefined, // messageCallback
		container, false, // dontRemove
		attributes);

		return _iframe;
	}

	function listenToResponseFromSfPackage(proxyFrame) {
		var messageReceived = false;

		return new _wmPromise.timedPromise(10000, function (resolve, reject) {
			var target = proxyFrame.contentWindow || proxyFrame.window;
			var visible = false;

			(0, _log.log)('Registering event to listen to WM Package response');
			// register the event that will eventually read the sfVars.
			_unbind = _commonUtils.registerEventHandler('message', function handleMessage(event) {
				try {
					// Only listen to events comming from our package
					if (event.origin.indexOf('wm4sf3') < 0 && !isValidCustomSfVarsOrigin(event.origin)) {
						return;
					}

					var data = _commonUtils.secureEvalJSON(event.data);
					_this._retrieverResponseDetails = parsedReponse(data);
					// Further check the type of message
					if (!data || !data.attributes || data.attributes.type !== 'User') {
						return;
					}

					if (_this._retrieverResponseDetails.status && _this._retrieverResponseDetails.status !== 200) {
						reject(_this._retrieverResponseDetails.message);
					}

					if (messageReceived) return;
					messageReceived = true;

					(0, _log.log)('Received response from SF WalkMe Package!');

					resolve(data);
					_commonUtils.removeIframeListeners(_iframe, 'message', handleMessage);
				} catch (e) {
					reject('Error while parsing data from request: ' + e.stack);
				}
			}, visible, target);
		}, 'Timeout 10s reached while waiting response from Salesforce Package. Make sure the WalkMe for Salesforce Package is installed and accessible by the current user.');
	}

	function generateEndpoints(sfQueryVarList) {
		if (!sfQueryVarList.length) {
			return _promise2.default.reject(_sfVarsUtils.MESSAGES.VARS_LIST_EMPTY);
		}

		var extractionVarList = generateSfVarStringList(sfQueryVarList);

		if (!extractionVarList.length) {
			(0, _log.log)('Error generating the SF Extraction Var List based on the input [', sfQueryVarList, ']');
			return _promise2.default.reject('No variable mapped');
		}

		var sfCurrentEnv = _sfVarsUtils.getCurrentSfEnvironment();

		// allow using current retriever in Classic environments
		if (sfCurrentEnv == 'legacy') {
			sfCurrentEnv = 'lightning';
		}

		var sfAppEndpoint = _sfVarsUtils.getAppEndpointByEnvironment(sfCurrentEnv);
		var sfVarsUrlBuilder = _sfVarsUtils.getUrlBuilderByEnvironment(sfCurrentEnv);
		var relativeUrl = sfAppEndpoint + '?sfVars=' + extractionVarList.join(',');

		var endpoints = {
			requestUrl: sfVarsUrlBuilder.buildRequestUrl(relativeUrl),
			proxyUrl: sfVarsUrlBuilder.getProxyIframeUrl()
		};

		if (!endpoints.requestUrl || !endpoints.requestUrl) {
			return _promise2.default.reject('No endpoints created');
		}

		return _promise2.default.resolve(endpoints);
	}

	function generateSfVarStringList(sfQueryVarList) {
		var output;

		output = _sfVarsMapper.extractUserContextVars(sfQueryVarList, _sfVars);
		output = _sfVarsMapper.mapLegacyToNonLegacyVars(output);

		return output;
	}

	function parsedReponse(data) {
		//older packages
		var retrieverResponseDetails = {
			retriever: _this.getType(),
			status: '',
			message: '',
			packageVersion: '0.00'
		};

		//2.83 package
		if (data.status) {
			retrieverResponseDetails.status = data.status.status;
			retrieverResponseDetails.message = data.status.message;
			retrieverResponseDetails.packageVersion = '2.83';
		}

		//2.84+ package
		if (data.attributes.status) {
			retrieverResponseDetails.status = data.attributes.status;
			retrieverResponseDetails.message = data.attributes.message;
			retrieverResponseDetails.packageVersion = data.attributes.packageVersion;
		}

		return retrieverResponseDetails;
	}
	function rememberFailState() {
		_clientStorageManager.saveData(_sfVarsUtils.SF_VARS_LAST_FAIL_KEY, new Date().getTime(), _sfVarsUtils.FAIL_EXPIRATION_TIME_SECONDS);
	}

	function shouldSkip4HourCheck() {
		var skipByConfig = config.skipLastFailCheck;
		var skipByStorage = !! /*allowFunc*/window.localStorage.getItem('wm-sf-skip4h');

		var output = skipByConfig || skipByStorage;
		if (output) (0, _log.log)('Skip the 4h validation from last error');

		return output;
	}

	function isValidCustomSfVarsOrigin(origin) {
		var customBaseUrl = config.sfVarsLightningBaseUrl;
		var customBaseUrlDictionary = config.sfVarsLightningBaseUrlDictionary;

		// Check if origin contains customBaseUrl
		if (customBaseUrl && origin.indexOf(customBaseUrl) !== -1) {
			(0, _log.log)('Origin contains customBaseUrl: ' + customBaseUrl);
			return true;
		}

		// Check if origin contains any entry in customBaseUrlDictionary
		if (customBaseUrlDictionary) {
			for (var key in customBaseUrlDictionary) {
				if (origin.indexOf(customBaseUrlDictionary[key]) !== -1) {
					(0, _log.log)('Origin contains customBaseUrlDictionary entry: ' + customBaseUrlDictionary[key]);
					return true;
				}
			}
		}

		// If no matches were found, return false
		(0, _log.log)('Origin does not contain customBaseUrl or any customBaseUrlDictionary entry');
		return false;
	}

	function isRecentSfVarsLoadFailure() {
		var failDate = _clientStorageManager.getData(_sfVarsUtils.SF_VARS_LAST_FAIL_KEY);
		var publishDate = (0, _wmPrelibPluginEntryManager.getCtx)().get('SettingsFile').getSettingsFile().PublishDate;

		//if no recent recent failure, return false to retrieve the values from server
		if (!failDate) return false;

		//if there's a recent failure but no publish date, we can't do the check so just return true as there is a recent failure
		if (failDate && !publishDate) return true;

		//if there's a recent failure and it's more recent than the last publish, return true as nothing could have changed
		if (failDate && publishDate && failDate > publishDate) return true;

		//if in doubt, retrieve from server
		return false;
	}

	ctor.apply(null, arguments);
}

exports.NonLegacySfVarsRetriever = NonLegacySfVarsRetriever;


/***/ }),

/***/ 2441:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

'use strict';

Object.defineProperty(exports, "__esModule", ({
	value: true
}));
exports.SameDomainIframeSfVarsRetriever = undefined;

var _log = __webpack_require__(4614);

function SameDomainIframeSfVarsRetriever(logger, _commonUtils, _timerManager, _clientStorageManager, _sfVarsUtils, _sfVarsMapper, _sfVarsEventLogger) {
	var _this = this;
	var _deferred;
	var _sameDomainFrame;
	var _fromIframeCreateTimer;
	var VARS_IFRAME_ID = 'walkme-samedomain-sf-vars-iframe';

	var config;
	var _sfVars;

	function ctor() {}

	_this.getType = function () {
		return 'SameDomainIframeSfVarsRetriever';
	};

	_this.getUserData = function getUserData(varsList) {
		if (!config) config = __webpack_require__(1696);

		_deferred = wmjQuery.Deferred();

		(0, _log.log)('Using SameDomainIframeSfVarsRetriever for ' + _sfVarsUtils.getCurrentSfEnvironment() + ' salesforce instance');

		//Check if there was a failure attempt in the last 4 hours
		if (!config.skipLastFailCheck && isRecentSfVarsLoadFailure()) {
			_sfVarsUtils.setSfVarsUserMessages(_sfVarsUtils.MESSAGES.SKIP_AFTER_FAILURE);
			_deferred.reject(_sfVarsUtils.MESSAGES.SKIP_AFTER_FAILURE);
		} else {
			varsList = _sfVarsMapper.extractUserContextVars(varsList, _sfVars);
			varsList = _sfVarsMapper.mapLegacyToNonLegacyVars(varsList);

			if (varsList.length) {
				createNonLegacyIframe(varsList.join(','));
			} else {
				_deferred.reject(_sfVarsUtils.MESSAGES.VARS_LIST_EMPTY);
			}
		}

		return _deferred.promise();
	};

	function isRecentSfVarsLoadFailure() {
		var failDate = _clientStorageManager.getData(_sfVarsUtils.SF_VARS_LAST_FAIL_KEY);
		var publishDate = getCtx().get('SettingsFile').getSettingsFile().PublishDate;

		//if no recent recent failure, return false to retrieve the values from server
		if (!failDate) return false;

		//if there's a recent failure but no publish date, we can't do the check so just return true as there is a recent failure
		if (failDate && !publishDate) return true;

		//if there's a recent failure and it's more recent than the last publish, return true as nothing could have changed
		if (failDate && publishDate && failDate > publishDate) return true;

		//if in doubt, retrieve from server
		return false;
	}

	function createNonLegacyIframe(varsList) {
		var sfCurrentEnv = _sfVarsUtils.getCurrentSfEnvironment();

		var _sfAppEndpoint = _sfVarsUtils.getAppEndpointByEnvironment(sfCurrentEnv);
		var _sfVarsUrlBuilder = _sfVarsUtils.getUrlBuilderByEnvironment(sfCurrentEnv);

		var requestUrl = _sfVarsUrlBuilder.buildRequestUrl(relativeUrl);

		if (requestUrl) {
			(0, _log.log)('SfVars endpoint [', requestUrl, ']');

			beforeIframeCreated();
			createSameDomainIframe(requestUrl, iframeLoaded);
		} else {
			saveFailureLog();
			_deferred.reject(_sfVarsUtils.MESSAGES.FAIL_FIND_SALESFORCE_NAME);
		}
	}

	function createSameDomainIframe(url, callback) {
		_sameDomainFrame = _commonUtils.createIframe(url, VARS_IFRAME_ID, false, callback);
	}

	function iframeLoaded() {
		(0, _log.log)('sfVars Same Domain iframe loaded');

		if (_fromIframeCreateTimer && _fromIframeCreateTimer.clear) {
			_fromIframeCreateTimer.clear();
		}

		_sameDomainFrame && wmjQuery(_sameDomainFrame).remove();

		_deferred.resolve(window.walkme_sf_vars_internal);
	}

	function beforeIframeCreated() {
		(0, _log.log)('Finished creating iframe');
		var timoutHandlerFunc = timoutHandlerWrapper(_sfVarsUtils.MESSAGES.IFRAME_CREATED_TIMEOUT);
		_fromIframeCreateTimer = _timerManager.libSetTimeout(timoutHandlerFunc, _sfVarsUtils.IFRAME_CREATED_TIMEOUT_TICKS);
	}

	function saveFailureLog() {
		if (!isProcessCompleted()) {
			_clientStorageManager.saveData(_sfVarsUtils.SF_VARS_LAST_FAIL_KEY, new Date().getTime(), _sfVarsUtils.FAIL_EXPIRATION_TIME_SECONDS);
		}
	}

	function isProcessCompleted() {
		return _deferred.state() !== 'pending';
	}

	function timoutHandlerWrapper(message) {
		return function () {
			saveFailureLog();

			_deferred.reject(message);
		};
	}

	ctor.apply(null, arguments);
}

exports.SameDomainIframeSfVarsRetriever = SameDomainIframeSfVarsRetriever;


/***/ }),

/***/ 7329:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

'use strict';

Object.defineProperty(exports, "__esModule", ({
	value: true
}));
exports.UnsupportedPlatformSfVarsRetriever = undefined;

var _promise = __webpack_require__(3125);

var _promise2 = _interopRequireDefault(_promise);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function UnsupportedPlatformSfVarsRetriever(_logger, _sfVarsUtils, _sfVarsEventLogger) {
	var _this = this;
	var _deferred;

	function ctor() {}

	_this.getType = function () {
		return 'UnsupportedPlatformSfVarsRetriever';
	};

	_this.getUserData = function () {
		return _promise2.default.resolve(null);
	};

	ctor.apply(null, arguments);
}

exports.UnsupportedPlatformSfVarsRetriever = UnsupportedPlatformSfVarsRetriever;


/***/ }),

/***/ 7100:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

'use strict';

Object.defineProperty(exports, "__esModule", ({
	value: true
}));
exports.SalesForceManager = undefined;

var _promise = __webpack_require__(3125);

var _promise2 = _interopRequireDefault(_promise);

var _regenerator = __webpack_require__(47);

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = __webpack_require__(7924);

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _wmPrelibPluginEntryManager = __webpack_require__(3257);

var _log = __webpack_require__(4614);

var _settingsValuesRetriever = __webpack_require__(7015);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function SalesForceManager(_commonUtils, _salesForceVarsExtractor, _salesForceSearcher, _sfVarsRetrieverFactory, _sfVarsUtils, _logger, _timerManager, _SiteConfigManager, _resourceManager, _sfVarsEventLogger) {
	var ACTION_CARD_LIST_SELECTOR = '.oneHomeCardListDesktop';
	var HIDE_LIGHTNING_TILE_CSS = '#WM_EXT_IFRAME {display:none !important}';
	var LIGHTNING_TILE_STYLE_ID = 'walkme-extention-tile-hide';
	var MAX_WAIT_ATTEMPTS_FOR_ACTION_BAR = 200;

	var _this = this;
	var _chosenSfVarsFeature;
	var isIframeRemoved = false;
	var _tryCounter;

	function ctor() {
		removeIFrameByUrl();
	}

	_this.init = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
		var sfVars, platformContext, retriever, userMessages;
		return _regenerator2.default.wrap(function _callee$(_context) {
			while (1) {
				switch (_context.prev = _context.next) {
					case 0:
						_chosenSfVarsFeature = getActiveSfFeature();

						if (!(!_chosenSfVarsFeature || isSfVarsBlacklistedPage())) {
							_context.next = 4;
							break;
						}

						(0, _log.log)('No sfVars FF or page is BlackListed');
						return _context.abrupt('return');

					case 4:

						(0, _log.log)('Starting extraction of user data...');

						_context.prev = 5;
						sfVars = void 0;
						_context.next = 9;
						return _sfVarsUtils.initSfVarsContextAsync();

					case 9:
						platformContext = _context.sent;

						(0, _log.log)('sfVars context set', platformContext);

						_context.next = 13;
						return getSfVarsRetriever();

					case 13:
						retriever = _context.sent;
						_context.next = 16;
						return _salesForceVarsExtractor.extractSalesForceVars(retriever);

					case 16:
						sfVars = _context.sent;


						window.walkme_sf_vars = sfVars;
						(0, _log.log)('window.walkme_sf_vars was created.');

						addLegacyGroups(sfVars);

						_sfVarsEventLogger.logHeartbeat(platformContext);

						(0, _wmPrelibPluginEntryManager.getCtx)().get('CommonEvents').raiseEvent((0, _wmPrelibPluginEntryManager.getCtx)().get('Consts').EVENTS.SalesForceVarsExposed);

						checkForCustomUserContext();

						return _context.abrupt('return', sfVars);

					case 26:
						_context.prev = 26;
						_context.t0 = _context['catch'](5);

						(0, _log.log)(_context.t0);
						_sfVarsEventLogger.logEvent(_context.t0);
						throw _context.t0;

					case 31:
						_context.prev = 31;
						userMessages = _sfVarsUtils.getSfVarsUserMessages();

						if (userMessages && userMessages.length > 0) {
							if (!window.walkme_sf_vars) {
								window.walkme_sf_vars = {};
							}
							window.walkme_sf_vars._messages = userMessages;
						}
						return _context.finish(31);

					case 35:
					case 'end':
						return _context.stop();
				}
			}
		}, _callee, this, [[5, 26, 31, 35]]);
	}));

	function checkForCustomUserContext() {
		var customCtx = (0, _settingsValuesRetriever.getSettingsValue)('customUserCtx');
		if (customCtx) {
			window[customCtx] = window.UserContext;
			delete window.UserContext;
		}
	}

	function isSfVarsBlacklistedPage() {
		var sfVarsBlacklist = (0, _wmPrelibPluginEntryManager.getCtx)().get('CommonUtils').getJsonSettings()['sfVarsBlacklist'];

		if (!Array.isArray(sfVarsBlacklist)) {
			return false;
		}

		for (var i = 0; i < sfVarsBlacklist.length; i++) {
			if (location.href.indexOf(sfVarsBlacklist[i]) > -1) {
				return true;
			}
		}

		return false;
	}

	function isLightning() {
		return _sfVarsUtils.getCurrentSfEnvironment() == 'lightning';
	}

	function isNewPackage() {
		return _sfVarsUtils.getCurrentDetectedPackages().walkme_sf_package;
	}

	function isNoPackageDetected() {
		return !_sfVarsUtils.getCurrentDetectedPackages().walkme_sf_package && !_sfVarsUtils.getCurrentDetectedPackages().wm4sf3;
	}

	function addLegacyGroups(sfVars) {
		if (sfVars && sfVars.userGroups) {
			window.walkme_SF_Groups = sfVars.userGroups;
			(0, _log.log)('Legacy window.walkme_SF_Groups was created.');
		}
	}

	function removeIFrameByUrl() {
		if (!window.WalkMe_Extension) {
			return;
		}

		var hrefLoc = window.location.href;

		if (hrefLoc.indexOf('lightning.force') > -1) {
			_tryCounter = 0;
			tryToRemoveActionBar();
		}
	}

	_this.removeIFrame = function removeIFrame() {
		if (!_featuresManager.isFeatureEnabled('keepSFFrame')) {
			if (isLightning()) {
				removeLightningTier();
			} else {
				wmjQuery("iframe[title*='WM_EXT_IFRAME']").remove();
			}
		}
	};

	function removeLightningTier() {
		_resourceManager.injectCss(HIDE_LIGHTNING_TILE_CSS, LIGHTNING_TILE_STYLE_ID);
	}

	function tryToRemoveActionBar() {
		if (_tryCounter < MAX_WAIT_ATTEMPTS_FOR_ACTION_BAR) {
			var wmBar = wmjQuery('li:has(div:contains("WalkMe"))', ACTION_CARD_LIST_SELECTOR);
			if (wmBar.length == 0) {
				_tryCounter++;
				_timerManager.libSetTimeout(tryToRemoveActionBar, 300);
			} else {
				wmBar.remove();
				isIframeRemoved = true;
				(0, _log.log)('walkme SF action bar removed due to exsiting extension');
			}
		}
	}

	function getSfVarsRetriever() {
		return new _promise2.default(function (resolve, reject) {
			var sfEnvInfo = getSalesForceEnvInfo();

			if (!sfEnvInfo.neededInfoExists) {
				reject(sfEnvInfo.message || 'Undefined error while getting SF environment info.');
				return;
			}

			(0, _log.log)('Found window.UserContext');

			var retriever = _sfVarsRetrieverFactory.getSfVarsRetriever(_chosenSfVarsFeature, _sfVarsUtils.getCurrentDetectedPackages());
			if (retriever) {
				resolve(retriever);
			} else {
				reject("Can't get any suitable sfRetriever.");
			}
		});
	}

	function getSalesForceEnvInfo() {
		var currentEnv = _sfVarsUtils.getCurrentSfEnvironment();
		if (!currentEnv) {
			return { neededInfoExists: false, message: 'No environment found' };
		}

		return hasUserContext();
	}

	function hasUserContext() {
		var userContextInfoPresent = !!(_sfVarsUtils.getSfVarsUserContext().userId !== '');
		return {
			neededInfoExists: userContextInfoPresent,
			message: userContextInfoPresent ? '' : 'There is no UserContext on the page'
		};
	}

	function getActiveSfFeature() {
		if (_sfVarsUtils.isAnySFVarsFeatureEnabled()) {
			return _sfVarsUtils.BASIC_SF_VARS_FEATURE;
		}
		return _sfVarsUtils.GENERAL_SF_VARS_FEATURE;
	}

	ctor.apply(null);
}

exports.SalesForceManager = SalesForceManager;


/***/ }),

/***/ 5592:
/***/ (function(__unused_webpack_module, exports) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

'use strict';

Object.defineProperty(exports, "__esModule", ({
	value: true
}));
var LOG_FEATURE_SALESFORCE = 'salesforce'; //TODO:EXTRACT

function SalesForceSearcher(logger, _siteConfigManager, _salesForceConnectionUtils) {
	var _this = this;

	var DEFAULT_RETURNING_STR = 'Account (Id, Name), Contact (Id, Name), Opportunity (Id, Name), Lead (Id, Name)';
	var _customerLog;
	var FAILED_SEARCH = '';

	_this.search = function search(searchTerm, callback) {
		_salesForceConnectionUtils.injectSFConnection(function (connection) {
			innerSearch(connection, searchTerm, callback);
		}, function () {
			callback(FAILED_SEARCH);
		});
	};

	function innerSearch(connection, searchTerm, callback) {
		var res = FAILED_SEARCH;
		try {
			var returningString = _siteConfigManager.get().Settings.sfSearch || DEFAULT_RETURNING_STR;
			res = connection.connection.search('find {' + searchTerm + '*} RETURNING ' + returningString);
		} catch (e) {
			_customerLog('unknown error getting search results: ' + e.message);
		}

		callback(res);
	}

	function ctor() {
		_customerLog = logger.wrapCustomerLog(LOG_FEATURE_SALESFORCE);
	}

	ctor.apply(null, arguments);
}

exports.SalesForceSearcher = SalesForceSearcher;


/***/ }),

/***/ 7445:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

'use strict';

Object.defineProperty(exports, "__esModule", ({
	value: true
}));
exports.SalesForceVarsExtractor = undefined;

var _promise = __webpack_require__(3125);

var _promise2 = _interopRequireDefault(_promise);

var _regenerator = __webpack_require__(47);

var _regenerator2 = _interopRequireDefault(_regenerator);

var _stringify = __webpack_require__(9206);

var _stringify2 = _interopRequireDefault(_stringify);

var _asyncToGenerator2 = __webpack_require__(7924);

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _wmPrelibPluginEntryManager = __webpack_require__(3257);

var _log = __webpack_require__(4614);

var _date = __webpack_require__(2558);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function SalesForceVarsExtractor(sfVarsUtils, clientStorageManager, commonUtils, commonEvents, consts, auditSourceManager, sfVarsEventLogger) {
	var _this2 = this;

	var _this = this;

	var USERS_STORAGE_KEY = 'wm-sf-users-data' + '_' + auditSourceManager.get();
	var LATEST_USER_ID = 'wm-sf-lst-usr';
	var TWO_YEARS_SECONDS = 60 * 60 * 24 * 365 * 2;
	var DATA_EXPIRATION_TIME_MILISECONDS = 24 * 60 * 60 * 1000; // one day
	var LAST_USER_EXPIRATION_SECONDS = 24 * 60 * 60; // one day
	var SF_DEFAULT_VARS = ['userId', 'organizationId', 'organizationName', 'profileId', 'roleId', 'userName', 'userLanguage'];
	var userId;
	var config;

	function ctor() {
		config = __webpack_require__(1696);
	}

	_this.extractSalesForceVars = function () {
		var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(sfRetriever) {
			var allUsersData, storedSfVars, data;
			return _regenerator2.default.wrap(function _callee$(_context) {
				while (1) {
					switch (_context.prev = _context.next) {
						case 0:
							allUsersData = getUsersDataFromStorage();
							storedSfVars = allUsersData && allUsersData[getUserId()];

							if (!(storedSfVars && !isUserDataExpired(storedSfVars))) {
								_context.next = 9;
								break;
							}

							(0, _log.log)('Retrieved sfVars from cache [' + (0, _stringify2.default)(storedSfVars) + ']');

							delete storedSfVars.lastModified;
							delete storedSfVars.retrieverResponseDetails;
							return _context.abrupt('return', storedSfVars);

						case 9:
							(0, _log.log)('sfVars are expired or not found in cache for UserId: ' + getUserId() + '. Will attempt to get using chosen retriever.');

						case 10:
							_context.prev = 10;
							_context.next = 13;
							return getUserDataAsync(sfRetriever);

						case 13:
							data = _context.sent;

							if (data.userData) {
								_context.next = 16;
								break;
							}

							throw new Error('Unable to retrieve user data from server for for UserId: ' + getUserId());

						case 16:

							storeUserData(data.userData);

							delete data.userData.lastModified;
							delete data.userData.retrieverResponseDetails;
							return _context.abrupt('return', data.userData);

						case 22:
							_context.prev = 22;
							_context.t0 = _context['catch'](10);

							(0, _log.log)('Exception [' + _context.t0 + '] will be reported.');
							sfVarsUtils.setSfVarsUserMessages(_context.t0);
							sfVarsEventLogger.logEvent(_context.t0, {
								retrieverType: sfRetriever.getType()
							});

							(0, _log.log)('Trying to find an expired version of previous sfVars...');

							if (!storedSfVars) {
								_context.next = 32;
								break;
							}

							(0, _log.log)('An expired version of sfVars was found in storage and used instead [' + storedSfVars + ']');
							sfVarsUtils.setSfVarsUserMessages('An expired version of sfVars was found in storage and used instead');
							return _context.abrupt('return', storedSfVars);

						case 32:
							sfVarsUtils.setSfVarsUserMessages('No Expired version found in storage. No sfVars available.');
							return _context.abrupt('return', null);

						case 34:
						case 'end':
							return _context.stop();
					}
				}
			}, _callee, _this2, [[10, 22]]);
		}));

		return function (_x) {
			return _ref.apply(this, arguments);
		};
	}();

	function getUserId() {
		if (userId) {
			return userId;
		}

		if (sfVarsUtils.getSfVarsUserContext().userId && sfVarsUtils.getSfVarsUserContext().userId !== '') {
			userId = sfVarsUtils.to18CharId(sfVarsUtils.getSfVarsUserContext().userId);
			storeLatestUserId(userId);
			return userId;
		}

		(0, _log.log)('No UserId found on page. Falling back to stored data...');
		var latestUserId = getLatestUserId();

		if (latestUserId) {
			(0, _log.log)('...success, fetched from WM Storage: [', latestUserId, ']');
			return latestUserId;
		} else {
			(0, _log.log)("...no UserId found in storage. Can't get UserId");
		}
	}

	function storeLatestUserId(userId) {
		if (userId) {
			clientStorageManager.saveData(LATEST_USER_ID, userId, LAST_USER_EXPIRATION_SECONDS);
		}
	}

	function getLatestUserId() {
		return clientStorageManager.getData(LATEST_USER_ID);
	}

	function getUsersDataFromStorage() {
		var dataStr = clientStorageManager.getData(USERS_STORAGE_KEY);

		if (dataStr) {
			return commonUtils.secureEvalJSON(dataStr);
		}
	}

	function getUserDataAsync(sfRetriever) {
		return new _promise2.default(function (resolve, reject) {
			return sfRetriever.getUserData(SF_DEFAULT_VARS).then(function (userDataFromServer) {
				if (sfRetriever.getType() === 'NonLegacySfVarsRetriever') {
					userDataFromServer.retrieverResponseDetails = sfRetriever.getRetrieverResponseDetails();
				}
				(0, _log.log)('Using [', sfRetriever.getType(), '] we got [', (0, _stringify2.default)(userDataFromServer), ']');
				resolve({
					userData: userDataFromServer
				});
			}).catch(function (e) {
				reject(e);
			});
		});
	}

	function isUserDataExpired(storageData) {
		if (!storageData.lastModified) {
			return true;
		}

		var publishDate = publishAfterSfVarsCached(storageData.lastModified);
		if (publishDate) {
			(0, _log.log)('Cached sfVars [' + (0, _date.formatDate)(storageData.lastModified) + '] are older than latest publish date [' + (0, _date.formatDate)(publishDate) + ']. Retrieving sfVars again.');

			return true;
		}

		// We can purge stored sfVars data before a given date. Used to reset
		// any value stored on client side becuase of change of sfVars calculation
		if (shouldPurgeData(storageData.lastModified)) {
			(0, _log.log)('Removing stored sfVars. Data last modified [', (0, _date.formatDate)(storageData.lastModified), '] is older than limit option [', (0, _date.formatDate)(config.clearCachedSfVarsOlderThan), ']');
			return true; // data is older than threshold
		}

		var expireDate = new Date(storageData.lastModified).getTime() + DATA_EXPIRATION_TIME_MILISECONDS;

		(0, _log.log)('Last time SfVars was stored [', (0, _date.formatDate)(storageData.lastModified), '] vs Expiration Date [', (0, _date.formatDate)(expireDate), ']');
		if (storageData.lastModified < expireDate) {
			return false;
		} else {
			(0, _log.log)('Data is older than expiration date! refreshing data...');
			return true;
		}
	}

	function publishAfterSfVarsCached(lastModified) {
		var publishDate = (0, _wmPrelibPluginEntryManager.getCtx)().get('SettingsFile').getSettingsFile().PublishDate;
		return publishDate > lastModified ? publishDate : false;
	}

	function shouldPurgeData(lastModified) {
		if (!config.clearCachedSfVarsOlderThan) {
			return false;
		}

		var limitTimestamp = new Date(config.clearCachedSfVarsOlderThan).getTime();
		return lastModified < limitTimestamp;
	}

	function storeUserData(userData) {
		(0, _log.log)('Store sfVars for next time');

		var userId = getUserId();
		if (!userId) return;

		var allUsersData = getUsersDataFromStorage() || {};

		allUsersData[userId] = userData;
		allUsersData[userId].lastModified = new Date().getTime();

		var dataStr = commonUtils.toJSON(allUsersData);
		if (!dataStr) return;

		clientStorageManager.saveData(USERS_STORAGE_KEY, dataStr, TWO_YEARS_SECONDS);
	}

	ctor.apply(null, arguments);
}

exports.SalesForceVarsExtractor = SalesForceVarsExtractor;


/***/ }),

/***/ 8388:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

'use strict';

Object.defineProperty(exports, "__esModule", ({
	value: true
}));

var _salesForceManager = __webpack_require__(7100);

var _sfVarsUtils = __webpack_require__(4266);

var _salesForceVarsExtractor = __webpack_require__(7445);

var _salesForceSearcher = __webpack_require__(5592);

var _legacySalesForceConnectionUtils = __webpack_require__(9423);

var _legacySalesForceConnection = __webpack_require__(4244);

var _sfVarsRetrieverFactory = __webpack_require__(8471);

var _legacySfVarsRetriever = __webpack_require__(2662);

var _nonLegacySfVarsRetriever = __webpack_require__(457);

var _basicSfVarsRetriever = __webpack_require__(3887);

var _sameDomainIframeSfVarsRetriever = __webpack_require__(2441);

var _unsupportedPlatformSfVarsRetriever = __webpack_require__(7329);

var _auraCmpSfVarsRetriever = __webpack_require__(9642);

var _auraCmpLtngOutSfVarsRetriever = __webpack_require__(8393);

var _apiLtngOutSfVarsRetriever = __webpack_require__(1556);

var _communitySfVarsUrlBuilder = __webpack_require__(5088);

var _lightningSfVarsUrlBuilder = __webpack_require__(7595);

var _sfVarsMapper = __webpack_require__(9842);

var _log = __webpack_require__(4614);

var _sfVarsEventLogger = __webpack_require__(4159);

function SfCommonComponents(ctx) {

	if (ctx.has('SfVarsUtils')) {
		(0, _log.log)('Components already registered. Skipping...');
		return;
	}

	(0, _log.log)('Registering SalesForce Components in CTX');

	ctx.register('SfVarsEventLogger').asCtor(_sfVarsEventLogger.SfVarsEventLogger);

	ctx.register('BasicSfVarsRetriever').asCtor(_basicSfVarsRetriever.BasicSfVarsRetriever).dependencies('Logger, SfVarsUtils, SfVarsEventLogger');

	ctx.register('UnsupportedPlatformSfVarsRetriever').asCtor(_unsupportedPlatformSfVarsRetriever.UnsupportedPlatformSfVarsRetriever).dependencies('Logger, SfVarsUtils, SfVarsEventLogger');

	ctx.register('CommunitySfVarsUrlBuilder').asCtor(_communitySfVarsUrlBuilder.CommunitySfVarsUrlBuilder).dependencies('SfVarsUtils');

	ctx.register('LegacySfVarsRetriever').asCtor(_legacySfVarsRetriever.LegacySfVarsRetriever).dependencies('SalesForceConnectionUtils, SfVarsUtils');

	ctx.register('LightningSfVarsUrlBuilder').asCtor(_lightningSfVarsUrlBuilder.LightningSfVarsUrlBuilder).dependencies('SfVarsUtils');

	ctx.register('NonLegacySfVarsRetriever').asCtor(_nonLegacySfVarsRetriever.NonLegacySfVarsRetriever).dependencies('CommonUtils, TimerManager, ClientStorageManager, SfVarsUtils, SfVarsMapper, SfVarsEventLogger, FeaturesManager');

	ctx.register('SameDomainIframeSfVarsRetriever').asCtor(_sameDomainIframeSfVarsRetriever.SameDomainIframeSfVarsRetriever).dependencies('Logger, CommonUtils, TimerManager, ClientStorageManager, SfVarsUtils, SfVarsMapper, SfVarsEventLogger');

	ctx.register('AuraCmpSfVarsRetriever').asCtor(_auraCmpSfVarsRetriever.AuraCmpSfVarsRetriever).dependencies('CommonUtils, TimerManager, ClientStorageManager, SfVarsUtils, SfVarsMapper, SfVarsEventLogger, FeaturesManager');

	ctx.register('AuraCmpLtngOutSfVarsRetriever').asCtor(_auraCmpLtngOutSfVarsRetriever.AuraCmpLtngOutSfVarsRetriever).dependencies('CommonUtils, TimerManager, ClientStorageManager, SfVarsUtils, SfVarsMapper, SfVarsEventLogger, FeaturesManager');

	ctx.register('ApiLtngOutSfVarsRetriever').asCtor(_apiLtngOutSfVarsRetriever.ApiLtngOutSfVarsRetriever).dependencies('CommonUtils, TimerManager, ClientStorageManager, SfVarsUtils, SfVarsMapper, SfVarsEventLogger, FeaturesManager');

	ctx.register('SalesForceConnection').asCtor(_legacySalesForceConnection.SalesForceConnection).dependencies('CookiesManager, Logger, SfVarsUtils');

	ctx.register('SalesForceConnectionUtils').asCtor(_legacySalesForceConnectionUtils.SalesForceConnectionUtils).dependencies('');

	ctx.register('SalesForceVarsExtractor').asCtor(_salesForceVarsExtractor.SalesForceVarsExtractor).dependencies('SfVarsUtils, ClientStorageManager, CommonUtils, CommonEvents, Consts, AuditSourceManager, SfVarsEventLogger');

	ctx.register('SalesForceManager').asCtor(_salesForceManager.SalesForceManager).dependencies('CommonUtils, SalesForceVarsExtractor,SalesForceSearcher, SfVarsRetrieverFactory, SfVarsUtils, Logger, TimerManager, SiteConfigManager, ResourceManager, SfVarsEventLogger');

	ctx.register('SalesForceSearcher').asCtor(_salesForceSearcher.SalesForceSearcher).dependencies('Logger,SiteConfigManager,SalesForceConnectionUtils');

	ctx.register('SfVarsMapper').asCtor(_sfVarsMapper.SfVarsMapper).dependencies('CommonUtils, SiteConfigManager');

	ctx.register('SfVarsRetrieverFactory').asCtor(_sfVarsRetrieverFactory.SfVarsRetrieverFactory).dependencies('SfVarsUtils, LegacySfVarsRetriever, NonLegacySfVarsRetriever, BasicSfVarsRetriever, UnsupportedPlatformSfVarsRetriever, SameDomainIframeSfVarsRetriever, AuraCmpSfVarsRetriever, AuraCmpLtngOutSfVarsRetriever, SfVarsEventLogger, FeaturesManager');

	ctx.register('SfVarsUtils').asCtor(_sfVarsUtils.SfVarsUtils).dependencies('FeaturesManager');
}

exports["default"] = SfCommonComponents;


/***/ }),

/***/ 4159:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

'use strict';

Object.defineProperty(exports, "__esModule", ({
	value: true
}));
exports.SfVarsEventLogger = undefined;

var _stringify = __webpack_require__(9206);

var _stringify2 = _interopRequireDefault(_stringify);

var _typeof2 = __webpack_require__(1463);

var _typeof3 = _interopRequireDefault(_typeof2);

var _log = __webpack_require__(4614);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getCtx = (__webpack_require__(3257).getCtx);


var clientServerLogger = __webpack_require__(6874)(getCtx());

function SfVarsEventLogger() {
	var _this = this;

	_this.logEvent = function (e, data) {
		try {
			var message = '';
			data = data || {};

			data.uId = getUid();
			data.plugin = 'salesforce';

			if (typeof e === 'string') {
				message = 'Salesforce Plugin Error: ' + e;
			} else if ((typeof e === 'undefined' ? 'undefined' : (0, _typeof3.default)(e)) === 'object' && e.message && e.stack) {
				message = 'Salesforce Plugin Error: ' + e.message;
				data.exception = e.stack || 'Exception without stack';
			} else {
				message = 'Salesforce Plugin Error: UNKNOWN ERROR';
				data.unknownError = /*allowFunc*/(0, _stringify2.default)(e);
			}

			if (!data.logLevel) {
				data.autoLogLevel = true;
				//getCtx().get('SfVarsUtils').LOG_LEVEL.ALWAYS;
				data.logLevel = 4;
			}

			(0, _log.log)('Unexpected Error! Attempting to send a log with message [', message, '] with data [', data, ']');

			clientServerLogger.sendLog({
				message: message,
				extraData: data
			});
		} catch (e) {
			//left empty
		}
	};

	_this.logHeartbeat = function (details) {
		try {
			var message = 'Salesforce plugin done';
			var data = {
				uId: getUid(),
				plugin: 'salesforce',
				// logLevel: getCtx().get('SfVarsUtils').LOG_LEVEL.ALWAYS,
				logLevel: 4,
				level: 'info',
				details: details || {}
			};

			clientServerLogger.sendLog({
				message: message,
				extraData: data
			});
		} catch (e) {
			// left empty
		}
	};

	function getUid() {
		var settings = getSettings();
		return settings && settings.UserGuids && settings.UserGuids[0];
	}

	function getSettings() {
		return getSettingsFromSnippetType('wmSnippet') || getSettingsFromSnippetType('wmPlaySnippet') || getSettingsFromSnippetType('wmPreviewSnippet');
	}

	function getSettingsFromSnippetType(type) {
		var win = getCtx().get('win');
		if (win[type] && win[type].getSettingsFile) {
			return win[type].getSettingsFile();
		}
	}
}

exports.SfVarsEventLogger = SfVarsEventLogger;


/***/ }),

/***/ 9842:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

'use strict';

Object.defineProperty(exports, "__esModule", ({
	value: true
}));
exports.SfVarsMapper = undefined;

var _keys = __webpack_require__(9068);

var _keys2 = _interopRequireDefault(_keys);

var _customVarsRetriver = __webpack_require__(5764);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function SfVarsMapper(_commonUtils, _siteConfigManager) {
	//The keys on the left are the legacy names that we use for walkme_sf_vars, the values on the right are the actual names that are used in the package request.
	var NON_LEGACY_VARS_MAPPINGS = {
		userId: 'Id',
		userName: 'Username',
		profileId: 'ProfileId',
		roleId: 'UserRoleId',
		userLanguage: 'LanguageLocaleKey'
	};

	//This function is used to populate some of the sfVars object (which is a ref to the external _sfVars object in the calling function) with the values from the userContext object (if they exist). 
	//This means that the actual sfVars package request will not need to be made for these vars, as they are already available in the userContext object.
	//We should consider removing this as it's added complexity for not really any functional gain (and could be confusing when the server request contains less than what was expected)
	this.extractUserContextVars = function extractUserContextVars(varsList, sfVars) {
		var currVar,
		    currVarValue,
		    userContext = window.UserContext;
		if (userContext) {
			for (var i = varsList.length - 1; i >= 0; i--) {
				currVar = varsList[i];
				currVarValue = userContext[currVar];

				if (_commonUtils.isDefined(currVarValue) && currVarValue !== '') {
					sfVars[currVar] = currVarValue;
					varsList.splice(i, 1);
				}
			}
		}

		return varsList;
	};

	//This is used before vars retrieval to map the standard vars to their non-legacy names, so that requests via the package will be made with the correct names.
	this.mapLegacyToNonLegacyVars = function mapLegacyToNonLegacyVars(varsList) {
		var result = [];

		//Convert the legacy name of the vars into their name in non-legacy
		wmjQuery.each(varsList, function (index, currVar) {
			var currNonLegacyVar = NON_LEGACY_VARS_MAPPINGS[currVar];

			if (currNonLegacyVar) {
				result.push(currNonLegacyVar);
			}
		});

		var sfCustomVars = (0, _customVarsRetriver.getCustomVars)();
		if (sfCustomVars && sfCustomVars.length) {
			result = result.concat(sfCustomVars);
		}

		return result;
	};

	//This is used after vars retrieval to map the var field names in the response back to their legacy names, for display on walkme_sf_vars
	this.mapNonLegacyDataToLegacy = function mapNonLegacyDataToLegacy(data) {
		var result = {};

		//Convert the legacy name of the vars into their name in non-legacy
		wmjQuery.each(data, function (name, value) {
			var currNonLegacyVar = wmjQuery.grep((0, _keys2.default)(NON_LEGACY_VARS_MAPPINGS), function (key) {
				return NON_LEGACY_VARS_MAPPINGS[key] === name;
			});

			if (currNonLegacyVar && currNonLegacyVar[0]) {
				result[currNonLegacyVar[0]] = data[NON_LEGACY_VARS_MAPPINGS[currNonLegacyVar[0]]];
			}
		});

		var sfCustomVars = (0, _customVarsRetriver.getCustomVars)();
		if (sfCustomVars && sfCustomVars.length) {
			wmjQuery.each(sfCustomVars, function (index, value) {
				result[value] = data[value];
			});
		}

		return result;
	};
}

exports.SfVarsMapper = SfVarsMapper;


/***/ }),

/***/ 8471:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

'use strict';

Object.defineProperty(exports, "__esModule", ({
	value: true
}));
exports.SfVarsRetrieverFactory = undefined;

var _log = __webpack_require__(4614);

var getCtx = (__webpack_require__(3257).getCtx);


function SfVarsRetrieverFactory(_sfVarsUtils, _legacySfVarsRetriever, _nonLegacySfVarsRetriever, _basicSfVarsRetriever, _unsupportedPlatformSfVarsRetriever, _sameDomainIframeSfVarsRetriever, _auraCmpSfVarsRetriever, _auraCmpLtngOutSfVarsRetriever, _sfVarsEventLogger, _featuresManager) {
	var _this = this;
	var _retrieverEnvMapper_wm4sf3 = {
		legacy: _legacySfVarsRetriever,
		visualforce: _nonLegacySfVarsRetriever,
		'community-classic': getCommunityClassicRetriever(),
		'community-lightning': _unsupportedPlatformSfVarsRetriever,
		'community-lwr': _unsupportedPlatformSfVarsRetriever,
		lightning: _nonLegacySfVarsRetriever,
		unknown: _unsupportedPlatformSfVarsRetriever
	};

	var _retrieverEnvMapper_walkme_sf = {
		legacy: _auraCmpLtngOutSfVarsRetriever,
		visualforce: _auraCmpLtngOutSfVarsRetriever,
		'community-classic': _auraCmpLtngOutSfVarsRetriever,
		'community-lightning': _auraCmpLtngOutSfVarsRetriever,
		'community-lwr': _auraCmpLtngOutSfVarsRetriever,
		lightning: _auraCmpSfVarsRetriever,
		unknown: _unsupportedPlatformSfVarsRetriever
	};

	var _retrieverEnvMapper_no_package = {
		legacy: _legacySfVarsRetriever,
		visualforce: _unsupportedPlatformSfVarsRetriever,
		'community-classic': _unsupportedPlatformSfVarsRetriever,
		'community-lightning': _unsupportedPlatformSfVarsRetriever,
		'community-lwr': _unsupportedPlatformSfVarsRetriever,
		lightning: _unsupportedPlatformSfVarsRetriever,
		unknown: _unsupportedPlatformSfVarsRetriever
	};

	_this.getSfVarsRetriever = function getSfVarsRetriever(chosenSfVarsFeature, packageDetectionResults) {
		var config = __webpack_require__(1696);

		if (config.useProxyRegex) {
			(0, _log.log)('Selecting sfVars retriever by regex [', config.useProxyRegex, ' ]');

			var re = new RegExp(config.useProxyRegex, 'i');
			if (re.test(location.href)) {
				(0, _log.log)('Use NonLegacySfVarsRetriever because proxy regex matched');
				return getCtx().get('NonLegacySfVarsRetriever');
			} else {
				(0, _log.log)('Proxy regex did not match');
			}
		}

		if (config.useProxy) {
			(0, _log.log)('Use NonLegacySfVarsRetriever configured');
			return getCtx().get('NonLegacySfVarsRetriever');
		}

		if (config.useRestApi) {
			(0, _log.log)('Use LegacySfVarsRetriever configured');
			return getCtx().get('LegacySfVarsRetriever');
		}

		if (config.apiLtngOut) {
			(0, _log.log)('Use ApiLtngOutSfVarsRetriever configured');
			return getCtx().get('ApiLtngOutSfVarsRetriever');
		}

		if (chosenSfVarsFeature == _sfVarsUtils.GENERAL_SF_VARS_FEATURE) {
			var currentSfEnvironment = _sfVarsUtils.getCurrentSfEnvironment();
			var defaultRetriever = getRetrieverByEnv(currentSfEnvironment, packageDetectionResults);
			(0, _log.log)('Using default Extractor [', defaultRetriever.getType(), '] for [', currentSfEnvironment, '] environment');
			return defaultRetriever;
		} else if (chosenSfVarsFeature == _sfVarsUtils.BASIC_SF_VARS_FEATURE) {
			(0, _log.log)('Retrieving sf vars with basicSfVars');
			return _basicSfVarsRetriever;
		}
	};

	function getCommunityClassicRetriever() {
		if (window.__sfdcSessionId) {
			return _legacySfVarsRetriever;
		} else if (_featuresManager.isFeatureEnabled(_sfVarsUtils.SAME_DOMAIN_COMMUNITIES_FEATURE)) {
			return _sameDomainIframeSfVarsRetriever;
		}
		return _nonLegacySfVarsRetriever;
	}

	function getRetrieverByEnv(env, packageDetectionResults) {
		if (packageDetectionResults.walkme_sf_package) {
			//return the new retriever mappings
			return _retrieverEnvMapper_walkme_sf[env];
		} else if (packageDetectionResults.wm4sf3_package) {
			//return the original retriever mappings
			return _retrieverEnvMapper_wm4sf3[env];
		} else {
			return _retrieverEnvMapper_no_package[env];
		}
	}
}

exports.SfVarsRetrieverFactory = SfVarsRetrieverFactory;


/***/ }),

/***/ 4266:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

'use strict';

Object.defineProperty(exports, "__esModule", ({
	value: true
}));
exports.SfVarsUtils = undefined;

var _typeof2 = __webpack_require__(1463);

var _typeof3 = _interopRequireDefault(_typeof2);

var _promise = __webpack_require__(3125);

var _promise2 = _interopRequireDefault(_promise);

var _regenerator = __webpack_require__(47);

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = __webpack_require__(7924);

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _wmPrelibPluginEntryManager = __webpack_require__(3257);

var _settingsValuesRetriever = __webpack_require__(7015);

var _regexp = __webpack_require__(5971);

var _regexp2 = _interopRequireDefault(_regexp);

var _log = __webpack_require__(4614);

var _legacySalesForceUserContext = __webpack_require__(4308);

var _wmPromise = __webpack_require__(309);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// const clientServerLogger = require('wm-client-server-logger')(getCtx());

function SfVarsUtils(featuresManager) {
	var _this = this;
	var _currentSfEnvironment = void 0;
	var _currentDetectedPackages = void 0;
	var _currentUserContext = {
		userId: '',
		longUserId: '',
		language: '',
		vfDomainPattern: '',
		auraDomain: ''
	};
	var _sfVarsUserMessages = [];

	var sfEnvTypeMetadata = {
		legacy: {
			ctxUrlBuilderName: '',
			separatedFeatureName: 'legacySfVars',
			appEndpoint: ''
		},
		lightning: {
			ctxUrlBuilderName: 'LightningSfVarsUrlBuilder',
			separatedFeatureName: 'lightningSfVars',
			appEndpoint: '/apex/vf_WalkMeSfVars'
		},
		visualforce: {
			ctxUrlBuilderName: 'LightningSfVarsUrlBuilder',
			separatedFeatureName: 'lightningSfVars',
			appEndpoint: '/apex/vf_WalkMeSfVars'
		},
		'community-classic': {
			ctxUrlBuilderName: 'CommunitySfVarsUrlBuilder',
			separatedFeatureName: 'communitiesSfVars',
			appEndpoint: '/apex/WM4SF3__vf_WalkMeSfVars'
		}
	};

	// _this.LOG_LEVEL = clientServerLogger.ConstsLogLevel;
	_this.LOG_LEVEL = {
		ALWAYS: 1,
		DAILY: 2,
		WEEKLY: 3,
		ONCE: 4
	};
	_this.BASIC_SF_VARS_FEATURE = 'basicSfVars';
	_this.SAME_DOMAIN_COMMUNITIES_FEATURE = 'sameDomainCommunities';
	_this.SF_VARS_LAST_FAIL_KEY = 'walkme-sf-vars-last-fail';
	_this.IFRAME_CREATED_TIMEOUT_TICKS = (0, _settingsValuesRetriever.getSettingsValue)('iframeCreatedTimeout', 10000); //10 seconds
	_this.FAIL_EXPIRATION_TIME_SECONDS = 4 * 60 * 60; //Four hours
	_this.MESSAGES = {
		SKIP_AFTER_FAILURE: 'Retrieval was skipped due to a failure in the last 4 hours. Republish settings to reset check or clear WalkMe storage with WalkMeAPI.storage.removeAll()',
		VARS_LIST_EMPTY: 'List to extract was empty',
		DATA_HAS_NO_VAL: 'nonLegacy sfVars postback data was ',
		FAIL_FIND_SALESFORCE_NAME: "Couldn't determine endpoint for more than 7 seconds"
	};
	_this.GENERAL_SF_VARS_FEATURE = 'sfVars';
	_this.SF_VARS_LAST_RETRIEVER_KEY = 'walkme-sf-vars-last-retriever';
	_this.SF_VARS_LAST_RETRIEVER_KEY_EXPR_SECONDS = 24 * 60 * 60; // one day
	_this.SF_DEFAULT_VARS = ['userId', 'organizationId', 'organizationName', 'profileId', 'roleId', 'userName', 'userLanguage'];

	_this.config;

	function ctor() {
		_this.config = __webpack_require__(1696);
	}

	_this.initSfVarsContextAsync = function () {
		var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
			var _this2 = this;

			var _userContext, key;

			return _regenerator2.default.wrap(function _callee$(_context) {
				while (1) {
					switch (_context.prev = _context.next) {
						case 0:
							_context.next = 2;
							return _this.detectCurrentEnvironmentAsync();

						case 2:
							_currentSfEnvironment = _context.sent;

							if (_this.config.shouldWaitForUserContext) {
								_context.next = 9;
								break;
							}

							_context.next = 6;
							return _this.initUserContextAsync();

						case 6:
							_context.t0 = _context.sent;
							_context.next = 12;
							break;

						case 9:
							_context.next = 11;
							return _this.waitForUserContext().catch(function () {
								return _this2.initUserContextAsync();
							});

						case 11:
							_context.t0 = _context.sent;

						case 12:
							_userContext = _context.t0;


							if (!_userContext) {
								(0, _log.log)('Context is undefined. Cannot set platform context.');
							}

							for (key in _currentUserContext) {
								if (_userContext.hasOwnProperty(key)) {
									_currentUserContext[key] = _userContext[key];
								}
							}

							_context.next = 17;
							return _this.detectPackageAsync();

						case 17:
							_currentDetectedPackages = _context.sent;
							return _context.abrupt('return', {
								environment: _currentSfEnvironment,
								packages: _currentDetectedPackages,
								userContext: _currentUserContext
							});

						case 19:
						case 'end':
							return _context.stop();
					}
				}
			}, _callee, this);
		}));

		function initSfVarsContextAsync() {
			return _ref.apply(this, arguments);
		}

		return initSfVarsContextAsync;
	}();

	_this.waitForUserContext = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3() {
		var _this3 = this;

		return _regenerator2.default.wrap(function _callee3$(_context3) {
			while (1) {
				switch (_context3.prev = _context3.next) {
					case 0:
						(0, _log.log)('Waiting for UserContext to be set in the window...');
						return _context3.abrupt('return', (0, _wmPromise.retry)((0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2() {
							return _regenerator2.default.wrap(function _callee2$(_context2) {
								while (1) {
									switch (_context2.prev = _context2.next) {
										case 0:
											return _context2.abrupt('return', new _promise2.default(function (resolve, reject) {
												if (window.UserContext) {
													(0, _log.log)('...3rd Party Loaded UserContext Found: ', window.UserContext);
													resolve(window.UserContext);
												} else {
													reject('...Timeout while waiting for UserContext');
												}
											}));

										case 1:
										case 'end':
											return _context2.stop();
									}
								}
							}, _callee2, _this3);
						})), _this.config.timeoutWaitUserContext / 200, 200));

					case 2:
					case 'end':
						return _context3.stop();
				}
			}
		}, _callee3, this);
	}));

	// Function to detect current environment
	_this.detectCurrentEnvironmentAsync = function () {
		var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4() {
			var startTime, timeout, _detectionResult, _detectedEnvironment;

			return _regenerator2.default.wrap(function _callee4$(_context4) {
				while (1) {
					switch (_context4.prev = _context4.next) {
						case 0:
							startTime = new Date().getTime(); // Start time

							timeout = 5000; // 5 seconds

							_detectionResult = void 0;
							_detectedEnvironment = 'unknown';
							return _context4.abrupt('return', new _promise2.default(function (resolve) {
								(0, _log.log)('detectCurrentEnvironmentAsync detecting environment');

								var resolveAndLogTime = function resolveAndLogTime() {
									var endTime = new Date().getTime(); // End time
									(0, _log.log)('detectCurrentEnvironmentAsync execution time: ' + (endTime - startTime) + 'ms', _detectionResult);
									resolve(_detectedEnvironment);
								};

								var interval = setInterval(function () {
									var currentTime = new Date().getTime();
									if (currentTime - startTime > timeout) {
										(0, _log.log)('Could not find known environment within ' + timeout / 1000 + ' seconds');
										clearInterval(interval);
										resolveAndLogTime('Timeout');
									}
									try {
										_detectionResult = {
											isLightning: window.location.href.includes('lightning.force.com') && (0, _typeof3.default)(window.$A) === 'object' && typeof window.$A.get('$SObjectType.CurrentUser.Id') === 'string',
											isVF: window.location.href.includes('vf.force.com'),
											isLegacy: window.location.href.includes('my.salesforce.com'),
											isSiteLightning: !window.location.href.includes('lightning.force.com') && (0, _typeof3.default)(window.$A) === 'object' && typeof window.$A.get('$SObjectType.CurrentUser.Id') === 'string',
											isSiteLwr: (0, _typeof3.default)(window.LWR) === 'object', // Lightning Web Runtime Experience Site
											lwrUserDiv: wmjQuery('script[data-provider-type="user"]').length > 0,
											isSiteLegacy: (0, _typeof3.default)(window.UserContext) === 'object' && typeof window.UserContext.siteUrlPrefix === 'string' && !window.location.href.includes('my.salesforce.com')
										};
									} catch (error) {
										(0, _log.log)('Exception while detecting platform:', error);
									}

									if (_detectionResult.isVF) {
										_detectedEnvironment = 'visualforce';
									} else if (_detectionResult.isLegacy) {
										_detectedEnvironment = 'legacy';
									} else if (_detectionResult.isLightning) {
										_detectedEnvironment = 'lightning';
									} else if (_detectionResult.isSiteLightning) {
										_detectedEnvironment = 'community-lightning';
									} else if (_detectionResult.isSiteLwr && _detectionResult.lwrUserDiv) {
										_detectedEnvironment = 'community-lwr';
									} else if (_detectionResult.isSiteLegacy) {
										_detectedEnvironment = 'community-classic';
									}

									if (_detectedEnvironment !== 'unknown') {
										clearInterval(interval);
										resolveAndLogTime();
									}
								}, 100); // Check every 100ms
							}));

						case 5:
						case 'end':
							return _context4.stop();
					}
				}
			}, _callee4, this);
		}));

		function detectCurrentEnvironmentAsync() {
			return _ref4.apply(this, arguments);
		}

		return detectCurrentEnvironmentAsync;
	}();

	// Function to initialize user context
	_this.initUserContextAsync = function () {
		var _ref5 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee5() {
			return _regenerator2.default.wrap(function _callee5$(_context5) {
				while (1) {
					switch (_context5.prev = _context5.next) {
						case 0:
							return _context5.abrupt('return', new _promise2.default(function (resolve, reject) {
								(0, _log.log)('initUserContextAsync setting up UserContext');

								//check that _currentSfEnvironment is set
								switch (_currentSfEnvironment) {
									case 'visualforce':
										if (window.UserContext && window.UserContext.initialized) {
											(0, _log.log)('UserContext initialized for Visualforce');
											resolve(window.UserContext);
										} else if (window.UserContext) {
											(0, _log.log)('UserContext found but not initialized for Visualforce. Initializing.');
											window.UserContext.initializeFromServlet(null, function () {
												resolve(window.UserContext);
											});
										} else {
											(0, _log.log)('UserContext NOT found, adding.');
											(0, _legacySalesForceUserContext.initUserContextFromServlet)().then(function () {
												resolve(window.UserContext);
											});
										}
										break;
									case 'legacy':
										(0, _log.log)('Classic page, resolving');
										resolve(window.UserContext);
										break;
									case 'lightning':
										(0, _log.log)('Lightning page, creating UserContext');
										(0, _legacySalesForceUserContext.initUserContextFromServlet)().then(function () {
											resolve(window.UserContext);
										});
										break;
									case 'community-lightning':
										(0, _log.log)('Lightning Experience site, creating UserContext');
										window.UserContext = {
											longUserId: window.$A.get('$SObjectType.CurrentUser.Id'),
											userId: window.$A.get('$SObjectType.CurrentUser.Id').slice(0, -3),
											language: window.$A.get('$Locale.langLocale')
										};
										if (window.UserContext.longUserId && window.UserContext.userId) {
											(0, _log.log)('UserContext object created for ' + _currentSfEnvironment);
											resolve(window.UserContext);
										}
										break;
									case 'community-lwr':
										(0, _log.log)('LWR Experience site, creating UserContext');
										var lwrUser = JSON.parse(wmjQuery('script[data-provider-type="user"]')[0].text);
										window.UserContext = {
											longUserId: lwrUser.crmId,
											userId: lwrUser.crmId.slice(0, -3)
										};
										if (window.UserContext.longUserId && window.UserContext.userId) {
											(0, _log.log)('UserContext object created for LWR');
											resolve(window.UserContext);
										}
										break;
									case 'community-classic':
										(0, _log.log)('Classic Communities site, creating UserContext');
										if (window.UserContext.initialized) {
											(0, _log.log)('UserContext already initialized for Classic Communities');
											resolve(window.UserContext);
										} else {
											(0, _log.log)('UserContext found but not initialized for Classic Communities. Initializing.');
											window.UserContext.initializeFromServlet(null, function () {
												resolve(window.UserContext);
											});
										}
										break;
									default:
										(0, _log.log)('initUserContextAsync Environment not set, unable to initialize UserContext');
										reject('initUserContextAsync Environment not set, unable to initialize UserContext');
								}
							}));

						case 1:
						case 'end':
							return _context5.stop();
					}
				}
			}, _callee5, this);
		}));

		function initUserContextAsync() {
			return _ref5.apply(this, arguments);
		}

		return initUserContextAsync;
	}();

	_this.getCurrentSfEnvironment = function getCurrentSfEnvironment() {
		return _currentSfEnvironment;
	};

	_this.getCurrentDetectedPackages = function getCurrentDetectedPackages() {
		return _currentDetectedPackages;
	};

	_this.initFullUserContextAsync = function () {
		var _ref6 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee6() {
			return _regenerator2.default.wrap(function _callee6$(_context6) {
				while (1) {
					switch (_context6.prev = _context6.next) {
						case 0:
							_context6.next = 2;
							return (0, _legacySalesForceUserContext.initUserContextFromServlet)();

						case 2:
						case 'end':
							return _context6.stop();
					}
				}
			}, _callee6, this);
		}));

		function initFullUserContextAsync() {
			return _ref6.apply(this, arguments);
		}

		return initFullUserContextAsync;
	}();

	_this.isLegacySfUrl = function isLegacySfUrl() {
		var sfLegacyRegex = new RegExp('.*\\.salesforce\\.com.*');

		return sfLegacyRegex.test(window.location.hostname);
	};

	_this.getAppEndpointByEnvironment = function getAppEndpointByEnvironment(envName) {
		return sfEnvTypeMetadata[envName] && sfEnvTypeMetadata[envName].appEndpoint;
	};

	_this.getUrlBuilderByEnvironment = function getUrlBuilderByEnvironment(envName) {
		var builder = sfEnvTypeMetadata[envName] && sfEnvTypeMetadata[envName].ctxUrlBuilderName;

		return (0, _wmPrelibPluginEntryManager.getCtx)().get(builder);
	};

	_this.isAnySFVarsFeatureEnabled = function isAnySFVarsFeatureEnabled() {
		return featuresManager.isFeatureEnabled(_this.BASIC_SF_VARS_FEATURE) && !featuresManager.isFeatureEnabled(_this.GENERAL_SF_VARS_FEATURE);
	};

	//this is a copy of a function from salesforce classic cause it removed from version winter 17 in lightning
	_this.to18CharId = function (fifteenId) {
		if (fifteenId == null || fifteenId.length == 18) return fifteenId;
		fifteenId = fifteenId.replace(/\"/g, '');
		if (fifteenId.length != 15) return null;
		var completionToNew = '';
		for (var i = 0; i < 3; i++) {
			for (var offset = 0, j = 0; j < 5; j++) {
				var charInMatrix = fifteenId.charAt(5 * i + j);
				if ('A' <= charInMatrix && 'Z' >= charInMatrix) {
					offset += 1 << j;
				}
			}

			if (25 >= offset) {
				completionToNew = completionToNew + 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.charAt(offset);
			} else {
				completionToNew = completionToNew + '012345'.charAt(offset - 26);
			}
		}
		return fifteenId + completionToNew;
	};

	_this.setSfVarsUserMessages = function setSfVarsUserMessages(message) {
		var userMsg;
		if (message instanceof Error) {
			userMsg = message.message;
		} else {
			userMsg = message;
		}
		_sfVarsUserMessages.push(userMsg);
	};

	_this.getSfVarsUserMessages = function getSfVarsUserMessages() {
		return _sfVarsUserMessages;
	};

	_this.getSfVarsUserContext = function getSfVarsUserContext() {
		return _currentUserContext;
	};

	function isLegacySfUrl() {
		var sfLegacyRegex = new RegExp(_regexp2.default.sfDomain);
		var vfLegacyRegex = new RegExp(_regexp2.default.vfDomain);

		return (sfLegacyRegex.test(window.location.hostname) || vfLegacyRegex.test(window.location.hostname)) && !isLightningSfUrl();
	}

	function isLightningSfUrl() {
		var oldLightningRegex = new RegExp(_regexp2.default.oldLightningDomain);
		var newLightningRegex = new RegExp(_regexp2.default.newLightningDomain);

		return oldLightningRegex.test(window.location.pathname) || newLightningRegex.test(window.location.pathname);
	}

	_this.getNonceValue = function getNonceValue() {
		if (this.getCurrentSfEnvironment() === 'lightning' || this.getCurrentSfEnvironment() === 'legacy') {
			return window._walkmeExtension && window._walkmeExtension.nonceValue ? window._walkmeExtension.nonceValue : '';
		}
	};

	_this.detectPackageAsync = function detectPackageAsync() {
		var forcePackageType = (0, _settingsValuesRetriever.getSettingsValue)('forcePackageType');

		if (forcePackageType) {
			_currentDetectedPackages = {
				wm4sf3_package: forcePackageType === 'wm4sf3',
				walkme_sf_package: forcePackageType === 'walkme_sf'
			};
			(0, _log.log)('Package detection is forced by settings');
			return _promise2.default.resolve(_currentDetectedPackages);
		}
		//if window.Aura exists, return detectPackageInAura, else return detectPackagebyImg
		return window.Aura ? detectPackageInAura() : detectPackagebyImg();
	};

	function detectPackagebyImg() {
		(0, _log.log)('Detecting package by image');

		var checkImage = function checkImage(url, key) {
			return new _promise2.default(function (resolve, reject) {
				var img = new Image();
				img.src = url;

				var startTime = Date.now(); // capture the start time

				img.onload = function () {
					var endTime = Date.now(); // capture the end time
					var duration = endTime - startTime; // calculate the duration
					var result = {};
					result[key] = true;
					result.duration = duration;
					resolve(result);
				};

				img.onerror = function () {
					var endTime = Date.now(); // capture the end time
					var duration = endTime - startTime; // calculate the duration
					var result = {};
					result[key] = false;
					result.duration = duration;
					resolve(result);
				};
			});
		};

		var resourceDomain = _this.getCurrentSfEnvironment() === 'visualforce' ? _this.getSfVarsUserContext().auraDomain : window.location.hostname;

		var image1 = 'https://' + resourceDomain + '/resource/wm4sf3__NoDataImage';
		var image2 = 'https://' + resourceDomain + '/resource/walkme_sf__WalkMeLogoSmall';

		return _promise2.default.all([checkImage(image1, 'wm4sf3_package'), checkImage(image2, 'walkme_sf_package')]).then(function (results) {
			var acc = {};
			for (var i = 0; i < results.length; i++) {
				for (var key in results[i]) {
					acc[key] = results[i][key];
				}
			}
			_currentDetectedPackages = acc;
			return _currentDetectedPackages;
		});
	}

	function detectPackageInAura() {
		(0, _log.log)('Detecting package in Aura');
		return new _promise2.default(function (resolve, reject) {
			if (window.Aura && window.Aura.StaticResourceMap && window.Aura.StaticResourceMap.WalkMeLogo) {
				var wm4sf3Exists = !!window.Aura.StaticResourceMap.WalkMeLogo.WM4SF3;
				var walkme_sfExists = !!window.Aura.StaticResourceMap.WalkMeLogo.walkme_sf;

				_currentDetectedPackages = {
					'wm4sf3_package': wm4sf3Exists,
					'walkme_sf_package': walkme_sfExists
				};

				resolve(_currentDetectedPackages);
			} else {
				reject(new Error('Aura.StaticResourceMap.WalkMeLogo does not exist'));
			}
		});
	}

	ctor.apply(null, arguments);
}

exports.SfVarsUtils = SfVarsUtils;


/***/ }),

/***/ 1696:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

'use strict';

var _settingsValuesRetriever = __webpack_require__(7015);

module.exports = {
	skipLastFailCheck: (0, _settingsValuesRetriever.getSettingsValue)('skipLastFailCheck', false),
	clearCachedSfVarsOlderThan: (0, _settingsValuesRetriever.getSettingsValue)('clearCachedSfVarsOlderThan', false),
	customVars: (0, _settingsValuesRetriever.getSettingsValue)('sfCustomVars', ''),
	shouldWaitForUserContext: (0, _settingsValuesRetriever.getSettingsValue)('shouldWaitForUserContext', false),
	timeoutWaitUserContext: (0, _settingsValuesRetriever.getSettingsValue)('timeoutWaitUserContext', 5000),
	communityProxyIframeUrl: (0, _settingsValuesRetriever.getSettingsValue)('communityProxyIframeUrl', '/vf/resource/sfVarsProxy'),
	lightningProxyIframeUrl: (0, _settingsValuesRetriever.getSettingsValue)('lightningProxyIframeUrl', 'about:blank'),
	sfVarsLightningBaseUrl: (0, _settingsValuesRetriever.getSettingsValue)('sfVarsLightningBaseUrl'),
	sfVarsLightningBaseUrlDictionary: (0, _settingsValuesRetriever.getSettingsValue)('sfVarsLightningBaseUrlDictionary'),
	useProxyRegex: (0, _settingsValuesRetriever.getSettingsValue)('UseProxyRegex'),
	useProxy: (0, _settingsValuesRetriever.getSettingsValue)('UseProxy'),
	useRestApi: (0, _settingsValuesRetriever.getSettingsValue)('UseRestApi'),
	apiLtngOut: (0, _settingsValuesRetriever.getSettingsValue)('ApiLtngOut'),
	sfVarsBlacklist: (0, _settingsValuesRetriever.getSettingsValue)('sfVarsBlacklist'),
	customUserCtx: (0, _settingsValuesRetriever.getSettingsValue)('customUserCtx')
};


/***/ }),

/***/ 5764:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

'use strict';

Object.defineProperty(exports, "__esModule", ({
    value: true
}));

var _keys = __webpack_require__(9068);

var _keys2 = _interopRequireDefault(_keys);

exports.getCustomVars = getCustomVars;

var _wmPrelibPluginEntryManager = __webpack_require__(3257);

var _settingsValuesRetriever = __webpack_require__(7015);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getCustomVars() {
    var customVars = customVarsMapper((0, _settingsValuesRetriever.getSettingsValue)('customVarsMap'));
    return customVars ? customVars : (0, _wmPrelibPluginEntryManager.getCtx)().get('CommonUtils').getJsonSettings().sfCustomVars;
};

function customVarsMapper(customVarsObject) {
    if (!customVarsObject) {
        return;
    }

    var target = customVarsObject.type === 'domain' ? document.domain : '';
    var varsMap = customVarsObject.varsMap;
    var matchKey = (0, _keys2.default)(varsMap).find(function (key) {
        return new RegExp(key).test(target);
    });

    return matchKey ? varsMap[matchKey] : [];
}


/***/ }),

/***/ 2558:
/***/ (function(module) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

'use strict';

function padTo2Digits(num) {
	var pad = num < 10 ? '0' : '';
	return pad + num;
}

function formatDate(date) {
	if (typeof date === 'string' || typeof date === 'number') {
		date = new Date(date);
	}

	return [padTo2Digits(date.getDate()), padTo2Digits(date.getMonth() + 1), date.getFullYear()].join('/') + ' ' + [padTo2Digits(date.getHours()), padTo2Digits(date.getMinutes()), padTo2Digits(date.getSeconds())].join(':');
}

module.exports = {
	formatDate: formatDate
};


/***/ }),

/***/ 4614:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

'use strict';

Object.defineProperty(exports, "__esModule", ({
	value: true
}));
exports.parseErrorFromSF = exports.log = undefined;

var _toConsumableArray2 = __webpack_require__(891);

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _wmPrelibPluginEntryManager = __webpack_require__(3257);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ctx = (0, _wmPrelibPluginEntryManager.getCtx)();
var logger = ctx.get('PrelibLogger');
var where = window.top == window.self ? '[TOP]' : '[IFR]';
var header = where + '[sf-common]';

var parentLogStatus = 'unknown';

var earlyIframeLogs = []; // logs that come while we wait for the response of the parent

var log = function log() {
	for (var _len = arguments.length, logRecord = Array(_len), _key = 0; _key < _len; _key++) {
		logRecord[_key] = arguments[_key];
	}

	logRecord.unshift(header);

	if (window.self === window.top) {
		logger.write.apply(logger, logRecord);
	} else {
		// child logic
		if (parentLogStatus === 'unknown') {
			requestLogStatus();
			earlyIframeLogs.push(logRecord);
		} else if (parentLogStatus === 'true') {
			logger.write.apply(logger, logRecord);
		}
	}
};

var requestLogStatus = function requestLogStatus() {
	parentLogStatus = 'requesting';
	window.top.postMessage({ type: 'wm_logger_request' }, '*');
};

function parseErrorFromSF(e) {
	if (e.faultstring) return '\n'.concat(e.faultstring);
	if (e.message) return e.message;
	return e;
}

var init = function init() {
	if (window.self === window.top) {
		window.addEventListener('message', function (event) {
			if (event.data && event.data.type === 'wm_logger_request') {
				var status = ctx.get('PrelibLogger').isLogEnabled().toString();
				event.source.postMessage({
					type: 'wm_logger_reply',
					value: status
				}, '*');
			}
		});
	} else {
		requestLogStatus();

		window.addEventListener('message', function (event) {
			if (event.data && event.data.type === 'wm_logger_reply') {
				if (event.data.value === 'true') {
					_walkmeInternals.ctx.get('PrelibLogger').enableLog();

					if (earlyIframeLogs.length > 0) {
						earlyIframeLogs.forEach(function (logRecord) {
							logger.write.apply(logger, (0, _toConsumableArray3.default)(logRecord));
						});

						earlyIframeLogs = [];
					}
				} else {
					_walkmeInternals.ctx.get('PrelibLogger').disableLog();
					parentLogStatus = 'unknown';
				}
			}
		});
	}
};

init();

exports.log = log;
exports.parseErrorFromSF = parseErrorFromSF;


/***/ }),

/***/ 5971:
/***/ (function(module) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

'use strict';

module.exports = {
	vfDomain: '.*\\.(visual|vf)\\.?force\\.com.*',
	sfDomain: '.*\\.salesforce\\.com.*',
	oldLightningDomain: '/one/one\\.app.*',
	newLightningDomain: '/lightning'

};


/***/ }),

/***/ 7015:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

'use strict';

Object.defineProperty(exports, "__esModule", ({
	value: true
}));
exports.getSettingsValue = undefined;

var _wmPrelibPluginEntryManager = __webpack_require__(3257);

function getSettingsValue(key, defaultValue) {
	if (!key) return defaultValue;
	var value;

	var jsonSettings = (0, _wmPrelibPluginEntryManager.getCtx)().get('CommonUtils').getJsonSettings();
	var value = getValue(jsonSettings, key);

	if (!value) {
		var siteConfig = (0, _wmPrelibPluginEntryManager.getCtx)().get('SiteConfigManager').get().Custom;
		value = getValue(siteConfig || {}, key);
	}

	return value || defaultValue;
};

function getValue(settings, key) {
	var objectJpath = (0, _wmPrelibPluginEntryManager.getCtx)().get('ObjectJpath');

	return objectJpath.getValue(settings, 'sfVars.' + key) || objectJpath.getValue(settings, key);
}

exports.getSettingsValue = getSettingsValue;


/***/ }),

/***/ 309:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

'use strict';

Object.defineProperty(exports, "__esModule", ({
	value: true
}));
exports.retry = exports.timedPromise = undefined;

var _promise = __webpack_require__(3125);

var _promise2 = _interopRequireDefault(_promise);

var _log = __webpack_require__(4614);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function timedPromise(timeout, callback, msgError) {
	return new _promise2.default(function (resolve, reject) {
		var t = timeout;
		var e = msgError;

		// Set up the timeout
		var timer = /*allowFunc*/window.setTimeout(function () {
			reject(new Error(e || 'Promise timed out after ' + t + ' ms'));
		}, t);

		// Set up the real work
		callback(function (value) {
			clearTimeout(timer);
			resolve(value);
		}, function (error) {
			clearTimeout(timer);
			reject(error);
		});
	});
}

function retry(fn, times, delay) {
	if (typeof times === 'undefined') times = 25;
	if (typeof delay === 'undefined') delay = 200;

	return new _promise2.default(function (resolve, reject) {
		var error;
		var attempt = function attempt() {
			if (times == 0) {
				(0, _log.log)(error);
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

exports.timedPromise = timedPromise;
exports.retry = retry;


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
/******/ 	var __webpack_exports__ = __webpack_require__(1490);
/******/ 	wmbundle = __webpack_exports__;
/******/ 	
/******/ })()
;
/* WalkMe Module */ return wmbundle; })
//# sourceMappingURL=bundle.js.map
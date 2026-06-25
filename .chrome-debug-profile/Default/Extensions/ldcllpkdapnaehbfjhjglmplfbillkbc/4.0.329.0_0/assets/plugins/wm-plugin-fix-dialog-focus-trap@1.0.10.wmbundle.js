/* WalkMe Module */ typeof _walkmeInternals !== 'undefined' && _walkmeInternals.wmloader && _walkmeInternals.wmloader.define('wm-plugin-fix-dialog-focus-trap@1.0.10@prelib', {"name":"wm-plugin-fix-dialog-focus-trap","version":"1.0.10","toolbelt":"2.0.2","packageDate":"2025-04-14T06:00:28.409Z","entry":"prelib"}, function (__wmplugin__) {  
var wmbundle;
/******/ (function() { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 795:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

module.exports = __webpack_require__(221);



/***/ }),

/***/ 540:
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

/***/ 298:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

"use strict";

var getCtx = (__webpack_require__(522)/* .getCtx */ .yK);
var wait = __webpack_require__(540)(getCtx());
var log = (__webpack_require__(112)/* .log */ .R);
function FixDialogFocusTrap() {
  var _this = this;
  _this.run = run;
  var ctx = getCtx();
  var walkmeIds = ['walkme', 'wm-', 'wmd-'];
  var walkmeClasses = ['walkme-', 'wm-', 'wmd-'];
  var evts;
  var ELEMENT_PARENT_CHECK_DEPTH = 2;
  var promiseManager = ctx.get('PromiseManager');
  var eventsListener = ctx.get('EventsListener');
  var isRunning = false;
  var _handlerToWrapperHandler;
  function ctor() {
    _handlerToWrapperHandler = [];
  }
  function run() {
    eventsListener.once('wm_walkmeLibLoaded', init);
    if (!isRunning) {
      wait.registerFunction('WalkMeConfigFileLoaded', function () {
        return init;
      });
    }
  }
  function init() {
    isRunning = true;
    if (checkBlacklistURL() || !checkWhitelistURL()) {
      log('Exitting without starting plugin functionality');
      return promiseManager.resolve(false);
    }
    addIncludedElements();
    setEvents();
    var types = [HTMLHtmlElement, HTMLBodyElement, Window];
    for (var i = 0; i < types.length; i++) {
      var type = types[i];
      var oldAddEventListener = type.prototype.addEventListener;
      type.prototype.addEventListener = createAddEventListener(oldAddEventListener);
      var oldRemoveEventListener = type.prototype.removeEventListener;
      type.prototype.removeEventListener = createRemoveEventListener(oldRemoveEventListener);
    }
    log('Event listeners set up');
    return promiseManager.resolve(true);
  }
  function checkConfigReady() {
    return ctx.get('CommonUtils').getJsonSettings && ctx.get('CommonUtils').getJsonSettings();
  }
  function getSettings() {
    return checkConfigReady() && ctx.get('CommonUtils').getJsonSettings().fixDialogFocusTrap || {};
  }
  function isElementParentCheckEnabled() {
    return getSettings() && getSettings().isParentCheckEnabled;
  }
  function createAddEventListener(oldAddEventListener) {
    if (checkExcludedEl()) {
      return oldAddEventListener;
    }
    return function (e, handler, capture) {
      if (evts.indexOf(e) === -1) {
        oldAddEventListener(e, handler, capture);
        return;
      }
      log('Adding event listener for event: ' + e);
      for (var i = 0; i < evts.length; i++) {
        if (evts[i] == e) {
          if (checkExcludeScope.call(this)) {
            return;
          }
          var wrapperHandler = function wrapperHandler(event) {
            if (!isWalkMeOrIncludeElement(event.target, 0) || isWalkMeDraggable(event.target)) {
              log('Applying the original handler for event: ' + event.type);
              handler.apply(event.target, arguments);
            }
          };
          _handlerToWrapperHandler.push({
            handler: handler,
            wrapperHandler: wrapperHandler
          });
          oldAddEventListener(e, wrapperHandler, capture);
          return;
        }
      }
      oldAddEventListener(e, handler, capture);
    };
  }
  function createRemoveEventListener(oldRemoveEventListener) {
    return function (e, handler, capture) {
      log('Removing event listener for event: ' + e);
      var wrapperHandler = getAndDeleteWrapperHandlerByHandler(handler);
      if (wrapperHandler) {
        handler = wrapperHandler;
      }
      oldRemoveEventListener(e, handler, capture);
    };
  }
  function getAndDeleteWrapperHandlerByHandler(handler) {
    for (var i = 0; i < _handlerToWrapperHandler.length; i++) {
      var handlerToWrapperHandler = _handlerToWrapperHandler[i];
      if (handlerToWrapperHandler.handler == handler) {
        _handlerToWrapperHandler.splice(i, 1);
        return handlerToWrapperHandler.wrapperHandler;
      }
    }
    return null;
  }
  function isWalkMeOrIncludeElement(element, level) {
    if (!element || !(element instanceof Element) || level >= ELEMENT_PARENT_CHECK_DEPTH) {
      return false;
    }
    var id = element.id;
    var classList = element.classList ? element.classList.value : null;
    if (id) {
      for (var i = 0; i < walkmeIds.length; i++) {
        if (id.indexOf(walkmeIds[i]) !== -1) {
          log('WalkMe Element, Id: ' + id);
          return true;
        }
      }
    }
    if (classList) {
      for (var _i = 0; _i < walkmeClasses.length; _i++) {
        if (classList.indexOf(walkmeClasses[_i]) !== -1) {
          log('WalkMe Element, class: ' + classList);
          return true;
        }
      }
    }
    if (isElementParentCheckEnabled()) {
      return isWalkMeOrIncludeElement(element.parentElement ? element.parentElement : null, level + 1);
    }
    return false;
  }
  ;
  function isWalkMeDraggable(element) {
    if (!element) return;
    var elementClass = element.classList ? element.classList.value : null;
    var walkmeDraggables = ['wm-drag-header', 'ui-draggable', 'walkme-jspDrag'];
    if (elementClass) {
      for (var index = 0; index < walkmeDraggables.length; index++) {
        if (elementClass.indexOf(walkmeDraggables[index]) !== -1) {
          log('Element is draggable: ' + elementClass);
          return true;
        }
      }
    }
    return false;
  }
  function createChecker(settingsKey, checkFunction) {
    return function () {
      var settings = getSettings();
      var value = settings && settings[settingsKey] ? settings[settingsKey] : null;
      if (!value) {
        return false;
      }
      if (Array.isArray(value)) {
        for (var i = 0; i < value.length; i++) {
          if (checkFunction(value[i])) {
            return true;
          }
        }
      } else if (checkFunction(value)) {
        return true;
      }
      return false;
    };
  }
  var checkBlacklistURL = createChecker('excludeURLs', function (item) {
    return document.URL.indexOf(item) !== -1;
  });
  var checkWhitelistURL = function checkWhitelistURL() {
    var settings = getSettings();
    if (!settings || !settings.includeURLs) {
      return true;
    }
    var includeURLs = settings.includeURLs;
    if (Array.isArray(includeURLs)) {
      for (var i = 0; i < includeURLs.length; i++) {
        if (document.URL.indexOf(includeURLs[i]) !== -1) {
          return true;
        }
      }
    } else if (typeof includeURLs === 'string' && document.URL.indexOf(includeURLs) !== -1) {
      return true;
    }
    return false;
  };
  var checkExcludedEl = createChecker('excludeSelector', function (item) {
    return wmjQuery && wmjQuery(item)[0];
  });
  var checkExcludeScope = createChecker('excludeScope', function (item) {
    if (!this) {
      return false;
    }
    return this.classList && this.classList.value.indexOf(item) !== -1;
  });
  function addIncludedElements() {
    var settings = getSettings();
    if (!settings || !settings.includeSelector) {
      return;
    }
    var includeClass = settings.includeSelector.class;
    var includeId = settings.includeSelector.id;
    if (includeClass) {
      if (Array.isArray(includeClass)) {
        walkmeClasses = walkmeClasses.concat(includeClass);
      } else {
        walkmeClasses.push(includeClass);
      }
    }
    if (includeId) {
      if (Array.isArray(includeId)) {
        walkmeIds = walkmeIds.concat(includeId);
      } else {
        walkmeIds.push(includeId);
      }
    }
  }
  function setEvents() {
    var settings = getSettings();
    evts = settings && settings.events ? settings.events : ["focus", "focusout", "blur", "focusin", "mousedown", "click", "keydown", "keyup", "keypress", "pointerup", "pointerdown"];
    if (window._walkmeInternals && window._walkmeInternals.shieldApp) {
      for (var i = 0; i < evts.length; i++) {
        if (evts[i] === "pointerup") {
          evts.splice(i, 1);
          break;
        }
      }
    }
    log('Events set: ' + evts);
  }
  ctor();
}
exports.P = FixDialogFocusTrap;


/***/ }),

/***/ 112:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

"use strict";

var getCtx = (__webpack_require__(522)/* .getCtx */ .yK);
var logger = getCtx().get('PrelibLogger');
function log() {
  var logRecord = Array().slice.call(arguments);
  logRecord.unshift("[ FixDialogFocusTrap ]");
  logger.write.apply(logger, logRecord);
}
exports.R = log;


/***/ }),

/***/ 221:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

"use strict";

var createPluginEntry = (__webpack_require__(522)/* .createPluginEntry */ .mJ);
module.exports = createPluginEntry(function (registerPlugin) {
  var FixDialogFocusTrap = (__webpack_require__(298)/* .FixDialogFocusTrap */ .P);
  registerPlugin(new FixDialogFocusTrap());
});


/***/ }),

/***/ 522:
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
/******/ 	var __webpack_exports__ = __webpack_require__(795);
/******/ 	wmbundle = __webpack_exports__;
/******/ 	
/******/ })()
;
/* WalkMe Module */ return wmbundle; })
//# sourceMappingURL=bundle.js.map
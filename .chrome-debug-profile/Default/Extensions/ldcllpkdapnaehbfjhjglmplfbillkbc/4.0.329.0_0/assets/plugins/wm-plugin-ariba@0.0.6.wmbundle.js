/* WalkMe Module */ typeof _walkmeInternals !== 'undefined' && _walkmeInternals.wmloader && _walkmeInternals.wmloader.define('wm-plugin-ariba@0.0.6@prelib', {"name":"wm-plugin-ariba","version":"0.0.6","toolbelt":"2.0.2","packageDate":"2025-07-28T07:37:16.217Z","entry":"prelib"}, function (__wmplugin__) {  
var wmbundle;
/******/ (function() { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 761:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

module.exports = __webpack_require__(177);



/***/ }),

/***/ 442:
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

/***/ 349:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

"use strict";

var logger = (__webpack_require__(726).log);
var setUiTriggered = (__webpack_require__(497).setUiTriggered);
var selector = '#help.help-btn';
var allDomainCssInjector = function allDomainCssInjector() {
  logger('Running CSS injector for all domains');
  setInterval(function () {
    var frames = iFrameGetter();
    frames.push(window.document);
    for (var i = 0; i < frames.length; i++) {
      var element = elementGetter(frames[i]);
      injectCss(element);
    }
  }, 4000);
};
var injectCss = function injectCss(element) {
  setUiTriggered(true);
  if (element && element.style && element.style.display !== "none") {
    logger('Found element for CSS injection');
    element.style.display = "none";
  }
};
var elementGetter = function elementGetter(context) {
  if (!window.wmjQuery) {
    logger('wmjQuery is not defined cant find the element for CSS injection');
    return null;
  }
  if (context) {
    logger('Checking for element for CSS injection in:', context);
    return wmjQuery(selector, wmjQuery(context).contents())[0];
  }
  logger('Checking for element for CSS injection in CD iFrame or top');
  return wmjQuery(selector)[0];
};
var iFrameGetter = function iFrameGetter() {
  var iframes = document.querySelectorAll('iframe');
  var iFramesArr = [];
  for (var i = 0; i < iframes.length; i++) {
    if (iframes[i].classList && iframes[i].classList.value.indexOf('walkme') === -1 && !isCrossDomain(iframes[i])) {
      iFramesArr.push(iframes[i]);
    }
  }
  return iFramesArr;
};
var isCrossDomain = function isCrossDomain(iframe) {
  try {
    if (iframe.contentWindow && iframe.contentWindow.document) {
      return false;
    }
  } catch (e) {
    return true;
  }
};
exports.allDomainCssInjector = allDomainCssInjector;


/***/ }),

/***/ 202:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

"use strict";

var logger = (__webpack_require__(726).log);
var ctx = (__webpack_require__(864)/* .getCtx */ .yK)();
function removeWalkMeFixer() {
  if (!ctx.get('FeaturesManager').isFeatureEnabled('ignoreRemoveWmInFrame')) {
    return;
  }
  var originalRemoveWalkMe = _walkMe.removeWalkMe;
  _walkMe.removeWalkMe = function () {
    if (arguments.length === 0 && window._walkmeExtension && window.top !== window) {
      logger('removeWalkMe was called. not removing because in iframe and has extension');
      return;
    } else {
      logger('removeWalkMe called');
      return originalRemoveWalkMe.apply(this, arguments);
    }
  };
}
exports.removeWalkMeFixer = removeWalkMeFixer;


/***/ }),

/***/ 618:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

"use strict";

var logger = (__webpack_require__(726).log);
var ctx = (__webpack_require__(864)/* .getCtx */ .yK)();
var eventsListener = ctx.get('EventsListener');
var _require = __webpack_require__(497),
  getJsonSettings = _require.getJsonSettings;
var menuToggle = function menuToggle() {
  eventsListener.on('WidgetAPICreated', menuToggleOverride);
};
var setCustomToggleEvent = function setCustomToggleEvent() {
  if (!getJsonSettings().customToggleAribaMenu) {
    logger('Custom toggle not enabled, skipping');
    return;
  }
  var element = document.querySelector('button.sap-icon--sys-help');
  if (!element) {
    logger('Element not found for custom toggle event');
    return;
  }
  element.addEventListener('click', function (event) {
    logger('Menu toggled');
    window.WalkMePlayerAPI.toggleMenu(event);
  });
};
var menuToggleOverride = function menuToggleOverride() {
  if (!getJsonSettings().menuToggleOverride) {
    return;
  }
  logger('Overridden menu toggle');
  var originalToggle = window.WalkMePlayerAPI.toggleMenu;
  window.WalkMePlayerAPI.toggleMenu = function (event) {
    try {
      var isClickEvent = event && event.target && event.target.classList;
      var classList = isClickEvent ? event.target.classList.value : '';
      if (isClickEvent && classList.indexOf('sap-icon--sys-help') !== -1) {
        logger('Custom toggleMenu called');
        return originalToggle.apply(this, arguments);
      }
      if (arguments.length !== 0) {
        logger('toggleMenu called with arguments:', arguments);
        return originalToggle.apply(this, arguments);
      }
      return;
    } catch (error) {
      logger('Error in overridden toggleMenu:');
      return;
    }
  };
};
exports.menuToggleFixer = menuToggle;
exports.setCustomToggleEvent = setCustomToggleEvent;


/***/ }),

/***/ 161:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

"use strict";

var getCtx = (__webpack_require__(864)/* .getCtx */ .yK);
var wait = __webpack_require__(442)(getCtx());
var loggerGetter = __webpack_require__(726);
var _require = __webpack_require__(358),
  sameDomainCheck = _require.sameDomainCheck,
  listenForNewIframes = _require.listenForNewIframes,
  clearIntervals = _require.clearIntervals;
var _require2 = __webpack_require__(804),
  setMessageListener = _require2.setMessageListener,
  sendMessageToParent = _require2.sendMessageToParent,
  extractIframeData = _require2.extractIframeData,
  isIframe = _require2.isIframe;
var _require3 = __webpack_require__(497),
  persistData = _require3.persistData,
  getJsonSettings = _require3.getJsonSettings,
  setUiTriggered = _require3.setUiTriggered,
  getUiTriggered = _require3.getUiTriggered;
var _require4 = __webpack_require__(315),
  checkCache = _require4.checkCache;
var _require5 = __webpack_require__(618),
  menuToggleFixer = _require5.menuToggleFixer,
  setCustomToggleEvent = _require5.setCustomToggleEvent;
var _require6 = __webpack_require__(202),
  removeWalkMeFixer = _require6.removeWalkMeFixer;
var _require7 = __webpack_require__(349),
  allDomainCssInjector = _require7.allDomainCssInjector;
function Ariba() {
  var _this = this;
  _this.run = run;
  var ctx = getCtx();
  var eventsListener;
  var isRunning = false;
  var logger;
  function ctor() {
    eventsListener = ctx.get('EventsListener');
    logger = loggerGetter.log;
  }
  function run() {
    eventsListener.once('wm_walkmeLibLoaded', init);
    eventsListener.on('UIChanged', uiChangeTrigger);
    if (!isRunning) {
      wait.registerFunction('WalkMeConfigFileLoaded', function () {
        return init;
      });
    }
  }
  function init() {
    menuToggleFixer();
    setCustomToggleEvent();
    removeWalkMeFixer();
    fetchDataFromIframe();
    if (!(getJsonSettings().skipCssInjector && window.walkmeLoaderConfig)) {
      allDomainCssInjector();
    }
  }
  function fetchDataFromIframe() {
    checkCache().then(function (wmAppCtx) {
      logger('Data found in cache');
      persistData(wmAppCtx);
    }).catch(function (err) {
      logger(err);
      return isIframe() ? childLogic() : parentLogic();
    });
  }
  function parentLogic() {
    logger('Running in top');
    setMessageListener(persistData);
    if (getJsonSettings().aribaSkipSameDomainCheck) {
      logger('Skipping same domain check');
      return;
    }
    sameDomainCheck().then(function (wmAppCtx) {
      persistData(wmAppCtx);
    }).catch(function () {
      if (!window.wmAppCtx) {
        listenForNewIframes(persistData);
      }
    });
  }
  function childLogic() {
    logger('Running in an iframe');
    var collectedData = extractIframeData();
    if (!collectedData) {
      logger('wmAppCtx not found in iframe, exiting');
      return;
    }
    sendMessageToParent(collectedData);
  }
  function uiChangeTrigger() {
    if (getUiTriggered()) {
      setUiTriggered(false);
      return;
    }
    logger('UI change detected, clearing intervals and re-fetching data');
    clearIntervals().then(function () {
      fetchDataFromIframe();
    });
  }
  ctor();
}
exports.U = Ariba;


/***/ }),

/***/ 804:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

"use strict";

var logger = (__webpack_require__(726).log);
function setMessageListener(persistData) {
  logger('Setting up message listener in top window');
  window.addEventListener('message', function (event) {
    if (event.data && event.data.type === 'wm_ariba_message') {
      logger('Received message from iframe:', event.data.message);
      persistData(event.data.message);
    }
  });
}
function sendMessageToParent(collectedData) {
  logger('Sending message to top with:', collectedData);
  window.parent.postMessage({
    type: 'wm_ariba_message',
    message: collectedData
  }, '*');
}
function extractIframeData() {
  var data = window.wmAppCtx;
  if (!data) {
    logger('wmAppCtx not found in iframe');
    return null;
  }
  logger('Extracted data from iframe:', data);
  return data;
}
function isIframe() {
  try {
    return window.top !== window;
  } catch (e) {
    return true;
  }
}
exports.setMessageListener = setMessageListener;
exports.sendMessageToParent = sendMessageToParent;
exports.extractIframeData = extractIframeData;
exports.isIframe = isIframe;


/***/ }),

/***/ 177:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

"use strict";

var createPluginEntry = (__webpack_require__(864)/* .createPluginEntry */ .mJ);
module.exports = createPluginEntry(function (registerPlugin) {
  var Ariba = (__webpack_require__(161)/* .Ariba */ .U);
  registerPlugin(new Ariba());
});


/***/ }),

/***/ 358:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

"use strict";

var logger = (__webpack_require__(726).log);
var intervalTime = 2000;
var interval;
function sameDomainCheck() {
  return new Promise(function (resolve, reject) {
    var iframes = document.querySelectorAll('iframe');
    var _loop = function _loop(i) {
        if (!isCrossDomain(iframes[i])) {
          clearIntervals().then(function () {
            resolve(iframes[i].contentWindow.wmAppCtx);
          });
          return {
            v: void 0
          };
        }
      },
      _ret;
    for (var i = 0; i < iframes.length; i++) {
      _ret = _loop(i);
      if (_ret) return _ret.v;
    }
    reject();
  });
}
function isCrossDomain(iframe) {
  try {
    if (iframe.contentWindow && iframe.contentWindow.wmAppCtx) {
      return false;
    }
  } catch (e) {
    return true;
  }
  return true;
}
function listenForNewIframes(persistData) {
  interval = setInterval(function () {
    if (window.wmAppCtx) {
      logger('wmAppCtx already exists in top frame, not checking for new iframes');
      clearInterval(interval);
      return;
    }
    sameDomainCheck().then(function (wmAppCtx) {
      persistData(wmAppCtx);
      clearInterval(interval);
    }).catch(function () {
      logger('No same-domain iframes found, retrying...');
    });
  }, intervalTime);
}
var clearIntervals = function clearIntervals() {
  return new Promise(function (resolve) {
    if (interval) {
      clearInterval(interval);
      logger('Interval cleared from external class');
    }
    resolve();
  });
};
exports.sameDomainCheck = sameDomainCheck;
exports.listenForNewIframes = listenForNewIframes;
exports.clearIntervals = clearIntervals;


/***/ }),

/***/ 315:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

"use strict";

var ctx = (__webpack_require__(864)/* .getCtx */ .yK)();
var logger = (__webpack_require__(726).log);
var key = 'wm-ariba-cache';
var expiry = 1000 * 60 * 60 * 4;
function checkCache() {
  return new Promise(function (resolve, reject) {
    var clientStorageManager = ctx.has('ClientStorageManager') && ctx.get('ClientStorageManager');
    if (!clientStorageManager || !isCachingEnabled()) {
      var rejectMessage = !isCachingEnabled() ? 'Caching disabled' : 'Unable to check cache';
      reject(rejectMessage);
    }
    var cache = clientStorageManager.getData(key);
    if (!cache) {
      reject('No cache found, trying to fetch data');
    } else {
      resolve(cache);
    }
  });
}
function persistCache(data) {
  var clientStorageManager = ctx.has('ClientStorageManager') && ctx.get('ClientStorageManager');
  if (!clientStorageManager || !isCachingEnabled()) {
    var rejectMessage = !isCachingEnabled() ? 'Caching disabled, not persisting to storage' : 'Unable to check cache';
    logger(rejectMessage);
    return;
  }
  clientStorageManager.saveData(key, data, expiry);
  logger('Cache persisted:', data);
}
function isCachingEnabled() {
  var siteConfig = ctx.has('SiteConfigManager') && ctx.get('SiteConfigManager');
  var customJSON = siteConfig && siteConfig.get().Custom;
  return customJSON && customJSON.ariba && customJSON.ariba.enableCache;
}
exports.checkCache = checkCache;
exports.persistCache = persistCache;


/***/ }),

/***/ 726:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

"use strict";

var getCtx = (__webpack_require__(864)/* .getCtx */ .yK);
var logger = getCtx().get('PrelibLogger');
function log() {
  var logRecord = Array().slice.call(arguments);
  logRecord.unshift("[ Ariba ]");
  logger.write.apply(logger, logRecord);
}
exports.log = log;


/***/ }),

/***/ 497:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

"use strict";

var logger = (__webpack_require__(726).log);
var ctx = (__webpack_require__(864)/* .getCtx */ .yK)();
var _require = __webpack_require__(315),
  persistCache = _require.persistCache;
var uiTriggered = false;
function persistData(data) {
  window['wmAppCtx'] = data;
  logger('Persisted data in top frame:', window.wmAppCtx);
  persistCache(data);
  if (checkIfValuesAreSame(data)) {
    logger('Data is the same as original skipping UI change trigger');
    return;
  }
  triggerUiChange();
}
function triggerUiChange() {
  var uiChangeTracker = ctx.has('UIChangeTracker') && ctx.get('UIChangeTracker');
  if (uiChangeTracker) {
    uiChangeTracker.triggerUIChangeAPI();
    setUiTriggered(true);
    logger('UI change triggered');
  } else {
    logger('UIChangeTracker not available');
  }
}
function getSettings() {
  return ctx.get('CommonUtils').getJsonSettings && ctx.get('CommonUtils').getJsonSettings().aribaConfig || {};
}
function getUiTriggered() {
  return uiTriggered;
}
function setUiTriggered(value) {
  uiTriggered = value;
}
function checkIfValuesAreSame(newVal) {
  var originalVal = window.wmAppCtx;
  return JSON.stringify(originalVal) === JSON.stringify(newVal);
}
exports.triggerUiChange = triggerUiChange;
exports.persistData = persistData;
exports.getJsonSettings = getSettings;
exports.getUiTriggered = getUiTriggered;
exports.setUiTriggered = setUiTriggered;


/***/ }),

/***/ 864:
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
/******/ 	var __webpack_exports__ = __webpack_require__(761);
/******/ 	wmbundle = __webpack_exports__;
/******/ 	
/******/ })()
;
/* WalkMe Module */ return wmbundle; })
//# sourceMappingURL=bundle.js.map
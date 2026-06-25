/* WalkMe Module */ typeof _walkmeInternals !== 'undefined' && _walkmeInternals.wmloader && _walkmeInternals.wmloader.define('wm-plugin-ariba@0.0.4-rc.1@prelib', {"name":"wm-plugin-ariba","version":"0.0.4-rc.1","toolbelt":"2.0.2","packageDate":"2025-07-02T01:38:53.169Z","entry":"prelib"}, function (__wmplugin__) {  
var wmbundle;
/******/ (function() { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 713:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

module.exports = __webpack_require__(65);



/***/ }),

/***/ 994:
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

/***/ 794:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

"use strict";

var logger = (__webpack_require__(982).log);
var ctx = (__webpack_require__(472)/* .getCtx */ .yK)();
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

/***/ 82:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

"use strict";

var logger = (__webpack_require__(982).log);
var ctx = (__webpack_require__(472)/* .getCtx */ .yK)();
var eventsListener = ctx.get('EventsListener');
var _require = __webpack_require__(289),
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
      if (event && event.target.classList.value.indexOf('sap-icon--sys-help') !== -1 || arguments.length !== 0) {
        logger('Custom toggleMenu called');
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

/***/ 353:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

"use strict";

var getCtx = (__webpack_require__(472)/* .getCtx */ .yK);
var wait = __webpack_require__(994)(getCtx());
var loggerGetter = __webpack_require__(982);
var _require = __webpack_require__(14),
  sameDomainCheck = _require.sameDomainCheck,
  listenForNewIframes = _require.listenForNewIframes;
var _require2 = __webpack_require__(556),
  setMessageListener = _require2.setMessageListener,
  sendMessageToParent = _require2.sendMessageToParent,
  extractIframeData = _require2.extractIframeData,
  isIframe = _require2.isIframe;
var _require3 = __webpack_require__(289),
  persistData = _require3.persistData,
  getJsonSettings = _require3.getJsonSettings;
var _require4 = __webpack_require__(603),
  checkCache = _require4.checkCache;
var _require5 = __webpack_require__(82),
  menuToggleFixer = _require5.menuToggleFixer,
  setCustomToggleEvent = _require5.setCustomToggleEvent;
var _require6 = __webpack_require__(794),
  removeWalkMeFixer = _require6.removeWalkMeFixer;
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
  ctor();
}
exports.U = Ariba;


/***/ }),

/***/ 556:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

"use strict";

var logger = (__webpack_require__(982).log);
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
  var data = window.wmAppCtx && window.wmAppCtx;
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

/***/ 65:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

"use strict";

var createPluginEntry = (__webpack_require__(472)/* .createPluginEntry */ .mJ);
module.exports = createPluginEntry(function (registerPlugin) {
  var Ariba = (__webpack_require__(353)/* .Ariba */ .U);
  registerPlugin(new Ariba());
});


/***/ }),

/***/ 14:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

"use strict";

var logger = (__webpack_require__(982).log);
var intervalTime = 2000;
function sameDomainCheck() {
  return new Promise(function (resolve, reject) {
    var iframes = document.querySelectorAll('iframe');
    for (var i = 0; i < iframes.length; i++) {
      if (!isCrossDomain(iframes[i])) {
        resolve(iframes[i].contentWindow.wmAppCtx);
        return;
      }
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
  var interval = setInterval(function () {
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
exports.sameDomainCheck = sameDomainCheck;
exports.listenForNewIframes = listenForNewIframes;


/***/ }),

/***/ 603:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

"use strict";

var ctx = (__webpack_require__(472)/* .getCtx */ .yK)();
var logger = (__webpack_require__(982).log);
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

/***/ 982:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

"use strict";

var getCtx = (__webpack_require__(472)/* .getCtx */ .yK);
var logger = getCtx().get('PrelibLogger');
function log() {
  var logRecord = Array().slice.call(arguments);
  logRecord.unshift("[ Ariba ]");
  logger.write.apply(logger, logRecord);
}
exports.log = log;


/***/ }),

/***/ 289:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

"use strict";

var logger = (__webpack_require__(982).log);
var ctx = (__webpack_require__(472)/* .getCtx */ .yK)();
var _require = __webpack_require__(603),
  persistCache = _require.persistCache;
function persistData(data) {
  if (window.wmAppCtx) {
    logger('Data exists in top frame, not persisting:', window.wmAppCtx);
    return;
  }
  window['wmAppCtx'] = data;
  logger('Persisted data in top frame:', window.wmAppCtx);
  persistCache(data);
  triggerUiChange();
}
function triggerUiChange() {
  var uiChangeTracker = ctx.has('UIChangeTracker') && ctx.get('UIChangeTracker');
  if (uiChangeTracker) {
    uiChangeTracker.triggerUIChangeAPI();
    logger('UI change triggered');
  } else {
    logger('UIChangeTracker not available');
  }
}
function getSettings() {
  return ctx.get('CommonUtils').getJsonSettings && ctx.get('CommonUtils').getJsonSettings().aribaConfig || {};
}
exports.triggerUiChange = triggerUiChange;
exports.persistData = persistData;
exports.getJsonSettings = getSettings;


/***/ }),

/***/ 472:
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
/******/ 	var __webpack_exports__ = __webpack_require__(713);
/******/ 	wmbundle = __webpack_exports__;
/******/ 	
/******/ })()
;
/* WalkMe Module */ return wmbundle; })
//# sourceMappingURL=bundle.js.map
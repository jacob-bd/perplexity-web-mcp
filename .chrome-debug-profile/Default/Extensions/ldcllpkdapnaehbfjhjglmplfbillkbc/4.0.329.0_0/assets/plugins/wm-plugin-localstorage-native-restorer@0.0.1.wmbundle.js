/* WalkMe Module */ typeof _walkmeInternals !== 'undefined' && _walkmeInternals.wmloader && _walkmeInternals.wmloader.define('wm-plugin-localstorage-native-restorer@0.0.1@prelib', {"name":"wm-plugin-localstorage-native-restorer","version":"0.0.1","toolbelt":"2.0.2","packageDate":"2025-06-24T11:02:57.929Z","entry":"prelib"}, function (__wmplugin__) {  
var wmbundle;
/******/ (function() { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 66:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

module.exports = __webpack_require__(726);



/***/ }),

/***/ 903:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

"use strict";

var restoreNativeLocalStorage = (__webpack_require__(290)/* .storageChecker */ .D);
function localStorageRestorer() {
  var _this = this;
  _this.run = run;
  function run() {
    restoreNativeLocalStorage();
  }
}
exports.H = localStorageRestorer;


/***/ }),

/***/ 726:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

"use strict";

var createPluginEntry = (__webpack_require__(569)/* .createPluginEntry */ .mJ);
module.exports = createPluginEntry(function (registerPlugin) {
  var localStorageRestorer = (__webpack_require__(903)/* .localStorageRestorer */ .H);
  registerPlugin(new localStorageRestorer());
});


/***/ }),

/***/ 290:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

"use strict";

var logger = (__webpack_require__(381)/* .log */ .R);
function findOrCreateIframe() {
  var iframe = document.getElementById('walkme-native-functions');
  if (!iframe) {
    iframe = document.createElement('iframe');
    iframe.id = 'wm-localStorageRestorerIframe';
    iframe.style.display = 'none';
    iframe.style.position = 'absolute';
    iframe.style.visibility = 'hidden';
    iframe.style.zIndex = '-2147483647';
    document.body.appendChild(iframe);
  }
  return iframe;
}
function restoreNativeLocalStorage() {
  var iframe = findOrCreateIframe();
  var iframeWindow = iframe.contentWindow || iframe.contentDocument.defaultView;
  if (iframeWindow && iframeWindow.localStorage) {
    window.localStorage.setItem = iframeWindow.localStorage.setItem.bind(iframeWindow.localStorage);
    window.localStorage.getItem = iframeWindow.localStorage.getItem.bind(iframeWindow.localStorage);
    window.localStorage.removeItem = iframeWindow.localStorage.removeItem.bind(iframeWindow.localStorage);
  }
  logger('Restored native localStorage from iframe');
}
function checkerHelper(funcName) {
  return localStorage[funcName].toString().indexOf('[native code]') !== -1 || localStorage[funcName].toString().length === 29;
}
function isLocalStorageNative() {
  var nativeGetItem = checkerHelper('getItem');
  var nativeSetItem = checkerHelper('setItem');
  var nativeRemoveItem = checkerHelper('removeItem');
  return nativeGetItem && nativeSetItem && nativeRemoveItem;
}
function storageChecker() {
  if (!isLocalStorageNative()) {
    restoreNativeLocalStorage();
  }
}
exports.D = storageChecker;


/***/ }),

/***/ 381:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

"use strict";

var getCtx = (__webpack_require__(569)/* .getCtx */ .yK);
var logger = getCtx().get('PrelibLogger');
function log() {
  var logRecord = Array().slice.call(arguments);
  logRecord.unshift("[ localStorageRestorer ]");
  logger.write.apply(logger, logRecord);
}
exports.R = log;


/***/ }),

/***/ 569:
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
/******/ 	var __webpack_exports__ = __webpack_require__(66);
/******/ 	wmbundle = __webpack_exports__;
/******/ 	
/******/ })()
;
/* WalkMe Module */ return wmbundle; })
//# sourceMappingURL=bundle.js.map
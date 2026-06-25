/* WalkMe Module */ typeof _walkmeInternals !== 'undefined' && _walkmeInternals.wmloader && _walkmeInternals.wmloader.define('wm-plugin-on-error-restorer@0.0.1@prelib', {"name":"wm-plugin-on-error-restorer","version":"0.0.1","toolbelt":"2.0.2","packageDate":"2025-07-17T07:18:43.903Z","entry":"prelib"}, function (__wmplugin__) {  
var wmbundle;
/******/ (function() { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 619:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

module.exports = __webpack_require__(493);



/***/ }),

/***/ 408:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

"use strict";

var getCtx = (__webpack_require__(298)/* .getCtx */ .yK);
var logger = getCtx().get('PrelibLogger');
function log() {
  var logRecord = Array().slice.call(arguments);
  logRecord.unshift("[ onErrorRestorer ]");
  logger.write.apply(logger, logRecord);
}
exports.R = log;


/***/ }),

/***/ 493:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

"use strict";

var createPluginEntry = (__webpack_require__(298)/* .createPluginEntry */ .mJ);
module.exports = createPluginEntry(function (registerPlugin) {
  var OnErrorRestorer = (__webpack_require__(983)/* .OnErrorRestorer */ .E);
  registerPlugin(new OnErrorRestorer());
});


/***/ }),

/***/ 983:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

"use strict";

var log = (__webpack_require__(408)/* .log */ .R);
function OnErrorRestorer() {
  var _this = this;
  _this.run = run;
  function run() {
    restoreOnError();
  }
  function restoreOnError() {
    var onErrorFunction = window.onerror;
    window.onerror = function (message, source, lineno, colno, error) {
      if (!error || message === 'Script error.') {
        log(message);
        return true;
      }
      onErrorFunction && onErrorFunction(message, source, lineno, colno, error);
    };
  }
}
exports.E = OnErrorRestorer;


/***/ }),

/***/ 298:
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
/******/ 	var __webpack_exports__ = __webpack_require__(619);
/******/ 	wmbundle = __webpack_exports__;
/******/ 	
/******/ })()
;
/* WalkMe Module */ return wmbundle; })
//# sourceMappingURL=bundle.js.map
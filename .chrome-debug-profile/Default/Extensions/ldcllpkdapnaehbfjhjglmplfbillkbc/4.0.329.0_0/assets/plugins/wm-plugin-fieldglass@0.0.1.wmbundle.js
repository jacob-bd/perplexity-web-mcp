/* WalkMe Module */ typeof _walkmeInternals !== 'undefined' && _walkmeInternals.wmloader && _walkmeInternals.wmloader.define('wm-plugin-fieldglass@0.0.1@prelib', {"name":"wm-plugin-fieldglass","version":"0.0.1","toolbelt":"2.0.2","packageDate":"2025-08-07T10:42:45.775Z","entry":"prelib"}, function (__wmplugin__) {  
var wmbundle;
/******/ (function() { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 653:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

module.exports = __webpack_require__(482);



/***/ }),

/***/ 896:
/***/ (function(__unused_webpack_module, exports) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

"use strict";

var cssToInject = "\nbutton[class*=\"wmd-\"],\nbutton[class*=\"walkme-\"],\nbutton[class*=\"wm-\"],\nbutton[class*=\"wmd-\"]::before,\nbutton[class*=\"walkme-\"]::before,\nbutton[class*=\"wm-\"]::before,\nbutton[class*=\"wmd-\"]::after,\nbutton[class*=\"walkme-\"]::after,\nbutton[class*=\"wm-\"]::after {\ninset: auto !important;\n}";
var injectCss = function injectCss() {
  var styleElement = document.createElement('style');
  styleElement.textContent = cssToInject;
  styleElement.className = 'walkme-to-remove';
  document.head.appendChild(styleElement);
};
exports.injectCss = injectCss;


/***/ }),

/***/ 619:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

"use strict";

var _cssInjector = __webpack_require__(896);
var log = (__webpack_require__(63)/* .log */ .R);
function Fieldglass() {
  var _this = this;
  _this.run = run;
  function run() {
    (0, _cssInjector.injectCss)();
    log('injected CSS to unset :before');
  }
}
exports.j = Fieldglass;


/***/ }),

/***/ 63:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

"use strict";

var getCtx = (__webpack_require__(692)/* .getCtx */ .yK);
var logger = getCtx().get('PrelibLogger');
function log() {
  var logRecord = Array().slice.call(arguments);
  logRecord.unshift("[ fieldglass ]");
  logger.write.apply(logger, logRecord);
}
exports.R = log;


/***/ }),

/***/ 482:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

"use strict";

var createPluginEntry = (__webpack_require__(692)/* .createPluginEntry */ .mJ);
module.exports = createPluginEntry(function (registerPlugin) {
  var Fieldglass = (__webpack_require__(619)/* .Fieldglass */ .j);
  registerPlugin(new Fieldglass());
});


/***/ }),

/***/ 692:
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
/******/ 	var __webpack_exports__ = __webpack_require__(653);
/******/ 	wmbundle = __webpack_exports__;
/******/ 	
/******/ })()
;
/* WalkMe Module */ return wmbundle; })
//# sourceMappingURL=bundle.js.map
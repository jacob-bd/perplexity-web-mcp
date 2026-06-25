/* WalkMe Module */ typeof _walkmeInternals !== 'undefined' && _walkmeInternals.wmloader && _walkmeInternals.wmloader.define('wm-plugin-Element-native-restorer@0.0.1@prelib', {"name":"wm-plugin-Element-native-restorer","version":"0.0.1","toolbelt":"2.0.2","packageDate":"2025-07-04T02:40:11.138Z","entry":"prelib"}, function (__wmplugin__) {  
var wmbundle;
/******/ (function() { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 419:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

module.exports = __webpack_require__(225);



/***/ }),

/***/ 238:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

var restoreNativeElement = (__webpack_require__(251)/* .elementChecker */ .Q);

function elementRestorer() {
	var _this = this;
	_this.run = run;

	function run() {
		restoreNativeElement();
	}

}

exports.N = elementRestorer;


/***/ }),

/***/ 225:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

var createPluginEntry = (__webpack_require__(338)/* .createPluginEntry */ .mJ);

module.exports = createPluginEntry(function(registerPlugin) {
    var elementRestorer = (__webpack_require__(238)/* .elementRestorer */ .N);

    registerPlugin(new elementRestorer());
});



/***/ }),

/***/ 251:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

var logger = (__webpack_require__(766)/* .log */ .R);

function findOrCreateIframe() {
    var iframe = document.getElementById('walkme-native-functions');
    if (!iframe) {
        iframe = document.createElement('iframe');
        iframe.id = 'wm-elementRestorerIframe';
        iframe.style.display = 'none';
        iframe.style.position = 'absolute';
        iframe.style.visibility = 'hidden';
        iframe.style.zIndex = '-2147483647';

        document.body.appendChild(iframe);
    }
    return iframe;
}

function restoreNativeElement() {
    var iframe = findOrCreateIframe();
    var iframeWindow = iframe.contentWindow || iframe.contentDocument.defaultView;

    if (iframeWindow && iframeWindow.Element) {
        window.Element = iframeWindow.Element;
    }

    logger('Restored native Element from iframe');
}

function isElementNative() {

    return Element.toString().indexOf('[native code]') !== -1 || Element.toString().length === 29
}

function elementChecker() {
    if (!isElementNative()) {
        restoreNativeElement();
    }
}

exports.Q = elementChecker;


/***/ }),

/***/ 766:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

var getCtx = (__webpack_require__(338)/* .getCtx */ .yK);
var logger = getCtx().get('PrelibLogger');

function log() {
	var logRecord = Array().slice.call(arguments);
	logRecord.unshift("[ elementRestorer ]");
	logger.write.apply(logger, logRecord);
}

exports.R = log;


/***/ }),

/***/ 338:
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
/******/ 	var __webpack_exports__ = __webpack_require__(419);
/******/ 	wmbundle = __webpack_exports__;
/******/ 	
/******/ })()
;
/* WalkMe Module */ return wmbundle; })
//# sourceMappingURL=bundle.js.map
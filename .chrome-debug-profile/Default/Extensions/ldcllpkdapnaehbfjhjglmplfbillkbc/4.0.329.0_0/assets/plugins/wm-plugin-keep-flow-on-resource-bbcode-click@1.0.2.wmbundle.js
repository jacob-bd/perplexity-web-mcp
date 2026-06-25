/* WalkMe Module */ typeof _walkmeInternals !== 'undefined' && _walkmeInternals.wmloader && _walkmeInternals.wmloader.define('wm-plugin-keep-flow-on-resource-bbcode-click@1.0.2@prelib', {"name":"wm-plugin-keep-flow-on-resource-bbcode-click","version":"1.0.2","toolbelt":"2.0.2","packageDate":"2026-02-25T11:43:57.708Z","entry":"prelib"}, function (__wmplugin__) {  
var wmbundle;
/******/ (function() { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 914:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

module.exports = __webpack_require__(971);



/***/ }),

/***/ 899:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

var getCtx = (__webpack_require__(385)/* .getCtx */ .yK);
var log = (__webpack_require__(210)/* .log */ .R);

function KeepFlowOnResourceBBCodeClick() {
	var _this = this;
	_this.run = run;

	var promiseManager;
	var eventsListener;
	var eventsTrigger;

	function ctor() {
		promiseManager = getCtx().get('PromiseManager');
		eventsListener = getCtx().get('EventsListener');
		eventsTrigger = getCtx().get('EventsTrigger');
	}

	function run() {
		log('Init: Before Decorating BBCodeDeployableActivators');
		getCtx().decorate('BBCodeDeployableActivators', decorateBBCodeDeployableActivators);

		return null;
	}

	function decorateBBCodeDeployableActivators(BBCodeDeployableActivators) {
		log("decorating BBCodeDeployableActivators");

		var contentsManager; 
		var initiatorTypeToAppTypeMapper;

		BBCodeDeployableActivators.resourceActivator = function resourceActivator(resourceId, initiator) {
			log('Running decorated function resourceActivator');

			contentsManager = contentsManager || getCtx().get('ContentsManager');
			initiatorTypeToAppTypeMapper = initiatorTypeToAppTypeMapper || getCtx().get('InitiatorTypeToAppTypeMapper');

        	var bbCodeInitiator = initiatorTypeToAppTypeMapper.mapBbcodeInitiator(initiator);
			log('Activating resourceId without stopping flow');
			
    		contentsManager.activateById(resourceId, bbCodeInitiator);				
    	}

    	return BBCodeDeployableActivators;
	}

	ctor();
}

exports.U = KeepFlowOnResourceBBCodeClick;



/***/ }),

/***/ 210:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

var getCtx = (__webpack_require__(385)/* .getCtx */ .yK);
var logger = getCtx().get('PrelibLogger');

function log() {
	var logRecord = Array().slice.call(arguments);
	logRecord.unshift("[ KeepFlowOnResourceBBCodeClick ]");
	logger.write.apply(logger, logRecord);
}

exports.R = log;


/***/ }),

/***/ 971:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

var createPluginEntry = (__webpack_require__(385)/* .createPluginEntry */ .mJ);

module.exports = createPluginEntry(function(registerPlugin) {
    var KeepFlowOnResourceBBCodeClick = (__webpack_require__(899)/* .KeepFlowOnResourceBBCodeClick */ .U);

    registerPlugin(new KeepFlowOnResourceBBCodeClick());
});



/***/ }),

/***/ 385:
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
/******/ 	var __webpack_exports__ = __webpack_require__(914);
/******/ 	wmbundle = __webpack_exports__;
/******/ 	
/******/ })()
;
/* WalkMe Module */ return wmbundle; })
//# sourceMappingURL=bundle.js.map
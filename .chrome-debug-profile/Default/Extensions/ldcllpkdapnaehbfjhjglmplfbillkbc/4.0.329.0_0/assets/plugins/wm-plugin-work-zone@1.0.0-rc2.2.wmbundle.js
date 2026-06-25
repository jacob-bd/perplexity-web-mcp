/* WalkMe Module */ typeof _walkmeInternals !== 'undefined' && _walkmeInternals.wmloader && _walkmeInternals.wmloader.define('wm-plugin-work-zone@1.0.0-rc2.2@prelib', {"name":"wm-plugin-work-zone","version":"1.0.0-rc2.2","toolbelt":"2.0.2","packageDate":"2026-02-22T09:17:39.809Z","entry":"prelib"}, function (__wmplugin__) {  
var wmbundle;
/******/ (function() { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 324:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

module.exports = __webpack_require__(393);



/***/ }),

/***/ 348:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

var getCtx = (__webpack_require__(259)/* .getCtx */ .yK);
var logger = getCtx().get('PrelibLogger');

function log() {
	var logRecord = Array().slice.call(arguments);
	logRecord.unshift("[ WorkZone ]");
	logger.write.apply(logger, logRecord);
}

exports.R = log;


/***/ }),

/***/ 393:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

var createPluginEntry = (__webpack_require__(259)/* .createPluginEntry */ .mJ);

module.exports = createPluginEntry(function(registerPlugin) {
    var WorkZone = (__webpack_require__(803)/* .WorkZone */ ._);

    registerPlugin(new WorkZone());
});



/***/ }),

/***/ 803:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

var getCtx = (__webpack_require__(259)/* .getCtx */ .yK);
var log = (__webpack_require__(348)/* .log */ .R);

function WorkZone() {
    var _this = this;
    _this.currentAppName = null;
    _this.targentNode = null;
    _this.customSettings = null;
    _this.clientStorageManager = null;
    _this.siteConfigManager = null;
    _this.eventsListener = null;
    _this.initialized = false;
    _this.appLifeCycle = null;
    _this.firstRunDate = null;
    _this.storedAppName = null;

    var _storageLifeTimeInSeconds = 30 * 60; // 30 min
    var _defaultStorageKey = 'wm-selected-work-zone';
    var _defaultIdentifierSplitCharacter = '?';
    var INFOPARAMETER = [
        "appId",
        "appIntent",
        "appVersion",
        "appSupportInfo",
        "technicalAppComponentId",
        "appFrameworkId",
        "appFrameworkVersion",
        "productName"
    ];

    _this.run = run;

    function ctor() {
        _this.eventsListener = getCtx().get('EventsListener');
    }

    function run() {
        if (_this.eventsListener) {
            _this.eventsListener.once('WalkMeReady', function (){
                log('WalkMeReady event received. Initializing Work Zone plugin.');
                init();
                runInternally();
            });
        }
    }

    function getCustomSettings() {
        _this.siteConfigManager = getCtx().has('SiteConfigManager') ? getCtx().get('SiteConfigManager') : undefined;

        if (!_this.siteConfigManager) {
            log('SiteConfigManager not found. Cannot retrieve custom settings.');
            return {};
        }

        var config = _this.siteConfigManager.get();
        if (config && config.Custom && config.Custom.workZone) {
            return config.Custom.workZone;
        }
        return {};
    }

    function splitAppName() {
        if (!_this.currentAppName) {
            log('Current app name is not set.');
            return null;
        }
        return _this.currentAppName.split(_this.customSettings.splitter || _defaultIdentifierSplitCharacter)[0];
    }

    function saveAppNameToStorage() {
         if (!_this.clientStorageManager || !_this.currentAppName) {
                log('Cannot save app name. ClientStorageManager or current App Name is not available.');
                return;
         }

        _this.clientStorageManager.saveData(_this.customSettings.storageKey || _defaultStorageKey, splitAppName(), _storageLifeTimeInSeconds);
    }

    function getContainer() {
        if (!window.sap || !window.sap.ushell || !window.sap.ui) {
            log('SAP UI5 environment is not available. Cannot access Container.');
            return null;
         }

        var sap = window.sap;
        var container = sap.ushell.Container || (sap.ui && sap.ui.require("sap/ushell/Container"));

        if (!container) {
            log('Container is not available in the SAP UI5 environment.');
            return null;
        }
        return container;
    }

    function getService(name) {
        var container = getContainer();

        if (!container || !container.getServiceAsync) {
            log('Container service is not available.');
            return null
        };

        return container.getServiceAsync(name);
    }

    function getAppInfo(){
        if (!_this.appLifeCycle || !_this.appLifeCycle.getCurrentApplication) {
            log('AppLifeCycle service or getCurrentApplication method is not available. Cannot retrieve app information.');
            setTimeout(runInternally, 2000, true);
            return null;
        }
            var currentApp = _this.appLifeCycle.getCurrentApplication();

            if (!currentApp || !currentApp.getInfo) {
                log('No current application found in AppLifeCycle service.');
                setTimeout(runInternally, 2000, true);
                return null;
            }

            return currentApp.getInfo(INFOPARAMETER).then(function (info) {
                if (!info) {
                    log('App information is not available or does not contain appIntent.');
                    return null;
                }

                return info;
            })
    }

    function onAppLoaded(callback) {
        if (!_this.appLifeCycle || !_this.appLifeCycle.attachAppLoaded) {
            log('AppLifeCycle service or attachAppLoaded method is not available. Cannot listen for app loaded events.');
            return;
        }
        _this.appLifeCycle.attachAppLoaded(callback);
    }

    function updateAppNameOnLoad(appLoadEvent) {
        if (!appLoadEvent || !appLoadEvent.mParameters || !appLoadEvent.mParameters.getInfo) {
            log('App load event is not valid or does not contain getParameter method.');
            return;
        }
            var appInfo = appLoadEvent.mParameters.getInfo(INFOPARAMETER);
            if (appInfo) {
                appInfo.then(function(info) {
                    var newAppName = info.appIntent;
                    if (newAppName !== _this.currentAppName) {
                        log('App loaded event detected. App selection changed to:', newAppName);
                        _this.currentAppName = newAppName;
                        saveAppNameToStorage();
                        triggerUIChange();
                    }
                })
            }
    }

    function triggerUIChange() {
        if (window.WalkMeAPI && window.WalkMeAPI.triggerUIChange) {
            log('Triggering UI change through WalkMeAPI.');
            setTimeout( window.WalkMeAPI.triggerUIChange(), 2000);
        }
    }

    function storeAppNameAndListenToChange() {
        getAppInfo().then(function(info) {
            if (!info || !info.appIntent) {
                log('App information is not available or does not contain appIntent. Cannot set current app name.');
                return null;
            }

            _this.currentAppName = info.appIntent;
            saveAppNameToStorage();
            triggerUIChange();
            onAppLoaded(updateAppNameOnLoad);
        });
    }

    function shouldContinueTrying() {
        if (_this.firstRunDate && (new Date() - _this.firstRunDate) > 60 * 1000) { // 1 minute
            log('Initialization has been retried multiple times without success. Stopping further attempts.');
            return false;
        }
        return true;
    }

    function init() {
        if (!_this.initialized) {
            _this.firstRunDate = new Date();
            _this.initialized = true;
            _this.customSettings = getCustomSettings();
            _this.clientStorageManager = getCtx().get('ClientStorageManager');
        }
    }

   function runInternally(rerun) {
        if (rerun && !shouldContinueTrying()) {
                return;
        }

       getService("AppLifeCycle").then(function (appLifeCycle) {
        if (!appLifeCycle)  {
            log('AppLifeCycle service is not available. Cannot proceed with initialization.');
            setTimeout(runInternally, 2000, true);
            return;
        }
        _this.appLifeCycle = appLifeCycle;
        storeAppNameAndListenToChange();
       })

   }

   ctor();

}

exports._ = WorkZone;


/***/ }),

/***/ 259:
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
/******/ 	var __webpack_exports__ = __webpack_require__(324);
/******/ 	wmbundle = __webpack_exports__;
/******/ 	
/******/ })()
;
/* WalkMe Module */ return wmbundle; })
//# sourceMappingURL=bundle.js.map
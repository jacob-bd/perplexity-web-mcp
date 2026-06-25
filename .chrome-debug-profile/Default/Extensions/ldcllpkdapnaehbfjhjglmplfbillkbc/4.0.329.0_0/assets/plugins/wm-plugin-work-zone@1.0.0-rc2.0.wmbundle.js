/* WalkMe Module */ typeof _walkmeInternals !== 'undefined' && _walkmeInternals.wmloader && _walkmeInternals.wmloader.define('wm-plugin-work-zone@1.0.0-rc2.0@prelib', {"name":"wm-plugin-work-zone","version":"1.0.0-rc2.0","toolbelt":"2.0.2","packageDate":"2026-02-16T09:51:25.184Z","entry":"prelib"}, function (__wmplugin__) {  
var wmbundle;
/******/ (function() { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 380:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

module.exports = __webpack_require__(769);



/***/ }),

/***/ 468:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

var getCtx = (__webpack_require__(51)/* .getCtx */ .yK);
var logger = getCtx().get('PrelibLogger');

function log() {
	var logRecord = Array().slice.call(arguments);
	logRecord.unshift("[ WorkZone ]");
	logger.write.apply(logger, logRecord);
}

exports.R = log;


/***/ }),

/***/ 769:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

var createPluginEntry = (__webpack_require__(51)/* .createPluginEntry */ .mJ);

module.exports = createPluginEntry(function(registerPlugin) {
    var WorkZone = (__webpack_require__(531)/* .WorkZone */ ._);

    registerPlugin(new WorkZone());
});



/***/ }),

/***/ 531:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

var getCtx = (__webpack_require__(51)/* .getCtx */ .yK);
var log = (__webpack_require__(468)/* .log */ .R);

function WorkZone() {
    var _this = this;
    _this.currentAppName = null;
    _this.targentNode = null;
    _this.customSettings = null;
    _this.clientStorageManager = null;
    _this.siteConfigManager = null;
    _this.eventsListener = null;
    _this.initialized = false;
    _this.firstRunDate = null;

    var _storageLifeTimeInSeconds = 60 * 60; // 1 hour
    var _tryCount = 0;
    var _defaultSelector = '.sapUshellAppTitleText';
    var _defaultStorageKey = 'wm-selected-work-zone';
    var _defaultIdentifierSplitCharacter = '?';

    _this.run = run;

    function ctor() {
        _this.eventsListener = getCtx().get('EventsListener');
    }

    function run() {
        if (_this.eventsListener) {
            _this.eventsListener.once('WalkMeReady', function (){
                log('WalkMeReady event received. Initializing Work Zone plugin.');
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

    function saveAppName() {
         if (!_this.clientStorageManager || !_this.currentAppName) {
                log('Cannot save app name. ClientStorageManager or currentAppName is not available.');
                return;
         }

        _this.clientStorageManager.saveData(_this.customSettings.storageKey || _defaultStorageKey, splitAppName(), _storageLifeTimeInSeconds);
    }

    function getService(name) {
        if (!window.sap || !window.sap.ushell || !window.sap.ui) return null;

        var sap = window.sap;
        var ushellContainer = sap.ushell.Container;
        var sapUiContainer = sap.ui.require("sap/ushell/Container");

        if (!ushellContainer && !sapUiContainer) {
            log('Container is not available.');
            return null
        };

        if (!ushellContainer && sapUiContainer) {
            return sapUiContainer.then(function (container) {
                if (!container || !container.getServiceAsync) {
                    return null;
                }
                return container.getServiceAsync(name);
            });
        }

        if (!ushellContainer || !ushellContainer.getServiceAsync) {
            log('Container.getServiceAsync is not available.');
            return null;
        }

        return ushellContainer.getServiceAsync(name);
    }

    function getAppInfo(){
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

        var service = getService("AppLifeCycle");

        if (!service) {
            log('AppLifeCycle service is not available. Cannot retrieve app information.');
            return null;
        }

        return service.then(function (appLifeCycle) {
            if (!appLifeCycle || !appLifeCycle.getCurrentApplication) {
                log('AppLifeCycle service is not available. Cannot retrieve app information.');
                return null;
            }

            var currentApp = appLifeCycle.getCurrentApplication();

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
        });
    }

    function getTargetNode() {
        var targetNode = window.wmjQuery(_this.customSettings.selector || _defaultSelector);

        if (targetNode.length === 0 && _tryCount < 5) {
            _tryCount++;
            log('Target node not found. Retrying....');
            setTimeout(runInternally, 2000, true);
            return;
        } else if (targetNode.length === 0) {
            log('Target node not found after multiple attempts. Stopping initialization.');
            return;
        }

        return targetNode;
    }

    function observeTargetNode() {
        if (!_this.targetNode) {
            return;
        }

        var config = {
            characterData: true, // Watch for changes to the text content
            childList: true,     // Watch for additions/removals of child nodes
            subtree: true        // Watch nested elements as well
        };

        function callback(mutationList, observer) {
            for (var i = 0; i < mutationList.length; i++) {
                var mutation = mutationList[i];

                if (mutation.type !== 'characterData') return;

                var appInfoPromise = getAppInfo();

                if (!appInfoPromise) {
                    log('Failed to retrieve app information. Initialization cannot proceed.');
                    return;
                }

                appInfoPromise.then(function (appInfo) {

                    if (!appInfo) {
                        log('App information is not available. Cannot determine current app name.');
                        return null;
                    }

                    var appName = appInfo.appIntent;

                    if (!appName) {
                        log('App name is not available from app information.');
                        return;
                    }

                    if (appName !== _this.currentAppName) {
                        log('App selection changed to:', appName);
                        _this.currentAppName = appName;
                        saveAppName();
                    }
                });
            }
        }

        var observer = new MutationObserver(callback);
        observer.observe(_this.targetNode[0], config);

        _this.eventsListener.once('RemoveWalkMe', function (){
            log('RemoveWalkMe event received. Disconnecting WorkZone MutationObserver.');
            observer.disconnect();
        });
    }

   function runInternally(rerun) {
        if (_this.initialized && !rerun) {
                return;
        }

        if (rerun && _this.firstRunDate && (new Date() - _this.firstRunDate) > 60 * 1000) { // 1 minute
            log('Initialization has been retried multiple times without success. Stopping further attempts.');
            return;
        }

        if (!_this.firstRunDate) {
            _this.firstRunDate = new Date();
        }

       _this.initialized = true;
       _this.customSettings = getCustomSettings();
       _this.clientStorageManager = getCtx().get('ClientStorageManager');
       _this.targetNode = getTargetNode();

       var appInfoPromise = getAppInfo();
       if (!appInfoPromise) {
            log('Failed to retrieve app information. Initialization cannot proceed.');
           setTimeout(runInternally, 2000, true);
            return;
       }

       appInfoPromise.then(function(appInfo){
            if (!appInfo) {
                    log('App information is not available. Current app name cannot be determined.');
                    return;
       }

            _this.currentAppName = appInfo.appIntent;
            saveAppName();
            observeTargetNode();
       });
   }

   ctor();

}

exports._ = WorkZone;


/***/ }),

/***/ 51:
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
/******/ 	var __webpack_exports__ = __webpack_require__(380);
/******/ 	wmbundle = __webpack_exports__;
/******/ 	
/******/ })()
;
/* WalkMe Module */ return wmbundle; })
//# sourceMappingURL=bundle.js.map
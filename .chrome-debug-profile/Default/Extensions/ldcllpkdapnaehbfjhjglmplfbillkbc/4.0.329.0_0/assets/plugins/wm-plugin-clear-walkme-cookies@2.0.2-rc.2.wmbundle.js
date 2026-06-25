/* WalkMe Module */ typeof _walkmeInternals !== 'undefined' && _walkmeInternals.wmloader && _walkmeInternals.wmloader.define('wm-plugin-clear-walkme-cookies@2.0.2-rc.2@prelib', {"name":"wm-plugin-clear-walkme-cookies","version":"2.0.2-rc.2","toolbelt":"2.0.2","packageDate":"2025-03-25T16:09:16.733Z","entry":"prelib"}, function (__wmplugin__) {  
var wmbundle;
/******/ (function() { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 334:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

module.exports = __webpack_require__(684);



/***/ }),

/***/ 820:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

"use strict";

var secureEvalJSON = __webpack_require__(426);
var log = (__webpack_require__(725)/* .log */ .R);
var getCtx = (__webpack_require__(741)/* .getCtx */ .yK);
function ClearWalkmeCookies() {
  var _this = this;
  _this.run = run;
  this._eventsListener = getCtx().get('EventsListener');
  function ctor() {}
  function run() {
    if (window !== window.top) {
      log('Not in top window, aborting.');
      return;
    }
    if (!_walkmeInternals) {
      log('_walkmeInternals is not available, aborting.');
      return;
    }
    if (_walkmeInternals.isSelfHosted) {
      log('Package is self hosted, aborting.');
      return;
    }
    try {
      if (_walkmeConfig.cdhiUrl) {
        log('CD Hidden iFrame is self hosted, aborting.');
        return;
      }
    } catch (error) {
      log('Config is not available.');
    }
    var wmSnippet = getSnippet();
    if (!wmSnippet) {
      log('wmSnippet is not available, aborting.');
      return;
    }
    if (!wmSnippet.getSettingsFile()) {
      log('getSettingsFile method is not available in the wmSnippet object, aborting.');
      return;
    }
    if (!wmSnippet.getSettingsFile().CdnServerName) {
      log('CdnServerName is not available in the settings file, aborting.');
      return;
    }
    if (!wmSnippet.getSettingsFile().LibFile) {
      log('LibFile is not available in the settings file, aborting.');
      return;
    }
    var script = document.createElement('script');
    script.src = wmSnippet.getSettingsFile().LibFile;
    script.onload = function () {
      log('lib fetch success, no need to clear cookies.');
    };
    script.onerror = function () {
      log('lib fetch failed, clearing cookies.');
      clearCookies();
    };
    log('Injecting lib to check availability.');
    document.head.appendChild(script);
    return null;
  }
  function clearCookies() {
    log('Injecting clearCDCookies iFrame.');
    var cdnServerName;
    try {
      var snippet = getSnippet();
      var serverSettings = null;
      if (typeof snippet.getServerSettings === 'function') {
        var settings = snippet.getServerSettings();
        serverSettings = settings ? settings.cdnServerName : null;
      }
      cdnServerName = serverSettings !== null ? serverSettings : snippet.getSettingsFile().CdnServerName;
    } catch (error) {
      log('Failed to retrieve cdn server.');
    }
    var clearCookiesIframe = document.createElement('iframe');
    clearCookiesIframe.id = 'walkme-clear-cookies';
    clearCookiesIframe.className = 'walkme-to-remove';
    clearCookiesIframe.style.display = "none";
    clearCookiesIframe.style.position = "absolute";
    clearCookiesIframe.style.visibility = "hidden";
    clearCookiesIframe.src = cdnServerName + '/player/cookies/cookiesManager/clearCDCookies.html';
    document.getElementsByTagName('body')[0].appendChild(clearCookiesIframe);
    log('clearCDCookies iFrame injection complete, CD cookies should be cleared.');
  }
  function getSnippet() {
    var snippet = window.wmPlaySnippetData || window.wmSnippet || window.wmPreviewSnippet || window.wmPlaySnippet;
    return snippet && snippet.getSettingsFile ? snippet : convertToSnippetObject(snippet);
  }
  function convertToSnippetObject(snippet) {
    if (typeof snippet === "string") {
      try {
        return {
          getSettingsFile: function getSettingsFile() {
            return secureEvalJSON(snippet);
          }
        };
      } catch (error) {
        log("Failed to parse wmPlaySnippetData");
      }
    } else {
      return snippet;
    }
  }
  ctor();
}
exports.I = ClearWalkmeCookies;


/***/ }),

/***/ 725:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

"use strict";

var getCtx = (__webpack_require__(741)/* .getCtx */ .yK);
var logger = getCtx().get('PrelibLogger');
function log() {
  var logRecord = Array().slice.call(arguments);
  logRecord.unshift("[ clearWalkmeCookies ]");
  logger.write.apply(logger, logRecord);
}
exports.R = log;


/***/ }),

/***/ 684:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

"use strict";

var createPluginEntry = (__webpack_require__(741)/* .createPluginEntry */ .mJ);
module.exports = createPluginEntry(function (registerPlugin) {
  var ClearWalkmeCookies = (__webpack_require__(820)/* .ClearWalkmeCookies */ .I);
  registerPlugin(new ClearWalkmeCookies());
});


/***/ }),

/***/ 426:
/***/ (function(module) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

/* secureEvalJSON Evals JSON in a way that is *more* secure. */
module.exports = function secureEvalJSON(src) {
	// For browsers that have JSON.parse
	if (allowJSONParse()) return /*allowFunc*/ JSON.parse(src);
	// IE7 don't have JSON.parse
	//toString used in order to support booleans.
	var filtered = src
		.toString()
		.replace(/\\["\\\/bfnrtu]/g, '@')
		.replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']')
		.replace(/(?:^|:|,)(?:\s*\[)+/g, '');

	if (/^[\],:{}\s]*$/.test(filtered)) {
		try {
			return window._makeTutorialEv.Ev('(' + src + ')');
		} catch (ex) {
			return /*allowFunc*/ JSON.parse(src);
		}
	}
	throw new SyntaxError('Error parsing JSON, source is not valid.');
};

function allowJSONParse() {
	if (typeof JSON !== 'object') {
		return false;
	}

	if (!(/*allowFunc*/ JSON.parse)) {
		return false;
	}

	if (!isFunctionNative(/*allowFunc*/ JSON.parse)) {
		return false;
	}

	return true;
};

function isFunctionNative(func) {
	return func.toString().indexOf('[native code]') > -1;
};


/***/ }),

/***/ 741:
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
/******/ 	var __webpack_exports__ = __webpack_require__(334);
/******/ 	wmbundle = __webpack_exports__;
/******/ 	
/******/ })()
;
/* WalkMe Module */ return wmbundle; })
//# sourceMappingURL=bundle.js.map
/* WalkMe Module */ typeof _walkmeInternals !== 'undefined' && _walkmeInternals.wmloader && _walkmeInternals.wmloader.define('wm-plugin-leanix@0.0.1@prelib', {"name":"wm-plugin-leanix","version":"0.0.1","toolbelt":"2.0.2","packageDate":"2026-03-04T09:38:54.108Z","entry":"prelib"}, function (__wmplugin__) {  
var wmbundle;
/******/ (function() { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 918:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

module.exports = __webpack_require__(546);



/***/ }),

/***/ 227:
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

/***/ 546:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

(function(scope, factory){
    if ( true && typeof module.exports === "object" ){
        module.exports = factory;
    }
    else {
        scope.leanixPlugin = factory;
    }
}(this, function(getLego){
	var Lego = getLego();
	var ctx = Lego.ctx;
	var di = Lego.di;

__webpack_require__(586)(getLego);

/// <reference path="../node_modules/wm-plugins-core/plugins/iplugin.ts"/>
/// <reference path="../node_modules/wm-plugins-core/definitions/globals.d.ts"/>
var wait = __webpack_require__(227)(Lego.ctx);
var leanIxAPI = /** @class */ (function () {
    function leanIxAPI() {
        this.logger = Lego.ctx.get('PrelibLogger');
        this.IFRAME_SELECTOR = 'lx-editor-iframe-setup iframe';
    }
    leanIxAPI.prototype.run = function () {
        var _this = this;
        Lego.ctx.get('EventsListener').once('wm_walkmeLibLoaded', function () { return _this.extractWithRetry(); });
        wait.registerFunction(function () { return _this.extractWithRetry(); });
        return Promise.resolve();
    };
    leanIxAPI.prototype.extractWithRetry = function (attempts) {
        var _this = this;
        var _a;
        if (attempts === void 0) { attempts = 0; }
        var iframe = document.querySelector(this.IFRAME_SELECTOR);
        var adapter = (_a = iframe === null || iframe === void 0 ? void 0 : iframe.contentWindow) === null || _a === void 0 ? void 0 : _a.lxAdapter;
        if (!iframe || !(adapter === null || adapter === void 0 ? void 0 : adapter.graph)) {
            this.handleRetry('Adapter not ready', attempts);
            return;
        }
        adapter.graph.then(function (graph) {
            var model = graph.getModel();
            var cells = model.cells;
            var cellCount = Object.keys(cells || {}).length;
            if (cellCount <= 2) {
                _this.handleRetry("Model empty (cells: ".concat(cellCount, ")"), attempts);
                return;
            }
            _this.log("Extracting ".concat(cellCount, " cells..."));
            _this.parseFromGraph(graph, iframe.contentWindow);
        }).catch(function (e) {
            _this.log("Extraction error: ".concat(e.message));
        });
    };
    leanIxAPI.prototype.handleRetry = function (reason, attempts) {
        var _this = this;
        if (attempts < 10) {
            this.log("".concat(reason, ", retrying... (").concat(attempts + 1, ")"));
            setTimeout(function () { return _this.extractWithRetry(attempts + 1); }, 1000);
        }
        else {
            this.log("Max attempts reached. ".concat(reason, "."));
        }
    };
    leanIxAPI.prototype.parseFromGraph = function (graph, win) {
        var _this = this;
        var enc = new win.mxCodec(win.mxUtils.createXmlDocument());
        var xmlDoc = enc.encode(graph.getModel());
        var elementsData = {};
        var nodes = xmlDoc.querySelectorAll('[id]');
        nodes.forEach(function (node) {
            var id = node.getAttribute('id');
            if (!id || id === "0" || id === "1")
                return;
            var labelAttr = node.getAttribute('label') || node.getAttribute('value') || "";
            elementsData["id_".concat(id)] = {
                id: id,
                label: _this.cleanLabel(labelAttr),
                factSheetId: node.getAttribute('factSheetId') || null,
                factSheetType: node.getAttribute('factSheetType') || null,
                isEdge: node.hasAttribute('edge') && node.getAttribute('edge') === "1",
                style: node.getAttribute('style') || ''
            };
        });
        window.wmLeanIxElements = elementsData;
        this.log("Success! wmLeanIxElements populated with ".concat(Object.keys(elementsData).length, " items."));
    };
    leanIxAPI.prototype.cleanLabel = function (label) {
        if (!label)
            return "";
        try {
            var parser = new DOMParser();
            var doc = parser.parseFromString(label, 'text/html');
            return doc.body.textContent || doc.body.innerText || "";
        }
        catch (e) {
            // Fallback for extremely malformed strings
            return label.replace(/<[^>]*>?/gm, '');
        }
    };
    leanIxAPI.prototype.log = function (msg) {
        this.logger.write("[wmLeanIx] ".concat(msg));
    };
    return leanIxAPI;
}());


Lego.plugin(new leanIxAPI());
}));


/***/ }),

/***/ 586:
/***/ (function(module) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

(function(scope, factory){
    if ( true && typeof module.exports === "object" ){
        module.exports = factory;
    }
    else {
        scope.prelibLoggerPlugin = factory;
    }
}(this, function(legoGetter){
	var Lego = legoGetter();
	var ctx = Lego.ctx;
	var di = Lego.di;
	
/// <reference path="../node_modules/wm-plugins-core/plugins/iplugin.ts"/>
/// <reference path="../node_modules/wm-plugins-core/definitions/globals.d.ts"/>
var PrelibLogger = (function () {
    function PrelibLogger() {
        this._cookieName = 'walkme_prelib_log_enabled';
    }
    PrelibLogger.prototype.write = function (value) {
        if (this.isLogEnabled()) {
            /*allowFunc*/ console.log(value);
        }
    };
    PrelibLogger.prototype.setCookieName = function (cookieName) {
        this._cookieName = cookieName;
    };
    PrelibLogger.prototype.enableLog = function () {
        this.writeCookie(this._cookieName, true);
    };
    PrelibLogger.prototype.disableLog = function () {
        this.writeCookie(this._cookieName, "", -1);
    };
    PrelibLogger.prototype.isLogEnabled = function () {
        return this.readCookie(this._cookieName);
    };
    PrelibLogger.prototype.readCookie = function (name) {
        var value = document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)');
        return value ? value.pop() : undefined;
    };
    PrelibLogger.prototype.writeCookie = function (name, value, days) {
        var expires = "";
        if (days) {
            var date = new Date();
            date.setTime(date.getTime() + (days * 86400000));
            expires = "; expires=" + date.toUTCString();
        }
        document.cookie = name + "=" + value + expires + "; path=/";
    };
    PrelibLogger.prototype.run = function (config) {
        return null;
    };
    return PrelibLogger;
}());
Lego.ctx.register('PrelibLogger').asCtor(PrelibLogger);
 

Lego.plugin(new PrelibLogger());
}));


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
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
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
/******/ 	var __webpack_exports__ = __webpack_require__(918);
/******/ 	wmbundle = __webpack_exports__;
/******/ 	
/******/ })()
;
/* WalkMe Module */ return wmbundle; })
//# sourceMappingURL=bundle.js.map
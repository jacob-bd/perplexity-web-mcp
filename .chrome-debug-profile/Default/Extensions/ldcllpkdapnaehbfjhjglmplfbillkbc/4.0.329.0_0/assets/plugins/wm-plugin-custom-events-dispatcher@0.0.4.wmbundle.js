/* WalkMe Module */ typeof _walkmeInternals !== 'undefined' && _walkmeInternals.wmloader && _walkmeInternals.wmloader.define('wm-plugin-custom-events-dispatcher@0.0.4@prelib', {"name":"wm-plugin-custom-events-dispatcher","version":"0.0.4","toolbelt":"2.0.2","packageDate":"2026-02-05T09:21:09.056Z","entry":"prelib"}, function (__wmplugin__) {  
var wmbundle;
/******/ (function() { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 697:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

module.exports = __webpack_require__(585);



/***/ }),

/***/ 18:
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

/***/ 585:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

(function(scope, factory){
    if ( true && typeof module.exports === "object" ){
        module.exports = factory;
    }
    else {
        scope.customEventsDispatcherPlugin = factory;
    }
}(this, function(getLego){
	var Lego = getLego();
	var ctx = Lego.ctx;
	var di = Lego.di;

__webpack_require__(481)(getLego);

/// <reference path="../node_modules/wm-plugins-core/plugins/iplugin.ts"/>
/// <reference path="../node_modules/wm-plugins-core/definitions/globals.d.ts"/>
var wait = __webpack_require__(18)(Lego.ctx);
var CustomEventsDispatcher = /** @class */ (function () {
    function CustomEventsDispatcher() {
        this._event = 'WalkMeConfigFileLoaded';
        this._jsonSettings = null;
        this._isDecorated = false;
        this._cachedSelectors = null;
        this._eventsListener = Lego.ctx.get('EventsListener');
        this._logger = Lego.ctx.get('PrelibLogger');
    }
    CustomEventsDispatcher.prototype.run = function () {
        var _this = this;
        this._eventsListener.once('wm_walkmeLibLoaded', function () { return _this.decorateInputGenarator(); });
        if (!this._isDecorated) {
            this.init();
        }
    };
    CustomEventsDispatcher.prototype.init = function () {
        var _this = this;
        wait.registerFunction(this._event, function () { return _this.decorateInputGenarator; });
    };
    CustomEventsDispatcher.prototype.decorateInputGenarator = function () {
        var _this = this;
        if (!Lego.ctx.has('InputGenerator'))
            return;
        this._isDecorated = true;
        var inputGenerator = Lego.ctx.get('InputGenerator');
        var click = inputGenerator.click;
        inputGenerator.click = function (el, callback) {
            var _a;
            _this._cachedSelectors = _this.check_jsonSettings('selectors');
            var elNode = el[0];
            if (!elNode)
                return click.call(inputGenerator, el, callback);
            var elClass = (_a = elNode.classList) === null || _a === void 0 ? void 0 : _a.value;
            if (elClass === 'geItem') {
                _this.log('Matched hardcoded class: geItem');
                _this.simulateUserClick(elNode, ['click'], callback);
                return;
            }
            if (elClass === 'mxPopupMenuItem') {
                _this.log('Matched hardcoded class: mxPopupMenuItem');
                _this.simulateUserClick(elNode, ['mousedown', 'mouseup', 'pointerdown', 'pointerup'], callback);
                return;
            }
            if (_this._cachedSelectors) {
                for (var _i = 0, _b = Object.entries(_this._cachedSelectors); _i < _b.length; _i++) {
                    var _c = _b[_i], selector = _c[0], events = _c[1];
                    try {
                        if (wmjQuery(elNode).is(selector)) {
                            _this.log("Matched selector: ".concat(selector));
                            _this.simulateUserClick(elNode, events, callback);
                            return;
                        }
                    }
                    catch (error) {
                        _this.log("error when checking custom selectors and events: \n".concat(error));
                        return click.call(inputGenerator, el, callback);
                    }
                }
            }
            return click.call(inputGenerator, el, callback);
        };
    };
    CustomEventsDispatcher.prototype.check_jsonSettings = function (value) {
        if (!this._jsonSettings) {
            var customSettings = Lego.ctx.get('SiteConfigManager').get().Custom;
            this._jsonSettings = customSettings ? customSettings.customEventsDispatcher : null;
        }
        if (!this._jsonSettings) {
            return false;
        }
        return this._jsonSettings[value];
    };
    CustomEventsDispatcher.prototype.simulateUserClick = function (element, events, callback) {
        events.forEach(function (type) {
            var event = new MouseEvent(type, {
                view: window,
                bubbles: true,
                cancelable: true,
                buttons: 1
            });
            element.dispatchEvent(event);
        });
        this.log("dispatched event types: ".concat(events, ", on element: ").concat(element.outerHTML));
        callback && callback();
    };
    CustomEventsDispatcher.prototype.log = function (msg) {
        this._logger.write("[customEventDispatcher] ".concat(msg));
    };
    return CustomEventsDispatcher;
}());


Lego.plugin(new CustomEventsDispatcher());
}));


/***/ }),

/***/ 481:
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
/******/ 	var __webpack_exports__ = __webpack_require__(697);
/******/ 	wmbundle = __webpack_exports__;
/******/ 	
/******/ })()
;
/* WalkMe Module */ return wmbundle; })
//# sourceMappingURL=bundle.js.map
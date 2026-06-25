/* WalkMe Module */ typeof _walkmeInternals !== 'undefined' && _walkmeInternals.wmloader && _walkmeInternals.wmloader.define('wm-plugin-native-functions-restorer@0.6.5-rc.2@prelib', {"name":"wm-plugin-native-functions-restorer","version":"0.6.5-rc.2","toolbelt":"2.0.2","packageDate":"2025-11-05T11:29:02.605Z","entry":"prelib"}, function (__wmplugin__) {  
var wmbundle;
/******/ (function() { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 609:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

module.exports = __webpack_require__(916);



/***/ }),

/***/ 199:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

var __webpack_unused_export__;
/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

"use strict";
__webpack_unused_export__ = true;
var nativeFunctionsRestorer_1 = __webpack_require__(755);
function registerToCtx(getCtx) {
    if (!getCtx().has('NativeFunctionRestorer')) {
        getCtx().register('NativeFunctionRestorer').asCtor(nativeFunctionsRestorer_1.NativeFunctionsRestorer);
    }
}
exports.u = registerToCtx;



/***/ }),

/***/ 893:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

"use strict";
exports.__esModule = true;
var getCtx = (__webpack_require__(352)/* .getCtx */ .yK);
function jq3IgnoreNativesCheck() {
    var _a, _b;
    wmjQuery.support.ignoreNativesCheck = true;
    (_b = (_a = wmjQuery.find).setDocument) === null || _b === void 0 ? void 0 : _b.call(_a);
}
exports.jq3IgnoreNativesCheck = jq3IgnoreNativesCheck;
function supplyJQNatives() {
    var _a, _b;
    if (wmjQuery.queryHelpers) {
        overrideObj(wmjQuery.queryHelpers, getQueryHelpers());
    }
    if ((_a = wmjQuery === null || wmjQuery === void 0 ? void 0 : wmjQuery.fnHelpers) === null || _a === void 0 ? void 0 : _a.textContent) {
        var textContent_1 = getCtx().get('NativeNodeFunctionsProvider').textContentGetter;
        wmjQuery.fnHelpers.textContent = function (elem) {
            return textContent_1.apply(elem);
        };
    }
    if ((_b = wmjQuery === null || wmjQuery === void 0 ? void 0 : wmjQuery.fnHelpers) === null || _b === void 0 ? void 0 : _b.innerText) {
        var innerText_1 = getCtx().get('NativeHtmlElementFunctionsProvider').innerTextGetter;
        wmjQuery.fnHelpers.innerText = function (elem) {
            return elem instanceof HTMLElement ? innerText_1.apply(elem) : elem.innerText;
        };
    }
}
exports.supplyJQNatives = supplyJQNatives;
function overrideObj(obj, other) {
    var orig = {};
    for (var prop in other) {
        orig[prop] = obj[prop];
        obj[prop] = other[prop];
    }
    return orig;
}
function appendToObj(func) {
    return function (obj, curr) {
        obj[curr] = func(curr);
        return obj;
    };
}
function createQueryFunc(nativeFunctionProvider) {
    return function (name) {
        return function (context, sel) {
            var provider = context;
            if (context.nodeType === 1)
                provider = nativeFunctionProvider.element;
            if (context.nodeType === 9)
                provider = nativeFunctionProvider.doc;
            if (context.nodeType === 11)
                provider = nativeFunctionProvider.docFrag;
            if (provider[name])
                return provider[name].call(context, sel);
        };
    };
}
var getQueryHelpers = (function () {
    var names = ['getElementById', 'getElementsByTagName', 'getElementsByName', 'getElementsByClassName', 'querySelectorAll',];
    var natFuncs;
    return function () {
        if (natFuncs !== undefined) {
            return natFuncs;
        }
        var natFuncProv = getCtx().get('NativeDocumentFunctionsProvider');
        natFuncs = names.reduce(appendToObj(createQueryFunc(natFuncProv)), {});
        return natFuncs;
    };
})();



/***/ }),

/***/ 755:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

"use strict";
exports.__esModule = true;
var jqNativesSupport_1 = __webpack_require__(893);
var getCtx = (__webpack_require__(352)/* .getCtx */ .yK);
var NativeFunctionsRestorer = /** @class */ (function () {
    function NativeFunctionsRestorer() {
        this.initialized = false;
        this.registerDateNowFunctionProvider = function (win) {
            getCtx().register('NativeDateNowFunctionProvider').asInstance({
                dateNow: function dateNow() {
                    return win.Date.now();
                }
            });
        };
    }
    NativeFunctionsRestorer.prototype.run = function () {
        if (this.initialized) {
            return null;
        }
        this.initialized = true;
        var iframeWin = this.createIframe();
        this.decoratePostMessage(iframeWin);
        this.registerGetComputedStyle(iframeWin);
        this.decorateNativeTimerFunctionsProvider(iframeWin);
        this.registerNativeEventListenerFunctionsProvider(iframeWin);
        this.registerNativeDocumentFunctions(iframeWin);
        this.registerNativeWindowProvider(iframeWin);
        this.registerNodeFunctionsProvider(iframeWin);
        this.registerHtmlElementFunctionsProvider(iframeWin);
        this.registerElementFunctionsProvider(iframeWin);
        this.registerDateNowFunctionProvider(iframeWin);
        this.registerJSONParseFunctionProvider(iframeWin);
        this.registerMapProvider(iframeWin);
        jqNativesSupport_1.supplyJQNatives();
        jqNativesSupport_1.jq3IgnoreNativesCheck();
        return null;
    };
    NativeFunctionsRestorer.prototype.createIframe = function () {
        var iframe = wmjQuery('#walkme-native-functions');
        var target = this.getTarget();
        if (!iframe.length) {
            iframe = wmjQuery('<iframe id="walkme-native-functions" style="display: none; position: absolute;"/>').appendTo(target);
        }
        var win = iframe[0].contentWindow;
        wmjQuery(window["_walkmeInternals"]).on("removeWalkMe", function () {
            iframe.remove();
        });
        return win;
    };
    NativeFunctionsRestorer.prototype.getTarget = function () {
        if (wmjQuery('frameset').length > 0)
            return 'html';
        if (window._walkmeConfig && window._walkmeConfig.loadNFRIframeOnBody)
            return 'body';
        return 'html';
    };
    NativeFunctionsRestorer.prototype.decoratePostMessage = function (win) {
        getCtx().decorate('PostMessage', function (nativeRestorer) {
            return win.postMessage;
        });
    };
    NativeFunctionsRestorer.prototype.registerGetComputedStyle = function (win) {
        getCtx().register('GetComputedStyle').asInstance(win.getComputedStyle);
    };
    NativeFunctionsRestorer.prototype.registerNativeDocumentFunctions = function (win) {
        function getFuncsFrom(elm) {
            return {
                getElementById: elm['getElementById'],
                getElementsByTagName: elm['getElementsByTagName'],
                getElementsByName: elm['getElementsByName'],
                getElementsByClassName: elm['getElementsByClassName'],
                querySelectorAll: elm['querySelectorAll']
            };
        }
        getCtx().register('NativeDocumentFunctionsProvider').asInstance({
            doc: getFuncsFrom(win.document),
            element: getFuncsFrom(win.document.body),
            docFrag: getFuncsFrom(win.DocumentFragment.prototype)
        });
    };
    NativeFunctionsRestorer.prototype.decorateNativeTimerFunctionsProvider = function (win) {
        getCtx().decorate('NativeTimerFunctionsProvider', function (nativeTimerFunctionsProvider) {
            nativeTimerFunctionsProvider.get = function () {
                return {
                    clearTimeout: win.clearTimeout,
                    clearInterval: win.clearInterval,
                    /*allowFunc*/ setTimeout: /*allowFunc*/ win.setTimeout,
                    /*allowFunc*/ setInterval: /*allowFunc*/ win.setInterval
                };
            };
            return nativeTimerFunctionsProvider;
        });
    };
    NativeFunctionsRestorer.prototype.registerNativeWindowProvider = function (win) {
        getCtx().decorate('NativeWindowProvider', function (nativeWindowProvider) {
            nativeWindowProvider.get = function () {
                return win;
            };
            return nativeWindowProvider;
        });
    };
    NativeFunctionsRestorer.prototype.registerNativeEventListenerFunctionsProvider = function (win) {
        getCtx().register('NativeEventListenerFunctionsProvider').asCtor(function () {
            this.get = function () {
                return {
                    addEventListener: win.document.addEventListener,
                    attachEvent: win.document.attachEvent,
                    removeEventListener: win.document.removeEventListener,
                    detachEvent: win.document.detachEvent
                };
            };
        });
    };
    NativeFunctionsRestorer.prototype.registerNodeFunctionsProvider = function (win) {
        var textContentGetter = Object.getOwnPropertyDescriptor(win.Node.prototype, 'textContent').get;
        var childNodesGetter = Object.getOwnPropertyDescriptor(win.Node.prototype, 'childNodes').get;
        var parentNodeGetter = Object.getOwnPropertyDescriptor(win.Node.prototype, 'parentNode').get;
        getCtx().register('NativeNodeFunctionsProvider').asInstance({
            textContentGetter: textContentGetter,
            childNodesGetter: childNodesGetter,
            parentNodeGetter: parentNodeGetter
        });
    };
    NativeFunctionsRestorer.prototype.registerHtmlElementFunctionsProvider = function (win) {
        var innerTextGetter = Object.getOwnPropertyDescriptor(win.HTMLElement.prototype, 'innerText').get;
        getCtx().register('NativeHtmlElementFunctionsProvider').asInstance({
            innerTextGetter: innerTextGetter
        });
    };
    NativeFunctionsRestorer.prototype.registerElementFunctionsProvider = function (win) {
        var animateFunction = win.Element.prototype.animate;
        getCtx().register('NativeElementFunctionsProvider').asInstance({
            animate: animateFunction
        });
    };
    NativeFunctionsRestorer.prototype.registerJSONParseFunctionProvider = function (win) {
        getCtx().register('NativeJSONParseFunctionProvider').asInstance({
            JSONParse: function (val) {
                return win.JSON.parse(val);
            }
        });
    };
    NativeFunctionsRestorer.prototype.registerMapProvider = function (win) {
        getCtx().register('NativeMapProvider').asInstance({
            nativeMap: function () {
                return win.Map;
            }
        });
    };
    return NativeFunctionsRestorer;
}());
exports.NativeFunctionsRestorer = NativeFunctionsRestorer;



/***/ }),

/***/ 916:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

var createPluginEntry = (__webpack_require__(352)/* .createPluginEntry */ .mJ);
var getCtx = (__webpack_require__(352)/* .getCtx */ .yK);

module.exports = createPluginEntry(function(registerPlugin) {
	function getNativeFunctionsRestorerClass(){
		var registerToCtx = (__webpack_require__(199)/* .registerToCtx */ .u);
        registerToCtx(getCtx);	
		return getCtx().get('NativeFunctionRestorer');
	}

    registerPlugin(getNativeFunctionsRestorerClass());
});


/***/ }),

/***/ 352:
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
/******/ 	var __webpack_exports__ = __webpack_require__(609);
/******/ 	wmbundle = __webpack_exports__;
/******/ 	
/******/ })()
;
/* WalkMe Module */ return wmbundle; })
//# sourceMappingURL=bundle.js.map
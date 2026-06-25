/* WalkMe Module */ typeof _walkmeInternals !== 'undefined' && _walkmeInternals.wmloader && _walkmeInternals.wmloader.define('wm-plugin-conditional-custom-css@2.1.1@prelib', {"name":"wm-plugin-conditional-custom-css","version":"2.1.1","toolbelt":"2.0.2","packageDate":"2025-03-05T10:42:44.087Z","entry":"prelib"}, function (__wmplugin__) {  
var wmbundle;
/******/ (function() { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 88:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

module.exports = __webpack_require__(485);



/***/ }),

/***/ 485:
/***/ (function(module) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

(function(scope, factory){
    if ( true && typeof module.exports === "object" ){
        module.exports = factory;
    }
    else {
        scope.conditionalCustomCssPlugin = factory;
    }
}(this, function(getLego){
	var Lego = getLego();
	var ctx = Lego.ctx;
	var di = Lego.di;


/// <reference path="../node_modules/wm-plugins-core/plugins/iplugin.ts"/>
/// <reference path="../node_modules/wm-plugins-core/definitions/globals.d.ts"/>
var ConditionalCustomCssApplier = /** @class */ (function () {
    function ConditionalCustomCssApplier() {
        this._promiseManager = Lego.ctx.get('PromiseManager');
        this._eventsListener = Lego.ctx.get('EventsListener');
        this._eventsTrigger = Lego.ctx.get('EventsTrigger');
        this._logger = Lego.ctx.get('PrelibLogger');
        this._typeMapper = {
            "variable": this.testVariableCondition,
            "url": this.testUrlCondition,
            "cookie": this.testCookieCondition,
            "localStorage": this.testLocalStorageCondition
        };
        this._conditionMapper = {
            "OR": this.evaluateOrCondition,
            "AND": this.evaluateAndCondition
        };
    }
    ConditionalCustomCssApplier.prototype.run = function () {
        var _this = this;
        this._eventsListener.on("BeforeSettingCustomCss", function () {
            _this.writeLog('BeforeSettingCustomCss');
            _this._siteConfigManager = Lego.ctx.get("SiteConfigManager");
            _this._commonUtils = Lego.ctx.get('CommonUtils');
            _this._objectJpath = Lego.ctx.get("ObjectJpath");
            _this._cookiesManager = Lego.ctx.get("CookiesManager");
            _this.writeLog('Getting conditional customCss rules');
            var customCssConditions = _this.getConditionsFromSiteConfig();
            if (!customCssConditions.length) {
                _this.writeLog("No conditional customCss rules set, continue loading WalkMe");
                return;
            }
            var newCustomCss = _this.getNewCustomCss(customCssConditions);
            _this.writeLog("adding new custom Css: " + newCustomCss);
            newCustomCss = _this.replaceVariablesPlaceholders(newCustomCss);
            _this.appendCustomCss(newCustomCss);
        });
        this._eventsListener.on("WalkMeReady", function () {
            Lego.ctx.get('UIChangeTracker').bind(function (data) {
                if (data.notifiers.history) {
                    var head = Lego.ctx.get('DirectHeadProvider').getDirectHead(null);
                    wmjQuery('#walkme-custom-css', head).remove();
                    head.data('wm_custom_css_set', false);
                    Lego.ctx.get('CustomCssSetter').setCustomCssIfNeeded();
                }
            });
        });
        return null;
    };
    ConditionalCustomCssApplier.prototype.getConditionsFromSiteConfig = function () {
        var siteConfig = this._siteConfigManager.get();
        var customCssConditions = [];
        var customCssConditionsFromJsonSettings = siteConfig.Custom.customCSSbyCondition;
        var customCssConditionsFromConfiguration = (siteConfig.Settings.configuration) ? siteConfig.Settings.configuration.customCSSbyCondition : undefined;
        if (customCssConditionsFromJsonSettings) {
            this.writeLog('Getting conditionalCSS rules from JSON settings');
            customCssConditions = customCssConditions.concat(customCssConditionsFromJsonSettings);
        }
        if (customCssConditionsFromConfiguration) {
            this.writeLog('Getting conditionalCSS rules from Configuration settings');
            customCssConditions = customCssConditions.concat(customCssConditionsFromConfiguration);
        }
        return customCssConditions;
    };
    ConditionalCustomCssApplier.prototype.getNewCustomCss = function (customCssConditions) {
        var _this = this;
        return window.wmjQuery(customCssConditions).reduce(function (newCustomCss, condition) {
            return _this.shouldAddCssByCondition(condition) ?
                newCustomCss + " " + condition.CustomCSS :
                newCustomCss;
        }, "");
    };
    ConditionalCustomCssApplier.prototype.shouldAddCssByCondition = function (condition) {
        var _this = this;
        var conditionsArray = condition.Conditions;
        var conditionResults = [];
        wmjQuery.each(conditionsArray, function (index, item) {
            var evaluator = _this._typeMapper[item.Type];
            var result = evaluator.call(_this, conditionsArray[index]);
            conditionResults.push(result);
        });
        return this.evaluateConditionalTree(conditionResults, condition.TreeType);
    };
    ConditionalCustomCssApplier.prototype.testVariableCondition = function (condition) {
        var windowName = this._objectJpath.getValue(window, condition.Name);
        return this.evaluateValueCondition(condition, windowName);
    };
    ConditionalCustomCssApplier.prototype.testUrlCondition = function (condition) {
        return this.evaluateValueCondition(condition, location.href);
    };
    ConditionalCustomCssApplier.prototype.testCookieCondition = function (condition) {
        return this.evaluateValueCondition(condition, this._cookiesManager.getCookie(condition.Name));
    };
    ConditionalCustomCssApplier.prototype.testLocalStorageCondition = function (condition) {
        if (this._commonUtils.isLocalStorageEnabled()) {
            return this.evaluateValueCondition(condition, localStorage.getItem(condition.Name));
        }
        this.writeLog('testUrlCondition: isLocalStorageEnabled not enabled, not evaluating');
    };
    ConditionalCustomCssApplier.prototype.evaluateValueCondition = function (condition, sourceValue) {
        var _this = this;
        this.writeLog("testCondition: " + condition.Type + ". Checking if value '" + sourceValue + "' matches settings");
        var results = false;
        wmjQuery.each(condition.Value, function (index, item) {
            var result = condition.useContains ? !!(sourceValue && (sourceValue.indexOf(item) > -1)) : sourceValue == item;
            _this.writeLog("result: " + result);
            if (result === true) {
                results = true;
                return false;
            }
        });
        return results;
    };
    ConditionalCustomCssApplier.prototype.evaluateConditionalTree = function (conditionResults, type) {
        this.writeLog("evaluateConditionalTree Type = " + type);
        if (type === undefined) {
            return conditionResults[0];
        }
        return this._conditionMapper[type].call(this, conditionResults);
    };
    ConditionalCustomCssApplier.prototype.evaluateOrCondition = function (conditionResults) {
        for (var i = 0; i < conditionResults.length; i++) {
            if (conditionResults[i]) {
                this.writeLog('OR case returning true');
                return true;
            }
        }
        this.writeLog('OR case returning false');
        return false;
    };
    ConditionalCustomCssApplier.prototype.evaluateAndCondition = function (conditionResults) {
        for (var i = 0; i < conditionResults.length; i++) {
            if (!conditionResults[i]) {
                this.writeLog('AND case returning false');
                return false;
            }
        }
        this.writeLog('AND case returning true');
        return true;
    };
    ConditionalCustomCssApplier.prototype.replaceVariablesPlaceholders = function (newCustomCss) {
        var placeholders = newCustomCss.match(/%%.*?%%/g);
        if (!placeholders)
            return newCustomCss;
        this.writeLog('replaceVariablePlaceholders');
        placeholders = placeholders.filter(function (item, pos) {
            return placeholders.indexOf(item) == pos;
        });
        for (var _i = 0, placeholders_1 = placeholders; _i < placeholders_1.length; _i++) {
            var placeholder = placeholders_1[_i];
            if (placeholder && placeholder.length > 4) {
                var newValue = this._commonUtils.getWindowVar(placeholder.substring(2, placeholder.length - 2));
                if (newValue && typeof newValue == 'string') {
                    var regex = new RegExp(placeholder, "g");
                    newCustomCss = newCustomCss.replace(regex, newValue);
                }
            }
        }
        return newCustomCss;
    };
    ConditionalCustomCssApplier.prototype.appendCustomCss = function (newCustomCss) {
        this.writeLog('AppendCustomCss');
        var originalCss = this._siteConfigManager.get().CustomCss || "";
        this._siteConfigManager.get().CustomCss = originalCss + newCustomCss;
    };
    ConditionalCustomCssApplier.prototype.writeLog = function (msg) {
        this._logger.write('[conditionalCss] ' + msg);
    };
    return ConditionalCustomCssApplier;
}());
 

Lego.plugin(new ConditionalCustomCssApplier());
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
/******/ 	var __webpack_exports__ = __webpack_require__(88);
/******/ 	wmbundle = __webpack_exports__;
/******/ 	
/******/ })()
;
/* WalkMe Module */ return wmbundle; })
//# sourceMappingURL=bundle.js.map
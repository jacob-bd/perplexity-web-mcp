/* WalkMe Module */ typeof _walkmeInternals !== 'undefined' && _walkmeInternals.wmloader && _walkmeInternals.wmloader.define('wm-plugin-global-step-css@0.2.0@prelib', {"name":"wm-plugin-global-step-css","version":"0.2.0","toolbelt":"2.0.2","packageDate":"2025-12-11T15:08:23.106Z","entry":"prelib"}, function (__wmplugin__) {  
var wmbundle;
/******/ (function() { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 188:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

module.exports = __webpack_require__(765);



/***/ }),

/***/ 386:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

var __webpack_unused_export__;
/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

"use strict";
__webpack_unused_export__ = ({ value: true });
exports.J = void 0;
var getCtx = (__webpack_require__(819)/* .getCtx */ .yK);
var log = (__webpack_require__(544)/* .log */ .R);
var sharedConsts = __webpack_require__(211);
var GLOBAL_CSS_REGEX = /\/\*\* GLOBAL CSS \*\*\/[\s\S]*?\/\*\* END GLOBAL CSS \*\*\//g;
var GlobalStepCss = /** @class */ (function () {
    function GlobalStepCss() {
        this.globalCss = {};
        this.globalCssElements = {};
        this.eventsListener = getCtx().get('EventsListener');
    }
    GlobalStepCss.prototype.run = function () {
        var _this = this;
        this.eventsListener.on('WalkMeReady', function () {
            if (_this.hasCustomCssFile()) {
                log('the plugin does not support newPublishCssFile');
            }
            else {
                _this.getGlobalCssFromTemplates();
                _this.setStepStartListener();
                _this.setStepEndListener();
                _this.setFlowEndListener();
            }
        });
        return null;
    };
    GlobalStepCss.prototype.hasCustomCssFile = function () {
        var settingsFile = this.getSnippet().getSettingsFile();
        return !!settingsFile.CustomCss;
    };
    GlobalStepCss.prototype.getSnippet = function () {
        return window.wmSnippet || window.wmPreviewSnippet || window.wmPlaySnippet;
    };

    GlobalStepCss.prototype.getTargetDocuments = function () {
        var docs = [document];
        wmjQuery('iframe').each(function () {
            try {
                var doc = this.contentDocument || this.contentWindow.document;
                if (doc) {
                    docs.push(doc);
                }
            } catch (e) {
                // ignore cd iframes
            }
        });

        return docs;
    };

    GlobalStepCss.prototype.getGlobalCssFromTemplates = function () {
        log("getting custom css from templates");
        var designTemplates = getCtx().get('DesignTemplates');
        for (var i = 0; i < designTemplates.value.length; i++) {
            var designTemplate = designTemplates.value[i];
            var css = designTemplate.css;
            if (css) {
                this.globalCss[designTemplate.id] = this.extractGlobalCss(css, designTemplate.id);
            }
        }
    };
    GlobalStepCss.prototype.setStepStartListener = function () {
        var _this = this;
        this.eventsListener.on("BeforeExecutingFlowStage", function (event, data) {
            log("step started, adding css");
            var templateIds = _this.extractTemplateIds(data);
            wmjQuery.each(templateIds, function (index, templateId) {
                var customCss = _this.globalCss[templateId];
                if (customCss) {
                    _this.addCustomCss(customCss, templateId);
                }
            });
        });
    };
    GlobalStepCss.prototype.setStepEndListener = function () {
        var _this = this;
        this.eventsListener.on("AfterCompletingFlowStage", function (event, data) {
            log("step finished, removing css");
            var templateIds = _this.extractTemplateIds(data);
            wmjQuery.each(templateIds, function (index, templateId) { return _this.removeCustomCss(templateId); });
        });
    };
    GlobalStepCss.prototype.setFlowEndListener = function () {
        var _this = this;
        // TODO: When two walkthrus at the same time would be allowed this should check that the correct CSS is removed
        this.eventsListener.on(this.getFlowStoppedEvents().join(' '), function (event, data) {
            log("flow finished, removing css");
            wmjQuery.each(_this.globalCssElements, function (templateId) { return _this.removeCustomCss(templateId); });
        });
    };
    GlobalStepCss.prototype.getFlowStoppedEvents = function () {
        return ["FlowStopped", "FlowCompleted"];
    };
    GlobalStepCss.prototype.removeCustomCss = function (templateId) {
        var customCssElements = this.globalCssElements[templateId];

        if (customCssElements) {
            if (!Array.isArray(customCssElements)) {
                customCssElements = [customCssElements];
            }

            wmjQuery.each(customCssElements, function (i, item) {
                if (!item) return;

                if (item.type === 'dynamicCss' && item.el && typeof item.el.remove === 'function') {
                    try {
                        item.el.remove();
                    } catch (e) {
                    }
                }
            });
        }

        var idPrefix = "step-custom-css-" + templateId;

        var docs = this.getTargetDocuments();
        wmjQuery.each(docs, function (i, doc) {
            try {
                var styles = doc.querySelectorAll('style[id^="' + idPrefix + '"]');
                styles.forEach
                    ? styles.forEach(function (el) { el.parentNode && el.parentNode.removeChild(el); })
                    : wmjQuery(styles).each(function () {
                        if (this.parentNode) {
                            this.parentNode.removeChild(this);
                        }
                    });
            } catch (e) {
            }
        });

        delete this.globalCssElements[templateId];
    };

    GlobalStepCss.prototype.extractGlobalCss = function (css, templateId) {
        var globalCss = css.match(GLOBAL_CSS_REGEX);
        if (globalCss) {
            return globalCss.join('').replace(new RegExp(".".concat(sharedConsts.designTemplateCssClassPrefix).concat(templateId), 'g'), '');
        }
        return null;
    };
    GlobalStepCss.prototype.extractTemplateIds = function (eventData) {
        if (eventData && eventData.step && eventData.step.UIElements) {
            return wmjQuery.map(eventData.step.UIElements, function (uiElement) { return uiElement.DesignTemplateId; });
        }
        return [];
    };
    GlobalStepCss.prototype.addCustomCss = function (customCss, id) {
        var css = getCtx().create('DynamicCss', {
            css: customCss,
            Id: "step-custom-css-" + id
        });
        css.add();
        this.globalCssElements[id] = css;

        var docs = this.getTargetDocuments();
        wmjQuery.each(docs, function (i, doc) {
            if (doc === document) {
                return;
            }
            try {
                var style = doc.createElement('style');
                style.type = 'text/css';
                style.id = "step-custom-css-" + id + "-iframe-" + i;
                style.appendChild(doc.createTextNode(customCss));
                doc.head.appendChild(style);
            } catch (e) {
            }
        });
    };
    return GlobalStepCss;
}());
exports.J = GlobalStepCss;



/***/ }),

/***/ 544:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

var getCtx = (__webpack_require__(819)/* .getCtx */ .yK);
var logger = getCtx().get('PrelibLogger');

function log() {
	var logRecord = Array().slice.call(arguments);
	logRecord.unshift("[ GlobalStepCss ]");
	logger.write.apply(logger, logRecord);
}

exports.R = log;


/***/ }),

/***/ 765:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

var createPluginEntry = (__webpack_require__(819)/* .createPluginEntry */ .mJ);

module.exports = createPluginEntry(function(registerPlugin) {
    var GlobalStepCss = (__webpack_require__(386)/* .GlobalStepCss */ .J);

    registerPlugin(new GlobalStepCss());
});



/***/ }),

/***/ 819:
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



/***/ }),

/***/ 656:
/***/ (function(module) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

module.exports = ConditionBuilderPreview;

function ConditionBuilderPreview() {
    var map = {
        TYPES: {
            BAD_INPUT: -2,
            NO_INPUT: -1,
            TRUE: 0,
            FALSE: 1,
            CANNOT_ASSERT: 2,
            CONTEXT_ERROR: 3,
            CANT_INTERACT: 4
        },
        TOOLTIPS: {
            "true-indicator": "The statement is true for the current user and page settings",
            "false-indicator": "The statement is not true for the current user and page settings",
            "not-defined-indicator": "Waiting. Complete the condition to evaluate the status",
            "cannot-assert-indicator": "The validity of this statement can only be assessed when played",
            "cannot-assert-context-error-indicator": "The validity of this statement cannot be determined because the related Switch Step cannot be played in current page",
            "cannot-interact-error-indicator": "The validity of this statement cannot be determined because we can't interact with this page"
        },
        INDICATOR_CLASSES: {}
    };

    var _indicatorClassMap = map.INDICATOR_CLASSES;
    _indicatorClassMap[map.TYPES.NO_INPUT] = "no-input";
    _indicatorClassMap[map.TYPES.BAD_INPUT] = "bad-input";
    _indicatorClassMap[map.TYPES.TRUE] = "true";
    _indicatorClassMap[map.TYPES.FALSE] = "false";
    _indicatorClassMap[map.TYPES.CANNOT_ASSERT] = "cannot-assert";
    _indicatorClassMap[map.TYPES.CONTEXT_ERROR] = "cannot-assert-context-error";
    _indicatorClassMap[map.TYPES.CANT_INTERACT] = "cannot-interact-error";

    return map;
}


/***/ }),

/***/ 629:
/***/ (function(module) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */


function ContentType() {
    return {
        Article: 0,
        Video: 1
    };
}

module.exports = ContentType;


/***/ }),

/***/ 441:
/***/ (function(module) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */


function DeployableGroupType() {
    return {
        Label: 0,
        Category: 1,
        Collection: 2,
        Tag: 3,
        Course: 4,
        Lesson: 5
    };
}

module.exports = DeployableGroupType;


/***/ }),

/***/ 822:
/***/ (function(module) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */


function DesignTemplateType() {
    return {
        Shared : 0,
        Copied: 1,
        Specific : 2
    };
}

module.exports = DesignTemplateType;


/***/ }),

/***/ 467:
/***/ (function(module) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */


function DrawablePosition() {
    return {
    	Top: 0,
        Right: 1,
        Bottom: 2,
        Left: 3,
        TopLeft: 4,
        TopRight: 5,
        BottomRight: 6,
        BottomLeft: 7,
        Center: 8
    };
}

module.exports = DrawablePosition;


/***/ }),

/***/ 829:
/***/ (function(module) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */


function EntityType() {
    return {
        step: 0,
        launcher: 1,
        conditionBuilder: 2,
        smartTip: 3,
        balloon: 4,
        balloonTrigger: 5,
        flowNode: 6,
        flowLink: 7,
        smartTipUiComponent: 8,
        conditionNode: 9,
        trackedElementsSet: 10,
        businessSolution: 11,
        trackedElement: 12,
        onScreenElement: 13,
        shoutout: 17
    };
}

module.exports = EntityType;


/***/ }),

/***/ 158:
/***/ (function(module) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */


function FlowNodeType() {
    return {
        UI: 0,
        Action: 1
    };
}

module.exports = FlowNodeType;


/***/ }),

/***/ 657:
/***/ (function(module) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */


function ScreenshotMode() {
    return {
        Regular: 0,
        Blurred: 1,
        None: 2
    };
}

module.exports = ScreenshotMode;


/***/ }),

/***/ 107:
/***/ (function(module) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */


function ScrollType() {
    return {
        Animated: 0,
        Normal: 1,
        None: 2
    };
}

module.exports = ScrollType;


/***/ }),

/***/ 791:
/***/ (function(module) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */


function SearchProvider() {
    return {
        NoAction: -1,
        WalkMe: 0,
        Google: 1,
        Bing: 2,
        Desk: 3,
        Zendesk: 4,
        Custom: 5,
        SalesForce: 6,
        Parature: 7
    };
}

module.exports = SearchProvider;


/***/ }),

/***/ 211:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

var conditionBuilderPreview = new (__webpack_require__(656));
var drawablePosition = new (__webpack_require__(467));
var stepTrigger = new (__webpack_require__(938));
var stepType = new (__webpack_require__(284));
var entityType = new (__webpack_require__(829));
var surveyQuestionType = new (__webpack_require__(408));
var contentType = new (__webpack_require__(629));
var designTemplateType = new (__webpack_require__(822));
var smarttipMode = new (__webpack_require__(651));
var stickinessType = new (__webpack_require__(610));
var flowNodeType = new (__webpack_require__(158));
var searchProvider = new (__webpack_require__(791));
var screenshotMode = new (__webpack_require__(657));
var scrollType = new (__webpack_require__(107));
var deployableGroupType = new (__webpack_require__(441));
var teachMeCompletionType = new (__webpack_require__(329));
var teachMeQuestionType = new (__webpack_require__(563));
var templateEntityType = new (__webpack_require__(131));

module.exports = {
    conditionBuilderPreview: conditionBuilderPreview,
    drawablePosition: drawablePosition,
    stepTrigger: stepTrigger,
    stepType: stepType,
    ENTITY_TYPE: entityType,
    surveyQuestionType: surveyQuestionType,
    contentType: contentType,
    POPUP_BUTTON_ACTIONS: { NextDone: 0, Start: 1, Back: 2, Cancel: 3 },
    designTemplateType: designTemplateType,
    designTemplateCssClassPrefix: 'wm-design-template-',
    smarttipMode: smarttipMode,
    stickinessType: stickinessType,
    flowNodeType: flowNodeType,
    searchProvider: searchProvider,
    screenshotMode: screenshotMode,
    scrollType: scrollType,
    deployableGroupType: deployableGroupType,
    teachMeCompletionType: teachMeCompletionType,
    teachMeQuestionType: teachMeQuestionType,
    templateEntityType: templateEntityType
};


/***/ }),

/***/ 651:
/***/ (function(module) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */


function SmarttipMode() {
    return {
        Info: 0,
        Validation: 1,
        InfoAndValidation: 2
    };
}

module.exports = SmarttipMode;


/***/ }),

/***/ 938:
/***/ (function(module) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */


function StepTrigger() {
    return {
    	Nothing: 0,
        Button: 1,
        Click: 2,
        Hover: 3,
        PageChanged: 4,
        Text: 5,
        Delay: 6,
        SelectAny: 7,
        SelectValue: 8,
        Swipe: 9,
        PeerStep: 10,
        Custom: 11,
        BbCode: 12
    };
}

module.exports = StepTrigger;


/***/ }),

/***/ 284:
/***/ (function(module) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */


function StepType() {
    return {
    	Simple: 0,
        Popup: 1,
        Action: 2
    };
}

module.exports = StepType;


/***/ }),

/***/ 610:
/***/ (function(module) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */


function StickinessType() {
    return {
        soft: 0,
        strong: 1
    };
}

module.exports = StickinessType;


/***/ }),

/***/ 408:
/***/ (function(module) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */


function SurveyQuestionType() {
    return {
    	FreeText: 0,
        RadioButtons: 1,
        CheckBoxes: 2,
        PersonalDetails: 3
    };
}

module.exports = SurveyQuestionType;


/***/ }),

/***/ 329:
/***/ (function(module) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */


function TeachMeCompletionType() {
    return {
        byComplete: 0,
        byGoal: 1
    };
}

module.exports = TeachMeCompletionType;


/***/ }),

/***/ 563:
/***/ (function(module) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */


function TeachMeQuestionType() {
    return {
        SingleSelection: 0,
        MultipleSelection: 1
    };
}

module.exports = TeachMeQuestionType;


/***/ }),

/***/ 131:
/***/ (function(module) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

function TemplateEntityType() {
    return {
        balloon: 0,
        popup: 1
    };
}

module.exports = TemplateEntityType;


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
/******/ 	var __webpack_exports__ = __webpack_require__(188);
/******/ 	wmbundle = __webpack_exports__;
/******/ 	
/******/ })()
;
/* WalkMe Module */ return wmbundle; })
//# sourceMappingURL=bundle.js.map
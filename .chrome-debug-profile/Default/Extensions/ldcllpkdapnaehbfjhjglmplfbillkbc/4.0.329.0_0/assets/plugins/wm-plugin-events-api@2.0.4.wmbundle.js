/* WalkMe Module */ typeof _walkmeInternals !== 'undefined' && _walkmeInternals.wmloader && _walkmeInternals.wmloader.define('wm-plugin-events-api@2.0.4@prelib', {"name":"wm-plugin-events-api","version":"2.0.4","toolbelt":"2.0.2","packageDate":"2025-05-28T07:02:09.490Z","entry":"prelib"}, function (__wmplugin__) {  
var wmbundle;
/******/ (function() { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 6888:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

module.exports = __webpack_require__(205);



/***/ }),

/***/ 1915:
/***/ (function(module) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

(function(scope, factory){
    if ( true && typeof module.exports === "object" ){
        module.exports = factory;
    }
    else {
        scope.deployableConsts = factory;
    }
}(this, function() {
	return {
		DEPLOYABLE_TYPE : {
			Walkthru : 0,
			Task : 1,
			Launcher : 2,
			LabelGroup : 3,
			Survey : 4,
			AbExperiment : 5,
			Category : 6,
			Content : 7,
			Collection : 8,
			Shuttle: 9,
			Tag: 10,
			ShoutOut: 14,
			ConditionBlock : 17,
			BusinessSolution : 19,
			Lesson: 20,
			Course: 21,
			TrackedPage: 22,
			Spotlight: 23,
			Tooltip: 24,
			TrackedElement: 25,
			SearchProviderUrl : 26,
			Space: 27,
			Folder: 28,
            ActionBot: 29
		}
	};
}));


/***/ }),

/***/ 7362:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

module.exports = {
    services: __webpack_require__(4571),
    servicesWithDependencies: __webpack_require__(6966)
};


/***/ }),

/***/ 602:
/***/ (function(module) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

function isConditionDataValid(conditionData) {
    var fulfilled = {};

    if (!conditionData || !conditionData.condition) {
        return false;
    } else {
        // Subject defined in config, and this is not a selected element condition
        if ((conditionData.condition.SubjectClass) && (conditionData.condition.Id != 900)) {
            // False/undefined if subject unfulfilled
            fulfilled["Subject"] = !!conditionData.subject;
        }

        // Operator defined in config
        if (conditionData.condition.Operators) {
            // False/undefined if operator unfulfilled
            fulfilled["Operator"] = !!conditionData.operator;
        }

        // Value defined in config
        if (conditionData.condition.ValueClass && conditionData.condition.ValueClass != "Empty") {
            // False/undefined if value unfulfilled
            fulfilled["Value"] = !!conditionData.value;
            // Value defined under specific operator
        } else if (conditionData.condition.Operators && conditionData.operator && conditionData.operator.ValueClass && conditionData.operator.ValueClass != "Empty") {
            // False/undefined if value unfulfilled

            fulfilled["Value"] = !!conditionData.value;
        }
    }

    for (var key in fulfilled) {
        if (!fulfilled[key]) return false;
    }

    return true;
}

function areAllConditionsValid(conditionTree) {
    var value = isConditionElementValid(conditionTree);
    return value;
}

function isConditionElementValid(conditionElement) {
    if (conditionElement.elements) {
        for (var i = 0; i < conditionElement.elements.length; i++) {
            var isValid = isConditionElementValid(conditionElement.elements[i]);
            if (!isValid) {
                return false;
            }
        }

        return true;
    } else {
        var value = isConditionDataValid(conditionElement.data);
        return value;
    }
}

module.exports = {
    isConditionDataValid: isConditionDataValid,
    areAllConditionsValid: areAllConditionsValid
};


/***/ }),

/***/ 6015:
/***/ (function(module) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

module.exports = {
    cssReset : {
        "css" : ".maketutorialCssReset {min-width: 0px !important; min-height: 0px !important; padding: 0 !important; margin: 0 !important;\tvertical-align: middle !important;\tborder-collapse: inherit !important; border-spacing: 1px 1px !important; -webkit-box-sizing: content-box !important;  -moz-box-sizing: content-box !important; box-sizing: content-box !important; line-height: 16px !important; border: none none !important; height: auto !important; text-indent: inherit !important;  font-size: 16px/16px !important; font-family: Arial !important; letter-spacing: normal !important; text-align: left !important; text-transform: none !important; font-weight: normal !important; outline: invert none medium !important; width: auto !important; overflow: visible !important; border-top: none !important; border-right: none !important; border-bottom: none !important; border-left: none !important; direction: ltr !important; -moz-box-shadow: 0 0 0 0 !important; box-shadow: none !important; -moz-border-radius: 0 0 0 0 !important; border-radius: 0 0 0 0 !important; position: relative !important;}",
        "styleTagId" : "maketutorial_reset_css"
    },

    PLAY_TYPE : {
        Tutorial : 'tutorials',
        Flow : 'flows'
    },

    POPUP_TYPE: {
        Publish: 'Publish',
        Customize: 'Customize'
    },

    EDIT_FROM_PREVIEW_TYPE: {
        MENU: 'MENU',
        WIDGET: 'WIDGET',
        DEPLOYABLE: 'DEPLOYABLE',
        ACTION_BOT: 'ACTION_BOT'
    },

    positions : {
        Top: 0,
        Right: 1,
        Bottom: 2,
        Left: 3,
        TopLeft: 4,
        TopRight: 5,
        BottomRight: 6,
        BottomLeft: 7,
        Center: 8
    },

    CONTEXTS : {
        Outer : 0,
        Inner : 1
    },

    PLATFORMS : {
        Web: 1,
        MobileWeb: 3,
        Desktop: 6
    },

    STEP_TRIGGER : {
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
    },

    PlayingEnvironment : {
        Preview: 1,
        Play: 2
    },

    COMPLEX_HTML_TYPES : {
        TABLE: 1,
        DROPDOWN: 2
    },

    SMART_TIP : {
        TEXT_LIMIT: 4000,
        MODE: {
            INFO: 0,
            VALIDATION: 1,
            INFO_AND_VALIDATION: 2
        },
        UI_COMPONENT_TYPE: {
            INFO: 0,
            VALIDATION: 1,
            POSITIVE_FEEDBACK: 2
        },
        VALIDATION_TYPE: {
            Warning: "Attention",
            Error: "Invalid"
        },
        GlobalStyleId : {
            "Info" : "Info",
            "Positive" : "Valid",
            "Warning" : "Attention",
            "Error" : "Invalid"
        },
        DefaultTooltipTexts: {
            Guidance: "Guidance text is displayed here",
            Invalid: "Validation text is displayed here",
            Valid: "Confirmation text is displayed here"
        }
    },

    FEATURES : {
        haveOnlyWT: "haveOnlyWT",
        analyticsTracking: "analyticsTracking",
        automaticTestingEval : "automatictesting_eval",
        passOwnership: 'passOwnership',
        autoTracking: 'autoTracking',
        haveOnlyFlow: 'haveOnlyFlow',
        automaticTesting: 'automatictesting',
        alertOnError: 'alert_on_error',
        templatesBackoffice: 'templates_backoffice',
        templatesMsa: 'templates_msa',
        increaseNameLimit: 'increaseNameLimit',
        blockChildrenAccess: 'blockChildrenAccess',
        forceIEWorkingBrowser: 'forceIEWorkingBrowser',
        singleSnippet: 'pca_ss',
        conditionIndicatorCrossFrames: 'conditionIndicatorCrossFrames',
        impersonateOnAllEditors: 'impersonateOnAllEditors',
        enablePageIdentification: 'enablePageIdentification',
        editorExtensionCommunicationTimeout: 'editorExtensionCommunicationTimeout',
        spacesIsolation: 'spacesIsolation',
        spacesMigration: 'spacesMigration',
        spaceSettings: 'spaceSettings',
        wmAbTesting: 'wmAbTesting',
        lmsCourses: 'lms_courses',
        folderContainers: 'folderContainers',
        folderLazyLoad: 'folderLazyLoad',
        folderMultiSelect: 'folderMultiSelect',
        unifiedApps: 'unifiedApps',
        appsNavigatorDropdown: 'appsNavigatorDropdown',
        playbooks: 'playbooks',
        piiSafeApps: 'PIISafeApps',
        noPreview: 'noPreview'
    },

    EVENTS: {
        EDITOR_API: 'wm.editorAPI',
        APP_START: 'wm.appStart',
        NEW_CONNECTION: 'wm.newConnection',
        TAB_SELECTED: 'wm.TabSelect',
        TAB_CLOSE: 'wm.TabClose',
        WINDOW_SELECT: 'wm.WindowSelect',
        FRAMESCRIPT_CREATED: 'wm.framescriptCreated',
        AFTER_LIB_INJECTED_ON_ANY_DOCUMENT: 'wm.afterLibInjectedOnAnyDocument',
        AFTER_LIB_INJECTED: 'wm.afterLibInjectionToTopDocument',
        BEFORE_PREVIEW_INJECTED: 'wm.beforePreviewInjected',
        LIB_REMOVED: "wm.libEvent.removeWalkMe",
        STORAGE_LOADED: "wm.libEvent.StorageLoaded",
        WALKME_LOADED: "wm.libEvent.wm_walkmeLibLoaded",
        LIB_MODE_EXITED: 'wm.libModeExited',
        LIB_MODE_ENTERED: "wm.libModeEntered",
        LIB_EXISTS_ON_SELECTED_TAB: "wm.libExistOnTabSelected",
        ERROR_HAPPENED: 'wm.errorHappened',
        START_CAPTURE: 'wm.editor.captureStart',
        START_CAPTURE_STEP: 'wm.startCaptureStep',
        ICON_CUSTOM_IMAGE_DELETED : "wm.iconCustomImageDeleted",
        ICON_CUSTOM_IMAGE_UPDATED : "wm.iconCustomImageUpdated",
        ICON_CUSTOM_IMAGES_RELOADED : "wm.iconCustomImagesReloaded",
        SITE_CONFIG_SAVED: 'wm.siteConfigSaved',
        PAGE_IDENTIFIER_SAVED: 'wm.pageIdentifierSaved',
        STORAGE_TYPE_CHANGED: 'wm.storageTypeChanged',
        CAPTURE_CONFIG_CHANGED: 'wm.captureConfigChanged',
        DEPLOYABLE_SAVED: "wm.deployableSaved",
        DEPLOYABLE_RESTORED: "wm.deployableRestored",
        DEPLOYABLE_DUPLICATED: "wm.duplicateDeployable",
        DEPLOYABLE_DELETED: "wm.deployableDeleted",
        DEPLOYABLE_UPDATED: "wm.deployableUpdated",
        DEPLOYABLES_MANAGER_UPDATED: "wm.deployablesManagerUpdated",
        FRAMESCRIPT_PROCESS_TAB: "wm.tabProcessed",
        FRAMESCRIPT_APP_EXIT: "wm.framescriptAppExit",
        FRAMESCRIPT_TOP_DOM_CONTENT_LOADED: "wm.TopDOMContentLoaded",
        FRAMESCRIPT_TOP_DOM_CONTENT_CREATED : "wm.TopDOMContentCreated",
        FRAMESCRIPT_PASS_OWNERSHIP_DOM_CONTENT_LOADED : "wm.PODOMContentLoaded",
        CLOSE_PRECISION: "wm.closePrecision",
        POPUP_INITIALIZED: 'wm.popupInitialized',
        DEPLOYABLE_UL_FILTER: 'wm.deployableUl.filter',
        TRACKED_PAGE_ADDED: 'wm.trackedPageAdded',
        TRACKED_ELEMENT_ADDED: 'wm.trackedElementAdded',
        TRACKED_PAGE_CHANGED: 'wm.trackedPageChanged',
        DATA_ENTRY_CHANGED: "wm.dataEntryChanged",
	    BEFORE_EXECUTING_FLOW_STAGE: "wm.libEvent.BeforeExecutingFlowStage",
        AFTER_COMPLETING_FLOW_STAGE: "wm.libEvent.AfterCompletingFlowStage",
        FLOW_STAGE_SKIPPED: "wm.libEvent.FlowStageSkipped",
        FLOW_COMPLETED: "wm.libEvent.FlowCompleted",
        FLOW_STOPPED: "wm.libEvent.FlowStopped",
		BEFORE_INJECTING_LIB: 'wm.beforeInjectingLib',
	    DESIGN_TEMPLATES_UPDATED: "wm.designTemplatesUpdated",
	    CURRENT_DESIGN_TEMPLATE_UPDATED: "wm.currentDesignTemplateUpdated",
        REPLY_FROM_CONTENT: "wm.replyFromContent",
        SOCKETS_CONNECTED: 'wm.socketsConnected',
        SOCKETS_DISCONNECTED: 'wm.socketsDisconnected',
        POPUPS_HIDDEN: "wm.popupsHidden",
        EDITOR_SHUTDOWN: 'WM.shutdownEditor',
        EDITOR_MAXIMIZED: 'wm.editorMaximized',
        KEY_UP: 'wm.keyup',
        KEY_DOWN: 'wm.keydown',
        CAPTURE_END: 'wm.captureEnd',
        LAST_POPUP: 'wm.lastPopup',
	    INITIATORS_UPDATED: "wm.initiatorsUpdated",
	    INITIATORS_COUNTER_UPDATED: "wm.initiatorsCounterUpdated",
        GET_WORK_MODE: 'wm.getWorkMode',
        UPDATE_GENERATED_PREVIEW: 'wm.updateGeneratedPreview',
        ACTIVE_SOCKETS_CHANGED: 'wm.activeSocketsChanged',
        URL_OPEN_SUCCEEDED: 'wm.urlOpenSucceeded',
        URL_OPEN_FAILED: 'wm.urlOpenFailed',
        URL_COPIED_TO_CLIPBOARD: 'wm.urlCopiedToClipboard',
        USER_LOGGED_OUT: 'wm.userLoggedOff',
        ESC_IN_CUSTOMIZE_ON_SCREEN: 'wm.escInCustomizeOnScreen',
        GET_STATE: 'WM.getState',
        FORCE_STOP_RECORDING: 'wm.foreStopRecording',
        RECORDING_STOPPED: 'wm.recordingStopped',
        RECAPTURED: 'wm.recaptured',
        EDITOR_CUSTOM_PROTOCOL_CALLED: 'wm.customProtocolCalled',
        EDITOR_SCREENSHOT_TAKEN: 'wm.editorScreenshotTaken',
        IDENTIFY_SETTINGS_EDITED: 'wm.identifySettingsEdited',
        SELECTED_SMARTTIP_CHANGED: 'wm.selectedSmartTipChanged',
        EDIT_FROM_PREVIEW: 'wm.editFromPreview',
        FAILED_CAPTURE: 'wm.failedCapture'
    },

    SCRIPTS_INJECTION_COMPLETE_STATE : {
        Done : 0,
        CannotInject : 1,
        AlreadyInjected : 2,
        Interrupted : 3
    },

    LIB_MODE : {
        None : 0,
        Preview : 1,
        ViewStep : 2,
        PlayStep : 3,
        ViewLauncher : 4,
        HighlightElement : 5,
        PlayContent : 6,
        PlayShuttle : 7,
        PlaySurvey : 8,
        SpaAutoDetect : 9,
        PlayShoutOut : 12,
        PlayFlow : 13,
        PlaySmartTip : 14,
        PlayQuiz : 15
    },

    // if you're changing this, change in the extension and electron too, the values are duplicated there.
    FRAMESCRIPT_MESSAGE : {
        INIT_FRAMESCRIPT : 'INIT_FRAMESCRIPT',
        DESTROY_FRAMESCRIPT : 'DESTROY_FRAMESCRIPT',
        EditorToPage: 'WM.editorToPage',
        PageToEditor: 'WM.pageToEditor',
        EditorToPageReply: 'WM.editorToPageReply',
        PageToEditorReply: 'WM.pageToEditorReply',
        EditorToAllPages: 'WM.editorToAllPages',
        EditorToElectron: 'WM.editorToElectron',
        ElectronToEditor: 'WM.electronToEditor',
        CrossDomainPageToParent: 'WM.crossDomainPageToParent',
        CrossDomainPageToParentReply: 'WM.crossDomainPageToParentReply'
    },

    // if you're changing this, change in the extension and electron too, the values are duplicated there.
    COMMUNICATION_FRAME_ID: 'walkme-editor-proxy-iframe',

    previewFuncAssertion : {
        TRUE : 0,
        FALSE : 1,
        CANNOT_ASSERT : 2
    },

    SPA_AGGREGATE_DETECTIONS_PERIOD_IN_MILISECONDS : 5,

    EDITOR_API_FUNCTIONS: {
        getRemoteBrowserSocketId : { service : "remoteBrowser", func: "getRemoteBrowserSocketId" },
        enableLogs : { service : "filesLogger", func : "enableLogs" },
        disableLogs : { service : "filesLogger", func : "disableLogs" },
        trackLogs : { service : "filesLogger", func : "track" },
        trackedLogs : { service : "filesLogger", func : "tracked" },
        resetLogs : { service : "filesLogger", func : "reset" },
        pieParameters : { service : "pieParameters", func : "getPieParameters" },
        enablePieLogs : { service : "editorAPIService", func : "enablePieLogs" },
        disablePieLogs : { service : "editorAPIService", func : "disablePieLogs" },
        trackPieLogs : { service : "editorAPIService", func : "trackPieLogs" },
        untrackPieLogs : { service : "editorAPIService", func : "untrackPieLogs" },
        sendPieEvent : { service : "editorAPIService", func : "sendPieEvent" },
        editorEval : { service : "editorSocketService", func : "evalFunc", automation: true },
        popupEval : { service : "editorPopupManager", func : "mainPopupEval", automation: true },
        portalEval : { service : "portalEvaluator", func : "portalEval", automation: true },
        toolbarEval : { service : "editorPopupManager", func : "customizeToolbarEval", automation: true },
        anyPopupsOpened : { service : "editorPopupManager", func : "anyPopupsOpened", automation: true },
        screenshotEval : { service : "screenshotUIService", func : "screenshotEval", automation: true },
        isScreenshotIframeOpen : { service : "screenshotUIService", func : "isScreenshotIframeOpen", automation: true },
        getMainPopupId : { service : "automationMethodsFactory", func : "getMainPopupId", automation: true },
        isPopupVisible : { service : "automationMethodsFactory", func : "isPopupVisible", automation: true },
        anyPopupVisible : { service : "automationMethodsFactory", func : "anyPopupVisible", automation: true },
        hoverOnElement : { service : "elementCssInteractingService", func : "hoverOnElement", automation: true },
        clickOnElement : { service : "elementCssInteractingService", func : "clickOnElement", automation: true },
        clearClasses : { service : "elementCssInteractingService", func : "clearClasses", automation: true },
        perfTestName : { service : "performanceLogger", func : "setTestName", automation: true }
    },

    PAGE_SCRIPT: {
        IrrelevantMessageResponse: 'irrelevantMessage',
        CrossDomainMessageIsProcessed: 'crossDomainMessageIsProcessed'
    }
};


/***/ }),

/***/ 594:
/***/ (function(module) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

function hasForbiddenTokens(css) {

    if (!css) // if null
        return false;

    css = css.toLowerCase();

    var forbbidenTokens = ["@import", "expression", "javascript", "-moz-binding", "-o-link", "behavior"];
    for (var i = 0; i < forbbidenTokens.length; i++) {
        if (css.indexOf(forbbidenTokens[i]) > -1) {
            return true;
        }
    }

    return false;
}

module.exports = {
    hasForbiddenTokens: hasForbiddenTokens
};


/***/ }),

/***/ 9155:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

var deployableConsts = __webpack_require__(1915)();

var extendedtypes = deployableConsts.DEPLOYABLE_TYPE;

// Remove after flow and smarttips are merged
extendedtypes['BizFlow'] = -1;
extendedtypes['SmartTipSet'] = -2;

module.exports = extendedtypes;


/***/ }),

/***/ 4917:
/***/ (function(module) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

function generate() {
    return buildRandString(32, 16);
}

function buildRandString(length, base) {
    var res = "";

    while (8 < length) {
        res = res + generate8Chars(base);
        length -= 8;
    }

    if (0 < length) {
        res = res + generate8Chars(base).substring(0, length);
    }

    return res;
}

function generate8Chars(base) {
    var length = 8; //considering javascript's Number limits.

    var multiplier = Math.pow(base, length);

    return Math.floor((1 + Math.random()) * multiplier)
        .toString(base)
        .substring(1, 9);  //to have a constant number of digits:
                           //adding and removing a prefix '1'.
}

module.exports = {
    generate: generate
};


/***/ }),

/***/ 7995:
/***/ (function(module) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

function escapeHtml(str) {
    if (!str) return '';
    return ('' + str)
        .replace(/&/g, '&amp;')
        .replace(/'/g, '&#39;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
}

module.exports = {
    escapeHtml: escapeHtml
};



/***/ }),

/***/ 4571:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

module.exports = {
    conditionValidator: __webpack_require__(602),
    cssForbiddenTokensChecker: __webpack_require__(594),
    consts: __webpack_require__(6015),
    guidGenerator: __webpack_require__(4917),
    htmlEscaper: __webpack_require__(7995),
    jsonUtils: __webpack_require__(132),
    offsetByPositionAndContextProvider: __webpack_require__(1107),
    offsetByPositionAndContextUpdater: __webpack_require__(7357),
    parallelExecutor: __webpack_require__(53),
    stepDtoCategory: __webpack_require__(5688),
    timer: __webpack_require__(2018),
    trackedPageDefaultTreeService: __webpack_require__(6018),
    trackedSimplePageByConditionFinder: __webpack_require__(8440),
    onPageElementActionsProvider: __webpack_require__(7447),
    inputEventsRaiser: __webpack_require__(6296),
    pageElementTagActions: __webpack_require__(1561),
    deployableTypes: __webpack_require__(9155)
};


/***/ }),

/***/ 6296:
/***/ (function(module) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

module.exports = function InputEventsRaiser(eventRaiser) {
    var _this = this;
    _this.init = init;
    _this.destroy = destroy;

    var _keyupCallback;
    var _keydownCallback;
    var _keypressCallback;

    function ctor() {
        _keyupCallback = getKeyCallback('keyup');
        _keydownCallback = getKeyCallback('keydown');
        _keypressCallback = getKeyCallback('keypress');
    }

    function init(window) {
        // Used to listen to key up and down when the focus is on the plug in
        window.addEventListener('keyup', _keyupCallback, false);
        window.addEventListener('keydown', _keydownCallback, false);
        window.addEventListener('keypress', _keypressCallback, false);
        window.addEventListener('mouseup', mouseupCallback, false);
    }

    function destroy(window) {
        window.removeEventListener('keyup', _keyupCallback);
        window.removeEventListener('keydown', _keydownCallback);
        window.removeEventListener('keypress', _keypressCallback);
        window.removeEventListener('mouseup', mouseupCallback);
    }

    function mouseupCallback(e){
        eventRaiser("wm.mouseup");
    }

    function keyEvent(e, name){
        var keyCode = e.keyCode;
        var ctrlKey = e.ctrlKey;
        var shiftKey = e.shiftKey;
        var altKey = e.altKey;

        var specialButtons = {
            ctrl : ctrlKey,
            shift : shiftKey,
            alt : altKey
        };

        eventRaiser("wm." + name, {
            keyCode: keyCode,
            specialButtons: specialButtons});
    }

    function getKeyCallback(eventName){
        return function(e){
            keyEvent(e, eventName);
        };
    }

    ctor();
};


/***/ }),

/***/ 132:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

var _jsonUtils = __webpack_require__(5864);
var _wmJson = _jsonUtils.wmJson;
var _toJsonFixer = _jsonUtils.toJsonFixer;
var _wmJsonInstance = new _wmJson();

function stringify(value, replacer, space) {
    _toJsonFixer.removeUnsupportedToJson(value);
    return _wmJsonInstance.stringify(value, replacer, space);
}

function parse(text, reviver) {
    return _wmJsonInstance.parse(text, reviver);
}

module.exports = {
    stringify: stringify,
    parse: parse
};


/***/ }),

/***/ 1107:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

var consts = __webpack_require__(6015);

var OFFSET_AMOUNT = 3;
var _offsetModifierByPosition = {};
_offsetModifierByPosition[consts.positions.Top] = {x: 0, y: -1};
_offsetModifierByPosition[consts.positions.Right] = {x: 1, y: 0};
_offsetModifierByPosition[consts.positions.Bottom] = {x: 0, y: 1};
_offsetModifierByPosition[consts.positions.Left] = {x: -1, y: 0};
_offsetModifierByPosition[consts.positions.TopLeft] = {x: -1, y: -1};
_offsetModifierByPosition[consts.positions.TopRight] = {x: 1, y: -1};
_offsetModifierByPosition[consts.positions.BottomRight] = {x: 1, y: 1};
_offsetModifierByPosition[consts.positions.BottomLeft] = {x: -1, y: 1};
_offsetModifierByPosition[consts.positions.Center] = {x: 0, y: 0};

function getOffsetByPositionAndContext(position, context) {
    var offsetModifier = _offsetModifierByPosition[position];
    var contextModifier = context == consts.CONTEXTS.Inner ? -1 : 1;
    return {
        leftOffset: contextModifier * offsetModifier.x * OFFSET_AMOUNT,
        topOffset: contextModifier * offsetModifier.y * OFFSET_AMOUNT
    };
}

module.exports = {
    getOffsetByPositionAndContext: getOffsetByPositionAndContext
};


/***/ }),

/***/ 7357:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

var offsetByPositionAndContextProvider = __webpack_require__(1107);

function update(iconSettings, iconPositionHolder, previousPosition, previousContext) {
    if (offsetIsDefined(iconSettings) &&
        customOffsetIsDefined(iconSettings, previousPosition, previousContext))
        return;

    var position = iconPositionHolder.Position;
    var context = iconSettings.context;
    var newOffset = offsetByPositionAndContextProvider.getOffsetByPositionAndContext(position, context);
    iconSettings.leftOffset = newOffset.leftOffset;
    iconSettings.topOffset = newOffset.topOffset;
}

function offsetIsDefined(iconSettings) {
    var result = !!iconSettings.leftOffset || !!iconSettings.topOffset;
    return result;
}

function customOffsetIsDefined(iconSettings, previousPosition, previousContext) {
    var expectedOffset = offsetByPositionAndContextProvider.getOffsetByPositionAndContext(previousPosition, previousContext);
    var result = expectedOffset.leftOffset != iconSettings.leftOffset ||
        expectedOffset.topOffset != iconSettings.topOffset;
    return result;
}

module.exports = {
    update: update
};


/***/ }),

/***/ 7447:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

var platforms = (__webpack_require__(6015).PLATFORMS);
var onPageActionType = (__webpack_require__(3095).onPageActionType);
var platformsFilterer = new (__webpack_require__(5630))();
var pageElementTagActions = __webpack_require__(1561);

var clickElementTags = pageElementTagActions.clickableElements.concat(pageElementTagActions.buttonElements);

var _actions = [
    {
        type: onPageActionType.Click,
        name: 'Click',
        platforms: [platforms.Web],
        isDefault: true,
        tags: clickElementTags
    },
    {
        type: onPageActionType.Tap,
        name: 'Tap',
        platforms: [platforms.MobileWeb],
        isDefault: true,
        tags: clickElementTags
    },
    {
        type: onPageActionType.Hover,
        name: 'Hover',
        platforms: [platforms.Web]
    },
    {
        type: onPageActionType.Swipe,
        name: 'Swipe',
        platforms: [platforms.MobileWeb]
    },
    {
        type: onPageActionType.Focus,
        name: 'Focus',
        platforms: [platforms.Web, platforms.MobileWeb]
    },
    {
        type: onPageActionType.FillText,
        name: 'Fill Text',
        platforms: [platforms.Web, platforms.MobileWeb],
        tags: pageElementTagActions.textElements
    },
    {
        type: onPageActionType.SelectListValue,
        name: 'Select List Value',
        platforms: [platforms.Web, platforms.MobileWeb],
        tags: pageElementTagActions.selectElements
    }
];

function getActionsByPlatform(platform) {
    return platformsFilterer.filterByPlatform(_actions, platform);
}

module.exports = {
    getActionsByPlatform: getActionsByPlatform
};


/***/ }),

/***/ 1561:
/***/ (function(module) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

var clickableElements = [
    'A',
    'BUTTON',
    'IMG',
    'INPUT.button',
    'INPUT.image',
    'INPUT.submit',
    'INPUT.color',
    'INPUT.file',
    'INPUT.reset',
    'LI'
];

var buttonElements = [
    'INPUT.checkbox',
    'INPUT.radio',
    'INPUT.range',
    'SELECT.select-multiple'
];

var textElements = [
    'TEXTAREA',
    'INPUT'
];

var selectElements = [
    'SELECT'
];

module.exports = {
    clickableElements: clickableElements,
    buttonElements: buttonElements,
    textElements: textElements,
    selectElements: selectElements
};


/***/ }),

/***/ 53:
/***/ (function(module) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

//When successSensitive is set to true, successCallback will be called when at least one function succeeded, regardless of failures.
//When successSensitive is set to false, failCallback will be called when at least one function failed, regardless of successes, and no more functions will be called afterwards.
function executeParallel(functionsToExecute, successCallback, failCallback, successSensitive) {
    var numberOfCallbacksToWaitFor = functionsToExecute.length;
    var failureHappened = false;
    var successHappened = false;
    var raisedErrorMessage;

    if (functionsToExecute.length == 0) {
        return successCallback && successCallback();
    }

    for (var i = functionsToExecute.length - 1; i >= 0; i--) {
        // In case a synchronous failure happens, there's no point to continue executing the rest of the functions
        if (failureHappened && !successSensitive) {
            return;
        }

        functionsToExecute[i](singleSuccessCallback, singleFailureCallback);
    }

    function success() {
        if (successCallback) {
            successCallback();
        }
    }

    function failure() {
        if (failCallback) {
            failCallback(raisedErrorMessage);
        }
    }

    function callbackResult() {
        if (successHappened && !failureHappened) { //All succeeded
            success();
        } else if (!successHappened && failureHappened) { //All failed
            failure();
        }
        else { //Some succeeded, some failed
            if (successSensitive) {
                success();
            }
            else {
                failure();
            }
        }
    }

    function singleSuccessCallback() {
        numberOfCallbacksToWaitFor--;
        successHappened = true;

        if (numberOfCallbacksToWaitFor == 0) {
            callbackResult();
        }
    }

    function singleFailureCallback(errorMessage) {
        if (failureHappened && !successSensitive) {
            return;
        }

        failureHappened = true;
        numberOfCallbacksToWaitFor--;

        if (!successSensitive) { //If we are not working in "success sensitive" mode, signal the error right away.
            failure();

            return;
        } else { //Save the error for later
            raisedErrorMessage = errorMessage;
        }

        if (numberOfCallbacksToWaitFor == 0) {
            callbackResult();
        }
    }
}

module.exports = {
    executeParallel: executeParallel
};


/***/ }),

/***/ 855:
/***/ (function(module) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

function createPipeRunner(functionsArray) {
    return new PipeRunner(functionsArray);
}

function PipeRunner(functionsArray) {
    var _this = this;

    _this.runSequential = runSequential;
    _this.runPipe = runPipe;

    var _functionsArray;

    function ctor(functionsArray) {
        _functionsArray = functionsArray;
    }

    function runSequential() {
        if (_functionsArray && _functionsArray.length > 0) {
            for (var i = 0; i < _functionsArray.length; i++) {
                _functionsArray[i].apply(null, arguments);
            }
        }
    }

    function runPipe(startingParam) {
        var res = startingParam;

        if (_functionsArray && functionsArray.length > 0) {
            for (var i = 0; i < _functionsArray.length; i++) {
                res = _functionsArray[i].call(null, res);
            }
        }

        return res;
    }

    ctor.call(null, functionsArray);
}

module.exports = {
    createPipeRunner: createPipeRunner
};


/***/ }),

/***/ 5630:
/***/ (function(module) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

module.exports = PlatformsFilterer;

function PlatformsFilterer() {
    var _this = this;

    _this.filterByPlatform = filterByPlatform;

    function filterByPlatform(objects, platform) {
        return objects.filter(function(object) {
            return isObjectInPlatform(object, platform);
        });
    }

    function isObjectInPlatform(object, platform) {
        for (var i = 0; i < object.platforms.length; i++) {
            if (object.platforms[i] == platform) {
                return true;
            }
        }

        return false;
    }
}


/***/ }),

/***/ 5688:
/***/ (function(module) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

module.exports = {
    map: {
        'Id': 'Id',

        'isDefault': 'IdentifySettings.isDefault',
        'IsIdentifyByText': 'IdentifySettings.IsIdentifyByText',
        'IsJquerySelector': 'IdentifySettings.IsJquerySelector',
        'JquerySelector': 'IdentifySettings.JquerySelector',
        'IsIgnoreText': 'IdentifySettings.IsIgnoreText',
        'IsIgnoreId': 'IdentifySettings.IsIgnoreId',
        'IgnorePosition': 'IdentifySettings.IgnorePosition',
        'IgnorePageIdentification': 'IdentifySettings.IgnorePageIdentification',
        'IsValidPageId': 'IdentifySettings.IsValidPageId',
        'ElementDescription': 'IdentifySettings.ElementDescription',
        'StepSensitivity': 'IdentifySettings.StepSensitivity',
        'Settings.filter': 'IdentifySettings.Settings.filter',

        'Screenshots': 'Screenshots',
        'Host': 'Host',
        'Position': 'Position',

        'Settings.complexHtml': 'complexHtml',
        'Settings.lv': 'lv',

        'StepTitle': 'StepTitle',
        'StepText': 'StepText',
        'EditorSettings.originalTriggersTypes': 'EditorSettings.originalTriggersTypes',
        'Notes': 'Notes',
        'End': 'End',
        'hasMoreThanOneUniqueChildOnNonBBCodeTriggers': 'hasMoreThanOneUniqueChildOnNonBBCodeTriggers',
        'Duration': 'Duration',
        'Type': 'Type'
    }
};


/***/ }),

/***/ 2018:
/***/ (function(module) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

module.exports = function WalkmeTimer() {
    var beginTime = new Date();
    return function () {
        var endTime = new Date();
        var timeTook = endTime - beginTime;
        beginTime = endTime;
        return timeTook;
    };
};


/***/ }),

/***/ 6018:
/***/ (function(module) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

function getDefault() {
    return provide("UrlLike", "*");
}

function provide(funcName, urlInput) {
    return {
        Id: 0,
        ConditionType: "DisplayRules",
        Root: {
            Type: 0,
            Settings: {
                funcName: funcName,
                funcArgs: {
                    UrlInput: urlInput
                }
            }
        }
    };
}

function fillDefaultTreeIfNeeded(page) {
    if (page.ConditionTrees.DisplayRules) {
        return;
    }

    page.ConditionTrees.DisplayRules = getDefault();
}

module.exports = {
    provide: provide,
    getDefault: getDefault,
    fillDefaultTreeIfNeeded: fillDefaultTreeIfNeeded
};


/***/ }),

/***/ 8440:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

var trackedPageDefaultTreeService = __webpack_require__(6018);

function findMatch(allPages, currentConditionTree, currentPageId) {
    for (var i = 0; i < allPages.length; i++) {
        var page = allPages[i];

        if (page.IsComplex == 1) {
            continue;
        }

        if (page.Id == currentPageId) {
            continue;
        }

        var pageCondition = page.ConditionTrees.DisplayRules ?
            page.ConditionTrees.DisplayRules : trackedPageDefaultTreeService.getDefault();

        if (areConditionsEqual(pageCondition, currentConditionTree)) {
            return page;
        }
    }

    return null;
}

function areConditionsEqual(existingConditionTree, conditionTree) {
    if (getConditionOperator(existingConditionTree) != getConditionOperator(conditionTree)) {
        return false;
    }

    return getConditionValue(existingConditionTree).toLowerCase() == getConditionValue(conditionTree).toLowerCase();
}

function getConditionOperator(conditionTree) {
    if (isOldCondition(conditionTree)) {
        return conditionTree.elements[0].data.operator.LibClass;
    } else {
        return conditionTree.Root.Settings.funcName;
    }
}

function getConditionValue(conditionTree) {
    if (isOldCondition(conditionTree)) {
        return conditionTree.elements[0].data.value;
    } else {
        return conditionTree.Root.Settings.funcArgs.UrlInput;
    }
}

function isOldCondition(conditionTree) {
    return !conditionTree.Root;
}

module.exports = {
    findMatch: findMatch
};


/***/ }),

/***/ 890:
/***/ (function(module) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

module.exports = function CanvasCreator(documentProvider) {
	var _this = this;

	_this.drawWindow = drawWindow;

	function drawWindow(params) {

		var canvas = documentProvider.get().createElementNS("http://www.w3.org/1999/xhtml", "canvas");
		canvas.mozOpaque = true;
		canvas.width = params.width;
		canvas.height = params.height;
		var ctx = canvas.getContext("2d");

		ctx.drawWindow(params.win, params.left, params.top, params.width, params.height, params.backgroundColor, params.flags);
		
		return canvas.toDataURL("image/jpeg", params.jpgQuality);
	}
};


/***/ }),

/***/ 6302:
/***/ (function(module) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

module.exports = function DataEncodingService(jQuery, documentProvider, jsonUtils) {
    var _this = this;
    _this.encodeData = encodeData;
    _this.htmlEncode = htmlEncode;
    _this.htmlEncodeRegEx = htmlEncodeRegEx;
    _this.htmlDecode = htmlDecode;

    var STRINGS_TO_ENCODE = [
        ['amp', '&'],
        ['apos', "'"],
		['quot', '"'],
		['lt', '<'],
		['gt', '>']
	];

	// The stringifier parameter is needed in case the object you want to encode has 
	// circular references inside it (Father to son and son to father). 
	// In this case, JSON.stringify won't work, so we have our own stringifer we can pass to this function.
    function encodeData(item,parentCloned, stringifier) {
		stringifier = stringifier === undefined ? jsonUtils.stringify : stringifier;
		
		if (typeof(item)=='string')
		{
			return _this.htmlEncode(item);
		}
		else if (Object.prototype.toString.call( item ) === '[object Array]')
		{
			var encodedItem = item;
			
			if (!parentCloned) {
				encodedItem = jsonUtils.parse(stringifier(item));//clone the object
			}

			for(var i=0; i<encodedItem.length; i++) {
				encodedItem[i] = _this.encodeData(encodedItem[i], parentCloned==undefined);
			}
			
			return encodedItem;
		}
		else if(typeof(item)=='object')
		{
			if (item) {
				var encodedItem = item;
				
				if (!parentCloned) {
					encodedItem = jsonUtils.parse(stringifier(item));//clone the object
				}
			
				for (var i in encodedItem){
					if (i != "ElementDescription") {
						encodedItem[i] = _this.encodeData(encodedItem[i],true);
					}
				}
				
				return encodedItem;
			}
			else {
				return item;
			}
		}
		else {
			return item;
		}
	}

	function htmlEncode(value) {
		if (value == "") {
			return ""; // Otherwise it will return undefined
		}
		
		if (value) {
			return jQuery('<div/>', documentProvider.get()).text(value).html();
		}
	}

	function htmlEncodeRegEx(value) {
        if (!value) {
            return "";
        }

		for (var i = 0, max = STRINGS_TO_ENCODE.length; i < max; i++) {
			value = value.replace(new RegExp(STRINGS_TO_ENCODE[i][1], 'g'), '&' + STRINGS_TO_ENCODE[i][0] + ';');
		}

		return value;	
	}

	function htmlDecode(value) {
		for (var i = 0, max = STRINGS_TO_ENCODE.length; i < max; i++) {
			value = value.replace(new RegExp('&' + STRINGS_TO_ENCODE[i][0] + ';', 'g'), STRINGS_TO_ENCODE[i][1]);
		}

		return value;
	}
};


/***/ }),

/***/ 5558:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

var pipeRunnerFactory = __webpack_require__(855);

module.exports = function DtoMapper(clone, objectMapper) {
    var _this = this;
    _this.createDtoFromItem = createDtoFromItem;
    _this.mergeDtoToItem = mergeDtoToItem;

    function createDtoFromItem(category, item) {
        var dto = {
            temporaryAttributes: {}
        };

        var map = createMap(category.map);
        objectMapper.merge(item, dto, map);

        dto = clone(dto);

        if (category.transformFunctions && category.transformFunctions.toDto) {
            var toDtoFunctions = category.transformFunctions.toDto;
            createPipeRunner(toDtoFunctions).runSequential(item, dto);
        }

        return dto;
    }

    function mergeDtoToItem(category, dto, item) {
        var map = getReversedMap(category.map);
        objectMapper.merge(dto, item, map);

        if (category.transformFunctions && category.transformFunctions.backToBase) {
            var backToBaseFunctions = category.transformFunctions.backToBase;
            createPipeRunner(backToBaseFunctions).runSequential(item, dto);
        }
    }

    function createMap(baseMap) {
        var map = {};

        Object.keys(baseMap).forEach(function (key) {
            var value = baseMap[key];

            addKeyToMap(map,
                        key,
                        value.destination || value,
                        value.transformFunctions && value.transformFunctions.toDto);
        });

        return map;
    }

    function getReversedMap(baseMap) {
        var map = {};

        Object.keys(baseMap).forEach(function (key) {
            var value = baseMap[key];

            addKeyToMap(map,
                        value.destination || value,
                        key,
                        value.transformFunctions && value.transformFunctions.backToBase);
        });

        return map;
    }

    function addKeyToMap(map, from, to, transform) {
        if (!transform) {
            map[from] = to;
        } else {
            map[from] = {
                destination: to,
                transform: createPipeRunner(transform).runPipe
            };
        }
    }

    function createPipeRunner(functionsArray) {
        if (!(functionsArray instanceof Array)) {
            functionsArray = [functionsArray];
        }

        return pipeRunnerFactory.createPipeRunner(functionsArray);
    }
};


/***/ }),

/***/ 1288:
/***/ (function(module) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

module.exports = function ExceptionMessageFormatter(jsonUtils) {
    var _this = this;
    _this.buildMessage = buildMessage;

    function buildMessage(callerArgs, exception, desc) {
        var messageDetails = {};
        messageDetails.trace = "";
        messageDetails.text = "";

        var caller = "unknown";
        try {
            caller = callerArgs.callee.caller.name;
        } catch (e) {
        }

        if (!exception) {
            msg = "Decription : {0}\n" +
                "Function : {1}";
            messageDetails.text = formatString(msg, desc, caller);

        } else if (typeof(exception) == "object") {
            template = "Decription : {0} \n" +
                "File : {1} \n" +
                "Function : {2} \n" +
                "Line : {3} (Column: {4})\n" +
                "Msg : {5} \n";

            messageDetails.text = formatString(template,
                desc,
                exception.fileName,
                caller,
                exception.lineNumber,
                exception.columnNumber,
                exception.message);

            messageDetails.trace = exception.stack;
        } else if (typeof(exception) == "string") {
            messageDetails.text = exception;
        } else {
            messageDetails.text = jsonUtils.stringify(exception);
        }

        messageDetails.caller = caller;
        return messageDetails;
    }

    function formatString() {
        var formatted = arguments[0];

        for (var i = 1; i < arguments.length; i++) {
            var regexp = new RegExp('\\{' + (i - 1) + '\\}', 'gm');
            formatted = formatted.replace(regexp, arguments[i]);
        }
        return formatted;
    }
};



/***/ }),

/***/ 6966:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

module.exports = {
    canvasCreator: __webpack_require__(890),
    dataEncodingService: __webpack_require__(6302),
    dtoMapper: __webpack_require__(5558),
    passOwnershipManager: __webpack_require__(7865),
    siteConfigPrepareService: __webpack_require__(4351),
    multiTriggersUpdater: __webpack_require__(9973),
    exceptionMessageFormatter: __webpack_require__(1288)
};


/***/ }),

/***/ 9973:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

var consts = __webpack_require__(6015);

module.exports = function MultiTriggersUpdater(jsonUtils, platforms) {
    var _this = this;
    _this.updateMultiTriggers = updateMultiTriggers;

    var _multipleTriggersGeneralCombinations = [
        [consts.STEP_TRIGGER.Button, consts.STEP_TRIGGER.Click, consts.STEP_TRIGGER.Custom],
        [consts.STEP_TRIGGER.Hover, consts.STEP_TRIGGER.Custom],
        [consts.STEP_TRIGGER.PageChanged, consts.STEP_TRIGGER.Custom],
        [consts.STEP_TRIGGER.Button, consts.STEP_TRIGGER.Text, consts.STEP_TRIGGER.Custom],
        [consts.STEP_TRIGGER.Delay, consts.STEP_TRIGGER.Custom],
        [consts.STEP_TRIGGER.Button, consts.STEP_TRIGGER.SelectAny, consts.STEP_TRIGGER.Custom],
        [consts.STEP_TRIGGER.Button, consts.STEP_TRIGGER.SelectValue, consts.STEP_TRIGGER.Custom]
    ];

    var _allowAllCombinationsByPlatform = {};

    _allowAllCombinationsByPlatform[platforms.Desktop] = true;

    function updateMultiTriggers(existingArrStr, newTriggerIdStr, platform) {
        //we parse the string to array because this function is called from page and editor side
        var existingTriggers = jsonUtils.parse(existingArrStr);

        // No existing triggers
        if ((existingTriggers.length == 0) ||
            // Set has only one trigger and it's the same as what the user clicked
            (existingTriggers.length == 1 && existingTriggers.indexOf(newTriggerIdStr) > -1)) {
            return false;
        }

        // The new trigger already exist --> remove it
        if (existingTriggers.indexOf(newTriggerIdStr) > -1) {
            existingTriggers.splice(existingTriggers.indexOf(newTriggerIdStr), 1);
            return existingTriggers.join();
        }

        if (_allowAllCombinationsByPlatform[platform]){
            existingTriggers.push(newTriggerIdStr);
            return existingTriggers.join();
        }

        for (var i = 0; i < _multipleTriggersGeneralCombinations.length; i++) {
            var triggersCombination = _multipleTriggersGeneralCombinations[i];

            // Check if there's a combo of the new trigger with the existing triggers
            if ((triggersCombination.indexOf(Number(newTriggerIdStr)) > -1) && triggersExistInCombination(existingTriggers, triggersCombination)) {
                existingTriggers.push(newTriggerIdStr);
                return existingTriggers.join();
            }
        }

        return false;
    }

    function triggersExistInCombination(triggers, triggersCombination) {
        for (var i = 0; i < triggers.length; ++i) {
            if (triggersCombination.indexOf(Number(triggers[i])) == -1) {
                return false;
            }
        }

        return true;
    }
};


/***/ }),

/***/ 7865:
/***/ (function(module) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

module.exports = function PassOwnershipManager(featuresIndicator, prodStorageProvider) {
	var _this = this;
	_this.isPoCapture = isPoCapture;
	_this.isPassOwnershipEnabled = isPassOwnershipEnabled;

	var _storageRegex = /crossdomain|extension|proxy/;

	//legacy code, for places that had used to check "po_capture" flag
	function isPoCapture(){
		return !featuresIndicator.isEnabled("po_capture_disable") &&
			isPassOwnershipEnabled();
	}

	function isPassOwnershipEnabled() {
		var result = ((featuresIndicator.isEnabled('cd_play') || 
					   featuresIndicator.isEnabled('po_tabs') ||
					   featuresIndicator.isEnabled('po_frames') ||
					   featuresIndicator.isEnabled('passOwnership')) &&
					   checkStorage());
		
		return result;
	}

	function checkStorage() {
		var storage = prodStorageProvider.get();
		if(!storage)
			return false;
		return _storageRegex.test(storage);
	}	
};


/***/ }),

/***/ 4351:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

var cssForbiddenTokensChecker = __webpack_require__(594);

module.exports = function SiteConfigPrepareService(dataEncodingService, jQuery){
	var _this = this;
	_this.prepareForLib = prepareForLib;

	function prepareForLib(siteConfig) {
		var siteConfigClone = jQuery.extend(true, {}, siteConfig);

		if (cssForbiddenTokensChecker.hasForbiddenTokens(siteConfigClone.CustomCss)){
			siteConfigClone.CustomCss = "";
		}

		return dataEncodingService.encodeData(siteConfigClone);
	}
};


/***/ }),

/***/ 5864:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

module.exports = {
    wmJson: __webpack_require__(4772),
    toJsonFixer: __webpack_require__(277)
};



/***/ }),

/***/ 277:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

var utils = __webpack_require__(4145);

function ToJsonFixer() {
    var _this = this;
    _this.removeUnsupportedToJson = removeUnsupportedToJson;

    function removeUnsupportedToJson(value) {
        if(value !== null)
        {
            utils.runOnObjectRecursive(value, function(obj)
            {
                try
                {
                    if (obj.toJSON)
                    {
                        obj.toJSON = null;
                    }
                }
                catch(e)
                {
                    // Do nothing, just making sure that we dont have errors when calling from editor, and the toJSON property is not exposed so we cant override it.
                }
            });
        }
    }
}

module.exports = new ToJsonFixer();


/***/ }),

/***/ 4145:
/***/ (function(module) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

module.exports = {
    runOnObjectRecursive: runOnObjectRecursive
};

function runOnObjectRecursive(obj, callback, seenObjects)
{
    seenObjects = seenObjects || [];
    if (obj != undefined && typeof(obj) == "object" && !arrContains(seenObjects, obj))
    {
        seenObjects.push(obj);
        // In here the object may be either an array or an object
        for (var key in obj)
        {
            // Making sure that current proprety is not from prototype
            if (Object.hasOwnProperty.call(obj, key))
            {
                var current = obj[key];
                if (current !== null && current !== undefined)
                {
                    runOnObjectRecursive(current, callback, seenObjects);
                }
            }
        }
    }

    if (obj !== null && obj !== undefined)
    {
        callback(obj);
    }
}

function arrContains(arr, value) {
    for (var i = 0; i < arr.length; i++) {
        if (arr[i] === value) {
            return true;
        }
    }
    return false;
}


/***/ }),

/***/ 4772:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

var utils = __webpack_require__(4145);

function WmJson() {
    'use strict';

    function f(n) {
        // Format integers to have at least two digits.
        return n < 10 ? '0' + n : n;
    }

    if (typeof Date.prototype.toJSON !== 'function') {

        Date.prototype.toJSON = function () {

            return isFinite(this.valueOf())
                ? this.getUTCFullYear()     + '-' +
                f(this.getUTCMonth() + 1) + '-' +
                f(this.getUTCDate())      + 'T' +
                f(this.getUTCHours())     + ':' +
                f(this.getUTCMinutes())   + ':' +
                f(this.getUTCSeconds())   + 'Z'
                : null;
        };

        String.prototype.toJSON      =
            Number.prototype.toJSON  =
                Boolean.prototype.toJSON = function () {
                    return this.valueOf();
                };
    }

    var cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
        escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
        gap,
        indent,
        meta = { // table of character substitutions
            '\b': '\\b',
            '\t': '\\t',
            '\n': '\\n',
            '\f': '\\f',
            '\r': '\\r',
            '"': '\\"',
            '\\': '\\\\'
        },
        rep;

    function quote(string) {

        // If the string contains no control characters, no quote characters, and no
        // backslash characters, then we can safely slap some quotes around it.
        // Otherwise we must also replace the offending characters with safe escape
        // sequences.

        escapable.lastIndex = 0;
        return escapable.test(string) ? '"' + string.replace(escapable, function (a) {
            var c = meta[a];
            return typeof c === 'string'
                ? c
                : '\\u' + ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
        }) + '"' : '"' + string + '"';
    }

    function str(key, holder) {

        // Produce a string from holder[key].

        var i, // The loop counter.
            k, // The member key.
            v, // The member value.
            length,
            mind = gap,
            partial,
            value = holder[key];

        // If the value has a toJSON method, call it to obtain a replacement value.

        if (value && typeof value === 'object' &&
            typeof value.toJSON === 'function') {
            value = value.toJSON(key);
        }

        // If we were called with a replacer function, then call the replacer to
        // obtain a replacement value.

        if (typeof rep === 'function') {
            value = rep.call(holder, key, value);
        }

        // What happens next depends on the value's type.

        switch (typeof value) {
            case 'string':
                return quote(value);

            case 'number':

                // JSON numbers must be finite. Encode non-finite numbers as null.

                return isFinite(value) ? String(value) : 'null';

            case 'boolean':
            case 'null':

                // If the value is a boolean or null, convert it to a string. Note:
                // typeof null does not produce 'null'. The case is included here in
                // the remote chance that this gets fixed someday.

                return String(value);

            // If the type is 'object', we might be dealing with an object or an array or
            // null.

            case 'object':

                // Due to a specification blunder in ECMAScript, typeof null is 'object',
                // so watch out for that case.

                if (!value) {
                    return 'null';
                }

                // Make an array to hold the partial results of stringifying this object value.

                gap += indent;
                partial = [];

                // Is the value an array?

                if (Object.prototype.toString.apply(value) === '[object Array]') {

                    // The value is an array. Stringify every element. Use null as a placeholder
                    // for non-JSON values.

                    length = value.length;
                    for (i = 0; i < length; i += 1) {
                        partial[i] = str(i, value) || 'null';
                    }

                    // Join all of the elements together, separated with commas, and wrap them in
                    // brackets.

                    v = partial.length === 0
                        ? '[]'
                        : gap
                            ? '[\n' + gap + partial.join(',\n' + gap) + '\n' + mind + ']'
                            : '[' + partial.join(',') + ']';
                    gap = mind;
                    return v;
                }

                // If the replacer is an array, use it to select the members to be stringified.

                if (rep && typeof rep === 'object') {
                    length = rep.length;
                    for (i = 0; i < length; i += 1) {
                        if (typeof rep[i] === 'string') {
                            k = rep[i];
                            v = str(k, value);
                            if (v) {
                                partial.push(quote(k) + (gap ? ': ' : ':') + v);
                            }
                        }
                    }
                } else {

                    // Otherwise, iterate through all of the keys in the object.

                    for (k in value) {
                        if (Object.prototype.hasOwnProperty.call(value, k)) {
                            v = str(k, value);
                            if (v) {
                                partial.push(quote(k) + (gap ? ': ' : ':') + v);
                            }
                        }
                    }
                }

                // Join all of the member texts together, separated with commas,
                // and wrap them in braces.

                v = partial.length === 0
                    ? '{}'
                    : gap
                        ? '{\n' + gap + partial.join(',\n' + gap) + '\n' + mind + '}'
                        : '{' + partial.join(',') + '}';
                gap = mind;
                return v;
        }
    }

    this.stringify = function (value, replacer, space) {

        if(value !== null)
        {
            utils.runOnObjectRecursive(value, function(obj)
            {
                try
                {
                    if (obj.toJSON)
                    {
                        obj.toJSON = null;
                    }
                }
                catch(e)
                {
                    // Do nothing, just making sure that we dont have errors when calling from editor, and the toJSON property is not exposed so we cant override it.
                }

            });
        }

        // The stringify method takes a value and an optional replacer, and an optional
        // space parameter, and returns a JSON text. The replacer can be a function
        // that can replace values, or an array of strings that will select the keys.
        // A default replacer method can be provided. Use of the space parameter can
        // produce text that is more easily readable.

        var i;
        gap = '';
        indent = '';

        // If the space parameter is a number, make an indent string containing that
        // many spaces.

        if (typeof space === 'number') {
            for (i = 0; i < space; i += 1) {
                indent += ' ';
            }

            // If the space parameter is a string, it will be used as the indent string.

        } else if (typeof space === 'string') {
            indent = space;
        }

        // If there is a replacer, it must be a function or an array.
        // Otherwise, throw an error.

        rep = replacer;
        if (replacer && typeof replacer !== 'function' &&
            (typeof replacer !== 'object' ||
                typeof replacer.length !== 'number')) {
            throw new Error('stringify');
        }

        // Make a fake root object containing our value under the key of ''.
        // Return the result of stringifying the value.

        return str('', {
            '': value
        });
    };


    // If the JSON object does not yet have a parse method, give it one.

    this.parse = function (text, reviver) {

        // The parse method takes a text and an optional reviver function, and returns
        // a JavaScript value if the text is a valid JSON text.

        var j;

        function walk(holder, key) {

            // The walk method is used to recursively walk the resulting structure so
            // that modifications can be made.

            var k,
                v,
                value = holder[key];
            if (value && typeof value === 'object') {
                for (k in value) {
                    if (Object.prototype.hasOwnProperty.call(value, k)) {
                        v = walk(value, k);
                        if (v !== undefined) {
                            value[k] = v;
                        } else {
                            delete value[k];
                        }
                    }
                }
            }
            return reviver.call(holder, key, value);
        }

        // Parsing happens in four stages. In the first stage, we replace certain
        // Unicode characters with escape sequences. JavaScript handles many characters
        // incorrectly, either silently deleting them, or treating them as line endings.

        text = String(text);
        cx.lastIndex = 0;
        if (cx.test(text)) {
            text = text.replace(cx, function (a) {
                return '\\u' +
                    ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
            });
        }

        // In the second stage, we run the text against regular expressions that look
        // for non-JSON patterns. We are especially concerned with '()' and 'new'
        // because they can cause invocation, and '=' because it can cause mutation.
        // But just to be safe, we want to reject all unexpected forms.

        // We split the second stage into 4 regexp operations in order to work around
        // crippling inefficiencies in IE's and Safari's regexp engines. First we
        // replace the JSON backslash pairs with '@' (a non-JSON character). Second, we
        // replace all simple value tokens with ']' characters. Third, we delete all
        // open brackets that follow a colon or comma or that begin the text. Finally,
        // we look to see that the remaining characters are only whitespace or ']' or
        // ',' or ':' or '{' or '}'. If that is so, then the text is safe for eval.

        if (/^[\],:{}\s]*$/
                .test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, '@')
                    .replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']')
                    .replace(/(?:^|:|,)(?:\s*\[)+/g, ''))) {

            // In the third stage we use the eval function to compile the text into a
            // JavaScript structure. The '{' operator is subject to a syntactic ambiguity
            // in JavaScript: it can begin a block or an object literal. We wrap the text
            // in parens to eliminate the ambiguity.

            j = /*allowFunc*/eval('(' + text + ')');

            // In the optional fourth stage, we recursively walk the new structure, passing
            // each name/value pair to a reviver function for possible transformation.

            return typeof reviver === 'function'
                ? walk({
                    '': j
                }, '')
                : j;
        }

        // If the text is not JSON parseable, then a SyntaxError is thrown.

        throw new SyntaxError('parse');
    }
}

module.exports = WmJson;


/***/ }),

/***/ 2585:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

var log = (__webpack_require__(4480)/* .log */ .R);
var eventsListener = __webpack_require__(2640);

var EVENTS_NS = 'events';

function extend(apiObject) {
	if (!apiObject) {
		log('API object is not defined. Aborting.');
		return;
	}

	if (!apiObject[EVENTS_NS]) {
		apiObject[EVENTS_NS] = {};
	}

	apiObject[EVENTS_NS].on = eventsListener.on;
	log('WalkMeAPI extended.');
}

module.exports = extend;



/***/ }),

/***/ 5073:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

var getCtx = (__webpack_require__(1575)/* .getCtx */ .yK);
var eventMaps = [];
var map = {};

eventMaps.push(__webpack_require__(4071));
eventMaps.push(__webpack_require__(7480));
eventMaps.push(__webpack_require__(6187));
eventMaps.push(__webpack_require__(4192));
eventMaps.push(__webpack_require__(2663));
eventMaps.push(__webpack_require__(2918));
eventMaps.push(__webpack_require__(9801));
eventMaps.push(__webpack_require__(7452));
eventMaps.push(__webpack_require__(9028));
eventMaps.push(__webpack_require__(6165));
eventMaps.push(__webpack_require__(9349));
eventMaps.push(__webpack_require__(7151));

function mergeEventMaps() {
	var clone = (Object.assign) ? Object.assign : getCtx().get('CommonUtils').clone;

	eventMaps.forEach(function (currentMap) {
		clone(map, currentMap);
	});
}

mergeEventMaps();

module.exports = map;


/***/ }),

/***/ 6285:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

var getCtx = (__webpack_require__(1575)/* .getCtx */ .yK);
var log = (__webpack_require__(4480)/* .log */ .R);

function EventsApi() {
	var _this = this;
	_this.run = run;

	var eventsListener;

	function ctor() {
		eventsListener = getCtx().get('EventsListener');
	}

	function run() {
		log('Plugin started, waiting for WalkMe to be ready');
		eventsListener.on('BeforeWalkmeReady', function () {
			log('WalkMe ready, adding "events" to WalkMeAPI');
			__webpack_require__(2585)(window.WalkMeAPI);
			log('WalkMeAPI.events is ready for use');
		});
		return null;
	}

	ctor();
}

exports._ = EventsApi;



/***/ }),

/***/ 2640:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

var getCtx = (__webpack_require__(1575)/* .getCtx */ .yK);
var mapper = __webpack_require__(349);
var store = __webpack_require__(4139);

function Listener() {
	this.on = on;

	function on(name, handler) {
		if (!name) {
			throw new Error('WM event name cannot be empty');
		}

		if (!handler || typeof handler != 'function') {
			throw new Error('Handler must be function');
		}
		
		var siteConfig = getCtx().get('SiteConfigManager').get();
		var isMapperDisabled = siteConfig && siteConfig.Custom && siteConfig.Custom.eventsApi && siteConfig.Custom.eventsApi.disableEventsMapper;

		if (!mapper.getInternalName(name) && !isMapperDisabled) {
			throw new Error('"' + name + '" is not a WalkMe event');
		}

		return store.register(name, handler);
	}
}

module.exports = new Listener();



/***/ }),

/***/ 4480:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

var getCtx = (__webpack_require__(1575)/* .getCtx */ .yK);
var logger = getCtx().get('PrelibLogger');

function log() {
	var logRecord = Array().slice.call(arguments);
	logRecord.unshift('[ EventsApi ]');
	logger.write.apply(logger, logRecord);
}

exports.R = log;



/***/ }),

/***/ 205:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

var createPluginEntry = (__webpack_require__(1575)/* .createPluginEntry */ .mJ);

module.exports = createPluginEntry(function (registerPlugin) {
	var EventsApi = (__webpack_require__(6285)/* .EventsApi */ ._);

	registerPlugin(new EventsApi());
});



/***/ }),

/***/ 349:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

var getCtx = (__webpack_require__(1575)/* .getCtx */ .yK);
var log = (__webpack_require__(4480)/* .log */ .R);
var dtoMapper = __webpack_require__(5584);
var eventsMap = __webpack_require__(5073);

function Mapper() {
	this.getInternalName = getInternalName;
	this.mapEventParams = mapEventParams;

	function getInternalName(externalEventName) {
		return eventsMap[externalEventName] && eventsMap[externalEventName].libEventName;
	}

	function mapEventParams(externalEventName, eventData) {
		var siteConfig = getCtx().get('SiteConfigManager').get();
		var isMapperDisabled = siteConfig && siteConfig.Custom && siteConfig.Custom.eventsApi && siteConfig.Custom.eventsApi.disableEventsMapper;
		
		// dtoMapper expects the mapping to be wrapped under a 'map' property.
		var mapping = { map: eventsMap[externalEventName] && eventsMap[externalEventName].paramsMap };

		if (!mapping.map) {
			if (isMapperDisabled) {
				return eventData;
			} else {		
				var message = 'Event ' + externalEventName + " doesn't have mapping.";
				log(message);
				throw new Error(message);
			}
		}

		var externalData = dtoMapper.createDtoFromItem(mapping, eventData);

		// Because it's a dataTransferObject it add this property to move temporary data between objects
		// The customer shouldn't see this property
		delete externalData.temporaryAttributes;

		return externalData;
	}
}

module.exports = new Mapper();



/***/ }),

/***/ 4139:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

var getCtx = (__webpack_require__(1575)/* .getCtx */ .yK);
var log = (__webpack_require__(4480)/* .log */ .R);
var mapper = __webpack_require__(349);
var eventsBase = __webpack_require__(1582);

function Store() {
	var EXTERNAL_EVENT_NS = '.wmExternalEvent';
	var UNIQUE_EVENT_PREFIX = '.wmUniqueName';
	var _currentEventIndex = 0;

	this.register = register;

	function ctor() {
		cleanEventListenersOnRemoveWM();
	}

	function register(externalEventName, handler) {
		var internalEventName = mapper.getInternalName(externalEventName) || externalEventName;
		var namespacedEventName = getUniqueEventName(internalEventName);
		var wrappedHandler = getHandlerWrapper(externalEventName, handler);

		addInternalEventListener(namespacedEventName, wrappedHandler);
		log(externalEventName + ' registered to WalkMe events as ' + namespacedEventName);

		return getRemoveHandlerFunction(namespacedEventName);
	}

	function addInternalEventListener(eventName, handler) {
		eventsBase.on(eventName + EXTERNAL_EVENT_NS, handler);
	}

	function getUniqueEventName(eventName) {
		return eventName + UNIQUE_EVENT_PREFIX + _currentEventIndex++;
	}

	function getRemoveHandlerFunction(eventName) {
		return function () {
			log('Unregister ' + eventName + ' from WalkMe events');
			eventsBase.off(eventName);
		};
	}

	function getHandlerWrapper(externalEventName, handler) {
		return function (event, data, extraData) {
			try {
				var handlerParams = mapper.mapEventParams(externalEventName, { data: data, extraData: extraData });

				handler.apply(null, [handlerParams]);
			} catch (error) {
				log('Failed to invoke handler for ' + externalEventName, error);
			}
		};
	}

	function cleanEventListenersOnRemoveWM() {
		eventsBase.on(getCtx().get('Consts').EVENTS.BeforeWalkmeRemoved, function () {
			eventsBase.off(EXTERNAL_EVENT_NS);
			log('WalkMe removed. Clearing external event handlers');
		});
	}

	ctor.apply(this, arguments);
}

module.exports = new Store();



/***/ }),

/***/ 5584:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

var getCtx = (__webpack_require__(1575)/* .getCtx */ .yK);
var editorPageScriptSharedServices = __webpack_require__(7362);
var clone = getCtx().get('JsonUtils').clone;
var objectMapper = getCtx().get('ObjectMapper');

module.exports = new editorPageScriptSharedServices.servicesWithDependencies.dtoMapper(clone, objectMapper);



/***/ }),

/***/ 1582:
/***/ (function(module) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

module.exports = wmjQuery(_walkmeInternals);



/***/ }),

/***/ 1575:
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

/***/ 8100:
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
            CANT_INTERACT: 4,
            DIFFERENT_RESULTS: 5
        },
        TOOLTIPS: {
            "true-indicator": "The statement is true for the current user and page settings",
            "false-indicator": "The statement is not true for the current user and page settings",
            "not-defined-indicator": "Waiting. Complete the condition to evaluate the status",
            "cannot-assert-indicator": "The validity of this statement can only be assessed when played",
            "cannot-assert-context-error-indicator": "The validity of this statement cannot be determined because the related Switch Step cannot be played in current page",
            "cannot-interact-error-indicator": "The validity of this statement cannot be determined because we can't interact with this page",
            "different-results-indicator": "Different results from iframes"
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
    _indicatorClassMap[map.TYPES.DIFFERENT_RESULTS] = "different-results";

    return map;
}


/***/ }),

/***/ 8713:
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

/***/ 9819:
/***/ (function(module) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

function DefaultSelectors() {
    return {
        embedInContainerSelector: 'dialog[open], .modal-dialog .modal-content'
    };
}

module.exports = DefaultSelectors;


/***/ }),

/***/ 5433:
/***/ (function(module) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

function DeployableDefaultAttributes() {
    var zIndex = {
        simpleStep: 2147483630,
        popupStep: 2147483631,
        shoutOut: 2147483632,
        icon: 2147483627
    };

    zIndex.launcher = zIndex.icon;
    zIndex.smarttip = zIndex.icon;

    return {
        zIndex: zIndex
    };
}

module.exports = DeployableDefaultAttributes;


/***/ }),

/***/ 1106:
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

/***/ 1446:
/***/ (function(module) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

function DesignTemplateCategory() {
	return {
		AnnouncementBar: 0
	};
}

module.exports = DesignTemplateCategory;


/***/ }),

/***/ 3254:
/***/ (function(module) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

function DesignTemplateDefaultFieldText() {
    return {
        TITLE: 'Put your title here',
        CONTENT: 'Put your text here',
        ACTION_BUTTON: 'Action',
        CLOSE_BUTTON: 'Close',
        ACTION_PLACEHOLDER: 'Click Here',
        X_BUTTON: 'x',
        NEXT_BUTTON: 'Next',
        BACK_BUTTOM: 'Back'
    };
}

module.exports = DesignTemplateDefaultFieldText;


/***/ }),

/***/ 3242:
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

/***/ 823:
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

/***/ 8975:
/***/ (function(module) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */


function EditorCommunication() {

    var channels = {
        wmEvent: 'WMEvent',
        logs: 'WMLogs',
        routes: 'WMRoutes',
        actions: 'WMActions'
    }
    var communicators = {
        electronSocketIO: 'electronSocketIO',
        electronMainToRenderer: 'electronMainToRenderer',
        electronRendererToMain: 'electronRendererToMain',
        electronRendererToEditor: 'electronRendererToEditor',
        editorExtensionSocketIO: 'editorExtensionSocketIO',
        editorExtensionBackgroundToContent: 'editorExtensionBackgroundToContent',
        editorExtensionContentToBackground: 'editorExtensionContentToBackground',
        editorExtensionContentToPageScript: 'editorExtensionContentToPageScript',
        editorToElectron: 'editorToElectron',
        pageScriptToContent: 'pageScriptToContent'
    }

    var destinations = {
        electronMain: 'electronMain',
        electronRenderer: 'electronRenderer',
        editorExtensionBackground: 'editorExtensionBackground',
        editorExtensionContent: 'editorExtensionContent',
        allEditorExtensionContents: 'alleditorExtensionContents',
        pageScript: 'pageScript',
        allPageScripts: 'allPageScripts',
        editor: 'editor'
    }

    var extensionDownloader = {
        openUrl: 'openUrl',
        copyToClipboard: 'copyToClipboard'
    }

    var actions = {
        editorAPI: 'wm.editorAPI',
        takeScreenshot: 'takeScreenshot',
        executeDynamicAction: 'wm.executeDynamicAction',
        tabSelect: 'wm.TabSelect',
        tabClose: 'wm.TabClose',
        windowSelect: 'wm.WindowSelect',
        keyUp: 'wm.keyUp',
        topDomContentLoaded: 'wm.topDomContentLoaded',
        contentApiInit: 'contentScriptApi/init/all',
        contentApiDestroy: 'contentScriptApi/destroy/all',
        setDataEntry: 'dataService/setEntry/all',
        initFramescripts: 'INIT_FRAMESCRIPT',
        frameScriptCreated: 'wm.framescriptCreated',
        destroyFramescripts: 'DESTROY_FRAMESCRIPT',
        socketConnect: 'wm.socketConnect',
        socketDisconnect: 'wm.socketDisconnect',
        socketsConnected: 'wm.socketsConnected',
        socketsDisconnected: 'wm.socketsDisconnected',
        socketStatus: 'WM.socketStatus',
        getBrowserLeft: 'getBrowserLeft',
        openUrl: 'urlOpener',
        openUrlInNewTab: 'wm.openUrlInNewTab',
        maximizeBrowser: 'maximizeBrowser',
        minimizeBrowser: 'minimizeBrowser',
        restoreBrowser: 'restoreBrowser',
        focusBrowser: 'focusBrowser',
        log: 'log',
        appStart: 'wm.appStart',
        extensionDownloader: 'extensionDownloader',
        takeEditorScreenshot: 'wm.takeEditorScreenshot',
        shutdownEditorWindow: 'wm.shutdownEditorWindow',
        shutdownEditor: 'wm.shutdownEditor',
        reloadEditorWindow: 'wm.reloadEditorWindow',
        copyToClipboard: 'copyUrlToClipboard',
        updateLayoutButton: 'wm.updateLayoutButton',
        getEditorSize: 'wm.getEditorSize',
        authorized: 'WM.authorized',
        unauthorized: 'WM.unauthorized',
        authorize: 'WM.authorize',
        newConnection: 'wm.newConnection',
        customProtocolCalled: 'wm.customProtocolCalled',
        dockEditorWindow: 'dockEditorWindow',
        minimizeEditorWindow: 'minimizeEditorWindow',
        maximizeEditorWindow: 'maximizeEditorWindow',
        rearrangeLayout: 'rearrangeLayout',
        updateUserPreferences: 'wm.updateUserPreferences',
        activeSocketsChanged: 'wm.activeSocketsChanged',
        requestWorkMode: 'requestWorkMode',
        requestState: 'requestState',
        pageNotSynced: 'wm.PageNotSynced',
        afterLibInjectionToTopDocument: 'wm.afterLibInjectionToTopDocument',
        afterLibInjectedOnAnyDocument: 'wm.afterLibInjectedOnAnyDocument',
        libModeExited: 'wm.libModeExited',
        libRemoved: 'wm.libRemoved',
        errorHappened: 'wm.errorHappened',
        captureConfigChanged: 'wm.captureConfigChanged',
        beforeExecutingFlowStage: 'wm.libEvent.beforeExecutingFlowStage',
        afterExecutingFlowStage: 'wm.libEvent.afterExecutingFlowStage',
        changeWindowSize: 'wm.changeWindowSize',
        getVersions: 'wm.getVersions'
    }

    return {
        communicators: communicators,
        destinations: destinations,
        actions: actions,
        channels: channels,
        extensionDownloader: extensionDownloader
    };
}

module.exports = EditorCommunication;


/***/ }),

/***/ 1681:
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
        shoutout: 17,
        surveyMessage: 18
    };
}

module.exports = EntityType;


/***/ }),

/***/ 8442:
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

/***/ 4222:
/***/ (function(module) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

function OnPageActionType() {
    return {
        Click: 'Click',
        Tap: 'Tap',
        Hover: 'Hover',
        Swipe: 'Swipe',
        Focus: 'Focus',
        FillText: 'FillText',
        SelectListValue: 'SelectListValue'
    };
}

module.exports = OnPageActionType;


/***/ }),

/***/ 8998:
/***/ (function(module) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

function PublishEnvironment() {
    return {
        PRODUCTION: 0,
        PREVIEW: 1,
        TEST: 3,
        SUCCESS: 32
    };
}

module.exports = PublishEnvironment;



/***/ }),

/***/ 5901:
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

/***/ 7183:
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

/***/ 4771:
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

/***/ 3095:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

var conditionBuilderPreview = new (__webpack_require__(8100));
var drawablePosition = new (__webpack_require__(823));
var stepTrigger = new (__webpack_require__(7934));
var stepType = new (__webpack_require__(2568));
var entityType = new (__webpack_require__(1681));
var surveyQuestionType = new (__webpack_require__(6292));
var contentType = new (__webpack_require__(8713));
var designTemplateType = new (__webpack_require__(3242));
var smarttipMode = new (__webpack_require__(6407));
var stickinessType = new (__webpack_require__(4102));
var flowNodeType = new (__webpack_require__(8442));
var searchProvider = new (__webpack_require__(4771));
var screenshotMode = new (__webpack_require__(5901));
var scrollType = new (__webpack_require__(7183));
var deployableGroupType = new (__webpack_require__(1106));
var teachMeCompletionType = new (__webpack_require__(613));
var teachMeQuestionType = new (__webpack_require__(2807));
var templateEntityType = new (__webpack_require__(7911));
var designTemplateDefaultFieldText = new (__webpack_require__(3254));
var defaultSelectors = new (__webpack_require__(9819));
var editorCommunication  = new (__webpack_require__(8975));
var publishEnvironment = new (__webpack_require__(8998));
var userType = new (__webpack_require__(9721));
var onPageActionType = new (__webpack_require__(4222));
var designTemplateCategory = new (__webpack_require__(1446));
var deployableDefaultAttributes = new (__webpack_require__(5433));

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
    templateEntityType: templateEntityType,
    designTemplateDefaultFieldText: designTemplateDefaultFieldText,
    defaultSelectors: defaultSelectors,
    editorCommunication: editorCommunication,
    publishEnvironment: publishEnvironment,
    userType: userType,
    onPageActionType: onPageActionType,
	designTemplateCategory: designTemplateCategory,
    deployableDefaultAttributes : deployableDefaultAttributes
};



/***/ }),

/***/ 6407:
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

/***/ 7934:
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

/***/ 2568:
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

/***/ 4102:
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

/***/ 6292:
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

/***/ 613:
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

/***/ 2807:
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

/***/ 7911:
/***/ (function(module) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

function TemplateEntityType() {
    return {
        balloon: 0,
        popup: 17
    };
}

module.exports = TemplateEntityType;


/***/ }),

/***/ 9721:
/***/ (function(module) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

function UserType() {
    return {
        NO_MATCH: null,
        INTERNAL: 0,
        PAYING: 1,
        SE: 2,
        USED_TO_BE_PAYING: 3,
        USED_TO_BE_SE: 4
    };
}

module.exports = UserType;



/***/ }),

/***/ 7151:
/***/ (function(module) {

"use strict";
module.exports = /*#__PURE__*/JSON.parse('{"BalloonCreated":{"libEventName":"BalloonCreated","paramsMap":{"data.PageElement":"pageElement"}},"BackButtonClicked":{"libEventName":"BackButtonClicked","paramsMap":{}},"NextButtonClicked":{"libEventName":"NextButtonClicked","paramsMap":{}},"DoneButtonClicked":{"libEventName":"DoneButtonClicked","paramsMap":{}},"BBCodeLinkClicked":{"libEventName":"BBCodeLinkClicked","paramsMap":{"data.Src":"url"}}}');

/***/ }),

/***/ 4192:
/***/ (function(module) {

"use strict";
module.exports = /*#__PURE__*/JSON.parse('{"GoalCompleted":{"libEventName":"GoalCompleted","paramsMap":{"data.GoalId":"id","data.GoalName":"name","data.goal.RelatedObjectId":"relatedObjectId"}}}');

/***/ }),

/***/ 6165:
/***/ (function(module) {

"use strict";
module.exports = /*#__PURE__*/JSON.parse('{"LauncherShown":{"libEventName":"LauncherIsShown","paramsMap":{"extraData.launcherId":"id","extraData.name":"name","extraData.launcherData.Settings.action.actionType":"actionType"}},"LauncherClicked":{"libEventName":"wmLauncherClicked","paramsMap":{"data.launcherId":"id"}}}');

/***/ }),

/***/ 4071:
/***/ (function(module) {

"use strict";
module.exports = /*#__PURE__*/JSON.parse('{"PlayerInitComplete":{"libEventName":"PlayerInitComplete","paramsMap":{}}}');

/***/ }),

/***/ 9349:
/***/ (function(module) {

"use strict";
module.exports = /*#__PURE__*/JSON.parse('{"TaskCompleted":{"libEventName":"TaskCompleted","paramsMap":{"data.TaskId":"id"}},"TasksLoaded":{"libEventName":"TasksLoaded","paramsMap":{}}}');

/***/ }),

/***/ 9801:
/***/ (function(module) {

"use strict";
module.exports = /*#__PURE__*/JSON.parse('{"ResourceStarted":{"libEventName":"ActivatingContent","paramsMap":{"data.content.Id":"id","data.content.Name":"name","data.content.Url":"url"}}}');

/***/ }),

/***/ 9028:
/***/ (function(module) {

"use strict";
module.exports = /*#__PURE__*/JSON.parse('{"ShoutOutEngagement":{"libEventName":"ShoutOutClosed","paramsMap":{"data.clickType":"actionType","data.shoutOut.Id":"id","data.shoutOut.Name":"name"}}}');

/***/ }),

/***/ 2918:
/***/ (function(module) {

"use strict";
module.exports = /*#__PURE__*/JSON.parse('{"ShuttleStarted":{"libEventName":"ActivatingShuttle","paramsMap":{"data.shuttle.Id":"id","data.shuttle.Name":"name","data.shuttle.DestinationUrl":"destinationUrl"}}}');

/***/ }),

/***/ 2663:
/***/ (function(module) {

"use strict";
module.exports = /*#__PURE__*/JSON.parse('{"SurveyStarted":{"libEventName":"StartSurvey","paramsMap":{"data.surveyJson.Id":"id","data.surveyJson.Name":"name"}},"SurveySubmitted":{"libEventName":"SurveyCompleted","paramsMap":{"data.status":"status","data.id":"id","data.name":"name","data.answers":"answers"}}}');

/***/ }),

/***/ 6187:
/***/ (function(module) {

"use strict";
module.exports = /*#__PURE__*/JSON.parse('{"SwtStarted":{"libEventName":"FlowStarted","paramsMap":{"data.businessSolutionId":"swtId","data.flowId":"flowId","data.businessSolutionName":"swtName"}},"SwtStopped":{"libEventName":"FlowStopped","paramsMap":{"data.businessSolutionId":"swtId","data.flowId":"flowId","data.businessSolutionName":"swtName","data.wasClosedByUser":"wasClosedByUser"}},"SwtCompleted":{"libEventName":"FlowCompleted","paramsMap":{"data.businessSolutionId":"swtId","data.flowId":"flowId","data.businessSolutionName":"swtName"}},"SwtStepShown":{"libEventName":"UIFlowStageShown","paramsMap":{"data.businessSolutionId":"swtId","data.flowId":"flowId","data.businessSolutionName":"swtName","data.id":"stepId","data.uiElementId":"balloonId"}},"SwtButtonClicked":{"libEventName":"AfterCompletingFlowStage","paramsMap":{"data.businessSolutionId":"swtId","data.businessSolutionName":"swtName","data.uiElementId":"balloonId","data.stageId":"stepId","data.isFlowGoingBack":"isBack","data.nextStageId":"nextStepId","data.flowId":"flowId"}}}');

/***/ }),

/***/ 7452:
/***/ (function(module) {

"use strict";
module.exports = /*#__PURE__*/JSON.parse('{"ActivateFromMenu":{"libEventName":"createActivatable","paramsMap":{"data.id":"id","data.type":"objectType"}},"MenuTabSelected":{"libEventName":"MenuTabSelected","paramsMap":{"data.context.textContent":"tabName"}},"WalkMeObjectStarted":{"libEventName":"DeployableCreated","paramsMap":{"data.deployableType":"objectType","data.deployable.Id":"id","data.deployable.Name":"name"}},"BeforeMenuOpen":{"libEventName":"BeforeMenuOpen","paramsMap":{}},"AfterMenuOpen":{"libEventName":"AfterMenuOpen","paramsMap":{}},"BeforeMenuClose":{"libEventName":"BeforeMenuClose","paramsMap":{}},"AfterMenuClose":{"libEventName":"AfterMenuClose","paramsMap":{}},"WalkthruSelectedInMenu":{"libEventName":"WalkthruSelected","paramsMap":{"data.WalkthruId":"id"}},"MenuShow":{"libEventName":"MenuShow","paramsMap":{}},"MenuHide":{"libEventName":"MenuHide","paramsMap":{}}}');

/***/ }),

/***/ 7480:
/***/ (function(module) {

"use strict";
module.exports = /*#__PURE__*/JSON.parse('{"WalkthruStarted":{"libEventName":"StartNewWt","paramsMap":{"data.Id":"id","data.Name":"name"}},"WalkthruStopped":{"libEventName":"TutorialStopped","paramsMap":{"data.Id":"id","data.StepId":"stepId"}},"WalkthruCompleted":{"libEventName":"WalkthruCompleted","paramsMap":{"data.Id":"id","data.Name":"mame"}},"WalkthruStepShown":{"libEventName":"NewStepShown","paramsMap":{"data.Id":"id","data.TutorialId":"walkthruId"}},"WalkthruFailedToStart":{"libEventName":"WalkthruFailedToStart","paramsMap":{"data.tutorial.Id":"id","data.tutorial.Name":"name","data.Step.Id":"failedStepId"}},"WalkthruAborted":{"libEventName":"WalkthruAborted","paramsMap":{}},"UserStoppedWalkthru":{"libEventName":"UserStoppedWalkthru","paramsMap":{}},"UserStoppedWalkthruAfterStop":{"libEventName":"UserStoppedWalkthruAfterStop","paramsMap":{}}}');

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
/******/ 	var __webpack_exports__ = __webpack_require__(6888);
/******/ 	wmbundle = __webpack_exports__;
/******/ 	
/******/ })()
;
/* WalkMe Module */ return wmbundle; })
//# sourceMappingURL=bundle.js.map
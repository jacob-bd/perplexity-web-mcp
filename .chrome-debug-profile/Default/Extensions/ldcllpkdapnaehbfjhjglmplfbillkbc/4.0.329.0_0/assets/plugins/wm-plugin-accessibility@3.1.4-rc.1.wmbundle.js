/* WalkMe Module */ typeof _walkmeInternals !== 'undefined' && _walkmeInternals.wmloader && _walkmeInternals.wmloader.define('wm-plugin-accessibility@3.1.4-rc.1@prelib', {"name":"wm-plugin-accessibility","version":"3.1.4-rc.1","toolbelt":"2.0.2","packageDate":"2025-05-07T16:34:21.446Z","entry":"prelib"}, function (__wmplugin__) {  
var wmbundle;
/******/ (function() { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 337:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

module.exports = __webpack_require__(2082);



/***/ }),

/***/ 6995:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

var getCtx = (__webpack_require__(8912)/* .getCtx */ .yK);
var tabIndexHandler = __webpack_require__(4530);

function Accessibility() {
	var _this = this;
	_this.run = run;

	var eventsListener;
	var logger;
	var eventHandlerBindingManager;

	function ctor() {
		eventsListener = getCtx().get('EventsListener');
		logger = getCtx().get('PrelibLogger');
        eventHandlerBindingManager = getCtx().get('EventHandlerBindingManager');
	}

	function run() {
        tabIndexHandler.overrideAddTabIndexIfNeeded();

		eventsListener.once('wm_walkmeLibLoaded', init);
        eventsListener.once('removeWalkMe', eventHandlerBindingManager.unbindAll);

		return null;
	}

	function init() {
		getCtx().get('WmAccessibilityInitializer').init();
	}

	ctor();
}

exports.h = Accessibility;



/***/ }),

/***/ 6371:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

var getCtx = (__webpack_require__(8912)/* .getCtx */ .yK);

getCtx().register('AccessibilityConsts')
    .asCtor(AccessibilityConsts)
    .dependencies('Consts');

function AccessibilityConsts(libConsts) {
    var _this = this;

    var _libEvents = libConsts.EVENTS;
    var _smartTipLibEvents = _libEvents.SmartTips;
    var _launcherLibEvents = _libEvents.Launchers;
    var _surveyLibEvents = _libEvents.Surveys;
    var _walkthruLibEvents = _libEvents.Walkthrus;

    _this.KEY_CODES = {
        TAB : 9,
        ENTER: 13
    };

    _this.ELEMENTS_SELECTORS = {
        SMART_TIP: {
            tooltip: ".walkme-tooltip-outer-div"
        },
        BALLOON: {
            stepCounter: ".walkme-custom-balloon-subtext"
        },
        SHOUTOUT: {
            container: ".wm-shoutout"
        }
    };

    _this.ELEMENT_TYPES_PREFIX = {
        smartTipIcon: 'walkme-icon-position-smartTip-id-',
        smartTipTooltip: 'walkme-tooltip-smarttip-',
        survey: 'walkme-survey-id-',
        shoutout: 'wm-shoutout-',
        launcher: 'walkme-launcher-id-'
    };

    _this.FOCUSABLE_SELECTORS = {
        SURVEY : {
            QUESTION_NUMBER: '.walkme-survey-question-count',
            BUTTON: '.walkme-custom-balloon-button',
            CLOSE_LINK: '.walkme-custom-balloon-close-button'
        }
    };

    _this.PARTIAL_SELECTORS = {
        SURVEY : {
            TITLE: 'walkme-survey-title',
            QUESTION: 'walkme-survey-question',
            QUESTION_TITLE: 'walkme-survey-question-title',
            QUESTION_SUB_TITLE: 'walkme-survey-question-sub-title',
            QUESTION_ANSWERS: 'walkme-survey-answer'
        }
    };

    _this.EVENTS = {
        SURVEY : {
            SurveyBalloonDisplayed : _surveyLibEvents.SurveyBalloonDisplayed,
            SurveyQuestionCountSet : _surveyLibEvents.SurveyQuestionCountSet,
            SurveyClosed : _surveyLibEvents.SurveyClosed,
            RatingCommentGenerated: _surveyLibEvents.RatingCommentGenerated
        },
        MENU : {
            MenuBuilt: _libEvents.WidgetMenu.MenuBuilt,
            AfterMenuClose : "AfterMenuClose",
            MenuCloseButtonClick: "MenuCloseButtonClick"
        },
        BALLOON: {
            BeforeBalloonRedraw: _walkthruLibEvents.BeforeBalloonRedraw,
            BalloonShown: _libEvents.BalloonShown,
            DestroyStepBalloon : _walkthruLibEvents.DestroyStepBalloon,
            BalloonCreated: _libEvents.BalloonCreated,
            BalloonStartShow: _libEvents.BalloonStartShow,
            FirstStepNotAvailable: _libEvents.FirstStepNotAvailable,
            FirstStepNotAvailableBalloonClosed: _libEvents.FirstStepNotAvailableBalloonClosed
        },
        WALKTHRU: {
            NewStepShown: _walkthruLibEvents.StepShown
        },
        FLOW: {
            UIFlowStageShown: _libEvents.Flows.UIFlowStageShown
        },
        RESOURCE: {
            LightBoxDivCreated : _libEvents.LightBoxDivCreated,
            LightBoxDivCentered: _libEvents.LightBoxDivCentered,
            ContentRemoved : _libEvents.ContentRemoved,
            ActivatingContent: _libEvents.Contents.ActivatingContent
        },
        SHOUTOUT: {
            ShoutoutDisplayed: "show-end",
            ShoutOutClosed : _libEvents.ShoutOutClosed
        },
        LAUNCHER: {
            LauncherIsShown: _launcherLibEvents.LauncherIsShown,
            DisplayLauncher: _launcherLibEvents.DisplayLauncher,
            HideLauncher: _launcherLibEvents.HideLauncher,
            LauncherDestroyed: "LauncherDestroyed"
        },
        SMART_TIP: {
            SmartTipElementShown: _smartTipLibEvents.SmartTipElementShown,
            SmartTipElementRemoved: _smartTipLibEvents.SmartTipElementRemoved,
            SmartTipIconShown: _smartTipLibEvents.SmartTipIconShown,
            SmartTipIconDestroyed: _smartTipLibEvents.SmartTipIconDestroyed,
            SmartTipTooltipShown: _smartTipLibEvents.TooltipShown,
            SmartTipTooltipDestroyed: _smartTipLibEvents.SmartTipTooltipDestroyed
        },
        SHUTTLE: {
            ActivatingShuttle: _libEvents.Shuttles.ActivatingShuttle
        },
        LIVE_CHAT: {
            LiveChatClicked : _libEvents.LiveChat.LiveChatClicked
        }
    };

    _this.FEATURES = {
        DisableSmartTipsAccessibility : "disableSmartTipsAccessibility",
        RaiseFocusEvent : "raiseFocusEvent",
        AutoFocusRing: "autoFocusRing"
    };

    _this.DEFAULT_TEXT_KEY = {
        Close: 'Close',
        ShoutOut: 'ShoutOut',
        StepBalloon: 'StepBalloon',
        QuestionInfoText: 'QuestionInfoText',
        LastInputValid: 'LastInputValid',
        EndOfPage: 'EndOfPage',
        BeginningOfPage: 'BeginningOfPage',
        GuidanceAvailable: 'GuidanceAvailable',
        PreviousFieldInvalid: 'PreviousFieldInvalid',
        PreviousFieldValid: 'PreviousFieldValid',
        WalkMeThroughLauncher: 'WalkMeThroughLauncher',
        ShowMeHowLauncher: 'ShowMeHowLauncher',
        InfoLauncher: 'InfoLauncher',
        VLauncher: 'VLauncher',
        QuestionLauncher: 'QuestionLauncher',
        ErrorLauncher: 'ErrorLauncher',
        ArrowLauncher: 'ArrowLauncher',
        MandatoryNoneLauncher: 'MandatoryNoneLauncher',
        MandatoryActionLauncher: 'MandatoryActionLauncher',
        RoundQuestionMarkLauncher: 'RoundQuestionMarkLauncher',
        OpenInNewTab: 'OpenInNewTab',
        UntitledIframe: 'UntitledIframe'
    };

    _this.TEXTS = {
        Close: 'close',
        ShoutOut: 'Popup',
        StepBalloon: 'Guidance balloon',
        QuestionInfoText: 'Question {0} of {1}',
        LastInputValid: 'Your last input is valid',
        EndOfPage: 'end of page',
        BeginningOfPage: 'beginning of page',
        GuidanceAvailable: 'Guidance available for this field, click tab to explore',
        PreviousFieldInvalid: 'Please return to field to resolve',
        PreviousFieldValid: 'Previous field is valid',
        WalkMeThroughLauncher: 'Walk Me Through',
        ShowMeHowLauncher: 'Show Me How',
        InfoLauncher: 'Info',
        VLauncher: 'Check',
        QuestionLauncher: 'Help',
        ErrorLauncher: 'Warning',
        ArrowLauncher: 'Go',
        MandatoryNoneLauncher: 'Mandatory',
        MandatoryActionLauncher: 'More details available',
        RoundQuestionMarkLauncher: 'Help',
        OpenInNewTab: 'open in new tab',
        UntitledIframe: 'untitled'
    };

    _this.SETTINGS_TRANSLATIONS_TEXTS_KEYS = {
        Close: 'close'
    };

    _this.DEPLOYABLE_TYPES = {
        WT : "WT",
        SWT: "SWT",
        resource: "resource",
        shoutout : "shoutout",
        survey: "survey",
        menu: "menu",
        launcher: "launcher",
        smartTipIcon: "smartTipIcon",
        smartTipTooltip: "smartTipTooltip"
    };

    _this.DIRECTIONS = {
        back : -1,
        next : 1
    };

    _this.DUMMY_ELEMENT_ID_PREFIX = 'wm-dummy-index-element-';

    _this.FOCUS_TRACKING_ELEMENTS_TYPES = {
        step : "step",
        popup : "popup",
        resource : "resource",
        shoutout : "shoutout",
        survey : "survey",
        menu : "menu"
    }
}



/***/ }),

/***/ 1:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

var getCtx = (__webpack_require__(8912)/* .getCtx */ .yK);

getCtx().register('FocusEventDispatcher')
    .asCtor(FocusEventDispatcher)
    .dependencies('FeaturesManager, AccessibilityConsts');

function FocusEventDispatcher(featuresManager, accessibilityConsts) {
    var _this = this;

    _this.dispatch = dispatch;

    function dispatch(domElement) {
        if (featuresManager.isFeatureEnabled(accessibilityConsts.FEATURES.RaiseFocusEvent) && FocusEvent) {
            try {
                var focusEvent = new FocusEvent('focus', {
                    relatedElement: domElement
                });

                domElement.dispatchEvent(focusEvent);
            }
            catch(e) {
            }
        }
    }
}


/***/ }),

/***/ 1944:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

var getCtx = (__webpack_require__(8912)/* .getCtx */ .yK);

getCtx().register('EventHandlerBindingManager')
    .asCtor(EventHandlerBindingManager)
    .dependencies("EventsListener");

function EventHandlerBindingManager(eventsListener) {
    var _this = this;

    _this.bind = bind;
    _this.unbindAll = unbindAll;
    _this.unbindSpecificByElement = unbindSpecificByElement;
    _this.unbindSpecificByElementSelector = unbindSpecificByElementSelector;

    var _eventHandlersToUnbind;

    function ctor() {
        _eventHandlersToUnbind = {};
    }

    function bind(eventName, handler, jqueryElement) {
        if (jqueryElement) {
            bindToJqueryElement(jqueryElement, eventName, handler);
        }
        else {
            eventsListener.on(eventName, handler);
        }
    }

    function bindToJqueryElement(jqueryElement, eventName, handler) {
        var handlersForEventName = _eventHandlersToUnbind[eventName];

        if (handlersForEventName) {
            for (var i = 0; i < handlersForEventName.length; i++) {
                var currEventHandlerData = handlersForEventName[i];

                if (compareEventHandlerData(currEventHandlerData, jqueryElement, handler)) {
                    return;
                }
            }
        }

        addEventHandlerData(jqueryElement, eventName, handler);
        jqueryElement.on(eventName, handler);
    }

    function compareEventHandlerData(eventHandlerData, element, handler) {
        return eventHandlerData.element.is(element) &&
            eventHandlerData.handler === handler;
    }

    function addEventHandlerData(jqueryElement, eventName, handler) {
        if (!_eventHandlersToUnbind[eventName]) {
            _eventHandlersToUnbind[eventName] = [];
        }

        _eventHandlersToUnbind[eventName].push({
            element: jqueryElement,
            handler: handler
        });
    }

    function unbindAll() {
        for (var eventName in _eventHandlersToUnbind) {
            var handlersForEventName = _eventHandlersToUnbind[eventName];

            for (var i = 0; i < handlersForEventName.length; i++) {
                var currEventHandlerData = handlersForEventName[i];
                currEventHandlerData.element.off(eventName, currEventHandlerData.handler);
            }
        }

        _eventHandlersToUnbind = {};
    }

    function unbindSpecificByElementSelector(elementSelector, eventName, handler) {
        unbindSpecific(elementSelector, eventName, handler);
    }

    function unbindSpecificByElement(jqueryElement, eventName, handler) {
        unbindSpecific(jqueryElement, eventName, handler);
    }

    function unbindSpecific(element, eventName, handler) {
        var eventHandlerIndex;
        var handlersForEventName = _eventHandlersToUnbind[eventName];

        if (!handlersForEventName) {
            return;
        }

        for (var i = 0; i < handlersForEventName.length; i++) {
            var currEventHandlerData = handlersForEventName[i];

            if (compareEventHandlerData(currEventHandlerData, element, handler)) {
                eventHandlerIndex = i;
                break;
            }
        }

        if (eventHandlerIndex === undefined) {
            return;
        }

        var currEventHandlerData = handlersForEventName[eventHandlerIndex];
        currEventHandlerData.element.off(eventName, currEventHandlerData.handler);
        handlersForEventName.splice(eventHandlerIndex, 1);
    }

    ctor();
}


/***/ }),

/***/ 9377:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

var getCtx = (__webpack_require__(8912)/* .getCtx */ .yK);
getCtx().register('DummyTabOrganizer')
    .asCtor(DummyTabOrganizer)
    .dependencies('DefaultTextGetter, Positions, EventHandlerBindingManager, AccessibilityUtils, AccessibilityConsts, HostData, wmjQuery,' +
        'ElementEmbedderFactory, Consts, DomManager, JQueryElementFinder');

function DummyTabOrganizer(defaultTextGetter, positions, eventHandlerBindingManager, accessibilityUtils, accessibilityConsts, hostData, wmjQuery,
                           elementEmbedderFactory, consts, domManager, jQueryElementFinder) {
    var _this = this;
    _this.createDummyElement = createDummyElement;
    _this.showDummy = showDummy;
    _this.hideDummy = hideDummy;
    _this.removeDummy = removeDummy;
    _this.focusNearDummy = focusNearDummy;
    _this.isDummyTabOrganizer = isDummyTabOrganizer;

    var DUMMY_ELEMENT_ID_PREFIX = accessibilityConsts.DUMMY_ELEMENT_ID_PREFIX;

    var _isIE;

    function ctor() {
        _isIE = hostData.isIEBrowser();
    }

    function createDummyElement(deployableType, deployableId, position, pageElement, display, deployableRoles) {
        var dummyElementId = getDummyElementId(deployableType, deployableId);
        var dummyElement = wmjQuery("#" + dummyElementId);

        if (!dummyElement.length) {
            dummyElement = createElement(dummyElementId);
            
            if (deployableRoles.dummyElement) {
                dummyElement.attr('role', deployableRoles.dummyElement);
            } 
        }

        dummyElement.css("display", display ? display : "block");

        var embedder = elementEmbedderFactory.get(pageElement, true, true);
        return embedder.embed(dummyElement, consts.POSITION_PERIMETER_TYPE.Inside, position, undefined, { isInvisible : true }).then(function() {
            var elementWrapper = embedder.getElement();
            dummyElement = elementWrapper.getOriginElement();

            eventHandlerBindingManager.bind("focus", onDummyElementFocus, dummyElement);
            _isIE && eventHandlerBindingManager.bind("focusout", onDummyElementFocusOut, dummyElement);

            return dummyElement;
        });
    }

    function createElement(dummyElementId) {
        return domManager.parseElementAsJquery('<div id="' + dummyElementId + '" class="walkme-to-destroy" tabindex="0" style="width: 1px;position: absolute;left: -10000px;"></div>');
    }

    function getDummyElementId(deployableType, deployableId) {
        return DUMMY_ELEMENT_ID_PREFIX + deployableType + '-' + deployableId;
    }

    function getDummyElementSelector(deployableType, deployableId) {
        return "div#" + getDummyElementId(deployableType, deployableId);
    }

    function onDummyElementFocus(event) {
        var dummyElement = wmjQuery(this);
        _isIE && eventHandlerBindingManager.unbindSpecificByElement(dummyElement, 'focus', onDummyElementFocus);

        if (event.useOriginalFocus) {
            return;
        }

        var dummyElementId = dummyElement.attr("id");
        var deployableDetailsString = dummyElementId.substring(DUMMY_ELEMENT_ID_PREFIX.length);

        if (!deployableDetailsString) {
            return;
        }

        var deployableDetails = deployableDetailsString.split('-');
        var deployableType = deployableDetails[0];
        var deployableId = deployableDetails[1];
        var deployableElement = jQueryElementFinder.findElementsByjQueryComplexSelector("." + getDeployableTypePrefix(deployableType) + deployableId);
        var elementToFocusTo = deployableElement.is(":focusable") ? deployableElement : wmjQuery(deployableElement.find(":tabbable")[0]);

        if (!elementToFocusTo.length) {
            return;
        }

        elementToFocusTo.focus();
        event.preventDefault();
        event.stopPropagation();
    }

    function getDeployableTypePrefix(deployableType) {
        return accessibilityConsts.ELEMENT_TYPES_PREFIX[deployableType];
    }

    function onDummyElementFocusOut() {
        eventHandlerBindingManager.bind("focus", onDummyElementFocus, wmjQuery(this));
    }

    function showDummy(deployableType, deployableId) {
        dummyElementAction(deployableType, deployableId, "show");
    }

    function hideDummy(deployableType, deployableId) {
        dummyElementAction(deployableType, deployableId, "hide");
    }

    function removeDummy(deployableType, deployableId) {
        var dummyElementSelector = getDummyElementSelector(deployableType, deployableId);
        eventHandlerBindingManager.unbindSpecificByElementSelector(dummyElementSelector, 'focus', onDummyElementFocus);
        _isIE && eventHandlerBindingManager.unbindSpecificByElementSelector(dummyElementSelector, 'focusout', onDummyElementFocusOut);
        dummyElementAction(deployableType, deployableId, "remove");
    }

    function dummyElementAction(deployableType, deployableId, actionName) {
        var dummyElement = jQueryElementFinder.findElementsByjQueryComplexSelector(getDummyElementSelector(deployableType, deployableId));
        dummyElement[actionName]();
    }

    function focusNearDummy(deployableType, deployableId, direction, orderedTabbableElements) {
        var dummyElement = jQueryElementFinder.findElementsByjQueryComplexSelector(getDummyElementSelector(deployableType, deployableId));
        var dummyElementIndex = orderedTabbableElements.index(dummyElement);
        var indexToFocusTo = dummyElementIndex + direction;

        var isEdgeElement = indexToFocusTo === -1 || indexToFocusTo === orderedTabbableElements.length;

        if (isEdgeElement) {
            indexToFocusTo = dummyElementIndex;
            accessibilityUtils.announce(defaultTextGetter.getValue(indexToFocusTo === 0 ? accessibilityConsts.DEFAULT_TEXT_KEY.BeginningOfPage : accessibilityConsts.DEFAULT_TEXT_KEY.EndOfPage));
        }

        var elementToFocusTo = orderedTabbableElements[indexToFocusTo];

        var focusEvent = wmjQuery.Event('focus', {
            useOriginalFocus: isEdgeElement
        });

        wmjQuery(elementToFocusTo).trigger(focusEvent);
    }

    function isDummyTabOrganizer(element, deployableType, deployableId) {
        return element.is(getDummyElementSelector(deployableType, deployableId));
    }

    ctor();
}



/***/ }),

/***/ 8161:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

var getCtx = (__webpack_require__(8912)/* .getCtx */ .yK);

getCtx().register('FocusTracker')
    .asCtor(FocusTracker)
    .dependencies('ElementsGetter, AccessibilityConsts, EventsListener, WmAccessibilityCommonUtils, wmjQuery, AccessibilityLogger,SiteConfigManager');

function FocusTracker(elementsGetter, accessibilityConsts, eventsListener, wmAccessibilityCommonUtils, wmjQuery, logger,siteConfigManager) {
    var _this = this;
    _this.addToStack = addToStack;
    _this.addToBottomOfStack = addToBottomOfStack;
    _this.focus = focus;

    var _elementsSettingsStack = [];
    var FOCUS_TRACKING_ELEMENTS_TYPES = accessibilityConsts.FOCUS_TRACKING_ELEMENTS_TYPES;
    var CONTINUES_ORIGIN_TYPES = [FOCUS_TRACKING_ELEMENTS_TYPES.step, FOCUS_TRACKING_ELEMENTS_TYPES.popup, FOCUS_TRACKING_ELEMENTS_TYPES.survey];

    function addToStack(element, originType) {
        var lastElementSettings = _elementsSettingsStack[_elementsSettingsStack.length - 1];

        if (lastElementSettings && wmjQuery.inArray(lastElementSettings.originType, CONTINUES_ORIGIN_TYPES)  !== -1) {
            if (originType === FOCUS_TRACKING_ELEMENTS_TYPES.step) {
                _elementsSettingsStack.pop();
            } else if (originType === FOCUS_TRACKING_ELEMENTS_TYPES.popup || originType === FOCUS_TRACKING_ELEMENTS_TYPES.survey) {
                return;
            }
        }

        logger.write("Add focus tracking for originType " + originType);

        _elementsSettingsStack.push({
            element: element,
            originType: originType
        });
    }

    // Used in cases where the elements' appearance order is different from the interaction order
    function addToBottomOfStack(element, originType, elementBeforeLast) {
        if (!isStackEmpty()) {
            _elementsSettingsStack[0].element = elementBeforeLast;
        }

        logger.write("Add focus tracking at bottom of stack for originType " + originType);

        _elementsSettingsStack.unshift({
            element: element,
            originType: originType
        });
    }

    function focus() {
        logger.write("Start search for element to focus to");

        while(!isStackEmpty()) {
            var currElementSettings = _elementsSettingsStack.pop();
            var elementToFocusTo = wmjQuery(currElementSettings.element);

            if (!wmAccessibilityCommonUtils.isElementOnScreen(elementToFocusTo)) {
                logger.write("Element to focus to not on screen");
            } else {
                var focusableElement = elementToFocusTo;

                if (!elementToFocusTo.is(":focusable")) {
                    logger.write("Element to focus to not focusable");

                    if (elementToFocusTo.is('#walkme-player')) {
                        logger.write("Element to focus to is widget player");

                        eventsListener.once('PlayerShow', function() {
                            applyFocus(elementToFocusTo, currElementSettings.originType);
                        });

                        break;
                    }
                    else if (elementToFocusTo.is("body")) {
                        logger.write("Element to focus to is body");

                        if (!isStackEmpty()) {
                            logger.write("Body is not the last element to focus to in stack");
                            continue;
                        }

                        focusableElement = getFirstTabbableElement();
                    }
                    else {
                        logger.write("Check if element to focus to has focusable children");

                        var focusableChildren = elementToFocusTo.find(":focusable");
                        focusableElement = focusableChildren.length ? wmjQuery(focusableChildren[0]) : getFirstTabbableElement();
                    }
                }

                applyFocus(focusableElement, currElementSettings.originType);
                break;
            }
        }
    }

    function getFirstTabbableElement() {
        logger.write("Find first tabbable element to focus to");
        var defultElmens = siteConfigManager.get().Custom.defaultFirstElementForFocus;

        if (defultElmens) {
            for (var selectorIndex = 0; selectorIndex < defultElmens.length; selectorIndex++) {
                var element = wmjQuery(defultElmens[selectorIndex])[0];

                if (element) {
                    return element;
                }
            }
        }

        var tabbableElements = elementsGetter.getAllTabbablesOnPageOrdered();
        return wmjQuery(tabbableElements[0]);
    }

    function applyFocus(focusableElement, originType) {
        if (originType === FOCUS_TRACKING_ELEMENTS_TYPES.step) {
            _elementsSettingsStack = [];
        }

        logger.write("Element to focus to found for originType " + originType);

        focusableElement && focusableElement.focus();
    }

    function isStackEmpty() {
        return _elementsSettingsStack.length === 0;
    }
}



/***/ }),

/***/ 9405:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

var getCtx = (__webpack_require__(8912)/* .getCtx */ .yK);

getCtx().register('BallonCreatedAccessibilityHandler')
	.asCtor(BallonCreatedAccessibilityHandler)
	.dependencies('WmAccessibilityCommonUtils, CommonUtils, Lib, FeaturesManager, StepDataGetter,' +
        'AriaAttributesSetter, DialogTextSetter, DialogTabbaleElementsPreparer, DesignTemplatePlaceholdersRolesSetter,' +
        'DefaultTextGetter, ElementsHidingManager, AccessibilityConsts, FocusTracker, ElementsGetter, EventsListener, FocusEventDispatcher, wmjQuery, DomManager');

function BallonCreatedAccessibilityHandler(wmAccessibilityCommonUtils, commonUtils, lib, featuresManager, stepDataGetter,
                                           ariaAttributesSetter, dialogTextSetter, dialogTabbaleElementsPreparer, designTemplatePlaceholdersRolesSetter,
                                           defaultTextGetter, elementsHidingManager, accessibilityConsts, focusTracker, elementsGetter, eventsListener, focusEventDispatcher, wmjQuery, domManager) {
	var _this = this;
	_this.init = init;

	var TAB_KEY = accessibilityConsts.KEY_CODES.TAB;
	var isFromWMElement=false;
    var shouldGrabFocus = true;
	var _deployablesRoles;
	var _deployablesAriaLabels;
    var _elementsForFocus = {};
    var _ignoreAccessibleCapture = false;
    var isFocusLockSettingEnabled = false;
    var _skipPoweredByLink = false;
    var _activeStepId;
    var _noFocusGrabOnRedraw;
    var _balloonTitle = 'walkme-custom-balloon-title';
    var _balloonContent = 'walkme-custom-balloon-content';
    var _wtCannotBePlayed = 'wt-cannot-be-played';
    var POWERED_BY = ".walkme-custom-powered-by";
    var focusableBalloonSelectors = {
        ACTION_BUTTON : ".walkme-custom-balloon-button",
        CLOSE_LINK :  ".walkme-custom-balloon-close-button"
    };

    var FOCUS_TRACKING_ELEMENTS_TYPES = accessibilityConsts.FOCUS_TRACKING_ELEMENTS_TYPES;
    var ELEMENTS_SELECTORS = accessibilityConsts.ELEMENTS_SELECTORS;
    var BALLOON_CLASS = 'walkme-custom-balloon-outer-div';

	function init(deployablesRoles, deployablesAriaLabels) {
	    var events = accessibilityConsts.EVENTS;
	    var balloonEvents = events.BALLOON;
        _noFocusGrabOnRedraw = featuresManager.isFeatureEnabled('noFocusGrabOnRedraw');
        if (_noFocusGrabOnRedraw) {
            _walkmeInternals.bind(balloonEvents.BeforeBalloonRedraw, handleBeforeBalloonRedraw);
            _walkmeInternals.bind(balloonEvents.BalloonShown, balloonShown);
        }

		_walkmeInternals.bind(balloonEvents.BalloonCreated, handleBalloonCreation);
		_walkmeInternals.bind(balloonEvents.BalloonStartShow, balloonStartShow);
        _walkmeInternals.bind(events.WALKTHRU.NewStepShown, tryFocusWT);
        _walkmeInternals.bind(events.FLOW.UIFlowStageShown, tryFocusBF);
        _walkmeInternals.bind(balloonEvents.FirstStepNotAvailable, focusTofirstStepNotAvailable);
        _walkmeInternals.bind(balloonEvents.FirstStepNotAvailableBalloonClosed, focusTracker.focus);

		_deployablesRoles = deployablesRoles;
		_deployablesAriaLabels = deployablesAriaLabels;

        _ignoreAccessibleCapture = featuresManager.isFeatureEnabled('noAccessibleCapture');
        _skipPoweredByLink = featuresManager.isFeatureEnabled('skipPoweredByLink');
	}


    function isElementInsideBalloon(element) {
	    return wmjQuery(element).closest('.' + BALLOON_CLASS).length > 0;
    }

	function tryFocusWT(type, step) {
        tryFocus(step.Id);
	}

    function tryFocusBF(event, bizFlowData) {
		tryFocus(bizFlowData.uiElementId);
    }

    function handleBeforeBalloonRedraw(event) {
        activeElement = elementsGetter.getActiveElement();
        if (activeElement.className.indexOf('walkme') >= 0) {
            shouldGrabFocus = true;
        }
        else {
            shouldGrabFocus = false;
        }
    }

    function balloonShown(event) {
        shouldGrabFocus = true;
    }

    function tryFocus(id) {
        if (id != undefined && _elementsForFocus[id]) {
            var details = _elementsForFocus[id];
            var elementToFocusTo = details.elementForFocus;
            var focusTrackingDetails = details.focusTrackingDetails;

            if (wmAccessibilityCommonUtils.isElementOnScreen(ELEMENTS_SELECTORS.SHOUTOUT.container)) {
                focusTracker.addToBottomOfStack(focusTrackingDetails.elementToKeep, focusTrackingDetails.balloonType, elementToFocusTo);
            }
            else {
                elementToFocusTo.focus();
                focusTracker.addToStack(focusTrackingDetails.elementToKeep, focusTrackingDetails.balloonType);
            }
        }
	}

    function focusTofirstStepNotAvailable() {
        tryFocus(_wtCannotBePlayed);
    }


    function balloonStartShow(event,eventData){
        var stepData = stepDataGetter.getActiveStepData();

        if (eventData && stepData && stepData.id) {
            var id = stepData.id;

            if (_activeStepId && _activeStepId != id) {
                _elementsForFocus[_activeStepId] = undefined;
            }
            _activeStepId = id;
            var stepFocusDetails = _elementsForFocus[id];
           !stepFocusDetails || stepFocusDetails.elementForFocus.focus();

        }
    }

	function handleBalloonCreation(event, eventData) {
		var balloon = eventData.Element;
		var stepData = stepDataGetter.getActiveStepData();

		if (!stepData) {
			var firstStepNotAvailable = wmjQuery('.walkme-custom-first-step-not-available-text', balloon);

			if (firstStepNotAvailable.length) {
				firstStepNotAvailableHandler(firstStepNotAvailable, balloon);
			}
		}
		else {
			var elementForInteraction = getInteractionElement(stepData) || eventData.PageElement;
			var isPopup = stepData.isPopup;

			var elementForFocus = handleStepBaloon(balloon,
				_deployablesRoles.step || 'dialog',
				_deployablesAriaLabels.step,
				stepData.ariaLabel,
				elementForInteraction,
				isPopup,
				stepData.id,
				stepData.isFocusLockEnabled);

            if (stepData.spotlight) {
                orderForFocusGrab(isPopup, elementForInteraction, elementForFocus, stepData);
            }
            if (stepData.isFocusGrabEnabled) {
                if (_noFocusGrabOnRedraw) {
                    if (shouldGrabFocus) {
                        shouldGrabFocus = false;
                        orderForFocusGrab(isPopup, elementForInteraction, elementForFocus, stepData);
                    }
                }
                else{
                    orderForFocusGrab(isPopup, elementForInteraction, elementForFocus, stepData);
                }
            }

			if (isPopup && wmAccessibilityCommonUtils.shouldAddAriaHidden(stepData.spotlight, stepData.deployableType, stepData.id)) {
				var balloonId = balloon.attr("id");
				elementsHidingManager.hideAllButPopup(balloon, balloonId, accessibilityConsts.EVENTS.BALLOON.DestroyStepBalloon);
			}

			wmAccessibilityCommonUtils.addTitlesToFrames(balloon);
			designTemplatePlaceholdersRolesSetter.setDefaultRoleForActionPlaceholders(balloon);
		}
	}

    function orderForFocusGrab(isPopup, elementForInteraction, elementForFocus, stepData) {
        _elementsForFocus[stepData.id] = {
            elementForFocus: elementForFocus,
            focusTrackingDetails: getFocusTrackingDetails(isPopup, elementForInteraction)
        };
    }

	function getInteractionElement(stepData) {
        return !_ignoreAccessibleCapture && stepData.identifySettings &&
            !stepData.identifySettings.isDefault &&
            ((stepData.identifySettings.IsJquerySelector && stepData.identifySettings.JquerySelector) ||
            (stepData.identifySettings.ElementDescription && Object.keys(stepData.identifySettings.ElementDescription)))
            && lib.findElement(stepData.identifySettings);
    }

	function firstStepNotAvailableHandler(firstStepNotAvailable, balloon) {
        var attrs = { };

        wmjQuery.each(firstStepNotAvailable[0].attributes, function(idx, attr) {
            attrs[attr.nodeName] = attr.nodeValue;
        });

        var style = attrs.style;
		delete attrs.style;

        firstStepNotAvailable.replaceWith(function () {
            var newElement = wmjQuery("<div></div>", attrs).append(wmjQuery(this).contents());
            newElement.attr("id", _wtCannotBePlayed);

            domManager.setAttribute(newElement, 'style', style);

            return newElement;
        });

        ariaAttributesSetter.setAriaLabelledBy(balloon, _wtCannotBePlayed);
        commonUtils.setRole(balloon, _deployablesRoles.step || 'dialog');

        var focusableElements = dialogTabbaleElementsPreparer.prepareTabbableElements(balloon, focusableBalloonSelectors, true);

        wmAccessibilityCommonUtils.handleFocusElements(balloon, focusableElements,
            focusableBalloonSelectors.ACTION_BUTTON, true, undefined);

        var isPopup = true;
        _elementsForFocus[_wtCannotBePlayed] = {
            elementForFocus: focusableElements[0],
            focusTrackingDetails: getFocusTrackingDetails(isPopup)
        };
    }

    function handleStepBaloon(balloonElement, stepRole, stepAriaLabel, specificAriaLabel, element, isPopup, stepId, isFocusLockEnabled) {
        var balloonContainer;

        for (var i = 0; i < balloonElement.length; i++) {
            var currBalloonElement = wmjQuery(balloonElement[i]);

            if (currBalloonElement.hasClass(BALLOON_CLASS)) {
                balloonContainer = currBalloonElement;
            }
        }

        if (balloonContainer) {
            setXButton(balloonContainer, focusableBalloonSelectors.CLOSE_LINK);
            handlePoweredByLink(balloonContainer);

            var focusableElements = dialogTabbaleElementsPreparer.prepareTabbableElements(balloonContainer, focusableBalloonSelectors, true);

			if (featuresManager.isFeatureEnabled('addTabbableTextAccessibility')) {
				focusableBalloonSelectors.BALLOON_TITLE = '.walkme-custom-balloon-title';
				focusableBalloonSelectors.BALLOON_CONTENT = '.walkme-custom-balloon-content';
			}

            if (!focusableElements.length) {
                focusableElements = balloonContainer;
            }

            // Note: FF balloonsTabInOrder should be used with ignoreIframeWrap to work correctly
            var pageElementAdded = (featuresManager.isFeatureEnabled('balloonsTabInOrder')|| isFocusLockEnabled) && !isPopup && element
                                && injectPageElementIfNeeded(element, focusableElements);
            isFocusLockSettingEnabled = isFocusLockEnabled;

            wmAccessibilityCommonUtils.handleFocusElements(balloonContainer,
					focusableElements,
					focusableBalloonSelectors.CLOSE_LINK,
                    isFocusLockEnabled,
                    pageElementAdded ? element : undefined);

            var balloonTitle = wmjQuery("." + _balloonTitle);

            commonUtils.setRole(balloonContainer, stepRole);
            ariaAttributesSetter.setAriaLabel(balloonContainer, specificAriaLabel || stepAriaLabel || defaultTextGetter.getValue(accessibilityConsts.DEFAULT_TEXT_KEY.StepBalloon));
            dialogTextSetter.setText(balloonContainer, stepId, !specificAriaLabel ? _balloonTitle : undefined, _balloonContent);
            commonUtils.setRole(balloonTitle, 'heading');
            ariaAttributesSetter.setAriaLevel(balloonTitle, 2);
            if (!featuresManager.isFeatureEnabled('noContainerTabIndex')) {
                balloonContainer.attr('tabIndex', 0);
            }
			handleStepCounter(balloonContainer, stepId);
            return getFirstFocusableElement(focusableElements);
        }
    }

    function checkClass(className, element) {
        return (""+element.className+"").indexOf(className) > -1;
	}

	function hasBackClass (element) {
	    return checkClass('walkme-action-cancel',element)|| checkClass('walkme-action-back',element)
	}

	function hasNextClass(element) {
	    return checkClass('walkme-action-start', element) || checkClass('walkme-action-next', element)|| checkClass('walkme-action-done',element)
	}

    function getFirstFocusableElement(focusableElements) {
        var firstElement = focusableElements[0];

        if(featuresManager.isFeatureEnabled('focusFirstOnNextAction')) {

            if (hasBackClass(firstElement)) {
                for (var element = 1; element < focusableElements.length; element++) {

                    if (hasNextClass(focusableElements[element])) {
                        return focusableElements[element];
                    }
                }
            }
        }
        return firstElement
    }

    function getFocusTrackingDetails(isPopup, element) {
        var focusTrackingDetails = {};

        if (isPopup) {
            focusTrackingDetails.elementToKeep = elementsGetter.findLastFocusedElement();
            focusTrackingDetails.balloonType = FOCUS_TRACKING_ELEMENTS_TYPES.popup;
        }
        else {
            focusTrackingDetails.elementToKeep = element;
            focusTrackingDetails.balloonType = FOCUS_TRACKING_ELEMENTS_TYPES.step;
        }

        return focusTrackingDetails;
    }

    function handleStepCounter(balloonContainer, stepId) {
	    var STEP_COUNT_ID = "wt-step-counter-" + stepId;
	    var stepCount = wmjQuery(ELEMENTS_SELECTORS.BALLOON.stepCounter, balloonContainer);

	    if (stepCount.length) {
            stepCount.attr('id', STEP_COUNT_ID);
            ariaAttributesSetter.appendAriaDescribedBy(balloonContainer, STEP_COUNT_ID);
        }
    }

    function injectPageElementIfNeeded(element, focusableElements) {
        var elementBefore = wmjQuery(focusableElements[focusableElements.length - 1]);
        var elementAfter = wmjQuery(focusableElements[0]);

        var pageElementsFocusables = wmAccessibilityCommonUtils.getFocusablesInsideElement(element);

        var injectNeeded = pageElementsFocusables.length != 0;

        if (injectNeeded) {
            injectBetweenTabs(pageElementsFocusables, elementBefore, elementAfter);
        }

        return injectNeeded;
    }

    function setXButton(balloonContainer, xButtonSelector) {
        if (!featuresManager.isFeatureEnabled('focusXButtonFirst')) {
            wmAccessibilityCommonUtils.moveElementToEnd(balloonContainer, xButtonSelector);
        }

        var xButtonElement = wmjQuery(xButtonSelector, balloonContainer);
        commonUtils.setRole(xButtonElement, 'button');
        wmAccessibilityCommonUtils.setXButtonLabel(xButtonElement);
	}

	function handlePoweredByLink(balloonContainer) {
	    var poweredByElement = wmjQuery(POWERED_BY, balloonContainer);
	    wmAccessibilityCommonUtils.addTabIndex(poweredByElement, _skipPoweredByLink ? -1 : 0);
    }

    function injectBetweenTabs(focusableElements, lastWMElement, firstWMElement) { 
        wmjQuery('body').keydown(bodyKeydownHandler);
        firstWMElement.on('keydown', firstElementKeyDownHandler);
        lastWMElement.on('keydown', lastElementKeyDownHandler);
        eventsListener.on('destroyStepBalloon', stopListening);
        isFromWMElement = false;

		
        function bodyKeydownHandler(keydownEvent) {
			var allTabbables = elementsGetter.getAllTabbablesOnPageOrdered();
			
			if (keydownEvent.which === TAB_KEY){
				// Case 1: Need to move from widget to dom element above balloon in tabbable list or else will skip dom elements 
				if (keydownEvent.target.id.indexOf('walkme-player') >= 0 && keydownEvent.shiftKey) {
					var element = wmAccessibilityCommonUtils.findElementAboveBalloon(allTabbables);
					focusToElement(element, keydownEvent);
				} 
				// Case 2: Need to jump from last dom element to widget so does not tab through balloon again
				var nextVal = allTabbables[wmAccessibilityCommonUtils.getKeyByValue(allTabbables, keydownEvent.target) + 1];
				if (!wmAccessibilityCommonUtils.isWMBalloon(keydownEvent.target) && wmAccessibilityCommonUtils.isWMBalloon(nextVal) && !keydownEvent.shiftKey) {
					if (wmAccessibilityCommonUtils.findWidgetinElementList(allTabbables)){	// for widget visible (menu closed)				
						focusToElement(wmAccessibilityCommonUtils.findWidgetinElementList(allTabbables), keydownEvent);
					} else focusToElement(allTabbables[0], keydownEvent);
					isFromWMElement = false;			
				}
				// Case 3: account for rest of tabbing not in balloon  			
				if (!wmAccessibilityCommonUtils.isWMElement(keydownEvent.target)){	
					checkIfNeedToTabIntoBalloon(keydownEvent, allTabbables);
				}
			}
		}

		function checkIfNeedToTabIntoBalloon(keydownEvent, allTabbables){
			var focused = wmjQuery(elementsGetter.getActiveElement());
			var focusedIndex = focusableElements.index(focused);
			var focusableElement = focusableElements.length === 1 ? focusableElements[0] : focusableElements.last()[0];
			var onElementAfterBalloon = allTabbables[wmAccessibilityCommonUtils.getKeyByValue(allTabbables, focusableElement)+1] == focused[0]; 

			// onElementAfterBalloon used to check for tabbing backwards when not focus locked
			if ((focusableElements == focused) || (focusedIndex !== -1) || onElementAfterBalloon) {
				var elementTofocus;
				var shouldFocusOnWMElement = isFocusLockSettingEnabled || !isFromWMElement;
									
				if (focusedIndex === (focusableElements.length -1) && !keydownEvent.shiftKey && shouldFocusOnWMElement) {
					elementTofocus = firstWMElement;					
				} 
				
                else if (keydownEvent.shiftKey) {
                    // Prevent loop if selected element has more than one focusable target
                    var chosenElement = wmAccessibilityCommonUtils.findElementInList(_elementsForFocus);
                    chosenElement = chosenElement !== undefined ? chosenElement.focusTrackingDetails.elementToKeep[0] : focusableElements;

                    var isChosenElementTarget = chosenElement.contains(keydownEvent.target);
                    var isFirstFocusableElement = focusableElements[0] === keydownEvent.target;

                    if (focusableElements.length > 1 && isChosenElementTarget) shouldFocusOnWMElement = false;
                    if (isFocusLockSettingEnabled && isFirstFocusableElement) shouldFocusOnWMElement = true;

                    if (shouldFocusOnWMElement) {
                        elementTofocus = lastWMElement;
                    }
                }

				if (elementTofocus) {
					focusToElement(elementTofocus, keydownEvent);
				}

				isFromWMElement=false; 
			}
		}

        function firstElementKeyDownHandler(event) {
			var allTabbableElements = elementsGetter.getAllTabbablesOnPageOrdered();
			var elementToTabTo = wmAccessibilityCommonUtils.findCorrectElementToTabTo(allTabbableElements, focusableElements, _elementsForFocus);
			if(event.which === TAB_KEY && event.shiftKey) {
				focusToElement(elementToTabTo, event);
               	isFromWMElement = true;
			}
        }

		function lastElementKeyDownHandler(event) {
			var allTabbableElements = elementsGetter.getAllTabbablesOnPageOrdered();
			var currentElement = wmAccessibilityCommonUtils.findCorrectElementToTabTo(allTabbableElements, focusableElements, _elementsForFocus);
			var nextElement = wmAccessibilityCommonUtils.findCorrectElementToTabTo(allTabbableElements, focusableElements, _elementsForFocus, 1);
			
			if(event.which === TAB_KEY && !event.shiftKey) {
				focusToElement(isFocusLockSettingEnabled ? currentElement : nextElement, event);
               	isFromWMElement = true;
			}
        }

        function stopListening(e, data) {
            var balloon = data.balloonDiv;

            if (!balloon.is(".walkme-custom-simple-step")) {
                return;
            }

            wmjQuery('body').off('keydown', bodyKeydownHandler);
            firstWMElement.off('keydown', firstElementKeyDownHandler);
            lastWMElement.off('keydown', lastElementKeyDownHandler);
            eventsListener.off('destroyStepBalloon', stopListening);
        }
    }

    function focusToElement(elementTofocus, event) {
        elementTofocus.focus();
        focusEventDispatcher.dispatch(elementTofocus[0]);

        event.preventDefault();
        event.stopPropagation();
    }
}


/***/ }),

/***/ 7440:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

var getCtx = (__webpack_require__(8912)/* .getCtx */ .yK);
getCtx().register('BBCodeAccessibilityHandler')
	.asCtor(BBCodeAccessibilityHandler)
	.dependencies('AccessibilityConsts');

function BBCodeAccessibilityHandler(accessibilityConsts) {
	var _this = this;

	var _deployablesRoles;

	_this.init = function init(deployablesRoles) {
		bindEvents();
		_deployablesRoles = deployablesRoles;
	};

	function bindEvents() {
		_walkmeInternals.bind("RegisterBBCodeDeployableClick", handleBbcodeElement);
	}

	function handleBbcodeElement(event, eventData) {
        var element = eventData.element;
        registerDeployableClickEvent(element);
        addDefaultTabindex(element);
	}

	function registerDeployableClickEvent(element) {

		element.keydown(function (e) {
            if (e.keyCode === accessibilityConsts.KEY_CODES.ENTER) {
                element.click();
				e.preventDefault();
            }
        });
	}

	function addDefaultTabindex(element) {
		var elementTypeName = element[0].nodeName.toLowerCase();

        if (/a/.test(elementTypeName)) {
			var tabindex = element.attr('tabindex');

			if (tabindex == undefined || tabindex == null) {
                element.attr('tabindex', 0);
			}
		}
	}
}


/***/ }),

/***/ 4420:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

var getCtx = (__webpack_require__(8912)/* .getCtx */ .yK);
getCtx().register('BizFlowAccessibilityHandler')
	.asCtor(BizFlowAccessibilityHandler)
	.dependencies('FocusTracker,Consts');

function BizFlowAccessibilityHandler(focusTracker, consts) {
	var _this = this;
	_this.init = init;

	var _deployablesRoles;
	var _deployablesAriaLabels;

	function init(deployablesRoles, deployablesAriaLabels) {
		bindEvents();
		_deployablesRoles = deployablesRoles;
		_deployablesAriaLabels = deployablesAriaLabels;
	}

	function bindEvents() {
		_walkmeInternals.bind("FlowCompleted", focus);
		_walkmeInternals.bind("FlowStopped", focus);
	}

	function focus(e, eventParams) {
		if (!isBackgroundSwt(eventParams)) {
			focusTracker.focus();
		}
	}

	function isBackgroundSwt(eventParams) {
		return eventParams.flowInstanceParams && eventParams.flowInstanceParams.type === consts.BACKGROUND_SWT_INSTANCE_PARAMS.type;
	}
}



/***/ }),

/***/ 8484:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

var getCtx = (__webpack_require__(8912)/* .getCtx */ .yK);
getCtx().register('CaptureBalloonAccessibilityHandler')
	.asCtor(CaptureBalloonAccessibilityHandler)
	.dependencies('WmAccessibilityCommonUtils, wmjQuery, AriaAttributesSetter, FocusBehaviorSetter, AccessibilityConsts');

function CaptureBalloonAccessibilityHandler(wmAccessibilityCommonUtils, wmjQuery, ariaAttributesSetter, focusBehaviorSetter) {
	var _this = this;
	_this.init = init;

	function init() {
        _walkmeInternals.on('CaptureBalloonInit', initCaptureBalloonAccessibility);
		_walkmeInternals.on('CaptureBalloonDropDownOpened', handleCaptureBalloonDropDownMenuFocus);
		_walkmeInternals.on('CaptureBalloonTriggers', handleCaptureBalloonTriggersFocus);
		_walkmeInternals.on('CaptureBalloonStepNotesClicked', handleCaptureBalloonNoteFocus);
	}
  
	function initCaptureBalloonAccessibility(e, params) {
		setTimeout( function() {
			setCaptureBalloonFocus(params.element);

			var btn = wmjQuery(params.focusElem);
			if(!btn) return;
	
			btn.focus();
		}, 100)
	}
  
	function setCaptureBalloonFocus(container) {
		var element = wmjQuery(container) || wmjQuery("div[class*='walkmeBottomPanel']"); 
		if (!element) {
			return;
		}

		var tabbableElements = element.find(':tabbable');
		focusBehaviorSetter.setFocusBehavior(tabbableElements);
	}

	function handleCaptureBalloonDropDownMenuFocus(e, params) {
		var element = wmjQuery(params.element) || wmjQuery('#walkme-dropdownMenu');
		if (!element) {
			return;
		}

		setCaptureBalloonFocus(element);
	}

	function handleCaptureBalloonTriggersFocus(e, params) {
		var element =  wmjQuery(params.element) || wmjQuery('.full-triggers-wrapper');
		if (!element) {
			return;
		}
	
		setCaptureBalloonFocus(element);
	}

	function handleCaptureBalloonNoteFocus(e, params) {
		var noteElement = wmjQuery(params.element);

		noteElement.focus();
	}
}


/***/ }),

/***/ 3494:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

var getCtx = (__webpack_require__(8912)/* .getCtx */ .yK);
getCtx().register('DebuggerAccessibilityHandler')
	.asCtor(DebuggerAccessibilityHandler)
	.dependencies('WmAccessibilityCommonUtils, wmjQuery, AriaAttributesSetter, FocusBehaviorSetter');

function DebuggerAccessibilityHandler(wmAccessibilityCommonUtils, wmjQuery, ariaAttributesSetter, focusBehaviorSetter) {
	var _this = this;
	_this.init = init;

	function init() {
		_walkmeInternals.on('DebuggerAppendedToBody', initDebuggerAccessibility);
		_walkmeInternals.on('DebuggerSizeChange', handleDebuggerSizeChanged);
		_walkmeInternals.on('DebuggerSearch', handleDebuggerSearch);
		_walkmeInternals.on('DebuggerFocusUpdate', handleDebuggerFocusUpdate)

		setDebuggerFocus();
	}

	function initDebuggerAccessibility() {
		setDebuggerFocus();
		
		if (wmjQuery('.walkme-splash').length > 0) return;

		var helpBtn = wmjQuery('#wmd-help-btn:visible');

		if (helpBtn.length > 0) {
			helpBtn.focus();
		} else {
			wmjQuery('#wmd-maximize-btn').focus();
		}
	}

	function handleDebuggerSearch() {
		var container = wmjQuery('.wmd-deployable-container');

		if (container.length > 0) {
			setDebuggerFocus(container);
			wmjQuery('#wmd-clear-search-btn').on('click', function() {
				wmjQuery('.wmd-search-input:visible').focus();
			});
		}
	}

	function setDebuggerFocus(container) {
		var element = container || wmjQuery('#walkme-debugger'); 
		if (!element) {
			return;
		}

		var tabbableElements = element.find(':tabbable');
		focusBehaviorSetter.setFocusBehavior(tabbableElements);
	}

	function handleDebuggerSizeChanged(e, params) {
		var buttonSize = params.newState === 'maximize' ? 'minimize' : 'maximize';
		var button = wmjQuery('#wmd-'+ buttonSize + '-btn');
		
		button.focus();
		button.addClass('walkme-accessible-focus');
		setDebuggerFocus();
	}

	function handleDebuggerFocusUpdate(e, params) {
		var container = wmjQuery(params.selector);

		if (container.length > 0) {
			setDebuggerFocus(container);
		}
	}
}


/***/ }),

/***/ 6928:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

var getCtx = (__webpack_require__(8912)/* .getCtx */ .yK);
getCtx().register('LauncherAccessibilityHandler')
	.asCtor(LauncherAccessibilityHandler)
	.dependencies('CommonUtils, LauncherDefaultIcon, LauncherTextSetter, LauncherTabOrderHandler, AccessibilityConsts, ' +
		'ElementInIframeIndicator, FeaturesManager, Consts');

function LauncherAccessibilityHandler(commonUtils, launcherDefaultIcon, launcherTextSetter, launcherTabOrderHandler, accessibilityConsts,
            elementInIframeIndicator, featuresManager, consts) {
	var _this = this;
    _this.init = init;
	_this.setRole = setRole;

    var _deployablesRoles;

	function init(deployablesRoles) {
		bindEvents();
		_deployablesRoles = deployablesRoles;
	}

	function bindEvents() {
		_walkmeInternals.bind(accessibilityConsts.EVENTS.LAUNCHER.LauncherIsShown, handleLauncher);
		launcherTabOrderHandler.bindEvents();
	}

	function handleLauncher(type, drawableLauncher, extraData) {
		if(drawableLauncher.isCopilotLauncher()) return;
		if (window.wmInCapture) return;
		
        var launcherElement = extraData.launcherDiv;
	    var launcherData = extraData.launcherData;
        var actionType = launcherData.Settings.action.actionType;
        var imageObject = launcherData.Settings.imageObject || launcherDefaultIcon;

		setRole(launcherElement, actionType);
        launcherTextSetter.setText(launcherElement, actionType, imageObject);

        var tabOrderHandler = elementInIframeIndicator.isInIframe(extraData.element) ? launcherTabOrderHandler.handleElementFocusByDom :
            launcherTabOrderHandler.handleElementFocusByTabOrder;

        tabOrderHandler(launcherData.Id, launcherData.Position, extraData.element, launcherElement, _deployablesRoles);
	}

	function setRole(launcherElement, actionType) {
		var role = actionType == 'none' ? 'img' : 'button';
		commonUtils.setRole(launcherElement, _deployablesRoles.launcher || role);
		var childRole = featuresManager.isFeatureEnabled(consts.FEATURES.NoNonePresentation) ? 'presentation' : 'none presentation';
		launcherElement.find('*').attr('role', childRole);
	}
}


/***/ }),

/***/ 2572:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

var getCtx = (__webpack_require__(8912)/* .getCtx */ .yK);
getCtx().register('LauncherTabOrderHandler')
    .asCtor(LauncherTabOrderHandler)
    .dependencies('EventHandlerBindingManager, AccessibilityConsts, IdGetter, WmAccessibilityCommonUtils, ' +
        'DummyTabOrganizer, wmjQuery, ElementsGetter');

function LauncherTabOrderHandler(eventHandlerBindingManager, accessibilityConsts, idGetter, wmAccessibilityCommonUtils,
                                 dummyTabOrganizer, wmjQuery, elementsGetter) {
    var _this = this;
    _this.bindEvents = bindEvents;
    _this.handleElementFocusByTabOrder = handleElementFocusByTabOrder;
    _this.handleElementFocusByDom = handleElementFocusByDom;

    var TAB_KEY = accessibilityConsts.KEY_CODES.TAB;
    var LAUNCHER_CLASS_PREFIX = accessibilityConsts.ELEMENT_TYPES_PREFIX.launcher;
    var LAUNCHER_EVENTS = accessibilityConsts.EVENTS.LAUNCHER;
    var LAUNCHER_TYPE = accessibilityConsts.DEPLOYABLE_TYPES.launcher;
    var DIRECTIONS = accessibilityConsts.DIRECTIONS;

    function bindEvents() {
        _walkmeInternals.bind(LAUNCHER_EVENTS.DisplayLauncher, onLauncherDisplay);
        _walkmeInternals.bind(LAUNCHER_EVENTS.HideLauncher, onLauncherHide);
        _walkmeInternals.bind(LAUNCHER_EVENTS.LauncherDestroyed, onLauncherDestroyed);
    }

    function handleElementFocusByTabOrder(launcherId, position, pageElement, launcherElement, deployableRoles) {
        fixTabIndex(launcherElement, -1);
        dummyTabOrganizer.createDummyElement(LAUNCHER_TYPE, launcherId, position, pageElement, launcherElement.css("display"), deployableRoles);
        eventHandlerBindingManager.bind("keydown", onLauncherKeyDown, launcherElement);
    }

    function handleElementFocusByDom(launcherId, position, pageElement, launcherElement) {
        fixTabIndex(launcherElement, 0);
    }

    function fixTabIndex(launcherElement, tabindex) {
        var launcherContainer = launcherElement.parent(".walkme-launcher-container");
        launcherContainer.removeAttr("tabindex");
        launcherContainer.off('keydown');

        wmAccessibilityCommonUtils.addTabIndex(launcherElement, tabindex);
    }

    function onLauncherKeyDown(event) {
        var direction;
        
        if (window.wmInCapture) return;
        if (event.which === TAB_KEY) {
            direction = event.shiftKey ? DIRECTIONS.back : DIRECTIONS.next;
        }

        if (!direction) {
            return;
        }

        var launcherId = idGetter.getIdByElement(wmjQuery(this), LAUNCHER_CLASS_PREFIX);

        dummyTabOrganizer.focusNearDummy(LAUNCHER_TYPE, launcherId, direction, elementsGetter.getAllTabbablesOnPageOrdered());

        event.preventDefault();
        event.stopPropagation();
    }

    function onLauncherDisplay(event, extraData) {
        dummyTabOrganizer.showDummy(LAUNCHER_TYPE, extraData.launcher.Id);
    }

    function onLauncherHide(event, extraData) {
        dummyTabOrganizer.hideDummy(LAUNCHER_TYPE, extraData.launcher.Id);
    }

    function onLauncherDestroyed(event, extraData) {
        var launcherId = extraData.launcher.Id;
        eventHandlerBindingManager.unbindSpecificByElementSelector("." + LAUNCHER_CLASS_PREFIX + launcherId, 'keydown', onLauncherKeyDown);
        dummyTabOrganizer.removeDummy(LAUNCHER_TYPE, launcherId);
    }
}


/***/ }),

/***/ 5551:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

var getCtx = (__webpack_require__(8912)/* .getCtx */ .yK);
getCtx().register('LauncherTextSetter')
    .asCtor(LauncherTextSetter)
    .dependencies('WmAccessibilityCommonUtils, DefaultTextGetter, AccessibilityConsts');

function LauncherTextSetter(wmAccessibilityCommonUtils, defaultTextGetter, accessibilityConsts) {
    var _this = this;
    _this.setText = setText;

    var DEFAULT_TEXT_KEY = accessibilityConsts.DEFAULT_TEXT_KEY;

    var SHAPES_NAMES_TO_KEYS = {
        'walk-me-through' : DEFAULT_TEXT_KEY.WalkMeThroughLauncher,
        'show-me-how': DEFAULT_TEXT_KEY.ShowMeHowLauncher,
        'info': DEFAULT_TEXT_KEY.InfoLauncher,
        'v': DEFAULT_TEXT_KEY.VLauncher,
        'question': DEFAULT_TEXT_KEY.QuestionLauncher,
        'error': DEFAULT_TEXT_KEY.ErrorLauncher,
        'arrow': DEFAULT_TEXT_KEY.ArrowLauncher,
        'mandatory-none': DEFAULT_TEXT_KEY.MandatoryNoneLauncher,
        'mandatory-action': DEFAULT_TEXT_KEY.MandatoryActionLauncher,
        'round-question-mark': DEFAULT_TEXT_KEY.RoundQuestionMarkLauncher,
        'california': DEFAULT_TEXT_KEY.WalkMeThroughLauncher
    };

    function setText(launcherElement, actionType, imageObject) {
        var launcherText = '';

        switch(imageObject.type) {
            case "shape":
                var shapeType = imageObject.data.shape;
                launcherText = getShapeText(shapeType, actionType);
                break;
            case "customText":
                launcherText = imageObject.data.customText;
                break;
            case "custom":
                launcherText = imageObject.data.alt;
        }

        launcherText = launcherText ? launcherText : 'Untitled';
        launcherText = launcherText.replace(/&#39;/g,"'");
        launcherText = launcherText.replace(/amp;/g,"");

        if (actionType == 'none') {
            launcherElement.attr('alt', launcherText);
        }

        wmAccessibilityCommonUtils.elementWrapper(launcherElement, launcherText);
        handleTitleAttribute(launcherElement);
    }

    function getShapeText(shapeType, actionType) {
        if (shapeType == 'mandatory') {
            shapeType = shapeType + (actionType == 'none' ? '-none' : '-action');
        }

        return defaultTextGetter.getValue(SHAPES_NAMES_TO_KEYS[shapeType]);
    }

    function handleTitleAttribute(launcherElement) {
        var launcherContainer = launcherElement.parent(".walkme-launcher-container");
        var title = launcherContainer.attr("title");

        if (!title) {
            return;
        }

        launcherContainer.removeAttr("title");
        launcherElement.attr("title", title);
    }
}


/***/ }),

/***/ 9801:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

var getCtx = (__webpack_require__(8912)/* .getCtx */ .yK);
getCtx().register('LiveChatAccessibilityHandler')
	.asCtor(LiveChatAccessibilityHandler)
	.dependencies('FocusTracker, AccessibilityConsts, CommonUtils');

function LiveChatAccessibilityHandler(focusTracker, accessibilityConsts, commonUtils) {
	var _this = this;
	_this.init = init;

	function init() {
		bindEvents();
	}

	function bindEvents() {
        _walkmeInternals.bind(accessibilityConsts.EVENTS.LIVE_CHAT.LiveChatClicked, onLiveChatClicked);
	}

    function onLiveChatClicked(e, params) {
        var options = params.options;

        if (commonUtils.isValueTrue(options.closeWalkmeOnChatOpen) && commonUtils.isValueTrue(options.openNewWindow)) {
            focusTracker.focus();
        }
    }
}


/***/ }),

/***/ 3434:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

var getCtx = (__webpack_require__(8912)/* .getCtx */ .yK);
getCtx().register('MenuAccessibilityHandler')
    .asCtor(MenuAccessibilityHandler)
    .dependencies('CommonUtils, WmAccessibilityCommonUtils, SiteConfigManager, ElementsHidingManager, AccessibilityConsts, FocusTracker, ' +
        'ElementsGetter');

function MenuAccessibilityHandler(commonUtils, wmAccessibilityCommonUtils, siteConfigManager, elementsHidingManager, accessibilityConsts, focusTracker,
                                  elementsGetter) {
    var _this = this;
    _this.init = init;

    var _menuEvents = accessibilityConsts.EVENTS.MENU;

    function init() {
        bindEvents();
    }

    function bindEvents() {
        _walkmeInternals.bind(_menuEvents.MenuBuilt, handleMenu);
        _walkmeInternals.bind(_menuEvents.MenuCloseButtonClick, focusTracker.focus);
    }

    function handleMenu(event, eventData) {
        var menu = eventData[0];
        focusTracker.addToStack(elementsGetter.findLastFocusedElement(), accessibilityConsts.FOCUS_TRACKING_ELEMENTS_TYPES.menu);
        var hasSpotlight = siteConfigManager.get().MenuDisplay === 'Splash';

        if (wmAccessibilityCommonUtils.shouldAddAriaHidden(hasSpotlight, accessibilityConsts.DEPLOYABLE_TYPES.menu)) {
            elementsHidingManager.hideAllButPopup(menu, "walkme-menu", _menuEvents.AfterMenuClose);
        }
    }
}


/***/ }),

/***/ 2581:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

var getCtx = (__webpack_require__(8912)/* .getCtx */ .yK);
getCtx().register('ResourceAccessibilityHandler')
	.asCtor(ResourceAccessibilityHandler)
	.dependencies('WmAccessibilityCommonUtils, CommonUtils, AriaAttributesSetter, DialogTabbaleElementsPreparer, ' +
		'DefaultTextGetter, ElementsHidingManager, AccessibilityConsts, FocusTracker, ElementsGetter, Consts');

function ResourceAccessibilityHandler(wmAccessibilityCommonUtils, commonUtils, ariaAttributesSetter, dialogTabbaleElementsPreparer,
									  defaultTextGetter, elementsHidingManager, accessibilityConsts, focusTracker, elementsGetter, consts) {
	var _this = this;
	_this.init = init;

	var _deployablesRoles;
	var _deployablesAriaLabels;
	var _resourceEvents = accessibilityConsts.EVENTS.RESOURCE;

	var NEW_TAB = 'walkme-open-in-new-tab-button';
	var CLOSE_LINK = 'walkme-light-box-x-button';
	var RESOURCE_ID = 'walkme-content-light-box';
	var DEFAULT_TEXT_KEY = accessibilityConsts.DEFAULT_TEXT_KEY;

    var _focusableLightBoxSelector = {
        IFRAME: 'iframe',
        NEW_TAB: '#' + NEW_TAB,
        CLOSE_LINK : '#' + CLOSE_LINK
    };

	function init(deployablesRoles, deployablesAriaLabels) {
		bindEvents();
		_deployablesRoles = deployablesRoles;
		_deployablesAriaLabels = deployablesAriaLabels;
	}

	function bindEvents() {
		_walkmeInternals.bind(_resourceEvents.LightBoxDivCreated, handleLightBox);
		_walkmeInternals.bind(_resourceEvents.LightBoxDivCentered, focusToLightBox);
		_walkmeInternals.bind(_resourceEvents.ContentRemoved, focusTracker.focus);
		_walkmeInternals.bind(_resourceEvents.ActivatingContent, returnFocusForNewTabResource);
	}

	function handleLightBox(event, params) {
		var lightBoxElement = params.lightBoxDiv;
		var lightBox = params.content;

        focusTracker.addToStack(elementsGetter.findLastFocusedElement(), accessibilityConsts.FOCUS_TRACKING_ELEMENTS_TYPES.resource);

		wmAccessibilityCommonUtils.moveElementToEnd(lightBoxElement, _focusableLightBoxSelector.NEW_TAB);
		wmAccessibilityCommonUtils.moveElementToEnd(lightBoxElement, _focusableLightBoxSelector.CLOSE_LINK);

        var focusableElements = dialogTabbaleElementsPreparer.prepareTabbableElements(lightBoxElement, _focusableLightBoxSelector, false, true);

		wmAccessibilityCommonUtils.handleFocusElements(lightBoxElement, focusableElements, _focusableLightBoxSelector.CLOSE_LINK, true);

		commonUtils.setRole(lightBoxElement, _deployablesRoles.resource || 'dialog');
		ariaAttributesSetter.setAriaLabel(lightBoxElement, _deployablesAriaLabels.resource || lightBox.Name);

        setButtonAttributes(lightBoxElement, _focusableLightBoxSelector.CLOSE_LINK, CLOSE_LINK + '-img', defaultTextGetter.getValue(DEFAULT_TEXT_KEY.Close));
        setButtonAttributes(lightBoxElement, _focusableLightBoxSelector.NEW_TAB, NEW_TAB + '-img', defaultTextGetter.getValue(DEFAULT_TEXT_KEY.OpenInNewTab));

        var iframes = wmjQuery('iframe', lightBoxElement);
        iframes.attr('title', lightBox.Name);

        if (wmAccessibilityCommonUtils.shouldAddAriaHidden(true)) {
            elementsHidingManager.hideAllButPopup(lightBoxElement, RESOURCE_ID, _resourceEvents.ContentRemoved);
        }
	}

	function focusToLightBox(event, params) {
        var lightBoxElement = params.lightBoxDiv;
		lightBoxElement.focus();
	}

	function setButtonAttributes(lightBoxElement, buttonSelector, imgId, imgAlt) {
        var img = wmjQuery(buttonSelector +' > img', lightBoxElement);
        img.attr('id', imgId);
        img.attr('alt', imgAlt);

        var button = wmjQuery(buttonSelector, lightBoxElement);
        commonUtils.setRole(button, 'button');
        ariaAttributesSetter.setAriaLabelledBy(button, imgId);
        button.removeAttr('title');
	}

	function returnFocusForNewTabResource(e, data) {
		var resource = data.content;

		if (resource.Settings.ContentPlayMode == consts.PLAY_MODE.NewTab) {
			focusTracker.focus();
		}
	}
}


/***/ }),

/***/ 9954:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

var getCtx = (__webpack_require__(8912)/* .getCtx */ .yK);
getCtx().register('ShoutoutAccessibilityHandler')
	.asCtor(ShoutoutAccessibilityHandler)
	.dependencies('WmAccessibilityCommonUtils, CommonUtils, AriaAttributesSetter, DialogTextSetter, ' +
		'DialogTabbaleElementsPreparer, DesignTemplatePlaceholdersRolesSetter, DefaultTextGetter, ' +
		'ElementsHidingManager, AccessibilityConsts, wmjQuery, FocusTracker, Consts, ElementsGetter, FeaturesManager');

function ShoutoutAccessibilityHandler(wmAccessibilityCommonUtils, commonUtils, ariaAttributesSetter, dialogTextSetter,
									  dialogTabbaleElementsPreparer, designTemplatePlaceholdersRolesSetter, defaultTextGetter,
									  elementsHidingManager, accessibilityConsts, wmjQuery, focusTracker, consts, elementsGetter, featuresManager) {
	var _this = this;
	_this.init = init;

	var _deployablesRoles;
	var _deployablesAriaLabels;
	var _shoutoutDeployableType = accessibilityConsts.DEPLOYABLE_TYPES.shoutout;
	var _shoutoutEvents = accessibilityConsts.EVENTS.SHOUTOUT;

	var _shoutoutTitle = "wm-title";
	var _shoutoutContent = "wm-template-text";

	var SHOUTOUT_ID_PREFIX = 'wm-shoutout-';
	var SHOUTOUT_ID = 1;
    var RETURN_FOCUS_TO_PAGE_ACTIONS = ["none", "destroy"];
    var SHOUTOUT_CLICK_TYPE = consts.SHOUTOUT_CLICK_TYPE;
    var _focusableShoutoutSelector = {
		ACTION_BUTTON : ".wm-blue-btn",
		CLOSE_LINK :  ".wm-close-link",
		CLOSE_BUTTON :  ".wm-close-button"
	};

	function init(deployablesRoles, deployablesAriaLabels) {
		bindEvents();
		_deployablesRoles = deployablesRoles;
		_deployablesAriaLabels = deployablesAriaLabels;
	}

	function bindEvents() {
		_walkmeInternals.bind(_shoutoutEvents.ShoutoutDisplayed, handleShoutout);
		_walkmeInternals.bind(_shoutoutEvents.ShoutOutClosed, handleShoutoutClose);
	}

	function handleShoutout(type, component) {
        if (component && component._uiComponent && component._uiComponent.UiComponentId == SHOUTOUT_ID) {
            var id = component._uiComponent.Id;
            var uiContainer = wmjQuery('#' + SHOUTOUT_ID_PREFIX + id);
            focusTracker.addToStack(elementsGetter.findLastFocusedElement(), accessibilityConsts.FOCUS_TRACKING_ELEMENTS_TYPES.shoutout);

            var actionButton = wmjQuery(_focusableShoutoutSelector.ACTION_BUTTON, uiContainer);
            setRoleButton(actionButton);

            var closeButton = wmjQuery(_focusableShoutoutSelector.CLOSE_LINK, uiContainer);
            setRoleButton(closeButton);

            var xButtonElement = wmjQuery(_focusableShoutoutSelector.CLOSE_BUTTON, uiContainer);
            setRoleButton(xButtonElement);
            wmAccessibilityCommonUtils.setXButtonLabel(xButtonElement);

            var closeButtonSelector = xButtonElement.length ?
                _focusableShoutoutSelector.CLOSE_BUTTON : _focusableShoutoutSelector.CLOSE_LINK;

            wmAccessibilityCommonUtils.addTitlesToFrames(uiContainer);

            designTemplatePlaceholdersRolesSetter.setDefaultRoleForActionPlaceholders(uiContainer);

            handleContainer(component, id, uiContainer, closeButtonSelector);
        }
    }

	function setRoleButton(element) {
		commonUtils.setRole(element, 'button');
	}

	function handleContainer(component, id, uiContainer, closeButtonSelector) {
		if (!featuresManager.isFeatureEnabled('focusXButtonFirst')) {
        	wmAccessibilityCommonUtils.moveElementToEnd(uiContainer, _focusableShoutoutSelector.CLOSE_BUTTON);
		}
		
        var focusableElements = dialogTabbaleElementsPreparer.prepareTabbableElements(uiContainer, _focusableShoutoutSelector, true);

        var hasSpotlight = !!component._settings.overlay;
        var disableFocusLock = wmAccessibilityCommonUtils.shouldDisableFocusLock(_shoutoutDeployableType, id);

		wmAccessibilityCommonUtils.handleFocusElements(uiContainer, focusableElements, closeButtonSelector, hasSpotlight || !disableFocusLock);

		focusableElements[0].focus();
		var shoutoutTitle = wmjQuery("." + _shoutoutTitle);
		
		commonUtils.setRole(uiContainer, _deployablesRoles.shoutOut || 'dialog');
		ariaAttributesSetter.setAriaLabel(uiContainer, _deployablesAriaLabels.shoutOut || defaultTextGetter.getValue(accessibilityConsts.DEFAULT_TEXT_KEY.ShoutOut));
		dialogTextSetter.setText(uiContainer, id, _shoutoutTitle, _shoutoutContent);
		commonUtils.setRole(shoutoutTitle, 'heading');
		ariaAttributesSetter.setAriaLevel(shoutoutTitle, '2');

		if (wmAccessibilityCommonUtils.shouldAddAriaHidden(hasSpotlight, _shoutoutDeployableType, id)) {
			elementsHidingManager.hideAllButPopup(uiContainer, SHOUTOUT_ID_PREFIX + id, _shoutoutEvents.ShoutOutClosed);
		}
	}

	function handleShoutoutClose(e, data) {
	    var clickType = data.clickType;

        if (clickType === SHOUTOUT_CLICK_TYPE.XButton || clickType === SHOUTOUT_CLICK_TYPE.RemindMeLater ||
			((clickType === SHOUTOUT_CLICK_TYPE.Close || clickType === SHOUTOUT_CLICK_TYPE.Action) && isCloseAction(data.action))) {
        	focusTracker.focus();
		}
	}

	function isCloseAction(actionConfig) {
        return actionConfig && wmjQuery.inArray(actionConfig.Type, RETURN_FOCUS_TO_PAGE_ACTIONS) !== -1;
    }
}


/***/ }),

/***/ 208:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

var getCtx = (__webpack_require__(8912)/* .getCtx */ .yK);
getCtx().register('ShoutoutVisualDesignAccessibilityHandler')
	.asCtor(ShoutoutVisualDesignAccessibilityHandler)
	.dependencies('AccessibilityConsts, FocusTracker, ElementsGetter, WmAccessibilityCommonUtils, Consts, EventsListener, FeaturesManager, WmAccessibilityCss, CommonUtils, AriaAttributesSetter');

function ShoutoutVisualDesignAccessibilityHandler(accessibilityConsts, focusTracker, elementsGetter, wmAccessibilityCommonUtils, consts, eventsListener, featuresManager, wmAccessibilityCss, commonUtils, ariaAttributesSetter){
	var _this = this;

	_this.init = init;

	var _shoutoutEvents = accessibilityConsts.EVENTS.SHOUTOUT;
	var _shoutoutDeployableType = accessibilityConsts.DEPLOYABLE_TYPES.shoutout;
	var SHOUTOUT_CLICK_TYPE = consts.SHOUTOUT_CLICK_TYPE;
	var RETURN_FOCUS_TO_PAGE_ACTIONS = ["none", "destroy"];
	var SHOUTOUT_ID = 1;
	var VISUAL_DESIGN_ID_PREFIX = 'walkme-visual-design-';

	function init() {
		bindEvents();
	}

	function bindEvents() {
		eventsListener.on(_shoutoutEvents.ShoutoutDisplayed, handleShoutoutShow);
		eventsListener.on(_shoutoutEvents.ShoutOutClosed, handleShoutoutClose);
	}

	function handleShoutoutShow(type, component){
		var uiComponent = component && component.getComponent && component.getComponent();

		if(uiComponent.UiComponentId === SHOUTOUT_ID && uiComponent.VisualDesign){
			focusTracker.addToStack(elementsGetter.findLastFocusedElement(), accessibilityConsts.FOCUS_TRACKING_ELEMENTS_TYPES.shoutout);

			var uiContainer = wmjQuery('#' + VISUAL_DESIGN_ID_PREFIX + uiComponent.VisualDesign.Id);

			var shadowRoot = uiContainer[0] && uiContainer[0].shadowRoot;
			if(shadowRoot){
				uiContainer = wmjQuery(shadowRoot.firstElementChild);

				var styleElement = document.createElement('style');
				styleElement.innerHTML = wmAccessibilityCss.getCss();
				shadowRoot.prepend(styleElement);
			}

			handleContainer(uiComponent, uiComponent.Id, uiContainer);
		}
	}

	function handleContainer(component, id, uiContainer){
		handleLottieElements(uiContainer);

		var focusableElements = wmAccessibilityCommonUtils.getFocusablesInsideElement(uiContainer, true, true);
		var xButton = uiContainer.find('[aria-label="close"]');
		if (featuresManager.isFeatureEnabled('sortSOVisualDesignFocusables')) {
			commonUtils.setRole(uiContainer,'dialog');
		}

		if(!focusableElements.length){
			focusableElements = uiContainer;
		}

		var hasSpotlight = !!component.VisualDesign.Style.backcover;
		var enableFocusLock = hasSpotlight || !wmAccessibilityCommonUtils.shouldDisableFocusLock(_shoutoutDeployableType, id);
		var isDynamicLayout = uiContainer.hasClass('wm-visual-design-full-flex-canvas');

		if (featuresManager.isFeatureEnabled('sortSOVisualDesignFocusables')) {
			if (!isDynamicLayout) {
				sortFreeTemplate(uiContainer);

				focusableElements = wmAccessibilityCommonUtils.getFocusablesInsideElement(uiContainer, true, true);
			}
			else {
				sortFlexTemplate(uiContainer, xButton);
				focusableElements = wmAccessibilityCommonUtils.getFocusablesInsideElement(uiContainer, true, true);
			}

		} else {
			if (featuresManager.isFeatureEnabled('focusXButtonFirst')) {
				wmAccessibilityCommonUtils.moveElementToStart(uiContainer, xButton);
			}
		}
		
		if (featuresManager.isFeatureEnabled('dynamicSOMouseReader') && isDynamicLayout) {
			handleDynamicMouseReader(uiContainer);
		}

		wmAccessibilityCommonUtils.handleFocusElements(uiContainer, focusableElements, '', enableFocusLock);

		focusableElements[0].focus();
	}

	function handleShoutoutClose(e, data) {
		var clickType = data.clickType;

		if (clickType === SHOUTOUT_CLICK_TYPE.XButton || clickType === SHOUTOUT_CLICK_TYPE.RemindMeLater ||
			((clickType === SHOUTOUT_CLICK_TYPE.Close || clickType === SHOUTOUT_CLICK_TYPE.Action) && isCloseAction(data.action))) {
			focusTracker.focus();
		}
	}

	function isCloseAction(actionConfig) {
		return actionConfig && wmjQuery.inArray(actionConfig.type, RETURN_FOCUS_TO_PAGE_ACTIONS) !== -1;
	}

	function sortFreeTemplate(uiContainer) {
		var elementsArr = uiContainer.children().get();
		
		elementsArr = elementsArr.sort(function(a, b) {
			var aIsShapeImage = a.tagName === 'IMG' || a.classList.contains('wm-visual-design-shape');
			var bIsShapeImage = b.tagName === 'IMG' || b.classList.contains('wm-visual-design-shape');
			if (aIsShapeImage && bIsShapeImage) {
					return 0;
			}
			
			if (aIsShapeImage) {
				return -1;
			}

			if (bIsShapeImage) {
				return 1;
			}
			
			boundingDiff = a.getBoundingClientRect().y - b.getBoundingClientRect().y || a.getBoundingClientRect().x - b.getBoundingClientRect().x;
			return boundingDiff;
		});

		for (var i = 0; i < elementsArr.length; i++) {
			if (elementsArr[i].tagName === 'A') {
				elementsArr[i] = elementsArr[i].closest('.wm-visual-design-rich-text');
			}
			wmAccessibilityCommonUtils.moveElementToEnd(uiContainer, elementsArr[i]);
		}
	}

	function sortFlexTemplate(uiContainer, xButton) {
		if (featuresManager.isFeatureEnabled('focusXButtonFirst')) {
			var xButtonContainer = xButton.closest('.wm-visual-design-flex-container');
			wmAccessibilityCommonUtils.moveElementToStart(uiContainer, xButtonContainer);
			xButtonContainer.css('z-index',2147483647);
		}
	}

	function handleDynamicMouseReader(uiContainer) {
		var buttons = uiContainer.find('.wm-visual-design-button');
		buttons.each(function(index, button) {
			var buttonText = button.getAttribute('aria-label') || button.innerText;
			var border = wmjQuery('#border-' + button.id);

			if (border) {
				var borderElement = border[0];
				borderElement.innerText = buttonText;
				borderElement.style.setProperty('color','transparent','important');
				borderElement.style.setProperty('font-size','2em','important');
			}
		});
	}

	function handleLottieElements(uiContainer) {
		var lottieElements = uiContainer.find('.wm-visual-design-lottie');
		lottieElements.each(function(index, lottie) {
			var alt = lottie.getAttribute('alt');
			var lottieShadowElement = wmjQuery(lottie.shadowRoot.firstElementChild);
			ariaAttributesSetter.setAriaLabel(lottieShadowElement, alt);
		})
	}
}



/***/ }),

/***/ 8916:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

var getCtx = (__webpack_require__(8912)/* .getCtx */ .yK);
getCtx().register('ShuttleAccessibilityHandler')
	.asCtor(ShuttleAccessibilityHandler)
	.dependencies('FocusTracker, AccessibilityConsts, CommonUtils, Consts');

function ShuttleAccessibilityHandler(focusTracker, accessibilityConsts, commonUtils, consts) {
	var _this = this;
	_this.init = init;

	var PLAY_MODE = consts.PLAY_MODE;

	function init() {
		bindEvents();
	}

	function bindEvents() {
		_walkmeInternals.bind(accessibilityConsts.EVENTS.SHUTTLE.ActivatingShuttle, saveLastFocusedElement);
	}

	function saveLastFocusedElement(e, params) {
        var playMode = parseInt(commonUtils.getSettingsValue(params.shuttle.Settings, "ShuttlePlayMode", PLAY_MODE.SameTab));

        if (playMode === PLAY_MODE.NewTab) {
            focusTracker.focus();
		}
	}
}


/***/ }),

/***/ 1597:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

var getCtx = (__webpack_require__(8912)/* .getCtx */ .yK);

getCtx().register('SmartTipElementsGetter')
    .asCtor(SmartTipElementsGetter)
    .dependencies('AccessibilityConsts, wmjQuery, IdGetter, SmartTipToElementMapper');

function SmartTipElementsGetter(accessibilityConsts, wmjQuery, idGetter,smartTipToElementMapper) {
    var _this = this;
    _this.findLastFocusedElement = findLastFocusedElement;

    var ELEMENT_TYPES_PREFIX = accessibilityConsts.ELEMENT_TYPES_PREFIX;

    function findLastFocusedElement(currentElement) {
        var smartTipTooltipParent = currentElement.parents(accessibilityConsts.ELEMENTS_SELECTORS.SMART_TIP.tooltip);

        if (smartTipTooltipParent.length !== 0) {
            var id = idGetter.getIdByElement(smartTipTooltipParent, ELEMENT_TYPES_PREFIX.smartTipTooltip);
            var iconElement = wmjQuery('.' + ELEMENT_TYPES_PREFIX.smartTipIcon + id);

            return iconElement.length ? iconElement : smartTipToElementMapper.getElementBySmartTipId(id);
        }
    }
}



/***/ }),

/***/ 7975:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

var getCtx = (__webpack_require__(8912)/* .getCtx */ .yK);

getCtx().register('SmartTipFocusHandler')
	.asCtor(SmartTipFocusHandler)
	.dependencies('wmjQuery, WmAccessibilityCommonUtils, IdGetter, AccessibilityConsts, ElementsGetter, SmartTipIdentifier, ' +
		'FocusEventDispatcher, DummyTabOrganizer, SmartTipToElementMapper, JQueryElementFinder');

function SmartTipFocusHandler(wmjQuery, wmAccessibilityCommonUtils, idGetter, accessibilityConsts, elementsGetter, smartTipIdentifier,
                              focusEventDispatcher, dummyTabOrganizer, smartTipToElementMapper, jQueryElementFinder) {
	var _this = this;

	_this.moveFocus = moveFocus;

	var PREFIXES = accessibilityConsts.ELEMENT_TYPES_PREFIX;
	var ICON_PREFIX = PREFIXES.smartTipIcon;
	var TOOLTIP_PREFIX = PREFIXES.smartTipTooltip;
	var TOOLTIP_SELECTOR = accessibilityConsts.ELEMENTS_SELECTORS.SMART_TIP.tooltip;
	var DEPLOYABLE_TYPES = accessibilityConsts.DEPLOYABLE_TYPES;
	var DIRECTIONS = accessibilityConsts.DIRECTIONS;

	function moveFocus(originalFocusedElement, event) {
		var tabbableElements = elementsGetter.getAllTabbablesOnPageOrdered();

		if (event.shiftKey) {
			if (smartTipIdentifier.isSmartTipIconElement(originalFocusedElement)) {
				moveToPageElement(DEPLOYABLE_TYPES.smartTipIcon,
					originalFocusedElement, DIRECTIONS.back, tabbableElements);
			}
			else {
				var prevElement = getAdjacentTabbableElementFromElement(tabbableElements, originalFocusedElement, true);
				var tooltipContainingOriginalFocusedElement = originalFocusedElement.parents(TOOLTIP_SELECTOR);
				var isPrevElementInTooltip = prevElement.parents(TOOLTIP_SELECTOR).length > 0;

				if (tooltipContainingOriginalFocusedElement.length === 0 || isPrevElementInTooltip) {
                    originalFocusedElement.blur();
					prevElement.focus();

					if (!isPrevElementInTooltip) {
                        focusEventDispatcher.dispatch(prevElement[0]);
						announceValidation(event.target);
					}
				}
				else {
					moveToPageElement(DEPLOYABLE_TYPES.smartTipTooltip,
						tooltipContainingOriginalFocusedElement, DIRECTIONS.back, tabbableElements);
				}
			}
		}
		else {
            var destinationSmartTipId = getDestinationSmartTipId(originalFocusedElement);

			if (destinationSmartTipId) {
                moveFocusToIcon(destinationSmartTipId) || moveFocusFromElementWithTooltip(tabbableElements, destinationSmartTipId);
			}
			else {
				var smartTipId;

				if (originalFocusedElement.attr("class")) {
					smartTipId = idGetter.getIdByElement(originalFocusedElement, ICON_PREFIX);
				}

				if (smartTipId) {
					moveFocusFromElementWithTooltip(tabbableElements, smartTipId);
				}
				else {
					var nextTabbableElement = getAdjacentTabbableElementFromElement(tabbableElements, originalFocusedElement);
					var focusedElementTooltipWrapper = originalFocusedElement.parents(TOOLTIP_SELECTOR);
					var result;

					if (focusedElementTooltipWrapper.length > 0) {
                        result = moveFocusFromTooltipInnerElement(tabbableElements, nextTabbableElement, focusedElementTooltipWrapper);
					}

                    if (!result) {
                        nextTabbableElement.focus();

                        if (nextTabbableElement.parents(TOOLTIP_SELECTOR).length === 0) {
                            focusEventDispatcher.dispatch(nextTabbableElement[0]);
                        }
                    }
				}
			}
		}
	}

	function moveToPageElement(smartTipType, smartTipElement, direction, orderedTabbableElements) {
		var smartTipId = idGetter.getIdByElement(smartTipElement, PREFIXES[smartTipType]);
		var smartTipLinkedElement = smartTipToElementMapper.getElementBySmartTipId(smartTipId);

		if (dummyTabOrganizer.isDummyTabOrganizer(smartTipLinkedElement, smartTipType, smartTipId)) {
			dummyTabOrganizer.focusNearDummy(smartTipType, smartTipId, direction, orderedTabbableElements);
		}
		else {
			smartTipLinkedElement.focus();
			focusEventDispatcher.dispatch(smartTipLinkedElement[0]);
		}
	}

	function announceValidation(blurredElement) {
		var smartTipDetails = smartTipToElementMapper.getSmartTipDetailsByElement(blurredElement);

		if (smartTipDetails && smartTipDetails.canHaveConditionalIcon) {
			var validationSmartTipIcon = wmjQuery('.' + ICON_PREFIX + smartTipDetails.smartTipId);

			if (validationSmartTipIcon.length > 0) {
				wmAccessibilityCommonUtils.announce(validationSmartTipIcon[0].getAttribute('aria-label') || "");
			}
		}
	}

	function getDestinationSmartTipId(originalFocusedElement) {
		var smartTipDetails = smartTipToElementMapper.getSmartTipDetailsByElement(originalFocusedElement);
		return smartTipDetails && smartTipDetails.smartTipId;
	}

	function moveFocusToIcon(smartTipId) {
		var iconElement = jQueryElementFinder.findElementsByjQueryComplexSelector('.' + ICON_PREFIX + smartTipId);

		if (iconElement.length > 0) {
			iconElement.focus();

			return true;
		}

		return false;
	}

	function moveFocusFromElementWithTooltip(tabbableElements, smartTipId) {
		var smartTipElement = smartTipToElementMapper.getElementBySmartTipId(smartTipId);
		
		if (!smartTipElement) {
			return false;
		}

		var tabbableTooltipElement = getClosestTabbableTooltipElement(tabbableElements, smartTipId);

		if (!tabbableTooltipElement) {
			var nextTabbableElement = getAdjacentTabbableElementFromElement(tabbableElements, smartTipElement);
			smartTipElement.blur();
			nextTabbableElement.focus();
			focusEventDispatcher.dispatch(nextTabbableElement[0]);
		}
		else {
			tabbableTooltipElement.focus();
		}

		return true;
	}

	function getClosestTabbableTooltipElement(tabbableElements, smartTipId) {
        var tooltipElement = wmjQuery('.' + TOOLTIP_PREFIX + smartTipId);

        if (!tooltipElement[0]) {
        	return;
		}

		var firstTooltipElement = wmjQuery(tooltipElement.find(":tabbable")[0]);
		return firstTooltipElement.length ? firstTooltipElement : undefined;
	}

	function getAdjacentTabbableElementFromElement(tabbableElements, element, isPrevNeeded) {
		var notIconAdjacentElement;
		var elementIndex = tabbableElements.index(element);

		var destinationIndex = isPrevNeeded ?
					getPreviousTabbableElementIndex(elementIndex, tabbableElements) :
					getNextTabbableElementIndex(elementIndex, tabbableElements);

		while (!notIconAdjacentElement) {
			var currAdjacentElement = wmjQuery(tabbableElements[destinationIndex]);

			if (isElementTabbableAsAdjacent(element, currAdjacentElement)) {
                notIconAdjacentElement = currAdjacentElement;
			}
			else {
                destinationIndex = isPrevNeeded ?
                    getPreviousTabbableElementIndex(destinationIndex, tabbableElements) :
                    getNextTabbableElementIndex(destinationIndex, tabbableElements);
			}
		}

		return notIconAdjacentElement;
	}

	function isElementTabbableAsAdjacent(sourceElement, destinationElement) {
		if (smartTipIdentifier.isSmartTipIconElement(destinationElement)) {
			return false;
		}

        var destinationElementTooltipAncestor = destinationElement.parents(TOOLTIP_SELECTOR)[0];

        if (!destinationElementTooltipAncestor) {
        	return true;
		}

        var sourceElementTooltipAncestor = sourceElement.parents(TOOLTIP_SELECTOR)[0];

        return sourceElementTooltipAncestor == destinationElementTooltipAncestor;
	}

	function getNextTabbableElementIndex(index, tabbableElements) {
		if (index < tabbableElements.length - 1) {
			return index + 1;
		}

		var dummyLastElement = wmjQuery('#walkme-dummy-last-element');

		return wmjQuery.inArray(dummyLastElement, tabbableElements);
	}

	function getPreviousTabbableElementIndex(index, tabbableElements) {
		return index > 0 ? index - 1 : tabbableElements.length - 1;
	}

	function moveFocusFromTooltipInnerElement(tabbableElements, nextTabbableElement, focusedElementTooltipWrapper) {
		var nextTabbableElementTooltipWrapper = nextTabbableElement.parents(TOOLTIP_SELECTOR);

		if (nextTabbableElementTooltipWrapper.length == 0) {
			var tooltipSmartTipId = idGetter.getIdByElement(focusedElementTooltipWrapper, TOOLTIP_PREFIX);
			nextTabbableElement = getAdjacentTabbableElementFromElement(tabbableElements, smartTipToElementMapper.getElementBySmartTipId(tooltipSmartTipId));
			nextTabbableElement.focus();
            focusEventDispatcher.dispatch(nextTabbableElement[0]);

			return true;
		}

		return false;
	}
}


/***/ }),

/***/ 6105:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

var getCtx = (__webpack_require__(8912)/* .getCtx */ .yK);

getCtx().register('SmartTipToElementMapper')
    .asCtor(SmartTipToElementMapper);

function SmartTipToElementMapper() {
    var _this = this;
    _this.addSmartTipDetails = addSmartTipDetails;
    _this.getSmartTipDetailsByElement = getSmartTipDetailsByElement;
    _this.addElementForSmartTipId = addElementForSmartTipId;
    _this.getElementBySmartTipId = getElementBySmartTipId;

    var _smartTipIdsForElements = [];
    var _elementsForSmartTipIds = {};

    function addSmartTipDetails(smartTipId, element, canHaveConditionalIcon) {
        _smartTipIdsForElements.push({
            element: element,
            smartTipId: smartTipId,
            canHaveConditionalIcon: canHaveConditionalIcon
        });
    }

    function getSmartTipDetailsByElement(element) {
        for (var i = 0; i < _smartTipIdsForElements.length; i++) {
            if (_smartTipIdsForElements[i].element.is(element)) {
                return _smartTipIdsForElements[i];
            }
        }
    }

    function addElementForSmartTipId(smartTipId, element) {
        _elementsForSmartTipIds[smartTipId] = element;
    }

    function getElementBySmartTipId(smartTipId) {
        return _elementsForSmartTipIds[smartTipId];
    }
}



/***/ }),

/***/ 9608:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

var getCtx = (__webpack_require__(8912)/* .getCtx */ .yK);
getCtx().register('SmartTipAccessibilityHandler')
    .asCtor(SmartTipAccessibilityHandler)
    .dependencies('WmAccessibilityCommonUtils, CommonUtils, wmjQuery, TimerManager, SmartTipFocusHandler, BBCodeParser, ' +
        'EventHandlerBindingManager, IdGetter, DummyLastElementAdder, AllowedTabbableElementFinder, Consts, ' +
        'FocusLockChecker, AccessibilityConsts, ElementsGetter, ' +
        'FocusBehaviorSetter, AriaAttributesSetter, FeaturesManager, DefaultTextGetter, ' +
        'DummyTabOrganizer, ElementInIframeIndicator, SmartTipToElementMapper, DomManager, JQueryElementFinder');

function SmartTipAccessibilityHandler(wmAccessibilityCommonUtils, commonUtils, wmjQuery, timerManager, smartTipFocusHandler, bbcodeParser,
                                      eventHandlerBindingManager, idGetter, dummyLastElementAdder, allowedTabbableElementFinder, consts,
                                      focusLockChecker, accessibilityConsts, elementsGetter,
                                      focusBehaviorSetter, ariaAttributesSetter, featuresManager, defaultTextGetter,
                                      dummyTabOrganizer, elementInIframeIndicator, smartTipToElementMapper, domManager, jQueryElementFinder) {
    var _this = this;

    var _deployablesRoles;
    var _shouldDisableFocusLockCheck;

    var TAB_KEY = accessibilityConsts.KEY_CODES.TAB;
    var PREFIXES = accessibilityConsts.ELEMENT_TYPES_PREFIX;
    var ICON_PREFIX = PREFIXES.smartTipIcon;
    var EVENTS = accessibilityConsts.EVENTS.SMART_TIP;
    var DEPLOYABLE_TYPES = accessibilityConsts.DEPLOYABLE_TYPES;
    var ICON_TYPE = DEPLOYABLE_TYPES.smartTipIcon;
    var TOOLTIP_TYPE = DEPLOYABLE_TYPES.smartTipTooltip;
    var DEFAULT_TEXT_KEY = accessibilityConsts.DEFAULT_TEXT_KEY;

    _this.init = function init(deployablesRoles, deployablesAriaLabels) {
        if (featuresManager.isFeatureEnabled(accessibilityConsts.FEATURES.DisableSmartTipsAccessibility)) {
            return;
        }

        bindEvents();
        _deployablesRoles = deployablesRoles;
        _deployablesAriaLabels = deployablesAriaLabels;
        _shouldDisableFocusLockCheck = featuresManager.isFeatureEnabled('handleSmartTipsFocusLock');
    };

    function bindEvents() {
        _walkmeInternals.bind(EVENTS.SmartTipElementShown, handleSmartTipLinkedElement);
        _walkmeInternals.bind(EVENTS.SmartTipElementRemoved, onSmartTipLinkedElementRemoved);
        _walkmeInternals.bind(EVENTS.SmartTipIconShown, handleSmartTipIcon);
        _walkmeInternals.bind(EVENTS.SmartTipIconDestroyed, onSmartTipIconDestroyed);
        _walkmeInternals.bind(EVENTS.SmartTipTooltipShown, handleSmartTipTooltip);
        _walkmeInternals.bind(EVENTS.SmartTipTooltipDestroyed, onSmartTipTooltipDestroyed);
    }

    function handleTabKeyPressed(event) {
        if (event.which == TAB_KEY) {
            if (!_shouldDisableFocusLockCheck && focusLockChecker.isFocusLocked()) {
                return;
            }

            var activeElement = elementsGetter.getActiveElement();
            var tabbableElements = elementsGetter.getAllTabbablesOnPageOrdered();

            if (event.shiftKey) {
                if (activeElement == tabbableElements[0]) {
                    return;
                }
            }
            else if (isDummyLastElement(activeElement)) {
                if (isDummyLastElementActualLastElement(tabbableElements)) {
                    return;
                }
                else {
                    var foundActiveElementIndex = wmjQuery.inArray(activeElement, tabbableElements);
                    var activeElementIndex = foundActiveElementIndex > -1 ? foundActiveElementIndex : undefined;
                    var allowedTabbableElement = allowedTabbableElementFinder.findNext(activeElementIndex, tabbableElements);
                    dummyLastElementAdder.reAdd();

                    if (allowedTabbableElement) {
                        allowedTabbableElement.focus();
                        event.preventDefault();

                        return;
                    }
                    else {
                        wmjQuery('#walkme-dummy-last-element').trigger('focus', {isAlreadyFocused: true});

                        return;
                    }
                }
            }

            if (isDummyLastElementExists() && !isDummyLastElementActualLastElement(tabbableElements)) {
                dummyLastElementAdder.reAdd();
            }

            var originalFocusedElement = wmjQuery(activeElement);

            if (originalFocusedElement.parents(".walkme-custom-balloon-outer-div, .wm-shoutout").length == 0) {
                timerManager.setWalkmeTimeout(function() {
                    smartTipFocusHandler.moveFocus(originalFocusedElement, event);
                }, 150);

                var smartTipDetails = smartTipToElementMapper.getSmartTipDetailsByElement(activeElement);

                if (smartTipDetails && smartTipDetails.canHaveConditionalIcon) {
                    var blurEvent = wmjQuery.Event('blur', {shouldPreventDefault: true});
                    originalFocusedElement.trigger(blurEvent);
                }

                event.preventDefault();
            }
        }
    }

    function isDummyLastElementActualLastElement(tabbableElements) {
        var actualLastElement = tabbableElements[tabbableElements.length - 1];

        return isDummyLastElement(actualLastElement);
    }

    function isDummyLastElement(element) {
        return element == wmjQuery('#walkme-dummy-last-element')[0];
    }

    function isDummyLastElementExists() {
        return wmjQuery('#walkme-dummy-last-element').length;
    }

    function handleSmartTipLinkedElement(evnt, eventData) {
        var smartTip = eventData.smartTip;

        if (!smartTip) {
            return;
        }

        var element = eventData.element;

        if (elementInIframeIndicator.isInIframe(element)) {
            return;
        }

        var smartTipId = smartTip.Id;
        handleValidationSmartTipLinkedElement(smartTip, element);

        smartTipToElementMapper.addSmartTipDetails(smartTipId, element, !smartTip.Info && (smartTip.Validations.length > 0 || smartTip.PositiveFeedback));
        var tabbableElements = elementsGetter.getNonWalkmeTabbablesOrdered();
        if (element[0] === tabbableElements[tabbableElements.length-1] && !isDummyLastElementExists()) {
            dummyLastElementAdder.add();
            eventHandlerBindingManager.bind('keydown', handleTabKeyPressed, wmjQuery('#walkme-dummy-last-element'));
        }

        if (element.is(":focusable")) {
            smartTipToElementMapper.addElementForSmartTipId(smartTipId, element);
            eventHandlerBindingManager.bind('keydown', handleTabKeyPressed, element);
            hoverOnFocus(element);
            handleInfoSmartTipLinkedElement(smartTip, element);
        } else {
            var position = smartTip.Settings.Position;
            var smartTipType = smartTip.Info.IsWithIcon ?
                ICON_TYPE :
                TOOLTIP_TYPE;
            var display = jQueryElementFinder.findElementsByjQueryComplexSelector("." + PREFIXES[smartTipType] + smartTipId).css("display");

            dummyTabOrganizer.createDummyElement(smartTipType, smartTipId, position, element, display || "none", _deployablesRoles).then(function(dummyElement) {
                smartTipToElementMapper.addElementForSmartTipId(smartTipId, dummyElement);
            });
        }
    }

    function onSmartTipLinkedElementRemoved(evnt, eventData) {
        var smartTip = eventData.smartTip;
        var smartTipId = smartTip.Id;
        var element = smartTipToElementMapper.getElementBySmartTipId(smartTipId);

        element && eventHandlerBindingManager.unbindSpecificByElement(element, 'keydown', handleTabKeyPressed);

        var smartTipType = smartTip.Info.IsWithIcon ?
            ICON_TYPE :
            TOOLTIP_TYPE;
        dummyTabOrganizer.removeDummy(smartTipType, smartTipId);
    }

    function handleValidationSmartTipLinkedElement(smartTip, element) {
        var tooltipIds = getValidationTooltipIdsForElement(smartTip);
        var describedBy = element && element.length && element[0].getAttribute('aria-describedby') || '';

        for (var i = 0; i < tooltipIds.length; i++) {
            var tooltipElementId = 'walkme-tooltip-' + tooltipIds[i];
            describedBy += " " + tooltipElementId;
        }

        describedBy = describedBy.replace(/^\s+|\s+$/g, '');

        if (describedBy) {
            ariaAttributesSetter.setAriaDescribedBy(element, describedBy);
        }

        if (!smartTip.PositiveFeedback && smartTip.Validations.length > 0) {
            eventHandlerBindingManager.bind('blur', getElementWithValidationBlurHandler(smartTip.Id), element);
        }
    }

    function handleInfoSmartTipLinkedElement(smartTip, element) {
        if (smartTip.Info) {
            var messageToAnnounce = smartTip.Info.IsWithIcon ?
                defaultTextGetter.getValue(DEFAULT_TEXT_KEY.GuidanceAvailable) :
                getTooltipTextForElement(smartTip.Info.TooltipText);

            eventHandlerBindingManager.bind('focus', function() {
                wmAccessibilityCommonUtils.announce(messageToAnnounce);
            }, element);
        }
    }

    function getTooltipTextForElement(text) {
        var tooltipAddon;
        var isAddonFirst = featuresManager.isFeatureEnabled('addTooltipRoleFirst');

        if (_deployablesAriaLabels.smartTipTooltip) {
            tooltipAddon = isAddonFirst ? _deployablesAriaLabels.smartTipTooltip : ' ' + _deployablesAriaLabels.smartTipTooltip;
        } else {
            tooltipAddon = isAddonFirst ? 'tooltip': '. tooltip'; 
        }

        return isAddonFirst 
            ? tooltipAddon + ' ' + getBbcodeParsedText(text)
            : getBbcodeParsedText(text) + tooltipAddon;
    }

    function getElementWithValidationBlurHandler(smartTipId) {
        return function () {
            if (wmjQuery('.walkme-custom-highlighter-smarttipid-' + smartTipId).length > 0 || wmjQuery('.' + ICON_PREFIX + smartTipId).length > 0) {
                timerManager.setWalkmeTimeout(function() {
                    if (wmjQuery('.walkme-custom-highlighter-smarttipid-' + smartTipId).length == 0 && wmjQuery('.' + ICON_PREFIX + smartTipId).length == 0) {
                        wmAccessibilityCommonUtils.announce(defaultTextGetter.getValue(DEFAULT_TEXT_KEY.LastInputValid));
                    }
                }, 100);
            }
        };
    }

    function getValidationTooltipIdsForElement(smartTip) {
        var ids = [];

        if(smartTip.PositiveFeedback && !smartTip.PositiveFeedback.IsWithIcon) {
            ids.push(smartTip.PositiveFeedback.Id);
        }

        if (smartTip.Validations) {
            for (var i = 0; i < smartTip.Validations.length; i++) {
                if (!smartTip.Validations[i].IsWithIcon) {
                    ids.push(smartTip.Validations[i].Id);
                }
            }
        }

        return ids;
    }

    function handleSmartTipIcon(evnt, eventData) {
        var smartTipId = eventData.smartTipModel.Id;
        var smartTipIconElement = jQueryElementFinder.findElementsByjQueryComplexSelector('.' + ICON_PREFIX + smartTipId);
        var uiComponent = eventData.uiComponent;
        var isSmartTipImgEnabled= featuresManager.isFeatureEnabled('smartTipImgAccessibility');

        if (smartTipIconElement.length !== 0) {
            fixIconTabIndex(smartTipIconElement, smartTipId);
            eventHandlerBindingManager.bind('keydown', handleTabKeyPressed, smartTipIconElement);

            var smartTipText = uiComponent && uiComponent.TooltipText;

            if (smartTipText) {
                smartTipText = getTooltipTextForElement(smartTipText);
                smartTipText = getTextWithReferenceToPreviousField(uiComponent.Type, smartTipText);
                wmAccessibilityCommonUtils.elementWrapper(smartTipIconElement, smartTipText);
            }

            var stRole = isSmartTipImgEnabled ? 'button' : 'img';
            commonUtils.setRole(smartTipIconElement, _deployablesRoles.smartTipIcon || stRole);
            var iconSubElements = smartTipIconElement.find('*');

            if (!isSmartTipImgEnabled) {
                var childRole = featuresManager.isFeatureEnabled(consts.FEATURES.NoNonePresentation) ? 'presentation' : 'none presentation';
                for (var i = 0; i < iconSubElements.length; i++) {
                    commonUtils.setRole(wmjQuery(iconSubElements[i]), childRole);
                }
            }

            var iconAlt = 'help';

            if (uiComponent.Type === consts.SMART_TIP.COMPONENT_TYPE.Validation) {
                iconAlt = 'Error';
            }
            else if (uiComponent.Type === consts.SMART_TIP.COMPONENT_TYPE.PositiveFeedback) {
                iconAlt = 'Valid Input';
            }

            if (isSmartTipImgEnabled) {
                iconSubElements.attr('alt', iconAlt);
            }
            else {
                smartTipIconElement.attr('alt', iconAlt);
            }

            hoverOnFocus(smartTipIconElement);

            dummyTabOrganizer.showDummy(ICON_TYPE, smartTipId);
        }
    }
    function fixIconTabIndex(smartTipIconElement, id) {
        var smartTipContainer = smartTipIconElement.parent('.walkme-icon-root-SmartTip-' + id);
        smartTipContainer.removeAttr("tabindex");
        wmAccessibilityCommonUtils.addTabIndex(smartTipIconElement, -1);
    }

    function onSmartTipIconDestroyed(evnt, eventData) {
        var smartTipId = eventData.smartTipModel.Id;
        eventHandlerBindingManager.unbindSpecificByElementSelector('.' + ICON_PREFIX + smartTipId, 'keydown', handleTabKeyPressed);

        dummyTabOrganizer.hideDummy(ICON_TYPE, smartTipId);
    }
    handleSmartTipIcon
    function getTextWithReferenceToPreviousField(componentType, text) {
        switch (componentType) {
            case consts.SMART_TIP.COMPONENT_TYPE.Validation:
                return text + '. ' + defaultTextGetter.getValue(DEFAULT_TEXT_KEY.PreviousFieldInvalid);
            case consts.SMART_TIP.COMPONENT_TYPE.PositiveFeedback:
                return defaultTextGetter.getValue(DEFAULT_TEXT_KEY.PreviousFieldValid) + ': ' + text;
            default:
                return text;
        }
    }

    function getBbcodeParsedText(text) {
        var smartTipTextHtml = bbcodeParser.parse(text);
        var smartTipTextDivJquery = domManager.parseElementAsJquery('<div>' + smartTipTextHtml + '</div>');
        var imageElements = smartTipTextDivJquery.find('img');

        for (var i = 0; i < imageElements.length; i++) {
            var imageElement = wmjQuery(imageElements[i]);
            var imageAlt = imageElement.attr('alt');

            if (imageAlt) {
                imageElement.replaceWith('. ' + imageAlt + '.');
            }
        }

        var smartTipTextDiv = smartTipTextDivJquery[0];

        return smartTipTextDiv.textContent || smartTipTextDiv.innerText;
    }

    function handleSmartTipTooltip(evnt, eventData) {
        var tooltipId;
        var uiComponent = eventData.uiComponent;

        if (uiComponent && uiComponent.Id) {
            tooltipId = uiComponent.Id;
        }

        if (!tooltipId) {
            return;
        }

        var tooltipElementId = 'walkme-tooltip-' + tooltipId;
        var smartTipTooltipElement = wmjQuery('#' + tooltipElementId);

        if (!smartTipTooltipElement.length) {
            return;
        }

        eventHandlerBindingManager.bind('keydown', handleTabKeyPressed, smartTipTooltipElement);

        commonUtils.setRole(smartTipTooltipElement, 'tooltip');

        //add tabindex to iframe
        var allIframes = wmjQuery(smartTipTooltipElement.selector +" iframe");
        wmAccessibilityCommonUtils.addTabIndexToIframes(allIframes);
        var focusables = wmAccessibilityCommonUtils.getFocusablesInsideElement(smartTipTooltipElement);
        focusBehaviorSetter.setFocusBehavior(focusables);

        var smartTipId = eventData.smartTipModel.Id;

        if (uiComponent.Type != consts.SMART_TIP.COMPONENT_TYPE.Info && !uiComponent.IsWithIcon) {
            var tooltipLinkedElement = smartTipToElementMapper.getElementBySmartTipId(smartTipId)[0];
            var activeElement = elementsGetter.getActiveElement();
            if (tooltipLinkedElement !== activeElement) {
                var tooltipAnnouncement = getTextWithReferenceToPreviousField(uiComponent.Type, uiComponent.TooltipText);
                wmAccessibilityCommonUtils.announce(tooltipAnnouncement);
            }
        }

        dummyTabOrganizer.showDummy(TOOLTIP_TYPE, smartTipId);
    }

    function onSmartTipTooltipDestroyed(evnt, eventData) {
        var uiComponent = eventData.uiComponent;

        if (uiComponent && uiComponent.Id) {
            var tooltipId = uiComponent.Id;

            if (tooltipId) {
                var tooltipElementId = 'walkme-tooltip-' + tooltipId;
                eventHandlerBindingManager.unbindSpecificByElementSelector('#' + tooltipElementId, 'keydown', handleTabKeyPressed);
                dummyTabOrganizer.hideDummy(TOOLTIP_TYPE, eventData.smartTipModel.Id);
            }
        }
    }

    function hoverOnFocus(element) {
        eventHandlerBindingManager.bind('focus', function () {
            element.mouseover();
        }, element);

        eventHandlerBindingManager.bind('blur', onBlur, element);

        function onBlur(elementBlurEvent) {
            if (elementBlurEvent.shouldPreventDefault) {
                elementBlurEvent.preventDefault();

                return;
            }

            var destinationElement = elementBlurEvent.relatedTarget;

            if (destinationElement) {
                handleElementBlur(element, destinationElement);
            }
            else {
                var activeElement = elementsGetter.getActiveElement();
                timerManager.setWalkmeTimeout(function() {
                    handleElementBlur(element, activeElement);
                }, 0);
            }
        }
    }

    function handleElementBlur(sourceElement, destinationElement) {
        var smartTipId = idGetter.getIdByElement(sourceElement, ICON_PREFIX) || getSmartTipIdForElement(sourceElement);
        var tooltipElementSelector = '.' + PREFIXES.smartTipTooltip + smartTipId;
        var tooltipElement = wmjQuery(tooltipElementSelector)[0];

        if (!tooltipElement || !wmjQuery.contains(tooltipElement, destinationElement)) {
            sourceElement.mouseleave();
        }
        else {
            var tooltipInnerElements = wmjQuery(tooltipElementSelector).find('*');
            eventHandlerBindingManager.bind('blur', onTooltipInnerElementBlur, tooltipInnerElements);
        }

        function onTooltipInnerElementBlur(tooltipInnerElementBlurEvent) {
            var destinationElement = tooltipInnerElementBlurEvent.relatedTarget;

            if (destinationElement) {
                handleTooltipInnerElementBlur(sourceElement, tooltipElement, destinationElement);
            }
            else {
                var activeElement = elementsGetter.getActiveElement();
                timerManager.setWalkmeTimeout(function() {
                    handleTooltipInnerElementBlur(sourceElement, tooltipElement, activeElement);
                }, 0);
            }
        }
    }

    function handleTooltipInnerElementBlur(smartTipLinkedElement, tooltipElement, destinationElement) {
        if (destinationElement != smartTipLinkedElement[0] && !wmjQuery.contains(tooltipElement, destinationElement)) {
            smartTipLinkedElement.mouseleave();
        }
    }

    function getSmartTipIdForElement(element) {
        var smartTipDetails = smartTipToElementMapper.getSmartTipDetailsByElement(element);
        return smartTipDetails && smartTipDetails.smartTipId;
    }
}



/***/ }),

/***/ 4188:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

var getCtx = (__webpack_require__(8912)/* .getCtx */ .yK);
getCtx().register('MessageHandler')
    .asCtor(MessageHandler)
    .dependencies('AriaAttributesSetter, Consts, AccessibilityConsts, DomManager, CommonUtils');

function MessageHandler(ariaAttributesSetter, consts, accessibilityConsts, domManager, commonUtils) {
    var _this = this;
    _this.handleMessages = handleMessages;

    var _partialSelectors = accessibilityConsts.PARTIAL_SELECTORS.SURVEY;

    function handleMessages(surveyData) {
        var questions = domManager.parseElementAsJquery(surveyData.surveyObj.Questions);
        var areOnlyMessages = areAllQuestionsMessages(questions);
        var customConfiguration = commonUtils.getJsonSettings();
        var isSurveyDescribedByEnabled = customConfiguration.surveyDialogDescribedBy;

        questions.each(function(i, question) {
            
            if (question.QuestionType == consts.QUESTION_TYPES.Message) {
                var questionElement = surveyData.surveyBalloon.find('#' + _partialSelectors.QUESTION + '-' + question.Id);

                if (questionElement.length != 0) {
                    var messageTitle = questionElement.find('.' + _partialSelectors.QUESTION_TITLE);
                    var messageSubTitle = questionElement.find('.' + _partialSelectors.QUESTION_SUB_TITLE);

                    if ((areOnlyMessages || isOneQuestionShown(surveyData.surveyBalloon) || isSurveyDescribedByEnabled)) {
                        addDialogDescription(surveyData.surveyBalloon, messageTitle, messageSubTitle, question.Id);
                    }
                    else {
                        addHeadingsAttrs(messageTitle, 2);
                        addHeadingsAttrs(messageSubTitle, 3);
                    }
                }
            }
        });
    }

    function isOneQuestionShown(surveyBalloon) {
        return surveyBalloon.find('.walkme-survey-questions .' + _partialSelectors.QUESTION).length === 1;
    }

    function areAllQuestionsMessages(questions) {
        var messages = questions.filter(function() {
            return this.QuestionType === consts.QUESTION_TYPES.Message;
        });

        return questions.length === messages.length;
    }

    function addHeadingsAttrs(element, level) {
        element.attr('role', 'heading');
        ariaAttributesSetter.setAriaLevel(element, level);
    }

    function addDialogDescription(surveyElement, messageTitle, messageSubTitle, questionId) {
        var titleId = _partialSelectors.QUESTION_TITLE + '-' + questionId;
        var subTitleId = _partialSelectors.QUESTION_SUB_TITLE + '-' + questionId;
        messageTitle.attr('id', titleId);
        messageSubTitle.attr('id', subTitleId);
        var currentDescribedByValue = surveyElement.attr('aria-describedby') || '';
        var newDescribedByValue = currentDescribedByValue + ' ' + titleId + ' ' + subTitleId;
        ariaAttributesSetter.setAriaDescribedBy(surveyElement, newDescribedByValue);
    }
}



/***/ }),

/***/ 9055:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

var getCtx = (__webpack_require__(8912)/* .getCtx */ .yK);
getCtx().register('RequiredQuestionsHandler')
    .asCtor(RequiredQuestionsHandler)
    .dependencies('Consts, DomManager');

function RequiredQuestionsHandler(consts, domManager) {
    var _this = this;
    _this.handleRquiredQuestions = handleRquiredQuestions;

    function handleRquiredQuestions(surveyData) {
        domManager.parseElementAsJquery(surveyData.surveyObj.Questions).each(function(i, question) {
            if (question.IsRequired) {
                var questionElement = getQuestionElement(question.Id);
                addRequired(question, questionElement);
            }
        });
    }

    function addRequired(question, questionElement) {
        var querySelector = question.QuestionType == consts.QUESTION_TYPES.FreeText ? 'label' : 'legend';
        var queryText = wmjQuery(querySelector, questionElement);
        var quetsionText = queryText.text() + ' Required';
        queryText.text(quetsionText);
    }

    function getQuestionElement(questionId){
         return wmjQuery('#walkme-survey-question-' + questionId);          
    }
}



/***/ }),

/***/ 4942:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

var getCtx = (__webpack_require__(8912)/* .getCtx */ .yK);
getCtx()
	.register('SurveyContainerHandler')
	.asCtor(SurveyContainerHandler)
	.dependencies(
		'WmAccessibilityCommonUtils, CommonUtils, AriaAttributesSetter, AccessibilityConsts,' +
		'ElementsHidingManager, wmjQuery, FeaturesManager'
	);

function SurveyContainerHandler(
	wmAccessibilityCommonUtils,
	commonUtils,
	ariaAttributesSetter,
	accessibilityConsts,
	elementsHidingManager,
	wmjQuery,
	featuresManager
) {
	var _this = this;
	_this.handleContainer = handleContainer;

	var _focusableSelectors = accessibilityConsts.FOCUSABLE_SELECTORS.SURVEY;
	var _partialSelectors = accessibilityConsts.PARTIAL_SELECTORS.SURVEY;
	var _surveyDeployableType = accessibilityConsts.DEPLOYABLE_TYPES.survey;
	var _headingsRanking;

	function ctor() {
		var customConfiguration = commonUtils.getCustomConfiguration() || {};
		_headingsRanking = (customConfiguration.surveyAccessibilitySettings && customConfiguration.surveyAccessibilitySettings.headingsRanking) || {};
	}

	function handleContainer(surveyElement, survey, surevyRole, surveyAriaLabel, isCommentBoxGenerated) {
		handleXButton(surveyElement);
		var focusableElements = getSurveyFocusableElements(surveyElement, survey);
		wmAccessibilityCommonUtils.addTabIndex(wmjQuery(focusableElements));

		var disableFocusLock = wmAccessibilityCommonUtils.shouldDisableFocusLock(_surveyDeployableType, survey.Id);
		var hasSpotlight = survey.Settings.fadeBackground == '1';

		wmAccessibilityCommonUtils.handleFocusElements(
			surveyElement,
			focusableElements,
			_focusableSelectors.CLOSE_LINK,
			hasSpotlight || !disableFocusLock
		);

		if (!isCommentBoxGenerated) {
				if (featuresManager.isFeatureEnabled('surveyDelayFocus')) {
				setTimeout(function () {
					focusableElements[0].focus();
				}, 20);
			} else {
				focusableElements[0].focus();
			}
		}

		commonUtils.setRole(surveyElement, surevyRole || 'dialog');
		ariaAttributesSetter.setAriaLabel(surveyElement, surveyAriaLabel);
		var titleElement = wmjQuery('.' + _partialSelectors.TITLE, surveyElement);
		titleElement.attr('id', _partialSelectors.TITLE);
		setHeadingAttributes(titleElement, survey.Id);
		ariaAttributesSetter.setAriaLabelledBy(surveyElement, _partialSelectors.TITLE);

		if (wmAccessibilityCommonUtils.shouldAddAriaHidden(hasSpotlight, _surveyDeployableType, survey.Id)) {
			var surveyId = surveyElement.attr('id');
			elementsHidingManager.hideAllButPopup(surveyElement, surveyId, accessibilityConsts.EVENTS.BALLOON.DestroyStepBalloon);
		}
	}

	function setHeadingAttributes(titleElement, surveyId) {
		var headingRanking = _headingsRanking[surveyId] || _headingsRanking['default'];

		if (!headingRanking) {
			return;
		}

		titleElement.attr('role', 'heading');
		ariaAttributesSetter.setAriaLevel(titleElement, headingRanking);
	}

	function handleXButton(surveyBalloon) {
		var xButtonElement = wmjQuery(_focusableSelectors.CLOSE_LINK, surveyBalloon);
		commonUtils.setRole(xButtonElement, 'button');
		wmAccessibilityCommonUtils.setXButtonLabel(xButtonElement);
		xButtonElement.removeAttr('title');

		if (!featuresManager.isFeatureEnabled('focusXButtonFirst')) {
			wmAccessibilityCommonUtils.moveElementToEnd(surveyBalloon, _focusableSelectors.CLOSE_LINK);
		}
	}

	function getSurveyFocusableElements(surveyBalloon, survey) {
		var focusableElements = [];

		for (var i = 0; i < survey.Questions.length; i++) {
			var currQ = survey.Questions[i];
			var questionElement = wmjQuery('#' + _partialSelectors.QUESTION + '-' + currQ.Id, surveyBalloon);

			var questionAnswers = wmjQuery('.' + _partialSelectors.QUESTION_ANSWERS, questionElement);
			focusableElements.push.apply(focusableElements, questionAnswers.toArray());
		}

		var buttons = wmjQuery(_focusableSelectors.BUTTON, surveyBalloon);
		focusableElements.push.apply(focusableElements, buttons.toArray());

		var closeLink = wmjQuery(_focusableSelectors.CLOSE_LINK, surveyBalloon);

		if (featuresManager.isFeatureEnabled('focusXButtonFirst')) {
			focusableElements.unshift.apply(focusableElements, closeLink.toArray());
		} else {
			focusableElements.push.apply(focusableElements, closeLink.toArray());
		}

		return focusableElements;
	}

	ctor();
}



/***/ }),

/***/ 9931:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

var getCtx = (__webpack_require__(8912)/* .getCtx */ .yK);
getCtx().register('SurveyHtmlStandardizer')
    .asCtor(SurveyHtmlStandardizer)
    .dependencies('Consts, DomManager');

function SurveyHtmlStandardizer(consts, domManager) {
    var _this = this;
    _this.standardizeHtml = standardizeHtml;

    var WRAPPER_ID_PREFIX = 'wm-wrapper-question-';

    function standardizeHtml(surveyData) {
        removeExtraLabelAnswers(surveyData);
        addLabelDescriptions();
        wrapLabels(surveyData);
    }

    function removeExtraLabelAnswers(surveyData) {
        domManager.parseElementAsJquery(surveyData.surveyObj.Questions).each(function(i, question) {
            if (question.QuestionType == consts.QUESTION_TYPES.RadioButton) {
                surveyData.surveyBalloon.find('.walkme-survey-answer-subtitle').remove();
            }
            else if (question.QuestionType == consts.QUESTION_TYPES.CheckBox) {
                wmjQuery('label.walkme-survey-answer-label-checkbox').remove();
            }
        });
    }

    function addLabelDescriptions() {
        wmjQuery('label.walkme-survey-answer-label-radiobutton').each(function(i, label) {
            label.innerHTML = 'answer' + i;
            label.style.display = 'none';
        });
    }

    function wrapLabels(surveyData) {
        domManager.parseElementAsJquery(surveyData.surveyObj.Questions).each(function(i, question) {
            if (question.QuestionType == consts.QUESTION_TYPES.RadioButton ||
                question.QuestionType == consts.QUESTION_TYPES.CheckBox ||
                question.QuestionType == consts.QUESTION_TYPES.NPS ||
                question.QuestionType == consts.QUESTION_TYPES.Rating) {
                wrapAnswers(question);
                addLegend(question);
            } else if (question.QuestionType == consts.QUESTION_TYPES.FreeText) {
                addLabelFreeText(question);
            }
        });
    }

    function wrapAnswers(question) {
        var answerDivSelector;
        var answerSelector;
        var wrapper = getWrapper(question);

        if(question.QuestionType == consts.QUESTION_TYPES.RadioButton) {
            answerDivSelector = '#walkme-survey-question-radiobutton-answers-';
            answerSelector = '.walkme-survey-radiobutton-answer';
        } else if (question.QuestionType == consts.QUESTION_TYPES.CheckBox) {
            answerDivSelector = '#walkme-survey-question-checkbox-answers-';
            answerSelector = '.walkme-survey-question-checkbox-answer';
        } else if (question.QuestionType == consts.QUESTION_TYPES.NPS) {
            answerDivSelector = '#walkme-survey-question-nps-answers-';
            answerSelector = '.walkme-survey-nps-answer';
        } else if (question.QuestionType == consts.QUESTION_TYPES.Rating) {
            answerDivSelector = '#walkme-survey-question-rating-answers-';
            answerSelector = '.walkme-survey-rating-answer';
        }

        var answerDiv = wmjQuery(answerDivSelector + question.Id);
        answerDiv.find(answerSelector).wrapAll(wrapper);
    }

    function getWrapper(question) {
        var wrapper = document.createElement('fieldset');
        wrapper.id = WRAPPER_ID_PREFIX + question.Id;
        wrapper.style.border = 'none';
        wrapper.style.padding = 0;
        wrapper.style.margin = 0;
        
        if (question.QuestionType == consts.QUESTION_TYPES.Rating) {
            wrapper.style.display = 'flex';
        }
        
        return wrapper;
    }

    function addLegend(question) {
        var legend = createInvisibleElement('legend', getText(question));
        wmjQuery('#' + WRAPPER_ID_PREFIX + question.Id).prepend(legend);
    }

    function addLabelFreeText(question) {
        var label = createInvisibleElement('label', getText(question));
        label.setAttribute('for', 'walkme-survey-question-freetext-' + question.Id);

        var answerElem = wmjQuery('#walkme-survey-question-freetext-answers-' + question.Id);
        answerElem.prepend(label);
    }

    function getText(question) {
        var sub = question.SubTitle ? ' ' + question.SubTitle : '';
        return question.Title + sub;
    }

    function createInvisibleElement(type, inner) {
        var elem = document.createElement(type);
        elem.style.opacity = 0;
        elem.style.height = 0;
        elem.style['font-size'] = 0;
        elem.style.color = 'transparent';
        domManager.setInnerHTML(elem, inner);
        return elem;
    }
}



/***/ }),

/***/ 2886:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

var getCtx = (__webpack_require__(8912)/* .getCtx */ .yK);
getCtx().register('SurveyNPSRatingQuestionsHandler')
    .asCtor(SurveyNPSRatingQuestionsHandler)
    .dependencies('Consts, DomManager, AriaAttributesSetter');

function SurveyNPSRatingQuestionsHandler(consts, domManager, ariaAttributesSetter) {
    var _this = this;
    _this.handleNPSRatingQuestions = handleNPSRatingQuestions;

    function handleNPSRatingQuestions(surveyData) {
        domManager.parseElementAsJquery(surveyData.surveyObj.Questions).each(function(i, question) {
            if (question.QuestionType == consts.QUESTION_TYPES.NPS) {
                addNPSAriaDescribedBy();
            }

            if (question.QuestionType == consts.QUESTION_TYPES.Rating) {
                addRatingAriaDescribedBy(question);
            }
        })
    }

    function addNPSAriaDescribedBy() {
        var firstChoice = wmjQuery('#walkme-survey-answer-nps-radiobutton-0')
        ariaAttributesSetter.appendAriaDescribedBy(firstChoice, "walkme-survey-low-score-span")
        
        var lastChoice = wmjQuery('#walkme-survey-answer-nps-radiobutton-10')
        ariaAttributesSetter.appendAriaDescribedBy(lastChoice, "walkme-survey-high-score-span")
    }

    function addRatingAriaDescribedBy(question) {
        var firstChoice = wmjQuery('#walkme-survey-rating-' + question.Id + '-answer-1')
        ariaAttributesSetter.appendAriaDescribedBy(firstChoice, 'walkme-survey-rating-' +  question.Id + '-title-' + 1);
        
        var lastChoice = wmjQuery('#walkme-survey-rating-' + question.Id + '-answer-5');
        ariaAttributesSetter.appendAriaDescribedBy(lastChoice, 'walkme-survey-rating-' +  question.Id + '-title-' + 5);
    }
}


/***/ }),

/***/ 7576:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

var getCtx = (__webpack_require__(8912)/* .getCtx */ .yK);
getCtx().register('SurveyAccessibilityHandler')
	.asCtor(SurveyAccessibilityHandler)
	.dependencies('WmAccessibilityCommonUtils, AriaAttributesSetter, AccessibilityConsts, SurveyHtmlStandardizer, ' +
        'MessageHandler, RequiredQuestionsHandler, SurveyContainerHandler, DefaultTextGetter, FocusTracker, ' +
		'ElementsGetter, SurveyNPSRatingQuestionsHandler');

function SurveyAccessibilityHandler(wmAccessibilityCommonUtils, ariaAttributesSetter, accessibilityConsts, surveyHtmlStandardizer,
                                    messageHandler, requiredQuestionsHandler, surveyContainerHandler, defaultTextGetter, focusTracker,
                                    elementsGetter, surveyNPSRatingQuestionsHandler) {
	var _this = this;
	_this.init = init;

	var _eventData;
	var _deployablesRoles;
	var _deployablesAriaLabels;
	var _focusableSelectors;

	function init(deployablesRoles, deployablesAriaLabels) {
		bindEvents();
		_deployablesRoles = deployablesRoles;
		_deployablesAriaLabels = deployablesAriaLabels;
		_focusableSelectors = accessibilityConsts.FOCUSABLE_SELECTORS.SURVEY;
	}

	function bindEvents() {
	    var events = accessibilityConsts.EVENTS.SURVEY;
		_walkmeInternals.bind(events.SurveyBalloonDisplayed, handleSurvey);
        _walkmeInternals.bind(events.SurveyQuestionCountSet, handleQuestionsCount);
		_walkmeInternals.bind(events.SurveyClosed, focusTracker.focus);
		_walkmeInternals.bind(events.RatingCommentGenerated, handleRatingCommentGenerated);
	}

	function handleSurvey(event, eventData) {
		_eventData = eventData;
		focusTracker.addToStack(elementsGetter.findLastFocusedElement(), accessibilityConsts.FOCUS_TRACKING_ELEMENTS_TYPES.survey);
		surveyHtmlStandardizer.standardizeHtml(_eventData);
		requiredQuestionsHandler.handleRquiredQuestions(_eventData);
		surveyNPSRatingQuestionsHandler.handleNPSRatingQuestions(_eventData);
		messageHandler.handleMessages(_eventData);
		surveyContainerHandler.handleContainer(_eventData.surveyBalloon, _eventData.surveyObj, _deployablesRoles.survey, _deployablesAriaLabels.survey);
    }

    function handleQuestionsCount(event, data) {
        var questionCountElem = wmjQuery(_focusableSelectors.QUESTION_NUMBER, data.balloonDiv);
        wmAccessibilityCommonUtils.addTabIndex(questionCountElem);

        var questionsContTextArr = questionCountElem.text().split('/');
        var questionInfoText = defaultTextGetter.getValue(accessibilityConsts.DEFAULT_TEXT_KEY.QuestionInfoText);
		questionInfoText = questionInfoText.replace("{0}", questionsContTextArr[0]);
		questionInfoText = questionInfoText.replace("{1}", questionsContTextArr[1]);
        ariaAttributesSetter.setAriaLabel(questionCountElem, questionInfoText);
    }

	function handleRatingCommentGenerated(event) {
		surveyContainerHandler.handleContainer(_eventData.surveyBalloon, _eventData.surveyObj, _deployablesRoles.survey, _deployablesAriaLabels.survey, true);
	}
}


/***/ }),

/***/ 4530:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

var getCtx = (__webpack_require__(8912)/* .getCtx */ .yK);

function isLinkElement(element) {
    return element.length ===1 && element.first().prop('tagName').toLowerCase() === 'a';
}

function commonUtilsAddTabIndex(element, order) {
    // Copy of the AddTabIndex from commonUtils. Done because of old feature check.
    // When "accessibility" feature will be deprecated we'll be able to use the original function.
    order = defaultValue(order, 0);
    element.attr('tabIndex', order);
    registerKeyDown(element);
}

function registerKeyDown(element) {
    if (element.is("textarea")) {
        return;
    }

    element.off('keydown', applyClickOnEnter);
    element.on('keydown', applyClickOnEnter);
}

function applyClickOnEnter(event) {
    var element = wmjQuery(this);

    if(event.which == 13 && !event.shiftKey) {
        (isLinkElement(element) ? element[0] : element).click();
        event.preventDefault();
        event.stopPropagation();
    }
}

function defaultValue(value, defaultValue) {
    // Also copy from commonUtils.
    return ((typeof (value) != 'undefined' && value != null) ? value : defaultValue);
}

function overrideAddTabIndex(element, order, focusClass) {
    commonUtilsAddTabIndex(element, order);
    getCtx().get('FocusBehaviorSetter').setFocusBehavior(element, focusClass);
}

function isOldFeaturesEnabled() {
    var featuresManager = getCtx().get('FeaturesManager');
    return featuresManager.isFeatureEnabled('jawsAccessibility') || featuresManager.isFeatureEnabled('accessibility');
}

function overrideAddTabIndexIfNeeded() {
    getCtx().decorate('CommonUtils', function (originalCommonUtilsHandler) {
        if (!isOldFeaturesEnabled()) {
            originalCommonUtilsHandler.addTabIndex = overrideAddTabIndex;
        }

        return originalCommonUtilsHandler;
    });
}

module.exports = {
    overrideAddTabIndexIfNeeded: overrideAddTabIndexIfNeeded
};


/***/ }),

/***/ 5553:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

var getCtx = (__webpack_require__(8912)/* .getCtx */ .yK);
getCtx().register('WalkThruAccessibilityHandler')
	.asCtor(WalkThruAccessibilityHandler)
	.dependencies('FocusTracker');

function WalkThruAccessibilityHandler(focusTracker) {
	var _this = this;
	_this.init = init;

	var _deployablesRoles;
	var _deployablesAriaLabels;

	function init(deployablesRoles, deployablesAriaLabels) {
		bindEvents();
		_deployablesRoles = deployablesRoles;
		_deployablesAriaLabels = deployablesAriaLabels;
	}

	function bindEvents() {
		_walkmeInternals.bind("UserStoppedWalkthru", focusTracker.focus);
		_walkmeInternals.bind("TutorialStopped", returnFocusWhenTutorialStopped);
	}

	function returnFocusWhenTutorialStopped(e, currentStep) {
		// Make sure that 'currentStep' is defined in order to ignore calls from smartTips
        currentStep && focusTracker.focus();
	}
}


/***/ }),

/***/ 9114:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

var getCtx = (__webpack_require__(8912)/* .getCtx */ .yK);

getCtx().register('DummyLastElementAdder')
    .asCtor(DummyLastElementAdder)
    .dependencies('wmjQuery, WmAccessibilityCommonUtils, Consts, EventHandlerBindingManager, ElementLastKeeper, DefaultTextGetter, AccessibilityConsts');

function DummyLastElementAdder(wmjQuery, wmAccessibilityCommonUtils, consts, eventHandlerBindingManager, elementLastKeeper, defaultTextGetter, accessibilityConsts) {
    var _this = this;

    _this.add = add;
    _this.reAdd = reAdd;

    function add() {
        var dummyElement = wmjQuery('<div id="walkme-dummy-last-element" class="walkme-to-destroy" tabindex="0">');
        wmjQuery('body').append(dummyElement);

        dummyElement.focus(function(event, params) {
            if (!params || (params && !params.isAlreadyFocused)) {
                wmAccessibilityCommonUtils.announce(defaultTextGetter.getValue(accessibilityConsts.DEFAULT_TEXT_KEY.EndOfPage));
            }
        });

        elementLastKeeper.addElement(dummyElement, true);

        eventHandlerBindingManager.bind(consts.EVENTS.WidgetPlayer.PlayerBuilt, function() {
            reAdd();
        });
    }

    function reAdd() {
        wmjQuery('#walkme-dummy-last-element').appendTo(wmjQuery('body'));
    }
}


/***/ }),

/***/ 2082:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

var createPluginEntry = (__webpack_require__(8912)/* .createPluginEntry */ .mJ);

module.exports = createPluginEntry(function(registerPlugin) {
	__webpack_require__(9377);
	__webpack_require__(1);
	__webpack_require__(4188);
	__webpack_require__(2886);
	__webpack_require__(9055);
	__webpack_require__(4942);
	__webpack_require__(9931);
	__webpack_require__(7576);
	__webpack_require__(7440);
	__webpack_require__(4420);
	__webpack_require__(3494);
	__webpack_require__(8484);
	__webpack_require__(6928);
	__webpack_require__(5551);
	__webpack_require__(2572);
	__webpack_require__(2581);
	__webpack_require__(9954);
    __webpack_require__(8916);
    __webpack_require__(7975);
    __webpack_require__(6105);
	__webpack_require__(9608);
	__webpack_require__(5553);
	__webpack_require__(3434);
	__webpack_require__(9405);
    __webpack_require__(9801);
    __webpack_require__(208);
	__webpack_require__(2961);
	__webpack_require__(704);
	__webpack_require__(6371);
	__webpack_require__(4703);
	__webpack_require__(1944);
	__webpack_require__(5681);
	__webpack_require__(752);
	__webpack_require__(6282);
	__webpack_require__(7503);
	__webpack_require__(1016);
	__webpack_require__(3741);
	__webpack_require__(3533);
	__webpack_require__(1860);
    __webpack_require__(8161);
	__webpack_require__(6004);
    __webpack_require__(1597);
    __webpack_require__(4316);
    __webpack_require__(2984);
	__webpack_require__(4009);
	__webpack_require__(7201);
	__webpack_require__(1341);
	__webpack_require__(9114);
	__webpack_require__(7573);
	__webpack_require__(4598);

	var Accessibility = (__webpack_require__(6995)/* .Accessibility */ .h);

	registerPlugin(new Accessibility());
});



/***/ }),

/***/ 4598:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

var getCtx = (__webpack_require__(8912)/* .getCtx */ .yK);

getCtx().register('DefaultTextGetter')
    .asCtor(DefaultTextGetter)
    .dependencies('AccessibilityGeneralManager, AccessibilityConsts, TextsTranslator');

function DefaultTextGetter(accessibilityGeneralManager, accessibilityConsts, textsTranslator) {
    var _this = this;

    _this.getValue = getValue;

    function getValue(key) {
        return accessibilityGeneralManager.getValue(key) || getSettingsTranslationKey(key) || accessibilityConsts.TEXTS[key];
    }

    function getSettingsTranslationKey(key) {
        var settingsTranslationsKey = accessibilityConsts.SETTINGS_TRANSLATIONS_TEXTS_KEYS[key];
        return settingsTranslationsKey && textsTranslator.translate(settingsTranslationsKey);
    }
}


/***/ }),

/***/ 7573:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

var getCtx = (__webpack_require__(8912)/* .getCtx */ .yK);

getCtx().register('TextsTranslator')
    .asCtor(TextsTranslator)
    .dependencies('AccessibilityConsts, LanguageManager');

function TextsTranslator(accessibilityConsts, languageManager) {
    var _this = this;

    _this.init = init;
    _this.translate = translate;

    var _translations;

    function init(translations) {
        _translations = translations;
    }

    function translate(textKey) {
        var currentLanguage = languageManager.getCurrentLanguage();
        var currentLanguageTranslations = _translations[currentLanguage] || {};

        return currentLanguageTranslations[textKey] || accessibilityConsts.TEXTS[textKey];
    }
}


/***/ }),

/***/ 2984:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

var getCtx = (__webpack_require__(8912)/* .getCtx */ .yK);

getCtx().register('AccessibilityLogger')
    .asCtor(AccessibilityLogger)
    .dependencies('PrelibLogger');

function AccessibilityLogger(prelibLogger) {
    var _this = this;
    _this.write = write;

    function write(log) {
        prelibLogger.write("[Accessibility plugin] " + log);
    }
}



/***/ }),

/***/ 5681:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

var getCtx = (__webpack_require__(8912)/* .getCtx */ .yK);

getCtx().register('AriaAttributesSetter')
    .asCtor(AriaAttributesSetter);

function AriaAttributesSetter() {
    var _this = this;

    _this.setAriaLabel = setAriaLabel;
    _this.setAriaLabelledBy = setAriaLabelledBy;
    _this.setAriaDescribedBy = setAriaDescribedBy;
    _this.setAriaLevel = setAriaLevel;
    _this.setAriaHidden = setAriaHidden;
    _this.appendAriaDescribedBy = appendAriaDescribedBy;

    function setAriaLabel(elements, value) {
        setAttribute(elements, 'aria-label', value);
    }

    function setAriaLabelledBy(elements, value) {
        setAttribute(elements, 'aria-labelledby', value);
    }

    function setAriaDescribedBy(elements, value) {
        setAttribute(elements, 'aria-describedby', value);
    }

    function appendAriaDescribedBy(elements, value) {
        appendAttribute(elements, 'aria-describedby', value);
    }

    function setAriaLevel(elements, value) {
        setAttribute(elements, 'aria-level', value);
    }

    function setAriaHidden(elements, value) {
        setAttribute(elements, 'aria-hidden', value);
    }

    function setAttribute(elements, attrName, value) {
        for (var i = 0; i < elements.length; i++) {
            elements[i].setAttribute(attrName, value);
        }
    }

    function appendAttribute(elements, attribute, value) {
        for (var i = 0; elements && i < elements.length; i++) {
            elements[i].setAttribute(attribute, [elements[i].getAttribute(attribute), value].join(' ').trim());
        }
    }
}


/***/ }),

/***/ 752:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

var getCtx = (__webpack_require__(8912)/* .getCtx */ .yK);

getCtx().register('DesignTemplatePlaceholdersRolesSetter')
    .asCtor(DesignTemplatePlaceholdersRolesSetter);

function DesignTemplatePlaceholdersRolesSetter() {
    var _this = this;

    _this.setDefaultRoleForActionPlaceholders = setDefaultRoleForActionPlaceholders;

    var DEFAULT_ACTION_PLACEHOLDER_ROLE = 'button';

    function setDefaultRoleForActionPlaceholders(container) {
        var actionPlaceholdersWithoutRole = wmjQuery('[wm-action-placeholder]:not([role])', container);
        actionPlaceholdersWithoutRole.each(function () {
            this.setAttribute('role', DEFAULT_ACTION_PLACEHOLDER_ROLE);
        });
    }
}



/***/ }),

/***/ 7503:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

var getCtx = (__webpack_require__(8912)/* .getCtx */ .yK);

getCtx().register('DialogTabbaleElementsPreparer')
    .asCtor(DialogTabbaleElementsPreparer)
    .dependencies('WmAccessibilityCommonUtils, wmjQuery');

function DialogTabbaleElementsPreparer(wmAccessibilityCommonUtils, wmjQuery) {
    var _this = this;

    _this.prepareTabbableElements = prepareTabbableElements;

    function prepareTabbableElements(container, forcedfocustableElementsSelectors, findTextOnly, shouldSkipDisplay) {
        addTabindexToForcedElements(forcedfocustableElementsSelectors, container, findTextOnly);
        addTabindexToIframes(container);
        addTabIndexToActionPlaceholders(container);
        var focusables = wmAccessibilityCommonUtils.getFocusablesInsideElement(container, true, shouldSkipDisplay);
        addIdsToFocusables(container.attr('id'), focusables);

        return focusables;
    }

    function addIdsToFocusables(idPrefix, focusables) {
        for (var i = 0; i < focusables.length; i++) {
            var focusable = focusables[i];

            if (!focusable.id) {
                focusable.id = idPrefix + '-focusable-element-' + i;
            }
        }
    }

    function addTabindexToForcedElements(forcedfocustableElementsSelectors, container, findTextOnly) {
        var focusableElements = getForcedFocusableElements(forcedfocustableElementsSelectors, container, findTextOnly);
        wmAccessibilityCommonUtils.addTabIndex(wmjQuery(focusableElements));
    }

    function getForcedFocusableElements(selector, container, findTextOnly) {
        var focusableElements = [];

        for (var elementName in selector) {
            if (selector.hasOwnProperty(elementName)) {
                var element = wmjQuery(selector[elementName], container);

                element.each(function () {
                    var elem = wmjQuery(this);

                    if (shouldIncludeElement(elem, findTextOnly)) {
                        focusableElements.push(elem[0]);
                    }
                });
            }
        }

        return focusableElements;
    }

    function shouldIncludeElement(element, findTextOnly) {
        return element.css("display") != "none" &&
            (!findTextOnly || wmAccessibilityCommonUtils.checkIfElementNotEmpty(element));
    }

    function addTabindexToIframes(element) {
        var allIframes = wmjQuery('iframe', element);
        wmAccessibilityCommonUtils.addTabIndexToIframes(allIframes);
    }

    function addTabIndexToActionPlaceholders(container) {
        var allActionPlaceholders = wmjQuery('[wm-action-placeholder]', container);
        wmAccessibilityCommonUtils.addTabIndex(allActionPlaceholders);
    }
}



/***/ }),

/***/ 6282:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

var getCtx = (__webpack_require__(8912)/* .getCtx */ .yK);

getCtx().register('DialogTextSetter')
    .asCtor(DialogTextSetter)
    .dependencies('AriaAttributesSetter, WmAccessibilityCommonUtils');

function DialogTextSetter(ariaAttributesSetter, wmAccessibilityCommonUtils) {
    var _this = this;

    _this.setText = setText;

    function setText(container, id, deployableTitleClass, deployableContentClass) {
        var titleId = findTitleId(container, id, deployableTitleClass);
        titleId && ariaAttributesSetter.setAriaLabelledBy(container, titleId);

        var contentIds = findContentIds(container, id, deployableContentClass);
        contentIds && ariaAttributesSetter.setAriaDescribedBy(container, contentIds);
    }

    function findTitleId(container, id, deployableTitleClass) {
        var titleId;
        var defaultTitleId;
        var titleElement = wmjQuery('[wm-title]', container);

        if (titleElement.length != 0) {
            defaultTitleId = createPlaceholderId(titleElement, id);
        } else {
            titleElement = deployableTitleClass && wmjQuery('.' + deployableTitleClass, container);
            defaultTitleId = deployableTitleClass + '-' + id;
        }

        if (titleElement && titleElement.length != 0 && wmAccessibilityCommonUtils.checkIfElementNotEmpty(titleElement)) {
            titleId = getElementId(titleElement, defaultTitleId);
        }

        return titleId;
    }

    function findContentIds(container, id, deployableContentClass) {
        var allTextPlaceHolders = wmjQuery('[wm-placeholder]:not([wm-title])', container);

        var contentIds = '';

        for (var i = 0; i < allTextPlaceHolders.length; i++) {
            var currentPlaceholderElement = wmjQuery(allTextPlaceHolders[i]);

            var placeholderId = getElementId(currentPlaceholderElement, createPlaceholderId(currentPlaceholderElement, id));

            contentIds += placeholderId + ' ';
        }

        if (!contentIds) {
            var contentElement = wmjQuery('.' + deployableContentClass, container);

            contentIds = getElementId(contentElement, deployableContentClass + '-' + id);
        }

        return contentIds;
    }

    function getElementId(element, defaultValue) {
        var elementId = element.attr('id');

        if (!elementId) {
            elementId = defaultValue;
            element.attr('id', elementId);
        }

        return elementId;
    }

    function createPlaceholderId(currentPlaceholderElement, id) {
        var placeholderName = currentPlaceholderElement.attr('wm-placeholder');
        return 'placeholder-' + placeholderName + '-' + id;
    }
}


/***/ }),

/***/ 6004:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

var getCtx = (__webpack_require__(8912)/* .getCtx */ .yK);

getCtx().register('ElementsGetter')
    .asCtor(ElementsGetter)
    .dependencies('AccessibilityUtils, AccessibilityConsts, wmjQuery, SmartTipElementsGetter, JQueryElementFinder, FeaturesManager');

function ElementsGetter(accessibilityUtils, accessibilityConsts, wmjQuery, smartTipElementsGetter, jQueryElementFinder, featuresManager) {
    var _this = this;

    _this.allShadowElements = [];
    _this.lastShadowElementsUpdate;

    _this.findLastFocusedElement = findLastFocusedElement;
    _this.getAllTabbablesOnPageOrdered = getAllTabbablesOnPageOrdered;
    _this.getNonWalkmeTabbablesOrdered = getNonWalkmeTabbablesOrdered;
    _this.getShadowRootActiveELement = getShadowRootActiveELement;
    _this.getActiveElement = getActiveElement;

    function getAllTabbablesOnPageOrdered() {
        var tabbables = getAllTabbablesByDomOrder();

        return accessibilityUtils.orderElementsByTabIndex(tabbables);
    }

    function getAllTabbablesByDomOrder() {
        if (!featuresManager.isFeatureEnabled('shadowDomAccessibility')) {
            return jQueryElementFinder.findElementsByjQueryComplexSelector(':tabbable, ' + getUnidentifiedTabbablesSelector()).filter(function() {
                return wmjQuery(this).css("display") != "none";
            });
        }

        if(! _this.lastShadowElementsUpdate ||  _this.lastShadowElementsUpdate < Date.now() - 2000) {
            _this.allShadowElements = getAllElementsIncludingShadowDOM(document).filter(isTabbable);
            _this.lastShadowElementsUpdate = Date.now();
        }

        return wmjQuery(_this.allShadowElements);
    }

    function getNonWalkmeTabbablesOrdered() {
        var tabbables = getAllTabbablesByDomOrder();
        
        return tabbables.filter(function() {
            var element = wmjQuery(this)[0];
            return element.className.indexOf("walkme") === -1 || element.id === "walkme-player";
        })
    }

    function getUnidentifiedTabbablesSelector() {
        return '[id^=' + accessibilityConsts.DUMMY_ELEMENT_ID_PREFIX + ']';
    }

    function findLastFocusedElement() {
        var currentElement = wmjQuery(getActiveElement());

        currentElement = (currentElement.length && currentElement[0].shadowRoot) ? wmjQuery(currentElement[0].shadowRoot.activeElement) : currentElement;

        return smartTipElementsGetter.findLastFocusedElement(currentElement) || currentElement;
    }

    function getShadowRootActiveELement() {
        var activeElement = document.activeElement;

        while (activeElement.shadowRoot && activeElement.shadowRoot.activeElement) {
            activeElement = activeElement.shadowRoot.activeElement
        }
        
        return activeElement;
    }      
    
    function getActiveElement() {
        if (featuresManager.isFeatureEnabled('shadowDomAccessibility')) {
            return getShadowRootActiveELement();
        }

        return document.activeElement;
    }

    function getAllElementsIncludingShadowDOM(root) {
        var allElements = new Set();
      
        function traverse(node) {
            if (!isVisible(node)) {
                return;
            }

            if (!allElements.has(node)) {
                allElements.add(node);
                
                if (node.shadowRoot) {
                    var shadowChildren = node.shadowRoot.querySelectorAll('*');
                    shadowChildren.forEach(function(child) {
                        traverse(child);
                    });
                }
        
                for (var i=0; i<node.children.length; i++) {
                    traverse(node.children[i]);
                }
            }
        }
      
        traverse(root);
      
        return Array.from(allElements);
    }

    function isTabbable(element) {
        if (!isVisible(element)) {
            return false;
        }

        return element.tabIndex >= 0 || element instanceof HTMLSelectElement || element instanceof HTMLAnchorElement
        || element instanceof HTMLAreaElement || element instanceof HTMLButtonElement || element instanceof HTMLInputElement
    }

    function isVisible(element) {
        if (element === document) {
            return true;
        }

        return element.getClientRects().length > 0;
    }
}



/***/ }),

/***/ 3741:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

var getCtx = (__webpack_require__(8912)/* .getCtx */ .yK);

getCtx().register('ElementsHidingManager')
    .asCtor(ElementsHidingManager)
    .dependencies('AriaAttributesSetter, EventsListener, wmjQuery');

function ElementsHidingManager(ariaAttributesSetter, eventsListener, wmjQuery) {
    var _this = this;
    _this.hideAllButPopup = hideAllButPopup;

    var _previousAriaHiddenValues = [];
    var _popupStack = [];

    function hideAllButPopup(popupElement, identifier, unhideEvent) {
        if (_popupStack.length === 0) {
            mapPreviousAriaHiddenValues();
        }

        _popupStack.push(identifier);

        ariaAttributesSetter.setAriaHidden(wmjQuery('body').children(), true);
        ariaAttributesSetter.setAriaHidden(popupElement, false);

        eventsListener.once(unhideEvent, function() {
            unhide(identifier);
        });
    }

    function mapPreviousAriaHiddenValues() {
        var elementsWithPreviousValues = wmjQuery('body').children('[aria-hidden]');

        _previousAriaHiddenValues = wmjQuery.map(elementsWithPreviousValues, function(element) {
            var jQueryElement = wmjQuery(element);

            return {
                element: jQueryElement,
                val: jQueryElement.attr('aria-hidden')
            };
        });
    }

    function unhide(identifier) {
        removeIdentifierFromStack(identifier);

        if (_popupStack.length === 0) {
            wmjQuery('body').children().removeAttr('aria-hidden');

            resetPreviousValues();
        }
    }

    function removeIdentifierFromStack(identifier) {
        var identifierIndex = wmjQuery.inArray(identifier, _popupStack);

        if (identifierIndex !== -1) {
            _popupStack.splice(identifierIndex, 1);
        }
    }

    function resetPreviousValues() {
        for (var i = 0; i < _previousAriaHiddenValues.length; i++) {
            var currElementDetails = _previousAriaHiddenValues[i];
            ariaAttributesSetter.setAriaHidden(currElementDetails.element, currElementDetails.val);
        }

        _previousAriaHiddenValues = [];
    }
}


/***/ }),

/***/ 3533:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

var getCtx = (__webpack_require__(8912)/* .getCtx */ .yK);

getCtx().register('FocusBehaviorSetter')
    .asCtor(FocusBehaviorSetter)
    .dependencies('wmjQuery, AccessibilityConsts, FeaturesManager, Consts, EventsListener');


function FocusBehaviorSetter(wmjQuery, accessibilityConsts, featuresManager, consts, eventsListener) {
    var _this = this;
    _this.setFocusBehavior = setFocusBehavior;

    var WALKME_DISABLE_DEFAULT_FOCUS_CLASS = 'walkme-disable-default-focus';
    var WALKME_ACCESSIBLE_FOCUS_CLASS = 'walkme-accessible-focus';
    var WALKME_OUTLINE_HANDLED_CLASS = 'walkme-outline-handled';

    var _enableFocusClass;
    var _mousedownStoppedEvent;
    var _enableOutlineOnFocusin;

    function ctor() {
        _enableFocusClass = featuresManager.isFeatureEnabled(accessibilityConsts.FEATURES.AutoFocusRing);
        _mousedownStoppedEvent = "mousedown" + consts.EVENTS.PropagationStoppedSuffix;
        _enableOutlineOnFocusin = featuresManager.isFeatureEnabled('addOutlineOnFocusin');

        if (!_enableFocusClass) {
            if (_enableOutlineOnFocusin) {
                wmjQuery('body').on("focusin", enableOutline);
            } else {
                wmjQuery('body').on("keydown", enableOutline);
            }
        }
    }

    function enableOutline(event) {
        if(event.target.classList.toString().indexOf('walkme-copilot') > -1) return;

        if (event.which == accessibilityConsts.KEY_CODES.TAB || _enableOutlineOnFocusin) {
            _enableFocusClass = true;
            wmjQuery('body').off("keydown", enableOutline)
                .on("mousedown", disableOutline);
            eventsListener.on(_mousedownStoppedEvent, disableOutline);
        }
    }

    function disableOutline(event) {
        _enableFocusClass = false;
        wmjQuery('body').off("mousedown", disableOutline)
            .on("keydown", enableOutline);
        eventsListener.off(_mousedownStoppedEvent, disableOutline);
    }

    function setFocusBehavior(focusableElements, focusClass) {
        var mouseDownFocusActive;
        focusClass = focusClass || WALKME_ACCESSIBLE_FOCUS_CLASS;

        for (var i = 0; i < focusableElements.length; i++) {
            var currElement = wmjQuery(focusableElements[i]);

            if (!currElement.hasClass(WALKME_OUTLINE_HANDLED_CLASS)) {
                currElement.addClass(WALKME_OUTLINE_HANDLED_CLASS);

                currElement.focus(onFocus)
                    .mousedown(onMousedown)
                    .blur(onBlur);
            }
        }

        function onMousedown(mousedownEvent) {
            mouseDownFocusActive = (mousedownEvent.type === 'mousedown');
        }

        function onFocus() {
            var destClass = getDestFocusClass();
            wmjQuery(this).addClass(destClass);
        }

        function getDestFocusClass() {
            return _enableFocusClass && !mouseDownFocusActive ? focusClass : WALKME_DISABLE_DEFAULT_FOCUS_CLASS;
        }

        function onBlur() {
            mouseDownFocusActive = false;

            wmjQuery(this).removeClass(focusClass)
                .removeClass(WALKME_DISABLE_DEFAULT_FOCUS_CLASS);
        }
    }

    ctor();
}



/***/ }),

/***/ 1860:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

var getCtx = (__webpack_require__(8912)/* .getCtx */ .yK);

getCtx().register('FocusLockChecker')
    .asCtor(FocusLockChecker)
    .dependencies('StepDataGetter, ShoutOutsManager, SurveysManager, WmAccessibilityCommonUtils, IdGetter, AccessibilityConsts');

function FocusLockChecker(stepDataGetter, shoutOutsManager, surveysManager, wmAccessibilityCommonUtils, idGetter, accessibilityConsts) {
    var _this = this;
    _this.isFocusLocked = isFocusLocked;

    var _deployableTypes = accessibilityConsts.DEPLOYABLE_TYPES;

    function isFocusLocked() {
        return isFocusLockedByMenu() || isFocusLockedByResource() || isFocusLockedByBalloon() || isFocusLockedBySurvey()
            || isFocusLockedByShoutout()
    }

    function isFocusLockedByMenu() {
        return wmjQuery('.walkme-splash').length > 0;
    }

    function isFocusLockedByBalloon() {
        var balloonElement = wmjQuery('.walkme-custom-balloon-outer-div');

        if (balloonElement.length > 0) {
            var stepData = stepDataGetter.getActiveStepData();

            if (stepData) {
                return stepData.isFocusLockEnabled;
            }
        }

        return false;
    }

    function isFocusLockedByResource() {
        return wmjQuery('#walkme-content-light-box').length > 0;
    }

    function isFocusLockedBySurvey() {
        var surveyElements = wmjQuery('.walkme-survey-balloon');

        if (surveyElements.length > 0) {
            for (var i = 0; i < surveyElements.length; i++) {
                var surveyElement = wmjQuery(surveyElements[i]);
                var id = idGetter.getIdByElement(surveyElement, accessibilityConsts.ELEMENT_TYPES_PREFIX.survey);
                var survey = surveysManager.getById(id);
                var focusLockDisabledById = wmAccessibilityCommonUtils.shouldDisableFocusLock(_deployableTypes.survey, id);
                var hasSpotlight = survey.Settings.fadeBackground == "1";

                return hasSpotlight || !focusLockDisabledById;
            }
        }

        return false;
    }

    function isFocusLockedByShoutout() {
        var shoutoutElements = wmjQuery('.wm-outer-div.wm-shoutout');

        if (shoutoutElements.length > 0) {
            for (var i = 0; i < shoutoutElements.length; i++) {
                var shoutoutElement = wmjQuery(shoutoutElements[i]);
                var id = idGetter.getIdByElement(shoutoutElement, accessibilityConsts.ELEMENT_TYPES_PREFIX.shoutout);
                var shoutout = shoutOutsManager.getById(id);
                var hasSpotlight = !!shoutout.Settings.overlay;
                var focusLockDisabled = wmAccessibilityCommonUtils.shouldDisableFocusLock(_deployableTypes.shoutout, id);

                return hasSpotlight || !focusLockDisabled;
            }
        }
        return false;
    }
}



/***/ }),

/***/ 1016:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

var getCtx = (__webpack_require__(8912)/* .getCtx */ .yK);

getCtx().register('IdGetter')
    .asCtor(IdGetter);

function IdGetter() {
    var _this = this;

    _this.getIdByElement = getIdByElement;

    function getIdByElement(element, elementTypePrefix) {
        return getIdFromElement(element, elementTypePrefix);
    }

    function getIdFromElement(element, idClassPrefix) {
        var classesString = element.attr("class");

        if (!classesString) {
            return;
        }

        var elementClasses = classesString.split(" ");

        if (elementClasses) {
            for (var i = 0; i < elementClasses.length; i++) {
                if (elementClasses[i].indexOf(idClassPrefix) == 0) {
                    return elementClasses[i].substring(idClassPrefix.length);
                }
            }
        }
    }
}



/***/ }),

/***/ 4316:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

var getCtx = (__webpack_require__(8912)/* .getCtx */ .yK);

getCtx().register('IframeTabOrderWrapper')
    .asCtor(IframeTabOrderWrapper)
    .dependencies('DomManager, FeaturesManager');

function IframeTabOrderWrapper(domManager, featuresManager) {
    var _this = this;

    _this.wrapIframes = wrapIframes;

    function wrapIframes(iframes, deployablesRoles) {
        if (featuresManager.isFeatureEnabled('ignoreIframeWrap'))
            return;
        var allIframes = iframes|| wmjQuery('iframe');

        for (var i = 0; i < allIframes.length; i++) {
            var currIframe = wmjQuery(allIframes[i]);

            if (currIframe.attr("id") === "walkme-hidden-iframe" || currIframe.attr("class") === "walkme-to-remove") {
                return;
            }

            var wrapperBefore = createIframeWrapperElement('before');
            var wrapperAfter = createIframeWrapperElement('after');
            
            if (deployablesRoles && deployablesRoles.iframeWrapper) {
                wrapperAfter.attr('role', deployablesRoles.iframeWrapper);
                wrapperBefore.attr('role', deployablesRoles.iframeWrapper);
            }

            wrapperBefore.insertBefore(currIframe);
            wrapperAfter.insertAfter(currIframe);
        }
    }

    function createIframeWrapperElement(direction) {
        var text = featuresManager.isFeatureEnabled('iframeWrapperText') ? direction + ' iframe' : '';
        return domManager.parseElementAsJquery('<div class="walkme-to-destroy walkme-iframe-wrapper-' + direction + '" ' +
            'tabindex="0" style="width: 1px;position: absolute;left: -10000px;" aria-label="' + direction + ' iframe">' + text + '</div>');
    }
}



/***/ }),

/***/ 7201:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

var getCtx = (__webpack_require__(8912)/* .getCtx */ .yK);

getCtx().register('SmartTipIdentifier')
    .asCtor(SmartTipIdentifier);

function SmartTipIdentifier() {
    var _this = this;

    _this.isSmartTipIconElement = isSmartTipIconElement;

    function isSmartTipIconElement(element) {
        return (element.hasClass('walkme-custom-icon-outer-div') && !element.hasClass('walkme-custom-launcher-outer-div'));
    }
}



/***/ }),

/***/ 4009:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

var getCtx = (__webpack_require__(8912)/* .getCtx */ .yK);

getCtx().register('StepDataGetter')
    .asCtor(StepDataGetter)
    .dependencies('FlowsContainer, FlowStack, WmAccessibilityCommonUtils, Lib, Consts, AccessibilityConsts');

function StepDataGetter(flowsContainer, flowStack, wmAccessibilityCommonUtils, lib, consts, accessibilityConsts) {
    var _this = this;
    _this.getActiveStepData = getActiveStepData;

    var _deployableTypes = accessibilityConsts.DEPLOYABLE_TYPES;

    function getActiveStepData() {
        return isWalkThru() ? fetchWTData() : fetchFlowData();
    }

    function isWalkThru() {
        return (lib.getCurrentTutorial() != undefined && getCtx().get('CurrentWalkthruData').state != consts.WALKTHRU_STATE.NOT_RUNNING);
    }

    function fetchFlowData() {
        var currentFlowData = flowStack.peek();

        if (!currentFlowData) {
            return;
        }

        var nodeObj = flowsContainer.getNodeById(currentFlowData.flowId, currentFlowData.stageId);
        var uiElement = nodeObj && nodeObj.UIElements && nodeObj.UIElements[0];

        if (!uiElement) {
            return;
        }

        var hasSpotlight = isSpotlightStep(uiElement);
        var isPopup = uiElement.Type === "Popup";
        var accessibilitySettings = uiElement.AccessibilityConfigs && uiElement.AccessibilityConfigs.length > 0 ? uiElement.AccessibilityConfigs[0] : {};

        var stepData = {
            deployableType: _deployableTypes.SWT,
            spotlight: hasSpotlight,
            isPopup: isPopup,
            id: uiElement.Id,
            isFocusGrabEnabled: accessibilitySettings.IsFocusGrabEnabled != false,
            ariaLabel: accessibilitySettings.AriaLabel,
            identifySettings: accessibilitySettings.IdentifySettings
        };

        stepData['isFocusLockEnabled'] = isFocusLockEnabled(stepData, accessibilitySettings.IsFocusLockEnabled != false);

        var focus = isFocusEnabled(stepData, accessibilitySettings.IsFocusGrabEnabled != false);
        if(!focus) {
            stepData['isFocusGrabEnabled'] = focus; 
            stepData['isFocusLockEnabled'] = focus;
            stepData['spotlight'] = focus;
        }

        return stepData;
    }

    function fetchWTData() {
        var step = getCtx().get('CurrentWalkthruData').getCurrentStep();

        if (step) {
            var hasSpotlight = isSpotlightStep(step);
            var accessibilitySettings = step.AccessibilityConfigs && step.AccessibilityConfigs.length > 0 ? step.AccessibilityConfigs[0] : {};

            var stepData = {
                deployableType: _deployableTypes.WT,
                spotlight: hasSpotlight,
                isPopup: getCtx().get('StepUtils').isPopupStep(step),
                id: step.Id,
                isFocusGrabEnabled: accessibilitySettings.IsFocusGrabEnabled != false,
                ariaLabel: accessibilitySettings.AriaLabel,
                identifySettings: accessibilitySettings.IdentifySettings
            };

            stepData['isFocusLockEnabled'] = isFocusLockEnabled(stepData, accessibilitySettings.IsFocusLockEnabled != false);

            return stepData;
        }
    }

    function isSpotlightStep(step) {
        return step.Settings.fadeBackground == "1" || step.Settings.fadeBackground == true || step.Settings.fadeBackground == "True" || step.Settings.ioEnabled == "1";
    }

    function isFocusLockEnabled(stepData, isFocusLockEnabledForStep) {
        var isFocusLockDisabledById = wmAccessibilityCommonUtils.shouldDisableFocusLock(stepData.deployableType, stepData.id);
        return stepData.spotlight || (stepData.isFocusGrabEnabled && isFocusLockEnabledForStep && !isFocusLockDisabledById);
    }

    function isFocusEnabled(stepData, isFocusGrabEnabledForStep) {
        var isFocusDisabledById = wmAccessibilityCommonUtils.shouldDisableFocus(stepData.deployableType, stepData.id);
        
        return !isFocusDisabledById && isFocusGrabEnabledForStep;
    }

}


/***/ }),

/***/ 1341:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

var getCtx = (__webpack_require__(8912)/* .getCtx */ .yK);

getCtx().register('AllowedTabbableElementFinder')
    .asCtor(AllowedTabbableElementFinder)
    .dependencies('wmjQuery, AccessibilityConsts');

function AllowedTabbableElementFinder(wmjQuery, accessibilityConsts) {
    var _this = this;

    _this.findNext = findNext;

    function findNext(activeElementIndex, tabbableElements) {
        for (var i = activeElementIndex + 1; i < tabbableElements.length; i++) {
            var currElement = wmjQuery(tabbableElements[i]);

            if (currElement.parents(accessibilityConsts.ELEMENTS_SELECTORS.SMART_TIP.tooltip).length === 0) {
                return currElement;
            }
        }
    }
}


/***/ }),

/***/ 2961:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

var getCtx = (__webpack_require__(8912)/* .getCtx */ .yK);

getCtx().register('WmAccessibilityCommonUtils')
	.asCtor(WmAccessibilityCommonUtils)
	.dependencies('CommonUtils, TimerManager, AccessibilityUtils, FocusBehaviorSetter, ' +
		'AriaAttributesSetter, DefaultTextGetter, ArrayUtils, AccessibilityConsts,IframeTabOrderWrapper,FeaturesManager, ElementsGetter');

function WmAccessibilityCommonUtils(commonUtils, timerManager, accessibilityUtils, focusBehaviorSetter,
									ariaAttributesSetter, defaultTextGetter, arrayUtils, accessibilityConsts,iframeTabOrderWrapper,featuresManager, elementsGetter) {
	var _this = this;
	_this.init = init;
	_this.moveElementToEnd = accessibilityUtils.moveElementToEnd;
	_this.moveElementToStart = accessibilityUtils.moveElementToStart;
	_this.elementWrapper = elementWrapper;
	_this.handleFocusElements = handleFocusElements;
	_this.addTabIndex = addTabIndex;
	_this.bindEscToClose = bindEscToClose;
	_this.setXButtonLabel = setXButtonLabel;
	_this.lockFocus =  lockFocus;
	_this.getFocusablesInsideElement = accessibilityUtils.getFocusablesInsideElement;
	_this.checkIfElementNotEmpty = checkIfElementNotEmpty;
	_this.shouldDisableFocusLock = shouldDisableFocusLock;
	_this.shouldDisableFocus = shouldDisableFocus;
	_this.shouldAddAriaHidden = shouldAddAriaHidden;
	_this.addTitlesToFrames = addTitlesToFrames;
	_this.bindSpacePressToClick = bindSpacePressToClick;
	_this.unbindSpacePressToClick = unbindSpacePressToClick;
	_this.announce = accessibilityUtils.announce;
	_this.isWMElement = isWMElement;
	_this.isWMBalloon = isWMBalloon;
	_this.isElementOnScreen = isElementOnScreen;
	_this.addTabIndexToIframes=addTabIndexToIframes;
	_this.getKeyByValue = getKeyByValue;
	_this.findWidgetinElementList = findWidgetinElementList;
	_this.findElementAboveBalloon = findElementAboveBalloon;
	_this.findCorrectElementToTabTo = findCorrectElementToTabTo;
	_this.findElementInList = findElementInList;

	var _accessibilityFocusLock;
	var _accessibilityFocus;
	var _hidePopupBackgroundSettings;

	var ESC_KEY = 27;
	var TAB_KEY = 9;
	var SPACE_KEY = 32;
	var DEFAULT_TEXT_KEY = accessibilityConsts.DEFAULT_TEXT_KEY;

	function init(accessibilityFocusLock, accessibilityFocus, accessibilityHidePopupBackground) {
		_accessibilityFocusLock = accessibilityFocusLock;
		_accessibilityFocus = accessibilityFocus;
		_hidePopupBackgroundSettings = accessibilityHidePopupBackground;
	}

	function addTitlesToFrames(container) {
		timerManager.libSetTimeout(function() {
			var iframes = wmjQuery('iframe', container);
			for (var i = 0; i < iframes.length; i++) {
				if (!iframes.eq(i).attr('title')) {
                    iframes.eq(i).attr('title', defaultTextGetter.getValue(DEFAULT_TEXT_KEY.UntitledIframe));
                }
            }
		});
	}

	function shouldDisableFocusLock(deployableName, id) {
		var deployableFocusLockSettings = _accessibilityFocusLock[deployableName];

        return deployableFocusLockSettings &&
            ((deployableFocusLockSettings.disableAll && deployableFocusLockSettings.disableAll.toLowerCase() == "true") ||
            (deployableFocusLockSettings.disableIds &&
                deployableFocusLockSettings.disableIds.length != 0 &&
                arrayUtils.inArray(id.toString(), deployableFocusLockSettings.disableIds) != -1));
	}

	function shouldDisableFocus(deployableName, id) {
		var deployableFocusSettings = _accessibilityFocus[deployableName];

        return deployableFocusSettings &&
            ((deployableFocusSettings.disableAll && deployableFocusSettings.disableAll.toLowerCase() == "true") ||
            (deployableFocusSettings.disableIds &&
                deployableFocusSettings.disableIds.length != 0 &&
                arrayUtils.inArray(id.toString(), deployableFocusSettings.disableIds) != -1));
	}

	function shouldAddAriaHidden(hasSpotlight, deployableType, id) {
		if (!_hidePopupBackgroundSettings) {
			return false;
		}

		return hasSpotlight || shouldHidePopupWithoutSpotlightBackground(deployableType, id);
	}

	function shouldHidePopupWithoutSpotlightBackground(deployableType, id) {
		var deployableHideBackgroundSettings = deployableType ? _hidePopupBackgroundSettings[deployableType] : undefined;

		return (deployableHideBackgroundSettings &&
			(arrayUtils.inArray('*', deployableHideBackgroundSettings) !== -1 ||
			arrayUtils.inArray(id.toString(), deployableHideBackgroundSettings) !== -1));
	}

	function elementWrapper(element,title,description) {
		var accessibilityText = title;

		if (description) {
			if (!title) {
				accessibilityText = description;
			}
			else {
				accessibilityText += '. ' + description;
			}
		}

		if (accessibilityText && element){
			ariaAttributesSetter.setAriaLabel(element, accessibilityText);
		}
	}

	function handleFocusElements(container, focusableElements, closeBtnSelector, lockFocusNeeded, spotlightElement) {
		if (!featuresManager.isFeatureEnabled('noContainerTabIndex')) {
			container.attr('tabIndex', 0);
		}

        focusBehaviorSetter.setFocusBehavior(container);

        focusBehaviorSetter.setFocusBehavior(focusableElements);
		var closeButton = wmjQuery(closeBtnSelector, container);
		bindEscToClose(container, closeButton);

        if (lockFocusNeeded) {
			lockFocus(container, focusableElements, spotlightElement);
		}
	}

	function checkIfElementNotEmpty(element) {
        return (wmjQuery.trim(element.text()) ||
			(element[0].childNodes.length != 0 &&
			!(element[0].childNodes.length == 1 && (element.has('div').length == 1 || element.text()))));
	}

	function addTabIndex(elements, startIndex) {
		for (var i = 0; i < elements.length; i++) {
			commonUtils.addTabIndex(elements.eq(i), startIndex ? startIndex : 0);
		}
	}

	function bindEscToClose(container, closeButtonElem) {
		if (closeButtonElem.length > 0) {
			wmjQuery(container).keydown(function(e){
	    		if (e.keyCode === ESC_KEY) {
	        		closeButtonElem.click();
	        	}
			});
		}
	}

	function setXButtonLabel(element, text) {
		ariaAttributesSetter.setAriaLabel(element, text || defaultTextGetter.getValue(DEFAULT_TEXT_KEY.Close));
	}

	function addTabIndexToIframes(allIframes) {
		addTabIndex(allIframes);
		if(featuresManager.isFeatureEnabled('innerIframesWrap')){
			iframeTabOrderWrapper.wrapIframes(allIframes);
		}
	}

	function lockFocus(container, focusableElements, spotlightElement) {
		container.keydown(function(event) {
	    	if(event.which == TAB_KEY) {
	    		var focusedElement = wmjQuery(elementsGetter.getActiveElement());
	    		focusedElement = focusedElement[0] ? focusedElement[0] : container[0];
	    		focusedElement = focusedElement.shadowRoot ? focusedElement.shadowRoot.activeElement : focusedElement;

	    		if (event.shiftKey) {
	    			if (focusedElement == focusableElements[0] || focusedElement == container[0]) {
		    			if (spotlightElement && spotlightElement.length) {
		    				_this.getFocusablesInsideElement(spotlightElement).last().focus();
		    			} else {
		    				focusableElements[focusableElements.length - 1].focus();
		    			}

		    			event.preventDefault();
		    		}
	    		} else {
		    		if (focusedElement == focusableElements[focusableElements.length - 1]) {
		    			if (spotlightElement && spotlightElement.length) {
							_this.getFocusablesInsideElement(spotlightElement).first().focus();
		    			} else {
			    			focusableElements[0].focus();
			    		}

		    			event.preventDefault();
		    		}
	    		}
	    	}
	    });
	}

	function isElementOnScreen(selector) {
		var isInDom = isElementInDocumentDom(selector);

		if(isInDom){
			return true;
		}

		var shadowRootHostElement = getShadowRootHostElement(selector);

		return shadowRootHostElement && isElementInDocumentDom(shadowRootHostElement);
    }

    function isElementInDocumentDom(selector){
		return wmjQuery.contains(document.documentElement, wmjQuery(selector)[0]);
	}

	function getShadowRootHostElement(selector){
		var shadowRoot = wmjQuery(selector)[0];

		while(shadowRoot && !shadowRoot.host){
			shadowRoot = shadowRoot.parentNode;
		}

		if(shadowRoot){
			return shadowRoot.host;
		}
	}

    function isWMElement(element) {
		if (!element) return false;

        var id = element.id;
        if (id && id.indexOf && id.indexOf('walkme') >= 0) return true;

        // related jsperf: https://jsperf.com/get-classes-of-element
        var cls = element.className;
        return cls && cls.indexOf && (cls.indexOf('walkme') >= 0 || cls.indexOf('wmd') >= 0 || cls.indexOf('wm-') >= 0);
    }

	function isWMBalloon(element) {
        if (!element) return false;

        // related jsperf: https://jsperf.com/get-classes-of-element
        var balloonClass = element.className;
        return balloonClass && balloonClass.indexOf && balloonClass.indexOf('walkme-custom-balloon-outer-div') >= 0;
    }

	function onSpacePressHandler(event) {
        if (event.which === SPACE_KEY) {
            event.preventDefault();
            event.stopPropagation();

            event.currentTarget.click();
        }
    }

	function bindSpacePressToClick(selector, container) {
		if (container){
            wmjQuery(container).on('keypress.accessibility', selector, onSpacePressHandler);
		}else{
            wmjQuery(selector).on('keypress.accessibility', onSpacePressHandler);
        }
    }

    function unbindSpacePressToClick(selector, container) {
		if(container){
            wmjQuery(container).off('keypress.accessibility', selector, onSpacePressHandler);
		}else {
            wmjQuery(selector).off('keypress.accessibility', onSpacePressHandler);
        }
    }

	function getKeyByValue(object, value) {
        return Number(
            Object.keys(object).find(function(key) {
                return object[key] === value;
            })
        );
    }

    function findWidgetinElementList(tabbableElements) {
        var element;
        for (var i=0; i < tabbableElements.length; i++) {
            element = tabbableElements[i];
            if (element.id.indexOf('walkme-player') != -1) return element;
        }
    }

	function findElementAboveBalloon(tabbableElements) {
		var currentItem;
		var nextItem;
		for (var i=0; i < tabbableElements.length; i++) {
			currentItem = tabbableElements[i];
			nextItem = tabbableElements[i+1];
			if (nextItem.className.indexOf('walkme-custom-balloon-outer-div') >= 0) {
				return currentItem;
			} 
		}
	}

	function findCorrectElementToTabTo(allTabbableElements, focusableElements, visitedDomElements, offset){
		var offset = offset || 0;
		var chosenElement = findElementInList(visitedDomElements);
		chosenElement = chosenElement !== undefined ? chosenElement.focusTrackingDetails.elementToKeep[0] : focusableElements;
		var chosenElementLocation = getKeyByValue(allTabbableElements, chosenElement);

		if (!Number.isFinite(chosenElementLocation)) {
				var lastElementInFocusableList = focusableElements.last();
				var chosenElementLocation = _this.getKeyByValue(allTabbableElements, lastElementInFocusableList[0]);
		} 

		// case if offset is too big or there is none, then start from the beginning
		if (!allTabbableElements[chosenElementLocation + offset]) {
			return allTabbableElements[0];
		}
		return allTabbableElements[chosenElementLocation + offset];
	}

	// This is needed because each element we tab to will be added to the _visitedDomElements global variable. 
	// The current one in the object will be "active" while the others are undefined. 
	// So this function is used to find the one that is "active". 
	// If we don't have this, it will find the first element in the object which may not always be the "active" element
	function findElementInList(visitedDomElements) {
		if (Object.keys(visitedDomElements).length === 0) return undefined;
		for (var i=0; i < Object.keys(visitedDomElements).length; i++){
			if (Object.values(visitedDomElements)[i] !== undefined) {
				return Object.values(visitedDomElements)[i];
			}
		}
	}
}


/***/ }),

/***/ 704:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

var getCtx = (__webpack_require__(8912)/* .getCtx */ .yK);
getCtx()
	.register('WmAccessibilityCss')
	.asCtor(WmAccessibilityCss)
	.dependencies('ResourceManager, FeaturesManager, SettingsFile');

function WmAccessibilityCss(resourceManager, featuresManager, settingsFile) {
	var _this = this;

	_this.getCss = getCSS;

	var _css;
	var CSS_ID = 'walkme-accessibility-css';

	_this.init = function() {
		if (featuresManager.isFeatureEnabled('inlineStyleCspSupport')) {
			injectCssFile();
		} else {
			var CSS = getCSS();
			resourceManager.injectCss(CSS, CSS_ID, wmjQuery('head'));
		}
	};

	function injectCssFile() {
		var urlPrefix = settingsFile.getSettingsFile().Styles + '/accessibility/';

		

		resourceManager.injectCssFile(urlPrefix + 'wmAccessibilityCss.css', {
			cssId: CSS_ID
		});
	}

	function getCSS() {
		if (!_css) {
			_css = __webpack_require__(6126);
		}

		return _css;
	}
}



/***/ }),

/***/ 4703:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

var getCtx = (__webpack_require__(8912)/* .getCtx */ .yK);
getCtx().register('WmAccessibilityInitializer')
	.asCtor(WmAccessibilityInitializer)
	.dependencies('FeaturesManager, CommonUtils, WmAccessibilityCss, BizFlowAccessibilityHandler, ' + 
		'LauncherAccessibilityHandler, ResourceAccessibilityHandler, ShoutoutAccessibilityHandler, ' + 
		'SmartTipAccessibilityHandler, SurveyAccessibilityHandler, WalkThruAccessibilityHandler, ' +
		'ShuttleAccessibilityHandler, MenuAccessibilityHandler, WmAccessibilityCommonUtils, BBCodeAccessibilityHandler, ' +
		'BallonCreatedAccessibilityHandler, TextsTranslator, IframeTabOrderWrapper, LiveChatAccessibilityHandler, ' + 
		'ShoutoutVisualDesignAccessibilityHandler, DebuggerAccessibilityHandler, CaptureBalloonAccessibilityHandler');

function WmAccessibilityInitializer(featuresManager, commonUtils, wmAccessibilityCss, bizFlowAccessibilityHandler, 
		launcherAccessibilityHandler, resourceAccessibilityHandler, shoutoutAccessibilityHandler,
		smartTipAccessibilityHandler, surveyAccessibilityHandler, walkThruAccessibilityHandler,
        shuttleAccessibilityHandler, menuAccessibilityHandler, wmAccessibilityCommonUtils, bbCodeAccessibilityHandler,
		ballonCreatedAccessibilityHandler, textsTranslator, iframeTabOrderWrapper, liveChatAccessibilityHandler, shoutoutVisualDesignAccessibilityHandler, debuggerAccessibilityHandler, captureBalloonAccessibilityHandler) {
	var _this = this;

	var _deployablesRoles;
	var _deployablesAriaLabels;
	var _accessibilityFocusLock;
	var _accessibilityFocus;
	var _accessibilityHidePopupBackground;

	_this.init = function init() {
		if (!(featuresManager.isFeatureEnabled('jawsAccessibility') || featuresManager.isFeatureEnabled('accessibility'))) {
			wmAccessibilityCss.init();

			var customConfiguration = commonUtils.getCustomConfiguration();
			_deployablesRoles = customConfiguration.deployablesRoles || {};
			_deployablesAriaLabels = customConfiguration.deployablesAriaLabels || {};
			_accessibilityFocusLock = customConfiguration.accessibilityFocusLock || {};
			_accessibilityFocus = customConfiguration.accessibilityFocus || {};
			var textTranslations = customConfiguration.accessibilityMultilang || {};
			_accessibilityHidePopupBackground = customConfiguration.accessibilityHidePopupBackground;
			textsTranslator.init(textTranslations);
			initializeDeployables();
            iframeTabOrderWrapper.wrapIframes(undefined, _deployablesRoles);
		}
	};

	function initializeDeployables() {
		wmAccessibilityCommonUtils.init(_accessibilityFocusLock, _accessibilityFocus, _accessibilityHidePopupBackground);
		bbCodeAccessibilityHandler.init(_deployablesRoles, _deployablesAriaLabels);
		bizFlowAccessibilityHandler.init(_deployablesRoles, _deployablesAriaLabels);
		launcherAccessibilityHandler.init(_deployablesRoles, _deployablesAriaLabels);
		menuAccessibilityHandler.init(_deployablesRoles, _deployablesAriaLabels);
		resourceAccessibilityHandler.init(_deployablesRoles, _deployablesAriaLabels);
		shoutoutAccessibilityHandler.init(_deployablesRoles, _deployablesAriaLabels);
		smartTipAccessibilityHandler.init(_deployablesRoles, _deployablesAriaLabels);
		surveyAccessibilityHandler.init(_deployablesRoles, _deployablesAriaLabels);
		walkThruAccessibilityHandler.init(_deployablesRoles, _deployablesAriaLabels);
        shuttleAccessibilityHandler.init(_deployablesRoles, _deployablesAriaLabels);
		ballonCreatedAccessibilityHandler.init(_deployablesRoles, _deployablesAriaLabels);
        liveChatAccessibilityHandler.init(_deployablesRoles, _deployablesAriaLabels);
        shoutoutVisualDesignAccessibilityHandler.init();
		debuggerAccessibilityHandler.init();
		captureBalloonAccessibilityHandler.init();
		
        wmAccessibilityCommonUtils.announce("");
	}
}


/***/ }),

/***/ 8912:
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

/***/ 6126:
/***/ (function(module) {

"use strict";
module.exports = "#walkme-current-language {\n\tpadding: 3px !important;\n}\n\n.walkme-tab-button {\n\toutline-offset: -3px;\n}\n\n.walkme-accessible-focus:focus {\n\toutline: 3px solid #369cd9 !important;\n}\n\n.walkme-survey-answer-nps-radiobutton.walkme-accessible-focus:focus + label {\n\toutline: 3px solid #369cd9 !important;\n}\n\n.walkme-survey-answer-rating-radiobutton.walkme-accessible-focus:focus + label {\n\toutline: 3px solid #369cd9 !important;\n}\n\n.walkme-disable-default-focus {\n\toutline: 0px !important;\n}\n\n.walkme-menu-open-notie .walkme-category .walkme-accessible-activatable-focus.walkme-deployable-row:focus,\n.walkme-menu-open-notie .walkme-activatable.walkme-accessible-activatable-focus:focus,\n.walkme-menu-open-notie .walkme-deployable-row.walkme-accessible-activatable-focus:focus {\n\toutline: 0;\n\t-webkit-box-shadow: inset 0px 0px 0px 2px #3c9dd7;\n\t-moz-box-shadow: inset 0px 0px 0px 2px #3c9dd7;\n\toutline: solid 2px #7dc7ea !important;\n\toutline-offset: -2px;\n}\n\n.walkme-menu-open-ie .walkme-category .walkme-accessible-activatable-focus.walkme-deployable-row:focus,\n.walkme-menu-open-ie .walkme-activatable.walkme-accessible-activatable-focus:focus,\n.walkme-menu-open-ie .walkme-deployable-row.walkme-accessible-activatable-focus:focus {\n\toutline: solid 3px #7dc7ea !important;\n\toutline-offset: -2px;\n}\n\n.walkme-search-box.walkme-accessible-focus:focus {\n\tbox-shadow: inset 0px 0px 0px 2px #3c9dd7;\n}\n\n#wt-cannot-be-played {\n\tdisplay: block;\n\tmargin-top: 0.67em;\n\tmargin-bottom: 0.67em;\n\tmargin-left: 0;\n\tmargin-right: 0;\n\tfont-weight: bold;\n\tcolor: #373737;\n\tfont-size: 14px;\n\tborder: none;\n\tmargin: 10px;\n\tword-wrap: break-word;\n}\n";

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
/******/ 	var __webpack_exports__ = __webpack_require__(337);
/******/ 	wmbundle = __webpack_exports__;
/******/ 	
/******/ })()
;
/* WalkMe Module */ return wmbundle; })
//# sourceMappingURL=bundle.js.map
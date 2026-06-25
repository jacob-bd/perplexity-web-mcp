/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/************************************************************************/

// UNUSED EXPORTS: default

;// ./src/common/utils/debounce.js
/**
https://github.com/lodash/lodash
Copyright JS Foundation and other contributors <https://js.foundation/>

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.
 */
/* global globalThis */

function isObject(value) {
    const type = typeof value;
    return value != null && (type === 'object' || type === 'function');
}

/** Detect free variable `global` from Node.js. */
const freeGlobal = typeof __webpack_require__.g === 'object' && __webpack_require__.g !== null && __webpack_require__.g.Object === Object && __webpack_require__.g;

/** Detect free variable `globalThis` */
// eslint-disable-next-line eqeqeq
const freeGlobalThis = typeof globalThis === 'object' && globalThis !== null && globalThis.Object == Object && globalThis;

/** Detect free variable `self`. */
const freeSelf = typeof self === 'object' && self !== null && self.Object === Object && self;

/** Used as a reference to the global object. */
// eslint-disable-next-line no-new-func
const root = freeGlobalThis || freeGlobal || freeSelf;

function debounce(func, wait, options) {
    let lastArgs;
    let lastThis;
    let maxWait;
    let result;
    let timerId;
    let lastCallTime;

    let lastInvokeTime = 0;
    let leading = false;
    let maxing = false;
    let trailing = true;

    // Bypass `requestAnimationFrame` by explicitly setting `wait=0`.
    const useRAF = !wait && wait !== 0 && typeof root.requestAnimationFrame === 'function';

    if (typeof func !== 'function') {
        throw new TypeError('Expected a function');
    }
    wait = +wait || 0;
    if (isObject(options)) {
        leading = !!options.leading;
        maxing = 'maxWait' in options;
        maxWait = maxing ? Math.max(+options.maxWait || 0, wait) : maxWait;
        trailing = 'trailing' in options ? !!options.trailing : trailing;
    }

    function invokeFunc(time) {
        const args = lastArgs;
        const thisArg = lastThis;

        lastArgs = undefined;
        lastThis = undefined;
        lastInvokeTime = time;
        result = func.apply(thisArg, args);
        return result;
    }

    function startTimer(pendingFunc, localWait) {
        if (useRAF) {
            root.cancelAnimationFrame(timerId);
            return root.requestAnimationFrame(pendingFunc);
        }
        return setTimeout(pendingFunc, localWait);
    }

    function cancelTimer(id) {
        if (useRAF) {
            return root.cancelAnimationFrame(id);
        }
        clearTimeout(id);
    }

    function shouldInvoke(time) {
        const timeSinceLastCall = time - lastCallTime;
        const timeSinceLastInvoke = time - lastInvokeTime;

        // Either this is the first call, activity has stopped and we're at the
        // trailing edge, the system time has gone backwards and we're treating
        // it as the trailing edge, or we've hit the `maxWait` limit.
        return lastCallTime === undefined || (timeSinceLastCall >= wait)
    || (timeSinceLastCall < 0) || (maxing && timeSinceLastInvoke >= maxWait);
    }

    function trailingEdge(time) {
        timerId = undefined;

        // Only invoke if we have `lastArgs` which means `func` has been
        // debounced at least once.
        if (trailing && lastArgs) {
            return invokeFunc(time);
        }
        lastArgs = undefined;
        lastThis = undefined;
        return result;
    }

    function remainingWait(time) {
        const timeSinceLastCall = time - lastCallTime;
        const timeSinceLastInvoke = time - lastInvokeTime;
        const timeWaiting = wait - timeSinceLastCall;

        return maxing
            ? Math.min(timeWaiting, maxWait - timeSinceLastInvoke)
            : timeWaiting;
    }

    function timerExpired() {
        const time = Date.now();
        if (shouldInvoke(time)) {
            return trailingEdge(time);
        }
        // Restart the timer.
        timerId = startTimer(timerExpired, remainingWait(time));
    }

    function leadingEdge(time) {
    // Reset any `maxWait` timer.
        lastInvokeTime = time;
        // Start the timer for the trailing edge.
        timerId = startTimer(timerExpired, wait);
        // Invoke the leading edge.
        return leading ? invokeFunc(time) : result;
    }

    function cancel() {
        if (timerId !== undefined) {
            cancelTimer(timerId);
        }
        lastInvokeTime = 0;
        lastArgs = undefined;
        lastCallTime = undefined;
        lastThis = undefined;
        timerId = undefined;
    }

    function flush() {
        return timerId === undefined ? result : trailingEdge(Date.now());
    }

    function pending() {
        return timerId !== undefined;
    }

    function debounced(...args) {
        const time = Date.now();
        const isInvoking = shouldInvoke(time);

        lastArgs = args;
        lastThis = this;
        lastCallTime = time;

        if (isInvoking) {
            if (timerId === undefined) {
                return leadingEdge(lastCallTime);
            }
            if (maxing) {
                // Handle invocations in a tight loop.
                timerId = startTimer(timerExpired, wait);
                return invokeFunc(lastCallTime);
            }
        }
        if (timerId === undefined) {
            timerId = startTimer(timerExpired, wait);
        }
        return result;
    }
    debounced.cancel = cancel;
    debounced.flush = flush;
    debounced.pending = pending;
    return debounced;
}

/* harmony default export */ const utils_debounce = (debounce);

;// ./src/common/utils/domUtils.js
function compileRegexPatterns(regexPatterns) {
    if (regexPatterns instanceof Array) {
        for (let i = 0; i < regexPatterns.length; i++) {
            if (regexPatterns[i] && regexPatterns[i].pattern && regexPatterns[i].name) {
                try {
                    regexPatterns[i].pattern = new RegExp(regexPatterns[i].pattern);
                } catch (error) {
                    error.data = { regex: regexPatterns[i] };
                    logger.error(error);
                    regexPatterns[i] = {};
                }
            } else {
                regexPatterns[i] = {};
            }
        }
        return regexPatterns;
    }
    return [];
}
;// ./src/common/consts.js
const KEYS_TO_INCLUDE = ["Escape", "Tab"];

const FA_UUID_EXPIRATION_TIME = 60 * 60 * 24;
const FA_SESSION_DATA_EXPIRATION_TIME = 60 * 60 * 4;
const FA_STORAGE_KEY = 'faUUID';


const URLS = {
    CREATE_DOM_INCEPTION:                     '/api/inception/fa/createList',
    SAVE_SESSION_START_INCEPTION:             '/api/inception/sessions/saveSessionStart',
    FA_AEU_HB:                                '/api/inception/aeu/hb',
};

const platformIds = {
    SalesforceClassic: 1,
    MicrosoftDynamics: 2,
    SuccessFactors: 3,
    Workday: 4,
    Oracle: 5,
    SalesforceLigthning: 6,
    VolvoKonduct: 7,
    Aspera: 8,
    JohnDeere: 9,
    Ariba: 10,
    Kadince: 11,
    Concur: 38,
    ServiceNow : 40,
    inFor: 15,
    s4h: 53,
    s4hQa: 2696,
};

;// ./src/config/config.js
const CONFIG_KEY = 'wm-uii.config';
const CONFIG = {};

/* harmony default export */ const config = ({
    get(key) {
        return CONFIG[key];
    },
    init() {
        try {
            const configValue = localStorage.getItem(CONFIG_KEY);
            let config;

            if (configValue) {
                localStorage.removeItem(CONFIG_KEY);
                config = JSON.parse(configValue);
            } else {
                config = window[CONFIG_KEY];
            }

            config && Object.entries(config).forEach(([ key, value ]) => {
                CONFIG[key] = value;
            });

            return CONFIG;
        } catch (error) {
            throw error;
        }
    }
});

;// ./src/formAnalysis.js
 
 
 
 

let nativeIframe = document.getElementById('wm-deepui-natives-iframe');
const CACHED_SESSION_DATA = 'cachedSessionData';
const TIME_SENT = 'timeSent';
let whiteList;
const oldCapture = true;

let domService, 
    userService, 
    storageService, 
    deepUiLanguageDetectors; 
const walkmeService = window._walkMe;

const mutationObserverOptions = {
    childList: true,
    subtree: true
};

function formAnalysisLogger(error, message, data = {}, warn = false) {
    error.errorMessage = JSON.parse(JSON.stringify(error.message));
    error.message = `[Form Analysis] ${message}`;
    error.data = { ...data, fullErrorStack: JSON.parse(JSON.stringify(error?.stack)) };
    delete error.stack;
    if (warn) {
        logger.warn(error);
    } else {
        logger.error(error);
    }
}

function textContentProvider(element) {
    const nativeFunctionsProviderCtxName = "NativeNodeFunctionsProvider";
    if (_walkmeInternals.ctx.has(nativeFunctionsProviderCtxName)) {
        const { textContentGetter } = _walkmeInternals.ctx.get(nativeFunctionsProviderCtxName);
        return textContentGetter.call(element);
    }
    return element.textContent;
}

function generateHash(str, salt) {
    if (!str || !salt) {
        return;
    }

    str += salt;
    let hash = 0;
    if (str.length === 0) return hash;
    for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash &= hash; // Convert to 32 bit integer
    }
    return hash.toString();
}

function getScrollableContainer(node, {
    height,
    width
} = { height: true }) {
    if (!node) {
        return null;
    }

    const clientKey = (height && 'clientHeight') || (width && 'clientWidth');
    const scrollKey = (height && 'scrollHeight') || (width && 'scrollWidth');

    if (!clientKey || !scrollKey) {
        return null;
    }

    if (node[scrollKey] > node[clientKey]) {
        return node;
    }
    const nextParentNode = node?.getRootNode?.()?.host || node?.parentNode;
    return getScrollableContainer(nextParentNode);
}

function captureDom(base, formContainer, isFullCapture) {
    const isLexiconEnabled = userService.isLexiconEnabled();
    return domService.capture(
        [],
        null,
        base || window.document,
        false,
        userService.getBlackList(),
        userService.isEncryptionEnabled(),
        { isLexiconEnabled },
        userService.isEnhancedStylesDomCaputre(),
        userService.isSuperEnhancedStylesDomCapture(),
        whiteList,
        userService.getSalt(),
        userService.getRegexPatterns(),
        userService.getBFParams(),
        false,
        !isFullCapture && formContainer,
        true,
    );
}

function sleep(ms) {
    // eslint-disable-next-line no-promise-executor-return
    return new Promise(resolve => setTimeout(resolve, ms));
}

function isCurrentLanguageBlocked() {
    const currentLanguage = deepUiLanguageDetectors.getLanguage();
    return currentLanguage && currentLanguage.indexOf('en') !== 0;
}

function stringBeforeQuestionMark(str) {
    if (str) return str.split('?')[0];
}

const toggleListeners = ({
    element,
    handler,
    events,
    add,
    remove,
    platformId
}) => {
    const nativeAdd = nativeIframe.contentWindow.document.addEventListener;
    const nativeRemove = nativeIframe.contentWindow.document.removeEventListener;

    events.forEach((event) => {
        if (add) {
            if (platformId && platformId[0] === platformIds.ServiceNow) {
                nativeAdd.apply(element, [event, handler, { capture: true }]);
            } else {
                nativeAdd.apply(element, [event, handler]);
            }
        } else if (remove) {
            nativeRemove.apply(element, [event, handler]);
        }
    });
};

function globalExecuteFilter(filter, context) {
    if (!filter || typeof filter !== 'function') return;
    const start = performance.now();
    const result = filter(context);

    const executionTime = performance.now() - start;
    if (this.filterExecutionTimeLogThreshold && Math.random() < this.filterExecutionTimeLogThreshold) {
        const e = new Error('[Form Analysis] filter execution time');
        e.data = { filter, executionTime };
        logger.warn(e);
    }
    if (this.accumulator) {
        this.accumulator.filtersAccumulatedTime += executionTime;
    }
    return result;
}

function getRegexPatterns() {
    const regexPatterns = [...compileRegexPatterns(userService.getRegexPatterns())];
    regexPatterns.push({
        name: "number",
        pattern: /[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*/gm
    });
    return regexPatterns;
}

function formElementChanged(platformId, formElements, formElement) {
    if (platformId === platformIds.ServiceNow && wmjQuery(formElement).find("form[method]").length > 0) {
        const prevId = wmjQuery(formElement).find("form[method]").attr("id");
        for (let i = 0; i < formElements.length; i++) {
            const currId = wmjQuery(formElements[i]).find("form[method]").attr("id");
            if (currId && prevId && (currId === prevId)) {
                return false;
            }
        }
        return true;
    }
    return !formElements.is(formElement);
}

function getParentButton(element) {
    let e = element;
    for (let i = 0; i < 5; i++) {
        if (!e) break;
        if (e.tagName === 'BUTTON' || e.tagName === 'UI5-BUTTON') {
            return e;
        }
        e = e.parentElement;
    }
    return null;
}

async function playbackSession() {
    try {
        if (!userService.getFormAnalysisSendEndUserId() || !WalkMeInsightsAPI) {
            return;
        }

        const session = await WalkMeInsightsAPI.closeSession();
        if (session) {
            return {
                sessionId: session?.sessionId || session?._result?.sessionId,
                sessionLength: session?.length
            };
        }
    } catch (error) {
        formAnalysisLogger(error, 'Error in playbackSession');
    }
}

class Form {
    constructor(
        formElement,
        active,
        initialIndicator,
        formParent,
        { forms, regexPatterns, uuid, environment, threshold, executeFilter, accumulator, uiiSettings }
    ) {
        this.active = active;
        this.sessionDate = new Date();
        this.uiiSettings = uiiSettings;
        this.filter = formParent.filter;
        this.uuid = uuid;
        this.platformId = userService.getPlatforms();
        this.saveSessionStart();
        this.events = [];
        this.pushEvent("formOpen");
        if (this.active) {
            this.pushEvent("formActive");
        }
        this.environment = environment;
        this.threshold = threshold;
        this.executeFilter = executeFilter;
        this.accumulator = accumulator;
        this.formElement = formElement;
        this.initialIndicator = initialIndicator;
        this.formIframe = formParent.filter.formIframeFilter ? this.executeFilter(formParent.filter.formIframeFilter, formParent.parentElement) : null;
        this.debounceTime = formParent.filter.debounceTime || 300;
        this.parentElement = formParent.parentElement;
        this.parentNum = formParent.parentNum;
        this.forms = forms;
        this.i = forms.length;
        this.regexPatterns = regexPatterns;
        this.totalRecordEventTime = 0;
        this.recordEventNumber = 0;
        this.maxRecordEventTime = 0;
        const timeout = this.uiiSettings?.domCapturingTimeout || 2000;
        this.lastEventTime = 0;
        this.mousedownEventsCount = 0;
        this.newElementsLoaded = false;
        this.lastDomCaptureTime = Infinity;
        this.eventDeepUiIdNotFound = false;
        this.capturedDomCount = 0;
        this.recaptureDynamicForm = false;
        this.lazyLoadingElements = this.executeFilter(this.filter.lazyLoadingFilter, this.formElement);
        this.contextData = {
            filterType: this.filter.type,
            filterVersion: this.filter.version
        };

        if (this.platformId.indexOf(platformIds.MicrosoftDynamics) === -1) {
            setTimeout(this.processDomCapturing.bind(this), timeout);
        }

        if (this.platformId.indexOf(platformIds.MicrosoftDynamics) !== -1) {
            this.formTabs = [];
        }

        try {
            if (this.uiiSettings?.collectSufaRoles && window?.wmSuccessFactors?.roleNames) {
                this.contextData.sufaRoles = window.wmSuccessFactors.roleNames;
            }
        } catch (error) {
            formAnalysisLogger(error, 'Error in save success factors role names');
        }

        this.formObserver = new nativeIframe.contentWindow.MutationObserver(utils_debounce(
            this.formMutationTracker.bind(this),
            this.debounceTime,
            { maxWait: this.debounceTime }
        ));
        if (this.formIframe) {
            this.formObserver.observe(this.formIframe, { childList: true, attributeFilter: ['class'], subtree: true });
            this.formObserver.observe(this.parentElement, { childList: true, attributeFilter: ['class'], subtree: true });
        } else {
            this.formObserver.observe(this.parentElement, { childList: true, attributeFilter: ['class', 'value'], subtree: true });
        }
        this.beforeunloadHandler = this.beforeunloadHandler.bind(this);
        toggleListeners({ element: window, events: ['beforeunload'], handler: this.beforeunloadHandler, add: true });
    }

    async saveSessionStart() {
        if (this.uiiSettings?.dataFlow) {
            const data = {
                uuid: this.uuid,
                sessionDate: this.sessionDate.getTime(),
                filterType: this.filter.type,
                platformId: this.platformId[0],
            };
            try {
                if (!this.uiiSettings?.urlCollectionDisabled) {
                    const url = prepareUrl(window.location.href)?.substring(0, 1000);
                    if (this.uiiSettings?.urlFullPathCollection) {
                        data.url = url;
                    } else {
                        data.url = stringBeforeQuestionMark(url);
                    }
                }
                await httpService.post(URLS.SAVE_SESSION_START_INCEPTION, data);
            } catch (error) {
                formAnalysisLogger(error, 'failed to send session-start data', data);
            }
        }
    }

    findNode(element) {
        if (!this.dom) return;
        return this.dom.list.find((item, index) => {
            return this.dom.originalElementsList[index] === element;
        });
    }

    processDomCapturing(autoCount = true) {
        try {
            let formContext;
            if (this.filter.formContextFilter) {
                formContext = this.executeFilter(this.filter.formContextFilter, this.formElement);
            } else {
                formContext = this.formElement;
            }

            if (this.formIframe) {
                this.dom = captureDom(this.formIframe, formContext, this.uiiSettings?.fullCapture);
            } else {
                this.dom = captureDom(null, formContext, this.uiiSettings?.fullCapture);
            }

            if (this.filter.metaDataFilters) {
                this.filter.metaDataFilters.forEach((metaDataFilter) => {
                    const { name, dataFilter } = metaDataFilter;
                    try {
                        this.contextData[name] = this.executeFilter(dataFilter, formContext);
                    } catch (error) {
                        formAnalysisLogger(error, 'Error in running metadatafilters', { name, dataFilter });
                    }
                });
            }

            this.formElementNode = this.findNode(formContext);
            this.screen = {
                availHeight: window.screen.availHeight,
                availWidth: window.screen.availWidth
            };
            if (this.events.length > 1) {
                this.events = this.events.map((event) => {
                    if (event.elementToFind) {
                        return {
                            ...event,
                            deepUiId: this.findNode(event.elementToFind)?.deepUi_id
                        };
                    }

                    if (event.type === "errorMessage" && Array.isArray(event.elementParents)) {
                        let node;
                        for (let i = 0; i < event.elementParents.length; i++) {
                            node = this.findNode(event.elementParents[i]);
                            if (node) {
                                return {
                                    ...event,
                                    deepUiId: node?.deepUi_id
                                };
                            }
                        }
                    }
                    return event;
                });
            }

            this.lastDomCaptureTime = Date.now();
            this.newElementsLoaded = false;
            this.eventDeepUiIdNotFound = false;
            if (autoCount) {
                this.capturedDomCount += 1;
            }
            if (this.uiiSettings?.debugUII) {
                formAnalysisLogger(new Error(), 'UII processDomCapturing', {
                    capturedDomCount: this.capturedDomCount,
                    domClientId: this.dom.domClientId,
                    platformId: this.platformId,
                }, true);
            }
        } catch (error) {
            formAnalysisLogger(error, 'Error in processDomCapturing');
        }
    }

    pushEvent(eventType) {
        this.events.push({
            type: eventType,
            time: Date.now(),
        });
    }

    getNormalizedEvent(event, time) {
        let elementToFind;
        let node;
        let key;
        let parentNode;
        const path = event.composedPath();
        let normalizedEvent = {};

        if (event.target) {
            elementToFind = event.toElement || event.target;
            if (path) {
                // eslint-disable-next-line prefer-destructuring
                elementToFind = path[0];
            }
            node = this.findNode(elementToFind);
        }

        if (elementToFind && !node) {
            if (event.type === "mousedown") {
                if (elementToFind.tagName === "BUTTON") {
                    normalizedEvent.data = {
                        textContent: elementToFind.textContent,
                        tagName: elementToFind.tagName,
                        title: elementToFind.title
                    };
                } else if (elementToFind?.parentElement?.tagName === "BUTTON") {
                    normalizedEvent.data = {
                        textContent: elementToFind?.parentElement?.textContent,
                        tagName: elementToFind?.parentElement?.tagName,
                        title: elementToFind?.title
                    };
                } else if (this.platformId.indexOf(platformIds.SuccessFactors) !== -1) {
                    const buttonElement = getParentButton(elementToFind);
                    if (buttonElement) {
                        normalizedEvent = {
                            textContent: buttonElement.textContent,
                            tagName: buttonElement.tagName,
                            title: buttonElement.title
                        };
                    }
                }

                if (this.platformId.indexOf(platformIds.MicrosoftDynamics) !== -1) {
                    this.eventDeepUiIdNotFound = true;
                    if (path && path.indexOf(this.formElement) !== -1) {
                        for (let i = 1; i < Math.min(path.length, 5); i++) {
                            parentNode = this.findNode(path[i]);
                            if (parentNode) {
                                break;
                            }
                        }
                    }
                }
            }
            if (event.type === "mousedown") this.eventDeepUiIdNotFound = true;
        }

        const rect = elementToFind?.getBoundingClientRect?.();
        const scrollableContainerHeight = getScrollableContainer(elementToFind);
        const scrollableContainerWidth = getScrollableContainer(elementToFind, { width: true });

        if (rect) {
            normalizedEvent = {
                ...normalizedEvent,
                x: Number((rect.x + (scrollableContainerWidth?.scrollLeft || 0))?.toFixed(2)),
                y: Number((rect.y + (scrollableContainerHeight?.scrollTop || 0))?.toFixed(2)),
                width: Number(rect.width?.toFixed(2)),
                height: Number(rect.height?.toFixed(2)),
            };
        }

        if (event.type === 'keydown' && (this.uiiSettings?.collectUserInput || KEYS_TO_INCLUDE.indexOf(event.key) !== -1)) {
            // eslint-disable-next-line prefer-destructuring
            key = event.key;
        }

        let eventX;
        let eventY;
        if (event.pageX & event.pageY) {
            eventX = Number((event.pageX + (scrollableContainerWidth?.scrollLeft || 0))?.toFixed(2));
            eventY = Number((event.pageY + (scrollableContainerHeight?.scrollTop || 0))?.toFixed(2));
        }
        return {
            ...normalizedEvent,
            eventX,
            eventY,
            deepUiId: node?.deepUi_id,
            parentDeepUiId: parentNode?.deepUi_id,
            timestamp: event.timeStamp,
            type: event.type,
            key,
            time,
            elementToFind,
        };
    }

    async beforeunloadHandler() {
        this.cacheSession = true;
        this.stopObserving();
        this.formObserver.disconnect();
        this.pushEvent("beforeunload");
        await this.closeForm();
        await this.sendDom();
    }

    avoidRecording(time) {
        if (!this.lastEventTime) this.lastEventTime = 0;

        if (time - this.lastEventTime <= 150) {
            this.eventsCount += 1;
            if (this.eventsCount > 3) {
                this.lastEventTime = time;
                return true;
            }
        } else {
            this.eventsCount = 0;
        }
        this.lastEventTime = time;
        return false;
    }

    recordEvent(event) {
        try {
            const time = Date.now();
            if (!this.uiiSettings?.collectUserInput && this.avoidRecording(time)) {
                return;
            }

            if (this.platformId.indexOf(platformIds.MicrosoftDynamics) !== -1) {
                if (event.type === 'mousedown') this.mousedownEventsCount += 1;
                if (
                    (
                        (!this.dom && this.mousedownEventsCount >= 2 && time - this.events[0].time > 2000)
                    || (this.newElementsLoaded && this.eventDeepUiIdNotFound && (this.capturedDomCount === 0 || (time - this.lastDomCaptureTime > 4000)))
                    ) && this.capturedDomCount < 3
                ) {
                    this.processDomCapturing();
                }
            } else if (this.platformId.indexOf(platformIds.SuccessFactors) !== -1) {
                if (this.uiiSettings?.sufaDynamicForms && this.filter.type === 'sufaContent') {
                    if (event.type === 'mousedown') {
                        try {
                            const path = event.composedPath();
                            let elementToFind;
                            if (event.target) {
                                elementToFind = event.toElement || event.target;
                                if (path) {
                                    // eslint-disable-next-line prefer-destructuring
                                    elementToFind = path[0];
                                }
                            }
                            const recaptureElements = this.executeFilter(this.filter.recaptureElementsFilter, this.formElement);
                            if (recaptureElements) {
                                // eslint-disable-next-line no-restricted-syntax
                                for (const recaptureElement of recaptureElements) {
                                    const isRecaptureElement = wmjQuery(elementToFind).closest(recaptureElement);
                                    if (isRecaptureElement.length > 0) {
                                        this.recaptureDynamicForm = true;
                                        if (this.uiiSettings?.debugUII) {
                                            formAnalysisLogger(new Error(), 'UII sufa recapture element found', {
                                                domClientId: this.dom?.domClientId,
                                                platformId: this.platformId,
                                            }, true);
                                        }
                                    }
                                }
                            }
                        } catch (error) {
                            formAnalysisLogger(error, 'Error in record event sufa dynamic forms');
                        }
                    }
                }
                if (this.recaptureDynamicForm || (this.eventDeepUiIdNotFound && (time - this.lastDomCaptureTime > 4000) && this.capturedDomCount < 3)) {
                    this.recaptureDynamicForm = false;
                    this.processDomCapturing();
                }
            } else if (this.platformId.indexOf(platformIds.Concur) !== -1
                    || this.platformId.indexOf(platformIds.s4h) !== -1
                    || this.platformId.indexOf(platformIds.s4hQa) !== -1
            ) {
                if (this.newElementsLoaded && this.capturedDomCount < 3) {
                    this.newElementsLoaded = false;
                    this.processDomCapturing();
                }
            }

            const start = performance.now();
            const normalizedEvent = this.getNormalizedEvent(event, time);
            if (this.platformId.indexOf(platformIds.MicrosoftDynamics) !== -1) {
                if (normalizedEvent.data) {
                    for (let i = 0; i < this.forms.length; i++) {
                        this.forms[i].events.push(normalizedEvent);
                    }
                } else {
                    this.events.push(normalizedEvent);
                }
            } else {
                this.events.push(normalizedEvent);
            }
            const executionTime = performance.now() - start;
            this.totalRecordEventTime += executionTime;
            this.recordEventNumber += 1;
            if (executionTime > this.maxRecordEventTime) {
                this.maxRecordEventTime = executionTime;
            }
            if (this.accumulator) {
                this.accumulator.recordEventAccumulatedTime += executionTime;
            }
        } catch (error) {
            formAnalysisLogger(error, 'Error in recordEvent');
        }
    }

    startObserving() {
        this.listening = true;
        this.recordEvent = this.recordEvent.bind(this);
        if (this.lazyLoadingElements && this.lazyLoadingElements.length > 0) {
            if (this.platformId.indexOf(platformIds.MicrosoftDynamics) !== -1
             || this.platformId.indexOf(platformIds.s4h) !== -1
             || this.platformId.indexOf(platformIds.s4hQa) !== -1
            ) {
                this.lazyLoadingObserver = new nativeIframe.contentWindow.MutationObserver(utils_debounce(this.checkLazyLoading.bind(this), 3000));
                for (let j = 0; j < this.lazyLoadingElements.length; j++) {
                    const element = this.lazyLoadingElements[j];
                    this.lazyLoadingObserver.observe(element, { childList: true, subtree: true });
                }
            }
            toggleListeners({ element: window, events: ['mousedown', 'keydown', 'focusin'], handler: this.recordEvent, add: true });
        } else if (this.formIframe) {
            toggleListeners({ element: this.formIframe, events: ['mousedown', 'keydown', 'focusin'], handler: this.recordEvent, add: true });
        } else {
            toggleListeners({ element: window, events: ['mousedown', 'keydown', 'focusin'], handler: this.recordEvent, add: true, platformId: this.platformId });
        }
        toggleListeners({ element: window, events: ['focus', 'blur'], handler: this.recordEvent, add: true });
        if (this.uiiSettings?.alertErrorCollection) {
            const originalAlert = window.alert;
            window.alert = (message) => {
                try {
                    this.events.push({
                        type: 'formErrorAlert',
                        time: Date.now(),
                        message,
                    });
                } catch (error) {
                    formAnalysisLogger(error, 'Error in save event window alert');
                } finally {
                    originalAlert(message);
                }
            };
        }
    }

    async sendDom() {
        toggleListeners({ element: window, events: ['beforeunload'], handler: this.beforeunloadHandler, remove: true });
        try {
            if (this.events.length && this.events.some((event) => event.deepUiId)) {
                const {
                    url,
                    list,
                    domClientId,
                    split,
                    encrypted,
                    dictionary,
                    blockedPhrases,
                    lexicon,
                    page,
                    meta
                } = this.dom;
                const events = this.events.map(({ elementToFind, elementParents, ...item }) => item);
                const formAnalysis = {
                    formContext: this.formElementNode?.deepUi_id,
                    formFilter: this.filter.formFilter,
                    indicatorFilter: this.filter.indicatorFilter,
                    screen: this.screen,
                    domClientId: this.dom.domClientId,
                    events,
                    contextData: this.contextData,
                    sessionMeta: {
                        endUserVersion: '0.1.3',
                        sessionDate: this.sessionDate.getTime(),
                        timezone: -this.sessionDate.getTimezoneOffset() / 60,
                        platformId: this.platformId[0],
                        environment: this.environment,
                        uuid: this.uuid
                    }
                };

                if (this.uiiSettings?.dataFlow && !this.sessionEndLogged) {
                    this.sessionEndLogged = true;
                    formAnalysisLogger(new Error(), 'End session', { filterType: this.filter.type, domClientId }, true);
                }

                if (userService.getFormAnalysisSendEndUserId()) {
                    formAnalysis.endUserId = walkmeService.getEndUserGUID();
                }

                if (this.filter.formContextFilter) {
                    formAnalysis.formContextFilter = this.filter.formContextFilter;
                }

                if (this.playbackSession) {
                    formAnalysis.sessionMeta.playbackSession = {
                        ...this.playbackSession
                    };
                }

                if (this.uiiSettings?.avgPerformanceLogs && this.recordEventNumber) {
                    formAnalysisLogger(new Error(), 'record event execution times', { maxRecordEventTime: this.maxRecordEventTime,
                        averageRecordEventTime: this.totalRecordEventTime / this.recordEventNumber }, true);
                }

                const sessionData = {
                    list,
                    domClientId,
                    split,
                    encrypted,
                    dictionary,
                    blockedPhrases,
                    lexicon,
                    pageData: page,
                    meta,
                    formAnalysis,
                    browser: walkmeService.getBrowser(),
                    formAnalysisThreshold: this.threshold
                };
                if (!this.uiiSettings?.urlCollectionDisabled) {
                    if (this.uiiSettings?.urlFullPathCollection) {
                        sessionData.url = url;
                    } else {
                        sessionData.url = stringBeforeQuestionMark(url);
                    }
                }
                if (this.cacheSession && oldCapture) {
                    if (!this.sessionSent) {
                        storageService.setItem(CACHED_SESSION_DATA, JSON.stringify(sessionData), FA_SESSION_DATA_EXPIRATION_TIME);
                    }
                } else {
                    this.sessionSent = true;
                    storageService.removeItem(CACHED_SESSION_DATA);
                    await domService.save(sessionData, URLS.CREATE_DOM_INCEPTION);
                }
                if (this.uiiSettings?.debugUII) {
                    const sendSession = this.sessionSent;
                    const cacheSession = this.cacheSession && !sendSession;
                    formAnalysisLogger(new Error(), 'End Save Dom', { domClientId, platformId: this.platformId, sendSession, cacheSession  }, true);
                }
            } else if (this.uiiSettings?.debugUII) {
                formAnalysisLogger(new Error(), 'No events with deepuiId to send', {
                    eventsCount:this.events.length,
                    platformId: this.platformId,
                    domClientId: this.dom?.domClientId,
                }, true);
            }
        } catch (error) {
            const sendSession = this.sessionSent;
            const cacheSession = this.cacheSession && !sendSession;
            formAnalysisLogger(error, 'Error in sendDom', { sendSession, cacheSession });
        }
    }

    stopObserving() {
        if (this.listening) {
            if (this.platformId.indexOf(platformIds.MicrosoftDynamics) !== -1) {
                if (this.lazyLoadingObserver) {
                    this.lazyLoadingObserver.disconnect();
                    this.lazyLoadingObserver = null;
                }
                toggleListeners({
                    element: window,
                    events: ['mousedown', 'keydown', 'focusin'],
                    handler: this.recordEvent,
                    remove: true
                });
            } else if (this.formIframe) {
                toggleListeners({
                    element: this.formIframe,
                    events: ['mousedown', 'keydown', 'focusin'],
                    handler: this.recordEvent,
                    remove: true
                });
            } else {
                toggleListeners({
                    element: window,
                    events: ['mousedown', 'keydown', 'focusin'],
                    handler: this.recordEvent,
                    remove: true
                });
            }
            toggleListeners({ element: window, events: ['focus', 'blur'], handler: this.recordEvent, remove: true });
            this.listening = false;
        }
    }

    formMutationTracker() {
        try {
            const currentIndicator = this.executeFilter(this.filter.indicatorFilter, this.formElement);
            if (currentIndicator !== this.initialIndicator) {
                this.formChanged = true;
                this.stopObserving();
                this.formObserver.disconnect();
                this.pushEvent("formIndicatorChanged");
                this.formElement = null;
                return;
            }
            if (this.platformId.indexOf(platformIds.MicrosoftDynamics) !== -1) {
                const currForm = this.executeFilter(this.filter.formTabsFilter, this.formElement);
                let recapture = true;
                for (let i = 0; i < this.formTabs.length; i++) {
                    if (this.formTabs[i].is(currForm)) {
                        recapture = false;
                        break;
                    }
                }
                if (recapture) {
                    this.formTabs.push(currForm);
                    this.processDomCapturing(false);
                }
            }

            const active = this.executeFilter(this.filter.activeFilter, this.formElement);
            if (this.active && !active) {
                this.stopObserving();
                this.pushEvent("Form is not active");
                this.pushEvent("formPause");
            } else if (!this.active && active) {
                for (let j = 0; j < this.forms.length; j++) {
                    if (this.forms[j].active) {
                        this.forms[j].active = false;
                        this.forms[j].stopObserving();
                        this.forms[j].pushEvent("Different form is active");
                        this.forms[j].pushEvent("formPause");
                    }
                }
                this.pushEvent("formContinue");
                this.startObserving();
            }
            this.active = active;

            if (this.filter.errorFilter && this.filter.formErrorFilter && this.active) {
                let fieldErrorContext = this.formElement;
                if (this.platformId.indexOf(platformIds.SuccessFactors) !== -1) {
                    fieldErrorContext = this.parentElement;
                }
                const currentFieldErrors = this.executeFilter(this.filter.errorFilter, fieldErrorContext);
                let formErrorContext = this.formElement;
                if (this.platformId.indexOf(platformIds.MicrosoftDynamics) !== -1) {
                    formErrorContext = this.parentElement;
                }
                const currentFormErrors = this.executeFilter(this.filter.formErrorFilter, formErrorContext);
                let currentErrors = [];
                if (currentFieldErrors && currentFieldErrors.length > 0) {
                    currentErrors = currentErrors.concat(Array.prototype.slice.call(currentFieldErrors).map((node) => {
                        return { node, text: textContentProvider(node), eventType: "errorMessage" };
                    }));
                }
                if (currentFormErrors && currentFormErrors.length > 0) {
                    currentErrors = currentErrors.concat(Array.prototype.slice.call(currentFormErrors).map((node) => {
                        return { node, text: textContentProvider(node), eventType: "formError" };
                    }));
                }

                if (currentErrors && currentErrors.length) {
                    currentErrors.forEach(({ node: currentNode, text: currentText, eventType }) => {
                        const isNew = this.foundErrors?.every(({ node, text }) => {
                            return !(node === currentNode) || (currentText !== text);
                        });

                        if (!this.foundErrors?.length || isNew) {
                            this.pushErrorEvent(currentNode, this.regexPatterns, eventType);
                        }
                    });
                }

                this.foundErrors = currentErrors;
            }
        } catch (error) {
            formAnalysisLogger(error, 'Error in formMutationTracker');
        }
    }

    checkLazyLoading(mutationList) {
        for (let j = 0; j < mutationList.length; j++) {
            if (mutationList[j]?.addedNodes?.length > 0) {
                this.newElementsLoaded = true;
                break;
            }
        }
    }

    async closeForm() {
        this.pushEvent("formClose");
        this.playbackSession = await playbackSession();
    }

    pushErrorEvent(elementWithError, regexPatterns, eventType) {
        const rect = elementWithError.getBoundingClientRect();
        const scrollableContainerHeight = getScrollableContainer(elementWithError);
        const scrollableContainerWidth = getScrollableContainer(elementWithError, { width: true });

        let message = textContentProvider(elementWithError);
        const incorrectTypeMessage = "id value of incorrect type";
        if (message.indexOf("Email: invalid email address") !== -1) {
            message = "Email: invalid email address";
        } else if (message.indexOf("data value too large") !== -1) {
            message = "data value too large";
        } else if (this.platformId.indexOf(platformIds.ServiceNow) !== -1 & message.indexOf("has set this field to") !== -1) {
            message = "<user name> has set this field to <value>";
        } else if (this.platformId.indexOf(platformIds.ServiceNow) !== -1 & message.indexOf("has cleared the value of this field") !== -1) {
            message = "<user name> has cleared the value of this field";
        } else if (message.indexOf(incorrectTypeMessage) !== -1) {
            message = message.split(incorrectTypeMessage)[0] + incorrectTypeMessage;
        } else if (regexPatterns) {
            for (let i = 0; i < regexPatterns.length; i++) {
                if (regexPatterns[i] && regexPatterns[i].pattern && regexPatterns[i].pattern.test(message)) {
                    message = message.replace(regexPatterns[i].pattern, `${regexPatterns[i].name.split('_')[0]} `);
                    break;
                }
            }
        }

        const elementParents = [];
        let temp = wmjQuery(elementWithError).parent();
        let node;
        for (let i = 0; i <= 4; i++) {
            if (temp.length === 0 || node) {
                break;
            }
            node = this.findNode(temp[0]);
            elementParents.push(temp[0]);
            temp = temp.parent();
        }

        this.events.push({
            type: eventType,
            time: Date.now(),
            message,
            deepUiId: node?.deepUi_id,
            x: Number((rect.x + (scrollableContainerWidth?.scrollLeft || 0))?.toFixed(2)),
            y: Number((rect.y + (scrollableContainerHeight?.scrollTop || 0))?.toFixed(2)),
            width: Number(rect.width?.toFixed(2)),
            height: Number(rect.height?.toFixed(2)),
            elementParents
        });
    }

    pushMetaEvent(event) {
        this.events.push(event);
    }
}

const formAnalysis = {
    init(services) { 
        domService = services.domService; 
        storageService = services.storageService; 
        userService = services.userService; 
        deepUiLanguageDetectors = services.deepUiLanguageDetectors;

        // handle case of no native restorer iframe
        if (!nativeIframe) {
            nativeIframe = { contentWindow: window };
        }
        this.uiiSettings = userService.getUii();
        if (this.uiiSettings?.dataFlow) {
            formAnalysisLogger(new Error(), 'UII is loaded', {}, true);
        }
        this.initialThreshold = userService.getFormAnalysisThreshold();
        this.filters = userService.getFormAnalysisFilters();
        this.foundErrors = [];
        this.regexPatterns = getRegexPatterns();
        this.environment = {
            hostname: window.location?.hostname,
            env: window._walkmeInternals?.ctx?.get('SettingsFile')?.getEnvName?.(),
            envId: walkmeService.getEnvId()
        };
        if (this.uiiSettings?.envs?.indexOf(this.environment.env) === -1) return;
        whiteList = userService.getWhiteList()?.filter(list => !!list.at(5));
        const executeFilterContext = {};
        if (this.uiiSettings?.accumulationPeriod) {
            this.accumulator = {
                startTime: Date.now(),
                filtersAccumulatedTime: 0,
                recordEventAccumulatedTime: 0,
            };
            executeFilterContext.accumulator = this.accumulator;
        }
        if (this.uiiSettings?.filterExecutionTimeLogThreshold) {
            executeFilterContext.filterExecutionTimeLogThreshold = this.uiiSettings.filterExecutionTimeLogThreshold;
        }
        this.executeFilter = globalExecuteFilter.bind(executeFilterContext);

        if (!this.filters || !this.filters?.length) {
            formAnalysisLogger(new Error(), 'form analysis filters not found', {});
            return;
        }

        if (isCurrentLanguageBlocked()) {
            return;
        }

        let uuid = storageService.getItem(FA_STORAGE_KEY);
        if (!uuid) {
            try {
                const userGUID = walkmeService.getUserGUID();
                const endUserGUID = walkmeService.getEndUserGUID();
                uuid = generateHash(endUserGUID, userGUID);
                if (!uuid) {
                    throw new Error(`[Form Analysis] Failed generating hash`);
                }
                storageService.setItem(FA_STORAGE_KEY, uuid, FA_UUID_EXPIRATION_TIME);
                httpService.post(URLS.FA_AEU_HB, { uuid });
            } catch (error) {
                storageService.setItem(FA_STORAGE_KEY, 'X', FA_UUID_EXPIRATION_TIME);
                formAnalysisLogger(error, 'Failed generating hash', {});
            }
        }

        if (oldCapture) {
            this.sendCachedSession();
        }
        this.formAnalysisBVersion = userService.getFormAnalysisBVersion();
        this.formAnalysisAVersion = userService.getFormAnalysisAVersion();

        if (this.formAnalysisAVersion) {
            this.formParents = new Array(this.filters.length);
            this.observers = new Array(this.filters.length);
            const context = {
                forms: [],
                threshold: this.initialThreshold,
                regexPatterns: this.regexPatterns,
                environment: this.environment,
                accumulator: this.accumulator,
                executeFilter: this.executeFilter,
                uiiSettings: this.uiiSettings,
                uuid
            };
            // Observe window and search for forms parent element
            this.mainObserver = new nativeIframe.contentWindow.MutationObserver(utils_debounce(() => this.searchFormParent(context), 3000, { maxWait: 3000 }));
            this.mainObserver.observe(window.document, {
                childList: true,
                subtree: true
            });
            this.searchFormParent(context);
        }
    },

    stop() {
        this.mainObserver.disconnect();
        this.observers.forEach((observer) => {
            observer.disconnect();
        });
    },

    searchFormParent(context) {
        try {
            if (this.accumulator) {
                const timeSinceLastLog = Date.now() - this.accumulator.startTime;
                if (timeSinceLastLog > this.uiiSettings.accumulationPeriod) {
                    formAnalysisLogger(new Error(), 'accumulated execution times', {
                        filtersAccumulatedTime: this.accumulator.filtersAccumulatedTime,
                        recordEventAccumulatedTime: this.accumulator.recordEventAccumulatedTime,
                        accumulationPeriod: timeSinceLastLog,
                    }, true);
                    this.accumulator.filtersAccumulatedTime = 0;
                    this.accumulator.recordEventAccumulatedTime = 0;
                    this.accumulator.startTime = Date.now();
                }
            }

            for (let i = 0; i < this.filters.length; i++) {
                const { formParentFilter } = this.filters[i];
                const debounceTime = this.filters[i].debounceTime || 300;
                if (formParentFilter) {
                    const parentElement = this.executeFilter(formParentFilter);
                    if (parentElement[0] && parentElement.length === 1) {
                        if (!this.formParents[i] || this.formParents[i].parentElement !== parentElement[0]) {
                            this.formParents[i] = {
                                ...this.formParents[i],
                                parentElement: parentElement[0],
                                filter: this.filters[i],
                                regexPatterns: this.regexPatterns,
                                parentNum: i
                            };
                            if (this.observers[i]) {
                                this.observers[i].disconnect();
                            }
                            if (this.formParents[i].filter.shadowSelector) {
                                this.observers[i] = observeShadow({
                                    context: this.formParents[i].filter.shadowSelector,
                                    callback: utils_debounce(this.searchFormA.bind(context, this.formParents[i]), debounceTime, { maxWait: debounceTime }),
                                    config: mutationObserverOptions,
                                });
                            } else {
                            // eslint-disable-next-line max-len
                                this.observers[i] = new nativeIframe.contentWindow.MutationObserver(utils_debounce(this.searchFormA.bind(context, this.formParents[i]), debounceTime, { maxWait: debounceTime }));
                                this.observers[i].observe(parentElement[0], mutationObserverOptions);
                            }
                            this.searchFormA.bind(context, this.formParents[i])();
                        }
                    }
                }
            }
        } catch (error) {
            formAnalysisLogger(error, 'Error in searchFormParent', {});
        }
    },

    async searchFormA(formParent) {
        try {
            const { activeFilter, formFilter, blockerFilter, indicatorFilter, formShadowHostFilter } = formParent.filter;

            if (formParent.parentElement) {
                let formElements = wmjQuery();
                if (formShadowHostFilter) {
                    const host = this.executeFilter(formShadowHostFilter, formParent.parentElement);
                    if (host && host[0]) {
                        let sleepTime = 300;
                        for (let i = 0; i < 20; i++) {
                            formElements = this.executeFilter(formFilter, host[0]);
                            if (formElements && formElements[0]) break;
                            if (i === 10) sleepTime = 1000;
                            await sleep(sleepTime);
                        }
                    }
                } else {
                    formElements = this.executeFilter(formFilter, formParent.parentElement);
                }

                if (!formElements) formElements = wmjQuery();

                if (this.forms && this.forms.length > 0) {
                    for (let i = 0; i < this.forms.length; i++) {
                        const { formElement, parentNum } = this.forms[i];
                        if (parentNum !== formParent.parentNum) continue;
                        if (formElements?.length === 0 || formElementChanged(this.forms[i].platformId[0], formElements, formElement)) {
                            if (!this.forms[i].formChanged) {
                                this.forms[i].stopObserving();
                                this.forms[i].formObserver.disconnect();
                            }
                            await this.forms[i].closeForm();
                            this.forms[i].sendDom();
                            this.forms.splice(i, 1);
                            i--;
                        }
                    }
                }

                if (formElements && formElements.length >= 1) {
                    for (let i = 0; i < formElements.length; i++) {
                        if (this.forms.filter((form) => form.formElement).length >= 3) continue;
                        if (this.forms.some((form) => formElements[i] === form.formElement)) continue;
                        if (this.executeFilter(blockerFilter, formElements[i])) continue;
                        const active = this.executeFilter(activeFilter, formElements[i]);
                        const initialIndicator = this.executeFilter(indicatorFilter, formElements[i]);
                        if (!initialIndicator) continue;
                        if (isCurrentLanguageBlocked()) continue;

                        const form = new Form(formElements[i], active, initialIndicator, formParent, this);

                        if (active) {
                            for (let j = 0; j < this.forms.length; j++) {
                                if (this.forms[j].active) {
                                    this.forms[j].active = false;
                                    this.forms[j].stopObserving();
                                    this.forms[j].pushEvent("Different form is active");
                                    this.forms[j].pushEvent("formPause");
                                }
                            }
                            form.startObserving();
                        }
                        playbackSession();
                        this.forms.push(form);
                    }
                }
            }
        } catch (error) {
            formAnalysisLogger(error, 'Error in searchFormA', formParent);
        }
    },

    async sendCachedSession() {
        const cachedSession = storageService.getItem(CACHED_SESSION_DATA);
        if (cachedSession) {
            try {
                const createListData = JSON.parse(cachedSession);
                createListData.formAnalysis.sessionMeta[TIME_SENT] = Date.now();
                await domService.save(createListData, URLS.CREATE_DOM_INCEPTION);
            } catch (error) {
                formAnalysisLogger(error, 'Error in sendCachedSession', {});
            } finally {
                storageService.removeItem(CACHED_SESSION_DATA);
            }
        }
    }
};

config.init(); 

window.formAnalysis = formAnalysis;

window.uiiCb && window.uiiCb();

/* harmony default export */ const src_formAnalysis = ((/* unused pure expression or super */ null && (formAnalysis)));
/******/ })()
;
//# sourceMappingURL=main.js.map
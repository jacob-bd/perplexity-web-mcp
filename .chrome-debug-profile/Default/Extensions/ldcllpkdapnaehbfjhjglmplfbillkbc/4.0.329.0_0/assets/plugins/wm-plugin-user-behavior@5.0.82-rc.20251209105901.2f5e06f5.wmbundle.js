/* WalkMe Module */ typeof _walkmeInternals !== 'undefined' && _walkmeInternals.wmloader && _walkmeInternals.wmloader.define('wm-plugin-user-behavior@5.0.82-rc.20251209105901.2f5e06f5@prelib', {"name":"wm-plugin-user-behavior","version":"5.0.82-rc.20251209105901.2f5e06f5","toolbelt":"2.0.2","packageDate":"2025-12-17T10:23:24.177Z","entry":"prelib"}, function (__wmplugin__) {  
var wmbundle;
/******/ (function() { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 326:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

module.exports = __webpack_require__(977);



/***/ }),

/***/ 14:
/***/ (function(__unused_webpack_module, exports) {

var __webpack_unused_export__;
/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

__webpack_unused_export__ = true;
var XpathEscaper;
(function (XpathEscaper) {
    var xpathReservedCharacters = /([&=\.\]\[\/\#])/g;
    var xpathEscapedCharacters = /\\([&=\.\]\[\/\#\\/])/g;
    function escape(value) {
        return value.replace(xpathReservedCharacters, "\\$1");
    }
    XpathEscaper.escape = escape;
    function unescape(value) {
        return value.replace(xpathEscapedCharacters, "$1");
    }
    XpathEscaper.unescape = unescape;
})(XpathEscaper = exports.J || (exports.J = {}));



/***/ }),

/***/ 486:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

var __extends = function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var AbraDi = /** @class */ (function () {
    function AbraDi() {
    }
    AbraDi.registerClass = function (name, ctor, dependencies) {
        AbraDi.classRegistrations.push({
            name: name,
            ctor: ctor,
            dependencies: dependencies
        });
    };
    AbraDi.getCtx = function () {
        if (AbraDi.ctx) {
            return AbraDi.ctx;
        }
        throw new Error('ctx is not set');
    };
    AbraDi.load = function (ctx) {
        AbraDi.ctx = ctx;
        AbraDi.loadMockDependencies(ctx);
        AbraDi.loadModules(ctx);
        for (var _i = 0, _a = AbraDi.classRegistrations; _i < _a.length; _i++) {
            var registration = _a[_i];
            var entry = ctx.register(registration.name).asCtor(registration.ctor);
            if (registration.dependencies) {
                entry.dependencies(registration.dependencies);
            }
        }
        AbraDi.classRegistrations = [];
    };
    AbraDi.loadMockDependencies = function (ctx) {
        ctx.register('Abra:Walkme').asInstance(window['_walkMe']); //remove once `_walkme` is registered to the ctx
    };
    AbraDi.loadModules = function (ctx) {
        ctx.register('Abra:EventObfuscator').asCtor((__webpack_require__(142).Encoder)).dependencies('Abra:JSON');
        ctx.register('Abra:QueryGenerator')
            .asFunction(function (jQuery) {
            var jqueryProxy = __webpack_require__(359)({});
            var generator = __webpack_require__(619)(jQuery, jqueryProxy);
            return {
                generate: function (element) { return generator.generate(jQuery(element)); }
            };
        })
            .dependencies('wmjQuery');
        ctx.register('Abra:XpathEscaper').asInstance((__webpack_require__(14)/* .XpathEscaper */ .J));
    };
    AbraDi.classRegistrations = [];
    return AbraDi;
}());
var CaptureElementApiLoader = /** @class */ (function () {
    function CaptureElementApiLoader(jQuery, xPathGenerator, elementDescriptionGenerator, meaningfulElementGetter, commonEventAttributesProvider, privacyUtils) {
        this.jQuery = jQuery;
        this.xPathGenerator = xPathGenerator;
        this.elementDescriptionGenerator = elementDescriptionGenerator;
        this.meaningfulElementGetter = meaningfulElementGetter;
        this.commonEventAttributesProvider = commonEventAttributesProvider;
        this.privacyUtils = privacyUtils;
    }
    CaptureElementApiLoader.prototype.getLocation = function (element) {
        var attributes = this.commonEventAttributesProvider.get();
        return attributes && attributes.ctx && attributes.ctx.location;
    };
    CaptureElementApiLoader.prototype.getElementAttributes = function (element) {
        var removeTextValues = this.privacyUtils.shouldCensorText(null, element);
        return this.xPathGenerator.getAttributes(this.jQuery(element), removeTextValues);
    };
    CaptureElementApiLoader.prototype.getElementId = function (element) {
        return this.xPathGenerator.getId(this.jQuery(element));
    };
    CaptureElementApiLoader.prototype.getElementClasses = function (element) {
        return this.xPathGenerator.getClasses(this.jQuery(element));
    };
    CaptureElementApiLoader.prototype.getElementText = function (element) {
        if (!this.privacyUtils.shouldCensorText(null, element)) {
            var meaningfulElement = this.meaningfulElementGetter.get(element);
            return this.elementDescriptionGenerator.getText(meaningfulElement ? meaningfulElement.element : element).text;
        }
    };
    CaptureElementApiLoader.prototype.load = function () {
        AbraMain.AbraObject = this.jQuery.extend(AbraMain.AbraObject, {
            getLocation: this.getLocation.bind(this),
            getElementAttributes: this.getElementAttributes.bind(this),
            getElementId: this.getElementId.bind(this),
            getElementClasses: this.getElementClasses.bind(this),
            getElementText: this.getElementText.bind(this)
        });
    };
    return CaptureElementApiLoader;
}());
AbraDi.registerClass('Abra:CaptureElementApiLoader', CaptureElementApiLoader, 'wmjQuery, Abra:XPathGenerator, Abra:ElementDescriptionGenerator, Abra:MeaningfulElementGetter, CommonEventAttributesProvider, Abra:PrivacyUtils');
var CollectionIndicator = /** @class */ (function () {
    function CollectionIndicator(logger, eventsTrigger, timingUtils, dataCollectionSettings) {
        var _this = this;
        this.logger = logger;
        this.eventsTrigger = eventsTrigger;
        this.timingUtils = timingUtils;
        this.lastNotification = null;
        this.cachedResult = null; // kept for 1 event loop
        this.collectByDefault = !this.isManualMode(dataCollectionSettings);
        AbraMain.AbraObject.isCollecting = function () { return _this.shouldCollect(); };
        this.cleanCachedResultOnNextEventLoop = this.timingUtils.createOnNextEventLoopFunc(function () {
            if (_this) {
                _this.cachedResult = null;
            }
        });
    }
    CollectionIndicator.prototype.shouldCollect = function () {
        if (this.cachedResult !== null) {
            return this.cachedResult;
        }
        try {
            this.cachedResult = this.querySite();
            this.cachedResult !== null && this.cleanCachedResultOnNextEventLoop();
        }
        catch (error) {
            this.cachedResult = null;
            this.logger.error('Error on ShouldCollectUserData', error);
        }
        var result = this.cachedResult !== null ? this.cachedResult : this.collectByDefault;
        this.notifyChange(result);
        return result;
    };
    CollectionIndicator.prototype.querySite = function () {
        var siteVariable = window.isWalkmeUserBehaviorDataCollectionEnabled;
        // Underscore.js isFunction implementation
        if (siteVariable && siteVariable.constructor && siteVariable.call && siteVariable.apply) {
            var result = siteVariable();
            if (result === true || result === false) {
                return result;
            }
            else {
                throw new Error('return value expected to be boolean');
            }
        }
        return null;
    };
    CollectionIndicator.prototype.isManualMode = function (dataCollectionSettings) {
        var settings = dataCollectionSettings.get();
        return !!(settings && settings.loading && settings.loading.mode === 'manual');
    };
    CollectionIndicator.prototype.notifyChange = function (shouldCollect) {
        if (this.lastNotification !== shouldCollect) {
            this.lastNotification = shouldCollect;
            this.eventsTrigger.async('UBT:CollectionStatusChanged', { isCollecting: shouldCollect });
        }
    };
    return CollectionIndicator;
}());
AbraDi.registerClass('Abra:CollectionIndicator', CollectionIndicator, 'Abra:Logger, EventsTrigger, Abra:TimingUtils, Abra:DataCollectionSettingsWrapper');
/**
 * Main entry point for Abra
 */
var AbraMain;
(function (AbraMain) {
    AbraMain.App = {
        name: 'abra', //do not change, EC filters by this field
        version: '5.0.82-rc.20251209105901.2f5e06f5',
        rev: '2f5e06f'
    };
    AbraMain.WalkmeInternals = window['_walkmeInternals'];
    AbraMain.AbraObject = { version: AbraMain.App.version, rev: AbraMain.App.rev };
    function setState(state) {
        AbraMain.WalkmeInternals.abraState = state;
    }
    AbraMain.setState = setState;
    function setErrorInfo(info) {
        setState('errored');
        AbraMain.AbraObject['errorInfo'] = info;
    }
    AbraMain.setErrorInfo = setErrorInfo;
    function start(ctx) {
        try {
            var eventsListener = ctx.get('EventsListener');
            var loadInsightsConfigOnce_1 = function () {
                if (!ctx.has('Abra:InsightsConfigurationGetter') && ctx.has('WmAjax') && ctx.has('SettingsFile') && ctx.has('PromiseManager') && ctx.has('TimerManager') && ctx.has('CommonUtils')) {
                    ctx.register('Abra:InsightsConfigurationGetter').asCtor(InsightsConfigurationGetter).dependencies('WmAjax, SettingsFile, PromiseManager, TimerManager, CommonUtils');
                    ctx.get('Abra:InsightsConfigurationGetter').get(); // fires ajax call
                }
            };
            eventsListener.once('DICreated', loadInsightsConfigOnce_1);
            var startCallback = FunctionUtils.allowOnce(function () {
                loadInsightsConfigOnce_1();
                startUbt(ctx);
            });
            eventsListener.once('wm.pagescript.envIdInjected', startCallback); // api only, used to capture elements via FE
            eventsListener.once('BeforeWalkmeReady', startCallback);
            ReferrerCollectionEnablement.enable(ctx);
            createPageLoadSync(ctx);
        }
        catch (error) {
            setErrorInfo({ error: error });
        }
        // return null on purpose, we don't want the Lego framework to wait for this loading process.
        return null;
    }
    AbraMain.start = start;
    function createPageLoadSync(ctx) {
        var pageLoad = {
            initializationData: undefined
        };
        ctx.get('EventsListener').once('PageVisitIdUpdated', function (event, pageInfo) {
            pageLoad.initializationData = pageInfo;
        });
        ctx.register('Abra:PageLoadSync').asInstance(pageLoad);
    }
    function startUbt(ctx) {
        ctx.register('Abra:UbtPerformance').asCtor(UbtPerformance).dependencies('PerformanceBILogger');
        AbraMain.AbraObject.dbg = new UbtDebugger(ctx).getApi();
        var logger = Logger.registerLogger(ctx);
        var loadStep = 'verify requirements';
        try {
            if ((AbraMain.WalkmeInternals.abra || AbraMain.WalkmeInternals.ubt) && AbraMain.WalkmeInternals.abraState !== 'removed') {
                return logger.error('Abra was already loaded');
            }
            AbraMain.WalkmeInternals.abra = AbraMain.AbraObject;
            AbraMain.WalkmeInternals.ubt = AbraMain.AbraObject;
            var hostData = ctx.get('HostData');
            //don't load abra if IE version is less than 9
            if (hostData.isIE() && !hostData.isIE(9, 'gte')) {
                return setErrorInfo({ error: new Error('Browser is not supported') });
            }
            if (!ctx.get('AuditingEnabledIndicator').isEnabledForInsights()) {
                return setErrorInfo({ error: new Error('Disabled due to noAudit feature enabled') });
            }
            var loadPerf_1 = logger.perf('load');
            setState('preload');
            loadStep = 'load abra to ctx';
            AbraDi.load(ctx);
            ctx.get('EventsTrigger').sync('Abra:CtxLoaded'); //allow to decorate using ctx
            loadStep = 'load abra';
            var silent_1 = !!ctx.get('IsInEditor').get();
            var configurationGetter_1 = ctx.get('Abra:InsightsConfigurationGetter');
            configurationGetter_1
                .get()
                ['catch'](function (error) {
                logger.error('error loading ubt, using fallback', error);
                /**
                 * We have noticed errors when loading the configuration file (VIS-10107).
                 * Some of the errors are due to CSP, preventing JSON files from being loaded from our domain (they only allow js files).
                 * todo: This should be removed after we solve the JSON loading issue, curently only whitelist & sampling feature uses the configuration.
                 */
                configurationGetter_1.overrideConfiguration();
            })
                .then(function () {
                return ctx
                    .get('Abra:Loader')
                    .load(silent_1)
                    .then(function (succeeded) {
                    if (succeeded) {
                        loadPerf_1.stop();
                    }
                });
            })
                ['catch'](function (error) {
                logger.error('error loading ubt', error);
                setErrorInfo({ error: error });
            });
        }
        catch (error) {
            logger.error("could not ".concat(loadStep), error);
            setErrorInfo({ error: error });
        }
    }
})(AbraMain || (AbraMain = {}));
module.exports = AbraMain;
var InsightsConfigurationGetter = /** @class */ (function () {
    function InsightsConfigurationGetter(wmAjax, settingsFile, promiseManager, timerManager, commonUtils) {
        this.wmAjax = wmAjax;
        this.settingsFile = settingsFile;
        this.promiseManager = promiseManager;
        this.timerManager = timerManager;
        this.commonUtils = commonUtils;
        this.promiseResolved = false;
    }
    InsightsConfigurationGetter.prototype.get = function () {
        this.promise = this.promise || this.fetch();
        return this.promise;
    };
    InsightsConfigurationGetter.prototype.getSync = function () {
        if (!this.promiseResolved) {
            throw new Error('InsightsConfigurationGetter.getSync should be called within "get" function scope');
        }
        return this.configuration;
    };
    InsightsConfigurationGetter.prototype.overrideConfiguration = function (configuration) {
        this.promise = this.promiseManager.resolve(configuration);
        this.configuration = configuration;
        this.promiseResolved = true;
    };
    InsightsConfigurationGetter.prototype.getFileExtension = function (url) {
        return url.substring(url.lastIndexOf('.') + 1);
    };
    InsightsConfigurationGetter.prototype.fetch = function () {
        var _this = this;
        var promise = new this.promiseManager.Promise(function (resolve, reject) {
            var url = localStorage['ubt-te-whitelist-url'] || _this.settingsFile.getSettingsFile().InsightsConfigurationFile;
            if (url) {
                var extension = _this.getFileExtension(url);
                if (extension === 'js') {
                    _this.commonUtils.addScriptWithCallback(url, 'InsightsConfigurationCallback', resolve, reject, true);
                }
                else {
                    _this.ajax(url, resolve, reject, 1);
                }
            }
            else {
                resolve();
            }
        });
        promise.then(function (configuration) {
            _this.promiseResolved = true;
            _this.configuration = configuration;
        });
        return promise;
    };
    InsightsConfigurationGetter.prototype.ajax = function (url, resolve, reject, retryCount) {
        var _this = this;
        if (retryCount === void 0) { retryCount = 0; }
        this.wmAjax.execute({
            url: url,
            dataType: 'json',
            success: function (data) {
                resolve(data);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                if (retryCount > 0) {
                    _this.timerManager.libSetTimeout(function () {
                        _this.ajax(url, resolve, reject, retryCount - 1);
                    }, 500);
                }
                else {
                    var logError = { message: 'error getting configuration', extraData: { file: url, errorThrown: errorThrown, textStatus: textStatus, status: jqXHR.status } };
                    reject(logError);
                }
            }
        });
    };
    return InsightsConfigurationGetter;
}());
/// <reference path="abra-di.ts"/>
var Loader = /** @class */ (function () {
    function Loader(logger, storageSynchronizer, eventsSenderWrapper, eventsTrigger, jQuery, userEventCreator, idleEventCreator, windowIdGetter, errorUtils, frameBinder, pageInfoCreator, timingUtils, eventsListener, userEventListener, keypressEventCreator, captureElementApiLoader, insightsConfigurationGetter, featuresManager) {
        this.logger = logger;
        this.storageSynchronizer = storageSynchronizer;
        this.eventsSenderWrapper = eventsSenderWrapper;
        this.eventsTrigger = eventsTrigger;
        this.jQuery = jQuery;
        this.userEventCreator = userEventCreator;
        this.idleEventCreator = idleEventCreator;
        this.windowIdGetter = windowIdGetter;
        this.errorUtils = errorUtils;
        this.frameBinder = frameBinder;
        this.pageInfoCreator = pageInfoCreator;
        this.timingUtils = timingUtils;
        this.eventsListener = eventsListener;
        this.userEventListener = userEventListener;
        this.keypressEventCreator = keypressEventCreator;
        this.captureElementApiLoader = captureElementApiLoader;
        this.insightsConfigurationGetter = insightsConfigurationGetter;
        this.featuresManager = featuresManager;
        this.isUnloaded = false;
    }
    Loader.prototype.load = function (silent) {
        var _this = this;
        if (silent === void 0) { silent = false; }
        var key;
        AbraMain.setState('loading');
        return this.storageSynchronizer
            .getStorageKey()
            ['catch'](this.errorUtils.wrapCatch('get storage key'))
            .then(function () { return _this.windowIdGetter.load(); })
            ['catch'](this.errorUtils.wrapCatch('get winId'))
            .then(function () {
            if (!silent) {
                if (_this.featuresManager.isFeatureEnabled('UbtUsePointerEvent')) {
                    MousedownWrapper.enablePointerEvent();
                }
                _this.errorUtils.wrapCall(function () { return _this.eventsSenderWrapper.init(key); }, 'load sender');
                _this.errorUtils.wrapCall(function () { return _this.frameBinder.load(); }, 'bind frames');
                _this.errorUtils.wrapCall(function () { return _this.userEventCreator.load(); }, 'load event creator');
                if (_this.featuresManager.isFeatureEnabled('UbtEnableKeypressEvent')) {
                    _this.errorUtils.wrapCall(function () { return _this.keypressEventCreator.load(); }, 'load keypress event creator');
                }
                _this.errorUtils.wrapCall(function () { return _this.idleEventCreator.load(); }, 'load idle event creator');
                _this.errorUtils.wrapCall(function () { return _this.pageInfoCreator.load(); }, 'load page info creator');
            }
            _this.errorUtils.wrapCall(function () { return _this.captureElementApiLoader.load(); }, 'load capture element api');
            AbraMain.WalkmeInternals.removeAbra = function (message) {
                _this.unload({ message: message || 'no error provided' }, { failPoint: 'API call' });
            };
            _this.eventsListener.once('removeWalkMe', function () {
                //if WalkMe was removed due to an error, it does the logging by itself (with message "WalkMe was removed")
                _this.unload({ message: 'removeWalkMe' }, undefined, true);
            });
            /**
             * The Player's heartbeat is disabled when UBT is present, except when whitelist feature is on
             */
            var insightsConfiguration = _this.insightsConfigurationGetter.getSync();
            if (!insightsConfiguration || !insightsConfiguration.trackedEventsWhitelist) {
                _this.disableHeartbeat();
            }
            AbraMain.setState(silent ? 'silent' : 'loaded');
            _this.eventsTrigger.sync('Abra:Ready');
            return true;
        })
            ['catch'](function (error) {
            _this.unload(error);
            return false;
        });
    };
    /**
     * The player compensate for the lake of abra events by sending "heartbeat" events (aka keep-alive),
     * in order to keep the session open (server-side).
     * When abra is present we need to turn it off.
     */
    Loader.prototype.disableHeartbeat = function () {
        if (AbraDi.getCtx().has('HeartbeatEventSender')) {
            AbraDi.getCtx().get('HeartbeatEventSender').disable();
        }
    };
    Loader.prototype.unload = function (error, extraData, skipLog) {
        if (skipLog === void 0) { skipLog = false; }
        if (this.isUnloaded === true) {
            return;
        }
        AbraMain.setState('removing');
        AbraMain.WalkmeInternals.removeAbra = undefined;
        this.isUnloaded = true;
        extraData = extraData ? this.jQuery.extend(error.extraData || {}, extraData) : error.extraData || {};
        AbraMain.setErrorInfo({
            error: error,
            extraData: extraData
        });
        try {
            //todo: unbind all
            this.userEventListener.disable();
            this.eventsSenderWrapper.disable();
            this.timingUtils.disable();
            this.frameBinder.unload();
            this.windowIdGetter.unload();
            this.userEventCreator.unload();
            this.idleEventCreator.unload();
            this.pageInfoCreator.unload();
            this.keypressEventCreator.unload();
            AbraMain.setState('removed');
        }
        catch (err) {
            this.logger.warn('error unloading abra', err);
        }
        extraData.failPoint = extraData.failPoint || 'unknown reason';
        if (!skipLog) {
            this.logger.error("abra unload: ".concat(extraData.failPoint), error, extraData);
        }
    };
    return Loader;
}());
AbraDi.registerClass('Abra:Loader', Loader, 'Abra:Logger, Abra:StorageSynchronizer, Abra:EventsSenderWrapper, EventsTrigger, wmjQuery, Abra:UserEventCreator, Abra:IdleEventCreator, Abra:WindowIdGetter, Abra:ErrorUtils, Abra:FrameBinder, Abra:PageInfoCreator, Abra:TimingUtils, EventsListener, Abra:UserEventListener, Abra:KeypressEventCreator, Abra:CaptureElementApiLoader, Abra:InsightsConfigurationGetter, FeaturesManager');
var UbtDebuggerOptions = /** @class */ (function () {
    function UbtDebuggerOptions(ctx) {
        this.ctx = ctx;
    }
    UbtDebuggerOptions.prototype.get = function () {
        return {
            disableEventListeners: this.disableEventListeners.bind(this),
            disableEventSender: this.disableEventSender.bind(this),
            disableXpathBuilder: this.disableXpathBuilder.bind(this),
            disableAutoQuery: this.disableAutoQuery.bind(this),
            disableMeaningfulElement: this.disableMeaningfulElement.bind(this),
            disableLabel: this.disableLabel.bind(this),
            disableText: this.disableText.bind(this),
            disableIdleActive: this.disableIdleActive.bind(this),
            enablePerformanceLogs: this.enablePerformanceLogs.bind(this)
        };
    };
    UbtDebuggerOptions.prototype.decorateOnLoad = function (className, decoratingFunc) {
        var _this = this;
        this.ctx.get('EventsListener').once('Abra:CtxLoaded', function () {
            _this.ctx.decorate(className, decoratingFunc);
        });
    };
    UbtDebuggerOptions.prototype.disableEventListeners = function () {
        this.decorateOnLoad('Abra:UserEventListener', function (userEventListener) {
            userEventListener.register = function () { return -1; };
            return userEventListener;
        });
    };
    UbtDebuggerOptions.prototype.disableEventSender = function () {
        this.decorateOnLoad('Abra:EventsSenderWrapper', function (eventsSenderWrapper) {
            eventsSenderWrapper.init = function () { return undefined; };
            eventsSenderWrapper.send = function () { return undefined; };
            return eventsSenderWrapper;
        });
    };
    UbtDebuggerOptions.prototype.disableXpathBuilder = function () {
        this.decorateOnLoad('Abra:XPathGenerator', function (xPathGenerator) {
            xPathGenerator.generate = function () {
                return { xpath: 'mock[0]', xpathParts: null };
            };
            return xPathGenerator;
        });
    };
    UbtDebuggerOptions.prototype.disableAutoQuery = function () {
        this.decorateOnLoad('Abra:QueryGenerator', function (queryGenerator) {
            queryGenerator.generate = function () { return 'mock'; };
            return queryGenerator;
        });
    };
    UbtDebuggerOptions.prototype.disableMeaningfulElement = function () {
        this.decorateOnLoad('Abra:MeaningfulElementGetter', function (meaningfulElementGetter) {
            meaningfulElementGetter.get = function () { return undefined; };
            return meaningfulElementGetter;
        });
    };
    UbtDebuggerOptions.prototype.disableLabel = function () {
        this.decorateOnLoad('Abra:LabelGetter', function (labelGetter) {
            labelGetter.get = function () { return 'mock'; };
            return labelGetter;
        });
    };
    UbtDebuggerOptions.prototype.disableText = function () {
        this.decorateOnLoad('Abra:ElementDescriptionGenerator', function (elementDescriptionGenerator) {
            elementDescriptionGenerator.getText = function () {
                return { text: 'mock' };
            };
            return elementDescriptionGenerator;
        });
    };
    UbtDebuggerOptions.prototype.disableIdleActive = function () {
        this.decorateOnLoad('Abra:IdleEventCreator', function (idleEventCreator) {
            idleEventCreator.load = function () { return undefined; };
            return idleEventCreator;
        });
    };
    UbtDebuggerOptions.prototype.enablePerformanceLogs = function () {
        var _this = this;
        this.ctx.decorate('Abra:UbtPerformance', function (ubtPerformance) {
            var logger;
            ubtPerformance.perf = function (key) {
                logger = logger || _this.ctx.get('Abra:Logger');
                return UbtDebuggerOptions.createPerf(key, logger);
            };
            return ubtPerformance;
        });
    };
    UbtDebuggerOptions.createPerf = function (key, logger) {
        var perf = window.performance;
        var t0 = perf.now();
        var lastStepTime = t0;
        return {
            stop: function () { return logger.info("performance: ".concat(key, " took ").concat((perf.now() - t0).toFixed(2), " ms")); },
            step: function (name) {
                var t1 = perf.now();
                logger.info("performance: ".concat(key, "-").concat(name, " time from start ").concat((t1 - t0).toFixed(2), " ms (time from last step ").concat((t1 - lastStepTime).toFixed(2), " ms)"));
                lastStepTime = t1;
            }
        };
    };
    return UbtDebuggerOptions;
}());
/**
 * Please notice:
 *      apply via this command: localStorage['wm-ubt-dbg'] = true;
 *      a refresh is needed to apply changes
 *      to view performance measurements enable logger
 */
var UbtDebugger = /** @class */ (function () {
    function UbtDebugger(ctx) {
        this.enableIndicatorFlag = 'wm-ubt-dbg';
        this.storage = window.localStorage;
        if (this.storage && this.checkFlag(this.enableIndicatorFlag)) {
            this.options = new UbtDebuggerOptions(ctx).get();
            this.activateFlags();
            this.api = this.createApi();
        }
    }
    UbtDebugger.prototype.getApi = function () {
        return this.api;
    };
    UbtDebugger.prototype.activateFlags = function () {
        for (var option in this.options) {
            if (this.options.hasOwnProperty(option) && this.checkFlag(this.getFlagName(option))) {
                this.options[option]();
            }
        }
    };
    UbtDebugger.prototype.getFlagName = function (option) {
        return "".concat(this.enableIndicatorFlag, "-").concat(option);
    };
    UbtDebugger.prototype.checkFlag = function (flagName) {
        return this.storage[flagName] === 'true';
    };
    UbtDebugger.prototype.toggleFlag = function (flagName) {
        this.storage[flagName] = !this.checkFlag(flagName);
        return this.checkFlag(flagName);
    };
    UbtDebugger.prototype.clearFlag = function (flagName) {
        this.storage.removeItem(flagName);
    };
    UbtDebugger.prototype.createApi = function () {
        var _this = this;
        var api = {};
        var _loop_1 = function (option) {
            if (this_1.options.hasOwnProperty(option)) {
                api[option] = function () { return _this.toggleFlag(_this.getFlagName(option)); };
            }
        };
        var this_1 = this;
        for (var option in this.options) {
            _loop_1(option);
        }
        api['clear'] = function () {
            for (var option in _this.options) {
                if (_this.options.hasOwnProperty(option)) {
                    _this.clearFlag(_this.getFlagName(option));
                }
            }
            _this.clearFlag(_this.enableIndicatorFlag);
        };
        return api;
    };
    return UbtDebugger;
}());
var ElementParentsGetter = /** @class */ (function () {
    function ElementParentsGetter(logger, jQuery, errorUtils, featuresManager) {
        this.logger = logger;
        this.jQuery = jQuery;
        this.errorUtils = errorUtils;
        this.featuresManager = featuresManager;
        this.get = errorUtils.bindCall(this, this.get, 'error getting element parents');
        this.useJQueryParent = featuresManager.isFeatureEnabled('Abra-Use-JQuery-Parent');
    }
    ElementParentsGetter.prototype.get = function (event) {
        var path = event.path || (event.composedPath && event.composedPath()) || []; // for shadow dom
        var targetElement = (ElementUtils.isElement(path[0]) ? path[0] : event.target);
        if (!ElementUtils.isElement(targetElement)) {
            throw new Error('unexpected event target type: ' + typeof targetElement);
        }
        return this.getFromElement(targetElement);
    };
    ElementParentsGetter.prototype.getFromElement = function (element) {
        var parents = [];
        var i = ElementParentsGetter.MaxClimbCount;
        var node = element;
        var prevNode;
        do {
            if (ElementUtils.isElement(node)) {
                parents.unshift(node);
            }
            prevNode = node;
            node = this.getParent(node);
            if (--i <= 0) {
                throw new Error('ElementParentsGetter loop reached its limit');
            }
        } while (node && prevNode !== node);
        return parents;
    };
    ElementParentsGetter.prototype.getParent = function (node) {
        if (ElementUtils.isDocument(node)) {
            return this.tryGetFrameElement(node);
        }
        if (this.useJQueryParent) {
            return this.jQuery(node).parent()[0];
        }
        else {
            return this.getParentElementDefault(node);
        }
    };
    ElementParentsGetter.prototype.getParentElementDefault = function (node) {
        if (node.assignedSlot) {
            return node.assignedSlot;
        }
        if (node.parentNode) {
            return node.parentNode;
        }
        if (node.host) {
            return node.host;
        }
    };
    ElementParentsGetter.prototype.tryGetFrameElement = function (document) {
        try {
            var window_1 = document.defaultView || document['parentWindow']; //parentWindow is IE non-standard
            if (window_1 && this.shouldClimbMore(window_1)) {
                return window_1.frameElement;
            }
        }
        catch (error) {
            this.logger.error('error getting frame element', error);
        }
    };
    ElementParentsGetter.prototype.shouldClimbMore = function (win) {
        try {
            return !win['_makeTutorial'];
        }
        catch (error) {
            //Blocked by browser, cross domain is most likely
            return false;
        }
    };
    ElementParentsGetter.MaxClimbCount = 1000;
    return ElementParentsGetter;
}());
AbraDi.registerClass('Abra:ElementParentsGetter', ElementParentsGetter, 'Abra:Logger, wmjQuery, Abra:ErrorUtils, FeaturesManager');
var ElementUtils = /** @class */ (function () {
    function ElementUtils() {
    }
    ElementUtils.isElementTextNode = function (domElement) {
        return domElement.nodeType === NodeType.Text || domElement.nodeType === NodeType.CDATASection;
    };
    ElementUtils.isVisualDomElement = function (domElement) {
        var result = domElement.nodeType === NodeType.Element && !domElement.tagName.match(/^(script|style)$/i);
        return result;
    };
    ElementUtils.isElement = function (htmlNode) {
        return htmlNode && htmlNode.nodeType === NodeType.Element;
    };
    ElementUtils.isDocument = function (htmlNode) {
        return htmlNode && (htmlNode.nodeType === NodeType.Document || htmlNode.nodeType === NodeType.DocumentType);
    };
    ElementUtils.getLowerCaseTagName = function (element) {
        return (element.nodeName || element.localName).toLowerCase();
    };
    return ElementUtils;
}());
var LabelGetter = /** @class */ (function () {
    function LabelGetter(hostData, jQuery) {
        this.hostData = hostData;
        this.jQuery = jQuery;
    }
    LabelGetter.prototype.get = function (element) {
        var label = this.getLabelElement(element);
        return label && label.textContent && TextUtils.trim(label.textContent);
    };
    LabelGetter.prototype.getLabelElement = function (element) {
        var labelElement = element['labels'] && element['labels'][0];
        if (labelElement) {
            return labelElement;
        }
        return this.getLabelElementIePolyfill(element);
    };
    // based on: https://stackoverflow.com/questions/4844594/jquery-select-the-associated-label-element-of-a-input-field
    LabelGetter.prototype.getLabelElementIePolyfill = function (element) {
        if ((this.hostData.isIE() || this.hostData.isEdge()) && this.jQuery.inArray(ElementUtils.getLowerCaseTagName(element), LabelGetter.polyfillElementTypes) !== -1) {
            var jqElement = this.jQuery(element);
            var elementId = jqElement.attr('id');
            if (elementId && typeof elementId === 'string') {
                var jqLabelElement = this.jQuery('label[for="' + TextUtils.escapeJQuerySelectorAttributeValue(elementId) + '"]', element.ownerDocument);
                if (jqLabelElement.length !== 0) {
                    return jqLabelElement[0];
                }
            }
            /**
             * label can be a parent of an element
             * see ref: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/label
             */
            return jqElement.closest('label')[0];
        }
    };
    LabelGetter.polyfillElementTypes = ['input', 'textarea', 'button', 'select', 'output'];
    return LabelGetter;
}());
AbraDi.registerClass('Abra:LabelGetter', LabelGetter, 'HostData, wmjQuery');
var ElementDescriptionGenerator = /** @class */ (function () {
    function ElementDescriptionGenerator(jQuery, privacyUtils, textUtils, logger, xpathGenerator, queryGenerator, labelGetter, featuresManager, overlappedText) {
        this.jQuery = jQuery;
        this.privacyUtils = privacyUtils;
        this.textUtils = textUtils;
        this.logger = logger;
        this.xpathGenerator = xpathGenerator;
        this.queryGenerator = queryGenerator;
        this.labelGetter = labelGetter;
        this.featuresManager = featuresManager;
        this.overlappedText = overlappedText;
        this.textOptions = {
            maxLength: 200
        };
    }
    ElementDescriptionGenerator.prototype.generate = function (event, meaningfulElement) {
        var capturePerf = this.logger.perf('capture');
        var elementDescription = {};
        var result = { desc: elementDescription };
        var parents = event.getParents();
        capturePerf.step('getParents');
        var removeText = this.privacyUtils.shouldCensorText(parents);
        capturePerf.step('shouldCensorText');
        try {
            var xpathResult = this.generateXpath(event, removeText);
            elementDescription.xpath = xpathResult.xpath;
            result.xpathParts = xpathResult.xpathParts;
            capturePerf.step('generateXpath');
        }
        catch (error) {
            //If the element detached from DOM on cpature, we still want the event, without the xpath
            this.logger.error('cannot generate xpath', error);
        }
        var clickedElement = event.getElement();
        var element = meaningfulElement || clickedElement;
        try {
            elementDescription.autoQuery = this.queryGenerator.generate(element); //todo: remove this
            capturePerf.step('generateAutoQuery');
        }
        catch (error) {
            this.logger.error('cannot generate autoQuery', error);
        }
        if (!removeText) {
            elementDescription.label = this.labelGetter.get(element);
            capturePerf.step('getLabel');
            if (!this.privacyUtils.isPrivacyUnsafeElementType(element)) {
                var eventText = this.getText(element, true);
                capturePerf.step('getText');
                elementDescription.text = eventText.text;
                if (eventText.isOverlapped) {
                    result.misc = { textSource: 'overlapped' };
                }
                var val = this.jQuery(element).val();
                elementDescription.value = val ? TextUtils.trim(val.toString(), this.textOptions.maxLength) : undefined;
            }
        }
        if (AbraDi.getCtx().has('ContextualDataManager')) {
            var contextualDataManager = AbraDi.getCtx().get('ContextualDataManager');
            var _a = contextualDataManager.getContextualData(element), context = _a.context, component = _a.component;
            result.desc.context = context;
            if (component) {
                result.desc.component = component;
            }
        }
        capturePerf.stop();
        return result;
    };
    ElementDescriptionGenerator.prototype.generateXpath = function (event, removeText) {
        var parents = event.getParents();
        removeText = removeText !== undefined ? removeText : this.privacyUtils.shouldCensorText(parents);
        return this.xpathGenerator.generate(parents, removeText);
    };
    ElementDescriptionGenerator.prototype.getSelectTagText = function (element) {
        //todo: write tests for value and text collection
        //the normal "text" function will return the entire options separated be a Newline char
        var jqElement = this.jQuery(element);
        var elementValue = jqElement.val();
        //newline causes an exception to be thrown, current jquery don't handle escaping
        if (typeof elementValue === 'string' && elementValue.indexOf('\n') === -1) {
            return jqElement.find('option[value="' + TextUtils.escapeJQuerySelectorAttributeValue(elementValue) + '"]').text();
        }
    };
    ElementDescriptionGenerator.prototype.getElementText = function (element, skipPrivacyCheck) {
        if (skipPrivacyCheck === void 0) { skipPrivacyCheck = false; }
        if (!skipPrivacyCheck && (this.privacyUtils.isPrivacyUnsafeElementType(element) || this.privacyUtils.shouldCensorText(null, element))) {
            return;
        }
        if (ElementUtils.getLowerCaseTagName(element) === 'select') {
            return this.getSelectTagText(element);
        }
        return TextUtils.trim(this.textUtils.collectText(element, this.textOptions), this.textOptions.maxLength);
    };
    ElementDescriptionGenerator.prototype.getText = function (element, skipPrivacyCheck) {
        if (skipPrivacyCheck === void 0) { skipPrivacyCheck = false; }
        var result = {};
        result.text = this.getElementText(element, skipPrivacyCheck);
        if (!result.text && this.featuresManager.isFeatureEnabled('UbtAddOverlappedText')) {
            try {
                var overlappedElement = this.overlappedText.getOverlappedTextElement(element);
                if (overlappedElement) {
                    result.text = this.getElementText(overlappedElement, false);
                    result.isOverlapped = true;
                }
            }
            catch (error) {
                this.logger.error('cannot get overlapped text', error);
            }
        }
        return result;
    };
    return ElementDescriptionGenerator;
}());
AbraDi.registerClass('Abra:ElementDescriptionGenerator', ElementDescriptionGenerator, 'wmjQuery, Abra:PrivacyUtils, Abra:TextUtils, Abra:Logger, Abra:XPathGenerator, Abra:QueryGenerator, Abra:LabelGetter, FeaturesManager, Abra:OverlappedText');
/**
 * Motivation: sometimes in terms of UX user clicks on element with text, but in terms of DOM he clicks another
 * element (for example, positioned with greater z-index and transparent) without text. This feature enable to check all the elements
 * at clicked element coordinates, and if one of them has text, it will be returned.
 */
var OverlappedText = /** @class */ (function () {
    function OverlappedText() {
    }
    //TODO: consider add checking if transparent
    /**
     * Returns an array of first n ancestors (where n=OverlappedText.maxDistToParent)
     */
    OverlappedText.getElementFirstAncestors = function (element) {
        var ancestors = [];
        var parent = element.parentElement;
        var count = 0;
        while (parent && count < OverlappedText.maxDistToParent) {
            ancestors.push(parent);
            count++;
            parent = parent.parentElement;
        }
        return ancestors;
    };
    /**
     * Accepts two paths (from descendants to ancestors and not including element itself)
     * calculates distances to common ancestor element for every path and returns true if distance to common ancestor
     * in one of paths is too high.
     */
    OverlappedText.isMaxDistanceToCommonAncestorExceeded = function (path1, path2) {
        var cursor1 = path1.length - 1;
        var cursor2 = path2.length - 1;
        // common ancestor is outside given paths
        if (path1[cursor1] !== path2[cursor2]) {
            return true;
        }
        while (cursor1 >= 0 && cursor2 >= 0 && path1[cursor1] === path2[cursor2]) {
            cursor1--;
            cursor2--;
        }
        var distInChain1 = cursor1 + 2; // Example: if path1[0] is a common ancestor, that means that the distance
        // from element is 1, but in this case cursor1 will be -1 since we made "redundant" cursor1-=1 in the loop
        var distInChain2 = cursor2 + 2;
        return distInChain1 > OverlappedText.maxDistToParent || distInChain2 > OverlappedText.maxDistToParent;
    };
    OverlappedText.getElementCenter = function (element) {
        var _a = element.getBoundingClientRect(), left = _a.left, right = _a.right, top = _a.top, bottom = _a.bottom;
        return { x: (right + left) / 2, y: (bottom + top) / 2 };
    };
    /**
     * Returns true if element or one of his descents has positive z-index.
     * Checks only n descents (performance concern), where n = OverlappedText.maxDistToParent
     *
     * (Note: actually, overlapping may occur without any reference to z-index, for example by setting relative position
     * and moving elements. If isPositiveZIndex such kind of  cases will not be detected. Limitation in favor of performance.)
     */
    OverlappedText.isPositiveZIndex = function (element) {
        var testedElement = element;
        var steps = 0;
        while (testedElement && steps < OverlappedText.maxDistToParent) {
            if (parseInt(getComputedStyle(testedElement).zIndex) > 0) {
                return true;
            }
            steps++;
            testedElement = testedElement.parentElement;
        }
        return false;
    };
    /**
     * Wrapper for `document.elementsFromPoint` function, in order to enable it on IE
     */
    OverlappedText.getElementsAtPoint = function (doc, x, y) {
        if (doc.elementsFromPoint) {
            return doc.elementsFromPoint(x, y);
        }
        var elements = doc.msElementsFromPoint(x, y);
        var result = [];
        if (elements !== null) {
            for (var i = 0; i < elements.length; i++) {
                result.push(elements[i]);
            }
        }
        return result;
    };
    /**
     * Returns number of element's descendants. If OverlappedText.maxDescendants exceeded - stops calculation and returns Infinity.
     * Note. This function is equivalent to `(element)=>element.getElementsByTagName('*').length < max;` but if has
     * some performance advantage.
     */
    OverlappedText.getElementDescendantsNum = function (element, alreadyFoundNum) {
        if (alreadyFoundNum === void 0) { alreadyFoundNum = 0; }
        if (alreadyFoundNum > OverlappedText.maxDescendants)
            return Infinity;
        var children = element.children;
        if (children.length === 0)
            return 0;
        var localDescendantsNum = children.length;
        if (alreadyFoundNum + localDescendantsNum > OverlappedText.maxDescendants)
            return Infinity;
        for (var i = 0; i < children.length; i++) {
            var num = OverlappedText.getElementDescendantsNum(children[i], alreadyFoundNum + localDescendantsNum);
            localDescendantsNum += num;
            if (alreadyFoundNum + localDescendantsNum > OverlappedText.maxDescendants)
                return Infinity;
        }
        return localDescendantsNum;
    };
    OverlappedText.isElementHasTooMuchDescendants = function (element) {
        return OverlappedText.getElementDescendantsNum(element) > OverlappedText.maxDescendants;
    };
    OverlappedText.isElementHasInnerText = function (element) {
        var text = element.innerText;
        if (text) {
            text = text.trim();
        }
        return !!text;
    };
    OverlappedText.prototype.getOverlappedTextElement = function (element) {
        if (!OverlappedText.isPositiveZIndex(element)) {
            return;
        }
        var _a = OverlappedText.getElementCenter(element), x = _a.x, y = _a.y;
        var elementsAtPoint = OverlappedText.getElementsAtPoint(element.ownerDocument, x, y);
        var ancestors = OverlappedText.getElementFirstAncestors(element);
        var detectedElement;
        for (var i = 0; i < elementsAtPoint.length && !detectedElement; i++) {
            var testedElement = elementsAtPoint[i];
            // Skip if it's an ancestor or if it's a clicked element itself
            if (ancestors.indexOf(testedElement) > -1 || testedElement === element) {
                continue;
            }
            if (!OverlappedText.isElementHasInnerText(testedElement)) {
                continue;
            }
            // Skip if common ancestor is too far
            var testedElementFirstAncestors = OverlappedText.getElementFirstAncestors(testedElement);
            if (OverlappedText.isMaxDistanceToCommonAncestorExceeded(ancestors, testedElementFirstAncestors)) {
                continue;
            }
            if (OverlappedText.isElementHasTooMuchDescendants(testedElement)) {
                continue;
            }
            detectedElement = testedElement;
        }
        return detectedElement;
    };
    OverlappedText.maxDistToParent = 3; // if clicked of detected element too far from common parent, it will be skipped
    OverlappedText.maxDescendants = 6; // if detected element has too many descendants, it will be skipped
    return OverlappedText;
}());
AbraDi.registerClass('Abra:OverlappedText', OverlappedText);
var MeaningfulElementGetter = /** @class */ (function () {
    function MeaningfulElementGetter(jQuery) {
        this.jQuery = jQuery;
    }
    MeaningfulElementGetter.prototype.get = function (element) {
        var jelement = this.jQuery(element); //JQueryify
        var result = undefined, couldBePointer = true, climbCount = -1;
        do {
            if (jelement[0].shadowRoot) {
                // do not climb out of shadow scope
                break;
            }
            climbCount++;
            //button means that the programmer had a single purpose in mind for all the elements inside it
            if (ElementUtils.getLowerCaseTagName(jelement[0]) === 'button') {
                result = {
                    type: 'button',
                    element: jelement[0],
                    climb: climbCount
                };
                break;
            }
            if (couldBePointer === true) {
                var currentCursor = this.getElementCursor(jelement);
                if (this.isPointer(jelement, currentCursor)) {
                    result = {
                        type: 'pointer',
                        element: jelement[0],
                        climb: climbCount
                    };
                }
                else {
                    couldBePointer = this.isCursorCouldBePointer(jelement[0], currentCursor);
                }
            }
            if (result === undefined) {
                if (this.isStoppableAttribute(jelement[0])) {
                    result = {
                        type: 'attribute',
                        element: jelement[0],
                        climb: climbCount
                    };
                }
            }
            jelement = jelement.parent();
        } while (climbCount < MeaningfulElementGetter.MaxClimbCount && jelement.prop('nodeType') === NodeType.Element);
        if (result !== undefined && result.climb > 0 && result.element !== undefined && result.element !== element) {
            return result;
        }
    };
    /**
     * checks if the element have an attribute that we can stop on (that indicates this element is meaningful)
     */
    MeaningfulElementGetter.prototype.isStoppableAttribute = function (element) {
        if (!element || !element.attributes) {
            return false;
        }
        var attr = element.attributes['tabIndex'];
        //tab index can be set by browser, we want to address only explicit html
        if (attr && attr.value && element.tabIndex >= 0) {
            return true;
        }
        attr = element.attributes['accesskey'];
        return !!(attr && attr.value);
    };
    MeaningfulElementGetter.prototype.getElementCursor = function (element) {
        /**
         * Calling `css` function could throw "TypeError: Cannot read property 'defaultView' of null" exception
         * One of the causes could be that the element is detached from the DOM on execution
         * ref: https://github.com/jquery/jquery/issues/2086
         */
        try {
            return this.jQuery(element).css('cursor');
        }
        catch (ex) {
            return 'auto';
        }
    };
    MeaningfulElementGetter.prototype.isPointer = function (element, cursor) {
        //trivial case
        if (cursor === 'pointer') {
            return true;
        }
        //auto mean the user-agent decides
        if (cursor !== 'auto') {
            return false;
        }
        switch (ElementUtils.getLowerCaseTagName(element[0])) {
            case 'a':
                return element.attr('href') !== undefined; //no href - no pointer
            default:
                return false;
        }
    };
    MeaningfulElementGetter.prototype.isCursorCouldBePointer = function (element, cursor) {
        if (cursor === 'pointer') {
            return true;
        }
        if (cursor !== 'auto') {
            return false;
        }
        return this.jQuery.inArray(ElementUtils.getLowerCaseTagName(element), MeaningfulElementGetter.cursorOverrideNotPointer) === -1;
    };
    MeaningfulElementGetter.cursorOverrideNotPointer = ['select', 'input', 'button', 'textarea', 'video', 'audio', 'label'];
    MeaningfulElementGetter.MaxClimbCount = 1000;
    return MeaningfulElementGetter;
}());
AbraDi.registerClass('Abra:MeaningfulElementGetter', MeaningfulElementGetter, 'wmjQuery');
var XPathGenerator = /** @class */ (function () {
    function XPathGenerator(jQuery, dataCollectionSettings, xpathEscaper, urlCensorshipController, xpathReducer) {
        this.jQuery = jQuery;
        this.dataCollectionSettings = dataCollectionSettings;
        this.xpathEscaper = xpathEscaper;
        this.urlCensorshipController = urlCensorshipController;
        this.xpathReducer = xpathReducer;
        this.textProperties = ObjectUtils.convertArrayToObject(['name', 'title']);
        this.attributesToCollect = this.getAttributesToCollect(dataCollectionSettings.get());
        this.settings = dataCollectionSettings.get().element.xpath;
    }
    XPathGenerator.prototype.getAttributesToCollect = function (collectionSettings) {
        var attributes = collectionSettings.element && collectionSettings.element.attributesToCollect;
        if (attributes && attributes.length !== 0) {
            var attributesToCollect = attributes.slice(); //shallow clone
            if (this.urlCensorshipController.shouldCensorUrl()) {
                attributesToCollect = this.filterAttributesByCensorship(attributesToCollect);
            }
            attributesToCollect.sort(); //don't remove - makes it sorted upon collection
            return attributesToCollect;
        }
    };
    XPathGenerator.prototype.filterAttributesByCensorship = function (attributes) {
        var _this = this;
        var urlContainingAttributes = ['src', 'href'];
        return this.jQuery.grep(attributes, function (item) {
            return _this.jQuery.inArray(item, urlContainingAttributes) === -1;
        });
    };
    XPathGenerator.prototype.generate = function (parents, removeTextProperties) {
        if (removeTextProperties === void 0) { removeTextProperties = false; }
        var xpathParts = this.generateXpathParts(parents, removeTextProperties);
        var xpathStringArray = this.convertXpathToStringArray(xpathParts);
        var xpath = this.applyXpathLengthLimitation(xpathStringArray).join('');
        return { xpath: xpath, xpathParts: xpathParts };
    };
    XPathGenerator.prototype.generateXpathParts = function (elementsPath, removeTextProperties) {
        var _this = this;
        return this.jQuery(elementsPath)
            .map(function (i, element) {
            var jqElement = _this.jQuery(element);
            return {
                tagName: ElementUtils.getLowerCaseTagName(element),
                tagIndex: _this.getTagIndex(element),
                classes: _this.getClasses(jqElement),
                id: _this.getId(jqElement),
                attributes: _this.getAttributes(jqElement, removeTextProperties)
            };
        })
            .toArray();
    };
    XPathGenerator.prototype.getAttributes = function (jqElement, removeTextProperties) {
        var _this = this;
        var attributes = [];
        if (this.attributesToCollect && this.xpathReducer.shouldCollectAttributesOrClasses(jqElement)) {
            //jQuery.map filters out undefined
            this.jQuery.each(this.attributesToCollect, function (i, attributeName) {
                if (removeTextProperties && _this.textProperties[attributeName]) {
                    return;
                }
                var attributeValue = jqElement.attr(attributeName);
                if (attributeValue !== undefined) {
                    var attributeName_1 = _this.attributesToCollect[i];
                    if (attributeValue.length <= _this.settings.attributeMaxLength && XPathGenerator.shouldCollectAttribute(attributeValue)) {
                        attributes.push(ObjectUtils.createKeyValuePair(attributeName_1, attributeValue));
                    }
                    else {
                        attributes.push(ObjectUtils.createKeyValuePair(attributeName_1));
                    }
                }
            });
        }
        return attributes;
    };
    XPathGenerator.prototype.getClasses = function (jqElement) {
        var _this = this;
        var classes = [];
        if (this.xpathReducer.shouldCollectAttributesOrClasses(jqElement)) {
            var rawClasses = jqElement.attr('class');
            if (rawClasses) {
                classes = this.jQuery.grep(rawClasses.split(XPathGenerator.classDelimiter), XPathGenerator.shouldCollectClassOrId);
                classes = this.jQuery.map(classes, function (className) { return TextUtils.trim(className); });
                classes = this.jQuery.grep(classes, function (className) {
                    return className && className.length <= _this.settings.classMaxLength;
                });
                classes.sort();
            }
        }
        return classes;
    };
    XPathGenerator.prototype.getId = function (jqElement) {
        var rawId = jqElement.attr('id');
        if (XPathGenerator.shouldCollectClassOrId(rawId)) {
            var trimmedId = TextUtils.trim(rawId);
            if (trimmedId.length <= this.settings.idMaxLength) {
                return trimmedId;
            }
        }
    };
    XPathGenerator.prototype.convertXpathToStringArray = function (xpathParts) {
        var _this = this;
        var outputArray = [];
        for (var i = 0; i < xpathParts.length; i++) {
            var part = xpathParts[i];
            outputArray.push(part.tagName);
            outputArray.push('[');
            outputArray.push((part.tagIndex + 1).toString());
            outputArray.push(']');
            if (part.id) {
                outputArray.push('#');
                outputArray.push(part.id);
            }
            if (part.classes) {
                var classes = this.jQuery.map(part.classes, function (className) { return ".".concat(className); });
                outputArray.push.apply(outputArray, classes);
            }
            if (part.attributes) {
                var attributes = this.jQuery.map(part.attributes, function (attribute) { return (attribute.value ? "&".concat(attribute.key, "=").concat(_this.xpathEscaper.escape(attribute.value)) : "&".concat(attribute.key)); });
                outputArray.push.apply(outputArray, attributes);
            }
            outputArray.push(XPathGenerator.delimiter);
        }
        outputArray.pop();
        return outputArray;
    };
    /**
     * Remove data from xpath to make sure we could send it within our length-limit
     * @param rawXpath array of parts of xpath
     */
    XPathGenerator.prototype.applyXpathLengthLimitation = function (rawXpath) {
        var length = 0;
        for (var i = 0; i < rawXpath.length; i++) {
            length += rawXpath[i].length;
        }
        /**
         * Remove classes if length exceeded (starting from parents)
         */
        for (var i = 0; length > this.settings.xpathMaxLength && i < rawXpath.length; i++) {
            var str = rawXpath[i];
            if (str[0] === '.') {
                length -= str.length;
                rawXpath[i] = '';
            }
        }
        /**
         * Remove Xpath-Parts if length exceeded (starting from parents)
         */
        if (length > this.settings.xpathMaxLength) {
            var cutSize = 0;
            var cutIndex = 0;
            for (var i = 0; i < rawXpath.length && cutIndex === 0; i++) {
                var str = rawXpath[i];
                cutSize += str.length;
                if (str === '/' && length - cutSize <= this.settings.xpathMaxLength) {
                    cutIndex = i;
                }
            }
            rawXpath = cutIndex !== 0 ? rawXpath.slice(cutIndex + 1) : [];
        }
        return rawXpath;
    };
    XPathGenerator.prototype.getTagIndex = function (element) {
        var tagIndex = 0;
        for (var sibling = element.previousSibling; sibling; sibling = sibling.previousSibling) {
            if (sibling.localName === element.localName) {
                tagIndex++;
            }
        }
        return tagIndex;
    };
    XPathGenerator.shouldCollectClassOrId = function (value) {
        // classes and ids are allowed to contain CC like strings
        // see: https://walkme.atlassian.net/browse/DATA-206
        return value && !XPathGenerator.forbiddenCharsRegex.test(value);
    };
    XPathGenerator.shouldCollectAttribute = function (value) {
        // attributes are not allowed to contain CC like strings
        // attibutes are allowed to contain special chars (they are escaped)
        return value && !PrivacyUtils.isCreditCard(value);
    };
    XPathGenerator.forbiddenCharsRegex = /[&=\.\]\[\/\#]/;
    XPathGenerator.classDelimiter = /[\s\uFEFF\xA0]+/;
    XPathGenerator.delimiter = '/';
    return XPathGenerator;
}());
AbraDi.registerClass('Abra:XPathGenerator', XPathGenerator, 'wmjQuery, Abra:DataCollectionSettingsWrapper, Abra:XpathEscaper, Abra:UrlCensorshipController, Abra:XpathReducer');
var XpathReducer = /** @class */ (function () {
    function XpathReducer() {
    }
    XpathReducer.prototype.shouldCollectAttributesOrClasses = function (jqElement) {
        if (jqElement && ElementUtils.isElement(jqElement[0])) {
            var tagName = ElementUtils.getLowerCaseTagName(jqElement[0]);
            return tagName !== 'html' && tagName !== 'body';
        }
        return true;
    };
    return XpathReducer;
}());
AbraDi.registerClass('Abra:XpathReducer', XpathReducer);
var EventHandler = /** @class */ (function () {
    function EventHandler(eventBuilder, eventsSenderWrapper, eventsTrigger, logger, windowIdGetter, commonEventAttributesProvider, jQuery, obfuscator, textValueCensorship, collectionIndicator, webhooksIdsAdder, featuresManager) {
        this.eventBuilder = eventBuilder;
        this.eventsSenderWrapper = eventsSenderWrapper;
        this.eventsTrigger = eventsTrigger;
        this.logger = logger;
        this.windowIdGetter = windowIdGetter;
        this.commonEventAttributesProvider = commonEventAttributesProvider;
        this.jQuery = jQuery;
        this.obfuscator = obfuscator;
        this.textValueCensorship = textValueCensorship;
        this.collectionIndicator = collectionIndicator;
        this.webhooksIdsAdder = webhooksIdsAdder;
        this.shouldEncode = true;
        this.shouldEncode = !featuresManager.isFeatureEnabled('Abra-DisableEncoding');
        if (AbraDi.getCtx().has('CleanObject')) {
            this.cleanObject = AbraDi.getCtx().get('CleanObject');
        }
    }
    EventHandler.prototype.initiate = function (eventData) {
        var _this = this;
        if (!this.collectionIndicator.shouldCollect()) {
            return;
        }
        var time = TimingUtils.now();
        this.eventBuilder
            .build(eventData)
            .then(function (event) {
            event.time = time;
            event.ctx = event.ctx || {};
            _this.addTimingData(event);
            _this.addIframeData(event);
            _this.addApplicationData(event);
            return _this.addWindowData(event).then(function () {
                _this.substringEvent(event);
                _this.textValueCensorship.censorEvent(eventData);
                event = _this.jQuery.extend(true, event, _this.commonEventAttributesProvider.get());
                if (_this.cleanObject) {
                    event = _this.cleanObject(event);
                }
                _this.webhooksIdsAdder && _this.webhooksIdsAdder.add(event); // VIS-6832
                _this.sendEvent(event);
            });
        })
            ['catch'](function (error) {
            _this.logger.error('error sending event', error);
        });
    };
    EventHandler.prototype.substringEvent = function (event) {
        TextUtils.substringObject(EventPropertiesMaxLength.Value, event);
    };
    EventHandler.prototype.addTimingData = function (event) {
        event.ctx.timing = TimingUtils.getTimingData();
    };
    EventHandler.prototype.addWindowData = function (event) {
        return this.windowIdGetter.getOrCreate().then(function (id) {
            event.ctx.winId = id;
        });
    };
    EventHandler.prototype.addIframeData = function (event) {
        try {
            if (FrameUtils.isIframe()) {
                event.ctx.topTitle = FrameUtils.getTopTitle();
            }
        }
        catch (error) {
            //Blocked a frame from accessing a cross-origin frame
        }
    };
    EventHandler.prototype.addApplicationData = function (event) {
        event.version = { abra: AbraMain.App.version };
    };
    EventHandler.prototype.sendEvent = function (event) {
        this.eventsSenderWrapper.send(this.shouldEncode ? this.obfuscator.encode(event) : event);
        this.eventsTrigger.sync('Abra:EventSent', event); //used at kadabra & tests
        this.logger.debug(event); //used for debugging, especially needed on old browsers (IE8 don't have network devtools)
    };
    return EventHandler;
}());
AbraDi.registerClass('Abra:EventHandler', EventHandler, 'Abra:EventBuilder, Abra:EventsSenderWrapper, EventsTrigger, Abra:Logger, Abra:WindowIdGetter, CommonEventAttributesProvider, wmjQuery, Abra:EventObfuscator, Abra:TextValueCensorship, Abra:CollectionIndicator, WebhooksIdsAdder, FeaturesManager');
var EventTypes = {
    active: 'active',
    idle: 'idle',
    pageChange: 'pageChange'
};
/// <reference path="../typings/declarations/event-types.ts"/>
/**
 * Fire `idle` event each time the user becomes inactive
 * This event will be followed by an `active` event when the user performs any interaction with the site
 */
var IdleEventCreator = /** @class */ (function () {
    //private readonly isIFrame: boolean; //todo: think about it
    function IdleEventCreator(eventHandler, userEventListener, reusableTimerFactory, errorUtils, throttle) {
        this.eventHandler = eventHandler;
        this.userEventListener = userEventListener;
        this.reusableTimerFactory = reusableTimerFactory;
        this.errorUtils = errorUtils;
        this.throttle = throttle;
        this.delay = 60 * 1000;
        this.isIdle = false;
        this.isEnabled = false;
        this.throttleIntervalMS = 1000;
    }
    IdleEventCreator.prototype.load = function () {
        var _this = this;
        if (!this.timer) {
            this.timer = this.reusableTimerFactory.create(function () { return _this.setIdle(); }, this.delay);
            this.registerId = this.userEventListener.register(this.throttle(function (event) { return _this.setActive(event); }, this.throttleIntervalMS), [
                'blur',
                'change',
                'click',
                'dblclick',
                'focus',
                'focusin',
                'focusout',
                'hover',
                'keydown',
                'keypress',
                'keyup',
                'mousedown',
                'mouseenter',
                'mouseleave',
                'mousemove',
                'mouseout',
                'mouseover',
                'mouseup',
                'resize',
                'scroll',
                'select',
                'submit'
            ]);
            this.timer.set();
            this.isEnabled = true;
        }
    };
    IdleEventCreator.prototype.unload = function () {
        if (this.timer) {
            this.userEventListener.unregister(this.registerId);
            this.timer.clear();
            this.isEnabled = false;
        }
    };
    /**
     * for tests
     */
    IdleEventCreator.prototype.setDelay = function (delay) {
        this.delay = delay;
    };
    /**
     * for tests
     */
    IdleEventCreator.prototype.setThrottleInterval = function (interval) {
        this.throttleIntervalMS = interval;
    };
    IdleEventCreator.prototype.setActive = function (event) {
        if (this.isEnabled) {
            if (this.isIdle) {
                this.isIdle = false;
                this.raiseEvent(EventTypes.active, event.getEventType());
            }
            this.timer.set();
        }
    };
    IdleEventCreator.prototype.setIdle = function () {
        if (this.isEnabled) {
            this.isIdle = true;
            this.raiseEvent(EventTypes.idle);
        }
    };
    IdleEventCreator.prototype.raiseEvent = function (type, trigger) {
        var _this = this;
        this.errorUtils.wrapCallAndLog(function () {
            _this.eventHandler.initiate({
                event: {
                    type: type,
                    misc: { trigger: trigger }
                }
            });
        }, 'error at IdleEventCreator', { type: type, trigger: trigger });
    };
    return IdleEventCreator;
}());
AbraDi.registerClass('Abra:IdleEventCreator', IdleEventCreator, 'Abra:EventHandler, Abra:UserEventListener, Abra:ReusableTimerFactory, Abra:ErrorUtils, Throttle');
var KeypressEventCreator = /** @class */ (function () {
    function KeypressEventCreator(userEventListener, errorUtils, eventHandler, reusableTimerFactory, elementDescriptionGenerator, textValueCensorship, collectionIndicator) {
        var _this = this;
        this.userEventListener = userEventListener;
        this.errorUtils = errorUtils;
        this.eventHandler = eventHandler;
        this.reusableTimerFactory = reusableTimerFactory;
        this.elementDescriptionGenerator = elementDescriptionGenerator;
        this.textValueCensorship = textValueCensorship;
        this.collectionIndicator = collectionIndicator;
        this.isEnabled = false;
        this.timer = this.reusableTimerFactory.create(function () { return _this.feedEvent(); }, 1000);
    }
    KeypressEventCreator.prototype.load = function () {
        var _this = this;
        if (!this.isEnabled) {
            this.registerId = this.userEventListener.register(function (event) { return _this.feedEvent(event); }, ['keypress']);
            this.registerBeforeUnload();
            this.isEnabled = true;
        }
    };
    KeypressEventCreator.prototype.unload = function () {
        if (this.isEnabled) {
            this.timer.clear();
            this.userEventListener.unregister(this.registerId);
            this.eventData = undefined;
            this.isEnabled = false;
        }
    };
    KeypressEventCreator.prototype.feedEvent = function (event) {
        if (!this.isEnabled)
            return;
        if (event && this.collectionIndicator.shouldCollect()) {
            //keypress after keypress
            if (this.eventData) {
                if (this.eventData.desc.xpath === this.elementDescriptionGenerator.generateXpath(event).xpath) {
                    //on same element
                    this.timer.set(); //add 1000ms to window
                    this.eventData.count++; //todo: add limition of keystrokes?
                }
                else {
                    //on other element
                    this.raiseEvent(); //fire previous event
                    this.createNew(event);
                }
            }
            else {
                //first keypress sequence on this element
                this.createNew(event);
            }
        }
        else {
            this.raiseEvent();
        }
    };
    KeypressEventCreator.prototype.createNew = function (event) {
        this.eventData = {
            desc: this.elementDescriptionGenerator.generate(event).desc,
            censorshipData: this.textValueCensorship.createCensorshipData(event),
            count: 1,
            t1: TimingUtils.now()
        };
        this.timer.set(); //add 1000ms to window
    };
    KeypressEventCreator.prototype.raiseEvent = function () {
        this.timer.clear();
        if (this.eventData) {
            this.eventHandler.initiate({
                event: {
                    type: 'keypress',
                    element: this.eventData.desc, //todo: filter out stuff (text, value, etc)
                    misc: {
                        count: this.eventData.count,
                        t1: this.eventData.t1
                    }
                },
                data: { censorshipData: this.eventData.censorshipData }
            });
            this.eventData = undefined;
        }
    };
    KeypressEventCreator.prototype.registerBeforeUnload = function () {
        var _this = this;
        var _originalUnloadEvent = window.onbeforeunload;
        window.onbeforeunload = function (event) {
            if (_this.isEnabled) {
                _this.errorUtils.wrapCallAndLog(function () { return _this.feedEvent(); }, 'error on onbeforeunload keypress');
            }
            // keep current functionality - don't mess up code on client's site
            if (_originalUnloadEvent) {
                return _originalUnloadEvent.call(window, event);
            }
        };
    };
    return KeypressEventCreator;
}());
AbraDi.registerClass('Abra:KeypressEventCreator', KeypressEventCreator, 'Abra:UserEventListener, Abra:ErrorUtils, Abra:EventHandler, Abra:ReusableTimerFactory, Abra:ElementDescriptionGenerator, Abra:TextValueCensorship, Abra:CollectionIndicator');
var MousedownWrapper = /** @class */ (function () {
    function MousedownWrapper() {
    }
    MousedownWrapper.getEventNameForListening = function () {
        return _a.eventNameForListening;
    };
    MousedownWrapper.wrapEventNameForSending = function (type) {
        return type === _a.pointerdown ? _a.mousedown : type;
    };
    MousedownWrapper.enablePointerEvent = function () {
        if (window.PointerEvent) {
            _a.eventNameForListening = _a.pointerdown;
        }
    };
    var _a;
    _a = MousedownWrapper;
    MousedownWrapper.mousedown = 'mousedown';
    MousedownWrapper.pointerdown = 'pointerdown';
    MousedownWrapper.eventNameForListening = _a.mousedown;
    return MousedownWrapper;
}());
/// <reference path="../typings/declarations/event-types.ts"/>
/**
 * Todo: remove this file after pageChange is fully migrated to WalkMe's player
 */
var PageInfoCreator = /** @class */ (function () {
    function PageInfoCreator(logger, pageVisitIdProvider, eventHandler, pageLoadSync, eventsListener) {
        var _this = this;
        this.logger = logger;
        this.pageVisitIdProvider = pageVisitIdProvider;
        this.eventHandler = eventHandler;
        this.pageLoadSync = pageLoadSync;
        this.eventsListener = eventsListener;
        this.disabledByWalkmePlayer = AbraDi.getCtx().has('PageChangeEventSender');
        this.eventCallback = function () { return _this.distribute(); };
    }
    PageInfoCreator.prototype.distribute = function () {
        //todo: think about getting the trigger from the player, this will help us filter out stuff if needed
        this.eventHandler.initiate({
            event: {
                type: EventTypes.pageChange
            }
        });
    };
    PageInfoCreator.prototype.load = function () {
        if (this.disabledByWalkmePlayer) {
            return;
        }
        if (this.pageLoadSync.initializationData) {
            if (this.pageVisitIdProvider.get() !== this.pageLoadSync.initializationData.id) {
                this.logger.error('Data inconsistency in pageVisitId');
            }
            this.distribute();
        }
        this.eventsListener.on('PageVisitIdUpdated', this.eventCallback);
    };
    PageInfoCreator.prototype.unload = function () {
        if (this.disabledByWalkmePlayer) {
            return;
        }
        this.eventsListener.off('PageVisitIdUpdated', this.eventCallback);
    };
    return PageInfoCreator;
}());
AbraDi.registerClass('Abra:PageInfoCreator', PageInfoCreator, 'Abra:Logger, PageVisitIdProvider, Abra:EventHandler, Abra:PageLoadSync, EventsListener');
var ReferrerCollectionEnablement = /** @class */ (function () {
    function ReferrerCollectionEnablement() {
    }
    /**
     * Makes Walkme Player collect the `referrer` property.
     * see: $/player/lib/events/eventSenderContextDataProvider.js@shouldCollectReferrer
     */
    ReferrerCollectionEnablement.enable = function (ctx) {
        ctx.get('EventsListener').once('EventSenderContextDataProviderReferrerEnablement', function () { return true; });
    };
    return ReferrerCollectionEnablement;
}());
var UserEventBinder = /** @class */ (function () {
    function UserEventBinder(jQuery, compatibilityUtils) {
        this.jQuery = jQuery;
        this.compatibilityUtils = compatibilityUtils;
        this.initBindingFunctions();
    }
    UserEventBinder.prototype.initBindingFunctions = function () {
        var restoredFuncs;
        if (AbraDi.getCtx().has('NativeEventListenerFunctionsProvider')) {
            restoredFuncs = AbraDi.getCtx().get('NativeEventListenerFunctionsProvider').get();
        }
        restoredFuncs = restoredFuncs || {};
        this.addEventListener = restoredFuncs.addEventListener || document.addEventListener;
        this.removeEventListener = restoredFuncs.removeEventListener || document.removeEventListener;
    };
    UserEventBinder.prototype.bindEvents = function (document, events, callback) {
        var _this = this;
        var jqBind = function (event) { return _this.jQuery(document).on("".concat(event, ".abra"), callback); };
        var bindFunc = jqBind;
        if (this.compatibilityUtils.isCaptureBindCompatible()) {
            bindFunc = function (event) {
                try {
                    _this.addEventListener.apply(document, [event, callback, true]);
                }
                catch (ex) {
                    jqBind(event);
                }
            };
        }
        this.jQuery.each(events, function (index, event) {
            bindFunc(event);
        });
    };
    UserEventBinder.prototype.unbindEvents = function (document, events, callback) {
        var _this = this;
        var unbinedFunc = function (event) {
            try {
                _this.removeEventListener.apply(document, [event, callback, true]);
                _this.jQuery(document).off("".concat(event, ".abra"), callback);
            }
            catch (ex) {
                //ignored
            }
        };
        this.jQuery.each(events, function (index, event) {
            unbinedFunc(event);
        });
    };
    return UserEventBinder;
}());
AbraDi.registerClass('Abra:UserEventBinder', UserEventBinder, 'wmjQuery, Abra:CompatibilityUtils');
var UserEventCreator = /** @class */ (function () {
    function UserEventCreator(userEventListener, eventHandler, elementDescriptionGenerator, meaningfulElementGetter, jQuery, errorUtils, textValueCensorship, collectionIndicator, eventThrottle, trackedElementsFilter) {
        this.userEventListener = userEventListener;
        this.eventHandler = eventHandler;
        this.elementDescriptionGenerator = elementDescriptionGenerator;
        this.jQuery = jQuery;
        this.errorUtils = errorUtils;
        this.textValueCensorship = textValueCensorship;
        this.collectionIndicator = collectionIndicator;
        this.eventThrottle = eventThrottle;
        this.trackedElementsFilter = trackedElementsFilter;
        this.generateElementDescription = this.errorUtils.bindCall(this.elementDescriptionGenerator, this.elementDescriptionGenerator.generate, 'element capture');
        /**
         * Replace the element with a more "meaningful" element.
         */
        this.meaningfulElementGetter = this.errorUtils.bindCall(this, function (eventType, clickedElement) {
            if (eventType === 'mousedown' || eventType === 'dblclick') {
                return meaningfulElementGetter.get(clickedElement);
            }
        }, 'meaningful element');
        //todo: addIframeData?
    }
    UserEventCreator.prototype.createEvent = function (event) {
        if (!this.collectionIndicator.shouldCollect()) {
            return;
        }
        var clickedElement = event.getElement();
        var eventType = event.getEventType();
        if (!clickedElement || !this.shouldCreateEvent(clickedElement, eventType)) {
            return;
        }
        var meaningfulElement = this.meaningfulElementGetter(eventType, clickedElement);
        var misc;
        if (meaningfulElement) {
            misc = { type: meaningfulElement.type, climb: meaningfulElement.climb };
        }
        var element = meaningfulElement ? meaningfulElement.element : clickedElement;
        var _a = this.generateElementDescription(event, element), desc = _a.desc, textMisc = _a.misc, xpathParts = _a.xpathParts;
        if (textMisc) {
            misc = this.jQuery.extend(textMisc, misc);
        }
        var whitelistResult = xpathParts && this.trackedElementsFilter.shouldSend(event, desc, xpathParts);
        if (!whitelistResult || !whitelistResult.result) {
            return;
        }
        if (this.eventThrottle.shouldThrottle(desc, eventType)) {
            return;
        }
        this.eventHandler.initiate({
            event: {
                type: eventType,
                element: desc,
                misc: misc,
                reason: whitelistResult.reason
            },
            data: {
                event: event,
                censorshipData: this.textValueCensorship.createCensorshipData(event)
            }
        });
    };
    UserEventCreator.prototype.shouldCreateEvent = function (element, eventType) {
        if (this.jQuery.inArray(ElementUtils.getLowerCaseTagName(element), UserEventCreator.BlockedTags) !== -1) {
            return false;
        }
        if (this.jQuery.inArray(eventType, ['mousedown', 'dblclick']) !== -1 && element.textContent && element.textContent.length > UserEventCreator.MaxTextContent) {
            return false;
        }
        return true;
    };
    UserEventCreator.prototype.load = function () {
        var _this = this;
        this.registerId = this.userEventListener.register(function (event) { return _this.createEvent(event); }, ['change', MousedownWrapper.getEventNameForListening(), 'dblclick', 'submit']);
    };
    UserEventCreator.prototype.unload = function () {
        this.userEventListener.unregister(this.registerId);
    };
    UserEventCreator.BlockedTags = ['html', 'body'];
    UserEventCreator.MaxTextContent = 250;
    return UserEventCreator;
}());
AbraDi.registerClass('Abra:UserEventCreator', UserEventCreator, 'Abra:UserEventListener, Abra:EventHandler, Abra:ElementDescriptionGenerator, Abra:MeaningfulElementGetter, wmjQuery, Abra:ErrorUtils, Abra:TextValueCensorship, Abra:CollectionIndicator, Abra:EventThrottle, Abra:TrackedElementsFilter');
var UserEventListener = /** @class */ (function () {
    function UserEventListener(userEventBinder, frameBinder, errorUtils, userEventWrapper) {
        var _this = this;
        this.userEventBinder = userEventBinder;
        this.frameBinder = frameBinder;
        this.errorUtils = errorUtils;
        this.userEventWrapper = userEventWrapper;
        this.runningCallbackId = -1;
        this.distributeMap = {};
        this.unregisterData = {};
        this.enabled = true;
        this.mainCallback = function (event) { return _this.distribute(event); };
    }
    UserEventListener.prototype.register = function (callback, events) {
        var callbackId = ++this.runningCallbackId;
        var bindEventList = [];
        for (var i = 0; i < events.length; i++) {
            var eventName = events[i];
            if (this.distributeMap[eventName]) {
                this.distributeMap[eventName].push(callback);
            }
            else {
                this.distributeMap[eventName] = [callback];
                bindEventList.push(eventName);
            }
        }
        this.bind(bindEventList, this.mainCallback);
        this.unregisterData[callbackId] = {
            callback: callback,
            events: events
        };
        return callbackId;
    };
    UserEventListener.prototype.unregister = function (callbackId) {
        var item = this.unregisterData[callbackId];
        if (!item) {
            return false;
        }
        var unbindEventList = [];
        for (var i = 0; i < item.events.length; i++) {
            var eventName = item.events[i];
            var eventCallbacks = this.distributeMap[eventName];
            for (var j = 0; j < eventCallbacks.length; j++) {
                if (eventCallbacks[j] === item.callback) {
                    eventCallbacks.splice(j, 1); //remove from array
                    if (eventCallbacks.length === 0) {
                        unbindEventList.push(eventName);
                        delete this.distributeMap[eventName];
                    }
                    break;
                }
            }
        }
        this.unbind(unbindEventList, this.mainCallback);
        delete this.unregisterData[callbackId];
        return true;
    };
    UserEventListener.prototype.disable = function () {
        this.enabled = false;
    };
    UserEventListener.prototype.distribute = function (event) {
        var _this = this;
        if (this.enabled) {
            var callbacks_1 = this.distributeMap[event.type] || [];
            var _loop_2 = function (i) {
                this_2.errorUtils.wrapCallAndLog(function () { return callbacks_1[i](_this.userEventWrapper.wrap(event)); }, 'error distributing event', { trigger: event.type });
            };
            var this_2 = this;
            for (var i = 0; i < callbacks_1.length; i++) {
                _loop_2(i);
            }
        }
    };
    UserEventListener.prototype.bind = function (events, callback) {
        var _this = this;
        this.frameBinder.forEach(function (document) {
            _this.userEventBinder.bindEvents(document, events, callback);
        });
    };
    UserEventListener.prototype.unbind = function (events, callback) {
        var _this = this;
        this.frameBinder.forEach(function (document) {
            _this.userEventBinder.unbindEvents(document, events, callback);
        });
    };
    return UserEventListener;
}());
AbraDi.registerClass('Abra:UserEventListener', UserEventListener, 'Abra:UserEventBinder, Abra:FrameBinder, Abra:ErrorUtils, Abra:UserEventWrapper');
var UserEventWrapper = /** @class */ (function () {
    function UserEventWrapper(elementParentsGetter) {
        this.elementParentsGetter = elementParentsGetter;
    }
    UserEventWrapper.prototype.wrap = function (event) {
        return new WrappedUserEvent(this.elementParentsGetter, event);
    };
    return UserEventWrapper;
}());
var WrappedUserEvent = /** @class */ (function () {
    function WrappedUserEvent(elementParentsGetter, event) {
        this.elementParentsGetter = elementParentsGetter;
        this.event = event;
    }
    WrappedUserEvent.prototype.getParents = function () {
        this.parents = this.parents || this.elementParentsGetter.get(this.event);
        return this.parents;
    };
    WrappedUserEvent.prototype.getElement = function () {
        var parents = this.getParents();
        return parents[parents.length - 1];
    };
    WrappedUserEvent.prototype.getEvent = function () {
        return this.event;
    };
    WrappedUserEvent.prototype.getEventType = function () {
        return MousedownWrapper.wrapEventNameForSending(this.event.type);
    };
    return WrappedUserEvent;
}());
AbraDi.registerClass('Abra:UserEventWrapper', UserEventWrapper, 'Abra:ElementParentsGetter');
var CensorshipConditionsGetter = /** @class */ (function () {
    function CensorshipConditionsGetter(jQuery) {
        this.jQuery = jQuery;
    }
    CensorshipConditionsGetter.prototype.get = function () {
        var _this = this;
        return {
            classInElementTree: function (rule, parents) { return _this.classInElementTree(rule, parents); },
            idInElementTree: function (rule, parents) { return _this.idInElementTree(rule, parents); }
        };
    };
    CensorshipConditionsGetter.prototype.classInElementTree = function (rule, parents) {
        if (!rule.compiled) {
            rule.compiled = this.convertClassArrayToRegex(rule.values);
        }
        if (rule.values.length > 0) {
            for (var i = parents.length - 1; i >= 0; i--) {
                var className = this.jQuery(parents[i]).attr('class');
                if (className && rule.compiled.test(className)) {
                    return true;
                }
            }
        }
        return false;
    };
    CensorshipConditionsGetter.prototype.convertClassArrayToRegex = function (classes) {
        var regexString = [];
        this.jQuery.each(classes, function (i, className) {
            var escapedClassName = TextUtils.escapeRegExp(className);
            regexString.push("(^|[\\s\\uFEFF\\xA0]{1})".concat(escapedClassName, "($|[\\s\\uFEFF\\xA0]{1})"));
        });
        return new RegExp(regexString.join('|'), 'i');
    };
    CensorshipConditionsGetter.prototype.idInElementTree = function (rule, parents) {
        if (rule.values.length > 0 && this.isIdsExistInElementArray(parents, rule.values)) {
            return true;
        }
        return false;
    };
    CensorshipConditionsGetter.prototype.isIdsExistInElementArray = function (elements, ids) {
        for (var i = 0; i < elements.length; i++) {
            for (var j = 0; j < ids.length; j++) {
                if (elements[i].id === ids[j]) {
                    return true;
                }
            }
        }
        return false;
    };
    return CensorshipConditionsGetter;
}());
AbraDi.registerClass('Abra:CensorshipConditionsGetter', CensorshipConditionsGetter, 'wmjQuery');
var CensorshipMethodsProvider = /** @class */ (function () {
    function CensorshipMethodsProvider(jQuery, logger, censorshipConditionsGetter, dataCollectionSettings) {
        this.jQuery = jQuery;
        this.logger = logger;
        this.censorshipRules = this.getCensorshipRules(dataCollectionSettings.get());
        this.conditionDictionary = censorshipConditionsGetter.get();
    }
    CensorshipMethodsProvider.prototype.hasCensorshipRules = function () {
        return this.censorshipRules.length > 0;
    };
    CensorshipMethodsProvider.prototype.getCensorshipRules = function (dataCollectionSettings) {
        var censorshipRules = dataCollectionSettings && dataCollectionSettings.element && dataCollectionSettings.element.censorshipRules;
        return censorshipRules || [];
    };
    CensorshipMethodsProvider.prototype.provide = function (parents) {
        var methodsSet = {};
        for (var i = this.censorshipRules.length - 1; i >= 0; i--) {
            if (this.conditionDictionary[this.censorshipRules[i].type]) {
                if (this.conditionDictionary[this.censorshipRules[i].type](this.censorshipRules[i], parents)) {
                    var methodsToAdd = this.censorshipRules[i].methods;
                    if (methodsToAdd && methodsToAdd.length > 0) {
                        this.jQuery.each(methodsToAdd, function (i, methodName) {
                            methodsSet[methodName] = true;
                        });
                    }
                }
            }
            else {
                this.logger.error("censorship type does not exist: ".concat(this.censorshipRules[i].type));
            }
        }
        return methodsSet;
    };
    return CensorshipMethodsProvider;
}());
AbraDi.registerClass('Abra:CensorshipMethodsProvider', CensorshipMethodsProvider, 'wmjQuery, Abra:Logger, Abra:CensorshipConditionsGetter, Abra:DataCollectionSettingsWrapper');
var TextValueCensorship = /** @class */ (function () {
    function TextValueCensorship(privacyUtils) {
        this.privacyUtils = privacyUtils;
        this.propertiesToIgnore = ObjectUtils.convertArrayToObject(['xpath']);
    }
    TextValueCensorship.prototype.censorEvent = function (eventData) {
        var event = eventData.event;
        if (event.element) {
            //copied from NoKeyLoggerDataProvider, prevent logging keystrokes, need to understand if needed
            //todo: test
            if (this.privacyUtils.removeInputValues && (event.type === 'keypress' || event.type === 'change')) {
                var tagName = eventData.data && eventData.data.censorshipData && eventData.data.censorshipData.tagName;
                if (tagName !== 'select') {
                    event.element.value = undefined;
                    event.element.text = undefined;
                }
            }
            event.element = this.privacyUtils.filterCreditCard(event.element, this.propertiesToIgnore);
        }
    };
    TextValueCensorship.prototype.createCensorshipData = function (event) {
        return { tagName: ElementUtils.getLowerCaseTagName(event.getElement()) };
    };
    return TextValueCensorship;
}());
AbraDi.registerClass('Abra:TextValueCensorship', TextValueCensorship, 'Abra:PrivacyUtils');
var EventBuilderRegistrationType;
(function (EventBuilderRegistrationType) {
    EventBuilderRegistrationType[EventBuilderRegistrationType["Creating"] = 0] = "Creating";
    EventBuilderRegistrationType[EventBuilderRegistrationType["Altering"] = 1] = "Altering";
    EventBuilderRegistrationType[EventBuilderRegistrationType["Finalizing"] = 1000] = "Finalizing"; //censorship and stuff
})(EventBuilderRegistrationType || (EventBuilderRegistrationType = {}));
var EventBuilder = /** @class */ (function () {
    function EventBuilder(promiseManager, jQuery, logger) {
        this.promiseManager = promiseManager;
        this.jQuery = jQuery;
        this.logger = logger;
        this.providers = [];
        this.providersCount = 0;
    }
    /**
     *
     * @param event this will be sent
     * @param data this can be used by providers to enrich the event
     */
    EventBuilder.prototype.build = function (eventData) {
        var _this = this;
        if (this.providersCount === 0) {
            return this.promiseManager.resolve(eventData.event);
        }
        return this.jQuery(EventBuilder.ProvidersTypeOrder)
            .reduce(function (accumulatorPromise, providerType) {
            return accumulatorPromise.then(function () {
                return _this.runProvidersGroup(eventData, _this.providers[providerType]);
            });
        }, this.promiseManager.resolve())
            .then(function () {
            return eventData.event;
        });
    };
    EventBuilder.prototype.runProvidersGroup = function (eventData, providers) {
        var _this = this;
        var promises = [];
        if (providers) {
            var _loop_3 = function (providerIndex) {
                var provider = providers[providerIndex];
                try {
                    var providerResult = provider.handler(eventData);
                    if (providerResult) {
                        var promise = providerResult['catch'](function (error) {
                            _this.logger.error('failed to run provider', error, { providerName: provider.name, promise: true });
                        });
                        promises.push(promise);
                    }
                }
                catch (error) {
                    this_3.logger.error('failed to run provider', error, { providerName: provider.name });
                }
            };
            var this_3 = this;
            for (var providerIndex = 0; providerIndex < providers.length; providerIndex++) {
                _loop_3(providerIndex);
            }
        }
        return this.promiseManager.all(promises);
    };
    EventBuilder.prototype.register = function (providerName, handler, type) {
        if (type === void 0) { type = EventBuilderRegistrationType.Creating; }
        this.providers[type] = this.providers[type] || [];
        this.providers[type].push({
            name: providerName,
            handler: handler
        });
        this.providersCount++;
    };
    EventBuilder.ProvidersTypeOrder = [EventBuilderRegistrationType.Creating, EventBuilderRegistrationType.Altering, EventBuilderRegistrationType.Finalizing];
    return EventBuilder;
}());
AbraDi.registerClass('Abra:EventBuilder', EventBuilder, 'PromiseManager, wmjQuery, Abra:Logger');
var EventThrottle = /** @class */ (function () {
    function EventThrottle() {
        this.throttleTTL = 1000 * 60;
        this.cache = {};
    }
    EventThrottle.prototype.shouldThrottle = function (description, eventType) {
        var now = TimingUtils.now();
        if (this.existsInCache(description, eventType, now)) {
            return true;
        }
        else {
            this.saveToCache(description, eventType, now);
            return false;
        }
    };
    EventThrottle.prototype.existsInCache = function (description, eventType, now) {
        var cache = this.cache[eventType];
        return (cache &&
            now <= cache.time + this.throttleTTL &&
            description.xpath === cache.description.xpath &&
            description.value === cache.description.value &&
            description.text === cache.description.text &&
            description.label === cache.description.label);
    };
    EventThrottle.prototype.saveToCache = function (description, eventType, now) {
        var cachedElementDescription = {
            xpath: description.xpath,
            value: description.value,
            text: description.text,
            label: description.label
        };
        this.cache[eventType] = { description: cachedElementDescription, time: now };
    };
    /**
     * for tests
     */
    EventThrottle.prototype.setThrottleTTL = function (throttleTTL) {
        this.throttleTTL = throttleTTL;
    };
    return EventThrottle;
}());
AbraDi.registerClass('Abra:EventThrottle', EventThrottle);
var CompatibilityUtils = /** @class */ (function () {
    function CompatibilityUtils(walkme) {
        this.walkme = walkme;
    }
    CompatibilityUtils.prototype.isCaptureBindCompatible = function () {
        var hostData = this.walkme.getHostData();
        return hostData.isIE(9, 'gte') || !hostData.isIE();
    };
    return CompatibilityUtils;
}());
AbraDi.registerClass('Abra:CompatibilityUtils', CompatibilityUtils, 'Abra:Walkme');
var ErrorUtils = /** @class */ (function () {
    function ErrorUtils(promiseManager, jQuery, logger) {
        this.promiseManager = promiseManager;
        this.jQuery = jQuery;
        this.logger = logger;
    }
    /**
     * Wraps promise error, and add failPoint propery to it, allowing better logging.
     * The error is not handled, just stamped with failPoint
     */
    ErrorUtils.prototype.wrapCatch = function (extraData) {
        var _this_1 = this;
        return function (error) {
            return _this_1.promiseManager.reject(_this_1.wrapError(error, extraData));
        };
    };
    /**
     * Wraps callback error, and add failPoint propery to it, allowing better logging.
     * The error is not handled, just stamped with failPoint
     */
    ErrorUtils.prototype.wrapCall = function (callback, extraData) {
        try {
            return callback();
        }
        catch (error) {
            throw this.wrapError(error, extraData);
        }
    };
    ErrorUtils.prototype.bindCall = function (thisArg, func, extraData) {
        if (thisArg === void 0) { thisArg = null; }
        var _this = this; //eslint-disable-line @typescript-eslint/no-this-alias
        return function () {
            try {
                return func.apply(thisArg, arguments);
            }
            catch (error) {
                throw _this.wrapError(error, extraData);
            }
        };
    };
    /**
     * Calls a callback, if errored then catch the error and logs it
     * Should be used in places that otherwise won't handle  the error and it might get to the console
     */
    ErrorUtils.prototype.wrapCallAndLog = function (callback, message, extraData) {
        try {
            return callback();
        }
        catch (error) {
            error = this.wrapError(error, extraData);
            this.logger.error(message, error, error.extraData);
        }
    };
    ErrorUtils.prototype.wrapError = function (error, extraData) {
        var wrappedError = typeof error === 'string' ? { message: error } : error || { message: 'no error provided' }; //some rejects with a string
        extraData = typeof extraData !== 'string' ? extraData || {} : { failPoint: extraData };
        wrappedError.extraData = this.jQuery.extend(extraData, wrappedError.extraData);
        return wrappedError;
    };
    return ErrorUtils;
}());
AbraDi.registerClass('Abra:ErrorUtils', ErrorUtils, 'PromiseManager, wmjQuery, Abra:Logger');
/// <reference path="../abra-di.ts"/>
var EventsSenderWrapper = /** @class */ (function () {
    function EventsSenderWrapper(eventsSenderFactory) {
        this.eventsSenderFactory = eventsSenderFactory;
    }
    EventsSenderWrapper.prototype.init = function (key) {
        var config = {
            name: 'Abra',
            postEventAction: '/event/tell',
            storageConfig: { keyName: key, autoSave: false, expiresSeconds: 60 * 10 },
            stagingStorageConfig: { keyName: key + '-s', autoSave: false, expiresSeconds: 60 * 10 },
            failureStorageConfig: { keyName: key + '-f', autoSave: true, expiresSeconds: 60 * 60 * 24 },
            storageType: 'session',
            dataSender: 'accumulation',
            clientStorageManager: 'ArrayBuffer',
            clientStagingStorageManager: 'ArrayBuffer'
        };
        this.sender = this.eventsSenderFactory.generateAndGetEventsSender(config);
        this.sender.enable();
    };
    EventsSenderWrapper.prototype.disable = function () {
        if (this.sender) {
            this.sender.sleep();
            this.sender.disable();
            this.sender = undefined;
        }
    };
    EventsSenderWrapper.prototype.send = function (packet) {
        if (this.sender) {
            this.sender.send(packet);
        }
    };
    return EventsSenderWrapper;
}());
AbraDi.registerClass('Abra:EventsSenderWrapper', EventsSenderWrapper, 'EventsSenderFactory');
var FrameBinder = /** @class */ (function () {
    function FrameBinder(iFramesManager, uIChangeTracker, featuresManager, logger) {
        this.iFramesManager = iFramesManager;
        this.uIChangeTracker = uIChangeTracker;
        this.featuresManager = featuresManager;
        this.logger = logger;
    }
    FrameBinder.prototype.load = function () {
        var _this = this;
        if (!this.isSpa()) {
            /**
             * currently if `UIChangeTracker` is not initialized, the `mapIframes` function is not called
             * `mapIframes` function is filling the array that `foreachIframe` uses.
             * if we'll have an indication that an iframe might have been added to the page, we need to call `this.iFramesManager.remapTopIframes()`
             */
            this.iFramesManager.mapIframes();
        }
        if (this.featuresManager.isFeatureEnabled('Abra-ObserveIframes')) {
            try {
                this.iframeObserver = new IframeObserver(FrameBinder.IframeObserverMaxDrillDown);
                this.iframeObserver.observe(function () {
                    _this.iFramesManager.remapTopIframes();
                }, function (error) {
                    _this.logger.error('iframe mutation observer callback error', error);
                });
            }
            catch (error) {
                this.logger.error('error observing iframe mutations', error);
            }
        }
    };
    FrameBinder.prototype.unload = function () {
        if (this.iframeObserver) {
            this.iframeObserver.disconnect();
            this.iframeObserver = undefined;
        }
    };
    FrameBinder.prototype.forEach = function (callback) {
        var _this = this;
        callback(document);
        try {
            var callbackWrapper = function (iframeWrapper) {
                var doc = iframeWrapper.documentAccessible && _this.getDocument(iframeWrapper.iframe);
                if (doc) {
                    callback(doc);
                }
            };
            this.iFramesManager.foreachIframe(callbackWrapper, true);
            this.iFramesManager.onIframeLoad(callbackWrapper);
        }
        catch (ex) {
            // do nothing
        }
    };
    FrameBinder.prototype.getDocument = function (iframe) {
        try {
            var doc = iframe.contentWindow && iframe.contentWindow.document;
            doc = doc || (iframe.contentWindow && iframe.contentWindow.window && iframe.contentWindow.window.document);
            doc = doc || iframe.contentDocument;
            return doc;
        }
        catch (error) {
            // ignored
        }
    };
    FrameBinder.prototype.isSpa = function () {
        return this.uIChangeTracker.isActivated();
    };
    FrameBinder.IframeObserverMaxDrillDown = 3;
    return FrameBinder;
}());
AbraDi.registerClass('Abra:FrameBinder', FrameBinder, 'IFramesManager, UIChangeTracker, FeaturesManager, Abra:Logger');
var FrameUtils = /** @class */ (function () {
    function FrameUtils() {
    }
    FrameUtils.isIframe = function () {
        return top !== window;
    };
    FrameUtils.getTopTitle = function () {
        return top.window.document.title;
    };
    return FrameUtils;
}());
var FunctionUtils;
(function (FunctionUtils) {
    function allowOnce(func) {
        var wasCalled = false;
        return function () {
            if (!wasCalled) {
                wasCalled = true;
                return func();
            }
        };
    }
    FunctionUtils.allowOnce = allowOnce;
})(FunctionUtils || (FunctionUtils = {}));
var IframeObserver = /** @class */ (function () {
    function IframeObserver(maxDrillDown) {
        this.maxDrillDown = maxDrillDown;
    }
    IframeObserver.prototype.observe = function (callback, errorCallback) {
        var _this = this;
        var MutationObserverCtor = window.MutationObserver;
        if (MutationObserverCtor) {
            var config = { attributes: false, childList: true, subtree: true };
            this.observer = new MutationObserverCtor(function (mutations) {
                try {
                    if (_this.wasIframeAdded(mutations)) {
                        callback();
                    }
                }
                catch (error) {
                    errorCallback(error);
                }
            });
            this.observer.observe(document, config);
        }
    };
    IframeObserver.prototype.disconnect = function () {
        this.observer.disconnect();
    };
    IframeObserver.prototype.wasIframeAdded = function (mutations) {
        for (var i = 0; i < mutations.length; i++) {
            var mutation = mutations[i];
            if (mutation.type == 'childList') {
                var addedNodes = mutation.addedNodes;
                for (var j = 0; j < addedNodes.length; j++) {
                    if (IframeObserver.isParentNodeContainsIframe(addedNodes[j], this.maxDrillDown)) {
                        return true;
                    }
                }
            }
        }
        return false;
    };
    IframeObserver.isParentNodeContainsIframe = function (parentNode, currentDepth) {
        if (parentNode) {
            if (parentNode.nodeType === NodeType.Element || parentNode.nodeType === NodeType.DocumentType || parentNode.nodeType === NodeType.Document || parentNode.nodeType === NodeType.DocumentFragment) {
                if (parentNode.nodeName === 'IFRAME') {
                    return true;
                }
                var children = parentNode.children;
                if (currentDepth > 0 && children) {
                    for (var i = 0; i < children.length; i++) {
                        if (IframeObserver.isParentNodeContainsIframe(children[i], currentDepth - 1)) {
                            return true;
                        }
                    }
                }
            }
        }
        return false;
    };
    return IframeObserver;
}());
var ObjectUtils;
(function (ObjectUtils) {
    function createKeyValuePair(key, value) {
        return {
            key: key,
            value: value
        };
    }
    ObjectUtils.createKeyValuePair = createKeyValuePair;
    function convertArrayToObject(array) {
        var retValue = {};
        for (var i = 0; i < array.length; i++) {
            retValue[array[i]] = true;
        }
        return retValue;
    }
    ObjectUtils.convertArrayToObject = convertArrayToObject;
    function convertArrayToValueIndexMap(array) {
        var retValue = {};
        for (var i = 0; i < array.length; i++) {
            retValue[array[i]] = i;
        }
        return retValue;
    }
    ObjectUtils.convertArrayToValueIndexMap = convertArrayToValueIndexMap;
})(ObjectUtils || (ObjectUtils = {}));
var PrivacyUtils = /** @class */ (function () {
    function PrivacyUtils(jQuery, censorshipMethodsProvider, elementParentsGetter, featuresManager, dataCollectionSettings) {
        this.jQuery = jQuery;
        this.censorshipMethodsProvider = censorshipMethodsProvider;
        this.elementParentsGetter = elementParentsGetter;
        this.featuresManager = featuresManager;
        this.dataCollectionSettings = dataCollectionSettings;
        this.allowedInputTypes = ['radio', 'checkbox', 'button', 'reset', 'submit'];
        this.removeInputValues = true;
        this.censorAllText = false;
        var settings = dataCollectionSettings.get();
        this.removeInputValues = (settings && settings.element && settings.element.inputValues) !== 'collect';
        if (!this.removeInputValues) {
            this.allowedInputTypes = jQuery.merge(this.allowedInputTypes, ['text', 'search', 'number', 'tel', 'email', 'url']);
        }
        if (featuresManager.isFeatureEnabled('UbtNoText')) {
            this.censorAllText = true;
        }
    }
    PrivacyUtils.prototype.isPrivacyUnsafeElementType = function (domElement) {
        if (domElement.nodeType === NodeType.Element && domElement.tagName) {
            //https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Editable_content
            if (this.removeInputValues && this.jQuery(domElement).attr('contenteditable') === 'true') {
                return true;
            }
            var tagName = ElementUtils.getLowerCaseTagName(domElement);
            if (this.removeInputValues && tagName === 'textarea') {
                return true;
            }
            else if (tagName === 'input') {
                var type = (domElement['type'] || '').toLowerCase();
                if (this.jQuery.inArray(type, this.allowedInputTypes) !== -1) {
                    return false;
                }
                return true;
            }
        }
        return false;
    };
    /**
     * Traverse whole object and filter CreditCard-like values
     */
    PrivacyUtils.prototype.filterCreditCard = function (value, ignoreSet) {
        if (ignoreSet === void 0) { ignoreSet = {}; }
        //todo: ask security (add iban? 9 digits?)
        if (value) {
            var valueType = typeof value;
            if (valueType === 'object') {
                if (typeof value.length === 'number' && !value.propertyIsEnumerable('length')) {
                    //array
                    for (var i = value.length - 1; i >= 0; i--) {
                        value[i] = this.filterCreditCard(value[i]);
                    }
                }
                else {
                    //object
                    for (var key in value) {
                        if (value.hasOwnProperty(key) && !ignoreSet[key]) {
                            value[key] = this.filterCreditCard(value[key]);
                        }
                    }
                }
            }
            else if (valueType === 'string' && value.length >= 12) {
                if (PrivacyUtils.isCreditCard(value)) {
                    return null;
                }
            }
            else if (valueType === 'number' && value >= 99999999999) {
                //filter if over 12 digits
                return null;
            }
        }
        return value;
    };
    PrivacyUtils.isCreditCard = function (value) {
        return value.length >= 12 && this.creditCardRegex.test(value); //check if credit card if over 12 digits
    };
    PrivacyUtils.prototype.shouldCensorText = function (parents, element) {
        if (this.censorAllText) {
            return true;
        }
        if (this.censorshipMethodsProvider.hasCensorshipRules()) {
            parents = parents || this.elementParentsGetter.getFromElement(element);
            return this.censorshipMethodsProvider.provide(parents)['removeTextValues']; //todo: extract type
        }
        return false;
    };
    PrivacyUtils.creditCardRegex = /(?:[\s\xA0-]{0,5}\d{4,}){3}/;
    return PrivacyUtils;
}());
AbraDi.registerClass('Abra:PrivacyUtils', PrivacyUtils, 'wmjQuery, Abra:CensorshipMethodsProvider, Abra:ElementParentsGetter, FeaturesManager, Abra:DataCollectionSettingsWrapper');
var StatisticsUtils = /** @class */ (function () {
    function StatisticsUtils() {
    }
    StatisticsUtils.prototype.gamble = function (chance) {
        return Math.random() <= chance;
    };
    return StatisticsUtils;
}());
AbraDi.registerClass('Abra:StatisticsUtils', StatisticsUtils);
/**
 * A wrapper for the Walkme-Player JSON
 */
var WalkmeJsonWrap = /** @class */ (function () {
    function WalkmeJsonWrap(walkmeCommonUtils) {
        this.walkmeCommonUtils = walkmeCommonUtils;
    }
    WalkmeJsonWrap.prototype.stringify = function (value) {
        return this.walkmeCommonUtils.toJSON(value);
    };
    WalkmeJsonWrap.prototype.parse = function (text) {
        return this.walkmeCommonUtils.secureEvalJSON(text);
    };
    return WalkmeJsonWrap;
}());
AbraDi.registerClass('Abra:JSON', WalkmeJsonWrap, 'CommonUtils');
/**
 * This was previously named "session_id"
 * todo: we need to figure out if we need to create new window id for each new walkme session.
 * (we did it for the session_id, this might be unnecessary now)
 */
var WindowIdGetter = /** @class */ (function () {
    function WindowIdGetter(storageManager, promiseManager, guidGenerator, sessionPersister, jQuery) {
        var _this = this;
        this.storageManager = storageManager;
        this.promiseManager = promiseManager;
        this.guidGenerator = guidGenerator;
        this.sessionPersister = sessionPersister;
        this.jQuery = jQuery;
        this.libCallback = function () { return _this.createNew(); };
    }
    WindowIdGetter.prototype.load = function () {
        this.jQuery(AbraMain.WalkmeInternals).on(WindowIdGetter.LibNewSessionEventName, this.libCallback);
        /**
         * If we have new Walkme session, we change the windowId
         */
        if (this.sessionPersister.isNewSession()) {
            return this.promiseManager.resolve(this.createNew());
        }
        return this.getOrCreate();
    };
    WindowIdGetter.prototype.unload = function () {
        this.jQuery(AbraMain.WalkmeInternals).off(WindowIdGetter.LibNewSessionEventName, this.libCallback);
    };
    WindowIdGetter.prototype.getOrCreate = function () {
        var _this = this;
        return this.get().then(function (windowId) {
            return windowId || _this.createNew();
        });
    };
    WindowIdGetter.prototype.get = function () {
        var _this = this;
        return new this.promiseManager.Promise(function (resolve) {
            _this.storageManager.getStorage().getData(WindowIdGetter.WindowIdStorageKey, undefined, undefined, function (windowId) {
                resolve(windowId);
            });
        });
    };
    WindowIdGetter.prototype.createNew = function () {
        var windowId = this.guidGenerator.generateGuid(true);
        this.storageManager.getStorage().saveData(WindowIdGetter.WindowIdStorageKey, windowId);
        return windowId;
    };
    WindowIdGetter.WindowIdStorageKey = '__WMML_SESSION_ID__';
    WindowIdGetter.LibNewSessionEventName = 'NewSession';
    return WindowIdGetter;
}());
AbraDi.registerClass('Abra:WindowIdGetter', WindowIdGetter, 'Abra:StorageManager, PromiseManager, GuidGenerator, SessionPersister, wmjQuery');
/**
 * A wrapper for the Walkme-Player Logger ("CustomerLog")
 * doc: https://knowledge.walkme.com/display/RD/Customer+Log
 * enable client logs with: WalkMeAPI.log.enable(5).track('Abra');
 */
var WalkmeLoggerWrap = /** @class */ (function () {
    function WalkmeLoggerWrap(walkmeLogger) {
        this.customerLog = walkmeLogger.wrapCustomerLog('Abra');
    }
    WalkmeLoggerWrap.prototype.error = function (message, error) {
        this.logError(1, message, error);
    };
    WalkmeLoggerWrap.prototype.warn = function (message, error) {
        this.logError(2, message, error);
    };
    WalkmeLoggerWrap.prototype.info = function (message) {
        this.log(3, message);
    };
    WalkmeLoggerWrap.prototype.debug = function (message) {
        this.log(4, message);
    };
    WalkmeLoggerWrap.prototype.logError = function (level, message, error) {
        var errorString = (error && error.stack) || (error && error.length ? error : '');
        this.customerLog("".concat(message, ": ").concat(errorString), level);
    };
    WalkmeLoggerWrap.prototype.log = function (level, message) {
        this.customerLog(message, level);
    };
    return WalkmeLoggerWrap;
}());
/// <reference path="./walkme-logger-wrap.ts"/>
var Logger = /** @class */ (function (_super) {
    __extends(Logger, _super);
    function Logger(serverLogger, ubtPerformance, walkmeLogger, walkMeInfo, featuresManager, wmjQuery) {
        var _this = _super.call(this, walkmeLogger) || this;
        _this.serverLogger = serverLogger;
        _this.ubtPerformance = ubtPerformance;
        _this.walkmeLogger = walkmeLogger;
        _this.walkMeInfo = walkMeInfo;
        _this.featuresManager = featuresManager;
        _this.wmjQuery = wmjQuery;
        _this.enableServerLogger = true;
        try {
            _this.libVersion = walkMeInfo.getLibVersion();
            if (featuresManager.isFeatureEnabled('UbtReduceServerLogs') && Math.random() > 0.05) {
                _this.enableServerLogger = false;
            }
            if (AbraDi.getCtx().has('CleanObject')) {
                _this.cleanObject = AbraDi.getCtx().get('CleanObject');
            }
        }
        catch (error) {
            // ignored
        }
        return _this;
    }
    Logger.registerLogger = function (ctx) {
        var AbraLoggerCtxName = 'Abra:Logger';
        if (!ctx.has(AbraLoggerCtxName)) {
            ctx.register(AbraLoggerCtxName).asCtor(Logger).dependencies('EventSenderErrorLogger, Abra:UbtPerformance, Logger, WalkMeInfo, FeaturesManager, wmjQuery');
        }
        return ctx.get(AbraLoggerCtxName);
    };
    Logger.prototype.error = function (message, error, extraData) {
        if (extraData === void 0) { extraData = {}; }
        extraData.app = AbraMain.App.name;
        extraData.version = AbraMain.App.version;
        extraData.rev = AbraMain.App.rev;
        extraData.libVersion = this.libVersion;
        if (error) {
            if (typeof error === 'string') {
                extraData.errorMsg = error;
            }
            else if (error.message || error.stack || error.extraData) {
                extraData.errorMsg = error.message;
                extraData.stack = error.stack;
                extraData = error.extraData ? this.wmjQuery.extend(extraData, error.extraData) : extraData;
            }
        }
        if (extraData.errorMsg === undefined && error !== undefined) {
            extraData.errorMsg = 'could not get errorMsg, error type is "' + typeof error + '"';
        }
        if (this.cleanObject) {
            extraData = this.cleanObject(extraData);
        }
        this.enableServerLogger && this.serverLogger.logError(message, extraData);
        _super.prototype.error.call(this, message, error);
    };
    Logger.prototype.perf = function (key) {
        return this.ubtPerformance.perf(key);
    };
    return Logger;
}(WalkmeLoggerWrap));
var UbtPerformance = /** @class */ (function () {
    function UbtPerformance(performanceLogger) {
        this.performanceLogger = performanceLogger;
        this.perfOptions = this.createPerfOptions();
    }
    UbtPerformance.prototype.createPerfOptions = function () {
        return {
            extraData: {
                app: AbraMain.App.name,
                version: AbraMain.App.version,
                gitRevision: AbraMain.App.rev
            }
        };
    };
    UbtPerformance.prototype.perf = function (key) {
        var serverPerf = this.performanceLogger.measure("".concat(AbraMain.App.name, "-").concat(key), this.perfOptions);
        return {
            stop: function () { return serverPerf && serverPerf.stop(); },
            step: function (name) { } //eslint-disable-line @typescript-eslint/no-empty-function
        };
    };
    return UbtPerformance;
}());
var DataCollectionSettingsWrapper = /** @class */ (function () {
    function DataCollectionSettingsWrapper(logger, jQuery, statisticsUtils) {
        this.logger = logger;
        this.settings = {};
        if (AbraDi.getCtx().has('DataCollectionSettings')) {
            var settings = AbraDi.getCtx().get('DataCollectionSettings').get();
            this.settings = jQuery.extend(true, {}, settings);
            statisticsUtils.gamble(1 / 50) && this.validateSettings(this.settings);
        }
        this.settings.element = this.settings.element || {};
        this.applyCensorshipDefaults();
        this.applyXpathDefaults();
    }
    DataCollectionSettingsWrapper.prototype.validateSettings = function (rawSettings) {
        if (!(rawSettings.element || rawSettings.page || rawSettings.loading)) {
            this.logger.error('Collection settings are missing, using default');
        }
    };
    DataCollectionSettingsWrapper.prototype.applyCensorshipDefaults = function () {
        this.settings.element.censorshipRules = this.settings.element.censorshipRules || [];
        this.settings.element.censorshipRules.push({
            type: 'classInElementTree',
            values: ['jaco-hide', 'wm-hide'],
            methods: ['removeTextValues']
        });
    };
    DataCollectionSettingsWrapper.prototype.applyXpathDefaults = function () {
        this.settings.element.xpath = this.settings.element.xpath || {};
        this.settings.element.xpath.classMaxLength = this.settings.element.xpath.classMaxLength || 35;
        this.settings.element.xpath.idMaxLength = this.settings.element.xpath.idMaxLength || 40;
        this.settings.element.xpath.attributeMaxLength = this.settings.element.xpath.attributeMaxLength || 300;
        this.settings.element.xpath.xpathMaxLength = this.settings.element.xpath.xpathMaxLength || 3000;
    };
    DataCollectionSettingsWrapper.prototype.get = function () {
        return this.settings;
    };
    return DataCollectionSettingsWrapper;
}());
AbraDi.registerClass('Abra:DataCollectionSettingsWrapper', DataCollectionSettingsWrapper, 'Abra:Logger, wmjQuery, Abra:StatisticsUtils');
/* This code should be part of the data-lib */
var UrlCensorshipController = /** @class */ (function () {
    function UrlCensorshipController(dataCollectionSettings, featuresManager) {
        this.dataCollectionSettings = dataCollectionSettings;
        this.featuresManager = featuresManager;
        this.result = undefined;
    }
    UrlCensorshipController.prototype.shouldCensorUrl = function () {
        if (this.result === undefined) {
            this.result = this.checkCollectionSettings() || this.checkLegacyFlags();
        }
        return this.result;
    };
    UrlCensorshipController.prototype.checkCollectionSettings = function () {
        var collectionSettins = this.dataCollectionSettings.get();
        return !!(collectionSettins && collectionSettins.page && collectionSettins.page.censorship && collectionSettins.page.censorship.url);
    };
    UrlCensorshipController.prototype.checkLegacyFlags = function () {
        return this.featuresManager.isFeatureEnabled('disableWidgetOpenFullUrl') || this.featuresManager.isFeatureEnabled('dontSendPageUrl');
    };
    return UrlCensorshipController;
}());
AbraDi.registerClass('Abra:UrlCensorshipController', UrlCensorshipController, 'Abra:DataCollectionSettingsWrapper, FeaturesManager');
var LibStorageWrapper = /** @class */ (function () {
    function LibStorageWrapper(storage) {
        this.storage = storage;
    }
    LibStorageWrapper.prototype.getData = function (key, defaultValue, userGuid, callback) {
        this.storage.sessionGetData(key, defaultValue, userGuid, callback);
    };
    LibStorageWrapper.prototype.saveData = function (key, value) {
        this.storage.sessionSetData(key, value);
    };
    return LibStorageWrapper;
}());
var SessionStorageWrapper = /** @class */ (function () {
    function SessionStorageWrapper() {
    }
    SessionStorageWrapper.prototype.getData = function (key, defaultValue, userGuid, callback) {
        callback(sessionStorage[key] || defaultValue);
    };
    SessionStorageWrapper.prototype.saveData = function (key, value) {
        sessionStorage[key] = value;
    };
    return SessionStorageWrapper;
}());
var UbtStorageManager = /** @class */ (function () {
    function UbtStorageManager(walkme) {
        this.walkme = walkme;
        if (this.isCrossDomain()) {
            this.storage = new LibStorageWrapper(this.walkme.getClientStorageManager());
        }
        else {
            this.storage = new SessionStorageWrapper();
        }
    }
    UbtStorageManager.prototype.isCrossDomain = function () {
        var storageType = this.walkme.getStorageType();
        if (storageType.indexOf('crossdomain') !== -1) {
            return true;
        }
        return false;
    };
    UbtStorageManager.prototype.getStorage = function () {
        return this.storage;
    };
    return UbtStorageManager;
}());
AbraDi.registerClass('Abra:StorageManager', UbtStorageManager, 'Abra:Walkme');
var StorageSynchronizer = /** @class */ (function () {
    function StorageSynchronizer(promiseManager, storageManager) {
        this.promiseManager = promiseManager;
        this.storageManager = storageManager;
    }
    // TODO: fix this - it will not work on page refresh (will not send events saved in storage from iframes)
    StorageSynchronizer.prototype.getStorageKey = function () {
        var _this = this;
        return new this.promiseManager.Promise(function (resolve) {
            // this prevents iframes from using the same storage key and causing conflicts
            if (FrameUtils.isIframe()) {
                _this.storageManager.getStorage().getData(StorageSynchronizer.StorageNumberKey, 1, undefined, function (storageNum) {
                    _this.storageManager.getStorage().saveData(StorageSynchronizer.StorageNumberKey, Number(storageNum) + 1);
                    resolve('wm-dc-storage' + storageNum);
                });
            }
            else {
                resolve('wm-dc-storage' + 0);
            }
        });
    };
    StorageSynchronizer.StorageNumberKey = '__WMML_STORAGE_NUM__';
    return StorageSynchronizer;
}());
AbraDi.registerClass('Abra:StorageSynchronizer', StorageSynchronizer, 'PromiseManager, Abra:StorageManager');
var EventPropertiesMaxLength = /** @class */ (function () {
    function EventPropertiesMaxLength() {
    }
    EventPropertiesMaxLength.Value = {
        element: {
            autoQuery: 500,
            text: 500,
            value: 120
        },
        ctx: {
            topTitle: 512
        }
    };
    return EventPropertiesMaxLength;
}());
var StringBuilder = /** @class */ (function () {
    function StringBuilder() {
        this.buffer = [];
    }
    StringBuilder.prototype.append = function (data) {
        this.buffer.push(data);
    };
    StringBuilder.prototype.toString = function () {
        var text = this.buffer.join('');
        return text;
    };
    return StringBuilder;
}());
/**
 * https://stackoverflow.com/questions/31986614/what-is-a-surrogate-pair
 */
var SurrogatePairsUtils = /** @class */ (function () {
    function SurrogatePairsUtils() {
    }
    SurrogatePairsUtils.escapeSurrogatePairs = function (str) {
        if (!SurrogatePairsUtils.containsSurrogatePair(str))
            return str;
        // Loop over each code unit in the string and escape it
        var index = -1;
        var length = str.length;
        var result = new StringBuilder();
        while (++index < length) {
            var character = str.charAt(index);
            if (!/[\uD800-\uDBFF]/.test(character) && !/[\uDC00-\uDFFF]/.test(character)) {
                result.append(character);
            }
            else {
                result.append(SurrogatePairsUtils.escapeChar(character));
            }
        }
        return result.toString();
    };
    SurrogatePairsUtils.containsSurrogatePair = function (str) {
        var surrogatePairs = /[\uD800-\uDBFF][\uDC00-\uDFFF]/g;
        return surrogatePairs.exec(str) != null;
    };
    SurrogatePairsUtils.escapeChar = function (pchar) {
        var charCode = pchar.charCodeAt(0);
        var hexadecimal = charCode.toString(16).toUpperCase();
        var longhand = hexadecimal.length > 2;
        var escaped = '\\' + (longhand ? 'u' : 'x') + ('0000' + hexadecimal).slice(longhand ? -4 : -2);
        return escaped;
    };
    return SurrogatePairsUtils;
}());
var TextUtils = /** @class */ (function () {
    function TextUtils(privacyUtils) {
        this.privacyUtils = privacyUtils;
    }
    TextUtils.substringObject = function (config, value) {
        if (config && value && typeof value === 'object') {
            for (var key in config) {
                if (config.hasOwnProperty(key) && value.hasOwnProperty(key)) {
                    var propType = typeof value[key];
                    if (propType === 'string' && typeof config[key] === 'number') {
                        value[key] = value[key].substring(0, config[key]);
                    }
                    else if (propType === 'object') {
                        value[key] = TextUtils.substringObject(config[key], value[key]);
                    }
                }
            }
        }
        return value;
    };
    TextUtils.trim = function (str, maxStringLength) {
        if (maxStringLength !== undefined) {
            return str
                .replace(/^[\s\uFEFF\xA0]+/g, '')
                .substr(0, maxStringLength)
                .replace(/[\s\uFEFF\xA0]+$/g, '');
        }
        return str.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');
    };
    /* Handles new-line, carrige-return, tab, space */
    TextUtils.removeExtraSpaces = function (str) {
        var whiteSpaceRegex = /\s+/g;
        return str.replace(whiteSpaceRegex, ' ').trim();
    };
    TextUtils.extractElementText = function (domElement) {
        var text = domElement.nodeValue;
        if (text) {
            text = TextUtils.removeExtraSpaces(text);
            text = SurrogatePairsUtils.escapeSurrogatePairs(text);
        }
        return text;
    };
    TextUtils.prototype.collectText = function (domElement, options) {
        var context = { textBuffer: [], totalLength: 0, active: true };
        this.collectTextInner(domElement, options, context);
        var retValue = context.textBuffer.join('\n'); //flat array to string
        if (options.maxLength !== undefined && retValue.length > options.maxLength) {
            retValue = retValue.substring(0, options.maxLength);
        }
        return retValue;
    };
    TextUtils.prototype.collectTextInner = function (domElement, options, context) {
        if (domElement && !this.privacyUtils.isPrivacyUnsafeElementType(domElement)) {
            if (ElementUtils.isElementTextNode(domElement)) {
                var nodeText = TextUtils.extractElementText(domElement);
                if (nodeText && nodeText.length !== 0) {
                    if (options.maxNodeTextLength !== undefined) {
                        nodeText = nodeText.substring(0, options.maxNodeTextLength);
                    }
                    var textFilteredOut = false;
                    if (options.textFilterCb !== undefined) {
                        textFilteredOut = options.textFilterCb(nodeText, domElement.nodeValue) !== true;
                    }
                    if (textFilteredOut === false) {
                        context.textBuffer.push(nodeText);
                        context.totalLength += nodeText.length;
                        if ((options.maxLength !== undefined && context.totalLength >= options.maxLength) || options.collectFirstOnly === true) {
                            context.active = false;
                        }
                    }
                }
            }
            var ignoreElementChildNodes = false;
            if (options.includeNonVisual !== true) {
                ignoreElementChildNodes = ElementUtils.isVisualDomElement(domElement) === false;
            }
            if (domElement.childNodes && context.active && ignoreElementChildNodes === false) {
                for (var i = 0, l = domElement.childNodes.length; i < l && context.active; i++) {
                    this.collectTextInner(domElement.childNodes[i], options, context);
                }
            }
        }
    };
    //https://stackoverflow.com/questions/3115150/how-to-escape-regular-expression-special-characters-using-javascript
    TextUtils.escapeRegExp = function (text) {
        return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
    };
    TextUtils.escapeJQuerySelectorAttributeValue = function (text) {
        return text.replace(this.escapeJQuerySelectorAttributeValueRegex, '\\"');
    };
    TextUtils.escapeJQuerySelectorAttributeValueRegex = /"/g;
    return TextUtils;
}());
AbraDi.registerClass('Abra:TextUtils', TextUtils, 'Abra:PrivacyUtils');
var TimingUtils = /** @class */ (function () {
    function TimingUtils(timerManager, errorUtils) {
        this.timerManager = timerManager;
        this.errorUtils = errorUtils;
        this.enabled = true;
    }
    TimingUtils.prototype.clearTimeout = function (timer) {
        if (timer) {
            timer.clear();
        }
    };
    TimingUtils.prototype.disable = function () {
        this.enabled = false;
    };
    /**
     * cleared on `removeWalkme`
     */
    TimingUtils.prototype.setTimeout = function (callback, time) {
        var _this = this;
        if (this.enabled) {
            return this.timerManager.libSetTimeout(function () { return _this.enabled && _this.errorUtils.wrapCallAndLog(callback, 'timeout'); }, time);
        }
    };
    TimingUtils.prototype.createOnNextEventLoopFunc = function (callback) {
        var _this = this;
        return function () {
            _this.timerManager.libSetTimeout(callback, 0);
        };
    };
    /**
     * Alternative for the non-ie8-compatible Date.Now()
     */
    TimingUtils.now = function () {
        return new Date().getTime();
    };
    TimingUtils.getTimingData = function () {
        // see: https://developer.mozilla.org/en-US/docs/Web/API/PerformanceTiming
        var perf = window.performance;
        var timing = perf && perf.timing;
        if (timing) {
            var navStart = timing.navigationStart;
            var loadEnd = timing.loadEventEnd;
            return {
                navStart: navStart,
                loadTime: loadEnd - navStart
            };
        }
    };
    return TimingUtils;
}());
AbraDi.registerClass('Abra:TimingUtils', TimingUtils, 'TimerManager, Abra:ErrorUtils');
var ReusableTimerFactory = /** @class */ (function () {
    function ReusableTimerFactory(timingUtils) {
        this.timingUtils = timingUtils;
    }
    ReusableTimerFactory.prototype.create = function (callback, delay) {
        return new ReusableTimer(this.timingUtils, callback, delay);
    };
    return ReusableTimerFactory;
}());
AbraDi.registerClass('Abra:ReusableTimerFactory', ReusableTimerFactory, 'Abra:TimingUtils');
var ReusableTimer = /** @class */ (function () {
    function ReusableTimer(timingUtils, callback, delay) {
        this.timingUtils = timingUtils;
        this.callback = callback;
        this.delay = delay;
    }
    ReusableTimer.prototype.clear = function () {
        if (this.timerHandle) {
            this.timingUtils.clearTimeout(this.timerHandle);
            this.timerHandle = undefined;
        }
    };
    ReusableTimer.prototype.set = function () {
        this.clear();
        this.timerHandle = this.timingUtils.setTimeout(this.callback, this.delay);
    };
    return ReusableTimer;
}());
var NodeType;
(function (NodeType) {
    NodeType[NodeType["Element"] = 1] = "Element";
    NodeType[NodeType["Text"] = 3] = "Text";
    NodeType[NodeType["CDATASection"] = 4] = "CDATASection";
    NodeType[NodeType["DocumentType"] = 9] = "DocumentType";
    NodeType[NodeType["Document"] = 10] = "Document";
    NodeType[NodeType["DocumentFragment"] = 11] = "DocumentFragment";
})(NodeType || (NodeType = {}));
/**
 * Important: do not change the existing values, this enum is saved into druid / presto
 */
var EventReason;
(function (EventReason) {
    EventReason[EventReason["TrackedEvent"] = 1] = "TrackedEvent";
    EventReason[EventReason["Sampling"] = 2] = "Sampling";
})(EventReason || (EventReason = {}));
var EventSampler = /** @class */ (function () {
    function EventSampler(statisticsUtils, insightsConfigurationGetter) {
        this.statisticsUtils = statisticsUtils;
        this.isEnabledFlag = false;
        this.chance = 0;
        var configuration = insightsConfigurationGetter.getSync();
        var sampleRate;
        if (configuration && configuration.trackedEventsWhitelist && configuration.trackedEventsWhitelist.settings) {
            sampleRate = configuration.trackedEventsWhitelist.settings.sampleRate;
        }
        if (typeof sampleRate === 'number' && sampleRate > 0) {
            this.chance = 1 / sampleRate;
            this.isEnabledFlag = true;
        }
    }
    EventSampler.prototype.shouldSample = function () {
        return this.isEnabledFlag && this.statisticsUtils.gamble(this.chance);
    };
    EventSampler.prototype.isEnabled = function () {
        return this.isEnabledFlag;
    };
    return EventSampler;
}());
AbraDi.registerClass('Abra:EventSampler', EventSampler, 'Abra:StatisticsUtils, Abra:InsightsConfigurationGetter');
/// <reference path="../typings/events/event-reason.ts"/>
var TrackedElementsFilter = /** @class */ (function () {
    function TrackedElementsFilter(jQuery, trackedElementsGetter, eventSampler, logger) {
        this.jQuery = jQuery;
        this.trackedElementsGetter = trackedElementsGetter;
        this.eventSampler = eventSampler;
        this.logger = logger;
    }
    TrackedElementsFilter.prototype.shouldSend = function (event, desc, xpathParts) {
        var eventType = event.getEventType();
        if (eventType !== 'mousedown' && eventType !== 'change' && eventType !== 'dblclick') {
            return TrackedElementsFilter.Results.Collect;
        }
        var whitelist = this.trackedElementsGetter.get(eventType);
        if (!whitelist && !this.eventSampler.isEnabled()) {
            return TrackedElementsFilter.Results.Collect;
        }
        if (whitelist && this.isWhitelistConditionsApply(event, desc, xpathParts, whitelist)) {
            return TrackedElementsFilter.Results.TrackedEvent;
        }
        else if (this.eventSampler.shouldSample()) {
            return TrackedElementsFilter.Results.Sampling;
        }
        return TrackedElementsFilter.Results.DoNotCollect;
    };
    TrackedElementsFilter.prototype.isWhitelistConditionsApply = function (event, desc, xpathParts, whitelist) {
        SelectorsOptimizator.prepareOptimizationObject(whitelist);
        var wlPerf = this.logger.perf('whitelist filter');
        wlPerf.step('ids and classes');
        for (var i = xpathParts.length - 1; i >= 0; i--) {
            var part = xpathParts[i];
            if (part.id) {
                if (whitelist.ids && whitelist.ids[part.id]) {
                    return true;
                }
                if (whitelist._selectorsOptimization && whitelist._selectorsOptimization.usedInSelectors.ids && whitelist._selectorsOptimization.usedInSelectors.ids[part.id] !== undefined) {
                    whitelist._selectorsOptimization.existInXpath.ids[whitelist._selectorsOptimization.usedInSelectors.ids[part.id]] = true;
                }
            }
            for (var j = 0; j < part.classes.length; j++) {
                if (whitelist.classes && whitelist.classes[part.classes[j]]) {
                    return true;
                }
                if (whitelist._selectorsOptimization && whitelist._selectorsOptimization.usedInSelectors.classes && whitelist._selectorsOptimization.usedInSelectors.classes[part.classes[j]] !== undefined) {
                    whitelist._selectorsOptimization.existInXpath.classes[whitelist._selectorsOptimization.usedInSelectors.classes[part.classes[j]]] = true;
                }
            }
            if (whitelist._selectorsOptimization && whitelist._selectorsOptimization.usedInSelectors.tags && whitelist._selectorsOptimization.usedInSelectors.tags[part.tagName] !== undefined) {
                whitelist._selectorsOptimization.existInXpath.tags[whitelist._selectorsOptimization.usedInSelectors.tags[part.tagName]] = true;
            }
            if (whitelist._selectorsOptimization && whitelist._selectorsOptimization.usedInSelectors.attributes) {
                for (var j = 0; j < part.attributes.length; j++) {
                    if (whitelist._selectorsOptimization.usedInSelectors.attributes[part.attributes[j].key] !== undefined) {
                        whitelist._selectorsOptimization.existInXpath.attributes[whitelist._selectorsOptimization.usedInSelectors.attributes[part.attributes[j].key]] = true;
                    }
                }
            }
        }
        wlPerf.step('text');
        if (desc && desc.text && whitelist.text && whitelist.text[desc.text]) {
            return true;
        }
        wlPerf.step('labels');
        if (desc && desc.label && whitelist.labels && whitelist.labels[desc.label]) {
            return true;
        }
        wlPerf.step('selectors');
        if (whitelist.selectors) {
            var parents = void 0;
            for (var i = 0; i < whitelist.selectors.length; i++) {
                if (whitelist.selectors[i] && SelectorsOptimizator.shouldRunSelector(whitelist, i)) {
                    parents = parents || this.prepareParents(event.getParents());
                    try {
                        for (var j = parents.length - 1; j >= 0; j--) {
                            if (parents[j].is(whitelist.selectors[i])) {
                                return true;
                            }
                        }
                    }
                    catch (error) {
                        whitelist.selectors[i] = null; // remove bad selectors
                    }
                }
            }
        }
        wlPerf.stop();
        return false;
    };
    TrackedElementsFilter.prototype.prepareParents = function (parents) {
        var _this = this;
        return this.jQuery(parents.slice(-TrackedElementsFilter.SelectorsMaxParents))
            .map(function (index, element) { return _this.jQuery(element); })
            .get();
    };
    TrackedElementsFilter.SelectorsMaxParents = 50;
    TrackedElementsFilter.Results = {
        DoNotCollect: { result: false },
        Collect: { result: true },
        TrackedEvent: { result: true, reason: EventReason.TrackedEvent },
        Sampling: { result: true, reason: EventReason.Sampling }
    };
    return TrackedElementsFilter;
}());
AbraDi.registerClass('Abra:TrackedElementsFilter', TrackedElementsFilter, 'wmjQuery, Abra:TrackedElementsGetter, Abra:EventSampler, Abra:Logger');
var TrackedElementsGetter = /** @class */ (function () {
    function TrackedElementsGetter(insightsConfigurationGetter) {
        this.insightsConfigurationGetter = insightsConfigurationGetter;
    }
    TrackedElementsGetter.prototype.get = function (eventType) {
        var configuration = this.insightsConfigurationGetter.getSync();
        if (configuration) {
            var whitelist = configuration.trackedEventsWhitelist;
            if (whitelist) {
                switch (eventType) {
                    case 'change':
                        return whitelist.inputs || {};
                    default:
                        return whitelist.clicks || {};
                }
            }
        }
        return null;
    };
    return TrackedElementsGetter;
}());
AbraDi.registerClass('Abra:TrackedElementsGetter', TrackedElementsGetter, 'Abra:InsightsConfigurationGetter');
var SelectorsOptimizator = /** @class */ (function () {
    function SelectorsOptimizator() {
    }
    /**
     * clean the existing object, or create a new one if does not exists
     */
    SelectorsOptimizator.prepareOptimizationObject = function (whitelistMap) {
        if (!whitelistMap || !whitelistMap.selectorsComponents || !whitelistMap.selectorsComponents.symbols || !whitelistMap.selectorsComponents.usage)
            return;
        if (!whitelistMap._selectorsOptimization) {
            whitelistMap._selectorsOptimization = this.createOptimizationObject(whitelistMap);
        }
        else {
            for (var i = 0; i < SelectorsOptimizator.ComponentTypes.length; i++) {
                SelectorsOptimizator.resetArray(whitelistMap._selectorsOptimization.existInXpath[SelectorsOptimizator.ComponentTypes[i]]);
            }
        }
    };
    SelectorsOptimizator.shouldRunSelector = function (whitelistMap, selectorIndex) {
        if (!whitelistMap._selectorsOptimization)
            return true; // if there is no optimization, run all
        for (var i = 0; i < SelectorsOptimizator.ComponentTypes.length; i++) {
            var componentType = SelectorsOptimizator.ComponentTypes[i];
            var usedValues = whitelistMap.selectorsComponents.usage[componentType] && whitelistMap.selectorsComponents.usage[componentType][selectorIndex];
            if (usedValues && whitelistMap._selectorsOptimization.existInXpath[componentType]) {
                for (var j = 0; j < usedValues.length; j++) {
                    if (!whitelistMap._selectorsOptimization.existInXpath[componentType][usedValues[j]])
                        return false;
                }
            }
        }
        return true;
    };
    SelectorsOptimizator.createOptimizationObject = function (whitelistMap) {
        var selectorsOptimization = {
            usedInSelectors: {},
            existInXpath: {}
        };
        for (var i = 0; i < SelectorsOptimizator.ComponentTypes.length; i++) {
            var componentType = SelectorsOptimizator.ComponentTypes[i];
            if (whitelistMap.selectorsComponents.symbols[componentType]) {
                selectorsOptimization.usedInSelectors[componentType] = ObjectUtils.convertArrayToValueIndexMap(whitelistMap.selectorsComponents.symbols[componentType]);
                selectorsOptimization.existInXpath[componentType] = this.createCompareArray(whitelistMap.selectorsComponents.symbols[componentType].length);
            }
        }
        return selectorsOptimization;
    };
    SelectorsOptimizator.createCompareArray = function (length) {
        var result = [];
        for (var i = 0; i < length; i++) {
            result.push(false);
        }
        return result;
    };
    SelectorsOptimizator.resetArray = function (array) {
        if (!array)
            return;
        for (var i = 0; i < array.length; i++) {
            array[i] = false;
        }
    };
    SelectorsOptimizator.ComponentTypes = ['ids', 'classes', 'attributes', 'tags'];
    return SelectorsOptimizator;
}());



/***/ }),

/***/ 359:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

module.exports = function create(options) {
	var jqueryGetter = new (__webpack_require__(617))(options);
	var jQueryProxy = new (__webpack_require__(604))(jqueryGetter, options);
	return jQueryProxy;
};



/***/ }),

/***/ 617:
/***/ (function(module) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

module.exports = JQueryGetter;

function JQueryGetter(options) {
	this.getJQuery = getJQuery;

	function getJQuery(element) {
		if (options.jquery) {
			return options.jquery;
		}
		if (options.getJQuery) {
			return options.getJQuery(element);
		}
		var win = getWindow(element);
		return win && win.wmjQuery;
	}

	function getFnName(winProvider) {
		if (options.fnName) {
			return options.fnName;
		}
		if (winProvider) {
			if (winProvider.getLibWrappedWindow) {
				return 'getLibWrappedWindow';
			}
			if (winProvider.getLibWindow) {
				return 'getLibWindow';
			}
		}
	}

	function getWindow(element) {
		if (options.winProvider) {
			var fnName = getFnName(options.winProvider);
			return options.winProvider[fnName](element);
		}
		return window;
	}
}


/***/ }),

/***/ 604:
/***/ (function(module) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

module.exports = JQueryProxy;

function JQueryProxy(jqueryGetter, options) {
	this.isEnabled = function() {
		try {
			return options.featuresService && options.featuresService.isEnabled("jQueryProxy");
		} catch (ex) {
			return false;
		}
	};

	this.jqProxyProp = function(element, prop) {
		if (this.isEnabled()) {
			var jQuery = jqueryGetter.getJQuery(element);
		    if (jQuery && jQuery['fnHelpers']) {
		        return jQuery['fnHelpers'][prop](element);
			}
	    }
        return element[prop];
	};
	
	this.parentNode = function(element) {
		return this.jqProxyProp(element, 'parentNode');
	};
	
	this.firstElementChild = function(element) {
		return this.jqProxyProp(element, 'firstElementChild');
	};

	this.childNodes = function(element) {
		return this.jqProxyProp(element, 'childNodes');
	};
	
	this.previousSibling = function(element) {
		return this.jqProxyProp(element, 'previousSibling');
	};
};


/***/ }),

/***/ 977:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

var createPluginEntry = (__webpack_require__(853)/* .createPluginEntry */ .mJ);

module.exports = createPluginEntry(function(registerPlugin) {
    var WmPluginAbra = (__webpack_require__(269)/* .WmPluginAbra */ .q);

    registerPlugin(new WmPluginAbra());
});



/***/ }),

/***/ 269:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

var getCtx = (__webpack_require__(853)/* .getCtx */ .yK);

function WmPluginAbra() {
	this.run = run;

	function run() {
		return (__webpack_require__(486).start)(getCtx());;
	}
}

exports.q = WmPluginAbra;



/***/ }),

/***/ 853:
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

/***/ 619:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

(function(scope, factory){
	if ( true && typeof module.exports === "object" ){
		module.exports = factory;
	} else {
		scope.queryGenerator = factory;
}}(this, function(jQuery, jQueryProxy) {
/// <reference path="jquery.d.ts" />
var QueryGenerator;
(function (QueryGenerator) {
    var tagsToIgnore = ["DIV", "SPAN", "HTML", "BODY", "TR", "TD"];
    var illegalChars = ["'"];
    var SimpleNLP = __webpack_require__(599);
    SimpleNLP.setJQuery(jQuery);
    function generate(element) {
        var parents = extractParents(element);
        var all = [element[0]].concat(parents);
        var matches = jQuery.map(all, getTagSelector);
        var details = filter(matches, function (t) { return t !== null; });
        var narrowed = narrowToFirstId(details);
        narrowed = narrowed.reverse();
        var selectors = jQuery.map(narrowed, tagInfoToSelectorString);
        var selector = selectors.join(" ");
        return isLegal(selector) ? selector : undefined;
    }
    QueryGenerator.generate = generate;
    function modifyAutoQuery(currentAutoQuery, isIgnoreId, elementId) {
        if (!currentAutoQuery) {
            return currentAutoQuery;
        }
        var segmentSeparationRegex = /^((.+) )*(([^\[]+)(\[id=".*"\])?)$/;
        var matchResult = currentAutoQuery.match(segmentSeparationRegex);
        var entireQueryWithoutLastSegment = matchResult[1] || '';
        var lastSegmentWithoutId = matchResult[4];
        var modifiedAutoQuery = entireQueryWithoutLastSegment + lastSegmentWithoutId;
        if (!isIgnoreId && elementId && SimpleNLP.isPhraseHuman(elementId)) {
            modifiedAutoQuery += '[id="' + elementId + '"]';
        }
        return modifiedAutoQuery;
    }
    QueryGenerator.modifyAutoQuery = modifyAutoQuery;
    function isLegal(selector) {
        if (!selector || !selector.length) {
            return false;
        }
        for (var i = 0; i < illegalChars.length; i++) {
            if (selector.indexOf(illegalChars[i]) >= 0) {
                return false;
            }
        }
        return true;
    }
    function extractParents(jelement, jcontext) {
        var currentParent = jQueryProxy.parentNode(jelement[0]);
        var context = jcontext && jcontext[0] && jQueryProxy.parentNode(jcontext[0]);
        var parentsArray = [];
        var i = 0;
        for (; currentParent && currentParent.nodeType == 1 && currentParent != context; currentParent = jQueryProxy.parentNode(currentParent)) {
            parentsArray.push(currentParent);
        }
        return parentsArray;
    }
    function filter(array, match) {
        var arr = [];
        for (var i = 0; i < array.length; ++i) {
            var arrItem = array[i];
            if (match(arrItem)) {
                arr.push(arrItem);
            }
        }
        return arr;
    }
    function tagInfoToSelectorString(info) {
        var selector = info.tagName;
        if (info.id) {
            selector += '[id="' + info.id + '"]';
        }
        return selector;
    }
    function narrowToFirstId(infoList) {
        var firstIdIndex = infoList.length;
        for (var i = 0; i < infoList.length; i++) {
            var currentTag = infoList[i];
            // There is no meaning for more than one id
            if (currentTag.id) {
                firstIdIndex = i;
                break;
            }
        }
        var narrowed = infoList.slice(0, firstIdIndex + 1);
        return narrowed;
    }
    function extractElementId(element) {
        var id = element.attr('id');
        if (id) {
            if (SimpleNLP.isPhraseHuman(id)) {
                return id;
            }
        }
        return null;
    }
    function getTagSelector(theElement, index) {
        var jelem = jQuery(theElement);
        var id = extractElementId(jelem);
        var tagName = jelem[0].tagName;
        var tagTypeIsIgnored = jQuery.inArray(tagName, tagsToIgnore) >= 0;
        var isMainElement = (index === 0);
        var tagIsImportant = isMainElement || id || !tagTypeIsIgnored;
        if (!tagIsImportant)
            return null;
        var res = {
            tagName: tagName,
            id: id
        };
        //var classSelector = getClassSelector(element);
        //selector += classSelector;
        return res;
    }
})(QueryGenerator || (QueryGenerator = {}));
	return QueryGenerator;
}));


/***/ }),

/***/ 599:
/***/ (function(module) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

/*! wm-simple-nlp - v1.0.9 - 2019-02-17
* Copyright (c) 2019 WalkMe; Licensed ISC */
var SimpleNLP;
(function (SimpleNLP) {
    var alphabetRegex = /[a-zA-Z]/, numericRegex = /[0-9]/; //these regexes are used on strings with a single char only
    var _jq;
    var CharCategory;
    (function (CharCategory) {
        CharCategory[CharCategory["Digit"] = 0] = "Digit";
        CharCategory[CharCategory["Alphabet"] = 1] = "Alphabet";
        CharCategory[CharCategory["Other"] = 2] = "Other";
    })(CharCategory || (CharCategory = {}));
    function setJQuery(jquery) {
        _jq = jquery;
    }
    SimpleNLP.setJQuery = setJQuery;
    function isPhraseHuman(phrase) {
        var classifier = new SentanceClassifier();
        var sentance = new Sentence(phrase);
        var res = classifier.isHuman(sentance);
        return res;
    }
    SimpleNLP.isPhraseHuman = isPhraseHuman;
    function categorizeChar(c) {
        if (alphabetRegex.test(c))
            return CharCategory.Alphabet;
        if (numericRegex.test(c))
            return CharCategory.Digit;
        return CharCategory.Other;
    }
    var Sentence = (function () {
        function Sentence(raw) {
            this.words = [];
            this.raw = raw;
            this.buildWords();
        }
        Sentence.prototype.buildWords = function () {
            this.splitCategories();
        };
        Sentence.prototype.addWord = function (word) {
            var _this = this;
            word = _jq.trim(word);
            if (!word) {
                return;
            }
            else if (categorizeChar(word[0]) !== CharCategory.Alphabet) {
                this.words.push(word);
            }
            else {
                var parts = this.splitCamelCase(word);
                _jq.each(parts, function (i, sub) { return _this.words.push(sub.toLowerCase()); });
            }
        };
        Sentence.prototype.splitCamelCase = function (word) {
            var withSpcae = word.replace(/([a-z](?=[A-Z]))/g, '$1 ');
            var parts = withSpcae.split(' ');
            return parts;
        };
        Sentence.prototype.splitCategories = function () {
            var lastCategory = categorizeChar(this.raw[0]);
            var i = 0;
            var sub;
            for (var j = 0; j < this.raw.length; j++) {
                var c = this.raw[j];
                var currentCategory = categorizeChar(c);
                if (currentCategory != lastCategory) {
                    sub = this.raw.substring(j, i);
                    this.addWord(sub);
                    i = j;
                    lastCategory = currentCategory;
                }
            }
            sub = this.raw.substring(i, j + 1);
            this.addWord(sub);
        };
        return Sentence;
    }());
    SimpleNLP.Sentence = Sentence;
    var MAX_REPEATED_CONSONANT = 5;
    var WordClassifier = (function () {
        function WordClassifier() {
            var _this = this;
            this.WHITE_LIST = ['html', 'css', 'btn', 'js', 'http', 'a'];
            this.VOWELS = 'aeiou';
            this.pointers = {};
            this.pointers[CharCategory.Alphabet] = function (x) { return _this.alphabetPred(x); };
            this.pointers[CharCategory.Digit] = function (x) { return _this.numberPred(x); };
            this.pointers[CharCategory.Other] = function (x) { return _this.otherPred(x); };
        }
        WordClassifier.prototype.numberPred = function (word) {
            //return word.length === 1 || (word.length === 2 && word[0] === '0');
            return false;
        };
        WordClassifier.prototype.otherPred = function (word) {
            return true;
        };
        WordClassifier.prototype.alphabetPred = function (word) {
            var consonantCount = 0;
            for (var i = 0; i < word.length; i++) {
                var c = word[i];
                if (this.VOWELS.indexOf(c) == -1) {
                    consonantCount++;
                }
                else {
                    consonantCount = 0;
                }
                if (consonantCount >= MAX_REPEATED_CONSONANT)
                    return false;
            }
            return true;
        };
        WordClassifier.prototype.isHuman = function (word) {
            if (this.contains(this.WHITE_LIST, word))
                return true;
            var cat = categorizeChar(word[0]);
            var pred = this.pointers[cat];
            var res = pred(word);
            return res;
        };
        WordClassifier.prototype.contains = function (arr, item) {
            return _jq.inArray(item, arr) !== -1;
        };
        return WordClassifier;
    }());
    SimpleNLP.WordClassifier = WordClassifier;
    var SentanceClassifier = (function () {
        function SentanceClassifier() {
        }
        SentanceClassifier.prototype.isHuman = function (sent) {
            if (sent.raw.length <= 2)
                return false;
            if (this.isUrl(sent))
                return false;
            var classifier = new WordClassifier();
            var parts = _jq.map(sent.words, function (word, i) { return classifier.isHuman(word); });
            var allTrue = this.all(parts);
            return allTrue;
        };
        SentanceClassifier.prototype.all = function (arr) {
            for (var i = arr.length - 1; i >= 0; i--) {
                if (!arr[i]) {
                    return false;
                }
            }
            return true;
        };
        SentanceClassifier.prototype.isUrl = function (sent) {
            var isUrl = (sent.raw.indexOf('/') == 0) ||
                (sent.raw.indexOf('http') == 0);
            return isUrl;
        };
        return SentanceClassifier;
    }());
    SimpleNLP.SentanceClassifier = SentanceClassifier;
})(SimpleNLP || (SimpleNLP = {}));
module.exports = SimpleNLP;



/***/ }),

/***/ 142:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

var main = __webpack_require__(464);

function Encoder(json){
    Encoder.prototype.encode = function encode(obj){
        var encoded = main.encode(json.stringify(obj));
        return { _enc: encoded };
    }
}

module.exports = {
    Encoder: Encoder
}


/***/ }),

/***/ 464:
/***/ (function(module) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

var mask = 31;

function encode(str) {
	var charCodeArray = [], x;

	for(var i = str.length-1; i >= 0; i--) {
		x = str.charCodeAt(i);
		charCodeArray.push(((~(x&mask))&mask) | (x&(~mask)));
	}

	return String.fromCharCode.apply(null, charCodeArray); 
}

module.exports = {
	decode: encode,
	encode: encode
};


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
/******/ 	var __webpack_exports__ = __webpack_require__(326);
/******/ 	wmbundle = __webpack_exports__;
/******/ 	
/******/ })()
;
/* WalkMe Module */ return wmbundle; })
//# sourceMappingURL=bundle.js.map
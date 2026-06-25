/* WalkMe Module */ typeof _walkmeInternals !== 'undefined' && _walkmeInternals.wmloader && _walkmeInternals.wmloader.define('wm-plugin-success-factors-api@1.2.0-rc.4@prelib', {"name":"wm-plugin-success-factors-api","version":"1.2.0-rc.4","toolbelt":"2.0.2","packageDate":"2026-02-11T07:52:19.193Z","entry":"prelib"}, function (__wmplugin__) {  
var wmbundle;
/******/ (function() { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 914:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

module.exports = __webpack_require__(974);



/***/ }),

/***/ 527:
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

/***/ 78:
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


/***/ }),

/***/ 974:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

(function(scope, factory){
    if ( true && typeof module.exports === "object" ){
        module.exports = factory;
    }
    else {
        scope.successFactorsApiPlugin = factory;
    }
}(this, function(getLego){
	var Lego = getLego();
	var ctx = Lego.ctx;
	var di = Lego.di;

__webpack_require__(78)(getLego);

/// <reference path="../node_modules/wm-plugins-core/plugins/iplugin.ts"/>
/// <reference path="../node_modules/wm-plugins-core/definitions/globals.d.ts"/>
/// <reference path="userMetadataProvider.ts"/>
/// <reference path="Interface/IWindow.ts"/>
/// <reference path="Interface/IODataApi.ts"/>
/// <reference path="Interface/IQueryParams.ts"/>
/// <reference path="Interface/IUserMetadata.ts"/>
/// <reference path="Interface/IUserMetadataProvider.ts"/>
var ODataApi = /** @class */ (function () {
    function ODataApi(userMetadataProvider) {
        this._userMetadata = userMetadataProvider.get() || {};
    }
    ODataApi.prototype.getUserPermissions = function () {
        var params = {
            entity: 'checkUserPermissions',
            filter: ''
        };
        return this.query(params).then(function (data) { return data; });
    };
    ODataApi.prototype.getUserRoles = function () {
        var params = {
            entity: 'getUserRolesByUserId',
            filter: "userId eq '" + this._userMetadata.encodedUserId + "'"
        };
        return this.query(params).then(function (data) { return data.d.results; });
    };
    ODataApi.prototype.getUserData = function (selectParams) {
        var params = {
            entity: 'User',
            filter: "userId eq '" + this._userMetadata.encodedUserId + "'",
            select: selectParams
        };
        return this.query(params).then(function (data) {
            return data.d.results && data.d.results.length ? data.d.results[0] : '';
        });
    };
    ODataApi.prototype.query = function (params) {
        var isPermissionsCheck = params.entity === 'checkUserPermissions';
        var queryUrl;
        if (isPermissionsCheck) {
            queryUrl = this._userMetadata.baseUrl + '/odata/v2/checkUserPermissions?includeLegacy=true';
        }
        else {
            queryUrl = params.queryUrl || this._userMetadata.baseUrl + '/odata/v2/' + params.entity;
            queryUrl += '?$format=json';
            queryUrl += params.filter ? '&$filter=' + params.filter : '';
            queryUrl += params.expand ? '&$expand=' + params.expand : '';
            queryUrl += params.select ? '&$select=' + params.select : '';
        }
        if (params.customQueries) {
            for (var key in params.customQueries) {
                var customQuery = params.customQueries[key];
                queryUrl += '&' + customQuery.field + '=' + customQuery.value;
            }
        }
        var userPermmissionsPayload = {
            "userid": this._userMetadata.userId,
            "username": "",
            "email": "",
            "permissions": [
                {
                    "type": "rbp_admin",
                    "string_value": "rbp_role_edit",
                    "long_value": -1
                },
                {
                    "type": "genai_access_admin_permissions",
                    "string_value": "genai_admin_permission",
                    "long_value": -1
                },
                {
                    "type": "sys_admin",
                    "string_value": "employee_files_sys_admin",
                    "long_value": -1
                },
                {
                    "type": "sys_admin",
                    "string_value": "company_system_and_logo_sys_admin",
                    "long_value": -1
                },
                {
                    "type": "user_admin",
                    "string_value": "add_new_user",
                    "long_value": -1
                },
                {
                    "type": "user_admin",
                    "string_value": "rehire_with_new_employment_from_hire_match",
                    "long_value": -1
                },
                {
                    "type": "user_admin",
                    "string_value": "rehire_inactive_employee_from_hire_match",
                    "long_value": -1
                },
                {
                    "type": "form_admin",
                    "string_value": "form_templates_form_admin",
                    "long_value": -1
                },
                {
                    "type": "compensation_admin",
                    "string_value": "manage_plans_compensation_admin",
                    "long_value": -1
                },
                {
                    "type": "compensation_admin",
                    "string_value": "update_plans_for_template_compensation_admin",
                    "long_value": -1
                },
                {
                    "type": "sys_admin",
                    "string_value": "monitor_job_selfservice_permission",
                    "long_value": -1
                },
                {
                    "type": "sys_admin",
                    "string_value": "manage_job_selfservice_permission",
                    "long_value": -1
                },
            ]
        };
        return Lego.ctx.create('Promise', function (resolve, reject) {
            wmjQuery.ajax({
                url: queryUrl,
                type: isPermissionsCheck ? 'POST' : 'GET',
                contentType: 'application/json',
                data: isPermissionsCheck ? JSON.stringify(userPermmissionsPayload) : '',
                xhrFields: {
                    withCredentials: true
                },
                success: function (data) {
                    resolve(data);
                },
                error: function (data) {
                    reject(data);
                }
            });
        });
    };
    return ODataApi;
}());
Lego.ctx.register('ODataApi').asCtor(ODataApi).dependencies('UserMetadataProvider');

/// <reference path="../node_modules/wm-plugins-core/plugins/iplugin.ts"/>
/// <reference path="../node_modules/wm-plugins-core/definitions/globals.d.ts"/>
/// <reference path="oDataApi.ts"/>
/// <reference path="Interface/ISfLogger.ts"/>
/// <reference path="Interface/IODataCache.ts"/>
/// <reference path="Interface/ISfCommonUtils.ts"/>
var ODataCache = /** @class */ (function () {
	function ODataCache(sfCommonUtils, sfLogger, eventsListener) {
		var _this = this;
		this._commonUtils = sfCommonUtils;
		this._sfLogger = sfLogger;
		this._eventsListener = eventsListener;
		this._initCachePromise = Lego.ctx.create('Promise', function (resolve) {
			_this.init();
			_this._sfLogger.info('OData Cache is now active');
			resolve();
		});
	}
	ODataCache.prototype.init = function () {
		this._sfLogger.info('OData Cache init');
		this._clientStorageManager = Lego.ctx.get('ClientStorageManager');
	};
	ODataCache.prototype.get = function () {
		var _this = this;
		return Lego.ctx.create('Promise', function (resolve) {
			_this._initCachePromise.then(function () {
				var result = _this.getDataFromCache();
				resolve(result);
			});
		});
	};
	ODataCache.prototype.getDataFromCache = function () {
		var cacheObject = this._clientStorageManager.getData(this.keyName());
		if (!this.isInCache(cacheObject)) {
			this._sfLogger.info('ODCache - Object not found in cache.');
			return null;
		}
		// Returns value from cache also if its too old,
		// However if its too old in the meanwhile get data from server and updates the variable when have the data
		return cacheObject[ODataCache.ODATA_CACHE_VALUE_STORAGE_KEY];
	};
	ODataCache.prototype.isInCache = function (cacheObject) {
		return cacheObject && cacheObject[ODataCache.ODATA_CACHE_VALUE_STORAGE_KEY];
	};
	ODataCache.prototype.set = function (sfObject) {
		var _this = this;
		return Lego.ctx.create('Promise', function (resolve) {
			_this._initCachePromise.then(function () {
				_this.setData(sfObject);
				resolve();
			});
		});
	};
	ODataCache.prototype.setData = function (sfObject) {
		this._clientStorageManager.saveData(this.keyName(), this.createCacheObject(sfObject), ODataCache.CACHE_ITEM_EXPIRY);
	};
	ODataCache.prototype.keyName = function () {
		return ODataCache.ODATA_CACHE_STORAGE_KEY;
	};
	ODataCache.prototype.createCacheObject = function (sfObject) {
		var cacheObject = {};
		cacheObject[ODataCache.ODATA_CACHE_TIMESTAMP_STORAGE_KEY] = new Date().getTime();
		cacheObject[ODataCache.ODATA_CACHE_VALUE_STORAGE_KEY] = sfObject;
		return cacheObject;
	};
	ODataCache.CACHE_ITEM_EXPIRY = 4 * 60 * 60 * 1000;
	ODataCache.ODATA_CACHE_STORAGE_KEY = 'wm-odata-cache';
	ODataCache.ODATA_CACHE_VALUE_STORAGE_KEY = 'v';
	ODataCache.ODATA_CACHE_TIMESTAMP_STORAGE_KEY = 'ts';
	return ODataCache;
})();
Lego.ctx.register('ODataCache').asCtor(ODataCache).dependencies('SfCommonUtils, SfLogger, EventsListener');

Lego.ctx.register('SuccessFactorsApiVersion').asInstance('1.2.0-rc.4');

/// <reference path="../node_modules/wm-plugins-core/plugins/iplugin.ts"/>
/// <reference path="../node_modules/wm-plugins-core/definitions/globals.d.ts"/>
/// <reference path="Interface/IWindow.ts"/>
/// <reference path="Interface/IProvider.ts"/>
/// <reference path="Interface/ISfLogger.ts"/>
/// <reference path="Interface/IODataApi.ts"/>
/// <reference path="Interface/IODataCache.ts"/>
/// <reference path="Interface/ISfCommonUtils.ts"/>
/// <reference path="Interface/IUserMetadataProvider.ts"/>
var ApiProvider = /** @class */ (function () {
    function ApiProvider(promiseManager, oDataApi, oDataCache, userMetadataProvider, sfLogger, sfCommonUtils, eventsListener) {
        this._fieldsToGetFromUserData = ['country', 'defaultLocale'];
        this._sfLogger = sfLogger;
        this._oDataCache = oDataCache;
        this._commonUtils = sfCommonUtils;
        this._promiseManager = promiseManager;
        this._eventsListener = eventsListener;
        this._oDataApiService = oDataApi;
        this._userMetadataProvider = userMetadataProvider;
    }
    ApiProvider.prototype.loadData = function () {
        var loadDataPromise = this.shouldUseCacheIfValid() ? this.getObject() : this.getObjectFromServer();
        return loadDataPromise;
    };
    ApiProvider.prototype.shouldUseCacheIfValid = function () {
        var result = window.location && location.href && (location.href.indexOf('/home') > -1 || location.href.indexOf('/start') > -1);
        if (result) {
            this._sfLogger.info('On home page, not using cache');
        }
        else {
            this._sfLogger.info('not on home page, using cache');
        }
        return !result;
    };
    ApiProvider.prototype.getObject = function () {
        var _this = this;
        this._sfLogger.info('Getting OData. Trying cache than server.');
        return this.getObjectFromCache()['catch'](function () {
            _this._sfLogger.info('Error retrieving from cache. Requesting from server');
            return _this.getObjectFromServer();
        });
    };
    ApiProvider.prototype.getObjectFromCache = function () {
        var _this = this;
        var getObjectFromCachePromise = Lego.ctx.create('Promise', function (resolve, reject) {
            _this._oDataCache.get().then(function (resValFromCache) {
                if (!resValFromCache) {
                    _this._sfLogger.info('Value not found in cache, rejecting.');
                    reject();
                }
                resolve(resValFromCache);
            });
        });
        return getObjectFromCachePromise;
    };
    ApiProvider.prototype.getObjectFromServer = function () {
        var _this = this;
        var getObjectFromServerPromise = Lego.ctx.create('Promise', function (resolve, reject) {
            var objectPartsArray = [_this.getCompanyId(), _this.getUserData(), _this.getUserRoles(), _this.getUserPermissions()];
            _this._promiseManager
                .all(objectPartsArray)
                .then(function (objectPartsResultsArray) {
                var resultObj = _this._commonUtils.mergeArrOfObjsToObj(objectPartsResultsArray);
                if (_this._commonUtils.objectKeys(resultObj).length > 0) {
                    resolve(resultObj);
                }
                else {
                    reject('could not retrieve any data');
                }
            })
                .catch(function (err) {
                err = err || 'Failed retrieving the user segmentation object from server.';
                _this._sfLogger.error(err);
                reject(err);
            });
        });
        getObjectFromServerPromise.then(function (res) {
            return _this.saveDataToCache(res);
        });
        return getObjectFromServerPromise;
    };
    ApiProvider.prototype.getCompanyId = function () {
        var _this = this;
        return Lego.ctx.create('Promise', function (resolve, reject) {
            var companyId = (_this._userMetadataProvider.get() || {}).companyId;
            if (companyId) {
                resolve({ companyId: companyId });
            }
            else {
                _this._sfLogger.error('companyId not found in user metadata', { errorType: 'oDataServerQuery' });
                reject();
            }
        });
    };
    ApiProvider.prototype.getUserInfo = function () {
        var userMetaData = this._userMetadataProvider.get() || {};
        return {
            userId: userMetaData.userId,
            userFirstName: userMetaData.userFirstName,
            userLastName: userMetaData.userLastName,
            userFullName: userMetaData.userFullName,
            id: userMetaData.userId
        };
    };
    ApiProvider.prototype.getUserPermissions = function () {
        var _this = this;
        return Lego.ctx.create('Promise', function (resolve) {
            _this._oDataApiService
                .getUserPermissions()
                .then(function (userData) {
                var elements = userData.getElementsByTagName('d:checkUserPermissions');
                var data = elements[0].textContent;
                var permissions = JSON.parse(data).permissions;
                var permKeys = {
                    rbp_role_edit: false,
                    genai_admin_permission: false,
                    employee_files_sys_admin: false,
                    company_system_and_logo_sys_admin: false,
                    add_new_user: false,
                    rehire_with_new_employment_from_hire_match: false,
                    rehire_inactive_employee_from_hire_match: false,
                    form_templates_form_admin: false,
                    manage_plans_compensation_admin: false,
                    update_plans_for_template_compensation_admin: false,
                    monitor_job_selfservice_permission: false,
                    manage_job_selfservice_permission: false
                };
                permissions.forEach(function (permission) {
                    permKeys[permission.string_value] = true;
                });
                var userInf = _this.getUserInfo();
                resolve({
                    permissions: permissions,
                    permissionKeys: permKeys,
                    userInfo: userInf
                });
            })
                .catch(function (err) {
                _this._sfLogger.error(err, { errorType: 'oDataServerQuery' });
                var userInf = _this.getUserInfo();
                resolve({
                    permissions: [],
                    userInfo: userInf
                });
            });
        });
    };
    ApiProvider.prototype.getUserData = function () {
        var _this = this;
        return Lego.ctx.create('Promise', function (resolve, reject) {
            _this._oDataApiService
                .getUserData(_this._fieldsToGetFromUserData.join(','))
                .then(function (userData) {
                var result = {};
                for (var i = 0; i < _this._fieldsToGetFromUserData.length; ++i) {
                    var currentFieldName = _this._fieldsToGetFromUserData[i];
                    result[currentFieldName] = userData[currentFieldName];
                }
                resolve(result);
            })
                .catch(function (err) {
                _this._sfLogger.error(err, { errorType: 'oDataServerQuery' });
                reject();
            });
        });
    };
    ApiProvider.prototype.getUserRoles = function () {
        var _this = this;
        return Lego.ctx.create('Promise', function (resolve, reject) {
            _this._oDataApiService
                .getUserRoles()
                .then(function (roles) {
                if (!roles) {
                    _this._sfLogger.error('No roles returned from getUserRoles');
                    reject();
                }
                var res = {
                    roleIDs: _this.createObjFromArray(roles.map(function (role) { return role.roleId; })),
                    roleNames: _this.createObjFromArray(roles.map(function (role) { return role.roleName; })),
                    roles: roles.map(function (role) {
                        return {
                            id: role.roleId,
                            name: role.roleName
                        };
                    })
                };
                resolve(res);
            })
                .catch(function (err) {
                _this._sfLogger.error(err, { errorType: 'oDataServerQuery' });
                reject();
            });
        });
    };
    ApiProvider.prototype.createObjFromArray = function (arr) {
        var obj = {};
        for (var key in arr) {
            var item = arr[key];
            obj[item] = true;
        }
        return obj;
    };
    ApiProvider.prototype.saveDataToCache = function (objectToSave) {
        this._oDataCache.set(objectToSave);
        this._sfLogger.info('Saving object to cache', { object: objectToSave });
        return this._promiseManager.resolve(objectToSave);
    };
    return ApiProvider;
}());
Lego.ctx
    .register('ApiProvider')
    .asCtor(ApiProvider)
    .dependencies('PromiseManager, ODataApi, ODataCache, UserMetadataProvider, SfLogger, SfCommonUtils, EventsListener');

/// <reference path="../node_modules/wm-plugins-core/plugins/iplugin.ts"/>
/// <reference path="../node_modules/wm-plugins-core/definitions/globals.d.ts"/>
/// <reference path="Interface/IWindow.ts"/>
/// <reference path="Interface/IProvider.ts"/>
/// <reference path="Interface/ISfLogger.ts"/>
/// <reference path="Interface/ISfCommonUtils.ts"/>
/// <reference path="Interface/IUserMetadata.ts"/>
/// <reference path="Interface/IProviderFactory.ts"/>
/// <reference path="Interface/IUserMetadataProvider.ts"/>
/// <reference path="Interface/ISuccessfactorsMultilanguageManager.ts"/>
var wait = __webpack_require__(527)(Lego.ctx);
var SuccessFactors = /** @class */ (function () {
    function SuccessFactors() {
        this._provider = null;
        this._shouldRemoveLibLoaded = false;
        this._sfLogger = Lego.ctx.get('SfLogger');
        this._commonUtils = Lego.ctx.get('SfCommonUtils');
        this._eventsListener = Lego.ctx.get('EventsListener');
        this._promiseManager = Lego.ctx.get('PromiseManager');
        this._multilanguageManager = Lego.ctx.get('SuccessfactorsMultilanguageManager');
        this._messenger = Lego.ctx.get('Messenger');
    }
    SuccessFactors.prototype.run = function () {
        this._eventsListener.on('wm_walkmeLibLoaded', function () { return Lego.ctx.get('PasteDecorator').decorateText(); });
        Lego.ctx.get('NameODataListener');
        if (window.top == window) {
            return this.parentLogic();
        }
        else {
            return this.childLogic();
        }
    };
    SuccessFactors.prototype.childLogic = function () {
        var _this_1 = this;
        return new Promise(function (resolve) {
            function handleLanguageRequest(event) {
                try {
                    var data_1 = /*allowFunc*/ JSON.parse(event.data);
                    if (typeof data_1.lang !== 'undefined') {
                        window.walkme_get_language = function () { return data_1.lang; };
                    }
                    window.wmSuccessFactors = data_1.oData;
                    window.pageHeaderJsonData = data_1.pageHeaderJsonData;
                }
                catch (e) {
                    this._sfLogger.info('Error on child initialization: ', oData);
                }
                finally {
                    resolve();
                }
            }
            window.addEventListener('message', handleLanguageRequest);
            _this_1._messenger.requestLang();
        });
    };
    SuccessFactors.prototype.parentLogic = function () {
        var _this_1 = this;
        this._multilanguageManager.handleInitialLanguage();
        this._eventsListener.on('WalkMeReady', function () {
            _this_1._sfLogger.disableECLogsSession();
        });
        var that = this;
        wait.registerFunction(function (config) {
            var userMetaData = Lego.ctx.get('UserMetadataProvider').get();
            Lego.ctx.get('PasteDecorator').decorateText();
            _this_1._provider = Lego.ctx.get('ProviderFactory').getProvider(userMetaData);
            if (!_this_1._provider) {
                _this_1._sfLogger.error('No provider found to load end user info, loading walkme', { success: false, errorType: 'general' });
                return null;
            }
            return _this_1._provider
                .loadData()
                .catch(function (error) {
                _this_1._sfLogger.error('Error loading data from SF API', { success: false, errorType: 'general' });
            })
                .then(function (oData) {
                // Set the oData as a segmentation var to the window
                _this_1._commonUtils.setODataToWindow(oData);
                _this_1._sfLogger.info('data set on window', { success: true });
                _this_1._sfLogger.info('Loading WalkMe with user segmentations', oData);
                _this_1.addCrossdomainIframeListeners(oData);
                _this_1.broadcastData(oData);
            });
        });
        return new Promise(function (resolve) {
            var start = new Date().getTime();
            (function retry(left) {
                if (left > 0) {
                    if (!window.pageHeaderJsonData) {
                        that._sfLogger.info('data set on window', { success: true });
                        setTimeout(function () {
                            retry(--left);
                        }, 100);
                    }
                    else {
                        var end = new Date().getTime();
                        that._sfLogger.info("Waited ".concat(end - start, " for pageHeaderJsonData to be present"), { success: true });
                        resolve();
                    }
                }
                else {
                    that._sfLogger.error('pageHeaderJsonData is not present');
                    resolve();
                }
            })(20);
        });
    };
    SuccessFactors.prototype.addCrossdomainIframeListeners = function (oData) {
        var _this = this;
        window.addEventListener('message', function (event) {
            if (event.source !== window.self)
                _this.broadcastData(oData, event.source);
        });
    };
    SuccessFactors.prototype.broadcastData = function (oData, target) {
        var _a;
        try {
            if (((_a = target === null || target === void 0 ? void 0 : target.document) === null || _a === void 0 ? void 0 : _a.visibilityState) === 'hidden')
                return;
        }
        catch (error) {
            this._sfLogger.info('iFrame is CD Iframe, not checking visibility');
        }
        var lang = (window.walkme_get_language && window.walkme_get_language()) || '';
        var pageHeaderJsonData = window.pageHeaderJsonData;
        if (!target)
            this._messenger.broadcast({ lang: lang, oData: oData, pageHeaderJsonData: pageHeaderJsonData });
        else
            this._messenger.send({ lang: lang, oData: oData, pageHeaderJsonData: pageHeaderJsonData }, target);
    };
    return SuccessFactors;
}());

/// <reference path="../../node_modules/wm-plugins-core/plugins/iplugin.ts"/>
/// <reference path="../../node_modules/wm-plugins-core/definitions/globals.d.ts"/>
/// <reference path="../Interface/ICookieUtils.ts"/>
/// <reference path="../Interface/ISfLogger.ts"/>
/// <reference path="../Interface/IUserMetadata.ts"/>
/// <reference path="../Interface/IUserMetadataProvider.ts"/>
var SfLogger = /** @class */ (function () {
	function SfLogger(prelibLogger, successFactorsApiVersion, cookieUtils) {
		this._logger = prelibLogger;
		this._cookieUtils = cookieUtils;
		this._pluginVersion = successFactorsApiVersion;
		this._eventsListener = Lego.ctx.get('EventsListener');
	}
	SfLogger.prototype.init = function () {
		this.log('SfLogger init');
		this._walkMeInfo = Lego.ctx.get('WalkMeInfo');
		this._isNoServerLogsFeatureEnabled = this.isNoServerLogsFeatureEnabled();
	};
	SfLogger.prototype.log = function (msg) {
		this._logger.write('[ WM SuFaAPI ] ' + msg);
	};
	SfLogger.prototype.isNoServerLogsFeatureEnabled = function () {
		var result = Lego.ctx.get('SiteConfigManager').get().Features.indexOf(SfLogger.NO_SERVER_LOGS_FEATURE_NAME) > -1;
		result
			? this.log('SfLogger Feature:' + SfLogger.SERVER_LOGS_FEATURE_NAME + ' detected, writing logs to client and server')
			: this.log('SfLogger Feature:' + SfLogger.SERVER_LOGS_FEATURE_NAME + ' not detected, write client logs only');
		return result;
	};
	SfLogger.prototype.info = function (msg, extraData) {
		this.log(msg);
	};
	SfLogger.prototype.error = function (data, extraData) {
		var message = this.extractMessageString(data);
		extraData = this.addExtraDataForError(data, extraData);
		this.log('error: ' + message);
		this.sendLog(message, 'error', extraData);
	};
	SfLogger.prototype.extractMessageString = function (data) {
		var result = 'unexpected error during REST call';
		if (typeof data == 'string') {
			result = data;
		} else if (data && data.message) {
			result = data.message;
		}
		return result;
	};
	SfLogger.prototype.sendLog = function (msg, level, extraData) {
		if (this.shouldSendServerLogs()) {
			extraData = this.addGeneralExtraData(level, extraData);
			Lego.ctx.get('EventSenderErrorLogger').logError(msg, extraData);
		}
	};
	SfLogger.prototype.shouldSendServerLogs = function () {
		var result = !this._isNoServerLogsFeatureEnabled && Lego.ctx.has('EventSenderErrorLogger') && !this.isDisableServerLogsCookieEnabled();
		return result;
	};
	SfLogger.prototype.isDisableServerLogsCookieEnabled = function () {
		return !!this._cookieUtils.getCookie(SfLogger.DISABLE_SERVER_LOGS_COOKIE_KEY);
	};
	SfLogger.prototype.addExtraDataForError = function (data, extraErrorData) {
		extraErrorData = extraErrorData || {};
		extraErrorData.userMetadata = extraErrorData.userMetadata;
		if (typeof data === 'object') {
			extraErrorData.data = data;
		}
		return extraErrorData;
	};
	SfLogger.prototype.addGeneralExtraData = function (level, extraData) {
		extraData = extraData || {};
		extraData.level = level;
		extraData.plugin = 'successFactorsApi';
		extraData.sfapiVer = this._pluginVersion;
		extraData.snippetEnv = this._walkMeInfo && this._walkMeInfo.getEnvironmentId();
		return extraData;
	};
	SfLogger.prototype.disableECLogsSession = function () {
		if (this.isDisableServerLogsCookieEnabled()) {
			return;
		}
		this._cookieUtils.setCookie(SfLogger.DISABLE_SERVER_LOGS_COOKIE_KEY, '1', SfLogger.TEN_MINUTES_IN_SECONDS);
	};
	SfLogger.DISABLE_SERVER_LOGS_COOKIE_KEY = 'wm-sf-decl';
	SfLogger.TEN_MINUTES_IN_SECONDS = 10 * 60;
	SfLogger.SERVER_LOGS_FEATURE_NAME = 'SuFaEnableServerLogs';
	return SfLogger;
})();
Lego.ctx.register('SfLogger').asCtor(SfLogger).dependencies('PrelibLogger, SuccessFactorsApiVersion, CookieUtils');

/// <reference path="../node_modules/wm-plugins-core/plugins/iplugin.ts"/>
/// <reference path="../node_modules/wm-plugins-core/definitions/globals.d.ts"/>
/// <reference path="Interface/ISfLogger.ts"/>
/// <reference path="Interface/IProvider.ts"/>
/// <reference path="Interface/IUserMetadata.ts"/>
/// <reference path="Interface/IProviderFactory.ts"/>
var ProviderFactory = /** @class */ (function () {
	function ProviderFactory(sfLogger, apiProvider, cdIframeProvider) {
		this._sfLogger = sfLogger;
		this._apiProvider = apiProvider;
		this._cdIframeProvider = cdIframeProvider;
		this._eventsListener = Lego.ctx.get('EventsListener');
	}
	ProviderFactory.prototype.getProvider = function (userMetadata) {
		var result = null;
		if (!this.isUserMetadataValid(userMetadata)) {
			// In case this we're inside successfactors and no user metadata,
			// continue load walkme without end user data.
			// this is a use case that is not supported and
			if (!this.shouldAlwaysUseCache() && !this.isThirdPartyIframe()) {
				return null;
			}
			return this._cdIframeProvider;
		}
		return this._apiProvider;
	};
	ProviderFactory.prototype.isUserMetadataValid = function (userMetaData) {
		return userMetaData && userMetaData.companyId && userMetaData.userId;
	};
	ProviderFactory.prototype.isThirdPartyIframe = function () {
		var result =
			top !== self &&
			!(window.location && window.location.origin && (window.location.origin.indexOf('sfactors') > -1 || window.location.origin.indexOf('sf.') > -1));
		result && this._sfLogger.info('third party iframe detected.');
		return result;
	};
	ProviderFactory.prototype.shouldAlwaysUseCache = function () {
		this._siteConfig = Lego.ctx.get('SiteConfigManager').get();
		var alliFramesCacheConfig = false;
		try {
			alliFramesCacheConfig = this._siteConfig.Custom.successFactorsApi.alwaysUseCache;
		} catch (e) {
			this._sfLogger.info('using cache for third party iframs only');
		}
		return alliFramesCacheConfig;
	};
	return ProviderFactory;
})();
Lego.ctx.register('ProviderFactory').asCtor(ProviderFactory).dependencies('SfLogger, ApiProvider, CDIframeProvider');

/// <reference path="../node_modules/wm-plugins-core/plugins/iplugin.ts"/>
/// <reference path="../node_modules/wm-plugins-core/definitions/globals.d.ts"/>
/// <reference path="Interface/ISfLogger.ts"/>
/// <reference path="Interface/IProvider.ts"/>
/// <reference path="Interface/IODataCache.ts"/>
/// <reference path="Interface/ISfCommonUtils.ts"/>
var CDIframeProvider = /** @class */ (function () {
	function CDIframeProvider(sfLogger, SfCommonUtils, oDataCache) {
		this._pullTryCounter = 0;
		this._utils = SfCommonUtils;
		this._sfLogger = sfLogger;
		this._oDataCache = oDataCache;
	}
	CDIframeProvider.prototype.loadData = function () {
		var _this = this;
		return Lego.ctx.create('Promise', function (resolve, reject) {
			_this.pollForStorage(resolve, reject);
		});
	};
	CDIframeProvider.prototype.pollForStorage = function (resolve, reject) {
		var _this = this;
		if (this._pullTryCounter++ > CDIframeProvider.PULL_TRY_LIMIT) {
			this._sfLogger.info('Timeout threshold reached, loading WalkMe');
			reject();
			return;
		}
		try {
			this._sfLogger.info('CD Iframe try to pull from cache, try num ' + this._pullTryCounter);
			this._oDataCache
				.get()
				.then(function (oDataCachedRes) {
					if (!!oDataCachedRes) {
						_this._sfLogger.info('CD Iframe retrived oData from cache');
						resolve(oDataCachedRes);
					} else {
						_this.retryPull(resolve, reject);
					}
				})
				['catch'](function () {
					_this.retryPull(resolve, reject);
				});
		} catch (e) {
			this.retryPull(resolve, reject);
		}
	};
	CDIframeProvider.prototype.retryPull = function (resolve, reject) {
		var _this = this;
		this._sfLogger.info('CD Iframe retry to pull again in ' + CDIframeProvider.PULL_TRY_INTERVAL);
		this._utils.setTimeout(function () {
			_this.pollForStorage(resolve, reject);
		}, CDIframeProvider.PULL_TRY_INTERVAL);
	};
	CDIframeProvider.PULL_TRY_LIMIT = 20;
	CDIframeProvider.PULL_TRY_INTERVAL = 250;
	return CDIframeProvider;
})();
Lego.ctx.register('CDIframeProvider').asCtor(CDIframeProvider).dependencies('SfLogger, SfCommonUtils, ODataCache');

/// <reference path="../../node_modules/wm-plugins-core/plugins/iplugin.ts"/>
/// <reference path="../../node_modules/wm-plugins-core/definitions/globals.d.ts"/>
/// <reference path="../Interface/ICookieUtils.ts"/>
var CookieUtils = (function () {
	function CookieUtils() {}
	CookieUtils.prototype.getCookie = function (name) {
		var i,
			x,
			y,
			cookies = document.cookie.split(';');
		for (i = 0; i < cookies.length; i++) {
			x = cookies[i].substr(0, cookies[i].indexOf('='));
			y = cookies[i].substr(cookies[i].indexOf('=') + 1);
			x = x.replace(/^\s+|\s+$/g, '');
			if (x == name) {
				return y;
			}
		}
		return null;
	};
	CookieUtils.prototype.setCookie = function (name, value, time) {
		var now = new Date();
		now.setTime(now.getTime() + time * 1000);
		document.cookie = name + '=' + value + ';expires=' + now.toUTCString() + ';path=/';
	};
	return CookieUtils;
})();
Lego.ctx.register('CookieUtils').asCtor(CookieUtils);

/// <reference path="../../node_modules/wm-plugins-core/plugins/iplugin.ts"/>
/// <reference path="../../node_modules/wm-plugins-core/definitions/globals.d.ts"/>
/// <reference path="../Interface/IWindow.ts"/>
/// <reference path="../Interface/ISfCommonUtils.ts"/>
var SfCommonUtils = /** @class */ (function () {
	function SfCommonUtils() {}
	SfCommonUtils.prototype.isString = function (obj) {
		return typeof obj === 'string' || obj instanceof String;
	};
	SfCommonUtils.prototype.mergeArrOfObjsToObj = function (objsArray) {
		var result = {};
		for (var index in objsArray) {
			for (var key in objsArray[index]) {
				result[key] = objsArray[index][key];
			}
		}
		return result;
	};
	SfCommonUtils.prototype.objectKeys = function (obj) {
		var keys = [];
		for (var key in obj) {
			keys.push(key);
		}
		return keys;
	};
	SfCommonUtils.prototype.setODataToWindow = function (oData) {
		window.wmSuccessFactors = window.wmSuccessFactors || {};
		wmjQuery.extend(window.wmSuccessFactors, oData);
	};
	SfCommonUtils.prototype.setTimeout = function (func, interval) {
		/*allowFunc*/ window.setTimeout(func, interval);
	};
	SfCommonUtils.FOUR_HOURS_IN_MILLISECONDS = 4 * 60 * 60 * 1000;
	return SfCommonUtils;
})();
Lego.ctx.register('SfCommonUtils').asCtor(SfCommonUtils);

var requestMsg = 'wm_request_lang_to_parent';

function send(msg, target) {
	var frames = typeof target == 'undefined' ? document.getElementsByTagName('iframe') : [target];

	for (var i = 0; i < frames.length; i++) {
		// send message to crossdomains only
		try {
			var doc = iframe.contentDocument || iframe.contentWindow.document;
			var html = doc.body.innerHTML;
		} catch (e) {
			frames[i].window.postMessage(/*allowFunc*/ JSON.stringify(msg), '*');
		}
	}
}

function onMessage(fn) {
	var msgCtx = window;

	msgCtx.addEventListener('message', function(event) {
		fn(event);
	});
}

function requestLang() {
	window.setTimeout(function() {
		window.top.postMessage(requestMsg, '*');
	}, 0);
}

function broadcast(msg, target) {
	if (typeof target === 'undefined') target = window;
	var frames = target.frames;
	if (!frames) return;

	for (var i = 0; i < frames.length; i++) {
		var frame = frames[i];
		send(msg, frame);

		if (frame.frames && frame.frames.length > 0) {
			broadcast(msg, frame);
		}
	}
}

Lego.ctx.register('Messenger').asInstance({
	send: send,
	onMessage: onMessage,
	requestLang: requestLang,
	broadcast: broadcast,
	consts: {
		requestMsg: requestMsg
	}
});

/// <reference path="../node_modules/wm-plugins-core/plugins/iplugin.ts"/>
/// <reference path="../node_modules/wm-plugins-core/definitions/globals.d.ts"/>
/// <reference path="Interface/IWindow.ts"/>
/// <reference path="Interface/ISfLogger.ts"/>
/// <reference path="Interface/IUserMetadata.ts"/>
/// <reference path="Interface/IUserMetadataProvider.ts"/>
var UserMetadataProvider = /** @class */ (function () {
    function UserMetadataProvider(sfLogger) {
        this._sfLogger = sfLogger;
    }
    UserMetadataProvider.prototype.get = function () {
        try {
            if (this._userMetadata) {
                return this._userMetadata;
            }
            var pageData = window.pageHeaderJsonData;
            if (!pageData) {
                return undefined;
            }
            this._userMetadata = {
                userId: pageData.userInfo && pageData.userInfo.id,
                baseUrl: pageData.baseUrl,
                companyId: pageData.companyId,
                userFirstName: pageData.userInfo && pageData.userInfo.firstName,
                userLastName: pageData.userInfo && pageData.userInfo.lastName,
                userFullName: pageData.userInfo && pageData.userInfo.fullName,
                encodedUserId: pageData.userInfo && pageData.userInfo.assignmentUUID
            };
            this._sfLogger.info('UserMetadataProvider userMetadata created', { userMetadata: this._userMetadata });
            return this._userMetadata;
        }
        catch (ex) {
            ex.message = "UserMetadataProvider failed to retrive userMetadata, ex.message=".concat(ex.message);
            this._sfLogger.error(ex, { userMetadata: window.pageHeaderJsonData, errorType: 'exception' });
            return undefined;
        }
    };
    return UserMetadataProvider;
}());
Lego.ctx.register('UserMetadataProvider').asCtor(UserMetadataProvider).dependencies('SfLogger');

/// <reference path="../node_modules/wm-plugins-core/plugins/iplugin.ts"/>
/// <reference path="../node_modules/wm-plugins-core/definitions/globals.d.ts"/>
/// <reference path="Interface/IWindow.ts"/>
/// <reference path="Interface/ISfLogger.ts"/>
/// <reference path="Interface/ILanguageSettings.ts"/>
/// <reference path="Interface/ISuccessfactorsMultilanguageManager.ts"/>
var SuccessfactorsMultilanguageManager = /** @class */ (function () {
    function SuccessfactorsMultilanguageManager(_sfLogger, _cookieUtils) {
        this._sfLogger = _sfLogger;
        this._cookieUtils = _cookieUtils;
        this._cachedLanguage = null;
        this._clientStorageManager = null;
    }
    SuccessfactorsMultilanguageManager.prototype.handleInitialLanguage = function () {
        if (!this.shouldRunMultiLanguage()) {
            this._sfLogger.info('Not running multilanguage');
            return;
        }
        this.setWMLanguage(this.getLanguage());
    };
    SuccessfactorsMultilanguageManager.prototype.shouldRunMultiLanguage = function () {
        return !(window._walkmeInternals && window._walkmeInternals.homePageCrawler);
    };
    SuccessfactorsMultilanguageManager.prototype.setWMLanguage = function (lang) {
        var _this = this;
        if (lang && lang.toString().toLowerCase() == '_default_')
            lang = '';
        window.walkme_get_language = function () { return _this.getLanguage(); };
    };
    SuccessfactorsMultilanguageManager.prototype.getLanguage = function () {
        if (this._cachedLanguage) {
            return this._cachedLanguage;
        }
        if (!this.getLocale()) {
            return this.getFromCache();
        }
        this._cachedLanguage = this.getSelectedLanguage();
        this.saveToCache(this._cachedLanguage);
        return this._cachedLanguage;
    };
    SuccessfactorsMultilanguageManager.prototype.getSelectedLanguage = function () {
        var language = this.sanitizeLanguageCode(this.getLocale());
        var country = window.wmSuccessFactors && window.wmSuccessFactors.country && this.sanitizeLanguageCode(window.wmSuccessFactors.country);
        return !country ? language : language + country;
    };
    SuccessfactorsMultilanguageManager.prototype.getLocale = function () {
        return (window.wmSuccessFactors && window.wmSuccessFactors.defaultLocale) || (window.pageHeaderJsonData && window.pageHeaderJsonData.userLocale);
    };
    SuccessfactorsMultilanguageManager.prototype.sanitizeLanguageCode = function (shortCode) {
        return shortCode.replace('_', '-');
    };
    SuccessfactorsMultilanguageManager.prototype.saveToCache = function (lang) {
        this._cookieUtils.setCookie('wm_sufa_lang_cache', lang, 86400);
    };
    SuccessfactorsMultilanguageManager.prototype.getFromCache = function () {
        return this._cookieUtils.getCookie('wm_sufa_lang_cache');
    };
    return SuccessfactorsMultilanguageManager;
}());
Lego.ctx.register('SuccessfactorsMultilanguageManager').asCtor(SuccessfactorsMultilanguageManager).dependencies('SfLogger, CookieUtils');

/// <reference path="../node_modules/wm-plugins-core/plugins/iplugin.ts"/>
/// <reference path="../node_modules/wm-plugins-core/definitions/globals.d.ts"/>
/// <reference path="Interface/ISfLogger.ts"/>
var PasteDecorator = /** @class */ (function () {
    function PasteDecorator(_sfLogger) {
        this._sfLogger = _sfLogger;
        this.typingSpeed = 75;
        this.categorySelector = 'ui5-search-item-group-xweb-global-header:mt_visible';
        this.suggestionSelector = 'ui5-search-item-xweb-global-header .ui5-search-item-titles-container:mt_visible';
        this.jsonSettings = null;
    }
    PasteDecorator.prototype.decorateText = function () {
        try {
            var inputGenerator = Lego.ctx.get('InputGenerator');
            var originalText_1 = inputGenerator.text;
            var _this_1 = this;
            inputGenerator.text = function text(element, txt, reactionTime, callback, step, keepFocus, shouldSubmitInput) {
                try {
                    var isDatePicker = _this_1.checkDatePicker(element[0]);
                    if (_this_1.isVega(element[0])) {
                        _this_1._sfLogger.info('Decorating text injection for Vega search bar');
                        _this_1.useSuFaSearchBarPaste(element[0], txt, callback, shouldSubmitInput);
                    }
                    else if (_this_1.checkJSONSettings('enabled') && !isDatePicker && _this_1.checkSearchBar(element[0])) {
                        _this_1._sfLogger.info('Decorating text injection for search bar');
                        return _this_1.useSuFaSearchBarPaste(element[0], txt, callback, shouldSubmitInput);
                    }
                    else if (!_this_1.checkJSONSettings('disableDatePickerTyping') && isDatePicker) {
                        _this_1._sfLogger.info('Decorating text injection for date picker typing');
                        return _this_1.simulateTyping(element[0], txt, callback);
                    }
                }
                catch (error) {
                    _this_1._sfLogger.error('Failed to decorate text injection', error);
                }
                return originalText_1(element, txt, reactionTime, callback, step, keepFocus, shouldSubmitInput);
            };
        }
        catch (error) {
            this._sfLogger.error('Failed to decorate text injection', error);
        }
    };
    PasteDecorator.prototype.isVega = function (element) {
        var isInput = this.isInput(element);
        var isVega = element.classList && element.classList.value.indexOf('ui5-search-field-inner-input') !== -1;
        return isInput && isVega;
    };
    PasteDecorator.prototype.checkDatePicker = function (element) {
        var isInput = this.isInput(element);
        var parents = wmjQuery(element).parents();
        var isDatePicker = parents.toArray().some(function (parent) { return parent.id === 'effectiveDatePicker' || parent.classList && parent.classList.value.indexOf('EffectiveDateDialog_datePicker') !== -1; });
        return isInput && isDatePicker;
    };
    PasteDecorator.prototype.checkSearchBar = function (element) {
        var defaultSeachBarCheck = element.classList.value.indexOf('ui5-input-inner') !== -1;
        var searchBarId = this.checkJSONSettings('ID');
        var searchBarSelector = this.checkJSONSettings('selector');
        var isInput = this.isInput(element);
        return isInput && (((searchBarId && element.id === searchBarId) || (searchBarSelector && this.queryElement(searchBarSelector) === element)) || (!searchBarId && defaultSeachBarCheck));
    };
    PasteDecorator.prototype.checkJSONSettings = function (value) {
        if (!this.jsonSettings) {
            var customSettings = Lego.ctx.get('SiteConfigManager').get().Custom;
            this.jsonSettings = customSettings ? customSettings.sufaSearchBarPaste : null;
        }
        if (!this.jsonSettings) {
            return false;
        }
        return this.jsonSettings[value];
    };
    PasteDecorator.prototype.useSuFaSearchBarPaste = function (element, autofillValueString, callback, enter) {
        var pasteEvent = new ClipboardEvent('paste', {
            bubbles: true,
            cancelable: true,
            clipboardData: new DataTransfer()
        });
        if (pasteEvent.clipboardData) {
            pasteEvent.clipboardData.setData('text/plain', autofillValueString);
        }
        else {
            return;
        }
        element.focus();
        element.dispatchEvent(pasteEvent);
        element.value = autofillValueString;
        var inputEvent = new InputEvent('input', { inputType: 'insertText', bubbles: true, cancelable: true });
        element.dispatchEvent(inputEvent);
        if (this.isVega(element) && this.checkJSONSettings('vega')) {
            enter && this.clickResult(callback);
        }
        else {
            enter && this.dispatchEnterEvent(element, null);
            callback && callback();
        }
    };
    PasteDecorator.prototype.simulateTyping = function (element, text, callback) {
        element.focus();
        element.value = '';
        this.dispatchInputEvent(element, 'input');
        this.typeCharacter(element, text, 0);
        this.dispatchEnterEvent(element, callback);
    };
    PasteDecorator.prototype.dispatchKeyEvent = function (el, char, eventType) {
        var keyCode = char.charCodeAt(0);
        var event = new KeyboardEvent(eventType, {
            key: char,
            keyCode: keyCode,
            which: keyCode,
            bubbles: true,
            cancelable: true
        });
        el.dispatchEvent(event);
    };
    PasteDecorator.prototype.enter = function (element, callback) {
        var enterPressProps = {
            key: 'Enter',
            keyCode: 13,
            which: 13,
            bubbles: true,
            cancelable: true
        };
        var keydownEvent = new KeyboardEvent('keydown', enterPressProps);
        element.dispatchEvent(keydownEvent);
        var keypressEvent = new KeyboardEvent('keypress', enterPressProps);
        element.dispatchEvent(keypressEvent);
        var keyupEvent = new KeyboardEvent('keyup', enterPressProps);
        element.dispatchEvent(keyupEvent);
        callback && callback();
    };
    PasteDecorator.prototype.queryElement = function (selector, returnQueryObject) {
        var _a, _b;
        if (returnQueryObject === void 0) { returnQueryObject = false; }
        if (returnQueryObject) {
            return Lego.ctx.has('JQueryElementFinder') ? (_a = Lego.ctx.get('JQueryElementFinder')) === null || _a === void 0 ? void 0 : _a.findElementsByjQueryComplexSelector(selector) : wmjQuery(selector);
        }
        return Lego.ctx.has('JQueryElementFinder') ? (_b = Lego.ctx.get('JQueryElementFinder')) === null || _b === void 0 ? void 0 : _b.findElementsByjQueryComplexSelector(selector)[0] : wmjQuery(selector)[0];
    };
    PasteDecorator.prototype.typeCharacter = function (el, text, index) {
        var _this_1 = this;
        if (index < text.length) {
            var char = text.charAt(index);
            this.dispatchKeyEvent(el, char, 'keydown');
            this.dispatchKeyEvent(el, char, 'keypress');
            el.value += char;
            this.dispatchInputEvent(el, 'input');
            this.dispatchKeyEvent(el, char, 'keyup');
            setTimeout(function () {
                _this_1.typeCharacter(el, text, index + 1);
            }, this.typingSpeed);
        }
        else {
            this.dispatchInputEvent(el, 'change');
        }
    };
    PasteDecorator.prototype.dispatchInputEvent = function (el, eventType) {
        var event = new InputEvent(eventType, { bubbles: true, cancelable: true });
        el.dispatchEvent(event);
    };
    PasteDecorator.prototype.dispatchEnterEvent = function (element, callback) {
        var _this_1 = this;
        setTimeout(function () {
            _this_1.enter(element, callback);
        }, 1500);
    };
    PasteDecorator.prototype.isInput = function (element) {
        return element.tagName === 'INPUT';
    };
    PasteDecorator.prototype.clickResult = function (callback) {
        var _this_1 = this;
        var attempts = 0;
        var maxAttempts = 10;
        var interval = setInterval(function () {
            //several categories loaded, do nothing
            if (_this_1.queryElement(_this_1.categorySelector, true).length > 1) {
                _this_1._sfLogger.info('Skipping submit due to multiple categories loaded');
                setTimeout(function () {
                    callback && callback();
                }, 1000);
                clearInterval(interval);
                return;
            }
            var element = _this_1.queryElement(_this_1.suggestionSelector, true);
            //one or none loaded
            if (element.length > 0) {
                _this_1._sfLogger.info('Relevant suggestion found, calling lib to click it');
                Lego.ctx.get('InputGenerator').click(element, callback);
            }
            else {
                attempts++;
                if (attempts >= maxAttempts) {
                    _this_1._sfLogger.info('Did not find suggestions, calling callback');
                    callback && callback();
                    clearInterval(interval);
                    return;
                }
            }
        }, 1000);
    };
    return PasteDecorator;
}());
Lego.ctx.register('PasteDecorator').asCtor(PasteDecorator).dependencies('SfLogger');

/// <reference path="../node_modules/wm-plugins-core/plugins/iplugin.ts"/>
/// <reference path="../node_modules/wm-plugins-core/definitions/globals.d.ts"/>
/// <reference path="Interface/IWindow.ts"/>
/// <reference path="Interface/ISfLogger.ts"/>
/// <reference path="Interface/IUserMetadataProvider.ts"/>
var NameODataListener = /** @class */ (function () {
    function NameODataListener(userMetadataProvider, sfLogger) {
        this.API_USERNAME = 'API_SMART@sapitbusysP';
        this.API_PASSWORD = 'Nq1AWq1WmJ1Q4EHmGP';
        this._userMetadataProvider = userMetadataProvider;
        this._sfLogger = sfLogger;
        window.addEventListener('message', this.handleMessage.bind(this), false);
        this._sfLogger.info('EmpJob OData PostMessageListener initialized');
    }
    NameODataListener.prototype.buildAuthHeader = function () {
        return 'Basic ' + btoa("".concat(this.API_USERNAME, ":").concat(this.API_PASSWORD));
    };
    NameODataListener.prototype.handleMessage = function (event) {
        var _this = this;
        var data = event.data;
        if (!data || data.action !== 'getUserOdata') {
            return;
        }
        var names = data.names;
        if (!Array.isArray(names) || names.length === 0) {
            this.sendResponse(event.source, event.origin, {
                requestId: data.requestId,
                success: false,
                error: 'No names provided'
            });
            return;
        }
        this._sfLogger.info('Received EmpJob OData request', { names: names });
        var userMetadata = this._userMetadataProvider.get();
        var baseUrl = (userMetadata === null || userMetadata === void 0 ? void 0 : userMetadata.baseUrl) || 'https://hcm-eu20.hr.cloud.sap';
        // Escape OData strings
        var escapedNames = names.map(function (n) { return n.replace(/'/g, "''"); });
        var nameFilter = escapedNames
            .map(function (n) { return "substringof('".concat(n, "',userNav/displayName)"); })
            .join(' or ');
        var queryUrl = "".concat(baseUrl, "/odata/v2/EmpJob") +
            "?$format=json" +
            "&$select=" +
            "userId," +
            "userNav/email," +
            "userNav/displayName," +
            "jobTitle," +
            "departmentNav/name_defaultValue," +
            "managerEmploymentNav/userNav/displayName," +
            "userNav/assignmentUUID," +
            "locationNav/geozoneFlx" +
            "&$expand=" +
            "departmentNav," +
            "userNav," +
            "managerEmploymentNav/userNav," +
            "locationNav" +
            "&$filter=(".concat(nameFilter, ")");
        this._sfLogger.info('EmpJob OData query', { queryUrl: queryUrl });
        wmjQuery.ajax({
            url: queryUrl,
            type: 'GET',
            contentType: 'application/json',
            headers: {
                'Accept': 'application/json',
                'Authorization': this.buildAuthHeader()
            },
            success: function (response) {
                var _a;
                var results = ((_a = response === null || response === void 0 ? void 0 : response.d) === null || _a === void 0 ? void 0 : _a.results) || [];
                _this.sendResponse(event.source, event.origin, {
                    requestId: data.requestId,
                    success: true,
                    data: results
                });
            },
            error: function (error) {
                _this._sfLogger.error('EmpJob OData request failed', error);
                _this.sendResponse(event.source, event.origin, {
                    requestId: data.requestId,
                    success: false,
                    error: 'EmpJob OData request failed'
                });
            }
        });
    };
    NameODataListener.prototype.sendResponse = function (target, origin, response) {
        if (!target || target === window) {
            window.postMessage(response, origin);
        }
        else {
            target.postMessage(response, origin);
        }
        this._sfLogger.info('Sent OData response', response);
    };
    return NameODataListener;
}());
Lego.ctx
    .register('NameODataListener')
    .asCtor(NameODataListener)
    .dependencies('UserMetadataProvider, SfLogger');



Lego.plugin(new SuccessFactors());
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
/******/ 	var __webpack_exports__ = __webpack_require__(914);
/******/ 	wmbundle = __webpack_exports__;
/******/ 	
/******/ })()
;
/* WalkMe Module */ return wmbundle; })
//# sourceMappingURL=bundle.js.map
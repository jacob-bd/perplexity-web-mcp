/* WalkMe Module */ typeof _walkmeInternals !== 'undefined' && _walkmeInternals.wmloader && _walkmeInternals.wmloader.define('wm-plugin-open-teach-me-after-deployable-played@1.0.6@prelib', {"name":"wm-plugin-open-teach-me-after-deployable-played","version":"1.0.6","toolbelt":"2.0.2","packageDate":"2025-05-05T08:20:15.800Z","entry":"prelib"}, function (__wmplugin__) {  
var wmbundle;
/******/ (function() { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 568:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

module.exports = __webpack_require__(787);



/***/ }),

/***/ 787:
/***/ (function(module) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

(function(scope, factory){
    if ( true && typeof module.exports === "object" ){
        module.exports = factory;
    }
    else {
        scope.openTeachMeAfterDeployablePlayedPlugin = factory;
    }
}(this, function(getLego){
	var Lego = getLego();
	var ctx = Lego.ctx;
	var di = Lego.di;


/// <reference path="../node_modules/wm-plugins-core/plugins/iplugin.ts"/>
/// <reference path="../node_modules/wm-plugins-core/definitions/globals.d.ts"/>
var OpenTeachMeAfterDeployablePlayed = /** @class */ (function () {
    function OpenTeachMeAfterDeployablePlayed() {
        this._promiseManager = Lego.ctx.get('PromiseManager');
        this._eventsListener = Lego.ctx.get('EventsListener');
        this._eventsTrigger = Lego.ctx.get('EventsTrigger');
        this._logger = Lego.ctx.get('PrelibLogger');
    }
    OpenTeachMeAfterDeployablePlayed.prototype.run = function () {
        this._eventsListener.once('WalkMeReady', this.walkMeReadyHandler());
        this._eventsListener.on('WalkthruCompleted FlowCompleted', this.deployableCompletedHandler());
        this._eventsListener.on('AfterMenuOpen', this.afterMenuOpenHandler());
        this._eventsListener.on('AfterMenuClose', this.afterMenuCloseHandler());
        return null;
    };
    OpenTeachMeAfterDeployablePlayed.prototype.afterMenuOpenHandler = function () {
        var _this = this;
        return function (event) {
            if (window.TeachMePlayerAPI.isMenuOpen()) {
                _this.openCourseIfStorageExists();
                _this.bindEventsToTeachMe();
            }
        };
    };
    OpenTeachMeAfterDeployablePlayed.prototype.afterMenuCloseHandler = function () {
        var _this = this;
        return function (event) {
            if (!window.TeachMePlayerAPI.isMenuOpen() && _this._cookiesManager.getCookie("wm-teachme-lesson-new-tab")) {
                if (_this._cookiesManager.getCookie("wm-teachme-lesson-new-tab") == _this._cookiesManager.getCookie("wm-teachme-lesson-id")) {
                    _this.handleOpeningTeachMe();
                }
            }
        };
    };
    /*Remember Last Open Course*/
    OpenTeachMeAfterDeployablePlayed.prototype.openCourseIfStorageExists = function () {
        this._logger.write("Retrieving course id from cookie");
        var currentCourseId = this._cookiesManager.getCookie('walkme_current_course_id');
        if (currentCourseId) {
            this._logger.write("Found course id, opening course");
            this.openCourse(currentCourseId);
        }
        else {
            this._logger.write("No course id, opening main menu");
        }
    };
    OpenTeachMeAfterDeployablePlayed.prototype.openCourse = function (id) {
        var courseItem = wmjQuery('#wm-course-item-' + id);
        if (courseItem.length > 0) {
            courseItem.click();
        }
        else {
            this._logger.write("Course not found, back to main menu");
        }
    };
    /*Remember Last Open Course END*/
    OpenTeachMeAfterDeployablePlayed.prototype.bindEventsToTeachMe = function () {
        this.writeToLog("Binding course events");
        var courseItems = wmjQuery('.wm-course-item');
        for (var i = 0; i < courseItems.length; i++) {
            var id = this.getIdFromElement(courseItems[i]);
            wmjQuery(courseItems[i]).click(this.courseEventBinder(id));
        }
        this.writeToLog("Binding lesson events");
        var lessonItems = wmjQuery('.wm-lesson-row .walkme-activatable');
        for (var i = 0; i < lessonItems.length; i++) {
            var id = this.getIdFromElement(lessonItems[i]);
            wmjQuery(lessonItems[i]).click(this.lessonEventBinder(id));
        }
        this.bindReturnEvent();
    };
    OpenTeachMeAfterDeployablePlayed.prototype.bindReturnEvent = function () {
        var returnButton = wmjQuery('.return-btn-hide');
        returnButton.click(this.returnButtonEventBinder(returnButton));
    };
    OpenTeachMeAfterDeployablePlayed.prototype.getIdFromElement = function (courseItem) {
        return courseItem.id.split("-").slice(-1)[0];
    };
    OpenTeachMeAfterDeployablePlayed.prototype.courseEventBinder = function (id) {
        var _this = this;
        return function () {
            _this._logger.write("Saving course id to cookie");
            //We send 86400 in order to save the cookie for 24 shours (This was the behavior in the lib when we sent 0)
            _this._cookiesManager.setCookie('walkme_current_course_id', id, 86400);
        };
    };
    OpenTeachMeAfterDeployablePlayed.prototype.lessonEventBinder = function (id) {
        var _this = this;
        return function () {
            _this.writeToLog("Saving lesson id to cookie: wm-teachme-lesson-id=" + id);
            //We send 86400 in order to save the cookie for 24 shours (This was the behavior in the lib when we sent 0)
            _this._cookiesManager.setCookie("wm-teachme-lesson-id", id, 86400);
        };
    };
    OpenTeachMeAfterDeployablePlayed.prototype.returnButtonEventBinder = function (returnButton) {
        var _this = this;
        return function () {
            _this._logger.write("Return button clicked, deleting course id");
            _this._cookiesManager.setCookie("wm-teachme-lesson-id", "", -1);
            _this._cookiesManager.setCookie("walkme_current_course_id", "", -1);
        };
    };
    OpenTeachMeAfterDeployablePlayed.prototype.walkMeReadyHandler = function () {
        var _this = this;
        return function (event) {
            _this._cookiesManager = Lego.ctx.get('CookiesManager');
            _this._const = Lego.ctx.get('Consts');
            _this._wtsManager = Lego.ctx.get('DeployablesManagerFactory').get(_this._const.DEPLOYABLE_TYPE.BusinessSolution);
            _this._featuresManager = Lego.ctx.get('FeaturesManager');
            // add handler for branched Wt & Wts
            if (!_this._featuresManager.isFeatureEnabled('dontOpenTeachMeForBranch')) {
                _this._eventsListener.on('FlowBranched', _this.flowBranchedHandler());
                _this._eventsListener.on('switchToWalkthru', _this.wtBranchedHandler());
            }
        };
    };
    OpenTeachMeAfterDeployablePlayed.prototype.deployableCompletedHandler = function () {
        var _this = this;
        return function (event, data) {
            var latestTeachMePlayed = _this._cookiesManager.getCookie("wm-teachme-lesson-id");
            _this.writeToLog('found latest teachme deployable played id: ' + latestTeachMePlayed);
            if ((_this.getDeployableId(event, data) == latestTeachMePlayed || (event.type == "ContentRemoved" && latestTeachMePlayed)) && !window.TeachMePlayerAPI.isMenuOpen()) {
                _this.handleOpeningTeachMe();
            }
        };
    };
    OpenTeachMeAfterDeployablePlayed.prototype.flowBranchedHandler = function () {
        var _this = this;
        return function (event, data) {
            var latestTeachMePlayed = _this._cookiesManager.getCookie("wm-teachme-lesson-id");
            if (latestTeachMePlayed) {
                // get all flows of the latest played wts
                var latestFlow = _this._wtsManager.deployablesDict[latestTeachMePlayed];
                // check if the source branch is from the latest played wts flows.
                if (latestFlow && latestFlow.Flow && latestFlow.Flow.Nodes && latestFlow.Flow.Nodes[data.branchOriginStageId]) {
                    _this.writeToLog("found branched flow from " + latestTeachMePlayed + " to " + data.businessSolutionId);
                    // replace the current played wts
                    _this.lessonEventBinder(data.businessSolutionId)();
                }
            }
        };
    };
    OpenTeachMeAfterDeployablePlayed.prototype.wtBranchedHandler = function () {
        var _this = this;
        return function (event, newWtId) {
            var latestTeachMePlayed = _this._cookiesManager.getCookie("wm-teachme-lesson-id");
            // check if the new wt is branched played from current played wt
            if (latestTeachMePlayed && _this.isWtPlayedFromBranch(latestTeachMePlayed, newWtId)) {
                _this.writeToLog("found branched flow from " + latestTeachMePlayed + " to " + newWtId);
                // replace the current played wts
                _this.lessonEventBinder(newWtId)();
            }
        };
    };
    OpenTeachMeAfterDeployablePlayed.prototype.isWtPlayedFromBranch = function (sourceWt, branchedWt) {
        var _this = this;
        if (!this._wtManager) {
            this._wtManager = Lego.ctx.get('DeployablesManagerFactory').get(this._const.DEPLOYABLE_TYPE.Tutorial);
        }
        var steps = this._wtManager.deployablesDict[sourceWt].Steps;
        return wmjQuery.grep(steps, function (step) { return step && step.Settings && step.Settings.action &&
            (step.Settings.action.actionType === _this._const.STEP_ACTION.Branch) && // is is branched type step
            step.Settings.action.arguments && (step.Settings.action.arguments.wtId === branchedWt); }) // is the branched step is from this source
        [0] !== undefined;
    };
    OpenTeachMeAfterDeployablePlayed.prototype.getDeployableId = function (event, data) {
        switch (event.type) {
            case 'FlowCompleted':
                return data.businessSolutionId;
            case 'WalkthruCompleted':
                return data.TutorialId;
            default:
                return 0;
        }
    };
    OpenTeachMeAfterDeployablePlayed.prototype.handleOpeningTeachMe = function () {
        this.writeToLog('deployable from teachme played found');
        window.TeachMePlayerAPI.toggleMenu();
        this.writeToLog('removing cookie');
        this._cookiesManager.setCookie("wm-teachme-lesson-new-tab", "", -1);
        this._cookiesManager.setCookie("wm-teachme-lesson-id", "", -1);
    };
    OpenTeachMeAfterDeployablePlayed.prototype.writeToLog = function (msg) {
        this._logger.write("openTeachMeAfterDeployablePlayed: " + msg);
    };
    return OpenTeachMeAfterDeployablePlayed;
}());
 

Lego.plugin(new OpenTeachMeAfterDeployablePlayed());
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
/******/ 	var __webpack_exports__ = __webpack_require__(568);
/******/ 	wmbundle = __webpack_exports__;
/******/ 	
/******/ })()
;
/* WalkMe Module */ return wmbundle; })
//# sourceMappingURL=bundle.js.map
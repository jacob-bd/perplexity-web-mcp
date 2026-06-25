/* WalkMe Module */ typeof _walkmeInternals !== 'undefined' && _walkmeInternals.wmloader && _walkmeInternals.wmloader.define('wm-plugin-autofill-survey-question@1.0.1@prelib', {"name":"wm-plugin-autofill-survey-question","version":"1.0.1","toolbelt":"2.0.2","packageDate":"2025-05-05T08:21:22.149Z","entry":"prelib"}, function (__wmplugin__) {  
var wmbundle;
/******/ (function() { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 547:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

module.exports = __webpack_require__(890);



/***/ }),

/***/ 543:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

var getCtx = (__webpack_require__(554)/* .getCtx */ .yK);
var log = (__webpack_require__(607)/* .log */ .R);

function AutofillSurveyQuestion() {
	var _this = this;
	_this.run = run;

	function ctor() {
	}

	function run() {
		__webpack_require__(236)();
	}

	ctor();
}

exports.N = AutofillSurveyQuestion;



/***/ }),

/***/ 607:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

var getCtx = (__webpack_require__(554)/* .getCtx */ .yK);
var logger = getCtx().get('PrelibLogger');

function log() {
	var logRecord = Array().slice.call(arguments);
	logRecord.unshift("[ AutofillSurveyQuestion ]");
	logger.write.apply(logger, logRecord);
}

exports.R = log;


/***/ }),

/***/ 890:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

var createPluginEntry = (__webpack_require__(554)/* .createPluginEntry */ .mJ);

module.exports = createPluginEntry(function(registerPlugin) {
    var AutofillSurveyQuestion = (__webpack_require__(543)/* .AutofillSurveyQuestion */ .N);

    registerPlugin(new AutofillSurveyQuestion());
});



/***/ }),

/***/ 236:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

var getCtx = (__webpack_require__(554)/* .getCtx */ .yK);

module.exports = function() {
    getCtx().register('SurveyUserVar')
        .asCtor(SurveyUserVar)
        .asProto()
        .dependencies('BBCodeParser, Consts, CommonEvents, FeaturesManager');

    getCtx().decorate('SurveyQuestionFactory', function(surveyQuestionFactory) {
        var orig_getSurveyQuestion = surveyQuestionFactory.getSurveyQuestion;
        surveyQuestionFactory.getSurveyQuestion = function(question, surveyJson) {
            var params = {
                question: question,
                survey: surveyJson
            };
            if (/^\[autofill-bbcode-question\]/.test(question.Title)) {
                return getCtx().create('SurveyUserVar', params);
            }

            return orig_getSurveyQuestion.apply(surveyQuestionFactory, Array.prototype.slice.call(arguments, 0));
        };
        return surveyQuestionFactory;
    });
}

function SurveyUserVar(bbCodeParser, consts, commonEvents, featuresManager, params) {
    var _this = this;

    _this.getAnswers = getAnswers;
    _this.Generate = Generate;

    function ctor(params) {
        getCtx().get('WalkmeInheritance').extend(_this, getCtx().entry('SurveyFreeTextQuestion').properties.type, consts, commonEvents, featuresManager, params);
    }

    function getAnswers() {
        var answer = {};
        answer.questionId = params.question.Id;
        answer.answerText = bbCodeParser.parse(params.question.SubTitle);
        return [answer];
    }

    function Generate() {
        return mtjQuery('<span></span>');
    }

    ctor.apply(null, [params]);
}


/***/ }),

/***/ 554:
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
/******/ 	var __webpack_exports__ = __webpack_require__(547);
/******/ 	wmbundle = __webpack_exports__;
/******/ 	
/******/ })()
;
/* WalkMe Module */ return wmbundle; })
//# sourceMappingURL=bundle.js.map
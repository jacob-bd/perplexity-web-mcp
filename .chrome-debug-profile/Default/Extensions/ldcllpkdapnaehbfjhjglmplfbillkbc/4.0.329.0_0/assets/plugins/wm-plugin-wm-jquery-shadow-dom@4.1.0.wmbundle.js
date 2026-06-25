/* WalkMe Module */ typeof _walkmeInternals !== 'undefined' && _walkmeInternals.wmloader && _walkmeInternals.wmloader.define('wm-plugin-wm-jquery-shadow-dom@4.1.0@prelib', {"name":"wm-plugin-wm-jquery-shadow-dom","version":"4.1.0","toolbelt":"2.0.2","packageDate":"2025-06-04T14:58:02.079Z","entry":"prelib"}, function (__wmplugin__) {  
var wmbundle;
/******/ (function() { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 453:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

module.exports = __webpack_require__(425);



/***/ }),

/***/ 216:
/***/ (function(module) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

module.exports = {
	toArray: toArray,
	arrForEach: arrForEach,
	arrMap: arrMap,
	arrFilter: arrFilter,
	arrReduce: arrReduce,
	concatArrays: concatArrays,
	binaryFind: binaryFind,
	arrContains: arrContains
};

function toArray(obj) {
	if(!obj || !obj.length)
		return [];
	return Array.prototype.slice.call(obj, 0);
}

function arrForEach(arr, callback) {
	for (var i = 0; i < arr.length; i++) {
		if (callback(arr[i], i) === false) {
			return;
		}
	}
}

function arrContains(arr, item) {
	var found = false;
	arrForEach(arr, function(val, i) {
		if (val === item) {
			found = true;
			return false;
		}
	});
	return found;
}

function arrMap(arr, callback) {
	var newArr = [];
	arrForEach(arr, function(val, i) {
		newArr.push(callback(val, i));
	});
	return newArr;
}

function arrFilter(arr, callback) {
	var newArr = [];
	arrForEach(arr, function(val, i) {
		if (callback(val, i)) {
			newArr.push(val);
		}
	});
	return newArr;
}

function arrReduce(arr, callback, initialValue) {
	var currVal = initialValue;
	arrForEach(arr, function(val, i) {
		currVal = callback(currVal, val, i);
	});
	return currVal;
}

function concatArrays(arrays) {
	return arrReduce(arrays, function(a, e) {
		return a.concat(e);
	}, []);
}

function binaryFind(arr, searchElement, compareFn) {
	var minIndex = 0,
		maxIndex = arr.length - 1,
		currentIndex,
		currentElement;

	if (arr.length === 0) {
		return {
			found: false,
			index: 0
		};
	}

	while (minIndex <= maxIndex) {
		currentIndex = (minIndex + maxIndex) / 2 | 0;
		currentElement = arr[currentIndex];

		if (compareFn(currentElement, searchElement) < 0) {
			minIndex = currentIndex + 1;
		}
		else if (compareFn(currentElement, searchElement) > 0) {
			maxIndex = currentIndex - 1;
		}
		else {
			return { // Modification
				found: true,
				index: currentIndex
			};
		}
	}      

	return { // Modification
		found: false,
		index: compareFn(currentElement, searchElement) < 0 ? currentIndex + 1 : currentIndex
	};
}



/***/ }),

/***/ 645:
/***/ (function(module) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

//we used to have it in sizzle that were used in jquery 1.7.1 but it isn't being used anymore in jquery 3.3.1


var chunker = /((?:\((?:\([^()]+\)|[^()]+)+\)|\[(?:\[[^\[\]]*\]|['"][^'"]*['"]|[^\[\]'"]+)+\]|\\.|[^ >+~,(\[\\]+)+|[>+~])(\s*,\s*)?((?:.|\r|\n)*)/g;

module.exports = function(selector){
	var m, extra,
		parts = [],
		soFar = selector;
	
	// Reset the position of the chunker regexp (start from head)
	do {
		chunker.exec( "" );
		m = chunker.exec( soFar );

		if ( m ) {
			soFar = m[3];
		
			parts.push( m[1] );
		
			if ( m[2] ) {
				extra = m[3];
				break;
			}
		}
	} while ( m );

	return [parts, extra];
}


/***/ }),

/***/ 197:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

var arrUtils = __webpack_require__(216);
var wrapUtils = __webpack_require__(186)(wmjQuery);

function strongContains(a, b) {
	return a !== b && arrUtils.arrReduce(wmjQuery(a).children(), function(found, e) {
		e = wrapUtils.unwrapElement(e);
		return found || e === b || strongContains(e, b);
	}, false);
}

function getElementsChildren(elements) {
	var allChildren = [];
	for (var i = 0; i < elements.length; i++) {
		allChildren = allChildren.concat(getElementChildren(elements[i]));
	}
	return allChildren;
}

function getElementChildren(element) {
	if (element.querySelectorAll) {
		return arrUtils.toArray(element.querySelectorAll('*'));
	} else if (element.getElementsByTagName) {
		return arrUtils.toArray(element.getElementsByTagName('*'));
	} else {
		return [];
	}
}

module.exports = {
	strongContains: strongContains,
	getElementsChildren: getElementsChildren,
	getElementChildren: getElementChildren
};


/***/ }),

/***/ 186:
/***/ (function(module) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

var implProps;

function unwrapElement(e) {
	for (var i = 0; i < implProps.length; i++) {
		if (e[implProps[i]]) {
			return e[implProps[i]];
		}
	}
	return e;
}

function wrapElement(e) {
	return e.__wrapper8e3dd93a60__ || e;
}

var _exports = {
	unwrapElement: unwrapElement
};

module.exports = function(wmjQuery) {
	implProps = implProps || (function() {
		var htmlTag = document.getElementsByTagName('html')[0];
		if (htmlTag.__impl4cf1e782hg__) {
			wmjQuery.fnHelpers.wrapIfNeeded = function ( elem ) {
				if (elem.length > 0) {
					return wmjQuery(elem).map(function(_, e) {
						return wrapElement(e);
					});
				}

				return wrapElement(elem);
			};
			return ['__impl4cf1e782hg__'];
		}
		return [];
	})();

	return _exports;
}


/***/ }),

/***/ 540:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

module.exports = {
	hasNativeShadowDOM: hasNativeShadowDOM,
	hasNativeCustomElements: hasNativeCustomElements,
	getCurrentPlatformVersion: getCurrentPlatformVersion
};

var shadowVisibilityManager = __webpack_require__(80);
var iframeUtils = __webpack_require__(797);
var cachedPlatformVersion;
var cachedVal;

function getCurrentPlatformVersion() {
	// when to invalidate cache?
	if (cachedPlatformVersion) {
		return cachedPlatformVersion.join();
	}

	var wrapUtils = __webpack_require__(186)(wmjQuery);

	var platformName = '';
	var platformVersion = '';

	if (testAll(innerIsPolymer)) {
		platformName = 'Polymer';
		platformVersion = testAll(innerGetPolymerVersion) || '';
	} else if (testAll(innerIsWebComponenets)) {
		platformName = 'WebComponents';
		platformVersion = testAll(innerGetWebComponenetsVersion) || '';
	}

	cachedPlatformVersion = [[platformName, platformVersion].join('')];
	if (hasNativeShadowDOM()) {
		cachedPlatformVersion.push('NativeShadowDOM');
	}

	return cachedPlatformVersion.join();
}

// TODO: find a better way to identify if we have "native" functionality or not.
function hasNativeShadowDOM() {
	if (cachedVal !== undefined) {
		return cachedVal;
	}

	shadowVisibilityManager.useShadowVisible(false);
	cachedVal = testAll(innerHasNativeShadowDOM, true);
	shadowVisibilityManager.useShadowVisible(true);
	return cachedVal;
}

function innerIsPolymer(win, doc) {
	return !!win.Polymer;
}

function innerGetPolymerVersion(win, doc) {
	return win.Polymer && win.Polymer.version;
}

function innerIsWebComponenets(win, doc) {
	return !!win.WebComponents;
}

function innerGetWebComponenetsVersion(win, doc) {
	var htmlTag = doc.getElementsByTagName('html')[0];
	if (htmlTag.__impl4cf1e782hg__) {
		return '__impl4cf1e782hg__';
	}
}

function innerHasNativeShadowDOM(win, doc) {
	var res;
	if (win.Polymer && win.Polymer.Settings && win.Polymer.Settings.useShadow !== undefined) {
		res = win.Polymer.Settings.useShadow;
	}
	if (res === undefined) {
		res = wmjQuery.hasShadowContext(doc);
	}
	return res;
}

function testAll(innerTestFn, useFalse) {
	var res = innerTestFn(window, document);
	if (res || (res !== undefined && useFalse)) {
		return res;
	}
	return testIframes(document, innerTestFn, useFalse);
}

function testIframes(context, innerTestFn, useFalse) {
	var found = undefined;
	iframeUtils.traverseIframes(context, function(frame, win, doc) {
		found = innerTestFn(win, doc);
		if (found || (found !== undefined && useFalse)) {
			return false;
		}
	}, null, 0, -1);
	return found;
}

function hasNativeCustomElements() {
	return testAll(innerHasNativeCustomElements);
}

function innerHasNativeCustomElements(win) {
	if (win.Polymer && win.Polymer.Settings) {
		return win.Polymer.Settings.useNativeCustomElements;
	}
	return !(win.customElements && win.customElements.polyfillWrapFlushCallback);
}


/***/ }),

/***/ 393:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

var arrUtils = __webpack_require__(216);

module.exports = function querySelectorSpecialContent(results, specialContent, jqSelector) {
	if (specialContent.length > 0) {
		results = results.concat(filterSpecialContent(specialContent, jqSelector));
		arrUtils.arrForEach(specialContent, function(e, i) {
			if (e.querySelectorAll) {
				results = results.concat(arrUtils.toArray(e.querySelectorAll(jqSelector)));
			}
		});
	}
	return results;
};

function filterSpecialContent(specialContent, jqSelector) {
	var content = [];
	for (var i = specialContent.length - 1; i >= 0; i--) {
		var parent = specialContent[i].parentNode;
		if (parent && parent.querySelectorAll) {
			content = content.concat(arrUtils.toArray(parent.querySelectorAll(jqSelector)));
		}
	}
	return arrUtils.arrFilter(specialContent, function(e, i) {
		return arrUtils.arrContains(content, e);
	});
}


/***/ }),

/***/ 647:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

module.exports = {
	initPlugin: initPlugin
};

var getCtx = (__webpack_require__(212)/* .getCtx */ .yK);
var arrUtils = __webpack_require__(216);
var iframeUtils = __webpack_require__(797);
var shadowContainerTypesMap = __webpack_require__(163);
var envTester = __webpack_require__(540);
var logger = __webpack_require__(173);
var getShadowPluginVersion = (__webpack_require__(528).getShadowPluginVersion);

var originalExtendElementDescription;

function initPlugin() {
	getCtx().get('EventsListener').on("wm_walkmeLibLoaded", function(){
		originalExtendElementDescription = _walkmeInternals.extendElementDescription;
		_walkmeInternals.extendElementDescription = extendElementDescription;
		_makeTutorial.registerFindElementPlugin(new ShadowFindElementPlugin());
	});
}

function extendElementDescription(element, descriptionString, params) {
	line('CAPTURE ELEMENT');
	logger.log('Start extendElementDescription:');
	if (originalExtendElementDescription) {
		descriptionString = originalExtendElementDescription(element, descriptionString, params);
	}

	var jsonMock = __webpack_require__(946)(),
		descJson = jsonMock.parse(descriptionString),
		parents = getCtx().get('ShadowJQueryBindingWrapper').run(function() {
			return getParentsList(element, descJson).reverse();
    	}),
		shadowParentsArr = [];
	for (var i = 1; i < parents.length; i++) {
		if (parents[i] && wmjQuery.fnHelpers.isInDirectShadow(parents[i - 1], parents[i])) {
			shadowParentsArr.unshift(parents[i]);
		}
	}

	var shadowTags = arrUtils.arrFilter(arrUtils.arrMap(shadowParentsArr, function(e) {
		return (e.tagName || '').toUpperCase();
	}), function(tagName) {
		return tagName && tagName !== "HTML" && tagName !== "SHADOW";
	});

	logger.log('found ' + shadowTags.length + ' shadow parents');

	if (shadowTags.length > 0) {
		logger.log('saving shadow-parents data on ElementDescription');
		
		descJson.shadow = {
			shadowTags: shadowTags,
			version: getShadowPluginVersion(),
			platformVersion: envTester.getCurrentPlatformVersion()
		};
		descriptionString = jsonMock.stringify(descJson);
	} else {
		logger.log('nothing to save - doing nothing');
	}

	logger.log('End extendElementDescription');

	return descriptionString;
}

function getParentsList(element, descJson) {
	var framesCount = (descJson.elementXpath.match(/\/(iframe|frame)\[/g) || []).length;
	if (framesCount === 0) {
		return getElementPath(element);
	}

	var path = [];
	var chain = iframeUtils.getIframeChain(element, document, framesCount, descJson);
	if (chain) {
		for (var i = 0; i < chain.length; i++) {
			path = path.concat(getElementPath(chain[i]));
		}
	}
	path = path.concat(getElementPath(element));

	return path;
}

function getElementPath(element) {
	var path = wmjQuery(element).parents().toArray().reverse();
	path.push(element);
	return path;
}

function line(title) {
	logger.log('-----------' + (title || '') + '-----------');
}

function ShadowFindElementPlugin() {
	var typesOrder = [
		shadowContainerTypesMap.shadowRoot,
		shadowContainerTypesMap.content,
		shadowContainerTypesMap.slot,
		shadowContainerTypesMap.iframe
	];

	this.extendOriginalSettings = function(identifySettings) {
		line('FIND ELEMENT');
		logger.log('### extendOriginalSettings');
		if(identifySettings.ElementDescription.customContext) {
			logger.log('element has custom context, doing nothing');
			return;
		}

		var oldDesc = identifySettings.ElementDescription;
		if (!oldDesc.shadow) {
			logger.log('ElementDescription has no shadow data - fallback to original find-element');
			return;
		}
		logger.log('ElementDescription has shadow data: ', oldDesc.shadow.shadowTags);
		if (!envTester.hasNativeShadowDOM()) {
			logger.log('document does not support native custom elements - adapting ElementDescription (xpath, autoQuery, shadowTags)');

			oldDesc.elementXpath = oldDesc.elementXpath.replace(/\/(content|slot)\[\d+\]/ig, '');
			oldDesc.autoQuery = (oldDesc.autoQuery || '').replace(/\s(content|slot)\s/ig, ' ').replace(/(content|slot)\[.*\]\s/ig, ' ');
			oldDesc.shadow.shadowTags = arrUtils.arrFilter(oldDesc.shadow.shadowTags, function(tagName) {
				tagName = (tagName || '').toLowerCase();
				return tagName !== 'content';
			});
			return;
		}
		logger.log('document supports native custom elements - do nothing');
	};

	this.extendAdaptedSettings = function(identifySettings, newDesc, out) {
		logger.log('### extendAdaptedSettings');
		if(identifySettings.ElementDescription.customContext) {
			logger.log('element has custom context, doing nothing');
			return;
		}

		var oldDesc = identifySettings.ElementDescription;
		if (!oldDesc.shadow) {
			logger.log('ElementDescription has no shadow data - fallback to original find-element');
			return;
		}
		var shadowTags = oldDesc.shadow.shadowTags;
		if (!shadowTags || shadowTags.length <= 0) {
			logger.log('ElementDescription has no shadow data - fallback to original find-element');
			return;
		}
		if (!envTester.hasNativeShadowDOM()) {
			logger.log('document does not support native shadow-dom - fallback to original find-element');
			return;
		}

		logger.log('ElementDescription has shadow data:', shadowTags);
		logger.log('searching for context');

		var contextArr = [document],
			currTagName;
		for (var i = 0; i < shadowTags.length; i++) {
			currTagName = shadowTags[i];
			contextArr = arrUtils.arrReduce(querySelectorAllArr(contextArr, currTagName), function(arr, e) {
				var s = new Set(arr);
				var _arr = arr.slice();
				for (var i = 0; i < typesOrder.length; i++) {
					if (typesOrder[i].test(e)) {
						var newElems = typesOrder[i].getRoot(e);
						newElems && newElems.forEach(function(x) {
							if(!s.has(x)){
								s.add(x);
								_arr.push(x);
							}
						})
						return _arr;
					}
				}
				if(!s.has(e)) {
					return arr.concat([e]);
				}
				return arr;
			}, []);
			if (contextArr.length === 0) {
				logger.log('did not find context', i, currTagName);
				break;
			}
		}

		logger.log('context:', contextArr);

		var tagName = newDesc.elementType;
		var suspects = wmjQuery(querySelectorAllArr(contextArr, tagName));
		suspects = wmjQuery(Array.from(new Set(suspects)));

		if (newDesc.visibilityFilter) {
			suspects = wmjQuery(suspects).filter(newDesc.visibilityFilter);
		}

		logger.log('found ' + suspects.length + ' suspects:', suspects);

		// There must be something in preDefinedSuspects in order for FE to use it (otherwise - fallback to using autoQuery).
		if (suspects.length === 0) {
			logger.log('no suspects found - abort find-element');
			suspects = wmjQuery('<not-my-div>');
		} else {
			logger.log('continuing find-element on these suspects');
		}

		if (out) {
			out.pluginName = 'jquery-shadow-dom';
			out.pluginVersion = getShadowPluginVersion();
			out.pluginCaptureVersion = oldDesc.shadow.version;
			out.capturePlatformVersion = oldDesc.shadow.platformVersion;
			out.platformVersion = envTester.getCurrentPlatformVersion();
		}

		newDesc.preDefinedSuspects = suspects;
	};

	function querySelectorAllArr(contextArr, tagName) {
		return arrUtils.arrReduce(contextArr, function(nextContextArr, currContextElement) {
			return nextContextArr.concat(arrUtils.toArray(currContextElement.querySelectorAll(tagName)));
		}, []);
	}
}



/***/ }),

/***/ 797:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

var getCtx = (__webpack_require__(212)/* .getCtx */ .yK);

module.exports = {
	getIframeChain: getIframeChain,
	traverseIframes: traverseIframes
};

function traverseIframes(context, beforeCallback, afterCallback, level, maxDepth) {
	var frames = wmjQuery('iframe:not(#walkme-hidden-iframe,#walkme-native-functions),frame', context);
	for (var i = 0; i < frames.length; i++) {
		try {
			var win = frames[i].contentWindow;
			var doc = frames[i].contentDocument;
			
			if (!win || !doc) continue;

			if (beforeCallback(frames[i], win, doc) === false) {
				return false;
			} else if (level < maxDepth || maxDepth < 0) {
				if (traverseIframes(doc, beforeCallback, afterCallback, level + 1, maxDepth) === false) {
					afterCallback && afterCallback(frames[i], win, doc);
					return false;
				}
			}
		} catch(ex) {
			// cross-domain iframe
		}
	}
}

function getIframeChain(element, context, maxDepth, descJson) {
	var chain = [];

	traverseIframes(context, function(frame, win, doc) {
		if (wmjQuery(doc).find(element).length > 0) {
			chain = [frame];
			return false;
		}
	}, function(frame, win, doc) {
		var iframesReorderFlag;
		if (getCtx().has('FeaturesManager')) {
			var featuresManager = getCtx().get('FeaturesManager');
            iframesReorderFlag = featuresManager && featuresManager.isFeatureEnabled && featuresManager.isFeatureEnabled('iframesReorder');
		}
		if (iframesReorderFlag) {
			chain.unshift(frame);
			descJson.iframesReorderFlagAndUsed = true;
		} else {
			chain.push(frame);
		}
	}, 1, maxDepth);

	return chain;
}



/***/ }),

/***/ 701:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

var shadowDomManagerCtor = __webpack_require__(972);

function registerToCtx(getCtx){
	if (!getCtx().has('ShadowDomjQuery')) {
		getCtx().register('ShadowDomjQuery').asCtor(shadowDomManagerCtor);
	}
}

module.exports = {
	registerToCtx: registerToCtx
}


/***/ }),

/***/ 817:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

var getCtx = (__webpack_require__(212)/* .getCtx */ .yK);
var arrUtils = __webpack_require__(216);
var shadowContainerTypesOrder = __webpack_require__(94);
var elementUtils = __webpack_require__(197);
var querySelectorSpecialContent = __webpack_require__(393);
var hasNativeShadowDOM = (__webpack_require__(540).hasNativeShadowDOM);
var envTester = __webpack_require__(540);
var chunkSelector = __webpack_require__(645);
var shadowVisibilityManager = __webpack_require__(80);
var shadowUtils = __webpack_require__(237);

module.exports = function(wmjQuery, options) {
	var wrapUtils = __webpack_require__(186)(wmjQuery);
	var shadowManager = __webpack_require__(385)(options);

	function identityTransform(x) {
		return x;
	}

	function createShadowQueryOverride(queryFuncName, prefix, transform, finalize) {
		finalize = finalize || arrUtils.toArray;
		return function(context, selector) {
			return finalize(shadowQuery(context, queryFuncName, selector, prefix || '', transform || identityTransform));
		};
	}

	function shadowQuery(context, queryFuncName, selector, prefix, transform) {
		return jqShadowSimple(selector, context, queryFuncName, prefix, transform);
	}

	// function jqShadow(context, selector, results) {
	// 	var st = new Date().getTime();
	// 	var res = jqShadow1(context, selector, results);
	// 	console.log(new Date().getTime() - st);
	// 	return res;
	// }

	var walkMeBlackList = {
		'.walkme-current-language, .walkme-language': true,
		'.walkme-language': true,
		'a .walkme-open-ticket': true
	};
	function optimizedQuery(context, selector, results) {
		if (context === document && walkMeBlackList[selector]) {
			addResult(context, selector, results);
			return results;
		}
	}

	function addResult(context, selector, results) {
		var res = arrUtils.toArray(jqHelperFuncs.querySelectorAll(context, selector));
		for (i = 0; i < res.length; i++) {
			results.push(res[i]);
		}
		return results;
	}

	function jqShadow(context, selector, results) {
		results = results || [];
		var chunkRes = chunkSelector(selector),
			parts = chunkRes[0],
			extra = chunkRes[1],
			currRes = context,
			contextMatch;

		try {
			if (optimizedQuery(context, selector, results)) {
				return results;
			}
		} catch(ex) {

		}

		for (var i = 0; i < parts.length; i++) {
			if (parts[i] === '/deep/' && i < parts.length - 1) continue;
			//we sometimes tries to get an element when he is the context.
			previousRes = currRes;
			currRes = jqShadowSimple(parts[i], currRes, 'querySelectorAll', '', identityTransform);

			if(i == 0 && wmjQuery(context).is(parts[i])){
				// 	currRes = currRes.concat(previousRes); This adds mistaken elements to jq set!
			}

			if (i === 0 && parts[i].match(/^\[id=[\'\"].+[\'\"]\]$/)) {
				contextMatch = wmjQuery(context).filter(parts[i]);
				if (contextMatch && contextMatch.length > 0) {
					currRes = wmjQuery(currRes).add(arrUtils.toArray(contextMatch));
					contextMatch = undefined;
				}
			}
		}

		arrUtils.arrForEach(currRes, function(e, i) {
			results.push(e);
		});

		if ( extra ) {
			jqShadow( context, extra, results );
			sizzle.uniqueSort( results );
		}

		return results;
	}

    function jqShadowSimple(selector, context, queryFuncName, prefix, transform) {
        if (!selector) {
            return [];
        }
        // find all shadowRoot elements recursively
        var allShadowRoots;
		var res = new Set();
		var recursionDepth = 0;
		shadowUtils.findShadowRoots(context.length ? context[0] : context, res, recursionDepth);
		allShadowRoots = Array.from(res);
        
        // use filter & find to apply the selector
        var results = [];
        wmjQuery(context).each(function(i, e) {
            var fnName = typeof queryFuncName === 'function' ? queryFuncName(e) : queryFuncName;
            results = results.concat(arrUtils.toArray(transform(jqHelperFuncs[fnName](e, selector))));
        });
        var jqSelector = prefix + selector;
        arrUtils.arrForEach(allShadowRoots, function(e, i) {
            var elms = jqHelperFuncs.querySelectorAll(e, jqSelector);
            if (elms && elms.length) {
                results = results.concat(arrUtils.toArray(elms));
            }
        });
        return sizzle.uniqueSort(results);
    }

	function firstChildResult(elem, fnName) {
		for (var i = 0; i < shadowContainerTypesOrder.children.length; i++) {
			if (shadowContainerTypesOrder.children[i].test(elem)) {
				return shadowContainerTypesOrder.children[i][fnName](elem);
			}
		}
	}

	function isjQuery3() {
		return String(mtjQuery.fn.jquery).split('.')[0] === '3';
	}

	var overrides = {
		wmjQuery: {
			// TODO: override only when needed (chrome?, FF?)
			contains: function( a, b ) {
				a = wrapUtils.unwrapElement(a);
				b = wrapUtils.unwrapElement(b);
				return elementUtils.strongContains(a, b);
			},
			queryHelpers: {
				useQuerySpeedUpFuncs: false,
				getElementById: createShadowQueryOverride('getElementById', '#', function(e) {
					return e ? [e] : [];
				}, function(res) {
					return res && res.length ? res[0] : null;
				}),
				getElementsByTagName: createShadowQueryOverride(function(e) {
					// This fix is for IE11 - native getElementsByTagName() does not return 'slot' elements
					if (e.getElementsByTagName.toString().indexOf('[native code]') > 0) {
						return 'querySelectorAll';
					}
					return 'getElementsByTagName';
				}),
				getElementsByName: createShadowQueryOverride('getElementsByName'),
				getElementsByClassName: createShadowQueryOverride('getElementsByClassName', '.'),
				querySelectorAll: jqShadow
			}
		},
		sizzle: {
			siblingCheck: (function() {
				// TODO: this fix is for IE11, only replace the function for IE11
				if (wmjQuery.find.siblingCheck) {
					return function siblingCheck( a, b, ret, parent ) {
						if (arguments.length === 3) {
							parent = ret;
						} else {
							if ( a === b ) {
								return ret;
							}
						}

						if(a && b){
							parent = parent || wmjQuery.fnHelpers.parentNode(a);
							var apt = wmjQuery.fnHelpers.parentType(a, parent),
								bpt = wmjQuery.fnHelpers.parentType(b, parent);
							if (apt !== bpt) {
								return apt - bpt;
							}

							var cur = mtjQuery.fnHelpers.nextSibling(a, parent);

							while ( cur ) {
								if ( cur === b ) {
									return -1;
								}

								cur = mtjQuery.fnHelpers.nextSibling(cur, parent);
							}

							return 1;
						}
						return a ? 1 : -1;
					};
				}
			})()
		},
		fnHelpers: {
			parentNode: function( elem ) {
				var prev,
					parent = elem;
				do {
					prev = parent;
					parent = arrUtils.arrReduce(shadowContainerTypesOrder.parents, function(res, type) {
						return res || type.parent(prev);
					}, undefined);
				} while (parent && parent !== prev && parent.nodeType === 11);

				return parent;
			},
			parentType: function( elem ) {
				var parent = wmjQuery.fnHelpers.parentNode(elem);
				if (!parent) {
					return 0;
				}

				var prev,
					curParent = elem;
				do {
					prev = curParent;
					var typeIndex;
					curParent = arrUtils.arrReduce(shadowContainerTypesOrder.parents, function(res, type, i) {
						if (res) {
							return res;
						}
						var p = type.parent(prev);
						if (p) {
							typeIndex = i + 1;
							return p;
						}
					}, undefined);
					if (curParent === parent) {
						return typeIndex;
					}
				} while (curParent && curParent !== prev && curParent.nodeType === 11);

				return shadowContainerTypesOrder.length + 1;
			},
			isInShadow: function( elem ) {
				var prev = elem,
					parent;
				do {
					parent = wmjQuery.fnHelpers.parentNode(prev);
					if (wmjQuery.fnHelpers.isInDirectShadow(prev, parent)) {
						return true;
					}
					prev = parent;
				} while (parent);
				return false;
			},
			isInDirectShadow: function( elem, parent ) {
				parent = parent || wmjQuery.fnHelpers.parentNode(elem);
				if (parent && parent !== elem.parentNode) {
					return true;
				}
			},
			firstChild: function( elem ) {
				return firstChildResult(elem, 'firstChild');
			},
			firstElementChild: function( elem ) {
				return firstChildResult(elem, 'firstElementChild');
			},
			childNodes: function( elem ) {
				return firstChildResult(elem, 'childNodes');
			},
			dirParentEquals: function( cur, dir, parent ) {
				parent = parent || wmjQuery.fnHelpers.parent(cur);
				for ( cur = cur[dir]; cur; cur = cur[dir] ) {
					if (wmjQuery.fnHelpers.parentEquals(cur, parent)) {
						return cur;
					}
				}
			},
			nextSibling: function(n, parent) {
				return wmjQuery.fnHelpers.dirParentEquals(n, "nextSibling", parent);
			},
			previousSibling: function(n, parent) {
				return wmjQuery.fnHelpers.dirParentEquals(n, "previousSibling", parent);
			},
			previousSiblingArr: function(n, parents, i) {
				return wmjQuery.fnHelpers.previousSibling(n, parents[i]);
			}
		},
		fnDefs: {
			next: function( elem ) {
				if (isjQuery3()) {
					return mtjQuery.sibling( elem, [mtjQuery.fnHelpers.nextSibling, mtjQuery.fnHelpers.parentNode(elem)] );
				} else {
					return mtjQuery.nth( elem, 2, [mtjQuery.fnHelpers.nextSibling, mtjQuery.fnHelpers.parentNode(elem)] );
				}
			},
			prev: function( elem ) {
				if (isjQuery3()) {
					return mtjQuery.sibling( elem, [mtjQuery.fnHelpers.previousSibling, mtjQuery.fnHelpers.parentNode(elem)] );
				} else {
					return mtjQuery.nth( elem, 2, [mtjQuery.fnHelpers.previousSibling, mtjQuery.fnHelpers.parentNode(elem)] );
				}
			},
			nextAll: function( elem ) {
				return mtjQuery.dir( elem, [mtjQuery.fnHelpers.nextSibling, mtjQuery.fnHelpers.parentNode(elem)] );
			},
			prevAll: function( elem ) {
				return mtjQuery.dir( elem, [mtjQuery.fnHelpers.previousSibling, mtjQuery.fnHelpers.parentNode(elem)] );
			},
			nextUntil: function( elem, i, until ) {
				return mtjQuery.dir( elem, [mtjQuery.fnHelpers.nextSibling, mtjQuery.fnHelpers.parentNode(elem)], until );
			},
			prevUntil: function( elem, i, until ) {
				return mtjQuery.dir( elem, [mtjQuery.fnHelpers.previousSibling, mtjQuery.fnHelpers.parentNode(elem)], until );
			}
		},
		relative: {
			'~': (function() {
				var originalFn = wmjQuery.find.selectors.relative['~'];
				return function( checkSet, part, isXML ) {
					var parents = new Array( checkSet.length );
					for (var i = 0; i < checkSet.length; i++) {
						parents[i] = mtjQuery.fnHelpers.parentNode(checkSet[i]);
					}
					var dir = [mtjQuery.fnHelpers.previousSiblingArr, parents];
					return originalFn(checkSet, part, isXML, dir);
				};
			})()
		},
		filters: {
			// querySelectorAll does a different ":enabled" filter from jQuery ":enable"
			enabled: (function() {
				var originalFn = wmjQuery.expr.filters.enabled;
				return function(elem) {
					var func = elem && (elem.matches || elem.msMatchesSelector);
					if (func) return func.call(elem, ':enabled');
					return originalFn(elem);
				}
			})()
		}
	};

	var extendOverrides = {};
	extendOverrides[isjQuery3() ? 'siblings' : 'sibling'] = function( n, elem ) {
		var r = [],
			parent = n && mtjQuery.fnHelpers.parentNode(n);

		for ( ; n; n = n.nextSibling ) {
			if ( n.nodeType === 1 && n !== elem && (!parent || mtjQuery.fnHelpers.parentEquals(n, parent)) ) {
				r.push( n );
			}
		}

		return r;
	};

	function extendObj(obj, other) {
		var orig = {};
		for (var prop in other) {
			orig[prop] = obj[prop];
		}
		obj.extend(other);
		return orig;
	}

	function overrideObj(obj, other) {
		var orig = {};
		for (var prop in other) {
			orig[prop] = obj[prop];
			obj[prop] = other[prop];
		}
		return orig;
	}

	var sizzle;
	var jqHelperFuncs;
	function bind() {
		sizzle = wmjQuery.find;
		sizzle.sortOrder = (__webpack_require__(679).shadowSortOrder);

		overrideObj(wmjQuery.fnHelpers, overrides.fnHelpers);
		var waitForWalkMeConfigFileLoadedEventForWMJQueryFF = false;
		getCtx().get('EventsListener').once('WalkMeConfigFileLoaded', function() {
			if (getCtx().has('FeaturesManager')) {
				waitForWalkMeConfigFileLoadedEventForWMJQueryFF = getCtx().get('FeaturesManager').isFeatureEnabled('waitForWalkMeConfigFileLoadedEventForWMJQuery');
				if (waitForWalkMeConfigFileLoadedEventForWMJQueryFF) {
					jqHelperFuncs = wmjQuery.queryHelpers;	
				}
			}
		});
		getCtx().get('EventsListener').once('wm_walkmeLibLoaded', function() {
			if (!waitForWalkMeConfigFileLoadedEventForWMJQueryFF) {
				jqHelperFuncs = wmjQuery.queryHelpers;
			}
		});

		// this is used by the editor's inspector
		wmjQuery.getShadowContext = shadowManager.getShadowContext;
		wmjQuery.getShadowRoots = shadowManager.getShadowRoots;
		wmjQuery.hasShadowContext = shadowManager.hasShadowContext;

		getCtx().register('ShadowVersion').asInstance({ get: envTester.getCurrentPlatformVersion });
		getCtx().register('ShadowJQueryBindingWrapper').asCtor(ShadowJQueryBindingWrapper);
		overrideJQuerySelectorRunner();
	}

	function ShadowJQueryBindingWrapper() {
		var originalsMap;

		this.run = function run(cb) {
	    	try {
		    	bindJQuery();
		    	var retVal = cb();
		    	unbindJQuery();
		    	return retVal;
	    	} catch (ex) {
	    		// fallback to original jquery
	    		unbindJQuery();
	    		return cb();
	    	}
		};

	    function bindJQuery() {
	    	if (!originalsMap && hasNativeShadowDOM()) {
	    		originalsMap = {
					sizzle: overrideObj(sizzle, overrides.sizzle),
					wmjQuery: overrideObj(wmjQuery, overrides.wmjQuery),
					fnDefs: overrideObj(wmjQuery.fnDefs, overrides.fnDefs),
					relative: overrideObj(wmjQuery.find.selectors.relative, overrides.relative),
					filters: overrideObj(wmjQuery.expr.filters, overrides.filters),
					extend: extendObj(wmjQuery, extendOverrides)
	    		};
	    	}
	    }

	    function unbindJQuery() {
	    	if (originalsMap) {
				overrideObj(sizzle, originalsMap.sizzle);
				overrideObj(wmjQuery, originalsMap.wmjQuery);
				overrideObj(wmjQuery.fnDefs, originalsMap.fnDefs);
				overrideObj(wmjQuery.find.selectors.relative, originalsMap.relative);
				overrideObj(wmjQuery.expr.filters, originalsMap.filters);
				extendObj(wmjQuery, originalsMap.extend);
	    		originalsMap = undefined;
	    	}
	    }
	}

	function overrideJQuerySelectorRunner() {
		var oldRun;

		getCtx().decorate('JQuerySelectorRunner', JQuerySelectorRunnerOverride);
		getCtx().register('JQuerySelectorRunnerShadow', JQuerySelectorRunnerShadow);
		getCtx().decorate('ElementUtils', ElementUtilsOverride);

		function JQuerySelectorRunnerOverride(jQuerySelectorRunner) {
			oldRun = jQuerySelectorRunner.run;

		    jQuerySelectorRunner.run = function () {
		    	var args = arrUtils.toArray(arguments);

		    	if (getCtx().get('FeaturesManager').isFeatureEnabled('disableShadowjQueryWrapper')) {
		    		return oldRun.apply(jQuerySelectorRunner, args);
		    	} else {
			    	return getCtx().get('ShadowJQueryBindingWrapper').run(function() {
			    		shadowVisibilityManager.useShadowVisible(true);
			    		return oldRun.apply(jQuerySelectorRunner, args);
			    	});
		    	}
		    };

		    return jQuerySelectorRunner;
		}

		function JQuerySelectorRunnerShadow() {
			this.run = function() {
		    	var args = arrUtils.toArray(arguments);

				return getCtx().get('ShadowJQueryBindingWrapper').run(function() {
					shadowVisibilityManager.useShadowVisible(true);
					var runner = getCtx().get('JQuerySelectorRunner');
					var runFn = oldRun || runner.run;
					return runFn.apply(runner, args);
				});
			}
		}

		function ElementUtilsOverride(elementUtils) {
			elementUtils.getChildNodes = wmjQuery.fnHelpers.childNodes;
			return elementUtils;
		}
	}

	bind();
};



/***/ }),

/***/ 946:
/***/ (function(module) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

module.exports = function() {
	var utils = _walkMe.getCommonUtils();
	var jsonMock = {
	    parse: utils.secureEvalJSON,
	    stringify: utils.toJSON
	};
	return jsonMock;
};


/***/ }),

/***/ 173:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

var getCtx = (__webpack_require__(212)/* .getCtx */ .yK);
var logger = getCtx().get('PrelibLogger');

function log() {
	var logRecord = Array().slice.call(arguments);
	logRecord.unshift("[ WmJqueryShadowDom ]");
	logger.write.apply(logger, logRecord);
}

exports.log = log;


/***/ }),

/***/ 972:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

var getCtx = (__webpack_require__(212)/* .getCtx */ .yK);
var FEPlugin = __webpack_require__(647);
var overRidejQuery = __webpack_require__(817);
__webpack_require__(959);

function shadowDomManager(){
	var _this = this;
	var didFeInit = false;
	var didShadowInit = false;
	function shadowDomManager(){

	}

	_this.initFE = function(){
		if (!didFeInit) {
			FEPlugin.initPlugin();
			didFeInit = true;
		}
	}

	_this.jqShadow = function(){
		if (!didShadowInit) {
			var options = setOptions();
			overRidejQuery(wmjQuery, options);
			didShadowInit = true;
		}
	}

	function setOptions(){
		var options = {};
		if (getCtx().has('FeaturesManager')) {
			var featuresManager = getCtx().get('FeaturesManager');
			if (featuresManager.isFeatureEnabled('shadow-dom-no-cache')) {
				options.useCache = false;
			} else if (featuresManager.isFeatureEnabled('shadow-dom-use-cache')) {
				options.useCache = true;
			}
		}
		return options;
	}

}

module.exports = shadowDomManager;


/***/ }),

/***/ 390:
/***/ (function(module) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

module.exports = {
	hasRelevantMutation: hasRelevantMutation
};

function hasRelevantMutation(mutations) {
	if (!mutations) return false;

	// cleanMutations(mutations);

	return any(mutations, isMutationRelevant);
}

function isMutationRelevant(m) {
	var hasElementNode = false;
	var wmRes;
	if (m.addedNodes) {
		wmRes = containsRelevantElement(m.addedNodes);
		hasElementNode = hasElementNode || wmRes.hasElementNode;
		if (wmRes.res) return true;
	}
	if (m.removedNodes) {
		wmRes = containsRelevantElement(m.removedNodes);
		hasElementNode = hasElementNode || wmRes.hasElementNode;
		if (wmRes.res) return true;
	}
	if (!hasElementNode && m.target) {
		wmRes = containsRelevantElement([m.target]);
		if (wmRes.res) return true;
	}
}

/*function cleanMutations(mutations) {
	for (var i = mutations.length - 1; i >= 0; i--) {
		var a = mutations[i];
		for (var j = i - 1; j >= 0; j--) {
			var b = mutations[j];
			if (isSameNodes(a.addedNodes, b.removedNodes) || isSameNodes(a.removedNodes, b.addedNodes)) {
				mutations.splice(i, 1);
				mutations.splice(j, 1);
				break;
			}
		}
	}
}

function isSameNodes(a, b) {
	return a && a.length && b && b.length && a.length === b.length && wmjQuery(a).is(b);
}*/

var testIdRegexes = testArr([/^wm-/, /^walkme-/, /^mt_/, /^widget_/, /^mtbug_/, /^sizzle\d+/]);
var testClassRegexes = testArr([/^walkme-/, /^wmd-/]);
var testClass = function(cls) { return testClassRegexes(cls); };
var ignoredTagsRegexp = /^(link|script)$/i;

function isIgnoreElement(el, checkParent) {
	if (ignoredTagsRegexp.test(el.tagName)) return true;

	var id = el.id;
	if (id && testIdRegexes(id)) return true;

	var classes = ((el.getAttribute && el.getAttribute('class')) || '').split(/\s+/);
	if (any(classes, testClass)) return true;

	if (checkParent) {
		var parent = wmjQuery(el).parent()[0];
		if (parent) {
			return isIgnoreElement(parent);
		}
	}
}

function containsRelevantElement(nodeList) {
	if (!nodeList) return {res: false, hasElementNode: false};

	var hasElementNode = false,
		res = false;
	for (var i = 0; i < nodeList.length; i++) {
		var n = nodeList[i];
		if (n && n.nodeType === 1) {
			hasElementNode = true;
			if (!isIgnoreElement(n, true)) {
				res = true;
				break;
			}
		}
	}
	return {res: res, hasElementNode: hasElementNode};
}

function any(arr, func) {
	for(var i = 0; i < arr.length; i++){
		if(func(arr[i])) return true;
	}
	return false;
}

function testArr(regexArr) {
	return function(str) {
		return any(regexArr, function(regexp) { return regexp.test(str); });
	}
}


/***/ }),

/***/ 528:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

var getCtx = (__webpack_require__(212)/* .getCtx */ .yK);

module.exports = {
	isFeatureEnabled: isFeatureEnabled,
	getShadowPluginVersion: getShadowPluginVersion
};

function isFeatureEnabled(str) {
	if (getCtx().has('FeaturesManager')) {
		return getCtx().get('FeaturesManager').isFeatureEnabled(str);
	}
}

function getShadowPluginVersion(){
	if (getCtx().has('ShadowPluginVersion')) {
		return getCtx().get('ShadowPluginVersion');
	}
}


/***/ }),

/***/ 189:
/***/ (function(module) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

function createAdderType(name) {
	return {
		add: function(shadowContext, currContext) {
			shadowContext[name].shadowRoot = shadowContext[name].shadowRoot.concat(currContext[name].shadowRoot);
			shadowContext[name].slot = shadowContext[name].slot.concat(currContext[name].slot);
			shadowContext[name].content = shadowContext[name].content.concat(currContext[name].content);
		}
	};
}

var adders = {
	containers: createAdderType('containers'),
	content: createAdderType('content')
};

module.exports = function(options) {
	var addersArr = [];
	if (!options || options.containers !== false) {
		addersArr.push(adders.containers);
	}
	if (!options || options.content !== false) {
		addersArr.push(adders.content);
	}
	return addersArr;
};


/***/ }),

/***/ 385:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

var arrUtils = __webpack_require__(216);
var shadowContainerTypesMap = __webpack_require__(163);
var shadowContextUtils = __webpack_require__(911);
var hasRelevantMutation = (__webpack_require__(390).hasRelevantMutation);
var shadowSortOrderManager = __webpack_require__(679);
var getCtx = (__webpack_require__(212)/* .getCtx */ .yK);
var isFeatureEnabled = (__webpack_require__(528).isFeatureEnabled);
var shadowUtils = __webpack_require__(237);

var idSeq = 0,
	getTime = function() { return new Date().getTime(); },
	generateId = function() { return ++idSeq; };

module.exports = function(options) {
	var apiFunc = getShadowContextNoCache,
		cacheInited,
		wmLoaded;
	// configuration of the observer:
	var observer,
		mutationConfig = { childList: true, subtree: true, attributes: true };

	function isUseCache() {
		return options.useCache || isFeatureEnabled('shadow-dom-use-cache') || (options.useCache !== false && window._walkMe && _walkMe.getIsInEditor());
	}

	function initCache() {
		var shadowContextCache = {},
			idPropName = 'wmShadowId' + getTime(),
			lastMutationTime = 0,
			lastCacheUpdate = -1000,
			THROTTLE_TIME_MS = 500;
		apiFunc = function throttledGetShadowContext(context, options) {
			var currTime = getTime();
			var lastUpdateTime = context.wmShadowLastUpdate || 0;
			context[idPropName] = context[idPropName] || generateId();

			var cacheId = [context[idPropName], options.content, options.values].join('-');
			if (!shadowContextCache[cacheId] || (lastMutationTime > lastUpdateTime && currTime > lastUpdateTime + THROTTLE_TIME_MS)) {
				context.wmShadowLastUpdate = lastCacheUpdate = currTime;
				shadowContextCache[cacheId] = getShadowContextNoSort(context, options);
				mapShadowContextValues(shadowContextCache[cacheId], options);
			}
			return shadowContextCache[cacheId];
		};

		observer = new MutationObserver(function(mutations) {
			if (lastMutationTime <= lastCacheUpdate + THROTTLE_TIME_MS && hasRelevantMutation(mutations)) {
				lastMutationTime = getTime();
			}
		});
		 
		// pass in the target node, as well as the observer options
		observer.observe(document, mutationConfig);

		getCtx().get('EventsListener').once(getCtx().get('Consts').EVENTS.BeforeWalkmeRemoved, function() {
			observer.disconnect();
			wmLoaded = false;
			cacheInited = false;
			shadowContextCache = {};
		});
	}

	function mapShadowContextValues(shadowContext, options) {
		if (options && options.values) {
			shadowContext.values = {
				shadowRoot: arrUtils.arrMap(shadowContext.containers.shadowRoot, shadowContainerTypesMap.shadowRoot.value)
			};
			if (cacheInited) {
				arrUtils.arrForEach(shadowContext.values.shadowRoot, function(v) {
					observer.observe(v, mutationConfig);
				});
			}
		}
	}

	function getShadowContextNoSort(context, options) {
		shadowSortOrderManager.setUseShadowSortOrder(false);
		var res = shadowContextUtils.getShadowContext(context, options);
		shadowSortOrderManager.setUseShadowSortOrder(true);
		return res;
	}

	function getShadowContextNoCache(context, options) {
		var shadowContext = getShadowContextNoSort(context, options);
		mapShadowContextValues(shadowContext, options);
		return shadowContext;
	}

	function getShadowContextProxy(context, options) {
		if (wmLoaded) {
			return apiFunc(context, options);
		}
		if (window._walkMe) {
			wmLoaded = true;
		}
		if (!cacheInited && typeof MutationObserver === 'function' && isUseCache()) {
			cacheInited = true;
			initCache();
		}
		return apiFunc(context, options);
	}
	
	function getShadowContextFromArray(context, options) {
		if (!wmjQuery.isArray(context)) {
			return getShadowContextProxy(context, options);
		}

		var shadowContext = {
			containers: { shadowRoot: [], slot: [], content: [] },
			content: { shadowRoot: [], slot: [], content: [] },
			values: { shadowRoot: [] }
		};

		function append(res, key) {
			if (res[key]) {
				if (shadowContext[key].shadowRoot) Array.prototype.push.apply(shadowContext[key].shadowRoot, res[key].shadowRoot);
				if (shadowContext[key].slot) Array.prototype.push.apply(shadowContext[key].slot, res[key].slot);
				if (shadowContext[key].content) Array.prototype.push.apply(shadowContext[key].content, res[key].content);
			}
		}

		for (var i = 0; i < context.length; i++) {
			var curr = getShadowContextProxy(context[i], options);
			append(curr, 'containers');
			append(curr, 'content');
			append(curr, 'values');
		}

		return shadowContext;
	}
	
	return {
		getShadowContext: getShadowContextFromArray,
		// This function is used by the editor inspector
		getShadowRoots: function(context) {
			var allShadowRoots;
			var res = new Set();
			var recursionDepth = 0;
			shadowUtils.findShadowRoots(context, res, recursionDepth);
			allShadowRoots = Array.from(res);
			return allShadowRoots;
		},
		hasShadowContext: function(context) {
			return isContentUnreachableBySelector(this.getShadowContext(context, {
				content: true,
				stopCB: foundShadowContext
			}));
		}
	};
};

function foundShadowContext(shadowContext) {
	return shadowContext.content.shadowRoot.length > 0 ||
		shadowContext.content.slot.length > 0 ||
		shadowContext.content.content.length > 0;
}

function isContentUnreachableBySelector(shadowContext) {
	var allContent = shadowContext.content.shadowRoot.concat(shadowContext.content.slot).concat(shadowContext.content.content);
	if (allContent.length === 0) {
		return;
	}

	var tagNamesMap = arrUtils.arrReduce(allContent, function(tn, elm) {
		tn[elm.tagName] = 1;
		return tn;
	}, {});

	var selector = '';
	for (var name in tagNamesMap) {
		selector += ',' + name;
	}
	selector = selector.substr(1); // remove first ','

	var elements;
	try {
		elements = document.querySelectorAll(selector);
	} catch (ex) {
		elements = wmjQuery(selector);
	}

	for (var i = 0; i < allContent.length; i++) {
		if (!arrUtils.arrContains(elements, allContent[i])) {
			return true;
		}
	}

	return false;
}


/***/ }),

/***/ 94:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

var shadowContainerTypesMap = __webpack_require__(163);
module.exports = {
	parents: [
		shadowContainerTypesMap.slot,
		shadowContainerTypesMap.content,
		shadowContainerTypesMap.regular,
		shadowContainerTypesMap.shadowRoot
	],
	children: [
		shadowContainerTypesMap.shadowRoot,
		shadowContainerTypesMap.slot,
		shadowContainerTypesMap.content,
		shadowContainerTypesMap.regular
	]
};


/***/ }),

/***/ 163:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

var arrUtils = __webpack_require__(216);
var querySelectorSpecialContent = __webpack_require__(393);

module.exports = {
	regular: {
		test: function(e) {
			return true;
		},
		children: function(e) {
			return e.children;
		},
		childNodes: function(e) {
			return e.childNodes;
		},
		firstChild: function(e) {
			return e.firstChild;
		},
		firstElementChild: function(e) {
			return e.firstElementChild;
		},
		parent: function(e) {
			return e.parentNode;
		},
		getRoot: function(e) {
			return [e];
		}
	},
	shadowRoot: {
		test: function(e) { return this.value(e); },
		value: function(e) {
			return e.shadowRoot || wmjQuery.fnHelpers.wrapIfNeeded(e).shadowRoot;
		},
		children: function(e) {
			var shadowRoot = this.value(e);
			return (shadowRoot && shadowRoot.children) || [];
		},
		childNodes: function(e) {
			var shadowRoot = this.value(e);
			return shadowRoot && shadowRoot.childNodes;
		},
		firstChild: function(e) {
			var shadowRoot = this.value(e);
			return shadowRoot && shadowRoot.firstChild;
		},
		firstElementChild: function(e) {
			var shadowRoot = this.value(e);
			return shadowRoot && shadowRoot.firstElementChild;
		},
		parent: function(e) {
			return e.host;
		},
		getRoot: function(e) {
			return [this.value(e)];
		}
	},
	slot: {
		test: function(e) { return this.value(e).assignedNodes && wmjQuery.nodeName( e, "slot" ); },
		value: function(e) {
			return e.assignedNodes ? e : wmjQuery.fnHelpers.wrapIfNeeded(e);
		},
		children: function(e) {
			var v = this.value(e);
			return arrUtils.toArray((v.assignedNodes && v.assignedNodes(/*{ flatten:true }*/)) || []);
		},
		childNodes: function(e) {
			return this.children(e);
		},
		firstChild: function(e) {
			return this.children(e)[0];
		},
		firstElementChild: function(e) {
			return firstElementChild(this.children(e));
		},
		parent: function(e) {
			return e.assignedSlot || wmjQuery.fnHelpers.wrapIfNeeded(e).assignedSlot;
		},
		getRoot: function(e) {
			return [createQueryableCollection(this.children(e))];
		}
	},
	content: {
		test: function(e) { return this.value(e).getDistributedNodes && wmjQuery.nodeName( e, "content" ) },
		value: function(e) {
			return e.getDistributedNodes ? e : wmjQuery.fnHelpers.wrapIfNeeded(e);
		},
		children: function(e) {
			var v = this.value(e);
			return arrUtils.toArray(v.getDistributedNodes && v.getDistributedNodes() || []);
		},
		childNodes: function(e) {
			return this.children(e);
		},
		firstChild: function(e) {
			return this.children(e)[0];
		},
		firstElementChild: function(e) {
			return firstElementChild(this.children(e));
		},
		parent: function(e) {
			var v = e.getDestinationInsertionPoints ? e : wmjQuery.fnHelpers.wrapIfNeeded(e);
			if (v.getDestinationInsertionPoints) {
				var p = v.getDestinationInsertionPoints();
				// TODO: what if it has 2 parents?
				return p && p[0];
			}
		},
		getRoot: function(e) {
			return [createQueryableCollection(this.children(e))];
		}
	},
	iframe: {
		test: function(e) {
			return wmjQuery.nodeName( e, "iframe" ) && this.value(e);
		},
		value: function(e) {
			try {
				return e.contentDocument;
			} catch(ex) {
				// cross-domain iframe
			}
		},
		getRoot: function(e) {
			return [this.value(e)];
		}
	}
};

function firstElementChild(nodes) {
	var node, i = 0;
	while (node = nodes[i++]) {
        if (node.nodeType === 1) {
            return node;
        }
    }
    return null;
}

function createQueryableCollection(arr) {
	return {
		querySelectorAll: function(selector) {
			return querySelectorSpecialContent([], arr, selector);
		}
	};
}


/***/ }),

/***/ 911:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

var isFeatureEnabled = (__webpack_require__(528).isFeatureEnabled);
var arrUtils = __webpack_require__(216);
var wrapUtils = __webpack_require__(186)(wmjQuery);
var elementUtils = __webpack_require__(197);
var shadowContainerTypesMap = __webpack_require__(163);
var adders = __webpack_require__(189);
var shadowVisibilityManager = __webpack_require__(80);

function getShadowContainers(context) {
	var shadowContainers = [];
	var slotContainers = [];
	var contentContainers = [];
	var jqContext = wmjQuery(context);
	for (var i = 0; i < jqContext.length; i++) {
		var e = jqContext[i];
		if (shadowContainerTypesMap.slot.test(e)) {
			slotContainers.push(e);
		}
		if (shadowContainerTypesMap.content.test(e)) {
			contentContainers.push(e);
		}
		if (shadowContainerTypesMap.shadowRoot.test(e)) {
			shadowContainers.push(e);
		} else {
			var allChildren = arrUtils.arrFilter(elementUtils.getElementChildren(e), filterShadowVisible);
			if (allChildren.length > 0) {
				shadowContainers = shadowContainers.concat(arrUtils.arrFilter(allChildren, function(e) {
					return shadowContainerTypesMap.shadowRoot.test(e);
				}));
				slotContainers = slotContainers.concat(arrUtils.arrFilter(allChildren, function(e) {
					return shadowContainerTypesMap.slot.test(e);
				}));
				contentContainers = contentContainers.concat(arrUtils.arrFilter(allChildren, function(e) {
					return shadowContainerTypesMap.content.test(e);
				}));
			}
		}
	}

	return {
		shadowRoot: wmjQuery.find.uniqueSort(arrUtils.arrMap(shadowContainers, wrapUtils.unwrapElement)),
		slot: wmjQuery.find.uniqueSort(arrUtils.arrMap(slotContainers, wrapUtils.unwrapElement)),
		content: wmjQuery.find.uniqueSort(arrUtils.arrMap(contentContainers, wrapUtils.unwrapElement))
	};
}

function filterShadowVisible(element) {
	if (!element) return false;

	if (!shadowVisibilityManager.useShadowVisible()) {
		return true;
	}

	try {
		return isVisible(element) || 
			(arrUtils.arrReduce(['slot','content','shadowRoot'], function(res, type) {
						return res || shadowContainerTypesMap[type].test(element);
					}, false)
			&& filterShadowVisible(wmjQuery.fnHelpers.parentNode(element)));
	} catch(ex) {
		return false;
	}
}

// source: https://stackoverflow.com/questions/13388616/firefox-query-selector-and-the-visible-pseudo-selector
function isVisible(elem) {
	return elem.offsetWidth > 0 || elem.offsetHeight > 0 || (elem.getClientRects && elem.getClientRects().length > 0);
}

function getShadowContent(shadowContainers, type) {
	return wmjQuery.find.uniqueSort(arrUtils.arrMap(arrUtils.concatArrays(arrUtils.arrMap(shadowContainers, function(e) {
		return arrUtils.toArray(shadowContainerTypesMap[type].children(e));
	})), wrapUtils.unwrapElement));
}

function getShadowContext(context, options) {
	options = options || {};
	var shadowContext = {
		containers: { shadowRoot: [], slot: [], content: [] },
		content: { shadowRoot: [], slot: [], content: [] }
	};
	var addersArr = adders(options);
	getShadowContextDeep(context, function(element, result) {
		for (var j = addersArr.length - 1; j >= 0; j--) {
			addersArr[j].add(shadowContext, result);
		}
		if (options.stopCB && options.stopCB(shadowContext)) {
			// stop iterating
			return false;
		}
	});
	
	return shadowContext;
}

function addContentChildren(shadowContext) {
	if (shadowContext.content) {
		shadowContext.content.shadowRoot = shadowContext.content.shadowRoot.concat(elementUtils.getElementsChildren(shadowContext.content.shadowRoot));
		shadowContext.content.slot = shadowContext.content.slot.concat(elementUtils.getElementsChildren(shadowContext.content.slot));
		shadowContext.content.content = shadowContext.content.content.concat(elementUtils.getElementsChildren(shadowContext.content.content));
	}
}

function getShadowContextDeep(context, callback) {
	var addersArr = adders();
	var containers = getShadowContainers(context);
	var content = {
		shadowRoot: getShadowContent(containers.shadowRoot, 'shadowRoot'),
		slot: getShadowContent(containers.slot, 'slot'),
		content: getShadowContent(containers.content, 'content')
	};

	if (callback(context, {
				containers: containers,
				content: content
			}) === false) {
		return;
	}

	var prevContent = content.shadowRoot.concat(content.slot).concat(content.content);
	var doNext = true;

	while (prevContent.length > 0 && doNext) {
		var moreContext = arrUtils.arrReduce(arrUtils.arrMap(prevContent, function(e){
			return getShadowContainers(e);
		}), function(moreContext, curr, i) {
			var moreShadowContent = getShadowContent(curr.shadowRoot, 'shadowRoot');
			var moreSlotContent = getShadowContent(curr.slot, 'slot');
			var moreContentContent = getShadowContent(curr.content, 'content');

			if (curr.shadowRoot.length > 0 ||
					curr.slot.length > 0 ||
					moreShadowContent.length > 0 ||
					moreSlotContent.length > 0 ||
					moreContentContent.length > 0) {
				var currResult = {
					containers: curr,
					content: {
						shadowRoot: moreShadowContent,
						slot: moreSlotContent,
						content: moreContentContent
					}
				};
				if (callback(prevContent[i], currResult) === false) {
					doNext = false;
				}

				for (var j = addersArr.length - 1; j >= 0; j--) {
					addersArr[j].add(moreContext, currResult);
				}
			}

			return moreContext;
		}, {
			containers: {shadowRoot: [], slot: [], content: []},
			content: {shadowRoot: [], slot: [], content: []}
		});

		prevContent = moreContext.content.shadowRoot.concat(moreContext.content.slot).concat(moreContext.content.content);
	}
}

module.exports = {
	getShadowContext: getShadowContext,
	getShadowContextDeep: getShadowContextDeep,
	addContentChildren: addContentChildren
};


/***/ }),

/***/ 959:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

var getCtx = (__webpack_require__(212)/* .getCtx */ .yK);

getCtx().register('ShadowDOMPluginSupportLevel')
	.asCtor(ShadowDOMPluginSupportLevel);

function ShadowDOMPluginSupportLevel () {
	var _this = this;
	_this.get = get;

	function get () {
		return 3;
	}
}



/***/ }),

/***/ 679:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */


var sizzle = wmjQuery.find;
var _useShadowSortOrder = true;
var wrapUtils = __webpack_require__(186)(wmjQuery);

var shadowSortOrder = (function() {
	var originalFn = wmjQuery.find.sortOrder;
	if (originalFn && originalFn !== wmjQuery.find.sortOrderFuncs.vanilla) {
		return function sortOrder( a, b ) {
			var func;
			if (_useShadowSortOrder &&
					(wmjQuery.fnHelpers.isInShadow(a) || wmjQuery.fnHelpers.isInShadow(b))) {
				func = sizzle.sortOrderFuncs.vanilla;
			} else {
				func = originalFn;
			}
			return func( wrapUtils.unwrapElement(a), wrapUtils.unwrapElement(b) );
		};
	} else {
		return originalFn;
	}
})();

module.exports = {
	shadowSortOrder: shadowSortOrder,
	setUseShadowSortOrder: function(val) { _useShadowSortOrder = val; }
};


/***/ }),

/***/ 237:
/***/ (function(module) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

module.exports = { 
	findShadowRoots: function findShadowRoots(elem, res, recDepth) {
		if (recDepth >= 1000) {
			return res;
		}
		if (elem && elem.shadowRoot && elem.shadowRoot.children) {
			var children = elem.shadowRoot.children || [];
			for (var i = 0; i < children.length; i++) {
				findShadowRoots(children[i], res, recDepth + 1);
			}
		}

		if (elem && elem.children && elem.children.length) {
			for (var i = 0; i < elem.children.length; i++) {
				findShadowRoots(elem.children[i], res, recDepth + 1);
			} 
		}

		if (elem.shadowRoot){
			res.add(elem.shadowRoot);
		}	
	}
}


/***/ }),

/***/ 80:
/***/ (function(module) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

var _useShadowVisible = true;

module.exports = {
	useShadowVisible: function(val) {
		if (val !== undefined) {
			_useShadowVisible = val;
		}
		return _useShadowVisible;
	}
};


/***/ }),

/***/ 425:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

var createPluginEntry = (__webpack_require__(212)/* .createPluginEntry */ .mJ);
var getCtx = (__webpack_require__(212)/* .getCtx */ .yK);

module.exports = createPluginEntry(function(registerPlugin) {
	function getShadowDomClass(){		
		getCtx().register('ShadowPluginVersion').asInstance('4.1.0');
		var registerShadowToCtx = (__webpack_require__(701).registerToCtx);
		registerShadowToCtx(getCtx);
		var shadowDomClass = (__webpack_require__(660)/* .WmJqueryShadowDom */ .v);
		return new shadowDomClass();
	}

    registerPlugin(getShadowDomClass());
});



/***/ }),

/***/ 660:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

var getCtx = (__webpack_require__(212)/* .getCtx */ .yK);

function WmJqueryShadowDom() {
	var _this = this;
	_this.run = run;
	var shadowDomManager;

	function ctor() {
		shadowDomManager = getCtx().get('ShadowDomjQuery');
	}

	function run() {
		shadowDomManager.jqShadow();
		shadowDomManager.initFE();
	}

	ctor();
}

exports.v = WmJqueryShadowDom;



/***/ }),

/***/ 212:
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
/******/ 	var __webpack_exports__ = __webpack_require__(453);
/******/ 	wmbundle = __webpack_exports__;
/******/ 	
/******/ })()
;
/* WalkMe Module */ return wmbundle; })
//# sourceMappingURL=bundle.js.map
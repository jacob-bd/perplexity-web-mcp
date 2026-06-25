/* WalkMe Module */ typeof _walkmeInternals !== 'undefined' && _walkmeInternals.wmloader && _walkmeInternals.wmloader.define('wm-plugin-sap-keyboard-shortcuts@1.0.2@prelib', {"name":"wm-plugin-sap-keyboard-shortcuts","version":"1.0.2","toolbelt":"2.0.2","packageDate":"2025-11-18T14:09:55.179Z","entry":"prelib"}, function (__wmplugin__) {  
var wmbundle;
/******/ (function() { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 5:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

module.exports = __webpack_require__(178);



/***/ }),

/***/ 178:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

var createPluginEntry = (__webpack_require__(180)/* .createPluginEntry */ .mJ);

module.exports = createPluginEntry(function(registerPlugin) {
    var SapKeyboardShortcuts = (__webpack_require__(579)/* .SapKeyboardShortcuts */ .v);

    registerPlugin(new SapKeyboardShortcuts());
});



/***/ }),

/***/ 579:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

var getCtx = (__webpack_require__(180)/* .getCtx */ .yK);

function SapKeyboardShortcuts() {
	var _this = this;
	_this.run = run;
	var eventsListener;
	var commonEvents;
	var commonUtils;
	var cachedKbdData;

	function ctor() {
		eventsListener = getCtx().get('EventsListener');
	}

	function run() {
		eventsListener.once('DataLoadedEvent', registerToEvents);
	}

	function registerToEvents() {
		commonEvents = getCtx().get('CommonEvents');
		commonUtils = getCtx().get("CommonUtils");
		var messagePort;

		// get the message port
		window.addEventListener("message", function (oEvent) {
			var oData = oEvent && oEvent.data;
			if (oData && oData.service === "sap.ui.interaction.MessagePortReady") {

				messagePort = oEvent.ports[0];

				// message handling on the received port
				messagePort.onmessage = function (oEvent) {
					if (oEvent && oEvent.data && oEvent.data.service === "sap.ui.interaction.UpdateDisplay") {
						if (cachedKbdData && commonUtils.isEqual(cachedKbdData, oEvent.data.payload) || document.activeElement.id === 'wm-application-wrapper-workstation-web') {
							return;
						}

						var result = onMessageReceived(oEvent);
						commonEvents.raiseEvent('displayKeyboardShortcuts', result);
						cachedKbdData = oEvent.data.payload;
					}
				};

				// Start displaying interaction information
				messagePort.postMessage({ service: "sap.ui.interaction.StartDisplay" });
			}
		});

		// Request message port
		window.postMessage({
			id: "sap.fe.interaction.Popup",
			service: "sap.ui.interaction.RequestMessagePort"
		});
	}

	function getDocsDetail(docsPath, data) {
		var splitPath = docsPath.split("/");
		var result = data;
		splitPath.forEach(function (path) {
			result = result ? result[path] : undefined;
		});
		return result;
	}
	
	function collapseDuplicate(elements, filterQuery) {
		var map = {};
		elements.forEach(function (element) {
			if (!map[element.label]) {
				map[element.label] = [];
			}
			element.nodes
				.filter(function (node) {
					return node.label.toLowerCase().indexOf(filterQuery.toLowerCase()) !== -1;
				})
				.forEach(function (node) {
					var exists = false;
					for (var i = 0; i < map[element.label].length; i++) {
						if (map[element.label][i].label === node.label) {
							exists = true;
							break;
						}
					}
					if (!exists) {
						map[element.label].push(node);
					}
				});
		});
	
		var result = [];
		for (var label in map) {
			if (map.hasOwnProperty(label)) {
				result.push({
					label: label,
					nodes: map[label]
				});
			}
		}
		return result;
	}
	
	function onMessageReceived(e) {
		var originalTree = [];
		var shortcutsTree = [];
	
		var elements = e.data.payload.elements.slice().reverse();
	
		originalTree = elements.map(function (element) {
			var nodes = [];
			element.interactions.forEach(function (shortcut) {
				if (shortcut.$ref) {
					var interactions = getDocsDetail(shortcut.$ref, e.data.payload);
					if (interactions) {
						interactions.forEach(function (docInteraction) {
							nodes.push({
								label: docInteraction.description,
								shortcutKeys: docInteraction.kbd.map(function (keyObj) {
									return mapKeyToSymbol(keyObj);
								})
							});
						});
					}
				} else {
					nodes.push({
						label: shortcut.description || shortcut.name,
						shortcutKeys: shortcut.kbd.map(function (keyObj) {
							return mapKeyToSymbol(keyObj);
						})
					});
				}
			});
	
			return {
				label: element.label,
				nodes: nodes
			};
		});
	
		shortcutsTree = collapseDuplicate(originalTree.slice(), "");
	
		var keyboardShortcuts = shortcutsTree.map(function (item) {
			return {
				title: item.label,
				shortcuts: item.nodes.map(function (node) {
					return {
						description: node.label,
						keys: Object.prototype.toString.call(node.shortcutKeys) === '[object Array]'
							? node.shortcutKeys
							: [node.shortcutKeys]
					};
				})
			};
		});
	
		return { keyboardShortcuts: keyboardShortcuts };
	}
	

	function mapKeyToSymbol(keyObj) {
		switch (keyObj.raw.trim()) {
			case "ArrowDown":
				return "↓";
			case "ArrowUp":
				return "↑";
			case "ArrowLeft":
				return "←";
			case "ArrowRight":
				return "→";
			default:
				return keyObj.translated;
		}
	}

	ctor();
}

exports.v = SapKeyboardShortcuts;


/***/ }),

/***/ 180:
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
/******/ 	var __webpack_exports__ = __webpack_require__(5);
/******/ 	wmbundle = __webpack_exports__;
/******/ 	
/******/ })()
;
/* WalkMe Module */ return wmbundle; })
//# sourceMappingURL=bundle.js.map
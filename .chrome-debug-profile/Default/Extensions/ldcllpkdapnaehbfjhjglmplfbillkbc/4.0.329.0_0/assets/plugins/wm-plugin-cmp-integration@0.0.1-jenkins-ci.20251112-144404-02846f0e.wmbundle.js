/* WalkMe Module */ typeof _walkmeInternals !== 'undefined' && _walkmeInternals.wmloader && _walkmeInternals.wmloader.define('wm-plugin-cmp-integration@0.0.1-jenkins-ci.20251112-144404-02846f0e@prelib', {"name":"wm-plugin-cmp-integration","version":"0.0.1-jenkins-ci.20251112-144404-02846f0e","toolbelt":"2.0.2","packageDate":"2025-11-20T07:44:26.394Z","entry":"prelib"}, function (__wmplugin__) {  
var wmbundle;
/******/ (function() { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 190:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

module.exports = __webpack_require__(548);



/***/ }),

/***/ 467:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

"use strict";

var getCtx = (__webpack_require__(653)/* .getCtx */ .yK);
var log = (__webpack_require__(253)/* .log */ .R);
var senConnector = __webpack_require__(908);
function CmpIntegration() {
  var _this = this;
  _this.run = run;
  var promiseManager;
  var eventsListener;
  var eventsTrigger;
  function ctor() {
    promiseManager = getCtx().get('PromiseManager');
    eventsListener = getCtx().get('EventsListener');
    eventsTrigger = getCtx().get('EventsTrigger');
  }
  function logToConsole(message) {
    try {
      /*allowFunc*/console.log(message);
    } catch (e) {
      // ignore
    }
  }
  function run() {
    eventsListener.once('WalkMeReady', function () {
      try {
        if (localStorage.getItem('wmDisableCmpPlugin') == 1) {
          logToConsole('WalkMe Cmp Plugin is disabled by wmDisableCmpPlugin localStorage flag');
          return;
        }
        if (location.search.indexOf('wmDisableCmpPlugin') > -1) {
          logToConsole('WalkMe Cmp Plugin is disabled by wmDisableCmpPlugin URL flag');
          return;
        }
      } catch (e) {
        // ignore
      }
      senConnector.startIntegration();
    });
  }
  ctor();
}
exports.v = CmpIntegration;


/***/ }),

/***/ 253:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

"use strict";

var getCtx = (__webpack_require__(653)/* .getCtx */ .yK);
var logger = getCtx().get('PrelibLogger');
function log() {
  var logRecord = Array().slice.call(arguments);
  logRecord.unshift("[ CmpIntegration ]");
  logger.write.apply(logger, logRecord);
}
exports.R = log;


/***/ }),

/***/ 548:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

"use strict";

var createPluginEntry = (__webpack_require__(653)/* .createPluginEntry */ .mJ);
module.exports = createPluginEntry(function (registerPlugin) {
  var CmpIntegration = (__webpack_require__(467)/* .CmpIntegration */ .v);
  registerPlugin(new CmpIntegration());
});


/***/ }),

/***/ 653:
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

/***/ 908:
/***/ (function(module) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

(function webpackUniversalModuleDefinition(root, factory) {
	if(true)
		module.exports = factory();
	else { var i, a; }
})(self, function() {
return /******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 903:
/***/ (function(__unused_webpack_module, exports, __nested_webpack_require_638__) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getWalkMeItemTypeFromWalkMeId = exports.getTileIdFromDescriptor = exports.getSmartTipIdFromDescriptor = exports.getOrCreateWalkMeIdForTile = exports.getTileDescriptorFromTileId = exports.getTileDescriptorFromSmartTipId = exports.getTileIdFromSmartTipId = exports.getWalkMeIdFromTileId = void 0;
var companionApi_1 = __nested_webpack_require_638__(639);
var currentWalkMeId = Date.now();
var tileIdToWalkMeIdMapping = {};
var walkMeIdToTileIdMapping = {};
var tileIdToDescriptorMapping = {};
var descriptorToTileMapping = {};
var itemTypesMapping = {};
var getOrCreateWalkMeIdForTile = function (tile, itemType, shouldUseDescriptor) {
    var tileId = tile.id;
    if (!tileIdToWalkMeIdMapping[tileId]) {
        tileIdToWalkMeIdMapping[tileId] = currentWalkMeId;
        walkMeIdToTileIdMapping[currentWalkMeId] = tileId;
        itemTypesMapping[currentWalkMeId] = itemType;
        currentWalkMeId++;
        if (shouldUseDescriptor) {
            var descriptor = getTileDescriptor(tile);
            tileIdToDescriptorMapping[tileId] = descriptor;
            descriptorToTileMapping[descriptor] = tileId;
        }
    }
    return tileIdToWalkMeIdMapping[tileId];
};
exports.getOrCreateWalkMeIdForTile = getOrCreateWalkMeIdForTile;
var getTileDescriptor = function (tile) {
    var view2 = companionApi_1.Help4.widget.help.view2;
    var descriptor = view2.extractTileDescriptor(tile);
    return descriptor;
};
var getWalkMeItemTypeFromWalkMeId = function (walkMeId) {
    return itemTypesMapping[walkMeId];
};
exports.getWalkMeItemTypeFromWalkMeId = getWalkMeItemTypeFromWalkMeId;
var getWalkMeIdFromTileId = function (tileId) {
    return tileIdToWalkMeIdMapping[tileId];
};
exports.getWalkMeIdFromTileId = getWalkMeIdFromTileId;
var getTileIdFromSmartTipId = function (walkMeId) {
    return walkMeIdToTileIdMapping[walkMeId];
};
exports.getTileIdFromSmartTipId = getTileIdFromSmartTipId;
var getTileDescriptorFromTileId = function (tileId) {
    return tileIdToDescriptorMapping[tileId];
};
exports.getTileDescriptorFromTileId = getTileDescriptorFromTileId;
var getTileDescriptorFromSmartTipId = function (walkMeId) {
    var tileId = getTileIdFromSmartTipId(walkMeId);
    if (!tileId) {
        return;
    }
    return getTileDescriptorFromTileId(tileId);
};
exports.getTileDescriptorFromSmartTipId = getTileDescriptorFromSmartTipId;
var getTileIdFromDescriptor = function (descriptor) {
    var tileId = descriptorToTileMapping[descriptor];
    return tileId;
};
exports.getTileIdFromDescriptor = getTileIdFromDescriptor;
var getSmartTipIdFromDescriptor = function (descriptor) {
    var tileId = getTileIdFromDescriptor(descriptor);
    if (!tileId) {
        return;
    }
    return getWalkMeIdFromTileId(tileId);
};
exports.getSmartTipIdFromDescriptor = getSmartTipIdFromDescriptor;


/***/ }),

/***/ 299:
/***/ (function(__unused_webpack_module, exports, __nested_webpack_require_3601__) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.convertTileToArticle = void 0;
var walkme_1 = __nested_webpack_require_3601__(763);
var tileIdToWalkMeIdConverter_1 = __nested_webpack_require_3601__(903);
var articleCreator_1 = __nested_webpack_require_3601__(104);
var convertTileToArticle = function (tile) {
    var id = (0, tileIdToWalkMeIdConverter_1.getOrCreateWalkMeIdForTile)(tile, walkme_1.WalkMeItemType.Resource, false);
    return (0, articleCreator_1.createArticle)({ id: id, name: tile.caption, url: tile.url });
};
exports.convertTileToArticle = convertTileToArticle;


/***/ }),

/***/ 407:
/***/ (function(__unused_webpack_module, exports, __nested_webpack_require_4271__) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.convertTileToShuttle = void 0;
var walkme_1 = __nested_webpack_require_4271__(763);
var consts_1 = __nested_webpack_require_4271__(540);
var tileIdToWalkMeIdConverter_1 = __nested_webpack_require_4271__(903);
var PLAY_MODE = {
    Widget: 0,
    LightBox: 1,
    NewTab: 2,
    SameTab: 3
};
var convertPlayMode = function (tile) {
    if (tile.linkLightbox) {
        return PLAY_MODE.LightBox.toString();
    }
    ;
    return PLAY_MODE.NewTab.toString();
};
var convertTileToShuttle = function (tile) {
    var id = (0, tileIdToWalkMeIdConverter_1.getOrCreateWalkMeIdForTile)(tile, walkme_1.WalkMeItemType.Shuttle, true);
    var playMode = convertPlayMode(tile);
    var result = {
        "DeployableSystems": null,
        "Description": tile.summaryText,
        "DestinationUrl": tile.linkTo,
        "Goals": [],
        "Guid": null,
        "Id": id,
        "Keywords": [],
        "Name": tile.title,
        "OrderIndex": 0,
        "ResourceId": "guid-" + id,
        "Settings": {
            "AutoKeywords": [],
            "BlockedAutoKeywords": [],
            "ShuttlePlayMode": playMode
        },
        "isRto": true,
        // This is needed by the player, somewhere in the player code it is added but for some reason
        // it was not added for the shuttle that added at runtime.
        "deployableType": consts_1.ShuttleType
    };
    return result;
};
exports.convertTileToShuttle = convertTileToShuttle;


/***/ }),

/***/ 752:
/***/ (function(__unused_webpack_module, exports, __nested_webpack_require_5848__) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.convertTilePositionToSmarttipPosition = void 0;
var types_1 = __nested_webpack_require_5848__(159);
var convertTilePositionToSmarttipPosition = function (tilePosition) {
    var iconOffset = 20; // Note - this should be by the relevant icon size. assuming all is "XS" for now.
    // TODO: Understand all ENOW options, what is above vs outside? 
    // TODO: For RTL, I think we need to switch left and right.
    switch (tilePosition) {
        case 'A': // Top Left, Outside - This this should be similar to WalkMe's outside behavior
            return {
                position: types_1.WalkMePositions.TopLeft,
                perimeter: types_1.WalkMePermeters.Outside
            };
        case 'B': // Top Start, Above - This is above the element, but aligned with the element's left side.
            return {
                position: types_1.WalkMePositions.TopLeft,
                perimeter: types_1.WalkMePermeters.Outside,
                genericLeftOffset: iconOffset
            };
        case 'C': // Top Center
            return {
                position: types_1.WalkMePositions.Top,
                perimeter: types_1.WalkMePermeters.Outside
            };
        case 'D': // Top End, Above, This is above the element, but aligned with the element's right side.
            return {
                position: types_1.WalkMePositions.TopRight,
                perimeter: types_1.WalkMePermeters.Outside,
                genericLeftOffset: -iconOffset, // TODO: We probably need to reduce the icon size here. 
                genericTopOffset: 0
            };
        case 'E': // Top Right, Outside
            return {
                position: types_1.WalkMePositions.TopRight,
                perimeter: types_1.WalkMePermeters.Outside
            };
        case 'F': // Top Start
            return {
                position: types_1.WalkMePositions.TopLeft,
                perimeter: types_1.WalkMePermeters.Outside,
                genericTopOffset: iconOffset
            };
        case 'G': // Top End
            return {
                position: types_1.WalkMePositions.TopRight,
                perimeter: types_1.WalkMePermeters.Outside,
                genericTopOffset: iconOffset
            };
        case 'H': // Middle Left
            return {
                position: types_1.WalkMePositions.Left,
                perimeter: types_1.WalkMePermeters.Outside
            };
        case 'I': // Middle Right
            return {
                position: types_1.WalkMePositions.Right,
                perimeter: types_1.WalkMePermeters.Outside
            };
        case 'J': // Bottom Start
            return {
                position: types_1.WalkMePositions.BottomLeft,
                perimeter: types_1.WalkMePermeters.Outside,
                genericTopOffset: -iconOffset
            };
        case 'K': // Bottom End
            return {
                position: types_1.WalkMePositions.BottomRight,
                perimeter: types_1.WalkMePermeters.Outside,
                genericTopOffset: -iconOffset
            };
        case 'L': // Bottom Start, Outside
            return {
                position: types_1.WalkMePositions.BottomLeft,
                perimeter: types_1.WalkMePermeters.Outside,
            };
        case 'M': // Bottom Start, Below
            return {
                position: types_1.WalkMePositions.BottomLeft,
                perimeter: types_1.WalkMePermeters.Outside,
                genericLeftOffset: iconOffset
            };
        case 'N': // Bottom Center
            return {
                position: types_1.WalkMePositions.Bottom,
                perimeter: types_1.WalkMePermeters.Outside
            };
        case 'O': // Bottom End, Below
            return {
                position: types_1.WalkMePositions.BottomRight,
                perimeter: types_1.WalkMePermeters.Outside,
                genericLeftOffset: -iconOffset
            };
        case 'P': // Bottom Right, Outside
            return {
                position: types_1.WalkMePositions.BottomRight,
                perimeter: types_1.WalkMePermeters.Outside
            };
        case 'Q': // Centered
            return {
                position: types_1.WalkMePositions.Center,
                perimeter: types_1.WalkMePermeters.Inside
            };
        case 'R': // Manual
            //  TODO: What is manual?
            return {
                position: types_1.WalkMePositions.Center,
                perimeter: types_1.WalkMePermeters.Outside
            };
        default:
            return {
                position: types_1.WalkMePositions.TopRight,
                perimeter: types_1.WalkMePermeters.Outside
            };
    }
};
exports.convertTilePositionToSmarttipPosition = convertTilePositionToSmarttipPosition;


/***/ }),

/***/ 583:
/***/ (function(__unused_webpack_module, exports, __nested_webpack_require_10844__) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getSmartTipFromTile = void 0;
var consoleLogger_1 = __nested_webpack_require_10844__(969);
var walkme_1 = __nested_webpack_require_10844__(763);
var tileIdToWalkMeIdConverter_1 = __nested_webpack_require_10844__(903);
var tilePositionAdapter_1 = __nested_webpack_require_10844__(752);
var createdSmartTips = {};
var getSmartTipFromTile = function (tile) {
    var walkmeId = (0, tileIdToWalkMeIdConverter_1.getWalkMeIdFromTileId)(tile.id);
    if (walkmeId) {
        var existingSmartTip = createdSmartTips[walkmeId];
        if (existingSmartTip) {
            return existingSmartTip;
        }
    }
    var smartTip = convertTileToSmarttip(tile);
    if (smartTip) {
        createdSmartTips[smartTip.Id] = smartTip;
    }
    return smartTip;
};
exports.getSmartTipFromTile = getSmartTipFromTile;
var convertTileToSmarttip = function (tile) {
    var _a, _b;
    try {
        var id = (0, tileIdToWalkMeIdConverter_1.getOrCreateWalkMeIdForTile)(tile, walkme_1.WalkMeItemType.SmartTip, true);
        var guid = "guid-" + id;
        // WalkMe keeps checking the element to see if it still visible. These are different "algorithms" to check.
        // const VISIBILITY_FILTERS = {
        // 	0: 'mt_visible',
        // 	1: 'wm_vsb_st',
        // 	2: 'wm_interact_any_point',
        // 	3: 'wm_interact_all_points',
        // 	4: 'mt_visible_int_all_pnts',
        // 	5: 'mt_visible_int_any_pnt'
        // };
        var wm_interact_any_point = 2;
        var identifySettings = {
            "isHelp4Selector": true,
            "help4Selector": tile.hotspotAnchor,
            "debugData": tile,
            "Settings": {
                "filter": wm_interact_any_point
            }
        };
        var name_1 = tile.title;
        var smartTipPosition = (0, tilePositionAdapter_1.convertTilePositionToSmarttipPosition)(tile.hotspotIconPos);
        var leftOffset = ((_a = smartTipPosition.genericLeftOffset) !== null && _a !== void 0 ? _a : 0) + (tile.hotspotOffset ? tile.hotspotManualOffset.left : 0);
        var topOffset = ((_b = smartTipPosition.genericTopOffset) !== null && _b !== void 0 ? _b : 0) + (tile.hotspotOffset ? tile.hotspotManualOffset.top : 0);
        var tooltipTitle = tile.showTitleBar ? '<h3>' + tile.title + '</h3>' : '';
        // let tooltipText = 'position: ' + tile.hotspotIconPos + '<BR/>' + tooltipTitle + tile.content;
        var tooltipText = tooltipTitle + tile.content;
        // TOOD: Think about sticky + sticky type. For now making strong sticky so it works the best but think about perfromance.
        // Sticky = "not sticky" - search the element just once on page load
        // Sticky = 1 + type = 0 -> "soft sticky" - keep searching for element until found, then stop
        // Sticky = 1 + type = 1 -> "strong sticky" - keep searching for element forever, even after finding it (in case it can hide and re-shown)
        var isSticky = 1;
        var stickinessType = 1;
        // todo: removing "javascript:"" as it breaks smarttip, but we need to think about how to implement it.
        // tooltipText = tooltipText.replace(/javascript:/g, '');
        // tooltipText = tooltipText.replace(/a href/g, 'div class');
        //const helpText = `Position: ${smartTipPosition.position}, Perimeter: ${smartTipPosition.perimeter}, Left: ${leftOffset}, Top: ${topOffset}`;
        // TODO: convert everything from tile object.
        var result = {
            __originalTile: tile,
            "Description": tile.summaryText,
            "ConditionTrees": {},
            "ForceNew": false,
            "Guid": guid,
            "Id": id,
            "IdentifySettings": identifySettings,
            "Info": {
                "ConditionTrees": {},
                "GlobalStyleId": "Info",
                "Id": id,
                "IsPlaceholderOnly": false,
                "IsWithHighlighter": false,
                "IsWithIcon": true,
                "OrderIndex": 0,
                "PlaceholderText": null,
                "Settings": {},
                "TemplateId": null,
                "TooltipStyle": null,
                "TooltipText": tooltipText,
                "Type": 0
            },
            "IsEnabled": true,
            "Mode": 0,
            "Name": name_1,
            "OrderIndex": 0,
            "PageId": null,
            "PositiveFeedback": null,
            "Settings": {
                "Position": smartTipPosition.position,
                "SupportsPlaceholder": false,
                "Version": 2,
                "embedInParent": false,
                "leftOffset": leftOffset,
                "lv": 3,
                "topOffset": topOffset,
                "context": smartTipPosition.perimeter,
                "isSticky": isSticky,
                "stickinessType": stickinessType
            },
            "Validations": []
        };
        return result;
    }
    catch (e) {
        consoleLogger_1.logger.log(consoleLogger_1.LogLevels.ERROR, 'error converting tile to smarttip', e);
        return null;
    }
};


/***/ }),

/***/ 159:
/***/ (function(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.WalkMePermeters = exports.WalkMePositions = void 0;
var WalkMePositions = {
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
exports.WalkMePositions = WalkMePositions;
var WalkMePermeters = {
    Outside: 0,
    Inside: 1
};
exports.WalkMePermeters = WalkMePermeters;


/***/ }),

/***/ 639:
/***/ (function(__unused_webpack_module, exports, __nested_webpack_require_16517__) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getCompanionApi = exports.checkIsPremiumCmpCustomer = exports.getCurrentHelpTiles = exports.Help4 = void 0;
var consoleLogger_1 = __nested_webpack_require_16517__(969);
var directCompanionApi_1 = __nested_webpack_require_16517__(846);
var remoteCompanionApi_1 = __nested_webpack_require_16517__(437);
var postMessageHelper_1 = __nested_webpack_require_16517__(787);
var maxTries = 300; // 30s; 300 x 100ms
var initCompanionApi = function () {
    return new Promise(function (resolve) {
        (function watch() {
            var help4 = window.Help4;
            if ((help4 && help4.getConfiguration())) {
                exports.Help4 = help4;
                resolve(help4);
            }
            else if (--maxTries >= 0) {
                setTimeout(watch, 100);
            }
            else {
                resolve(null);
            }
        })();
    });
};
// Function to check for Help4 in same-domain iframes
var checkSameDomainIframes = function () {
    try {
        var iframes = document.querySelectorAll('iframe');
        for (var i = 0; i < iframes.length; i++) {
            var iframe = iframes[i];
            try {
                // Only check same-domain iframes
                if (iframe.contentWindow && iframe.contentWindow.location.hostname === window.location.hostname) {
                    var iframeHelp4 = iframe.contentWindow.Help4;
                    if (iframeHelp4 && iframeHelp4.getConfiguration()) {
                        consoleLogger_1.logger.log(consoleLogger_1.LogLevels.INFO, 'Found Help4 in same-domain iframe');
                        return { help4: iframeHelp4, iframe: iframe.contentWindow };
                    }
                }
            }
            catch (error) {
                // Cross-origin error, skip this iframe
                continue;
            }
        }
        return null;
    }
    catch (error) {
        consoleLogger_1.logger.log(consoleLogger_1.LogLevels.DEBUG, 'Error checking same-domain iframes:', error);
        return null;
    }
};
// Function to handle iframe initialization messages
var createIframeInitHandler = function (resolved, setResolved, removeMessageListener, resolve) {
    return function (event) {
        var data;
        try {
            // Try to parse as JSON first
            data = typeof event.data === 'string' ? JSON.parse(event.data) : event.data;
        }
        catch (error) {
            // If parsing fails, use the original data
            data = event.data;
        }
        if ((data === null || data === void 0 ? void 0 : data.type) === 'WmCmpIframeInit') {
            if (!resolved) {
                setResolved(true);
                removeMessageListener();
                consoleLogger_1.logger.log(consoleLogger_1.LogLevels.INFO, 'Received iframe init message, switching to remote mode');
                // Send acknowledgment to stop retries
                if (event.source) {
                    (0, postMessageHelper_1.sendInitAcknowledgment)(event.source);
                }
                resolve({ help4: null, source: 'remote', iframe: event.source });
            }
        }
    };
};
// Function to check for local Help4
var checkLocalHelp4 = function () {
    var localHelp4 = window.Help4;
    if (localHelp4 && localHelp4.getConfiguration()) {
        consoleLogger_1.logger.log(consoleLogger_1.LogLevels.INFO, 'Found local Help4');
        return localHelp4;
    }
    return null;
};
var initCompanionApiWithRemoteSupport = function () {
    return new Promise(function (resolve) {
        var resolved = false;
        var fastInterval = 100; // 100ms for first 10 seconds
        var fastTries = 100; // 10 seconds worth of tries at 100ms
        var slowInterval = 500; // 500ms after 10 seconds
        var tries = 0;
        var currentInterval = fastInterval; // Start with 100ms
        var setResolved = function (value) {
            resolved = value;
        };
        var removeMessageListener = function () {
            window.removeEventListener('message', handleIframeInit);
        };
        // Create iframe init handler
        var handleIframeInit = createIframeInitHandler(resolved, setResolved, removeMessageListener, resolve);
        window.addEventListener('message', handleIframeInit);
        // Create the dynamic watcher to handle interval changes
        var dynamicWatch = function () {
            // Early return if already resolved
            if (resolved) {
                return;
            }
            // Switch to slower interval after 10 seconds
            if (tries === fastTries) {
                currentInterval = slowInterval;
                consoleLogger_1.logger.log(consoleLogger_1.LogLevels.DEBUG, 'Switching to 500ms polling interval after 10 seconds');
            }
            // Helper function to resolve with direct Help4
            var resolveWithDirectHelp4 = function (help4, source, iframe) {
                setResolved(true);
                removeMessageListener();
                exports.Help4 = help4;
                consoleLogger_1.logger.log(consoleLogger_1.LogLevels.INFO, "Found Help4 in ".concat(source, ", using direct mode"));
                resolve({ help4: help4, source: source, iframe: iframe });
                return true;
            };
            // Check local Help4 first
            var localHelp4 = checkLocalHelp4();
            if (localHelp4) {
                resolveWithDirectHelp4(localHelp4, 'local');
                return;
            }
            // Check same-domain iframes for Help4
            var iframeHelp4 = checkSameDomainIframes();
            if (iframeHelp4) {
                resolveWithDirectHelp4(iframeHelp4.help4, 'sameDomainIframe', iframeHelp4.iframe);
                return;
            }
            // Continue polling forever
            tries++;
            setTimeout(dynamicWatch, currentInterval);
        };
        dynamicWatch();
    });
};
var getCurrentHelpTiles = function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/, exports.Help4.WM.getHelpTiles()];
    });
}); };
exports.getCurrentHelpTiles = getCurrentHelpTiles;
var checkIsPremiumCmpCustomer = function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/, exports.Help4.WM.isPremiumConfiguration()];
    });
}); };
exports.checkIsPremiumCmpCustomer = checkIsPremiumCmpCustomer;
var getCompanionApi = function (companionConnectionRole) { return __awaiter(void 0, void 0, void 0, function () {
    var help4_1, _a, help4, source, iframe, isFromIframe, isTopWindow;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                if (!(companionConnectionRole === 'ServeCompanionToTop' || companionConnectionRole === 'UseDirect')) return [3 /*break*/, 2];
                consoleLogger_1.logger.log(consoleLogger_1.LogLevels.DEBUG, 'Initializing direct API only');
                return [4 /*yield*/, initCompanionApi()];
            case 1:
                help4_1 = _b.sent();
                if (!help4_1) {
                    consoleLogger_1.logger.log(consoleLogger_1.LogLevels.DEBUG, 'No companion API found, stopping execution');
                    return [2 /*return*/, null];
                }
                return [2 /*return*/, new directCompanionApi_1.DirectCompanionApi(help4_1, false)];
            case 2:
                // For other modes, initialize with remote support
                consoleLogger_1.logger.log(consoleLogger_1.LogLevels.DEBUG, 'Initializing companion API with remote support');
                return [4 /*yield*/, initCompanionApiWithRemoteSupport()];
            case 3:
                _a = _b.sent(), help4 = _a.help4, source = _a.source, iframe = _a.iframe;
                consoleLogger_1.logger.log(consoleLogger_1.LogLevels.DEBUG, 'after initializing companion API', { help4: !!help4, source: source });
                // Determine if we should continue based on what we found
                if (help4) {
                    isFromIframe = source === 'sameDomainIframe';
                    ;
                    return [2 /*return*/, new directCompanionApi_1.DirectCompanionApi(help4, isFromIframe)];
                }
                else if (source === 'remote') {
                    isTopWindow = window.top === window.self;
                    if (!isTopWindow) {
                        consoleLogger_1.logger.log(consoleLogger_1.LogLevels.DEBUG, 'Remote mode requested but not in top window, stopping execution');
                        return [2 /*return*/, null];
                    }
                    return [2 /*return*/, new remoteCompanionApi_1.RemoteCompanionApi(iframe)];
                }
                else {
                    consoleLogger_1.logger.log(consoleLogger_1.LogLevels.DEBUG, 'No companion API found, stopping execution');
                    return [2 /*return*/, null];
                }
                return [2 /*return*/];
        }
    });
}); };
exports.getCompanionApi = getCompanionApi;


/***/ }),

/***/ 124:
/***/ (function(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CompanionDataAvailableNotifier = void 0;
var CompanionDataAvailableNotifier = /** @class */ (function () {
    function CompanionDataAvailableNotifier(notifier, companionApi) {
        this.companionApi = companionApi;
        this.notifier = notifier;
    }
    CompanionDataAvailableNotifier.prototype.unregisterFromNewCompanionData = function (callback) {
        // TODO: Do we also want to stop the data provider when no one is listening? consider.
        this.notifier.unregister(callback);
    };
    return CompanionDataAvailableNotifier;
}());
exports.CompanionDataAvailableNotifier = CompanionDataAvailableNotifier;


/***/ }),

/***/ 401:
/***/ (function(__unused_webpack_module, exports, __nested_webpack_require_29174__) {


var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CompanionHelpDataAvailableNotifier = void 0;
var consoleLogger_1 = __nested_webpack_require_29174__(969);
var eventBasedDataNotifier_1 = __nested_webpack_require_29174__(258);
var pollingDataNotifier_1 = __nested_webpack_require_29174__(650);
var companionDataAvailableNotifier_1 = __nested_webpack_require_29174__(124);
var helpDataChangedNotifier_1 = __nested_webpack_require_29174__(312);
var CompanionHelpDataAvailableNotifier = /** @class */ (function (_super) {
    __extends(CompanionHelpDataAvailableNotifier, _super);
    function CompanionHelpDataAvailableNotifier(companionApi) {
        return _super.call(this, new helpDataChangedNotifier_1.CompanionHelpDataChangedNotifier(), companionApi) || this;
    }
    CompanionHelpDataAvailableNotifier.prototype.registerToNewCompanionData = function (callback) {
        var _this = this;
        var usePolling = false;
        var helpTilesDataProvider = usePolling ?
            new pollingDataNotifier_1.PollingDataProvider(function () { return _this.companionApi.getCurrentHelpTiles(); }) :
            new eventBasedDataNotifier_1.EventBasedDataProvider(this.companionApi, function () { return _this.companionApi.getCurrentHelpTiles(); });
        helpTilesDataProvider.start();
        consoleLogger_1.logger.log(consoleLogger_1.LogLevels.DEBUG, 'Help data provider started, polling:', usePolling);
        helpTilesDataProvider.register(function (tiles) { return _this.notifier.digest(tiles); });
        this.notifier.register(callback);
        return function () {
            _this.unregisterFromNewCompanionData(callback);
        };
    };
    return CompanionHelpDataAvailableNotifier;
}(companionDataAvailableNotifier_1.CompanionDataAvailableNotifier));
exports.CompanionHelpDataAvailableNotifier = CompanionHelpDataAvailableNotifier;


/***/ }),

/***/ 42:
/***/ (function(__unused_webpack_module, exports, __nested_webpack_require_31850__) {


var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CompanionLearningDataAvailableNotifier = void 0;
var companionDataAvailableNotifier_1 = __nested_webpack_require_31850__(124);
var learningDataChangeNotifier_1 = __nested_webpack_require_31850__(831);
var pollingDataNotifier_1 = __nested_webpack_require_31850__(650);
var consoleLogger_1 = __nested_webpack_require_31850__(969);
var CompanionLearningDataAvailableNotifier = /** @class */ (function (_super) {
    __extends(CompanionLearningDataAvailableNotifier, _super);
    function CompanionLearningDataAvailableNotifier(companionApi) {
        return _super.call(this, new learningDataChangeNotifier_1.CompanionLearningDataChangedNotifier(), companionApi) || this;
    }
    CompanionLearningDataAvailableNotifier.prototype.registerToNewCompanionData = function (callback) {
        var _this = this;
        var learningTilesDataProvider = new pollingDataNotifier_1.PollingDataProvider(function () { return _this.getLearningTilesWithIds(); });
        learningTilesDataProvider.start();
        consoleLogger_1.logger.log(consoleLogger_1.LogLevels.DEBUG, 'Learning data provider started');
        learningTilesDataProvider.register(function (tiles) { return _this.notifier.digest(tiles); });
        this.notifier.register(callback);
        return function () {
            _this.unregisterFromNewCompanionData(callback);
        };
    };
    CompanionLearningDataAvailableNotifier.prototype.getLearningTilesWithIds = function () {
        return __awaiter(this, void 0, void 0, function () {
            var learningTiles;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.companionApi.getLearningTiles()];
                    case 1:
                        learningTiles = _a.sent();
                        // TODO Find a way to get the actual ID
                        return [2 /*return*/, learningTiles.map(function (tile) { return (__assign(__assign({}, tile), { id: tile.url })); })];
                }
            });
        });
    };
    return CompanionLearningDataAvailableNotifier;
}(companionDataAvailableNotifier_1.CompanionDataAvailableNotifier));
exports.CompanionLearningDataAvailableNotifier = CompanionLearningDataAvailableNotifier;


/***/ }),

/***/ 137:
/***/ (function(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CompanionDataChangedNotifier = void 0;
var CompanionDataChangedNotifier = /** @class */ (function () {
    function CompanionDataChangedNotifier() {
        this.currentTileIds = [];
        this.currentData = [];
        this.callbacks = [];
    }
    CompanionDataChangedNotifier.prototype.register = function (callback) {
        if (this.currentTileIds.length) {
            this.invokeCallback(callback, { added: this.currentData, all: this.currentData });
        }
        this.callbacks.push(callback);
    };
    CompanionDataChangedNotifier.prototype.unregister = function (callback) {
        var callbackIndex = this.callbacks.indexOf(callback);
        if (callbackIndex >= 0) {
            this.callbacks.splice(callbackIndex, 1);
        }
    };
    CompanionDataChangedNotifier.prototype.notifyNewData = function (updateInfo) {
        var _this = this;
        this.callbacks.forEach(function (callback) {
            _this.invokeCallback(callback, updateInfo);
        });
    };
    CompanionDataChangedNotifier.prototype.invokeCallback = function (callback, updateInfo) {
        try {
            callback(updateInfo);
        }
        catch (e) {
            // ignore
        }
    };
    return CompanionDataChangedNotifier;
}());
exports.CompanionDataChangedNotifier = CompanionDataChangedNotifier;


/***/ }),

/***/ 258:
/***/ (function(__unused_webpack_module, exports, __nested_webpack_require_39438__) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.EventBasedDataProvider = void 0;
var consoleLogger_1 = __nested_webpack_require_39438__(969);
var throttleHelper_1 = __nested_webpack_require_39438__(948);
var companionTilesDrawer_1 = __nested_webpack_require_39438__(510);
var EventBasedDataProvider = /** @class */ (function () {
    function EventBasedDataProvider(companionApi, pollingFunc) {
        this.companionApi = companionApi;
        this.pollingFunc = pollingFunc;
        this.callbacks = new Set();
        this.currentData = [];
        this.handleTileChangedEvent = this.handleTileChangedEvent.bind(this);
        this.throttleHelper = new throttleHelper_1.ThrottleHelper(this.handleTileChangedEvent, 100);
    }
    EventBasedDataProvider.prototype.start = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, e_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        _a = this;
                        return [4 /*yield*/, this.pollingFunc()];
                    case 1:
                        _a.currentData = _b.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        e_1 = _b.sent();
                        consoleLogger_1.logger.log(consoleLogger_1.LogLevels.ERROR, 'failed getting initial data', e_1);
                        return [3 /*break*/, 3];
                    case 3:
                        this.subscribeToChanges();
                        return [2 /*return*/];
                }
            });
        });
    };
    EventBasedDataProvider.prototype.subscribeToChanges = function () {
        this.companionApi.listeners.onTileChange.addListener(this.throttleHelper.invoke);
    };
    EventBasedDataProvider.prototype.unsubscribeToChanges = function () {
        this.companionApi.listeners.onTileChange.removeListener(this.throttleHelper.invoke);
    };
    EventBasedDataProvider.prototype.stop = function () {
        this.unsubscribeToChanges();
    };
    EventBasedDataProvider.prototype.register = function (callback) {
        if (this.currentData.length) {
            this.safeInvokeCallback(callback, this.currentData);
        }
        this.callbacks.add(callback);
    };
    EventBasedDataProvider.prototype.handleTileChangedEvent = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var currentMode, e_2, dataFromCompanion_1, e_3;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 7, , 8]);
                        consoleLogger_1.logger.log(consoleLogger_1.LogLevels.Silly, 'handleTileChangedEvent event handler', data);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        if (!((data === null || data === void 0 ? void 0 : data.source) == 'UR')) return [3 /*break*/, 3];
                        currentMode = (0, companionTilesDrawer_1.getCurrentCmpHotspotsMode)();
                        if (!(currentMode == 'on')) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.companionApi.activateHelpWidget()];
                    case 2:
                        _a.sent();
                        consoleLogger_1.logger.log(consoleLogger_1.LogLevels.Silly, 'handleTileChangedEvent - called activateHelpWidget()');
                        _a.label = 3;
                    case 3: return [3 /*break*/, 5];
                    case 4:
                        e_2 = _a.sent();
                        consoleLogger_1.logger.log(consoleLogger_1.LogLevels.DEBUG, 'handleTileChangedEvent - error activating help widget', e_2);
                        return [3 /*break*/, 5];
                    case 5: return [4 /*yield*/, this.pollingFunc()];
                    case 6:
                        dataFromCompanion_1 = _a.sent();
                        consoleLogger_1.logger.log(consoleLogger_1.LogLevels.DEBUG, 'handleTileChangedEvent - got', dataFromCompanion_1.length, 'tiles from companion', dataFromCompanion_1);
                        this.currentData = dataFromCompanion_1;
                        this.callbacks.forEach(function (callback) {
                            _this.safeInvokeCallback(callback, dataFromCompanion_1);
                        });
                        return [3 /*break*/, 8];
                    case 7:
                        e_3 = _a.sent();
                        return [3 /*break*/, 8];
                    case 8: return [2 /*return*/];
                }
            });
        });
    };
    EventBasedDataProvider.prototype.safeInvokeCallback = function (callback, data) {
        try {
            callback(data);
        }
        catch (e) {
            // ignore
        }
    };
    return EventBasedDataProvider;
}());
exports.EventBasedDataProvider = EventBasedDataProvider;


/***/ }),

/***/ 312:
/***/ (function(__unused_webpack_module, exports, __nested_webpack_require_47219__) {


var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CompanionHelpDataChangedNotifier = void 0;
var consoleLogger_1 = __nested_webpack_require_47219__(969);
var dataChangedNotifier_1 = __nested_webpack_require_47219__(137);
var CompanionHelpDataChangedNotifier = /** @class */ (function (_super) {
    __extends(CompanionHelpDataChangedNotifier, _super);
    function CompanionHelpDataChangedNotifier() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.currentUrTiles = [];
        return _this;
    }
    CompanionHelpDataChangedNotifier.prototype.digest = function (dataFromCompanion) {
        return __awaiter(this, void 0, void 0, function () {
            var tileIds_1, addedTiles, removedTileIds, urTiles, notifyData;
            var _this = this;
            return __generator(this, function (_a) {
                try {
                    tileIds_1 = dataFromCompanion.map(function (tile) { return tile.id; });
                    addedTiles = dataFromCompanion.filter(function (_a) {
                        var id = _a.id;
                        return !_this.currentTileIds.includes(id);
                    });
                    removedTileIds = this.currentTileIds.filter(function (id) { return !tileIds_1.includes(id); });
                    urTiles = dataFromCompanion.filter(function (_a) {
                        var ct = _a._catalogueType;
                        return ct === 'UR';
                    });
                    if (addedTiles.length || removedTileIds.length) {
                        notifyData = {
                            added: addedTiles,
                            // updated: [],
                            removed: removedTileIds,
                            all: dataFromCompanion
                        };
                        consoleLogger_1.logger.log(consoleLogger_1.LogLevels.DEBUG, 'CompanionHelpDataChangedNotifier: new data available', notifyData);
                        this.notifyNewData(notifyData);
                    }
                    this.currentTileIds = tileIds_1;
                    this.currentData = dataFromCompanion;
                    this.currentUrTiles = urTiles;
                }
                catch (e) {
                    // ignore
                }
                return [2 /*return*/];
            });
        });
    };
    return CompanionHelpDataChangedNotifier;
}(dataChangedNotifier_1.CompanionDataChangedNotifier));
exports.CompanionHelpDataChangedNotifier = CompanionHelpDataChangedNotifier;


/***/ }),

/***/ 831:
/***/ (function(__unused_webpack_module, exports, __nested_webpack_require_53211__) {


var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CompanionLearningDataChangedNotifier = void 0;
var dataChangedNotifier_1 = __nested_webpack_require_53211__(137);
var consoleLogger_1 = __nested_webpack_require_53211__(969);
var CompanionLearningDataChangedNotifier = /** @class */ (function (_super) {
    __extends(CompanionLearningDataChangedNotifier, _super);
    function CompanionLearningDataChangedNotifier() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CompanionLearningDataChangedNotifier.prototype.digest = function (dataFromCompanion) {
        var _this = this;
        try {
            var tileIds_1 = dataFromCompanion.map(function (tile) { return tile.id; });
            var addedTiles = dataFromCompanion.filter(function (_a) {
                var id = _a.id;
                return !_this.currentTileIds.includes(id);
            });
            var removedTileIds = this.currentTileIds.filter(function (id) { return !tileIds_1.includes(id); });
            if (addedTiles.length || removedTileIds.length) {
                var notifyData = {
                    added: addedTiles,
                    // updated: [],
                    removed: removedTileIds,
                    all: dataFromCompanion
                };
                consoleLogger_1.logger.log(consoleLogger_1.LogLevels.DEBUG, 'CompanionLearningDataChangedNotifier: new data available', notifyData);
                this.notifyNewData(notifyData);
            }
            this.currentTileIds = tileIds_1;
            this.currentData = dataFromCompanion;
        }
        catch (e) {
            // ignore
        }
    };
    return CompanionLearningDataChangedNotifier;
}(dataChangedNotifier_1.CompanionDataChangedNotifier));
exports.CompanionLearningDataChangedNotifier = CompanionLearningDataChangedNotifier;


/***/ }),

/***/ 650:
/***/ (function(__unused_webpack_module, exports, __nested_webpack_require_55919__) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PollingDataProvider = void 0;
var consoleLogger_1 = __nested_webpack_require_55919__(969);
var PollingDataProvider = /** @class */ (function () {
    function PollingDataProvider(pollingFunc, pollingIntervalMs) {
        if (pollingIntervalMs === void 0) { pollingIntervalMs = 200; }
        this.pollingFunc = pollingFunc;
        this.pollingIntervalMs = pollingIntervalMs;
        this.callbacks = new Set();
        this.currentData = [];
    }
    PollingDataProvider.prototype.start = function () {
        consoleLogger_1.logger.log(consoleLogger_1.LogLevels.INFO, 'start polling');
        this.pollAndScheduleNext();
    };
    PollingDataProvider.prototype.stop = function () {
        if (this.timeoutId) {
            clearTimeout(this.timeoutId);
            this.timeoutId = undefined;
        }
    };
    PollingDataProvider.prototype.register = function (callback) {
        if (this.currentData.length) {
            this.invokeCallback(callback, this.currentData);
        }
        this.callbacks.add(callback);
    };
    PollingDataProvider.prototype.pollAndScheduleNext = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: 
                    // TODO: do to companionApi, onHelpAvailable this might not be needed anymore
                    return [4 /*yield*/, this.notifyAllData()];
                    case 1:
                        // TODO: do to companionApi, onHelpAvailable this might not be needed anymore
                        _a.sent();
                        this.timeoutId = setTimeout(function () { return _this.pollAndScheduleNext(); }, this.pollingIntervalMs);
                        return [2 /*return*/];
                }
            });
        });
    };
    PollingDataProvider.prototype.notifyAllData = function () {
        return __awaiter(this, void 0, void 0, function () {
            var dataFromCompanion_1, e_1;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.pollingFunc()];
                    case 1:
                        dataFromCompanion_1 = _a.sent();
                        this.currentData = dataFromCompanion_1;
                        this.callbacks.forEach(function (callback) {
                            _this.invokeCallback(callback, dataFromCompanion_1);
                        });
                        return [3 /*break*/, 3];
                    case 2:
                        e_1 = _a.sent();
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    PollingDataProvider.prototype.invokeCallback = function (callback, data) {
        try {
            callback(data);
        }
        catch (e) {
            // ignore
        }
    };
    return PollingDataProvider;
}());
exports.PollingDataProvider = PollingDataProvider;


/***/ }),

/***/ 846:
/***/ (function(__unused_webpack_module, exports) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DirectCompanionApi = void 0;
var DirectCompanionApi = /** @class */ (function () {
    function DirectCompanionApi(help4, isFromIframe) {
        this.help4 = help4;
        this.isFromIframe = isFromIframe;
        this.isRemote = false;
        this.listeners = {
            onUserHelp: this.help4.WM.listeners.onUserHelp,
            onSwitchToWm: this.help4.WM.listeners.onSwitchToWm,
            onCompanionAvailableChanged: {
                // does nothing.
                addListener: function (callback) {
                    callback(true);
                },
                removeListener: function (callback) {
                    // does nothing.
                }
            },
            onHotspotEvent: this.help4.WM.listeners.onHotspotEvent,
            onTileChange: this.help4.WM.listeners.onTileChange
        };
    }
    // Menu API methods
    DirectCompanionApi.prototype.open = function () {
        if (!this.isOpenSync()) {
            return this.help4.API.open();
        }
        return Promise.resolve();
    };
    DirectCompanionApi.prototype.close = function () {
        if (this.isOpenSync()) {
            return this.help4.API.close();
        }
        return Promise.resolve();
    };
    DirectCompanionApi.prototype.isOpenSync = function () {
        var _a, _b;
        return !!((_b = (_a = this.help4) === null || _a === void 0 ? void 0 : _a.getConfiguration()) === null || _b === void 0 ? void 0 : _b.isOpen);
    };
    DirectCompanionApi.prototype.isOpen = function () {
        return Promise.resolve(this.isOpenSync());
    };
    DirectCompanionApi.prototype.isAvailable = function () {
        return true;
    };
    // Hotspots API methods
    DirectCompanionApi.prototype.getTabNames = function () {
        var _a, _b, _c;
        return (_c = (_b = (_a = this.help4.WM) === null || _a === void 0 ? void 0 : _a.getTabNames) === null || _b === void 0 ? void 0 : _b.call(_a)) !== null && _c !== void 0 ? _c : {};
    };
    DirectCompanionApi.prototype.openHelp = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.help4.WM.openHelp()];
            });
        });
    };
    DirectCompanionApi.prototype.closeHelp = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.help4.WM.closeHelp()];
            });
        });
    };
    DirectCompanionApi.prototype.openHelpStealth = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.help4.WM.openHelpStealth()];
            });
        });
    };
    DirectCompanionApi.prototype.closeHelpStealth = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.help4.WM.closeHelpStealth()];
            });
        });
    };
    DirectCompanionApi.prototype.getActiveWidgetName = function () {
        var _a, _b, _c;
        return (_c = (_b = (_a = this.help4) === null || _a === void 0 ? void 0 : _a.widget) === null || _b === void 0 ? void 0 : _b.getActiveInstance()) === null || _c === void 0 ? void 0 : _c.getName();
    };
    DirectCompanionApi.prototype.activateHelpWidget = function () {
        return __awaiter(this, void 0, void 0, function () {
            var helpWidget;
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        helpWidget = (_b = (_a = this.help4) === null || _a === void 0 ? void 0 : _a.widget) === null || _b === void 0 ? void 0 : _b.getInstance('help');
                        return [4 /*yield*/, (helpWidget === null || helpWidget === void 0 ? void 0 : helpWidget.activate())];
                    case 1:
                        _c.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    DirectCompanionApi.prototype.getCurrentHelpTiles = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.help4.WM.getHelpTiles()];
            });
        });
    };
    DirectCompanionApi.prototype.propagateMenuState = function (data) {
        this.help4.WM.propagateMenuState(data);
    };
    // Learning Tiles API methods
    DirectCompanionApi.prototype.getLearningTiles = function () {
        return this.help4.WM.getLearningTiles();
    };
    // Configuration check methods
    DirectCompanionApi.prototype.isCmpEditorMode = function () {
        return this.help4.getConfiguration().editor;
    };
    DirectCompanionApi.prototype.isPremiumCmpCustomer = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.help4.WM.isPremiumConfiguration()];
            });
        });
    };
    // WM mode initialization
    DirectCompanionApi.prototype.startWmMode = function (cmpIntegrationMode, disableEditorMode) {
        return __awaiter(this, void 0, void 0, function () {
            var help4Any, params;
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (!!this.help4.getConfiguration().WM) return [3 /*break*/, 2];
                        if (disableEditorMode) {
                            help4Any = this.help4;
                            params = (_b = (_a = help4Any === null || help4Any === void 0 ? void 0 : help4Any.getShell) === null || _a === void 0 ? void 0 : _a.call(help4Any)) === null || _b === void 0 ? void 0 : _b._params;
                            if (params) {
                                params.editor = false;
                            }
                        }
                        return [4 /*yield*/, this.help4.WM.start(cmpIntegrationMode)];
                    case 1:
                        _c.sent();
                        _c.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        });
    };
    return DirectCompanionApi;
}());
exports.DirectCompanionApi = DirectCompanionApi;


/***/ }),

/***/ 437:
/***/ (function(__unused_webpack_module, exports, __nested_webpack_require_71086__) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RemoteCompanionApi = void 0;
var consoleLogger_1 = __nested_webpack_require_71086__(969);
var postMessageHelper_1 = __nested_webpack_require_71086__(787);
var RemoteCompanionApi = /** @class */ (function () {
    function RemoteCompanionApi(iframe) {
        var _this = this;
        this.isRemote = true;
        this.iframe = null;
        this.requestIdCounter = 0;
        this.pendingRequests = new Map();
        this.isRemoteCompanionAvailable = false;
        this.localListeners = {
            onUserHelp: new Set(),
            onSwitchToWm: new Set(),
            onCompanionAvailableChanged: new Set(),
            onHotspotEvent: new Set(),
            onTileChange: new Set()
        };
        this.iframeCheckTimeout = null;
        this.iframeCheckIntervalMs = 5000; // Check every 5 seconds
        this.lastHeartbeatResponse = 0;
        this.heartbeatTimeoutMs = 3000; // Wait 3 seconds for heartbeat response
        this.listeners = {
            onUserHelp: {
                addListener: function (callback) {
                    _this.localListeners.onUserHelp.add(callback);
                },
                removeListener: function (callback) {
                    _this.localListeners.onUserHelp.delete(callback);
                }
            },
            onSwitchToWm: {
                addListener: function (callback) {
                    _this.localListeners.onSwitchToWm.add(callback);
                },
                removeListener: function (callback) {
                    _this.localListeners.onSwitchToWm.delete(callback);
                }
            },
            onCompanionAvailableChanged: {
                addListener: function (callback) {
                    _this.localListeners.onCompanionAvailableChanged.add(callback);
                },
                removeListener: function (callback) {
                    _this.localListeners.onCompanionAvailableChanged.delete(callback);
                }
            },
            onHotspotEvent: {
                addListener: function (callback) {
                    _this.localListeners.onHotspotEvent.add(callback);
                },
                removeListener: function (callback) {
                    _this.localListeners.onHotspotEvent.delete(callback);
                }
            },
            onTileChange: {
                addListener: function (callback) {
                    _this.localListeners.onTileChange.add(callback);
                },
                removeListener: function (callback) {
                    _this.localListeners.onTileChange.delete(callback);
                }
            }
        };
        this.iframe = iframe || null;
        this.setupMessageListener();
        // If iframe is provided, we can assume it's available
        if (iframe) {
            this.isRemoteCompanionAvailable = true;
            this.startIframeMonitoring();
        }
    }
    RemoteCompanionApi.prototype.isAvailable = function () {
        return this.isRemoteCompanionAvailable;
    };
    // Menu API methods
    RemoteCompanionApi.prototype.open = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                consoleLogger_1.logger.log(consoleLogger_1.LogLevels.DEBUG, 'RemoteCompanionApi: open');
                return [2 /*return*/, this.sendRequest('open')];
            });
        });
    };
    RemoteCompanionApi.prototype.close = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                consoleLogger_1.logger.log(consoleLogger_1.LogLevels.DEBUG, 'RemoteCompanionApi: close');
                return [2 /*return*/, this.sendRequest('close')];
            });
        });
    };
    RemoteCompanionApi.prototype.isOpen = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                consoleLogger_1.logger.log(consoleLogger_1.LogLevels.DEBUG, 'RemoteCompanionApi: isOpen');
                return [2 /*return*/, this.sendRequest('isOpen')];
            });
        });
    };
    // Hotspots API methods
    RemoteCompanionApi.prototype.getTabNames = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                consoleLogger_1.logger.log(consoleLogger_1.LogLevels.DEBUG, 'RemoteCompanionApi: getTabNames');
                return [2 /*return*/, this.sendRequest('getTabNames')];
            });
        });
    };
    RemoteCompanionApi.prototype.openHelp = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                consoleLogger_1.logger.log(consoleLogger_1.LogLevels.DEBUG, 'RemoteCompanionApi: openHelp');
                return [2 /*return*/, this.sendRequest('openHelp')];
            });
        });
    };
    RemoteCompanionApi.prototype.closeHelp = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                consoleLogger_1.logger.log(consoleLogger_1.LogLevels.DEBUG, 'RemoteCompanionApi: closeHelp');
                return [2 /*return*/, this.sendRequest('closeHelp')];
            });
        });
    };
    RemoteCompanionApi.prototype.openHelpStealth = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                consoleLogger_1.logger.log(consoleLogger_1.LogLevels.DEBUG, 'RemoteCompanionApi: openHelpStealth');
                return [2 /*return*/, this.sendRequest('openHelpStealth')];
            });
        });
    };
    RemoteCompanionApi.prototype.closeHelpStealth = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                consoleLogger_1.logger.log(consoleLogger_1.LogLevels.DEBUG, 'RemoteCompanionApi: closeHelpStealth');
                return [2 /*return*/, this.sendRequest('closeHelpStealth')];
            });
        });
    };
    RemoteCompanionApi.prototype.getActiveWidgetName = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                consoleLogger_1.logger.log(consoleLogger_1.LogLevels.DEBUG, 'RemoteCompanionApi: getActiveWidgetName');
                return [2 /*return*/, this.sendRequest('getActiveWidgetName')];
            });
        });
    };
    RemoteCompanionApi.prototype.activateHelpWidget = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                consoleLogger_1.logger.log(consoleLogger_1.LogLevels.DEBUG, 'RemoteCompanionApi: activateHelpWidget');
                return [2 /*return*/, this.sendRequest('activateHelpWidget')];
            });
        });
    };
    RemoteCompanionApi.prototype.getCurrentHelpTiles = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                consoleLogger_1.logger.log(consoleLogger_1.LogLevels.DEBUG, 'RemoteCompanionApi: getCurrentHelpTiles');
                return [2 /*return*/, this.sendRequest('getCurrentHelpTiles')];
            });
        });
    };
    RemoteCompanionApi.prototype.propagateMenuState = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                consoleLogger_1.logger.log(consoleLogger_1.LogLevels.DEBUG, 'RemoteCompanionApi: propagateMenuState', data);
                return [2 /*return*/, this.sendRequest('propagateMenuState', [data])];
            });
        });
    };
    // Learning Tiles API methods
    RemoteCompanionApi.prototype.getLearningTiles = function () {
        consoleLogger_1.logger.log(consoleLogger_1.LogLevels.DEBUG, 'RemoteCompanionApi: getLearningTiles');
        return this.sendRequest('getLearningTiles');
    };
    // Configuration check methods
    RemoteCompanionApi.prototype.isCmpEditorMode = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                consoleLogger_1.logger.log(consoleLogger_1.LogLevels.DEBUG, 'RemoteCompanionApi: isCmpEditorMode');
                return [2 /*return*/, this.sendRequest('isCmpEditorMode')];
            });
        });
    };
    RemoteCompanionApi.prototype.isPremiumCmpCustomer = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                consoleLogger_1.logger.log(consoleLogger_1.LogLevels.DEBUG, 'RemoteCompanionApi: isPremiumCmpCustomer');
                return [2 /*return*/, this.sendRequest('isPremiumCmpCustomer')];
            });
        });
    };
    // WM mode initialization
    RemoteCompanionApi.prototype.startWmMode = function (cmpIntegrationMode, disableEditorMode) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                consoleLogger_1.logger.log(consoleLogger_1.LogLevels.DEBUG, 'RemoteCompanionApi: startWmMode', cmpIntegrationMode);
                return [2 /*return*/, this.sendRequest('startWmMode', [cmpIntegrationMode, disableEditorMode])];
            });
        });
    };
    RemoteCompanionApi.prototype.setupMessageListener = function () {
        var _this = this;
        window.addEventListener('message', function (event) {
            _this.handleMessage(event);
        });
    };
    RemoteCompanionApi.prototype.handleMessage = function (event) {
        // Validate message has data
        var data;
        try {
            // Try to parse as JSON first
            data = typeof event.data === 'string' ? JSON.parse(event.data) : event.data;
        }
        catch (error) {
            // If parsing fails, use the original data
            data = event.data;
        }
        if (!(data === null || data === void 0 ? void 0 : data.type))
            return;
        consoleLogger_1.logger.log(consoleLogger_1.LogLevels.Silly, 'RemoteCompanionApi: handleMessage', event);
        // Handle iframe initialization
        if (data.type === 'WmCmpIframeInit') {
            this.handleIframeInit(event);
            return;
        }
        // Handle responses to our requests (including heartbeats)
        if (data.type === 'wmCmpResponse' && data.id && this.pendingRequests.has(data.id)) {
            this.handleResponse(data);
            return;
        }
        // Handle events from iframe
        if (data.type === 'wmCmpRaiseListeners' && data.eventType) {
            this.handleEvent(data.eventType, data.data);
        }
    };
    RemoteCompanionApi.prototype.handleIframeInit = function (event) {
        consoleLogger_1.logger.log(consoleLogger_1.LogLevels.DEBUG, 'RemoteCompanionApi: handleIframeInit', event);
        // Stop monitoring the old iframe if it exists
        if (this.iframe) {
            this.stopIframeMonitoring();
        }
        // Update iframe reference
        this.iframe = event.source;
        // Send acknowledgment to stop retries
        (0, postMessageHelper_1.sendInitAcknowledgment)(this.iframe);
        // Start monitoring the new iframe for accessibility
        this.startIframeMonitoring();
        this.isRemoteCompanionAvailable = true;
        this.localListeners.onCompanionAvailableChanged.forEach(function (callback) { return callback(true); });
    };
    RemoteCompanionApi.prototype.handleResponse = function (data) {
        consoleLogger_1.logger.log(consoleLogger_1.LogLevels.Silly, 'RemoteCompanionApi: handleResponse', data);
        var _a = this.pendingRequests.get(data.id), resolve = _a.resolve, reject = _a.reject, timeout = _a.timeout, method = _a.method;
        clearTimeout(timeout);
        this.pendingRequests.delete(data.id);
        if (data.error) {
            reject(new Error(data.error));
        }
        else {
            resolve(data.result);
        }
    };
    RemoteCompanionApi.prototype.handleEvent = function (eventType, data) {
        consoleLogger_1.logger.log(consoleLogger_1.LogLevels.DEBUG, 'RemoteCompanionApi: handleEvent', eventType, data);
        switch (eventType) {
            case 'wmCmpOnUserHelp':
                this.localListeners.onUserHelp.forEach(function (callback) { return callback(data); });
                break;
            case 'wmCmpOnSwitchToWm':
                this.localListeners.onSwitchToWm.forEach(function (callback) { return callback(data); });
                break;
            case 'wmCmpOnHotspotEvent':
                this.localListeners.onHotspotEvent.forEach(function (callback) { return callback(data); });
                break;
            case 'wmCmpOnTileChange':
                this.localListeners.onTileChange.forEach(function (callback) { return callback(data); });
                break;
            default:
                consoleLogger_1.logger.log(consoleLogger_1.LogLevels.DEBUG, "RemoteCompanionApi: Unknown event type: ".concat(eventType));
        }
    };
    RemoteCompanionApi.prototype.sendRequest = function (method_1) {
        return __awaiter(this, arguments, void 0, function (method, args, timeoutMs, suppressLog) {
            var id;
            var _this = this;
            if (args === void 0) { args = []; }
            if (timeoutMs === void 0) { timeoutMs = 10000; }
            if (suppressLog === void 0) { suppressLog = false; }
            return __generator(this, function (_a) {
                if (!suppressLog) {
                    consoleLogger_1.logger.log(consoleLogger_1.LogLevels.DEBUG, 'RemoteCompanionApi: sendRequest', method, args);
                }
                if (!this.iframe) {
                    throw new Error('RemoteCompanionApi: No iframe available. Wait for WmCmpIframeInit message.');
                }
                id = "req_".concat(++this.requestIdCounter);
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        var timeout = setTimeout(function () {
                            _this.pendingRequests.delete(id);
                            reject(new Error("Request timeout: ".concat(method)));
                        }, timeoutMs);
                        _this.pendingRequests.set(id, { resolve: resolve, reject: reject, timeout: timeout, method: method });
                        var request = {
                            type: 'wmCmpRequest',
                            id: id,
                            method: method,
                            args: args
                        };
                        (0, postMessageHelper_1.postMessageToWindow)(_this.iframe, request);
                    })];
            });
        });
    };
    RemoteCompanionApi.prototype.startIframeMonitoring = function () {
        if (this.iframeCheckTimeout) {
            return; // Already monitoring
        }
        this.scheduleNextCheck();
    };
    RemoteCompanionApi.prototype.stopIframeMonitoring = function () {
        if (this.iframeCheckTimeout) {
            clearTimeout(this.iframeCheckTimeout);
            this.iframeCheckTimeout = null;
        }
    };
    RemoteCompanionApi.prototype.checkIframeAccessibility = function () {
        return __awaiter(this, void 0, void 0, function () {
            var error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.iframe) {
                            return [2 /*return*/];
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        // Send a heartbeat ping using the existing sendRequest method
                        return [4 /*yield*/, this.sendRequest('heartbeat', [], this.heartbeatTimeoutMs, true)];
                    case 2:
                        // Send a heartbeat ping using the existing sendRequest method
                        _a.sent(); // suppress log
                        this.lastHeartbeatResponse = Date.now();
                        // Schedule next check
                        this.scheduleNextCheck();
                        return [3 /*break*/, 4];
                    case 3:
                        error_1 = _a.sent();
                        // Iframe is no longer accessible - it's been removed, redirected, or unresponsive
                        consoleLogger_1.logger.log(consoleLogger_1.LogLevels.DEBUG, 'RemoteCompanionApi: Iframe heartbeat failed - integration lost', error_1);
                        this.handleIframeLost();
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    RemoteCompanionApi.prototype.scheduleNextCheck = function () {
        var _this = this;
        if (this.iframeCheckTimeout) {
            clearTimeout(this.iframeCheckTimeout);
        }
        this.iframeCheckTimeout = setTimeout(function () {
            _this.checkIframeAccessibility();
        }, this.iframeCheckIntervalMs);
    };
    RemoteCompanionApi.prototype.handleIframeLost = function () {
        // Clear the iframe reference
        this.iframe = null;
        // Stop monitoring
        this.stopIframeMonitoring();
        // Reject all pending requests
        this.pendingRequests.forEach(function (_a, id) {
            var reject = _a.reject, timeout = _a.timeout, method = _a.method;
            clearTimeout(timeout);
            reject(new Error("RemoteCompanionApi: Iframe connection lost - ".concat(method, " request failed")));
        });
        this.pendingRequests.clear();
        // Optionally, you could emit a custom event here to notify other parts of the application
        // that the iframe connection has been lost
        consoleLogger_1.logger.log(consoleLogger_1.LogLevels.DEBUG, 'RemoteCompanionApi: Iframe connection lost - waiting for new WmCmpIframeInit message');
        this.isRemoteCompanionAvailable = false;
        this.localListeners.onCompanionAvailableChanged.forEach(function (callback) { return callback(false); });
    };
    return RemoteCompanionApi;
}());
exports.RemoteCompanionApi = RemoteCompanionApi;


/***/ }),

/***/ 396:
/***/ (function(__unused_webpack_module, exports, __nested_webpack_require_92356__) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.wmCmpIframeAgent = void 0;
var consoleLogger_1 = __nested_webpack_require_92356__(969);
var postMessageHelper_1 = __nested_webpack_require_92356__(787);
var wmCmpIframeAgent = /** @class */ (function () {
    function wmCmpIframeAgent(companionApi) {
        this.initRetryTimer = null;
        consoleLogger_1.logger.log(consoleLogger_1.LogLevels.INFO, 'wmCmpIframeAgent: Initializing');
        this.companionApi = companionApi;
    }
    wmCmpIframeAgent.prototype.start = function () {
        consoleLogger_1.logger.log(consoleLogger_1.LogLevels.INFO, 'wmCmpIframeAgent: Starting');
        this.setupMessageListener();
        this.setupEventForwarding();
        this.sendInitMessage();
    };
    wmCmpIframeAgent.prototype.sendInitMessage = function () {
        var _this = this;
        // Send initialization message to parent window with retry mechanism
        var retryCount = 0;
        var maxRetries = 10; // Try for ~5 seconds (10 * 500ms)
        var retryInterval = 500; // 500ms between retries
        var sendInit = function () {
            var message = {
                type: 'WmCmpIframeInit',
                timestamp: Date.now()
            };
            (0, postMessageHelper_1.postMessageToWindow)(window.top, message);
            consoleLogger_1.logger.log(consoleLogger_1.LogLevels.DEBUG, "wmCmpIframeAgent: Sent WmCmpIframeInit message (attempt ".concat(retryCount + 1, ")"));
        };
        // Send initial message
        sendInit();
        // Set up retry mechanism
        this.initRetryTimer = setInterval(function () {
            retryCount++;
            if (retryCount < maxRetries) {
                sendInit();
            }
            else {
                _this.stopInitRetry();
                consoleLogger_1.logger.log(consoleLogger_1.LogLevels.WARN, 'wmCmpIframeAgent: Max retries reached for init message');
            }
        }, retryInterval);
    };
    wmCmpIframeAgent.prototype.stopInitRetry = function () {
        if (this.initRetryTimer) {
            clearInterval(this.initRetryTimer);
            this.initRetryTimer = null;
        }
    };
    wmCmpIframeAgent.prototype.setupMessageListener = function () {
        var _this = this;
        window.addEventListener('message', function (event) { return __awaiter(_this, void 0, void 0, function () {
            var data, result, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        // Only accept messages from parent window
                        if (event.source !== window.top)
                            return [2 /*return*/];
                        try {
                            // Try to parse as JSON first
                            data = typeof event.data === 'string' ? JSON.parse(event.data) : event.data;
                        }
                        catch (error) {
                            // If parsing fails, use the original data
                            data = event.data;
                        }
                        if (!data)
                            return [2 /*return*/];
                        // Handle init acknowledgment
                        if (data.type === 'WmCmpIframeInitAck') {
                            consoleLogger_1.logger.log(consoleLogger_1.LogLevels.DEBUG, 'wmCmpIframeAgent: Received init acknowledgment');
                            this.stopInitRetry();
                            return [2 /*return*/];
                        }
                        if (!(data.type === 'wmCmpRequest' && data.id && data.method)) return [3 /*break*/, 4];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.handleRequest(data)];
                    case 2:
                        result = _a.sent();
                        this.sendResponse(data.id, result, event.source);
                        return [3 /*break*/, 4];
                    case 3:
                        error_1 = _a.sent();
                        this.sendError(data.id, error_1 instanceof Error ? error_1.message : 'Unknown error', event.source);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        }); });
    };
    wmCmpIframeAgent.prototype.handleRequest = function (request) {
        return __awaiter(this, void 0, void 0, function () {
            var method, args;
            return __generator(this, function (_a) {
                consoleLogger_1.logger.log(consoleLogger_1.LogLevels.Silly, 'wmCmpIframeAgent: handleRequest', request);
                method = request.method, args = request.args;
                // Handle explicit method calls
                switch (method) {
                    // Menu API methods
                    case 'open':
                        return [2 /*return*/, this.companionApi.open()];
                    case 'close':
                        return [2 /*return*/, this.companionApi.close()];
                    case 'isOpen':
                        return [2 /*return*/, this.companionApi.isOpen()];
                    // Hotspots API methods
                    case 'getTabNames':
                        return [2 /*return*/, this.companionApi.getTabNames()];
                    case 'openHelp':
                        return [2 /*return*/, this.companionApi.openHelp()];
                    case 'closeHelp':
                        return [2 /*return*/, this.companionApi.closeHelp()];
                    case 'openHelpStealth':
                        return [2 /*return*/, this.companionApi.openHelpStealth()];
                    case 'closeHelpStealth':
                        return [2 /*return*/, this.companionApi.closeHelpStealth()];
                    case 'getActiveWidgetName':
                        return [2 /*return*/, this.companionApi.getActiveWidgetName()];
                    case 'activateHelpWidget':
                        return [2 /*return*/, this.companionApi.activateHelpWidget()];
                    case 'getCurrentHelpTiles':
                        return [2 /*return*/, this.companionApi.getCurrentHelpTiles()];
                    case 'propagateMenuState':
                        return [2 /*return*/, this.companionApi.propagateMenuState(args[0])];
                    // Learning Tiles API methods
                    case 'getLearningTiles':
                        return [2 /*return*/, this.companionApi.getLearningTiles()];
                    // Configuration check methods
                    case 'isCmpEditorMode':
                        return [2 /*return*/, this.companionApi.isCmpEditorMode()];
                    case 'isPremiumCmpCustomer':
                        return [2 /*return*/, this.companionApi.isPremiumCmpCustomer()];
                    // WM mode initialization
                    case 'startWmMode':
                        return [2 /*return*/, this.companionApi.startWmMode(args[0], args[1])];
                    case 'heartbeat':
                        // Heartbeat is just a simple acknowledgment
                        return [2 /*return*/, Promise.resolve()];
                    default:
                        throw new Error("Unknown method: ".concat(method));
                }
                return [2 /*return*/];
            });
        });
    };
    wmCmpIframeAgent.prototype.sendResponse = function (id, result, source) {
        consoleLogger_1.logger.log(consoleLogger_1.LogLevels.Silly, 'wmCmpIframeAgent: sendResponse', id, result);
        var response = {
            type: 'wmCmpResponse',
            id: id,
            result: result
        };
        (0, postMessageHelper_1.postMessageToWindow)(source, response);
    };
    wmCmpIframeAgent.prototype.sendError = function (id, error, source) {
        var response = {
            type: 'wmCmpResponse',
            id: id,
            error: error
        };
        (0, postMessageHelper_1.postMessageToWindow)(source, response);
    };
    wmCmpIframeAgent.prototype.setupEventForwarding = function () {
        var _this = this;
        var listeners = this.companionApi.listeners;
        // onUserHelp
        listeners.onUserHelp.addListener(function (data) {
            _this.forwardEvent('wmCmpOnUserHelp', data);
        });
        // onSwitchToWm
        listeners.onSwitchToWm.addListener(function (data) {
            _this.forwardEvent('wmCmpOnSwitchToWm', data);
        });
        // onHotspotEvent
        listeners.onHotspotEvent.addListener(function (data) {
            _this.forwardEvent('wmCmpOnHotspotEvent', data);
        });
        // onTileChange
        listeners.onTileChange.addListener(function (data) {
            _this.forwardEvent('wmCmpOnTileChange', data);
        });
    };
    wmCmpIframeAgent.prototype.forwardEvent = function (eventType, data) {
        consoleLogger_1.logger.log(consoleLogger_1.LogLevels.DEBUG, 'wmCmpIframeAgent: forwardEvent', eventType, data);
        var event = {
            type: 'wmCmpRaiseListeners',
            id: "event_".concat(Date.now(), "_").concat(Math.random()),
            eventType: eventType,
            data: data
        };
        (0, postMessageHelper_1.postMessageToWindow)(window.top, event);
    };
    return wmCmpIframeAgent;
}());
exports.wmCmpIframeAgent = wmCmpIframeAgent;


/***/ }),

/***/ 969:
/***/ (function(__unused_webpack_module, exports) {


var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.LogLevels = exports.logger = void 0;
var LogLevels = {
    Silly: 5,
    DEBUG: 4,
    INFO: 3,
    WARN: 2,
    ERROR: 1,
};
exports.LogLevels = LogLevels;
var LOG_LEVEL_IN_STORAGE_KEY = 'wmCmpLogLevel';
var valueFromStorage = (_a = localStorage.getItem(LOG_LEVEL_IN_STORAGE_KEY)) !== null && _a !== void 0 ? _a : '';
var valueAsNumber = parseInt(valueFromStorage, 10);
var currentLogLevel = isNaN(valueAsNumber) ? undefined : valueAsNumber;
var log = function (logLevel) {
    var params = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        params[_i - 1] = arguments[_i];
    }
    if (currentLogLevel === undefined) {
        return;
    }
    if (currentLogLevel < logLevel) {
        return;
    }
    /*allowFunc*/ console.log.apply(console, __spreadArray(['####'], params, false));
};
var setLevel = function (level) {
    localStorage.setItem(LOG_LEVEL_IN_STORAGE_KEY, level.toString());
    currentLogLevel = level;
};
var stop = function () {
    localStorage.removeItem(LOG_LEVEL_IN_STORAGE_KEY);
    currentLogLevel = undefined;
};
var logger = {
    log: log,
    setLevel: setLevel,
    stop: stop,
};
exports.logger = logger;
var anyWindow = window;
anyWindow.wmCmpLogger = logger;


/***/ }),

/***/ 819:
/***/ (function(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.disableFioriIndent = exports.hasFioriIndent = exports.enableFioriIndent = void 0;
// Get the DOM element by the ID
var currentArea = null;
var anyWindow = window;
var sap = anyWindow.sap;
// Function to avoid Fiori dialogs and popups to be behind or on top of the menu
var setDialogArea = function (area) {
    var _a, _b;
    if (currentArea === area)
        return;
    currentArea = area;
    try {
        // Ensure sap.ui.core.Popup is available in your environment
        if ((_b = (_a = sap === null || sap === void 0 ? void 0 : sap.ui) === null || _a === void 0 ? void 0 : _a.core) === null || _b === void 0 ? void 0 : _b.Popup) {
            sap.ui.core.Popup.setWithinArea(area);
        }
    }
    catch (e) {
        // ignore
    }
};
var fioriFlexDomCache = null;
var getFioriFlexDom = function () {
    if (!fioriFlexDomCache) {
        fioriFlexDomCache = document.getElementById('helpContent-uiArea') || document.getElementById('helpContent-shellArea');
    }
    return fioriFlexDomCache;
};
var hasFioriIndent = function () {
    var _a, _b, _c;
    return !!((_c = (_b = (_a = sap === null || sap === void 0 ? void 0 : sap.ui) === null || _a === void 0 ? void 0 : _a.core) === null || _b === void 0 ? void 0 : _b.Popup) === null || _c === void 0 ? void 0 : _c.setWithinArea) && !!getFioriFlexDom();
};
exports.hasFioriIndent = hasFioriIndent;
var disableFioriIndent = function () {
    var fioriFlexDom = getFioriFlexDom();
    if (!fioriFlexDom) {
        return;
    }
    fioriFlexDom.style.removeProperty('min-width');
    setDialogArea(null);
};
exports.disableFioriIndent = disableFioriIndent;
// Function to create indentation space and handle the dialog area accordingly
var enableFioriIndent = function (requiredWidth) {
    var fioriFlexDom = getFioriFlexDom();
    if (!fioriFlexDom) {
        return;
    }
    var currentWidth = parseInt(fioriFlexDom.style.getPropertyValue('min-width')) || null;
    if (currentWidth !== requiredWidth)
        fioriFlexDom.style.minWidth = requiredWidth + 'px';
    setDialogArea('#sapUshellPopupWithinArea');
};
exports.enableFioriIndent = enableFioriIndent;


/***/ }),

/***/ 787:
/***/ (function(__unused_webpack_module, exports, __nested_webpack_require_108594__) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.sendInitAcknowledgment = exports.postMessageToWindow = void 0;
var consoleLogger_1 = __nested_webpack_require_108594__(969);
// Centralized postMessage utility for consistent handling
var postMessageToWindow = function (target, message, targetOrigin) {
    try {
        var jsonMessage = JSON.stringify(message);
        target.postMessage(jsonMessage, targetOrigin || '*');
    }
    catch (error) {
        consoleLogger_1.logger.log(consoleLogger_1.LogLevels.ERROR, 'Failed to send postMessage:', error);
    }
};
exports.postMessageToWindow = postMessageToWindow;
// Centralized iframe init acknowledgment helper
var sendInitAcknowledgment = function (source) {
    var message = {
        type: 'WmCmpIframeInitAck',
        timestamp: Date.now()
    };
    (0, exports.postMessageToWindow)(source, message);
    consoleLogger_1.logger.log(consoleLogger_1.LogLevels.DEBUG, 'Sent init acknowledgment');
};
exports.sendInitAcknowledgment = sendInitAcknowledgment;


/***/ }),

/***/ 744:
/***/ (function(__unused_webpack_module, exports, __nested_webpack_require_109720__) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.checkShouldShrinkWebsite = void 0;
var websiteShrinker_1 = __nested_webpack_require_109720__(819);
var urlParamHelper_1 = __nested_webpack_require_109720__(458);
var SHRINK_URL_PARAM = 'wmShrinkWebsite';
var checkShouldShrinkWebsite = function () {
    var urlParamValue = (0, urlParamHelper_1.getUrlParam)(SHRINK_URL_PARAM);
    if (!urlParamValue) {
        return false;
    }
    var canShrinkFiori = (0, websiteShrinker_1.hasFioriIndent)();
    if (!canShrinkFiori) {
        return false;
    }
    return true;
};
exports.checkShouldShrinkWebsite = checkShouldShrinkWebsite;


/***/ }),

/***/ 948:
/***/ (function(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ThrottleHelper = void 0;
var ThrottleHelper = /** @class */ (function () {
    function ThrottleHelper(callback, delay) {
        this.callback = callback;
        this.delay = delay;
        this.lastCall = 0;
        this.invoke = this.invoke.bind(this);
        this.lastCall = 0;
        this.timeoutId = null;
    }
    ThrottleHelper.prototype.invoke = function () {
        var _this = this;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var alreadyPending = this.timeoutId !== null;
        if (alreadyPending) {
            return;
        }
        var timeSinceLastCall = Date.now() - this.lastCall;
        var shouldImmediatelyInvoke = timeSinceLastCall >= this.delay;
        if (shouldImmediatelyInvoke) {
            this.callback.apply(this, args);
            this.lastCall = Date.now();
            ;
        }
        else {
            var timeUntilInvoke = this.delay - timeSinceLastCall;
            this.timeoutId = setTimeout(function () {
                _this.timeoutId = null;
                _this.callback.apply(_this, args);
                _this.lastCall = Date.now();
            }, timeUntilInvoke);
        }
    };
    return ThrottleHelper;
}());
exports.ThrottleHelper = ThrottleHelper;


/***/ }),

/***/ 458:
/***/ (function(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getUrlParam = void 0;
var getUrlParam = function (name) {
    try {
        var urlParams = new URLSearchParams(window.location.search.toLowerCase());
        return urlParams.get(name.toLowerCase());
    }
    catch (e) {
        return null;
    }
};
exports.getUrlParam = getUrlParam;


/***/ }),

/***/ 418:
/***/ (function(__unused_webpack_module, exports, __nested_webpack_require_112350__) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.startIntegration = void 0;
var companionApi_1 = __nested_webpack_require_112350__(639);
var wmCmpIframeAgent_1 = __nested_webpack_require_112350__(396);
var consoleLogger_1 = __nested_webpack_require_112350__(969);
var shrinkWebsiteDecider_1 = __nested_webpack_require_112350__(744);
var wmMenuAndCmpMenuIntegration_1 = __nested_webpack_require_112350__(200);
var wmMenuWithCmpIntegration_1 = __nested_webpack_require_112350__(894);
var pluginConfigProvider_1 = __nested_webpack_require_112350__(516);
var cmpUsageTracking_1 = __nested_webpack_require_112350__(170);
// import { AlwaysOnCompanionConnector } from "./walkme/companionConnectors/alwaysInCompanionConnector";
// import { FullWalkMeCompanionDataHandler } from "./walkme/companionDataChangeHandlers/fullWalkMeCompanionDataHandler";
// import { registerFindElementForHelp4 } from "./walkme/findElement/findElementForHelp4";
var startIntegration = function () { return __awaiter(void 0, void 0, void 0, function () {
    var pluginConfig, isCmpIntegrationDisabled, companionApi;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                pluginConfig = (0, pluginConfigProvider_1.getPluginConfig)();
                isCmpIntegrationDisabled = pluginConfig.cmpIntegrationMode === 0;
                if (isCmpIntegrationDisabled && !pluginConfig.sendCmpTracking) {
                    return [2 /*return*/];
                }
                consoleLogger_1.logger.log(consoleLogger_1.LogLevels.INFO, 'WmCmp - plugin configuration', pluginConfig);
                return [4 /*yield*/, (0, companionApi_1.getCompanionApi)(pluginConfig.companionConnectionRole)];
            case 1:
                companionApi = _a.sent();
                window.__wmCmpApi = companionApi;
                if (!companionApi) {
                    consoleLogger_1.logger.log(consoleLogger_1.LogLevels.INFO, 'WmCmp - no companion API found, stopping execution');
                    return [2 /*return*/];
                }
                if (companionApi.isRemote && pluginConfig.cmpIntegrationMode === pluginConfigProvider_1.CMP_WM_MODE_FULL_INTEGRATION) {
                    consoleLogger_1.logger.log(consoleLogger_1.LogLevels.INFO, 'WmCmp - plugin configuration - using remote API, switching from full to menu toggle', pluginConfig);
                    pluginConfig.cmpIntegrationMode = pluginConfigProvider_1.CMP_WM_MODE_JUST_QUESTION_MARK;
                }
                return [4 /*yield*/, handleWmIntegration(pluginConfig.cmpIntegrationMode, pluginConfig.companionConnectionRole, companionApi, pluginConfig.allowEditorModeOverride)];
            case 2:
                _a.sent();
                if (pluginConfig.sendCmpTracking && companionApi_1.Help4) {
                    // TODO: Move this to remote as well?
                    (0, cmpUsageTracking_1.startCmpUsageTracking)();
                }
                return [2 /*return*/];
        }
    });
}); };
exports.startIntegration = startIntegration;
var handleWmIntegration = function (cmpIntegrationMode, companionConnectionRole, companionApi, allowEditorModeOverride) { return __awaiter(void 0, void 0, void 0, function () {
    var iframeAgent, isCmpEditorMode, isPremiumCmpCustomer, e_1, shouldShrinkWebsite, integrationManager, anyWindow, integrationManager;
    var _a, _b, _c;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                if (cmpIntegrationMode === 0) {
                    consoleLogger_1.logger.log(consoleLogger_1.LogLevels.INFO, 'cmpIntegrationMode is disabled');
                    return [2 /*return*/];
                }
                // If serving to top (iframe mode), just start the iframe agent and return
                if (companionConnectionRole === 'ServeCompanionToTop') {
                    consoleLogger_1.logger.log(consoleLogger_1.LogLevels.DEBUG, 'Serving companion from iframe to top', location.href);
                    iframeAgent = new wmCmpIframeAgent_1.wmCmpIframeAgent(companionApi);
                    iframeAgent.start();
                    return [2 /*return*/];
                }
                return [4 /*yield*/, companionApi.isCmpEditorMode()];
            case 1:
                isCmpEditorMode = _d.sent();
                if (isCmpEditorMode && !allowEditorModeOverride) {
                    consoleLogger_1.logger.log(consoleLogger_1.LogLevels.INFO, 'CMP editor mode detected, stopping execution');
                    return [2 /*return*/];
                }
                return [4 /*yield*/, companionApi.isPremiumCmpCustomer()];
            case 2:
                isPremiumCmpCustomer = _d.sent();
                if (isPremiumCmpCustomer) {
                    // we don't merge cmp and walkme data for premium cmp customers at the moment.
                    consoleLogger_1.logger.log(consoleLogger_1.LogLevels.INFO, 'Premium CMP customer detected, stopping execution');
                    return [2 /*return*/];
                }
                _d.label = 3;
            case 3:
                _d.trys.push([3, 7, , 8]);
                return [4 /*yield*/, companionApi.startWmMode(cmpIntegrationMode, allowEditorModeOverride)];
            case 4:
                _d.sent();
                if (!(cmpIntegrationMode === pluginConfigProvider_1.CMP_WM_MODE_FULL_INTEGRATION)) return [3 /*break*/, 6];
                return [4 /*yield*/, companionApi.closeHelp()];
            case 5:
                _d.sent();
                _d.label = 6;
            case 6: return [3 /*break*/, 8];
            case 7:
                e_1 = _d.sent();
                return [2 /*return*/];
            case 8:
                shouldShrinkWebsite = (0, shrinkWebsiteDecider_1.checkShouldShrinkWebsite)();
                if (cmpIntegrationMode === pluginConfigProvider_1.CMP_WM_MODE_JUST_QUESTION_MARK) {
                    integrationManager = new wmMenuAndCmpMenuIntegration_1.WmMenuOpenFromCmpIntegration(companionApi, false);
                    integrationManager.start();
                }
                else if (cmpIntegrationMode === pluginConfigProvider_1.CMP_WM_MODE_FULL_INTEGRATION) {
                    if (shouldShrinkWebsite) {
                        anyWindow = window;
                        if ((_c = (_b = (_a = anyWindow._walkMe) === null || _a === void 0 ? void 0 : _a.getSiteConfig) === null || _b === void 0 ? void 0 : _b.call(_a).Custom) === null || _c === void 0 ? void 0 : _c.proMenu) {
                            delete anyWindow._walkMe.getSiteConfig().Custom.proMenu.heightLimitSelector;
                        }
                    }
                    integrationManager = new wmMenuWithCmpIntegration_1.WmMenuWithCmpIntegration(companionApi, shouldShrinkWebsite);
                    integrationManager.start();
                }
                return [2 /*return*/];
        }
    });
}); };


/***/ }),

/***/ 527:
/***/ (function(__unused_webpack_module, exports, __nested_webpack_require_121921__) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.HotspotsStateManager = void 0;
var tileIdToWalkMeIdConverter_1 = __nested_webpack_require_121921__(903);
var consoleLogger_1 = __nested_webpack_require_121921__(969);
var menuHotspotsAction_1 = __nested_webpack_require_121921__(606);
var HotspotsStateManager = /** @class */ (function () {
    function HotspotsStateManager(tabId, setId, companionApi) {
        this.tabId = tabId;
        this.setId = setId;
        this.companionApi = companionApi;
        this.currentHighlightedHotspot = null;
        this.currentOpenBubble = null;
        this.currentMenuFocusedSmartTip = null;
    }
    HotspotsStateManager.prototype.handleMenuHotspotClicked = function (smarttipId) {
        consoleLogger_1.logger.log(consoleLogger_1.LogLevels.DEBUG, 'handleMenuHotspotClicked', smarttipId);
        var clickedHotspotId = (0, tileIdToWalkMeIdConverter_1.getTileIdFromSmartTipId)(smarttipId);
        var hasOpenBubble = this.currentOpenBubble !== null;
        var hasFocusedMenuItem = this.currentMenuFocusedSmartTip !== null;
        var isSameSmartTipClicked = this.currentMenuFocusedSmartTip === smarttipId;
        var shouldKeepOpenBubble = this.currentOpenBubble === clickedHotspotId && !hasFocusedMenuItem;
        var shouldClosePreviousBubble = hasOpenBubble && !shouldKeepOpenBubble;
        if (shouldClosePreviousBubble) {
            var descriptor_1 = (0, tileIdToWalkMeIdConverter_1.getTileDescriptorFromTileId)(this.currentOpenBubble);
            if (descriptor_1) {
                this.closeCompanionBubble(descriptor_1);
            }
            if (hasFocusedMenuItem) {
                (0, menuHotspotsAction_1.unfocusMenuHotspot)(this.tabId, this.setId, this.currentMenuFocusedSmartTip);
            }
        }
        var shouldOpenBubble = !isSameSmartTipClicked;
        if (!shouldOpenBubble) {
            this.currentMenuFocusedSmartTip = null;
            return;
        }
        var hotspotId = (0, tileIdToWalkMeIdConverter_1.getTileIdFromSmartTipId)(smarttipId);
        var descriptor = (0, tileIdToWalkMeIdConverter_1.getTileDescriptorFromSmartTipId)(smarttipId);
        if (hotspotId && descriptor) {
            this.openCompanionBubble(descriptor);
            this.currentOpenBubble = hotspotId;
        }
        this.currentMenuFocusedSmartTip = smarttipId;
        (0, menuHotspotsAction_1.focusMenuHotspot)(this.tabId, this.setId, smarttipId);
    };
    HotspotsStateManager.prototype.handleMenuHotspotHovered = function (smarttipId) {
        consoleLogger_1.logger.log(consoleLogger_1.LogLevels.Silly, 'handleMenuHotspotHovered', smarttipId);
        var hotspotId = (0, tileIdToWalkMeIdConverter_1.getTileIdFromSmartTipId)(smarttipId);
        if (this.currentHighlightedHotspot != null) {
            var wasHoveredHotspotAlreadyHighlighted = this.currentHighlightedHotspot === hotspotId;
            if (wasHoveredHotspotAlreadyHighlighted) {
                return;
            }
            var descriptor_2 = (0, tileIdToWalkMeIdConverter_1.getTileDescriptorFromTileId)(this.currentHighlightedHotspot);
            if (descriptor_2) {
                this.unhighlightCompanionHotspot(descriptor_2);
            }
        }
        if (!hotspotId) {
            return;
        }
        var descriptor = (0, tileIdToWalkMeIdConverter_1.getTileDescriptorFromSmartTipId)(smarttipId);
        if (descriptor) {
            this.highlightCompanionHotspot(descriptor);
            this.currentHighlightedHotspot = hotspotId;
        }
    };
    HotspotsStateManager.prototype.handleMenuHotspotHoveredOut = function (smarttipId) {
        var hotspotId = (0, tileIdToWalkMeIdConverter_1.getTileIdFromSmartTipId)(smarttipId);
        consoleLogger_1.logger.log(consoleLogger_1.LogLevels.Silly, 'handleMenuHotspotHoveredOut', smarttipId, hotspotId);
        if (!hotspotId) {
            return;
        }
        if (this.currentHighlightedHotspot === hotspotId) {
            var descriptor = (0, tileIdToWalkMeIdConverter_1.getTileDescriptorFromSmartTipId)(smarttipId);
            if (descriptor) {
                this.unhighlightCompanionHotspot(descriptor);
                this.currentHighlightedHotspot = null;
            }
        }
    };
    HotspotsStateManager.prototype.handleBubbleOpenedByCmp = function (hotspotId) {
        consoleLogger_1.logger.log(consoleLogger_1.LogLevels.Silly, 'handleBubbleOpenedByCmp', hotspotId);
        var smarttipId = (0, tileIdToWalkMeIdConverter_1.getWalkMeIdFromTileId)(hotspotId);
        var hasFocusedMenuSmartTip = this.currentMenuFocusedSmartTip !== null;
        var isOpenedBubbleSameAsFocusedMenu = this.currentMenuFocusedSmartTip === smarttipId;
        if (hasFocusedMenuSmartTip && !isOpenedBubbleSameAsFocusedMenu) {
            (0, menuHotspotsAction_1.unfocusMenuHotspot)(this.tabId, this.setId, this.currentMenuFocusedSmartTip);
            this.currentMenuFocusedSmartTip = null;
        }
        if (smarttipId === undefined) {
            return;
        }
        this.currentOpenBubble = hotspotId;
    };
    HotspotsStateManager.prototype.handleBubbleClosedByCmp = function (hotspotId) {
        consoleLogger_1.logger.log(consoleLogger_1.LogLevels.Silly, 'handleBubbleClosedByCmp', hotspotId);
        if (this.currentOpenBubble === hotspotId) {
            var smarttipId = (0, tileIdToWalkMeIdConverter_1.getWalkMeIdFromTileId)(hotspotId);
            if (smarttipId !== undefined) {
                (0, menuHotspotsAction_1.unfocusMenuHotspot)(this.tabId, this.setId, smarttipId);
                this.currentOpenBubble = null;
                this.currentMenuFocusedSmartTip = null;
            }
        }
    };
    HotspotsStateManager.prototype.handleTileHoveredByCmp = function (hotspotId) {
        // we don't handle hover events at the moment.
        this.currentHighlightedHotspot = hotspotId;
    };
    HotspotsStateManager.prototype.handleTileLeaveByCmp = function (hotspotId) {
        // we don't handle leave events at the moment.
        this.currentHighlightedHotspot = null;
    };
    HotspotsStateManager.prototype.highlightCompanionHotspot = function (descriptor) {
        consoleLogger_1.logger.log(consoleLogger_1.LogLevels.Silly, "Highlighting companion hotspot ".concat(descriptor));
        this.companionApi.propagateMenuState({ type: 'hover', descriptor: descriptor });
    };
    HotspotsStateManager.prototype.unhighlightCompanionHotspot = function (descriptor) {
        consoleLogger_1.logger.log(consoleLogger_1.LogLevels.Silly, "Unhighlighting companion hotspot ".concat(descriptor));
        this.companionApi.propagateMenuState({ type: 'leave', descriptor: descriptor });
    };
    HotspotsStateManager.prototype.closeCompanionBubble = function (descriptor) {
        consoleLogger_1.logger.log(consoleLogger_1.LogLevels.Silly, "Closing companion bubble for hotspot ".concat(descriptor));
        this.companionApi.propagateMenuState({ type: 'deselect', descriptor: descriptor });
    };
    HotspotsStateManager.prototype.openCompanionBubble = function (descriptor) {
        consoleLogger_1.logger.log(consoleLogger_1.LogLevels.Silly, "open companion bubble for hotspot ".concat(descriptor));
        this.companionApi.propagateMenuState({ type: 'select', descriptor: descriptor });
    };
    return HotspotsStateManager;
}());
exports.HotspotsStateManager = HotspotsStateManager;


/***/ }),

/***/ 606:
/***/ (function(__unused_webpack_module, exports, __nested_webpack_require_129401__) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.unfocusMenuHotspot = exports.focusMenuHotspot = void 0;
var consoleLogger_1 = __nested_webpack_require_129401__(969);
var focusMenuHotspot = function (tabId, setId, smarttipId) {
    var anyWindow = window;
    var _walkmeInternals = anyWindow._walkmeInternals;
    consoleLogger_1.logger.log(consoleLogger_1.LogLevels.Silly, "Focusing menu hotspot ".concat(smarttipId));
    _walkmeInternals.ctx.get('CommonEvents').raiseEvent('MenuItemHighlight', { tabId: tabId, itemId: setId, subItemId: smarttipId });
};
exports.focusMenuHotspot = focusMenuHotspot;
var unfocusMenuHotspot = function (tabId, setId, smarttipId) {
    consoleLogger_1.logger.log(consoleLogger_1.LogLevels.Silly, "Unfocusing menu hotspot ".concat(smarttipId));
    var anyWindow = window;
    var _walkmeInternals = anyWindow._walkmeInternals;
    _walkmeInternals.ctx.get('CommonEvents').raiseEvent('MenuItemHighlightHide', { tabId: tabId, itemId: setId, subItemId: smarttipId });
};
exports.unfocusMenuHotspot = unfocusMenuHotspot;


/***/ }),

/***/ 200:
/***/ (function(__unused_webpack_module, exports, __nested_webpack_require_130561__) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.WmMenuOpenFromCmpIntegration = void 0;
var consoleLogger_1 = __nested_webpack_require_130561__(969);
var websiteShrinker_1 = __nested_webpack_require_130561__(819);
var menuToggler_1 = __nested_webpack_require_130561__(371);
var interactionGuidProvider_1 = __nested_webpack_require_130561__(522);
var WmMenuAndCmpMenuIntegration = /** @class */ (function () {
    function WmMenuAndCmpMenuIntegration(companionApi, shouldShrinkWebsite) {
        this.companionApi = companionApi;
        this.shouldShrinkWebsite = shouldShrinkWebsite;
        this.wasCmpOpenedByWm = false;
        this.handleCompanionMenuToggleEvent = this.handleCompanionMenuToggleEvent.bind(this);
        this.handleCompanionSwitchToWalkMeEvent = this.handleCompanionSwitchToWalkMeEvent.bind(this);
        this.handleSwitchToClassic = this.handleSwitchToClassic.bind(this);
        this.handleCompanionAvailableChangedEvent = this.handleCompanionAvailableChangedEvent.bind(this);
        this.handleMenuShow = this.handleMenuShow.bind(this);
        this.handleMenuHide = this.handleMenuHide.bind(this);
    }
    WmMenuAndCmpMenuIntegration.prototype.start = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                (0, menuToggler_1.setShouldShowSwitchToCmp)(this.companionApi.isAvailable());
                this.subscribeToCompanionEvents();
                this.subscribeToMenuEvents();
                return [2 /*return*/];
            });
        });
    };
    WmMenuAndCmpMenuIntegration.prototype.stop = function () {
        this.unsubscribeFromCompanionEvents();
        this.unsubscribeFromMenuEvents();
    };
    WmMenuAndCmpMenuIntegration.prototype.subscribeToMenuEvents = function () {
        var anyWindow = window;
        var _walkmeInternals = anyWindow._walkmeInternals;
        _walkmeInternals.on('MenuShow', this.handleMenuShow);
        _walkmeInternals.on('MenuHide', this.handleMenuHide);
        _walkmeInternals.on('switch.to.classic', this.handleSwitchToClassic);
    };
    WmMenuAndCmpMenuIntegration.prototype.unsubscribeFromMenuEvents = function () {
        var anyWindow = window;
        var _walkmeInternals = anyWindow._walkmeInternals;
        _walkmeInternals.off('MenuShow', this.handleMenuShow);
        _walkmeInternals.off('MenuHide', this.handleMenuHide);
        _walkmeInternals.off('switch.to.classic', this.handleSwitchToClassic);
    };
    WmMenuAndCmpMenuIntegration.prototype.handleMenuShow = function () {
        (0, interactionGuidProvider_1.createNewInteractionGuid)();
        if (this.shouldShrinkWebsite) {
            (0, websiteShrinker_1.enableFioriIndent)(410);
        }
        this.companionApi.close();
    };
    WmMenuAndCmpMenuIntegration.prototype.handleMenuHide = function () {
        if (this.shouldShrinkWebsite) {
            (0, websiteShrinker_1.disableFioriIndent)();
        }
    };
    WmMenuAndCmpMenuIntegration.prototype.handleSwitchToClassic = function (event) {
        (0, menuToggler_1.hideWalkMeMenu)();
        this.openCompanionMenu();
    };
    WmMenuAndCmpMenuIntegration.prototype.openCompanionMenu = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.companionApi.open()];
                    case 1:
                        _a.sent();
                        this.wasCmpOpenedByWm = true;
                        return [2 /*return*/];
                }
            });
        });
    };
    WmMenuAndCmpMenuIntegration.prototype.subscribeToCompanionEvents = function () {
        var _a, _b, _c;
        (_a = this.companionApi.listeners.onUserHelp) === null || _a === void 0 ? void 0 : _a.addListener(this.handleCompanionMenuToggleEvent);
        (_b = this.companionApi.listeners.onSwitchToWm) === null || _b === void 0 ? void 0 : _b.addListener(this.handleCompanionSwitchToWalkMeEvent);
        (_c = this.companionApi.listeners.onCompanionAvailableChanged) === null || _c === void 0 ? void 0 : _c.addListener(this.handleCompanionAvailableChangedEvent);
    };
    WmMenuAndCmpMenuIntegration.prototype.handleCompanionAvailableChangedEvent = function (isAvailable) {
        consoleLogger_1.logger.log(consoleLogger_1.LogLevels.DEBUG, 'WmMenuAndCmpMenuIntegration: handleCompanionAvailableChangedEvent', isAvailable);
        (0, menuToggler_1.setShouldShowSwitchToCmp)(isAvailable);
    };
    WmMenuAndCmpMenuIntegration.prototype.unsubscribeFromCompanionEvents = function () {
        var _a, _b, _c;
        (_a = this.companionApi.listeners.onUserHelp) === null || _a === void 0 ? void 0 : _a.removeListener(this.handleCompanionMenuToggleEvent);
        (_b = this.companionApi.listeners.onSwitchToWm) === null || _b === void 0 ? void 0 : _b.removeListener(this.handleCompanionSwitchToWalkMeEvent);
        (_c = this.companionApi.listeners.onCompanionAvailableChanged) === null || _c === void 0 ? void 0 : _c.removeListener(this.handleCompanionAvailableChangedEvent);
    };
    WmMenuAndCmpMenuIntegration.prototype.handleCompanionMenuToggleEvent = function (event) {
        return __awaiter(this, void 0, void 0, function () {
            var isCmpMenuOpen, isWalkMeMenuOpen, hasWalkMeContent;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.companionApi.isOpen()];
                    case 1:
                        isCmpMenuOpen = _a.sent();
                        if (this.wasCmpOpenedByWm != isCmpMenuOpen) {
                            // fixing a bug where CMP raises the onUserHelp event even when not needed (like their menu close).
                            this.wasCmpOpenedByWm = isCmpMenuOpen;
                            return [2 /*return*/];
                        }
                        if (isCmpMenuOpen) {
                            this.companionApi.close();
                            return [2 /*return*/];
                        }
                        isWalkMeMenuOpen = (0, menuToggler_1.checkIsWalkMeMenuOpen)();
                        if (isWalkMeMenuOpen) {
                            (0, menuToggler_1.hideWalkMeMenu)();
                            return [2 /*return*/];
                        }
                        hasWalkMeContent = this.checkWalkMeHasContent();
                        if (hasWalkMeContent) {
                            (0, menuToggler_1.showWalkMeMenu)();
                        }
                        else {
                            this.openCompanionMenu();
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    WmMenuAndCmpMenuIntegration.prototype.checkWalkMeHasContent = function () {
        var _a;
        var anyWindow = window;
        var WalkMeAPI = anyWindow.WalkMeAPI;
        var tabs = (_a = WalkMeAPI === null || WalkMeAPI === void 0 ? void 0 : WalkMeAPI.getObjectsTree()) !== null && _a !== void 0 ? _a : [];
        for (var _i = 0, tabs_1 = tabs; _i < tabs_1.length; _i++) {
            var tab = tabs_1[_i];
            if (tab.isVisible()) {
                return true;
            }
        }
        return false;
    };
    WmMenuAndCmpMenuIntegration.prototype.handleCompanionSwitchToWalkMeEvent = function (event) {
        (0, menuToggler_1.showWalkMeMenu)();
    };
    return WmMenuAndCmpMenuIntegration;
}());
exports.WmMenuOpenFromCmpIntegration = WmMenuAndCmpMenuIntegration;


/***/ }),

/***/ 894:
/***/ (function(__unused_webpack_module, exports, __nested_webpack_require_140868__) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.WmMenuWithCmpIntegration = void 0;
var companionHelpDataAvailableNotifier_1 = __nested_webpack_require_140868__(401);
var consoleLogger_1 = __nested_webpack_require_140868__(969);
var menuToggler_1 = __nested_webpack_require_140868__(371);
var menuTabActions_1 = __nested_webpack_require_140868__(703);
var tileActions_1 = __nested_webpack_require_140868__(331);
var smartTipSetCreator_1 = __nested_webpack_require_140868__(218);
var hotspotsStateManager_1 = __nested_webpack_require_140868__(527);
var smartTipActions_1 = __nested_webpack_require_140868__(911);
var websiteShrinker_1 = __nested_webpack_require_140868__(819);
var interactionGuidProvider_1 = __nested_webpack_require_140868__(522);
var companionTilesDrawer_1 = __nested_webpack_require_140868__(510);
var companionLearningDataAvailableNotifier_1 = __nested_webpack_require_140868__(42);
var featuresManager_1 = __nested_webpack_require_140868__(885);
var WmMenuWithCmpIntegration = /** @class */ (function () {
    function WmMenuWithCmpIntegration(companionApi, shouldShrinkWebsite) {
        var _a;
        this.shouldShrinkWebsite = shouldShrinkWebsite;
        this.shouldShowHotspotsWithoutMenu = false;
        this.isSelectedTabOnScreenHelp = false;
        this.isMenuOpen = false;
        this.isLearningDataIntegrationEnabled = false;
        this.companionApi = companionApi;
        this.companionTilesDrawer = new companionTilesDrawer_1.CompanionTilesDrawer(companionApi);
        this.handleMenuShow = this.handleMenuShow.bind(this);
        this.handleMenuHide = this.handleMenuHide.bind(this);
        this.handleMenuItemClicked = this.handleMenuItemClicked.bind(this);
        this.handleMenuItemHovered = this.handleMenuItemHovered.bind(this);
        this.handleMenuItemHoveredOut = this.handleMenuItemHoveredOut.bind(this);
        this.handleNewCompanionHelpData = this.handleNewCompanionHelpData.bind(this);
        this.handleNewCompanionLearningData = this.handleNewCompanionLearningData.bind(this);
        this.handleCompanionTileEvent = this.handleCompanionTileEvent.bind(this);
        this.handleCompanionMenuToggleEvent = this.handleCompanionMenuToggleEvent.bind(this);
        this.handlePinHotspotsCheckboxChanged = this.handlePinHotspotsCheckboxChanged.bind(this);
        this.createWmSetAndTab = this.createWmSetAndTab.bind(this);
        this.handleTabSelected = this.handleTabSelected.bind(this);
        this.companionHelpDataAvailableNotifier = new companionHelpDataAvailableNotifier_1.CompanionHelpDataAvailableNotifier(companionApi);
        this.isLearningDataIntegrationEnabled = ((_a = (0, featuresManager_1.getFeaturesManager)()) === null || _a === void 0 ? void 0 : _a.isFeatureEnabled('integrateSenLearningItems')) || false;
        this.companionLearningDataAvailableNotifier = this.isLearningDataIntegrationEnabled ?
            new companionLearningDataAvailableNotifier_1.CompanionLearningDataAvailableNotifier(companionApi) :
            null;
    }
    WmMenuWithCmpIntegration.prototype.start = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        (0, menuToggler_1.setShouldShowSwitchToCmp)(false);
                        return [4 /*yield*/, this.createWmSetAndTab()];
                    case 1:
                        _a.sent();
                        this.hotspotsStateManager = new hotspotsStateManager_1.HotspotsStateManager(this.createdSmartTipsTab.Id, this.createdSet.Id, this.companionApi);
                        this.subscribeToMenuEvents();
                        this.subscribeToCompanionEvents();
                        this.companionHelpDataAvailableNotifier.registerToNewCompanionData(this.handleNewCompanionHelpData);
                        if (this.isLearningDataIntegrationEnabled) {
                            consoleLogger_1.logger.log(consoleLogger_1.LogLevels.INFO, 'Learning data integration enabled - registering');
                            this.learningTab = (0, menuTabActions_1.getOrCreateLearningTab)();
                            this.companionLearningDataAvailableNotifier.registerToNewCompanionData(this.handleNewCompanionLearningData);
                        }
                        else {
                            consoleLogger_1.logger.log(consoleLogger_1.LogLevels.INFO, 'Learning data integration disabled - not registering');
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    WmMenuWithCmpIntegration.prototype.stop = function () {
        this.unsubscribeFromMenuEvents();
        this.unsubscribeFromCompanionEvents();
        this.companionHelpDataAvailableNotifier.unregisterFromNewCompanionData(this.handleNewCompanionHelpData);
        if (this.isLearningDataIntegrationEnabled) {
            consoleLogger_1.logger.log(consoleLogger_1.LogLevels.INFO, 'Learning data integration enabled - unregistering');
            this.companionLearningDataAvailableNotifier.unregisterFromNewCompanionData(this.handleNewCompanionLearningData);
        }
        else {
            consoleLogger_1.logger.log(consoleLogger_1.LogLevels.INFO, 'Learning data integration disabled - no need to unregister');
        }
    };
    WmMenuWithCmpIntegration.prototype.createWmSetAndTab = function () {
        return __awaiter(this, void 0, void 0, function () {
            var tabNames, tabName, _a;
            var _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        this.createdSet = (0, smartTipSetCreator_1.createSmartTipSet)();
                        return [4 /*yield*/, (0, smartTipActions_1.getSmartTipSetsManager)().add(this.createdSet)];
                    case 1:
                        _c.sent();
                        return [4 /*yield*/, this.companionApi.getTabNames()];
                    case 2:
                        tabNames = _c.sent();
                        tabName = (_b = tabNames.help) !== null && _b !== void 0 ? _b : 'On-Screen Help';
                        _a = this;
                        return [4 /*yield*/, (0, menuTabActions_1.addCompanionSmartTipsTab)(this.createdSet, tabName)];
                    case 3:
                        _a.createdSmartTipsTab = _c.sent();
                        (0, menuTabActions_1.reloadMenuTab)(this.createdSmartTipsTab.Id);
                        consoleLogger_1.logger.log(consoleLogger_1.LogLevels.INFO, 'created set collection', this.createdSmartTipsTab, this.createdSet);
                        return [2 /*return*/];
                }
            });
        });
    };
    WmMenuWithCmpIntegration.prototype.handleNewCompanionHelpData = function (updateInfo) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                consoleLogger_1.logger.log(consoleLogger_1.LogLevels.DEBUG, 'new companion help data', updateInfo);
                (0, tileActions_1.digestTileChanges)(this.createdSmartTipsTab, updateInfo, this.createdSet.Id);
                // TODO: Do we remove the set from the tab when no content is available?
                // if (updateInfo.all.length === 0){
                //     removeSetFromTab(this.createdSetCollection.Id, this.createdSet!.Id);
                // }
                // else {
                //     addSetToTab(this.createdSetCollection.Id, this.createdSet!.Id);
                // }
                (0, menuTabActions_1.reloadMenuTab)(this.createdSmartTipsTab.Id);
                return [2 /*return*/];
            });
        });
    };
    WmMenuWithCmpIntegration.prototype.handleNewCompanionLearningData = function (updateInfo) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                consoleLogger_1.logger.log(consoleLogger_1.LogLevels.DEBUG, 'new companion learning data', updateInfo);
                (0, tileActions_1.digestTileChanges)(this.learningTab, updateInfo);
                (0, menuTabActions_1.reloadMenuTab)(this.learningTab.Id);
                return [2 /*return*/];
            });
        });
    };
    WmMenuWithCmpIntegration.prototype.subscribeToMenuEvents = function () {
        var anyWindow = window;
        var _walkmeInternals = anyWindow._walkmeInternals;
        _walkmeInternals.on('MenuShow', this.handleMenuShow);
        _walkmeInternals.on('MenuHide', this.handleMenuHide);
        _walkmeInternals.on('MenuTabSelected', this.handleTabSelected);
        _walkmeInternals.on('MenuItemClicked', this.handleMenuItemClicked);
        _walkmeInternals.on('MenuItemHovered', this.handleMenuItemHovered);
        _walkmeInternals.on('MenuItemHoveredOut', this.handleMenuItemHoveredOut);
        _walkmeInternals.on('set.guidance.visibility', this.handlePinHotspotsCheckboxChanged);
    };
    WmMenuWithCmpIntegration.prototype.unsubscribeFromMenuEvents = function () {
        var anyWindow = window;
        var _walkmeInternals = anyWindow._walkmeInternals;
        _walkmeInternals.off('MenuShow', this.handleMenuShow);
        _walkmeInternals.off('MenuHide', this.handleMenuHide);
        _walkmeInternals.off('MenuTabSelected', this.handleTabSelected);
        _walkmeInternals.off('MenuItemClicked', this.handleMenuItemClicked);
        _walkmeInternals.off('MenuItemHovered', this.handleMenuItemHovered);
        _walkmeInternals.off('MenuItemHoveredOut', this.handleMenuItemHoveredOut);
        _walkmeInternals.off('set.guidance.visibility', this.handlePinHotspotsCheckboxChanged);
    };
    WmMenuWithCmpIntegration.prototype.subscribeToCompanionEvents = function () {
        var _a;
        this.companionTilesDrawer.subscribeToTileEvent(this.handleCompanionTileEvent);
        (_a = this.companionApi.listeners.onUserHelp) === null || _a === void 0 ? void 0 : _a.addListener(this.handleCompanionMenuToggleEvent);
    };
    WmMenuWithCmpIntegration.prototype.unsubscribeFromCompanionEvents = function () {
        var _a;
        this.companionTilesDrawer.unsubscribeFromTileEvent(this.handleCompanionTileEvent);
        (_a = this.companionApi.listeners.onUserHelp) === null || _a === void 0 ? void 0 : _a.removeListener(this.handleCompanionMenuToggleEvent);
    };
    WmMenuWithCmpIntegration.prototype.handleCompanionMenuToggleEvent = function (event) {
        consoleLogger_1.logger.log(consoleLogger_1.LogLevels.DEBUG, 'handleCompanionMenuToggleEvent', event);
        (0, menuToggler_1.toggleWalkMeMenu)();
    };
    WmMenuWithCmpIntegration.prototype.handleCompanionTileEvent = function (tileEvent) {
        consoleLogger_1.logger.log(consoleLogger_1.LogLevels.DEBUG, 'handleCompanionTileEvent', tileEvent);
        switch (tileEvent.eventType) {
            case 'select':
                this.hotspotsStateManager.handleBubbleOpenedByCmp(tileEvent.tileId);
                break;
            case 'deselect':
                this.hotspotsStateManager.handleBubbleClosedByCmp(tileEvent.tileId);
                break;
            case 'hover':
                this.hotspotsStateManager.handleTileHoveredByCmp(tileEvent.tileId);
                break;
            case 'leave':
                this.hotspotsStateManager.handleTileLeaveByCmp(tileEvent.tileId);
                break;
        }
    };
    WmMenuWithCmpIntegration.prototype.handleMenuShow = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.isMenuOpen = true;
                        return [4 /*yield*/, this.syncCmpHotspotsMode()];
                    case 1:
                        _a.sent();
                        (0, interactionGuidProvider_1.createNewInteractionGuid)();
                        if (this.shouldShrinkWebsite) {
                            (0, websiteShrinker_1.enableFioriIndent)(410);
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    WmMenuWithCmpIntegration.prototype.handleTabSelected = function (event, data) {
        return __awaiter(this, void 0, void 0, function () {
            var selectedTabId, selectedTabIdAsNumber;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        consoleLogger_1.logger.log(consoleLogger_1.LogLevels.DEBUG, 'handleTabSelected', data);
                        selectedTabId = data === null || data === void 0 ? void 0 : data.tabId;
                        selectedTabIdAsNumber = parseInt(selectedTabId, 10);
                        if (selectedTabIdAsNumber === this.createdSmartTipsTab.Id) {
                            this.isSelectedTabOnScreenHelp = true;
                        }
                        else {
                            this.isSelectedTabOnScreenHelp = false;
                        }
                        return [4 /*yield*/, this.syncCmpHotspotsMode()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    WmMenuWithCmpIntegration.prototype.syncCmpHotspotsMode = function () {
        return __awaiter(this, void 0, void 0, function () {
            var targetMode;
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        targetMode = 'off';
                        if (this.shouldShowHotspotsWithoutMenu) {
                            targetMode = 'on';
                        }
                        else if (this.isMenuOpen && this.isSelectedTabOnScreenHelp) {
                            targetMode = 'on';
                        }
                        else if (this.isMenuOpen && !this.isSelectedTabOnScreenHelp) {
                            targetMode = 'stealth';
                        }
                        else {
                            targetMode = 'off';
                        }
                        // TODO: HACK!
                        // this fixes a bug where Help4.WM.closeHelp is calling "onUserHelp" event for some reason, this is a workaround
                        (_a = this.companionApi.listeners.onUserHelp) === null || _a === void 0 ? void 0 : _a.removeListener(this.handleCompanionMenuToggleEvent);
                        consoleLogger_1.logger.log(consoleLogger_1.LogLevels.DEBUG, 'syncCmpHotspotsMode', {
                            shouldShowHotspotsWithoutMenu: this.shouldShowHotspotsWithoutMenu,
                            isMenuOpen: this.isMenuOpen,
                            isSelectedTabOnScreenHelp: this.isSelectedTabOnScreenHelp,
                            targetMode: targetMode
                        });
                        return [4 /*yield*/, this.companionTilesDrawer.switchToMode(targetMode)];
                    case 1:
                        _c.sent();
                        (_b = this.companionApi.listeners.onUserHelp) === null || _b === void 0 ? void 0 : _b.addListener(this.handleCompanionMenuToggleEvent);
                        return [2 /*return*/];
                }
            });
        });
    };
    WmMenuWithCmpIntegration.prototype.handlePinHotspotsCheckboxChanged = function (event, data) {
        consoleLogger_1.logger.log(consoleLogger_1.LogLevels.DEBUG, 'handlePinHotspotsCheckboxChanged', data);
        var newValue = data === null || data === void 0 ? void 0 : data.value;
        this.shouldShowHotspotsWithoutMenu = newValue;
    };
    WmMenuWithCmpIntegration.prototype.handleMenuHide = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.isMenuOpen = false;
                        return [4 /*yield*/, this.syncCmpHotspotsMode()];
                    case 1:
                        _a.sent();
                        if (this.shouldShrinkWebsite) {
                            (0, websiteShrinker_1.disableFioriIndent)();
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    WmMenuWithCmpIntegration.prototype.handleMenuItemClicked = function (e, data) {
        consoleLogger_1.logger.log(consoleLogger_1.LogLevels.DEBUG, 'menu item clicked', data);
        if (!this.isTileMenuEvet(data)) {
            return;
        }
        this.hotspotsStateManager.handleMenuHotspotClicked(data.options.subItemId);
    };
    WmMenuWithCmpIntegration.prototype.handleMenuItemHovered = function (e, data) {
        if (!this.isTileMenuEvet(data)) {
            return;
        }
        this.hotspotsStateManager.handleMenuHotspotHovered(data.options.subItemId);
    };
    WmMenuWithCmpIntegration.prototype.handleMenuItemHoveredOut = function (e, data) {
        if (!this.isTileMenuEvet(data)) {
            return;
        }
        this.hotspotsStateManager.handleMenuHotspotHoveredOut(data.options.subItemId);
    };
    WmMenuWithCmpIntegration.prototype.isTileMenuEvet = function (data) {
        var _a, _b;
        return (data === null || data === void 0 ? void 0 : data.type) === 'smarttipset' && data.id == ((_a = this.createdSet) === null || _a === void 0 ? void 0 : _a.Id) && ((_b = data === null || data === void 0 ? void 0 : data.options) === null || _b === void 0 ? void 0 : _b.subItemId) !== undefined;
    };
    return WmMenuWithCmpIntegration;
}());
exports.WmMenuWithCmpIntegration = WmMenuWithCmpIntegration;


/***/ }),

/***/ 516:
/***/ (function(__unused_webpack_module, exports, __nested_webpack_require_161293__) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CMP_WM_MODE_FULL_INTEGRATION = exports.CMP_WM_MODE_JUST_QUESTION_MARK = exports.getPluginConfig = void 0;
var urlParamHelper_1 = __nested_webpack_require_161293__(458);
var DISABLE_CMP_TRACKING_CMP_PARAM = 'wmDisableCmpTracking';
var CMP_WM_MODE_TWO_MENUS = 1;
exports.CMP_WM_MODE_JUST_QUESTION_MARK = CMP_WM_MODE_TWO_MENUS;
var CMP_WM_MODE_FULL_INTEGRATION = 2;
exports.CMP_WM_MODE_FULL_INTEGRATION = CMP_WM_MODE_FULL_INTEGRATION;
var INTEGRATION_ACTIVE_MODES = [CMP_WM_MODE_FULL_INTEGRATION, CMP_WM_MODE_TWO_MENUS];
var getPluginConfig = function () {
    var anyWindow = window;
    var walkmeLoaderConfig = anyWindow.walkmeLoaderConfig;
    var wmCmpMode = walkmeLoaderConfig === null || walkmeLoaderConfig === void 0 ? void 0 : walkmeLoaderConfig.wmCmpMode;
    if (wmCmpMode === undefined || wmCmpMode === null) {
        wmCmpMode = getWmCmpModeFromUrl();
    }
    var integrationModeToUse = 0;
    if (wmCmpMode !== undefined && INTEGRATION_ACTIVE_MODES.includes(wmCmpMode)) {
        integrationModeToUse = wmCmpMode;
    }
    var disableCmpTracking = (0, urlParamHelper_1.getUrlParam)(DISABLE_CMP_TRACKING_CMP_PARAM) == '1';
    var companionConnectionRole = 'UseDirect';
    var isIframe = window.top !== window.self;
    if (isIframe) {
        var isInitFromTop = !!(walkmeLoaderConfig === null || walkmeLoaderConfig === void 0 ? void 0 : walkmeLoaderConfig.initFromTop);
        var shouldServeCompanionToTop = isInitFromTop;
        if (shouldServeCompanionToTop) {
            companionConnectionRole = 'ServeCompanionToTop';
        }
        else {
            companionConnectionRole = 'UseDirect';
        }
    }
    else {
        var shouldAllowRemote = !!(window.ariba);
        if (shouldAllowRemote) {
            companionConnectionRole = 'UseDirectOrRemote';
        }
        else {
            companionConnectionRole = 'UseDirect';
        }
    }
    var helpEditorUrlParam = (0, urlParamHelper_1.getUrlParam)('help-editor');
    var hasEditorModeInUrl = helpEditorUrlParam !== undefined && helpEditorUrlParam !== null;
    var allowEditorModeOverride = false;
    if (!hasEditorModeInUrl) {
        allowEditorModeOverride = !!(window.ariba);
    }
    return {
        sendCmpTracking: !disableCmpTracking,
        cmpIntegrationMode: integrationModeToUse,
        companionConnectionRole: companionConnectionRole,
        allowEditorModeOverride: allowEditorModeOverride
    };
};
exports.getPluginConfig = getPluginConfig;
var getWmCmpModeFromUrl = function () {
    var wmCmpModeFromUrl = (0, urlParamHelper_1.getUrlParam)('wmCmpMode');
    if (wmCmpModeFromUrl === undefined || wmCmpModeFromUrl === null || wmCmpModeFromUrl === '') {
        return undefined;
    }
    var wmCmpMode = parseInt(wmCmpModeFromUrl, 10);
    if (isNaN(wmCmpMode)) {
        return undefined;
    }
    return wmCmpMode;
};


/***/ }),

/***/ 170:
/***/ (function(__unused_webpack_module, exports, __nested_webpack_require_164294__) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.startCmpUsageTracking = void 0;
var companionApi_1 = __nested_webpack_require_164294__(639);
var consoleLogger_1 = __nested_webpack_require_164294__(969);
var cmpEventToWmEventConverter_1 = __nested_webpack_require_164294__(808);
var wmEventSenderProvider_1 = __nested_webpack_require_164294__(674);
var startCmpUsageTracking = function () {
    try {
        var cmpTracking = companionApi_1.Help4.getController().getService('tracking');
        cmpTracking.addConnector([{ type: 'Shell', callback: handleCmpTrackingEvent }]);
    }
    catch (e) {
        // ignore
    }
};
exports.startCmpUsageTracking = startCmpUsageTracking;
var handleCmpTrackingEvent = function (cmpTrackingEvent) {
    consoleLogger_1.logger.log(consoleLogger_1.LogLevels.DEBUG, 'handleCmpTrackingEvent', cmpTrackingEvent);
    try {
        var wmEvent = (0, cmpEventToWmEventConverter_1.convertToWmEvent)(cmpTrackingEvent);
        if (!wmEvent) {
            return;
        }
        consoleLogger_1.logger.log(consoleLogger_1.LogLevels.DEBUG, 'sending wm event', wmEvent);
        var eventSender = (0, wmEventSenderProvider_1.getWmEventSender)();
        eventSender === null || eventSender === void 0 ? void 0 : eventSender.postEvent(wmEvent.type, wmEvent.data);
    }
    catch (e) {
        // ignore
    }
};


/***/ }),

/***/ 808:
/***/ (function(__unused_webpack_module, exports, __nested_webpack_require_165705__) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.convertToWmEvent = void 0;
var consoleLogger_1 = __nested_webpack_require_165705__(969);
var interactionGuidProvider_1 = __nested_webpack_require_165705__(522);
var convertToWmEvent = function (cmpTrackingEvent) {
    try {
        var interactionGuid = (0, interactionGuidProvider_1.getInteractionGuid)();
        return {
            type: 'cmp-' + cmpTrackingEvent.verb.id,
            data: {
                type: 'cmp-' + cmpTrackingEvent.object.objectType,
                oId: cmpTrackingEvent.object.id,
                oName: cmpTrackingEvent.object.loio || cmpTrackingEvent.object.id,
                aoId: cmpTrackingEvent.object.name,
                value: cmpTrackingEvent.object.id,
                owType: cmpTrackingEvent.context.app,
                owName: cmpTrackingEvent.context.loio || cmpTrackingEvent.context.id,
                aoName: cmpTrackingEvent.context.id,
                // owId: cmpTrackingEvent.context.id,
                pId: cmpTrackingEvent.object.sessionId,
                aType: cmpTrackingEvent.object.product,
                aAppType: cmpTrackingEvent.object.screenId,
                aVersion: cmpTrackingEvent.object.version,
                intId: interactionGuid,
                pInit: {
                    type: cmpTrackingEvent.object.playbackTag,
                    appType: cmpTrackingEvent.object.solution,
                    sType: cmpTrackingEvent.object.language,
                },
                reason: "CMP",
            }
        };
    }
    catch (e) {
        consoleLogger_1.logger.log(consoleLogger_1.LogLevels.ERROR, 'Error converting CMP tracking event to WM event', e);
        return undefined;
    }
};
exports.convertToWmEvent = convertToWmEvent;


/***/ }),

/***/ 522:
/***/ (function(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.createNewInteractionGuid = exports.getInteractionGuid = void 0;
var currentInteractionGuid = undefined;
var getInteractionGuid = function () {
    if (!currentInteractionGuid) {
        currentInteractionGuid = generateGuid();
    }
    return currentInteractionGuid;
};
exports.getInteractionGuid = getInteractionGuid;
var createNewInteractionGuid = function () {
    currentInteractionGuid = generateGuid();
};
exports.createNewInteractionGuid = createNewInteractionGuid;
var generateGuid = function () {
    try {
        var anyWindow = window;
        var _walkmeInternals = anyWindow._walkmeInternals;
        return _walkmeInternals.ctx.get('GuidGenerator').generateGuid(true);
    }
    catch (e) {
        return '';
    }
};


/***/ }),

/***/ 674:
/***/ (function(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getWmEventSender = void 0;
var eventSender = undefined;
var getWmEventSender = function () {
    if (eventSender) {
        return eventSender;
    }
    var anyWindow = window;
    var _walkmeInternals = anyWindow._walkmeInternals;
    eventSender = _walkmeInternals.ctx.get('EventSender');
    return eventSender;
};
exports.getWmEventSender = getWmEventSender;


/***/ }),

/***/ 763:
/***/ (function(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ResourceSubType = exports.WalkMeItemType = void 0;
var WalkMeItemType;
(function (WalkMeItemType) {
    WalkMeItemType["SmartTip"] = "SmartTip";
    WalkMeItemType["Shuttle"] = "Shuttle";
    WalkMeItemType["Resource"] = "Resource";
})(WalkMeItemType || (exports.WalkMeItemType = WalkMeItemType = {}));
var ResourceSubType;
(function (ResourceSubType) {
    ResourceSubType[ResourceSubType["Article"] = 0] = "Article";
    ResourceSubType[ResourceSubType["Video"] = 1] = "Video";
})(ResourceSubType || (exports.ResourceSubType = ResourceSubType = {}));


/***/ }),

/***/ 885:
/***/ (function(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getFeaturesManager = void 0;
var getFeaturesManager = function () {
    var _a, _b;
    var _walkmeInternals = window._walkmeInternals;
    return (_b = (_a = _walkmeInternals === null || _walkmeInternals === void 0 ? void 0 : _walkmeInternals.ctx) === null || _a === void 0 ? void 0 : _a.get) === null || _b === void 0 ? void 0 : _b.call(_a, 'FeaturesManager');
};
exports.getFeaturesManager = getFeaturesManager;


/***/ }),

/***/ 925:
/***/ (function(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getUiDataProvider = void 0;
var getUiDataProvider = function () {
    var _a, _b;
    var _walkmeInternals = window._walkmeInternals;
    return (_b = (_a = _walkmeInternals === null || _walkmeInternals === void 0 ? void 0 : _walkmeInternals.ctx) === null || _a === void 0 ? void 0 : _a.get) === null || _b === void 0 ? void 0 : _b.call(_a, 'UiDataProvider');
};
exports.getUiDataProvider = getUiDataProvider;


/***/ }),

/***/ 104:
/***/ (function(__unused_webpack_module, exports, __nested_webpack_require_170810__) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.createArticle = void 0;
var consts_1 = __nested_webpack_require_170810__(540);
var NEW_TAB_PLAY_MODE = '2';
var createArticle = function (_a) {
    var id = _a.id, name = _a.name, url = _a.url;
    return ({
        DeployableSystems: null,
        Description: null,
        Goals: [],
        Guid: null,
        Id: id,
        Keywords: [],
        Name: name,
        ResourceId: '',
        Settings: {
            ContentPlayMode: NEW_TAB_PLAY_MODE,
            DisplayConditions: {},
            LightboxHeight: '60',
            LightboxWidth: '60',
            heightUnit: '%',
            learningData: {
                isLearning: true
            },
            widthUnit: '%'
        },
        Type: 0,
        Url: url,
        deployableType: consts_1.ResourceType,
        isRto: true,
    });
};
exports.createArticle = createArticle;


/***/ }),

/***/ 540:
/***/ (function(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ResourceTypeName = exports.ResourceType = exports.ShuttleType = exports.WalkThruType = exports.SmartTipSetDeployableType = void 0;
var SmartTipSetDeployableType = 19;
exports.SmartTipSetDeployableType = SmartTipSetDeployableType;
var WalkThruType = 0;
exports.WalkThruType = WalkThruType;
var ShuttleType = 9;
exports.ShuttleType = ShuttleType;
var ResourceType = 7;
exports.ResourceType = ResourceType;
var ResourceTypeName = 'content';
exports.ResourceTypeName = ResourceTypeName;


/***/ }),

/***/ 371:
/***/ (function(__unused_webpack_module, exports, __nested_webpack_require_172457__) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.unwrapWalkMeMenuApiToggle = exports.wrapWalkMeMenuApiToggle = exports.checkIsWalkMeMenuOpen = exports.hideWalkMeMenu = exports.showWalkMeMenu = exports.toggleWalkMeMenu = exports.setShouldShowSwitchToCmp = void 0;
var consoleLogger_1 = __nested_webpack_require_172457__(969);
var toggleParams = {};
var setShouldShowSwitchToCmp = function (showSwitchToCmp) {
    if (toggleParams.showSwitchToClassic === showSwitchToCmp) {
        return;
    }
    consoleLogger_1.logger.log(consoleLogger_1.LogLevels.DEBUG, 'setShouldShowSwitchToCmp', showSwitchToCmp);
    toggleParams.showSwitchToClassic = showSwitchToCmp;
    if (showSwitchToCmp) {
        wrapWalkMeMenuApiToggle();
    }
    else {
        unwrapWalkMeMenuApiToggle();
    }
};
exports.setShouldShowSwitchToCmp = setShouldShowSwitchToCmp;
var toggleWalkMeMenu = function () {
    var anyWindow = window;
    var WalkMePlayerAPI = anyWindow.WalkMePlayerAPI;
    WalkMePlayerAPI === null || WalkMePlayerAPI === void 0 ? void 0 : WalkMePlayerAPI.toggleMenu(toggleParams);
};
exports.toggleWalkMeMenu = toggleWalkMeMenu;
var showWalkMeMenu = function () {
    var anyWindow = window;
    var WalkMePlayerAPI = anyWindow.WalkMePlayerAPI;
    if (!WalkMePlayerAPI.isMenuOpen()) {
        toggleWalkMeMenu();
    }
};
exports.showWalkMeMenu = showWalkMeMenu;
var hideWalkMeMenu = function () {
    var anyWindow = window;
    var WalkMePlayerAPI = anyWindow.WalkMePlayerAPI;
    if (WalkMePlayerAPI === null || WalkMePlayerAPI === void 0 ? void 0 : WalkMePlayerAPI.isMenuOpen()) {
        toggleWalkMeMenu();
    }
};
exports.hideWalkMeMenu = hideWalkMeMenu;
var checkIsWalkMeMenuOpen = function () {
    var _a;
    var anyWindow = window;
    var WalkMePlayerAPI = anyWindow.WalkMePlayerAPI;
    return (_a = WalkMePlayerAPI === null || WalkMePlayerAPI === void 0 ? void 0 : WalkMePlayerAPI.isMenuOpen()) !== null && _a !== void 0 ? _a : false;
};
exports.checkIsWalkMeMenuOpen = checkIsWalkMeMenuOpen;
var oldToggle;
var didWrap = false;
var wrapWalkMeMenuApiToggle = function () {
    if (didWrap) {
        return;
    }
    var anyWindow = window;
    var WalkMePlayerAPI = anyWindow.WalkMePlayerAPI;
    if (!(WalkMePlayerAPI === null || WalkMePlayerAPI === void 0 ? void 0 : WalkMePlayerAPI.toggleMenu)) {
        consoleLogger_1.logger.log(consoleLogger_1.LogLevels.DEBUG, 'wrapWalkMeMenuApiToggle: no toggleMenu found');
        return;
    }
    oldToggle = WalkMePlayerAPI.toggleMenu;
    WalkMePlayerAPI.toggleMenu = function (sentToggleParams) {
        var toggleParamsToUse = sentToggleParams !== null && sentToggleParams !== void 0 ? sentToggleParams : {};
        Object.assign(toggleParamsToUse, toggleParams);
        oldToggle === null || oldToggle === void 0 ? void 0 : oldToggle.apply(WalkMePlayerAPI, [toggleParamsToUse]);
    };
    didWrap = true;
    consoleLogger_1.logger.log(consoleLogger_1.LogLevels.DEBUG, 'wrapWalkMeMenuApiToggle: wrapped');
};
exports.wrapWalkMeMenuApiToggle = wrapWalkMeMenuApiToggle;
var unwrapWalkMeMenuApiToggle = function () {
    if (!didWrap) {
        return;
    }
    var anyWindow = window;
    var WalkMePlayerAPI = anyWindow.WalkMePlayerAPI;
    if (!(WalkMePlayerAPI === null || WalkMePlayerAPI === void 0 ? void 0 : WalkMePlayerAPI.toggleMenu)) {
        return;
    }
    WalkMePlayerAPI.toggleMenu = oldToggle;
    didWrap = false;
};
exports.unwrapWalkMeMenuApiToggle = unwrapWalkMeMenuApiToggle;


/***/ }),

/***/ 703:
/***/ (function(__unused_webpack_module, exports, __nested_webpack_require_176032__) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.clearTab = exports.removeResourceFromTab = exports.removeShuttleFromTab = exports.addResourceToTab = exports.addShuttleToTab = exports.removeSetFromTab = exports.addSetToTab = exports.reloadMenuTab = exports.getOrCreateLearningTab = exports.addCompanionSmartTipsTab = void 0;
var consts_1 = __nested_webpack_require_176032__(540);
var menuTabCreator_1 = __nested_webpack_require_176032__(784);
var LEARNING_APP_TYPE = 'wm-learning';
var getCollectionsManager = function () {
    var anyWindow = window;
    var _walkmeInternals = anyWindow._walkmeInternals;
    return _walkmeInternals.ctx.get('CollectionsManager');
};
var addCompanionSmartTipsTab = function (smartTipSet, name) {
    var collection = (0, menuTabCreator_1.generateSmartTipSetCollection)(smartTipSet, name);
    getCollectionsManager().setDeployables([collection]);
    return collection;
};
exports.addCompanionSmartTipsTab = addCompanionSmartTipsTab;
var getOrCreateLearningTab = function () {
    var existingTab = getCollectionsManager().getAll().find(function (_a) {
        var Settings = _a.Settings;
        return (Settings === null || Settings === void 0 ? void 0 : Settings.appType) === LEARNING_APP_TYPE;
    });
    if (existingTab) {
        return existingTab;
    }
    var newLearningTab = (0, menuTabCreator_1.generateLearningTab)([]);
    getCollectionsManager().setDeployables([newLearningTab]);
    return newLearningTab;
};
exports.getOrCreateLearningTab = getOrCreateLearningTab;
var addShuttleToTab = function (collectionId, shuttleId) {
    addItemToTab(collectionId, shuttleId, consts_1.ShuttleType, true);
};
exports.addShuttleToTab = addShuttleToTab;
var addResourceToTab = function (collectionId, resourceId) {
    addItemToTab(collectionId, resourceId, consts_1.ResourceType, true);
};
exports.addResourceToTab = addResourceToTab;
var addSetToTab = function (collectionId, setId) {
    addItemToTab(collectionId, setId, consts_1.SmartTipSetDeployableType, false);
};
exports.addSetToTab = addSetToTab;
var linkedItemId = Date.now();
var addItemToTab = function (collectionId, itemId, itemType, prepend) {
    var collection = getCollectionsManager().getById(collectionId);
    var alreadyExists = collection.LinkedDeployables.some(function (linkedItem) { return (linkedItem.DeployableID === itemId && linkedItem.DeployableType === itemType); });
    if (alreadyExists) {
        return;
    }
    var collectionLinkId = linkedItemId++;
    var linkedItem = {
        DeployableID: itemId,
        DeployableType: itemType,
        Id: collectionLinkId,
        RelatedObjectId: collectionId,
        Settings: null,
        groupId: collectionId,
        OrderIndex: 0
    };
    if (prepend) {
        collection.LinkedDeployables.unshift(linkedItem);
    }
    else {
        linkedItem.OrderIndex = collection.LinkedDeployables.length;
        collection.LinkedDeployables.push(linkedItem);
    }
};
var removeSetFromTab = function (collectionId, setId) {
    removeItemFromTab(collectionId, setId, consts_1.SmartTipSetDeployableType);
};
exports.removeSetFromTab = removeSetFromTab;
var removeShuttleFromTab = function (collectionId, shuttleId) {
    removeItemFromTab(collectionId, shuttleId, consts_1.ShuttleType);
};
exports.removeShuttleFromTab = removeShuttleFromTab;
var removeResourceFromTab = function (collectionId, resourceId) {
    removeItemFromTab(collectionId, resourceId, consts_1.ResourceType);
};
exports.removeResourceFromTab = removeResourceFromTab;
var removeItemFromTab = function (collectionId, itemId, itemType) {
    var collection = getCollectionsManager().getById(collectionId);
    collection.LinkedDeployables = collection.LinkedDeployables.filter(function (linkedItem) { return (linkedItem.DeployableID !== itemId || linkedItem.DeployableType !== itemType); });
};
var clearTab = function (collectionId) {
    var collection = getCollectionsManager().getById(collectionId);
    collection.LinkedDeployables = [];
};
exports.clearTab = clearTab;
var reloadMenuTab = function (tabId) {
    var anyWindow = window;
    var _walkmeInternals = anyWindow._walkmeInternals;
    _walkmeInternals.ctx.get('CommonEvents').raiseEvent('MenuReloadTab', { tabId: tabId });
};
exports.reloadMenuTab = reloadMenuTab;


/***/ }),

/***/ 784:
/***/ (function(__unused_webpack_module, exports, __nested_webpack_require_180407__) {


var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.generateLearningTab = exports.generateSmartTipSetCollection = void 0;
var consts_1 = __nested_webpack_require_180407__(540);
var CollectionType = 99;
var GroupType = 2;
var LearningCollectionType = 0;
var LearningCollectionName = 'Learning';
var LearningAppType = 'wm-learning';
var BANNER_DISPLAY_TYPE = 'banner';
var generateSmartTipSetCollection = function (smartTipSet, collectionName) {
    var collectionId = Date.now();
    var collectionLinkId = collectionId;
    return {
        CollectionDeployables: [consts_1.SmartTipSetDeployableType.toString(), consts_1.ShuttleType.toString()],
        CollectionType: CollectionType,
        DeployableSystems: null,
        GroupType: GroupType,
        Guid: null,
        Id: collectionId,
        LinkedDeployables: [
            {
                DeployableID: smartTipSet.Id,
                DeployableType: consts_1.SmartTipSetDeployableType,
                Id: collectionLinkId,
                OrderIndex: 1,
                RelatedObjectId: collectionId,
                Settings: null,
                groupId: collectionId
            }
        ],
        Name: collectionName,
        OrderIndex: 0,
        Settings: {
            CollectionType: CollectionType.toString(),
            DeployableTypes: [consts_1.SmartTipSetDeployableType.toString(), consts_1.ShuttleType.toString()],
            default: '1'
        }
    };
};
exports.generateSmartTipSetCollection = generateSmartTipSetCollection;
var generateLearningTab = function (linkedDeployables) {
    var collectionId = Date.now();
    var collectionLinkId = collectionId;
    return {
        CollectionDeployables: [
            consts_1.SmartTipSetDeployableType.toString(),
            consts_1.WalkThruType.toString(),
            consts_1.ShuttleType.toString(),
            consts_1.ResourceType.toString()
        ],
        CollectionType: LearningCollectionType,
        DeployableSystems: null,
        GroupType: GroupType,
        Guid: null,
        Id: collectionId,
        LinkedDeployables: linkedDeployables.map(function (linkedDeployable, index) { return (__assign(__assign({}, linkedDeployable), { Id: collectionLinkId + index, RelatedObjectId: collectionId, groupId: collectionId })); }),
        Name: LearningCollectionName,
        OrderIndex: 1,
        Settings: {
            CollectionType: LearningCollectionType.toString(),
            DeployableTypes: [
                consts_1.SmartTipSetDeployableType.toString(),
                consts_1.WalkThruType.toString(),
                consts_1.ShuttleType.toString(),
                consts_1.ResourceType.toString()
            ],
            appType: LearningAppType,
            default: '0',
            displayType: BANNER_DISPLAY_TYPE
        }
    };
};
exports.generateLearningTab = generateLearningTab;


/***/ }),

/***/ 686:
/***/ (function(__unused_webpack_module, exports, __nested_webpack_require_183766__) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.createAndAddArticleToTab = void 0;
var tileIdToWalkMeIdConverter_1 = __nested_webpack_require_183766__(903);
var tileToArticleAdapter_1 = __nested_webpack_require_183766__(299);
var consoleLogger_1 = __nested_webpack_require_183766__(969);
var menuTabActions_1 = __nested_webpack_require_183766__(703);
var walkme_1 = __nested_webpack_require_183766__(763);
var uiDataProvider_1 = __nested_webpack_require_183766__(925);
var consts_1 = __nested_webpack_require_183766__(540);
var createAndAddArticleToTab = function (tab, tile) {
    var _a, _b, _c;
    var walkmeId = (0, tileIdToWalkMeIdConverter_1.getWalkMeIdFromTileId)(tile.id);
    var article;
    var uiDataProvider = (0, uiDataProvider_1.getUiDataProvider)();
    var existingArticles;
    if (uiDataProvider) {
        var learningTabContents_1 = (_a = uiDataProvider.uiObjectsTree().find(function (collection) { return collection.id() === tab.Id; })) === null || _a === void 0 ? void 0 : _a.children();
        existingArticles = (_b = getResourceManager()) === null || _b === void 0 ? void 0 : _b.getAll().filter(function (_a) {
            var Id = _a.Id;
            return learningTabContents_1 === null || learningTabContents_1 === void 0 ? void 0 : learningTabContents_1.filter(function (contentItem) {
                return !contentItem.properties().hasProperty('invisible') && contentItem.type() === consts_1.ResourceTypeName;
            }).map(function (contentItem) { return contentItem.id(); }).includes(Id);
        });
    }
    if (existingArticles === null || existingArticles === void 0 ? void 0 : existingArticles.length) {
        article = existingArticles.find(function (_a) {
            var _b, _c;
            var Id = _a.Id, Type = _a.Type, Settings = _a.Settings;
            return Id === walkmeId ||
                (Type === walkme_1.ResourceSubType.Article && ((_c = (_b = Settings.learningData) === null || _b === void 0 ? void 0 : _b.senEntities) === null || _c === void 0 ? void 0 : _c.includes(getTileId(tile))));
        });
    }
    if (!article) {
        article = (0, tileToArticleAdapter_1.convertTileToArticle)(tile);
        consoleLogger_1.logger.log(consoleLogger_1.LogLevels.DEBUG, 'adding article', article);
        var anyWindow = window;
        anyWindow.wmPlaySnippet = true;
        (_c = getResourceManager === null || getResourceManager === void 0 ? void 0 : getResourceManager()) === null || _c === void 0 ? void 0 : _c.setDeployables([article]);
        delete anyWindow.wmPlaySnippet;
    }
    (0, menuTabActions_1.addResourceToTab)(tab.Id, article.Id);
};
exports.createAndAddArticleToTab = createAndAddArticleToTab;
var getResourceManager = function () {
    var _a, _b;
    var _walkmeInternals = window._walkmeInternals;
    return (_b = (_a = _walkmeInternals === null || _walkmeInternals === void 0 ? void 0 : _walkmeInternals.ctx) === null || _a === void 0 ? void 0 : _a.get) === null || _b === void 0 ? void 0 : _b.call(_a, 'ContentsManager');
};
var getTileId = function (tile) {
    var _a;
    var match = (_a = tile.url) === null || _a === void 0 ? void 0 : _a.match(/#show=(.+)$/);
    return match ? match[1] : '';
};


/***/ }),

/***/ 368:
/***/ (function(__unused_webpack_module, exports, __nested_webpack_require_186993__) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.createAndAddShuttleToTab = void 0;
var tileIdToWalkMeIdConverter_1 = __nested_webpack_require_186993__(903);
var tileToShuttleAdapter_1 = __nested_webpack_require_186993__(407);
var consoleLogger_1 = __nested_webpack_require_186993__(969);
var menuTabActions_1 = __nested_webpack_require_186993__(703);
var createAndAddShuttleToTab = function (tabId, tile) {
    var walkmeId = (0, tileIdToWalkMeIdConverter_1.getWalkMeIdFromTileId)(tile.id);
    var shuttle;
    if (walkmeId) {
        shuttle = getShuttlesManager().getById(walkmeId);
    }
    if (!shuttle) {
        shuttle = (0, tileToShuttleAdapter_1.convertTileToShuttle)(tile);
        consoleLogger_1.logger.log(consoleLogger_1.LogLevels.DEBUG, 'adding shuttle', shuttle);
        var anyWindow = window;
        anyWindow.wmPlaySnippet = true;
        var forceSetDeployables = true;
        getShuttlesManager().setDeployables([shuttle], forceSetDeployables);
        delete anyWindow.wmPlaySnippet;
    }
    (0, menuTabActions_1.addShuttleToTab)(tabId, shuttle.Id);
};
exports.createAndAddShuttleToTab = createAndAddShuttleToTab;
var getShuttlesManager = function () {
    var _walkmeInternals = window._walkmeInternals;
    if (!_walkmeInternals) {
        return null;
    }
    return _walkmeInternals.ctx.get('ShuttlesManager');
};


/***/ }),

/***/ 510:
/***/ (function(__unused_webpack_module, exports, __nested_webpack_require_188410__) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getCurrentCmpHotspotsMode = exports.CompanionTilesDrawer = void 0;
var tileIdToWalkMeIdConverter_1 = __nested_webpack_require_188410__(903);
var consoleLogger_1 = __nested_webpack_require_188410__(969);
var currentCmpHotspotsMode = 'off';
var setCurrentCmpHotspotsMode = function (mode) {
    currentCmpHotspotsMode = mode;
};
var getCurrentCmpHotspotsMode = function () {
    return currentCmpHotspotsMode;
};
exports.getCurrentCmpHotspotsMode = getCurrentCmpHotspotsMode;
var CompanionTilesDrawer = /** @class */ (function () {
    function CompanionTilesDrawer(companionApi) {
        this.companionApi = companionApi;
        this.tileEventListeners = [];
        this.handleHotspotEvent = this.handleHotspotEvent.bind(this);
    }
    CompanionTilesDrawer.prototype.switchToMode = function (mode) {
        return __awaiter(this, void 0, void 0, function () {
            var currentMode, currentWidgetName, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        currentMode = getCurrentCmpHotspotsMode();
                        consoleLogger_1.logger.log(consoleLogger_1.LogLevels.DEBUG, 'CompanionTilesDrawer: switchToMode called with mode:', mode, 'currentMode:', currentMode);
                        if (mode == currentMode) {
                            consoleLogger_1.logger.log(consoleLogger_1.LogLevels.Silly, 'CompanionTilesDrawer: already in the requested mode, no action needed');
                            return [2 /*return*/];
                        }
                        if (!(mode === 'off')) return [3 /*break*/, 4];
                        if (!(currentMode == 'stealth')) return [3 /*break*/, 2];
                        consoleLogger_1.logger.log(consoleLogger_1.LogLevels.DEBUG, 'CompanionTilesDrawer: switching from stealth mode to off, calling closeHelpStealth()');
                        return [4 /*yield*/, this.companionApi.closeHelpStealth()];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 2:
                        consoleLogger_1.logger.log(consoleLogger_1.LogLevels.DEBUG, 'CompanionTilesDrawer: switching from on mode to off, calling closeHelp()');
                        return [4 /*yield*/, this.companionApi.closeHelp()];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4:
                        if (!(mode === 'stealth')) return [3 /*break*/, 6];
                        consoleLogger_1.logger.log(consoleLogger_1.LogLevels.DEBUG, 'CompanionTilesDrawer: entering stealth mode, calling openHelpStealth()');
                        return [4 /*yield*/, this.companionApi.openHelpStealth()];
                    case 5:
                        _a.sent();
                        _a.label = 6;
                    case 6:
                        if (!(mode === 'on')) return [3 /*break*/, 13];
                        consoleLogger_1.logger.log(consoleLogger_1.LogLevels.DEBUG, 'CompanionTilesDrawer: entering on mode, calling openHelp()');
                        return [4 /*yield*/, this.companionApi.openHelp()];
                    case 7:
                        _a.sent();
                        _a.label = 8;
                    case 8:
                        _a.trys.push([8, 12, , 13]);
                        return [4 /*yield*/, this.companionApi.getActiveWidgetName()];
                    case 9:
                        currentWidgetName = _a.sent();
                        if (!(currentWidgetName != 'help')) return [3 /*break*/, 11];
                        return [4 /*yield*/, this.companionApi.activateHelpWidget()];
                    case 10:
                        _a.sent();
                        consoleLogger_1.logger.log(consoleLogger_1.LogLevels.Silly, 'CompanionTilesDrawer - when opening, Help4 widget is not "help". calling activateHelpWidget()');
                        _a.label = 11;
                    case 11: return [3 /*break*/, 13];
                    case 12:
                        e_1 = _a.sent();
                        return [3 /*break*/, 13];
                    case 13:
                        setCurrentCmpHotspotsMode(mode);
                        return [2 /*return*/];
                }
            });
        });
    };
    CompanionTilesDrawer.prototype.handleHotspotEvent = function (data) {
        try {
            consoleLogger_1.logger.log(consoleLogger_1.LogLevels.Silly, 'handleHotspotEvent Called', data);
            if (!data.descriptor) {
                return;
            }
            var tileId = (0, tileIdToWalkMeIdConverter_1.getTileIdFromDescriptor)(data.descriptor);
            if (!tileId) {
                return;
            }
            this.invokeTileEventCallbacks({ tileId: tileId, eventType: data.type });
        }
        catch (e) {
            // ignore
        }
    };
    CompanionTilesDrawer.prototype.subscribeToTileEvent = function (callback) {
        this.tileEventListeners.push(callback);
        if (this.tileEventListeners.length === 1) {
            this.subscribeToTileEvents();
        }
    };
    CompanionTilesDrawer.prototype.unsubscribeFromTileEvent = function (callback) {
        var index = this.tileEventListeners.indexOf(callback);
        if (index !== -1) {
            this.tileEventListeners.splice(index, 1);
            if (this.tileEventListeners.length === 0) {
                this.unsubscribeToTileEvents();
            }
        }
    };
    CompanionTilesDrawer.prototype.invokeTileEventCallbacks = function (tileEvent) {
        consoleLogger_1.logger.log(consoleLogger_1.LogLevels.Silly, 'invokeTileEventCallbacks', tileEvent);
        this.tileEventListeners.forEach(function (callback) {
            try {
                callback(tileEvent);
            }
            catch (e) {
                // ignore
            }
        });
    };
    CompanionTilesDrawer.prototype.subscribeToTileEvents = function () {
        this.companionApi.listeners.onHotspotEvent.addListener(this.handleHotspotEvent);
    };
    CompanionTilesDrawer.prototype.unsubscribeToTileEvents = function () {
        this.companionApi.listeners.onHotspotEvent.removeListener(this.handleHotspotEvent);
    };
    return CompanionTilesDrawer;
}());
exports.CompanionTilesDrawer = CompanionTilesDrawer;


/***/ }),

/***/ 911:
/***/ (function(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.removeSmartTipFromSet = exports.addSmartTipToSet = exports.getSmartTipSetsManager = void 0;
var getSmartTipSetsManager = function () {
    var _walkmeInternals = window._walkmeInternals;
    if (!_walkmeInternals) {
        return null;
    }
    return _walkmeInternals.ctx.get('SmartTipSetsManager');
};
exports.getSmartTipSetsManager = getSmartTipSetsManager;
var addSmartTipToSet = function (setId, smartTip) {
    var smartTipSetsManager = getSmartTipSetsManager();
    smartTipSetsManager.addSmartTipToSet(setId, smartTip);
};
exports.addSmartTipToSet = addSmartTipToSet;
var removeSmartTipFromSet = function (setId, smartTipId) {
    var smartTipSetsManager = getSmartTipSetsManager();
    smartTipSetsManager.removeSmartTipFromSet(setId, smartTipId);
};
exports.removeSmartTipFromSet = removeSmartTipFromSet;


/***/ }),

/***/ 218:
/***/ (function(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.createSmartTipSet = void 0;
var setId = Date.now();
var createSmartTipSet = function () {
    var id = setId++;
    var guid = ""; // does it matter? 
    var resourceId = ""; // does it matter?
    var smartTipSet = {
        "ConditionTrees": {},
        "DeployableSystems": null,
        "Description": null,
        "Flow": null,
        "FlowId": null,
        "Goals": [],
        "Guid": guid,
        "HasGoals": false,
        "HasMainGoal": false,
        "Id": id,
        "IsFlow": false,
        "KeyWords": "",
        "Name": "",
        "OrderIndex": 1,
        "ResourceId": resourceId,
        "Settings": {
            "segmentationEnabled": "false"
        },
        "SmartTips": []
    };
    return smartTipSet;
};
exports.createSmartTipSet = createSmartTipSet;


/***/ }),

/***/ 331:
/***/ (function(__unused_webpack_module, exports, __nested_webpack_require_199478__) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.digestTileChanges = void 0;
var tileIdToWalkMeIdConverter_1 = __nested_webpack_require_199478__(903);
var tileToSmarttipAdapter_1 = __nested_webpack_require_199478__(583);
var consoleLogger_1 = __nested_webpack_require_199478__(969);
var smartTipActions_1 = __nested_webpack_require_199478__(911);
var shuttlesManager_1 = __nested_webpack_require_199478__(368);
var menuTabActions_1 = __nested_webpack_require_199478__(703);
var walkme_1 = __nested_webpack_require_199478__(763);
var resourcesManager_1 = __nested_webpack_require_199478__(686);
var digestTileChanges = function (menuTab, updateInfo, smartTipSetId) {
    if (updateInfo.removed && updateInfo.removed.length) {
        consoleLogger_1.logger.log(consoleLogger_1.LogLevels.INFO, 'removed tiles', updateInfo.removed);
        for (var i = 0; i < updateInfo.removed.length; i++) {
            var tileId = updateInfo.removed[i];
            handleTileRemoval(menuTab.Id, tileId, smartTipSetId);
        }
    }
    if (updateInfo.updated && updateInfo.updated.length) {
        consoleLogger_1.logger.log(consoleLogger_1.LogLevels.INFO, 'updated tiles', updateInfo.updated);
        // TODO: do we need to support updated tiles? maybe for translations? tbd.
        // for (let i = 0; i < updateInfo.updated.length; i++) {
        //     const tile = updateInfo.updated[i];
        //     handleTileRemoval(menuTab, tile.id, smartTipSetId);
        //     handleAddedTile(menuTab, tile, smartTipSetId);
        // }
    }
    if (updateInfo.added && updateInfo.added.length) {
        consoleLogger_1.logger.log(consoleLogger_1.LogLevels.INFO, 'added tiles', updateInfo.added);
        for (var i = 0; i < updateInfo.added.length; i++) {
            var tile = updateInfo.added[i];
            if (tile.type) {
                handleAddedHelpTile(menuTab, tile, smartTipSetId);
            }
            else {
                (0, resourcesManager_1.createAndAddArticleToTab)(menuTab, tile);
            }
        }
    }
};
exports.digestTileChanges = digestTileChanges;
var handleTileRemoval = function (menuTabId, tileId, smartTipSetId) {
    var walkMeId = (0, tileIdToWalkMeIdConverter_1.getWalkMeIdFromTileId)(tileId);
    if (walkMeId) {
        var walkmeItemType = (0, tileIdToWalkMeIdConverter_1.getWalkMeItemTypeFromWalkMeId)(walkMeId);
        switch (walkmeItemType) {
            case walkme_1.WalkMeItemType.SmartTip: {
                (0, smartTipActions_1.removeSmartTipFromSet)(smartTipSetId, walkMeId);
                break;
            }
            case walkme_1.WalkMeItemType.Shuttle: {
                (0, menuTabActions_1.removeShuttleFromTab)(menuTabId, walkMeId);
                break;
            }
            case walkme_1.WalkMeItemType.Resource: {
                (0, menuTabActions_1.removeResourceFromTab)(menuTabId, walkMeId);
                break;
            }
        }
    }
};
var handleAddedHelpTile = function (menuTab, tile, smartTipSetId) {
    // TODO: If we want to support lightbox links, it should be content, not shuttle.
    var isWhatsThisApp = tile.type == 'link' && tile._special == 'wta' && !tile.linkLightbox;
    if (isWhatsThisApp) {
        consoleLogger_1.logger.log(consoleLogger_1.LogLevels.DEBUG, 'WhatsThisApp tile', tile);
        (0, shuttlesManager_1.createAndAddShuttleToTab)(menuTab.Id, tile);
        return;
    }
    var isHelpTile = tile.type == 'help';
    if (isHelpTile) {
        var smartTip = (0, tileToSmarttipAdapter_1.getSmartTipFromTile)(tile);
        if (smartTip) {
            (0, smartTipActions_1.addSmartTipToSet)(smartTipSetId, smartTip);
        }
    }
};


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __nested_webpack_require_203308__(moduleId) {
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
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __nested_webpack_require_203308__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __nested_webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it uses a non-standard name for the exports (exports).
!function() {
var exports = __nested_webpack_exports__;

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.startIntegration = void 0;
var integrationLogic_1 = __nested_webpack_require_203308__(418);
Object.defineProperty(exports, "startIntegration", ({ enumerable: true, get: function () { return integrationLogic_1.startIntegration; } }));

}();
/******/ 	return __nested_webpack_exports__;
/******/ })()
;
});


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
/******/ 	var __webpack_exports__ = __webpack_require__(190);
/******/ 	wmbundle = __webpack_exports__;
/******/ 	
/******/ })()
;
/* WalkMe Module */ return wmbundle; })
//# sourceMappingURL=bundle.js.map
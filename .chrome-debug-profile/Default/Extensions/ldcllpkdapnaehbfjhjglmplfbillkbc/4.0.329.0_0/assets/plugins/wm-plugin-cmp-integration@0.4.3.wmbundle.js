/* WalkMe Module */ typeof _walkmeInternals !== 'undefined' && _walkmeInternals.wmloader && _walkmeInternals.wmloader.define('wm-plugin-cmp-integration@0.4.3@prelib', {"name":"wm-plugin-cmp-integration","version":"0.4.3","toolbelt":"2.0.2","packageDate":"2025-06-19T08:04:07.176Z","entry":"prelib"}, function (__wmplugin__) {  
var wmbundle;
/******/ (function() { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 795:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

module.exports = __webpack_require__(235);



/***/ }),

/***/ 56:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

"use strict";

var getCtx = (__webpack_require__(746)/* .getCtx */ .yK);
var log = (__webpack_require__(834)/* .log */ .R);
var senConnector = __webpack_require__(679);
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

/***/ 834:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

"use strict";

var getCtx = (__webpack_require__(746)/* .getCtx */ .yK);
var logger = getCtx().get('PrelibLogger');
function log() {
  var logRecord = Array().slice.call(arguments);
  logRecord.unshift("[ CmpIntegration ]");
  logger.write.apply(logger, logRecord);
}
exports.R = log;


/***/ }),

/***/ 235:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

"use strict";

var createPluginEntry = (__webpack_require__(746)/* .createPluginEntry */ .mJ);
module.exports = createPluginEntry(function (registerPlugin) {
  var CmpIntegration = (__webpack_require__(56)/* .CmpIntegration */ .v);
  registerPlugin(new CmpIntegration());
});


/***/ }),

/***/ 746:
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

/***/ 679:
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
var getOrCreateWalkMeIdForTile = function (tile, itemType) {
    var tileId = tile.id;
    if (!tileIdToWalkMeIdMapping[tileId]) {
        var descriptor = getTileDescriptor(tile);
        tileIdToWalkMeIdMapping[tileId] = currentWalkMeId;
        walkMeIdToTileIdMapping[currentWalkMeId] = tileId;
        itemTypesMapping[currentWalkMeId] = itemType;
        tileIdToDescriptorMapping[tileId] = descriptor;
        descriptorToTileMapping[descriptor] = tileId;
        currentWalkMeId++;
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

/***/ 407:
/***/ (function(__unused_webpack_module, exports, __nested_webpack_require_3523__) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.convertTileToShuttle = void 0;
var walkme_1 = __nested_webpack_require_3523__(763);
var consts_1 = __nested_webpack_require_3523__(540);
var tileIdToWalkMeIdConverter_1 = __nested_webpack_require_3523__(903);
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
    var id = (0, tileIdToWalkMeIdConverter_1.getOrCreateWalkMeIdForTile)(tile, walkme_1.WalkMeItemType.Shuttle);
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
        // This is needed by the player, somewhere in the player code it is added but for some reason
        // it was not added for the shuttle that added at runtime.
        "deployableType": consts_1.ShuttleType
    };
    return result;
};
exports.convertTileToShuttle = convertTileToShuttle;


/***/ }),

/***/ 752:
/***/ (function(__unused_webpack_module, exports, __nested_webpack_require_5071__) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.convertTilePositionToSmarttipPosition = void 0;
var types_1 = __nested_webpack_require_5071__(159);
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
/***/ (function(__unused_webpack_module, exports, __nested_webpack_require_10067__) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getSmartTipFromTile = void 0;
var consoleLogger_1 = __nested_webpack_require_10067__(969);
var walkme_1 = __nested_webpack_require_10067__(763);
var tileIdToWalkMeIdConverter_1 = __nested_webpack_require_10067__(903);
var tilePositionAdapter_1 = __nested_webpack_require_10067__(752);
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
        var id = (0, tileIdToWalkMeIdConverter_1.getOrCreateWalkMeIdForTile)(tile, walkme_1.WalkMeItemType.SmartTip);
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
exports.checkIsPremiumCmpCustomer = exports.getCurrentHelpTiles = exports.initCompanionApi = exports.Help4 = void 0;
var maxTries = 300; // 30s; 300 x 100ms
var initCompanionApi = function () {
    return new Promise(function (resolve) {
        (function watch() {
            var help4 = window.Help4;
            if ((help4 && help4.getConfiguration())) {
                exports.Help4 = help4;
                resolve();
            }
            else if (--maxTries >= 0) {
                setTimeout(watch, 100);
            }
        })();
    });
};
exports.initCompanionApi = initCompanionApi;
var getCurrentHelpTiles = function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/, exports.Help4.WM.getHelpTiles()];
    });
}); };
exports.getCurrentHelpTiles = getCurrentHelpTiles;
var checkIsPremiumCmpCustomer = function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        // todo: implement
        return [2 /*return*/, exports.Help4.WM.isPremiumConfiguration()];
    });
}); };
exports.checkIsPremiumCmpCustomer = checkIsPremiumCmpCustomer;


/***/ }),

/***/ 124:
/***/ (function(__unused_webpack_module, exports, __nested_webpack_require_19669__) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.unregisterFromNewCompanionData = exports.registerToNewCompanionData = void 0;
var consoleLogger_1 = __nested_webpack_require_19669__(969);
var dataChangedNotifier_1 = __nested_webpack_require_19669__(137);
var eventBasedDataNotifier_1 = __nested_webpack_require_19669__(258);
var pollingDataNotifier_1 = __nested_webpack_require_19669__(650);
var notifier;
var registerToNewCompanionData = function (callback) {
    if (!notifier) {
        notifier = new dataChangedNotifier_1.CompanionDataChangedNotifier();
        var usePolling = false;
        var dataProvider = usePolling ? new pollingDataNotifier_1.PollingDataProvider() : new eventBasedDataNotifier_1.EventBasedDataProvider();
        dataProvider.start();
        consoleLogger_1.logger.log(consoleLogger_1.LogLevels.DEBUG, 'Data provider started, polling:', usePolling);
        dataProvider.register(function (tiles) { return notifier.digest(tiles); });
    }
    notifier.register(callback);
    return function () {
        unregisterFromNewCompanionData(callback);
    };
};
exports.registerToNewCompanionData = registerToNewCompanionData;
var unregisterFromNewCompanionData = function (callback) {
    if (!notifier) {
        return;
    }
    // TODO: Do we also want to stop the data provider when no one is listening? consider. 
    notifier.unregister(callback);
};
exports.unregisterFromNewCompanionData = unregisterFromNewCompanionData;


/***/ }),

/***/ 137:
/***/ (function(__unused_webpack_module, exports, __nested_webpack_require_21200__) {


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
exports.CompanionDataChangedNotifier = void 0;
var consoleLogger_1 = __nested_webpack_require_21200__(969);
var CompanionDataChangedNotifier = /** @class */ (function () {
    function CompanionDataChangedNotifier() {
        this.currentTileIds = [];
        this.currentData = [];
        this.currentUrTiles = [];
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
    CompanionDataChangedNotifier.prototype.digest = function (dataFromCompanion) {
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
                        consoleLogger_1.logger.log(consoleLogger_1.LogLevels.DEBUG, 'CompanionDataChangedNotifier: new data available', notifyData);
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
/***/ (function(__unused_webpack_module, exports, __nested_webpack_require_27184__) {


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
var consoleLogger_1 = __nested_webpack_require_27184__(969);
var throttleHelper_1 = __nested_webpack_require_27184__(948);
var companionApi_1 = __nested_webpack_require_27184__(639);
var EventBasedDataProvider = /** @class */ (function () {
    function EventBasedDataProvider() {
        this.currentData = [];
        this.callbacks = [];
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
                        return [4 /*yield*/, (0, companionApi_1.getCurrentHelpTiles)()];
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
        companionApi_1.Help4.WM.listeners.onTileChange.addListener(this.throttleHelper.invoke);
    };
    EventBasedDataProvider.prototype.unsubscribeToChanges = function () {
        companionApi_1.Help4.WM.listeners.onTileChange.removeListener(this.throttleHelper.invoke);
    };
    EventBasedDataProvider.prototype.stop = function () {
        this.unsubscribeToChanges();
    };
    EventBasedDataProvider.prototype.register = function (callback) {
        if (this.currentData.length) {
            this.safeInvokeCallback(callback, this.currentData);
        }
        this.callbacks.push(callback);
    };
    EventBasedDataProvider.prototype.handleTileChangedEvent = function () {
        return __awaiter(this, void 0, void 0, function () {
            var dataFromCompanion_1, e_2;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, (0, companionApi_1.getCurrentHelpTiles)()];
                    case 1:
                        dataFromCompanion_1 = _a.sent();
                        consoleLogger_1.logger.log(consoleLogger_1.LogLevels.DEBUG, 'handleTileChangedEvent called, tiles:', dataFromCompanion_1);
                        this.currentData = dataFromCompanion_1;
                        this.callbacks.forEach(function (callback) {
                            _this.safeInvokeCallback(callback, dataFromCompanion_1);
                        });
                        return [3 /*break*/, 3];
                    case 2:
                        e_2 = _a.sent();
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
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

/***/ 650:
/***/ (function(__unused_webpack_module, exports, __nested_webpack_require_33644__) {


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
var consoleLogger_1 = __nested_webpack_require_33644__(969);
var companionApi_1 = __nested_webpack_require_33644__(639);
var PollingDataProvider = /** @class */ (function () {
    function PollingDataProvider(pollingInterval) {
        if (pollingInterval === void 0) { pollingInterval = 200; }
        this.pollingInterval = pollingInterval;
        this.currentData = [];
        this.callbacks = [];
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
        this.callbacks.push(callback);
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
                        this.timeoutId = setTimeout(function () { return _this.pollAndScheduleNext(); }, this.pollingInterval);
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
                        return [4 /*yield*/, (0, companionApi_1.getCurrentHelpTiles)()];
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

/***/ 744:
/***/ (function(__unused_webpack_module, exports, __nested_webpack_require_43605__) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.checkShouldShrinkWebsite = void 0;
var websiteShrinker_1 = __nested_webpack_require_43605__(819);
var urlParamHelper_1 = __nested_webpack_require_43605__(458);
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
        var alreadyPending = this.timeoutId !== null;
        if (alreadyPending) {
            return;
        }
        var timeSinceLastCall = Date.now() - this.lastCall;
        var shouldImmediatelyInvoke = timeSinceLastCall >= this.delay;
        if (shouldImmediatelyInvoke) {
            this.callback();
            this.lastCall = Date.now();
            ;
        }
        else {
            var timeUntilInvoke = this.delay - timeSinceLastCall;
            this.timeoutId = setTimeout(function () {
                _this.timeoutId = null;
                _this.callback();
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
/***/ (function(__unused_webpack_module, exports, __nested_webpack_require_46075__) {


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
var companionApi_1 = __nested_webpack_require_46075__(639);
var consoleLogger_1 = __nested_webpack_require_46075__(969);
var shrinkWebsiteDecider_1 = __nested_webpack_require_46075__(744);
var wmMenuOpenFromCmpIntergration_1 = __nested_webpack_require_46075__(950);
var wmMenuWithCmpHotspotsIntegration_1 = __nested_webpack_require_46075__(446);
var pluginConfigProvider_1 = __nested_webpack_require_46075__(516);
var cmpUsageTracking_1 = __nested_webpack_require_46075__(170);
// import { AlwaysOnCompanionConnector } from "./walkme/companionConnectors/alwaysInCompanionConnector";
// import { FullWalkMeCompanionDataHandler } from "./walkme/companionDataChangeHandlers/fullWalkMeCompanionDataHandler";
// import { registerFindElementForHelp4 } from "./walkme/findElement/findElementForHelp4";
var startIntegration = function () { return __awaiter(void 0, void 0, void 0, function () {
    var pluginConfig, isCmpIntegrationDisabled;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                pluginConfig = (0, pluginConfigProvider_1.getPluginConfig)();
                isCmpIntegrationDisabled = pluginConfig.cmpIntegrationMode === 0;
                if (isCmpIntegrationDisabled && !pluginConfig.sendCmpTracking) {
                    return [2 /*return*/];
                }
                return [4 /*yield*/, (0, companionApi_1.initCompanionApi)()];
            case 1:
                _a.sent();
                return [4 /*yield*/, handleWmIntegration(pluginConfig.cmpIntegrationMode)];
            case 2:
                _a.sent();
                if (pluginConfig.sendCmpTracking) {
                    (0, cmpUsageTracking_1.startCmpUsageTracking)();
                }
                return [2 /*return*/];
        }
    });
}); };
exports.startIntegration = startIntegration;
var handleWmIntegration = function (cmpIntegrationMode) { return __awaiter(void 0, void 0, void 0, function () {
    var isCmpEditorMode, isPremiumCmpCustomer, e_1, shouldShrinkWebsite, integrationManager, anyWindow, integrationManager;
    var _a, _b, _c;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                if (cmpIntegrationMode === 0) {
                    consoleLogger_1.logger.log(consoleLogger_1.LogLevels.INFO, 'cmpIntegrationMode is disabled');
                    return [2 /*return*/];
                }
                isCmpEditorMode = companionApi_1.Help4.getConfiguration().editor;
                if (isCmpEditorMode) {
                    consoleLogger_1.logger.log(consoleLogger_1.LogLevels.INFO, 'CMP editor mode detected, stopping execution');
                    return [2 /*return*/];
                }
                return [4 /*yield*/, (0, companionApi_1.checkIsPremiumCmpCustomer)()];
            case 1:
                isPremiumCmpCustomer = _d.sent();
                if (isPremiumCmpCustomer) {
                    // we don't merge cmp and walkme data for premium cmp customers at the moment.
                    consoleLogger_1.logger.log(consoleLogger_1.LogLevels.INFO, 'Premium CMP customer detected, stopping execution');
                    return [2 /*return*/];
                }
                if (!!companionApi_1.Help4.getConfiguration().WM) return [3 /*break*/, 8];
                _d.label = 2;
            case 2:
                _d.trys.push([2, 5, , 6]);
                return [4 /*yield*/, companionApi_1.Help4.WM.start(cmpIntegrationMode)];
            case 3:
                _d.sent();
                return [4 /*yield*/, (0, companionApi_1.initCompanionApi)()];
            case 4:
                _d.sent();
                return [3 /*break*/, 6];
            case 5:
                e_1 = _d.sent();
                consoleLogger_1.logger.log(consoleLogger_1.LogLevels.INFO, 'Failed to start WM mode for CMP, stopping execution');
                return [2 /*return*/];
            case 6: return [4 /*yield*/, companionApi_1.Help4.WM.closeHelp()];
            case 7:
                _d.sent();
                _d.label = 8;
            case 8:
                shouldShrinkWebsite = (0, shrinkWebsiteDecider_1.checkShouldShrinkWebsite)();
                if (cmpIntegrationMode === pluginConfigProvider_1.CMP_WM_MODE_JUST_QUESTION_MARK) {
                    integrationManager = new wmMenuOpenFromCmpIntergration_1.WmMenuOpenFromCmpIntegration(false);
                    integrationManager.start();
                }
                else if (cmpIntegrationMode === pluginConfigProvider_1.CMP_WM_MODE_FULL_INTEGRATION) {
                    if (shouldShrinkWebsite) {
                        anyWindow = window;
                        if ((_c = (_b = (_a = anyWindow._walkMe) === null || _a === void 0 ? void 0 : _a.getSiteConfig) === null || _b === void 0 ? void 0 : _b.call(_a).Custom) === null || _c === void 0 ? void 0 : _c.proMenu) {
                            delete anyWindow._walkMe.getSiteConfig().Custom.proMenu.heightLimitSelector;
                        }
                    }
                    integrationManager = new wmMenuWithCmpHotspotsIntegration_1.WmMenuWithCmpHotspotsIntegration(shouldShrinkWebsite);
                    integrationManager.start();
                }
                return [2 /*return*/];
        }
    });
}); };


/***/ }),

/***/ 953:
/***/ (function(__unused_webpack_module, exports, __nested_webpack_require_54088__) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.openCompanionBubble = exports.closeCompanionBubble = exports.unhighlightCompanionHotspot = exports.highlightCompanionHotspot = void 0;
var companionApi_1 = __nested_webpack_require_54088__(639);
var consoleLogger_1 = __nested_webpack_require_54088__(969);
var highlightCompanionHotspot = function (descriptor) {
    consoleLogger_1.logger.log(consoleLogger_1.LogLevels.Silly, "Highlighting companion hotspot ".concat(descriptor));
    companionApi_1.Help4.WM.propagateMenuState({ type: 'hover', descriptor: descriptor });
};
exports.highlightCompanionHotspot = highlightCompanionHotspot;
var unhighlightCompanionHotspot = function (descriptor) {
    consoleLogger_1.logger.log(consoleLogger_1.LogLevels.Silly, "Unhighlighting companion hotspot ".concat(descriptor));
    companionApi_1.Help4.WM.propagateMenuState({ type: 'leave', descriptor: descriptor });
};
exports.unhighlightCompanionHotspot = unhighlightCompanionHotspot;
var closeCompanionBubble = function (descriptor) {
    consoleLogger_1.logger.log(consoleLogger_1.LogLevels.Silly, "Closing companion bubble for hotspot ".concat(descriptor));
    companionApi_1.Help4.WM.propagateMenuState({ type: 'deselect', descriptor: descriptor });
};
exports.closeCompanionBubble = closeCompanionBubble;
var openCompanionBubble = function (descriptor) {
    consoleLogger_1.logger.log(consoleLogger_1.LogLevels.Silly, "open companion bubble for hotspot ".concat(descriptor));
    companionApi_1.Help4.WM.propagateMenuState({ type: 'select', descriptor: descriptor });
};
exports.openCompanionBubble = openCompanionBubble;


/***/ }),

/***/ 527:
/***/ (function(__unused_webpack_module, exports, __nested_webpack_require_55806__) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.HotspotsStateManager = void 0;
var tileIdToWalkMeIdConverter_1 = __nested_webpack_require_55806__(903);
var consoleLogger_1 = __nested_webpack_require_55806__(969);
var cmpHotspotActions_1 = __nested_webpack_require_55806__(953);
var menuHotspotsAction_1 = __nested_webpack_require_55806__(606);
var HotspotsStateManager = /** @class */ (function () {
    function HotspotsStateManager(tabId, setId) {
        this.tabId = tabId;
        this.setId = setId;
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
                (0, cmpHotspotActions_1.closeCompanionBubble)(descriptor_1);
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
            (0, cmpHotspotActions_1.openCompanionBubble)(descriptor);
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
                (0, cmpHotspotActions_1.unhighlightCompanionHotspot)(descriptor_2);
            }
        }
        if (!hotspotId) {
            return;
        }
        var descriptor = (0, tileIdToWalkMeIdConverter_1.getTileDescriptorFromSmartTipId)(smarttipId);
        if (descriptor) {
            (0, cmpHotspotActions_1.highlightCompanionHotspot)(descriptor);
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
                (0, cmpHotspotActions_1.unhighlightCompanionHotspot)(descriptor);
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
    return HotspotsStateManager;
}());
exports.HotspotsStateManager = HotspotsStateManager;


/***/ }),

/***/ 606:
/***/ (function(__unused_webpack_module, exports, __nested_webpack_require_62152__) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.unfocusMenuHotspot = exports.focusMenuHotspot = void 0;
var consoleLogger_1 = __nested_webpack_require_62152__(969);
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

/***/ 950:
/***/ (function(__unused_webpack_module, exports, __nested_webpack_require_63312__) {


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
var companionApi_1 = __nested_webpack_require_63312__(639);
var websiteShrinker_1 = __nested_webpack_require_63312__(819);
var menuToggler_1 = __nested_webpack_require_63312__(371);
var interactionGuidProvider_1 = __nested_webpack_require_63312__(522);
var WmMenuOpenFromCmpIntegration = /** @class */ (function () {
    function WmMenuOpenFromCmpIntegration(shouldShrinkWebsite) {
        this.shouldShrinkWebsite = shouldShrinkWebsite;
        this.wasCmpOpenedByWm = false;
        this.handleCompanionMenuToggleEvent = this.handleCompanionMenuToggleEvent.bind(this);
        this.handleCompanionSwitchToWalkMeEvent = this.handleCompanionSwitchToWalkMeEvent.bind(this);
        this.handleSwitchToClassic = this.handleSwitchToClassic.bind(this);
        this.handleMenuShow = this.handleMenuShow.bind(this);
        this.handleMenuHide = this.handleMenuHide.bind(this);
    }
    WmMenuOpenFromCmpIntegration.prototype.start = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                (0, menuToggler_1.setShouldShowSwitchToCmp)(true);
                this.subscribeToCompanionEvents();
                this.subscribeToMenuEvents();
                return [2 /*return*/];
            });
        });
    };
    WmMenuOpenFromCmpIntegration.prototype.stop = function () {
        this.unsubscribeFromCompanionEvents();
        this.unsubscribeFromMenuEvents();
    };
    WmMenuOpenFromCmpIntegration.prototype.subscribeToMenuEvents = function () {
        var anyWindow = window;
        var _walkmeInternals = anyWindow._walkmeInternals;
        _walkmeInternals.on('MenuShow', this.handleMenuShow);
        _walkmeInternals.on('MenuHide', this.handleMenuHide);
        _walkmeInternals.on('switch.to.classic', this.handleSwitchToClassic);
    };
    WmMenuOpenFromCmpIntegration.prototype.unsubscribeFromMenuEvents = function () {
        var anyWindow = window;
        var _walkmeInternals = anyWindow._walkmeInternals;
        _walkmeInternals.off('MenuShow', this.handleMenuShow);
        _walkmeInternals.off('MenuHide', this.handleMenuHide);
        _walkmeInternals.off('switch.to.classic', this.handleSwitchToClassic);
    };
    WmMenuOpenFromCmpIntegration.prototype.handleMenuShow = function () {
        (0, interactionGuidProvider_1.createNewInteractionGuid)();
        if (this.shouldShrinkWebsite) {
            (0, websiteShrinker_1.enableFioriIndent)(410);
        }
    };
    WmMenuOpenFromCmpIntegration.prototype.handleMenuHide = function () {
        if (this.shouldShrinkWebsite) {
            (0, websiteShrinker_1.disableFioriIndent)();
        }
    };
    WmMenuOpenFromCmpIntegration.prototype.handleSwitchToClassic = function (event) {
        (0, menuToggler_1.hideWalkMeMenu)();
        this.openCompanionMenu();
    };
    WmMenuOpenFromCmpIntegration.prototype.openCompanionMenu = function () {
        companionApi_1.Help4.API.open();
        this.wasCmpOpenedByWm = true;
    };
    WmMenuOpenFromCmpIntegration.prototype.subscribeToCompanionEvents = function () {
        var _a, _b;
        (_a = companionApi_1.Help4.WM.listeners.onUserHelp) === null || _a === void 0 ? void 0 : _a.addListener(this.handleCompanionMenuToggleEvent);
        (_b = companionApi_1.Help4.WM.listeners.onSwitchToWm) === null || _b === void 0 ? void 0 : _b.addListener(this.handleCompanionSwitchToWalkMeEvent);
    };
    WmMenuOpenFromCmpIntegration.prototype.unsubscribeFromCompanionEvents = function () {
        var _a, _b;
        (_a = companionApi_1.Help4.WM.listeners.onUserHelp) === null || _a === void 0 ? void 0 : _a.removeListener(this.handleCompanionMenuToggleEvent);
        (_b = companionApi_1.Help4.WM.listeners.onSwitchToWm) === null || _b === void 0 ? void 0 : _b.removeListener(this.handleCompanionSwitchToWalkMeEvent);
    };
    WmMenuOpenFromCmpIntegration.prototype.handleCompanionMenuToggleEvent = function (event) {
        var _a, _b;
        var isCmpMenuOpen = (_a = companionApi_1.Help4 === null || companionApi_1.Help4 === void 0 ? void 0 : companionApi_1.Help4.getConfiguration()) === null || _a === void 0 ? void 0 : _a.isOpen;
        if (this.wasCmpOpenedByWm != isCmpMenuOpen) {
            // fixing a bug where CMP raises the onUserHelp event even when not needed (like their menu close).
            this.wasCmpOpenedByWm = isCmpMenuOpen;
            return;
        }
        if ((_b = companionApi_1.Help4 === null || companionApi_1.Help4 === void 0 ? void 0 : companionApi_1.Help4.getConfiguration()) === null || _b === void 0 ? void 0 : _b.isOpen) {
            companionApi_1.Help4.API.close();
            return;
        }
        var isWalkMeMenuOpen = (0, menuToggler_1.checkIsWalkMeMenuOpen)();
        if (isWalkMeMenuOpen) {
            (0, menuToggler_1.hideWalkMeMenu)();
            return;
        }
        var hasWalkMeContent = this.checkWalkMeHasContent();
        if (hasWalkMeContent) {
            (0, menuToggler_1.showWalkMeMenu)();
        }
        else {
            this.openCompanionMenu();
        }
    };
    WmMenuOpenFromCmpIntegration.prototype.checkWalkMeHasContent = function () {
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
    WmMenuOpenFromCmpIntegration.prototype.handleCompanionSwitchToWalkMeEvent = function (event) {
        (0, menuToggler_1.showWalkMeMenu)();
    };
    return WmMenuOpenFromCmpIntegration;
}());
exports.WmMenuOpenFromCmpIntegration = WmMenuOpenFromCmpIntegration;


/***/ }),

/***/ 446:
/***/ (function(__unused_webpack_module, exports, __nested_webpack_require_71945__) {


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
exports.WmMenuWithCmpHotspotsIntegration = void 0;
var companionApi_1 = __nested_webpack_require_71945__(639);
var companionDataAvailableNotifier_1 = __nested_webpack_require_71945__(124);
var consoleLogger_1 = __nested_webpack_require_71945__(969);
var menuToggler_1 = __nested_webpack_require_71945__(371);
var menuTabActions_1 = __nested_webpack_require_71945__(703);
var companionTilesDrawer_1 = __nested_webpack_require_71945__(510);
var tileActions_1 = __nested_webpack_require_71945__(331);
var smartTipSetCreator_1 = __nested_webpack_require_71945__(218);
var hotspotsStateManager_1 = __nested_webpack_require_71945__(527);
var smartTipActions_1 = __nested_webpack_require_71945__(911);
var websiteShrinker_1 = __nested_webpack_require_71945__(819);
var interactionGuidProvider_1 = __nested_webpack_require_71945__(522);
var WmMenuWithCmpHotspotsIntegration = /** @class */ (function () {
    function WmMenuWithCmpHotspotsIntegration(shouldShrinkWebsite) {
        this.shouldShrinkWebsite = shouldShrinkWebsite;
        this.shouldShowHotspotsWithoutMenu = false;
        this.isSelectedTabOnScreenHelp = false;
        this.isMenuOpen = false;
        this.handleMenuShow = this.handleMenuShow.bind(this);
        this.handleMenuHide = this.handleMenuHide.bind(this);
        this.handleMenuItemClicked = this.handleMenuItemClicked.bind(this);
        this.handleMenuItemHovered = this.handleMenuItemHovered.bind(this);
        this.handleMenuItemHoveredOut = this.handleMenuItemHoveredOut.bind(this);
        this.handleNewCompanionData = this.handleNewCompanionData.bind(this);
        this.handleCompanionTileEvent = this.handleCompanionTileEvent.bind(this);
        this.handleCompanionMenuToggleEvent = this.handleCompanionMenuToggleEvent.bind(this);
        this.handlePinHotspotsCheckboxChanged = this.handlePinHotspotsCheckboxChanged.bind(this);
        this.createWmSetAndTab = this.createWmSetAndTab.bind(this);
        this.handleTabSelected = this.handleTabSelected.bind(this);
        this.companionTilesDrawer = new companionTilesDrawer_1.CompanionTilesDrawer();
    }
    WmMenuWithCmpHotspotsIntegration.prototype.start = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        (0, menuToggler_1.setShouldShowSwitchToCmp)(false);
                        return [4 /*yield*/, this.createWmSetAndTab()];
                    case 1:
                        _a.sent();
                        this.hotspotsStateManager = new hotspotsStateManager_1.HotspotsStateManager(this.createdMenuTab.Id, this.createdSet.Id);
                        this.subscribeToMenuEvents();
                        this.subscribeToCompanionEvents();
                        (0, companionDataAvailableNotifier_1.registerToNewCompanionData)(this.handleNewCompanionData);
                        return [2 /*return*/];
                }
            });
        });
    };
    WmMenuWithCmpHotspotsIntegration.prototype.stop = function () {
        this.unsubscribeFromMenuEvents();
        this.unsubscribeFromCompanionEvents();
        (0, companionDataAvailableNotifier_1.unregisterFromNewCompanionData)(this.handleNewCompanionData);
    };
    WmMenuWithCmpHotspotsIntegration.prototype.createWmSetAndTab = function () {
        return __awaiter(this, void 0, void 0, function () {
            var tabName, _a;
            var _b, _c, _d;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        this.createdSet = (0, smartTipSetCreator_1.createSmartTipSet)();
                        return [4 /*yield*/, (0, smartTipActions_1.getSmartTipSetsManager)().add(this.createdSet)];
                    case 1:
                        _e.sent();
                        tabName = (_d = (_c = (_b = companionApi_1.Help4.WM) === null || _b === void 0 ? void 0 : _b.getTabNames) === null || _c === void 0 ? void 0 : _c.call(_b).help) !== null && _d !== void 0 ? _d : 'On-Screen Help';
                        _a = this;
                        return [4 /*yield*/, (0, menuTabActions_1.addCompanionTab)(this.createdSet, tabName)];
                    case 2:
                        _a.createdMenuTab = _e.sent();
                        (0, menuTabActions_1.reloadMenuTab)(this.createdMenuTab.Id);
                        consoleLogger_1.logger.log(consoleLogger_1.LogLevels.INFO, 'created set collection', this.createdMenuTab, this.createdSet);
                        return [2 /*return*/];
                }
            });
        });
    };
    WmMenuWithCmpHotspotsIntegration.prototype.handleNewCompanionData = function (updateInfo) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                consoleLogger_1.logger.log(consoleLogger_1.LogLevels.DEBUG, 'new companion data', updateInfo);
                (0, tileActions_1.digestTileChanges)(this.createdMenuTab.Id, this.createdSet.Id, updateInfo);
                // TODO: Do we remove the set from the tab when no content is available?
                // if (updateInfo.all.length === 0){
                //     removeSetFromTab(this.createdSetCollection.Id, this.createdSet!.Id);
                // }
                // else {
                //     addSetToTab(this.createdSetCollection.Id, this.createdSet!.Id);
                // }
                (0, menuTabActions_1.reloadMenuTab)(this.createdMenuTab.Id);
                return [2 /*return*/];
            });
        });
    };
    WmMenuWithCmpHotspotsIntegration.prototype.subscribeToMenuEvents = function () {
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
    WmMenuWithCmpHotspotsIntegration.prototype.unsubscribeFromMenuEvents = function () {
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
    WmMenuWithCmpHotspotsIntegration.prototype.subscribeToCompanionEvents = function () {
        var _a;
        this.companionTilesDrawer.subscribeToTileEvent(this.handleCompanionTileEvent);
        (_a = companionApi_1.Help4.WM.listeners.onUserHelp) === null || _a === void 0 ? void 0 : _a.addListener(this.handleCompanionMenuToggleEvent);
    };
    WmMenuWithCmpHotspotsIntegration.prototype.unsubscribeFromCompanionEvents = function () {
        var _a;
        this.companionTilesDrawer.unsubscribeFromTileEvent(this.handleCompanionTileEvent);
        (_a = companionApi_1.Help4.WM.listeners.onUserHelp) === null || _a === void 0 ? void 0 : _a.removeListener(this.handleCompanionMenuToggleEvent);
    };
    WmMenuWithCmpHotspotsIntegration.prototype.handleCompanionMenuToggleEvent = function (event) {
        consoleLogger_1.logger.log(consoleLogger_1.LogLevels.DEBUG, 'handleCompanionMenuToggleEvent', event);
        (0, menuToggler_1.toggleWalkMeMenu)();
    };
    WmMenuWithCmpHotspotsIntegration.prototype.handleCompanionTileEvent = function (tileEvent) {
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
    WmMenuWithCmpHotspotsIntegration.prototype.handleMenuShow = function () {
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
    WmMenuWithCmpHotspotsIntegration.prototype.handleTabSelected = function (event, data) {
        return __awaiter(this, void 0, void 0, function () {
            var selectedTabId, selectedTabIdAsNumber;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        consoleLogger_1.logger.log(consoleLogger_1.LogLevels.DEBUG, 'handleTabSelected', data);
                        selectedTabId = data === null || data === void 0 ? void 0 : data.tabId;
                        selectedTabIdAsNumber = parseInt(selectedTabId, 10);
                        if (selectedTabIdAsNumber === this.createdMenuTab.Id) {
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
    WmMenuWithCmpHotspotsIntegration.prototype.syncCmpHotspotsMode = function () {
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
                        (_a = companionApi_1.Help4.WM.listeners.onUserHelp) === null || _a === void 0 ? void 0 : _a.removeListener(this.handleCompanionMenuToggleEvent);
                        consoleLogger_1.logger.log(consoleLogger_1.LogLevels.DEBUG, 'syncCmpHotspotsMode', {
                            shouldShowHotspotsWithoutMenu: this.shouldShowHotspotsWithoutMenu,
                            isMenuOpen: this.isMenuOpen,
                            isSelectedTabOnScreenHelp: this.isSelectedTabOnScreenHelp,
                            targetMode: targetMode
                        });
                        return [4 /*yield*/, this.companionTilesDrawer.switchToMode(targetMode)];
                    case 1:
                        _c.sent();
                        (_b = companionApi_1.Help4.WM.listeners.onUserHelp) === null || _b === void 0 ? void 0 : _b.addListener(this.handleCompanionMenuToggleEvent);
                        return [2 /*return*/];
                }
            });
        });
    };
    WmMenuWithCmpHotspotsIntegration.prototype.handlePinHotspotsCheckboxChanged = function (event, data) {
        consoleLogger_1.logger.log(consoleLogger_1.LogLevels.DEBUG, 'handlePinHotspotsCheckboxChanged', data);
        var newValue = data === null || data === void 0 ? void 0 : data.value;
        this.shouldShowHotspotsWithoutMenu = newValue;
    };
    WmMenuWithCmpHotspotsIntegration.prototype.handleMenuHide = function () {
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
    WmMenuWithCmpHotspotsIntegration.prototype.handleMenuItemClicked = function (e, data) {
        consoleLogger_1.logger.log(consoleLogger_1.LogLevels.DEBUG, 'menu item clicked', data);
        if (!this.isTileMenuEvet(data)) {
            return;
        }
        this.hotspotsStateManager.handleMenuHotspotClicked(data.options.subItemId);
    };
    WmMenuWithCmpHotspotsIntegration.prototype.handleMenuItemHovered = function (e, data) {
        if (!this.isTileMenuEvet(data)) {
            return;
        }
        this.hotspotsStateManager.handleMenuHotspotHovered(data.options.subItemId);
    };
    WmMenuWithCmpHotspotsIntegration.prototype.handleMenuItemHoveredOut = function (e, data) {
        if (!this.isTileMenuEvet(data)) {
            return;
        }
        this.hotspotsStateManager.handleMenuHotspotHoveredOut(data.options.subItemId);
    };
    WmMenuWithCmpHotspotsIntegration.prototype.isTileMenuEvet = function (data) {
        var _a, _b;
        return (data === null || data === void 0 ? void 0 : data.type) === 'smarttipset' && data.id == ((_a = this.createdSet) === null || _a === void 0 ? void 0 : _a.Id) && ((_b = data === null || data === void 0 ? void 0 : data.options) === null || _b === void 0 ? void 0 : _b.subItemId) !== undefined;
    };
    return WmMenuWithCmpHotspotsIntegration;
}());
exports.WmMenuWithCmpHotspotsIntegration = WmMenuWithCmpHotspotsIntegration;


/***/ }),

/***/ 516:
/***/ (function(__unused_webpack_module, exports, __nested_webpack_require_89905__) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CMP_WM_MODE_FULL_INTEGRATION = exports.CMP_WM_MODE_JUST_QUESTION_MARK = exports.getPluginConfig = void 0;
var urlParamHelper_1 = __nested_webpack_require_89905__(458);
var DISABLE_CMP_TRACKING_CMP_PARAM = 'wmDisableCmpTracking';
var CMP_WM_MODE_JUST_QUESTION_MARK = 1;
exports.CMP_WM_MODE_JUST_QUESTION_MARK = CMP_WM_MODE_JUST_QUESTION_MARK;
var CMP_WM_MODE_FULL_INTEGRATION = 2;
exports.CMP_WM_MODE_FULL_INTEGRATION = CMP_WM_MODE_FULL_INTEGRATION;
var INTEGRATION_ACTIVE_MODES = [CMP_WM_MODE_FULL_INTEGRATION, CMP_WM_MODE_JUST_QUESTION_MARK];
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
    return {
        sendCmpTracking: !disableCmpTracking,
        cmpIntegrationMode: integrationModeToUse
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
/***/ (function(__unused_webpack_module, exports, __nested_webpack_require_91770__) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.startCmpUsageTracking = void 0;
var companionApi_1 = __nested_webpack_require_91770__(639);
var consoleLogger_1 = __nested_webpack_require_91770__(969);
var cmpEventToWmEventConverter_1 = __nested_webpack_require_91770__(808);
var wmEventSenderProvider_1 = __nested_webpack_require_91770__(674);
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
/***/ (function(__unused_webpack_module, exports, __nested_webpack_require_93181__) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.convertToWmEvent = void 0;
var consoleLogger_1 = __nested_webpack_require_93181__(969);
var interactionGuidProvider_1 = __nested_webpack_require_93181__(522);
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
exports.WalkMeItemType = void 0;
var WalkMeItemType;
(function (WalkMeItemType) {
    WalkMeItemType["SmartTip"] = "SmartTip";
    WalkMeItemType["Shuttle"] = "Shuttle";
})(WalkMeItemType || (exports.WalkMeItemType = WalkMeItemType = {}));
;


/***/ }),

/***/ 540:
/***/ (function(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ShuttleType = exports.SmartTipSetDeployableType = void 0;
var SmartTipSetDeployableType = 19;
exports.SmartTipSetDeployableType = SmartTipSetDeployableType;
var ShuttleType = 9;
exports.ShuttleType = ShuttleType;


/***/ }),

/***/ 371:
/***/ (function(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.checkIsWalkMeMenuOpen = exports.hideWalkMeMenu = exports.showWalkMeMenu = exports.toggleWalkMeMenu = exports.setShouldShowSwitchToCmp = void 0;
var toggleParams = {};
var setShouldShowSwitchToCmp = function (showSwitchToCmp) {
    toggleParams.showSwitchToClassic = showSwitchToCmp;
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


/***/ }),

/***/ 703:
/***/ (function(__unused_webpack_module, exports, __nested_webpack_require_98861__) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.clearTab = exports.removeShuttleFromTab = exports.addShuttleToTab = exports.removeSetFromTab = exports.addSetToTab = exports.reloadMenuTab = exports.addCompanionTab = void 0;
var consts_1 = __nested_webpack_require_98861__(540);
var menuTabCreator_1 = __nested_webpack_require_98861__(784);
var getCollectionsManager = function () {
    var anyWindow = window;
    var _walkmeInternals = anyWindow._walkmeInternals;
    return _walkmeInternals.ctx.get('CollectionsManager');
};
var addCompanionTab = function (smartTipSet, name) {
    var collection = (0, menuTabCreator_1.generateSmartTipSetCollection)(smartTipSet, name);
    getCollectionsManager().setDeployables([collection]);
    return collection;
};
exports.addCompanionTab = addCompanionTab;
var addShuttleToTab = function (collectionId, shuttleId) {
    addItemToTab(collectionId, shuttleId, consts_1.ShuttleType, true);
};
exports.addShuttleToTab = addShuttleToTab;
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
        groupId: collectionId
    };
    if (prepend) {
        linkedItem.OrderIndex = 0;
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
/***/ (function(__unused_webpack_module, exports, __nested_webpack_require_102153__) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.generateSmartTipSetCollection = void 0;
var consts_1 = __nested_webpack_require_102153__(540);
var CollectionType = 99;
var GroupType = 2;
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


/***/ }),

/***/ 368:
/***/ (function(__unused_webpack_module, exports, __nested_webpack_require_103601__) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.createAndAddShuttleToTab = void 0;
var tileIdToWalkMeIdConverter_1 = __nested_webpack_require_103601__(903);
var tileToShuttleAdapter_1 = __nested_webpack_require_103601__(407);
var consoleLogger_1 = __nested_webpack_require_103601__(969);
var menuTabActions_1 = __nested_webpack_require_103601__(703);
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
/***/ (function(__unused_webpack_module, exports, __nested_webpack_require_105018__) {


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
exports.CompanionTilesDrawer = void 0;
var tileIdToWalkMeIdConverter_1 = __nested_webpack_require_105018__(903);
var companionApi_1 = __nested_webpack_require_105018__(639);
var consoleLogger_1 = __nested_webpack_require_105018__(969);
var CompanionTilesDrawer = /** @class */ (function () {
    function CompanionTilesDrawer() {
        this._tileEventCallbacks = [];
        this.currentMode = 'off';
        this.handleHotspotEvent = this.handleHotspotEvent.bind(this);
    }
    CompanionTilesDrawer.prototype.switchToMode = function (mode) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        consoleLogger_1.logger.log(consoleLogger_1.LogLevels.DEBUG, 'CompanionTilesDrawer: switchToMode called with mode:', mode, 'currentMode:', this.currentMode);
                        if (mode == this.currentMode) {
                            consoleLogger_1.logger.log(consoleLogger_1.LogLevels.Silly, 'CompanionTilesDrawer: already in the requested mode, no action needed');
                            return [2 /*return*/];
                        }
                        if (!(mode === 'off')) return [3 /*break*/, 4];
                        if (!(this.currentMode == 'stealth')) return [3 /*break*/, 2];
                        consoleLogger_1.logger.log(consoleLogger_1.LogLevels.DEBUG, 'CompanionTilesDrawer: switching from stealth mode to off, calling Help4.WM.closeHelpStealth()');
                        return [4 /*yield*/, companionApi_1.Help4.WM.closeHelpStealth()];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 2:
                        consoleLogger_1.logger.log(consoleLogger_1.LogLevels.DEBUG, 'CompanionTilesDrawer: switching from on mode to off, calling Help4.WM.closeHelp()');
                        return [4 /*yield*/, companionApi_1.Help4.WM.closeHelp()];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4:
                        if (!(mode === 'stealth')) return [3 /*break*/, 6];
                        consoleLogger_1.logger.log(consoleLogger_1.LogLevels.DEBUG, 'CompanionTilesDrawer: entering stealth mode, calling Help4.WM.openHelpStealth()');
                        return [4 /*yield*/, companionApi_1.Help4.WM.openHelpStealth()];
                    case 5:
                        _a.sent();
                        _a.label = 6;
                    case 6:
                        if (!(mode === 'on')) return [3 /*break*/, 8];
                        consoleLogger_1.logger.log(consoleLogger_1.LogLevels.DEBUG, 'CompanionTilesDrawer: entering on mode, calling Help4.WM.openHelp()');
                        return [4 /*yield*/, companionApi_1.Help4.WM.openHelp()];
                    case 7:
                        _a.sent();
                        _a.label = 8;
                    case 8:
                        this.currentMode = mode;
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
        if (this._tileEventCallbacks.length === 0) {
            companionApi_1.Help4.WM.listeners.onHotspotEvent.addListener(this.handleHotspotEvent);
        }
        this._tileEventCallbacks.push(callback);
    };
    CompanionTilesDrawer.prototype.unsubscribeFromTileEvent = function (callback) {
        var index = this._tileEventCallbacks.indexOf(callback);
        if (index > -1) {
            this._tileEventCallbacks.splice(index, 1);
        }
        if (this._tileEventCallbacks.length === 0) {
            companionApi_1.Help4.WM.listeners.onHotspotEvent.removeListener(this.handleHotspotEvent);
        }
    };
    CompanionTilesDrawer.prototype.invokeTileEventCallbacks = function (tileEvent) {
        consoleLogger_1.logger.log(consoleLogger_1.LogLevels.Silly, 'invokeTileEventCallbacks', tileEvent);
        this._tileEventCallbacks.forEach(function (callback) {
            try {
                callback(tileEvent);
            }
            catch (e) {
                // ignore
            }
        });
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
/***/ (function(__unused_webpack_module, exports, __nested_webpack_require_114633__) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.digestTileChanges = void 0;
var tileIdToWalkMeIdConverter_1 = __nested_webpack_require_114633__(903);
var tileToSmarttipAdapter_1 = __nested_webpack_require_114633__(583);
var consoleLogger_1 = __nested_webpack_require_114633__(969);
var smartTipActions_1 = __nested_webpack_require_114633__(911);
var shuttlesManager_1 = __nested_webpack_require_114633__(368);
var menuTabActions_1 = __nested_webpack_require_114633__(703);
var walkme_1 = __nested_webpack_require_114633__(763);
var digestTileChanges = function (menuTabId, smartTipSetId, updateInfo) {
    if (updateInfo.removed && updateInfo.removed.length) {
        consoleLogger_1.logger.log(consoleLogger_1.LogLevels.INFO, 'removed tiles', updateInfo.removed);
        for (var i = 0; i < updateInfo.removed.length; i++) {
            var tileId = updateInfo.removed[i];
            handleTileRemoval(menuTabId, smartTipSetId, tileId);
        }
    }
    if (updateInfo.updated && updateInfo.updated.length) {
        consoleLogger_1.logger.log(consoleLogger_1.LogLevels.INFO, 'updated tiles', updateInfo.updated);
        // TODO: do we need to support updated tiles? maybe for translations? tbd. 
        // for (let i = 0; i < updateInfo.updated.length; i++) {
        //     const tile = updateInfo.updated[i];
        //     handleTileRemoval(menuTabId, smartTipSetId, tile.id);
        //     handleAddedTile(menuTabId, smartTipSetId, tile);
        // }
    }
    if (updateInfo.added && updateInfo.added.length) {
        consoleLogger_1.logger.log(consoleLogger_1.LogLevels.INFO, 'added tiles', updateInfo.added);
        for (var i = 0; i < updateInfo.added.length; i++) {
            var tile = updateInfo.added[i];
            handleAddedTile(menuTabId, smartTipSetId, tile);
        }
    }
};
exports.digestTileChanges = digestTileChanges;
var handleTileRemoval = function (menuTabId, smartTipSetId, tileId) {
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
        }
    }
};
var handleAddedTile = function (menuTabId, smartTipSetId, tile) {
    // TODO: If we want to support lightbox links, it should be content, not shuttle.
    var isWhatsThisApp = tile.type == 'link' && tile._special == 'wta' && !tile.linkLightbox;
    if (isWhatsThisApp) {
        consoleLogger_1.logger.log(consoleLogger_1.LogLevels.DEBUG, 'WhatsThisApp tile', tile);
        (0, shuttlesManager_1.createAndAddShuttleToTab)(menuTabId, tile);
        return;
    }
    var isHelpTile = tile.type == 'help';
    if (isHelpTile) {
        var smartTip = (0, tileToSmarttipAdapter_1.getSmartTipFromTile)(tile);
        if (smartTip) {
            (0, smartTipActions_1.addSmartTipToSet)(smartTipSetId, smartTip);
        }
        return;
    }
};


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __nested_webpack_require_118096__(moduleId) {
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
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __nested_webpack_require_118096__);
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
var integrationLogic_1 = __nested_webpack_require_118096__(418);
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
/******/ 	var __webpack_exports__ = __webpack_require__(795);
/******/ 	wmbundle = __webpack_exports__;
/******/ 	
/******/ })()
;
/* WalkMe Module */ return wmbundle; })
//# sourceMappingURL=bundle.js.map
/* WalkMe Module */ typeof _walkmeInternals !== 'undefined' && _walkmeInternals.wmloader && _walkmeInternals.wmloader.define('wm-plugin-smart-highlights@1.1.0-rc.2@prelib', {"name":"wm-plugin-smart-highlights","version":"1.1.0-rc.2","toolbelt":"2.0.2","packageDate":"2026-03-10T09:56:58.649Z","entry":"prelib"}, function (__wmplugin__) {  
var wmbundle;
/******/ (function() { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 481:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

module.exports = __webpack_require__(625);



/***/ }),

/***/ 278:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

'use strict';
// api.cache.manager.js — Per-entity persistent API response cache.
//
// Architecture:
//   • All cached entries live in a single in-memory object (_mem) so reads
//     never touch the storage provider after init.
//   • On init() all TTL buckets are loaded from storage and merged into _mem.
//   • Writes update _mem immediately (fast) and schedule a debounced flush so
//     multiple set() calls in the same scan cycle produce only one saveData()
//     per bucket.
//   • Entries are split across three storage keys, one per TTL tier, so the
//     storage provider's native expiry fires at the correct time for each
//     group (rather than always using the longest TTL for the whole blob).
//
// Initialise once via init(storageProvider) after WalkMeReady / DataLoaded.
// Accepts either:
//   • A ClientStorageManager instance (synchronous getData / saveData), or
//   • An IdbStorageProvider instance (exposes open() → Promise, then sync
//     getData / saveData backed by IndexedDB).
// When the provider has an open() method, init() returns a Promise that
// resolves after the provider is ready and the cache has been loaded.

var log = (__webpack_require__(52)/* .log */ .R);

// ---------------------------------------------------------------------------
// TTL table (seconds).  Adjust here to change expiry for any category.
// ---------------------------------------------------------------------------
var CACHE_TTL = {
    people:                  604800,  // 1 week  (7 × 24 × 3600)
    successfactors_employee: 604800,  // 1 week
    jira_ticket:             240,     // 4 minutes
    company:                 86400,   // 24 hours
    salesforce_account:      86400,   // 24 hours
    snow_ticket:             240,     // 4 minutes
    snow_user_tickets:       240,     // 4 minutes
    sf_case:                 86400,   // 24 hours
    sf_harmony_opportunity:  86400,   // 24 hours
    sf_contact:              86400,   // 24 hours
    default:                 86400    // 24 hours fallback
};

// One storage key per TTL tier so expiry is applied at the right granularity
// for each group.  The bucket for a given entry is determined by
// CACHE_TTL[entityType] at flush time.
var STORAGE_BUCKETS = [
    { ttl: 604800, key: 'wm-smart-higlights-cache-1w' },  // 1 week  — people, SAP employees
    { ttl: 240,    key: 'wm-smart-higlights-cache-4m' },  // 4 minutes — Jira & ServiceNow tickets
    { ttl: 86400,  key: 'wm-smart-higlights-cache-1d' }   // 24 hours — everything else
];

// Debounce delay before flushing to storage (ms).
// Multiple set() calls within this window are coalesced into one saveData()
// per bucket.
var SAVE_DEBOUNCE_MS = 2000;

// ---------------------------------------------------------------------------
// Module state
// ---------------------------------------------------------------------------
var _storage = null;
// In-memory cache: { "entityType:id": { val: <any>, exp: <epochMs> } }
var _mem = {};
var _saveTimer = null;

// ---------------------------------------------------------------------------
// Lifecycle
// ---------------------------------------------------------------------------

/**
 * Load the cache from storage and keep it in memory.
 *
 * @param {Object} storageProvider  — ClientStorageManager or IdbStorageProvider.
 * @returns {Promise<void>|undefined}  A Promise when the provider is async
 *   (has an open() method), undefined when it is synchronous.
 */
function init(storageProvider) {
    _storage = storageProvider;
    if (_storage && typeof _storage.open === 'function') {
        return _storage.open().then(function () {
            _loadFromStorage();
        });
    }
    _loadFromStorage();
}

function isReady() {
    return !!_storage;
}

// ---------------------------------------------------------------------------
// Storage I/O  (internal)
// ---------------------------------------------------------------------------

function _loadFromStorage() {
    if (!_storage) return;
    try {
        var now = Date.now();
        var clean = {};
        var pruned = 0;
        for (var b = 0; b < STORAGE_BUCKETS.length; b++) {
            var raw = _storage.getData(STORAGE_BUCKETS[b].key);
            if (!raw) continue;
            var parsed = (typeof raw === 'string') ? JSON.parse(raw) : raw;
            if (!parsed || typeof parsed !== 'object') continue;
            var keys = Object.keys(parsed);
            for (var i = 0; i < keys.length; i++) {
                var entry = parsed[keys[i]];
                if (entry && entry.exp && now < entry.exp) {
                    clean[keys[i]] = entry;
                } else {
                    pruned++;
                }
            }
        }
        _mem = clean;
        log('[ApiCacheManager] Loaded ' + Object.keys(_mem).length + ' entries (' + pruned + ' expired pruned)');
    } catch (e) {
        _mem = {};
        log('[ApiCacheManager] Load failed: ' + e);
    }
}

// Resolve a _mem key (e.g. "jira_ticket:eux-9278") to its bucket index.
// Prefer the ttl stored on the entry itself (set via ttlOverride) so that
// adapter-created entries with custom TTLs land in the correct storage bucket
// rather than always falling back to the CACHE_TTL table value.
function _bucketIndexForKey(memKey) {
    var entry = _mem[memKey];
    var ttl = (entry && entry.ttl) ||
              (CACHE_TTL[memKey.split(':')[0]] || CACHE_TTL.default);
    for (var i = 0; i < STORAGE_BUCKETS.length; i++) {
        if (STORAGE_BUCKETS[i].ttl === ttl) return i;
    }
    return STORAGE_BUCKETS.length - 1; // fallback to last bucket
}

function _flushToStorage() {
    _saveTimer = null;
    if (!_storage) return;
    try {
        // Partition _mem into one object per bucket.
        var buckets = [];
        for (var b = 0; b < STORAGE_BUCKETS.length; b++) buckets.push({});
        var memKeys = Object.keys(_mem);
        for (var j = 0; j < memKeys.length; j++) {
            buckets[_bucketIndexForKey(memKeys[j])][memKeys[j]] = _mem[memKeys[j]];
        }
        // Save each bucket with its own native TTL.
        for (var k = 0; k < STORAGE_BUCKETS.length; k++) {
            _storage.saveData(STORAGE_BUCKETS[k].key, JSON.stringify(buckets[k]), STORAGE_BUCKETS[k].ttl);
        }
        log('[ApiCacheManager] Flushed ' + memKeys.length + ' entries to storage');
    } catch (e) {
        log('[ApiCacheManager] Flush failed: ' + e);
    }
}

function _scheduleSave() {
    if (_saveTimer) clearTimeout(_saveTimer);
    _saveTimer = setTimeout(_flushToStorage, SAVE_DEBOUNCE_MS);
}

// ---------------------------------------------------------------------------
// Public read / write  (pure memory after init)
// ---------------------------------------------------------------------------

/**
 * Read a single cached value by entity type + id.
 * Returns null on miss or expiry.  Never touches storage.
 */
function get(entityType, id) {
    var key = entityType + ':' + id;
    var entry = _mem[key];
    if (!entry) return null;
    if (entry.exp && Date.now() > entry.exp) {
        delete _mem[key];
        _scheduleSave(); // remove expired entry from persistent copy too
        return null;
    }
    return (entry.val !== undefined) ? entry.val : null;
}

/**
 * Store a value in memory and schedule a debounced flush to storage.
 * TTL is derived from CACHE_TTL[entityType] (falls back to 'default').
 * Pass ttlOverride (seconds) to bypass the CACHE_TTL table — used by
 * createAdapter() so callers can supply their own default TTL.
 */
function set(entityType, id, value, ttlOverride) {
    if (value === null || value === undefined) return;
    if (Array.isArray(value) && value.length === 0) return;
    var key = entityType + ':' + id;
    var ttl = ttlOverride || CACHE_TTL[entityType] || CACHE_TTL.default;
    _mem[key] = { val: value, exp: Date.now() + (ttl * 1000), ttl: ttl };
    _scheduleSave();
}

// ---------------------------------------------------------------------------
// Core cache-through helper
// ---------------------------------------------------------------------------

/**
 * fetchWithCache — cache-through wrapper for array-keyed API calls.
 *
 * Checks the in-memory cache for each key.  Calls fetchFn only with the
 * subset that was not found.  Stores each successfully fetched result item
 * (using getKeyFn to derive its id) and returns the full combined array.
 *
 * Auth / error sentinel objects ({ needsAuth: true }, { isError: true }) are
 * forwarded as-is and are never written to cache.
 *
 * @param {string}   entityType  — key in CACHE_TTL (e.g. 'jira_ticket')
 * @param {string[]} keys        — input identifiers (ticket keys, names, …)
 * @param {function} fetchFn     — function(missingKeys) → Promise
 * @param {function} getKeyFn    — function(item) → string|null
 */
function fetchWithCache(entityType, keys, fetchFn, getKeyFn) {
    if (!keys || keys.length === 0) return Promise.resolve([]);

    var cached = {};
    var missing = [];
    for (var i = 0; i < keys.length; i++) {
        var val = get(entityType, keys[i]);
        if (val !== null && val !== undefined) {
            cached[keys[i]] = val;
        } else {
            missing.push(keys[i]);
        }
    }

    var cachedResults = _objValues(cached);

    if (missing.length === 0) {
        log('[ApiCacheManager] Full cache hit for ' + entityType + ' (' + keys.length + ' items)');
        return Promise.resolve(cachedResults);
    }

    log('[ApiCacheManager] ' + entityType + ': fetching ' + missing.length + '/' + keys.length + ' (cache miss)');

    return fetchFn(missing).then(function (data) {
        if (!data) return cachedResults;

        // Non-array sentinel (needsAuth, isError, etc.): if we have partial
        // cache hits return them together with a needsAuth sentinel per missing
        // key so callers can still highlight uncached entries with auth prompts.
        if (!Array.isArray(data)) {
            if (cachedResults.length > 0) {
                var sentinels = missing.map(function (k) { return { needsAuth: true, key: k }; });
                return cachedResults.concat(sentinels);
            }
            return data;
        }

        for (var j = 0; j < data.length; j++) {
            var item = data[j];
            if (!item || item.needsAuth || item.isError || item.isNotFound) continue;
            var key = getKeyFn ? getKeyFn(item) : (item.key || item.id || null);
            if (key) set(entityType, String(key), item);
        }
        return cachedResults.concat(data);
    });
}

function _objValues(obj) {
    var result = [];
    var keys = Object.keys(obj);
    for (var i = 0; i < keys.length; i++) result.push(obj[keys[i]]);
    return result;
}

// Flattens { key: Array } into a single flat array.
function _flattenArrayValues(obj) {
    var result = [];
    var keys = Object.keys(obj);
    for (var i = 0; i < keys.length; i++) {
        var val = obj[keys[i]];
        if (Array.isArray(val)) {
            for (var j = 0; j < val.length; j++) result.push(val[j]);
        } else if (val !== null && val !== undefined) {
            result.push(val);
        }
    }
    return result;
}

/**
 * fetchWithCacheByName — per-input-name cache-through for name-based lookups.
 *
 * Checks the cache for each input name (normalised to lower-case).
 * Calls fetchFn only with uncached names.
 * Uses attributeFn to map each returned record back to the input name it
 * belongs to, then caches a per-name array so any future subset lookup hits.
 *
 * @param {string}   entityType   — key in CACHE_TTL
 * @param {string[]} inputNames   — search terms (e.g. company / person names)
 * @param {function} fetchFn      — function(missingNames) → Promise<Array>
 * @param {function} attributeFn  — function(record, missingNames) → string|null
 */
function fetchWithCacheByName(entityType, inputNames, fetchFn, attributeFn) {
    if (!inputNames || inputNames.length === 0) return Promise.resolve([]);

    var cached = {};
    var missing = [];

    for (var i = 0; i < inputNames.length; i++) {
        var normKey = inputNames[i].toLowerCase();
        var val = get(entityType, normKey);
        if (val !== null && val !== undefined) {
            cached[normKey] = val;
        } else {
            missing.push(inputNames[i]);
        }
    }

    var cachedResults = _flattenArrayValues(cached);

    if (missing.length === 0) {
        log('[ApiCacheManager] Full cache hit for ' + entityType + ' (' + inputNames.length + ' names)');
        return Promise.resolve(cachedResults);
    }

    log('[ApiCacheManager] ' + entityType + ': fetching ' + missing.length + '/' + inputNames.length + ' (cache miss)');

    return fetchFn(missing).then(function (data) {
        if (!data) return cachedResults;
        if (!Array.isArray(data)) {
            if (cachedResults.length > 0) {
                var sentinels = missing.map(function (n) { return { needsAuth: true, name: n }; });
                return cachedResults.concat(sentinels);
            }
            return data;
        }

        var byName = {};
        for (var j = 0; j < data.length; j++) {
            var record = data[j];
            if (!record || record.needsAuth || record.isError) continue;
            var matchedName = attributeFn ? attributeFn(record, missing) : null;
            if (matchedName) {
                var norm = matchedName.toLowerCase();
                if (!byName[norm]) byName[norm] = [];
                byName[norm].push(record);
            }
        }
        var byNameKeys = Object.keys(byName);
        for (var k = 0; k < byNameKeys.length; k++) {
            set(entityType, byNameKeys[k], byName[byNameKeys[k]]);
        }

        return cachedResults.concat(data);
    });
}

// ---------------------------------------------------------------------------
// Entity-specific convenience wrappers
// ---------------------------------------------------------------------------

function fetchJiraTickets(keys, fetchFn) {
    return fetchWithCache('jira_ticket', keys, fetchFn,
        function (t) { return t.key || null; });
}

function fetchSnowTickets(keys, fetchFn) {
    return fetchWithCache('snow_ticket', keys, fetchFn,
        function (t) { return t.key || null; });
}

/**
 * Caches open-ticket lists keyed by user display name.
 * fetchFn receives the raw userName string (not an array).
 */
function fetchSnowUserTickets(userName, fetchFn) {
    if (!userName) return fetchFn(userName);
    var cached = get('snow_user_tickets', userName);
    if (cached !== null) {
        log('[ApiCacheManager] Cache hit for snow_user_tickets: ' + userName);
        return Promise.resolve(cached);
    }
    return fetchFn(userName).then(function (data) {
        if (data && Array.isArray(data)) set('snow_user_tickets', userName, data);
        return data;
    });
}

function fetchSalesforceAccounts(names, fetchFn) {
    return fetchWithCacheByName('salesforce_account', names, fetchFn,
        function (record, inputNames) {
            if (!record || !record.Name) return null;
            var recLower = record.Name.toLowerCase();
            for (var i = 0; i < inputNames.length; i++) {
                var n = inputNames[i].toLowerCase();
                if (recLower.indexOf(n) !== -1 || n.indexOf(recLower) !== -1) return inputNames[i];
            }
            return null;
        });
}

/**
 * Normalises case numbers (strips leading #) before cache lookup and API call.
 * fetchFn receives already-cleaned keys.
 */
function fetchSalesforceCases(rawKeys, fetchFn) {
    var cleanedKeys = [];
    for (var i = 0; i < rawKeys.length; i++) {
        cleanedKeys.push(String(rawKeys[i]).replace(/^#/, ''));
    }
    return fetchWithCache('sf_case', cleanedKeys, fetchFn,
        function (r) { return r.CaseNumber || r.Id || null; });
}

/**
 * Normalises opportunity external IDs (strips non-digits) before cache lookup
 * and API call.  fetchFn receives already-cleaned keys.
 */
function fetchSfHarmonyOpportunities(rawKeys, fetchFn) {
    var cleanedKeys = [];
    for (var i = 0; i < rawKeys.length; i++) {
        cleanedKeys.push(String(rawKeys[i]).replace(/\D/g, ''));
    }
    return fetchWithCache('sf_harmony_opportunity', cleanedKeys, fetchFn,
        function (r) { return r.Rev_Share_External_Id__c ? String(r.Rev_Share_External_Id__c) : null; });
}

function fetchSalesforceContacts(names, fetchFn) {
    return fetchWithCacheByName('sf_contact', names, fetchFn,
        function (record, inputNames) {
            var recName = (record.Name || record.FullName || '').toLowerCase();
            if (!recName) return null;
            for (var i = 0; i < inputNames.length; i++) {
                var n = inputNames[i].toLowerCase();
                if (recName.indexOf(n) !== -1 || n.indexOf(recName) !== -1) return inputNames[i];
            }
            return null;
        });
}

function fetchSapEmployees(names, fetchFn) {
    return fetchWithCacheByName('successfactors_employee', names, fetchFn,
        function (record, inputNames) {
            var empName = (record.employee_full_name || record.generalDisplayName || '').toLowerCase();
            if (!empName) return null;
            for (var i = 0; i < inputNames.length; i++) {
                var n = inputNames[i].toLowerCase();
                if (empName.indexOf(n) !== -1 || n.indexOf(empName) !== -1) return inputNames[i];
            }
            return null;
        });
}

// ---------------------------------------------------------------------------
// Generic adapter  (Cache-compatible shim)
// ---------------------------------------------------------------------------

/**
 * Return a Cache-compatible { get, set, clear } adapter backed by this module.
 *
 * When itemKeyFn is supplied the adapter becomes a transparent splitting proxy:
 *
 *   set(key, arrayValue)
 *     Instead of storing the whole array under one key, each item is stored
 *     individually.  The per-item cache key is built as:
 *       "<key-prefix>:<itemKeyFn(item).toLowerCase()>"
 *     where key-prefix is everything up to (and including) the first ":" in
 *     the original key (e.g. "dp:" from "dp:{…json…}").
 *
 *   get(key)
 *     If the key looks like "<prefix>:{JSON object}" (e.g. the datapulse batch
 *     key "dp:{"People Names":["A","B"]}"), the adapter decomposes it into
 *     individual lookups for every string found in the JSON value arrays.
 *     All must be cache hits; a single miss returns null so the caller falls
 *     back to a live fetch (which will then re-populate via the split set).
 *
 * @param {string}        entityType      — key in CACHE_TTL
 * @param {number}        defaultTtlSecs  — TTL when caller does not pass one
 * @param {function|null} itemKeyFn       — optional: function(item) → string|null
 *                                          Extracts the per-item cache key.
 *                                          Enables the splitting proxy behaviour.
 */
function createAdapter(entityType, defaultTtlSecs, itemKeyFn) {

    // If the key ends with ":<JSON object>" decompose it into individual keys.
    // Returns an array of individual string keys, or null if not a batch key.
    function _parseGroupKey(key) {
        try {
            var colonIdx = key.indexOf(':');
            if (colonIdx === -1) return null;
            var prefix   = key.substring(0, colonIdx + 1);   // e.g. "dp:"
            var jsonPart = key.substring(colonIdx + 1);
            var parsed   = JSON.parse(jsonPart);
            if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) return null;
            var names = [];
            var cats  = Object.keys(parsed);
            for (var c = 0; c < cats.length; c++) {
                var catNames = parsed[cats[c]];
                if (!Array.isArray(catNames)) continue;
                for (var n = 0; n < catNames.length; n++) {
                    if (typeof catNames[n] === 'string') {
                        names.push(prefix + catNames[n].toLowerCase());
                    }
                }
            }
            return names.length > 0 ? names : null;
        } catch (e) { return null; }
    }

    return {
        get: function (key) {
            if (itemKeyFn) {
                var individualKeys = _parseGroupKey(key);
                if (individualKeys) {
                    // Batch key: every individual name must be a cache hit.
                    var results = [];
                    for (var i = 0; i < individualKeys.length; i++) {
                        var hit = get(entityType, individualKeys[i]);
                        if (hit === null) return null;   // partial miss → full miss
                        if (Array.isArray(hit)) {
                            for (var j = 0; j < hit.length; j++) results.push(hit[j]);
                        } else {
                            results.push(hit);
                        }
                    }
                    return results;
                }
            }
            return get(entityType, key);
        },

        set: function (key, value, ttlSecs) {
            if (itemKeyFn && Array.isArray(value)) {
                // Split: store each item under its own derived key.
                var colonIdx = key.indexOf(':');
                var prefix   = colonIdx !== -1 ? key.substring(0, colonIdx + 1) : '';
                var byItemKey = {};
                for (var i = 0; i < value.length; i++) {
                    var name = itemKeyFn(value[i]);
                    if (!name) continue;
                    var k = prefix + name.toLowerCase();
                    if (!byItemKey[k]) byItemKey[k] = [];
                    byItemKey[k].push(value[i]);
                }
                var splitKeys = Object.keys(byItemKey);
                for (var s = 0; s < splitKeys.length; s++) {
                    set(entityType, splitKeys[s], byItemKey[splitKeys[s]], ttlSecs || defaultTtlSecs);
                }
                return;
            }
            set(entityType, key, value, ttlSecs || defaultTtlSecs);
        },

        clear: function (key) {
            var memKey = entityType + ':' + key;
            delete _mem[memKey];
            _scheduleSave();
        }
    };
}

// ---------------------------------------------------------------------------

module.exports = {
    CACHE_TTL: CACHE_TTL,
    init: init,
    isReady: isReady,
    get: get,
    set: set,
    createAdapter: createAdapter,
    fetchWithCache: fetchWithCache,
    fetchJiraTickets: fetchJiraTickets,
    fetchSnowTickets: fetchSnowTickets,
    fetchSnowUserTickets: fetchSnowUserTickets,
    fetchSalesforceAccounts: fetchSalesforceAccounts,
    fetchSalesforceContacts: fetchSalesforceContacts,
    fetchSalesforceCases: fetchSalesforceCases,
    fetchSfHarmonyOpportunities: fetchSfHarmonyOpportunities,
    fetchSapEmployees: fetchSapEmployees
};



/***/ }),

/***/ 294:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

'use strict';
// idb.storage.provider.js — IndexedDB-backed storage provider.
//
// Drop-in replacement for ClientStorageManager when injected into
// api.cache.manager (or any module using the getData / saveData interface).
//
// Interface:
//   open()                         → Promise<void>  call once before use
//   getData(key)                   → string | null  sync after open()
//   saveData(key, value, ttlSecs)  → void           async, fire-and-forget
//   getAll()                       → Promise<Object> all live entries { key → parsed value }
//   clearAll()                     → Promise<void>  wipe IDB store and in-memory mirror
//
// Cache-disable kill switch:
//   Set localStorage key  "wm-sh-cache-disabled"  to any truthy string to
//   make getData() always return null and saveData() a no-op.  The key is
//   checked on every call so it takes effect immediately without a page reload.
//   Remove the key (or set it to "false" / "0" / "") to re-enable.
//
// All entries are mirrored in-memory after open(); getData() never touches
// IDB directly so reads are always synchronous.  saveData() updates the
// in-memory mirror immediately and persists to IDB in the background.
//
// Each IDB record is stored as { raw: <string>, exp: <epochMs> } so expired
// entries are pruned automatically on the next open().
//
// Window-scope debug helpers (assigned on open()):
//   window.__wmShCache.getAll()   — inspect all live cache entries
//   window.__wmShCache.clearAll() — wipe the entire cache
//   window.__wmShCache.disable()  — set the kill-switch localStorage key
//   window.__wmShCache.enable()   — remove the kill-switch localStorage key

var log = (__webpack_require__(52)/* .log */ .R);

var DB_NAME          = 'wm-smart-highlights-cache';
var DB_VERSION       = 1;
var STORE_NAME       = 'entries';
var LS_DISABLE_KEY   = 'wm-sh-cache-disabled';

// ---------------------------------------------------------------------------
// Constructor
// ---------------------------------------------------------------------------

function IdbStorageProvider() {
    this._db  = null;
    // In-memory mirror: { [storageKey]: rawJsonString }
    this._mem = {};
}

// ---------------------------------------------------------------------------
// Kill-switch helper
// ---------------------------------------------------------------------------

function _isCacheDisabled() {
    try {
        var val = window.localStorage.getItem(LS_DISABLE_KEY);
        return val !== null && val !== '' && val !== 'false' && val !== '0';
    } catch (e) {
        return false;
    }
}

// ---------------------------------------------------------------------------
// Lifecycle
// ---------------------------------------------------------------------------

/**
 * Open the IndexedDB database and load all non-expired entries into memory.
 * Must be called (and awaited) before getData() / saveData().
 *
 * Resolves even if IndexedDB is unavailable or errors out so the caller
 * degrades gracefully to an empty in-memory cache.
 *
 * Also registers window.__wmShCache debug helpers.
 *
 * @returns {Promise<void>}
 */
IdbStorageProvider.prototype.open = function () {
    var self = this;
    return new Promise(function (resolve) {
        if (!window.indexedDB) {
            log('[IdbStorageProvider] IndexedDB not available — falling back to in-memory only');
            self._registerWindowApi();
            return resolve();
        }

        var req = window.indexedDB.open(DB_NAME, DB_VERSION);

        req.onupgradeneeded = function (evt) {
            var db = evt.target.result;
            if (!db.objectStoreNames.contains(STORE_NAME)) {
                db.createObjectStore(STORE_NAME);
            }
        };

        req.onerror = function () {
            log('[IdbStorageProvider] DB open error: ' + req.error + ' — falling back to in-memory only');
            self._registerWindowApi();
            resolve();
        };

        req.onsuccess = function () {
            self._db = req.result;
            self._loadAll().then(function () {
                self._registerWindowApi();
                resolve();
            }, function () {
                self._registerWindowApi();
                resolve();
            });
        };
    });
};

// ---------------------------------------------------------------------------
// Internal helpers
// ---------------------------------------------------------------------------

/**
 * Read every entry from IDB into _mem, skipping expired records.
 * @returns {Promise<void>}
 */
IdbStorageProvider.prototype._loadAll = function () {
    var self = this;
    return new Promise(function (resolve) {
        if (!self._db) return resolve();
        try {
            var tx     = self._db.transaction(STORE_NAME, 'readonly');
            var store  = tx.objectStore(STORE_NAME);
            var req    = store.openCursor();
            var now    = Date.now();
            var pruned = 0;

            req.onsuccess = function () {
                var cursor = req.result;
                if (!cursor) return; // tx.oncomplete fires after all iterations
                var entry = cursor.value;
                if (entry && entry.exp && now < entry.exp) {
                    self._mem[cursor.key] = entry.raw;
                } else {
                    pruned++;
                }
                cursor.continue();
            };

            tx.oncomplete = function () {
                log('[IdbStorageProvider] Loaded ' + Object.keys(self._mem).length +
                    ' entries (' + pruned + ' expired pruned)');
                resolve();
            };

            tx.onerror = function () {
                log('[IdbStorageProvider] Load error: ' + tx.error);
                resolve();
            };
        } catch (e) {
            log('[IdbStorageProvider] Load exception: ' + e);
            resolve();
        }
    });
};

/**
 * Write a single entry to IDB in the background (fire-and-forget).
 * Passing an empty / falsy value removes the key.
 */
IdbStorageProvider.prototype._writeToIdb = function (key, value, ttlSeconds) {
    if (!this._db) return;
    try {
        var tx    = this._db.transaction(STORE_NAME, 'readwrite');
        var store = tx.objectStore(STORE_NAME);
        if (!value) {
            store.delete(key);
        } else {
            store.put({ raw: value, exp: Date.now() + (ttlSeconds * 1000) }, key);
        }
        tx.onerror = function () {
            log('[IdbStorageProvider] Write error: ' + tx.error);
        };
    } catch (e) {
        log('[IdbStorageProvider] Write exception: ' + e);
    }
};

/**
 * Attach debug helpers to window.__wmShCache so they are accessible from
 * DevTools without needing to import the module.
 */
IdbStorageProvider.prototype._registerWindowApi = function () {
    var self = this;
    try {
        if(!window._walkmeInternals){
            return;
        }
        window._walkmeInternals.smartHighlights = window._walkmeInternals.smartHighlights || {};
        window._walkmeInternals.smartHighlights.cache = {
            getAll:   function () { return self.getAll(); },
            clearAll: function () { return self.clearAll(); },
            disable:  function () {
                window.localStorage.setItem(LS_DISABLE_KEY, '1');
                log('[IdbStorageProvider] Cache disabled via kill switch');
            },
            enable:   function () {
                window.localStorage.removeItem(LS_DISABLE_KEY);
                log('[IdbStorageProvider] Cache kill switch removed');
            }
        };
    } catch (e) {
        // Non-fatal — window may not be writable in some environments.
    }
};

// ---------------------------------------------------------------------------
// Public interface  (matches ClientStorageManager)
// ---------------------------------------------------------------------------

/**
 * Synchronous read from the in-memory mirror.
 * Returns null on miss or when the cache kill switch is active.
 *
 * @param  {string} key
 * @returns {string|null}
 */
IdbStorageProvider.prototype.getData = function (key) {
    if (_isCacheDisabled()) return null;
    return Object.prototype.hasOwnProperty.call(this._mem, key) ? this._mem[key] : null;
};

/**
 * Update the in-memory mirror immediately and persist to IDB asynchronously.
 * No-op when the cache kill switch is active.
 * Passing an empty / falsy value clears the entry (mirrors ClientStorageManager
 * clear-by-empty-string behaviour expected by api.cache.manager).
 *
 * @param {string} key
 * @param {string} value       — serialised JSON string
 * @param {number} ttlSeconds  — used to compute the IDB record expiry
 */
IdbStorageProvider.prototype.saveData = function (key, value, ttlSeconds) {
    if (_isCacheDisabled()) return;
    if (!value) {
        delete this._mem[key];
    } else {
        this._mem[key] = value;
    }
    this._writeToIdb(key, value, ttlSeconds);
};

// ---------------------------------------------------------------------------
// Public utility methods
// ---------------------------------------------------------------------------

/**
 * Return all live (non-expired) cache entries as a plain object.
 * Values are parsed from their stored JSON strings where possible.
 *
 * Reads straight from IDB so the snapshot is always authoritative, even if
 * in-memory state is stale for any reason.
 *
 * @returns {Promise<Object>}  { [storageKey]: parsedValue }
 */
IdbStorageProvider.prototype.getAll = function () {
    var self = this;
    return new Promise(function (resolve) {
        if (!self._db) {
            // Fall back to in-memory mirror when IDB is unavailable.
            var snapshot = {};
            var now = Date.now();
            var keys = Object.keys(self._mem);
            for (var i = 0; i < keys.length; i++) {
                try { snapshot[keys[i]] = JSON.parse(self._mem[keys[i]]); } catch (e) { snapshot[keys[i]] = self._mem[keys[i]]; }
            }
            return resolve(snapshot);
        }
        try {
            var result = {};
            var nowTs  = Date.now();
            var tx     = self._db.transaction(STORE_NAME, 'readonly');
            var store  = tx.objectStore(STORE_NAME);
            var req    = store.openCursor();

            req.onsuccess = function () {
                var cursor = req.result;
                if (!cursor) return;
                var entry = cursor.value;
                if (entry && entry.exp && nowTs < entry.exp) {
                    try { result[cursor.key] = JSON.parse(entry.raw); } catch (e) { result[cursor.key] = entry.raw; }
                }
                cursor.continue();
            };

            tx.oncomplete = function () { resolve(result); };
            tx.onerror    = function () {
                log('[IdbStorageProvider] getAll error: ' + tx.error);
                resolve(result);
            };
        } catch (e) {
            log('[IdbStorageProvider] getAll exception: ' + e);
            resolve({});
        }
    });
};

/**
 * Wipe all entries from both the IDB store and the in-memory mirror.
 *
 * @returns {Promise<void>}
 */
IdbStorageProvider.prototype.clearAll = function () {
    var self = this;
    self._mem = {};
    return new Promise(function (resolve) {
        if (!self._db) return resolve();
        try {
            var tx    = self._db.transaction(STORE_NAME, 'readwrite');
            var store = tx.objectStore(STORE_NAME);
            store.clear();
            tx.oncomplete = function () {
                log('[IdbStorageProvider] clearAll — IDB store wiped');
                resolve();
            };
            tx.onerror = function () {
                log('[IdbStorageProvider] clearAll error: ' + tx.error);
                resolve();
            };
        } catch (e) {
            log('[IdbStorageProvider] clearAll exception: ' + e);
            resolve();
        }
    });
};

// ---------------------------------------------------------------------------

module.exports = { IdbStorageProvider: IdbStorageProvider };



/***/ }),

/***/ 359:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

'use strict';
// config.js — merges site config over defaults

var DEFAULT_CONFIG = (__webpack_require__(510).DEFAULT_CONFIG);

function deepMerge(target, source) {
    var result = {};
    var keys = Object.keys(target);
    var i, key;
    for (i = 0; i < keys.length; i++) {
        key = keys[i];
        result[key] = target[key];
    }
    if (!source) return result;
    var sourceKeys = Object.keys(source);
    for (i = 0; i < sourceKeys.length; i++) {
        key = sourceKeys[i];
        if (Array.isArray(source[key])) {
            result[key] = source[key];
        } else if (source[key] && typeof source[key] === 'object' && !Array.isArray(source[key])) {
            result[key] = deepMerge(result[key] || {}, source[key]);
        } else {
            result[key] = source[key];
        }
    }
    return result;
}

function getConfig(siteConfigManager) {
    var siteSettings = {};
    var config = siteConfigManager.get();
    // config key intentionally kept as customersFetcher — server-side key we do not control
    if (config && config.Custom && config.Custom.customersFetcher) {
        siteSettings = config.Custom.customersFetcher;
    }
    return deepMerge(DEFAULT_CONFIG, siteSettings);
}

module.exports = { getConfig: getConfig };



/***/ }),

/***/ 510:
/***/ (function(module) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

'use strict';
// default.config.js — default entity/provider configuration

var DEFAULT_CONFIG = {
    // To switch company names to Salesforce, change provider to 'salesforce'
    // and add the providerConfig:
    //   { type: 'company', provider: 'salesforce', ner: 'Company Names',
    //     providerConfig: { domain: 'https://walkme.my.salesforce.com',
    //       iframeEntryPath: '/ltng/switcher?destination=classic',
    //       apiVersion: 'v54.0', cookieName: 'sid' } }
    entities: [
        {
            type: 'company',
            provider: 'datapulse',
            ner: 'Company Names',
            sourceGuid: '72f30c14-4447-4e9b-8175-e2fd7cd79b61'
        },
        // To switch people names to SuccessFactors, change provider to
        // 'successfactors' and add providerConfig:
        //   { type: 'employee', provider: 'successfactors', ner: 'People Names',
        //     providerConfig: { domain: 'https://hcm-eu20.hr.cloud.sap',
        //       iframeEntryPath: '/sf/home' } }
        {
            type: 'employee',
            provider: 'datapulse',
            ner: 'People Names',
            sourceGuid: '6722521a-aa0f-4512-adf5-025bb8c798a8'
        },
        {
            type: 'jira_ticket',
            provider: 'jira',
            regex: '\\b[A-Z][A-Z\\d]{1,9}-\\d+\\b',
            providerConfig: {
                domain: 'https://walkme.atlassian.net',
                iframeEntryPath: '/secure/Dashboard.jspa',
                authCheckPath: '/rest/api/2/myself',
                loginPath: '/jira/software/c/projects/DD/boards/391',
                customFields: { supportBucket: 'customfield_18814' },
                jiraContext: {
                    projects: [
                        { key: 'EUX', name: 'End User Experience' },
                        { key: 'DEEP', name: 'DeepUI' },
                        { key: 'EX', name: 'Exposure'},
                        { key: 'DD', name: 'Delivery'},
                    ],
                    ticketPattern: 'PROJECT-NUMBER (e.g. EUX-123, DEEP-456)',
                    issueTypes: ['Bug', 'Story', 'Task', 'Epic', 'Sub-task', 'Support', 'Dev Task', 'QA Task'],
                    priorities: ['Blocker', 'Critical', 'High', 'Medium', 'Minor', 'Major'],
                    statuses: ['Open', 'Ready', 'In Progress', 'Code Review', 'Ready for QA', 'QA in progress', 'Done', 'Closed'],
                    labels: []
                }
            }
        },
        {
            type: 'snow_ticket',
            provider: 'servicenow',
            regex: '\\b(INC|RITM|REQ|SCTASK|CHG|PRB)\\d+\\b',
            providerConfig: {
                domain: 'https://walkmeprod.service-now.com',
                iframeEntryPath: '/sp'
            }
        },
        {
            type: 'sf_case',
            provider: 'salesforce',
            regex: '00\\d{6}',
            providerConfig: {
                domain: 'https://walkme.my.salesforce.com',
                iframeEntryPath: '/ltng/switcher?destination=classic',
                apiVersion: 'v54.0',
                cookieName: 'sid'
            }
        },
        {
            type: 'sf_harmony_opportunity',
            provider: 'salesforce',
            regex: '\\b\\d{9}\\b',
            providerConfig: {
                domain: 'https://walkme.my.salesforce.com',
                iframeEntryPath: '/ltng/switcher?destination=classic',
                apiVersion: 'v54.0',
                cookieName: 'sid'
            }
        },
        {
            type: 'salesforce_account',
            provider: 'salesforce',
            providerConfig: {
                domain: 'https://walkme.my.salesforce.com',
                iframeEntryPath: '/ltng/switcher?destination=classic',
                apiVersion: 'v54.0',
                cookieName: 'sid'
            }
        },
        {
            type: 'successfactors_employee',
            provider: 'successfactors',
            providerConfig: {
                domain: 'https://hcm-eu20.hr.cloud.sap',
                iframeEntryPath: '/sf/home'
            }
        }
    ],
    llm: {
        nerFunction: 'freePromptMini',
        judgeFunction: 'freePrompt'
    },
    highlightAll: false,
    context: '',
    allowedUsers: [],
    allowedSegments: [],
    sfdcSegments: [],
    contentSelectors: [],
    visibilitySelectors: [],
    mutationObserver: {},
    nerBlacklist: ['sap', 'jira', 'google', 'amazon', 'servicenow', 'gitlab', 'walkme'],
    blockedTargets: ['Google LLC'],
    systemGuid: 'dd32722f94d34f88a23dd84e5ae8fea0',
    searchEndpoint: 'https://papi.walkme.com/deepui/api/askme/ask/datapulse-search',
    logoUrl: 'https://cdn.walkme.com/chatbot/latest/assets/public/ai-chat.png'
};

module.exports = { DEFAULT_CONFIG: DEFAULT_CONFIG };



/***/ }),

/***/ 329:
/***/ (function(module) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

'use strict';
// icons.js — SVG icon definitions for balloon UI

var ICONS = {
    LINK: {
        viewBox: "0 0 12 12",
        color: "#1677FF",
        paths: ["M9.15 11.9993H2.1C0.944999 11.9993 0 11.0543 0 9.89926V2.84926C0 1.69426 0.944999 0.749263 2.1 0.749263H5.3325C5.6625 0.749263 5.9325 1.01926 5.9325 1.34926C5.9325 1.67926 5.6625 1.94926 5.3325 1.94926H2.1C1.605 1.94926 1.2 2.35426 1.2 2.84926V9.89926C1.2 10.3943 1.605 10.7993 2.1 10.7993H9.15C9.645 10.7993 10.05 10.3943 10.05 9.89926V8.44426C10.05 8.11426 10.32 7.84426 10.65 7.84426C10.98 7.84426 11.25 8.11426 11.25 8.44426V9.89926C11.25 11.0543 10.305 11.9993 9.15 11.9993ZM5.85 8.99926C5.52 8.99926 5.25 8.72926 5.25 8.39926V6.61426C5.235 5.64676 5.61 4.73926 6.2925 4.05676C6.975 3.37426 7.8825 2.99926 8.8425 2.99926H9.7275L8.4375 1.78426C8.1975 1.55926 8.1825 1.17676 8.415 0.936763C8.64 0.696763 9.0225 0.681763 9.2625 0.914263L11.8125 3.31426C11.9325 3.42676 12 3.58426 12 3.74926C12 3.91426 11.9325 4.07176 11.8125 4.18426L9.2625 6.58426C9.0225 6.80926 8.64 6.80176 8.415 6.56176C8.19 6.32176 8.1975 5.93926 8.4375 5.71426L10.0425 4.19926H8.835C8.19 4.19926 7.59 4.44676 7.1325 4.90426C6.6825 5.36176 6.4275 5.96176 6.435 6.60676V8.39176C6.4425 8.72176 6.18 8.99176 5.8425 8.99176L5.85 8.99926Z"]
    },
    ROLE: {
        viewBox: "0 0 16 16",
        paths: ["M13.2 15H2.8C1.26 15 0 13.74 0 12.2V6.8C0 5.26 1.26 4 2.8 4H4V2.8C4 1.81 4.81 1 5.8 1H10.2C11.19 1 12 1.81 12 2.8V4H13.2C14.74 4 16 5.26 16 6.8V12.2C16 13.74 14.74 15 13.2 15ZM12.6 13.4H13.2C13.86 13.4 14.4 12.86 14.4 12.2V6.8C14.4 6.14 13.86 5.6 13.2 5.6H12.6V13.4ZM5 13.4H11V5.6H5V13.4ZM2.8 5.6C2.14 5.6 1.6 6.14 1.6 6.8V12.2C1.6 12.86 2.14 13.4 2.8 13.4H3.4V5.6H2.8ZM5.6 4H10.4V2.8C10.4 2.69 10.31 2.6 10.2 2.6H5.8C5.69 2.6 5.6 2.69 5.6 2.8V4Z"]
    },
    MANAGER: {
        viewBox: "0 0 16 16",
        paths: ["M6.5 1.5C6.5 0.668172 7.16817 0 8 0C8.83183 0 9.5 0.668172 9.5 1.5C9.5 2.33183 8.83183 3 8 3C7.16817 3 6.5 2.33183 6.5 1.5ZM8.06944 1.56944C8.08987 1.549 8.1 1.52185 8.1 1.5C8.1 1.47815 8.08987 1.451 8.06944 1.43056C8.049 1.41013 8.02185 1.4 8 1.4C7.97815 1.4 7.951 1.41013 7.93056 1.43056C7.91013 1.451 7.9 1.47815 7.9 1.5C7.9 1.52185 7.91013 1.549 7.93056 1.56944C7.951 1.58987 7.97815 1.6 8 1.6C8.02185 1.6 8.049 1.58987 8.06944 1.56944ZM5 6.2C5 4.98817 5.98817 4 7.2 4H8.8C10.0118 4 11 4.98817 11 6.2C11 6.64183 10.6418 7 10.2 7H5.8C5.35817 7 5 6.64183 5 6.2ZM8 8C8.44183 8 8.8 8.35817 8.8 8.8V9.89231L10.0406 10.4761C10.4404 10.6643 10.612 11.1409 10.4239 11.5406C10.2357 11.9404 9.75913 12.112 9.35936 11.9239L8 11.2842L6.64064 11.9239C6.24087 12.112 5.76427 11.9404 5.57615 11.5406C5.38802 11.1409 5.55959 10.6643 5.95936 10.4761L7.2 9.89231V8.8C7.2 8.35817 7.55817 8 8 8ZM1.5 10.5C1.5 9.66817 2.16817 9 3 9C3.83183 9 4.5 9.66817 4.5 10.5C4.5 11.3318 3.83183 12 3 12C2.16817 12 1.5 11.3318 1.5 10.5ZM3.06944 10.5694C3.08987 10.549 3.1 10.5219 3.1 10.5C3.1 10.4781 3.08987 10.451 3.06944 10.4306C3.049 10.4101 3.02185 10.4 3 10.4C2.97815 10.4 2.951 10.4101 2.93056 10.4306C2.91013 10.451 2.9 10.4781 2.9 10.5C2.9 10.5219 2.91013 10.549 2.93056 10.5694C2.951 10.5899 2.97815 10.6 3 10.6C3.02185 10.6 3.049 10.5899 3.06944 10.5694ZM11.5 10.5C11.5 9.66817 12.1682 9 13 9C13.8318 9 14.5 9.66817 14.5 10.5C14.5 11.3318 13.8318 12 13 12C12.1682 12 11.5 11.3318 11.5 10.5ZM13.0694 10.5694C13.0899 10.549 13.1 10.5219 13.1 10.5C13.1 10.4781 13.0899 10.451 13.0694 10.4306C13.049 10.4101 13.0219 10.4 13 10.4C12.9781 10.4 12.951 10.4101 12.9306 10.4306C12.9101 10.451 12.9 10.4781 12.9 10.5C12.9 10.5219 12.9101 10.549 12.9306 10.5694C12.951 10.5899 12.9781 10.6 13 10.6C13.0219 10.6 13.049 10.5899 13.0694 10.5694ZM0 15.2C0 13.9882 0.988173 13 2.2 13H3.8C5.01183 13 6 13.9882 6 15.2C6 15.6418 5.64183 16 5.2 16H0.799999C0.358171 16 0 15.6418 0 15.2ZM10 15.2C10 13.9882 10.9882 13 12.2 13H13.8C15.0118 13 16 13.9882 16 15.2C16 15.6418 15.6418 16 15.2 16H10.8C10.3582 16 10 15.6418 10 15.2Z"]
    },
    DEPARTMENT: {
        viewBox: "0 0 16 16",
        paths: ["M14.2 16H1.8C1.36 16 1 15.64 1 15.2V6.11C1 5.9 1.08 5.69 1.23 5.54C1.38 5.39 1.57 5.3 1.8 5.31H4.87V3.84C4.87 3.57 5.01 3.32 5.23 3.17L7.19 1.89V0.8C7.2 0.36 7.56 0 8 0C8.44 0 8.8 0.36 8.8 0.8V1.88L10.76 3.16C10.99 3.31 11.12 3.56 11.12 3.83V5.93C11.13 5.99 11.14 6.05 11.14 6.11V8.33H14.19C14.4 8.33 14.61 8.41 14.76 8.56C14.91 8.71 14.99 8.91 14.99 9.13V15.19C14.99 15.63 14.63 15.99 14.19 15.99L14.2 16ZM11.12 14.4H13.4V12.97H11.12V14.4ZM2.6 14.4H4.87V12.97H2.6V14.4ZM6.47 14.39H9.52V12.97H6.47V14.39ZM11.12 11.37H13.4V9.94H11.12V11.37ZM6.47 11.37H9.52V9.95H6.47V11.38V11.37ZM2.6 11.37H4.87V9.94H2.6V11.37ZM6.47 8.34H9.52V6.92H6.47V8.34ZM2.6 8.34H4.87V6.91H2.6V8.34ZM6.47 5.32H9.52V4.27L8 3.28L6.47 4.27V5.32Z"]
    },
    LOCATION: {
        viewBox: "0 0 13 16",
        paths: ["M6.5 16C6.34 16 6.18 15.95 6.04 15.86C5.79 15.69 0 11.6 0 6.56C0 2.88 2.85 0 6.5 0C10.15 0 13 2.88 13 6.56C13 11.6 7.2 15.69 6.96 15.86C6.82 15.96 6.66 16 6.5 16ZM6.5 1.6C3.75 1.6 1.6 3.78 1.6 6.56C1.6 10.02 5.2 13.18 6.5 14.2C7.8 13.18 11.4 10.03 11.4 6.56C11.4 3.78 9.25 1.6 6.5 1.6ZM6.5 9.6C4.82 9.6 3.5 8.28 3.5 6.6C3.5 4.92 4.82 3.6 6.5 3.6C8.18 3.6 9.5 4.92 9.5 6.6C9.5 8.28 8.18 9.6 6.5 9.6ZM6.5 5.2C5.69 5.2 5.1 5.79 5.1 6.6C5.1 7.41 5.69 8 6.5 8C7.31 8 7.9 7.41 7.9 6.6C7.9 5.79 7.31 5.2 6.5 5.2Z"]
    },
    ARR: {
        viewBox: "0 0 16 16",
        paths: ["M1.58 14.6709C1.8 15.4709 2.52 16.0009 3.32 16.0009H3.33C3.49 16.0009 3.64 15.9809 3.8 15.9409L14.69 12.9409L14.6879 12.9334C15.4428 12.7193 16 12.0221 16 11.201V4.80098C16 4.19108 15.6926 3.6495 15.225 3.32353L14.69 1.33094C14.44 0.370937 13.45 -0.199063 12.49 0.0609368L1.48897 3.02806C0.645836 3.17649 0 3.91697 0 4.80098V11.201C0 11.9402 0.451562 12.579 1.09245 12.8552L1.58 14.6709ZM13.4783 3.00098L13.14 1.74094C13.11 1.64094 13 1.57094 12.9 1.60094L7.71381 3.00098H13.4783ZM8.45185 13.001H2.79168L3.13 14.2609C3.16 14.3609 3.27 14.4309 3.37 14.4009L8.45185 13.001ZM13 11.401H8.6V10.941C9.4 10.731 10 9.98098 10 9.04098C10 8.00098 9.16 7.16098 8.12 7.16098H7.88C7.72 7.16098 7.6 7.04098 7.6 6.88098C7.6 6.72098 7.73 6.60098 7.88 6.60098H9.2C9.64 6.60098 10 6.24098 10 5.80098C10 5.36098 9.64 5.00098 9.2 5.00098H9V4.60098H13C13 5.37098 13.63 6.00098 14.4 6.00098V10.001C13.63 10.001 13 10.631 13 11.401ZM7 11.401H3C3 10.631 2.37 10.001 1.6 10.001V6.00098C2.37 6.00098 3 5.37098 3 4.60098H7.4V5.06098C6.6 5.28098 6 6.01098 6 6.88098C6 7.92098 6.84 8.76098 7.88 8.76098H8.12C8.28 8.76098 8.4 8.88098 8.4 9.12098C8.4 9.28098 8.27 9.40098 8.12 9.40098H6.8C6.36 9.40098 6 9.76098 6 10.201C6 10.641 6.36 11.001 6.8 11.001H7V11.401Z"]
    },
    TIER: {
        viewBox: "0 0 16 16",
        paths: [
            "M7.995 16L8 16H7.99L7.995 16Z",
            "M6.5 10.7199C6.65 10.8999 6.87 10.9999 7.1 10.9999H7.12C7.36 10.9999 7.58 10.8899 7.73 10.7099L11.33 6.3099C11.61 5.9599 11.56 5.4599 11.22 5.1799C10.87 4.8999 10.37 4.9499 10.09 5.2899L7.09 8.9499L5.91 7.5899C5.62 7.2599 5.11 7.2199 4.78 7.5099C4.45 7.7999 4.41 8.3099 4.7 8.6399L6.5 10.7199Z",
            "M7.69 15.94C7.78849 15.9794 7.88696 15.9994 7.995 16C8.10303 15.9994 8.20152 15.9794 8.3 15.94L8.3075 15.9367C8.64932 15.7868 14.49 13.2258 14.49 8V2.4C14.49 2.04 14.26 1.73 13.91 1.63L8.21 0.03C8.07 -0.01 7.92 -0.01 7.78 0.03L2.08 1.63C1.74 1.73 1.5 2.04 1.5 2.4V8C1.5 13.2258 7.34068 15.7868 7.68251 15.9367L7.69 15.94ZM3.1 8V3.01L8 1.63L12.9 3.01V8C12.9 11.6 9.12 13.76 8 14.32C6.88 13.76 3.1 11.61 3.1 8Z"
        ]
    },
    HEALTH: {
        viewBox: "0 0 16 16",
        paths: ["M6.59999 8.79963V14.1996C6.59999 14.6396 6.23999 14.9996 5.79999 14.9996C5.35999 14.9996 4.99999 14.6396 4.99999 14.1996V8.79963C4.99999 8.35963 5.35999 7.99963 5.79999 7.99963C6.23999 7.99963 6.59999 8.35963 6.59999 8.79963ZM0.799992 11.9996C0.359992 11.9996 -7.62939e-06 12.3596 -7.62939e-06 12.7996V14.1996C-7.62939e-06 14.6396 0.359992 14.9996 0.799992 14.9996C1.23999 14.9996 1.59999 14.6396 1.59999 14.1996V12.7996C1.59999 12.3596 1.23999 11.9996 0.799992 11.9996ZM10.2 9.99963C9.75999 9.99963 9.39999 10.3596 9.39999 10.7996V14.1996C9.39999 14.6396 9.75999 14.9996 10.2 14.9996C10.64 14.9996 11 14.6396 11 14.1996V10.7996C11 10.3596 10.64 9.99963 10.2 9.99963ZM14.8 6.99963C14.36 6.99963 14 7.35963 14 7.79963V14.1996C14 14.6396 14.36 14.9996 14.8 14.9996C15.24 14.9996 15.6 14.6396 15.6 14.1996V7.79963C15.6 7.35963 15.24 6.99963 14.8 6.99963ZM15.45 3.46963C16.05 3.01963 16.18 2.15963 15.72 1.54963C15.27 0.939631 14.41 0.819631 13.81 1.26963C13.38 1.58963 13.21 2.10963 13.3 2.59963L10.6 5.32963C10.27 5.20963 9.87 5.22963 9.55 5.37963L6.97999 3.17963C6.86999 2.53963 6.30999 2.04963 5.62999 2.04963C4.87999 2.04963 4.25999 2.65963 4.25999 3.41963C4.25999 3.45963 4.25999 3.49963 4.25999 3.53963L1.39999 7.24963C0.639994 7.21963 -0.0100098 7.84963 -0.0100098 8.61963C-0.0100098 9.38963 0.599993 9.98963 1.35999 9.98963C2.11999 9.98963 2.72999 9.36963 2.72999 8.61963C2.72999 8.48963 2.70999 8.34963 2.66999 8.22963L5.33999 4.75963C5.62999 4.81963 5.95999 4.77963 6.22999 4.64963L8.77999 6.82963C8.87999 7.48963 9.44999 7.98963 10.13 7.98963C10.86 7.98963 11.46 7.40963 11.49 6.68963L14.43 3.71963C14.78 3.76963 15.14 3.68963 15.44 3.46963H15.45Z"]
    },
    RENEWAL: {
        viewBox: "0 0 14 16",
        paths: ["M11.6 2H11V0.8C11 0.36 10.64 0 10.2 0C9.76 0 9.4 0.36 9.4 0.8V2H4.6V0.8C4.6 0.36 4.24 0 3.8 0C3.36 0 3 0.36 3 0.8V2H2.4C1.08 2 0 3.08 0 4.4V13.6C0 14.92 1.08 16 2.4 16H11.6C12.92 16 14 14.92 14 13.6V4.4C14 3.08 12.92 2 11.6 2ZM2.4 3.6H3V4.2C3 4.64 3.36 5 3.8 5C4.24 5 4.6 4.64 4.6 4.2V3.6H9.4V4.2C9.4 4.64 9.76 5 10.2 5C10.64 5 11 4.64 11 4.2V3.6H11.6C12.04 3.6 12.4 3.96 12.4 4.4V6.4H1.6V4.4C1.6 3.96 1.96 3.6 2.4 3.6ZM11.6 14.4H2.4C1.96 14.4 1.6 14.04 1.6 13.6V8H12.4V13.6C12.4 14.04 12.04 14.4 11.6 14.4ZM3.53 12.29C3.32 12.29 3.11 12.21 2.97 12.06C2.82 11.91 2.74 11.7 2.74 11.49C2.74 11.28 2.82 11.07 2.97 10.92C3.27 10.62 3.8 10.62 4.1 10.92C4.25 11.07 4.33 11.27 4.33 11.49C4.33 11.71 4.25 11.91 4.1 12.06C3.95 12.21 3.75 12.29 3.53 12.29ZM10.2 12.29C9.99 12.29 9.78 12.21 9.63 12.06C9.48 11.91 9.4 11.7 9.4 11.49C9.4 11.28 9.49 11.07 9.63 10.92C9.93 10.62 10.46 10.62 10.76 10.92C10.91 11.07 10.99 11.27 10.99 11.49C10.99 11.71 10.9 11.91 10.76 12.06C10.61 12.21 10.41 12.29 10.2 12.29ZM7.52 13H6.48C5.94 13 5.5 12.56 5.5 12.02V10.98C5.5 10.44 5.94 10 6.48 10H7.52C8.06 10 8.5 10.44 8.5 10.98V12.02C8.5 12.56 8.06 13 7.52 13Z"]
    },
    OPEN_OPPS: {
        viewBox: "0 0 16 16",
        paths: [
            "M0.0100002 14.01C0.0300002 15.11 0.93 16 2.02 16H2.03V15.99H13.98C15.09 15.98 15.99 15.08 15.99 13.97V12.8C15.99 12.36 15.63 12 15.19 12C14.75 12 14.39 12.36 14.39 12.8V13.97C14.39 14.2 14.21 14.39 13.98 14.4H2.02C1.8 14.4 1.61 14.21 1.6 13.99V12.79C1.59 12.35 1.23 12 0.790001 12C0.350001 12.01 -0.00999977 12.37 0.0100002 12.81V14.01Z",
            "M7.61 11.48C7.61 12.31 8.28 12.98 9.11 12.98C9.94 12.98 10.61 12.31 10.61 11.48V11.44L13.66 9.74C13.9 9.91 14.19 10 14.5 10C15.33 10 16 9.33 16 8.5C16 7.67 15.33 7 14.5 7C13.75 7 13.13 7.55 13.02 8.27L9.72 10.11C9.51 10.02 9.28 9.98 9.04 9.99L6.6 6.93C6.65 6.79 6.67 6.64 6.67 6.49C6.67 5.66 6 4.99 5.17 4.99C4.34 4.99 3.67 5.66 3.67 6.49V6.63L1.97 8.08C1.82 8.03 1.66 8 1.5 8C0.67 8 0 8.67 0 9.5C0 10.33 0.65 11 1.48 11C2.31 11 2.98 10.33 2.98 9.4C2.98 9.46365 2.9773 9.43 2.97471 9.39764C2.97231 9.36769 2.97 9.33885 2.97 9.31L4.64 7.89C4.87 7.96 5.13 8 5.37 7.96L7.72 10.91C7.65 11.09 7.61 11.28 7.61 11.48Z",
            "M0 4.19C0 4.64 0.349999 5 0.799999 5C1.24 5 1.6 4.65 1.6 4.21L1.62 1.98C1.62 1.77 1.8 1.6 2.01 1.6H7.2C7.64 1.6 8 1.24 8 0.8C8 0.36 7.64 0 7.2 0H2.01C0.920002 0 0.0200005 0.88 0.0200005 1.97L0 4.19Z",
            "M15.56 1.84L14.06 1.62H14.04L13.44 0.3C13.26 -0.1 12.7 -0.1 12.52 0.3L11.92 1.62L10.42 1.84C10.02 1.9 9.85 2.4 10.13 2.7L11.22 3.86L10.96 5.4C10.88 5.82 11.33 6.14 11.7 5.93L12.99 5.2L14.28 5.93C14.65 6.14 15.09 5.82 15.02 5.4L14.76 3.86L15.85 2.7C16.14 2.4 15.97 1.9 15.56 1.84Z"
        ]
    },
    ACCT_MANAGER: {
        viewBox: "0 0 16 16",
        paths: ["M8.00003 16C6.02003 16 4.20003 15.28 2.81003 14.08C2.74003 14.03 2.67003 13.98 2.62003 13.91C1.01003 12.45 0.0100306 10.34 0.0100306 8C3.0607e-05 3.59 3.59003 0 8.00003 0C12.41 0 16 3.59 16 8C16 10.32 15.01 12.41 13.42 13.88C13.36 13.95 13.29 14.02 13.21 14.07C11.81 15.27 9.99003 16 8.00003 16ZM4.16003 13.12C5.23003 13.93 6.56003 14.4 8.00003 14.4C9.44003 14.4 10.77 13.92 11.85 13.11C11.49 12.21 10.59 11.6 9.61003 11.6H6.41003C5.88003 11.6 5.38003 11.76 4.97003 12.05C4.48003 12.4 4.26003 12.87 4.17003 13.11L4.16003 13.12ZM6.40003 10.01H9.60003C11.01 10.01 12.33 10.77 13.04 11.94C13.89 10.85 14.4 9.49 14.4 8C14.4 4.47 11.53 1.6 8.00003 1.6C4.47003 1.6 1.60003 4.47 1.60003 8C1.60003 9.48 2.11003 10.85 2.96003 11.93C3.23003 11.46 3.59003 11.06 4.03003 10.75C4.71003 10.26 5.53003 10 6.40003 10V10.01ZM8.00003 9.01C6.32003 9.01 5.00003 7.69 5.00003 6.01C5.00003 4.33 6.32003 3.01 8.00003 3.01C9.68003 3.01 11 4.33 11 6.01C11 7.69 9.68003 9.01 8.00003 9.01ZM8.00003 4.61C7.19003 4.61 6.60003 5.2 6.60003 6.01C6.60003 6.82 7.19003 7.41 8.00003 7.41C8.81003 7.41 9.40003 6.82 9.40003 6.01C9.40003 5.2 8.81003 4.61 8.00003 4.61Z"]
    },
    WARNING: {
        viewBox: "0 0 16 16",
        color: "#E78C07",
        paths: ["M15.77 12.4795L9.51 1.84945C8.84 0.719453 7.15999 0.719453 6.49999 1.84945L0.229994 12.4795C-0.430006 13.5995 0.399997 14.9995 1.74 14.9995H14.27C15.6 14.9995 16.44 13.5995 15.78 12.4795H15.77ZM6.99999 5.49945C6.99999 4.94945 7.45 4.49945 8 4.49945C8.55 4.49945 9 4.94945 9 5.49945V8.49945C9 9.04945 8.55 9.49945 8 9.49945C7.45 9.49945 6.99999 9.04945 6.99999 8.49945V5.49945ZM8.70999 12.7095C8.51999 12.8995 8.27 12.9995 8 12.9995C7.73 12.9995 7.47999 12.8895 7.28999 12.7095C7.09999 12.5295 6.99999 12.2695 6.99999 11.9995C6.99999 11.7295 7.10999 11.4795 7.28999 11.2895C7.65999 10.9195 8.32999 10.9195 8.69999 11.2895C8.88999 11.4795 8.98999 11.7395 8.98999 11.9995C8.98999 12.2595 8.87999 12.5195 8.69999 12.7095H8.70999Z"]
    },
    CHEVRON_RIGHT: {
        viewBox: "0 0 16 16",
        color: "currentColor",
        paths: ["M5.8 12.9997C5.59 12.9997 5.38 12.9197 5.22 12.7497C4.91 12.4297 4.93 11.9197 5.25 11.6197L9.04 7.99969L5.25 4.3797C4.93 4.0697 4.92 3.5697 5.22 3.2497C5.53 2.9297 6.03 2.9197 6.35 3.2197L10.75 7.41969C10.91 7.56969 11 7.7797 11 7.99969C11 8.21969 10.91 8.42969 10.75 8.57969L6.35 12.7797C6.2 12.9297 6 12.9997 5.8 12.9997Z"]
    },
    CHEVRON_LEFT: {
        viewBox: "0 0 16 16",
        color: "currentColor",
        paths: ["M10.2 12.9997C10 12.9997 9.8 12.9297 9.65 12.7797L5.25 8.57967C5.09 8.42967 5 8.21967 5 7.99967C5 7.77967 5.09 7.56967 5.25 7.41967L9.65 3.21967C9.97 2.90967 10.48 2.92967 10.78 3.24967C11.09 3.56967 11.07 4.07967 10.75 4.37967L6.96 7.99967L10.75 11.6197C11.07 11.9297 11.08 12.4297 10.78 12.7497C10.62 12.9097 10.41 12.9997 10.2 12.9997Z"]
    },
    MENU_DOTS: {
        viewBox: "0 0 16 16",
        color: "#6B778C",
        paths: [
            "M6.5 3.5C6.5 4.325 7.175 5 8 5C8.825 5 9.5 4.325 9.5 3.5C9.5 2.675 8.825 2 8 2C7.175 2 6.5 2.675 6.5 3.5ZM6.5 8C6.5 8.825 7.175 9.5 8 9.5C8.825 9.5 9.5 8.825 9.5 8C9.5 7.175 8.825 6.5 8 6.5C7.175 6.5 6.5 7.175 6.5 8ZM6.5 12.5C6.5 13.325 7.175 14 8 14C8.825 14 9.5 13.325 9.5 12.5C9.5 11.675 8.825 11 8 11C7.175 11 6.5 11.675 6.5 12.5Z"
        ]
    },
    HIDE_ALWAYS: {
        viewBox: "0 0 16 16",
        color: "#172B4D",
        paths: [
            "M15.2001 16.0005C15.0001 16.0005 14.7901 15.9205 14.6301 15.7705L11.7401 12.8805C10.4101 13.6405 9.18006 14.0105 8.00006 14.0105C4.90006 14.0105 2.24006 12.1305 0.11006 8.41055C-0.0399403 8.14055 -0.0299413 7.81055 0.150059 7.56055C1.24006 5.99055 2.18006 4.83055 2.97006 4.11055L0.230059 1.37055C-0.0799414 1.05055 -0.0799414 0.550547 0.230059 0.230547C0.550059 -0.0794531 1.05006 -0.0794531 1.37006 0.230547L15.7701 14.6305C16.0801 14.9405 16.0801 15.4505 15.7701 15.7605C15.6101 15.9205 15.4101 15.9905 15.2001 15.9905V16.0005ZM1.75006 8.04055C3.54006 10.9705 5.59006 12.4005 8.00006 12.4005C8.79006 12.4005 9.63006 12.1705 10.5601 11.6905L9.44006 10.5705C9.01006 10.8205 8.52006 10.9505 7.99006 10.9505C6.33006 10.9505 5.03006 9.65055 5.03006 7.99055C5.03006 7.47055 5.16006 6.97055 5.41006 6.54055L4.08006 5.21055C3.59006 5.65055 2.84006 6.48055 1.74006 8.02055L1.75006 8.04055ZM6.65006 7.79055C6.64006 7.86055 6.63006 7.93055 6.63006 8.00055C6.63006 8.79055 7.20006 9.36055 7.99006 9.36055C8.06006 9.36055 8.13006 9.36055 8.20006 9.34055L6.64006 7.78055L6.65006 7.79055ZM13.6801 11.0005C13.5001 11.0005 13.3201 10.9405 13.1801 10.8205C12.8401 10.5405 12.7801 10.0405 13.0601 9.69055C13.3501 9.33055 13.7501 8.75055 14.2601 7.95055C12.5201 5.02055 10.4601 3.59055 7.99006 3.59055C7.55006 3.59055 7.35006 3.62055 6.92006 3.69055C6.48006 3.76055 6.07006 3.47055 6.00006 3.04055C5.93006 2.60055 6.22006 2.19055 6.65006 2.12055C7.11006 2.04055 7.42006 1.99055 7.99006 1.99055C11.1601 1.99055 13.8201 3.87055 15.8901 7.58055C16.0301 7.83055 16.0201 8.15055 15.8701 8.39055C15.2001 9.46055 14.6901 10.2205 14.3001 10.6905C14.1401 10.8805 13.9101 10.9905 13.6801 10.9905V11.0005Z"
        ]
    },
    HIDE_HOUR: {
        viewBox: "0 0 16 16",
        color: "#172B4D",
        paths: [
            "M7.96777 4C9.10611 4 10.0923 4.6415 10.5892 5.58235C10.7669 5.9189 10.4975 6.28815 10.133 6.39763C9.71465 6.52328 9.21886 6.26499 8.89961 5.96693C8.65557 5.73907 8.32808 5.59961 7.96777 5.59961C7.2124 5.59964 6.59965 6.21238 6.59961 6.96777C6.59961 7.32809 6.73907 7.65557 6.96692 7.89961C7.26499 8.21887 7.52327 8.71466 7.39763 9.13297C7.28815 9.49749 6.91891 9.76694 6.58236 9.58919C5.6415 9.09228 5 8.10612 5 6.96777C5.00004 5.32873 6.32873 4.00003 7.96777 4Z",
            "M8.41211 1.01367C12.6388 1.29664 16 5.83754 16 7L15.9893 7.12305C15.9814 7.17357 15.9201 7.19341 15.8798 7.16195C15.4028 6.78977 14.8632 6.49433 14.2791 6.29461C14.0047 6.20078 13.7582 6.03596 13.5771 5.8094C13.2959 5.45761 12.9559 5.08387 12.5654 4.71973C11.266 3.50811 9.63902 2.59962 8 2.59961C6.36098 2.59961 4.73399 3.50812 3.43457 4.71973C2.80105 5.31049 2.29939 5.92576 1.96777 6.43262C1.75153 6.76316 1.75905 7.18645 1.98637 7.50949C1.98894 7.51315 1.99154 7.51682 1.99414 7.52051C2.35795 8.03497 2.902 8.65926 3.57031 9.26074C4.57401 10.1641 5.70017 10.8753 6.77913 11.2026C6.90987 11.2423 7 11.3634 7 11.5C7 12.1834 6.42938 12.8 5.79211 12.5531C2.64955 11.336 0 7.9766 0 7C0 5.8 3.58174 1 8 1L8.41211 1.01367Z",
            "M12 7.8A3.2 3.2 0 1 0 15.2 11 3.2 3.2 0 0 0 12 7.8zm.5 3.3l.5.5-.7.7-.5-.5V10h-1.4v1.4l.5.5.7-.7-.5-.5H12v-1h.5z"
        ]
    },
    AI_LINK: {
        viewBox: "0 0 24 24",
        color: "currentColor",
        paths: [
            "M12 2L14.4 9.6L22 12L14.4 14.4L12 22L9.6 14.4L2 12L9.6 9.6L12 2Z",
            "M18 4C16.8954 4 16 4.89543 16 6C16 7.10457 16.8954 8 18 8C19.1046 8 20 7.10457 20 6C20 4.89543 19.1046 4 18 4Z"
        ]
    },
    TICKET_ICON: {
        viewBox: "0 0 24 24",
        color: "#0052CC",
        paths: [
            "M4.355.522a.5.5 0 0 1 .623.333l.291.956A5 5 0 0 1 8 1c1.007 0 1.946.298 2.731.811l.29-.956a.5.5 0 1 1 .957.29l-.41 1.352A5 5 0 0 1 13 6h.5a.5.5 0 0 0 .5-.5V5a.5.5 0 0 1 1 0v.5A1.5 1.5 0 0 1 13.5 7H13v1h1.5a.5.5 0 0 1 0 1H13v1h.5a1.5 1.5 0 0 1 1.5 1.5v.5a.5.5 0 1 1-1 0v-.5a.5.5 0 0 0-.5-.5H13a5 5 0 0 1-10 0h-.5a.5.5 0 0 0-.5.5v.5a.5.5 0 1 1-1 0v-.5A1.5 1.5 0 0 1 2.5 10H3V9H1.5a.5.5 0 0 1 0-1H3V7h-.5A1.5 1.5 0 0 1 1 5.5V5a.5.5 0 0 1 1 0v.5a.5.5 0 0 0 .5.5H3c0-1.364.547-2.601 1.432-3.503l-.41-1.352a.5.5 0 0 1 .333-.623M4 7v4a4 4 0 0 0 3.5 3.97V7zm4.5 0v7.97A4 4 0 0 0 12 11V7zM12 6a4 4 0 0 0-1.334-2.982A3.98 3.98 0 0 0 8 2a3.98 3.98 0 0 0-2.667 1.018A4 4 0 0 0 4 6z"
        ]
    },
    CLOSE_X: {
        viewBox: "0 0 16 16",
        color: "#556B82",
        paths: [
            "M12.2 4.86C12.51 4.55 12.51 4.05 12.2 3.74C11.89 3.43 11.39 3.43 11.08 3.74L8 6.88L4.92 3.74C4.61 3.43 4.11 3.43 3.8 3.74C3.49 4.05 3.49 4.55 3.8 4.86L6.88 8L3.8 11.14C3.49 11.45 3.49 11.95 3.8 12.26C4.11 12.57 4.61 12.57 4.92 12.26L8 9.12L11.08 12.26C11.39 12.57 11.89 12.57 12.2 12.26C12.51 11.95 12.51 11.45 12.2 11.14L9.12 8L12.2 4.86Z"
        ]
    },
    FOLLOWUP_SPARKLE: {
        viewBox: "0 0 16 16",
        color: "#1677FF",
        paths: [
            "M7.5 1L9.3 6.7L15 8.5L9.3 10.3L7.5 16L5.7 10.3L0 8.5L5.7 6.7L7.5 1Z",
            "M12.5 2C12.5 2.828 13.172 3.5 14 3.5C14.828 3.5 15.5 2.828 15.5 2C15.5 1.172 14.828 0.5 14 0.5C13.172 0.5 12.5 1.172 12.5 2Z"
        ]
    },
    SEND_PLANE: {
        viewBox: "0 0 16 16",
        color: "#FFFFFF",
        paths: [
            "M14.7 1.3C14.5 1.1 14.2 1 13.9 1.1L1.4 5.5C1 5.6 0.8 6 0.8 6.3C0.8 6.7 1.1 7 1.4 7.1L6.5 8.8L10.3 5L11 5.7L7.2 9.5L8.9 14.6C9 14.9 9.3 15.2 9.7 15.2C10.1 15.2 10.4 14.9 10.5 14.6L14.9 2.1C15 1.8 14.9 1.5 14.7 1.3Z"
        ]
    },
    JIRA_ASSIGNEE: {
        viewBox: "0 0 16 16",
        color: "#556B82",
        paths: ["M8.00003 16C6.02003 16 4.20003 15.28 2.81003 14.08C2.74003 14.03 2.67003 13.98 2.62003 13.91C1.01003 12.45 0.0100306 10.34 0.0100306 8C3.0607e-05 3.59 3.59003 0 8.00003 0C12.41 0 16 3.59 16 8C16 10.32 15.01 12.41 13.42 13.88C13.36 13.95 13.29 14.02 13.21 14.07C11.81 15.27 9.99003 16 8.00003 16ZM4.16003 13.12C5.23003 13.93 6.56003 14.4 8.00003 14.4C9.44003 14.4 10.77 13.92 11.85 13.11C11.49 12.21 10.59 11.6 9.61003 11.6H6.41003C5.88003 11.6 5.38003 11.76 4.97003 12.05C4.48003 12.4 4.26003 12.87 4.17003 13.11L4.16003 13.12ZM6.40003 10.01H9.60003C11.01 10.01 12.33 10.77 13.04 11.94C13.89 10.85 14.4 9.49 14.4 8C14.4 4.47 11.53 1.6 8.00003 1.6C4.47003 1.6 1.60003 4.47 1.60003 8C1.60003 9.48 2.11003 10.85 2.96003 11.93C3.23003 11.46 3.59003 11.06 4.03003 10.75C4.71003 10.26 5.53003 10 6.40003 10V10.01ZM8.00003 9.01C6.32003 9.01 5.00003 7.69 5.00003 6.01C5.00003 4.33 6.32003 3.01 8.00003 3.01C9.68003 3.01 11 4.33 11 6.01C11 7.69 9.68003 9.01 8.00003 9.01ZM8.00003 4.61C7.19003 4.61 6.60003 5.2 6.60003 6.01C6.60003 6.82 7.19003 7.41 8.00003 7.41C8.81003 7.41 9.40003 6.82 9.40003 6.01C9.40003 5.2 8.81003 4.61 8.00003 4.61Z"]
    },
    JIRA_DUE_DATE: {
        viewBox: "0 0 16 16",
        color: "#556B82",
        paths: [
            "M12.4 2H11.8V0.8C11.8 0.36 11.44 0 11 0C10.56 0 10.2 0.36 10.2 0.8V2H5.8V0.8C5.8 0.36 5.44 0 5 0C4.56 0 4.2 0.36 4.2 0.8V2H3.6C2.28 2 1.2 3.08 1.2 4.4V13.6C1.2 14.92 2.28 16 3.6 16H12.4C13.72 16 14.8 14.92 14.8 13.6V4.4C14.8 3.08 13.72 2 12.4 2ZM13.2 13.6C13.2 14.04 12.84 14.4 12.4 14.4H3.6C3.16 14.4 2.8 14.04 2.8 13.6V7H13.2V13.6ZM13.2 5.4H2.8V4.4C2.8 3.96 3.16 3.6 3.6 3.6H4.2V4.2C4.2 4.64 4.56 5 5 5C5.44 5 5.8 4.64 5.8 4.2V3.6H10.2V4.2C10.2 4.64 10.56 5 11 5C11.44 5 11.8 4.64 11.8 4.2V3.6H12.4C12.84 3.6 13.2 3.96 13.2 4.4V5.4Z"
        ]
    },
    JIRA_BUCKET: {
        viewBox: "0 0 14 16",
        color: "#556B82",
        paths: ["M6.55418 0C7.95036 0 9.29614 0.522335 10.3266 1.46387C11.2918 2.34579 11.9156 3.53588 12.0932 4.8252H12.3384C12.4491 4.82534 12.559 4.84931 12.6596 4.89551C12.7602 4.9417 12.8501 5.00896 12.9223 5.09277C12.9945 5.1766 13.0479 5.27562 13.0786 5.38184C13.1016 5.46146 13.1122 5.54451 13.1089 5.62695L13.1001 5.70996L11.7768 14.5244C11.715 14.9348 11.5075 15.3093 11.1929 15.5801C10.8782 15.8508 10.4771 15.9998 10.062 16H3.04539C2.63045 15.9996 2.229 15.8507 1.91453 15.5801C1.60026 15.3094 1.39337 14.9345 1.33152 14.5244L0.00828048 5.70996C-0.00811413 5.60047 7.22202e-05 5.48821 0.0307414 5.38184C0.0615149 5.27557 0.114809 5.17661 0.186991 5.09277C0.259216 5.00896 0.349158 4.9417 0.449687 4.89551C0.55016 4.84946 0.659478 4.82537 0.769999 4.8252H1.01609C1.19374 3.53593 1.81666 2.34578 2.78172 1.46387C3.81218 0.522291 5.15801 6.44264e-05 6.55418 0ZM2.85496 14.2939L2.87644 14.3594C2.88739 14.3792 2.90297 14.3971 2.92039 14.4121C2.95529 14.442 3.0003 14.458 3.04637 14.458H10.062C10.108 14.4579 10.1531 14.4421 10.188 14.4121C10.2229 14.382 10.2456 14.3395 10.2524 14.2939L11.4429 6.36719H1.66551L2.85496 14.2939ZM6.5532 1.54688C5.55708 1.54706 4.59619 1.91423 3.85398 2.57812C3.19261 3.16976 2.74683 3.96009 2.57957 4.8252H10.5288C10.3615 3.96016 9.91566 3.16975 9.25437 2.57812C8.51197 1.91401 7.54963 1.54688 6.5532 1.54688Z"]
    },
    SNOW_PRIORITY: {
        viewBox: "0 0 16 16",
        color: "#556B82",
        paths: ["M3.24997 2C3.66413 2.00006 3.99997 2.33583 3.99997 2.75V11.4395L5.21969 10.2197C5.51259 9.92695 5.98738 9.92688 6.28023 10.2197C6.57303 10.5126 6.57298 10.9874 6.28023 11.2803L3.78024 13.7803C3.49896 14.0616 3.00097 14.0615 2.7197 13.7803L0.2197 11.2803C-0.073165 10.9874 -0.0731387 10.5126 0.2197 10.2197C0.512607 9.92696 0.987397 9.92687 1.28024 10.2197L2.49997 11.4395V2.75C2.49997 2.33579 2.83575 2 3.24997 2ZM15.2499 12.5C15.6641 12.5001 15.9999 12.8358 15.9999 13.25C15.9999 13.6642 15.6641 13.9999 15.2499 14H9.74996C9.33574 14 8.99996 13.6642 8.99996 13.25C8.99996 12.8358 9.33574 12.5 9.74996 12.5H15.2499ZM15.2499 9C15.6641 9.00006 15.9999 9.33583 15.9999 9.75C15.9999 10.1642 15.6641 10.4999 15.2499 10.5H9.74996C9.33574 10.5 8.99996 10.1642 8.99996 9.75C8.99996 9.33579 9.33574 9 9.74996 9H15.2499ZM15.2499 5.5C15.6641 5.50006 15.9999 5.83583 15.9999 6.25C15.9999 6.66417 15.6641 6.99994 15.2499 7H9.74996C9.33574 7 8.99996 6.66421 8.99996 6.25C8.99996 5.83579 9.33574 5.5 9.74996 5.5H15.2499ZM15.2499 2C15.6641 2.00006 15.9999 2.33583 15.9999 2.75C15.9999 3.16417 15.6641 3.49994 15.2499 3.5H9.74996C9.33574 3.5 8.99996 3.16421 8.99996 2.75C8.99996 2.33579 9.33574 2 9.74996 2H15.2499Z"]
    },
    SNOW_IMPACT: {
        viewBox: "0 0 16 16",
        color: "#616F8F",
        paths: [
            "M11.8825 5.06035C12.0007 4.94214 12.1701 4.89083 12.3341 4.92361L13.3803 5.13286C13.5442 5.16564 13.7137 5.11435 13.8319 4.99618L15.3391 3.48935C15.6216 3.20698 15.4753 2.72376 15.0837 2.64545L13.9696 2.4227C13.7716 2.38312 13.6169 2.22838 13.5773 2.03043L13.3545 0.916341C13.2762 0.524701 12.793 0.378417 12.5107 0.660869L11.0038 2.16812C10.8856 2.28633 10.8344 2.45578 10.8671 2.61968L11.0764 3.66593C11.1092 3.82986 11.0579 3.99933 10.9397 4.11754L7.21549 7.84171C7.02022 8.03698 7.02022 8.35356 7.21549 8.54882L7.45118 8.78451C7.64644 8.97978 7.96302 8.97978 8.15829 8.78451L11.8825 5.06035Z",
            "M5.22265 3.05313C6.32072 2.63847 7.51277 2.55662 8.65102 2.81181C8.92048 2.87222 9.2008 2.72781 9.28345 2.46433L9.38322 2.14628C9.46587 1.88279 9.31953 1.60042 9.05103 1.53592C7.62701 1.19388 6.12885 1.28568 4.75161 1.80578C3.21801 2.38492 1.92293 3.46164 1.07353 4.86373C0.224139 6.26581 -0.130509 7.91227 0.0663209 9.53973C0.26315 11.1671 1.00009 12.6816 2.15925 13.8407C3.31841 14.9999 4.83283 15.7369 6.46028 15.9337C8.08773 16.1305 9.7342 15.7759 11.1363 14.9265C12.5383 14.0771 13.6151 12.782 14.1942 11.2484C14.7143 9.87116 14.8061 8.373 14.4641 6.94897C14.3996 6.68045 14.1172 6.53411 13.8537 6.61677L13.5356 6.71654C13.2721 6.79919 13.1277 7.07953 13.1882 7.34899C13.4434 8.48722 13.3615 9.67924 12.9469 10.7773C12.4731 12.0319 11.5923 13.0913 10.4454 13.7861C9.29847 14.4809 7.95167 14.771 6.62037 14.61C5.28909 14.449 4.05027 13.8461 3.10206 12.8979C2.15384 11.9497 1.55102 10.7109 1.39001 9.3796C1.229 8.04833 1.51911 6.70153 2.21393 5.55459C2.90875 4.40766 3.96814 3.52688 5.22265 3.05313Z",
            "M6.20614 6.25221C6.57226 6.08039 6.97067 5.99517 7.37081 6.00021C7.64693 6.00369 7.91183 5.8339 7.96679 5.56329L8.03314 5.23663C8.08811 4.96601 7.91308 4.69874 7.63772 4.67798C6.95402 4.62642 6.2655 4.75151 5.63972 5.04517C4.86239 5.40994 4.22323 6.0154 3.81693 6.77187C3.41063 7.52833 3.2588 8.39553 3.38393 9.245C3.50907 10.0945 3.90451 10.8811 4.51167 11.4883C5.11884 12.0955 5.90543 12.4909 6.75493 12.616C7.6044 12.7411 8.47167 12.5893 9.22807 12.183C9.98453 11.7767 10.59 11.1375 10.9548 10.3602C11.2484 9.73443 11.3735 9.04593 11.322 8.36225C11.3012 8.08687 11.0339 7.91183 10.7633 7.9668L10.4367 8.03314C10.166 8.08811 9.99625 8.35299 9.99973 8.62911C10.0048 9.02926 9.91956 9.42767 9.74773 9.7938C9.50467 10.3118 9.10127 10.7377 8.5972 11.0084C8.09313 11.2791 7.51527 11.3803 6.94927 11.2969C6.38319 11.2135 5.85906 10.9501 5.45449 10.5455C5.04991 10.1409 4.78641 9.61673 4.70303 9.05073C4.61965 8.48467 4.72082 7.9068 4.99155 7.40273C5.26228 6.89873 5.68817 6.49527 6.20614 6.25221Z"
        ]
    },
    JIRA_STATUS: {
        viewBox: "0 0 16 16",
        color: "#556B82",
        paths: [
            "M11.25 0C12.2165 6.44266e-08 13 0.783502 13 1.75V4.75C13 5.16421 12.6642 5.5 12.25 5.5C11.8358 5.5 11.5 5.16421 11.5 4.75V1.75C11.5 1.61193 11.3881 1.5 11.25 1.5H6.70996C6.63716 1.5 6.56799 1.53176 6.52051 1.58691L6 2.19336V5.25C6 5.66421 5.66421 6 5.25 6H2.76L2.5 6.37012V15.25C2.5 15.6642 2.16421 16 1.75 16C1.33579 16 1 15.6642 1 15.25V6.37012C1 5.95256 1.14927 5.54856 1.4209 5.23145L5.38086 0.611328C5.71333 0.223448 6.19909 0 6.70996 0H11.25Z",
            "M7.71973 11.2197C8.01262 10.9268 8.48738 10.9268 8.78027 11.2197C9.07317 11.5126 9.07317 11.9874 8.78027 12.2803L7.56055 13.5L8.78027 14.7197C9.07317 15.0126 9.07317 15.4874 8.78027 15.7803C8.48738 16.0732 8.01262 16.0732 7.71973 15.7803L6.5 14.5605L5.28027 15.7803C4.98738 16.0732 4.51262 16.0732 4.21973 15.7803C3.92683 15.4874 3.92683 15.0126 4.21973 14.7197L5.43945 13.5L4.21973 12.2803C3.92683 11.9874 3.92683 11.5126 4.21973 11.2197C4.51262 10.9268 4.98738 10.9268 5.28027 11.2197L6.5 12.4395L7.71973 11.2197Z",
            "M14.25 12.5C14.6642 12.5 15 12.8358 15 13.25C15 13.6642 14.6642 14 14.25 14H11.75C11.3358 14 11 13.6642 11 13.25C11 12.8358 11.3358 12.5 11.75 12.5H14.25Z",
            "M8.68066 5.26172C8.95025 4.94737 9.42384 4.91114 9.73828 5.18066C10.0526 5.45025 10.0889 5.92384 9.81934 6.23828L6.81934 9.73828C6.68339 9.8968 6.487 9.99101 6.27832 9.99902C6.06972 10.0069 5.86734 9.92789 5.71973 9.78027L4.21973 8.28027C3.92683 7.98738 3.92683 7.51262 4.21973 7.21973C4.51262 6.92683 4.98738 6.92683 5.28027 7.21973L6.20703 8.14648L8.68066 5.26172Z",
            "M14.25 7.5C14.6642 7.5 15 7.83579 15 8.25C15 8.66421 14.6642 9 14.25 9H11.75C11.3358 9 11 8.66421 11 8.25C11 7.83579 11.3358 7.5 11.75 7.5H14.25Z"
        ]
    },
    INVOICE: {
        viewBox: "0 0 24 24",
        paths: [
            "M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"
        ]
    },
    HOURGLASS: {
        viewBox: "0 0 16 16",
        color: "#1C2D3E",
        paths: [
            "M3.5 1C3.22 1 3 1.22 3 1.5C3 1.78 3.22 2 3.5 2H4V3.5C4 5.16 5.04 6.58 6.5 7.18V8.82C5.04 9.42 4 10.84 4 12.5V14H3.5C3.22 14 3 14.22 3 14.5C3 14.78 3.22 15 3.5 15H12.5C12.78 15 13 14.78 13 14.5C13 14.22 12.78 14 12.5 14H12V12.5C12 10.84 10.96 9.42 9.5 8.82V7.18C10.96 6.58 12 5.16 12 3.5V2H12.5C12.78 2 13 1.78 13 1.5C13 1.22 12.78 1 12.5 1H3.5ZM11 3.5C11 5.16 9.66 6.5 8 6.5C6.34 6.5 5 5.16 5 3.5V2H11V3.5ZM5 12.5C5 10.84 6.34 9.5 8 9.5C9.66 9.5 11 10.84 11 12.5V14H5V12.5Z"
        ]
    },
    ACTIVITY_CLIPBOARD: {
        viewBox: "0 0 24 24",
        color: "currentColor",
        paths: [
            "M13.875 0C15.3247 0 16.5 1.17525 16.5 2.625V3H18.375C19.8247 3 21 4.17525 21 5.625V7.875C21 8.49632 20.4963 9 19.875 9C19.2537 9 18.75 8.49632 18.75 7.875V5.625C18.75 5.41789 18.5821 5.25 18.375 5.25H16.4707C16.2886 6.52192 15.1973 7.5 13.875 7.5H10.125C8.8027 7.5 7.71142 6.52192 7.5293 5.25H5.625C5.41789 5.25 5.25 5.41789 5.25 5.625V21.375C5.25 21.5821 5.41789 21.75 5.625 21.75H9.375C9.99632 21.75 10.5 22.2537 10.5 22.875C10.5 23.4963 9.99632 24 9.375 24H5.625C4.17525 24 3 22.8247 3 21.375V5.625C3 4.17525 4.17525 3 5.625 3H7.5V2.625C7.5 1.17525 8.67525 0 10.125 0H13.875ZM15 21C15.8284 21 16.5 21.6716 16.5 22.5C16.5 23.3284 15.8284 24 15 24C14.1716 24 13.5 23.3284 13.5 22.5C13.5 21.6716 14.1716 21 15 21ZM22.875 21C23.4963 21 24 21.5037 24 22.125C24 22.7463 23.4963 23.25 22.875 23.25H19.125C18.5037 23.25 18 22.7463 18 22.125C18 21.5037 18.5037 21 19.125 21H22.875ZM15 16.5C15.8284 16.5 16.5 17.1716 16.5 18C16.5 18.8284 15.8284 19.5 15 19.5C14.1716 19.5 13.5 18.8284 13.5 18C13.5 17.1716 14.1716 16.5 15 16.5ZM22.875 16.5C23.4963 16.5 24 17.0037 24 17.625C24 18.2463 23.4963 18.75 22.875 18.75H19.125C18.5037 18.75 18 18.2463 18 17.625C18 17.0037 18.5037 16.5 19.125 16.5H22.875ZM15 12C15.8284 12 16.5 12.6716 16.5 13.5C16.5 14.3284 15.8284 15 15 15C14.1716 15 13.5 14.3284 13.5 13.5C13.5 12.6716 14.1716 12 15 12ZM22.875 12C23.4963 12 24 12.5037 24 13.125C24 13.7463 23.4963 14.25 22.875 14.25H19.125C18.5037 14.25 18 13.7463 18 13.125C18 12.5037 18.5037 12 19.125 12H22.875ZM10.125 2.25C9.91789 2.25 9.75 2.41789 9.75 2.625V4.875C9.75 5.08211 9.91789 5.25 10.125 5.25H13.875C14.0821 5.25 14.25 5.08211 14.25 4.875V2.625C14.25 2.41789 14.0821 2.25 13.875 2.25H10.125Z"
        ]
    },
    EXTERNAL_LINK: {
        viewBox: "0 0 12 12",
        color: "currentColor",
        paths: [
            "M9 9.6H2.4V3H5.7V1.8H2.4C1.74 1.8 1.2 2.34 1.2 3V9.6C1.2 10.26 1.74 10.8 2.4 10.8H9C9.66 10.8 10.2 10.26 10.2 9.6V6.3H9V9.6ZM6.9 1.8V3H8.55L3.84 7.71L4.69 8.56L9.4 3.85V5.5H10.6V1.8H6.9Z"
        ]
    },
    SAP_PERSON: {
        viewBox: "0 0 24 24",
        color: "currentColor",
        paths: [
            "M19.8 22.4999H4.2C3.54 22.4999 3 21.9599 3 21.2999V19.7999C3 16.3349 5.04 13.3349 7.965 11.9399C6.75 10.8449 6 9.25485 6 7.49985C6 5.74485 6.78 4.04985 8.13 2.90985C9.495 1.76985 11.295 1.28985 13.065 1.58985C15.51 2.02485 17.49 4.01985 17.895 6.41985C18.195 8.20485 17.715 10.0049 16.575 11.3549C16.395 11.5649 16.215 11.7599 16.02 11.9249C18.96 13.3199 20.985 16.3199 20.985 19.7848V21.2848C20.985 21.9448 20.445 22.4848 19.785 22.4848L19.8 22.4999ZM5.4 20.0998H18.6V19.7999C18.6 16.3199 15.78 13.4999 12.3 13.4999H11.7C8.22 13.4999 5.4 16.3199 5.4 19.7999V20.0998ZM12 3.89985C11.145 3.89985 10.335 4.18485 9.675 4.73985C8.865 5.42985 8.4 6.43485 8.4 7.49985C8.4 9.47985 10.02 11.0999 12 11.0999C13.065 11.0999 14.07 10.6349 14.76 9.82485C15.45 8.99985 15.735 7.93485 15.555 6.83985C15.315 5.39985 14.13 4.22985 12.675 3.95985C12.45 3.91485 12.24 3.89985 12.015 3.89985H12Z"
        ]
    }
};

module.exports = { ICONS: ICONS };






/***/ }),

/***/ 250:
/***/ (function(module) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

'use strict';
// providerIcons.js — base64 provider logo constants shared across balloon views

var CUSTOMER_ICON_B64 = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAYAAADDPmHLAAAACXBIWXMAACxLAAAsSwGlPZapAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAT/SURBVHgB7d1bThtJFAbgv4zz7h2MkWKkeXNWMM4KhscZ7NE0KwBWAKwAzwowmhjlLc4KQlYQ3hJhIsgOeMgTblM51e3EIJFLdXe17T7/J3ERwhfov93V1XWOASIiIiIiIiLSwoDmeuMOLPblv9KWrw1UicGN/E3nsPYEpxuD+Y8p1b04ln9HBB36GLb23DcMgNMdH8nnXahiBhg+3WYAti4iGHMMjQye16BdzfwLrWS8wwBYGfDp1WYAULHRvp8GA6AcA6AcA6AcA6AcA6BcHeTHzalD5tT9NPxPN+21TFBd+9xi9hheZzUMgC93QWXYeu51m39kttF6zjbWaof4/+nA5yZyMeuNPL+Oz014CFCOAVCOAVCOAVCOAVCOAVCOAVCOAVCOAVCOAVDu4aLQKq+Lp0fNA6BrXTzNpBeD0nXxEUgdo3pdPMkgUPO6eJIA6F4Xr547DeRoXzHOAyjHACjHACjHACjHACjnvyw827r45eW5jJp1AVnWxS+z7th6/T7rAqhKGADlGADlGADlGADlGADlGADlGADlGADlGADljPdUKHBW2FRwdNXAbbwjz6Ijc6xNeTrN2bNKe9sDr/GkPsJg/Rqh+P/9lbKYHkHRVROT+Fg+OvPKhHs1KmlRSif5mMRH6F4O8GTtMGgQlCr/END7uIM4fgf4XLSwkQThHf7+oKynf3jlBqA33oe962csO2ugtnaELbkPKkx5AXB7vsUB8jJyH91L1jIUpJwAuGM+7g5QGNtP75PyKicAk+l+wdXG7uzhCJRb+AAke6oM4opmsJmcRlIu4QMwiTcRym3Ms4KcwgfA4E+EYvAHKJfwAQhafGqaoFzKGAQGPE676WPKg+3iffH9AnzJHwLTRBg3KBvrAjz5pthPdSqUFqSMMcBbhPMalEv4ANTrfYQyjUegXMIHYLB+IwOnMxTODPDy92tQLuVcC4jjbRQ5YHMj8enkEJRbOQFI99TiNtid3ePeX4zy1gMMW33Zc/OHwMp9nG4MQIUod0XQi9aBfN5DlsNBslDUbOM0uQ8qSPlrAt0rwTR+JrvyyS/fxpiRjCOe4dRzYoR+ajFTwenxO8Jf7w+wVt+cXTG816L+2zToW3yW08jRevkzfkosti5gGSivC2BlkHIMgHIMgHIMgHIMgHIMgHIMgHIMgHIMgHIMgHIMgHKsC/DFugDlKlYXED4AroQ7jtuzdP4mu1DxpWLGfpL7d4tPz/GidQb6ZeEC8PWt6NONf2+jB7j6au997Y3dyqGRhOKEYfi54geBbsN3k5eiN3CdwGzI4tBHJI9no+Txt8av2Ermx4oLgHupd29D/3XDLwPXRWQSX7Gz2PcVE4C08aPb8MvZsSPpLDZmT6FH5A9AsvGnbuMv+7uQ76J76TcSVyB/AFzL15Vp1CBjA74SPJAvAL3k2NrBatlNBqqUyB4A99JfROfPRXCTMmwxl8geANf8cWXJIYst5hLZAhCq+WOZjGG/YWQNwO2kg5UnrwIcC2QMQK0ie8/dyg1gC5elNMxdDq3IAMpdbvU+hc1wOdg0MzzOOXyrqA3avlPvRnttnHZcEaQcA6AcA6AcA6AcA6CcCwDbr+h1U0sWUpJW5+4VgB03tbL2pJaunPVo2UbVYO1/ruHm/B2be5d9+eEOSAHZ4YcbkfvOPPj51kU0u9DTLn05N4U1L2k7ZL0EERERERERkU5fALNUkam+uXYYAAAAAElFTkSuQmCC';

var SNOW_ICON_B64 = 'data:image/svg+xml;base64,PHN2ZyBwcmVzZXJ2ZUFzcGVjdFJhdGlvPSJub25lIiB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBvdmVyZmxvdz0idmlzaWJsZSIgc3R5bGU9ImRpc3BsYXk6IGJsb2NrOyIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8ZyBpZD0iVmVjdG9yIj4KPHBhdGggaWQ9IlZlY3Rvcl8yIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGNsaXAtcnVsZT0iZXZlbm9kZCIgZD0iTTEyLjA3MTUgMS41MDAyQzUuNDk1MzMgMS40NjI0OCAwLjA1NjIzOTYgNi44NDIyOSAwLjAwMDU1NTM4NSAxMy40NDM2Qy0wLjAxNTM3MjkgMTUuMTAxNiAwLjMxMTQ3MyAxNi43NDUgMC45NjA1OTMgMTguMjcwN0MxLjYwOTcxIDE5Ljc5NjUgMi41NjcxIDIxLjE3MTYgMy43NzI3MSAyMi4zMDk5QzQuMTgzNTggMjIuNzAyNSA0LjcyMTUzIDIyLjkzNDggNS4yODkwMSAyMi45NjQ4QzUuODU2NDggMjIuOTk0OCA2LjQxNTkyIDIyLjgyMDUgNi44NjU4OCAyMi40NzM0QzguMzM3IDIxLjM0NjQgMTAuMTQ0OCAyMC43NDc4IDExLjk5NzggMjAuNzc0MUMxMy44NTIzIDIwLjc0NzEgMTUuNjYxNyAyMS4zNDY0IDE3LjEzMzMgMjIuNDc1MkMxNy41ODc3IDIyLjgyMyAxOC4xNTE5IDIyLjk5NjIgMTguNzIzMSAyMi45NjMyQzE5LjI5NDQgMjIuOTMwMyAxOS44MzQ5IDIyLjY5MzMgMjAuMjQ2MyAyMi4yOTU2QzIxLjk4NjYgMjAuNjQyOSAyMy4xOTM5IDE4LjUwODQgMjMuNzEzOCAxNi4xNjU0QzI0LjIzMzcgMTMuODIyNCAyNC4wNDIzIDExLjM3NzYgMjMuMTY0MyA5LjE0NEMyMi4yODYyIDYuOTEwNDEgMjAuNzYxNSA0Ljk4OTc1IDE4Ljc4NTIgMy42Mjc5OEMxNi44MDkgMi4yNjYyMSAxNC40NzEzIDEuNTI1MzIgMTIuMDcxNSAxLjUwMDJWMS41MDAyWk0xMS45OTc4IDE5LjU2ODhDOC40MzU4MiAxOS41Njg4IDUuOTk4MjggMTYuODg1MiA1Ljk5ODI4IDEzLjU2OTNDNS45OTgyOCAxMC4yNTM0IDguNDM5NDEgNy41MjMwNyAxMS45OTc4IDcuNTIzMDdDMTUuNTU2MiA3LjUyMzA3IDE3Ljk5NzMgMTAuMjQ5OCAxNy45OTczIDEzLjU2OTNDMTcuOTk3MyAxNi44ODg4IDE1LjU2MTYgMTkuNTY4OCAxMS45OTc4IDE5LjU2ODgiIGZpbGw9InZhcigtLWZpbGwtMCwgIzgxQjVBMSkiLz4KPC9nPgo8L3N2Zz4=';

var JIRA_ICON_B64 = 'data:image/svg+xml;base64,PHN2ZyBoZWlnaHQ9IjI1MDAiIHByZXNlcnZlQXNwZWN0UmF0aW89InhNaWRZTWlkIiB3aWR0aD0iMjUwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmlld0JveD0iMCAtMzAuNjMyMzg4NTE2NTEwMjMzIDI1NS4zMjQgMjg1Ljk1NjM4ODUxNjUxMDIzIj48bGluZWFyR3JhZGllbnQgaWQ9ImEiPjxzdG9wIG9mZnNldD0iLjE4IiBzdG9wLWNvbG9yPSIjMDA1MmNjIi8+PHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjMjY4NGZmIi8+PC9saW5lYXJHcmFkaWVudD48bGluZWFyR3JhZGllbnQgaWQ9ImIiIHgxPSI5OC4wMzElIiB4Mj0iNTguODg4JSIgeGxpbms6aHJlZj0iI2EiIHkxPSIuMTYxJSIgeTI9IjQwLjc2NiUiLz48bGluZWFyR3JhZGllbnQgaWQ9ImMiIHgxPSIxMDAuNjY1JSIgeDI9IjU1LjQwMiUiIHhsaW5rOmhyZWY9IiNhIiB5MT0iLjQ1NSUiIHkyPSI0NC43MjclIi8+PHBhdGggZD0iTTI0NC42NTggMEgxMjEuNzA3YTU1LjUwMiA1NS41MDIgMCAwIDAgNTUuNTAyIDU1LjUwMmgyMi42NDlWNzcuMzdjLjAyIDMwLjYyNSAyNC44NDEgNTUuNDQ3IDU1LjQ2NiA1NS40NjdWMTAuNjY2QzI1NS4zMjQgNC43NzcgMjUwLjU1IDAgMjQ0LjY1OCAweiIgZmlsbD0iIzI2ODRmZiIvPjxwYXRoIGQ9Ik0xODMuODIyIDYxLjI2Mkg2MC44NzJjLjAxOSAzMC42MjUgMjQuODQgNTUuNDQ3IDU1LjQ2NiA1NS40NjdoMjIuNjQ5djIxLjkzOGMuMDM5IDMwLjYyNSAyNC44NzcgNTUuNDMgNTUuNTAyIDU1LjQzVjcxLjkzYzAtNS44OTEtNC43NzYtMTAuNjY3LTEwLjY2Ny0xMC42Njd6IiBmaWxsPSJ1cmwoI2IpIi8+PHBhdGggZD0iTTEyMi45NTEgMTIyLjQ4OUgwYzAgMzAuNjUzIDI0Ljg1IDU1LjUwMiA1NS41MDIgNTUuNTAyaDIyLjcydjIxLjg2N2MuMDIgMzAuNTk3IDI0Ljc5OCA1NS40MDggNTUuMzk2IDU1LjQ2NlYxMzMuMTU2YzAtNS44OTEtNC43NzYtMTAuNjY3LTEwLjY2Ny0xMC42Njd6IiBmaWxsPSJ1cmwoI2MpIi8+PC9zdmc+';

var SAP_ICON_B64 = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI3MCIgaGVpZ2h0PSI3MCIgdmlld0JveD0iMCAwIDcwIDcwIiBmaWxsPSJub25lIj48ZyBjbGlwLXBhdGg9InVybCgjY2xpcDBfNjc4Nl8xNjkzKSI+PHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0xLjk0NDQ2IDUyLjVIMzUuOTUzTDY5LjIzNTEgMTcuNUgxLjk0NDQ2VjUyLjVaIiBmaWxsPSJ1cmwoI3BhaW50MF9saW5lYXJfNjc4Nl8xNjkzKSIvPjxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgY2xpcC1ydWxlPSJldmVub2RkIiBkPSJNNDEuODgwNiAyNC40OTkzSDM1LjIzNDlMMzUuMjU3MSA0MC45MzM3TDI5LjQ3MDEgMjQuNDkzOEgyMy43MzJMMTguNzkyMSAzOC4yMjM5QzE4LjI2NjggMzQuNzMwMiAxNC44MzE1IDMzLjUyNDYgMTIuMTI4NSAzMi42MjE2QzEwLjM0MzYgMzIuMDE4OCA4LjQ0OTA5IDMxLjEzMjIgOC40NjgzMyAzMC4xNTIyQzguNDgzMTIgMjkuMzQ3OSA5LjQ4MTc2IDI4LjYwMjEgMTEuNDY2NSAyOC43MTMzQzEyLjc5OCAyOC43ODg3IDEzLjk3NDIgMjguOTAxNSAxNi4zMTM5IDMwLjA4OTlMMTguNjE0NSAyNS44NzQ0QzE2LjQ4MTEgMjQuNzMyNiAxMy41MzExIDI0LjAxMTYgMTEuMTEyMSAyNC4wMDkzSDExLjA5NzNDOC4yNzY3NCAyNC4wMDkzIDUuOTI4MDggMjQuOTY5OCA0LjQ3MjI4IDI2LjU1MjZDMy40NTczNyAyNy42NTcxIDIuOTA5OTYgMjkuMDYxNyAyLjg4Nzc3IDMwLjYxNDlDMi44NTA3OCAzMi43NTIzIDMuNTk1NyAzNC4yNjc0IDUuMTYwOTcgMzUuNDc4NEM2LjQ4MzYyIDM2LjQ5NzMgOC4xNzUzOSAzNy4xNTg0IDkuNjY1OTYgMzcuNjQzN0MxMS41MDQyIDM4LjI0MjYgMTMuMDA1OSAzOC43NjM3IDEyLjk4NzQgMzkuODcyOEMxMi45NzI2IDQwLjI3NzMgMTIuODI3NiA0MC42NTUzIDEyLjU1MDkgNDAuOTYwMkMxMi4wOTIzIDQxLjQ1NzkgMTEuMzg5NSA0MS42NDQ2IDEwLjQxNjggNDEuNjY0OEM4LjU0MDA4IDQxLjcwNjggNy4xNDkzOCA0MS4zOTY1IDQuOTMzMTQgNDAuMDE5MUwyLjg4NjI5IDQ0LjI4OTFDNS4xMDAzMiA0NS42MTI4IDcuNDUwNDUgNDYuMjc3MSAxMC4xMjA5IDQ2LjI3NzFMMTAuNzIxNiA0Ni4yNzI0QzEzLjA0NTggNDYuMjI4MSAxNC45MzIxIDQ1LjY0MjQgMTYuNDMwOCA0NC4zNzQ2QzE2LjUxNjYgNDQuMzAyMyAxNi41OTM2IDQ0LjIyOTIgMTYuNjczNSA0NC4xNTUzTDE2LjQyMiA0NS41MTc5TDIyLjAyOTEgNDUuNDk5M0wyMy4wMzUyIDQyLjc5MTFDMjQuMDkzIDQzLjE3MDYgMjUuMjk1OCA0My4zODA2IDI2LjU3MjYgNDMuMzgwNkMyNy44MTY4IDQzLjM4MDYgMjguOTg3MSA0My4xODE1IDMwLjAyNDkgNDIuODIzN0wzMC43MjYyIDQ1LjQ5OTNMNDAuNzg2NiA0NS41MDk0TDQwLjgxMSAzOS4zMzU0SDQyLjk1MThDNDguMTI2MiAzOS4zMzU0IDUxLjE4NSAzNi41NjY1IDUxLjE4NSAzMS45MjMyQzUxLjE4MzUgMjYuNzUxNyA0OC4yMDk4IDI0LjQ5OTMgNDEuODgwNiAyNC40OTkzWk0yNi41NzI2IDM4LjU0NzVDMjUuNzk5NiAzOC41NDc1IDI1LjA3NDYgMzguNDA1OSAyNC40NTEgMzguMTU3MUwyNi41NDg5IDMxLjE5MjFIMjYuNTg5NkwyOC42NTM1IDM4LjE3NjVDMjguMDMyMSAzOC40MDk4IDI3LjMyNDIgMzguNTQ3NSAyNi41NzE4IDM4LjU0NzVIMjYuNTcyNlpNNDIuMjY5NyAzNC41NDU4SDQwLjgwOTVWMjguOTMyNkg0Mi4yNzA1QzQ0LjIxNiAyOC45MzI2IDQ1Ljc2OTQgMjkuNjEzOSA0NS43Njk0IDMxLjcwMzFDNDUuNzY4IDMzLjg2NTMgNDQuMjE2IDM0LjU0NTggNDIuMjcwNSAzNC41NDU4IiBmaWxsPSJ3aGl0ZSIvPjwvZz48ZGVmcz48bGluZWFyR3JhZGllbnQgaWQ9InBhaW50MF9saW5lYXJfNjc4Nl8xNjkzIiB4MT0iMzUuNTg5OCIgeTE9IjE3LjUiIHgyPSIzNS41ODk4IiB5Mj0iNTIuNTAwOCIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiPjxzdG9wIHN0b3AtY29sb3I9IiMwMEFFRUYiLz48c3RvcCBvZmZzZXQ9IjAuMjEyIiBzdG9wLWNvbG9yPSIjMDA5N0RDIi8+PHN0b3Agb2Zmc2V0PSIwLjUxOSIgc3RvcC1jb2xvcj0iIzAwN0NDNSIvPjxzdG9wIG9mZnNldD0iMC43OTIiIHN0b3AtY29sb3I9IiMwMDZDQjgiLz48c3RvcCBvZmZzZXQ9IjEiIHN0b3AtY29sb3I9IiMwMDY2QjMiLz48L2xpbmVhckdyYWRpZW50PjxjbGlwUGF0aCBpZD0iY2xpcDBfNjc4Nl8xNjkzIj48cmVjdCB3aWR0aD0iNzAiIGhlaWdodD0iNzAiIGZpbGw9IndoaXRlIi8+PC9jbGlwUGF0aD48L2RlZnM+PC9zdmc+';

var SF_ICON_B64 = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxNiIgaGVpZ2h0PSIxNiIgdmlld0JveD0iMCAwIDE2IDE2IiBmaWxsPSJub25lIj48cGF0aCBkPSJNNi43OTA0NiA0LjMwMjY3QzcuMjU1NzUgMy44MjA2NCA3LjkwNDAzIDMuNTE2MTYgOC42MTg4OSAzLjUxNjE2QzkuNTcxODQgMy41MTYxNiAxMC4zOTc1IDQuMDQ4MDMgMTAuODQwNiA0LjgzNDcyQzExLjIyMjkgNC42NjMwMiAxMS42NDk1IDQuNTY4NzkgMTIuMDk4MiA0LjU2ODc5QzEzLjgxNTggNC41Njg3OSAxNS4yMDA4IDUuOTcwNDggMTUuMjAwOCA3LjY5OTIzQzE1LjIwMDggOS40Mjc5NyAxMy44MTAyIDEwLjgyOTMgMTIuMDk4MiAxMC44MjkzQzExLjg4NzkgMTAuODI5MyAxMS42ODI3IDEwLjgwNzEgMTEuNDg4OCAxMC43NjgzQzExLjEwMSAxMS40NjA4IDEwLjM1ODUgMTEuOTMxOSA5LjUwNTA2IDExLjkzMTlDOS4xNTA3NSAxMS45MzE5IDguODEyNTkgMTEuODQ4OCA4LjUxMzM3IDExLjcwNDdDOC4xMjAxMiAxMi42MyA3LjIwMDI2IDEzLjI4MzYgNi4xMzA4OSAxMy4yODM2QzUuMDE3MzMgMTMuMjgzNiA0LjA2NDM4IDEyLjU4IDMuNjk4NTggMTEuNTg3OUMzLjUzNjMyIDExLjYyMTIgMy4zNzEwOSAxMS42Mzc5IDMuMjA1NDUgMTEuNjM3OEMxLjg3NTggMTEuNjM3OCAwLjgwMDc4MSAxMC41NTE5IDAuODAwNzgxIDkuMjA1NDZDMC44MDA3ODEgOC4zMDk5MyAxLjI4MjgxIDcuNTIxMDkgMi4wMDMxMiA3LjFDMS44NTM2IDYuNzYyMDQgMS43NzA0OCA2LjM4NTUzIDEuNzcwNDggNS45ODY0NEMxLjc2NTQxIDQuNDUyMzcgMy4wMjMwNCAzLjIwMDIgNC41NjI5NSAzLjIwMDJDNC45OTQxMyAzLjE5OTQ3IDUuNDE5NjIgMy4yOTg2NCA1LjgwNjA1IDMuNDg5OTFDNi4xOTI0OSAzLjY4MTE5IDYuNTI5MzYgMy45NTkzOCA2Ljc5MDI3IDQuMzAyNjciIGZpbGw9IiMwMEExRTAiLz48L3N2Zz4=';

module.exports = {
    CUSTOMER_ICON_B64: CUSTOMER_ICON_B64,
    SNOW_ICON_B64: SNOW_ICON_B64,
    JIRA_ICON_B64: JIRA_ICON_B64,
    SAP_ICON_B64: SAP_ICON_B64,
    SF_ICON_B64: SF_ICON_B64
};



/***/ }),

/***/ 144:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

'use strict';

var log = (__webpack_require__(52)/* .log */ .R);
var SF_SCHEMA = (__webpack_require__(497).SF_SCHEMA);

var ICON_JIRA = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 -30.632 255.324 285.956" fill="none"><defs><linearGradient id="jb"><stop offset=".18" stop-color="#0052cc"/><stop offset="1" stop-color="#2684ff"/></linearGradient><linearGradient id="jc" x1="98.031%" x2="58.888%" y1=".161%" y2="40.766%"><stop offset=".18" stop-color="#0052cc"/><stop offset="1" stop-color="#2684ff"/></linearGradient><linearGradient id="jd" x1="100.665%" x2="55.402%" y1=".455%" y2="44.727%"><stop offset=".18" stop-color="#0052cc"/><stop offset="1" stop-color="#2684ff"/></linearGradient></defs><path d="M244.658 0H121.707a55.502 55.502 0 0 0 55.502 55.502h22.649V77.37c.02 30.625 24.841 55.447 55.466 55.467V10.666C255.324 4.777 250.55 0 244.658 0z" fill="#2684ff"/><path d="M183.822 61.262H60.872c.019 30.625 24.84 55.447 55.466 55.467h22.649v21.938c.039 30.625 24.877 55.43 55.502 55.43V71.93c0-5.891-4.776-10.667-10.667-10.667z" fill="url(#jc)"/><path d="M122.951 122.489H0c0 30.653 24.85 55.502 55.502 55.502h22.72v21.867c.02 30.597 24.798 55.408 55.396 55.466V133.156c0-5.891-4.776-10.667-10.667-10.667z" fill="url(#jd)"/></svg>';
var ICON_SNOW = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"><path fill-rule="evenodd" clip-rule="evenodd" d="M12.0715 1.5002C5.49533 1.46248 0.0562396 6.84229 0.000555385 13.4436C-0.0153729 15.1016 0.311473 16.745 0.960593 18.2707C1.60971 19.7965 2.5671 21.1716 3.77271 22.3099C4.18358 22.7025 4.72153 22.9348 5.28901 22.9648C5.85648 22.9948 6.41592 22.8205 6.86588 22.4734C8.337 21.3464 10.1448 20.7478 11.9978 20.7741C13.8523 20.7471 15.6617 21.3464 17.1333 22.4752C17.5877 22.823 18.1519 22.9962 18.7231 22.9632C19.2944 22.9303 19.8349 22.6933 20.2463 22.2956C21.9866 20.6429 23.1939 18.5084 23.7138 16.1654C24.2337 13.8224 24.0423 11.3776 23.1643 9.144C22.2862 6.91041 20.7615 4.98975 18.7852 3.62798C16.809 2.26621 14.4713 1.52532 12.0715 1.5002V1.5002ZM11.9978 19.5688C8.43582 19.5688 5.99828 16.8852 5.99828 13.5693C5.99828 10.2534 8.43941 7.52307 11.9978 7.52307C15.5562 7.52307 17.9973 10.2498 17.9973 13.5693C17.9973 16.8888 15.5616 19.5688 11.9978 19.5688" fill="#81B5A1"/></svg>';
var ICON_SF = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M6.79046 4.30267C7.25575 3.82064 7.90403 3.51616 8.61889 3.51616C9.57184 3.51616 10.3975 4.04803 10.8406 4.83472C11.2229 4.66302 11.6495 4.56879 12.0982 4.56879C13.8158 4.56879 15.2008 5.97048 15.2008 7.69923C15.2008 9.42797 13.8102 10.8293 12.0982 10.8293C11.8879 10.8293 11.6827 10.8071 11.4888 10.7683C11.101 11.4608 10.3585 11.9319 9.50506 11.9319C9.15075 11.9319 8.81259 11.8488 8.51337 11.7047C8.12012 12.63 7.20026 13.2836 6.13089 13.2836C5.01733 13.2836 4.06438 12.58 3.69858 11.5879C3.53632 11.6212 3.37109 11.6379 3.20545 11.6378C1.8758 11.6378 0.800781 10.5519 0.800781 9.20546C0.800781 8.30993 1.28281 7.52109 2.00312 7.1C1.8536 6.76204 1.77048 6.38553 1.77048 5.98644C1.76541 4.45237 3.02304 3.2002 4.56295 3.2002C4.99413 3.19947 5.41962 3.29864 5.80605 3.48991C6.19249 3.68119 6.52936 3.95938 6.79027 4.30267" fill="#00A1E0"/></svg>';
var ICON_SAP = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M8 14.5l-1.1-1C3.4 10.4 1 8.2 1 5.5 1 3.4 2.6 1.5 5 1.5c1.3 0 2.3.6 3 1.4.7-.8 1.7-1.4 3-1.4 2.4 0 4 1.9 4 4 0 2.7-2.4 4.9-5.9 8l-1.1 1z" stroke="#F0AB00" stroke-width="1.8" fill="none"/></svg>';

var INTEGRATIONS = [
    { name: 'jira', displayName: 'Jira', icon: ICON_JIRA },
    { name: 'servicenow', displayName: 'Service Now', icon: ICON_SNOW },
    { name: 'salesforce', displayName: 'Salesforce', icon: ICON_SF },
    { name: 'successfactors', displayName: 'Success Factors', icon: ICON_SAP }
];

var INTEGRATION_SKILLS = {
    jira: ['searchJira'],
    servicenow: ['getServiceNowTickets', 'getOpenSnowTickets'],
    successfactors: ['getSuccessFactorsEmployees']
};

function IntegrationRunner(skills, aiFetcher, config, sfBridge) {
    if (!(this instanceof IntegrationRunner)) return new IntegrationRunner(skills, aiFetcher, config, sfBridge);
    this._skills = skills;
    this._aiFetcher = aiFetcher;
    this._config = config;
    this._sfBridge = sfBridge || null;
}

IntegrationRunner.INTEGRATIONS = INTEGRATIONS;

IntegrationRunner.prototype._callLLM = function (prompt, schema, funcName) {
    var llmRequestBody = {
        stream: false,
        as_text: true,
        temperature: 0,
        max_tokens: 2000,
        messages: [{ role: 'system', content: prompt }]
    };
    if (schema) {
        llmRequestBody.response_format = { type: 'json_schema', json_schema: schema };
    } else {
        llmRequestBody.response_format = { type: 'json_object' };
    }
    var funcToRun = funcName || 'freePromptMini';
    return this._aiFetcher.sendCustomLlmRequest(llmRequestBody, funcToRun)
        .then(function (response) {
            try {
                if (typeof response === 'object') return response;
                if (typeof response === 'string') {
                    var clean = response.replace(/^```json\s*/i, '').replace(/^```\s*/i, '').replace(/```\s*$/, '');
                    return JSON.parse(clean);
                }
                return {};
            } catch (e) {
                log('[SmartHighlights] JSON Parse Error: ' + e.message);
                return {};
            }
        });
};

IntegrationRunner.prototype._buildIntentPrompt = function (integrationName, userPrompt, skillDescriptions, userContext) {
    return 'You are a skill-routing assistant for the "' + integrationName + '" integration.\n' +
        '\n' +
        '## Task\n' +
        'Given the user\'s question, pick the BEST matching skill and extract parameter values from the question and the additional context (if provided).\n' +
        '\n' +
        '## Available Skills\n' +
        skillDescriptions.join('\n') + '\n' +
        '\n' +
        '## Rules\n' +
        '1. Pick exactly ONE skill — the one whose description best matches the user\'s intent.\n' +
        '2. Extract parameter values from the user\'s question AND the additional context. Do not invent values.\n' +
        '3. Arrays must be JSON arrays even if there is only one value, e.g. ["EUX-123"].\n' +
        '4. Strings must be plain strings, not arrays.\n' +
        '5. Ticket keys/numbers should be extracted exactly as the user wrote them (preserve casing and format).\n' +
        '6. If the user mentions a person by name, use their full name as-is.\n' +
        '7. If the user\'s question contains a pronoun like "this", "it", "that" and the additional context contains a ticket key, name, or identifier, use the value from the context.\n' +
        '\n' +
        '## Examples\n' +
        '\n' +
        'User (servicenow): "What is the status of INC0012345?"\n' +
        '{"skill":"getServiceNowTickets","params":{"keys":["INC0012345"]}}\n' +
        '\n' +
        'User (servicenow): "Show me John Smith\'s open tickets"\n' +
        '{"skill":"getOpenSnowTickets","params":{"userName":"John Smith"}}\n' +
        '\n' +
        'User (salesforce): "Look up the account for Acme Corp"\n' +
        '{"skill":"getSalesforceAccounts","params":{"companyNames":["Acme Corp"]}}\n' +
        '\n' +
        'User (salesforce): "What is the status of case 00012345?"\n' +
        '{"skill":"getSalesforceCases","params":{"keys":["00012345"]}}\n' +
        '\n' +
        'User (successfactors): "Find Jane Doe in SuccessFactors"\n' +
        '{"skill":"getSuccessFactorsEmployees","params":{"names":["Jane Doe"]}}\n' +
        '\n' +
        (userContext ? '## Additional Context\nThe user is currently viewing or has highlighted the following:\n' + userContext + '\n\n' : '') +
        '## User Question\n' +
        '"' + userPrompt + '"\n' +
        '\n' +
        'Return ONLY the JSON object with "skill" and "params". No explanation.';
};

IntegrationRunner.prototype._buildAnswerPrompt = function (integrationName, userPrompt, contextStr, userContext, isPartial) {
    var prompt = 'You are a concise assistant that answers questions using ' + integrationName + ' data.\n' +
        '\n' +
        '## Rules\n' +
        '1. Answer ONLY based on the provided data. Do not make up information.\n' +
        '2. Be concise for simple questions (1-3 sentences). For lists or tables, use as much space as needed to show the data.\n' +
        '3. If the data does not contain enough information to answer, say so clearly.\n' +
        '4. Use specific values from the data (names, dates, statuses) — don\'t be vague.\n' +
        '5. Do not repeat the question back. Just answer it.\n' +
        '6. Prefer to use highly structured Markdown format when you can and when it is suitable for the response.\n' +
        '7. CRITICAL: for Jira info, The retrieved data has ALREADY been filtered by a precise search query. Every item in the data is a valid match. Do NOT re-filter, re-interpret, or exclude ANY items. For example, if the user asks for "open" tickets and the data contains tickets with status "In Progress", "Pending input from Support", or "Return to Dev", those are ALL considered open — the search query already excluded closed ones. Count and present ALL items in the data.\n' +
        '8. If the data is marked as PARTIAL (more results exist beyond what is shown): If the user asked for a specific small number (e.g. "10 most recent"), just give them that number without mentioning partial results. Otherwise, tell the user the results are partial and show the 5 most recent with their key details.\n' +
        '\n' +
        '## Examples\n' +
        '\n' +
        'Question: "Who is assigned to EUX-123?"\n' +
        'Data: [{"title":"EUX-123","subtitle":"Fix login bug","rows":[{"label":"Assignee","value":"Sarah Connor"},...]}]\n' +
        '{"answer":"**EUX-123** is assigned to **Sarah Connor**."}\n' +
        '\n' +
        'Question: "Show me 3 most recent open bugs"\n' +
        'Data: [{"key":"EUX-101","summary":"Login crash","status":"Open","assignee":"Alice"},{"key":"EUX-99","summary":"Timeout on save","status":"Open","assignee":"Bob"},{"key":"EUX-95","summary":"Broken export","status":"Open","assignee":"Carol"},...]\n' +
        '{"answer":"Here are the 3 most recent open bugs:\\n\\n| Ticket | Summary | Status | Assignee |\\n|---|---|---|---|\\n| **EUX-101** | Login crash | Open | Alice |\\n| **EUX-99** | Timeout on save | Open | Bob |\\n| **EUX-95** | Broken export | Open | Carol |"}\n' +
        '\n' +
        'Question: "Summarize INC0012345"\n' +
        'Data: [{"title":"INC0012345","subtitle":"VPN not connecting","rows":[{"label":"Status","value":"In Progress"},{"label":"Priority","value":"High"},{"label":"Assignee","value":"IT Support"}]}]\n' +
        '{"answer":"**INC0012345** — VPN connectivity issue\\n- **Status:** In Progress\\n- **Priority:** High\\n- **Assignee:** IT Support"}\n' +
        '\n';
    if (userContext) {
        prompt += '## Additional Context\n' + userContext + '\n\n';
    }
    prompt += '## User Question\n' +
        '"' + userPrompt + '"\n' +
        '\n' +
        '## Retrieved Data\n';
    if (isPartial) {
        prompt += '[PARTIAL RESULTS — more than 100 matching items exist. Only the most recent 100 are provided below.]\n';
    }
    prompt += contextStr + '\n' +
        '\n' +
        'Return ONLY a JSON object: {"answer":"<your concise answer>"}';
    return prompt;
};

// Build a compact schema prompt describing each SF object and its available fields.
// With potentially 200 fields per object we stay token-efficient by listing field names
// and their one-line descriptions in a single line per object.
IntegrationRunner.prototype._buildSoqlSchemaPrompt = function (userPrompt, schema) {
    var objectLines = [];
    var objectNames = Object.keys(schema);
    for (var i = 0; i < objectNames.length; i++) {
        var objName = objectNames[i];
        var obj = schema[objName];
        var fieldNames = Object.keys(obj.fields);
        var fieldDescPairs = [];
        for (var f = 0; f < fieldNames.length; f++) {
            fieldDescPairs.push(fieldNames[f] + ' (' + obj.fields[fieldNames[f]] + ')');
        }
        objectLines.push(
            '### ' + objName + '\n' +
            'Description: ' + obj.description + '\n' +
            'Fields: ' + fieldDescPairs.join(', ')
        );
    }

    return 'You are a Salesforce SOQL query planner.\n' +
        '\n' +
        '## Task\n' +
        'Given the user\'s question and the Salesforce object schema below, decide which objects to query and which fields to return. Also provide filter values extracted from the user\'s question.\n' +
        '\n' +
        '## Rules\n' +
        '1. Pick only the objects that are necessary to answer the question.\n' +
        '2. Pick only the fields that are relevant — do not include all fields.\n' +
        '3. Always include the "Id" field for every object.\n' +
        '4. For each filter, provide the exact Salesforce API field name, the operator ("LIKE", "=", "!=", "IN"), and the value. Do not invent values — extract them from the user\'s question.\n' +
        '5. Use "LIKE" for name/text searches, "=" for exact IDs or numbers, "!=" to exclude a value, "IN" when there are multiple values.\n' +
        '6. If no filter value can be extracted from the question for a field, omit the filter entirely.\n' +
        '7. To find cases for a specific company always filter Case by Account_Formula__c with operator "=" and the exact company name.\n' +
        '8. When listing cases for an account, always add a second filter on Status with operator "!=" and value "Resolved" to avoid returning hundreds of records — unless the user explicitly asks for closed/resolved cases.\n' +
        '9. For single-record lookups use limit 1. For list queries (e.g. "show me cases", "list tickets") use limit 50. Default is 10.\n' +
        '\n' +
        '## Available Salesforce Objects\n' +
        objectLines.join('\n\n') + '\n' +
        '\n' +
        '## Output format\n' +
        'Return ONLY a JSON object:\n' +
        '{\n' +
        '  "queries": [\n' +
        '    {\n' +
        '      "table": "<ObjectApiName>",\n' +
        '      "fields": ["Field1", "Field2"],\n' +
        '      "filters": [{ "field": "<FieldName>", "operator": "LIKE|=|!=|IN", "value": "<extracted value>" }],\n' +
        '      "limit": <number>\n' +
        '    }\n' +
        '  ]\n' +
        '}\n' +
        '\n' +
        '## Examples\n' +
        '\n' +
        'User: "What is the ARR and health score for Acme Corp?"\n' +
        '{"queries":[{"table":"Account","fields":["Id","Name","Account_ARR_Bucket__c","Account_Health_Score__c"],"filters":[{"field":"Name","operator":"LIKE","value":"Acme Corp"}],"limit":1}]}\n' +
        '\n' +
        'User: "What is the status of case 00012345?"\n' +
        '{"queries":[{"table":"Case","fields":["Id","CaseNumber","Subject","Current_Status__c","Priority","Owner_Name__c"],"filters":[{"field":"CaseNumber","operator":"=","value":"00012345"}],"limit":1}]}\n' +
        '\n' +
        'User: "Show me open cases for Parexel International"\n' +
        '{"queries":[{"table":"Case","fields":["Id","CaseNumber","Subject","Current_Status__c","Priority","Owner_Name__c","CreatedDate"],"filters":[{"field":"Account_Formula__c","operator":"=","value":"Parexel International"},{"field":"Status","operator":"!=","value":"Resolved"}],"limit":50}]}\n' +
        '\n' +
        'User: "Show me account details and open cases for Globex"\n' +
        '{"queries":[{"table":"Account","fields":["Id","Name","Account_ARR_Bucket__c","Account_Health_Score__c","Next_Renewal_Date__c"],"filters":[{"field":"Name","operator":"LIKE","value":"Globex"}],"limit":1},{"table":"Case","fields":["Id","CaseNumber","Subject","Current_Status__c","Priority","Owner_Name__c"],"filters":[{"field":"Account_Formula__c","operator":"=","value":"Globex"},{"field":"Status","operator":"!=","value":"Resolved"}],"limit":50}]}\n' +
        '\n' +
        'User: "What is the adoption score and health for Acme Corp?"\n' +
        '{"queries":[{"table":"Success__c","fields":["Id","Name","Adoption_Score__c","Total_Health_Score__c","ai_score__c","Customer_Stage__c"],"filters":[{"field":"Account_Name__c","operator":"LIKE","value":"Acme Corp"}],"limit":5}]}\n' +
        '\n' +
        '## User Question\n' +
        '"' + userPrompt + '"\n' +
        '\n' +
        'Return ONLY the JSON object. No explanation.';
};

// Build a SOQL string from a single query spec returned by the LLM.
// { table, fields, filters: [{ field, operator, value }] }
IntegrationRunner.prototype._buildSoqlFromQuery = function (query) {
    var table = query.table;
    var fields = (query.fields && query.fields.length) ? query.fields : ['Id'];
    // Always include Id
    if (fields.indexOf('Id') === -1) fields = ['Id'].concat(fields);

    var selectClause = 'SELECT ' + fields.join(', ') + ' FROM ' + table;

    var whereParts = [];
    var filters = query.filters || [];
    for (var i = 0; i < filters.length; i++) {
        var f = filters[i];
        if (!f.field || f.value === undefined || f.value === null || f.value === '') continue;
        var op = (f.operator || 'LIKE').toUpperCase();
        var val = String(f.value);
        var condition;
        if (op === 'LIKE') {
            // Wrap in % wildcards if not already present
            var escaped = val.replace(/'/g, "\\'");
            var likeVal = (val.indexOf('%') === -1) ? '%' + escaped + '%' : escaped;
            condition = f.field + " LIKE '" + likeVal + "'";
        } else if (op === 'IN') {
            // Expect comma-separated values or an array
            var inVals = Array.isArray(f.value) ? f.value : val.split(',');
            var quoted = [];
            for (var v = 0; v < inVals.length; v++) {
                quoted.push("'" + String(inVals[v]).trim().replace(/'/g, "\\'") + "'");
            }
            condition = f.field + ' IN (' + quoted.join(', ') + ')';
        } else if (op === '!=') {
            var neVal = val.replace(/'/g, "\\'");
            condition = f.field + " != '" + neVal + "'";
        } else {
            // = or anything else — use exact match
            var eVal = val.replace(/'/g, "\\'");
            condition = f.field + " = '" + eVal + "'";
        }
        whereParts.push(condition);
    }

    var limit = (query.limit && query.limit > 0) ? Math.min(query.limit, 200) : 10;
    var soql = selectClause;
    if (whereParts.length) soql += ' WHERE ' + whereParts.join(' AND ');
    soql += ' LIMIT ' + limit;
    return soql;
};

// Full orchestration for the schema-based Salesforce SOQL path.
IntegrationRunner.prototype._runSoqlIntegration = function (prompt, userContext) {
    var self = this;
    if (!self._sfBridge) return Promise.reject(new Error('sfBridge not provided to IntegrationRunner'));

    var schemaPrompt = self._buildSoqlSchemaPrompt(prompt, SF_SCHEMA);
    log('[SmartHighlights] runSoqlIntegration prompt="' + prompt + '"');

    return self._callLLM(schemaPrompt, null, self._config.llm.nerFunction).then(function (intent) {
        if (!intent || !Array.isArray(intent.queries) || !intent.queries.length) {
            return Promise.reject(new Error('LLM did not return valid queries'));
        }

        var soqls = [];
        for (var i = 0; i < intent.queries.length; i++) {
            soqls.push(self._buildSoqlFromQuery(intent.queries[i]));
        }

        log('[SmartHighlights] runSoqlIntegration executing ' + soqls.length + ' queries: ' + soqls.join(' | '));

        var fetchPromises = [];
        for (var j = 0; j < soqls.length; j++) {
            fetchPromises.push(
                self._sfBridge.fetchSoql(soqls[j]).then(function (data) {
                    if (!data || data.isError) return [];
                    if (data.needsAuth) return [{ needsAuth: true }];
                    return Array.isArray(data) ? data : [];
                })
            );
        }

        return Promise.all(fetchPromises).then(function (results) {
            var combined = {};
            for (var r = 0; r < results.length; r++) {
                var table = intent.queries[r].table;
                combined[table] = results[r];
            }

            var contextStr = JSON.stringify(combined, null, 2);
            var answerPrompt = self._buildAnswerPrompt('Salesforce', prompt, contextStr, userContext);
            return self._callLLM(answerPrompt, null, self._config.llm.judgeFunction).then(function (res) {
                return res.answer || 'No answer could be generated.';
            });
        });
    });
};

IntegrationRunner.prototype._getJiraContext = function () {
    var entities = this._config.entities || [];
    for (var i = 0; i < entities.length; i++) {
        if (entities[i].type === 'jira_ticket' && entities[i].providerConfig && entities[i].providerConfig.jiraContext) {
            return entities[i].providerConfig.jiraContext;
        }
    }
    return null;
};

IntegrationRunner.prototype._buildJqlPrompt = function (userPrompt, jiraContext, userContext) {
    var projectList = '';
    if (jiraContext && jiraContext.projects && jiraContext.projects.length) {
        projectList = jiraContext.projects.map(function (p) { return p.key + ' (' + p.name + ')'; }).join(', ');
    }
    var issueTypes = (jiraContext && jiraContext.issueTypes) ? jiraContext.issueTypes.join(', ') : 'Bug, Story, Task, Epic, Sub-task';
    var priorities = (jiraContext && jiraContext.priorities) ? jiraContext.priorities.join(', ') : 'Highest, High, Medium, Low, Lowest';
    var statuses = (jiraContext && jiraContext.statuses) ? jiraContext.statuses.join(', ') : 'Open, In Progress, Done, Closed, Resolved';
    var labels = (jiraContext && jiraContext.labels && jiraContext.labels.length) ? jiraContext.labels.join(', ') : 'none configured';
    var ticketPattern = (jiraContext && jiraContext.ticketPattern) ? jiraContext.ticketPattern : 'PROJECT-NUMBER (e.g. EUX-123)';

    return 'You are a Jira JQL query builder. Given a user\'s question about Jira tickets, you must output a JSON object that will be used to fetch the right data.\n' +
        '\n' +
        '## Output Format\n' +
        'Return ONLY a JSON object, no explanation. Three possible formats:\n' +
        '1. To look up specific tickets by key: {"type":"byKey","keys":["EUX-123","DD-456"]}\n' +
        '2. To search with JQL and retrieve ticket details: {"type":"jql","jql":"<your JQL query>"}\n' +
        '3. To get ONLY the count of matching tickets (no ticket data): {"type":"count","jql":"<your JQL query>"}\n' +
        '\n' +
        '## Jira Instance Context\n' +
        '- Ticket key format: ' + ticketPattern + '\n' +
        '- Projects: ' + projectList + '\n' +
        '- Issue types: ' + issueTypes + '\n' +
        '- Priorities: ' + priorities + '\n' +
        '- Statuses: ' + statuses + '\n' +
        '- Labels: ' + labels + '\n' +
        '\n' +
        '## JQL Syntax Reference\n' +
        '- Assignee: assignee = "Full Name"\n' +
        '- Reporter: reporter = "Full Name"\n' +
        '- Status filter: status NOT IN (Done, Closed) or status = "In Progress"\n' +
        '- Project filter: project = EUX\n' +
        '- Issue type: issuetype = Bug\n' +
        '- Priority: priority IN (High, Major)\n' +
        '- Text search: text ~ "search term"\n' +
        '- Date filters: created >= -7d, updatedDate >= -30d, duedate < now()\n' +
        '- Ordering: ORDER BY updated DESC, ORDER BY priority DESC, ORDER BY created DESC\n' +
        '- Combine with AND/OR: assignee = "John" AND status != Done\n' +
        '- Customer field: Customer IN ("Company Name") or Customer = "Company Name"\n' +
        '- Labels: labels = "label-name"\n' +
        '\n' +
        '## Rules\n' +
        '1. If the user mentions specific ticket keys (like EUX-123, DD-456), use "byKey" type.\n' +
        '2. If the user is asking "how many", "count", "total number of", or any quantity-only question where they do NOT need ticket details, use "count" type.\n' +
        '3. For everything else (searching by person, status, date, listing tickets, etc.), use "jql" type.\n' +
        '4. Make the JQL as precise as possible to let Jira filter server-side.\n' +
        '5. When the user asks about "open" or "active" tickets, exclude Done, Closed, and Resolved.\n' +
        '6. When the user asks about "overdue" tickets, use duedate < now() AND exclude closed statuses.\n' +
        '7. Person names in JQL must be quoted: assignee = "John Doe".\n' +
        '8. Always add an ORDER BY clause (even for count queries).\n' +
        '9. Use the project keys from the context above when the user refers to a project by name.\n' +
        '10. When the user asks about tickets for a company or customer, use the Customer field: Customer IN ("Name").\n' +
        '\n' +
        '## Examples\n' +
        '\n' +
        'User: "Summarize ticket EUX-123"\n' +
        '{"type":"byKey","keys":["EUX-123"]}\n' +
        '\n' +
        'User: "What are EUX-100 and DD-200 about?"\n' +
        '{"type":"byKey","keys":["EUX-100","DD-200"]}\n' +
        '\n' +
        'User: "What tickets are assigned to Sarah Connor?"\n' +
        '{"type":"jql","jql":"assignee = \\"Sarah Connor\\" ORDER BY updated DESC"}\n' +
        '\n' +
        'User: "How many open tickets does John Doe have?"\n' +
        '{"type":"count","jql":"assignee = \\"John Doe\\" AND status NOT IN (Done, Closed) ORDER BY updated DESC"}\n' +
        '\n' +
        'User: "Show me high priority bugs in EUX"\n' +
        '{"type":"jql","jql":"project = EUX AND issuetype = Bug AND priority IN (High, Highest) ORDER BY priority DESC, updated DESC"}\n' +
        '\n' +
        'User: "Tickets reported by Jane Smith in the last week"\n' +
        '{"type":"jql","jql":"reporter = \\"Jane Smith\\" AND created >= -7d ORDER BY created DESC"}\n' +
        '\n' +
        'User: "Show me overdue tickets for the DD project"\n' +
        '{"type":"jql","jql":"project = DD AND duedate < now() AND status NOT IN (Done, Closed) ORDER BY duedate ASC"}\n' +
        '\n' +
        'User: "Any tickets about Nestle?"\n' +
        '{"type":"jql","jql":"text ~ \\"Nestle\\" ORDER BY updated DESC"}\n' +
        '\n' +
        'User: "Do we have open support tickets for Nestle?"\n' +
        '{"type":"jql","jql":"Customer IN (\\"Nestle\\") AND status NOT IN (Done, Closed) AND issuetype = Support ORDER BY updated DESC"}\n' +
        '\n' +
        'User: "Show me all support tickets for Nestle from the start of last year"\n' +
        '{"type":"jql","jql":"Customer IN (\\"Nestle\\") AND issueType = Support AND created >= startOfYear("-1")"}\n' +
        '\n' +
        'User: "Show me all tickets for Acme Corp and Contoso"\n' +
        '{"type":"jql","jql":"Customer IN (\\"Acme Corp\\", \\"Contoso\\") ORDER BY updated DESC"}\n' +
        '\n' +
        'User: "What did John Doe work on last month?"\n' +
        '{"type":"jql","jql":"assignee = \\"John Doe\\" AND updatedDate >= -30d ORDER BY updated DESC"}\n' +
        '\n' +
        'User: "Show me all unresolved epics"\n' +
        '{"type":"jql","jql":"issuetype = Epic AND status NOT IN (Done, Closed) ORDER BY updated DESC"}\n' +
        '\n' +
        'User: "Open bugs assigned to me in Platform project"\n' +
        '{"type":"jql","jql":"project = PLAT AND issuetype = Bug AND status NOT IN (Done, Closed) AND assignee = currentUser() ORDER BY updated DESC"}\n' +
        '\n' +
        'User: "How many open bugs are in the EUX project?"\n' +
        '{"type":"count","jql":"project = EUX AND issuetype = Bug AND status NOT IN (Done, Closed) ORDER BY updated DESC"}\n' +
        '\n' +
        'User: "Total number of tickets created this week"\n' +
        '{"type":"count","jql":"created >= -7d ORDER BY created DESC"}\n' +
        '\n' +
        'User: "How many support tickets does Nestle have?"\n' +
        '{"type":"count","jql":"Customer IN (\\"Nestle\\") AND issuetype = Support ORDER BY updated DESC"}\n' +
        '\n' +
        (userContext ? '## Additional Context\nThe user is currently viewing or has highlighted the following:\n' + userContext + '\n\n' : '') +
        '## User Question\n' +
        '"' + userPrompt + '"\n' +
        '\n' +
        'Return ONLY the JSON object. No explanation.';
};

IntegrationRunner.prototype.run = function (options) {
    var self = this;
    var integrationName = options.integrationName;
    var prompt = options.prompt;
    var userContext = options.context;

    if (!self._aiFetcher) return Promise.reject(new Error('SmartHighlights not initialized'));

    // Salesforce uses schema-driven SOQL routing instead of fixed skills
    if (integrationName === 'salesforce') {
        return self._runSoqlIntegration(prompt, userContext);
    }

    var skillNames = INTEGRATION_SKILLS[integrationName];
    if (!skillNames) return Promise.reject(new Error('Unknown integration: ' + integrationName));

    log('[SmartHighlights] runIntegration: ' + integrationName + ' prompt="' + prompt + '"');

    if (integrationName === 'jira') {
        return self._runJira(prompt, userContext);
    }

    return self._runGeneric(integrationName, prompt, userContext, skillNames);
};

IntegrationRunner.prototype._runJira = function (prompt, userContext) {
    var self = this;
    var jiraContext = self._getJiraContext();
    var jqlPrompt = self._buildJqlPrompt(prompt, jiraContext, userContext);

    return self._callLLM(jqlPrompt, null, self._config.llm.nerFunction).then(function (result) {
        if (!result || (!result.type)) {
            log('[SmartHighlights] JQL builder returned no type — falling back to text search');
            result = { type: 'jql', jql: 'text ~ "' + prompt.replace(/"/g, '\\"') + '" ORDER BY updated DESC' };
        }

        var skill = self._skills['searchJira'];
        if (!skill) return Promise.reject(new Error('searchJira skill not found'));

        log('[SmartHighlights] runJira: type=' + result.type + ' jql=' + (result.jql || '') + ' keys=' + JSON.stringify(result.keys || []));

        return skill.execute(result).then(function (data) {
            if (data && data.needsAuth) {
                return 'You need to log in to Jira first.';
            }

            var contextStr;
            var isPartial = false;
            if (result.type === 'count' && data && typeof data.total === 'number') {
                contextStr = JSON.stringify({ total: data.total, jql: result.jql });
            } else if (data && data.issues && Array.isArray(data.issues)) {
                isPartial = !data.isLast;
                contextStr = JSON.stringify(data.issues, null, 2);
            } else if (Array.isArray(data)) {
                contextStr = JSON.stringify(data, null, 2);
            } else {
                contextStr = JSON.stringify(data, null, 2);
            }

            var answerPrompt = self._buildAnswerPrompt('Jira', prompt, contextStr, userContext, isPartial);
            return self._callLLM(answerPrompt, null, self._config.llm.judgeFunction).then(function (res) {
                return res.answer || 'No answer could be generated.';
            });
        });
    });
};

IntegrationRunner.prototype._runGeneric = function (integrationName, prompt, userContext, skillNames) {
    var self = this;

    var skillDescriptions = [];
    for (var i = 0; i < skillNames.length; i++) {
        var skill = self._skills[skillNames[i]];
        if (!skill) continue;
        var paramDescs = [];
        for (var p = 0; p < skill.parameters.length; p++) {
            if (skill.parameters[p].name === 'context') continue;
            paramDescs.push(skill.parameters[p].name + ' (' + skill.parameters[p].type + '): ' + skill.parameters[p].description);
        }
        skillDescriptions.push(
            '- ' + skill.name + ': ' + skill.description + '\n  Parameters: ' + paramDescs.join('; ')
        );
    }

    var intentPrompt = self._buildIntentPrompt(integrationName, prompt, skillDescriptions, userContext);

    return self._callLLM(intentPrompt, null, self._config.llm.nerFunction).then(function (intent) {
        if (!intent || !intent.skill) return Promise.reject(new Error('Could not determine intent'));

        var chosenSkill = self._skills[intent.skill];
        if (!chosenSkill) return Promise.reject(new Error('Unknown skill: ' + intent.skill));

        var params = {};
        for (var j = 0; j < chosenSkill.parameters.length; j++) {
            var pName = chosenSkill.parameters[j].name;
            if (pName === 'context') continue;
            if (intent.params[pName] !== undefined) params[pName] = intent.params[pName];
        }
        if (userContext) params.context = userContext;

        log('[SmartHighlights] runIntegration: calling skill ' + intent.skill + ' with ' + JSON.stringify(params));
        return chosenSkill.execute(params).then(function (data) {
            var contextStr = JSON.stringify(data, null, 2);
            var answerPrompt = self._buildAnswerPrompt(integrationName, prompt, contextStr, userContext);
            return self._callLLM(answerPrompt, null, self._config.llm.judgeFunction).then(function (res) {
                return res.answer || 'No answer could be generated.';
            });
        });
    });
};

module.exports = { IntegrationRunner: IntegrationRunner };



/***/ }),

/***/ 52:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

var getCtx = (__webpack_require__(608)/* .getCtx */ .yK);
var logger = getCtx().get('PrelibLogger');

function log() {
	var logRecord = Array().slice.call(arguments);
	logRecord.unshift("[ SmartHighlights ]");
	logger.write.apply(logger, logRecord);
}

exports.R = log;


/***/ }),

/***/ 625:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

var createPluginEntry = (__webpack_require__(608)/* .createPluginEntry */ .mJ);

module.exports = createPluginEntry(function(registerPlugin) {
    var SmartHighlights = (__webpack_require__(450).SmartHighlights);

    registerPlugin(new SmartHighlights());
});



/***/ }),

/***/ 449:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

'use strict';
// datapulse.bridge.js — search + LLM validation against Datapulse API

var log = (__webpack_require__(52)/* .log */ .R);

function DatapulseBridge(config, aiFetcher) {
    if (!(this instanceof DatapulseBridge)) return new DatapulseBridge(config, aiFetcher);
    this._config = config;
    this._aiFetcher = aiFetcher;
}

DatapulseBridge.prototype._callLLM = function (prompt, schema, funcName) {
    var llmRequestBody = {
        stream: false,
        as_text: true,
        temperature: 0,
        max_tokens: 2000,
        messages: [{ role: 'system', content: prompt }]
    };

    if (schema) {
        llmRequestBody.response_format = {
            type: "json_schema",
            json_schema: schema
        };
    } else {
        llmRequestBody.response_format = { type: "json_object" };
    }

    var funcToRun = funcName || 'freePromptMini';

    return this._aiFetcher.sendCustomLlmRequest(llmRequestBody, funcToRun)
        .then(function (response) {
            try {
                if (typeof response === 'object') return response;
                if (typeof response === 'string') {
                    var cleanJson = response.replace(/^```json\s*/i, '').replace(/^```\s*/i, '').replace(/```\s*$/, '');
                    return JSON.parse(cleanJson);
                }
                return {};
            } catch (e) {
                log('[SmartHighlights] JSON Parse Error: ' + e.message);
                return {};
            }
        });
};

DatapulseBridge.prototype._getDatapulseEntities = function () {
    var entities = this._config.entities;
    var result = [];
    for (var i = 0; i < entities.length; i++) {
        if (entities[i].provider === 'datapulse') {
            result.push(entities[i]);
        }
    }
    return result;
};

// Search Datapulse for NER matches.
// hideArr is a runtime flag from the orchestrator (user permission state).
DatapulseBridge.prototype.search = function (nerData, hideArr) {
    var config = this._config;

    var hasAnyResults = false;
    var keys = Object.keys(nerData);
    for (var k = 0; k < keys.length; k++) {
        if (nerData[keys[k]] && nerData[keys[k]].length > 0) {
            hasAnyResults = true;
            break;
        }
    }
    if (!hasAnyResults) return Promise.resolve([]);

    var datapulseEntities = this._getDatapulseEntities();
    var nerPayload = [];
    var sourceGuids = [];
    for (var i = 0; i < datapulseEntities.length; i++) {
        nerPayload.push({
            "sourceGuid": datapulseEntities[i].sourceGuid,
            "ner": nerData[datapulseEntities[i].ner] || []
        });
        sourceGuids.push(datapulseEntities[i].sourceGuid);
    }

    var payload = {
        "system_guid": config.systemGuid,
        "ner_results": nerPayload,
        "source_guids": sourceGuids,
        "hint": "You are looking for:\n1. Company Names\n2. People Names",
        "segment_ids": null,
        "hide_arr": hideArr
    };

    return new Promise(function (resolve) {
        wmjQuery.ajax({
            url: config.searchEndpoint,
            type: 'POST',
            crossDomain: true,
            contentType: 'application/json',
            data: JSON.stringify(payload),
            dataType: 'json',
            success: function (response) {
                if (response.success && response.candidates) {
                    resolve(response.candidates);
                } else {
                    resolve([]);
                }
            },
            error: function (xhr, status, error) {
                log('[SmartHighlights] Search API Failed: ' + error);
                resolve([]);
            }
        });
    });
};

// Validate candidates via LLM judge.
DatapulseBridge.prototype.validate = function (emailText, candidates) {
    if (!candidates || candidates.length === 0) return Promise.resolve({ employees: [], customers: [] });

    var filteredCandidates = [];
    for (var i = 0; i < candidates.length; i++) {
        var match = candidates[i];
        var isPerson = (match.match_type !== 'Company');
        var isSingleWord = (match.candidate && match.candidate.trim().indexOf(' ') === -1);
        if (!(isPerson && isSingleWord)) {
            filteredCandidates.push(match);
        }
    }

    if (filteredCandidates.length === 0) return Promise.resolve({ employees: [], customers: [] });

    var context = this._config.context || '';

    var systemPrompt =
        "You are an expert entity matching validator. Your goal is to distinguish genuine semantic matches from string-only coincidences based on the context - " + context +
        ".\n\n## RULES:\n" +
        "1. **Context is the MOST important**: Analyze the email narrative. Ensure the candidate and database record refer to the SAME real-world entity (e.g., Reject 'Level Up Coding' blog vs 'Level AI' company).\n" +
        "2. **Reject False Positives**: Discard partial word overlaps, mismatched entity types, or generic terms.\n" +
        "3. **Handle Groups**: If a candidate matches a company and the database suggests multiple valid subsidiaries (e.g., 'Volvo' matches 'Volvo Cars' and 'Volvo IT'), ACCEPT ALL related records.\n" +
        "4. **Output**: Return ONLY the validated database values (account_name or employee_full_name).";

    var userMessage = "EMAIL TEXT:\n" + emailText + "\n\n---\n\nCANDIDATE MATCHES:\n\n";

    for (var j = 0; j < filteredCandidates.length; j++) {
        var m = filteredCandidates[j];
        userMessage += "Match #" + (j + 1) + ":\n";
        userMessage += "- Candidate Name: " + (m.candidate || 'Unknown') + "\n";
        userMessage += "- Match Type: " + (m.match_type || 'Unknown') + "\n";
        userMessage += "- Matched Record:\n";

        var record = m.matched_record || {};
        var fieldsToSend;

        if (m.match_type === 'Company') {
            fieldsToSend = ['account_name', 'account_csm_name'];
        } else {
            fieldsToSend = ['employee_full_name', 'employee_email'];
        }

        for (var f = 0; f < fieldsToSend.length; f++) {
            if (record[fieldsToSend[f]]) {
                userMessage += "  - " + fieldsToSend[f] + ": " + record[fieldsToSend[f]] + "\n";
            }
        }
        userMessage += "\n";
    }

    var fullPrompt = systemPrompt + "\n\n" + userMessage;

    var schema = {
        "name": "validated_matches",
        "strict": true,
        "description": "Returns the list of validated database values organized by match type.",
        "schema": {
            "type": "object",
            "properties": {
                "Company": {
                    "type": "array",
                    "items": { "type": "string" },
                    "description": "List of validated account_name values from the database that are true matches"
                },
                "Person": {
                    "type": "array",
                    "items": { "type": "string" },
                    "description": "List of validated employee_full_name values from the database that are true matches"
                }
            },
            "required": ["Company", "Person"],
            "additionalProperties": false
        }
    };

    return this._callLLM(fullPrompt, schema, this._config.llm.judgeFunction).then(function (response) {
        var validCompanies = response.Company || [];
        var validPeople = response.Person || [];

        var finalResults = { employees: [], customers: [] };

        for (var v = 0; v < filteredCandidates.length; v++) {
            var fc = filteredCandidates[v];
            if (fc.match_type === 'Company') {
                var acctName = fc.matched_record ? fc.matched_record.account_name : null;
                if (validCompanies.indexOf(acctName) !== -1) {
                    finalResults.customers.push(fc);
                }
            } else {
                var empName = fc.matched_record ? fc.matched_record.employee_full_name : null;
                if (validPeople.indexOf(empName) !== -1) {
                    finalResults.employees.push(fc);
                }
            }
        }

        return finalResults;
    });
};

module.exports = { DatapulseBridge: DatapulseBridge };



/***/ }),

/***/ 337:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

'use strict';
// datapulse.provider.js — Datapulse provider for company + employee entities

var log = (__webpack_require__(52)/* .log */ .R);

function DatapulseProvider(bridge, config, cache, endUserId) {
    if (!(this instanceof DatapulseProvider)) return new DatapulseProvider(bridge, config, cache, endUserId);
    this._bridge = bridge;
    this._config = config;
    this._cache = cache;
    this._endUserId = endUserId;
    this._hideArr = !this._isUserPermitted();
}

DatapulseProvider.prototype.entityType = 'datapulse';

DatapulseProvider.prototype._isUserPermitted = function () {
    var allowedUsers = this._config.allowedUsers;
    if (allowedUsers && allowedUsers.indexOf(this._endUserId) !== -1) return true;

    var allowedSegments = this._config.allowedSegments;
    if (allowedSegments && Array.isArray(allowedSegments) && allowedSegments.length > 0) {
        for (var i = 0; i < allowedSegments.length; i++) {
            if (WalkMeAPI.evaluateSegmentTag(allowedSegments[i])) {
                return true;
            }
        }
    }
    return false;
};

// fetchData: NER results → search → validate, with cache around each step.
DatapulseProvider.prototype.fetchData = function (nerResults, context) {
    var self = this;
    var searchKey = 'dp:' + JSON.stringify(nerResults);
    var cached;

    if (this._cache) {
        cached = this._cache.get(searchKey);
        if (cached) {
            return this._validateWithCache(context, cached);
        }
    }

    return this._bridge.search(nerResults, this._hideArr)
        .then(function (candidates) {
            if (self._cache && candidates && candidates.length > 0) {
                self._cache.set(searchKey, candidates);
            }
            return self._validateWithCache(context, candidates);
        });
};

DatapulseProvider.prototype._validateWithCache = function (context, candidates) {
    var self = this;
    if (!candidates || candidates.length === 0) return Promise.resolve({ employees: [], customers: [] });

    var validateKey = 'vm:' + JSON.stringify(candidates);
    if (this._cache) {
        var cached = this._cache.get(validateKey);
        if (cached) return Promise.resolve(cached);
    }

    return this._bridge.validate(context, candidates)
        .then(function (validated) {
            if (self._cache) {
                self._cache.set(validateKey, validated);
            }
            return validated;
        });
};

// Convert a validated match record to UI schema.
// Handles both company and employee types.
DatapulseProvider.prototype.getSchema = function (record) {
    var match = record;
    var info = match.matched_record;
    if (!info) return null;

    var targetName = match.candidate || info.account_name || info.employee_full_name;

    if (this._config.blockedTargets.indexOf(targetName) !== -1) return null;

    if (match.match_type === 'Company') {
        return this._companySchema(match, info, targetName);
    }
    return this._employeeSchema(match, info, targetName);
};

DatapulseProvider.prototype._companySchema = function (match, info, targetName) {
    if (this._config.blockedTargets.indexOf(info.account_name) !== -1) return null;

    var formattedARR = '$' + (info.account_arr || 0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    var healthScore = info.account_health_score ? Math.round(info.account_health_score) : 0;
    var isInRisk = (info.account_at_risk === 't');
    var riskDisc = isInRisk && (info.account_at_risk_desc || 'At Risk');

    var rows = [
        { label: 'ARR', value: formattedARR },
        { label: 'Health score', value: healthScore + '/100 ', title: riskDisc },
        { label: 'Renewal date', value: info.next_renewal_date || 'N/A' },
        { label: 'Open opportunities', value: info.number_of_open_opps || 'N/A' },
        { label: 'Account manager', value: info.account_ae_name || 'N/A', isClickable: true },
        { label: 'CSM name', value: info.account_csm_name || 'N/A', isClickable: true }
    ];

    return {
        type: 'company',
        title: info.account_name || targetName,
        subtitle: info.account_tier + " Customer",
        rows: rows,
        link: info.account_sfdc_link || null,
        linkLabel: 'Open in Salesforce',
        isRisk: isInRisk,
        riskLabel: riskDisc,
        useOfWalkme: info.use_of_walkme || null,
        keyProblems: info.key_problems_trying_to_solve || null,
        satisfactionPoints: info.key_satisfaction_points || null,
        dissatisfactionPoints: info.dissatisfaction_points || null,
        lastCallActionItems: info.last_call_action_items || null
    };
};

DatapulseProvider.prototype._employeeSchema = function (match, info, targetName) {
    if (this._config.blockedTargets.indexOf(info.employee_full_name) !== -1) return null;

    var managerName = info.employee_manager_name || 'N/A';
    if (managerName === 'Moran Shemer') managerName = 'R&M™';

    var location = info.employee_country || 'N/A';
    if (location === "United States of America") location = "USA";

    var sufaProfileLink = null;
    var orgChartLink = null;

    if (info.assignment_uuid) {
        var sufaUrl = 'https://hcm-eu20.hr.cloud.sap/sf';
        var sufaSelectedUserParam = '?selected_user_encoded=' + info.assignment_uuid;
        var sufaCompanyParam = '&bplte_company=sapitbusysP';
        sufaProfileLink = sufaUrl + '/liveprofile' + sufaSelectedUserParam + sufaCompanyParam;
        orgChartLink = sufaUrl + '/orgchart' + sufaSelectedUserParam + sufaCompanyParam;
    }

    return {
        type: 'employee',
        title: info.employee_full_name || targetName,
        email: info.employee_email || '',
        image: info.photo_base64_full || null,
        rows: [
            { label: 'Role', value: info.employee_job_title || 'N/A' },
            { label: 'Manager', value: managerName, isClickable: true },
            { label: 'Department', value: info.employee_department || 'N/A' },
            { label: 'Location', value: location }
        ],
        link: sufaProfileLink,
        orgChartLink: orgChartLink,
        linkLabel: 'View profile',
        hireDate: info.employee_hire_date || null,
        businessUnit: info.employee_business_unit || null,
        jobProfile: info.employee_job_profile || null,
        skipLevelManager: info.employee_manager_manager_name || null,
        employmentType: info.employee_category_type || null
    };
};

DatapulseProvider.prototype.requiresAuth = function () {
    return false;
};

DatapulseProvider.prototype.startAuth = function () {};

DatapulseProvider.prototype.onAuthSuccess = function () {};

module.exports = { DatapulseProvider: DatapulseProvider };



/***/ }),

/***/ 29:
/***/ (function(module) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

'use strict';
// DEV ONLY — remove or gate before customer release
// demo.provider.js — demo provider for invoice/customer showcase

var DEMO_CUSTOMER_DATA = [{
    type: 'company',
    title: 'ACME',
    subtitle: 'Strategic Account',
    rows: [
        { label: 'ARR', value: '$1,200,000' },
        { label: 'Health score', value: '98/100', title: 'Healthy' },
        { label: 'Renewal date', value: 'Oct 2026' },
        { label: 'Open opportunities', value: '3' },
        { label: 'Account manager', value: 'John Doe', isClickable: false }
    ],
    link: '#',
    linkLabel: 'Open in Salesforce'
}];

var TRIGGER_PHRASE = 'Invoice #90003237';

function DemoProvider() {
    if (!(this instanceof DemoProvider)) return new DemoProvider();
}

DemoProvider.prototype.entityType = 'demo';

DemoProvider.prototype.fetchData = function (text) {
    if (text.indexOf(TRIGGER_PHRASE) === -1) {
        return Promise.resolve([]);
    }

    return Promise.resolve([{
        type: 'invoice',
        title: TRIGGER_PHRASE,
        subtitle: 'High Value Transaction',
        rows: [
            { label: 'Total Amount', value: '300,000 USD', isBold: true },
            { label: 'Status', value: 'To Be Posted ⚠️', color: '#D32F2F', isBold: true },
            { label: 'Customer', value: 'ACME', isClickable: true },
            { label: 'Reference', value: '0090003237' }
        ],
        link: '#',
        linkLabel: 'View Invoice'
    }]);
};

DemoProvider.prototype.getSchema = function (record) {
    if (!record) return null;
    return record;
};

DemoProvider.prototype.getDemoCustomerData = function () {
    return DEMO_CUSTOMER_DATA;
};

DemoProvider.prototype.requiresAuth = function () {
    return false;
};

DemoProvider.prototype.startAuth = function () {};

DemoProvider.prototype.onAuthSuccess = function () {};

module.exports = { DemoProvider: DemoProvider };



/***/ }),

/***/ 976:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

'use strict';
// jira.auth.js — Jira authentication lifecycle (stub)
//
// Auth detection, popup management, and login-success signaling are now
// handled entirely by JiraBridge (popup.closed polling + iframe reload)
// and earlyWorkerInit (auto-close popup on Jira domain).
// This stub is kept so existing imports and constructor calls don't break.

var log = (__webpack_require__(52)/* .log */ .R);

function JiraAuth(providerConfig, clientStorageManager, onAuthSuccessCallback) {
    if (!(this instanceof JiraAuth)) return new JiraAuth(providerConfig, clientStorageManager, onAuthSuccessCallback);
    this._providerConfig = providerConfig;
    this._storage = clientStorageManager;
    this._onAuthSuccessCallback = onAuthSuccessCallback;
}

JiraAuth.prototype.checkAndClosePopup = function () {
    log('[JiraAuth] checkAndClosePopup — handled by earlyWorkerInit');
};

JiraAuth.prototype.openLoginPopup = function () {
    log('[JiraAuth] openLoginPopup — handled by JiraBridge.openLoginPopup');
};

JiraAuth.prototype.startLoginPoll = function () {
    log('[JiraAuth] startLoginPoll — no longer used');
};

JiraAuth.prototype.onAuthSuccess = function () {
    if (this._onAuthSuccessCallback) {
        this._onAuthSuccessCallback();
    }
};

module.exports = { JiraAuth: JiraAuth };



/***/ }),

/***/ 171:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

'use strict';
// jira.bridge.js — Jira iframe worker/master bridge
//
// The orchestrator decides whether to call initWorker() or initMaster()
// based on hostname. The constructor does NOT auto-detect or self-execute.

var log = (__webpack_require__(52)/* .log */ .R);

var IFRAME_ID = 'wm-jira-worker-frame';
var FETCH_TIMEOUT_MS = 10000;
var AUTH_TIMEOUT_MS = 15000;

function JiraBridge(providerConfig, jiraAuth, platformUtils) {
    if (!(this instanceof JiraBridge)) return new JiraBridge(providerConfig, jiraAuth, platformUtils);
    this._providerConfig = providerConfig;
    this._jiraAuth = jiraAuth;
    this._platformUtils = platformUtils;
    this._pendingResolves = {};
    this._requestQueue = [];
    this._isWorkerReady = false;

    this._requestCounter = 0;
    this._authRequired = false;
    this.onWorkerReady = null;
    this.onAuthRequired = null;
}

// --- WORKER (runs inside the hidden Jira iframe) ---

JiraBridge.prototype.initWorker = function () {
    var domain = this._providerConfig.domain;
    var supportBucketId = this._providerConfig.customFields.supportBucket;

    log('[Jira Worker] initWorker called. domain=' + domain + ' location=' + window.location.href);

    window.addEventListener('message', function (event) {
        log('[Jira Worker] Received message: ' + JSON.stringify(event.data));

        if (event.data.type === 'WM_FETCH_TICKETS') {
            var reqId = event.data.requestId;
            var keys = event.data.keys || [];
            log('[Jira Worker] Fetching tickets: ' + JSON.stringify(keys));

            var fields = 'fields=summary,status,assignee,duedate,description,comment,' + supportBucketId;

            var p = keys.map(function (k) {
                return fetch('/rest/api/2/issue/' + k + '?' + fields)
                    .then(function (r) { return r.ok ? r.json() : Promise.reject(r.statusText); })
                    .then(function (d) {
                        var f = d.fields || {};
                        return {
                            key: k,
                            summary: f.summary,
                            status: f.status ? f.status.name : 'Unknown',
                            assignee: f.assignee ? f.assignee.displayName : 'Unassigned',
                            dueDate: f.duedate || 'No Date',
                            supportBucket: f[supportBucketId] ? (f[supportBucketId].value || f[supportBucketId]) : '—',
                            description: f.description || '',
                            comments: (f.comment && f.comment.comments) ? f.comment.comments.map(function (c) {
                                var author = c.author ? c.author.displayName : 'Unknown';
                                return { author: author, body: c.body };
                            }) : [],
                            link: domain + '/browse/' + k
                        };
                    })
                    .catch(function (err) {
                        log('[Jira Worker] Fetch error for ' + k + ': ' + err);
                        return { key: k, isError: true, link: domain + '/browse/' + k };
                    });
            });

            Promise.all(p).then(function (res) {
                log('[Jira Worker] Data ready, sending back.');
                window.parent.postMessage({ type: 'WM_TICKETS_DATA', requestId: reqId, data: res }, '*');
            });
        }

        if (event.data.type === 'WM_FETCH_JIRA_BY_JQL') {
            var searchReqId = event.data.requestId;
            var jql = event.data.jql || '';
            log('[Jira Worker] Executing JQL: ' + jql);

            var searchFields = 'summary,status,assignee,duedate,priority,issuetype,reporter,created,updated,labels,' + supportBucketId;
            var searchUrl = '/rest/api/2/search/jql?jql=' + encodeURIComponent(jql) +
                '&fields=' + encodeURIComponent(searchFields) +
                '&maxResults=100';

            fetch(searchUrl)
                .then(function (r) { return r.ok ? r.json() : Promise.reject(r.statusText); })
                .then(function (json) {
                    var issues = json.issues || [];
                    var isLast = json.isLast !== false;
                    log('[Jira Worker] JQL search returned ' + issues.length + ' results, isLast=' + isLast);
                    var mapped = issues.map(function (issue) {
                        var f = issue.fields || {};
                        return {
                            key: issue.key,
                            summary: f.summary,
                            status: f.status ? f.status.name : 'Unknown',
                            assignee: f.assignee ? f.assignee.displayName : 'Unassigned',
                            reporter: f.reporter ? f.reporter.displayName : 'Unknown',
                            priority: f.priority ? f.priority.name : 'None',
                            issueType: f.issuetype ? f.issuetype.name : 'Unknown',
                            dueDate: f.duedate || 'No Date',
                            created: f.created || '',
                            updated: f.updated || '',
                            labels: f.labels || [],
                            supportBucket: f[supportBucketId] ? (f[supportBucketId].value || f[supportBucketId]) : '—',
                            link: domain + '/browse/' + issue.key
                        };
                    });
                    window.parent.postMessage({ type: 'WM_JIRA_SEARCH_DATA', requestId: searchReqId, data: { issues: mapped, isLast: isLast } }, '*');
                })
                .catch(function (err) {
                    log('[Jira Worker] JQL search error: ' + err);
                    window.parent.postMessage({ type: 'WM_JIRA_SEARCH_DATA', requestId: searchReqId, data: { isError: true, message: String(err) } }, '*');
                });
        }

        if (event.data.type === 'WM_FETCH_JIRA_COUNT') {
            var countReqId = event.data.requestId;
            var countJql = event.data.jql || '';
            log('[Jira Worker] Counting JQL: ' + countJql);

            fetch('/rest/api/2/search/approximate-count', {
                method: 'POST',
                headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
                body: JSON.stringify({ jql: countJql })
            })
                .then(function (r) { return r.ok ? r.json() : Promise.reject(r.statusText); })
                .then(function (json) {
                    var total = json.count || 0;
                    log('[Jira Worker] JQL count: ' + total);
                    window.parent.postMessage({ type: 'WM_JIRA_COUNT_DATA', requestId: countReqId, data: { total: total } }, '*');
                })
                .catch(function (err) {
                    log('[Jira Worker] JQL count error: ' + err);
                    window.parent.postMessage({ type: 'WM_JIRA_COUNT_DATA', requestId: countReqId, data: { isError: true, message: String(err) } }, '*');
                });
        }
    });

    fetch(this._providerConfig.authCheckPath)
        .then(function (res) {
            if (res.status === 200) {
                log('[Jira Worker] Auth OK — posting WM_WORKER_READY');
                window.parent.postMessage({ type: 'WM_WORKER_READY' }, '*');
            } else {
                log('[Jira Worker] Auth failed (status=' + res.status + ') — posting WM_JIRA_AUTH_REQUIRED');
                window.parent.postMessage({ type: 'WM_JIRA_AUTH_REQUIRED' }, '*');
            }
        })
        .catch(function (err) {
            log('[Jira Worker] Auth check error: ' + err + ' — posting WM_JIRA_AUTH_REQUIRED');
            window.parent.postMessage({ type: 'WM_JIRA_AUTH_REQUIRED' }, '*');
        });
};

// --- MASTER (runs in the host page, e.g. Gmail) ---

JiraBridge.prototype.initMaster = function () {
    var self = this;
    var domain = this._providerConfig.domain;
    var entryPath = this._providerConfig.iframeEntryPath;

    log('[Jira Master] initMaster called. domain=' + domain + ' entryPath=' + entryPath);

    if (!document.getElementById(IFRAME_ID)) {
        var f = document.createElement('iframe');
        f.id = IFRAME_ID;
        f.src = domain + entryPath;
        f.sandbox = 'allow-scripts allow-same-origin allow-forms';
        f.style.cssText = "position:fixed; bottom:20px; right:20px; width:300px; height:150px; border:4px solid purple; z-index:99999; background:white; visibility:hidden;";

        try {
            var isDebug = (localStorage.getItem('cf-dbg') === '1');
            if (isDebug) f.style.visibility = "visible";
        } catch (e) { /* localStorage may be blocked */ }

        f.addEventListener('load', function () { log('[Jira Master] Iframe loaded. src=' + f.src); });
        f.addEventListener('error', function () { log('[Jira Master] Iframe FAILED to load.'); });
        document.body.appendChild(f);
        log('[Jira Master] Iframe created: ' + domain + entryPath);
    } else {
        log('[Jira Master] Iframe already exists in DOM');
    }

    self._authTimer = setTimeout(function () {
        if (!self._isWorkerReady && !self._authRequired) {
            log('[Jira Master] Worker did not respond in ' + AUTH_TIMEOUT_MS + 'ms — assuming auth required');
            self._handleAuthRequired();
        }
    }, AUTH_TIMEOUT_MS);

    if (!window.wmJiraListenerAttached) {
        window.addEventListener('message', function (event) {
            if (!event.data) return;

            if (event.data.type === 'WM_WORKER_READY') {
                log('[Jira Master] Received WM_WORKER_READY!');
                self._isWorkerReady = true;
                self._authRequired = false;
                if (self._authTimer) { clearTimeout(self._authTimer); self._authTimer = null; }
                var frame = document.getElementById(IFRAME_ID);
                if (frame) frame.style.borderColor = "green";

                while (self._requestQueue.length) {
                    var r = self._requestQueue.shift();
                    if (r._isCount) self._sendCountToIframe(r.requestId, r.jql);
                    else if (r._isJql) self._sendJqlToIframe(r.requestId, r.jql);
                    else self._sendToIframe(r.requestId, r.keys);
                }

                if (self.onWorkerReady) self.onWorkerReady();
            }

            if (event.data.type === 'WM_JIRA_AUTH_REQUIRED') {
                log('[Jira Master] Received WM_JIRA_AUTH_REQUIRED');
                if (self._authTimer) { clearTimeout(self._authTimer); self._authTimer = null; }
                self._handleAuthRequired();
            }

            if (event.data.type === 'WM_TICKETS_DATA' || event.data.type === 'WM_JIRA_SEARCH_DATA' || event.data.type === 'WM_JIRA_COUNT_DATA') {
                var id = event.data.requestId;
                if (self._pendingResolves[id]) {
                    self._pendingResolves[id](event.data.data);
                    delete self._pendingResolves[id];
                }
            }
        });
        window.wmJiraListenerAttached = true;
    }
};

JiraBridge.prototype.fetchTickets = function (keys) {
    var self = this;
    log('[Jira Master] fetchTickets called. keys=' + JSON.stringify(keys) + ' workerReady=' + self._isWorkerReady + ' authRequired=' + self._authRequired);
    if (self._authRequired) {
        return Promise.resolve({ needsAuth: true });
    }
    return new Promise(function (resolve) {
        var id = 'jira_req_' + Date.now() + '_' + (++self._requestCounter);

        var safetyTimer = setTimeout(function () {
            if (self._pendingResolves[id]) {
                log('[Jira Master] TIMEOUT after ' + FETCH_TIMEOUT_MS + 'ms. workerReady=' + self._isWorkerReady + ' queueLen=' + self._requestQueue.length);
                self._pendingResolves[id]({ needsAuth: true });
                delete self._pendingResolves[id];
            }
        }, FETCH_TIMEOUT_MS);

        self._pendingResolves[id] = function (data) {
            clearTimeout(safetyTimer);
            resolve(data);
        };

        if (self._isWorkerReady) self._sendToIframe(id, keys);
        else self._requestQueue.push({ requestId: id, keys: keys });
    });
};

JiraBridge.prototype._handleAuthRequired = function () {
    this._authRequired = true;
    this._isWorkerReady = false;
    var frame = document.getElementById(IFRAME_ID);
    if (frame) frame.style.borderColor = "red";

    var ids = Object.keys(this._pendingResolves);
    for (var i = 0; i < ids.length; i++) {
        this._pendingResolves[ids[i]]({ needsAuth: true });
        delete this._pendingResolves[ids[i]];
    }

    if (this.onAuthRequired) this.onAuthRequired();
};

JiraBridge.prototype.openLoginPopup = function () {
    var self = this;
    var domain = this._providerConfig.domain;
    var loginPath = this._providerConfig.loginPath;
    var url = domain + loginPath;
    var w = 600, h = 700;
    var l = (screen.width / 2) - (w / 2);
    var t = (screen.height / 2) - (h / 2);
    log('[Jira Master] Opening login popup: ' + url);
    var popup = window.open(url, 'JiraLogin', 'width=' + w + ',height=' + h + ',top=' + t + ',left=' + l);

    var pollInterval = setInterval(function () {
        if (!popup || popup.closed) {
            clearInterval(pollInterval);
            log('[Jira Master] Login popup closed — refreshing iframe');
            self._isWorkerReady = false;
            self._authRequired = false;
            var frame = document.getElementById(IFRAME_ID);
            if (frame) {
                frame.src = frame.src;
                frame.style.borderColor = "orange";
            }
        }
    }, 1000);
};

JiraBridge.prototype.fetchTicketsByJql = function (jql) {
    var self = this;
    log('[Jira Master] fetchTicketsByJql called. jql=' + jql + ' workerReady=' + self._isWorkerReady + ' authRequired=' + self._authRequired);
    if (self._authRequired) {
        return Promise.resolve({ needsAuth: true });
    }
    return new Promise(function (resolve) {
        var id = 'jira_jql_' + Date.now() + '_' + (++self._requestCounter);

        var safetyTimer = setTimeout(function () {
            if (self._pendingResolves[id]) {
                log('[Jira Master] TIMEOUT (byJql) after ' + FETCH_TIMEOUT_MS + 'ms');
                self._pendingResolves[id]([]);
                delete self._pendingResolves[id];
            }
        }, FETCH_TIMEOUT_MS);

        self._pendingResolves[id] = function (data) {
            clearTimeout(safetyTimer);
            resolve(data);
        };

        if (self._isWorkerReady) self._sendJqlToIframe(id, jql);
        else self._requestQueue.push({ requestId: id, _isJql: true, jql: jql });
    });
};

JiraBridge.prototype._sendToIframe = function (id, keys) {
    var f = document.getElementById(IFRAME_ID);
    if (f && f.contentWindow) f.contentWindow.postMessage({ type: 'WM_FETCH_TICKETS', requestId: id, keys: keys }, '*');
};

JiraBridge.prototype._sendJqlToIframe = function (id, jql) {
    var f = document.getElementById(IFRAME_ID);
    if (f && f.contentWindow) f.contentWindow.postMessage({ type: 'WM_FETCH_JIRA_BY_JQL', requestId: id, jql: jql }, '*');
};

JiraBridge.prototype.fetchCountByJql = function (jql) {
    var self = this;
    log('[Jira Master] fetchCountByJql called. jql=' + jql + ' workerReady=' + self._isWorkerReady + ' authRequired=' + self._authRequired);
    if (self._authRequired) {
        return Promise.resolve({ needsAuth: true });
    }
    return new Promise(function (resolve) {
        var id = 'jira_cnt_' + Date.now() + '_' + (++self._requestCounter);

        var safetyTimer = setTimeout(function () {
            if (self._pendingResolves[id]) {
                log('[Jira Master] TIMEOUT (count) after ' + FETCH_TIMEOUT_MS + 'ms');
                self._pendingResolves[id]({ isError: true });
                delete self._pendingResolves[id];
            }
        }, FETCH_TIMEOUT_MS);

        self._pendingResolves[id] = function (data) {
            clearTimeout(safetyTimer);
            resolve(data);
        };

        if (self._isWorkerReady) self._sendCountToIframe(id, jql);
        else self._requestQueue.push({ requestId: id, _isCount: true, jql: jql });
    });
};

JiraBridge.prototype._sendCountToIframe = function (id, jql) {
    var f = document.getElementById(IFRAME_ID);
    if (f && f.contentWindow) f.contentWindow.postMessage({ type: 'WM_FETCH_JIRA_COUNT', requestId: id, jql: jql }, '*');
};

module.exports = { JiraBridge: JiraBridge };



/***/ }),

/***/ 183:
/***/ (function(module) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

'use strict';
// jira.provider.js — Jira ticket provider

function JiraProvider(bridge, auth, providerConfig, cacheManager) {
    if (!(this instanceof JiraProvider)) return new JiraProvider(bridge, auth, providerConfig, cacheManager);
    this._bridge = bridge;
    this._auth = auth;
    this._providerConfig = providerConfig;
    this._cacheManager = cacheManager || null;
}

JiraProvider.prototype.entityType = 'jira_ticket';

JiraProvider.prototype.fetchData = function (keys) {
    var self = this;
    if (this._cacheManager) {
        return this._cacheManager.fetchJiraTickets(keys, function (missing) {
            return self._bridge.fetchTickets(missing);
        });
    }
    return this._bridge.fetchTickets(keys);
};

// Convert a ticket record to a UI schema object.
// If ticket.needsAuth is true, returns an auth-prompt schema.
// The caller must set ticket.key before calling getSchema for the auth case.
JiraProvider.prototype.getSchema = function (ticket) {
    if (!ticket) return null;

    if (ticket.needsAuth === true) {
        return {
            type: 'jira_auth',
            title: ticket.key || 'Unknown',
            message: 'Access your Jira account for details',
            linkLabel: 'Log in',
            action: 'LOGIN_JIRA'
        };
    }

    if (ticket.isError) return null;

    return {
        type: 'ticket',
        title: ticket.key,
        subtitle: ticket.summary || 'Jira Ticket',
        description: ticket.description,
        comments: ticket.comments,
        rows: [
            { label: 'Status', value: ticket.status || 'Unknown' },
            { label: 'Assignee', value: ticket.assignee || 'Unassigned', isClickable: true },
            { label: 'Due Date', value: ticket.dueDate || 'No Date' },
            { label: 'Support Bucket', value: ticket.supportBucket || '—' }
        ],
        link: ticket.link,
        linkLabel: 'Open in Jira'
    };
};

JiraProvider.prototype.fetchByJql = function (jql) {
    return this._bridge.fetchTicketsByJql(jql);
};

JiraProvider.prototype.fetchCountByJql = function (jql) {
    return this._bridge.fetchCountByJql(jql);
};

JiraProvider.prototype.search = function (params) {
    var self = this;

    if (params.type === 'byKey') {
        if (!params.keys || params.keys.length === 0) return Promise.resolve([]);
        return self.fetchData(params.keys).then(function (data) {
            if (!data) return [];
            if (data.needsAuth) return [{ needsAuth: true }];
            if (!Array.isArray(data)) return [];
            return data;
        });
    }

    if (params.type === 'count') {
        if (!params.jql) return Promise.resolve({ total: 0 });
        return self.fetchCountByJql(params.jql).then(function (data) {
            if (!data) return { total: 0 };
            if (data.needsAuth) return { needsAuth: true };
            if (data.isError) return { total: 0 };
            return { total: data.total || 0 };
        });
    }

    if (params.type === 'jql') {
        if (!params.jql) return Promise.resolve([]);
        return self.fetchByJql(params.jql).then(function (data) {
            if (!data) return [];
            if (data.needsAuth) return [{ needsAuth: true }];
            if (data.isError) return [];
            if (data.issues && Array.isArray(data.issues)) {
                return { issues: data.issues, isLast: data.isLast !== false };
            }
            if (!Array.isArray(data)) return [];
            return data;
        });
    }

    return Promise.resolve([]);
};

JiraProvider.prototype.requiresAuth = function () {
    return true;
};

JiraProvider.prototype.startAuth = function () {
    this._auth.openLoginPopup();
};

JiraProvider.prototype.onAuthSuccess = function () {
    this._auth.onAuthSuccess();
};

module.exports = { JiraProvider: JiraProvider };



/***/ }),

/***/ 732:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

'use strict';
// sf.auth.js — Salesforce authentication lifecycle (stub)

var log = (__webpack_require__(52)/* .log */ .R);

function SalesforceAuth(providerConfig, clientStorageManager, onAuthSuccessCallback) {
    if (!(this instanceof SalesforceAuth)) return new SalesforceAuth(providerConfig, clientStorageManager, onAuthSuccessCallback);
    this._providerConfig = providerConfig;
    this._storage = clientStorageManager;
    this._onAuthSuccessCallback = onAuthSuccessCallback;
}

SalesforceAuth.prototype.checkAndClosePopup = function () {
    log('[SalesforceAuth] Not yet implemented: checkAndClosePopup');
};

SalesforceAuth.prototype.openLoginPopup = function () {
    log('[SalesforceAuth] Not yet implemented: openLoginPopup');
};

SalesforceAuth.prototype.startLoginPoll = function () {
    log('[SalesforceAuth] Not yet implemented: startLoginPoll');
};

SalesforceAuth.prototype.onAuthSuccess = function () {
    log('[SalesforceAuth] Not yet implemented: onAuthSuccess');
};

module.exports = { SalesforceAuth: SalesforceAuth };



/***/ }),

/***/ 119:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

'use strict';
// sf.bridge.js — Salesforce iframe worker/master bridge
//
// The orchestrator decides whether to call initWorker() or initMaster()
// based on hostname. The constructor does NOT auto-detect or self-execute.

var log = (__webpack_require__(52)/* .log */ .R);

var IFRAME_ID = 'wm-sf-worker-frame';
var FETCH_TIMEOUT_MS = 10000;
var AUTH_TIMEOUT_MS = 15000;
var LEX_SWITCH_PATH = '/ltng/switcher?destination=lex';

function SalesforceBridge(providerConfig) {
    if (!(this instanceof SalesforceBridge)) return new SalesforceBridge(providerConfig);
    this._providerConfig = providerConfig;
    this._pendingResolves = {};
    this._requestQueue = [];
    this._isWorkerReady = false;
    this._requestCounter = 0;
    this._authRequired = false;

    this.onWorkerReady = null;
    this.onAuthRequired = null;
}

// --- WORKER (runs inside the hidden Salesforce iframe) ---

SalesforceBridge.prototype.initWorker = function () {
    if (window.wmSfWorkerInitialized) {
        log('[SF Worker] initWorker skipped (already initialized)');
        return;
    }
    window.wmSfWorkerInitialized = true;

    var domain = this._providerConfig.domain || window.location.origin;
    var apiVersion = this._providerConfig.apiVersion || 'v54.0';
    var cookieName = this._providerConfig.cookieName || 'sid';
    var isClassicIframe = window.location.href.indexOf('destination=classic') > -1;

    log('[SF Worker] initWorker called. domain=' + domain + ' location=' + window.location.href);
    if (!this._providerConfig.domain) {
        log('[SF Worker] providerConfig.domain missing; falling back to window.location.origin=' + window.location.origin);
    }

    // If this worker is currently on classic, silently request switch-to-lex
    // preference so end-users won't be redirected to classic later.
    if (isClassicIframe) {
        fetch(domain + LEX_SWITCH_PATH, {
            mode: 'no-cors',
            credentials: 'include'
        }).then(function () {
            window.parent.postMessage({ type: 'WM_SF_CLASSIC_COOKIE_CLEARED', ok: true }, '*');
        }).catch(function (err) {
            window.parent.postMessage({ type: 'WM_SF_CLASSIC_COOKIE_CLEARED', ok: false, error: String(err) }, '*');
        });
    }

    function getCookie(name) {
        var value = '; ' + document.cookie;
        var parts = value.split('; ' + name + '=');
        if (parts.length === 2) return parts.pop().split(';').shift();
        return null;
    }

    window.addEventListener('message', function (event) {
        if (!event.data) return;

        if (event.data.type === 'WM_FETCH_SF_CASES') {
            var cReqId = event.data.requestId;
            var caseNumbers = event.data.caseNumbers || [];
            log('[SF Worker] Received WM_FETCH_SF_CASES reqId=' + cReqId + ' cases=' + JSON.stringify(caseNumbers));

            var cToken = getCookie(cookieName);
            if (!cToken) {
                log('[SF Worker] No session cookie for cases');
                window.parent.postMessage({ type: 'WM_SF_AUTH_REQUIRED' }, '*');
                window.parent.postMessage({ type: 'WM_SF_CASES_DATA', requestId: cReqId, data: { isError: true, message: 'Session cookie not found' } }, '*');
                return;
            }

            var cConditions = [];
            for (var ci = 0; ci < caseNumbers.length; ci++) {
                cConditions.push("CaseNumber = '" + caseNumbers[ci] + "'");
            }
            var cSoql = 'SELECT Id, CaseNumber, Subject, Status, Priority, Origin, CreatedDate, LastModifiedDate, Contact_Name_Formula__c, Account.Name, Owner.Name FROM Case WHERE ' + cConditions.join(' OR ');
            var cUrl = domain + '/services/data/' + apiVersion + '/query?q=' + encodeURIComponent(cSoql);

            log('[SF Worker] Fetching Cases SOQL: ' + cSoql);
            Promise.resolve(
                fetch(cUrl, {
                    headers: {
                        'Authorization': 'Bearer ' + cToken,
                        'Accept': 'application/json'
                    }
                })
            ).then(function (res) {
                log('[SF Worker] Cases fetch status=' + res.status);
                if (!res.ok) return res.json().then(function (err) { return Promise.reject(err); });
                return res.json();
            }).then(function (data) {
                var recs = (data && data.records) || [];
                log('[SF Worker] Got ' + recs.length + ' case records');
                var mapped = [];
                for (var cr = 0; cr < recs.length; cr++) {
                    mapped.push({
                        Id: recs[cr].Id,
                        CaseNumber: recs[cr].CaseNumber,
                        Subject: recs[cr].Subject,
                        Status: recs[cr].Status,
                        Priority: recs[cr].Priority,
                        Origin: recs[cr].Origin,
                        CreatedDate: recs[cr].CreatedDate,
                        LastModifiedDate: recs[cr].LastModifiedDate,
                        Contact_Name_Formula__c: recs[cr].Contact_Name_Formula__c,
                        AccountName: recs[cr].Account ? recs[cr].Account.Name : null,
                        OwnerName: recs[cr].Owner ? recs[cr].Owner.Name : null
                    });
                }
                window.parent.postMessage({ type: 'WM_SF_CASES_DATA', requestId: cReqId, data: mapped }, '*');
            }).catch(function (err) {
                log('[SF Worker] Cases fetch error: ' + String(err));
                window.parent.postMessage({ type: 'WM_SF_CASES_DATA', requestId: cReqId, data: { isError: true, message: String(err) } }, '*');
            });
        }

        if (event.data.type === 'WM_FETCH_SF_ACCOUNTS') {
            var reqId = event.data.requestId;
            var names = event.data.names || [];
            log('[SF Worker] Received WM_FETCH_SF_ACCOUNTS reqId=' + reqId + ' names=' + JSON.stringify(names));

            if (!names.length) {
                window.parent.postMessage({ type: 'WM_SF_ACCOUNTS_DATA', requestId: reqId, data: [] }, '*');
                return;
            }

            var token = getCookie(cookieName);
            if (!token) {
                log('[SF Worker] No session cookie "' + cookieName + '" found. cookies=' + document.cookie.substring(0, 200));
                window.parent.postMessage({ type: 'WM_SF_AUTH_REQUIRED' }, '*');
                window.parent.postMessage({ type: 'WM_SF_ACCOUNTS_DATA', requestId: reqId, data: { isError: true, message: 'Session cookie not found' } }, '*');
                return;
            }
            log('[SF Worker] Got token (length=' + token.length + ')');

            var searchTerms = [];
            var seenTerms = {};

            function addSearchTerm(term) {
                var normalized = (term || '').trim();
                if (!normalized) return;
                var key = normalized.toLowerCase();
                if (seenTerms[key]) return;
                seenTerms[key] = true;
                searchTerms.push(normalized);
            }

            for (var i = 0; i < names.length; i++) {
                var fullName = (names[i] || '').trim();
                if (!fullName) continue;
                addSearchTerm(fullName);

                var parts = fullName.split(/\s+/);
                if (parts.length > 1) {
                    for (var p = 0; p < parts.length; p++) {
                        addSearchTerm(parts[p]);
                    }
                }
            }

            var conditions = [];
            for (var t = 0; t < searchTerms.length; t++) {
                var escaped = searchTerms[t].replace(/'/g, "\\'");
                conditions.push("(Name LIKE '%" + escaped + "%' OR Website LIKE '%" + escaped + "%')");
            }
            var whereClause = '(' + conditions.join(' OR ') + ") AND Account_ARR_Bucket__c != '0'";
            var soql = 'SELECT Id, Name, Website, Industry, Market_Segment_New__c, Account_ARR_Bucket__c, Account_Health_Score__c, Next_Renewal_Date__c, of_Open_Opportunities__c, Account_Owner_Name__c, Account_Manager_Name__c FROM Account WHERE ' + whereClause;
            var url = domain + '/services/data/' + apiVersion + '/query?q=' + encodeURIComponent(soql);

            log('[SF Worker] Fetching SOQL: ' + soql);
            Promise.resolve(
                fetch(url, {
                    headers: {
                        'Authorization': 'Bearer ' + token,
                        'Accept': 'application/json'
                    }
                })
            ).then(function (res) {
                log('[SF Worker] Fetch response status=' + res.status);
                if (!res.ok) return res.json().then(function (err) { return Promise.reject(err); });
                return res.json();
            }).then(function (data) {
                var records = (data && data.records) || [];
                log('[SF Worker] Got ' + records.length + ' records');
                var mapped = [];
                for (var r = 0; r < records.length; r++) {
                    mapped.push({
                        Id: records[r].Id,
                        Name: records[r].Name,
                        Website: records[r].Website,
                        Industry: records[r].Industry,
                        Market_Segment_New__c: records[r].Market_Segment_New__c,
                        Account_ARR_Bucket__c: records[r].Account_ARR_Bucket__c,
                        Account_Health_Score__c: records[r].Account_Health_Score__c,
                        Next_Renewal_Date__c: records[r].Next_Renewal_Date__c,
                        of_Open_Opportunities__c: records[r].of_Open_Opportunities__c,
                        Account_Owner_Name__c: records[r].Account_Owner_Name__c,
                        Account_Manager_Name__c: records[r].Account_Manager_Name__c
                    });
                }
                window.parent.postMessage({ type: 'WM_SF_ACCOUNTS_DATA', requestId: reqId, data: mapped }, '*');
            }).catch(function (err) {
                log('[SF Worker] Fetch error: ' + String(err));
                window.parent.postMessage({ type: 'WM_SF_ACCOUNTS_DATA', requestId: reqId, data: { isError: true, message: String(err) } }, '*');
            });
        }

        if (event.data.type === 'WM_FETCH_SF_CONTACTS') {
            var ctReqId = event.data.requestId;
            var contactNames = event.data.names || [];
            log('[SF Worker] Received WM_FETCH_SF_CONTACTS reqId=' + ctReqId + ' names=' + JSON.stringify(contactNames));

            if (!contactNames.length) {
                window.parent.postMessage({ type: 'WM_SF_CONTACTS_DATA', requestId: ctReqId, data: [] }, '*');
                return;
            }

            var ctToken = getCookie(cookieName);
            if (!ctToken) {
                log('[SF Worker] No session cookie for contacts');
                window.parent.postMessage({ type: 'WM_SF_AUTH_REQUIRED' }, '*');
                window.parent.postMessage({ type: 'WM_SF_CONTACTS_DATA', requestId: ctReqId, data: { isError: true, message: 'Session cookie not found' } }, '*');
                return;
            }

            var ctConditions = [];
            for (var cti = 0; cti < contactNames.length; cti++) {
                var ctEscaped = (contactNames[cti] || '').replace(/'/g, "\\'");
                ctConditions.push("Name LIKE '%" + ctEscaped + "%'");
            }
            var ctSoql = 'SELECT Id, Name, FirstName, LastName, Email, Title, Account.Name, MailingCountry, Account_Role__c, LinkedIn_Page__c FROM Contact WHERE ' + ctConditions.join(' OR ') + ' LIMIT 50';
            var ctUrl = domain + '/services/data/' + apiVersion + '/query?q=' + encodeURIComponent(ctSoql);

            log('[SF Worker] Fetching Contacts SOQL: ' + ctSoql);
            Promise.resolve(
                fetch(ctUrl, {
                    headers: {
                        'Authorization': 'Bearer ' + ctToken,
                        'Accept': 'application/json'
                    }
                })
            ).then(function (res) {
                log('[SF Worker] Contacts fetch status=' + res.status);
                if (!res.ok) return res.json().then(function (err) { return Promise.reject(err); });
                return res.json();
            }).then(function (data) {
                var ctRecs = (data && data.records) || [];
                log('[SF Worker] Got ' + ctRecs.length + ' contact records');
                var ctMapped = [];
                for (var ctr = 0; ctr < ctRecs.length; ctr++) {
                    ctMapped.push({
                        Id: ctRecs[ctr].Id,
                        Name: ctRecs[ctr].Name,
                        FirstName: ctRecs[ctr].FirstName,
                        LastName: ctRecs[ctr].LastName,
                        Email: ctRecs[ctr].Email,
                        Title: ctRecs[ctr].Title,
                        AccountName: ctRecs[ctr].Account ? ctRecs[ctr].Account.Name : null,
                        MailingCountry: ctRecs[ctr].MailingCountry,
                        Account_Role__c: ctRecs[ctr].Account_Role__c,
                        LinkedIn_Page__c: ctRecs[ctr].LinkedIn_Page__c
                    });
                }
                window.parent.postMessage({ type: 'WM_SF_CONTACTS_DATA', requestId: ctReqId, data: ctMapped }, '*');
            }).catch(function (err) {
                log('[SF Worker] Contacts fetch error: ' + String(err));
                window.parent.postMessage({ type: 'WM_SF_CONTACTS_DATA', requestId: ctReqId, data: { isError: true, message: String(err) } }, '*');
            });
        }

        if (event.data.type === 'WM_FETCH_SF_SOQL') {
            var soqlReqId = event.data.requestId;
            var soqlStr = event.data.soql || '';
            log('[SF Worker] Received WM_FETCH_SF_SOQL reqId=' + soqlReqId + ' soql=' + soqlStr);

            var soqlToken = getCookie(cookieName);
            if (!soqlToken) {
                log('[SF Worker] No session cookie for SOQL query');
                window.parent.postMessage({ type: 'WM_SF_AUTH_REQUIRED' }, '*');
                window.parent.postMessage({ type: 'WM_SF_SOQL_DATA', requestId: soqlReqId, data: { isError: true, message: 'Session cookie not found' } }, '*');
                return;
            }

            var soqlUrl = domain + '/services/data/' + apiVersion + '/query?q=' + encodeURIComponent(soqlStr);
            log('[SF Worker] Fetching SOQL: ' + soqlStr);
            Promise.resolve(
                fetch(soqlUrl, {
                    headers: {
                        'Authorization': 'Bearer ' + soqlToken,
                        'Accept': 'application/json'
                    }
                })
            ).then(function (res) {
                log('[SF Worker] SOQL fetch status=' + res.status);
                if (!res.ok) return res.json().then(function (err) { return Promise.reject(err); });
                return res.json();
            }).then(function (data) {
                var records = (data && data.records) || [];
                log('[SF Worker] SOQL got ' + records.length + ' records');
                window.parent.postMessage({ type: 'WM_SF_SOQL_DATA', requestId: soqlReqId, data: records }, '*');
            }).catch(function (err) {
                log('[SF Worker] SOQL fetch error: ' + String(err));
                window.parent.postMessage({ type: 'WM_SF_SOQL_DATA', requestId: soqlReqId, data: { isError: true, message: String(err) } }, '*');
            });
        }

        if (event.data.type === 'WM_FETCH_SF_HARMONY_OPPORTUNITIES') {
            var oReqId = event.data.requestId;
            var externalIds = event.data.externalIds || [];
            log('[SF Worker] Received WM_FETCH_SF_HARMONY_OPPORTUNITIES reqId=' + oReqId + ' externalIds=' + JSON.stringify(externalIds));

            if (!externalIds.length) {
                window.parent.postMessage({ type: 'WM_SF_HARMONY_OPPORTUNITIES_DATA', requestId: oReqId, data: [] }, '*');
                return;
            }

            var oToken = getCookie(cookieName);
            if (!oToken) {
                log('[SF Worker] No session cookie for opportunities');
                window.parent.postMessage({ type: 'WM_SF_AUTH_REQUIRED' }, '*');
                window.parent.postMessage({ type: 'WM_SF_HARMONY_OPPORTUNITIES_DATA', requestId: oReqId, data: { isError: true, message: 'Session cookie not found' } }, '*');
                return;
            }

            var oConditions = [];
            for (var oi = 0; oi < externalIds.length; oi++) {
                var cleanId = String(externalIds[oi]).replace(/\D/g, '');
                if (cleanId.length !== 9) continue;

                oConditions.push("Rev_Share_External_Id__c = '" + cleanId + "'");
            }
            var oWhere = oConditions.join(' OR ');
            var oSoql = 'SELECT Id, Rev_Share_External_Id__c, SAP_Team_Info__c, SAP_Opp_Phase__c, SAP_Opp_Status__c, SAP_Forecast_Category__c, SAP_Qualification_Date__c, SAP_ACV_kUSD__c, SAP_Deal_Score__c FROM Opportunity WHERE (' + oWhere + ') LIMIT 200';
            var oUrl = domain + '/services/data/' + apiVersion + '/query?q=' + encodeURIComponent(oSoql);

            log('[SF Worker] Fetching Opportunity SOQL: ' + oSoql);
            Promise.resolve(
                fetch(oUrl, {
                    headers: {
                        'Authorization': 'Bearer ' + oToken,
                        'Accept': 'application/json'
                    }
                })
            ).then(function (res) {
                log('[SF Worker] Opportunities fetch status=' + res.status);
                if (!res.ok) return res.json().then(function (err) { return Promise.reject(err); });
                return res.json();
            }).then(function (data) {
                var oRecords = (data && data.records) || [];
                log('[SF Worker] Got ' + oRecords.length + ' opportunity records');
                var oMapped = [];
                for (var or = 0; or < oRecords.length; or++) {
                    oMapped.push({
                        Id: oRecords[or].Id,
                        Rev_Share_External_Id__c: oRecords[or].Rev_Share_External_Id__c,
                        SAP_Team_Info__c: oRecords[or].SAP_Team_Info__c,
                        SAP_Opp_Phase__c: oRecords[or].SAP_Opp_Phase__c,
                        SAP_Opp_Status__c: oRecords[or].SAP_Opp_Status__c,
                        SAP_Forecast_Category__c: oRecords[or].SAP_Forecast_Category__c,
                        SAP_Qualification_Date__c: oRecords[or].SAP_Qualification_Date__c,
                        SAP_ACV_kUSD__c: oRecords[or].SAP_ACV_kUSD__c,
                        SAP_Deal_Score__c: oRecords[or].SAP_Deal_Score__c
                    });
                }
                window.parent.postMessage({ type: 'WM_SF_HARMONY_OPPORTUNITIES_DATA', requestId: oReqId, data: oMapped }, '*');
            }).catch(function (err) {
                log('[SF Worker] Opportunities fetch error: ' + String(err));
                window.parent.postMessage({ type: 'WM_SF_HARMONY_OPPORTUNITIES_DATA', requestId: oReqId, data: { isError: true, message: String(err) } }, '*');
            });
        }
    });

    var initToken = getCookie(cookieName);
    if (initToken) {
        log('[SF Worker] Auth OK — posting WM_SF_WORKER_READY');
        window.parent.postMessage({ type: 'WM_SF_WORKER_READY' }, '*');
    } else {
        log('[SF Worker] Auth failed (no session cookie) — posting WM_SF_AUTH_REQUIRED');
        window.parent.postMessage({ type: 'WM_SF_AUTH_REQUIRED' }, '*');
    }
};

// --- MASTER (runs in the host page, e.g. Gmail) ---

SalesforceBridge.prototype.initMaster = function () {
    var self = this;
    var domain = this._providerConfig.domain;
    var entryPath = this._providerConfig.iframeEntryPath;

    log('[SF Master] initMaster called. domain=' + domain + ' entryPath=' + entryPath);

    if (!document.getElementById(IFRAME_ID)) {
        var f = document.createElement('iframe');
        f.id = IFRAME_ID;
        f.src = domain + entryPath;
        f.sandbox = 'allow-scripts allow-same-origin allow-forms';
        f.style.cssText = "position:fixed; bottom:20px; right:660px; width:300px; height:150px; border:4px solid blue; z-index:99999; background:white; visibility:hidden;";

        try {
            var isDebug = (localStorage.getItem('cf-dbg') === '1');
            if (isDebug) f.style.visibility = "visible";
        } catch (e) { /* localStorage may be blocked */ }

        f.addEventListener('load', function () { log('[SF Master] Iframe loaded. src=' + f.src); });
        f.addEventListener('error', function () { log('[SF Master] Iframe FAILED to load.'); });
        document.body.appendChild(f);
        log('[SF Master] Iframe created: ' + domain + entryPath);
    } else {
        log('[SF Master] Iframe already exists in DOM');
    }

    self._authTimer = setTimeout(function () {
        if (!self._isWorkerReady && !self._authRequired) {
            log('[SF Master] Worker did not respond in ' + AUTH_TIMEOUT_MS + 'ms — assuming auth required');
            self._handleAuthRequired();
        }
    }, AUTH_TIMEOUT_MS);

    if (!window.wmSfListenerAttached) {
        window.addEventListener('message', function (event) {
            if (!event.data) return;

            if (event.data.type === 'WM_SF_WORKER_READY') {
                log('[SF Master] Received WM_SF_WORKER_READY!');
                self._isWorkerReady = true;
                self._authRequired = false;
                if (self._authTimer) { clearTimeout(self._authTimer); self._authTimer = null; }
                var frame = document.getElementById(IFRAME_ID);
                if (frame) frame.style.borderColor = "#00FF00";

                lexRedirectFixIframe(domain);

                while (self._requestQueue.length) {
                    var r = self._requestQueue.shift();
                    if (r.caseNumbers) self._sendCasesToIframe(r.requestId, r.caseNumbers);
                    else if (r.externalIds) self._sendHarmonyOppsToIframe(r.requestId, r.externalIds);
                    else if (r.soql) self._sendSoqlToIframe(r.requestId, r.soql);
                    else if (r.contactNames) self._sendContactsToIframe(r.requestId, r.contactNames);
                    else self._sendToIframe(r.requestId, r.names);
                }

                if (self.onWorkerReady) self.onWorkerReady();
            }

            if (event.data.type === 'WM_SF_AUTH_REQUIRED') {
                log('[SF Master] Received WM_SF_AUTH_REQUIRED');
                if (self._authTimer) { clearTimeout(self._authTimer); self._authTimer = null; }
                self._handleAuthRequired();
            }

            if (event.data.type === 'WM_SF_ACCOUNTS_DATA') {
                var id = event.data.requestId;
                log('[SF Master] Received WM_SF_ACCOUNTS_DATA reqId=' + id);
                if (self._pendingResolves[id]) {
                    self._pendingResolves[id](event.data.data);
                    delete self._pendingResolves[id];
                }
            }

            if (event.data.type === 'WM_SF_CASES_DATA') {
                var cId = event.data.requestId;
                log('[SF Master] Received WM_SF_CASES_DATA reqId=' + cId);
                if (self._pendingResolves[cId]) {
                    self._pendingResolves[cId](event.data.data);
                    delete self._pendingResolves[cId];
                }
            }

            if (event.data.type === 'WM_SF_HARMONY_OPPORTUNITIES_DATA') {
                var oId = event.data.requestId;
                log('[SF Master] Received WM_SF_HARMONY_OPPORTUNITIES_DATA reqId=' + oId);
                if (self._pendingResolves[oId]) {
                    self._pendingResolves[oId](event.data.data);
                    delete self._pendingResolves[oId];
                }
            }

            if (event.data.type === 'WM_SF_CONTACTS_DATA') {
                var ctId = event.data.requestId;
                log('[SF Master] Received WM_SF_CONTACTS_DATA reqId=' + ctId);
                if (self._pendingResolves[ctId]) {
                    self._pendingResolves[ctId](event.data.data);
                    delete self._pendingResolves[ctId];
                }
            }

            if (event.data.type === 'WM_SF_SOQL_DATA') {
                var sqId = event.data.requestId;
                log('[SF Master] Received WM_SF_SOQL_DATA reqId=' + sqId);
                if (self._pendingResolves[sqId]) {
                    self._pendingResolves[sqId](event.data.data);
                    delete self._pendingResolves[sqId];
                }
            }
        });
        window.wmSfListenerAttached = true;
    }
};

SalesforceBridge.prototype.fetchAccounts = function (names) {
    var self = this;
    log('[SF Master] fetchAccounts called. names=' + JSON.stringify(names) + ' workerReady=' + self._isWorkerReady + ' authRequired=' + self._authRequired);
    if (self._authRequired) {
        return Promise.resolve({ needsAuth: true });
    }
    return new Promise(function (resolve) {
        var id = 'sf_req_' + Date.now() + '_' + (++self._requestCounter);

        var safetyTimer = setTimeout(function () {
            if (self._pendingResolves[id]) {
                log('[SF Master] TIMEOUT after ' + FETCH_TIMEOUT_MS + 'ms. workerReady=' + self._isWorkerReady + ' queueLen=' + self._requestQueue.length);
                self._pendingResolves[id]([]);
                delete self._pendingResolves[id];
            }
        }, FETCH_TIMEOUT_MS);

        self._pendingResolves[id] = function (data) {
            clearTimeout(safetyTimer);
            resolve(data);
        };

        if (self._isWorkerReady) self._sendToIframe(id, names);
        else {
            log('[SF Master] Worker not ready, queuing request ' + id);
            self._requestQueue.push({ requestId: id, names: names });
        }
    });
};

SalesforceBridge.prototype.fetchCases = function (caseNumbers) {
    var self = this;
    log('[SF Master] fetchCases called. cases=' + JSON.stringify(caseNumbers) + ' workerReady=' + self._isWorkerReady + ' authRequired=' + self._authRequired);
    if (self._authRequired) {
        return Promise.resolve({ needsAuth: true });
    }
    return new Promise(function (resolve) {
        var id = 'sf_case_' + Date.now() + '_' + (++self._requestCounter);

        var safetyTimer = setTimeout(function () {
            if (self._pendingResolves[id]) {
                log('[SF Master] Cases TIMEOUT after ' + FETCH_TIMEOUT_MS + 'ms');
                self._pendingResolves[id]([]);
                delete self._pendingResolves[id];
            }
        }, FETCH_TIMEOUT_MS);

        self._pendingResolves[id] = function (data) {
            clearTimeout(safetyTimer);
            resolve(data);
        };

        if (self._isWorkerReady) self._sendCasesToIframe(id, caseNumbers);
        else {
            log('[SF Master] Worker not ready, queuing case request ' + id);
            self._requestQueue.push({ requestId: id, caseNumbers: caseNumbers });
        }
    });
};

SalesforceBridge.prototype.fetchHarmonyOpportunities = function (externalIds) {
    var self = this;
    log('[SF Master] fetchHarmonyOpportunities called. externalIds=' + JSON.stringify(externalIds) + ' workerReady=' + self._isWorkerReady + ' authRequired=' + self._authRequired);
    if (self._authRequired) {
        return Promise.resolve({ needsAuth: true });
    }
    return new Promise(function (resolve) {
        var id = 'sf_opp_' + Date.now() + '_' + (++self._requestCounter);

        var safetyTimer = setTimeout(function () {
            if (self._pendingResolves[id]) {
                log('[SF Master] Opportunities TIMEOUT after ' + FETCH_TIMEOUT_MS + 'ms');
                self._pendingResolves[id]([]);
                delete self._pendingResolves[id];
            }
        }, FETCH_TIMEOUT_MS);

        self._pendingResolves[id] = function (data) {
            clearTimeout(safetyTimer);
            resolve(data);
        };

        if (self._isWorkerReady) self._sendHarmonyOppsToIframe(id, externalIds);
        else {
            log('[SF Master] Worker not ready, queuing opportunity request ' + id);
            self._requestQueue.push({ requestId: id, externalIds: externalIds });
        }
    });
};

SalesforceBridge.prototype.fetchContacts = function (names) {
    var self = this;
    log('[SF Master] fetchContacts called. names=' + JSON.stringify(names) + ' workerReady=' + self._isWorkerReady + ' authRequired=' + self._authRequired);
    if (self._authRequired) {
        return Promise.resolve({ needsAuth: true });
    }
    return new Promise(function (resolve) {
        var id = 'sf_contact_' + Date.now() + '_' + (++self._requestCounter);

        var safetyTimer = setTimeout(function () {
            if (self._pendingResolves[id]) {
                log('[SF Master] Contacts TIMEOUT after ' + FETCH_TIMEOUT_MS + 'ms');
                self._pendingResolves[id]([]);
                delete self._pendingResolves[id];
            }
        }, FETCH_TIMEOUT_MS);

        self._pendingResolves[id] = function (data) {
            clearTimeout(safetyTimer);
            resolve(data);
        };

        if (self._isWorkerReady) self._sendContactsToIframe(id, names);
        else {
            log('[SF Master] Worker not ready, queuing contact request ' + id);
            self._requestQueue.push({ requestId: id, contactNames: names });
        }
    });
};

SalesforceBridge.prototype.fetchSoql = function (soql) {
    var self = this;
    log('[SF Master] fetchSoql called. soql=' + soql + ' workerReady=' + self._isWorkerReady + ' authRequired=' + self._authRequired);
    if (self._authRequired) {
        return Promise.resolve({ needsAuth: true });
    }
    return new Promise(function (resolve) {
        var id = 'sf_soql_' + Date.now() + '_' + (++self._requestCounter);

        var safetyTimer = setTimeout(function () {
            if (self._pendingResolves[id]) {
                log('[SF Master] SOQL TIMEOUT after ' + FETCH_TIMEOUT_MS + 'ms');
                self._pendingResolves[id]([]);
                delete self._pendingResolves[id];
            }
        }, FETCH_TIMEOUT_MS);

        self._pendingResolves[id] = function (data) {
            clearTimeout(safetyTimer);
            resolve(data);
        };

        if (self._isWorkerReady) self._sendSoqlToIframe(id, soql);
        else {
            log('[SF Master] Worker not ready, queuing SOQL request ' + id);
            self._requestQueue.push({ requestId: id, soql: soql });
        }
    });
};

SalesforceBridge.prototype._handleAuthRequired = function () {
    this._authRequired = true;
    this._isWorkerReady = false;
    var frame = document.getElementById(IFRAME_ID);
    if (frame) frame.style.borderColor = "red";

    var ids = Object.keys(this._pendingResolves);
    for (var i = 0; i < ids.length; i++) {
        this._pendingResolves[ids[i]]({ needsAuth: true });
        delete this._pendingResolves[ids[i]];
    }

    if (this.onAuthRequired) this.onAuthRequired();
};

SalesforceBridge.prototype.openLoginPopup = function () {
    var self = this;
    var loginUrl = 'https://walkme.lightning.force.com/lightning/page/home';
    var w = 600, h = 700;
    var l = (screen.width / 2) - (w / 2);
    var t = (screen.height / 2) - (h / 2);
    log('[SF Master] Opening login popup: ' + loginUrl);
    var popup = window.open(loginUrl, 'SfLogin', 'width=' + w + ',height=' + h + ',top=' + t + ',left=' + l);

    var pollInterval = setInterval(function () {
        if (!popup || popup.closed) {
            clearInterval(pollInterval);
            log('[SF Master] Login popup closed — refreshing iframe');
            self._isWorkerReady = false;
            self._authRequired = false;
            var frame = document.getElementById(IFRAME_ID);
            if (frame) {
                frame.src = frame.src;
                frame.style.borderColor = "orange";
            }
        }
    }, 1000);
};

SalesforceBridge.prototype._sendToIframe = function (id, names) {
    var f = document.getElementById(IFRAME_ID);
    if (f && f.contentWindow) f.contentWindow.postMessage({ type: 'WM_FETCH_SF_ACCOUNTS', requestId: id, names: names }, '*');
};

SalesforceBridge.prototype._sendCasesToIframe = function (id, caseNumbers) {
    var f = document.getElementById(IFRAME_ID);
    if (f && f.contentWindow) f.contentWindow.postMessage({ type: 'WM_FETCH_SF_CASES', requestId: id, caseNumbers: caseNumbers }, '*');
};

SalesforceBridge.prototype._sendHarmonyOppsToIframe = function (id, externalIds) {
    var f = document.getElementById(IFRAME_ID);
    if (f && f.contentWindow) f.contentWindow.postMessage({ type: 'WM_FETCH_SF_HARMONY_OPPORTUNITIES', requestId: id, externalIds: externalIds }, '*');
};

SalesforceBridge.prototype._sendContactsToIframe = function (id, names) {
    var f = document.getElementById(IFRAME_ID);
    if (f && f.contentWindow) f.contentWindow.postMessage({ type: 'WM_FETCH_SF_CONTACTS', requestId: id, names: names }, '*');
};

SalesforceBridge.prototype._sendSoqlToIframe = function (id, soql) {
    var f = document.getElementById(IFRAME_ID);
    if (f && f.contentWindow) f.contentWindow.postMessage({ type: 'WM_FETCH_SF_SOQL', requestId: id, soql: soql }, '*');
};

function lexRedirectFixIframe(domain) {
    var lexFixId = IFRAME_ID + '-lex-fix';
    if (!document.getElementById(lexFixId)) {
        var fix = document.createElement('iframe');
        fix.id = lexFixId;
        fix.src = domain + LEX_SWITCH_PATH;
        fix.sandbox = 'allow-scripts allow-same-origin';
        fix.style.cssText = "width:0;height:0;border:none;position:fixed;top:-9999px;left:-9999px;visibility:hidden;";
        document.body.appendChild(fix);
        log('[SF Master] Created LEX-fix iframe to clear classic preference: ' + domain + LEX_SWITCH_PATH);
        setTimeout(function () {
            var el = document.getElementById(lexFixId);
            if (el && el.parentNode) el.parentNode.removeChild(el);
            log('[SF Master] LEX-fix iframe removed.');
        }, 5000);
    }
}

module.exports = { SalesforceBridge: SalesforceBridge };



/***/ }),

/***/ 947:
/***/ (function(module) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

'use strict';
// sf.case.provider.js — Salesforce Case provider

function _formatSfDate(isoStr) {
    if (!isoStr) return null;
    var d = new Date(isoStr);
    if (isNaN(d.getTime())) return isoStr;
    var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return months[d.getMonth()] + ' ' + d.getDate() + ', ' + d.getFullYear();
}

function SalesforceCaseProvider(bridge, providerConfig, cacheManager) {
    if (!(this instanceof SalesforceCaseProvider)) return new SalesforceCaseProvider(bridge, providerConfig, cacheManager);
    this._bridge = bridge;
    this._providerConfig = providerConfig;
    this._cacheManager = cacheManager || null;
}

SalesforceCaseProvider.prototype.entityType = 'sf_case';

SalesforceCaseProvider.prototype.fetchData = function (caseNumbers) {
    var self = this;
    if (this._cacheManager) {
        // fetchSalesforceCases strips leading '#' and passes cleaned keys to fetchFn
        return this._cacheManager.fetchSalesforceCases(caseNumbers, function (cleaned) {
            return self._bridge.fetchCases(cleaned);
        });
    }
    var cleaned = [];
    for (var i = 0; i < caseNumbers.length; i++) {
        cleaned.push(caseNumbers[i].replace(/^#/, ''));
    }
    return this._bridge.fetchCases(cleaned);
};

SalesforceCaseProvider.prototype.getSchema = function (record) {
    if (!record) return null;

    if (record.needsAuth === true) {
        return {
            type: 'sf_auth',
            title: record.key || 'Salesforce Case',
            message: 'Access your Salesforce account for details',
            linkLabel: 'Log in',
            action: 'LOGIN_SF'
        };
    }

    if (record.isError) return null;

    var rawRows = [
        { label: 'Status',            value: record.Status },
        { label: 'Priority',          value: record.Priority },
        { label: 'Account Name',      value: record.AccountName },
        { label: 'Contact Name',      value: record.Contact_Name_Formula__c },
        { label: 'Owner',             value: record.OwnerName },
        { label: 'Origin',            value: record.Origin },
        { label: 'Created Date',      value: _formatSfDate(record.CreatedDate) },
        { label: 'Last Modified Date', value: _formatSfDate(record.LastModifiedDate) }
    ];
    var rows = [];
    for (var i = 0; i < rawRows.length; i++) {
        if (rawRows[i].value) rows.push(rawRows[i]);
    }

    return {
        type: 'sf_ticket',
        title: record.CaseNumber,
        subtitle: record.Subject || 'Salesforce Case',
        rows: rows,
        link: this._providerConfig.domain + '/lightning/r/Case/' + record.Id + '/view',
        linkLabel: 'Open in Salesforce'
    };
};

module.exports = { SalesforceCaseProvider: SalesforceCaseProvider };



/***/ }),

/***/ 945:
/***/ (function(module) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

'use strict';
// sf.contact.provider.js — Salesforce Contact provider (person fallback)

function SalesforceContactProvider(bridge, providerConfig, cacheManager) {
    if (!(this instanceof SalesforceContactProvider)) return new SalesforceContactProvider(bridge, providerConfig, cacheManager);
    this._bridge = bridge;
    this._providerConfig = providerConfig;
    this._cacheManager = cacheManager || null;
}

SalesforceContactProvider.prototype.entityType = 'sf_contact';

SalesforceContactProvider.prototype.fetchData = function (names) {
    var self = this;
    if (this._cacheManager) {
        return this._cacheManager.fetchSalesforceContacts(names, function (missing) {
            return self._bridge.fetchContacts(missing);
        });
    }
    return this._bridge.fetchContacts(names);
};

SalesforceContactProvider.prototype.getSchema = function (record) {
    if (!record) return null;

    if (record.needsAuth === true) {
        return {
            type: 'sf_auth',
            title: record.name || 'Salesforce Contact',
            message: 'Access your Salesforce account for details',
            linkLabel: 'Log in',
            action: 'LOGIN_SF'
        };
    }

    if (record.isError) return null;

    var rawRows = [
        { label: 'Title',        value: record.Title },
        { label: 'Account',      value: record.AccountName },
        { label: 'Account Role', value: record.Account_Role__c },
        { label: 'Country',      value: record.MailingCountry }
    ];
    var rows = [];
    for (var i = 0; i < rawRows.length; i++) {
        if (rawRows[i].value) rows.push(rawRows[i]);
    }

    var linkedInLink = record.LinkedIn_Page__c || null;

    return {
        type: 'sf_contact',
        title: record.Name,
        email: record.Email || '',
        subtitle: record.Title || 'Salesforce Contact',
        rows: rows,
        link: this._providerConfig.domain + '/lightning/r/Contact/' + record.Id + '/view',
        linkLabel: 'Open in Salesforce',
        linkedInLink: linkedInLink
    };
};

SalesforceContactProvider.prototype.requiresAuth = function () {
    return false;
};

SalesforceContactProvider.prototype.startAuth = function () {};

SalesforceContactProvider.prototype.onAuthSuccess = function () {};

module.exports = { SalesforceContactProvider: SalesforceContactProvider };



/***/ }),

/***/ 69:
/***/ (function(module) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

'use strict';
// sf.harmony.opportunity.provider.js — Salesforce Harmony Opportunity provider

function SalesforceHarmonyOpportunityProvider(bridge, providerConfig, cacheManager) {
    if (!(this instanceof SalesforceHarmonyOpportunityProvider)) return new SalesforceHarmonyOpportunityProvider(bridge, providerConfig, cacheManager);
    this._bridge = bridge;
    this._providerConfig = providerConfig;
    this._cacheManager = cacheManager || null;
}

SalesforceHarmonyOpportunityProvider.prototype.entityType = 'sf_harmony_opportunity';

SalesforceHarmonyOpportunityProvider.prototype.fetchData = function (externalIds) {
    var self = this;
    if (this._cacheManager) {
        // fetchSfHarmonyOpportunities strips non-digits and passes cleaned ids to fetchFn
        return this._cacheManager.fetchSfHarmonyOpportunities(externalIds, function (cleaned) {
            return self._bridge.fetchHarmonyOpportunities(cleaned);
        });
    }
    var cleaned = [];
    for (var i = 0; i < externalIds.length; i++) {
        cleaned.push(String(externalIds[i]).replace(/\D/g, ''));
    }
    return this._bridge.fetchHarmonyOpportunities(cleaned);
};

function parseTeamInfo(teamInfo) {
    var out = { sapOppOwner: '', sapAe: '', sapCsm: '' };
    if (!teamInfo) return out;

    var lines = String(teamInfo).split('\n');
    for (var i = 0; i < lines.length; i++) {
        var line = lines[i];
        var idx = line.indexOf(':');
        if (idx < 0) continue;
        var key = line.slice(0, idx).trim().toLowerCase();
        var value = line.slice(idx + 1).trim() || 'N/A';

        if (key === 'opp owner name') out.sapOppOwner = value;
        else if (key === 'sap ae') out.sapAe = value;
        else if (key === 'cs rep') out.sapCsm = value;
    }
    return out;
}

function hasDisplayValue(value) {
    if (value === null || value === undefined) return false;
    var str = String(value).trim();
    if (!str) return false;
    return str.toLowerCase() !== 'n/a';
}

SalesforceHarmonyOpportunityProvider.prototype.getSchema = function (record) {
    if (!record) return null;

    if (record.needsAuth === true) {
        return {
            type: 'sf_auth',
            title: record.key || 'Salesforce Opportunity',
            message: 'Access your Salesforce account for details',
            linkLabel: 'Log in',
            action: 'LOGIN_SF'
        };
    }

    if (record.isError) return null;

    var team = parseTeamInfo(record.SAP_Team_Info__c);
    var dealScore = (record.SAP_Deal_Score__c === null || record.SAP_Deal_Score__c === undefined) ? 'N/A' : (record.SAP_Deal_Score__c + '%');
    var acv = (record.SAP_ACV_kUSD__c === null || record.SAP_ACV_kUSD__c === undefined) ? 'N/A' : String(record.SAP_ACV_kUSD__c);
    var rows = [];

    function addRow(label, value) {
        if (!hasDisplayValue(value)) return;
        rows.push({ label: label, value: value });
    }

    // Team info values should be displayed first and in fixed order.
    addRow('SAP Opp Owner', team.sapOppOwner);
    addRow('SAP AE', team.sapAe);
    addRow('SAP CSM', team.sapCsm);
    addRow('SAP Opp Phase', record.SAP_Opp_Phase__c);
    addRow('SAP Opp Status', record.SAP_Opp_Status__c);
    addRow('SAP Forecast Category', record.SAP_Forecast_Category__c);
    addRow('Rev-Share External Id', record.Rev_Share_External_Id__c);
    addRow('SAP Qualification Date', record.SAP_Qualification_Date__c);
    addRow('SAP ACV kUSD', acv);
    addRow('SAP Deal Score %', dealScore);

    return {
        type: 'harmony_opportunity',
        title: 'Harmony Opportunity ' + (record.Rev_Share_External_Id__c || ''),
        subtitle: 'Salesforce Harmony Opportunity',
        rows: rows,
        link: this._providerConfig.domain + '/lightning/r/Opportunity/' + record.Id + '/view',
        linkLabel: 'Open in Salesforce'
    };
};

module.exports = { SalesforceHarmonyOpportunityProvider: SalesforceHarmonyOpportunityProvider };



/***/ }),

/***/ 451:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

'use strict';
// sf.provider.js — Salesforce Account provider

var log = (__webpack_require__(52)/* .log */ .R);

function SalesforceProvider(bridge, providerConfig, aiFetcher, config, cacheManager) {
    if (!(this instanceof SalesforceProvider)) return new SalesforceProvider(bridge, providerConfig, aiFetcher, config, cacheManager);
    this._bridge = bridge;
    this._providerConfig = providerConfig;
    this._aiFetcher = aiFetcher;
    this._config = config;
    this._cacheManager = cacheManager || null;
}

SalesforceProvider.prototype.entityType = 'salesforce_account';

SalesforceProvider.prototype.fetchData = function (companyNames) {
    var self = this;
    if (this._cacheManager) {
        return this._cacheManager.fetchSalesforceAccounts(companyNames, function (names) {
            return self._bridge.fetchAccounts(names);
        });
    }
    return this._bridge.fetchAccounts(companyNames);
};

function hasValue(v) {
    return v !== null && v !== undefined && v !== '';
}

function formatArrBucket(bucket) {
    if (!hasValue(bucket)) return 'N/A';
    var str = String(bucket);
    var parts = str.split('-');
    if (parts.length > 1 && parts[0]) return '$' + parts[0] + '+';
    return '$' + str;
}

SalesforceProvider.prototype.getSchema = function (record) {
    if (!record) return null;

    if (record.needsAuth === true) {
        return {
            type: 'sf_auth',
            title: record.name || record.key || 'Salesforce',
            message: 'Access your Salesforce account for details',
            linkLabel: 'Log in',
            action: 'LOGIN_SF'
        };
    }

    return {
        type: 'company',
        title: record.Name || 'Salesforce Account',
        subtitle: record.Market_Segment_New__c || record.Industry || 'Salesforce Account',
        rows: [
            { label: 'ARR', value: formatArrBucket(record.Account_ARR_Bucket__c) },
            { label: 'Health score', value: hasValue(record.Account_Health_Score__c) ? (record.Account_Health_Score__c + '/100') : 'N/A' },
            { label: 'Renewal date', value: record.Next_Renewal_Date__c || 'N/A' },
            { label: 'Open opportunities', value: hasValue(record.of_Open_Opportunities__c) ? String(record.of_Open_Opportunities__c) : 'N/A' },
            { label: 'Account manager', value: record.Account_Owner_Name__c || 'N/A', isClickable: true },
            { label: 'CSM name', value: record.Account_Manager_Name__c || 'N/A', isClickable: true }
        ],
        link: this._providerConfig.domain + '/lightning/r/Account/' + record.Id + '/view',
        linkLabel: 'Open in Salesforce'
    };
};

SalesforceProvider.prototype._callLLM = function (prompt, schema, funcName) {
    var llmRequestBody = {
        stream: false,
        as_text: true,
        temperature: 0,
        max_tokens: 2000,
        messages: [{ role: 'system', content: prompt }]
    };

    if (schema) {
        llmRequestBody.response_format = {
            type: "json_schema",
            json_schema: schema
        };
    } else {
        llmRequestBody.response_format = { type: "json_object" };
    }

    var funcToRun = funcName || 'freePromptMini';

    return this._aiFetcher.sendCustomLlmRequest(llmRequestBody, funcToRun)
        .then(function (response) {
            try {
                if (typeof response === 'object') return response;
                if (typeof response === 'string') {
                    var cleanJson = response.replace(/^```json\s*/i, '').replace(/^```\s*/i, '').replace(/```\s*$/, '');
                    return JSON.parse(cleanJson);
                }
                return {};
            } catch (e) {
                log('[SmartHighlights] SF Judge JSON Parse Error: ' + e.message);
                return {};
            }
        });
};

SalesforceProvider.prototype.validateAccounts = function (contextText, searchedNames, records) {
    if (!records || records.length === 0) return Promise.resolve([]);
    if (!this._aiFetcher) return Promise.resolve(records);

    var systemPrompt =
        "You are an expert entity matching validator. You are given a page context and a list of Salesforce Account records that were returned by a fuzzy search. " +
        "Your job is to determine which Account records are GENUINE matches for the searched company names, and which are false positives from the fuzzy search.\n\n" +
        "## RULES:\n" +
        "1. **Context is the MOST important**: Analyze the page text. Ensure the account name and the searched term refer to the SAME real-world entity.\n" +
        "2. **Reject False Positives**: A record like 'Rheinmetall IT Solutions GmbH' is NOT a match for 'Meta'. Partial word overlaps do NOT count.\n" +
        "3. **Handle Groups**: If a searched name matches a parent company and the results include valid subsidiaries (e.g., 'Volvo' matches 'Volvo Cars' and 'Volvo IT'), ACCEPT ALL related records.\n" +
        "4. **Be strict**: Only accept records where the account name clearly represents the same company or a direct subsidiary/division of the searched name.\n" +
        "5. **Output**: Return ONLY the validated Account Names from the Salesforce records.";

    var userMessage = "PAGE CONTEXT:\n" + contextText.substring(0, 3000) + "\n\n---\n\nSEARCHED NAMES: " + searchedNames.join(', ') + "\n\n---\n\nSALESFORCE ACCOUNT RECORDS:\n\n";

    for (var i = 0; i < records.length; i++) {
        var rec = records[i];
        userMessage += "Record #" + (i + 1) + ":\n";
        userMessage += "- Account Name: " + (rec.Name || 'Unknown') + "\n";
        if (rec.Website) userMessage += "- Website: " + rec.Website + "\n";
        if (rec.Industry) userMessage += "- Industry: " + rec.Industry + "\n";
        userMessage += "\n";
    }

    var fullPrompt = systemPrompt + "\n\n" + userMessage;

    var schema = {
        "name": "validated_sf_accounts",
        "strict": true,
        "description": "Returns the list of validated Salesforce Account Names that are true matches.",
        "schema": {
            "type": "object",
            "properties": {
                "Accounts": {
                    "type": "array",
                    "items": { "type": "string" },
                    "description": "List of validated Account Name values from Salesforce that are true matches for the searched names"
                }
            },
            "required": ["Accounts"],
            "additionalProperties": false
        }
    };

    var judgeFunc = (this._config && this._config.llm && this._config.llm.judgeFunction) || 'freePrompt';

    return this._callLLM(fullPrompt, schema, judgeFunc).then(function (response) {
        var validNames = response.Accounts || [];

        var filtered = [];
        for (var v = 0; v < records.length; v++) {
            var accountName = records[v].Name;
            if (validNames.indexOf(accountName) !== -1) {
                filtered.push(records[v]);
            }
        }

        log('[SmartHighlights] SF Judge: ' + records.length + ' records in, ' + filtered.length + ' validated');
        return filtered;
    });
};

SalesforceProvider.prototype.requiresAuth = function () {
    return false;
};

SalesforceProvider.prototype.startAuth = function () {};

SalesforceProvider.prototype.onAuthSuccess = function () {};

module.exports = { SalesforceProvider: SalesforceProvider };



/***/ }),

/***/ 497:
/***/ (function(module) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

'use strict';

// SF_SCHEMA defines the Salesforce objects available for dynamic SOQL queries.
// Each entry has a description (sent to the LLM to help it pick the right object)
// and a fields map of { ApiFieldName: "short human description" }.
// The LLM uses this to decide which objects and fields to request for a given user question.

var SF_SCHEMA = {
    Account: {
        description: 'Business account / company record. Use for questions about a company\'s owner, territory, tier, industry, billing, employee count, ARR potential, SLA, engagement score, renewal, lifecycle stage, CRM platform, or any company-level business or sales data.',
        fields: {
            Id: 'The unique 18-character Salesforce ID for this account record',
            Name: 'The official name of the account',
            Website: 'The official website URL for the organization',
            Industry: 'The primary industry category',
            Phone: 'The primary contact phone number for the organization',
            NumberOfEmployees: 'The total headcount of the organization',
            BillingCity: 'The city for billing correspondence',
            BillingState: 'The province or state for billing',
            BillingCountry: 'The country for billing',
            BillingStreet: 'The specific street address for billing',
            CreatedDate: 'The date the account record was first created',
            LastActivityDate: 'The date of the last logged task or event',
            Account_Owner_Name__c: 'The primary Sales Representative assigned to the account',
            Account_Owners_Manager__c: 'The manager overseeing the account owner',
            Account_Category__c: 'The sales classification of the account (e.g. Prospect with Past Lost Opportunities)',
            Account_Link__c: 'The direct Salesforce Lightning URL for the account record',
            Account_Number__c: 'The internal reference number for the account',
            Account_Status__c: 'The current stage in the customer lifecycle (e.g. Kickoff)',
            Account_Territory_Major_Geo__c: 'The broad geographic region (e.g. Americas)',
            Account_Territory_Name__c: 'The specific sales territory',
            Account_Tier__c: 'The priority ranking of the account (A, B, C)',
            Account_Type__c: 'The role of the account in the ecosystem (e.g. End Customer)',
            Aggregated_Industry__c: 'Broad industry grouping (e.g. Non Tech)',
            BDR_Name_Formula__c: 'The Business Development Representative assigned to lead generation',
            CRM__c: 'The customer\'s current CRM platform',
            CSG_Segment__c: 'The Customer Success Group service model',
            CS_Coverage_Type__c: 'The support model assigned to this account',
            Child_Domain_Key__c: 'The unique DUNS identifier for this specific branch',
            Cloud_Maturity__c: 'A score representing the customer\'s digital/cloud sophistication',
            Customer_Sector__c: 'The business sector the company operates in',
            Customer_Success_Stage__c: 'The current onboarding status',
            D_B_Ownership_Type__c: 'The legal ownership status of the company (e.g. Private)',
            Days_Since_Last_Activity_Qualified__c: 'The number of days since the last meaningful sales interaction',
            Days_from_Account_Creation__c: 'Total number of days this record has existed',
            Domain_WM__c: 'The specific web domain associated with the customer',
            Engagement__c: 'A score measuring the account\'s interaction level',
            Global_Parent_Hierarchy__c: 'The name of the top-level parent entity',
            IT_Software_Budget__c: 'The estimated annual software spend of the organization',
            Market_Segment__c: 'The business size category (e.g. Commercial, Enterprise)',
            PS_Segment__c: 'The Professional Services group assigned',
            Payment_Method__c: 'The preferred way the customer pays',
            Payment_Terms__c: 'The agreed-upon payment window (e.g. Net 30)',
            Potential_ARR_in_USD__c: 'The estimated potential annual revenue value in USD',
            Predictive_Insights_Score__c: 'An AI-generated score predicting account potential',
            SLA_Package__c: 'The level of support service agreement (e.g. 24/7)',
            Timezone_Number__c: 'The numerical offset for the account\'s local time',
            Ultimate_Parent_Employees__c: 'The total employee count of the highest entity in the corporate tree',
            X6sense_Account_Buying_Stage__c: 'The current stage in the buyer\'s journey according to 6sense',
            X6sense_Account_Intent_Score__c: 'A score indicating how actively the account is researching solutions',
            of_Business_Lost_Opps__c: 'The count of previously lost sales opportunities',
            q_Condition__c: 'The overall health or temperature of the prospect (e.g. Cold, Warm, Hot)'
        }
    },

    Case: {
        description: 'Support case / ticket. Use for questions about support issues, case status, priority, who is handling a case, resolution details, SLA, linked Jira tickets, or any customer support request identified by a case number (8 digits, starts with 00). To find cases for a specific company, filter by Account_Formula__c using the account name (exact match with "="). For listing open/unresolved cases always add a Status filter (e.g. Status != "Resolved") to avoid returning hundreds of records.',
        fields: {
            Id: 'The unique Salesforce Record ID for this case object',
            CaseNumber: 'The unique identifying number for the support ticket (e.g. 00424840)',
            Subject: 'The brief title of the support ticket',
            Description: 'The full text of the original customer report detailing the issue',
            Origin: 'The channel through which the case was received (Email, Phone, Web, etc.)',
            Priority: 'The urgency level assigned to the case',
            Current_Status__c: 'The final or current state of the ticket (e.g. Resolved, In Progress)',
            CreatedDate: 'The UTC timestamp of case creation',
            Case_Created_Date_Time__c: 'The exact timestamp when the case was first logged',
            Date_Opened__c: 'The calendar date the issue was reported',
            ClosedDate: 'The date and time the ticket was officially resolved',
            Closed_By__c: 'The name of the agent who closed the case',
            Owner_Name__c: 'The name of the individual support agent responsible for the case',
            All_Owners__c: 'List of all personnel who have handled or owned the case',
            Case_Owner_Office__c: 'The physical office location of the case owner',
            Case_Owner_Tier__c: 'The support level currently handling the case (e.g. Tier 1)',
            AccountId: 'The unique Salesforce ID for the associated account',
            Account_Formula__c: 'The name of the company the case belongs to',
            Account_AM_Email: 'Email address of the Account Manager',
            Account_ARR_On_Creation__c: 'Annual Recurring Revenue of the account at the time the case was opened',
            Account_Market_Segment__c: 'The business category of the account (e.g. Enterprise)',
            Account_Product_Data_Center__c: 'The server region where the account data is hosted',
            Account_Remote_Access__c: 'Allowed geographic regions for remote support access',
            Account_Segment_Manager__c: 'The manager responsible for this account segment',
            Adoption_Score__c: 'A numerical metric representing how active the customer is with the product',
            ContactEmail: 'The email address of the customer contact',
            Contact_Name_Formula__c: 'The full name of the customer contact',
            Success_Owner_Email__c: 'Email of the Customer Success Manager',
            Entitlement_Process__c: 'The SLA service level assigned to the customer (e.g. 24/7)',
            Customer_Stage__c: 'The customer\'s current lifecycle phase (e.g. 4 - Live)',
            Customer_Type__c: 'The billing status of the customer (e.g. Paying)',
            Next_Renewal_Date__c: 'The date the customer\'s current contract expires',
            JIRA_Issue_Number__c: 'The linked ticket in the engineering tracking system (e.g. EUX-9131)',
            Jira_Description__c: 'A summary of the technical bug provided for the R&D team',
            Jira_Link__c: 'The direct URL to the engineering task in Atlassian Jira',
            Latest_Jira_Status__c: 'The current state of the linked engineering task',
            Of_Jira_Cases__c: 'Count of engineering/JIRA tickets spawned from this case',
            Days_from_Open_to_Jira_Escalation__c: 'Number of days elapsed before the case was escalated to R&D',
            R_D_Project__c: 'The internal engineering team assigned to the fix',
            Root_Cause__c: 'The underlying reason for the failure',
            Resolution_Description__c: 'A summary of how the issue was fixed',
            Product_Component__c: 'The specific part of the software involved in the issue',
            Implementation_Type__c: 'How the product is deployed for this customer',
            Case_Success__c: 'The specific internal project name related to the case',
            Complexity_Score__c: 'A numerical rating of how difficult the issue was to solve',
            Cumulative_Time__c: 'Total time tracked on the case',
            Minutes_to_Troubleshoot__c: 'Total active time spent by agents diagnosing the problem',
            Total_Time_to_Resolution__c: 'Total duration from open to close in hours',
            Time_From_Creation_Days__c: 'The total age of the case in days',
            of_Emails__c: 'Total volume of email correspondence',
            of_Incoming_Emails__c: 'Total emails received from the customer',
            of_Outgoing_Emails__c: 'Total emails sent by the support team',
            Emails_Sent_By_T1__c: 'Total number of outbound communications from Tier 1 support',
            Last_Incoming_Email_Date__c: 'Timestamp of the most recent message received from the customer',
            Last_Outgoing_Email_Date__c: 'Timestamp of the most recent message sent by support',
            Month_Year_of_creation__c: 'The month and year the case started (e.g. 10-2025)',
            Extension_Download_Link__c: 'The URL used to deploy the specific browser extension for this customer',
            Snippet_Email__c: 'The unique identifier for the customer\'s specific configuration',
            Thread_Id__c: 'The unique string used to link email replies to this specific case'
        }
    },

    Opportunity: {
        description: 'Sales opportunity / deal. Use for questions about deals, pipeline, ACV, ARR, contract dates, deal stage, partners, SAP/Harmony data, stakeholders, business issues, or opportunities identified by a Rev-Share External Id (9 digits) or internal Opp number.',
        fields: {
            Id: 'Unique Salesforce record ID',
            Opp_Number__c: 'The unique internal tracking number for this opportunity',
            Account_Name__c: 'The name of the company this opportunity is for',
            StageName: 'The final or current stage of the sales process (e.g. 8 - Closed Won)',
            CloseDate: 'The date the deal was officially finalized',
            Amount: 'The total gross value of the contract over its entire duration',
            ACV__c: 'The Annual Contract Value for this opportunity',
            ARR__c: 'The Annual Recurring Revenue associated with this specific deal',
            Contract_Length_in_Months_formula__c: 'The duration of the agreed-upon contract in months',
            Deal_Type__c: 'The licensing model (e.g. Unlimited Applications)',
            GTM_Motion__c: 'The Go-To-Market strategy (e.g. DAP/ELA)',
            Of_Users__c: 'The total number of end-users covered under this agreement',
            Industry__c: 'The customer\'s business vertical',
            Account_Ecosystem__c: 'The primary software environment where the solution is applied (e.g. SAP)',
            Application_Type__c: 'The specific software platforms the solution will layer over',
            Partner_Name__c: 'The lead consulting partner on the project',
            Who_Needs_to_be_Involved__c: 'A stakeholder map including executive sponsors and project leads',
            Business_Issue__c: 'Narrative describing the customer\'s business challenge and need for WalkMe',
            Background__c: 'Background context on the customer\'s transformation project',
            Expected_Outcome__c: 'The projected business value and ROI from the deal',
            Manager_Notes__c: 'Internal commentary on forecast confidence, executive backing, and deal context',
            Rev_Share_External_Id__c: 'Harmony: The 9-digit Rev-Share External ID linking to partner systems',
            SAP_ACV_kUSD__c: 'Harmony: The Annual Contract Value in thousands of USD',
            SAP_Closing_Date__c: 'Harmony: The target closure date recorded in the SAP partner system',
            SAP_Date_Info__c: 'Harmony: Consolidated timeline including creation, start/end dates, and SAP close quarter',
            SAP_Deal_Score__c: 'Harmony: A confidence metric for the deal in the partner ecosystem',
            SAP_FC_Category__c: 'Harmony: The SAP Forecast Category (e.g. Estimated In)',
            SAP_Forecast_Category__c: 'Harmony: The final forecast status for the partner (e.g. Booked/Won)',
            SAP_Opp_Phase__c: 'Harmony: The current sales phase in SAP\'s pipeline',
            SAP_Opp_Source__c: 'Harmony: The origin of the lead within the SAP partnership',
            SAP_Opp_Status__c: 'Harmony: The transactional status in SAP (e.g. Booked)',
            SAP_Opportunity_Status__c: 'Harmony: The final outcome in the partner pipeline (e.g. Won)',
            SAP_Phases__c: 'Harmony: The milestone phase for the purchase',
            SAP_Selling_Entity_Code__c: 'Harmony: The internal SAP code for the business unit',
            SAP_Selling_Entity__c: 'Harmony: The specific SAP branch involved in the transaction',
            SAP_Team_Info__c: 'Harmony: Key SAP personnel including the AE and Opportunity Owner',
            SAP_Territory_Info__c: 'Harmony: Regional and distribution channel details for SAP'
        }
    },

    Contact: {
        description: 'Individual contact / person at a customer account. Use for questions about a specific person\'s role, engagement, builder activity, WalkMe usage, marketing status, seniority, LinkedIn, or their relationship to an account.',
        fields: {
            Id: 'Unique Salesforce record ID',
            Name: 'The full display name of the contact',
            FirstName: 'The contact\'s given name',
            LastName: 'The contact\'s family name',
            Email: 'The professional email address',
            Title: 'The official job title',
            AccountId: 'The unique Salesforce ID for the associated company',
            LastActivityDate: 'The date of the most recent recorded task or interaction',
            MailingCountry: 'The primary country where the contact is located',
            Account_Manager__c: 'The WalkMe representative managing the relationship',
            Account_Role__c: 'The contact\'s specific responsibilities regarding the software',
            Active_Platforms__c: 'The software applications this contact manages WalkMe on',
            BDR_Name__c: 'The Business Development Representative assigned to this account',
            Bizzabo_Title__c: 'The professional title used for event registrations',
            ABM_Contact__c: 'Indicates this person is part of an Account Based Marketing target list',
            Community_User__c: 'Indicates the contact is an active member of the WalkMe customer community',
            Contact_First_Deployable_Published_Date__c: 'The date this user first published WalkMe content',
            DOZISF__ZoomInfo_Id__c: 'The unique identifier for this contact in the ZoomInfo database',
            Engagement__c: 'A score representing the contact\'s total interaction level with WalkMe',
            Gong_Relevant_Contact__c: 'Flags that this person is frequently mentioned in recorded sales calls',
            Job_Rank__c: 'The seniority level of the contact\'s role (e.g. Non-Manager)',
            Last_Builder_Activity__c: 'The last time the contact performed an action in the WalkMe Editor',
            Last_Community_Activity__c: 'The most recent interaction with the customer community portal',
            LinkedIn_Page__c: 'The direct URL to the contact\'s LinkedIn profile',
            MQL_Timestamp__c: 'When the contact most recently reached Marketing Qualified Lead status',
            Most_Recent_Campaign_Engagement_Name__c: 'The last marketing event the contact attended',
            Outreach_Current_Sequence_Name__c: 'The active automated email track the contact is currently in',
            Pardot_Business_Unit__c: 'The specific marketing database segment',
            Persona_by_Pardot__c: 'The marketing profile category assigned based on behavior',
            Status__c: 'The current sales lifecycle status (e.g. Disqualified, Active)',
            User_Segmentation__c: 'The internal classification of how the contact uses the product (e.g. Active Builder)',
            X6sense_Contact_Grade__c: 'An AI-driven lead quality grade',
            X6sense_Contact_Intent_Score__c: 'Predictive score showing how likely the contact is to purchase',
            absorblms__Resume_Training_Count__c: 'Number of training modules currently in progress in the LMS',
            of_Builder_Events__c: 'Total count of individual actions taken within the WalkMe Editor',
            of_Published_Deployables__c: 'The total number of WalkMe items this contact has pushed to production',
            pi__score__c: 'The Pardot marketing automation activity score'
        }
    },

    Success__c: {
        description: 'WalkMe system/implementation record (one per deployed platform per customer). Use for questions about a customer\'s WalkMe deployment health, adoption scores, go-live dates, contract dates, license utilization, active users, content published, support cases, AI health score, onboarding status, technical configuration, or any per-system operational data. Filter by Account_Name__c using the company name.',
        fields: {
            Id: 'Unique Salesforce ID for this specific success record',
            Name: 'Primary record name (Account + Platform name)',
            Account__c: 'Lookup ID linking this record to the Account object',
            Account_Name__c: 'The display name of the customer company — use this to filter by account',
            Account_Owner__c: 'The name of the Sales Representative owning the account',
            Account_Manager_or_Success_Owner__c: 'Email of the primary CSM or Success Owner',
            Owner_Name_Formula__c: 'Full name of the Success Record owner',
            Owner_CS_Team__c: 'The department/office of the record owner',
            Owner_s_Pod__c: 'The specific internal team unit (Pod) name',
            Customer_Stage__c: 'The current lifecycle phase (e.g. 4 - Live)',
            Customer_Status__c: 'RAG status (Red, Amber, Green) for account health',
            Health_Status__c: 'High-level color indicator of account health',
            Total_Health_Score__c: 'Calculated health percentage (0-100)',
            ai_score__c: 'Qualitative AI health rating (e.g. Excellent)',
            ai_score_explain__c: 'Narrative breakdown of how the AI score was calculated',
            AI_Score_Trend__c: 'The movement of the AI health score (e.g. Up)',
            Renewal_Risk_Score__c: 'Internal score for churn likelihood (1-10)',
            Adoption_Score__c: 'The primary numerical metric for platform usage health',
            Go_Live_Date_Formula__c: 'Calculated date of system deployment',
            Go_live_Date__c: 'The manually verified date of system deployment',
            Contract_Start_Date__c: 'The original activation date of the contract',
            Contract_End_Date_new__c: 'The updated or primary renewal date',
            Next_Renewal_Date__c: 'The upcoming date for contract renewal',
            Days_to_Contract_End_Date__c: 'Countdown (days) until the next renewal',
            Success_ARR__c: 'Actual dollar value (ARR) of this specific record',
            Success_ARR_Bucket__c: 'Revenue range specific to this system record',
            Account_ARR_in_USD__c: 'Total Annual Recurring Revenue for the parent account',
            Account_ACV__c: 'Total Annual Contract Value for the parent account',
            Active_ARR__c: 'The current, non-expired revenue associated with this record',
            Is_Live__c: 'Boolean confirming the system is currently in production',
            Is_Expired__c: 'Indicates if the system is beyond its contract end date',
            Customer_In_Contract__c: 'Boolean indicating if the customer has an active legal agreement',
            Paying_Customer__c: 'Boolean indicating this is not a trial or free account',
            Platform_WalkMe_Implemented_On__c: 'Human-readable name of the software WalkMe is deployed on',
            Implementation_Type__c: 'Deployment model (e.g. SaaS)',
            Service_Type__c: 'The level of service purchased (e.g. Dedicated)',
            Support_Level__c: 'The support package tier (e.g. StandardV2)',
            Market_Segment__c: 'Business tier of the customer (e.g. Enterprise)',
            On_Boarding_Status__c: 'Stage of the implementation process',
            Onboarding__c: 'Categorical status of the initial implementation',
            Success_Completion__c: 'Percentage score of onboarding task completion',
            Distinct_Users_Per_Month__c: 'Current monthly active users (MAU)',
            Engaged_users_last_90_days__c: 'Count of unique active users in the last quarter',
            Last_Month_Engaged_Users__c: 'Unique active users in the previous calendar month',
            Users_WM_Available_To__c: 'Count of users currently exposed to the software',
            Utilization__c: 'Percentage of licensed seats currently active',
            of_Licenses__c: 'Local count of licensed seats',
            License_Utilization_Quantity__c: 'Fraction string of actual users / purchased licenses',
            Exceeded_MAU__c: 'Delta between licensed seats and actual usage',
            of_Deployables__c: 'Total count of active content items (SWTs, Shoutouts, etc.)',
            of_Smart_Walk_Thru_Plays__c: 'Total completions of guided walkthroughs',
            of_ShoutOut_Views__c: 'Total views of pop-up messages',
            of_SmartTip_Plays__c: 'Total interactions with tooltips',
            Last_Publish_Date__c: 'Most recent date any content was pushed to production',
            First_Content_Publish_Date__c: 'Date the first piece of digital adoption content went live',
            Last_Editor_Activity_Date__c: 'Date someone last logged into the content builder',
            Last_Player_Activity_Date__c: 'Date an end-user last interacted with content',
            of_Unique_Builders_in_the_last_3_Month__c: 'Number of active content creators in the last 3 months',
            Number_of_Admins__c: 'Count of users with administrative access to the builder',
            of_Open_Cases__c: 'Current number of unresolved support tickets',
            of_Cases__c: 'Total lifetime support cases',
            Number_of_Open_P1_2_Cases__c: 'Count of critical high-priority support tickets',
            of_Resolved_Cases__c: 'Total count of closed support tickets',
            Success_Summary__c: 'Rich text summarizing business goals and KPIs for this system',
            Customer_Sentiment_Satisfaction__c: 'Detailed text feedback regarding the customer\'s current mood',
            Customer_Support_Comments__c: 'Logs and warnings from the technical support team',
            Use_Case__c: 'Semi-colon separated list of business purposes for the software',
            Services_Suggested_Next_Steps__c: 'Strategic advice from the services team for the customer',
            Days_from_Contract_Start_Date_to_Live__c: 'Velocity metric measuring time to value (days)',
            Days_from_Success_Creation__c: 'Total age of this success record in days',
            of_Days_from_Onboarding_to_Live__c: 'Time to value in days',
            Billable_PS_Hours__c: 'Number of Professional Services hours charged to customer',
            Total_Contract_PS_Hours__c: 'Total hours of Professional Services purchased in the contract',
            SAP_Success__c: 'Flag indicating if this is an SAP-specific implementation',
            DeepUI_Enabled__c: 'Indicates if advanced UI selection features are active',
            Multi_Language_Required__c: 'Flag indicating if the customer needs content in multiple languages',
            Snippet_Product_Status__c: 'Operational status of the code snippet (e.g. Active)',
            Enabled_Features__c: 'List of all technical flags and features active for this user',
            IT__c: 'The software ecosystem WalkMe is implemented on',
            Extension_Download_Link__c: 'URL for the customer to download the browser extension',
            GUID__c: 'The specific unique identifier for this Success record',
            CreatedDate: 'Timestamp when the record was initially saved',
            LastModifiedDate: 'Timestamp of the most recent change to this record'
        }
    }
};

module.exports = { SF_SCHEMA: SF_SCHEMA };



/***/ }),

/***/ 60:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

'use strict';
// snow.auth.js — ServiceNow authentication lifecycle (stub)

var log = (__webpack_require__(52)/* .log */ .R);

function SnowAuth(providerConfig, clientStorageManager, onAuthSuccessCallback) {
    if (!(this instanceof SnowAuth)) return new SnowAuth(providerConfig, clientStorageManager, onAuthSuccessCallback);
    this._providerConfig = providerConfig;
    this._storage = clientStorageManager;
    this._onAuthSuccessCallback = onAuthSuccessCallback;
}

SnowAuth.prototype.checkAndClosePopup = function () {
    log('[ServiceNowAuth] Not yet implemented: checkAndClosePopup');
};

SnowAuth.prototype.openLoginPopup = function () {
    log('[ServiceNowAuth] Not yet implemented: openLoginPopup');
};

SnowAuth.prototype.startLoginPoll = function () {
    log('[ServiceNowAuth] Not yet implemented: startLoginPoll');
};

SnowAuth.prototype.onAuthSuccess = function () {
    log('[ServiceNowAuth] Not yet implemented: onAuthSuccess');
};

module.exports = { SnowAuth: SnowAuth };



/***/ }),

/***/ 439:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

'use strict';
// snow.bridge.js — ServiceNow iframe worker/master bridge
//
// The orchestrator decides whether to call initWorker() or initMaster()
// based on hostname. The constructor does NOT auto-detect or self-execute.

var log = (__webpack_require__(52)/* .log */ .R);

var IFRAME_ID = 'wm-snow-worker-frame';
var FETCH_TIMEOUT_MS = 10000;
var AUTH_TIMEOUT_MS = 15000;
var KEEPALIVE_MS = 5 * 60 * 1000;

var TABLE_MAP = {
    INC: "incident",
    RITM: "sc_req_item",
    REQ: "sc_request",
    SCTASK: "sc_task",
    CHG: "change_request",
    PRB: "problem"
};

function SnowBridge(providerConfig) {
    if (!(this instanceof SnowBridge)) return new SnowBridge(providerConfig);
    this._providerConfig = providerConfig;
    this._pendingResolves = {};
    this._requestQueue = [];
    this._isWorkerReady = false;
    this._requestCounter = 0;
    this._authRequired = false;

    this.onWorkerReady = null;
    this.onAuthRequired = null;
}

// --- WORKER (runs inside the hidden ServiceNow iframe) ---

SnowBridge.prototype.initWorker = function () {
    var domain = this._providerConfig.domain;

    window.addEventListener('message', function (event) {
        if (!event.data) return;

        if (event.data.type === 'WM_FETCH_SNOW_TICKETS') {
            var reqId = event.data.requestId;
            var keys = event.data.keys || [];

            // Reaches into ServiceNow's Angular instance on the page — do not abstract
            var angularObj = window.angular;
            if (!angularObj) {
                window.parent.postMessage({ type: 'WM_SNOW_TICKETS_DATA', requestId: reqId, data: { isError: true, message: 'Angular not found' } }, '*');
                return;
            }

            var $http = angular.element(document.body).injector().get("$http");

            var promises = keys.map(function (input) {
                var match = input.match(/\b(INC|RITM|REQ|SCTASK|CHG|PRB)\d+\b/i);
                if (!match) return Promise.resolve({ key: input, isError: true });

                var number = match[0].toUpperCase();
                var prefixes = Object.keys(TABLE_MAP);
                var prefix = null;
                for (var p = 0; p < prefixes.length; p++) {
                    if (number.indexOf(prefixes[p]) === 0) {
                        prefix = prefixes[p];
                        break;
                    }
                }
                var table = TABLE_MAP[prefix];

                return $http.get("/api/now/table/" + table, {
                    params: {
                        sysparm_query: "number=" + number,
                        sysparm_display_value: true,
                        sysparm_exclude_reference_link: true,
                        sysparm_fields: "number,short_description,state,priority,impact,caller_id,assigned_to,opened_at,sla_due,sys_updated_on,description,close_notes"
                    }
                }).then(function (res) {
                    var result = res.data.result;
                    if (Array.isArray(result) && result.length > 0) {
                        var d = result[0];
                        return {
                            key: number,
                            summary: d.short_description,
                            description: d.description,
                            status: d.state,
                            priority: d.priority,
                            impact: d.impact,
                            assignee: d.assigned_to,
                            openedAt: d.opened_at,
                            slaDue: d.sla_due,
                            lastUpdated: d.sys_updated_on,
                            link: domain + '/nav_to.do?uri=' + table + '.do?sysparm_query=number=' + number
                        };
                    }
                    return { key: number, isNotFound: true };
                }).catch(function () {
                    return { key: number, isError: true };
                });
            });

            Promise.all(promises).then(function (results) {
                window.parent.postMessage({ type: 'WM_SNOW_TICKETS_DATA', requestId: reqId, data: results }, '*');
            });
        }

        if (event.data.type === 'WM_FETCH_SNOW_USER_TICKETS') {
            var utReqId = event.data.requestId;
            var userName = event.data.userName || '';

            var angularForUT = window.angular;
            if (!angularForUT) {
                window.parent.postMessage({ type: 'WM_SNOW_USER_TICKETS_DATA', requestId: utReqId, data: { isError: true, message: 'Angular not found' } }, '*');
                return;
            }

            var $httpUT = angular.element(document.body).injector().get("$http");
            var utQuery = "opened_by.name=" + userName + "^active=true^sys_class_name!=sc_request^ORDERBYDESCopened_at";

            var angularPromise = $httpUT.get("/api/now/table/task", {
                params: {
                    sysparm_query: utQuery,
                    sysparm_display_value: true,
                    sysparm_exclude_reference_link: true,
                    sysparm_fields: "sys_class_name,number,short_description,state,priority,opened_at",
                    sysparm_limit: 50
                }
            });

            Promise.resolve(angularPromise).then(function (res) {
                var rows = (res.data && res.data.result) || [];
                var mapped = [];
                for (var r = 0; r < rows.length; r++) {
                    mapped.push({
                        type: rows[r].sys_class_name,
                        number: rows[r].number,
                        title: rows[r].short_description,
                        state: rows[r].state,
                        priority: rows[r].priority,
                        openedAt: rows[r].opened_at,
                        link: domain + '/nav_to.do?uri=task.do?sysparm_query=number=' + rows[r].number
                    });
                }
                window.parent.postMessage({ type: 'WM_SNOW_USER_TICKETS_DATA', requestId: utReqId, data: mapped }, '*');
            }).catch(function (err) {
                window.parent.postMessage({ type: 'WM_SNOW_USER_TICKETS_DATA', requestId: utReqId, data: { isError: true, message: String(err) } }, '*');
            });
        }
    });

    if (window.angular) {
        log('[SNOW Worker] Auth OK — posting WM_SNOW_WORKER_READY');
        window.parent.postMessage({ type: 'WM_SNOW_WORKER_READY' }, '*');

        setInterval(function () {
            if (!window.angular) {
                log('[SNOW Worker] Keepalive failed (Angular gone) — posting WM_SNOW_AUTH_REQUIRED');
                window.parent.postMessage({ type: 'WM_SNOW_AUTH_REQUIRED' }, '*');
            }
        }, KEEPALIVE_MS);
    } else {
        log('[SNOW Worker] Auth failed (no Angular) — posting WM_SNOW_AUTH_REQUIRED');
        window.parent.postMessage({ type: 'WM_SNOW_AUTH_REQUIRED' }, '*');
    }
};

// --- MASTER (runs in the host page, e.g. Gmail) ---

SnowBridge.prototype.initMaster = function () {
    var self = this;
    var domain = this._providerConfig.domain;
    var entryPath = this._providerConfig.iframeEntryPath;

    log('[SNOW Master] initMaster called. domain=' + domain + ' entryPath=' + entryPath);

    if (!document.getElementById(IFRAME_ID)) {
        var f = document.createElement('iframe');
        f.id = IFRAME_ID;
        f.src = domain + entryPath;
        f.sandbox = 'allow-scripts allow-same-origin allow-forms';
        f.style.cssText = "position:fixed; bottom:20px; right:340px; width:300px; height:150px; border:4px solid purple; z-index:99999; background:white; visibility:hidden;";

        try {
            var isDebug = (localStorage.getItem('cf-dbg') === '1');
            if (isDebug) f.style.visibility = "visible";
        } catch (e) { /* localStorage may be blocked */ }

        document.body.appendChild(f);
    }

    self._authTimer = setTimeout(function () {
        if (!self._isWorkerReady && !self._authRequired) {
            log('[SNOW Master] Worker did not respond in ' + AUTH_TIMEOUT_MS + 'ms — assuming auth required');
            self._handleAuthRequired();
        }
    }, AUTH_TIMEOUT_MS);

    if (!window.wmSnowListenerAttached) {
        window.addEventListener('message', function (event) {
            if (!event.data) return;

            if (event.data.type === 'WM_SNOW_WORKER_READY') {
                log('[SNOW Master] Received WM_SNOW_WORKER_READY');
                self._isWorkerReady = true;
                self._authRequired = false;
                if (self._authTimer) { clearTimeout(self._authTimer); self._authTimer = null; }
                var frame = document.getElementById(IFRAME_ID);
                if (frame) frame.style.borderColor = "green";

                while (self._requestQueue.length) {
                    var r = self._requestQueue.shift();
                    if (r._isUserTickets) self._sendUserTicketsToIframe(r.requestId, r.userName);
                    else self._sendToIframe(r.requestId, r.keys);
                }

                if (self.onWorkerReady) self.onWorkerReady();
            }

            if (event.data.type === 'WM_SNOW_AUTH_REQUIRED') {
                log('[SNOW Master] Received WM_SNOW_AUTH_REQUIRED');
                if (self._authTimer) { clearTimeout(self._authTimer); self._authTimer = null; }
                self._handleAuthRequired();
            }

            if (event.data.type === 'WM_SNOW_TICKETS_DATA' || event.data.type === 'WM_SNOW_USER_TICKETS_DATA') {
                var id = event.data.requestId;
                if (self._pendingResolves[id]) {
                    self._pendingResolves[id](event.data.data);
                    delete self._pendingResolves[id];
                }
            }
        });
        window.wmSnowListenerAttached = true;
    }
};

SnowBridge.prototype.fetchTickets = function (keys) {
    var self = this;
    if (self._authRequired) {
        return Promise.resolve({ needsAuth: true });
    }
    return new Promise(function (resolve) {
        var id = 'snow_req_' + Date.now() + '_' + (++self._requestCounter);

        var safetyTimer = setTimeout(function () {
            if (self._pendingResolves[id]) {
                log('[SNOW Master] TIMEOUT after ' + FETCH_TIMEOUT_MS + 'ms for tickets');
                self._pendingResolves[id]([]);
                delete self._pendingResolves[id];
            }
        }, FETCH_TIMEOUT_MS);

        self._pendingResolves[id] = function (data) {
            clearTimeout(safetyTimer);
            resolve(data);
        };

        if (self._isWorkerReady) self._sendToIframe(id, keys);
        else self._requestQueue.push({ requestId: id, keys: keys });
    });
};

SnowBridge.prototype.fetchUserTickets = function (userName) {
    var self = this;
    if (self._authRequired) {
        return Promise.resolve({ needsAuth: true });
    }
    return new Promise(function (resolve) {
        var id = 'snow_ut_' + Date.now() + '_' + (++self._requestCounter);

        var safetyTimer = setTimeout(function () {
            if (self._pendingResolves[id]) {
                log('[SNOW Master] TIMEOUT after ' + FETCH_TIMEOUT_MS + 'ms for user tickets');
                self._pendingResolves[id]([]);
                delete self._pendingResolves[id];
            }
        }, FETCH_TIMEOUT_MS);

        self._pendingResolves[id] = function (data) {
            clearTimeout(safetyTimer);
            resolve(data);
        };

        if (self._isWorkerReady) self._sendUserTicketsToIframe(id, userName);
        else self._requestQueue.push({ requestId: id, userName: userName, _isUserTickets: true });
    });
};

SnowBridge.prototype._handleAuthRequired = function () {
    this._authRequired = true;
    this._isWorkerReady = false;
    var frame = document.getElementById(IFRAME_ID);
    if (frame) frame.style.borderColor = "red";

    var ids = Object.keys(this._pendingResolves);
    for (var i = 0; i < ids.length; i++) {
        this._pendingResolves[ids[i]]({ needsAuth: true });
        delete this._pendingResolves[ids[i]];
    }

    if (this.onAuthRequired) this.onAuthRequired();
};

SnowBridge.prototype.openLoginPopup = function () {
    var self = this;
    var domain = this._providerConfig.domain;
    var entryPath = this._providerConfig.iframeEntryPath;
    var url = domain + entryPath;
    var w = 600, h = 700;
    var l = (screen.width / 2) - (w / 2);
    var t = (screen.height / 2) - (h / 2);
    log('[SNOW Master] Opening login popup: ' + url);
    var popup = window.open(url, 'SnowLogin', 'width=' + w + ',height=' + h + ',top=' + t + ',left=' + l);

    var pollInterval = setInterval(function () {
        if (!popup || popup.closed) {
            clearInterval(pollInterval);
            log('[SNOW Master] Login popup closed — refreshing iframe');
            self._isWorkerReady = false;
            self._authRequired = false;
            var frame = document.getElementById(IFRAME_ID);
            if (frame) {
                frame.src = frame.src;
                frame.style.borderColor = "orange";
            }
        }
    }, 1000);
};

SnowBridge.prototype._sendToIframe = function (id, keys) {
    var f = document.getElementById(IFRAME_ID);
    if (f && f.contentWindow) f.contentWindow.postMessage({ type: 'WM_FETCH_SNOW_TICKETS', requestId: id, keys: keys }, '*');
};

SnowBridge.prototype._sendUserTicketsToIframe = function (id, userName) {
    var f = document.getElementById(IFRAME_ID);
    if (f && f.contentWindow) f.contentWindow.postMessage({ type: 'WM_FETCH_SNOW_USER_TICKETS', requestId: id, userName: userName }, '*');
};

module.exports = { SnowBridge: SnowBridge };



/***/ }),

/***/ 955:
/***/ (function(module) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

'use strict';
// snow.provider.js — ServiceNow ticket provider

function SnowProvider(bridge, auth, providerConfig, cacheManager) {
    if (!(this instanceof SnowProvider)) return new SnowProvider(bridge, auth, providerConfig, cacheManager);
    this._bridge = bridge;
    this._auth = auth;
    this._providerConfig = providerConfig;
    this._cacheManager = cacheManager || null;
}

SnowProvider.prototype.entityType = 'snow_ticket';

SnowProvider.prototype.fetchData = function (keys) {
    var self = this;
    if (this._cacheManager) {
        return this._cacheManager.fetchSnowTickets(keys, function (missing) {
            return self._bridge.fetchTickets(missing);
        });
    }
    return this._bridge.fetchTickets(keys);
};

SnowProvider.prototype.fetchUserTickets = function (userName) {
    var self = this;
    if (this._cacheManager) {
        return this._cacheManager.fetchSnowUserTickets(userName, function (name) {
            return self._bridge.fetchUserTickets(name);
        });
    }
    return this._bridge.fetchUserTickets(userName);
};

SnowProvider.prototype.getSchema = function (ticket) {
    if (!ticket) return null;

    if (ticket.needsAuth === true) {
        return {
            type: 'snow_auth',
            title: ticket.key || 'ServiceNow',
            message: 'Access your Service Now account\nfor details',
            linkLabel: 'Log in',
            action: 'LOGIN_SNOW'
        };
    }

    if (ticket.isError || ticket.isNotFound) return null;

    return {
        type: 'snow_ticket',
        title: ticket.key,
        subtitle: ticket.summary || 'ServiceNow Ticket',
        description: ticket.description,
        rows: [
            { label: 'State', value: ticket.status || 'Unknown' },
            { label: 'Priority', value: ticket.priority || 'Normal' },
            { label: 'Impact', value: ticket.impact || '—' },
            { label: 'Assigned to', value: ticket.assignee || 'Unassigned' },
            { label: 'SLA due', value: ticket.slaDue || '—' },
            { label: 'Last updated on', value: ticket.lastUpdated || '—' }
        ],
        link: ticket.link,
        linkLabel: 'Open in ServiceNow'
    };
};

SnowProvider.prototype.requiresAuth = function () {
    return false;
};

SnowProvider.prototype.startAuth = function () {};

SnowProvider.prototype.onAuthSuccess = function () {};

module.exports = { SnowProvider: SnowProvider };



/***/ }),

/***/ 425:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

'use strict';
// sap.auth.js — SuccessFactors authentication lifecycle (stub)

var log = (__webpack_require__(52)/* .log */ .R);

function SapAuth(providerConfig, clientStorageManager, onAuthSuccessCallback) {
    if (!(this instanceof SapAuth)) return new SapAuth(providerConfig, clientStorageManager, onAuthSuccessCallback);
    this._providerConfig = providerConfig;
    this._storage = clientStorageManager;
    this._onAuthSuccessCallback = onAuthSuccessCallback;
}

SapAuth.prototype.checkAndClosePopup = function () {
    log('[SapAuth] Not yet implemented: checkAndClosePopup');
};

SapAuth.prototype.openLoginPopup = function () {
    log('[SapAuth] Not yet implemented: openLoginPopup');
};

SapAuth.prototype.startLoginPoll = function () {
    log('[SapAuth] Not yet implemented: startLoginPoll');
};

SapAuth.prototype.onAuthSuccess = function () {
    log('[SapAuth] Not yet implemented: onAuthSuccess');
};

module.exports = { SapAuth: SapAuth };



/***/ }),

/***/ 913:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

'use strict';
// sap.bridge.js — SuccessFactors iframe worker/master bridge
//
// The orchestrator decides whether to call initWorker() or initMaster()
// based on hostname. The constructor does NOT auto-detect or self-execute.

var log = (__webpack_require__(52)/* .log */ .R);

var IFRAME_ID = 'wm-sap-worker-frame';
var FETCH_TIMEOUT_MS = 30000;
var AUTH_TIMEOUT_MS = 15000;
var KEEPALIVE_MS = 5 * 60 * 1000;
var JOB_INFO_CONCURRENCY = 4;
var SEARCH_CONCURRENCY = 4;

function SapBridge(providerConfig) {
    if (!(this instanceof SapBridge)) return new SapBridge(providerConfig);
    this._providerConfig = providerConfig;
    this._pendingResolves = {};
    this._requestQueue = [];
    this._isWorkerReady = false;

    this._requestCounter = 0;
    this._authRequired = false;
    this.onWorkerReady = null;
    this.onEmployeesUpdate = null;
    this.onAuthRequired = null;
}

// --- WORKER (runs inside the hidden SuccessFactors iframe) ---

SapBridge.prototype.initWorker = function () {
    var domain = this._providerConfig.domain;
    var cachedToken = null;

    log('[SAP Worker] initWorker called. domain=' + domain + ' location=' + window.location.href);

    function fetchCsrfToken() {
        log('[SAP Worker] Fetching CSRF token from ' + domain + '/odata/v2/User');
        return Promise.resolve(
            fetch(domain + '/odata/v2/User', {
                method: 'GET',
                headers: { 'x-csrf-token': 'fetch' },
                credentials: 'include'
            })
        ).then(function (res) {
            log('[SAP Worker] CSRF fetch status=' + res.status);
            var token = res.headers.get('x-csrf-token');
            if (token) {
                cachedToken = token;
                log('[SAP Worker] CSRF token cached (length=' + token.length + ')');
                return token;
            }
            return Promise.reject('No CSRF token in response');
        });
    }

    function searchPerson(name, token) {
        log('[SAP Worker] Searching person: ' + name);
        return Promise.resolve(
            fetch(domain + '/odata/v2/restricted/_ActionSearch_/queryActionSearch', {
                method: 'POST',
                headers: {
                    'accept': 'application/json',
                    'x-csrf-token': token,
                    'x-ajax-token': token,
                    'x-subaction': '1',
                    'content-type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify({
                    requireDeeplinks: false,
                    actionStartNum: 0,
                    peopleStartNum: 0,
                    actionPageSize: 10,
                    peoplePageSize: 10,
                    queryType: 'people_action',
                    keywords: name,
                    keys: ['TITLE']
                })
            })
        ).then(function (res) {
            log('[SAP Worker] Search response status=' + res.status + ' for "' + name + '"');
            if (res.status === 403) {
                log('[SAP Worker] 403 — refetching CSRF token');
                return fetchCsrfToken().then(function (newToken) {
                    return searchPerson(name, newToken);
                });
            }
            if (!res.ok) return res.text().then(function (t) { return Promise.reject(t); });
            return res.json();
        }).then(function (json) {
            try {
                var results = json.d.GlobalSearchResultVO.peoples.items.results || [];
                log('[SAP Worker] Got ' + results.length + ' results for "' + name + '"');
                return results;
            } catch (e) {
                log('[SAP Worker] Parse error for "' + name + '": ' + e);
                return [];
            }
        });
    }

    function getTodayIsoDate() {
        return new Date().toISOString().slice(0, 10);
    }

    function enrichPersonWithJobInfo(person, token, retryCount) {
        retryCount = retryCount || 0;
        var assignmentUUID = person && (person.assignmentUUID || person.userIdEncoded);
        if (!assignmentUUID) {
            person._enriched = true;
            return Promise.resolve(person);
        }

        var jobUrl = domain +
            '/rest/workforce/uiconfig/v1/configs/PPXJobInfo?assignmentUUID=' +
            encodeURIComponent(assignmentUUID) +
            '&$at=' + encodeURIComponent(getTodayIsoDate()) +
            '&$expand=' + encodeURIComponent('jobDetails($select=*),pendingApprovals($expand=jobDetails($select=*;$count=true))');

        return Promise.resolve(
            fetch(jobUrl, {
                method: 'GET',
                headers: {
                    'accept': 'application/uiconfig-schema-instance+json',
                    'x-csrf-token': token,
                    'x-ajax-token': token,
                    'x-subaction': '1'
                },
                credentials: 'include'
            })
        ).then(function (res) {
            if (res.status === 403 && retryCount < 1) {
                return fetchCsrfToken().then(function (newToken) {
                    return enrichPersonWithJobInfo(person, newToken, retryCount + 1);
                });
            }
            if (!res.ok) {
                person._enriched = true;
                return Promise.resolve(person);
            }
            return res.json().then(function (jobData) {
                try {
                    var details = (jobData && jobData.$data && jobData.$data.jobDetails && jobData.$data.jobDetails[0]) || {};
                    person.managerName =
                        (details.managerIdDetail && details.managerIdDetail.displayName) ||
                        details.managerDisplayName ||
                        person.managerName ||
                        null;
                    person.departmentName =
                        (details.divisionDetail && details.divisionDetail.label) ||
                        (details.divisionDetail && details.divisionDetail.code) ||
                        details.department ||
                        (details.departmentDetail && details.departmentDetail.label) ||
                        (details.departmentDetail && details.departmentDetail.code) ||
                        details.departmentName ||
                        person.departmentName ||
                        null;
                    person.locationName =
                        (details.locationDetail && details.locationDetail.label) ||
                        (details.locationDetail && details.locationDetail.code) ||
                        details.location ||
                        details.locationName ||
                        (details.countryOfCompanyDetail && details.countryOfCompanyDetail.label) ||
                        details.country ||
                        person.locationName ||
                        null;
                    person.jobTitle =
                        details.jobTitle ||
                        person.jobTitle ||
                        null;
                } catch (e) { /* keep original person record */ }
                person._enriched = true;
                return person;
            });
        }).catch(function () {
            person._enriched = true;
            return person;
        });
    }

    function mapWithConcurrency(items, limit, mapper) {
        if (!items || items.length === 0) return Promise.resolve([]);
        var out = new Array(items.length);
        var nextIndex = 0;
        var active = 0;
        var errors = [];

        return new Promise(function (resolve) {
            function pump() {
                if (nextIndex >= items.length && active === 0) {
                    if (errors.length > 0) {
                        log('[SAP Worker] mapWithConcurrency completed with ' + errors.length + ' errors');
                    }
                    resolve(out);
                    return;
                }

                while (active < limit && nextIndex < items.length) {
                    (function (idx) {
                        active++;
                        Promise.resolve(mapper(items[idx], idx))
                            .then(function (v) { out[idx] = v; })
                            .catch(function (err) {
                                errors.push({ index: idx, error: err });
                                out[idx] = items[idx];
                            })
                            .then(function () {
                                active--;
                                pump();
                            });
                    })(nextIndex++);
                }
            }
            pump();
        });
    }

    function searchInBatches(names, token, reqId) {
        var allFlat = [];
        var seen = {};
        var idx = 0;

        function runNextBatch() {
            if (idx >= names.length) return Promise.resolve(allFlat);

            var batchNames = names.slice(idx, idx + SEARCH_CONCURRENCY);
            idx += SEARCH_CONCURRENCY;

            var searches = [];
            for (var i = 0; i < batchNames.length; i++) {
                searches.push(searchPerson(batchNames[i], token));
            }

            return Promise.all(searches).then(function (resultsArrays) {
                var batchFlat = [];
                for (var a = 0; a < resultsArrays.length; a++) {
                    var arr = resultsArrays[a];
                    for (var b = 0; b < arr.length; b++) {
                        var item = arr[b];
                        if (item.userId && !seen[item.userId]) {
                            seen[item.userId] = true;
                            allFlat.push(item);
                            batchFlat.push(item);
                        }
                    }
                }

                if (batchFlat.length > 0) {
                    window.parent.postMessage({
                        type: 'WM_SAP_EMPLOYEES_DATA',
                        requestId: reqId,
                        data: batchFlat,
                        isPartial: true
                    }, '*');
                }

                return runNextBatch();
            });
        }

        return runNextBatch();
    }

    function handleFetch(names, reqId) {
        log('[SAP Worker] handleFetch reqId=' + reqId + ' names=' + JSON.stringify(names));
        var tokenPromise = cachedToken ? Promise.resolve(cachedToken) : fetchCsrfToken();

        tokenPromise.then(function (token) {
            return searchInBatches(names, token, reqId);
        }).then(function (flat) {
            return tokenPromise.then(function (token) {
                return mapWithConcurrency(flat, JOB_INFO_CONCURRENCY, function (person) {
                    return enrichPersonWithJobInfo(person, token);
                });
            });
        }).then(function (enrichedPeople) {
            var finalPeople = Array.isArray(enrichedPeople) ? enrichedPeople : [];
            log('[SAP Worker] Posting ' + finalPeople.length + ' enriched results for reqId=' + reqId);
            window.parent.postMessage({ type: 'WM_SAP_EMPLOYEES_DATA', requestId: reqId, data: finalPeople, isPartial: false }, '*');
        }).catch(function (err) {
            log('[SAP Worker] handleFetch error: ' + String(err));
            window.parent.postMessage({ type: 'WM_SAP_EMPLOYEES_DATA', requestId: reqId, data: { isError: true, message: String(err) } }, '*');
        });
    }

    window.addEventListener('message', function (event) {
        if (!event.data) return;

        if (event.data.type === 'WM_FETCH_SAP_EMPLOYEES') {
            handleFetch(event.data.names || [], event.data.requestId);
        }
    });

    fetchCsrfToken().then(function () {
        log('[SAP Worker] Auth OK — posting WM_SAP_WORKER_READY');
        window.parent.postMessage({ type: 'WM_SAP_WORKER_READY' }, '*');

        setInterval(function () {
            fetchCsrfToken().catch(function () {
                log('[SAP Worker] Keepalive failed — posting WM_SAP_AUTH_REQUIRED');
                window.parent.postMessage({ type: 'WM_SAP_AUTH_REQUIRED' }, '*');
            });
        }, KEEPALIVE_MS);
    }).catch(function (err) {
        log('[SAP Worker] Auth failed — posting WM_SAP_AUTH_REQUIRED: ' + err);
        window.parent.postMessage({ type: 'WM_SAP_AUTH_REQUIRED' }, '*');
    });
};

// --- MASTER (runs in the host page, e.g. Gmail) ---

SapBridge.prototype.initMaster = function () {
    var self = this;
    var domain = this._providerConfig.domain;
    var entryPath = this._providerConfig.iframeEntryPath;

    log('[SAP Master] initMaster called. domain=' + domain + ' entryPath=' + entryPath);

    if (!document.getElementById(IFRAME_ID)) {
        var f = document.createElement('iframe');
        f.id = IFRAME_ID;
        f.src = domain + entryPath;
        f.sandbox = 'allow-scripts allow-same-origin allow-forms';
        f.style.cssText = "position:fixed; bottom:20px; right:960px; width:300px; height:150px; border:4px solid purple; z-index:99999; background:white; visibility:hidden;";

        try {
            var isDebug = (localStorage.getItem('cf-dbg') === '1');
            if (isDebug) f.style.visibility = "visible";
        } catch (e) { /* localStorage may be blocked */ }

        f.addEventListener('load', function () { log('[SAP Master] Iframe loaded. src=' + f.src); });
        f.addEventListener('error', function () { log('[SAP Master] Iframe FAILED to load.'); });
        document.body.appendChild(f);
        log('[SAP Master] Iframe created: ' + domain + entryPath);
    } else {
        log('[SAP Master] Iframe already exists in DOM');
    }

    self._authTimer = setTimeout(function () {
        if (!self._isWorkerReady && !self._authRequired) {
            log('[SAP Master] Worker did not respond in ' + AUTH_TIMEOUT_MS + 'ms — assuming auth required');
            self._handleAuthRequired();
        }
    }, AUTH_TIMEOUT_MS);

    if (!window.wmSapListenerAttached) {
        window.addEventListener('message', function (event) {
            if (!event.data) return;

            if (event.data.type === 'WM_SAP_WORKER_READY') {
                log('[SAP Master] Received WM_SAP_WORKER_READY!');
                self._isWorkerReady = true;
                self._authRequired = false;
                if (self._authTimer) { clearTimeout(self._authTimer); self._authTimer = null; }
                var frame = document.getElementById(IFRAME_ID);
                if (frame) frame.style.borderColor = "green";

                while (self._requestQueue.length) {
                    var r = self._requestQueue.shift();
                    self._sendToIframe(r.requestId, r.names);
                }

                if (self.onWorkerReady) self.onWorkerReady();
            }

            if (event.data.type === 'WM_SAP_AUTH_REQUIRED') {
                log('[SAP Master] Received WM_SAP_AUTH_REQUIRED');
                if (self._authTimer) { clearTimeout(self._authTimer); self._authTimer = null; }
                self._handleAuthRequired();
            }

            if (event.data.type === 'WM_SAP_EMPLOYEES_DATA') {
                var id = event.data.requestId;
                var isPartial = !!event.data.isPartial;
                log('[SAP Master] Received WM_SAP_EMPLOYEES_DATA reqId=' + id + ' isPartial=' + isPartial);
                if (self._pendingResolves[id]) {
                    if (isPartial) {
                        if (self.onEmployeesUpdate && Array.isArray(event.data.data)) {
                            self.onEmployeesUpdate(event.data.data);
                        }
                    } else {
                        self._pendingResolves[id](event.data.data);
                        delete self._pendingResolves[id];
                    }
                } else if (self.onEmployeesUpdate && Array.isArray(event.data.data)) {
                    self.onEmployeesUpdate(event.data.data);
                }
            }
        });
        window.wmSapListenerAttached = true;
    }
};

SapBridge.prototype.fetchEmployees = function (names) {
    var self = this;
    log('[SAP Master] fetchEmployees called. names=' + JSON.stringify(names) + ' workerReady=' + self._isWorkerReady + ' authRequired=' + self._authRequired);
    if (self._authRequired) {
        return Promise.resolve({ needsAuth: true });
    }
    return new Promise(function (resolve) {
        var id = 'sap_req_' + Date.now() + '_' + (++self._requestCounter);

        var safetyTimer = setTimeout(function () {
            if (self._pendingResolves[id]) {
                log('[SAP Master] TIMEOUT after ' + FETCH_TIMEOUT_MS + 'ms. workerReady=' + self._isWorkerReady + ' queueLen=' + self._requestQueue.length);
                self._pendingResolves[id]([]);
                delete self._pendingResolves[id];
            }
        }, FETCH_TIMEOUT_MS);

        self._pendingResolves[id] = function (data) {
            clearTimeout(safetyTimer);
            resolve(data);
        };

        if (self._isWorkerReady) self._sendToIframe(id, names);
        else {
            log('[SAP Master] Worker not ready, queuing request ' + id);
            self._requestQueue.push({ requestId: id, names: names });
        }
    });
};

SapBridge.prototype._handleAuthRequired = function () {
    this._authRequired = true;
    this._isWorkerReady = false;
    var frame = document.getElementById(IFRAME_ID);
    if (frame) frame.style.borderColor = "red";

    var ids = Object.keys(this._pendingResolves);
    for (var i = 0; i < ids.length; i++) {
        this._pendingResolves[ids[i]]({ needsAuth: true });
        delete this._pendingResolves[ids[i]];
    }

    if (this.onAuthRequired) this.onAuthRequired();
};

SapBridge.prototype.openLoginPopup = function () {
    var self = this;
    var domain = this._providerConfig.domain;
    var entryPath = this._providerConfig.iframeEntryPath;
    var url = domain + entryPath;
    var w = 600, h = 700;
    var l = (screen.width / 2) - (w / 2);
    var t = (screen.height / 2) - (h / 2);
    log('[SAP Master] Opening login popup: ' + url);
    var popup = window.open(url, 'SapLogin', 'width=' + w + ',height=' + h + ',top=' + t + ',left=' + l);

    var pollInterval = setInterval(function () {
        if (!popup || popup.closed) {
            clearInterval(pollInterval);
            log('[SAP Master] Login popup closed — refreshing iframe');
            self._isWorkerReady = false;
            self._authRequired = false;
            var frame = document.getElementById(IFRAME_ID);
            if (frame) {
                frame.src = frame.src;
                frame.style.borderColor = "orange";
            }
        }
    }, 1000);
};

SapBridge.prototype._sendToIframe = function (id, names) {
    var f = document.getElementById(IFRAME_ID);
    if (f && f.contentWindow) f.contentWindow.postMessage({ type: 'WM_FETCH_SAP_EMPLOYEES', requestId: id, names: names }, '*');
};

module.exports = { SapBridge: SapBridge };



/***/ }),

/***/ 886:
/***/ (function(module) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

'use strict';
// sap.provider.js — SuccessFactors Employee provider

function SapProvider(bridge, providerConfig, cacheManager) {
    if (!(this instanceof SapProvider)) return new SapProvider(bridge, providerConfig, cacheManager);
    this._bridge = bridge;
    this._providerConfig = providerConfig;
    this._cacheManager = cacheManager || null;
}

SapProvider.prototype.entityType = 'successfactors_employee';

SapProvider.prototype.fetchData = function (names) {
    var self = this;
    if (this._cacheManager) {
        return this._cacheManager.fetchSapEmployees(names, function (missing) {
            return self._bridge.fetchEmployees(missing);
        });
    }
    return this._bridge.fetchEmployees(names);
};

SapProvider.prototype.getSchema = function (record) {
    if (!record) return null;

    if (record.needsAuth === true) {
        return {
            type: 'sap_auth',
            title: record.name || 'SuccessFactors',
            message: 'Access your SuccessFactors account\nfor details',
            linkLabel: 'Log in',
            action: 'LOGIN_SAP'
        };
    }

    var titleValue = record.jobTitle || '';
    try {
        var results = record.keyValues && record.keyValues.results;
        if (results) {
            for (var i = 0; i < results.length; i++) {
                if (results[i].key === 'TITLE') {
                    titleValue = results[i].value;
                    break;
                }
            }
        }
    } catch (e) { /* guard nested access */ }

    var isEnriched = !!record._enriched;
    var managerName = isEnriched ? (record.managerName || 'N/A') : '__loading__';
    if (managerName === 'Moran Shemer') managerName = 'R&M™';
    var departmentName = isEnriched ? (record.departmentName || 'N/A') : '__loading__';
    var locationName = isEnriched ? (record.locationName || 'N/A') : '__loading__';
    var encodedUser = record.assignmentUUID || record.userIdEncoded || null;
    var profileLink = this._providerConfig.domain + '/sf/liveprofile?user_id=' + record.userId;
    var orgChartLink = null;
    if (encodedUser) {
        var companyParam = '&bplte_company=sapitbusysP';
        profileLink = this._providerConfig.domain + '/sf/liveprofile?selected_user_encoded=' + encodedUser + companyParam;
        orgChartLink = this._providerConfig.domain + '/sf/orgchart?selected_user_encoded=' + encodedUser + companyParam;
    }

    return {
        type: 'employee',
        title: record.generalDisplayName,
        email: record.email || '',
        subtitle: titleValue || 'SuccessFactors Employee',
        rows: [
            { label: 'Role', value: titleValue || 'N/A' },
            { label: 'Manager', value: managerName, isClickable: true },
            { label: 'Department', value: departmentName },
            { label: 'Location', value: locationName }
        ],
        link: profileLink,
        orgChartLink: orgChartLink,
        linkLabel: 'View profile'
    };
};

SapProvider.prototype.requiresAuth = function () {
    return false;
};

SapProvider.prototype.startAuth = function () {};

SapProvider.prototype.onAuthSuccess = function () {};

module.exports = { SapProvider: SapProvider };



/***/ }),

/***/ 186:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

'use strict';
// ner.scanner.js — LLM-based Named Entity Recognition scanner

var log = (__webpack_require__(52)/* .log */ .R);

function NerScanner(aiFetcher, config, cache) {
    if (!(this instanceof NerScanner)) return new NerScanner(aiFetcher, config, cache);
    this._aiFetcher = aiFetcher;
    this._config = config;
    this._cache = cache;
}

NerScanner.prototype.callLLM = function (prompt, schema, funcName) {
    var llmRequestBody = {
        stream: false,
        as_text: true,
        temperature: 0,
        max_tokens: 2000,
        messages: [{ role: 'system', content: prompt }]
    };

    if (schema) {
        llmRequestBody.response_format = {
            type: "json_schema",
            json_schema: schema
        };
    } else {
        llmRequestBody.response_format = { type: "json_object" };
    }

    var funcToRun = funcName || 'freePromptMini';

    return this._aiFetcher.sendCustomLlmRequest(llmRequestBody, funcToRun)
        .then(function (response) {
            try {
                if (typeof response === 'object') return response;
                if (typeof response === 'string') {
                    var cleanJson = response.replace(/^```json\s*/i, '').replace(/^```\s*/i, '').replace(/```\s*$/, '');
                    return JSON.parse(cleanJson);
                }
                return {};
            } catch (e) {
                log('[SmartHighlights] JSON Parse Error: ' + e.message);
                return {};
            }
        });
};

NerScanner.prototype.scan = function (text) {
    var self = this;
    var cacheKey = 'ner:' + text;

    if (this._cache) {
        var cached = this._cache.get(cacheKey);
        if (cached) return Promise.resolve(cached);
    }

    var entities = this._config.entities;
    var nerEntities = [];
    var i;
    for (i = 0; i < entities.length; i++) {
        if (entities[i].ner) {
            nerEntities.push(entities[i]);
        }
    }

    var hintLines = [];
    var schemaProperties = {};
    var requiredFields = [];

    for (i = 0; i < nerEntities.length; i++) {
        var category = nerEntities[i].ner;
        hintLines.push((i + 1) + ". " + category);
        schemaProperties[category] = {
            "type": "array",
            "items": { "type": "string" },
            "description": "List of " + category.toLowerCase() + " found in the text",
            "minItems": 0
        };
        requiredFields.push(category);
    }

    var context = this._config.context ? " from " + this._config.context : "";
    var hintText = hintLines.join('\n');
    var prompt = "You are an expert at extracting Named Entity Recognition (NER) from input text" + context +
        ". The hint should guide you on what to extract the entities:\n\n" +
        "<hint>\n" + hintText + "\n</hint>\n" +
        "<input text>\n" + text + "\n</input text>\n\n" +
        "<examples>\nCompany Names: ['Charles Schwab', 'IBM', 'JP Morgan', 'State Farm']\nPeople Names: ['Maya Arad', 'Chayim Ehrman', 'Or Elmaliah'] (for pepole names - find ONLY full names: first name last name, ignore pepole names with one word)\n\n" +
        "The output should be a dictionary where keys are the categories from the hint and values are lists of named entities matching each category, If no entities are found for a category, return an empty list for that category.\n" +
        "Output:";

    var schema = {
        "name": "Named-Entities-Recognition",
        "strict": true,
        "schema": {
            "type": "object",
            "properties": schemaProperties,
            "required": requiredFields,
            "additionalProperties": false
        }
    };

    return this.callLLM(prompt, schema, this._config.llm.nerFunction).then(function (response) {
        var cleanedResponse = {};
        var keys = Object.keys(response);
        for (var k = 0; k < keys.length; k++) {
            var key = keys[k];
            var rawList = response[key] || [];
            var uniqueList = [];
            for (var j = 0; j < rawList.length; j++) {
                var cleanEntity = rawList[j].trim();
                if (uniqueList.indexOf(cleanEntity) === -1) {
                    var lower = cleanEntity.toLowerCase();
                    var blocked = false;
                    var blacklist = self._config.nerBlacklist || [];
                    for (var b = 0; b < blacklist.length; b++) {
                        if (lower.indexOf(blacklist[b]) !== -1) {
                            blocked = true;
                            break;
                        }
                    }
                    if (!blocked) {
                        uniqueList.push(cleanEntity);
                    }
                }
            }
            cleanedResponse[key] = uniqueList;
        }

        if (self._cache) {
            self._cache.set(cacheKey, cleanedResponse);
        }
        return cleanedResponse;
    });
};

module.exports = { NerScanner: NerScanner };



/***/ }),

/***/ 488:
/***/ (function(module) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

'use strict';
// regex.scanner.js — regex-based entity scanner

function RegexScanner(config) {
    if (!(this instanceof RegexScanner)) return new RegexScanner(config);
    this._config = config;
}

RegexScanner.prototype.scan = function (text) {
    var entities = this._config.entities;
    var results = {};

    for (var i = 0; i < entities.length; i++) {
        var entity = entities[i];
        if (!entity.regex) continue;

        var regex = new RegExp(entity.regex, 'gi');
        var matches = [];
        var match;

        while ((match = regex.exec(text)) !== null) {
            if (matches.indexOf(match[0]) === -1) {
                matches.push(match[0]);
            }
        }

        if (matches.length > 0) {
            results[entity.type] = matches;
        }
    }

    return results;
};

module.exports = { RegexScanner: RegexScanner };



/***/ }),

/***/ 457:
/***/ (function(module) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

'use strict';
// scanner.js — orchestrates NER and regex scanning

function Scanner(nerScanner, regexScanner, config) {
    if (!(this instanceof Scanner)) return new Scanner(nerScanner, regexScanner, config);
    this._nerScanner = nerScanner;
    this._regexScanner = regexScanner;
    this._config = config;
}

Scanner.prototype.scan = function (pageText) {
    var self = this;

    var nerPromise = this._nerScanner.scan(pageText);
    var regexResults = this._regexScanner.scan(pageText);

    return Promise.all([nerPromise, Promise.resolve(regexResults)])
        .then(function (results) {
            var ner = results[0];
            var regex = results[1];

            var hasAny = false;
            var nerKeys = Object.keys(ner);
            var i;
            for (i = 0; i < nerKeys.length; i++) {
                if (ner[nerKeys[i]] && ner[nerKeys[i]].length > 0) {
                    hasAny = true;
                    break;
                }
            }

            if (!hasAny) {
                var regexKeys = Object.keys(regex);
                for (i = 0; i < regexKeys.length; i++) {
                    if (regex[regexKeys[i]] && regex[regexKeys[i]].length > 0) {
                        hasAny = true;
                        break;
                    }
                }
            }

            if (!hasAny) return {};

            return { ner: ner, regex: regex };
        });
};

module.exports = { Scanner: Scanner };



/***/ }),

/***/ 450:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

'use strict';

var getCtx = (__webpack_require__(608)/* .getCtx */ .yK);
var log = (__webpack_require__(52)/* .log */ .R);
var platformUtils = __webpack_require__(834);
var textUtils = __webpack_require__(446);
var ICONS = (__webpack_require__(329).ICONS);
var configModule = __webpack_require__(359);
var apiCacheManager = __webpack_require__(278);
var IdbStorageProvider = (__webpack_require__(294).IdbStorageProvider);
var NerScanner = (__webpack_require__(186).NerScanner);
var RegexScanner = (__webpack_require__(488).RegexScanner);
var Scanner = (__webpack_require__(457).Scanner);
var DatapulseBridge = (__webpack_require__(449).DatapulseBridge);
var DatapulseProvider = (__webpack_require__(337).DatapulseProvider);
var JiraAuth = (__webpack_require__(976).JiraAuth);
var JiraBridge = (__webpack_require__(171).JiraBridge);
var JiraProvider = (__webpack_require__(183).JiraProvider);
var SnowAuth = (__webpack_require__(60).SnowAuth);
var SnowBridge = (__webpack_require__(439).SnowBridge);
var SnowProvider = (__webpack_require__(955).SnowProvider);
var SalesforceAuth = (__webpack_require__(732).SalesforceAuth);
var SalesforceBridge = (__webpack_require__(119).SalesforceBridge);
var SalesforceProvider = (__webpack_require__(451).SalesforceProvider);
var SalesforceCaseProvider = (__webpack_require__(947).SalesforceCaseProvider);
var SalesforceHarmonyOpportunityProvider = (__webpack_require__(69).SalesforceHarmonyOpportunityProvider);
var SalesforceContactProvider = (__webpack_require__(945).SalesforceContactProvider);
var SapAuth = (__webpack_require__(425).SapAuth);
var SapBridge = (__webpack_require__(913).SapBridge);
var SapProvider = (__webpack_require__(886).SapProvider);
var DemoProvider = (__webpack_require__(29).DemoProvider);
var IntegrationRunner = (__webpack_require__(144).IntegrationRunner);
var Balloon = (__webpack_require__(722).Balloon);
var Highlight = (__webpack_require__(13).Highlight);
var NativeCards = (__webpack_require__(712).NativeCards);

var DEFAULT_CONFIG = (__webpack_require__(510).DEFAULT_CONFIG);

var STORAGE_KEY_HIDDEN = 'wm-cplt-hdn-ctx-layr';
var TOGGLE_EVENT_NAME = 'CopilotContextLayerSettingsChanged';

// Early worker bootstrap — runs immediately on module load, before WalkMeReady.
// WalkMe may not be deployed on Salesforce/SuccessFactors domains, so the normal
// run() → WalkMeReady → initWorker() path never fires. This detects if we're
// inside a worker iframe and starts the bridge listener directly from default config.
(function earlyWorkerInit() {
    if (window.parent === window) {
        if (window.name === 'SapLogin' && platformUtils.isSuccessFactorsDomain()) {
            setTimeout(function () { window.close(); }, 1000);
        }
        if (window.name === 'SnowLogin' && platformUtils.isServiceNowDomain()) {
            setTimeout(function () { window.close(); }, 1000);
        }
        if (window.name === 'JiraLogin' && platformUtils.isJiraDomain()) {
            setTimeout(function () { window.close(); }, 500);
        }
        if (window.name === 'SfLogin' && platformUtils.isSalesforceDomain()) {
            var sfAttempts = 0;
            (function sfTryAutoLogin() {
                var oktaBtn = document.querySelector('button.secondary.wide');
                if (oktaBtn && oktaBtn.textContent.indexOf('Okta') > -1) {
                    log('[EarlyWorker] SfLogin popup — clicking Okta login button');
                    oktaBtn.click();
                    return;
                }
                if (window.location.href.indexOf('/lightning/') > -1) {
                    log('[EarlyWorker] SfLogin popup — authenticated, closing');
                    setTimeout(function () { window.close(); }, 1000);
                    return;
                }
                if (++sfAttempts < 20) {
                    setTimeout(sfTryAutoLogin, 500);
                } else {
                    log('[EarlyWorker] SfLogin popup — Okta button not found after ' + sfAttempts + ' attempts');
                }
            })();
        }
        return;
    }

    function findEntity(type) {
        var ents = DEFAULT_CONFIG.entities;
        for (var i = 0; i < ents.length; i++) {
            if (ents[i].type === type) return ents[i];
        }
        return null;
    }

    if (platformUtils.isSalesforceDomain()) {
        var sfEnt = findEntity('salesforce_account');
        if (sfEnt && sfEnt.providerConfig) {
            log('[EarlyWorker] Salesforce domain detected in iframe — bootstrapping SF worker');
            var sfB = new SalesforceBridge(sfEnt.providerConfig);
            sfB.initWorker();
        }
    }

    if (platformUtils.isSuccessFactorsDomain()) {
        var sapEnt = findEntity('successfactors_employee');
        if (sapEnt && sapEnt.providerConfig) {
            log('[EarlyWorker] SuccessFactors domain detected in iframe — bootstrapping SAP worker');
            var sapB = new SapBridge(sapEnt.providerConfig);
            sapB.initWorker();
        }
    }

    if (platformUtils.isServiceNowDomain()) {
        var snowEnt = findEntity('snow_ticket');
        if (snowEnt && snowEnt.providerConfig) {
            log('[EarlyWorker] ServiceNow domain detected in iframe — bootstrapping SNOW worker');
            var snowB = new SnowBridge(snowEnt.providerConfig);
            snowB.initWorker();
        }
    }
})();

function SmartHighlights() {
    var _this = this;
    var eventsListener, siteConfigManager, clientStorageManager;
    var strigUtils, uiChangeTracker, serverLog, pluginConfig, END_USER_ID;
    var isSalesforceIntegrationEnabled = false;
    var lastQueryText, cachedGroupedData = null, isProcessing = false, pipelineStartTime = 0;
    var managerCache = {};
    var cache, nerScanner, regexScanner, scanner;
    var datapulseBridge, datapulseProvider, jiraAuth, jiraBridge, jiraProvider;
    var snowAuth, snowBridge, snowProvider, sfAuth, sfBridge, sfProvider, sfCaseProvider, sfOpportunityProvider, sfContactProvider, sapAuth, sapBridge, sapProvider, demoProvider;
    var balloon, highlight, nativeCards;

    _this.run = run;
    _this.skills = {
        extractEntities: {
            name: 'extractEntities',
            description: 'Extracts potential entity names (people, companies) from text using NER.',
            parameters: [
                { name: 'text', type: 'string', description: 'The page or email text to extract entities from' },
                { name: 'context', type: 'string', description: 'Additional context to include in the LLM prompt' }
            ],
            execute: function (params) { return nerScanner.scan(params.text); }
        },
        getDatapulse: {
            name: 'getDatapulse',
            description: 'Fetches DataPulse information (company/employee details) for given NER entities. Returns provider-agnostic UI schema arrays.',
            parameters: [
                { name: 'entities', type: 'object', description: 'NER results object keyed by category (e.g. {"People Names": [...], "Company Names": [...]})' },
                { name: 'contextText', type: 'string', description: 'The original page text used for LLM validation context' },
                { name: 'context', type: 'string', description: 'Additional context to include in the LLM prompt' }
            ],
            execute: function (params) {
                if (!isPageContextValid()) return Promise.resolve(null);
                if (isLayerHidden()) return Promise.resolve([]);
                return datapulseProvider.fetchData(params.entities, params.contextText).then(function (v) {
                    if (!v) return [];
                    var all = [], cats = ['customers', 'employees'];
                    for (var c = 0; c < cats.length; c++) {
                        var list = v[cats[c]] || [];
                        for (var i = 0; i < list.length; i++) {
                            var s = datapulseProvider.getSchema(list[i]);
                            if (s) all.push(s);
                        }
                    }
                    return all;
                });
            }
        },
        searchJira: {
            name: 'searchJira',
            description: 'Searches Jira using an LLM-generated JQL query or fetches specific tickets by key. Handles all Jira queries: by assignee, reporter, status, priority, project, text search, date ranges, and direct key lookups. Use type "count" for counting questions to avoid fetching full ticket data.',
            parameters: [
                { name: 'type', type: 'string', description: '"byKey" to fetch specific tickets, "jql" to run a JQL search, or "count" to get only the total number of matching tickets' },
                { name: 'keys', type: 'array', description: 'Array of Jira ticket keys (for byKey type), e.g. ["EUX-123", "DD-456"]' },
                { name: 'jql', type: 'string', description: 'JQL query string (for jql or count type)' }
            ],
            execute: function (params) {
                if (platformUtils.isJiraDomain() && window.top === window.self) return Promise.resolve([]);
                return jiraProvider.search(params);
            }
        },
        getServiceNowTickets: {
            name: 'getServiceNowTickets',
            description: 'Looks up specific ServiceNow tickets by number. Returns: short description, status/state, priority, assignee, opened date, and full description. Supports INC, RITM, REQ, SCTASK, CHG, and PRB ticket types. Use this when the user mentions a specific ticket number and wants details like status, priority, who it is assigned to, or what it is about.',
            parameters: [
                { name: 'keys', type: 'array', description: 'Array of ServiceNow ticket numbers with their prefix (e.g. ["INC0012345", "RITM0067890", "CHG0054321"])' },
                { name: 'context', type: 'string', description: 'Additional context to include in the LLM prompt' }
            ],
            execute: function (params) {
                if (platformUtils.isServiceNowDomain() && window.top === window.self) return Promise.resolve([]);
                if (!params.keys || params.keys.length === 0) return Promise.resolve([]);
                return snowProvider.fetchData(params.keys).then(function (data) {
                    if (!data) return [];
                    if (data.needsAuth) {
                        var out = [];
                        for (var i = 0; i < params.keys.length; i++) {
                            var s = snowProvider.getSchema({ needsAuth: true, key: params.keys[i] });
                            if (s) out.push(s);
                        }
                        return out;
                    }
                    if (!Array.isArray(data)) return [];
                    var res = [];
                    for (var j = 0; j < data.length; j++) {
                        var s = snowProvider.getSchema(data[j]);
                        if (s) res.push(s);
                    }
                    return res;
                });
            }
        },
        getOpenSnowTickets: {
            name: 'getOpenSnowTickets',
            description: 'Lists all currently open ServiceNow tickets filed by a specific person (excludes REQ type). Use this when the user asks about a person\'s open tickets, workload, or active incidents — NOT for looking up a specific ticket number. Returns a list of ticket objects with number, short description, state, and priority.',
            parameters: [
                { name: 'userName', type: 'string', description: 'The full display name of the person whose tickets to find (e.g. "John Smith")' },
                { name: 'context', type: 'string', description: 'Additional context to include in the LLM prompt' }
            ],
            execute: function (params) {
                if (platformUtils.isServiceNowDomain() && window.top === window.self) return Promise.resolve([]);
                if (!params.userName) return Promise.resolve([]);
                return snowProvider.fetchUserTickets(params.userName).then(function (data) {
                    if (!data) return [];
                    if (data.needsAuth) {
                        var s = snowProvider.getSchema({ needsAuth: true, key: params.userName });
                        return s ? [s] : [];
                    }
                    if (data.isError) return [];
                    if (!Array.isArray(data)) return [];
                    return data;
                });
            }
        },
        getSuccessFactorsEmployees: {
            name: 'getSuccessFactorsEmployees',
            description: 'Looks up employee profiles in SAP SuccessFactors by name. Returns: employee display name, job title, and a link to their profile. Use this when the user asks about an employee, their role/title, or wants to find someone in SuccessFactors.',
            parameters: [
                { name: 'names', type: 'array', description: 'Array of employee names to search (e.g. ["John Smith", "Jane Doe"])' },
                { name: 'context', type: 'string', description: 'Additional context to include in the LLM prompt' }
            ],
            execute: function (params) {
                if (platformUtils.isSuccessFactorsDomain() && window.top === window.self) return Promise.resolve([]);
                if (!params.names || params.names.length === 0) return Promise.resolve([]);
                return sapProvider.fetchData(params.names).then(function (data) {
                    if (!data || data.isError) return [];
                    if (data.needsAuth) {
                        var out = [];
                        for (var i = 0; i < params.names.length; i++) {
                            var s = sapProvider.getSchema({ needsAuth: true, name: params.names[i] });
                            if (s) out.push(s);
                        }
                        return out;
                    }
                    if (!Array.isArray(data)) return [];
                    var res = [];
                    for (var j = 0; j < data.length; j++) {
                        var s = sapProvider.getSchema(data[j]);
                        if (s) res.push(s);
                    }
                    return res;
                });
            }
        },
        getPeopleDetails: {
            name: 'getPeopleDetails',
            description: 'Fetches people details by name using the configured provider for "People Names" (SuccessFactors or Datapulse).',
            parameters: [
                { name: 'names', type: 'array', description: 'Array of person names to search (e.g. ["John Smith"])' },
                { name: 'contextText', type: 'string', description: 'Optional context text for Datapulse validation flow.' }
            ],
            execute: function (params) {
                var names = params.names;
                var contextText = params.contextText;
                if (!names || names.length === 0) return Promise.resolve([]);
                var peopleCfg = getEntityConfigByNer('People Names');
                if (peopleCfg && peopleCfg.provider === 'successfactors') {
                    return _this.skills.getSuccessFactorsEmployees.execute({ names: names });
                }
                var nerObj = { "People Names": names };
                return _this.skills.getDatapulse.execute({ entities: nerObj, contextText: contextText || '' });
            }
        },
    };
    window.SmartHighlightsSkills = (function () {
        var ext = {};
        var keys = Object.keys(_this.skills);
        for (var k = 0; k < keys.length; k++) {
            (function (key) {
                var skill = _this.skills[key];
                ext[key] = {
                    name: skill.name,
                    description: skill.description,
                    parameters: skill.parameters,
                    execute: function (params, callback) {
                        if (typeof params === 'function') { callback = params; params = {}; }
                        var promise = skill.execute(params || {});
                        if (callback) {
                            promise.then(function (data) { callback(data); }, function (err) { callback(null, err); });
                        }
                        return promise;
                    }
                };
            })(keys[k]);
        }
        return ext;
    })();

    function run() {
        if (!eventsListener) { log('[SmartHighlights] Cannot run, EventsListener not found.'); return; }
        eventsListener.once('WalkMeReady', function () {
            siteConfigManager = getCtx().get('SiteConfigManager');
            var siteSettings = getSiteSettings(siteConfigManager);
            var isSfdcStorageEnabled = false;
            var isSfdcSegmentMatch = false;
            pluginConfig = configModule.getConfig(siteConfigManager);
            try {
                isSfdcStorageEnabled = (localStorage.getItem('sh-use-sfdc') === '1');
                if (localStorage.getItem('sh-use-sufa') === '1') {
                    for (var ei = 0; ei < pluginConfig.entities.length; ei++) {
                        if (pluginConfig.entities[ei].ner === 'People Names') {
                            pluginConfig.entities[ei].provider = 'successfactors';
                            log('[SmartHighlights] DEBUG: People Names provider switched to SuccessFactors (sh-use-sufa=1)');
                            break;
                        }
                    }
                }
                if (!hasSiteEntities(siteSettings) && isSfdcStorageEnabled) {
                    for (var ci = 0; ci < pluginConfig.entities.length; ci++) {
                        if (pluginConfig.entities[ci].ner === 'Company Names') {
                            pluginConfig.entities[ci].provider = 'salesforce';
                            log('[SmartHighlights] DEBUG: Company Names provider switched to Salesforce (sh-use-sfdc=1)');
                            break;
                        }
                    }
                }
            } catch (e) { /* localStorage may be blocked */ }
            var sfdcSegments = pluginConfig.sfdcSegments;
            if (!isSfdcStorageEnabled && sfdcSegments && Array.isArray(sfdcSegments) && sfdcSegments.length > 0) {
                for (var si = 0; si < sfdcSegments.length; si++) {
                    if (WalkMeAPI.evaluateSegmentTag(sfdcSegments[si])) {
                        isSfdcSegmentMatch = true;
                        log('[SmartHighlights] DEBUG: Company Names provider switched to Salesforce (sfdcSegments match: ' + sfdcSegments[si] + ')');
                        for (var sci = 0; sci < pluginConfig.entities.length; sci++) {
                            if (pluginConfig.entities[sci].ner === 'Company Names') {
                                pluginConfig.entities[sci].provider = 'salesforce';
                                break;
                            }
                        }
                        break;
                    }
                }
            }
            isSalesforceIntegrationEnabled = hasSiteEntities(siteSettings)
                ? hasSalesforceEntities(siteSettings.entities)
                : (isSfdcStorageEnabled || isSfdcSegmentMatch);
            serverLog = getCtx().get('EventCollectorLogger').log;
            var endUsersManager = getCtx().get('EndUsersManager');
            var aiFetcherWrapper = getCtx().get('AiFetcherWrapper');
            var aiFetcher;
            if (aiFetcherWrapper) { aiFetcher = aiFetcherWrapper.getAiFetcher(); }
            else { log('[SmartHighlights] AiFetcherWrapper not found!'); return; }
            if (getCtx().has('ClientStorageManager')) clientStorageManager = getCtx().get('ClientStorageManager');
            if (endUsersManager) END_USER_ID = endUsersManager.getEndUserGuid();
            strigUtils = getCtx().get('StringUtils');
            uiChangeTracker = getCtx().get('UIChangeTracker');

            apiCacheManager.init(new IdbStorageProvider());
            cache = apiCacheManager.createAdapter('ner_result', 300, function (item) {
                return item && item.candidate ? item.candidate : null;
            });
            nerScanner = new NerScanner(aiFetcher, pluginConfig, cache);
            regexScanner = new RegexScanner(pluginConfig);
            scanner = new Scanner(nerScanner, regexScanner, pluginConfig);
            var jiraCfg = getEntityConfig('jira_ticket');
            var snowCfg = getEntityConfig('snow_ticket');
            var jiraPC = jiraCfg ? jiraCfg.providerConfig : {};
            var snowPC = snowCfg ? snowCfg.providerConfig : {};

            jiraAuth = new JiraAuth(jiraPC, clientStorageManager, null);
            snowAuth = new SnowAuth(snowPC, clientStorageManager, null);
            var connectedIntegrations = [];
            var allIntegrations = IntegrationRunner.INTEGRATIONS;
            function addConnectedIntegration(name) {
                for (var j = 0; j < connectedIntegrations.length; j++) {
                    if (connectedIntegrations[j].name === name) return;
                }
                for (var i = 0; i < allIntegrations.length; i++) {
                    if (allIntegrations[i].name === name) {
                        connectedIntegrations.push(allIntegrations[i]);
                        break;
                    }
                }
            }

            jiraBridge = new JiraBridge(jiraPC, jiraAuth, platformUtils);
            jiraBridge.onWorkerReady = function () { addConnectedIntegration('jira'); lastQueryText = null; tryFetchAndHighlight(); };
            jiraBridge.onAuthRequired = function () {
                if (isLayerHidden()) return;
                lastQueryText = null;
                tryFetchAndHighlight();
            };
            snowBridge = new SnowBridge(snowPC);
            snowBridge.onWorkerReady = function () { addConnectedIntegration('servicenow'); lastQueryText = null; tryFetchAndHighlight(); };
            snowBridge.onAuthRequired = function () {
                if (isLayerHidden()) return;
                lastQueryText = null;
                tryFetchAndHighlight();
            };
            datapulseBridge = new DatapulseBridge(pluginConfig, aiFetcher);
            datapulseProvider = new DatapulseProvider(datapulseBridge, pluginConfig, cache, END_USER_ID);
            jiraProvider = new JiraProvider(jiraBridge, jiraAuth, jiraPC, apiCacheManager);
            snowProvider = new SnowProvider(snowBridge, snowAuth, snowPC, apiCacheManager);
            var sfCfg = getEntityConfig('salesforce_account');
            var sfPC = sfCfg ? sfCfg.providerConfig : {};
            sfAuth = new SalesforceAuth(sfPC, clientStorageManager, null);
            sfBridge = new SalesforceBridge(sfPC);
            sfBridge.onWorkerReady = function () { addConnectedIntegration('salesforce'); lastQueryText = null; tryFetchAndHighlight(); };
            sfBridge.onAuthRequired = function () {
                if (isLayerHidden()) return;
                lastQueryText = null;
                tryFetchAndHighlight();
            };
            sfProvider = new SalesforceProvider(sfBridge, sfPC, aiFetcher, pluginConfig, apiCacheManager);
            var sfCaseCfg = getEntityConfig('sf_case');
            var sfCasePC = sfCaseCfg ? sfCaseCfg.providerConfig : sfPC;
            sfCaseProvider = new SalesforceCaseProvider(sfBridge, sfCasePC, apiCacheManager);
            var sfOppCfg = getEntityConfig('sf_harmony_opportunity');
            var sfOppPC = sfOppCfg ? sfOppCfg.providerConfig : sfPC;
            sfOpportunityProvider = new SalesforceHarmonyOpportunityProvider(sfBridge, sfOppPC, apiCacheManager);
            sfContactProvider = new SalesforceContactProvider(sfBridge, sfPC, apiCacheManager);
            var sapCfg = getEntityConfig('successfactors_employee');
            var sapPC = sapCfg ? sapCfg.providerConfig : {};
            sapAuth = new SapAuth(sapPC, clientStorageManager, null);
            sapBridge = new SapBridge(sapPC);
            sapBridge.onWorkerReady = function () { addConnectedIntegration('successfactors'); lastQueryText = null; tryFetchAndHighlight(); };
            sapBridge.onEmployeesUpdate = function (records) {
                if (isLayerHidden()) return;
                if (!records || !Array.isArray(records)) return;
                var g = buildSapGrouped(records);
                cachedGroupedData = merge(cachedGroupedData || {}, g);
                applyHighlightsFromData(g);
            };
            sapBridge.onAuthRequired = function () {
                if (isLayerHidden()) return;
                lastQueryText = null;
                tryFetchAndHighlight();
            };
            sapProvider = new SapProvider(sapBridge, sapPC, apiCacheManager);
            demoProvider = new DemoProvider();

            if (platformUtils.isJiraDomain()) { jiraBridge.initWorker(); addConnectedIntegration('jira'); }
            else if (platformUtils.isGmailDomain() || platformUtils.isOutlookDomain()) {
                jiraBridge.initMaster();
                snowBridge.initMaster();
                if (isSfdcStorageEnabled) sfBridge.initMaster();
                sapBridge.initMaster();
            }
            else if (platformUtils.isServiceNowDomain()) { snowBridge.initWorker(); addConnectedIntegration('servicenow'); }
            else if (platformUtils.isSalesforceDomain()) { sfBridge.initWorker(); addConnectedIntegration('salesforce'); }
            else if (platformUtils.isSuccessFactorsDomain()) { sapBridge.initWorker(); addConnectedIntegration('successfactors'); }

            balloon = new Balloon(pluginConfig, ICONS, aiFetcher, serverLog, handleManagerClick);
            balloon._muteCallback = muteLayer;
            balloon._onLoginJira = function () {
                jiraBridge.openLoginPopup();
            };
            balloon._onLoginSap = function () {
                sapBridge.openLoginPopup();
            };
            balloon._onLoginSnow = function () {
                snowBridge.openLoginPopup();
            };
            balloon._onLoginSf = function () {
                sfBridge.openLoginPopup();
            };
            balloon._onBalloonShown = function () {
                if (clientStorageManager) {
                    clientStorageManager.saveData('smartHighlightUser', END_USER_ID, 60, '9ac4dfd5cacc4ffdb35c3a5dfa0f3406');
                    clientStorageManager.saveData('smartHighlightUser', END_USER_ID, 60, '57e0de1cb54f4cc4ae3fb976304b64c7');
                }
            };
            balloon._onPrefetchManager = prefetchManager;
            balloon._onBeforeShow = function (el) { nativeCards.setHovercardIframePositioning(nativeCards._getHovercardDiv(), el); };

            highlight = new Highlight(pluginConfig, balloon, getContentRoot, platformUtils);
            nativeCards = new NativeCards(pluginConfig, platformUtils);

            window._walkmeInternals = window._walkmeInternals || {};
            window._walkmeInternals.contextLayerActive = true;
            var integrationRunner = new IntegrationRunner(_this.skills, aiFetcher, pluginConfig, sfBridge);
            window._walkmeInternals.smartHighlights = {
                integrations: connectedIntegrations,
                runIntegration: function (options) { return integrationRunner.run(options); }
            };
            eventsListener.on(TOGGLE_EVENT_NAME, handleToggleChange);
            document.addEventListener('visibilitychange', function () {
                if (!document.hidden) tryFetchAndHighlight();
            });
            uiChangeTracker.bind(tryFetchAndHighlight);
            log('[SmartHighlights] Ready. ContextLayerActive=true. Listening for changes.');
            tryFetchAndHighlight();
            nativeCards.watchNativeCards();
            highlight.setupClickRehighlighter(function () { return cachedGroupedData; });
        });
    }

    function getEntityConfig(type) {
        for (var i = 0; i < pluginConfig.entities.length; i++) {
            if (pluginConfig.entities[i].type === type) return pluginConfig.entities[i];
        }
        return null;
    }

    function getEntityConfigByNer(nerCategory) {
        for (var i = 0; i < pluginConfig.entities.length; i++) {
            if (pluginConfig.entities[i].ner === nerCategory) return pluginConfig.entities[i];
        }
        return null;
    }

    function getSiteSettings(siteConfigManager) {
        if (!siteConfigManager || !siteConfigManager.get) return {};
        var cfg = siteConfigManager.get();
        if (cfg && cfg.Custom && cfg.Custom.customersFetcher) return cfg.Custom.customersFetcher;
        return {};
    }

    function hasSiteEntities(siteSettings) {
        return !!(siteSettings && Array.isArray(siteSettings.entities));
    }

    function hasSalesforceEntities(entities) {
        if (!entities || !Array.isArray(entities)) return false;
        for (var i = 0; i < entities.length; i++) {
            if (entities[i].provider === 'salesforce') return true;
        }
        return false;
    }

    function tryFetchAndHighlight() {
        if (document.hidden) return;
        if (isLayerHidden() || !isContainerVisible()) return;
        var pageText = textUtils.getCleanText(getContentRoot());
        var trimmed = pageText ? pageText.trim() : '';
        if (!trimmed) return;
        if (lastQueryText && strigUtils && strigUtils.isSimilar(trimmed, lastQueryText)) {
            if (cachedGroupedData) highlight.applyHighlights(cachedGroupedData);
            return;
        }
        lastQueryText = trimmed;
        if (isProcessing) return;
        isProcessing = true;
        cachedGroupedData = null;
        pipelineStartTime = Date.now();

        scanner.scan(trimmed).then(function (scanResults) {
            if (!scanResults || !scanResults.ner) { isProcessing = false; return; }
            var ner = scanResults.ner || {};
            var regex = scanResults.regex || {};

            var dpNer = {};
            var sfNames = [];
            var sapNames = [];
            var nerCats = Object.keys(ner);
            for (var n = 0; n < nerCats.length; n++) {
                var cat = nerCats[n];
                var entityCfg = getEntityConfigByNer(cat);
                if (entityCfg && entityCfg.provider === 'salesforce') {
                    sfNames = sfNames.concat(ner[cat]);
                } else if (entityCfg && entityCfg.provider === 'successfactors') {
                    sapNames = sapNames.concat(ner[cat]);
                } else {
                    dpNer[cat] = ner[cat];
                }
            }

            Promise.all([
                Object.keys(dpNer).length > 0 ? datapulseProvider.fetchData(dpNer, trimmed) : Promise.resolve(null),
                demoProvider.fetchData(trimmed)
            ]).then(function (r) {
                if (isLayerHidden()) { isProcessing = false; return; }
                var grouped = {};
                addValidatedToGrouped(r[0], grouped);
                addDemoToGrouped(r[1], grouped);
                cachedGroupedData = merge(cachedGroupedData || {}, grouped);
                applyHighlightsFromData(cachedGroupedData);
                isProcessing = false;

                var dpPeopleNames = dpNer["People Names"] || [];
                if (dpPeopleNames.length > 0) {
                    var unresolvedPeople = [];
                    for (var ui = 0; ui < dpPeopleNames.length; ui++) {
                        if (!grouped[dpPeopleNames[ui]] && !(cachedGroupedData && cachedGroupedData[dpPeopleNames[ui]])) {
                            unresolvedPeople.push(dpPeopleNames[ui]);
                        }
                    }
                    fetchSfContactFallback(unresolvedPeople);
                }
            });

            if (isSalesforceIntegrationEnabled && sfNames.length > 0 && !(platformUtils.isSalesforceDomain() && window.top === window.self)) {
                sfProvider.fetchData(sfNames).then(function (records) {
                    if (isLayerHidden()) return;
                    if (!records || !Array.isArray(records)) {
                        var authG = {};
                        for (var ai = 0; ai < sfNames.length; ai++) {
                            var as = sfProvider.getSchema({ needsAuth: true, name: sfNames[ai] });
                            if (as) { authG[sfNames[ai]] = [as]; }
                        }
                        cachedGroupedData = merge(cachedGroupedData || {}, authG);
                        applyHighlightsFromData(authG);
                        return;
                    }

                    // Separate needsAuth sentinels (partial-cache + auth-fail) from real records.
                    var authPromptedSfNames = {};
                    var realSfRecords = [];
                    for (var si = 0; si < records.length; si++) {
                        if (records[si] && records[si].needsAuth) {
                            authPromptedSfNames[records[si].name] = true;
                        } else {
                            realSfRecords.push(records[si]);
                        }
                    }
                    if (Object.keys(authPromptedSfNames).length > 0) {
                        var sentinelAuthG = {};
                        for (var sn in authPromptedSfNames) {
                            var sns = sfProvider.getSchema({ needsAuth: true, name: sn });
                            if (sns) { sentinelAuthG[sn] = [sns]; }
                        }
                        cachedGroupedData = merge(cachedGroupedData || {}, sentinelAuthG);
                        applyHighlightsFromData(sentinelAuthG);
                    }

                    return sfProvider.validateAccounts(trimmed, sfNames, realSfRecords).then(function (validatedRecords) {
                        if (isLayerHidden()) return;
                        var g = {};
                        var matchedByName = {};
                        var unmatchedByName = [];
                        for (var i = 0; i < validatedRecords.length; i++) {
                            var s = sfProvider.getSchema(validatedRecords[i]);
                            if (s) {
                                var nameKey = resolveSfHighlightKeyByName(validatedRecords[i].Name || s.title, sfNames);
                                if (nameKey) {
                                    matchedByName[nameKey] = true;
                                    if (!g[nameKey]) g[nameKey] = [];
                                    g[nameKey].push(s);
                                } else {
                                    unmatchedByName.push({ record: validatedRecords[i], schema: s });
                                }
                            }
                        }

                        var unmatchedRequestedNames = [];
                        for (var n = 0; n < sfNames.length; n++) {
                            if (!matchedByName[sfNames[n]]) unmatchedRequestedNames.push(sfNames[n]);
                        }

                        for (var u = 0; u < unmatchedByName.length; u++) {
                            var item = unmatchedByName[u];
                            var websiteKey = resolveSfHighlightKeyByWebsite(item.record.Website, unmatchedRequestedNames);
                            if (websiteKey) {
                                if (!g[websiteKey]) g[websiteKey] = [];
                                g[websiteKey].push(item.schema);
                            }
                        }

                        var finallyUnmatched = [];
                        for (var fu = 0; fu < sfNames.length; fu++) {
                            if (!g[sfNames[fu]] && !authPromptedSfNames[sfNames[fu]]) finallyUnmatched.push(sfNames[fu]);
                        }
                        if (finallyUnmatched.length > 0) {
                            for (var rm = 0; rm < finallyUnmatched.length; rm++) {
                                if (cachedGroupedData) delete cachedGroupedData[finallyUnmatched[rm]];
                            }
                            highlight.removeHighlightsForKeys(finallyUnmatched);
                        }

                        cachedGroupedData = merge(cachedGroupedData || {}, g);
                        applyHighlightsFromData(g);
                    });
                }).catch(function (e) { log('[SmartHighlights] Salesforce process failed', e); });
            }

            if (sapNames.length > 0 && !(platformUtils.isSuccessFactorsDomain() && window.top === window.self)) {
                sapProvider.fetchData(sapNames).then(function (records) {
                    if (isLayerHidden()) return;
                    if (records && records.needsAuth) {
                        var authG = {};
                        for (var i = 0; i < sapNames.length; i++) {
                            var s = sapProvider.getSchema({ needsAuth: true, name: sapNames[i] });
                            if (s) { authG[sapNames[i]] = [s]; }
                        }
                        cachedGroupedData = merge(cachedGroupedData || {}, authG);
                        applyHighlightsFromData(authG);
                        return;
                    }
                    if (!records || !Array.isArray(records)) return;
                    var g = buildSapGrouped(records);
                    cachedGroupedData = merge(cachedGroupedData || {}, g);
                    applyHighlightsFromData(g);

                    var unresolvedSapNames = [];
                    for (var si = 0; si < sapNames.length; si++) {
                        if (!g[sapNames[si]] && !(cachedGroupedData && cachedGroupedData[sapNames[si]])) {
                            unresolvedSapNames.push(sapNames[si]);
                        }
                    }
                    fetchSfContactFallback(unresolvedSapNames);
                }).catch(function (e) { log('[SmartHighlights] SuccessFactors process failed', e); });
            }

            var jiraKeys = regex.jira_ticket || [];
            if (jiraKeys.length > 0 && !(platformUtils.isJiraDomain() && window.top === window.self)) {
                jiraProvider.fetchData(jiraKeys).then(function (data) {
                    if (isLayerHidden()) return;
                    var g = buildTicketGrouped(data, jiraKeys, jiraProvider);
                    cachedGroupedData = merge(cachedGroupedData || {}, g);
                    applyHighlightsFromData(g);
                }).catch(function (e) { log('[SmartHighlights] Jira process failed', e); });
            }

            var snowKeys = regex.snow_ticket || [];
            if (snowKeys.length > 0 && !(platformUtils.isServiceNowDomain() && window.top === window.self)) {
                snowProvider.fetchData(snowKeys).then(function (data) {
                    if (isLayerHidden()) return;
                    var g = buildTicketGrouped(data, snowKeys, snowProvider);
                    cachedGroupedData = merge(cachedGroupedData || {}, g);
                    applyHighlightsFromData(g);
                }).catch(function (e) { log('[SmartHighlights] ServiceNow process failed', e); });
            }

            var sfCaseKeys = regex.sf_case || [];
            if (isSalesforceIntegrationEnabled && sfCaseKeys.length > 0 && !(platformUtils.isSalesforceDomain() && window.top === window.self)) {
                sfCaseProvider.fetchData(sfCaseKeys).then(function (data) {
                    if (isLayerHidden()) return;
                    var g = buildTicketGrouped(data, sfCaseKeys, sfCaseProvider);
                    cachedGroupedData = merge(cachedGroupedData || {}, g);
                    applyHighlightsFromData(g);
                }).catch(function (e) { log('[SmartHighlights] Salesforce Cases process failed', e); });
            }

            var sfHarmonyOpportunityKeys = regex.sf_harmony_opportunity || [];
            if (isSalesforceIntegrationEnabled && sfHarmonyOpportunityKeys.length > 0 && isHarmonyOpportunityContext(trimmed) && !(platformUtils.isSalesforceDomain() && window.top === window.self)) {
                sfOpportunityProvider.fetchData(sfHarmonyOpportunityKeys).then(function (data) {
                    if (isLayerHidden()) return;
                    if (!data || !Array.isArray(data)) {
                        var oAuthG = {};
                        for (var oi = 0; oi < sfHarmonyOpportunityKeys.length; oi++) {
                            var os = sfOpportunityProvider.getSchema({ needsAuth: true, key: sfHarmonyOpportunityKeys[oi] });
                            if (os) { oAuthG[sfHarmonyOpportunityKeys[oi]] = [os]; }
                        }
                        cachedGroupedData = merge(cachedGroupedData || {}, oAuthG);
                        applyHighlightsFromData(oAuthG);
                        return;
                    }
                    var g = buildSfHarmonyOpportunityGrouped(data, sfHarmonyOpportunityKeys, sfOpportunityProvider);
                    cachedGroupedData = merge(cachedGroupedData || {}, g);
                    applyHighlightsFromData(g);
                }).catch(function (e) { log('[SmartHighlights] Salesforce Harmony opportunities process failed', e); });
            }
        }).catch(function (e) { log('[SmartHighlights] Pipeline error', e); isProcessing = false; });
    }

    function addValidatedToGrouped(validated, grouped) {
        if (!validated) return;
        var cats = ['customers', 'employees'];
        for (var c = 0; c < cats.length; c++) {
            var list = validated[cats[c]] || [];
            for (var i = 0; i < list.length; i++) {
                var s = datapulseProvider.getSchema(list[i]);
                if (s) { var k = list[i].candidate || s.title; if (!grouped[k]) grouped[k] = []; grouped[k].push(s); }
            }
        }
    }

    function addDemoToGrouped(records, grouped) {
        if (!records || records.length === 0) return;
        for (var i = 0; i < records.length; i++) {
            var s = demoProvider.getSchema(records[i]);
            if (s) { var k = s.title; if (!grouped[k]) grouped[k] = []; grouped[k].push(s); }
        }
    }

    function buildTicketGrouped(data, keys, provider) {
        var g = {};
        if (!data || !Array.isArray(data)) {
            for (var i = 0; i < keys.length; i++) {
                var s = provider.getSchema({ needsAuth: true, key: keys[i] });
                if (s) { g[keys[i]] = [s]; }
            }
            return g;
        }
        if (!Array.isArray(data)) return g;
        for (var j = 0; j < data.length; j++) {
            var schema = provider.getSchema(data[j]);
            if (schema) { var k = schema.title; if (!g[k]) g[k] = []; g[k].push(schema); }
        }
        return g;
    }

    function buildSapGrouped(records) {
        var g = {};
        for (var i = 0; i < records.length; i++) {
            var s = sapProvider.getSchema(records[i]);
            if (s) { var k = s.title; if (!g[k]) g[k] = []; g[k].push(s); }
        }
        return g;
    }

    function resolveContactHighlightKey(contactName, nerNames) {
        if (!contactName) return null;
        var lower = contactName.toLowerCase();
        for (var i = 0; i < nerNames.length; i++) {
            var nerLower = nerNames[i].toLowerCase();
            if (lower === nerLower || lower.indexOf(nerLower) > -1 || nerLower.indexOf(lower) > -1) {
                return nerNames[i];
            }
        }
        return null;
    }

    function fetchSfContactFallback(unresolvedNames) {
        if (!isSalesforceIntegrationEnabled || unresolvedNames.length === 0) return;
        if (platformUtils.isSalesforceDomain() && window.top === window.self) return;

        log('[SmartHighlights] SF Contact fallback for unresolved names: ' + JSON.stringify(unresolvedNames));
        sfContactProvider.fetchData(unresolvedNames).then(function (records) {
            if (isLayerHidden()) return;
            if (!records || !Array.isArray(records)) return;
            var g = {};
            for (var i = 0; i < records.length; i++) {
                var s = sfContactProvider.getSchema(records[i]);
                if (s) {
                    var nameKey = resolveContactHighlightKey(s.title, unresolvedNames);
                    if (nameKey) {
                        if (!g[nameKey]) g[nameKey] = [];
                        g[nameKey].push(s);
                    }
                }
            }
            if (Object.keys(g).length > 0) {
                cachedGroupedData = merge(cachedGroupedData || {}, g);
                applyHighlightsFromData(g);
            }
        }).catch(function (e) { log('[SmartHighlights] SF Contact fallback failed', e); });
    }

    function buildSfHarmonyOpportunityGrouped(records, keys, provider) {
        var g = {};
        if (!records || !Array.isArray(records)) return g;

        var byExternalId = {};
        for (var i = 0; i < records.length; i++) {
            var rec = records[i];
            if (!rec || !rec.Rev_Share_External_Id__c) continue;
            byExternalId[String(rec.Rev_Share_External_Id__c)] = rec;
        }

        for (var k = 0; k < keys.length; k++) {
            var normalizedKey = String(keys[k]).replace(/\D/g, '');
            var match = byExternalId[normalizedKey];
            if (!match) continue;
            var schema = provider.getSchema(match);
            if (!schema) continue;
            if (!g[normalizedKey]) g[normalizedKey] = [];
            g[normalizedKey].push(schema);
        }
        return g;
    }

    function isHarmonyOpportunityContext(text) {
        var value = (text || '').toLowerCase();
        return value.indexOf('commit') > -1 ||
            value.indexOf('external id') > -1 ||
            value.indexOf('harmony') > -1 ||
            (value.indexOf('opportunity') > -1 && value.indexOf('commit') > -1);
    }

    function normalizeForCompare(v) {
        return (v || '').toLowerCase().replace(/[^a-z0-9]/g, '');
    }

    function pickBestSfMatch(target, targetNorm, requestedNames) {
        var bestLen = -1;
        var best = null;
        for (var i = 0; i < requestedNames.length; i++) {
            var req = requestedNames[i];
            if (!req) continue;
            var reqLower = req.toLowerCase();
            var reqNorm = normalizeForCompare(req);
            var isMatch = (target.indexOf(reqLower) > -1 || reqLower.indexOf(target) > -1);
            if (!isMatch && targetNorm && reqNorm) {
                isMatch = (targetNorm.indexOf(reqNorm) > -1 || reqNorm.indexOf(targetNorm) > -1);
            }
            if (isMatch) {
                if (req.length > bestLen) {
                    best = req;
                    bestLen = req.length;
                }
            }
        }
        return best;
    }

    // Use the original detected company term as the highlight key whenever possible.
    // Salesforce often returns legal/full account names that do not appear verbatim in the page text.
    function resolveSfHighlightKeyByName(recordName, requestedNames) {
        var target = (recordName || '').toLowerCase();
        var targetNorm = normalizeForCompare(recordName);
        return pickBestSfMatch(target, targetNorm, requestedNames);
    }

    function normalizeWebsiteToken(urlOrHost) {
        var host = (urlOrHost || '').toLowerCase().trim();
        if (!host) return '';

        host = host.replace(/^https?:\/\//, '');
        host = host.split('/')[0];
        host = host.replace(/^www\./, '');

        var parts = host.split('.');
        var filtered = [];
        var tldParts = { com: true, org: true, net: true, io: true, co: true, uk: true, us: true, edu: true, gov: true, biz: true, info: true };
        for (var i = 0; i < parts.length; i++) {
            if (parts[i] && !tldParts[parts[i]]) filtered.push(parts[i]);
        }
        return normalizeForCompare(filtered.join(''));
    }

    function resolveSfHighlightKeyByWebsite(website, requestedNames) {
        var siteToken = normalizeWebsiteToken(website);
        if (!siteToken) return null;
        return pickBestSfMatch(siteToken, siteToken, requestedNames);
    }

    function merge(target, source) {
        var keys = Object.keys(source);
        for (var i = 0; i < keys.length; i++) target[keys[i]] = source[keys[i]];
        return target;
    }

    function applyHighlightsFromData(grouped) {
        highlight.applyHighlights(grouped);
        if (pipelineStartTime > 0) {
            serverLog('info', '[SmartHighlights] - Highlight shown', { duration: Date.now() - pipelineStartTime });
            pipelineStartTime = 0;
        }
    }

    function handleManagerClick(managerName, resultCallback) {
        if (managerName === '__DEMO_ACME__') { resultCallback(demoProvider.getDemoCustomerData()); return; }
        var p = managerCache[managerName] || fetchValidatedEntities(managerName, true);
        p.then(function (results) { resultCallback(results); })
         .catch(function (err) {
             log('[SmartHighlights] handleManagerClick error for "' + managerName + '": ' + err);
             resultCallback([]);
         });
    }

    function prefetchManager(name) {
        if (!name || name === 'N/A' || name === 'R&M™' || managerCache[name]) return;
        log('[SmartHighlights] Pre-fetching manager: ' + name);
        managerCache[name] = fetchValidatedEntities(name, true);
    }

    function fetchValidatedEntities(text, skipNER) {
        log('[SmartHighlights] Fetching entities for: ' + text);
        if (skipNER) {
            return fetchManagerDetails(text);
        }
        var context = skipNER ? 'User explicitly searched for employee: ' + text : text;
        var step1 = skipNER ? Promise.resolve({ "People Names": [text] }) : _this.skills.extractEntities.execute({ text: text });
        return step1.then(function (ner) { return _this.skills.getDatapulse.execute({ entities: ner, contextText: context }); });
    }

    function fetchManagerDetails(name) {
        var context = 'User explicitly searched for employee: ' + name;
        var names = name.indexOf(',') > -1 ? name.split(',').map(function (n) { return n.trim(); }).filter(Boolean) : [name];
        return _this.skills.getPeopleDetails.execute({ names: names, contextText: context })
            .catch(function (err) {
                log('[SmartHighlights] Error fetching manager details: ' + err);
                return [];
            });
    }

    function isLayerHidden() {
        if (!clientStorageManager) return false;
        return !!clientStorageManager.getData(STORAGE_KEY_HIDDEN);
    }

    function muteLayer(duration) {
        if (!clientStorageManager) return;
        clientStorageManager.saveData(STORAGE_KEY_HIDDEN, 'true', (duration === '1hour') ? 3600 : 31536000);
        log('[SmartHighlights] Muting layer for ' + duration);
        serverLog('info', '[SmartHighlights] - disabled from balloon for ' + duration);
        highlight.cleanupHighlights();
    }

    function handleToggleChange() {
        if (isLayerHidden()) {
            log('[SmartHighlights] Toggle Changed -> HIDDEN. Cleaning up.');
            serverLog('info', '[SmartHighlights] - disabled from action bar');
            highlight.cleanupHighlights();
            isProcessing = false;
        } else {
            log('[SmartHighlights] Toggle Changed -> VISIBLE. Scanning.');
            serverLog('info', '[SmartHighlights] - enabled from action bar');
            var b = document.getElementById('wm-smart-balloon');
            if (b) b.style.opacity = '100';
            tryFetchAndHighlight();
        }
    }

    function isContainerVisible() {
        var sel = pluginConfig.visibilitySelectors;
        if (sel && Array.isArray(sel)) {
            for (var i = 0; i < sel.length; i++) { if (wmjQuery(sel[i]).length > 0) return true; }
        }
        return wmjQuery('[data-thread-perm-id]').length > 0;
    }

    function getContentRoot() {
        var sel = pluginConfig.contentSelectors;
        if (sel && Array.isArray(sel)) {
            for (var i = 0; i < sel.length; i++) { var el = wmjQuery(sel[i])[0]; if (el) return el; }
        }
        return wmjQuery('[data-thread-perm-id]').parent().parent().parent().parent().parent()[0];
    }

    function isPageContextValid() {
        if (isLayerHidden() || !isContainerVisible()) return false;
        var t = textUtils.getCleanText(getContentRoot());
        var cur = t ? t.trim() : '';
        if (!cur) return false;
        if (lastQueryText && strigUtils && !strigUtils.isSimilar(cur, lastQueryText)) return false;
        return true;
    }

    eventsListener = getCtx().get('EventsListener');
}

module.exports = { SmartHighlights: SmartHighlights };



/***/ }),

/***/ 27:
/***/ (function(module) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

'use strict';
// balloon.css.js — balloon and highlight styles (runtime-injected)

var BALLOON_CSS =
    '.wm-highlight { background: rgba(22, 119, 255, 0.1); border-radius: 8px; padding: 0 4px; display: inline-block; transition: background-color 0.2s ease; } ' +
    '.wm-highlight:hover { background: rgba(22, 119, 255, 0.25); } ' +

    '#wm-smart-balloon { ' +
    'position: fixed; background-color: #FAFAFC; box-sizing: border-box; width: 380px; padding: 16px; border-radius: 12px; text-overflow: ellipsis; ' +
    'box-shadow: 0 11px 15px -7px rgba(0,0,0,0.2), 0 24px 38px 3px rgba(0,0,0,0.14), 0 9px 46px 8px rgba(0,0,0,0.12); ' +
    'font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; font-size: 14px; line-height: 1.5; z-index: 2200; ' +
    'backface-visibility: hidden; transform-style: flat; will-change: transform, opacity; ' +
    'opacity: 0; visibility: hidden; transform: scale(0.8); ' +
    'transition: opacity 225ms cubic-bezier(0.4, 0, 0.2, 1), transform 225ms cubic-bezier(0.4, 0, 0.2, 1); ' +
    'text-align: left; pointer-events: auto; color: #172B4D; ' +
    '} ' +

    '#wm-smart-balloon.wm-wide-mode { width: 540px !important; } ' +

    '.wm-summary-text { white-space: pre-wrap; word-break: break-word; line-height: 1.6; color: #172B4D; font-weight: 400; font-size: 14px; direction: auto; unicode-bidi: plaintext; } ' +

    '#wm-smart-balloon.visible { opacity: 1; visibility: visible; transform: scale(1); } ' +

    '.wm-risk-banner { background-color: rgba(253, 245, 233, 1); border: 1px solid #FFE58F; border-radius: 8px; padding: 8px 12px; margin-bottom: 8px; display: flex; align-items: center; color: #172B4D; font-weight: 500; } ' +

    '.wm-nav-btn-top:hover:not(:disabled) { background-color: rgba(9, 30, 66, 0.08); } ' +
    '.wm-nav-btn-top:disabled { opacity: 0.3; cursor: default; } ' +

    '.wm-dots-container-top { display: flex; align-items: center; justify-content: center; gap: 6px; margin-top: 2px; } ' +

    '.wm-card-header { display: flex; align-items: center; margin-bottom: 12px; position: relative; } ' +
    '.wm-avatar { width: 50px; height: 50px; background-color: #DEEBFF; color: #0052CC; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 400; font-size: 24px; flex-shrink: 0; margin-right: 12px; overflow: hidden; background-position: center; background-size: contain; } ' +
    '.wm-avatar-img { width: 55%; height: 55%; object-fit: contain; } ' +
    '.wm-sf-badge { position: absolute; bottom: -2px; right: -2px; width: 20px; height: 20px; border-radius: 50%; background: #fff; display: flex; align-items: center; justify-content: center; box-shadow: 0 1px 3px rgba(0,0,0,0.2); } ' +
    '.wm-header-info { display: flex; flex-direction: column; justify-content: center; overflow: hidden; flex: 1; } ' +
    '.wm-header-name { font-weight: 400; font-size: 17px; color: #172B4D; line-height: 1.25; padding-right: 2px; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; text-overflow: ellipsis; width: 216px; white-space: nowrap; } ' +
    '.wm-header-email { font-size: 14px; color: #6B778C; width: 215px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; } ' +
    '.wm-header-logo { margin-left: auto; margin-top: 8px; align-self: flex-start; } ' +

		'.wm-content-box { background-color: rgba(22, 119, 255, 0.03); border: 1px solid #DFE1E6; border-radius: 8px; padding: 12px 16px 8px 16px; font-size: 14px; position: relative; } ' +
    '.wm-footer-box { background-color: rgba(22, 119, 255, 0.03); border: 1px solid #DFE1E6; border-radius: 8px; padding: 8px 16px; font-size: 14px; margin-top: 8px; display: flex; flex-direction: column; gap: 6px; } ' +
    '.wm-balloon-list { padding: 0; margin: 0; list-style: none; } ' +
    '.wm-balloon-item { margin-bottom: 6px; display: flex; align-items: baseline; min-width: 0; } ' +
    '.wm-label { color: #6B778C; margin-right: 6px; white-space: nowrap; flex-shrink: 0; } ' +
    '.wm-balloon-val { font-weight: 500; color: #172B4D; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; flex: 1; min-width: 0; display: block; } ' +
    '.wm-clickable-val { font-weight: 500; color: #172B4D; text-decoration: underline; cursor: pointer; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; flex: 1; min-width: 0; display: block; } ' +
    '.wm-clickable-val:hover { color: #0052CC; } ' +

    '.wm-balloon-footer { display: flex; flex-direction: column; gap: 8px; margin-top: 16px; padding-top: 16px; border-top: 1px solid #DFE1E6; } ' +
    '.wm-balloon-link { color: #0052CC; text-decoration: none; font-weight: 500; font-size: 14px; display: inline-flex; align-items: center; } ' +
    '.wm-balloon-link:hover { text-decoration: underline; } ' +

    '.wm-bottom-back-nav { display: flex; align-items: center; margin-top: 16px; color: #172B4D; font-weight: 500; font-size: 14px; cursor: pointer; } ' +
    '.wm-bottom-back-nav:hover { text-decoration: underline; color: #0052CC; } ' +

    '.wm-pagination-top { display: flex; align-items: center; justify-content: center; gap: 12px; margin-bottom: 6px; margin-top: -6px; } ' +
    '.wm-nav-btn-top { background: none; border: none; cursor: pointer; border-radius: 16px; color: #0052CC; font-size: 16px; font-weight: bold; line-height: 1; display: flex; align-items: center; justify-content: center; transition: background-color 0.2s; padding: 2px 1px; } ' +
    '.wm-nav-btn-top:hover:not(:disabled) { background-color: rgba(9, 30, 66, 0.08); } ' +
    '.wm-nav-btn-top:disabled { color: rgba(22, 119, 255, 0.3); cursor: default; } ' +
    '.wm-dots-container-top { display: flex; align-items: center; justify-content: center; gap: 6px; margin-top: 2px; } ' +

    '.wm-dot-top { width: 6px; height: 6px; border-radius: 50%; background-color: #DFE1E6; transition: background-color 0.2s, transform 0.2s; } ' +
    '.wm-dot-top.active { background-color: #0052CC; transform: scale(1.2); } ' +

    '@keyframes wm-pulse { 0% { transform: scale(1); opacity: 1; } 50% { transform: scale(1.15); opacity: 0.7; } 100% { transform: scale(1); opacity: 1; } } ' +
    '.wm-loading-container { display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100%; padding: 20px 0; color: #6B778C; } ' +
    '.wm-loading-pulse { animation: wm-pulse 1.2s infinite ease-in-out; display: inline-block; margin-bottom: 12px; } ' +

    '@keyframes wm-shimmer { 0% { background-position: 200% 0; } 100% { background-position: -200% 0; } } ' +
    '.wm-skeleton-line { height: 14px; border-radius: 6px; background: linear-gradient(90deg, #E4E7EB 25%, #F8F9FA 50%, #E4E7EB 75%); background-size: 200% 100%; display: inline-block; vertical-align: middle; } ' +

    '#wm-smart-balloon::after { content: ""; position: absolute; left: var(--arrow-x, 50%); transform: translateX(-50%); border-width: 8px; border-style: solid; } ' +
    '#wm-smart-balloon::before { content: ""; position: absolute; left: var(--arrow-x, 50%); transform: translateX(-50%); border-width: 9px; border-style: solid; z-index: -1; } ' +
    '#wm-smart-balloon.arrow-down::after { top: 100%; border-color: #fff transparent transparent transparent; } ' +
    '#wm-smart-balloon.arrow-down::before { top: 100%; border-color: rgba(223, 225, 230, 1) transparent transparent transparent; } ' +
    '#wm-smart-balloon.arrow-up::after { bottom: 100%; border-color: transparent transparent #fff transparent; } ' +
    '#wm-smart-balloon.arrow-up::before { bottom: 100%; border-color: transparent transparent rgba(223, 225, 230, 1) transparent; } ' +

    '.wm-header-right { display: flex; flex-direction: row; align-items: flex-end; margin-left: auto; gap: 8px; position: relative; } ' +

    '.wm-header-menu-btn { background: transparent; border: none; cursor: pointer; width: 24px; height: 24px; border-radius: 8px; display: flex; align-items: center; justify-content: center; transition: background 0.1s; } ' +
    '.wm-header-menu-btn:hover { background-color: #DFE1E6; } ' +

    '.wm-smart-options-menu { position: absolute; top: 100%; right: 0; width: 160px; background: white; border-radius: 8px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15); z-index: 2300; margin-top: 4px; border: 1px solid #DFE1E6; } ' +
    '.wm-menu-option { padding: 8px 16px; display: flex; align-items: center; font-size: 14px; color: #172B4D; cursor: pointer; transition: background 0.1s; } ' +
    '.wm-menu-option:hover { background-color: #F4F5F7; } ' +
    '.wm-menu-option svg { margin-right: 12px; width: 16px; height: 16px; } ' +
    '.wm-menu-footer { padding: 8px 16px; background-color: #F4F5F7; font-size: 12px; color: #6B778C; border-top: 1px solid #DFE1E6; line-height: 1.4; border-bottom-left-radius: 8px; border-bottom-right-radius: 8px; } ' +

		'.wm-question-form { display: flex; flex-direction: column; gap: 10px; padding: 4px 0; } ' +
	'.wm-question-textarea { width: 100%; min-height: 80px; max-height: 160px; padding: 10px 12px; border-radius: 8px; border: 1px solid #D5DFE9; font-family: inherit; font-size: 13px; line-height: 1.5; color: #2C3E50; resize: vertical; outline: none; box-sizing: border-box; transition: border-color 0.2s; } ' +
	'.wm-question-textarea:focus { border-color: #8c5af6; } ' +
	'.wm-question-send-row { display: flex; justify-content: flex-end; } ' +
	'.wm-question-send-btn { display: inline-flex; align-items: center; gap: 6px; padding: 7px 18px; border-radius: 6px; border: none; background-color: #8c5af6; color: #fff; font-size: 13px; font-weight: 600; cursor: pointer; transition: background-color 0.2s; } ' +
	'.wm-question-send-btn:hover { background-color: #7a47e0; } ' +
	'.wm-question-send-btn svg { margin: 0; } ' +
	'.wm-question-header { display: flex; gap: 8px; align-items: center; padding: 16px 20px; border-bottom: 1px solid rgba(85,107,130,0.12); border-radius: 12px 12px 0 0; min-height: 32px; box-sizing: border-box; } ' +
	'.wm-question-title { font-size: 14px; font-weight: 600; color: #2F426C; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; flex: 1; min-width: 0; } ' +
	'.wm-question-loading { display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 32px 20px; } ' +
	'.wm-question-loading-text { font-size: 14px; line-height: 18px; color: #131E29; opacity: 0.8; text-align: center; width: 274px; margin-top: 8px; } ' +
	'.wm-question-body { padding: 12px 16px 8px; } ' +
	'.wm-question-disclaimer { font-size: 12px; color: #6B778C; margin-top: 8px; line-height: 1.5; } ' +
	'.wm-question-back-nav { display: flex; align-items: center; padding: 12px 16px 16px; color: #131E29; font-size: 14px; cursor: pointer; } ' +
	'.wm-question-back-nav:hover { color: #0052CC; } ' +
	'.wm-question-back-nav svg { flex-shrink: 0; } ' +

	'.wm-followup { margin-top: 8px; } ' +

	'.wm-followup-cta { display: flex; align-items: center; justify-content: center; gap: 12px; width: 100%; height: 40px; min-width: 80px; padding: 0 20px; background: none; border: 1px solid #1677FF; border-radius: 12px; color: #1677FF; font-family: inherit; font-size: 14px; font-weight: 600; cursor: pointer; transition: background-color 0.15s, border-color 0.15s; box-sizing: border-box; } ' +
	'.wm-followup-cta:hover { background-color: rgba(22, 119, 255, 0.06); border-color: rgba(118, 175, 255, 0.8); } ' +
	'.wm-followup-cta svg { margin: 0; flex-shrink: 0; } ' +

	'.wm-followup-input { border: 1px solid rgba(118,175,255,0.51); border-radius: 8px; padding: 6px 6px 6px 14px; box-sizing: border-box; transition: border-color 0.15s; } ' +
	'.wm-followup-input--active { border-color: #1677FF; } ' +

	'.wm-followup-input-row { display: flex; align-items: flex-end; gap: 8px; } ' +

	'.wm-followup-textarea { flex: 1; min-height: 20px; max-height: 40px; padding: 4px 0; border: none; outline: none; font-family: inherit; font-size: 14px; line-height: 20px; color: #2F426C; resize: none; background: transparent; box-sizing: border-box; overflow-y: auto; scrollbar-width: thin; scrollbar-color: #afbff7 transparent; } ' +
	'.wm-followup-textarea::-webkit-scrollbar { width: 6px; } ' +
	'.wm-followup-textarea::-webkit-scrollbar-track { background: transparent; } ' +
	'.wm-followup-textarea::-webkit-scrollbar-thumb { background-color: #afbff7; border-radius: 40px; } ' +
	'.wm-followup-textarea::placeholder { color: #97A0AF; } ' +

	'.wm-followup-actions { display: flex; align-items: center; gap: 4px; flex-shrink: 0; } ' +

	'.wm-followup-send { display: flex; align-items: center; justify-content: center; width: 28px; height: 28px; background-color: #1677FF; border: none; border-radius: 8px; cursor: pointer; padding: 0; transition: background-color 0.15s, opacity 0.15s; } ' +
	'.wm-followup-send:hover { background-color: #1262D9; } ' +
	'.wm-followup-send--disabled { opacity: 0.4; cursor: default; } ' +
	'.wm-followup-send--disabled:hover { background-color: #1677FF; } ' +
	'.wm-followup-send svg { margin: 0; } ' +

	'.wm-balloon-close { position: absolute; top: -7px; right: -5px; width: 24px; height: 24px; display: flex; align-items: center; justify-content: center; background: #FFFFFF; border: 1px solid #DFE1E6; border-radius: 8px; cursor: pointer; padding: 0; z-index: 10; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); transition: background-color 0.15s; } ' +
	'.wm-balloon-close:hover { background-color: #F4F5F7; } ' +
	'.wm-balloon-close svg { margin: 0; } ' +

	'#wm-smart-balloon.wm-docked::before, #wm-smart-balloon.wm-docked::after { display: none; } ' +
	'#wm-smart-balloon.wm-dragging { transition: none; user-select: none; } ' +
	'#wm-smart-balloon.wm-docked { cursor: grab; } ' +
	'#wm-smart-balloon.wm-docked.wm-dragging { cursor: grabbing; } ' +

	'.wm-login-wrapper { display: flex; flex-direction: column; gap: 32px; } ' +

	'.wm-login-center { display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 16px;} ' +
	'.wm-login-provider-icon { display: block; object-fit: contain; } ' +
	'.wm-login-message { font-size: 14px; color: #2F426C; text-align: center; line-height: 1.4; white-space: pre-line; } ' +

	'.wm-login-btn { display: flex; align-items: center; justify-content: center; gap: 8px; width: 100%; height: 40px; padding: 0 16px; background-color: #EDF6FF; border: 1px solid #0064D9; border-radius: 12px; color: #1677FF; font-family: inherit; font-size: 14px; font-weight: 600; cursor: pointer; box-sizing: border-box; transition: background-color 0.15s; text-decoration: none; } ' +
	'.wm-login-btn:hover { background-color: #DCEEFB; } ' +
	'.wm-login-btn svg { margin: 0; flex-shrink: 0; } ';


module.exports = { BALLOON_CSS: BALLOON_CSS };



/***/ }),

/***/ 722:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

'use strict';
// balloon.js — balloon rendering, interaction, and state

var log = (__webpack_require__(52)/* .log */ .R);
var textUtils = __webpack_require__(446);
var createPaginationTop = (__webpack_require__(577).createPaginationTop);
var createFollowUp = (__webpack_require__(878).createFollowUp);
var domHelpers = __webpack_require__(364);
var renderQuestionView = (__webpack_require__(748).renderQuestionView);
var renderLoginView = (__webpack_require__(801).renderLoginView);

var providerIcons = __webpack_require__(250);
var CUSTOMER_ICON_B64 = providerIcons.CUSTOMER_ICON_B64;
var SNOW_ICON_B64 = providerIcons.SNOW_ICON_B64;
var JIRA_ICON_B64 = providerIcons.JIRA_ICON_B64;
var SAP_ICON_B64 = providerIcons.SAP_ICON_B64;
var SF_ICON_B64 = providerIcons.SF_ICON_B64;

function Balloon(config, icons, aiFetcher, serverLog, onManagerClick) {
    if (!(this instanceof Balloon)) return new Balloon(config, icons, aiFetcher, serverLog, onManagerClick);
    this._config = config;
    this._icons = icons;
    this._aiFetcher = aiFetcher;
    this._serverLog = serverLog;
    this._onManagerClick = onManagerClick;

    this._navigationStack = [];
    this._oldContentArray = null;
    this._cachedSmallLogo = null;
    this._cachedLargeLogo = null;
    this.balloonOpenTimer = null;
    this.balloonCloseTimer = null;
    this._shouldDock = false;

}

// --- Logo helpers ---

Balloon.prototype._getSmallLogo = function () {
    if (!this._cachedSmallLogo) {
        this._cachedSmallLogo = document.createElement('img');
        this._cachedSmallLogo.src = this._config.logoUrl;
        this._cachedSmallLogo.width = 24;
        this._cachedSmallLogo.height = 24;
        this._cachedSmallLogo.style.display = 'block';
        this._cachedSmallLogo.alt = "WalkMe AI";
    }
    return this._cachedSmallLogo;
};

Balloon.prototype._getLargeLogo = function () {
    if (!this._cachedLargeLogo) {
        this._cachedLargeLogo = document.createElement('img');
        this._cachedLargeLogo.src = this._config.logoUrl;
        this._cachedLargeLogo.width = 32;
        this._cachedLargeLogo.height = 32;
        this._cachedLargeLogo.style.display = 'block';
        this._cachedLargeLogo.alt = "WalkMe AI";
    }
    return this._cachedLargeLogo;
};

// --- SVG helper ---

Balloon.prototype.createSvgIcon = function (iconConfig) {
    var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    var viewBox = iconConfig.viewBox || "0 0 16 16";
    var color = iconConfig.color || "#556B82";

    svg.setAttribute("viewBox", viewBox);
    svg.setAttribute("width", "14");
    svg.setAttribute("height", "14");
    svg.style.verticalAlign = "text-bottom";
    svg.style.marginRight = "8px";
    svg.style.fill = "none";

    var paths = iconConfig.paths || [];
    for (var i = 0; i < paths.length; i++) {
        var path = document.createElementNS("http://www.w3.org/2000/svg", "path");
        path.setAttribute("d", paths[i]);
        path.setAttribute("fill", color);
        svg.appendChild(path);
    }

    return svg;
};

// --- Menu ---

Balloon.prototype.toggleMenu = function (btnElement, muteCallback) {
    var self = this;
    var existingMenu = document.getElementById('wm-smart-options-menu');
    if (existingMenu) { existingMenu.remove(); return; }

    var menu = document.createElement('div');
    menu.id = 'wm-smart-options-menu';
    menu.className = 'wm-smart-options-menu';

    function addOption(label, iconDef, actionArg) {
        var opt = document.createElement('div');
        opt.className = 'wm-menu-option';
        opt.onclick = function (e) {
            e.stopPropagation();
            muteCallback(actionArg);
            menu.remove();
        };
        opt.appendChild(self.createSvgIcon(iconDef));
        opt.appendChild(document.createTextNode(label));
        menu.appendChild(opt);
    }

    addOption('Hide always', this._icons.HIDE_ALWAYS, 'always');
    addOption('Hide for 1 hour', this._icons.HIDE_HOUR, '1hour');

    var footer = document.createElement('div');
    footer.className = 'wm-menu-footer';
    var link = document.createElement('a');
    link.href = '#';
    link.style.color = '#1677FF';
    link.style.textDecoration = 'none';
    link.innerText = 'settings';
    link.onclick = function (e) {
        e.preventDefault();
        e.stopPropagation();
        window.wmjQuery('.walkme-settings-wrapper').click();
    };

    footer.appendChild(document.createTextNode('Re-enable in the '));
    footer.appendChild(document.createElement('br'));
    footer.appendChild(document.createTextNode('action bar '));
    footer.appendChild(link);
    menu.appendChild(footer);

    btnElement.appendChild(menu);

    setTimeout(function () {
        var closeMenu = function (e) {
            if (!menu.contains(e.target) && !btnElement.contains(e.target)) {
                menu.remove();
                document.removeEventListener('click', closeMenu);
            }
        };
        document.addEventListener('click', closeMenu);
    }, 0);
};
Balloon.prototype._buildDataContext = function (data) {
    var lines = [];

    if (data.title) lines.push('Title: ' + data.title);
    if (data.subtitle) lines.push('Subtitle: ' + data.subtitle);
    if (data.email) lines.push('Email: ' + data.email);
    if (data.description) lines.push('Description: ' + data.description);

    if (data.rows && Array.isArray(data.rows) && data.rows.length > 0) {
        var rowsText = data.rows.map(function (r) {
            return '  ' + r.label + ': ' + r.value;
        }).join('\n');
        lines.push('Details:\n' + rowsText);
    }

    if (data.comments && Array.isArray(data.comments) && data.comments.length > 0) {
        var commentsText = data.comments.map(function (c) {
            return '[' + (c.author || 'Unknown') + ']: ' + (c.body || c);
        }).join('\n---\n');
        lines.push('Recent Comments:\n' + commentsText);
    }

    if (data.type === 'company') {
        if (data.useOfWalkme) lines.push('Use of WalkMe:\n' + data.useOfWalkme);
        if (data.keyProblems) lines.push('Key Problems Trying to Solve:\n' + data.keyProblems);
        if (data.satisfactionPoints) lines.push('Key Satisfaction Points:\n' + data.satisfactionPoints);
        if (data.dissatisfactionPoints) lines.push('Dissatisfaction Points:\n' + data.dissatisfactionPoints);
        if (data.lastCallActionItems) lines.push('Last Call Action Items:\n' + data.lastCallActionItems);
    }

    if (data.type === 'employee') {
        if (data.hireDate) lines.push('Hire Date: ' + data.hireDate);
        if (data.businessUnit) lines.push('Business Unit: ' + data.businessUnit);
        if (data.jobProfile) lines.push('Job Profile: ' + data.jobProfile);
        if (data.skipLevelManager) lines.push('Skip-Level Manager: ' + data.skipLevelManager);
        if (data.employmentType) lines.push('Employment Type: ' + data.employmentType);
    }

    return lines.join('\n');
};

Balloon.prototype._getAnswerPrompt = function (data, question) {
    var context = this._buildDataContext(data);
    var type = data.type || 'unknown';

    var roles = {
        ticket: 'You are a helpful project manager assistant. Answer the following question based on the Jira ticket details and recent comments.',
        snow_ticket: 'You are a helpful IT service management assistant. Answer the following question based on the ServiceNow ticket details and recent comments.',
        company: 'You are a helpful customer success assistant. Answer the following question based on the company account details, including their use of our product, satisfaction/dissatisfaction points, key challenges, and recent call action items when available.',
        employee: 'You are a helpful HR/people assistant. Answer the following question based on the employee profile details, including their role, reporting chain, tenure, business unit, and employment information.'
    };

    var role = roles[type] || 'You are a helpful assistant. Answer the following question based on the provided information.';

    return role + '\n\n' +
        context + '\n\n' +
        'Question: ' + question + '\n\n' +
        "Instructions: Provide a concise answer (max 2-3 sentences). Base your answer only on the provided information. If the information is insufficient, say you don't know.\n\n" +
        "IMPORTANT: Return the result as a valid string, don't use markdown";
};

Balloon.prototype._getSummaryPrompt = function (data) {
    var context = this._buildDataContext(data);
    var type = data.type || 'unknown';

    var roles = {
        ticket: 'You are a helpful project manager assistant. Summarize the following Jira ticket.',
        snow_ticket: 'You are a helpful IT service management assistant. Summarize the following ServiceNow ticket.',
        company: 'You are a helpful customer success assistant. Summarize the following company account.',
        employee: 'You are a helpful HR/people assistant. Summarize the following employee profile.'
    };

    var instructions = {
        ticket: 'Focus on the core issue, the latest status based on the comments, and next steps.',
        snow_ticket: 'Focus on the current state, priority, impact, SLA status, and next steps.',
        company: 'Focus on the account health, key metrics, how they use WalkMe, satisfaction and dissatisfaction points, and recent action items.',
        employee: "Focus on the person's role, team, reporting chain, tenure, and key details."
    };

    var role = roles[type] || 'You are a helpful assistant. Summarize the following information.';
    var instruction = instructions[type] || 'Focus on the key details and any notable points.';

    return role + '\n\n' +
        context + '\n\n' +
        'Instructions: Provide a concise summary (max 4-5 sentences). ' + instruction + '\n\n' +
        "IMPORTANT: Return the result as a valid JSON object with a single key named 'summary'.";
};

Balloon.prototype.generateAnswer = function (data, question) {
    var prompt = this._getAnswerPrompt(data, question);

    return this._callLLM(prompt, null, this._config.llm.judgeFunction, true).then(function (res) {
        return res || "No answer generated.";
    }).catch(function (err) {
        log('[SmartHighlights] Error generating answer: ' + err.message);
        return "Something went wrong";
    })
};

// --- AI Summarization ---

Balloon.prototype.generateSummary = function (data) {
    var prompt = this._getSummaryPrompt(data);

    return this._callLLM(prompt, null, this._config.llm.judgeFunction).then(function (res) {
        return res.summary || "No summary generated.";
    });
};

Balloon.prototype._callLLM = function (prompt, schema, funcName, ignoreFormat) {
    var llmRequestBody = {
        stream: false,
        as_text: true,
        temperature: 0,
        max_tokens: 2000,
        messages: [{ role: 'system', content: prompt }]
    };

    if (schema) {
        llmRequestBody.response_format = {
            type: "json_schema",
            json_schema: schema
        };
    } else {
        llmRequestBody.response_format = { type: "json_object" };
    }

    if (ignoreFormat){
        llmRequestBody.response_format = null;
    }

    var funcToRun = funcName || 'freePromptMini';

    return this._aiFetcher.sendCustomLlmRequest(llmRequestBody, funcToRun)
        .then(function (response) {
            try {
                if (typeof response === 'string' && !ignoreFormat) {
                    var cleanJson = response.replace(/^```json\s*/i, '').replace(/^```\s*/i, '').replace(/```\s*$/, '');
                    return JSON.parse(cleanJson);
                }
                return response;
            } catch (e) {
                log('[SmartHighlights] JSON Parse Error: ' + e.message);
                return {};
            }
        });
};

Balloon.prototype.handleAskQuestionClick = function (data, question, currentContentArray) {
    if (currentContentArray) this._navigationStack.push(currentContentArray);

    var qPromise = this.generateAnswer(data, question);

    var questionPageData = {
        type: 'question',
        title: 'Working on it...',
        subtitle: 'AI Generated Insight',
        ticketData: data,
        rows: [],
        link: data.link,
        linkLabel: data.linkLabel,
        questionPromise: qPromise,
        question: question
    };

    this.renderBalloonContent([questionPageData]);
};

// --- Manager click (delegates to orchestrator) ---

Balloon.prototype.handleManagerClick = function (managerName) {
    var self = this;
    var balloon = document.getElementById('wm-smart-balloon');
    var currentTop = balloon.style.top;

    while (balloon.firstChild) balloon.removeChild(balloon.firstChild);
    var loadingContainer = document.createElement('div');
    loadingContainer.className = 'wm-loading-container';
    var pulseWrapper = document.createElement('div');
    pulseWrapper.className = 'wm-loading-pulse';
    pulseWrapper.appendChild(this._getLargeLogo());
    loadingContainer.appendChild(pulseWrapper);
    var loadingText = document.createElement('div');
    var dispName = (managerName === 'ron zohar, moran shemer') ? 'R&M' : managerName;
    loadingText.innerText = 'Fetching info for ' + dispName + '...';
    loadingContainer.appendChild(loadingText);
    balloon.appendChild(loadingContainer);
    balloon.style.top = currentTop;

    this._onManagerClick(managerName, function (allResults) {
        if (allResults && allResults.length > 0) {
            self.renderBalloonContent(allResults);
        } else {
            loadingText.innerText = 'No details found for ' + dispName;
            pulseWrapper.style.display = 'none';
        }
    });
};

// --- Row icon mapping ---

Balloon.prototype._getRowIcon = function (label, dataType) {
    var l = label.toLowerCase();
    var isTicket = (dataType === 'ticket' || dataType === 'snow_ticket' || dataType === 'sf_ticket');
    if (l.indexOf('role') > -1) return this._icons.ROLE;
    if (l.indexOf('manager') > -1) return l.indexOf('account') > -1 ? this._icons.ACCT_MANAGER : this._icons.MANAGER;
    if (l.indexOf('csm') > -1) return this._icons.ACCT_MANAGER;
    if (l.indexOf('department') > -1) return this._icons.DEPARTMENT;
    if (l.indexOf('location') > -1) return this._icons.LOCATION;
    if (l.indexOf('arr') > -1) return this._icons.ARR;
    if (l.indexOf('tier') > -1) return this._icons.TIER;
    if (l.indexOf('health') > -1) return this._icons.HEALTH;
    if (l.indexOf('renewal') > -1) return this._icons.RENEWAL;
    if (l.indexOf('open opp') > -1) return this._icons.OPEN_OPPS;
    if ((l.indexOf('status') > -1 || l.indexOf('state') > -1) && isTicket) return this._icons.JIRA_STATUS;
    if ((l.indexOf('assignee') > -1 || l.indexOf('assigned to') > -1) && isTicket) return this._icons.JIRA_ASSIGNEE;
    if ((l.indexOf('due date') > -1 || l.indexOf('sla due') > -1 || l.indexOf('last updated') > -1) && isTicket) return this._icons.RENEWAL;
    if (l.indexOf('support bucket') > -1 && dataType === 'ticket') return this._icons.JIRA_BUCKET;
    if (l.indexOf('priority') > -1 && isTicket) return this._icons.SNOW_PRIORITY;
    if (l.indexOf('impact') > -1 && dataType === 'snow_ticket') return this._icons.SNOW_IMPACT;
    return null;
};

// --- Card section renderers ---

Balloon.prototype._prefetchManagers = function (data) {
    if (!data.rows || !Array.isArray(data.rows)) return;
    for (var r = 0; r < data.rows.length; r++) {
        var row = data.rows[r];
        if ((row.label.toLowerCase().indexOf('manager') > -1 || row.label.toLowerCase().indexOf('name') > -1) && row.isClickable && row.value !== 'N/A') {
            var mgrName = row.value;
            if (mgrName === 'R&M™') mgrName = 'ron zohar, moran shemer';
            if (this._onPrefetchManager) this._onPrefetchManager(mgrName);
        }
    }
};

Balloon.prototype._renderCardHeader = function (data) {
    var self = this;
    var header = document.createElement('div');
    header.className = 'wm-card-header';

    var avatar = document.createElement('div');
    avatar.className = 'wm-avatar';

    if (data.type === 'company' && CUSTOMER_ICON_B64) {
        avatar.classList.add('customer-icon');
        var img = document.createElement('img');
        img.src = CUSTOMER_ICON_B64;
        img.className = 'wm-avatar-img';
        avatar.appendChild(img);
    } else if (data.type === 'employee' && data.image) {
        avatar.style.backgroundImage = 'url("data:image/png;base64,' + data.image.slice(1, -1) + '")';
    } else if (data.type === 'ticket') {
        avatar.style.backgroundColor = '#DEEBFF';
        avatar.style.display = 'flex';
        avatar.style.alignItems = 'center';
        avatar.style.justifyContent = 'center';
        var jiraImg = document.createElement('img');
        jiraImg.src = JIRA_ICON_B64;
        jiraImg.width = 24;
        jiraImg.height = 24;
        jiraImg.style.display = 'block';
        avatar.appendChild(jiraImg);
    } else if (data.type === 'sf_ticket') {
        avatar.style.backgroundColor = '#E1F5FE';
        avatar.style.display = 'flex';
        avatar.style.alignItems = 'center';
        avatar.style.justifyContent = 'center';
        var sfImg = document.createElement('img');
        sfImg.src = SF_ICON_B64;
        sfImg.width = 24;
        sfImg.height = 24;
        sfImg.style.display = 'block';
        avatar.appendChild(sfImg);
    } else if (data.type === 'sf_contact') {
        avatar.style.position = 'relative';
        avatar.style.overflow = 'visible';
        avatar.textContent = textUtils.getInitials(data.title);
        var sfBadge = document.createElement('div');
        sfBadge.className = 'wm-sf-badge';
        var sfBadgeImg = document.createElement('img');
        sfBadgeImg.src = SF_ICON_B64;
        sfBadgeImg.width = 14;
        sfBadgeImg.height = 14;
        sfBadgeImg.style.display = 'block';
        sfBadge.appendChild(sfBadgeImg);
        avatar.appendChild(sfBadge);
    } else if (data.type === 'harmony_opportunity') {
        avatar.style.backgroundColor = '#EDF5FD';
        avatar.style.display = 'flex';
        avatar.style.alignItems = 'center';
        avatar.style.justifyContent = 'center';
        avatar.style.gap = '3px';
        var sfLogo = document.createElement('img');
        sfLogo.src = SF_ICON_B64;
        sfLogo.width = 16;
        sfLogo.height = 16;
        sfLogo.style.display = 'block';
        var xLabel = document.createElement('span');
        xLabel.textContent = '\u00d7';
        xLabel.style.fontSize = '11px';
        xLabel.style.color = '#6B778C';
        xLabel.style.lineHeight = '1';
        var sapLogo = document.createElement('img');
        sapLogo.src = SAP_ICON_B64;
        sapLogo.width = 16;
        sapLogo.height = 16;
        sapLogo.style.display = 'block';
        avatar.appendChild(sfLogo);
        avatar.appendChild(xLabel);
        avatar.appendChild(sapLogo);
    } else if (data.type === 'snow_ticket') {
        avatar.style.backgroundColor = '#E8F5E9';
        avatar.style.display = 'flex';
        avatar.style.alignItems = 'center';
        avatar.style.justifyContent = 'center';
        var snowImg = document.createElement('img');
        snowImg.src = SNOW_ICON_B64;
        snowImg.width = 24;
        snowImg.height = 24;
        snowImg.style.display = 'block';
        avatar.appendChild(snowImg);
    } else if (data.type === 'invoice') {
        avatar.style.backgroundColor = '#DFE1E6';
        avatar.style.display = 'flex';
        avatar.style.alignItems = 'center';
        avatar.style.justifyContent = 'center';
        avatar.style.padding = '0';
        var invoiceIcon = self.createSvgIcon(self._icons.INVOICE);
        invoiceIcon.style.width = '24px';
        invoiceIcon.style.height = '24px';
        invoiceIcon.style.marginRight = '0';
        avatar.appendChild(invoiceIcon);
    } else {
        avatar.textContent = textUtils.getInitials(data.title);
    }
    header.appendChild(avatar);

    var infoCol = document.createElement('div');
    infoCol.className = 'wm-header-info';
    var nameEl = document.createElement('div');
    nameEl.className = 'wm-header-name';
    nameEl.title = data.title;
    nameEl.textContent = data.title;
    infoCol.appendChild(nameEl);
    if (data.email) {
        var emailEl = document.createElement('div');
        emailEl.className = 'wm-header-email';
        emailEl.textContent = data.email;
        infoCol.appendChild(emailEl);
    } else if (data.subtitle) {
        var subEl = document.createElement('div');
        subEl.className = 'wm-header-email';
        subEl.textContent = data.subtitle;
        subEl.title = data.subtitle;
        infoCol.appendChild(subEl);
    }
    header.appendChild(infoCol);

    var rightSection = document.createElement('div');
    rightSection.className = 'wm-header-right';
    var menuBtn = document.createElement('button');
    menuBtn.className = 'wm-header-menu-btn';
    var dotsIcon = self.createSvgIcon(self._icons.MENU_DOTS);
    dotsIcon.style.margin = '0';
    menuBtn.appendChild(dotsIcon);
    menuBtn.onclick = function (e) {
        e.stopPropagation();
        self.toggleMenu(rightSection, self._muteCallback);
    };
    rightSection.appendChild(menuBtn);
    var logoDiv = document.createElement('div');
    logoDiv.appendChild(self._getSmallLogo());
    rightSection.appendChild(logoDiv);
    header.appendChild(rightSection);

    return header;
};

Balloon.prototype._renderContentBox = function (data, contentArray) {
    var self = this;
    var contentBox = document.createElement('div');
    contentBox.className = 'wm-content-box';

    if (data.textContent) {
        var p = document.createElement('div');
        p.className = 'wm-summary-text';
        p.textContent = data.textContent;
        contentBox.appendChild(p);
    }

    var list = document.createElement('ul');
    list.className = 'wm-balloon-list';

    if (data.rows && Array.isArray(data.rows)) {
        for (var ri = 0; ri < data.rows.length; ri++) {
            (function (row) {
                if (row.label === 'Manager' && row.value === data.title) return;
                    if (data.type === 'employee' && row.value === 'N/A') return;

                var li = document.createElement('li');
                li.className = 'wm-balloon-item';
                li.style.display = 'flex';
                li.style.alignItems = 'center';

                var iconDef = self._getRowIcon(row.label, data.type);
                if (iconDef) li.appendChild(self.createSvgIcon(iconDef));

                var textContainer = document.createElement('div');
                textContainer.style.flex = "1";
                textContainer.style.minWidth = "0";
                textContainer.style.display = "flex";

                var labelSpan = document.createElement('span');
                labelSpan.className = 'wm-label';
                labelSpan.textContent = row.label + ': ';
                textContainer.appendChild(labelSpan);

                if (row.value === '__loading__') {
                    var shimmer = document.createElement('span');
                    shimmer.className = 'wm-skeleton-line';
                    var lbl = row.label.toLowerCase();
                    var shimmerW = lbl.indexOf('manager') > -1 ? 82 : lbl.indexOf('department') > -1 ? 108 : lbl.indexOf('location') > -1 ? 64 : 80;
                    var shimmerDur = lbl.indexOf('manager') > -1 ? '1.8s' : lbl.indexOf('department') > -1 ? '2.2s' : lbl.indexOf('location') > -1 ? '1.5s' : '2s';
                    var shimmerDelay = lbl.indexOf('manager') > -1 ? '0s' : lbl.indexOf('department') > -1 ? '0.15s' : lbl.indexOf('location') > -1 ? '0.4s' : '0s';
                    shimmer.style.width = shimmerW + 'px';
                    shimmer.style.animation = 'wm-shimmer ' + shimmerDur + ' ' + shimmerDelay + ' infinite';
                    textContainer.appendChild(shimmer);
                } else if (row.isClickable && row.value !== 'N/A' && row.value !== 'R&M') {
                    var a = document.createElement('a');
                    a.href = '#';
                    a.textContent = row.value;
                    a.className = 'wm-clickable-val';
                    a.onclick = function (e) {
                        e.preventDefault();
                        self._navigationStack.push(contentArray);
                        if (row.value === 'ACME') {
                            self._onManagerClick('__DEMO_ACME__', function (results) {
                                self.renderBalloonContent(results);
                            });
                            return;
                        }
                        var query = row.value === 'R&M™' ? 'ron zohar, moran shemer' : row.value;
                        self.handleManagerClick(query);
                    };
                    if (row.color) a.style.color = row.color;
                    if (row.isBold) a.style.fontWeight = '700';
                    textContainer.appendChild(a);
                } else {
                    var valSpan = document.createElement('span');
                    valSpan.className = 'wm-balloon-val';
                    valSpan.textContent = row.value;
                    valSpan.title = row.title || row.value;
                    if (row.color) valSpan.style.color = row.color;
                    textContainer.appendChild(valSpan);
                }
                li.appendChild(textContainer);
                list.appendChild(li);
            })(data.rows[ri]);
        }
    }

    contentBox.appendChild(list);
    return contentBox;
};

Balloon.prototype._renderFooter = function (data, balloon, contentArray) {
    var self = this;
    if (!data.link && !data.orgChartLink) return null;

    var footerBox = document.createElement('div');
    footerBox.className = 'wm-footer-box';
    if (data.type === 'ticket' || data.type === 'sf_ticket') {
        var aiBtn = document.createElement('a');
        aiBtn.href = '#';
        aiBtn.className = 'wm-balloon-link';
        aiBtn.style.color = '#8c5af6';
        aiBtn.appendChild(document.createTextNode('Summarize ticket'));
        var magicIcon = self.createSvgIcon(self._icons.AI_LINK);
        magicIcon.style.marginRight = '0';
        magicIcon.style.marginLeft = '6px';
        aiBtn.appendChild(magicIcon);
        aiBtn.onclick = function (e) {
            e.stopPropagation();
            e.preventDefault();
            var question = 'Summarize Ticket';
            self.handleAskQuestionClick(data, question, contentArray);
            balloon.classList.add('wm-docked');
            self._enableDrag(balloon);
        };
        footerBox.appendChild(aiBtn);
    }
    if (data.orgChartLink) {
        footerBox.appendChild(domHelpers.createLinkElement({
            href: data.orgChartLink,
            label: 'View org chart',
            linkIconDef: self._icons.LINK,
            createSvgIcon: self.createSvgIcon.bind(self),
            onClick: function () {
                self._serverLog('info', '[SmartHighlights] - View org chart clicked');
            }
        }));
    }

    if (data.link) {
        footerBox.appendChild(domHelpers.createLinkElement({
            href: data.link,
            label: data.linkLabel,
            linkIconDef: self._icons.LINK,
            createSvgIcon: self.createSvgIcon.bind(self),
            onClick: function () {
                self._serverLog('info', '[SmartHighlights] - ' + data.linkLabel + ' clicked');
            }
        }));
    }

    return footerBox;
};

// --- Core render ---

Balloon.prototype.renderBalloonContent = function (contentArray) {
    var self = this;
    if (this._oldContentArray == contentArray) return;
    this._oldContentArray = contentArray;

    var balloon = document.getElementById('wm-smart-balloon');
    if (!balloon) return;

    self._shouldDock = false;

    var isWideView = (contentArray[0] && (contentArray[0].type === 'ticket_summary'));
    if (isWideView) {
        balloon.classList.add('wm-wide-mode');
    } else {
        balloon.classList.remove('wm-wide-mode');
        balloon.style.width = '';
        balloon.style.height = '';
    }

    this._serverLog('info', '[SmartHighlights] - balloon shown');
    if (this._onBalloonShown) this._onBalloonShown();

    var currentTop = balloon.style.top;
    var totalItems = contentArray.length;

    function renderSlide(index) {
        while (balloon.firstChild) balloon.removeChild(balloon.firstChild);

        if (!contentArray[index]) {
            balloon.innerText = "No Data Available";
            return;
        }

        var data = contentArray[index];

        if (data.type === 'question') {
            self._shouldDock = true;
            renderQuestionView(balloon, data, {
                icons: self._icons,
                createSvgIcon: self.createSvgIcon.bind(self),
                getLargeLogo: self._getLargeLogo.bind(self),
                getSmallLogo: self._getSmallLogo.bind(self),
                serverLog: self._serverLog,
                navigationStack: self._navigationStack,
                onClose: function () { self._undock(balloon); },
                onBack: function () {
                    var prev = self._navigationStack.pop();
                    balloon.style.top = currentTop;
                    self.renderBalloonContent(prev);
                    balloon.classList.remove('wm-docked');
                }
            });
            return;
        }

        if (data.type === 'jira_auth' || data.type === 'snow_auth' || data.type === 'sap_auth' || data.type === 'sf_auth') {
            balloon.style.padding = '';
            if (totalItems > 1) {
                balloon.appendChild(createPaginationTop(index, totalItems, renderSlide, self._icons));
            }
            renderLoginView(balloon, data, {
                icons: self._icons,
                createSvgIcon: self.createSvgIcon.bind(self),
                getSmallLogo: self._getSmallLogo.bind(self),
                toggleMenu: self.toggleMenu.bind(self),
                muteCallback: self._muteCallback,
                onLoginJira: self._onLoginJira,
                onLoginSap: self._onLoginSap,
                onLoginSnow: self._onLoginSnow,
                onLoginSf: self._onLoginSf,
                serverLog: self._serverLog
            });
            return;
        }

        balloon.style.padding = '';
        self._prefetchManagers(data);

        if (totalItems > 1) {
            balloon.appendChild(createPaginationTop(index, totalItems, renderSlide, self._icons));
        }

        balloon.appendChild(self._renderCardHeader(data));

        if (data.isRisk) {
            var banner = document.createElement('div');
            banner.className = 'wm-risk-banner';
            banner.appendChild(self.createSvgIcon(self._icons.WARNING));
            var bannerText = document.createElement('span');
            bannerText.textContent = data.riskLabel;
            banner.appendChild(bannerText);
            balloon.appendChild(banner);
        }

        balloon.appendChild(self._renderContentBox(data, contentArray));

        var footer = self._renderFooter(data, balloon, contentArray);
        if (footer) balloon.appendChild(footer);

        var showFollowUp = false;
        try { showFollowUp = localStorage.getItem('sh-show-followup') === '1'; } catch (e) {}
        if (showFollowUp && data.type !== 'employee') {
            self._followUp = createFollowUp({
                icons: self._icons,
                createSvgIcon: self.createSvgIcon.bind(self),
                placeholder: 'Ask a question about ' + data.title + '...',
                onSend: function (question) {
                    self.handleAskQuestionClick(data, question, contentArray);
                },
                onCTAClick: function () {
                    if (balloon.querySelector('.wm-balloon-close')) return;
                    self._shouldDock = true;
                    balloon.appendChild(domHelpers.createCloseButton(
                        self.createSvgIcon.bind(self),
                        self._icons.CLOSE_X,
                        function () { self._undock(balloon); }
                    ));
                    balloon.classList.add('wm-docked');
                    self._enableDrag(balloon);
                }
            });
            balloon.appendChild(self._followUp.element);
        }

        if (self._navigationStack.length > 0) {
            var bottomNav = document.createElement('div');
            bottomNav.className = 'wm-bottom-back-nav';
            bottomNav.textContent = 'Back to ' + self._navigationStack[self._navigationStack.length - 1][0].title;
            bottomNav.onclick = function (e) {
                e.stopPropagation();
                var prev = self._navigationStack.pop();
                balloon.style.top = currentTop;
                self.renderBalloonContent(prev);
            };
            balloon.appendChild(bottomNav);
            balloon.style.top = currentTop;
        }
    }
    renderSlide(0);
};

// --- Show/Hide ---

Balloon.prototype.show = function (highlightElement, contentArray) {
    var self = this;
    var balloon = document.getElementById('wm-smart-balloon');
    if (!balloon) return;

    if (this.balloonCloseTimer) {
        clearTimeout(this.balloonCloseTimer);
        this.balloonCloseTimer = null;
    }

    if (!this.balloonOpenTimer) {
        this.balloonOpenTimer = setTimeout(function () {
            if (!document.contains(highlightElement)) { self.balloonOpenTimer = null; return; }

            if (window.wmBalloonTimer) clearTimeout(window.wmBalloonTimer);
            self.renderBalloonContent(contentArray);

            var rect = highlightElement.getBoundingClientRect();
            var scrollX = window.pageXOffset || document.documentElement.scrollLeft;
            var scrollY = window.pageYOffset || document.documentElement.scrollTop;
            var balloonHeight = balloon.offsetHeight;
            var spaceAbove = rect.top;
            var isFlipDown = spaceAbove < balloonHeight;

            if (self._onBeforeShow) self._onBeforeShow(balloon);

            var balloonWidth = balloon.offsetWidth || 360;
            var viewportWidth = window.innerWidth;
            var padding = 10;
            var leftPos = rect.left + scrollX + (rect.width / 2) - (balloonWidth / 2);
            var minLeft = scrollX + padding;
            var maxLeft = scrollX + viewportWidth - balloonWidth - padding;
            if (leftPos < minLeft) leftPos = minLeft;
            if (leftPos > maxLeft) leftPos = maxLeft;

            balloon.style.left = leftPos + 'px';

            var arrowCenter = (rect.left + scrollX + (rect.width / 2)) - leftPos;
            balloon.style.setProperty('--arrow-x', arrowCenter + 'px');

            if (isFlipDown) {
                balloon.className = 'arrow-up';
                balloon.style.top = (rect.bottom + scrollY + 9) + 'px';
                balloon.style.bottom = 'auto';
                balloon.style.transformOrigin = 'top center';
            } else {
                balloon.className = 'arrow-down';
                balloon.style.top = (rect.top + scrollY - balloonHeight - 9) + 'px';
                balloon.style.bottom = 'auto';
                balloon.style.transformOrigin = 'bottom center';
            }

            window.requestAnimationFrame(function () {
                balloon.style.visibility = '';
                balloon.classList.add('visible');
            });

            self.balloonOpenTimer = null;
        }, 50);
    }
};

Balloon.prototype.hide = function () {
    var self = this;

    if (self._shouldDock) return;

    var balloon = document.getElementById('wm-smart-balloon');
    if (!balloon) return;

    this._disableDrag();

    this.balloonCloseTimer = setTimeout(function() {
        balloon.classList.remove('visible');
        setTimeout(function() {
            if (!balloon.classList.contains('visible')) {
                balloon.style.visibility = 'hidden';
                self._navigationStack = [];
                balloon.classList.remove('wm-docked');
                var closeBtn = balloon.querySelector('.wm-balloon-close');
                if (closeBtn) {
                    closeBtn.remove();
                    if (self._followUp) self._followUp.reset();
                }
            }
        }, 225);
    }, 300);
};
// --- Docked state: drag & undock ---

Balloon.prototype._enableDrag = function (balloon) {
    if (this._dragHandler) return;

    var self = this;
    var dragging = false;
    var offsetX, offsetY;

    function onMouseDown(e) {
        if (e.target.closest('textarea, button, a, input, select')) return;
        dragging = true;
        var rect = balloon.getBoundingClientRect();
        offsetX = e.clientX - rect.left;
        offsetY = e.clientY - rect.top;
        balloon.classList.add('wm-dragging');
        e.preventDefault();
    }

    function onMouseMove(e) {
        if (!dragging) return;
        balloon.style.left = (e.clientX - offsetX) + 'px';
        balloon.style.top = (e.clientY - offsetY) + 'px';
    }

    function onMouseUp() {
        if (!dragging) return;
        dragging = false;
        balloon.classList.remove('wm-dragging');
    }

    balloon.addEventListener('mousedown', onMouseDown);
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);

    this._dragHandler = {
        destroy: function () {
            balloon.removeEventListener('mousedown', onMouseDown);
            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseup', onMouseUp);
            balloon.classList.remove('wm-dragging');
        }
    };
};

Balloon.prototype._disableDrag = function () {
    if (this._dragHandler) {
        this._dragHandler.destroy();
        this._dragHandler = null;
    }
};

Balloon.prototype._undock = function (balloon) {
    this._shouldDock = false;
    this._disableDrag();

    this.hide();
};

Balloon.prototype.resetNavigation = function () {
    this._navigationStack = [];
};

// Set by orchestrator for LOGIN_JIRA action
Balloon.prototype._onLoginJira = null;

// Set by orchestrator for LOGIN_SAP action
Balloon.prototype._onLoginSap = null;

// Set by orchestrator for LOGIN_SNOW action
Balloon.prototype._onLoginSnow = null;

// Set by orchestrator for LOGIN_SF action
Balloon.prototype._onLoginSf = null;

// Set by orchestrator for mute callback
Balloon.prototype._muteCallback = null;

// Set by orchestrator for manager prefetch (background cache-warming, no UI)
Balloon.prototype._onPrefetchManager = null;

// Set by orchestrator when balloon is shown (storage writes)
Balloon.prototype._onBalloonShown = null;

// Set by orchestrator for native card positioning before balloon show
Balloon.prototype._onBeforeShow = null;

module.exports = { Balloon: Balloon };



/***/ }),

/***/ 364:
/***/ (function(module) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

'use strict';
// domHelpers.js — shared DOM creation helpers for balloon UI components

function createCloseButton(createSvgIcon, closeIconDef, onClick) {
    var btn = document.createElement('button');
    btn.className = 'wm-balloon-close';
    var icon = createSvgIcon(closeIconDef);
    icon.setAttribute('width', '16');
    icon.setAttribute('height', '16');
    icon.style.marginRight = '0';
    btn.appendChild(icon);
    btn.onclick = function (e) {
        e.stopPropagation();
        onClick();
    };
    return btn;
}

function createLinkElement(opts) {
    var a = document.createElement('a');
    a.href = opts.href || '#';
    a.target = opts.target || '_blank';
    if (opts.target !== '_self') a.rel = 'noopener noreferrer';
    a.className = 'wm-balloon-link';
    a.appendChild(document.createTextNode(opts.label));

    if (opts.linkIconDef) {
        var icon = opts.createSvgIcon(opts.linkIconDef);
        icon.style.marginRight = '0';
        icon.style.marginLeft = '6px';
        a.appendChild(icon);
    }

    if (opts.onClick) {
        a.onclick = function (e) {
            e.stopPropagation();
            opts.onClick(e);
        };
    }

    return a;
}

module.exports = {
    createCloseButton: createCloseButton,
    createLinkElement: createLinkElement
};



/***/ }),

/***/ 878:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

'use strict';
// followup.js — generic "Ask a follow-up" component for all balloon types

var log = (__webpack_require__(52)/* .log */ .R);

function createFollowUp(options) {
	var icons = options.icons;
	var createSvgIcon = options.createSvgIcon;
	var onSend = options.onSend;
	var onCTAClick = options.onCTAClick;
	var placeholder = options.placeholder;

	var container = document.createElement('div');
	container.className = 'wm-followup';

	// --- State 1: CTA button ---
	var ctaBtn = document.createElement('button');
	ctaBtn.className = 'wm-followup-cta';

	var sparkleIcon = createSvgIcon(icons.FOLLOWUP_SPARKLE);
	sparkleIcon.setAttribute('width', '16');
	sparkleIcon.setAttribute('height', '16');
	sparkleIcon.style.marginRight = '0';
	ctaBtn.appendChild(sparkleIcon);
	ctaBtn.appendChild(document.createTextNode('Ask a follow-up'));

	// --- States 2 & 3: Input area ---
	var inputArea = document.createElement('div');
	inputArea.className = 'wm-followup-input';

	var inputRow = document.createElement('div');
	inputRow.className = 'wm-followup-input-row';

	var textarea = document.createElement('textarea');
	textarea.className = 'wm-followup-textarea';
	textarea.placeholder = placeholder || 'Ask a follow-up question...';
	textarea.rows = 1;
	textarea.onclick = function (e) { e.stopPropagation(); };

	var actionsRow = document.createElement('div');
	actionsRow.className = 'wm-followup-actions';

	var sendBtn = document.createElement('button');
	sendBtn.className = 'wm-followup-send wm-followup-send--disabled';

	var sendIcon = createSvgIcon(icons.SEND_PLANE);
	sendIcon.setAttribute('width', '16');
	sendIcon.setAttribute('height', '16');
	sendIcon.style.marginRight = '0';
	sendBtn.appendChild(sendIcon);

	actionsRow.appendChild(sendBtn);

	inputRow.appendChild(textarea);
	inputRow.appendChild(actionsRow);
	inputArea.appendChild(inputRow);

	container.appendChild(ctaBtn);

	// State 1 → State 2: click CTA to reveal empty input
	ctaBtn.onclick = function (e) {
		e.stopPropagation();
		e.preventDefault();
		ctaBtn.style.display = 'none';
		container.appendChild(inputArea);
		if (onCTAClick) {
			onCTAClick();
		}
		textarea.focus();
	};

	textarea.onfocus = function () {
		inputArea.classList.add('wm-followup-input--active');
	};
	textarea.onblur = function () {
		if (!textarea.value.trim()) {
			inputArea.classList.remove('wm-followup-input--active');
		}
	};

	textarea.oninput = function () {
		var hasText = textarea.value.trim().length > 0;
		
		if (hasText) {
			inputArea.classList.add('wm-followup-input--active');
			sendBtn.classList.remove('wm-followup-send--disabled');
		} else {
			sendBtn.classList.add('wm-followup-send--disabled');
		}

		textarea.style.height = 'auto';
		var lineHeight = 20;
		var maxHeight = lineHeight * 2;
		textarea.style.height = Math.min(textarea.scrollHeight, maxHeight) + 'px';
	};

	textarea.onkeydown = function (e) {
		if (e.key === 'Enter' && !e.shiftKey) {
			e.preventDefault();
			sendBtn.click();
		}
	};

	sendBtn.onclick = function (e) {
		e.stopPropagation();
		e.preventDefault();
		var question = textarea.value.trim();
		if (!question) return;

		log('[SmartHighlights] Follow-up question: ' + question);

		if (typeof onSend === 'function') {
			onSend(question);
		}
	};

	function reset() {
		if (inputArea.parentNode) inputArea.remove();
		textarea.value = '';
		textarea.style.height = '';
		inputArea.classList.remove('wm-followup-input--active');
		sendBtn.classList.add('wm-followup-send--disabled');
		ctaBtn.style.display = '';
	}

	return { element: container, reset: reset };
}

module.exports = { createFollowUp: createFollowUp };



/***/ }),

/***/ 13:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

'use strict';
// highlight.js — DOM text walker, highlight span creation, hover events

var BALLOON_CSS = (__webpack_require__(27).BALLOON_CSS);

function Highlight(config, balloon, getContentRoot, platformUtils) {
    if (!(this instanceof Highlight)) return new Highlight(config, balloon, getContentRoot, platformUtils);
    this._config = config;
    this._balloon = balloon;
    this._getContentRoot = getContentRoot;
    this._platformUtils = platformUtils;
}

Highlight.prototype._bindHoverHandlers = function (highlightEl, contentArray) {
    var self = this;
    highlightEl._wmContent = contentArray;
    highlightEl.addEventListener('mouseenter', function () {
        if (self._balloon.balloonCloseTimer) {
            clearTimeout(self._balloon.balloonCloseTimer);
            self._balloon.balloonCloseTimer = null;
        }
        self._balloon.show(highlightEl, highlightEl._wmContent);
    });

    highlightEl.addEventListener('mouseleave', function () {
        if (self._balloon.balloonOpenTimer) {
            clearTimeout(self._balloon.balloonOpenTimer);
            self._balloon.balloonOpenTimer = null;
        }
        self._balloon.hide();
    });
};

Highlight.prototype.applyHighlights = function (groupedData) {
    var self = this;
    var keys = Object.keys(groupedData);
    for (var i = 0; i < keys.length; i++) {
        self._createHighlightedBalloon(keys[i], groupedData[keys[i]]);
    }
};

Highlight.prototype.cleanupHighlights = function () {
    var highlights = document.querySelectorAll('.wm-highlight');
    for (var i = 0; i < highlights.length; i++) {
        var span = highlights[i];
        var parent = span.parentNode;
        if (parent) {
            parent.replaceChild(document.createTextNode(span.textContent), span);
        }
    }
    var balloon = document.getElementById('wm-smart-balloon');
    if (balloon) {
        balloon.style.opacity = '0';
        balloon.style.visibility = 'hidden';
    }
    this._balloon.resetNavigation();
};

Highlight.prototype.removeHighlightsForKeys = function (keys) {
    if (!keys || keys.length === 0) return;
    var keySet = {};
    for (var i = 0; i < keys.length; i++) {
        keySet[keys[i].trim().toLowerCase()] = true;
    }
    var highlights = document.querySelectorAll('.wm-highlight');
    for (var j = 0; j < highlights.length; j++) {
        var span = highlights[j];
        var text = (span.textContent || '').trim().toLowerCase();
        if (keySet[text]) {
            var parent = span.parentNode;
            if (parent) {
                parent.replaceChild(document.createTextNode(span.textContent), span);
            }
        }
    }
};

Highlight.prototype.setupClickRehighlighter = function (getCachedGroupedData) {
    var self = this;
    document.addEventListener('click', function (e) {
        if (!e.target.closest('[role="main"]')) return;
        if (e.target.closest('#wm-smart-balloon')) return;

        var cachedGroupedData = getCachedGroupedData();
        if (!cachedGroupedData || Object.keys(cachedGroupedData).length === 0) {
            return;
        }

        self.applyHighlights(cachedGroupedData);

        setTimeout(function () {
            self.applyHighlights(cachedGroupedData);
        }, 500);

        setTimeout(function () {
            self.applyHighlights(cachedGroupedData);
        }, 2000);

    }, true);
};

Highlight.prototype._ensureStyles = function () {
    if (!document.getElementById('wm-balloon-styles')) {
        var styleSheet = document.createElement('style');
        styleSheet.id = 'wm-balloon-styles';
        styleSheet.textContent = BALLOON_CSS;
        document.head.appendChild(styleSheet);
    }
};

Highlight.prototype._ensureBalloonElement = function () {
    var self = this;
    var balloon = document.getElementById('wm-smart-balloon');
    if (!balloon) {
        balloon = document.createElement('div');
        balloon.id = 'wm-smart-balloon';
        document.body.appendChild(balloon);

        balloon.addEventListener('mouseenter', function () {
            if (window.wmBalloonTimer) clearTimeout(window.wmBalloonTimer);
            if (self._balloon.balloonCloseTimer) {
                clearTimeout(self._balloon.balloonCloseTimer);
                self._balloon.balloonCloseTimer = null;
            }
        });

        balloon.addEventListener('mouseleave', function () {
            self._balloon.hide();
        });
    }
    return balloon;
};

Highlight.prototype._createHighlightedBalloon = function (searchString, contentArray) {
    if (!searchString || !contentArray || contentArray.length === 0) return;

    this._ensureStyles();
    var balloon = this._ensureBalloonElement();
    var self = this;

    var isJiraData = (contentArray[0] && (contentArray[0].type === 'ticket' || contentArray[0].type === 'sf_ticket' || contentArray[0].type === 'jira_auth'));

    if (isJiraData) {
        var existingShimmers = document.querySelectorAll('.wm-highlight');
        for (var s = 0; s < existingShimmers.length; s++) {
            var shim = existingShimmers[s];
            if (shim.textContent.trim() === searchString.trim()) {
                if (contentArray[0].type === 'ticket' || contentArray[0].type === 'sf_ticket') {
                    var cleanShim = shim.cloneNode(true);
                    cleanShim.className = 'wm-highlight-shimmer-old';
                    cleanShim.style.backgroundColor = 'transparent';
                    shim.parentNode.replaceChild(cleanShim, shim);
                }
            }
        }
    }

    // If matching highlights already exist, update their data in-place
    // without replacing the DOM element. This avoids visual flicker from
    // replaceChild when providers resolve asynchronously.
    var existingHighlights = document.querySelectorAll('.wm-highlight');
    var refreshed = 0;
    for (var eh = 0; eh < existingHighlights.length; eh++) {
        var existing = existingHighlights[eh];
        if (existing.textContent && existing.textContent.trim().toLowerCase() === searchString.trim().toLowerCase()) {
            existing._wmContent = contentArray;
            refreshed++;
        }
    }
    if (refreshed > 0) return;

    var safeString = searchString.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    var regex = new RegExp('\\b(' + safeString + ')(?!\\w)', 'gi');

    var rootElement = this._getContentRoot();
    if (!rootElement) return;

    var walker = document.createTreeWalker(rootElement, NodeFilter.SHOW_TEXT, null, false);
    var nodesToChange = [];

    while (walker.nextNode()) {
        var node = walker.currentNode;
        var parentTag = node.parentNode.tagName.toLowerCase();

        if (['script', 'style', 'noscript', 'input', 'textarea'].indexOf(parentTag) !== -1) continue;
        if (node.parentNode.className === 'wm-highlight') continue;
        if (wmjQuery(node.parentNode).closest('#wm-smart-balloon').length > 0) continue;
        if (wmjQuery(node.parentNode).closest('[data-compose-id]').length > 0) continue;

        if (node.nodeValue && node.nodeValue.match(regex)) {
            nodesToChange.push(node);
        }
    }

    var highlightAll = this._config.highlightAll;
    var nodesToProcess = highlightAll ? nodesToChange : nodesToChange.slice(0, 1);

    for (var n = 0; n < nodesToProcess.length; n++) {
        (function (textNode) {
            var parts = textNode.nodeValue.split(regex);
            var wrapper = document.createElement('span');
            var hasHighlightedInThisNode = false;

            for (var p = 0; p < parts.length; p++) {
                var part = parts[p];
                if (part.toLowerCase() === searchString.toLowerCase()) {
                    if (!highlightAll && hasHighlightedInThisNode) {
                        wrapper.appendChild(document.createTextNode(part));
                        continue;
                    }

                    var highlight = document.createElement('span');
                    highlight.className = 'wm-highlight';
                    highlight.textContent = part;

                    self._bindHoverHandlers(highlight, contentArray);

                    wrapper.appendChild(highlight);
                    hasHighlightedInThisNode = true;
                } else {
                    wrapper.appendChild(document.createTextNode(part));
                }
            }
            textNode.parentNode.replaceChild(wrapper, textNode);
        })(nodesToProcess[n]);
    }
};

module.exports = { Highlight: Highlight };



/***/ }),

/***/ 801:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

'use strict';
// loginView.js — renders the login/auth prompt balloon for all providers

var providerIcons = __webpack_require__(250);

var LOGIN_PROVIDERS = {
    jira_auth: {
        headerBg: '#EDF5FD',
        headerIconColor: '#1677FF',
        headerIcon: 'ACTIVITY_CLIPBOARD',
        iconB64: providerIcons.JIRA_ICON_B64,
        iconSize: 36,
        onLoginKey: 'onLoginJira'
    },
    snow_auth: {
        headerBg: 'rgba(129,181,161,0.1)',
        headerIconColor: '#81B5A1',
        headerIcon: 'ACTIVITY_CLIPBOARD',
        iconB64: providerIcons.SNOW_ICON_B64,
        iconSize: 36,
        onLoginKey: 'onLoginSnow'
    },
    sap_auth: {
        headerBg: '#EDF5FD',
        headerIconColor: '#0070F2',
        headerIcon: 'SAP_PERSON',
        iconB64: providerIcons.SAP_ICON_B64,
        iconSize: 70,
        onLoginKey: 'onLoginSap'
    },
    sf_auth: {
        headerBg: '#EDF5FD',
        headerIconColor: '#1677FF',
        headerIcon: 'ACTIVITY_CLIPBOARD',
        iconB64: providerIcons.SF_ICON_B64,
        iconSize: 70,
        onLoginKey: 'onLoginSf'
    }
};

function renderLoginView(balloon, data, opts) {
    var provider = LOGIN_PROVIDERS[data.type];
    if (!provider) return;

    var wrapper = document.createElement('div');
    wrapper.className = 'wm-login-wrapper';
    wrapper.appendChild(_buildHeader(data, provider, opts));
    wrapper.appendChild(_buildCenter(data, provider));
    wrapper.appendChild(_buildLoginButton(data, provider, opts));
    balloon.appendChild(wrapper);
}

function _buildHeader(data, provider, opts) {
    var header = document.createElement('div');
    header.className = 'wm-card-header';
    header.style.margin = '0';
    var avatar = document.createElement('div');
    avatar.className = 'wm-avatar';
    avatar.style.width = '64px';
    avatar.style.height = '64px';
    avatar.style.backgroundColor = provider.headerBg;

    avatar.style.color = provider.headerIconColor;
    var headerIconDef = opts.icons[provider.headerIcon];
    var headerSvg = opts.createSvgIcon(headerIconDef);
    headerSvg.setAttribute('width', '24');
    headerSvg.setAttribute('height', '24');
    headerSvg.style.margin = '0';
    avatar.appendChild(headerSvg);
    header.appendChild(avatar);

    var infoCol = document.createElement('div');
    infoCol.className = 'wm-header-info';
    var nameEl = document.createElement('div');
    nameEl.className = 'wm-header-name';
    nameEl.title = data.title;
    nameEl.textContent = data.title;
    infoCol.appendChild(nameEl);
    header.appendChild(infoCol);

    var rightSection = document.createElement('div');
    rightSection.className = 'wm-header-right';

    var menuBtn = document.createElement('button');
    menuBtn.className = 'wm-header-menu-btn';
    var dotsIcon = opts.createSvgIcon(opts.icons.MENU_DOTS);
    dotsIcon.style.margin = '0';
    menuBtn.appendChild(dotsIcon);
    menuBtn.onclick = function (e) {
        e.stopPropagation();
        opts.toggleMenu(rightSection, opts.muteCallback);
    };
    rightSection.appendChild(menuBtn);

    var logoDiv = document.createElement('div');
    logoDiv.appendChild(opts.getSmallLogo());
    rightSection.appendChild(logoDiv);
    header.appendChild(rightSection);

    return header;
}

function _buildCenter(data, provider) {
    var center = document.createElement('div');
    center.className = 'wm-login-center';

    var icon = document.createElement('img');
    icon.src = provider.iconB64;
    icon.className = 'wm-login-provider-icon';
    icon.width = provider.iconSize;
    icon.height = provider.iconSize;
    icon.alt = '';
    center.appendChild(icon);

    var message = document.createElement('div');
    message.className = 'wm-login-message';
    message.textContent = data.message || '';
    center.appendChild(message);

    return center;
}

function _buildLoginButton(data, provider, opts) {
    var container = document.createElement('div');
    container.className = 'wm-login-btn-container';

    var btn = document.createElement('button');
    btn.className = 'wm-login-btn';
    btn.appendChild(document.createTextNode(data.linkLabel || 'Log in'));

    var extIcon = opts.createSvgIcon(opts.icons.EXTERNAL_LINK);
    extIcon.setAttribute('width', '12');
    extIcon.setAttribute('height', '12');
    extIcon.style.margin = '0';
    btn.appendChild(extIcon);

    btn.onclick = function (e) {
        e.stopPropagation();
        e.preventDefault();
        var loginFn = opts[provider.onLoginKey];
        if (loginFn) loginFn();
    };

    container.appendChild(btn);
    return container;
}

module.exports = { renderLoginView: renderLoginView };



/***/ }),

/***/ 712:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

'use strict';
// native-cards.js — native platform card positioning and overlay handling

var log = (__webpack_require__(52)/* .log */ .R);

function NativeCards(config, platformUtils) {
    if (!(this instanceof NativeCards)) return new NativeCards(config, platformUtils);
    this._config = config;
    this._platformUtils = platformUtils;
}

NativeCards.prototype.watchNativeCards = function () {
    var platform = this._detectPlatform();
    switch (platform) {
        case 'GMAIL':
            this._watchGmailNativeHovercardIframes();
            break;
        case 'SLACK':
            this._watchSlackNativeCardInsertion();
            break;
        case 'JIRA':
            this._watchJiraNativeCardInsertion();
            break;
        case 'OUTLOOK':
            this._watchOutlookNativeCardInsertion();
            break;
        default:
            break;
    }
};

NativeCards.prototype._detectPlatform = function () {
    return this._platformUtils.detectPlatform();
};

NativeCards.prototype.setHovercardIframePositioning = function (cardElement, smartBalloon) {
    if (smartBalloon && cardElement) {
        var smartBalloonRect = smartBalloon.getBoundingClientRect();
        var cardWidth = cardElement.offsetWidth;
        var windowWidth = window.innerWidth;
        var gap = 8;

        var leftPosition = smartBalloonRect.left + smartBalloonRect.width + gap;
        var fitsOnRight = (leftPosition + cardWidth) <= windowWidth;

        if (fitsOnRight) {
            cardElement.style.left = leftPosition + "px";
        } else {
            cardElement.style.left = (smartBalloonRect.left - cardWidth - gap) + "px";
        }

        cardElement.style.top = smartBalloonRect.top + "px";
    }
};

NativeCards.prototype._getHovercardDiv = function () {
    var iframe = document.querySelector('iframe[src^="https://contacts.google.com/widget/hovercard/"]');
    if (iframe) return iframe.parentElement;
    return null;
};

NativeCards.prototype._addMutationObserver = function (callback, getTargetEl, observerOptions) {
    var obs = new MutationObserver(callback);
    var hovercardDiv = getTargetEl();
    if (hovercardDiv) {
        obs.observe(hovercardDiv, observerOptions);
    } else {
        var tryCount = 0;
        var interval = setInterval(function () {
            tryCount++;
            var el = getTargetEl();
            if (el) {
                obs.observe(el, observerOptions);
                clearInterval(interval);
            }
            if (tryCount > 15) {
                clearInterval(interval);
            }
        }, 500);
    }
};

NativeCards.prototype.isOverlayingElement = function (nativeCard, smartBalloon) {
    if (!nativeCard || !smartBalloon) return false;

    var rect1 = nativeCard.getBoundingClientRect();
    var rect2 = smartBalloon.getBoundingClientRect();

    return !(rect1.right < rect2.left ||
        rect1.left > rect2.right ||
        rect1.bottom < rect2.top ||
        rect1.top > rect2.bottom);
};

NativeCards.prototype.getMutationObserverTarget = function () {
    var observerConfig = this._config.mutationObserver;

    if (observerConfig && observerConfig.targetSelector) {
        var target = document.querySelector(observerConfig.targetSelector);
        if (target) {
            return target;
        }
    }

    return document.body;
};

NativeCards.prototype._watchGmailNativeHovercardIframes = function () {
    var self = this;

    function scanAndSync(mutations) {
        for (var i = 0; i < mutations.length; i++) {
            var smartBalloon = wmjQuery('#wm-smart-balloon');
            if (smartBalloon.length > 0) {
                var isVisible = getComputedStyle(smartBalloon[0]).visibility !== 'hidden';
                if (!isVisible) return;
                self.setHovercardIframePositioning(mutations[i].target, smartBalloon[0]);
            }
        }
    }

    this._addMutationObserver(scanAndSync, function () { return self._getHovercardDiv(); }, { attributes: true });
};

NativeCards.prototype._watchOutlookNativeCardInsertion = function () {
    var self = this;

    function scanAndSync(mutations) {
        for (var i = 0; i < mutations.length; i++) {
            var mutation = mutations[i];
            if (mutation.type !== 'childList') continue;

            for (var j = 0; j < mutation.addedNodes.length; j++) {
                var node = mutation.addedNodes[j];
                if (node.nodeType !== 1 || !node.attributes.slot) continue;

                var smartBalloon = wmjQuery('#wm-smart-balloon');
                if (!smartBalloon.length) return;

                var isVisible = getComputedStyle(smartBalloon[0]).visibility !== 'hidden';
                if (!isVisible) return;

                var root = getTarget();
                var card = root && root.shadowRoot && root.shadowRoot.querySelector('#root');
                if (!card) continue;

                self.setHovercardIframePositioning(card, smartBalloon[0]);
            }
        }
    }
    function getTarget(){
        return document.querySelector('lpc-card');
    }

    this._addMutationObserver(scanAndSync, getTarget, { childList: true });
}

NativeCards.prototype._watchSlackNativeCardInsertion = function () {
    var self = this;

    function syncDivWithBalloon(mutations) {
        for (var i = 0; i < mutations.length; i++) {
            var mutation = mutations[i];
            if (mutation.type === 'childList') {
                for (var j = 0; j < mutation.addedNodes.length; j++) {
                    var node = mutation.addedNodes[j];
                    if (node.nodeType === 1 && node.classList && node.classList.contains('ReactModalPortal')) {
                        var smartBalloon = wmjQuery('#wm-smart-balloon');
                        if (smartBalloon.length > 0) {
                            var isVisible = getComputedStyle(smartBalloon[0]).visibility !== 'hidden';
                            if (!isVisible) return;
                            var card = node.querySelector('.ReactModal__Content');
                            self.setHovercardIframePositioning(card, smartBalloon[0]);
                        }
                    }
                }
            }
        }
    }

    this._addMutationObserver(syncDivWithBalloon, function () { return self.getMutationObserverTarget(); }, { childList: true });
};

NativeCards.prototype._watchJiraNativeCardInsertion = function () {
    var self = this;

    function syncElWithBalloon(mutations) {
        for (var i = 0; i < mutations.length; i++) {
            var mutation = mutations[i];
            if (mutation.type !== 'childList') continue;

            for (var j = 0; j < mutation.addedNodes.length; j++) {
                var node = mutation.addedNodes[j];
                if (node.nodeType !== 1 || !node.classList.contains('atlaskit-portal')) continue;

                var smartBalloon = wmjQuery('#wm-smart-balloon');
                if (!smartBalloon) continue;

                var card = node.querySelector('[data-testid="profilecard"]') || node.querySelector('[data-testid="profilecard.profilecardtrigger.loading"]');
                if (!card) continue;

                var cardContainer = card.parentElement.parentElement;
                cardContainer.style.opacity = '0';

                (function (container) {
                    setTimeout(function () {
                        container.style.opacity = '1';
                        if (self.isOverlayingElement(container, smartBalloon[0])) {
                            container.style.transform = 'none';
                            container.style.inset = 'unset';
                            self.setHovercardIframePositioning(container, smartBalloon[0]);
                        }
                    }, 300);
                })(cardContainer);
            }
        }
    }

    this._addMutationObserver(syncElWithBalloon, function () { return document.querySelector('.atlaskit-portal-container'); }, { childList: true });
};

module.exports = { NativeCards: NativeCards };



/***/ }),

/***/ 577:
/***/ (function(module) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

'use strict';
// pagination.js — standalone pagination top-bar builder

function createPaginationTop(index, totalItems, renderCallback, icons) {
    var container = document.createElement('div');
    container.className = 'wm-pagination-top';

    var prevBtn = document.createElement('button');
    prevBtn.className = 'wm-nav-btn-top';
    prevBtn.disabled = (index === 0);
    var prevIcon = createSvgIconLocal(icons.CHEVRON_LEFT);
    prevIcon.style.marginRight = '0';
    prevBtn.appendChild(prevIcon);
    prevBtn.onclick = function (e) {
        e.stopPropagation();
        var newIndex = (index - 1 + totalItems) % totalItems;
        renderCallback(newIndex);
    };

    var dotsContainer = document.createElement('div');
    dotsContainer.className = 'wm-dots-container-top';
    dotsContainer.style.display = 'flex';
    dotsContainer.style.gap = '6px';
    for (var i = 0; i < totalItems; i++) {
        var dot = document.createElement('div');
        dot.className = 'wm-dot-top ' + (i === index ? 'active' : '');
        dotsContainer.appendChild(dot);
    }

    var nextBtn = document.createElement('button');
    nextBtn.className = 'wm-nav-btn-top';
    nextBtn.disabled = (index === totalItems - 1);
    var nextIcon = createSvgIconLocal(icons.CHEVRON_RIGHT);
    nextIcon.style.marginRight = '0';
    nextBtn.appendChild(nextIcon);
    nextBtn.onclick = function (e) {
        e.stopPropagation();
        var newIndex = (index + 1) % totalItems;
        renderCallback(newIndex);
    };

    container.appendChild(prevBtn);
    container.appendChild(dotsContainer);
    container.appendChild(nextBtn);
    return container;
}

function createSvgIconLocal(iconConfig) {
    var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    var viewBox = iconConfig.viewBox || "0 0 16 16";
    var color = iconConfig.color || "#556B82";

    svg.setAttribute("viewBox", viewBox);
    svg.setAttribute("width", "14");
    svg.setAttribute("height", "14");
    svg.style.verticalAlign = "text-bottom";
    svg.style.marginRight = "8px";
    svg.style.fill = "none";

    var paths = iconConfig.paths || [];
    for (var i = 0; i < paths.length; i++) {
        var path = document.createElementNS("http://www.w3.org/2000/svg", "path");
        path.setAttribute("d", paths[i]);
        path.setAttribute("fill", color);
        svg.appendChild(path);
    }

    return svg;
}

module.exports = { createPaginationTop: createPaginationTop };



/***/ }),

/***/ 748:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

'use strict';
// questionView.js — renders the question loading screen and answer screen

var log = (__webpack_require__(52)/* .log */ .R);
var domHelpers = __webpack_require__(364);

/**
 * Renders the full question flow into the balloon:
 * 1. Loading state (hourglass + pulse logo)
 * 2. Answer state once the promise resolves (question title + answer + links)
 *
 * @param {HTMLElement} balloon
 * @param {Object} data - must have: question, questionPromise, link?, linkLabel?
 * @param {Object} opts - icons, createSvgIcon, getLargeLogo, getSmallLogo,
 *                         serverLog, navigationStack, onClose, onBack
 */
function renderQuestionView(balloon, data, opts) {
    balloon.style.padding = '0';

    balloon.appendChild(domHelpers.createCloseButton(
        opts.createSvgIcon, opts.icons.CLOSE_X, opts.onClose
    ));
    balloon.appendChild(_buildLoadingHeader(opts));
    balloon.appendChild(_buildLoadingBody(opts));

    log('[SmartHighlights] Follow-up question sent: ' + data.question);

    data.questionPromise
        .then(function (answer) { _renderAnswer(balloon, data, answer, opts); })
        .catch(function (err)   { log('[SmartHighlights] Question failed', err); });
}

// --- Private helpers ---

function _buildLoadingHeader(opts) {
    var header = document.createElement('div');
    header.className = 'wm-question-header';

    var icon = opts.createSvgIcon(opts.icons.HOURGLASS);
    icon.setAttribute('width', '16');
    icon.setAttribute('height', '16');
    icon.style.marginRight = '8px';
    header.appendChild(icon);

    var title = document.createElement('span');
    title.className = 'wm-question-title';
    title.textContent = 'Working on it...';
    header.appendChild(title);

    return header;
}

function _buildLoadingBody(opts) {
    var center = document.createElement('div');
    center.className = 'wm-question-loading';

    var pulse = document.createElement('div');
    pulse.className = 'wm-loading-pulse';
    pulse.appendChild(opts.getLargeLogo());
    center.appendChild(pulse);

    var label = document.createElement('div');
    label.className = 'wm-question-loading-text';
    label.textContent = 'WalkMe AI is fetching information';
    center.appendChild(label);

    return center;
}

function _renderAnswer(balloon, data, answer, opts) {
    while (balloon.firstChild) balloon.removeChild(balloon.firstChild);

    balloon.appendChild(domHelpers.createCloseButton(
        opts.createSvgIcon, opts.icons.CLOSE_X, opts.onClose
    ));
    balloon.appendChild(_buildAnswerHeader(data, opts));
    balloon.appendChild(_buildAnswerBody(answer));

    if (data.link) {
        balloon.appendChild(_buildAnswerFooter(data, opts));
    }

    if (opts.navigationStack.length > 0) {
        balloon.appendChild(_buildBackNav(opts));
    }
}

function _buildAnswerHeader(data, opts) {
    var header = document.createElement('div');
    header.className = 'wm-question-header';

    var title = document.createElement('span');
    title.className = 'wm-question-title';
    title.textContent = data.question;
    title.title = data.question;
    header.appendChild(title);

    var logoWrap = document.createElement('div');
    logoWrap.style.flexShrink = '0';
    logoWrap.appendChild(opts.getSmallLogo());
    header.appendChild(logoWrap);

    return header;
}

function _buildAnswerBody(answer) {
    var body = document.createElement('div');
    body.className = 'wm-question-body';

    var text = document.createElement('div');
    text.className = 'wm-summary-text';
    text.textContent = answer;
    body.appendChild(text);

    var disclaimer = document.createElement('div');
    disclaimer.className = 'wm-question-disclaimer';
    disclaimer.textContent = 'AI-generated content may be incorrect.';
    body.appendChild(disclaimer);

    return body;
}

function _buildAnswerFooter(data, opts) {
    var box = document.createElement('div');
    box.className = 'wm-footer-box';
    box.style.margin = '0 16px';

    box.appendChild(domHelpers.createLinkElement({
        href: data.link,
        label: data.linkLabel,
        linkIconDef: opts.icons.LINK,
        createSvgIcon: opts.createSvgIcon,
        onClick: function () {
            opts.serverLog('info', '[SmartHighlights] - ' + data.linkLabel + ' clicked');
        }
    }));

    return box;
}

function _buildBackNav(opts) {
    var prevTitle = opts.navigationStack[opts.navigationStack.length - 1][0].title;
    var nav = document.createElement('div');
    nav.className = 'wm-question-back-nav';

    var icon = opts.createSvgIcon(opts.icons.CHEVRON_LEFT);
    icon.setAttribute('width', '16');
    icon.setAttribute('height', '16');
    icon.style.marginRight = '4px';
    nav.appendChild(icon);
    nav.appendChild(document.createTextNode('Return to ' + prevTitle));

    nav.onclick = function (e) {
        e.stopPropagation();
        opts.onBack();
    };

    return nav;
}

module.exports = { renderQuestionView: renderQuestionView };



/***/ }),

/***/ 834:
/***/ (function(module) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

'use strict';
// platform.utils.js — hostname detection helpers

function isJiraDomain() {
    return window.location.hostname.indexOf('atlassian.net') > -1;
}

function isServiceNowDomain() {
    return window.location.hostname.indexOf('service-now.com') > -1;
}

function isGmailDomain() {
    return window.location.hostname.indexOf('google.com') > -1;
}

function isSlackDomain() {
    return window.location.hostname.indexOf('slack') > -1;
}

function isSalesforceDomain() {
    var h = window.location.hostname;
    return h.indexOf('salesforce.com') > -1 || h.indexOf('force.com') > -1;
}

function isSuccessFactorsDomain() {
    return window.location.hostname.indexOf('cloud.sap') > -1;
}

function isOutlookDomain() {
    return window.location.hostname.indexOf('outlook') > -1;
}

function detectPlatform() {
    var href = window.location.href;
    if (href.indexOf('mail.google') > -1) return 'GMAIL';
    if (href.indexOf('outlook') > -1) return 'OUTLOOK';
    if (href.indexOf('slack') > -1) return 'SLACK';
    if (href.indexOf('walkme.atlassian') > -1) return 'JIRA';
    if (href.indexOf('salesforce.com') > -1) return 'SALESFORCE';
    return null;
}

module.exports = {
    isJiraDomain: isJiraDomain,
    isServiceNowDomain: isServiceNowDomain,
    isGmailDomain: isGmailDomain,
    isSlackDomain: isSlackDomain,
    isSalesforceDomain: isSalesforceDomain,
    isSuccessFactorsDomain: isSuccessFactorsDomain,
    isOutlookDomain: isOutlookDomain,
    detectPlatform: detectPlatform
};



/***/ }),

/***/ 446:
/***/ (function(module) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

'use strict';
// text.utils.js — text extraction and formatting helpers

function getCleanText(container) {
    if (!container) return '';

    function isBlock(tag) {
        return ['div', 'p', 'tr', 'td', 'th', 'li', 'h1', 'h2', 'h3', 'br'].indexOf(tag) !== -1;
    }

    function walk(node) {
        var text = '';
        if (node.nodeType === 3) return node.nodeValue;

        if (node.nodeType === 1) {
            var tag = node.tagName.toLowerCase();
            if (['script', 'style', 'noscript', 'svg', 'img', 'iframe'].indexOf(tag) !== -1) return '';
            if (node.style && (node.style.display === 'none' || node.style.visibility === 'hidden')) return '';
        }

        var child = node.firstChild;
        while (child) {
            text += walk(child);
            child = child.nextSibling;
        }

        if (node.nodeType === 1 && isBlock(node.tagName.toLowerCase()) && text.trim() !== '') {
            return ' ' + text + ', \n ';
        }

        return text;
    }

    return walk(container).replace(/\s+/g, ' ').trim();
}

function getInitials(name) {
    if (!name) return '';
    var parts = name.trim().split(' ');
    if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
    return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
}

module.exports = {
    getCleanText: getCleanText,
    getInitials: getInitials
};



/***/ }),

/***/ 608:
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
/******/ 	var __webpack_exports__ = __webpack_require__(481);
/******/ 	wmbundle = __webpack_exports__;
/******/ 	
/******/ })()
;
/* WalkMe Module */ return wmbundle; })
//# sourceMappingURL=bundle.js.map
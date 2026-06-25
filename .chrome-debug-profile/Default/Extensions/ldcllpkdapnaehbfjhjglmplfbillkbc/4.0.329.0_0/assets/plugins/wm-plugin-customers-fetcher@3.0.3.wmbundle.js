/* WalkMe Module */ typeof _walkmeInternals !== 'undefined' && _walkmeInternals.wmloader && _walkmeInternals.wmloader.define('wm-plugin-customers-fetcher@3.0.3@prelib', {"name":"wm-plugin-customers-fetcher","version":"3.0.3","toolbelt":"2.0.2","packageDate":"2026-02-11T15:43:46.682Z","entry":"prelib"}, function (__wmplugin__) {  
var wmbundle;
/******/ (function() { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 136:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

module.exports = __webpack_require__(730);



/***/ }),

/***/ 807:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

var getCtx = (__webpack_require__(63)/* .getCtx */ .yK);
var log = (__webpack_require__(327)/* .log */ .R);

function CustomersFetcher() {
    var _this = this;
    _this.run = run;

    // --- CONFIGURATION ---
    var SEARCH_ENDPOINT = 'https://papi.walkme.com/deepui/api/askme/ask/datapulse-search'; 
    var SYSTEM_GUID = 'dd32722f94d34f88a23dd84e5ae8fea0';
    var LOGO_URL = 'https://cdn.walkme.com/chatbot/latest/assets/public/ai-chat.png';

    var FUNC_NER = 'freePromptMini';   // Fast model for extraction
    var FUNC_JUDGE = 'freePrompt';     // Smarter model for validation
    
    // CUSTOMER ICON (Base64)
    var CUSTOMER_ICON_B64 = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAYAAADDPmHLAAAACXBIWXMAACxLAAAsSwGlPZapAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAT/SURBVHgB7d1bThtJFAbgv4zz7h2MkWKkeXNWMM4KhscZ7NE0KwBWAKwAzwowmhjlLc4KQlYQ3hJhIsgOeMgTblM51e3EIJFLdXe17T7/J3ERwhfov93V1XWOASIiIiIiIiLSwoDmeuMOLPblv9KWrw1UicGN/E3nsPYEpxuD+Y8p1b04ln9HBB36GLb23DcMgNMdH8nnXahiBhg+3WYAti4iGHMMjQye16BdzfwLrWS8wwBYGfDp1WYAULHRvp8GA6AcA6AcA6AcA6AcA6BcHeTHzalD5tT9NPxPN+21TFBd+9xi9hheZzUMgC93QWXYeu51m39kttF6zjbWaof4/+nA5yZyMeuNPL+Oz014CFCOAVCOAVCOAVCOAVCOAVCOAVCOAVCOAVCOAVDu4aLQKq+Lp0fNA6BrXTzNpBeD0nXxEUgdo3pdPMkgUPO6eJIA6F4Xr547DeRoXzHOAyjHACjHACjHACjHACjnvyw827r45eW5jJp1AVnWxS+z7th6/T7rAqhKGADlGADlGADlGADlGADlGADlGADlGADlGADljPdUKHBW2FRwdNXAbbwjz6Ijc6xNeTrN2bNKe9sDr/GkPsJg/Rqh+P/9lbKYHkHRVROT+Fg+OvPKhHs1KmlRSif5mMRH6F4O8GTtMGgQlCr/END7uIM4fgf4XLSwkQThHf7+oKynf3jlBqA33oe962csO2ugtnaELbkPKkx5AXB7vsUB8jJyH91L1jIUpJwAuGM+7g5QGNtP75PyKicAk+l+wdXG7uzhCJRb+AAke6oM4opmsJmcRlIu4QMwiTcRym3Ms4KcwgfA4E+EYvAHKJfwAQhafGqaoFzKGAQGPE676WPKg+3iffH9AnzJHwLTRBg3KBvrAjz5pthPdSqUFqSMMcBbhPMalEv4ANTrfYQyjUegXMIHYLB+IwOnMxTODPDy92tQLuVcC4jjbRQ5YHMj8enkEJRbOQFI99TiNtid3ePeX4zy1gMMW33Zc/OHwMp9nG4MQIUod0XQi9aBfN5DlsNBslDUbOM0uQ8qSPlrAt0rwTR+JrvyyS/fxpiRjCOe4dRzYoR+ajFTwenxO8Jf7w+wVt+cXTG816L+2zToW3yW08jRevkzfkosti5gGSivC2BlkHIMgHIMgHIMgHIMgHIMgHIMgHIMgHIMgHIMgHIMgHKsC/DFugDlKlYXED4AroQ7jtuzdP4mu1DxpWLGfpL7d4tPz/GidQb6ZeEC8PWt6NONf2+jB7j6au997Y3dyqGRhOKEYfi54geBbsN3k5eiN3CdwGzI4tBHJI9no+Txt8av2Ermx4oLgHupd29D/3XDLwPXRWQSX7Gz2PcVE4C08aPb8MvZsSPpLDZmT6FH5A9AsvGnbuMv+7uQ76J76TcSVyB/AFzL15Vp1CBjA74SPJAvAL3k2NrBatlNBqqUyB4A99JfROfPRXCTMmwxl8geANf8cWXJIYst5hLZAhCq+WOZjGG/YWQNwO2kg5UnrwIcC2QMQK0ie8/dyg1gC5elNMxdDq3IAMpdbvU+hc1wOdg0MzzOOXyrqA3avlPvRnttnHZcEaQcA6AcA6AcA6AcA6CcCwDbr+h1U0sWUpJW5+4VgB03tbL2pJaunPVo2UbVYO1/ruHm/B2be5d9+eEOSAHZ4YcbkfvOPPj51kU0u9DTLn05N4U1L2k7ZL0EERERERERkU5fALNUkam+uXYYAAAAAElFTkSuQmCC';
    
    var STORAGE_KEY_HIDDEN = 'wm-cplt-hdn-ctx-layr';
    var TOGGLE_EVENT_NAME = 'CopilotContextLayerSettingsChanged';

    var SOURCE_GUIDS = [
        '72f30c14-4447-4e9b-8175-e2fd7cd79b61', // Companies
        '6722521a-aa0f-4512-adf5-025bb8c798a8'  // Employees
    ];
    var END_USER_ID; 
    var HIGHLIGHT_ALL = false; 
    var BLOCKED_TARGETS = ['Google LLC']; 
    var hide_arr = true;

    // --- ASSETS ---
    var eventsListener;
    var uiChangeTracker;
    var siteConfigManager;
    var strigUtils;
    var clientStorageManager;
    var lastQueryText;
    
    // --- LLM ASSETS ---
    var aiFetcher;
    
    // --- STATE MANAGEMENT ---
    var navigationStack = [];
    var isProcessing = false; 
    var managerCache = {};
    var cachedGroupedData = null; // Stores validated entities for UI re-painting
    var pipelineStartTime = 0;

    // --- CACHED NODES ---
    var cachedSmallLogo = null;
    var cachedLargeLogo = null;

    // --- ANIMATION TIMERS ---
    var balloonOpenTimer = null;
    var balloonCloseTimer = null;

    var serverLog = null;

    var JiraBridge = (function() {
        var JIRA_DOMAIN = 'https://walkme.atlassian.net';
        var IFRAME_ID = 'wm-jira-worker-frame';
        var SUPPORT_BUCKET_ID = 'customfield_18814'; 
        
        var isGmail = window.location.hostname.indexOf('google.com') > -1;
        var isJira = window.location.hostname.indexOf('atlassian.net') > -1;
        
        var pendingResolves = {}; 
        var requestQueue = [];    
        var isWorkerReady = false; 

        // --- WORKER (Runs in hidden iframe) ---
        function initWorker() {

            var storageInterval = null;
            var POLLING_TIMEOUT_MS = 120000; // 2 Minutes Timeout

            // This is the function that watches for the "True" signal
            function startLookingForLogin() {
                if (storageInterval) return; 
                var startTime = Date.now();
                
                log("[JiraWorker] Starting to poll storage...");

                storageInterval = setInterval(function() {
                    try {
                        // 1. Timeout Check
                        if (Date.now() - startTime > POLLING_TIMEOUT_MS) {
                            clearInterval(storageInterval); 
                            storageInterval = null; 
                            return;
                        }
                        
                        // 2. Check Storage
                        var sm = getCtx().has('ClientStorageManager') && getCtx().get('ClientStorageManager');
                        if (sm) {
                            var sig = sm.getData("loginFinished");
                            
                            // === THIS IS THE SUCCESS LOGIC ===
                            if (sig === "true" || sig === true) {
                                log("[JiraWorker] Login Detected! Sending success message.");
                                
                                // A. Clear the flag so it doesn't fire twice
                                sm.saveData("loginFinished", "false", 60);
                                
                                // B. Stop checking
                                clearInterval(storageInterval); 
                                storageInterval = null;
                                
                                // C. SEND THE MESSAGE TO GMAIL
                                window.parent.postMessage({ type: 'WM_JIRA_LOGIN_SUCCESS' }, '*');
                            }
                        }
                    } catch (e) {
                        log("[JiraWorker] Polling error", e);
                    }
                }, 1000); // Checks every 1 second
            }

            fetch('/rest/api/2/myself')
                .then(function(res) {
                    if (res.status === 200) window.parent.postMessage({ type: 'WM_WORKER_READY' }, '*');
                    else window.parent.postMessage({ type: 'WM_JIRA_AUTH_REQUIRED' }, '*');
                })
                .catch(function() { window.parent.postMessage({ type: 'WM_JIRA_AUTH_REQUIRED' }, '*'); });

            window.addEventListener('message', function(event) {
                if (!event.data) return;

                if (event.data.type === 'WM_START_LOGIN_POLL') {
                    startLookingForLogin(); 
                }
                
                if (event.data.type === 'WM_FETCH_TICKETS') {
                    var reqId = event.data.requestId;
                    var keys = event.data.keys || [];
                    log("[JiraWorker] Fetching tickets:", keys); // <--- DEBUG LOG
                    
                    var fields = 'fields=summary,status,assignee,duedate,description,comment,' + SUPPORT_BUCKET_ID;
                    
                    var p = keys.map(function(k) {
                        return fetch('/rest/api/2/issue/' + k + '?' + fields)
                            .then(function(r) { return r.ok ? r.json() : Promise.reject(r.statusText); })
                            .then(function(d) {
                                var f = d.fields || {};
                                return {
                                    key: k,
                                    summary: f.summary,
                                    status: f.status ? f.status.name : 'Unknown',
                                    assignee: f.assignee ? f.assignee.displayName : 'Unassigned',
                                    dueDate: f.duedate || 'No Date',
                                    supportBucket: f[SUPPORT_BUCKET_ID] ? (f[SUPPORT_BUCKET_ID].value || f[SUPPORT_BUCKET_ID]) : '—',
                                    
                                    // === NEW FIELDS START ===
                                    description: f.description || '',
                                    
                                    // Map comments to include Author + Body
                                    comments: (f.comment && f.comment.comments) ? f.comment.comments.map(function(c) { 
                                        var author = c.author ? c.author.displayName : 'Unknown';
                                        return { author: author, body: c.body }; 
                                    }) : [],
                                    // === NEW FIELDS END ===

                                    link: JIRA_DOMAIN + '/browse/' + k
                                };
                            })
                            .catch(function(err) { 
                                log("[JiraWorker] Fetch error for " + k, err); // <--- DEBUG LOG
                                return { key: k, isError: true, link: JIRA_DOMAIN + '/browse/' + k }; 
                            });
                    });
                    
                    Promise.all(p).then(function(res) {
                        log("[JiraWorker] Data ready, sending back."); // <--- DEBUG LOG
                        window.parent.postMessage({ type: 'WM_TICKETS_DATA', requestId: reqId, data: res }, '*');
                    });
                }
            });
        }

        // --- MASTER (Runs in Gmail) ---
        function initMaster() {
            if (!isGmail) return;
            
            if (!document.getElementById(IFRAME_ID)) {
                var f = document.createElement('iframe');
                f.id = IFRAME_ID;
                f.src = JIRA_DOMAIN + '/secure/Dashboard.jspa';
                
                // Visible Debug Mode (Red Border)
                
                f.style.cssText = "position:fixed; bottom:20px; right:20px; width:300px; height:150px; border:4px solid red; z-index:99999; background:white; box-shadow: 0 0 20px rgba(0,0,0,0.5); visibility:visible;";
                f.style.visibility= "hidden";
                var isDebug = (localStorage.getItem('cf-dbg') === '1');
                if (isDebug) {
                    f.style.visibility= "visible";
                } 
                document.body.appendChild(f);
            }

            if (!window.wmJiraListenerAttached) {
                window.addEventListener('message', function(event) {
                    if (!event.data) return;
                    
                    if (event.data.type === 'WM_WORKER_READY') {
                        isWorkerReady = true;
                        var f = document.getElementById(IFRAME_ID);
                        if (f) f.style.borderColor = "#00FF00"; // GREEN = Ready
                        
                        if (requestQueue.length ==0){
                            lastQueryText = null;
                            setTimeout(function() {
                            tryFetchAndHighlight();
                        }, 500);
                        }

                        while(requestQueue.length) { var r = requestQueue.shift(); sendToIframe(r.requestId, r.keys); }
                        
                    }
                    if (event.data.type === 'WM_JIRA_LOGIN_SUCCESS') {
                        isWorkerReady = false; 
                        var f = document.getElementById(IFRAME_ID);
                        if(f) {
                            lastQueryText = null;
                            f.src = f.src; 
                            f.style.borderColor = "#FFCC00"; // YELLOW = Reloading
                        }
                        ///setTimeout(function() { lastQueryText = null; tryFetchAndHighlight(); }, 3000);
                    }
                    if (event.data.type === 'WM_JIRA_AUTH_REQUIRED') {
                        var f = document.getElementById(IFRAME_ID);
                        if (f) f.style.borderColor = "#FF0000"; // RED = Auth Needed

                        Object.keys(pendingResolves).forEach(function(r) { 
                            pendingResolves[r]({ needsAuth: true }); delete pendingResolves[r]; 
                        });
                    }
                    if (event.data.type === 'WM_TICKETS_DATA') {
                        var id = event.data.requestId;
                        if(pendingResolves[id]) { pendingResolves[id](event.data.data); delete pendingResolves[id]; }
                    }
                });
                window.wmJiraListenerAttached = true;
            }
        }

        function openLoginPopup() {
            var url = 'https://walkme.atlassian.net/jira/software/c/projects/DD/boards/391';
            var w=600, h=700, l=(screen.width/2)-(w/2), t=(screen.height/2)-(h/2);
            window.open(url, 'JiraLogin', 'width='+w+',height='+h+',top='+t+',left='+l);
            
            var f = document.getElementById(IFRAME_ID);
            
            if (f && f.contentWindow) f.contentWindow.postMessage({ type: 'WM_START_LOGIN_POLL' }, '*');
        }

        function sendToIframe(id, keys) {
            var f = document.getElementById(IFRAME_ID);
            if (f && f.contentWindow) f.contentWindow.postMessage({ type: 'WM_FETCH_TICKETS', requestId: id, keys: keys }, '*');
        }

        if (isJira) initWorker();

        return {
            init: initMaster,
            fetchTickets: function(keys) {
                return new Promise(function(resolve) {
                    var id = 'req_' + Date.now();
                    
                    // --- TIMEOUT INCREASED TO 5000ms (5 Seconds) ---
                    var safetyTimer = setTimeout(function() {
                        if (pendingResolves[id]) {
                            log("Jira Bridge Timed Out (5s) - Returning NeedsAuth");
                            pendingResolves[id]({ needsAuth: true });
                            delete pendingResolves[id];
                        }
                    }, 10000); 

                    pendingResolves[id] = function(data) {
                        clearTimeout(safetyTimer);
                        resolve(data);
                    };

                    if (isWorkerReady) sendToIframe(id, keys);
                    else requestQueue.push({ requestId: id, keys: keys });
                });
            },
            openLoginPopup: openLoginPopup
        };
    })();

    // HELPER: Fetch Wrapper
    function fetchJiraTickets(text) {

        var isJiraPage = window.location.hostname.indexOf('atlassian.net') > -1;
        var isTopFrame = window.top === window.self;

        if (isJiraPage && isTopFrame) {
            return Promise.resolve([]); // Return empty list immediately
        }

        var regex = /\b[A-Z]{2,10}-\d+\b/g;
        var matches = text.match(regex);
        if (!matches || matches.length === 0) return Promise.resolve([]);
        var unique = matches.filter(function(item, pos) { return matches.indexOf(item) == pos; });
        return JiraBridge.fetchTickets(unique);
    }

    // HELPER: Format Jira Data
    function formatTicketsToUiData(ticketData) {
        var grouped = {};
        if (ticketData && ticketData.needsAuth === true) {
            var regex = /\b[A-Z]{2,10}-\d+\b/g;
            var keysFound = (lastQueryText || "").match(regex) || [];
            keysFound.forEach(function(key) {
                grouped[key] = [{
                    type: 'jira_auth',
                    title: 'Jira: ' + key,
                    subtitle: 'Authentication Required',
                    rows: [{ label: 'Status', value: 'Login to see details', color: '#E78C07' }],
                    linkLabel: 'Login to Jira',
                    action: 'LOGIN_JIRA' 
                }];
            });
            return grouped;
        }
        if (Array.isArray(ticketData)) {
            ticketData.forEach(function(ticket) {
                var dataObj = {
                    type: 'ticket',
                    title: ticket.key,
                    subtitle: ticket.summary || 'Jira Ticket',
                    description: ticket.description,
                    comments: ticket.comments, // Passing the array of {author, body}
                    rows: [
                        { label: 'Status', value: ticket.status || 'Unknown' },
                        { label: 'Assignee', value: ticket.assignee || 'Unassigned', isClickable: true },
                        { label: 'Due Date', value: ticket.dueDate || 'No Date' },
                        { label: 'Support Bucket', value: ticket.supportBucket || '—' }
                    ],
                    link: ticket.link,
                    linkLabel: 'Open in Jira'
                };
                if (!grouped[ticket.key]) grouped[ticket.key] = [];
                grouped[ticket.key].push(dataObj);
            });
        }
        return grouped;
    }

    // --- ICONS ---
    // --- ICONS CONFIGURATION ---
    var ICONS = {
        LINK: { 
            viewBox: "0 0 12 12", 
            color: "#1677FF", // Blue
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
            color: "#E78C07", // The orange color from your SVG
            paths: ["M15.77 12.4795L9.51 1.84945C8.84 0.719453 7.15999 0.719453 6.49999 1.84945L0.229994 12.4795C-0.430006 13.5995 0.399997 14.9995 1.74 14.9995H14.27C15.6 14.9995 16.44 13.5995 15.78 12.4795H15.77ZM6.99999 5.49945C6.99999 4.94945 7.45 4.49945 8 4.49945C8.55 4.49945 9 4.94945 9 5.49945V8.49945C9 9.04945 8.55 9.49945 8 9.49945C7.45 9.49945 6.99999 9.04945 6.99999 8.49945V5.49945ZM8.70999 12.7095C8.51999 12.8995 8.27 12.9995 8 12.9995C7.73 12.9995 7.47999 12.8895 7.28999 12.7095C7.09999 12.5295 6.99999 12.2695 6.99999 11.9995C6.99999 11.7295 7.10999 11.4795 7.28999 11.2895C7.65999 10.9195 8.32999 10.9195 8.69999 11.2895C8.88999 11.4795 8.98999 11.7395 8.98999 11.9995C8.98999 12.2595 8.87999 12.5195 8.69999 12.7095H8.70999Z"]
        },
        CHEVRON_RIGHT: {
            viewBox: "0 0 16 16",
            color: "currentColor", // Inherits button color
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
            // The Shield
            "M7.96777 4C9.10611 4 10.0923 4.6415 10.5892 5.58235C10.7669 5.9189 10.4975 6.28815 10.133 6.39763C9.71465 6.52328 9.21886 6.26499 8.89961 5.96693C8.65557 5.73907 8.32808 5.59961 7.96777 5.59961C7.2124 5.59964 6.59965 6.21238 6.59961 6.96777C6.59961 7.32809 6.73907 7.65557 6.96692 7.89961C7.26499 8.21887 7.52327 8.71466 7.39763 9.13297C7.28815 9.49749 6.91891 9.76694 6.58236 9.58919C5.6415 9.09228 5 8.10612 5 6.96777C5.00004 5.32873 6.32873 4.00003 7.96777 4Z",
            "M8.41211 1.01367C12.6388 1.29664 16 5.83754 16 7L15.9893 7.12305C15.9814 7.17357 15.9201 7.19341 15.8798 7.16195C15.4028 6.78977 14.8632 6.49433 14.2791 6.29461C14.0047 6.20078 13.7582 6.03596 13.5771 5.8094C13.2959 5.45761 12.9559 5.08387 12.5654 4.71973C11.266 3.50811 9.63902 2.59962 8 2.59961C6.36098 2.59961 4.73399 3.50812 3.43457 4.71973C2.80105 5.31049 2.29939 5.92576 1.96777 6.43262C1.75153 6.76316 1.75905 7.18645 1.98637 7.50949C1.98894 7.51315 1.99154 7.51682 1.99414 7.52051C2.35795 8.03497 2.902 8.65926 3.57031 9.26074C4.57401 10.1641 5.70017 10.8753 6.77913 11.2026C6.90987 11.2423 7 11.3634 7 11.5C7 12.1834 6.42938 12.8 5.79211 12.5531C2.64955 11.336 0 7.9766 0 7C0 5.8 3.58174 1 8 1L8.41211 1.01367Z",
            // The Clock Ring & Hands (Converted to a filled path)
            "M12 7.8A3.2 3.2 0 1 0 15.2 11 3.2 3.2 0 0 0 12 7.8zm.5 3.3l.5.5-.7.7-.5-.5V10h-1.4v1.4l.5.5.7-.7-.5-.5H12v-1h.5z"
        ]
    },
    AI_LINK: {
        viewBox: "0 0 24 24", 
        color: "currentColor", // This ensures it inherits the purple color from the link
        paths: [
            // The Star
            "M12 2L14.4 9.6L22 12L14.4 14.4L12 22L9.6 14.4L2 12L9.6 9.6L12 2Z",
            // The Dot (Circle converted to path)
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
    INVOICE: {
        viewBox: "0 0 24 24",
        paths: [
            "M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"
        ]
    },
    };

    // ==========================================
    // === CLICK LISTENER (Re-Highlighting) ===
    // ==========================================
    function setupClickRehighlighter() {
        document.addEventListener('click', function(e) {
            // 1. Only listen to clicks inside the main email body (role="main")
            // This ensures we catch the "2 hidden messages" button or "Reply" clicks
            if (!e.target.closest('[role="main"]')) return;

            // 2. Ignore clicks inside our own balloon to prevent loops
            if (e.target.closest('#wm-smart-balloon')) return;

            // 3. Only run if we actually have data cached (Don't re-run LLM)
            if (!cachedGroupedData || Object.keys(cachedGroupedData).length === 0) {
                return;
            }

            // 4. Re-apply highlights at specific intervals to catch Gmail's rendering
            
            // A. Immediate (Fast UI toggles)
            applyHighlightsFromData(cachedGroupedData);

            // B. Short Delay (500ms) - For CSS animations/expansions
            setTimeout(function() {
                applyHighlightsFromData(cachedGroupedData);
            }, 500);

            // C. Long Delay (2000ms) - For Network requests (loading hidden messages)
            setTimeout(function() {
                applyHighlightsFromData(cachedGroupedData);
            }, 2000);

        }, true); // Use Capture Phase to catch the event before Gmail stops propagation
    }

    function ctor() {
        eventsListener = getCtx().get('EventsListener');
    }

    function getDatapulseSettings() {
        var settings = getCustomSettings();
        if (settings && settings.datapulse && Array.isArray(settings.datapulse) && settings.datapulse.length > 0) {
            return settings.datapulse;
        }
        return [
            { "sourceGuid": "72f30c14-4447-4e9b-8175-e2fd7cd79b61", "ner": "Company Names" },
            { "sourceGuid": "6722521a-aa0f-4512-adf5-025bb8c798a8", "ner": "People Names" }
        ];
    }

    function checkAndClosePopup() {
        // 1. Are we on the Jira domain?
        if (window.location.href.indexOf('projects/DD/boards/391') < 0) return;
        
        // 2. Are we inside the specific "JiraLogin" popup window?
        if (window.name !== 'JiraLogin') return;

        log('[CustomersFetcher] Detected Login Popup on Jira. Signaling success and closing...');

        // 3. Write the Success Signal to Shared Storage
        if (clientStorageManager) {
            // The hidden iframe on Gmail is polling for exactly this key
            clientStorageManager.saveData('cfCloseWindow', 'false', 60);
            clientStorageManager.saveData('loginFinished', 'true', 60);
        }

        // 4. Close the window
        setTimeout(function() {
            window.close();
        }, 500); // Small delay to ensure storage write finishes
    }

    function run() {
        if (!eventsListener) {
            log('[CustomersFetcher] Cannot run, EventsListener not found.');
            return;
        }

        eventsListener.once('WalkMeReady', function () {
            siteConfigManager = getCtx().get('SiteConfigManager');
            var endUsersManager = getCtx().get('EndUsersManager');
            serverLog = getCtx().get('EventCollectorLogger').log;
            checkAndClosePopup();
            // Assets
            var aiFetcherWrapper = getCtx().get('AiFetcherWrapper');
            if (aiFetcherWrapper) {
                aiFetcher = aiFetcherWrapper.getAiFetcher();
            } else {
                log('[CustomersFetcher] AiFetcherWrapper not found!');
                return;
            }

            if (getCtx().has('ClientStorageManager')) {
                clientStorageManager = getCtx().get('ClientStorageManager');
            }
            
            if (endUsersManager) {
                END_USER_ID = endUsersManager.getEndUserGuid();

                if (typeof JiraBridge !== 'undefined' && JiraBridge.init) {
                     JiraBridge.init();
                }
            }

            if (isUserPermmited()) {
                log('[CustomersFetcher] User is permitted to view ARR.');
                hide_arr = false;
            }

            // --- 1. SET GLOBAL INDICATOR ---
            window._walkmeInternals = window._walkmeInternals || {};
            window._walkmeInternals.contextLayerActive = true;

            strigUtils = getCtx().get('StringUtils');
            uiChangeTracker = getCtx().get('UIChangeTracker');
            
            var settings = getCustomSettings();
            if (settings && typeof settings.highlightAll !== 'undefined') {
                HIGHLIGHT_ALL = settings.highlightAll;
            }

            getSmallLogo();
            getLargeLogo();

            eventsListener.on(TOGGLE_EVENT_NAME, handleToggleChange);
            uiChangeTracker.bind(tryFetchAndHighlight);
            
            log('[CustomersFetcher] Ready. ContextLayerActive=true. Listening for changes.');
            
            tryFetchAndHighlight();
            watchNativeCards();
            setupClickRehighlighter();
        });
    }

    function isUserPermmited() {
        var settings = getCustomSettings();
        var allowedUsers = settings.allowedUsers;
        if (allowedUsers && allowedUsers.indexOf(END_USER_ID) !== -1) return true;
        
        var allowedSegments = settings.allowedSegments;
        if (allowedSegments && Array.isArray(allowedSegments) && allowedSegments.length > 0) {
            for (var i=0; i<allowedSegments.length; i++) {
                if (WalkMeAPI.evaluateSegmentTag(allowedSegments[i])){
                    return true;
                }
            }
        }
        return false;
    }
    

    function getCustomSettings() {
        var config = siteConfigManager.get();
        if (config && config.Custom && config.Custom.customersFetcher) {
            return config.Custom.customersFetcher;
        }
        return {};
    }

    function getContentRoot() {
        var settings = getCustomSettings();
        var selectors = settings.contentSelectors; 
        if (selectors && Array.isArray(selectors)) {
            for (var i = 0; i < selectors.length; i++) {
                var el = wmjQuery(selectors[i])[0];
                if (el) return el;
            }
        }
        return wmjQuery('[data-thread-perm-id]').parent().parent().parent().parent().parent()[0];
    }

    // --- TOGGLE LOGIC ---
    function isLayerHidden() {
        if (!clientStorageManager) return false; 
        var val = clientStorageManager.getData(STORAGE_KEY_HIDDEN);
        return !!val; 
    }

    function muteLayer(duration) {
        if (!clientStorageManager) return;

        var seconds = 0;
        if (duration === '1hour') {
            seconds = 3600; // 1 Hour
        } else {
            seconds = 31536000; // 1 Year (Always)
        }

        // Save with expiration time
        clientStorageManager.saveData(STORAGE_KEY_HIDDEN, 'true', seconds);

        // Apply UI Cleanup immediately
        log('[CustomersFetcher] Muting layer for ' + duration);
        serverLog('info','[SmartHighlights] - disabled from balloon for ' + duration); 
        cleanupHighlights();
    }

    function handleToggleChange() {
        if (isLayerHidden()) {
            log('[CustomersFetcher] Toggle Changed -> HIDDEN. Cleaning up.');
            serverLog('info','[SmartHighlights] - disabled from action bar'); 
            cleanupHighlights();
            isProcessing = false;
        } else {
            log('[CustomersFetcher] Toggle Changed -> VISIBLE. Scanning.');
            serverLog('info','[SmartHighlights] - enabled from action bar');
            var balloon = document.getElementById('wm-smart-balloon');
            if (balloon) {
                balloon.style.opacity = '100';
            }
            tryFetchAndHighlight();
        }
    }


    function toggleMenu(btnElement) {
        var existingMenu = document.getElementById('wm-smart-options-menu');
        if (existingMenu) { existingMenu.remove(); return; }

        var menu = document.createElement('div');
        menu.id = 'wm-smart-options-menu';
        menu.className = 'wm-smart-options-menu';

        function addOption(label, iconDef, actionArg) {
            var opt = document.createElement('div');
            opt.className = 'wm-menu-option';
            opt.onclick = function(e) { 
                e.stopPropagation(); 
                muteLayer(actionArg); 
                menu.remove(); 
            };
            opt.appendChild(createSvgIcon(iconDef));
            opt.appendChild(document.createTextNode(label));
            menu.appendChild(opt);
        }

        addOption('Hide always', ICONS.HIDE_ALWAYS, 'always');
        addOption('Hide for 1 hour', ICONS.HIDE_HOUR, '1hour');

        // Footer (Safe DOM creation)
        var footer = document.createElement('div');
        footer.className = 'wm-menu-footer';
        var link = document.createElement('a');
        link.href = '#';
        link.style.color = '#1677FF';
        link.style.textDecoration = 'none';
        link.innerText = 'settings';
        link.onclick = function(e) { 
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
        
        // Close on click outside
        setTimeout(function() {
            var closeMenu = function(e) {
                if (!menu.contains(e.target) && !btnElement.contains(e.target)) {
                    menu.remove();
                    document.removeEventListener('click', closeMenu);
                }
            };
            document.addEventListener('click', closeMenu);
        }, 0);
    }

    function cleanupHighlights() {
        var highlights = document.querySelectorAll('.wm-highlight-shimmer');
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
        navigationStack = [];
    }

    // ==========================================
    // === SVG HELPER (GMAIL SAFE) ===
    // ==========================================
    // Updated Helper: Now accepts custom color and viewBox
    function createSvgIcon(iconConfig) {
        var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        
        // Defaults
        var viewBox = iconConfig.viewBox || "0 0 16 16";
        var color = iconConfig.color || "#556B82"; // Default Gray-Blue

        svg.setAttribute("viewBox", viewBox);
        svg.setAttribute("width", "14");
        svg.setAttribute("height", "14");
        svg.style.verticalAlign = "text-bottom";
        svg.style.marginRight = "8px"; // Spacing between icon and label
        svg.style.fill = "none";
        
        var paths = iconConfig.paths || [];
        
            paths.forEach(function(d) {
                 var path = document.createElementNS("http://www.w3.org/2000/svg", "path");
                 path.setAttribute("d", d);
                 path.setAttribute("fill", color);
                 svg.appendChild(path);
            });
        
        return svg;
    }

    // ==========================================
    // === ORCHESTRATION LOGIC (Data Fetching) ===
    // ==========================================

    function callLLM(prompt, responseSchema, funcName) {
        var llmRequestBody = {
            stream: false,
            as_text: true,
            temperature: 0,
            max_tokens: 2000,
            messages: [{ role: 'system', content: prompt }]
        };

        if (responseSchema) {
            llmRequestBody.response_format = {
                type: "json_schema",
                json_schema: responseSchema
            };
        } else {
             llmRequestBody.response_format = { type: "json_object" };
        }

        var funcToRun = funcName || 'freePromptMini';

        return aiFetcher.sendCustomLlmRequest(llmRequestBody, funcToRun)
            .then(function(response) {
                try {
                    if (typeof response === 'object') return response;
                    if (typeof response === 'string') {
                        var cleanJson = response.replace(/^```json\s*/i, '').replace(/^```\s*/i, '').replace(/```\s*$/, '');
                        return JSON.parse(cleanJson);
                    }
                    return {};
                } catch (e) {
                    log('[CustomersFetcher] JSON Parse Error: ' + e.message);
                    return {};
                }
            });
    }

    function extractNER(emailText) {
        var settings = getCustomSettings();
        var context = settings.context ? " from " + settings.context : "";
        var datapulseConfig = getDatapulseSettings();
        
        var hintLines = [];
        var schemaProperties = {};
        var requiredFields = [];

        datapulseConfig.forEach(function(item, index) {
            var category = item.ner; 
            hintLines.push((index + 1) + ". " + category);
            schemaProperties[category] = {
                "type": "array",
                "items": { "type": "string" },
                "description": "List of " + category.toLowerCase() + " found in the text",
                "minItems": 0
            };
            requiredFields.push(category);
        });

        var hintText = hintLines.join('\n');
        var prompt = "You are an expert at extracting Named Entity Recognition (NER) from input text" + context +
                     ". The hint should guide you on what to extract the entities:\n\n" +
                     "<hint>\n" + hintText + "\n</hint>\n" +
                     "<input text>\n" + emailText + "\n</input text>\n\n" +
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

        return callLLM(prompt, schema, FUNC_NER).then(function(response) {
            var cleanedResponse = {};
            Object.keys(response).forEach(function(key) {
                var rawList = response[key] || [];
                var uniqueList = [];
                rawList.forEach(function(entity) {
                    var cleanEntity = entity.trim();
                    if (uniqueList.indexOf(cleanEntity) === -1) {
                        var lower = cleanEntity.toLowerCase();
                        if (!lower.includes('walkme') && lower !== 'sap') {
                            uniqueList.push(cleanEntity);
                        }
                    }
                });
                cleanedResponse[key] = uniqueList;
            });
            return cleanedResponse;
        });
    }

    function searchDatapulse(nerData) {
        if (isLayerHidden()) return Promise.resolve([]);

        var hasAnyResults = false;
        Object.keys(nerData).forEach(function(key) {
            if (nerData[key] && nerData[key].length > 0) hasAnyResults = true;
        });

        if (!hasAnyResults) return Promise.resolve([]);

        var datapulseConfig = getDatapulseSettings();
        var nerPayload = datapulseConfig.map(function(configItem) {
            return {
                "sourceGuid": configItem.sourceGuid,
                "ner": nerData[configItem.ner] || [] 
            };
        });

        var payload = {
            "system_guid": SYSTEM_GUID,
            "ner_results": nerPayload,
            "source_guids": SOURCE_GUIDS, 
            "hint": "You are looking for:\n1. Company Names\n2. People Names",
            "segment_ids": null,
            "hide_arr": hide_arr
        };

        return new Promise(function(resolve, reject) {
            wmjQuery.ajax({
                url: SEARCH_ENDPOINT,
                type: 'POST',
                crossDomain: true,
                contentType: 'application/json',
                data: JSON.stringify(payload),
                dataType: 'json',
                success: function(response) {
                    if (response.success && response.candidates) {
                        resolve(response.candidates);
                    } else {
                        resolve([]);
                    }
                },
                error: function(xhr, status, error) {
                    log('[CustomersFetcher] Search API Failed: ' + error);
                    resolve([]); 
                }
            });
        });
    }

    function validateMatches(emailText, candidates) {
        if (isLayerHidden()) return Promise.resolve({ employees: [], customers: [] });
        if (!candidates || candidates.length === 0) return Promise.resolve({ employees: [], customers: [] });

        var filteredCandidates = candidates.filter(function(match) {
            var isPerson = (match.match_type !== 'Company');
            var isSingleWord = (match.candidate && match.candidate.trim().indexOf(' ') === -1);
            if (isPerson && isSingleWord) return false;
            return true;
        });

        if (filteredCandidates.length === 0) return Promise.resolve({ employees: [], customers: [] });

        var settings = getCustomSettings();
        var context = settings.context || '';

        var systemPrompt = 
            "You are an expert entity matching validator. Your goal is to distinguish genuine semantic matches from string-only coincidences based on the context - " + context +
            ".\n\n## RULES:\n" +
            "1. **Context is the MOST important**: Analyze the email narrative. Ensure the candidate and database record refer to the SAME real-world entity (e.g., Reject 'Level Up Coding' blog vs 'Level AI' company).\n" +
            "2. **Reject False Positives**: Discard partial word overlaps, mismatched entity types, or generic terms.\n" +
            "3. **Handle Groups**: If a candidate matches a company and the database suggests multiple valid subsidiaries (e.g., 'Volvo' matches 'Volvo Cars' and 'Volvo IT'), ACCEPT ALL related records.\n" +
            "4. **Output**: Return ONLY the validated database values (account_name or employee_full_name).";

        var userMessage = "EMAIL TEXT:\n" + emailText + "\n\n---\n\nCANDIDATE MATCHES:\n\n";

        filteredCandidates.forEach(function(match, idx) {
            userMessage += "Match #" + (idx + 1) + ":\n";
            userMessage += "- Candidate Name: " + (match.candidate || 'Unknown') + "\n";
            userMessage += "- Match Type: " + (match.match_type || 'Unknown') + "\n";
            userMessage += "- Matched Record:\n";
            
            var record = match.matched_record || {};
            var fieldsToSend = [];

            if (match.match_type === 'Company') {
                fieldsToSend = ['account_name', 'account_csm_name']; 
            } else {
                fieldsToSend = ['employee_full_name', 'employee_email']; 
            }

            fieldsToSend.forEach(function(key) {
                if (record[key]) {
                    userMessage += "  - " + key + ": " + record[key] + "\n";
                }
            });
            userMessage += "\n";
        });

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

        return callLLM(fullPrompt, schema, FUNC_JUDGE).then(function(response) {
            var validCompanies = response.Company || [];
            var validPeople = response.Person || [];
            
            var finalResults = { employees: [], customers: [] };

            filteredCandidates.forEach(function(match) {
                if (match.match_type === 'Company') {
                    var acctName = match.matched_record ? match.matched_record.account_name : null;
                    if (validCompanies.indexOf(acctName) !== -1) {
                        finalResults.customers.push(match);
                    }
                } else {
                    var empName = match.matched_record ? match.matched_record.employee_full_name : null;
                    if (validPeople.indexOf(empName) !== -1) {
                        finalResults.employees.push(match);
                    }
                }
            });

            return finalResults;
        });
    }

    function fetchValidatedEntities(text, skipNER) {
        log('[CustomersFetcher] Fetching entities for: ' + text);

        var step1 = skipNER 
        ? Promise.resolve({ "People Names": [text] })
            : extractNER(text);

        return step1
            .then(function(nerResultsObj) {
                if (!isPageContextValid()) return null;
                var isEmpty = true;
                Object.keys(nerResultsObj).forEach(function(k) {
                    if (nerResultsObj[k] && nerResultsObj[k].length > 0) isEmpty = false;
                });

                if (isLayerHidden() || isEmpty) return [];
                return searchDatapulse(nerResultsObj);
            })
            .then(function(candidates) {
                if (!candidates) return null;
                if (!isPageContextValid()) return null;
                if (isLayerHidden()) return { employees: [], customers: [] };
                if (!candidates || candidates.length === 0) return { employees: [], customers: [] };
                
                var context = skipNER ? "User explicitly searched for employee: " + text : text;
                return validateMatches(context, candidates);
        })
    }

    function prefetchManager(managerName) {
        if (!managerName || managerName === 'N/A' || managerName === 'R&M™') return;
        if (managerCache[managerName]) return;
        log('[CustomersFetcher] Pre-fetching manager: ' + managerName);
        managerCache[managerName] = fetchValidatedEntities(managerName, true);
    }

    function formatToUiData(validatedData) {
        var groupedData = {};
        var seenCompanyIds = [];
        var seenEmployeeIds = [];

        function addToGroup(keyword, dataObj) {
            if (!keyword) return;
            if (!groupedData[keyword]) groupedData[keyword] = [];
            groupedData[keyword].push(dataObj);
        }

        if (validatedData.customers) {
            validatedData.customers.forEach(function(match) {
                var info = match.matched_record;
                var targetName = match.candidate || info.account_name; 
                
                if (!info) return;
                
                if (BLOCKED_TARGETS.indexOf(targetName) !== -1 || BLOCKED_TARGETS.indexOf(info.account_name) !== -1) {
                    return;
                }
                
                var formattedARR = '$' + (info.account_arr || 0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                var healthScore = info.account_health_score ? Math.round(info.account_health_score) : 0;
                var isInRisk = (info.account_at_risk === 't');
                var riskDisc = isInRisk && (info.account_at_risk_desc || 'At Risk');

                var rows = [
                    { label: 'ARR', value: formattedARR },
                    { label: 'Health score', value: healthScore + '/100 ' , title: riskDisc},
                    { label: 'Renewal date', value: info.next_renewal_date || 'N/A' },
                    { label: 'Open opportunities', value: info.number_of_open_opps || 'N/A'},
                    { label: 'Account manager', value: info.account_ae_name || 'N/A', isClickable: true },
                    { label: 'CSM name', value: info.account_csm_name || 'N/A', isClickable: true }
                ];

                var dataObj = {
                    type: 'company',
                    title: info.account_name || targetName,
                    subtitle: info.account_tier + " Customer",
                    rows: rows,
                    link: info.account_sfdc_link || null,
                    linkLabel: 'Open in Salesforce',
                    isRisk: (info.account_at_risk === 't')
                };
                addToGroup(targetName, dataObj);
            });
        }

        if (validatedData.employees) {
            validatedData.employees.forEach(function(match) {
                var info = match.matched_record;
                var targetName = match.candidate || info.employee_full_name;
                
                if (!info) return;
                
                if (BLOCKED_TARGETS.indexOf(targetName) !== -1 || BLOCKED_TARGETS.indexOf(info.employee_full_name) !== -1) {
                    return;
                }
                
                if (info.employee_id && seenEmployeeIds.indexOf(info.employee_id) !== -1) return;
                if (info.employee_id) seenEmployeeIds.push(info.employee_id);

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

                var dataObj = {
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
                    linkLabel: 'View profile'
                };
                addToGroup(targetName, dataObj);
            });
        }
        return groupedData;
    }

    function isContainerVisable() {
        var settings = getCustomSettings();
        var selectors = settings.visibilitySelectors;

        if (selectors && Array.isArray(selectors)) {
            for (var i = 0; i < selectors.length; i++) {
                var el = wmjQuery(selectors[i]);
                if (el.length > 0) return true;
            }
        }

        return wmjQuery('[data-thread-perm-id]').length > 0;
    }

    function isPageContextValid() {
        if (isLayerHidden()) return false;
        if (!isContainerVisable()) return false;

        var mainContainer = getContentRoot();
        var pageText = getCleanText(mainContainer); 
        var currentText = pageText ? pageText.trim() : '';
        if (!currentText) return false;

        if (lastQueryText && strigUtils) {
            if (!strigUtils.isSimilar(currentText, lastQueryText)) {
                return false; 
            }
        }
        return true;
    }

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

    function fetchDemoInvoices(text) {
        // We search for the phrase so we don't need complex regex
        var PHRASE = 'Invoice #90003237'; 
        
        if (text.indexOf(PHRASE) === -1) {
            return Promise.resolve({}); 
        }

        var result = {};
        result[PHRASE] = [{
            type: 'invoice',
            title: PHRASE, 
            subtitle: 'High Value Transaction',
            rows: [
                { label: 'Total Amount', value: '300,000 USD', isBold: true },
                { label: 'Status', value: 'To Be Posted ⚠️', color: '#D32F2F', isBold: true },
                // Exact string match for the click interceptor
                { label: 'Customer', value: 'ACME', isClickable: true }, 
                { label: 'Reference', value: '0090003237' }
            ],
            link: '#',
            linkLabel: 'View Invoice'
        }];

        return Promise.resolve(result);
    }


    function tryFetchAndHighlight() {
        if (isLayerHidden()) return;
        if (!isContainerVisable()) return;

        var mainContainer = getContentRoot();
        var pageText = getCleanText(mainContainer);
        var pageTextTrimmed = pageText ? pageText.trim() : '';

        if (!pageTextTrimmed) return;

        if (lastQueryText && strigUtils && strigUtils.isSimilar(pageTextTrimmed, lastQueryText)) {
            if (cachedGroupedData) {
                applyHighlightsFromData(cachedGroupedData);
            }
            return;
        }
        
        lastQueryText = pageTextTrimmed;
        
        if (!isProcessing) {
            isProcessing = true;
            cachedGroupedData = null;
            pipelineStartTime = Date.now();
            
        var pEmployees = fetchValidatedEntities(pageTextTrimmed, false);
                
                // 2. Start Demo Fetch
                var pDemo = fetchDemoInvoices(pageTextTrimmed); 

                // 3. Wait for BOTH
                Promise.all([pEmployees, pDemo]).then(function(results) {
                    var empData = results[0];
                    var demoData = results[1]; 

                    if (isLayerHidden()) {
                        isProcessing = false;
                        return;
                    }

                    var groupedEmployees = empData ? formatToUiData(empData) : {};
                    
                    // 4. Merge Results
                    var finalGrouped = Object.assign({}, groupedEmployees, demoData);

                    cachedGroupedData = finalGrouped;
                    applyHighlightsFromData(finalGrouped);
                    isProcessing = false;
        });
        }
        // PROCESS B: Jira (Parallel, Slow)
        fetchJiraTickets(pageTextTrimmed)
            .then(function(ticketData) {
                if (isLayerHidden()) return;
                var groupedTickets = formatTicketsToUiData(ticketData);
                // Merge into cache
                cachedGroupedData = Object.assign(cachedGroupedData || {}, groupedTickets);
                applyHighlightsFromData(groupedTickets); 
            })
            .catch(function(e) { log('[Fetcher] Jira process failed', e); });

    }

    function applyHighlightsFromData(groupedData) {
        Object.keys(groupedData).forEach(function(keyword) {
            createSmartHoverBalloon(keyword, groupedData[keyword]);
        });

        if (pipelineStartTime > 0) {
            var duration = Date.now() - pipelineStartTime;
            serverLog('info','[SmartHighlights] - Highlight shown',{duration: duration})
            pipelineStartTime = 0;
        }
    }
    
    function getCleanText(container) {
        if (!container) return '';

        function isBlock(tag) {
            return ['div', 'p', 'tr', 'td', 'th', 'li', 'h1', 'h2', 'h3', 'br'].indexOf(tag) !== -1;
        }

        function walk(node) {
            var text = '';
            if (node.nodeType === 3) return node.nodeValue; // Text node
            
            if (node.nodeType === 1) { // Element node
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
                return ' ' + text + ', \n '; // Force spacing for blocks/tables
            } 

            return text;
        }

        return walk(container).replace(/\s+/g, ' ').trim();
    }

    function handleManagerClick(managerName) {
        var balloon = document.getElementById('wm-smart-balloon');
        var currentTop = balloon.style.top;

        while (balloon.firstChild) balloon.removeChild(balloon.firstChild);
        var loadingContainer = document.createElement('div');
        loadingContainer.className = 'wm-loading-container';
        var pulseWrapper = document.createElement('div');
        pulseWrapper.className = 'wm-loading-pulse';
        var loadingImg = getLargeLogo();
        pulseWrapper.appendChild(loadingImg);
        loadingContainer.appendChild(pulseWrapper);
        var loadingText = document.createElement('div');
        var dispName = (managerName === 'ron zohar, moran shemer') ? 'R&M' : managerName;
        loadingText.innerText = 'Fetching info for ' + dispName + '...';
        loadingContainer.appendChild(loadingText);
        balloon.appendChild(loadingContainer);
        balloon.style.top = currentTop;
         
        var dataPromise;
        if (managerCache[managerName]) {
            log('[CustomersFetcher] Cache hit for manager: ' + managerName);
            dataPromise = managerCache[managerName];
        } else {
            dataPromise = fetchValidatedEntities(managerName, true);
        }

        dataPromise.then(function(validatedData) {
            var grouped = formatToUiData(validatedData);
            var allResults = [];
            Object.keys(grouped).forEach(function(key) {
                allResults = allResults.concat(grouped[key]);
            });

            if (allResults.length > 0) {
                renderBalloonContent(allResults);
            } else {
                loadingText.innerText = 'No details found for ' + dispName;
                pulseWrapper.style.display = 'none';
            }
        });
    }

    var oldContentArray = null;

    // ==========================================
// === AI SUMMARIZATION LOGIC ===
// ==========================================

function generateTicketSummary(ticketData) {
        // 1. Format Comments for Context
        var commentsText = "";
        if (ticketData.comments && Array.isArray(ticketData.comments) && ticketData.comments.length > 0) {
            commentsText = ticketData.comments.map(function(c) {
                // Handle both object {author, body} and string comments
                var author = c.author || 'Unknown';
                var body = c.body || c; 
                return "[" + author + "]: " + body;
            }).join('\n---\n');
        } else {
            commentsText = "No comments.";
        }

        // 2. Build Prompt (MUST CONTAIN THE WORD 'JSON')
        var prompt = "You are a helpful project manager assistant. Summarize the following Jira ticket.\n\n" + 
                     "Ticket: " + ticketData.title + "\n" +
                     "Title: " + ticketData.subtitle + "\n" +
                     "Description: " + (ticketData.description || 'N/A') + "\n" +
                     "Recent Comments:\n" + commentsText + "\n\n" +
                     "Instructions: Provide a concise summary (max 4-5 sentences). Focus on the core issue, the latest status based on the comments, and next steps.\n\n" +
                     // === CRITICAL FIX BELOW ===
                     "IMPORTANT: Return the result as a valid JSON object with a single key named 'summary'."; 

        // 3. Call LLM
        return callLLM(prompt, null, FUNC_JUDGE).then(function(res) {
             // The result is already parsed JSON because of callLLM
             return res.summary || "No summary generated.";
        });
    }

function handleSummarizeClick(ticketData, currentContentArray) {
    // 1. Save state for Back button
    navigationStack.push(currentContentArray);

    var balloon = document.getElementById('wm-smart-balloon');
    var currentTop = parseInt(balloon.style.top || 0);

    // === STEP A: FREEZE SIZE (PREVENT CLOSING) ===
    // We capture the current computed size and force it as inline styles.
    // This prevents the balloon from snapping to 0 height when we clear content.
    var rect = balloon.getBoundingClientRect();
    balloon.style.width = rect.width + 'px'; 
    balloon.style.height = rect.height + 'px'; 
    // =============================================

    // 2. Clear content & Show Loader
    while (balloon.firstChild) balloon.removeChild(balloon.firstChild);
    
    var loadingContainer = document.createElement('div');
    loadingContainer.className = 'wm-loading-container';
    // Ensure loader takes up the full frozen height so it looks centered
    loadingContainer.style.height = '100%'; 
    
    var pulseWrapper = document.createElement('div');
    pulseWrapper.className = 'wm-loading-pulse';
    pulseWrapper.appendChild(getLargeLogo()); 
    
    var loadingText = document.createElement('div');
    loadingText.innerText = 'AI is summarizing ' + ticketData.title + '...';
    
    loadingContainer.appendChild(pulseWrapper);
    loadingContainer.appendChild(loadingText);
    balloon.appendChild(loadingContainer);

    // 3. Call AI
    generateTicketSummary(ticketData).then(function(summaryText) {
        
        // === STEP B: UNFREEZE & EXPAND ===
        balloon.style.height = ''; // Release fixed height (let content dictate it)
        balloon.style.width = '';  // Release fixed width (let class dictate it)
        balloon.classList.add('wm-wide-mode'); // Apply the 1.5x width class
        // =================================

        var summaryPageData = {
            type: 'ticket_summary',
            title: 'Summary: ' + ticketData.title,
            subtitle: 'AI Generated Insight',
            textContent: summaryText,
            rows: [],
            link: ticketData.link,
            linkLabel: 'Open in Jira'
        };

        renderBalloonContent([summaryPageData]);
        
        // Re-adjust top position if the expansion made it go off-screen? 
        // Usually, just keeping the same top is fine, but if it grew upwards:
        // balloon.style.top = currentTop + 'px'; 

    }).catch(function(err) {
        loadingText.innerText = 'Analysis failed. Please try again.';
        pulseWrapper.style.display = 'none';
        // Release locks on error too
        balloon.style.height = 'auto'; 
        balloon.style.width = '';
        log('[CustomersFetcher] Summary failed', err);
    });
}

    function renderBalloonContent(contentArray) {
        if (oldContentArray == contentArray) return;
        oldContentArray = contentArray;

        var balloon = document.getElementById('wm-smart-balloon');
        if (!balloon) return;

        // === LOGIC TO HANDLE WIDE MODE TOGGLE ===
        // Check the type of the first item to decide if we need wide mode
        var isSummaryView = (contentArray[0] && contentArray[0].type === 'ticket_summary');
    
        if (isSummaryView) {
            balloon.classList.add('wm-wide-mode');
        } else {
            // If we are going "Back" to normal ticket view, remove the class
            balloon.classList.remove('wm-wide-mode');
            // Ensure we clean up any manual style overrides from the loading phase
            balloon.style.width = ''; 
            balloon.style.height = ''; 
        }

        serverLog('info','[SmartHighlights] - balloon shown');

        if (clientStorageManager) {
            clientStorageManager.saveData('smartHighlightUser', END_USER_ID, 60, '9ac4dfd5cacc4ffdb35c3a5dfa0f3406');
            clientStorageManager.saveData('smartHighlightUser', END_USER_ID, 60, '57e0de1cb54f4cc4ae3fb976304b64c7');
        }
        

        var currentTop = balloon.style.top;
        var totalItems = contentArray.length;

        function renderSlide(index) {
            while (balloon.firstChild) balloon.removeChild(balloon.firstChild);
            
            if (!contentArray[index]) {
                balloon.innerText = "No Data Available";
                return;
            }

            var data = contentArray[index];

            if (data.rows && Array.isArray(data.rows)) {
                data.rows.forEach(function(row) {
                    if ((row.label.toLowerCase().indexOf('manager') > -1 || row.label.toLowerCase().indexOf('name') > -1) && row.isClickable && row.value !== 'N/A') {
                        var mgrName = row.value;
                        if (mgrName === 'R&M™') mgrName = 'ron zohar, moran shemer';
                        prefetchManager(mgrName);
                    }
                });
            }

            if (totalItems > 1) {
                var pagDiv = createPaginationTop(index, totalItems, renderSlide);
                balloon.appendChild(pagDiv);
            }

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
            } else if (data.type === 'ticket' || data.type === 'jira_auth') {
                avatar.style.backgroundColor = '#DEEBFF';
                avatar.style.display = 'flex';
                avatar.style.alignItems = 'center';
                avatar.style.justifyContent = 'center';
                var ticketIcon = createSvgIcon(ICONS.TICKET_ICON);
                
                ticketIcon.setAttribute('width', '44'); 
                ticketIcon.setAttribute('height', '44');
                
                // 3. CRITICAL FIXES FOR CENTERING:
                ticketIcon.style.margin = '0';           // Remove the 8px margin
                ticketIcon.style.marginRight = '0';      // Force clear right margin
                ticketIcon.style.verticalAlign = '';     // Remove 'text-bottom' alignment
                ticketIcon.style.display = 'block';
                ticketIcon.style.marginLeft ='12px';
                ticketIcon.style.marginTop ='12px';
                
                avatar.appendChild(ticketIcon);
                } else if (data.type === 'invoice') {
                avatar.style.backgroundColor = '#DFE1E6'; 
                avatar.style.display = 'flex';
                avatar.style.alignItems = 'center';
                avatar.style.justifyContent = 'center';
                avatar.style.padding = '0';
                
                var icon = createSvgIcon(ICONS.INVOICE);
                icon.style.width = '24px'; 
                icon.style.height = '24px';
                icon.style.marginRight = '0';
                
                avatar.appendChild(icon);
            } else {
                avatar.textContent = getInitials(data.title);
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
                 infoCol.appendChild(subEl);
            }
            header.appendChild(infoCol);
            
            // --- NEW RIGHT SECTION ---
            var rightSection = document.createElement('div');
            rightSection.className = 'wm-header-right';

            // 1. Menu Button
            var menuBtn = document.createElement('button');
            menuBtn.className = 'wm-header-menu-btn';
            var dotsIcon = createSvgIcon(ICONS.MENU_DOTS);
            dotsIcon.style.margin = '0';
            menuBtn.appendChild(dotsIcon);
            menuBtn.onclick = function(e) {
                e.stopPropagation();
                toggleMenu(rightSection);
            };
            rightSection.appendChild(menuBtn);
            
             // 2. Logo (Moved below menu or beside it, typically handled by flex direction)
            var logoDiv = document.createElement('div');
            logoDiv.appendChild(getSmallLogo()); 
            rightSection.appendChild(logoDiv);

            header.appendChild(rightSection);
            
            balloon.appendChild(header);

            // --- 2. NEW: RISK BANNER ---
            if (data.isRisk) {
                var banner = document.createElement('div');
                banner.className = 'wm-risk-banner';
                
                // Add Icon
                banner.appendChild(createSvgIcon(ICONS.WARNING));
                
                // Add Text
                var bannerText = document.createElement('span');
                bannerText.textContent = data.riskLabel || 'Health score below 50';
                banner.appendChild(bannerText);
                
                balloon.appendChild(banner);
            }

            // --- 3. CONTENT ROWS ---
            var contentBox = document.createElement('div');
            contentBox.className = 'wm-content-box';
            // ... (Keep existing rows rendering loop) ...
            // ... (Ensure your loop logic for Icons/Links is here) ...
            
            var list = document.createElement('ul');
            list.className = 'wm-balloon-list';


            if (data.textContent) {
                // RENDER AS PLAIN TEXT BLOCK
                var p = document.createElement('div');
                p.className = 'wm-summary-text';
                p.textContent = data.textContent;
                contentBox.appendChild(p);
            } 


            if (data.rows && Array.isArray(data.rows)) {
                data.rows.forEach(function(row) {
                    if (row.label === 'Manager' && row.value ===  data.title) return;

                    var li = document.createElement('li');
                    li.className = 'wm-balloon-item';
                    li.style.display = 'flex'; 
                    li.style.alignItems = 'center';
                    
                    // Icon Logic
                    var iconDef = null;
                    var labelLower = row.label.toLowerCase();
                    if (labelLower.indexOf('role') > -1) iconDef = ICONS.ROLE;
                    else if (labelLower.indexOf('manager') > -1) iconDef = labelLower.indexOf('account') > -1 ? ICONS.ACCT_MANAGER : ICONS.MANAGER;
                    else if (labelLower.indexOf('csm') > -1) iconDef = ICONS.ACCT_MANAGER;
                    else if (labelLower.indexOf('department') > -1) iconDef = ICONS.DEPARTMENT;
                    else if (labelLower.indexOf('location') > -1) iconDef = ICONS.LOCATION;
                    else if (labelLower.indexOf('arr') > -1) iconDef = ICONS.ARR;
                    else if (labelLower.indexOf('tier') > -1) iconDef = ICONS.TIER;
                    else if (labelLower.indexOf('health') > -1) iconDef = ICONS.HEALTH;
                    else if (labelLower.indexOf('renewal') > -1) iconDef = ICONS.RENEWAL;
                    else if (labelLower.indexOf('open opp') > -1) iconDef = ICONS.OPEN_OPPS;
                    
                    if (iconDef) li.appendChild(createSvgIcon(iconDef));
                    
                    // Text
                    var textContainer = document.createElement('div');
                    textContainer.style.flex = "1";
                    textContainer.style.minWidth = "0"; 
                    textContainer.style.display = "flex";
                    
                    var labelSpan = document.createElement('span');
                    labelSpan.className = 'wm-label';
                    labelSpan.textContent = row.label + ': ';
                    textContainer.appendChild(labelSpan);

                    if (row.isClickable && row.value !== 'N/A' && row.value !== 'R&M') {
                        var a = document.createElement('a');
                        a.href = '#';
                        a.textContent = row.value;
                        a.className = 'wm-clickable-val'; 
                        a.onclick = function(e) {
                            e.preventDefault();
                            navigationStack.push(contentArray); 
                            if (row.value === 'ACME') {
                            renderBalloonContent(DEMO_CUSTOMER_DATA);
                            return; 
                            }
                            var query = row.value === 'R&M™' ? 'ron zohar, moran shemer' : row.value;
                            handleManagerClick(query);
                        };
                        if (row.color) a.style.color = row.color;
                        if (row.isBold) a.style.fontWeight = '700';
                        textContainer.appendChild(a);
                    } else {
                        var valSpan = document.createElement('span');
                        valSpan.className = 'wm-balloon-val';
                        valSpan.textContent = row.value;
                        valSpan.title = row.title || row.value; 
                        if (row.color) valSpan.style.color = row.color; // Support for colored status
                        textContainer.appendChild(valSpan);
                    }
                    li.appendChild(textContainer);
                    list.appendChild(li);
                });
            }
            contentBox.appendChild(list);
            balloon.appendChild(contentBox);

            // --- 6. FOOTER LINKS (FIXED for Login Button) ---
            if (data.link || data.orgChartLink || data.action === 'LOGIN_JIRA') {
                var footerBox = document.createElement('div');
                footerBox.className = 'wm-footer-box'; 

                if (data.type === 'ticket') {
                    var aiBtn = document.createElement('a');
                    aiBtn.href = '#';
                    aiBtn.className = 'wm-balloon-link';
                    aiBtn.style.color = '#8c5af6'; // AI Purple
                    aiBtn.appendChild(document.createTextNode('Summarize ticket'));
                    
                    // Ensure you added the SUMMARIZE icon to your ICONS object earlier!
                    var magicIcon = createSvgIcon( ICONS.AI_LINK); 
                    magicIcon.style.marginRight = '0';
                    magicIcon.style.marginLeft = '6px';
                    aiBtn.appendChild(magicIcon);

                    aiBtn.onclick = function(e) { 
                        e.stopPropagation(); 
                        e.preventDefault();
                        handleSummarizeClick(data, contentArray); 
                    };
                    footerBox.appendChild(aiBtn);
                }

                if (data.orgChartLink) {
                    var orgEl = document.createElement('a');
                    orgEl.href = data.orgChartLink;
                    orgEl.target = '_blank';
                    orgEl.rel = 'noopener noreferrer';
                    orgEl.className = 'wm-balloon-link';
                    orgEl.appendChild(document.createTextNode('View org chart'));
                    var orgIcon = createSvgIcon(ICONS.LINK);
                    orgIcon.style.marginRight = '0'; // Remove default right margin
                    orgIcon.style.marginLeft = '6px'; // Add space between text and icon
                    orgEl.appendChild(orgIcon);
                    orgEl.onclick = function(e) { 
                        e.stopPropagation();
                        serverLog('info','[SmartHighlights] - View org chart clicked');
                    };
                    footerBox.appendChild(orgEl);
                }

                // Main Link OR Login Action
                if (data.link || data.action === 'LOGIN_JIRA') {
                    var linkEl = document.createElement('a');
                    linkEl.href = data.link || '#';
                    
                    // Don't open new tab for Login action
                    linkEl.target = data.action === 'LOGIN_JIRA' ? '_self' : '_blank';
                    if (data.action !== 'LOGIN_JIRA') linkEl.rel = 'noopener noreferrer';
                    
                    linkEl.className = 'wm-balloon-link';
                    linkEl.appendChild(document.createTextNode(data.linkLabel));
                    var linkIcon = createSvgIcon(ICONS.LINK);
                    linkIcon.style.marginRight = '0'; // Remove default right margin
                    linkIcon.style.marginLeft = '6px'; // Add space between text and icon
                    linkEl.appendChild(linkIcon);
                    linkEl.onclick = function(e) { 
                        e.stopPropagation();
                        
                        if (data.action === 'LOGIN_JIRA') {
                            e.preventDefault();
                            clientStorageManager.saveData('jiraUserEmail', END_USER_ID, 20, '675f76510a2548acb858909da81457b3');
                            // === TRIGGER THE POPUP ===
                            JiraBridge.openLoginPopup(); 
                        } else {
                            serverLog('info','[SmartHighlights] - ' + data.linkLabel + ' clicked'); 
                        }
                    };
                    footerBox.appendChild(linkEl);
                }

                balloon.appendChild(footerBox);
            }

            // --- 5. BACK NAVIGATION ---
            // ... (Keep existing back nav logic) ...
            if (navigationStack.length > 0) {
                var bottomNav = document.createElement('div');
                bottomNav.className = 'wm-bottom-back-nav';
                bottomNav.textContent = 'Back to ' + navigationStack[navigationStack.length - 1][0].title; 
                bottomNav.onclick = function(e) {
                    e.stopPropagation();
                    var prev = navigationStack.pop();
                    balloon.style.top = currentTop;
                    renderBalloonContent(prev);
                };
                balloon.appendChild(bottomNav);
                balloon.style.top = currentTop;
            }
        }
        renderSlide(0);
    }
    
    function getInitials(name) {
        if (!name) return '';
        var parts = name.trim().split(' ');
        if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
        return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
    }

    function getSmallLogo() {
        if (!cachedSmallLogo) {
            cachedSmallLogo = document.createElement('img');
            cachedSmallLogo.src = LOGO_URL;
            cachedSmallLogo.width = 24; 
            cachedSmallLogo.height = 24;
            cachedSmallLogo.style.display = 'block'; 
            cachedSmallLogo.alt = "WalkMe AI";
        }
        return cachedSmallLogo;
    }

    function getLargeLogo() {
        if (!cachedLargeLogo) {
            cachedLargeLogo = document.createElement('img');
            cachedLargeLogo.src = LOGO_URL;
            cachedLargeLogo.width = 32;
            cachedLargeLogo.height = 32;
            cachedLargeLogo.style.display = 'block'; 
            cachedLargeLogo.alt = "WalkMe AI";
        }
        return cachedLargeLogo;
    }

    function createSmartHoverBalloon(searchString, contentArray) {
        if (isLayerHidden()) return;
        if (!searchString || !contentArray || contentArray.length === 0) return;
        if (!isContainerVisable()) return;

        // --- 1. DEFINE CSS (With Rendering Fixes) ---
        if (!document.getElementById('wm-balloon-styles')) {
             var styleSheet = document.createElement('style');
            styleSheet.id = 'wm-balloon-styles';
            styleSheet.textContent = 
                '.wm-highlight-shimmer { background: rgba(22, 119, 255, 0.1); border-radius: 8px; padding: 0 4px; display: inline-block; transition: background-color 0.2s ease; } ' +
                '.wm-highlight-shimmer:hover { background: rgba(22, 119, 255, 0.25); } ' +
                
                '#wm-smart-balloon { ' +
                    'position: fixed; background-color: #FAFAFC; box-sizing: border-box; width: 360px; padding: 16px; border-radius: 12px; text-overflow: ellipsis;' +
                    'box-shadow: 0 11px 15px -7px rgba(0,0,0,0.2), 0 24px 38px 3px rgba(0,0,0,0.14), 0 9px 46px 8px rgba(0,0,0,0.12); ' + 
                    'font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; font-size: 14px; line-height: 1.5; z-index: 2200; ' +
                    
                    // --- RENDERING FIXES (Solves the "lagging dots" issue) ---
                    'backface-visibility: hidden; ' +  // Forces single-layer rendering
                    'transform-style: flat; ' +        // Prevents 3D child detachment
                    'will-change: transform, opacity; ' + // Hints browser to optimize
                    
                    // START STATE
                    'opacity: 0; visibility: hidden; ' +
                    'transform: scale(0.8); ' + 
                    'transition: opacity 225ms cubic-bezier(0.4, 0, 0.2, 1), transform 225ms cubic-bezier(0.4, 0, 0.2, 1); ' +
                    
                    'text-align: left; pointer-events: auto; color: #172B4D; ' +
                '} ' +

                '#wm-smart-balloon.wm-wide-mode { ' +
                    'width: 540px !important; ' +
                    //'min-height: 450px !important; ' + // <--- FORCE IT TO STAY TALL
                '} ' +

                '.wm-summary-text { ' +
                    'white-space: pre-wrap; ' +       // Preserve paragraphs/newlines from AI
                    'word-break: break-word; ' +      // Prevent horizontal scrolling
                    'line-height: 1.6; ' +            // More readable spacing
                    'color: #172B4D; ' +
                    'font-weight: 400; ' +
                    'font-size: 14px; ' +
                '} ' +
                
                // OPEN STATE
                '#wm-smart-balloon.visible { ' +
                    'opacity: 1; visibility: visible; ' +
                    'transform: scale(1); ' +
                '} ' +

                '.wm-risk-banner { ' +
                'background-color: rgba(253, 245, 233, 1); ' +
                'border: 1px solid #FFE58F; ' +
                'border-radius: 8px; ' +
                'padding: 8px 12px; ' +
                'margin-bottom: 8px; ' + 
                'display: flex; ' +
                'align-items: center; ' +
                'color: #172B4D; ' +
                'font-weight: 500; ' +
                '} ' +

                // 3. Hover Effect
                '.wm-nav-btn-top:hover:not(:disabled) { background-color: rgba(9, 30, 66, 0.08); } ' +
                
                // 4. DISABLED STATE (This makes the icon fade to 30%)
                '.wm-nav-btn-top:disabled { opacity: 0.3; cursor: default; } ' +
                
                '.wm-dots-container-top { display: flex; align-items: center; justify-content: center; gap: 6px; margin-top: 2px; } ' +
                
                '.wm-card-header { display: flex; align-items: center; margin-bottom: 12px; position: relative; } ' +
                '.wm-avatar { width: 50px; height: 50px; background-color: #DEEBFF; color: #0052CC; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 400; font-size: 24px; flex-shrink: 0; margin-right: 12px; overflow: hidden; background-position: center; background-size: contain; } ' +
                '.wm-avatar-img { width: 55%; height: 55%; object-fit: contain; } ' +
                '.wm-header-info { display: flex; flex-direction: column; justify-content: center; overflow: hidden; flex: 1; } ' +
                '.wm-header-name { font-weight: 400; font-size: 17px; color: #172B4D; line-height: 1.25; padding-right: 2px; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; text-overflow: ellipsis;width: 216px; white-space: nowrap; overflow: hidden; } ' +
                '.wm-header-email { font-size: 14px; color: #6B778C; width: 215px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; } ' +
                '.wm-header-logo { margin-left: auto; margin-top: 8px; align-self: flex-start; } ' +

                '.wm-content-box { background-color: rgba(22, 119, 255, 0.03); border: 1px solid #DFE1E6; border-radius: 8px; padding: 12px 16px 8px 16px; font-size: 14px; } ' +
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
                
                // Update: Use specific transitions to avoid 'all' causing conflicts
                '.wm-dot-top { width: 6px; height: 6px; border-radius: 50%; background-color: #DFE1E6; transition: background-color 0.2s, transform 0.2s; } ' +
                '.wm-dot-top.active { background-color: #0052CC; transform: scale(1.2); } ' +

                '@keyframes wm-pulse { 0% { transform: scale(1); opacity: 1; } 50% { transform: scale(1.15); opacity: 0.7; } 100% { transform: scale(1); opacity: 1; } } ' +
                '.wm-loading-container { display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100%; padding: 20px 0; color: #6B778C; } ' +
                '.wm-loading-pulse { animation: wm-pulse 1.2s infinite ease-in-out; display: inline-block; margin-bottom: 12px; } ' +

                '#wm-smart-balloon::after { content: ""; position: absolute; left: 50%; transform: translateX(-50%); border-width: 8px; border-style: solid; } ' +
                '#wm-smart-balloon::before { content: ""; position: absolute; left: 50%; transform: translateX(-50%); border-width: 9px; border-style: solid; z-index: -1; } ' +
                '#wm-smart-balloon.arrow-down::after { top: 100%; border-color: #fff transparent transparent transparent; } ' +
                '#wm-smart-balloon.arrow-down::before { top: 100%; border-color: rgba(223, 225, 230, 1) transparent transparent transparent; } ' +
                '#wm-smart-balloon.arrow-up::after { bottom: 100%; border-color: transparent transparent #fff transparent; } ' +
                '#wm-smart-balloon.arrow-up::before { bottom: 100%; border-color: transparent transparent rgba(223, 225, 230, 1) transparent; }'+

                '.wm-header-right { display: flex; flex-direction: row; align-items: flex-end; margin-left: auto; gap: 8px; position: relative; } ' +
    
                '.wm-header-menu-btn { background: transparent; border: none; cursor: pointer; width: 24px; height: 24px; border-radius: 8px; display: flex; align-items: center; justify-content: center; transition: background 0.1s; } ' +
                '.wm-header-menu-btn:hover { background-color: #DFE1E6; } ' +
                
                '.wm-smart-options-menu { position: absolute; top: 100%; right: 0; width: 160px; background: white; border-radius: 8px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15); z-index: 2300; margin-top: 4px; border: 1px solid #DFE1E6;} ' +
                '.wm-menu-option { padding: 8px 16px; display: flex; align-items: center; font-size: 14px; color: #172B4D; cursor: pointer; transition: background 0.1s; } ' +
                '.wm-menu-option:hover { background-color: #F4F5F7; } ' +
                '.wm-menu-option svg { margin-right: 12px; width: 16px; height: 16px; } ' +
                '.wm-menu-footer { padding: 8px 16px; background-color: #F4F5F7; font-size: 12px; color: #6B778C; border-top: 1px solid #DFE1E6; line-height: 1.4;border-bottom-left-radius: 8px; border-bottom-right-radius: 8px; } ';
                '.wm-balloon-val { font-weight: 500; color: #172B4D; white-space: pre-wrap; word-break: break-word; flex: 1; min-width: 0; display: block; } ' +
            document.head.appendChild(styleSheet);
        }

        var balloon = document.getElementById('wm-smart-balloon');
        if (!balloon) {
            balloon = document.createElement('div');
            balloon.id = 'wm-smart-balloon';
            document.body.appendChild(balloon);
            
            balloon.addEventListener('mouseenter', function() {
                if (window.wmBalloonTimer) clearTimeout(window.wmBalloonTimer);
                if (balloonCloseTimer) {
                    clearTimeout(balloonCloseTimer);
                    balloonCloseTimer = null;
                }
            });
            
            balloon.addEventListener('mouseleave', function() {
                balloonCloseTimer = setTimeout(function() {
                    balloon.classList.remove('visible');      
                    setTimeout(function() {
                        if (!balloon.classList.contains('visible')) {
                           balloon.style.visibility = 'hidden'; 
                           navigationStack = [];
                        }
                    }, 225); 
                }, 300);
            });
        }

        var isJiraData = (contentArray[0] && (contentArray[0].type === 'ticket' || contentArray[0].type === 'jira_auth'));
        
        if (isJiraData) {
            var existingShimmers = document.querySelectorAll('.wm-highlight-shimmer');
            for (var i = 0; i < existingShimmers.length; i++) {
                var shim = existingShimmers[i];
                if (shim.textContent.trim() === searchString.trim()) {
                    
                    if (contentArray[0].type === 'ticket') {
                     
                        var cleanShim = shim.cloneNode(true);
                        
                        cleanShim.className = 'wm-highlight-shimmer-old';
                        
                        cleanShim.style.backgroundColor = 'transparent'; 
                        
                        shim.parentNode.replaceChild(cleanShim, shim);
                        
                        
                    } 
                }
            }
        }
        
        // PHASE 2: NEW HIGHLIGHTS
        var safeString = searchString.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        var regex = new RegExp('\\b(' + safeString + ')(?!\\w)', 'gi');
        
        var rootElement = getContentRoot();
        if (!rootElement) return;

        var walker = document.createTreeWalker(rootElement, NodeFilter.SHOW_TEXT, null, false);
        var nodesToChange = [];

        while (walker.nextNode()) {
            var node = walker.currentNode;
            var parentTag = node.parentNode.tagName.toLowerCase();
            
            if (['script', 'style', 'noscript', 'input', 'textarea'].indexOf(parentTag) !== -1) continue;
            if (node.parentNode.className === 'wm-highlight-shimmer') continue;
            if (wmjQuery(node.parentNode).closest('#wm-smart-balloon').length > 0) continue; 
            if (wmjQuery(node.parentNode).closest('[data-compose-id]').length > 0) {
                continue;
            }

            if (node.nodeValue && node.nodeValue.match(regex)) {
                nodesToChange.push(node);
            }
        }

        var nodesToProcess = HIGHLIGHT_ALL ? nodesToChange : nodesToChange.slice(0, 1);

        nodesToProcess.forEach(function(textNode) {
            var parts = textNode.nodeValue.split(regex);
            var wrapper = document.createElement('span');
            var hasHighlightedInThisNode = false;

            parts.forEach(function(part) {
                if (part.toLowerCase() === searchString.toLowerCase()) {
                    if (!HIGHLIGHT_ALL && hasHighlightedInThisNode) {
                         wrapper.appendChild(document.createTextNode(part));
                         return;
                    }

                    var highlight = document.createElement('span');
                    highlight.className = 'wm-highlight-shimmer';
                    highlight.textContent = part;

                    highlight.addEventListener('mouseenter', function() {
                        if (balloonCloseTimer) {
                            clearTimeout(balloonCloseTimer);
                            balloonCloseTimer = null;
                        }

                        if (!balloonOpenTimer) {
                            balloonOpenTimer = setTimeout(function() {
                                if (window.wmBalloonTimer) clearTimeout(window.wmBalloonTimer);
                                renderBalloonContent(contentArray);

                                var rect = highlight.getBoundingClientRect(); 
                                var scrollX = window.pageXOffset || document.documentElement.scrollLeft;
                                var scrollY = window.pageYOffset || document.documentElement.scrollTop;
                                var balloonHeight = balloon.offsetHeight;
                                var spaceAbove = rect.top;
                                var isFlipDown = spaceAbove < balloonHeight;
                                
                                setHovercardIframePositioning(getHovercardDiv(), balloon);

                                var leftPos = rect.left + scrollX + (rect.width / 2) - (balloon.offsetWidth / 2);
                                balloon.style.left = leftPos + 'px';

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
                                
                                window.requestAnimationFrame(function() {
                                    balloon.style.visibility = ''; // Clear inline override
                                    balloon.classList.add('visible');
                                });
                                
                                balloonOpenTimer = null;
                            }, 50); 
                        }
                    });

                    highlight.addEventListener('mouseleave', function() {
                        if (balloonOpenTimer) {
                            clearTimeout(balloonOpenTimer);
                            balloonOpenTimer = null;
                        }

                        balloonCloseTimer = setTimeout(function() {
                            balloon.classList.remove('visible');
                            
                            setTimeout(function() {
                                if (!balloon.classList.contains('visible')) {
                                    balloon.style.visibility = 'hidden';
                                    navigationStack = [];
                                }
                            }, 225); 
                        }, 300);
                    });

                    wrapper.appendChild(highlight);
                    hasHighlightedInThisNode = true;
                } else {
                    wrapper.appendChild(document.createTextNode(part));
                }
            });
            textNode.parentNode.replaceChild(wrapper, textNode);
        });
    }

    function createPaginationTop(index, totalItems, renderCallback) {
        var container = document.createElement('div');
        container.className = 'wm-pagination-top';

        // --- PREV ARROW ---
        var prevBtn = document.createElement('button');
        prevBtn.className = 'wm-nav-btn-top';
        prevBtn.disabled = (index === 0);
        
        // Use Left Chevron
        var prevIcon = createSvgIcon(ICONS.CHEVRON_LEFT);
        prevIcon.style.marginRight = '0'; 
        prevBtn.appendChild(prevIcon);

        prevBtn.onclick = function(e) {
            e.stopPropagation(); 
            var newIndex = (index - 1 + totalItems) % totalItems;
            renderCallback(newIndex);
        };

        // --- DOTS ---
        var dotsContainer = document.createElement('div');
        dotsContainer.className = 'wm-dots-container-top';
        dotsContainer.style.display = 'flex';
        dotsContainer.style.gap = '6px';
        for (var i = 0; i < totalItems; i++) {
            var dot = document.createElement('div');
            dot.className = 'wm-dot-top ' + (i === index ? 'active' : '');
            dotsContainer.appendChild(dot);
        }

        // --- NEXT ARROW ---
        var nextBtn = document.createElement('button');
        nextBtn.className = 'wm-nav-btn-top';
        nextBtn.disabled = (index === totalItems - 1);
        
        // Use Right Chevron
        var nextIcon = createSvgIcon(ICONS.CHEVRON_RIGHT);
        nextIcon.style.marginRight = '0';
        nextBtn.appendChild(nextIcon);

        nextBtn.onclick = function(e) {
            e.stopPropagation(); 
            var newIndex = (index + 1) % totalItems;
            renderCallback(newIndex);
        };

        container.appendChild(prevBtn);
        container.appendChild(dotsContainer);
        container.appendChild(nextBtn);
        return container;
    }

    function setHovercardIframePositioning(cardElement, smartBalloon) {
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
    }

    function getHovercardDiv() {
        var iframe = document.querySelector('iframe[src^="https://contacts.google.com/widget/hovercard/"]');

        if (iframe) return iframe.parentElement;
    }

    function watchGmailNativeHovercardIframes() {
        function scanAndSync(mutations) {
            mutations.forEach(function (mutation) {
                var smartBalloon = wmjQuery('#wm-smart-balloon');
                if (smartBalloon.length > 0) {
                    var isVisible = getComputedStyle(smartBalloon[0]).visibility !== 'hidden';
                    if (!isVisible) return;
                    setHovercardIframePositioning(mutation.target, smartBalloon[0]);
                }
            });
        }

        addMutationObserver(scanAndSync, getHovercardDiv, { attributes: true });
    }

    function watchNativeCards() {
        var platform = detectPlatform();
        switch (platform) {
            case 'GMAIL':
                watchGmailNativeHovercardIframes();
                break;
            case 'SLACK':
                watchSlackNativeCardInsertion();
                break;
            case 'JIRA':
                watchJiraNativeCardInsertion();
                break;
            default:
                break;
        }
    }

    function detectPlatform() {
        var href = window.location.href;
        if (href.includes('mail.google')) return 'GMAIL';
        if (href.includes('slack')) return 'SLACK';
        if (href.includes('walkme.atlassian')) return 'JIRA'
    }

    function addMutationObserver(callback, getTargetEl, observerOptions) {
        var obs = new MutationObserver(callback);
        var hovercardDiv = getTargetEl();
        if (hovercardDiv) {
            obs.observe(hovercardDiv, observerOptions);
        } else {
            var tryCount = 0;
            var interval = setInterval(function() {
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
    }

    function watchSlackNativeCardInsertion() {
        function syncDivWithBalloon(mutations) {
            mutations.forEach(function (mutation) {
                if (mutation.type === 'childList') {
                    mutation.addedNodes.forEach(function (node) {
                        if (node.nodeType === 1 && node.classList && node.classList.contains('ReactModalPortal')) {
                            var smartBalloon = wmjQuery('#wm-smart-balloon');
                            if (smartBalloon.length > 0) {
                                var isVisible = getComputedStyle(smartBalloon[0]).visibility !== 'hidden';
                                if (!isVisible) return;
                                var card = node.querySelector('.ReactModal__Content');
                                setHovercardIframePositioning(card, smartBalloon[0]);
                            }
                        }
                    });
                }
            })
        }

        addMutationObserver(syncDivWithBalloon, getMutationObserverTarget, { childList: true });
    }

    function watchJiraNativeCardInsertion() {
        function syncElWithBalloon(mutations) {
            mutations.forEach(function(mutation) {
                if (mutation.type !== 'childList') return;

                mutation.addedNodes.forEach(function(node) {
                    if (node.nodeType !== 1 || !node.classList.contains('atlaskit-portal')) return;

                    var smartBalloon = wmjQuery('#wm-smart-balloon');
                    if (!smartBalloon) return;

                    var card = node.querySelector('[data-testid="profilecard"]') || node.querySelector('[data-testid="profilecard.profilecardtrigger.loading"]');

                    if (!card) return;

                    var cardContainer = card.parentElement.parentElement;
                    cardContainer.style.opacity = '0';

                    setTimeout(function() {
                        cardContainer.style.opacity = '1';
                        if (isOverlayingElement(cardContainer, smartBalloon[0])) {
                            cardContainer.style.transform = 'none';
                            cardContainer.style.inset = 'unset';
                            setHovercardIframePositioning(cardContainer, smartBalloon[0]);
                        }

                    }, 300);
                });
            });
        }

        addMutationObserver(syncElWithBalloon, function(){return document.querySelector('.atlaskit-portal-container')}, { childList: true });
    }

    function isOverlayingElement(nativeCard, smartBalloon) {
        if (!nativeCard || !smartBalloon) return false;

        var rect1 = nativeCard.getBoundingClientRect();
        var rect2 = smartBalloon.getBoundingClientRect();

        return !(rect1.right < rect2.left ||
          rect1.left > rect2.right ||
          rect1.bottom < rect2.top ||
          rect1.top > rect2.bottom);
    }

    function getMutationObserverTarget() {
        var settings = getCustomSettings();
        var observerConfig = settings.mutationObserver;

        if (observerConfig && observerConfig.targetSelector) {
            var target = document.querySelector(observerConfig.targetSelector);
            if (target) {
                return target;
            }
        }

        return document.body;
    }

    ctor();
}

exports.V = CustomersFetcher;


/***/ }),

/***/ 327:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

var getCtx = (__webpack_require__(63)/* .getCtx */ .yK);
var logger = getCtx().get('PrelibLogger');

function log() {
	var logRecord = Array().slice.call(arguments);
	logRecord.unshift("[ CustomersFetcher ]");
	logger.write.apply(logger, logRecord);
}

exports.R = log;


/***/ }),

/***/ 730:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

var createPluginEntry = (__webpack_require__(63)/* .createPluginEntry */ .mJ);

module.exports = createPluginEntry(function(registerPlugin) {
    var CustomersFetcher = (__webpack_require__(807)/* .CustomersFetcher */ .V);

    registerPlugin(new CustomersFetcher());
});



/***/ }),

/***/ 63:
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
/******/ 	var __webpack_exports__ = __webpack_require__(136);
/******/ 	wmbundle = __webpack_exports__;
/******/ 	
/******/ })()
;
/* WalkMe Module */ return wmbundle; })
//# sourceMappingURL=bundle.js.map
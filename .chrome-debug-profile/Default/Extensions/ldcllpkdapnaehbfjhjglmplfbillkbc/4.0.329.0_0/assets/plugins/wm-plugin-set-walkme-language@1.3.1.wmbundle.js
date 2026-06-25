/* WalkMe Module */ typeof _walkmeInternals !== 'undefined' && _walkmeInternals.wmloader && _walkmeInternals.wmloader.define('wm-plugin-set-walkme-language@1.3.1@prelib', {"name":"wm-plugin-set-walkme-language","version":"1.3.1","toolbelt":"2.0.2","packageDate":"2025-07-16T08:50:51.686Z","entry":"prelib"}, function (__wmplugin__) {  
var wmbundle;
/******/ (function() { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 638:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

module.exports = __webpack_require__(192);



/***/ }),

/***/ 229:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

"use strict";
exports.__esModule = true;
exports.LanguageGetterFactory = void 0;
var detect_1 = __webpack_require__(890);
var url_1 = __webpack_require__(860);
var value_1 = __webpack_require__(844);
var html_1 = __webpack_require__(552);
var VALUE_METHOD_TYPE = ['cookie', 'var', 'jquery', 'localstorage', 'sessionstorage', 'function', 's3'];
var LanguageGetterFactory = /** @class */ (function () {
    function LanguageGetterFactory() {
    }
    LanguageGetterFactory.create = function (options) {
        var method = options.method.toLowerCase();
        if (method == 'detect') {
            return new detect_1.Detect(options);
        }
        else if (method == 'url') {
            return new url_1.Url(options);
        }
        else if (method == 'html') {
            return new html_1.Html(options);
        }
        else if (VALUE_METHOD_TYPE.indexOf(method) != -1) {
            return new value_1.Value(options);
        }
        else {
            throw 'ERROR: No chat factory found';
        }
    };
    return LanguageGetterFactory;
}());
exports.LanguageGetterFactory = LanguageGetterFactory;



/***/ }),

/***/ 890:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

"use strict";
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Detect = void 0;
var langUtils = __webpack_require__(468);
var Detect = /** @class */ (function () {
    function Detect(options) {
        this.options = options;
        this.logger = _walkmeInternals.ctx.get('PrelibLogger');
    }
    Detect.prototype.get = function () {
        var html = this.getHTML();
        var text = this.extractTextFromHTML(html);
        var lang = this.guessLanguage(text);
        return _walkmeInternals.ctx.create('Promise', function (resolve) { return resolve(lang); });
    };
    Detect.prototype.getHTML = function () {
        var _this = this;
        var output = '';
        var that = this;
        // word excel ppt home page contain a list of files that can be in both lang: #mrucontents *
        // one note side pannel can contian both languages: excluded with             #applicationWACNavigationPanel *
        // one drive has a list of files, get them off by using                       .StandaloneList-listView *
        // this.options.detect.searchTextSelector       = "body *:not(script):not(style):not():not():not()";
        // this.options.detect.excludeSelector          = "[style*=font] *, #mrucontents *, #applicationWACNavigationPanel *, .StandaloneList-listView *";
        // this.options.detect.maxStringDetectionLength = 500;
        wmjQuery(this.options.detect.searchTextSelector)
            .filter(function (index) {
            var isLeaf = wmjQuery(this).children().length === 0;
            return isLeaf;
        })
            .not(this.options.detect.excludeSelector)
            .filter(':mt_visible')
            .each(function (index, element) {
            output += _this.sanitize(wmjQuery(element).text());
            if (output.length > _this.options.detect.maxStringDetectionLength) {
                return false;
            }
        });
        this.log("Search Selector: ".concat(this.options.detect.searchTextSelector));
        this.log("Exclude Selector: ".concat(this.options.detect.excludeSelector));
        this.log("Captured string: ".concat(output));
        return output;
    };
    Detect.prototype.sanitize = function (str) {
        str = str.trim().replace(/\s{2,}/g, ' ');
        if (str.length > 0) {
            str += ' ';
        }
        return str;
    };
    Detect.prototype.extractTextFromHTML = function (s) {
        var span = document.createElement('span');
        span.innerHTML = (_walkmeInternals && _walkmeInternals.getTrustedHtml && _walkmeInternals.getTrustedHtml(s)) || s;
        return [span.textContent || span.innerText].toString().replace(/ +/g, ' ');
    };
    Detect.prototype.guessLanguage = function (s) {
        var lang;
        langUtils.guessLanguage.detect(s, function (guessedLanguage) {
            lang = guessedLanguage;
        });
        if (lang === void 0 || lang === 'und' || lang === 'unknown') {
            throw 'ERROR: Unable to guess the language';
        }
        this.log("Detected Language: ".concat(lang));
        return lang;
    };
    Detect.prototype.log = function (str) {
        this.logger.write("[ detect method ]: ".concat(str));
    };
    return Detect;
}());
exports.Detect = Detect;



/***/ }),

/***/ 552:
/***/ (function(__unused_webpack_module, exports) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

"use strict";
exports.__esModule = true;
exports.Html = void 0;
var Html = /** @class */ (function () {
    function Html(options) {
        this.options = options;
    }
    Html.prototype.get = function () {
        return _walkmeInternals.ctx.create('Promise', function (resolve, reject) {
            (function retryFn(retriesLeft) {
                if (retriesLeft < 0) {
                    reject('Cant find Language attribute on HTML tag. Aborting.');
                }
                var lang = wmjQuery('html').attr('lang');
                if (lang) {
                    resolve(lang);
                }
                else {
                    retryFn(--retriesLeft);
                }
            })(40);
        });
    };
    return Html;
}());
exports.Html = Html;



/***/ }),

/***/ 860:
/***/ (function(__unused_webpack_module, exports) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

"use strict";
exports.__esModule = true;
exports.Url = void 0;
var Url = /** @class */ (function () {
    function Url(options) {
        this.options = options;
    }
    Url.prototype.get = function () {
        var _this = this;
        return _walkmeInternals.ctx.create('Promise', function (resolve, reject) {
            if (!_this.options.key) {
                return reject("ERROR: key option must be defined");
            }
            var reg = new RegExp("[?&]".concat(_this.options.key, "=([^&#]*)"), "i");
            var value = reg.exec(window.location.href);
            if (!value) {
                return reject("ERROR: Cannot find the variable [ ".concat(_this.options.key, " ] in the url"));
            }
            resolve(value[1]);
        });
    };
    return Url;
}());
exports.Url = Url;



/***/ }),

/***/ 844:
/***/ (function(__unused_webpack_module, exports) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

"use strict";
exports.__esModule = true;
exports.Value = void 0;
var Value = /** @class */ (function () {
    function Value(options) {
        this.options = options;
        this.method = options.method.toLowerCase();
        this.retries = options.retries || 5;
        this.retryInterval = options.retryInterval;
        this.scriptAdded = false;
        this.errorMsg = '';
    }
    Value.prototype.get = function () {
        var _this_1 = this;
        return _walkmeInternals.ctx.create('Promise', function (resolve, reject) {
            if (!_this_1.options.key) {
                return reject("ERROR: Value [ key ] is not defined in the options and is mandatory for the mehtod [ value ]");
            }
            _this_1.waitForLangAttribute(resolve, reject);
        });
    };
    Value.prototype.waitForLangAttribute = function (resolve, reject) {
        var _this = this;
        var timer = _walkmeInternals.ctx.get('TimerManager').setWalkmeInterval(function () {
            --_this.retries;
            var lang;
            try {
                lang = _this.getValue();
            }
            catch (error) {
                clearInterval(timer);
                reject(error.message);
            }
            if (lang) {
                clearInterval(timer);
                resolve(lang);
            }
            else if (_this.retries == 0) {
                clearInterval(timer);
                reject(_this.method == 's3' ? "".concat(_this.errorMsg || 'Language not detected', " for user: ").concat(_this.userGuid || 'User detection error') : "ERROR: Couldn't find the variable ".concat(_this.options.key, " stored using ").concat(_this.method));
            }
        }, this.retryInterval);
    };
    Value.prototype.getValue = function () {
        var _this_1 = this;
        var ctx = (this.options.Lego && this.options.Lego.ctx) || (window._walkmeInternals && window._walkmeInternals.ctx);
        switch (this.method) {
            case 'var':
                return this.saveAndCallDetector(function () { return ctx.get('CommonUtils').getWindowVar(_this_1.options.key); });
            case 'cookie':
                return this.saveAndCallDetector(function () { return ctx.get('CookiesManager').getCookie(_this_1.options.key); });
            case 'jquery':
                return this.saveAndCallDetector(function () { return ctx.get('JQueryElementFinder').getjQueryElementText(_this_1.options.key); });
            case 'localstorage':
                return this.saveAndCallDetector(function () { return ctx.get('LocalStorageService').get().getItem(_this_1.options.key); });
            case 'sessionstorage':
                return this.saveAndCallDetector(function () { return window.sessionStorage && window.sessionStorage.getItem && window.sessionStorage.getItem(_this_1.options.key); });
            case 'function':
                try {
                    return this.saveAndCallDetector(new Function(this.options.key));
                }
                catch (error) {
                    throw new Error("in Function, ".concat(error));
                }
            case 's3':
                try {
                    if (this.scriptAdded) {
                        if (!window._walkmeInternals.deepUiLanguage) {
                            window._walkmeInternals.languageDetectorFunction && window._walkmeInternals.languageDetectorFunction();
                        }
                        return window._walkmeInternals.deepUiLanguage;
                    }
                    if (window._walkmeInternals && window._walkmeInternals.walkmeBasePath) {
                        var basePath = window._walkmeInternals.walkmeBasePath.split('.com')[0];
                        var settingsFile = window._walkmeInternals.ctx.get("SettingsFile");
                        if (settingsFile && basePath) {
                            var allUserGuids = settingsFile.getAllUserGuids();
                            if (allUserGuids && allUserGuids.length) {
                                this.userGuid = allUserGuids[0];
                                var url = "".concat(basePath, ".com/deepui/language-detector/").concat(this.userGuid, "/languageDetectionScript.js");
                                var ScriptInjector = window._walkmeInternals.ctx.get('ScriptInjector');
                                ScriptInjector.addScript(url, function () {
                                    try {
                                        window._walkmeInternals.languageDetectorFunction && window._walkmeInternals.languageDetectorFunction();
                                    }
                                    catch (error) {
                                        // We're just catching the error here, so it doesn't get thrown out.
                                        // Later there is another call to the function, and error log is printed.
                                    }
                                }, function (error) {
                                    _this_1.errorMsg = "Error loading script, url: ".concat(error.srcElement.src);
                                });
                                this.scriptAdded = true;
                                return window._walkmeInternals.deepUiLanguage;
                            }
                        }
                    }
                    return '';
                }
                catch (error) {
                    throw new Error("in S3, ".concat(error));
                }
            default:
                return '';
        }
    };
    Value.prototype.saveAndCallDetector = function (detector) {
        if (window._walkmeInternals) {
            window._walkmeInternals.languageDetectorFunction = function () {
                window._walkmeInternals.deepUiLanguage = detector();
            };
        }
        return detector();
    };
    return Value;
}());
exports.Value = Value;



/***/ }),

/***/ 964:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/* module decorator */ module = __webpack_require__.nmd(module);
/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

(function (global) {
	var models = {
		// "af":"ie  didieen ingan  envan vang te n dverer e v ge bede  vende in tele dererset oor 'n'n at eersteordaarsie waes e saan onis in e ordee basirinonde wel  isande eeide dom ke  omeri woe gr dalewat void it rd  aalik wet d ope tngsse enduit st leenster ree aiesworg vstan s na prn o meal of  vierdleee k deiteerkik e re pn ve ie neeneliwer of datelnieikes etaage virheiir regedes vur proeleionwete l moe mdaasios d he toentardnge ooeurlleienn bekelinraa niontbesrdivoons n adeldignas sa grniskom uimenop insonaeres o son gig moe kors gesnalvole hgebruiangigeoetar wysligas n w asmetgs deut vaalerwditkenssekel huewedinn t seestikan pntwt ieni kan edoealiemegronte honsigeniergewn hor  maindne ek aatn ' skide tadatskagersoon ks i afteend eelhulneewoorikd vn mre artebrlankkeronaamtrestrkanreeleit ograhetevotandenist dobrutoeolgrskuikrwyminlgeg eg onstr vgtewaawe ansesiesevoeepagel hivinnses ws tteieitpre",
		// "ar":" الالعلعرعراراق فيفي ين ية ن االمات من ي ا منالأة ااق  وااء الإ أنوالما  عللى ت اون هم اقيام ل اأن م االتلا الاان ها ال ة وا ارهالاميين وللأمنا علىن يالباد القد اذا ه ا باالدب امريلم  إن للسلاأمرريكمة ى اا ي عن هذء ار اكانقتلإسلالحوا  إلا أبالن مالسرة لإسن وهابي وير  كالة يات لاانتن أيكيالرالوة فدة الجقي وي الذالشاميانيذه عن لماهذهول اف اويبرية ل أم لم مايد  أيإرهع اعملولاإلىابين فختطلك نه ني إن دينف الذيي أي ب وأا عالختل تي قد لدي كل معاب اختار النعلام ومع س اكل لاءن بن تي معربم ب وق يقا لا مالفتطادادلمسله هذا محؤلابي ة من لهؤلكن لإرلتي أو ان عما فة أطافعب ل من عور يا  يسا تة براءعالقواقيةلعام يمي ميةنيةأي ابابغدبل رب عماغدامالملييس  بأ بع بغ ومباتبيةذلكعة قاوقييكي م مي ع عر قاا ورى ق اواتوم  هؤا بدامدي راتشعبلانلشعلقوليان هي تي ي وه يحجراجماحمددم كم لاولرهماعن قنة هي  بل به له ويا كاذااع ت متخاخابر ملمتمسلى أيستيطا لأ ليأمناستبعضة تري صداق وقولمد نتخنفسنهاهناأعمأنهائنالآالكحة د مر عربي",
		// "az":"lərin ın larda an ir də ki  biən əriarıər dirnda kirinnınəsiini ed qa tə ba olasıilərın yaanı vəndəni araınıınd busi ib aq dəniyanə rə n bsınvə irilə ninəli de mübirn sri ək  az səar bilzərbu danediindmanun ərə halanyyəiyy il ner kə b isna nunır  da həa binəsinyanərb də mə qədırli olarbaazəcanlı nla et göalıaycbayeftistn ineftləycayətəcə laildnı tinldilikn hn moyuraqya əti aradaedəmassı ınaə dələayıiyilmaməkn dti yinyunət azıft i tllin ara  cə gə ko nə oya danacəkeyiilmirllayliylubn ərilrləunuverün ə oəni he ma on paaladeyi mimalməmətparyə ətl al mi sa əladıakıandardartayii ai qi yiliillisən on qolurlastəsə tantelyarədə me rə ve yea kat başdiyentetihəsi iik la mişn nnu qarrantərxanə aə gə t düamab kdileraetmi bkilmiln rqlar srassiysontimyerə k gü so sö te xaai barctidi erigörgüngəlhbəihəikiisilinmaimaqn kn tn vonuqanqəztə xalyibyihzetzırıb ə məze br in ir pr ta to üça oalianianlaqlazibri",
		// "bg":"на  нато  пр зата  поитете а па с отза атаия  в е н даа н се кода от анипрене енио нни се  и но анеетоа вва ване па ооторанат ред неа ди п допро съли принияскитела ипо ри  е  каиракатниените зи со состче  раисто п из сае диники мин миа бавае вие полствт н въ ст тоазае оов ст ът и ниятнатра  бъ чеалне сен ести дленнисо оови об сла ратоконносровще  ре с  спватешеи вието вовестаа ка тдатентка леднетористрстъти тър теа за мад анаенои оинаитима скаслетвотерцияят  бе де паатевенви вити зи инарнововаповрезритса ята го щеалив пграе иедиелииликазкитлноменолираз ве гр им ме пъавиакоачавинво говданди до ед ериерождаитоковколлнимерначо золаон онапраравремсиястит птанха ше шенълг ба сиаробълв ргаре еелнемеикоимако коила лгао дозиоитподресриестот кт мт суст би дв дъ ма мо ни осалаансараатиацибешвъре редвемажави киалицаичекиялито бовоодиокапосродседслут итовувациачеся з во ил ск тр цеамиарибатби брабъд",
		// "ca":" dees de la  lael que el coents d qu i en er  a ls nt  pee la d enperci ar ue al  seestat  ests  s  praci unresmens edels as p reles l'na a l ca d'elsa pia ns con letata ci da ara a e noant alt ds i dita re a scoms citaonsstaica por a inprotre pauesambiondesun  mada s sa ian mb  aml de dva pretere ee ca mciaunai encitra teonaos t en el cca ciol p trparr lt ae paqunta soameerar ee sadan as q si haalstes va m icintes ls mi aor  moistectlitm s toir a tespranstrom l sst nts meno r dd'al'aatsrias t tasenrs eixtars nn ltale at part mi lltictenser aqinantra fstiol a qforuraersariintactl'e fir se ttorsi stereca r feis em n dcarbre fo vi analii pix elll mposorml li l acfers resseu e mensaraerisa ssius orttotll porora citanassn costnesraca uverontha  tiitzgrat c n a vrencatnal riquat l dot srmauali ss fn ps vte t i bactetammanl tial faic  veblea nalltzaies s'le ompr c ncrtiit rreficanyon  sar ptur",
		// "ceb":"ng sa  saangga nga ka ngan  an na ma nia sa non  pa sia ka m baonga iila mgmgaa piyaa aay ka alaingg mn sg nlan gina ni o sg pn n daag pagg syanayoo nsi  moa bg aailg bhana dasunagya manne pankon il laakaakoanabasko od yo  di ko uga ug kkanla lensurug  aiapaaw d sg dg gilenin iy sueneog ot abaahaas imo kia tagabaneronano kranronsilunausa usa gahianier ha i areryon puininakro to ure ed og wailimo n and o a ad du praroi sma n mulound taaraasaatoawadmue nedminamakmunniysanwa  tu una lbayigaikaitakinlismayos  arad aliamaersipaisamaonimt stin ak ap hiaboagpanoatag igangkagpai mihak slawor rs siytag al at ha hu ima hbu e sgmakaslagmonnahngor sra sabsamsulubauha lo readaakiayabahce d nlabpa paks ns stantawte umaura in lua cabiat awobatdaldlaeleg tg ugaygo habhini ei nkabkaplaylinnilpampaspropulta tonugaugmunt co gu mi pi tia oabuadladoaghagkao artbalcitdi dtodunentg egongugia ibaicein inuit kaa",
		// "cs":" pr poní pro nana  přch  je neže  že se do ro st v  vepřese ho sta to vy zaou  a to  byla ce e vistle podí p vle ne sje ké by em ých odovaředdy eníkonli ně str záve  ka sve pit ládohorovroztervláím  kohodnispříský mi ob soa palibudednickkteku o sal ci e til ny né odlovárotsouání bu mo o astbylde ek ost mí taes jedky lasm pnesnímranremrosého de kt ni si výat jí ký mi pretaktany vřek ch li ná pa ředa dlednei pi vly mino no vpoltravalvnííchý přej ce kd lea sa zcene kedseklemikl latlo miénovpraskuskéstitavti ty vánvé y ny sí sí vě p dn ně sp čsa na tak dnídohe be mejnenaestinim znalnouná oviovéovýrskstátí třetů udeza é pém í d ir zvaleaněaveckédene zechen erýhlai siérlovmu nebnico bo mpadpotravroprý sedsi t ptictu tě u pu vvá výšzvýčníří ům  bl br ho ja re s  z  zda vaniatoblabriečneřeh vi nie ilairsitekovnoso oo poceodyohloliovoplapočprára ritrodry sd skossdtelu svatveřvitvlay pálnčssšen al",
		// "cy":"yn dd  yn y yddethth  i aetd ych od ol edd ga gw'r au ddiad  cy gy ei o iadyr an bodwed bo ddel n y amdi edion  we ym ar rhodd ca maaeloeddaen addaer h yallei  llam eu fodfydl yn gwynd ai gmaeneuos  ned idoddoln cr hwydwyrai ar in rth fy he me yr'n diaesth chaii did r yy b dy haadai bn ioterottesy gyd  ad mr uncyndauddyedoi ci withlaelland odarydtho a  draidainddodydfyngynholio o awchwybyboych br by di fe na o' peartbyddrogall elaimr n nr arhywn ynn on r caed gd od wgangwyn dn fn onedni o'rr dud weiwrt an cw da ni pa pr wyd edaidimeudgwaiddim irilwyn bnolr orwy ch er fo ge hy i' ro sa trbobcwycyfdiodyneithelhynichll mddn rondpror cr gredrhau au cu yy cymdymryw  ac be bl co osadwae af d pefneicen eoles fergelh ghodiedir lafn hna nydodoofyrddrierosstwtwyydayng at de go id oe â 'chac achae'al bl d cd ldanddeddwdirdlaed elaelleneewngydhauhywi ai fiolionl al iliamedmonn sno oblolarefrn thiun ",
		// "da":"er en  deet derde for fo i at  atre det handeereingden me oggerter er siand afor  st ti enog ar il r sigetilke r eaf kke ma påom på ed ge endnget se sler skelsernsigne ligr dska vihar be sean ikkllegenn fstet at drin ikes ng verr bsenedemenr i he etig lanmednd rne da ine tmmeund ome ee mherle r ft fså te  soelet e koestske ble fektmarbrue ael ersretsomtteve  la ud veagee de hlsemanrugselser fi op prdt e in mr m an re saionnerrest igetn soneorbt hvisår  frbile kensindommt m hv jedanentftenin mie oe pn onte kuellnasorer hr kstastodagerikunldemerr ar vrekrert otortør få må toboechee vi divekabns oelse t v al bo unansdreirekøborsoverent bør  kaaldbetgt iskkalkomlevn dn iprir prbrsøgtel så te vaal direjefisgsåiscjerkerogsschst t kuge diag d ag iilll alskn aon samstrtetvar moartashatte bhanhavklakonn tnedr ora rrevesvil el kr ovanne uessfrag ag dintngsrdetra åraktasiem gelgymholkanmnan hnskold",
		de: 'en er  dederie  didiescheincheichdenin te ch  eiungn dnd  beveres  zueitgenund un au inchtit ten daent veand geine mir dhenng nde voe dbermenei mit stterrent d ereren sste see sht desistne aufe aiscon rte re wegesuch fü sobeie enenr sachfürierparür  haas ert an pa sa sp wifortagzu dasreihe hrentesenvor scechetzheilann apd st staeselic ab sigte waitikein engeseitrazen im laartim llen wrderecsetstrteitte nie peheersg dnicvon al pran auserfr etzetüruf ag alsar chsendge igeionls n mngsnisnt ords ssse tüahle bedeem lenn iormprorkeruns dwahwerürk meageattellesthatn bollrafs atsc es fo gr jaabeaucbene negelien ur vre ritsag amagtahrbrade erdheritele n pn vor rbert sicwieübe is übchachie fe meriiedmmenerr astit at stis koarbds gann zr fr wranse t iweiwir br npam besd ddeue ge kefoet eutfenhselten rnpdr brhet wtz  fr ih ke maameangd seilel eraerhh di dkann fn lntsochragrd spdsprtio ar en kaarkass',
		en: " ththehe ed  to iner ingng  annd  ofandto of  coat on in  a d t hee tiones  rere hat sa st haherthatioor  ''en  whe sentn ts aas foris t t beld e ars  waut ve ll al  mae i fo's an est hi mo se prs tatest tereretednt verd a wise e cectns  only toley r t caatits all nohiss oerscone oearf te wwasonssta'' stin astot h weid th  itce  diaved hcouproad ollry d se m soillctite toreveg tit  ch dehavoulty ulduse alarech me outovewitys chit aithoth ab te wos srest wtine be hncet sy te pelehins inte lile  doaidheyne s w as fr trendsai el ne su't ay houivelecn't yebutd oo ty o ho mebe cale ehadple at bu lad bs hsayt i are fghthilighintnotren is pa shayscomn sr ariny a unn com thi miby d ie de nt o bye rerioldomewheyea grar itymplounoneow r ss ftat ba vobousamtimvotaboantds ialinemanmen or poampcandere llesny ot rectesthoicaildir ndeoseouspresteeraperr oredrie bo lealiarsorerics mstr faessie istlaturi",
		es: ' dede  laos la el es  qu coe las que elue en ent en senteresconest ess d lo prlos y do ón ión unciódelo d poa dacistate adopreto para ea lra al e ese proar ia o e reidadadtrapors p a a paracia pacomno  di inienn lad ante smena con un lasnci trcioierntotivn dn eor s cencernio a sicis e madose ae cempicaivol pn cr eta tere desaez mpro as a ca suion cu juan da eneerona recro tar al anbiee per l cn pompten emistnesntao cso teseral dl mlesntro sorerá s qs ystoa aa raridese qiviliclo n aoneoraperpuer lre renunaía adacasereideminn sndoranrno ac ex go noa tabableeceectl al glidnsionsracriostruerust ha le mi mu ob pe pu soa ialeca ctoe ie uesoferficgobjo ma mplo pobis msa sepstestitadtody s ciandcescó dore meciecoesiintizal elarmienerorcrciriatictor as sice dene re tenderiespialidoinaincmito lomeplirass tsidsuptabuenuesuravo vor sa tiablaliasoastcorcticuedivducensetiimiinileco qoceortralrmarocrod',
		// "et":"st  kaon ja  va on ja kose astle es as is ud  sada ga  taajasta ku pea kestistks ta al avaid saamiste val etnud teinn se tua value kiselu ma mes miet ikulinad el imene nna ha in ke võa sa tab e sesi la lie veksemalaslesrjutletsitusupauseustvar läaliarjde etei tigailmkuili tul ei me sõaalatadusei nikpeas ks osalsõnterul või el nea jateendi kitakarkorl olt maaolistivadään ju jä kü ma po ütaasaksat ed erihoii ska la nnioidpairitus ütl aa lo to vea eadaaidamianddlae jegagi gu i pidlik inijupkalkaskeskohs es pselsseui  pi siaruedaevafili vidainglääme na ndanimoleotsriss lsiat p en mu ol põ su vä üha la pagaaleapsarve aelaikalleloomalpett kteetisvatäneõnn es fi via ia oaabaapalaaltamaanue pe tealelihaahinivakonku liklm minn toduoonpsari si stut et sti uleuurvasvee ki ni nä raaigakaallatue eeisersi eii iisil imaitskkakuhl klatmajnduni niiomaoolrsoru rvas tseksonstet mtajtamudeuhovai ag os pa re",
		// "eu":"en an etata  etizan eko ide baa egiz es giarrbidrenrriarela sku beasuesksuntas izeanekoelaik kubn an itzaubiza zan era baskeran brretentze as koa aa galdanide deeea ek katkonn dontuan du naataegiestk enikntuntzskatua de di ez hea da kak akiakoartatuazibatberitzkunn ho briartetatunezar al ar haakuatzbaidardeadeleenemaerriakiarin inakianarnazneao eorrra stetekzakzekzio da em hi ho ma oiaguateaurbesdindirdutertez eziharherhitia ienikaio ireitek bk gkidkorldan onkoo aoinorirakrearierikrratanteatu unaundunturrutez ezko au eg gu ir ki ora ha jabeagiai ailaitapearideze eeareekerdereezaezkgirgithori eianiekilainkintiraitaituk nkapkoakumlanldemaimanmenn gn una ntao hoa oropenrdiri rtastateltettiktuetziumeun uztzeazenziazin az bi bu el ga jo mu ti un za zia na oa sa ta zabaadiakealaandar audbakbalbegbehbuldaudendu duie be de he oeakeetehaelkenbeteetigabgingo gusgutguzhauibeinbineioairuiuriziizkizo",
		// "fa":"ان ای ه ا اي دربه  بردر ران بهی ااز ين می  ازده ست است اس کهکه ايرند اين هايراود  راهای خوته را رایرد ن بکرد و  کرات براد کمانی د انخواشور بان ا ساتمیری اتما اواه ات عراق ر مراقعرای ب تا توار ر ان مه بور يد ی ک ام دا کناهدهد  آن می ني گفد اگفت کشا بنی ها کشو روت کنيوه موی ی ت شوال دارمه ن که ديه  ماامهد بزاروراگزا پيآن انتت افت ه نی خاماباتما مللنامير ی می ه آم ای منانسانيت دردهسازن دنه ورد او بي سو شدادهاندبا ت بر بز ازماستهن ره سوانوز ی ری س هساباام اورتخاخابخودد ددن رهاروزرگزنتخه شه ههستيت يم  دو دي مو نو هم کااد اریانیبر بودت هح هحالرش عه لی وم ژان سلآمراح توسداددامر دره ريکزی سلاشودلاحمريننده عيمايکاپيمگر  آژ ال بو مق مل ویآژاازمازیباربرنر آز سسعهشتهماتن آن پنس ه گوسعيانيومکا کامکند خا سرآورارداقدايمايیبرگت عتن خت د ور خرک زيرفتهقدال تمينن گه آه خه کورکويويوريوييی ک تی ش اق حا حق دس شک عم يکا تا دارجبينت مت وتايدستر حر سرناز بشکالل م کمز ندانواو اورهون ونديمز آو اع فر مت نه هر وز گز",
		// "fi":"en in an on istta ja n tsa staaann p onssattatä  ka pasi  jan kllaän eenn vksiettnentaattä vaillitt jo kon s tuia  sua paa la llen mle ttena  ta veat  viutt saisesen ku nä päste ola taismaati a ooitpää pia valaineisiteltti sia kalliinkinstäuomvii ma seenä mua sestisslläloklä n jn otoivenytt liainet inan an nollplotenuställään todenmenokisuosä tääuksvat al ke tea eliitaiteiäisää  plelli tideikkki ntaovaystyt ä päyt ha pe täa naiki pi vnytnäypalteeun  mea messkaupaistuut voi eta heishtei oiikitajoumisninnutsiassävan ty yhaksimeloime n en hn loinomeottouksitstitettieukkä k ra tiajaasientigaiigitejankaakselaalanli näjoletiiusiäjä ova aantavaei erikankkulailisläimatoispelsilstytajtavttutyöyösä o ai pua ja laalarvassienimiimmitäka keskueleelinllooneri t ot ptu valvuo ei he hy my voalialoanoastattaukelielyhtiikakenkkilysminmyöohtomatusumiyksät äälös  ar eu hu naaatalkaluansarjennhankuun ysetsim",
		fr: "es  dede  leentle nt la s d laionon re  pae le d l'e p co prtions  enne quer llesur en atiue  po d'par a et it  qumenonste  ett d redes unie s l supou au à coner  noaite cse té du  du déce e eis n ds a soe re sourresssieur seemeestus surantiqus puneussl'aprotertreendrs  cee at pun  ma ru réousrisrussseansar come mirencentet l av mo teil me onttena pdanpasquis es s inistllenoupré'unaird'air n eropts  daa sas au denmaimisorioutrmesiotteux a dienn antrommortouvs csontesverère il m  sa vea raisavadi n pstiven miainencforitélaroirremrenrroréssiet atur pe tod'uellerrersideineissmesporransitst t rutivaié lési di n' éta casse tin ndeprerats mstetaitchui uroès  es fo tr'adappauxe àettitilitnalopér dra rairors rtatutéà l afancaraartbrechédree fenslemn rn tndrnneonnposs ttiqure tualeandaveclacoue nembinsjoummerierèssemstrt iuesuniuveé dée  ch do eu fa lo ne raarlattec ical al'ol'émmintaormou r urle",
		// "ha":" dada in an ya  wa yana ar a d mawa a aa ka s tawan a  ba kata a yn d ha na su sakinsa ata koa tsu  gaai  sha muwaiyama a wasayanka anishia ba ha camaba nann a muana yia g zai d kuakayi n kannke tar ciikin sko  raki ne a zmathaknine dnnaumandaa nadacikni rinunaarakumakk ce dumann yncisarakiawaci kankararin mandhi n tga owaashkamdanewansaaliami ab doancn rayai nsunuka al nea'acewcinmastakun abakowa rra  ja ƙaen r dsamtsa ruce i aabiidamutn gn jsana ƙharon i msuk ak jiyar'yakwamin 'yanebaninsruwi kn h adaken wshautu ƴabaytanƴanbinduke mn nokayinɗan faa ikkire za alaasuhani ymarranƙasaddarsgabirammau d tsabbabuagagarn b ɗaaciaikam dune si bi wkaskokwam amamfbbadinfangwai swatanoaredaiirima' laalldamikami shetumuni an ai ke kidagmaimfano nsuo dsakum  bi gw kwjamyyaa jfa uta hu'a ansaɗaddahinniyr sbatdargani tntaokiomisala lkacllawadwarammdomr mrassai loatshalkatli lokn cnartinafabubi gisamak",
		// "haw":" kana  o ka  ma a  laa ia m i la anaai ia a oa ka ho k kea ai k ho iaua  na mee ke aau ke ma maiaku akahi ha ko e a l nome ku akakanno i aho ou  aii oa po lo aamaa n ani mhani iihokoune  iho iikionahoole e h heina waea akou ikahoe i lu a pahoie ierako u mkuamakoi kaii na ehinane oli hmeawahlake mo nu likaki a wmalhi e nu ohik kue lelera berineabeainalalo  pokon abolehe paumahva elakaunak oekeioia ieram oioa ehohoviehova uaunaarao sawao onauu nwa waihel ae alae ta aik hialeilalelalieikoloonu loauae oolahonmamnan auahalaunuaohooma aoii aluimamauikeapaeloliipoeaianoa ino moka'u ahoei ekaha lu neiholinoo eemaiwaoluadanaapa u kewahualamluao hooku h liahuamuui  il mo seeialaw hu ikaile pli lunuliio kiknohu e saaawaweenahalkollan le nea'uilokapokosa  pehoploaopepe  ad puaheaolia'lailohna'oomaauerikulwe akekeklaari ikukaklimnahnernuionoa udamkumlokmuaumawalwi 'i a'iaanaloetamu oheu pulauwa nuamo",
		// "hi":"  हैमें मेने की के है  के की कोों को ा ह कासे ा के कं कया  कि सेका ी क ने औरऔर ना कि भी ी स जा परार  करी ह होही िया इस रहर कुनाता ान े स भी राे ह चु पापर चुननाव कहप्र भाराजहैंा सै कैं नी ल कीं ़ी था री ाव े ब प्क्षपा ले  देला हा ाजप था नहइस कर जपानहीभाजयोंर सहीं अम बा मा विरीकिए े प्या हीं मकारा जे ल ता दि सा हमा ना माक़्ता एक सं स्अमरक़ीताजमरीस्था थार् हुइराएक न कर मराकी जी न इर उन पहकहाते े अ तो सुति ती तो मिलिक ियो्रे अप फ़ लि लो समम कर्टहो ा चाई ानेिन ्य  उस क़ सक सैं पं हगी त कमानर नष्टस कस्ताँ ी बी म्री दो मि मु ले शां सज़ात्रथी लिएसी ़ा ़ारांगे दे म्व  ना बनंग्कांगा ग्रजा ज्यदी न मपारभा रहीरे रेसली सभाा राल ी अीकीे तेश  अं तक याई हकरनतक देशवर्ायाी भेस ्ष  गय जि थी बड यह वांतरअंतक़ गयाटी निकन्हपहलबड़मारर परनेाज़ि इी रे जे व्ट ्टी अब लग वर सीं भउन्क ककियदेखपूरफ़्यह यानरिकरियर्डलेकसकतहोंहोगा अा दा पाद ाराित ी ती पो को द ते नि सर हां दअपनजानत मथितपनीमहलर हलोगव कहनाहल हाँाज्ानािक्िस्",
		// "hr":"je  na pr pona  je zaijene  i ti da  ko neli  bi da u ma mo a nih za a sko i sa pkojproju se  goostto va  do toe ni p od rano akoka ni  ka se mo sti nimaja privatsta suatie pta tske inij trcijjennoso s izom troiliitipos ala ia oe sijainiprestrla og ovo svektnjeo podirva nialiminrija ta zatsivao tod ojera  hra ma uhrvim ke o ioviredrivte bi e ogodi dlekumizvodine uenejedji ljenogsu  a  el mi o a daluelei uizvktrlumo doriradstoa kanjavae kmennico joj oveskitvrunavor di no s  ta tvi ii okakrošskovod sa ćea badiamoenigovijuku o noraravrujsmotavtruu pve  in placibitde dišemai mikaištjerki mogniknovnu ojioliplapodst stitratrevo  sm štdane zi tio istkonlo stvu sujeustće ći što dr im liadaaftaniao arsatae temoi kinejemkovlikljimjenafnernihnjaogooizomepotranri roirtkskateru iu ovi vrt me ugak amadrže ee ge mem emeenjenter ereergeurgo i bi zjetksio uodaonaprarebremroptrižav ci eu re te uv veajuan ",
		// "hu":" a  az szaz  meen  el hoek gy tt ettsze feés  kitet beet ter kö éshogmegogysztte t azeta mneknt ségszáak  vaan ezera ta  miintköz iseszfelminnakorszer tea aa kis  cseleer mensi tekti  necsaentz ea talaerees lomltemonondrszszattezágány fo maai benel eneik jeltásáll ha le álagyaláiszy azteás  ale aegyelyforlatlt n aogaon re st ságt mán ét ült jegi k aküllamlenlásmáss kvezásoözö taa sa vaszatáetőkezletmagnemszéz mát éteölt de gy ké mo vá éra ba famiat atoattbefdtagyahati slasndtrt szot ktártésvanásáól  bé eg or pá pé vebanekeeküelőervetefogi akisládntenyenyiok omáos ránrássalt evályarágoálaégeényött táadóelhfejhethozilljárkésllomi ny ontrenresrins as esszzt  ez ka ke ko rea ha ndendó efogadgatgyehelk eketlesmánndenisozzt bt it étattosvalz ozakád ályáraésiész ak am es há ny töakaartatóaztbbeberciócsoem etietégali tiniistja kerki korkozl éljályen vni pálrorrólrüls cs ps ss vsokt jt ttartelvat",
		// "id":"an  mekanangng  pemen di ke da seeng benganya teah beraka yadandi yann ppera mita pada ataadaya ta  inalaeriia a dn kam ga at eran dter kaa pariembn mri  baaanak ra  itaraelani aliranar erulaha basiawaebagann b hainimer la miandenawan saahalamn inda waa iduag mmi n arustelyak andalh di singminnggtakamibebdengatianih padrgasanua  dea targdareluhari ki mi pikain inyitumban tntupanpensahtantu a kbaneduekag dka kerndentaorausa du maa sai antbasendi dirakamlann sulial apaereertliamemrkasi talung aka aa waniaskentgarhaai iisakedmbeskatoruanuk uka ad toasaayabagdiadunerjmasna rekritsihus  bia hamadibersg shanik kemma n lnitr brjasa  ju or si tia yagaanyas culemeemuenyepaerberlgi h mi akelli melniaopartasiatahulaun unt at bu pu taagialuambbahbiser i tibeir ja k mkarlailallu mpangknjaor pa paspemrakriksebtamtemtoptukuniwar al ga ge ir ja mu na pr su unad adiaktannapobelbulderegaekeemaempeneenjesa",
		// "is":"að um  aðir ið ur  ve í na  á  se er ogar og ver miinnnn  fyer fyr ek en ha heekk stki st ði  ba me viig riryri umg flegleins ð s ei þain kkir hr segieinga ingra sta va þeannen milsemtjóarðdi eithafillinsistlljndir ar esegun var bi el fo ge yfandaugbaubigegaelderðfirfooginittn snginumod oodsinta tt viðyfið eð f hr sé þva ea áem gi i fjarjórljam er áreirstrðarðirðustjundvegví ð vþaðþví fj ko sleikendertessfjáfurgirhúsjárn eri tarð þðarðurþes br hú kr le upa seggi sirtja kiðlenmeðmikn bnarnirnunr fr vriðrt stit vti unauppða óna al fr gra vallan da eiðeð fa frag egergiðgt hanhefhelherhrai ai ei vi þikijónjörka królíkm hn angar lramru ráðrónsvoviní bí hð hð kð mörð af fa lí rá sk sv tea ba fa ha ka uafiagnarnastberefuennerbergfi g agariðskerkkelanljólltma miðn vn ínanndanduniðnnannunu r orbergislösé t at htiltinuguvilyggá sð að bórnögnöku at fi fé ka ma no sa si ti áka ma ta ía þafaafsaldarf",
		it: ' dito la  dedi no  core ione d e le delne ti ell la unni i dper peent inonehe ta ziocheo da dna atoe s soi sllaa pli te  al cher  pa siconsta pra c seel ia si e p dae ii pontanoi callazinteon ntio s rii ao aun  anarearie ai eitamenri  ca il no poa santil in a laticiae cro annestglità  que lnta a como cra  le nealiereist ma è io lleme eraicaostprotaruna pida tat miattca mo nonparsti fa i  re suessinintoo lssittoa eamecolei ma o iza  sta aaleancanii miano ponisiotantti loi rociolionaonotra l a reriettlo nzaquestrtertta ba li teasse fenzfornnooloorirestor ci voa ial chie nliapreriauniver spimol al cransensoctic fi moa nce deiggigioitil slitll monolapacsimtituttvol ar fo ha saacce riremanntrratscotrotutva  do gi me sc tu ve via mbercanciti lieritàlliminn pnatndao eo fo uoreoroortstotentivvanartccoci cosdale vi iilainol pn cnitoleomepo riosa  ce es tra bandataderensersgi ialinaittizilanlormil',
		// "kk":"ан ен ың  қа баай ндаын  са алді арыды ып  мұ біасыда най жамұнстағанн бұна боныңін ларсын деағатан көбірер меназаындыны меандеріболдыңқазатысы тынғы  кеар зақық алаалыаныараағыгентартертырайдардде ға  қобарің қан бе қыақсгердандарлықлғаынаір іріғас таа бгі едіелейдын кн толарыніп қстқтаң б ай ол соайтдағигелерлыпн аік ақтбағкенн қны ргерғаыр  аралғасабасберге етіна ндене нигрдыры сай ау кү ни от өзаудеп ияллтын жн оосыотырыпрі ткеты ы бы жылыысыі сқар бұ да же тұ құадыайлап атаенійлан мн сндындір мтайтіны тыс інд биа жауыдепдіңекеерийынкеллдыма нанонып жп ор бриярлаудашылы аықті аі біз ілің қ ас ек жо мә ос ре сеалддалдегдейе бет жасй блаулдаметнынсарсі ті ырыытаісің аөте ат ел жү ма то шыа аалтамаарластбұлдайдықек ельесіздікөтлемль н еп ар аресса та ттетұршы ы ды қыз қыт ко не ой ор сұ түальареаттдірев егіедаекіелдергердиядкеркетлыслісмедмпин дні нінп тпекрелртарілрінсенталшілы кы мыст",
		// "ky":"ын ан  жаен да  таар ин  каары ал ба билар бо кыалан к сандагантар деандн б кеардменн таранын да мекыр чен ары  когендаркенктауу енеери шаалыат на  кө эматыдандепдынеп ненрын беканлуургытаншайыргүн  ар маагыактаныгы гызды рдаай бирболер н сндыун ча ында кагаайланаап га лгенчап крдытууыны ан өзамаатадинйт лгалоооо ри тиныз ып өрү па эка балгасыаштбизкелктетал не суакыентиндир калн дндеогоондоюнр бр мрансалстасы ураыгы аш ми сы туал артборелгениет жатйлокарн могуп ап жр эсынык юнч бу ура аак алдалубарбербоюге донегиектефтиз катлдын чн эн өндонефон сатторты удаул улаууды бы жы кыл ынаэкеясы ат до жы со чыаасайтастбаабашгаргындө е бек жыли бик ияскызлдалыкмдан жндини нинордрдостота терттитуртынуп ушуфтиыктүп өн  ай бү ич иш мо пр ре өк өта да уа эаймамдаттбекбулголдегегеейтелеенджаки киниириймактоликмакмесн ун шнттол олопарракрүүсырти тикттатөру жу сшкаы мызыылдэмеүрүөлүөтө же тү эл өна жады",
		// "la":"um us ut et is  et in qutur presttio auam em aut dientin dict e esur atiionst  utae qua dent  su siituuntrumia es ter rentiraes equiio proit peritaoneiciius cot dbuspram e noeditiaue ibu se ader  fiiliquet ide oru teali peaedcitm dt stattemtist pstite cumereium exratta conctionira s i cu saeninisnteeriomire s aminos ti uer ma uem snemt m mo po uigenictm iriss st auae dom at c geas e ie pne  cainequos p ale enturo tritusuitatuiniiqum postresura ac fua eantnesnimsuntrae as d pa uoecu om tuad cutomns q eiex icutoruid ip mee seraeruiamideips iua sdo e deiuicaim m cm utiu hocatistnaton ptiregrits tsicspe en spdiseliliqlismenmusnumpossio an grabiaccectri uan leeccetegranonse uenuis fa tratee cfilna ni puls fui at ccedami einalegnosoripecropstauiaeneiueiuisiut tt utibtit da nea dandegeequhomimulorm mmnindonero er esittumutua pbisbitcerctadomfuti signintmodndunitribrtitasund aberrersiteitim to p",
		// "lt":"as  pa kaai us os is  ne irir ti  prausinis ppasių  ta viiau ko sukaio pusi savo taialitų io jo s kstaiai bu nuiusmo  poiens stas meuvokad iš lato aisie kururi kuijočiaau metje  vaad  apand gr tikalasii pičis is vinko nės buvs a gaaipavimaspritik reetujos daentoliparantarataramagalimoiško s at be į mintin tus n jodarip rei tedžikasninteivie li secijgarlaiartlaurasno o ktą  arėjovičigapravis namenokirašs tietikaintkomtamaugavories b steimko nuspolriasauapime ne sik šii nia iciojasakstiui amelieo tpiečiu di pegriioslialins ds gta uot ja užauti sinomą ojeravdėlntio atojėl  to vyar inalico vseisu  mi pidiniš lansi tus baasaataklaomitat an jialsenajų nuoperrigs mvalytačio rai kliknetnė tistuoytięs ų sadaarido eikeisistlstma nessavsiotau kiaikaudiesoris rska geasteiget iamisamisnamomežiaabaaulikrką ntara tur madieei i tnasrinstotietuvvosų p dėareatsenėiliimakarms niar prods l o e pes ideik ja ",
		// "lv":"as  la pa nees  unun  ka vaar s p ar viis ai  noja ijaiemem tu tievielataksienkstiess arakatvtvi ja pika  irir ta  sats  kāās  tiot s n ie taarīparpie prkā  at raam inātā  izjaslai naautiešs s ap ko stiekietjauus rī tikībana  gacijs i uzjums vms var ku majā stas u tādiekaikasska ci dakurlietasa peststāšannesnies ds mval di es reno to umuvaiši  vēkumnu ries tām ad et mu s l beaudturvijviņājubasgadi nikaos a vnototistsaiku aā aāk  toiedstuti u pvēlāci šogi ko pros rtāju su vvisaunks strzina aadīda darenaicikranasstīšu  mēa necii sie iņaju lasr tumsšiebu citi ainama pusra  au se sla saisešiiecikupārs bs ksotādā in li tranaesoikrmanne u k tuan av betbūtim isklīdnavrasri s gstiīdz aiarbcindasentgali plikmā nekpatrētsi traušivei br pu skalsamaedzekaešuiegjiskamlstnākoliprepēcrottāsusiēl ēs  bi de me pāa iaidajāiktkatliclodmi ni prirādrīgsimtrāu lutouz ēc ītā ce jā sva tagaaizatuba ciedu dzidzī",
		// "mk":"на  ната атаија прто ја  заа н и а сте ите коот  де поа дво за  во од се несе  доа вка ањеа по пувација оициетоо нанини  влдекекањетќе  е а за иат влаго е нод пре го да ма ре ќеалии ди ниотнатово па ра соовепраштоње а еда датдоне ве де зе сконнитно ониотопарпристат н шта кацива вање пенила ладмакнесноспроренјат ин ме тоа га ма ракеаковорговедоенаи ииракедне ницнијостра ратредскатен ка сп јаа тадеарте ге икатласниоо сри  ба биаваатевнид ндендовдрждуве оен ереерии пи синакојнцио мо ооднпорскиспоствститвоти  об ова балнарабаре кед ентеѓуи оии меѓо дојапотразрашспрстот дци  бе гр др из стаа бидведглаекоендесеетсзаци тизаинсистки ковколку лицо зо иоваолкореориподрањрефржаровртисо торферценцит а  вр гл дп мо ни но оп ота ќабоадаасаашаба ботвааватвотги граде диндумевредуеноераес ењеже заки вилаитукоакоиланлкуложмотндунсто воа оалобров овиовнои ор ормој ретседст тертијтоафорцииѓу  ал ве вм ги ду",
		// "mn":"ын  байн байийнуул улулсан  ханийн хгаасыний лсы бой бэн ах болол н боло хэонгголгуунгоыг жил молаглламон тє хуайдны он санхий аж орл ун тулгайгдлыйг  задэсн андэулаээ агаийгvй аа й алынн з аю зєаарад ар гvйзєважиал аюуг хлгvлж сниэснюулйдллыгнхиуудхам нэ сагийлахлєлрєнєгч таилллийлэхрийэх  ер эрвлєерєийллонлєгєвлєнх хоариих ханэр єн vvлж бтэйх хэрх vн ньvндалтйлєнь тєр га суаандааилцйгул алаан нрууэй  тон срилєриааггч лээн орэгсууэрэїїл yн бу дэ ол ту шиyндашиг тиг йл харшинэг єр  их хє хїам ангин йгалсан vн еналнд хууцааэд ээрєл vйладаайналаамтгахд хдалзарл бланн дсэнуллх бхэр бv да зоvрэаадгээлэнн ин энганэ талтынхурэл  на ни онvлэаг аж ай атабарг бгадгїйй хлт н мна ороульчинэж энэээдїй їлэ би тэ энаныдийдээлаллгалд логль н ун їр бралсонтайудлэлтэргєлє vй в  гэ хvарабvрд нд ол хлс лтын гнэгогтолыоёрр трээтавтогуурхоёхэлхэээлэёр  ав ас аш ду со чи эв єраалалдамжандасувэрг удвэжvvлцалэл",
		// "no":"er en et  dedet i foril  fo meingom  ha ogter er ti stog tilne  vire  en sete or de kkeke ar ng r sene soe sderan somsteat ed r i av inmen at ko påhar sierepå ndeandelsetttteligt sdent iikkmedn srt serskat ekersenav lerr atene fr er tedeig  rehanllener bl frle  vee tlanmmenge be ik om å ellselstaver et sknteoneorer dske an ladelgenninr fr vse  poir jonmernenommsjo fl saernkomr mr orenvilalees n at f leblie ee ie vhetye  iral e oideitilitnnerant otaltattt  kaansasjge innkonlsepett dvi  utenteriolir pretrisstostrt a gaallapeg sillirakapnn oppr hrin br ope mertgerionkallsknes gj mi prange he reltenni sistjenkanlt nalrestorassdree be pmeln tnseortperregsjet pt v hv nå vaannatoe aestiseiskoilordpolra rakssetoi grak eg eleg aigeighm en fn vndrnskrert mundvarår  he no nyendeteflyg igheierindintlinn dn prnesaksiet btid al pa trag dige de kessholi dlagledn en in oprir bst  fe li ryairaked seasegi",
		// "ne":"को का मा हरु नेनेपपालेपा समले  प्प्रकारा सएको भए छ  भा्रम गररुक र भारारत का विभएकालीली ा पीहरार्ो छना रु ालक्या बाएकाने न्ता बाकोार ा भाहर्रोक्षन् ारी निा नी स डुक्रजनायो ा छेवा्ता रात्यन्दहुना कामाी न्दा सेछन्म्बरोतसेवस्तस्रेका्त  बी हुक्तत्ररत र्नर्या राकाुको एक सं सुबीबबीसलकोस्यीबीीसीेकोो स्यक छन जन बि मु स्गर्ताहन्धबारमन्मस्रुललाईा वाई ाल िका त् मा यस रुताकबन्र बरण रुपरेकष्टसम्सी ाएकुकाुक् अध अन तथ थि दे पर बैतथाता दा द्दनी बाटयक्री रीहर्मलकासमसा अा एाट िय ो पो म्न ्ने्षा पा यो हाअधिडुवत भत सथा धिकपमाबैठमुदया युकर नरतिवानसारा आा जा हुद्ुपमुलेुवाैठको ब्तर्य ्यस क् मन रहचारतियदै निरनु पर्रक्र्दसमासुराउनान ानमारणालेि बियोुन्ुरक्त््बन्रा्ष  आर जल बे या साआएकएक कर्जलसणकात रद्रधानधि नकानमानि ममारम रहेराजलस्ला वारसकाहिलहेका तारेिन्िस्े सो नो रोत ्धि्मी्रस दु पन बत बन भनंयुआरमखि ण्डतकातालदी देखनियपनिप्तबतामी म्भर सरम्लमाविशषाकसंया डा मानकालमि भित ी पी रु भुनेे गेखिेर ो भो वो ह्भ ्र  ता नम ना",
		// "nl":"en de  deet an  heer  van dvaneenhet geoor eeder enij aargente ver in meaanden weat in  da teeerndetersten v vo ziingn hvoois  optie aaedeerders beemetenkenn e ni veentijnjn meeietn wng nie ischtdatereie ijkn brdear e be amett del ondt h ale wop ren di onal andbijzij bi hi wior r dt v wae hllert anghijmenn an zrs  ome oe vendestn tpar pa pr zee ge pn pordoudraascht eegeichienaatek lenn mngent overd wer ma midaae klijmern gn oom sent bwij hoe melegemhebpenude bo jadiee eelierkle prorij er zae densindke n knd nennter hs ds et z b  co ik ko ovekehouik itilanns t gt m do le zoamse zg vit je ls maan inkerkeuit ha ka mo re st toagealsarkartbene re sertezeht ijdlemr vrtet pzegzicaakaalag alebbech e tebberzft ge ledmstn noekr it ot wteltteuurwe zit af li uiak allautdooe ieneergetegesheejaajkekeekelkomleemoen sortrecs os vtegtijvenwaawel an au bu gr pl ti'' adedage lecheeleftgergt ig ittj dpperda",
		// "nr":"okula ngaa n ngna amaa iko  ukelelo elaanga ua kukuaba kuwa enzlelho ni ngoathphaethkhaanaisange nao nthoe ntheha esinyekwetjh kwise uma a nele hlaa elanbenndl noimiundungthinziye isiutho eebehetkutandsa elofunekosebbanuluakaeliwene i ameniba we nel wekuflwai n iszi  lokwalokelwgokonalekhi li ganbon iiingka o iakhanethuulakelmth imga  lendafannoki kendsi o waphhate ualakublunikho lezia lo usisnamemi abhulkus wosekazikhoiini uasiloliniuphuhlkhuno o yakoa bi eo ki l bemal yei indeiphmelekethakunngie kengo s yoso ma mkhjhaiswlwe ezdi a we akulunyumeza anyahlkuheen siiliitjzokihl eske hlohakpheluldlelukda ekaamb sezismbihondlaakujenzin bahami a boo aaliuseilesikhanwokokhhlunyasitanikuzo oufaswaindzaknislisgabmi  em koano elhwaufua ywo  inlimtlokatwakkanthwo zithndiyokyo mitmisaboekuhabinynanezekhealolu manhe ezokupubu zogamhelwanombamknzaolahumkukdu  lakomi yobui boduokwgap kabe  ilaluatje b",
		// "nso":"go  go le a le  dia gya lo  yaa mka  kala  t o ya ta kba et wa  mo e a b se ba ma boe gt a o a lo tna o la delodi a so go keleo ang t eo bmo e te megoeo e lngwse e bkgoela wa gae kagoo m kgga ditolot he do d yeanelelwe  tlthuona tht whutanatlawanabaola megware ongt olaoe so sa yaloseta pi aenga ao etho kegwe hahloedi laao  tsakahlaalaswa we bjo ogoragahabgobletke diksa  i oba hlthedira nithbjaye no  samollwati manolee etseo woreto at ethe ykantshgonnetanokarge ho lok sw nai bdipi ooka ge omko emopelnt e amellegtlhme etephea eo no iwalokonyabolodiwegte e nta anyyeokgapolangri it uto mmitiareo fha gatothikao h itsheathaleiriphaahl teohltha rebonlha phdin pero mi omii t faaroasei lne lalogokol wot iomo bemogmoklenilelwema utanseamoa o feokgja pannagekgi iapagetlonra aem yoatltlokeltel kh poe oa wenti ebo ganhetmala fotlutiogasenkwamaeekammekgejala ringlekseplagofewagg yrolepeekoboko padilog",
		pl: 'ie nieem  ni po prdzi naże rzena łemwie w  żego  byprzowaię  do siowi pa zach egoał sięej wałym aniałeto  i  to tee p je z czybyłpanstakie jado  ch cz wiiała ppow mili enizie ta wało ać dy ak e w a  od stniarzyied ktodzcieczeia ielktóo ptórści sp wyjaktakzy  moałęproskitemłęs tre mjesmy  roedzeliiej rza nalean e sestle o si pki  coadaczne te zentny prerząy s ko o acham e no tolipodzia go kaby iegiernośrozspoychząd mnaczadzbiechomnio nostpraze ła  soa mczaiemić obiył yło mu móa tacjci e bichkanmi mieoścrowzenzyd al rea wdenedyił ko o wracśmy ma ra sz tye jiskji ka m sno o zrezwa ów łowść  obecheczezyi wja konmówne ni nownympolpotyde dl sya sakialidlaiczku oczst strszytrzwiay pza  wtchcesziecim la o msa waćy nzaczec gda zardco dare rienm nm wmiamożrawrdztantedtegwiłwtey zznazłoa rawibarcjicządoweż gdyiekje o dtałwalwszzedówięsa ba lu woalnarnba dzoe chodigiligm pmyśo conirelskustey wystz w',
		// "ps":" د اؤ  اؤنو ې دره  پهنه چې  چېپه ه دته و اونوو د اوانوونهه ک داه ادې ښې  کېان لو هم و مکښېه مى ا نو ته کښرونکې ده له به رو  همه ووى او توندا  کو کړقام تررانه پې وې پ به خوتو د دد اه تو پيا  خپ دو را مش پرارورې م دمشر شو ورار دى  اد دى مود پلي و ک مق يوؤ دخپلسرهه چور  تا دې رو سر مل کاؤ اارهبرومه ه بو تپښت با دغ قب له وا پا پښد مد هلې ماتمو ه هوي ې بې ک ده قاال اماد نقبره نپار اث بي لا لراثاد خدارريخشرامقانۍ ه ره لولويو کوم دد لو مح مر وواتواريالواندخاند تسې لى نورو لي چړي ښتوې ل جو سيام بانتارتر ثارخو دو ر کل دمونندېو نول وه ى وي دې اې تې ي حک خب نه پوا دتې جوړحکمحکوخبردانر دغه قافمحکوالومتويلى دى ميرهپر کولې ه تي خا وک يا ځاؤ قانۍبى غو ه خو بودايدوړې کال بر قد مي وي کرؤ مات اييتى تياتيرخوادغودم ديمر وقديم خمانمې نيونږ ه يو سو چوانوروونږپورړه ړو ۍ دې ن اه زي سو شي هر هغ ښااتلاق انيبريبې ت اد بد سر مرى عرالانمى نى و خوئ ورکورېون وکړى چيمهيې ښتنکه کړيې خے ش تح تو در دپ صو عر ول يؤ پۀ څوا ا",
		pt: 'de  deos as que coão o d quue  a do ent sea ds de aes  prra da  es pato  o em cono p doestnteção da rema par tearaida e adeis  um poa aa pdadno te  noaçãproal come ds a asa cer mens eaisntoresa sadoists pteme ce sia o so ao ce pstata traura di pear e eserumamosse  cao e naa edesontpor in maecto qrias csteverciadosicastr ao emdase titoizapretos nãadanãoesseveor rans ns ttur ac faa renserina sso si é braespmo nosro um a nao icolizmino nonspritenticões tra magae niliimem ancinhantaspetivam anoarcasscere oeceemoga o mragso são au os saalica emaempiciidoinhissl dla licm cmaioncpecrams q ci en foa oamecarco dereirho io om orar asenter br exa uculdeve uha mprnceocaoverios osa semtesunivenzaççõe ad al an mi mo ve à a ia qalaamoblicencolcosctoe me vedegásiasitaivandoo torer dralreas fsidtrovelvidás  ap ar ce ou pú so via factarrbilcame fe iel forlemlidlo m dmarndeo oomoortperpúbr ureiremrosrressi',
		// "pt-br":"eq ent enq eq ig eg ing  ididantete  es inadeag dadde ia ing br saestinqlinmo nq o aseq co li ni o a aa cadoasibradoriq ntao bor q nrassilstrta treus  a  ag an ca e  eq g  i  ir nc q  se veantar ciacone aeirel ig iliimoio ir ncio tro vel ap bo de fr tra ba ea ga vapoas busca cetcindese be setafrei aibuil irola liqnibntio co qos ra re reqs as ssansimtarto ult ba ci el em fi gr gu ia mu pe po re ri si su te via oa sabealcandaraargaribenboccarco do e fe ge le oem emoen es espexeficg ng sgraguaiasicaidiilaileinhl bl eleiloqmosmulnadniont ntoo go roceontoq posq vr br er ir sradranremrg riarios es pstastitigtiltraua ue va xeq '  ab ad ae al am aq ar b  bi bl bu cc ch di et ex fa ic il im is it ll m  me na ne ng nu ob ou pi qu ss st ti ub un v  x ' ca da fa ia na pa tabraciad adaadraerafealvambampan anaanganhanianoanqapaaq atiatoazib nbanbarbigbilbiqbliblubonbrebribsebucc fc icadcafcagcalcancc ",
		// "pt-pt":"equentquequiguiuen linguqu uid co vede gueidanteo aa aadedadel ingmo nquntasequ nvel de o  sea cadoar estia inqio iqulino co portporta te  ag eq nc pi po saa da eantas ca ciadesdo gu imol pnciro rtustrtugu suesui  a  an ap ba bi ca fr gu in pe quaguapacondore fe geirfreho i aicaiguiroliqntio bo lo sor r ora reqs csimtarto ue uinult ci en ho mu ni re s  si sua sa vabeag al andanhapoatabanbenbicboicapcarcinco comctodeie be oe secaen er es exeficforgalgraiasichicoidiiliir iraisbla lismbomulna nhoniont o qo ro toc oioomboo os parpe r br er sranre recs as ssansboso statantratreu vugauguxeq ab ad al am aq ar au b  bo c  ch ct cu el es ex fa fi ga gr id ir ne ng nu ob oo pa ps pt r  ra ri ss st ta te tr ub un vi voa fa ia la ma oa rachaciactad afaageagralfalham ambamianaanganqaquaraarbarcargariarrasaatiautazib nbarbatberbigbilbiqbliboaboeborbsec ic lc pcadcamcasch chachechiciococcoicouctrcuecul",
		// "ro":" de înde  a ul  coîn re e dea  di prle şi areat conui  şii dii  cue aluiernte cu  laa ccă dine cor ulune terla să tattre ac săestst tă  ca ma pecuristmâna di cnat cei aia in scu miatoaţiie  re sea aintntrtruuriă a fo paateinitulentminpreproa pe pe sei nă parrnarultor in ro tr unal aleartce e ee îfositanteomâostromru strver ex naa flornisrearit al eu noacecerilenalpriri stasteţie au da ju poar au eleereeriinan an cresse t atea că do fia satăcome şeurguvi siceilina recreprilrnertiurouveă p ar o  su videcdreoaronspe rii ad gea ma rainalicarcatecueneeptextiloiu n porisecu puneă cştiţia ch guai aniceae fiscl alicliumarnicnt nulrist ct ptictidu aucr as dr fa nu pu tocradisenţescgenit ivil dn dnd nu ondpenralrivrtestit dta to unixteândînsă s bl st uca ba ia lairastblabricheducdule measediespi li picaicăir iunjudlailulmaimenni pusputra rairopsilti trau sua udeursân întţă  lu mo s  sa sca uan atu",
		ru: ' на прто  нели  поно  в на ть не  и  коом про тоих  каатьото заие ователтор деой сти отах ми стр бе во раая ватей ет же ичеия ов сто обверго и ви пи сии исто восттра теелиерекотльнникнтио срорствчес бо ве да ин но с  со сп ст чталиамивиддете нельескестзали ниваконогоодножнольорировскося терчто мо са этантвсеерреслидеинаиноироитека ко колкомла нияо толоранредсь тивтичых  ви вс го ма слакоаниастбезделе де пем жнои дикаказкакки носо нопаприрроскити товые  вы до ме ни од ро св чиа наетазаатебесв пва е ве ме сез ениза знаиникамкахктоловмерможналницны нымораороот порравресрисросскат нтомчитшко бы о  тр уж чу шка ба ва рабиалаалоальаннатибинвесвново вшидалдатдное зегоелееннентетеи оилиисьит ициковленлькменмы нетни нныногнойномо побновеовнорыперпо прапреразропры се слисовтретсяуроцелчноь вькоьноэтоют я н ан ес же из кт ми мы пе се цеа ма па тавшажеак ал алеанеачиаютбнаболбы в ив сванградаждене к'
		// "sk":" pr po ne a ch  na jení je  dona ova v to ho ou  toickterže  st zaostých sepro tee s žea p ktpre by o se kon přa sné ně stiakoistmu ameentky la pod ve obom vat kostaem le a vby e pko eriktesa éhoe vmertel ak sv záhlalaslo  taa nej li ne  saak aniateia sou soeníie  rece e noritic vya tké noso sstrti uje splovo poliová náaledene oku val am ro siniepoltra alalio vtor mo nici o ním  le pa s al atierooverovváních ja z ckée z odbylde dobneppraricspotak vša ae tlitme nejno nýco ta je aen estjí mi slostáu vfornoupospřesi tom vla zly ormrisza zák k at ckýdnodosdy jakkovny resrorstovan opda do e jhodlenný o zpozpriranu s abaj astit ktoo oobyodou pva áníí pým  in miať dovka nskáln an bu sl tre mechedni nkýcnícov příí a aj boa dideo ao dochpovsvoé s kd vo výbudichil ilini nímod oslouhravrozst stvtu u avály sí sí v hl li mea me bh si pi sitiládnemnovopouhlenoensmennesobote vedvláy n ma mu vábezbyvcho",
		// "sl":"je  pr po je v  za napreda  daki ti ja ne  inin li no na ni  bijo  nenjee pi pprio pred doanjem ih  bo ki iz se soal  dee vi sko biliraove br obe bi novase za la  jaatiso ter taa sdele d dr oda nar jalji rit ka ko paa banie ser ililovo vtov ir ni voa jbi briitileto ntanše  le teenieriitakatporproalike oliov prari uarve  toa ia vakoarjatedi do ga le lo mero sodaoropod ma mo sia pbode negaju ka ljeravta a oe te zi di vilalitnihodostito varvedvol la no vsa daguajadejdnjedagovguajagjemkonku nijomoočipovrakrjastateva taj ed ejaentev i ii oijoistostskestr ra s  tr šearnbo drži jiloizvjenljansko do iom oraovorazržatakva venžav me čeameavie ie oekagrei tijail itekraljumorniko tobiodnranre stostvudiv ivan am sp st tu ve žeajoaleapodaldrue jednejoeloestetjevaijiik im itvmobnapnekpolposratskitičtomtontratudtvev bvilvsečit av gra zansastavtdane medsfori zkotmi nimo bo ood odloizot parpotrjeroitemval",
		// "so":"ka ay da  ayaaloo aan kaan in  inadamaaaba soalibadaddsoo naahaku ta  wayo a somayaa ba ku la ooiyashaa addanabnta da mankauu y iayaha raa dh qaa kalabaadoohadliyoom ha sha da ia naaree ey y kya  ee iyaa aaqgaalam bua ba mad agaamaiyola a ca leenintshewaxyee si uua haasalkdhagu heeii iramado ao kqay ah ca wuankashaxaeeden ga haan an snaanayo dtaau buxuwuxxuu ci do ho taa ga uanaayodhiiinlaglinlkao isanu sunauun ga xa xuaababtaq aqaaraarlcaacireegeelisakallahneyqaarlasadsiiu dwad ad ar di jo ra sa u  yia ja qaadaataayah aleamkarias ayebusdalddudiidu duued egegeyhayhiiidainejoolaalaymarmeen bn dn mno o bo loogoonrgash sidu qunkushxa y d bi gu is ke lo me mu qo uga ea oa wadiadoagual antarkasaawibtabuld adagdando e sgalgayguuh ehaligaihiiriiyekenladlidlshmagmunn hn ina o no woodoororaqabqorrabritrtas osabskato u au hu uud uguulsuudwaaxusy by qy syadyayyih aa bo br go ji mi of ti um wi xoa x",
		// "sq":"të  tënë për pë e sht në shse et ë së t sehe jë ër dhe paë në p që dhnjëë m njëshin  meqë  poe ne tishmë së me htë ka sie ke p i anëar  nuundve  ëse s mënukparuaruk jo rë ta ë fen it minhetn eri shqë d do ndsh ën atëhqiistë q gj ng tha ndo endimindir tratë bëri muartashqip koe medherije ka ngasi te ë kësi ma tievehjeiramunon po re  prim lito tur ë eë vët  ku sëe des ga itijetndëolishitje bë z gjekanshkëndës  de kj ru viaragovkjoor r prtorugtetugoaliarrat d tht i pipëizijnën noheshushët etika earëetëhumnd ndroshovarimtosva  fa fia sheni nmarndoporrissa sistësumëvizzit di mbaj anaatadëre aeshimejeslarn sntepolr nranresrrëtarë aë i at jo kë rea kai akthë hëni ii mia mennisshmstrt kt nt së gërkëve ai ci ed ja kr qe ta vea pcilel erëgjihtei tjenjitk dmënn tnyroripasra rierëstoruajyreëm ëny ar du ga jedëse ee zha hmeikainiiteithkohkraku limlisqënrëns st dt ttirtënverë j ba in tr zga aa ma tabr",
		// "sr":" на је поје  и  не прга  свог а сих на којога у а пне ни ти  даом  ве сри сско оба нда е нно ного јој  зава е си пма никоброва коа идије пка ко когостсвествститраедиимапокпраразте  бо ви саавобрагосе иелиениза икиио преравраду сју ња  би до стастбојебои ним ку ланнебовоогоослојшпедстрчас го кр мо чла ма оакоачавелветвогедаиститиијеокослосрбчла бе ос от ре сеа ван богбровенграе оикаијакихкомли ну отаојнподрбсредројса снитачтваја ји  ка ов тра јавиаз анобиовикво говдние чегои оиваивоик инеиниипекипликло нашносо тод одионаојипочпрора рисродрстсе спостатићу ду ну очинша једјниће  м  ме ни он па сл теа уаваавеавнанаао атиациајуањабскворвосвскдине уеднезиекаеноетоењаживи ги ии ки тикуичкки крсла лавлитме меннацо но по уоднолиорносноспочепскречрпссвоскисласрпсу та тавтвеу бјезћи  ен жи им му од су та хр ча шт њеа да за ка тадуалоаниасованвачвањведви вновотвојву добдрудседу е бе де мем емаентенц",
		// "ss":" ku lela ekua knga nga nngea llo  neetikwendze no l loelaemaentsi  kwtsii lwa lelkute kundni elofunesi sieletintfo tile khatsee lphaungi k emti sa  umisaelindlingsetwe isena angetfkheando n wentinyetfubena eutsletdzaimisekko lokeniye ba nkhebealoo klanga abaseb yehe lwakel te lakuswematiikhnekalakufi nokuatsmtshlawena t nagekuhlkubnguka akafutkankwa likuconkbananaulu se imakhumea ilestimulainilweza fo hul nohanli ipha stiskhuta dzibe emima endo tekea u kaanelekmelelwkunsislonutfanykhokulhlo baufuaphlune shalindiswo suseekwme ndvenguphhatne so lulnomte lolawunellu ha watmenete lwnemakozinkuhshabhagab inalemisteme eo ee twekdzeomewel luembnis ektsau lo ydleutelenswaphemkhntfukesitinye iwo aniphiwetsinnhlmalmbamfufu labsiktawno hlee uekiasealiulwve ekazelntabontekbo sigamaileuletfwmphumakupemtasidluishumtgeno wikeigahakabenetgankisndengiukhbekmo phuselelui tantdvoa yvo humlisdlagamivejenket",
		// "st":"ng ho  lele  ho tsa msa la  kaa h diya ka  yaa tengets ba moa l selo  bowa tsaa bna ba  e  a a k maangtsese o ta da sha so o le ho ye ttlatsholoe le mo bo esebebeelathuelee kanae b th hatsoo ao k wakgotswthoo hong lahutditane mea e tlolaedielodi ona kewan o a papatjhhlo sasheletabaloklaoeo a ao smanto  hla nisae dswesetpa  nao mg lhet kggotahaethre e ejhaphelanotlg klekitsekgsenao disg mothe aithhlae ske molpelg hhabbetsanatsmo lwawe alalenntsdipkapiso mmutoaloe nsi ta o wemoswatsiokebedthe pha ywenkenenahwane oreatlanohelmotbo g ti bkgahorngonanno o ntlhshwkelphaetjbonellg sgolthaaledikkolbak ntikao d teohlg y loti hisileg boko ethana omatohoodilelmeldinkaro ouo monhahte me  ito fnenhebingbolbelhlepuolaltlohalophebahatheoarobatko banleho ioletle fekgepanakeg eakaeko perike ymmeamalhaeha faebomohmaeeteaemotsahio putaokgntlpalgeti le fokaseplatahlboteselahlonakga f puaseg amorkannahbohe p",
		// "sv":"en  deet er tt om förar de att föing in at i detch an gen ant ssomte  octer halleoch sk sora r a mevarndeär  koon ansintn sna  en fr på st vaandntepå skata  viderällörs omda krika nst hoas stär dt fupp benger staltälör  avgerillng e sektadeeraersharll lldrinrnasäkundinnligns  ma pr upageav ivaktildaornsonts ttaäkr sj tiavtberelsetakolmenn dt kvtaår jukmann fninr irsäsjusso ära sachag bacdenettftehornbaollrnbstetil ef sia ae hed eftga ig it lermedn ind så tiv bl et fi säat dese agargetlanlssostr br ere retstat i ge he rea fallbosetslekletnernnanner frits ssenstotorvavygg ka så tr utad al aree ogonkomn an hngar hrent dtagtartreätt få hä sea da ia paleannarabyggt hanigtkanla n onomnskommr kr pr vs fs kt at pver bo br ku nåa ba edelenses finigem sn pnågor r orbers rt s as nskrt otentioven al ja p  r  saa hbetckedrae fe iedaenoeräessionjagm fne nnspror trarrivrätt et tustvadöre ar by kr miarb",
		// "sw":" wawa a ka m ku yaa wya ni  maka a una za ia  naikama alia n amilikwa kwini haameanai n zaa hemai mi ykuwla o wa yatasem laatichii wuwaakili ekaira nca sikikatnch ka kia bajiambra ri rikadamatmbamesyo zi da hi i kja kuttekwan bia aakaao asichaeseezake mojoja hia zendha ji mu shiwat bwakearabw i himbtikwakwal hu mi mk ni ra uma lateeshinaishkimo k ira ialaaniaq azihini aidiimaitarairaqsha ms seaframaanoea elefrigo i iifaiwaiyokuslialiomajmkuno tanuliutawen ala jaadaidariawaba fa ndengenyao yu wua umowazye  ut via da taifdi ereingkinndao noa taitoausautowasyakzo  ji mwa paiaamuangbikbo dele weneengichiriitiitoki kirko kuumarmbomilngingoo longsi ta taku yumuusiuu wam af ba li si zia vamiatuawierifanfurgeri zisiizoleambimwanyeo ho monirezsaasersintattistu uinukiur wi yar da en mp ny ta ul wea ca faisapoayobardhie aekeenyeonhaihanhiyhuri simwkalkwelaklammakmsane nguru salswate ti ukuumaunauru",
		// "tl":"ng ang na saan nansa na  ma caay n g anong gaat  paala sia nga g ng mitog cmansang singto ilaina di taagaiyaacag t atayaamalana aquia ca snag bag itan't  cuauag p nios 'y a m n la  lao nyan ayusacayon ya  ital apaatat nuanahaasapag gug ldi magabag aaraa pin anait si cusg buina tas n nhin hia'tali buganumaa dagcaqug d tuaonaricasi nniypina igcasiya'yyaoag ca hanilipansinualn snam lucanditguiy ngalhatnal isbagfra fr sua l coani bi daaloisaitamayo ssiluna in pil nnilo apatsact s uaaguailbindalg hndioonua  haindrans ntinuloengg finilahlo rairintong uinulono'yt a ara bad baycalgyailematn apaura tayy mantbani mnasnayno sti tiagsg gta uituno ib yaa uabiaticapig is la' do puapiayogosgullaltagtiltuny cy syonanoburibaisilamnacnatni ntood pa rgourg m adrastcaggaygsii pinolenlinm gmarnahto' dea hcatcauconiqulacmabminog parsal zaao dooipinodnteuhaula reilllitmacnito'tor orasumy p al mi umacoadaagdcab",
		// "tlh":"tlhe' gh i'  'eu'  viatla'  ghej  ho ch mu tlngameywi'be'an ch ganchulh ing'e'hinjatlhi da jao' ughaq cha poey  'a je'ej pang ad  qaoh eh ah ghaje  luholaw' jiongpu'aj vadw' ' jha'is tah' 'angh 'ponam lawmo'qu'hbeol vamaghmu'ahvbejoghuch' vachhug lo quchohvaij  lalu'vis ne pu so ta va'acdi'hu'lahmoh 'o' mdaqhahn hnehu'may'ghoh vmehoy  ma nu'meel  ba be de ng' th dhvioq  wa' l'wihmeli'uq  bobogdelh ph tichvil qe wiahbbanenghaqhohov viq ha ti' n' p'a'hwiighlo'y'  du no yu'mo'vadajdaseghhommucom otlus  bi tu' hchmh qhovnisqaruj ' q'chh mhmojihparwij hu' d'a etlh gh jh llodmaqochwa'yuq di le pe ya'dicheechih ijain j 'j mlhwpa' 'i mi qi ro ru'beanpghighuh bhayhchiq npuod paqqayrdasoh do me qo sa' c' g' s'luamlardas d pgmeh nhtai'vj jjijlenngmqanqmevajwiv mo ni'la'pu'quar armdwig pghdh chamhlahquiloiqaiqij pj tj vladlhomarmugpusq sq trghrmasovta'tintu'u'dvetyliyu' to'ohaqqartat aylaytet hajhar",
		// "tn":" di lego le  gong  tsya  yasa tlh mo boa mlo tsa e o ta bwa  kaa ka tka a gengoloo yla  a a detsmo se  tl batsh maba a ltseso na elo seelee do llhoe tdi e g kgditkgoo kanglhae me ewe aneo me ke longsetwanelatsotlao de bolangwgweo babaatla p o a ao aotla so edirthuga  gashwotsakahabhwaagao ggantswanamol kehut meonalelitslaokgadikgot falet waoseno t hsweediatsa ne sokoothkwakar tha ealatiro ndipisagatti anobot nn halenaloanyaroitiirio ssennetke ho maiikaekato ithre g mhatbo g let emoamaisorolfa iwakanshesi ao g kwenlolo obositla ythelwae n laore mmko thae aeo lhebolha  poisii blan nai talene gonrisirabon sag yg gphaogamelro golo w kwi l titlologpor jaa f nehoklot pue yutog thomokg koo famegorta  pents khthogeladiareeteasemonheooroomonennelilenngntlaboogoaranseegoheluo mogsanularagkolte etlbat tepuoamoofelatatiolerabtsiiromanaelegalwera dintlesekingyo a o reaotusoo rerejwaaemlamlek jwgwamok",
		// "tr":"laren leran in  bi yaeride  kair arı ba de haın arabir ve sailele ndeda  buanainiınıer ve  yılmayıl olar n bndaayali ası geindn kesilannlaak anıenini nı rınsan ko yemazbaşilirinalıaz halınd da güeleılmığıekigüni biçidenkarsi  ile yna yorek n s içbu e bim ki lenri sın soün  taniniğitanyan sinatnınkanrı çinğı elin aır  aninen yola aral e slikn dsin al düanlne ya ım ına beadaalaamailmor sı yen meatıdi etikenla lı oru gö inande dmenun önea dat e ae gyar kuayıdanediiriünüği ılıemeeğii ki yıla çaa yalkdı edeel ndıra üne südıre kereik imiişimasn hsüryle ad fi gi sea karlaşıiyoklalığnemneyrmestetı unlver sı te toa saşkeklendkalliğmintıruluunuyapye ı işkaştı bü ke kiardartaşan inditi topı b va önakicakey filisiklekurmanncenlenunrakık  en yoa glismakn gtiryas iş yöalebilbulet i diyekilma n en tnu olurlate yönçık ay mü ço çıa aa batadergeli gi iillistldılu mekmlen çonuoplranratrdırkesiysonta tçıtın",
		// "ts":" kuku na ka wa a n swa mya a k tiswihi la  ya le hia ta v vani  nandz maa h xia si nelei kanaa lngalo va le akaelairheka vuiwaa x kayi  waisasa ko ta ga wu wi tir ek mi nio yeloawuisiswai thlaa e ta ng laa yri eri rirhiekeumbu tndl yilani veswmbei la re kanglesulati yono wonalawxa nelyo leliko loamb a i y xaanewani sondfanendi ho lu kmbin'wke dyo falamnhlo songno  kou n haho okou hi mo n yonguo ku yatiu lvanuluandmbakumu vwo be ha riwdzasi  eno h hlo teyi ntilalokdzinge mualato a w byarhakutsawakrho'wa ndminlavtimleytikdletinmatlerletselhismellu ikaa angoengo x nkamusiwanienima  nhmi swoetitanmo hamiwe khhanlekntiunghakdzoete tsavahu fumkarvul wukulundi xnhuyisxikbisxi e yra hle huwekanoyena dsisolopfui wnyie nso ki funisotshkonnkuheli be hariimii eindvumntsimekommfuise mfhindlavutgani rbanbyamilintats dyu se xilekelkwa noi fasiza urio mrhae lin'etavoni akho woiki rau eo ezo yininkanyket",
		// "uk":" на занняня на  прогого ськ по у відере мі неих ть пер віів  пе щольнми ні не ти атиеннміспрауваникпроравівн табудвлірів ко ріально омущо  виму ревся інн до упавланнкомли лінногупр бу з  роза и нновороостстаті ють мо ні якборва ваненьи пнь овіронстіта у вькоіст в  редо е пзабий нсьо во пприі п ку пі спа пабоансаціватвнии вимика неннічонаої повькиьноізнічн ав ма ор су чи іна зам ає вневтодоментжитзниим итлла нихницоваовиом портьсу рьсяідоільісь ва ді жи че і а ва наливезвноевеезезеництки кихконку ласля можначнимноїо бовуодиою ро роксноспотактвату у пцтвьния зі мії  вс гр де но па се ук їха оавтастаютварденди ду знаи зикоисяитикогменномну о но собуовопларанривробскатантимтисто траудочинчниі вію  а  во да кв ме об ск ти фі є а ра са уак аніартаснв увиквіздовдподівевіенсже и ми сикаичнкі ківміжнанносо уоблоднок олоотрренримрозсь сі тлатіву зугоудічи ше я ня уідпій інаія  ка ни ос си то тр уг",
		// "ur":"یں  کیکے  کےنے  کہے ککی میں میہے وں کہ  ہےان ہیںور  کویا  ان نےسے  سے کرستا اواورتانر کی ک اسے ا پا ہو پررف  کاا کی ا ہیدر کو  ایں ک مش ملات صدراکسشرفمشرپاککستی م دی صد یہا ہن کوالیہ ے و بھ دواس ر انہیکا ے سئی ہ ایت ے ہت ک سالے ہا ے ب واار نی کہای ہے م سی لیانہانیر مر پریتن مھا یر  جا جنئے پر ں نہ کی وے د تو تھ گیایکل کنا کر ں میک  باا تدی ن سکیایوںے جال تو ں اے پ چاام بھیتی تے دوسس کملکن اہوریے  مو وکائیارتالےبھاردیری وہ ویزں دھی ی س رہ من نہ ور وہ ہنا ااستت ات پد کز مند وردوکلگی گیاہ پیز ے ت اع اپ جس جم جو سراپناکثتھاثریدیار درت رویسی ملاندووستپروچاہکثرکلاہ ہہندہو ے ل اک دا سن وز پیا چاء اتھاقااہ تھ دو ر بروارے ساتف کقاتلا لاءم مم کمن نوںو اکرنں ہھارہوئہی یش  ام لا مس پو پہانےت مت ہج کدونزیرس سش کف نل ہلاقلی وریوزیونوکھنگا ں سں گھنےھے ہ بہ جہر ی آی پ حا وف گاا جا گاد ادیاعظاہتجس جمہجو ر سر ہرنےس مسا سندسنگظم عظمل ملیےمل موہمہونگھو صورٹوہنکن گھ گے ں جں وں یہ دہن ہوںے حے گے ی اگ بع رو شا",
		// "uz":"ан ганларга нг ингнинда ни идаариигаиниар ди  биани боданлга ҳа ва саги илан би б кў таир  маагаалабирри тгаланлика кагиатита адидагрга йи ми па бў қа қиа биллли асии тик илиллаардвчива иб ирилигнгаран ке ўза сахтбўлигикўррдарниса  бе бу да жаа тазиерии аилгйилманпахридти увчхта не со учайтллитла ай фр эт ҳоа қалиаробербилборимиистон ринтертилун фрақил ба олансефтзиркатмилнефсагчи ўра на те эна эам арнат иш ма нларличилшга иш му ўқаравази уиқ моқримучучунши энгқувҳам сў шибарбекдами ҳишиладолиоллориоқдр бра рлаунифт ўлгўқу де ка қўа ўабаамматлб кбошзбеи вим ин ишллаблейминн дндаоқ р мрилсидталтантидтонўзб ам киа ҳангандартаётдиренти ди ми ои эиройтинсуодиор си тиштобэтиқарқда бл ге до ду но пр ра фо қоа ма оайдалоамаблег ндолейрек ергжарзиди ки фий илолдилиблинми мман вн кн ўн ҳозиораосирасришркароқстотинхатшир ав рў ту ўта павтадаазаанлб ббойбу втог эгиндардендунидеионирлишгйхакелкўплио",
		// "ve":"ha  vha mna  u a ntshwa a u nangavha ts dz khdzaa vya  yaa tho la  zw muedzvhuga shiza a k ngkha mahumne  ndo nlo dzishu haa do yndaelezwiahoangno  a elaa zhu shai n waanahi kano danoa hzwa th migana lsa handi u tandndiyo thedo ri vhoni ka urisi o tmbeo wanewe zo i te ni hsheusho kzi da a athu laa pzan i a slwaulai daka domisheditali  huiwa lui vhe  kaeloso ambavh sho vi klelu vdzou s fhmo nweo lumiwahisihela iveladztani maththiwi  urhatinele vheanya yhonisaalao aaluudiumb bvash te lilusnyahasledswahuso iumoonendetha itkhongomushake yea ivho mu nhinthomutayofhi satelhulhunuloithma  yolane v phgo i ao uhud pfukazhiuvhdzwingelwilawo mbou diteiswasie kndufheo hmelu bikabo guddzhkonifh tae duth hoi zwanulumadinwothanidiswitou bveetsu iadie mfhanahdalwin sisho inyamlayekaa fi uendi yaloi lusomulta delu k mbpha didadalio spfukhwe a ko nehenmasumeiniishudziraoniluknelisombadzuhomi szwonguaraunz",
		// "vi":"ng  th chg t nhông kh trnh  côcôn tyty i tn t ngại  tich y lền  đưhi  gởgởiiềntiềởi  gi le vichoho khá vàhác pham hànáchôi i nượcợc  tôchúiệttôiên úngệt  cóc tcó húnviệđượ nag ci cn cn nt nvà n ln đàngác ất h lnamân ăm  hà là nă qu tạg mnămtạiới  lẹay e gh hi vi đle lẹ ều ời hânnhit t củ mộ về đian củalà mộtvề ànhết ột ủa  bi cáa canhcách ciềum tện  ho's avee'sel g nle'n vo cravs tthitravelận ến  ba cu sa đó đếc cchuhiềhuykhinhânhưongronthuthưtroy cày đếnườiườnề vờng vớcuộg điếtiệnngào tu cuộcvớià cài ơngươnải ộc ức  an lậ ra sẽ số tổa kbiếc nc đchứg vgiagàyhánhônhư hứci gi hi ki piênkhôlậpn kra rênsẽ t cthàtrêtổ u ny tìnhấy ập ổ c má đểai c sgườh vhoahoạinhm nmáyn gngưnhậo noa oànp csố t đy vào áy ăn đó để ướcần ển ớc  bá cơ cả cầ họ kỳ li mạ sở tặ vé vụ đạa đbaycơ g shanhươi skỳ m cn mn po boạiquasở thathátặnvàové vụ y bàn ángơ sầu ật ặngọc ở tững du lu ta to từ ở a vao c vcả du g lgiả",
		// "xh":"la  kulo ngaa k ngoku kw uka nukuye a iyo elaelea unyewe wa amae niseababa ho enzo nngokubngeathfuno elelungubako eloezio kthekwana kweange ile ka esio y nae kethpha inkunnziandni ban ye nolwalun okanyzi li  neulua eeligoko lebeundisasebndo ezthoo ido beningkwindlunyalaa aeyoe ukan abthii ki no uo zelwsa sekayoheto oeka umhi bo so isiwenlweapha lya ekoana yokufiniimialiha awuwanentuththaza ulakho iianee aisouph leilezinnts siengnokonghlazwe elokaekilisazi lotsh amufuantiswo anguo s bainteniunewulhulseli euselanke nisemi li isiph ima oakamfu ziinkmalleymannyanekakhume koalotu i untuizwkelizii isi ganaseindi andinelalusisubokutmthkuslekmisnde zo weaniga ikosizno phue ehonondne ithkulgamgenpho izphehatkhuiinhanzo lu ulondaqo zikhelo m lwzisdleuhlmenolomeldelnzaokookwolukuknteswalawenk yai ygaqshaaqoe likhnkqule kaonkthuwo bonkupquba ykqudla eshe anolumbe iga zeo wakumgankete  olze kumemfesh",
		// "zu":"okula nga nga n kua kthi ukezie nukule lo hi wa  noa uelawe a ini elezinuthamaelophaingabaathandenzethesima lel um katheungngengothonyekweeniiziye  kwndlho a ena zi hetkane ue iundiseisindakhaba i knomfun ez izke beno eisazwekelka akanzio ne komakwa neanyanghlai umthkubo kanaaneikhebekutha  isaziulusebalaonkbani eazwwen abhana ai nimilanhatlwa nainiakhli ngunkenokumeekeelwyo aphkus es okiph immeli i lo in amkhoza gokseklunkunlweshasikkufhaka ythusa o ukhuayohule aalienglu ne  koeliubadlee eith yoa lnelmis sikula osislokgeno zi aemiumaekaalomaniswthao ilonso uphuhlntuzimmalindwez bao o yi weulapheo yileo lwo welga tu hleokwfan lekazaseanindebo ngiule emmeninyambmbiganifuo santhelikaonai lfut fuze u anhlnin zoendsigu kgabufaishushkuzno gamkuh yenyanezzisdlukatdlatsh seikekuqgu osiswalul ziimae lkupmo nzaasiko kumleksheumtunyyokwanwamameonglismkhahlaleuseo aalugapsi hlonjeomto wokhhe komi s"
	};

	global._languageData = (( true && module.exports === global && module) || {}).exports = models;
})(this);



/***/ }),

/***/ 468:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

/*   Guess the natural language of a text
 *   Copyright (c) 2012-2014, Rich Tibbett
 *   http://github.com/richtr/guessLanguage.js/
 *
 *   Original Python package:
 *   Copyright (c) 2008, Kent S Johnson
 *   http://code.google.com/p/guess-language/
 *
 *   Original C++ version for KDE:
 *   Copyright (c) 2006 Jacob R Rideout <kde@jacobrideout.net>
 *   http://websvn.kde.org/branches/work/sonnet-refactoring/common/nlp/guesslanguage.cpp?view=markup
 *
 *   Original Language::Guess Perl module:
 *   Copyright (c) 2004-2006 Maciej Ceglowski
 *   http://web.archive.org/web/20090228163219/http://languid.cantbedone.org/
 *
 *   Note: Language::Guess is GPL-licensed. KDE developers received permission
 *   from the author to distribute their port under LGPL:
 *   http://lists.kde.org/?l=kde-sonnet&m=116910092228811&w=2
 *
 *   This program is free software: you can redistribute it and/or modify it
 *   under the terms of the GNU Lesser General Public License as published
 *   by the Free Software Foundation, either version 3 of the License,
 *   or (at your option) any later version.
 *
 *   This program is distributed in the hope that it will be useful,
 *   but WITHOUT ANY WARRANTY; without even the implied warranty
 *   of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
 *   See the GNU Lesser General Public License for more details.
 *
 *   You should have received a copy of the GNU Lesser General Public License
 *   along with this program. If not, see <http://www.gnu.org/licenses/>.
 */

(function (global, undefined) {
	var guessLanguage = function () {
		var models = global._languageData || {};

		if ( true && module.exports === global) {
			models = __webpack_require__(964) || {};
		}

		var MAX_LENGTH = 4096;
		var MIN_LENGTH = 20;
		var MAX_GRAMS = 300;

		var NAME_MAP = {
			ab: 'Abkhazian',
			af: 'Afrikaans',
			ar: 'Arabic',
			az: 'Azeri',
			be: 'Belarusian',
			bg: 'Bulgarian',
			bn: 'Bengali',
			bo: 'Tibetan',
			br: 'Breton',
			ca: 'Catalan',
			ceb: 'Cebuano',
			cs: 'Czech',
			cy: 'Welsh',
			da: 'Danish',
			de: 'German',
			el: 'Greek',
			en: 'English',
			eo: 'Esperanto',
			es: 'Spanish',
			et: 'Estonian',
			eu: 'Basque',
			fa: 'Farsi',
			fi: 'Finnish',
			fo: 'Faroese',
			fr: 'French',
			fy: 'Frisian',
			gd: 'Scots Gaelic',
			gl: 'Galician',
			gu: 'Gujarati',
			ha: 'Hausa',
			haw: 'Hawaiian',
			he: 'Hebrew',
			hi: 'Hindi',
			hmn: 'Pahawh Hmong',
			hr: 'Croatian',
			hu: 'Hungarian',
			hy: 'Armenian',
			id: 'Indonesian',
			is: 'Icelandic',
			it: 'Italian',
			ja: 'Japanese',
			ka: 'Georgian',
			kk: 'Kazakh',
			km: 'Cambodian',
			ko: 'Korean',
			ku: 'Kurdish',
			ky: 'Kyrgyz',
			la: 'Latin',
			lt: 'Lithuanian',
			lv: 'Latvian',
			mg: 'Malagasy',
			mk: 'Macedonian',
			ml: 'Malayalam',
			mn: 'Mongolian',
			mr: 'Marathi',
			ms: 'Malay',
			nd: 'Ndebele',
			ne: 'Nepali',
			nl: 'Dutch',
			nn: 'Nynorsk',
			no: 'Norwegian',
			nso: 'Sepedi',
			pa: 'Punjabi',
			pl: 'Polish',
			ps: 'Pashto',
			pt: 'Portuguese',
			'pt-PT': 'Portuguese (Portugal)',
			'pt-BR': 'Portuguese (Brazil)',
			ro: 'Romanian',
			ru: 'Russian',
			sa: 'Sanskrit',
			bs: 'Serbo-Croatian',
			sk: 'Slovak',
			sl: 'Slovene',
			so: 'Somali',
			sq: 'Albanian',
			sr: 'Serbian',
			sv: 'Swedish',
			sw: 'Swahili',
			ta: 'Tamil',
			te: 'Telugu',
			th: 'Thai',
			tl: 'Tagalog',
			tlh: 'Klingon',
			tn: 'Setswana',
			tr: 'Turkish',
			ts: 'Tsonga',
			tw: 'Twi',
			uk: 'Ukrainian',
			ur: 'Urdu',
			uz: 'Uzbek',
			ve: 'Venda',
			vi: 'Vietnamese',
			xh: 'Xhosa',
			zh: 'Chinese',
			'zh-TW': 'Traditional Chinese (Taiwan)',
			zu: 'Zulu'
		};

		var IANA_MAP = {
			ab: 12026,
			af: 40,
			ar: 26020,
			az: 26030,
			be: 11890,
			bg: 26050,
			bn: 26040,
			bo: 26601,
			br: 1361,
			ca: 3,
			ceb: 26060,
			cs: 26080,
			cy: 26560,
			da: 26090,
			de: 26160,
			el: 26165,
			en: 26110,
			eo: 11933,
			es: 26460,
			et: 26120,
			eu: 1232,
			fa: 26130,
			fi: 26140,
			fo: 11817,
			fr: 26150,
			fy: 1353,
			gd: 65555,
			gl: 1252,
			gu: 26599,
			ha: 26170,
			haw: 26180,
			he: 26592,
			hi: 26190,
			hr: 26070,
			hu: 26200,
			hy: 26597,
			id: 26220,
			is: 26210,
			it: 26230,
			ja: 26235,
			ka: 26600,
			kk: 26240,
			km: 1222,
			ko: 26255,
			ku: 11815,
			ky: 26260,
			la: 26280,
			lt: 26300,
			lv: 26290,
			mg: 1362,
			mk: 26310,
			ml: 26598,
			mn: 26320,
			mr: 1201,
			ms: 1147,
			ne: 26330,
			nl: 26100,
			nn: 172,
			no: 26340,
			pa: 65550,
			pl: 26380,
			ps: 26350,
			pt: 26390,
			ro: 26400,
			ru: 26410,
			sa: 1500,
			bs: 1399,
			sk: 26430,
			sl: 26440,
			so: 26450,
			sq: 26010,
			sr: 26420,
			sv: 26480,
			sw: 26470,
			ta: 26595,
			te: 26596,
			th: 26594,
			tl: 26490,
			tlh: 26250,
			tn: 65578,
			tr: 26500,
			tw: 1499,
			uk: 26520,
			ur: 26530,
			uz: 26540,
			vi: 26550,
			zh: 26065,
			'zh-TW': 22
		};

		var SINGLETONS = [
			['Armenian', 'hy'],
			['Hebrew', 'he'],
			['Bengali', 'bn'],
			['Gurmukhi', 'pa'],
			['Greek', 'el'],
			['Gujarati', 'gu'],
			['Oriya', 'or'],
			['Tamil', 'ta'],
			['Telugu', 'te'],
			['Kannada', 'kn'],
			['Malayalam', 'ml'],
			['Sinhala', 'si'],
			['Thai', 'th'],
			['Lao', 'lo'],
			['Tibetan', 'bo'],
			['Burmese', 'my'],
			['Georgian', 'ka'],
			['Mongolian', 'mn'],
			['Khmer', 'km'],
			['Pahawh Hmong', 'hmn']
		];

		var UNKNOWN = 'unknown';

		var BASIC_LATIN = ['en', 'ceb', 'ha', 'so', 'tlh', 'id', 'haw', 'la', 'sw', 'eu', 'nr', 'nso', 'zu', 'xh', 'ss', 'st', 'tn', 'ts'];
		var EXTENDED_LATIN = [
			'cs',
			'af',
			'pl',
			'hr',
			'ro',
			'sk',
			'sl',
			'tr',
			'hu',
			'az',
			'et',
			'sq',
			'ca',
			'es',
			'fr',
			'de',
			'nl',
			'it',
			'da',
			'is',
			'no',
			'sv',
			'fi',
			'lv',
			'pt',
			've',
			'lt',
			'tl',
			'cy',
			'vi'
		];
		var ALL_LATIN = BASIC_LATIN.concat(EXTENDED_LATIN);
		var CYRILLIC = ['ru', 'uk', 'kk', 'uz', 'mn', 'sr', 'mk', 'bg', 'ky'];
		var ARABIC = ['ar', 'fa', 'ps', 'ur'];
		var DEVANAGARI = ['hi', 'ne'];
		var PT = ['pt-BR', 'pt-PT'];

		// Unicode char greedy regex block range matchers
		var unicodeBlockTests = {
			'Basic Latin': /[\u0000-\u007F]/g,
			'Latin-1 Supplement': /[\u0080-\u00FF]/g,
			'Latin Extended-A': /[\u0100-\u017F]/g,
			'Latin Extended-B': /[\u0180-\u024F]/g,
			'IPA Extensions': /[\u0250-\u02AF]/g,
			'Spacing Modifier Letters': /[\u02B0-\u02FF]/g,
			'Combining Diacritical Marks': /[\u0300-\u036F]/g,
			'Greek and Coptic': /[\u0370-\u03FF]/g,
			Cyrillic: /[\u0400-\u04FF]/g,
			'Cyrillic Supplement': /[\u0500-\u052F]/g,
			Armenian: /[\u0530-\u058F]/g,
			Hebrew: /[\u0590-\u05FF]/g,
			Arabic: /[\u0600-\u06FF]/g,
			Syriac: /[\u0700-\u074F]/g,
			'Arabic Supplement': /[\u0750-\u077F]/g,
			Thaana: /[\u0780-\u07BF]/g,
			NKo: /[\u07C0-\u07FF]/g,
			Devanagari: /[\u0900-\u097F]/g,
			Bengali: /[\u0980-\u09FF]/g,
			Gurmukhi: /[\u0A00-\u0A7F]/g,
			Gujarati: /[\u0A80-\u0AFF]/g,
			Oriya: /[\u0B00-\u0B7F]/g,
			Tamil: /[\u0B80-\u0BFF]/g,
			Telugu: /[\u0C00-\u0C7F]/g,
			Kannada: /[\u0C80-\u0CFF]/g,
			Malayalam: /[\u0D00-\u0D7F]/g,
			Sinhala: /[\u0D80-\u0DFF]/g,
			Thai: /[\u0E00-\u0E7F]/g,
			Lao: /[\u0E80-\u0EFF]/g,
			Tibetan: /[\u0F00-\u0FFF]/g,
			Burmese: /[\u1000-\u109F]/g,
			Georgian: /[\u10A0-\u10FF]/g,
			'Hangul Jamo': /[\u1100-\u11FF]/g,
			Ethiopic: /[\u1200-\u137F]/g,
			'Ethiopic Supplement': /[\u1380-\u139F]/g,
			Cherokee: /[\u13A0-\u13FF]/g,
			'Unified Canadian Aboriginal Syllabics': /[\u1400-\u167F]/g,
			Ogham: /[\u1680-\u169F]/g,
			Runic: /[\u16A0-\u16FF]/g,
			'Pahawh Hmong': /[\u16B0-\u16B8]/g,
			Tagalog: /[\u1700-\u171F]/g,
			Hanunoo: /[\u1720-\u173F]/g,
			Buhid: /[\u1740-\u175F]/g,
			Tagbanwa: /[\u1760-\u177F]/g,
			Khmer: /[\u1780-\u17FF]/g,
			Mongolian: /[\u1800-\u18AF]/g,
			Limbu: /[\u1900-\u194F]/g,
			'Tai Le': /[\u1950-\u197F]/g,
			'New Tai Lue': /[\u1980-\u19DF]/g,
			'Khmer Symbols': /[\u19E0-\u19FF]/g,
			Buginese: /[\u1A00-\u1A1F]/g,
			Balinese: /[\u1B00-\u1B7F]/g,
			'Phonetic Extensions': /[\u1D00-\u1D7F]/g,
			'Phonetic Extensions Supplement': /[\u1D80-\u1DBF]/g,
			'Combining Diacritical Marks Supplement': /[\u1DC0-\u1DFF]/g,
			'Latin Extended Additional': /[\u1E00-\u1EFF]/g,
			'Greek Extended': /[\u1F00-\u1FFF]/g,
			'General Punctuation': /[\u2000-\u206F]/g,
			'Superscripts and Subscripts': /[\u2070-\u209F]/g,
			'Currency Symbols': /[\u20A0-\u20CF]/g,
			'Combining Diacritical Marks for Symbols': /[\u20D0-\u20FF]/g,
			'Letterlike Symbols': /[\u2100-\u214F]/g,
			'Number Forms': /[\u2150-\u218F]/g,
			Arrows: /[\u2190-\u21FF]/g,
			'Mathematical Operators': /[\u2200-\u22FF]/g,
			'Miscellaneous Technical': /[\u2300-\u23FF]/g,
			'Control Pictures': /[\u2400-\u243F]/g,
			'Optical Character Recognition': /[\u2440-\u245F]/g,
			'Enclosed Alphanumerics': /[\u2460-\u24FF]/g,
			'Box Drawing': /[\u2500-\u257F]/g,
			'Block Elements': /[\u2580-\u259F]/g,
			'Geometric Shapes': /[\u25A0-\u25FF]/g,
			'Miscellaneous Symbols': /[\u2600-\u26FF]/g,
			Dingbats: /[\u2700-\u27BF]/g,
			'Miscellaneous Mathematical Symbols-A': /[\u27C0-\u27EF]/g,
			'Supplemental Arrows-A': /[\u27F0-\u27FF]/g,
			'Braille Patterns': /[\u2800-\u28FF]/g,
			'Supplemental Arrows-B': /[\u2900-\u297F]/g,
			'Miscellaneous Mathematical Symbols-B': /[\u2980-\u29FF]/g,
			'Supplemental Mathematical Operators': /[\u2A00-\u2AFF]/g,
			'Miscellaneous Symbols and Arrows': /[\u2B00-\u2BFF]/g,
			Glagolitic: /[\u2C00-\u2C5F]/g,
			'Latin Extended-C': /[\u2C60-\u2C7F]/g,
			Coptic: /[\u2C80-\u2CFF]/g,
			'Georgian Supplement': /[\u2D00-\u2D2F]/g,
			Tifinagh: /[\u2D30-\u2D7F]/g,
			'Ethiopic Extended': /[\u2D80-\u2DDF]/g,
			'Supplemental Punctuation': /[\u2E00-\u2E7F]/g,
			'CJK Radicals Supplement': /[\u2E80-\u2EFF]/g,
			'KangXi Radicals': /[\u2F00-\u2FDF]/g,
			'Ideographic Description Characters': /[\u2FF0-\u2FFF]/g,
			'CJK Symbols and Punctuation': /[\u3000-\u303F]/g,
			Hiragana: /[\u3040-\u309F]/g,
			Katakana: /[\u30A0-\u30FF]/g,
			Bopomofo: /[\u3100-\u312F]/g,
			'Hangul Compatibility Jamo': /[\u3130-\u318F]/g,
			Kanbun: /[\u3190-\u319F]/g,
			'Bopomofo Extended': /[\u31A0-\u31BF]/g,
			'CJK Strokes': /[\u31C0-\u31EF]/g,
			'Katakana Phonetic Extensions': /[\u31F0-\u31FF]/g,
			'Enclosed CJK Letters and Months': /[\u3200-\u32FF]/g,
			'CJK Compatibility': /[\u3300-\u33FF]/g,
			'CJK Unified Ideographs Extension A': /[\u3400-\u4DBF]/g,
			'Yijing Hexagram Symbols': /[\u4DC0-\u4DFF]/g,
			'CJK Unified Ideographs': /[\u4E00-\u9FFF]/g,
			'Yi Syllables': /[\uA000-\uA48F]/g,
			'Yi Radicals': /[\uA490-\uA4CF]/g,
			'Modifier Tone Letters': /[\uA700-\uA71F]/g,
			'Latin Extended-D': /[\uA720-\uA7FF]/g,
			'Syloti Nagri': /[\uA800-\uA82F]/g,
			'Phags-pa': /[\uA840-\uA87F]/g,
			'Hangul Syllables': /[\uAC00-\uD7AF]/g,
			'High Surrogates': /[\uD800-\uDB7F]/g,
			'High Private Use Surrogates': /[\uDB80-\uDBFF]/g,
			'Low Surrogates': /[\uDC00-\uDFFF]/g,
			'Private Use Area': /[\uE000-\uF8FF]/g,
			'CJK Compatibility Ideographs': /[\uF900-\uFAFF]/g,
			'Alphabetic Presentation Forms': /[\uFB00-\uFB4F]/g,
			'Arabic Presentation Forms-A': /[\uFB50-\uFDFF]/g,
			'Variation Selectors': /[\uFE00-\uFE0F]/g,
			'Vertical Forms': /[\uFE10-\uFE1F]/g,
			'Combining Half Marks': /[\uFE20-\uFE2F]/g,
			'CJK Compatibility Forms': /[\uFE30-\uFE4F]/g,
			'Small Form Variants': /[\uFE50-\uFE6F]/g,
			'Arabic Presentation Forms-B': /[\uFE70-\uFEFF]/g,
			'Halfwidth and Fullwidth Forms': /[\uFF00-\uFFEF]/g,
			Specials: /[\uFFF0-\uFFFF]/g
		};

		function findRuns(text) {
			var relevantRuns = {};

			for (var key in unicodeBlockTests) {
				// Count the number of characters in each character block.
				var charCount = text.match(unicodeBlockTests[key]);

				// return run types that used for 40% or more of the string
				// always return basic latin if found more than 15%
				// and extended additional latin if over 10% (for Vietnamese)
				var pct = (charCount ? charCount.length : 0) / text.length;

				relevantRuns[key] = pct;
			}

			return relevantRuns;
		}

		function identify(text, callback) {
			var scripts = findRuns(text);

			// Identify the language.
			if (scripts['Hangul Syllables'] + scripts['Hangul Jamo'] + scripts['Hangul Compatibility Jamo'] >= 0.4) {
				callback.apply(undefined, ['ko']);
				return;
			}

			if (scripts['Greek and Coptic'] >= 0.4) {
				callback.apply(undefined, ['el']);
				return;
			}

			if (scripts['Hiragana'] + scripts['Katakana'] + scripts['Katakana Phonetic Extensions'] >= 0.2) {
				callback.apply(undefined, ['ja']);
				return;
			}

			if (scripts['CJK Unified Ideographs'] + scripts['Bopomofo'] + scripts['Bopomofo Extended'] + scripts['KangXi Radicals'] >= 0.4) {
				callback.apply(undefined, ['zh']);
				return;
			}

			if (scripts['Cyrillic'] >= 0.4) {
				check(text, CYRILLIC, callback);
				return;
			}

			if (scripts['Arabic'] + scripts['Arabic Presentation Forms-A'] + scripts['Arabic Presentation Forms-B'] >= 0.4) {
				check(text, ARABIC, callback);
				return;
			}

			if (scripts['Devanagari'] >= 0.4) {
				check(text, DEVANAGARI, callback);
				return;
			}

			// Try languages with unique scripts
			for (var i = 0, l = SINGLETONS.length; i < l; i++) {
				if (scripts[SINGLETONS[i][0]] >= 0.4) {
					callback.apply(undefined, [SINGLETONS[i][1]]);
					return;
				}
			}

			// Extended Latin
			if (scripts['Latin-1 Supplement'] + scripts['Latin Extended-A'] + scripts['IPA Extensions'] >= 0.4) {
				check(text, EXTENDED_LATIN, function (latinLang) {
					if (latinLang == 'pt') {
						check(text, PT, callback);
					} else {
						callback.apply(undefined, [latinLang]);
					}
				});
				return;
			}

			if (scripts['Basic Latin'] >= 0.15) {
				check(text, ALL_LATIN, callback);
				return;
			}

			callback.apply(undefined, [UNKNOWN]);
		}

		function check(sample, langs, callback) {
			if (sample.length < MIN_LENGTH) {
				callback.apply(undefined, [UNKNOWN]);
				return;
			}

			var scores = {};
			var model = createOrderedModel(sample);
			for (var i = 0, l = langs.length; i < l; i++) {
				var lkey = langs[i].toLowerCase();

				var knownModel = createKnownModel(lkey) || null;

				if (!knownModel) {
					continue;
				}

				scores[lkey] = distance(model, knownModel);
			}

			var scoresArr = [];
			for (var index in scores) {
				scoresArr.push([index, scores[index]]);
			}

			if (scoresArr.length == 0) {
				callback.apply(undefined, [UNKNOWN]);
				return;
			}

			// we want the lowest score, less distance = greater chance of match
			var sortedScores = scoresArr.sort(function (objA, objB) {
				return objA[1] - objB[1]; // sort low-to-high
			});

			// return the best match we've now calculated
			callback.apply(undefined, [sortedScores[0][0]]);
		}

		function createOrderedModel(content) {
			// Create a list of trigrams in content sorted by frequency.
			var trigrams = {},
				sortedTrigrams = [];
			var content = content.toLowerCase();

			var contentArr = content.split('');
			for (var i = 0, l = contentArr.length - 2; i < l; i++) {
				var trigramKey = contentArr[i] + contentArr[i + 1] + contentArr[i + 2] + '';
				if (!trigrams[trigramKey]) {
					trigrams[trigramKey] = 1;
				} else {
					trigrams[trigramKey] += 1;
				}
			}

			// convert object to array
			for (var i in trigrams) {
				sortedTrigrams[sortedTrigrams.length] = [i, trigrams[i]];
			}

			// sort array results
			return sortedTrigrams.sort(function (objA, objB) {
				return objB[1] - objA[1]; // sort high-to-low
			});
		}

		var knownModelCache = {};

		function createKnownModel(key) {
			// Check if known model has been pre-computed in cache
			if (knownModelCache[key]) {
				return knownModelCache[key];
			}

			var data = models[key];
			if (!data) {
				return {};
			}

			// Extract known trigram model data
			var dataArr = data.match(/([\s\S]{1,3})/g);
			// Contruct known trigram object based on provided raw data
			var knownModel = {};
			for (var i = 0, l = dataArr.length; i < l; i++) {
				knownModel[dataArr[i]] = i;
			}

			// Store in known model pre-computed cache
			knownModelCache[key] = knownModel;

			return knownModel;
		}

		function distance(model, knownModel) {
			// Calculate the distance to the known model.
			var dist = 0;

			for (var i = 0, l = model.length; i < l; i++) {
				if (knownModel[model[i][0]]) {
					dist += Math.abs(model[i][1] - knownModel[model[i][0]]);
				} else {
					dist += MAX_GRAMS;
				}
			}

			return dist;
		}

		return {
			detect: function (text, callback) {
				// Return the ISO 639-2 language identifier, i.e. 'en'.

				if (!text) {
					callback.apply(undefined, [UNKNOWN]);
					return;
				}

				text = text.substr(0, MAX_LENGTH).replace(/[\u0021-\u0040]/g, '');

				identify(text, callback);
			},
			info: function (text, callback) {
				// Return language info tuple (id, code, name), i.e. ('en', 26110, 'English').

				this.detect(text, function (language) {
					if (language === UNKNOWN) {
						callback.apply(undefined, [[UNKNOWN, UNKNOWN, UNKNOWN]]);
						return;
					}

					callback.apply(undefined, [[language, IANA_MAP[language], NAME_MAP[language]]]);
				});
			},
			code: function (text, callback) {
				// Return the language IANA code, i.e. 26110.

				this.detect(text, function (language) {
					if (language === UNKNOWN) {
						callback.apply(undefined, [-1]);
						return;
					}

					callback.apply(undefined, [IANA_MAP[language]]);
				});
			},
			name: function (text, callback) {
				// Return the full language name, i.e. 'English'.

				this.detect(text, function (language) {
					if (language === UNKNOWN) {
						callback.apply(undefined, [UNKNOWN]);
						return;
					}

					callback.apply(undefined, [NAME_MAP[language]]);
				});
			}
		};
	};

	global.guessLanguage = (global.module || {}).exports = new guessLanguage();
})(this);



/***/ }),

/***/ 379:
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

/***/ 192:
/***/ (function(module, exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

var define = false; /* Disable AMD for misbehaving libraries */

(function(scope, factory){
    if ( true && typeof module.exports === "object" ){
        module.exports = factory;
    }
    else {
        scope.setWalkmeLanguagePlugin = factory;
    }
}(this, function(getLego){
	var Lego = getLego();
	var ctx = Lego.ctx;
	var di = Lego.di;


"use strict";
/// <reference path="../node_modules/wm-plugins-core/plugins/iplugin.ts"/>
/// <reference path="../node_modules/wm-plugins-core/definitions/globals.d.ts"/>
Object.defineProperty(exports, "__esModule", ({ value: true }));
var languageGetterFactory_js_1 = __webpack_require__(229);
var wait = __webpack_require__(379)(Lego.ctx);
var setWalkMeLanguage = /** @class */ (function () {
    function setWalkMeLanguage() {
        this.defaultOptions = {
            method: 'detect',
            default: 'en',
            retryInterval: 500,
            retries: 10,
            detect: {
                searchTextSelector: 'body *:not(script):not(style)',
                excludeSelector: '[style*=font] *',
                excludeWords: '',
                maxStringDetectionLength: 500
            },
            ignoreCountryCode: false
        };
        this._logger = Lego.ctx.get('PrelibLogger');
    }
    setWalkMeLanguage.prototype.run = function () {
        var _this = this;
        // If the plugin is loading alongside the SFVars, is very probalbe that the language that we will use
        // belongs to SFVars result. By inspecting first if sfVars is loaded alongisede, we will tell 
        // this plugin to wait until the event of the sfVars to be created, otherwise, it should load normally
        var hasPluginToWaitFor = _walkmeInternals.plugins && _walkmeInternals.plugins.list().filter(function (plugin) {
            var match = plugin.name.match(/^wm-plugin-(sf-vars||wait-for-end-user)@(.*)@prelib$/);
            return !!match;
        });
        var pluginEvent;
        if (hasPluginToWaitFor && hasPluginToWaitFor.length && hasPluginToWaitFor.length > 0) {
            pluginEvent = hasPluginToWaitFor.find(function (plugin) { return plugin.name.indexOf('sf-vars') > -1; }) !== undefined ? 'sfVarsLoaded' : 'waitForEndUserVarEnd';
        }
        var event = (!pluginEvent) ? 'WalkMeConfigFileLoaded' : pluginEvent;
        wait.registerFunction(event, function () {
            if (!Lego.ctx.get("CommonUtils").getJsonSettings().setWalkMeLanguage) {
                return;
            }
            _this._libDestroyer = Lego.ctx.get('LibDestroyer');
            _this.setOptions();
            if (_this.isBlacklistedUrl()) {
                _this.log('Url match in Blacklist regex. Finishing.');
                return;
            }
            // I dont think we need this anymore. If we ever encounter, it will have to be refactored
            // the reason being that LanguageSyncManager uses WalkMeAPI.setLanguage and this will
            // override the user preference of the language if selected from the dropdown.
            // The rule should be to have top priority of language selection the one from the user and 
            // if not, let walkme decide during loading. The lib does this by using the callback
            // functiopn `window.walkme_get_language`
            // this._languageSyncManager = new LanguageSyncManager(this.options);
            return _this.updateLanguage(_this.options);
        });
        Lego.ctx.get('EventsListener').on('changeLanguageApiCalled', function (event, data) {
            this.updateWalkMeLanguage(data.language);
        });
    };
    setWalkMeLanguage.prototype.updateLanguage = function (options) {
        var _this = this;
        var that = this;
        return languageGetterFactory_js_1.LanguageGetterFactory.create(options)
            .get()
            .then(function (lang) {
            _this.updateWalkMeLanguage(lang);
            // this._languageSyncManager.init(lang);
        }, function (err) {
            _this.updateWalkMeLanguage(_this.options.default);
            _this.log("set default language (".concat(_this.options.default, "), because: ").concat(err));
        })
            .catch(function (e) { return _this.log('Exception while calculating language: ' + e.message); });
    };
    setWalkMeLanguage.prototype.setOptions = function () {
        var userOptions = Lego.ctx.get('CommonUtils').getJsonSettings().setWalkMeLanguage;
        this.options = wmjQuery.extend({}, this.defaultOptions, userOptions);
        this.options.Lego = Lego;
        if (this.options.default == '') {
            this._libDestroyer.removeWalkMe('[ setWalkMeLanguage ] ERROR: default option is not defined');
        }
        return this.options;
    };
    setWalkMeLanguage.prototype.updateWalkMeLanguage = function (lang) {
        var _this = this;
        lang = this.checkCDSetWMLaung(lang);
        try {
            this.log("updateWalkMeLanguage was called with ".concat(lang));
            if (!lang) {
                this.log("no lang, abort update language");
                return;
            }
            var outputLang_1 = this.sanitizeLanguage(lang);
            window.walkme_get_language = function () {
                _this.log("Lanaguage [".concat(outputLang_1, "] was selected by SetWalkMePlugin"));
                return outputLang_1;
            };
        }
        catch (e) {
            this.log(e);
        }
    };
    setWalkMeLanguage.prototype.sanitizeLanguage = function (lang) {
        //skip the sanitization if the value is a number and return as string
        if (!isNaN(lang)) {
            return lang.toString();
        }
        // we cannot define languages in analytics containing the underscore character
        return lang.replace(/_/g, '-');
    };
    setWalkMeLanguage.prototype.checkWalkMeDefaultLanguage = function (lang) {
        // walkme default shortname language defined in analytics is "blank"
        return this.options.default == lang ? '' : lang;
    };
    setWalkMeLanguage.prototype.isBlacklistedUrl = function () {
        if (!this.options.blacklist)
            return false;
        var isBlacklisted = false;
        var blacklistArray = [].concat(this.options.blacklist);
        blacklistArray.forEach(function (bl) {
            if ((new RegExp(bl)).test(window.location.href)) {
                isBlacklisted = true;
            }
        });
        return isBlacklisted;
    };
    setWalkMeLanguage.prototype.checkCDSetWMLaung = function (language) {
        var cdSetWmLang = Lego.ctx.get('FeaturesManager').isFeatureEnabled('cdSetWalkMeLanguage');
        if (cdSetWmLang) {
            var storageManger = Lego.ctx.get('ClientStorageManager');
            var topLang = storageManger.getData('wm-top-lang');
            if ((topLang && topLang.domain === window.location.hostname && topLang.topLang !== language) || !topLang) {
                storageManger.saveData('wm-top-lang', { domain: window.location.hostname, topLang: language }, 6000);
                this.log("updateWalkMeLanguage top lang key was set with ".concat(language, " from ").concat(window.location.hostname, "}"));
            }
            else if (topLang && topLang.domain !== window.location.hostname) {
                this.log("updateWalkMeLanguage from key with ".concat(topLang.topLang));
                return topLang.topLang;
            }
        }
        return language;
    };
    setWalkMeLanguage.prototype.log = function (e) {
        this._logger.write("[ setWalkMeLanguage ] ".concat(e));
    };
    return setWalkMeLanguage;
}());


Lego.plugin(new setWalkMeLanguage());

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
/******/ 			id: moduleId,
/******/ 			loaded: false,
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/node module decorator */
/******/ 	!function() {
/******/ 		__webpack_require__.nmd = function(module) {
/******/ 			module.paths = [];
/******/ 			if (!module.children) module.children = [];
/******/ 			return module;
/******/ 		};
/******/ 	}();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module used 'module' so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__(638);
/******/ 	wmbundle = __webpack_exports__;
/******/ 	
/******/ })()
;
/* WalkMe Module */ return wmbundle; })
//# sourceMappingURL=bundle.js.map
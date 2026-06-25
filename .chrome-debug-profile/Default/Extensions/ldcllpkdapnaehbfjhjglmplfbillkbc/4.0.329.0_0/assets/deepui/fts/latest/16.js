(function(a) {
      if(a && typeof a['cb-platformFTs'] !== 'undefined') {
        var obj = {};
        obj.getData = function() {
          return {
            '200322158': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return new wmjQuery(":contains(" + fixed.titleTxt + ")span.x-form-item-label-text").parents("div.x-form-item").find("div[id*='clear']")},
'703132062': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return new wmjQuery(":contains(" + fixed.title + ")label.x-form-cb-label").parents("div.x-form-cb-wrap-inner").find("input[type='checkbox']")
},
'1062090631': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return new wmjQuery(":contains(" + fixed.titleText + ")div.x-tab-bar").parent().find("div[class*='arrow']")
},
'1284980093': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("ul.x-list-plain").find(":textStartsWith(" + fixed.tgtText + ")li[role='option']") },
'1536546058': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(":contains(" + fixed.selectedTab + ")a.x-tab-active").parents("#mainView-innerCt").find("div.lms-assignment-grid").find("td:eq(" + fixed.tdIndex + ")")},
'1673331133': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return new wmjQuery("input[name=" + dollars[0] + "]").parents(".x-form-item").find("[id$=" + dollars[1] + "]").filter(":deepui_visible")},
'1710160891': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {let tgtId = wmjQuery("span[data-ref='labelTextEl']:textEquals(" + fixed.tgtLabel + ")").attr("id");
let tgtList;
if (tgtId) {
	tgtList = tgtId.split("-");
    if (tgtList) {tgtList = tgtList.filter(function(e) {return e.match(/\d+/)})};
} else {tgtList: null};
return new wmjQuery("[id^='combo-" + tgtList + "-picker'][data-ref=" + dollars[0] + "]")},
'2092064120': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(":contains(" + fixed.titleElem + ")div.x-toolbar-text").parents("div.x-box-inner").find("input")},
'-1421174479': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return new wmjQuery(":contains(" + fixed.labelTxt + ")span.x-form-item-label-text").parents("div.x-field").find("div.x-form-arrow-trigger")},
'-1706766633': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return new wmjQuery(":contains(" + fixed.title + ")span.x-form-item-label-text").parents("div.x-autocontainer-innerCt[id^='panel']").find("div.x-form-clear-trigger")},
'-1207924252': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {let tgtId = wmjQuery("span[data-ref='labelTextEl']:textEquals(" + fixed.tgtLabel + ")").attr("id");
let tgtList;
if (tgtId) {
	tgtList = tgtId.split("-");
    if (tgtList) {tgtList = tgtList.filter(function(e) {return e.match(/\d+/)})};
} else {tgtList: null};
return new wmjQuery("ul#combo-" + tgtList + "-picker-listEl").find("li[role='option']:textEquals(" + dollars[0] + ")")},
'-1984536408': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {let tgtId = wmjQuery("span[data-ref='labelTextEl']:textEquals(" + fixed.tgtLabel + ")").attr("id");
let tgtList;
if (tgtId) {
	tgtList = tgtId.split("-");
    if (tgtList) {tgtList = tgtList.filter(function(e) {return e.match(/\d+/)})};
} else {tgtList: null};
return new wmjQuery("ul#combo-" + tgtList + "-picker-listEl").find("li[role='option'].x-boundlist-selected")},
'-308593159': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const stringArray = fixed.parentText.split("$")
let lastParent = wmjQuery(stringArray[0])
for(i=1; i<stringArray.length; i++){
	lastParent = lastParent.nextAll(stringArray[i])
}
return wmjQuery(lastParent).nextAll("table:has(:contains("+ fixed.spanText + ")span):first").find(fixed.elemType + "." + fixed.elemClass+":last")
},
'-98736331': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return  wmjQuery(":contains(" + fixed.tabText + ")li.x-treelist-item-selected").parents("div.x-box-inner").find(":contains(" + fixed.tgtText + ")div.x-panel:last")}
          };
        };
        a['cb-platformFTs'](obj);
      }
    })(window && window._walkmeInternals);
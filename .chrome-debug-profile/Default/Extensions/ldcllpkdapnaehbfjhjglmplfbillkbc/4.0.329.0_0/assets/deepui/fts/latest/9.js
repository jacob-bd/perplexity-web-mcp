(function(a) {
      if(a && typeof a['cb-platformFTs'] !== 'undefined') {
        var obj = {};
        obj.getData = function() {
          return {
            '382083235': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[class*='page-header-module-title'] :contains(" + dollars[0] + ")span")},
'610697641': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("h2").filter(".page-title,[data-testid='page-title']").filter(":containsTextNode("+fixed.elemTxt+")").closest(".title-section");},
'835187310': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div[class^='price-column'] button[data-testid=" + dollars[0] + "]:eq(" + dollars[1] + ")")},
'1181306244': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("dt.search-result-item-key:contains(" + dollars[0] + ") + dd.search-result-item-value [class^=" + dollars[1] + "]:eq(" + dollars[2] + ")")},
'1480969146': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-testid=" + dollars[0] + "] button[data-testid=" + dollars[1] + "]")},
'1591343576': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("header [data-testid*=" + dollars[0] + "]~h2")},
'1845004913': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-testid='explore-products-container'] span:eq(" + dollars[0] + ")")},
'1883909265': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div").filter(":directContains("+fixed.elemTxt+")").parent().find("[data-testid*="+fixed._elemId+"]");},
'-1882475908': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("input[type=" + dollars[0] + "]~button[class^=" + dollars[1] + "]")},
'-84309484': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("main:contains(" + fixed.headerTxt + ") input[type=" + dollars[0] + "]")},
'-1075157306': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("a[href$='" + fixed.tgtHref + "']")},
'-1707988341': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[class*=" + dollars[0] + "] div[class*=" + dollars[1] + "]:mt_visible")},
'-1767544041': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-testid^=" + dollars[0] + "]").parents('div[class*=" + dollars[1] + "]')},
'-1880884312': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[class*=" + dollars[0] + "] div[class*=" + dollars[1] + "][data-testid=" + dollars[2] + "]:mt_visible")},
'-1479503814': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div[class^=" + dollars[0] + "] a[class^=" + dollars[1] + "]:mt_visible")},
'-2091810134': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("dt.search-result-item-key:contains(" + dollars[0] + ") + dd.search-result-item-value [class='" + fixed.tgtClass +"']:eq(" + dollars[1] + ")")},
'-132745707': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("ul[class^=" + dollars[0] + "] li:eq(" + dollars[1] + ") a")},
'-1474495543': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("a.selected:contains(" + fixed.sectionTxt +")").parents("body").find("[class*='page-header-module-title'] :contains(" + fixed.tgtTxt +")span") },
'-302422970': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(":contains(" + dollars[1] + ")a[class*=" + dollars[0] + "]")},
'-2052288171': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".modal-content :contains(" + dollars[0] + ")button[data-testid=" + dollars[1] + "]")},
'-1867960409': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return  wmjQuery("[data-testid='breadcrumbs-nav']").find("span:last:textEquals(" + dollars[0] + ")")},
'-1787411529': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div.report-description:contains(" + fixed.tgtTxt +")").children(":first")}
          };
        };
        a['cb-platformFTs'](obj);
      }
    })(window && window._walkmeInternals);
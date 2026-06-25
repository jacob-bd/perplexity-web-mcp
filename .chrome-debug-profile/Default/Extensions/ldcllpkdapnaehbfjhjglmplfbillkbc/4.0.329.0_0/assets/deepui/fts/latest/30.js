(function(a) {
      if(a && typeof a['cb-platformFTs'] !== 'undefined') {
        var obj = {};
        obj.getData = function() {
          return {
            '89000350': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".p-column-title").filter(":directContains("+fixed.headerText+")").closest(".p-datatable-scrollable-header").next(".p-datatable-scrollable-body");
},
'151099785': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("img").filter("#"+fixed._imgId).closest("li").children("div");
},
'262836540': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("iframe[id^=" + dollars[0] + "]:mt_visible")},
'323405109': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[alt="+fixed.elemAlt+"]").filter("img");
},
'485364226': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(":directContains("+fixed.labelText+")").next("div").find(".p-inputtext");
},
'819812555': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("img[alt="+fixed.elemTag+"]").prev().children(".p-checkbox").children("[role='checkbox']").filter(':first');
},
'957741703': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("a").filter("[href*="+fixed._aHref+"]").find("img");
},
'1287159302': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".p-dropdown").filter("#"+fixed._parentId).children(".p-dropdown-panel");
},
'1704612005': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(":directContains("+fixed.elemText+")").filter("[class*='p-col']");
},
'1982105697': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("img").filter("[alt="+fixed.imgAlt+"]").parent("button");
},
'2020938513': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div").filter("#"+fixed._tableId).children(".content-section").find(".p-datatable-scrollable-body");
},
'2111038358': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[role='dialog']").find(".p-button-text").filter(":containsTextNode("+fixed.labelButton+")").closest(".p-button").filter(":first");
},
'-2103574782': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("img").filter("[alt="+fixed.imgAlt+"]").parent("div").prev("div");
},
'-403743274': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".p-column-title").filter(":directContains("+fixed.headerText+")").closest(".p-datatable-scrollable-header").next(".p-datatable-scrollable-body").children("table");
},
'-698196236': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("#"+fixed._elemId).filter("button.p-button");
},
'-171483754': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[type='text']").filter("#"+fixed._a).closest("div").parent().prev("div").children("div").children(".p-dropdown");
},
'-1958663346': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[type='text']").filter("#"+fixed._a).closest("div").parent().parent().prev("div").children("div").children(".p-dropdown");
},
'-1163882315': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("img").filter("#"+fixed._a).closest("li ");
},
'-463740972': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div").filter("#"+fixed._elemText).closest(".leftListLS");
},
'-1893583338': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("img["+fixed.imgAlt+"]").parent().prev();
},
'-1338719456': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".p-listbox-item").filter("[aria-label="+fixed._parentLabel+"]").children("div");
},
'-867234567': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("img").filter("[alt="+fixed.childrenAlt+"]").parent();
},
'-465712628': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".p-dropdown-label").filter(":directContains("+fixed.labelText+")").closest(".p-dropdown").parent().parent();
},
'-1756678309': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("iframe[id^='contentIFrame']:mt_visible")}
          };
        };
        a['cb-platformFTs'](obj);
      }
    })(window && window._walkmeInternals);
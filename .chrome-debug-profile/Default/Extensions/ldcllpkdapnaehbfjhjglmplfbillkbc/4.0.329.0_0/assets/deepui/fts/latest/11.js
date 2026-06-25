(function(a) {
      if(a && typeof a['cb-platformFTs'] !== 'undefined') {
        var obj = {};
        obj.getData = function() {
          return {
            '248026024': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {let sp = wmjQuery('span:contains('+fixed.title+')');var block = sp.parents(':not(:only-child):first').siblings();return block.find(fixed._tgtHit);},
'285103016': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("#" + fixed._tgtId).parents("div:not(:only-child):first").next().find("span:textEquals(" + fixed.tgtLabel + ")").siblings(".options").find(".editable span:eq(" + dollars[0] + ")")},
'346646185': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[id=" + dollars[0] + "]:visible").find("[role='columnheader'] div:contains(" + dollars[1] + ")")},
'408050033': function(fixed, dollars, __ctx, ftHelper, wmjQuery) { const titleElem = wmjQuery("[id=" + fixed._id + "]").parent().children().filter(":directContains(" + fixed.toggleText + ")"); let parent = titleElem.parents("div:not(:only-child):first"); for (let i = 0; i < fixed._rowIndex; ++i ) { parent = parent.next(); } if (fixed._elemIndex >= 0) { return parent.find(fixed._tagName + ":eq(" + fixed._elemIndex + ")"); } return parent;
},
'410058103': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("#" + fixed._tgtToggleId).parents("div:not(:only-child):first").next().find("span:textEquals(" + dollars[0] + "):eq(" + dollars[1] + ")")},
'756133657': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("#" + fixed._tgtId).next().find("span:textEquals(" + fixed.tgtLabel + ")").siblings(".options").find(".delete-link:eq(" + dollars[0] + ")")},
'822665652': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("span:textStartsWith(" + dollars[0] + ")")},
'842100327': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".wrapped-item.child-item.settings:contains(" + fixed.headerTxt +") strong:contains(" + dollars[0] + "):eq(" + dollars[1] + ")")},
'843888868': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("span[id=" + dollars[0] + "]~span:contains(" + fixed.titleTxt + ")").parent()},
'882207428': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("span[id=" + dollars[0] + "]").parent()},
'1029944169': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("li[id=" + dollars[0] + "] .active").parents("#app-content:contains(" + fixed.titleTxt +")").find("span:contains(" + dollars[1] + ")")},
'1072888350': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("button[data-cy=" + dollars[0] + "]")},
'1105828742': function(fixed, dollars, __ctx, ftHelper, wmjQuery) { return wmjQuery("[id=" + fixed._id + "]").parent().children().filter(":directContains(" + fixed.text + ")");},
'1150186907': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("#" + fixed._tgtId).next().find("span:textEquals(" + fixed.tgtLabel + ")").siblings(".options").find(".clonable")},
'1160207120': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("#" + fixed._tgtId + " + .details-content div[id=" + dollars[0] + "] + div.details-content span:contains(" + dollars[1] + "):eq(" + dollars[2] + ")")},
'1274580462': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("#" + fixed._tgtId).parents("div:not(:only-child):first").next().find("span:textEquals(" + fixed.tgtLabel + ")").siblings(".options").find(".clonable span:eq(" + dollars[0] + ")")},
'1314720892': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[role=" + dollars[0] + "]:contains(" + dollars[1] + ")").has(".menu-item")},
'1381294580': function(fixed, dollars, __ctx, ftHelper, wmjQuery) { const parentElm = wmjQuery("h4:contains(" + fixed.tableTitle + ")").closest("div.app-window"); const colIndex = parentElm.find("div.rt-thead.-header").find("div[role='columnheader']:textEquals(" + fixed.colTitle + ")").prevAll().length; const row = parentElm.find("div.ReactVirtualized__Grid__innerScrollContainer").children(":eq("+ fixed.rowIndex + ")"); const candidate = row.find("div.rt-tr[role='row']").children(":eq("+ colIndex + ")"); if (candidate.is( fixed._elTag + fixed._elClass + ":deepui_visible")){ return candidate; } return candidate.find( fixed._elTag + fixed._elClass + ":first:deepui_visible");
},
'1552871634': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("#" + fixed._tgtId).parents("div:not(:only-child):first").next().find("span:textEquals(" + fixed.tgtLabel + ")").siblings(".options").find(".editable")},
'1683516207': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("a[id=" + dollars[0] + "].active").parents(".nav-container:contains(" + fixed.titleTxt +")").find("span:contains(" + dollars[1] + ")")},
'1886502835': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".wrapped-item.child-item.settings:contains(" + fixed.headerTxt +") span:contains(" + dollars[0] + "):eq(" + dollars[1] + ")")},
'1917414633': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("#" + fixed._tgtId).parents("div:not(:only-child):first").next().find("span:textEquals(" + fixed.tgtLabel + ")").siblings(".options").find(".delete-link svg:eq(" + dollars[0] + ")")},
'2059304581': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("#" + fixed._tgtId).next().find("span:textEquals(" + fixed.tgtLabel + ")").siblings(".options").find(".clonable span:eq(" + dollars[0] + ")")},
'2105683366': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("#" + fixed._tgtId).parents("div:not(:only-child):first").next().find("span:textEquals(" + fixed.tgtLabel + ")").siblings(".options").find(".clonable svg:eq(" + dollars[0] + ")")},
'-371575948': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("#" + fixed._tgtId).parents("div:not(:only-child):first").next().find("span:textEquals(" + fixed.tgtLabel + ")").siblings(".options").find(".delete-link span:eq(" + dollars[0] + ")")},
'-403299199': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("#" + fixed._tgtId).parents("div:not(:only-child):first").next().find("span:textEquals(" + fixed.tgtLabel + ")").siblings(".options").find(".delete-link:eq(" + dollars[0] + ")")},
'-568722024': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("#" + fixed._tgtId).parents("div:not(:only-child):first").next().find("span:textEquals(" + fixed.tgtLabel + ")").siblings(".options").find(".clonable")},
'-1563669687': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("#" + fixed._tgtId).next().find("span:textEquals(" + fixed.tgtLabel + ")").siblings(".options").find(".editable span:eq(" + dollars[0] + ")")},
'-1038866081': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("#" + fixed._tgtId).next().find("span:textEquals(" + fixed.tgtLabel + ")").siblings(".options").find(".editable")},
'-1345948784': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("#" + fixed._tgtId).next().find("span:textEquals(" + fixed.tgtLabel + ")").siblings(".options").find(".delete-link span:eq(" + dollars[0] + ")")},
'-640284216': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("li[id=" + dollars[0] + "] .active").parents(".app-window:contains("+ fixed.titleTxt +")").find("span:contains(" + dollars[1] + ")")},
'-915667862': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("#" + fixed._tgtId).parents("div:not(:only-child):first").next().find("span:textEquals(" + fixed.tgtLabel + ")").siblings(".options").find(".editable svg:eq(" + dollars[0] + ")")},
'-165329173': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div.app-window:contains(" + fixed.tabTxt + ") .settings-title:contains(" + dollars[0] + "):eq(" + dollars[1] + ")")},
'-902834683': function(fixed, dollars, __ctx, ftHelper, wmjQuery) { const parentElm = wmjQuery("h4:contains(" + fixed.tableTitle + ")").closest("div.app-window"); const candidate = parentElm.find("div.rt-thead.-header").find("div[role='columnheader']:textEquals(" + fixed.colTitle + ")"); if (candidate.is( fixed._elTag + fixed._elClass + ":deepui_visible")){ return candidate; } return candidate.find( fixed._elTag + fixed._elClass + ":first:deepui_visible");
},
'-2037324513': function(fixed, dollars, __ctx, ftHelper, wmjQuery) { const parentElm = wmjQuery("div#" + fixed._tabId); const colIndex = parentElm.find("div.rt-thead.-header").find("div[role='columnheader']:textEquals(" + fixed.colTitle + ")").prevAll().length; const row = parentElm.find("div.ReactVirtualized__Grid__innerScrollContainer").children(":eq("+ fixed.rowIndex + ")"); const candidate = row.find("div.rt-tr[role='row']").children(":eq("+ colIndex + ")"); if (candidate.is( fixed._elTag + fixed._elClass + ":deepui_visible")){ return candidate; } return candidate.find( fixed._elTag + fixed._elClass + ":first:deepui_visible");
},
'-312652690': function(fixed, dollars, __ctx, ftHelper, wmjQuery) { const parentElm = wmjQuery("div#" + fixed._tabId); const candidate = parentElm.find("div.rt-thead.-header").find("div[role='columnheader']:textEquals(" + fixed.colTitle + ")"); if (candidate.is( fixed._elTag + fixed._elClass + ":deepui_visible")){ return candidate; } return candidate.find( fixed._elTag + fixed._elClass + ":first:deepui_visible");
},
'-95405771': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {if ((wmjQuery("[role='document'] div.hide-footer>div:first" + (fixed.title==="" ? "" : (":textEquals(" + fixed.title + ")"))).length == 1) && fixed.parentText) {
        return wmjQuery("[role='document'] div.details-content div.details-header:textEquals(" + fixed.parentText + ") + div " + fixed._elTag + fixed._elClass + fixed._attrs + ":textEquals(" + fixed.tgtText + ")");       
    }
    return wmjQuery("");},
'-1251860274': function(fixed, dollars, __ctx, ftHelper, wmjQuery) { const titleElem = wmjQuery("[id=" + fixed._id + "]").parent().children().filter(":directContains(" + fixed.toggleText + ")"); let parent = titleElem.parents("div:not(:only-child):first"); for (let i = 0; i < fixed._rowIndex; ++i ) { parent = parent.next(); } const pill = parent.find("span:textEquals(" + fixed.tgtText + "):first"); if (fixed._pillIndex >= 0) { return pill.find(fixed._tagName + ":eq(" + fixed._pillIndex + ")"); } return pill;
},
'-208753758': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[role=" + dollars[0] + "].menu-item:contains(" + dollars[1] + ")")},
'-552875332': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[id=" + dollars[0] + "]:visible").find("[role='columnheader']:contains(" + dollars[1] + ")")}
          };
        };
        a['cb-platformFTs'](obj);
      }
    })(window && window._walkmeInternals);
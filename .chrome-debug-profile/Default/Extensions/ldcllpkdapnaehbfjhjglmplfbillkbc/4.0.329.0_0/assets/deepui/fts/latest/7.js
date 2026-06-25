(function(a) {
      if(a && typeof a['cb-platformFTs'] !== 'undefined') {
        var obj = {};
        obj.getData = function() {
          return {
            '130170521': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("button.mat-menu-trigger.sdnav-btn, button.mat-mdc-menu-trigger.sdnav-btn").find("mat-icon")},
'320296842': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[style*=" + dollars[0] + "] button")},
'599272236': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("mat-icon").filter(":containsTextNode("+fixed.elemTxt+")");},
'1087366113': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("mat-grid-tile:eq(" + dollars[0] + ") mat-list-item:first a")},
'1165899875': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {let targetElem = wmjQuery(".mat-button-wrapper").filter(":directContains("+fixed.elemTxt+")").children(".mat-icon");
if (targetElem.length) {
  return targetElem;
} else {
  return wmjQuery(".mdc-button__label").filter(":directContains("+fixed.elemTxt+")").prev("mat-icon");
}},
'1175754140': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[ref=" + dollars[0] + "] [role=" + dollars[1] + "]:last")},
'1464549708': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".mat-card-content-enquiry-stage-item:eq(" + dollars[0] + ") .mat-card-content-enquiry-stage-item-underline")},
'1919737791': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("mat-icon:contains(" + dollars[0] + "):first")},
'1999519524': function(fixed, dollars, __ctx, ftHelper, wmjQuery) { const card = fixed.cardName ? wmjQuery("mat-card:has(mat-card-title:contains(" + fixed.cardName + "))") : wmjQuery("body"); return card.find(fixed._tagName + fixed._classQuery + ":contains(" + fixed.text + ")");
},
'2003046065': function(fixed, dollars, __ctx, ftHelper, wmjQuery) { const modal = fixed.modalName ? wmjQuery("mat-dialog-container:has(mat-toolbar.mat-primary:textEquals(" + fixed.modalName + "))") : wmjQuery("body"); return modal.find("mat-form-field:has(" + fixed._fieldNameQuery + ":contains(" + fixed.fieldName + "))").find(fixed._tagName + fixed._classQuery);
},
'-1895483619': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("mat-dialog-container .main-btn")},
'-1836166449': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".mat-expansion-panel-header:first [d*=" + dollars[0] + "]")},
'-733934778': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sales-exec .mat-form-field-wrapper")},
'-2078917413': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".mat-drawer-inner-container button:contains(" + dollars[0] + ")")},
'-607485663': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("iframe[src*=" + dollars[0] + "]:visible")},
'-796604035': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".mat-drawer-inner-container button")},
'-1523187647': function(fixed, dollars, __ctx, ftHelper, wmjQuery) { if (wmjQuery("div.mat-tab-label-active:not(:hasParent(mat-card)):contains(" + fixed.tabName + ")").length !== 1) { return wmjQuery(); } return wmjQuery("mat-card:has(mat-card-title:contains(" + fixed.cardName + ")) " + fixed._tagName + ":textEquals(" + fixed.elemText + ")");
},
'-1801664454': function(fixed, dollars, __ctx, ftHelper, wmjQuery) { let res; const modal = fixed.modalName ? wmjQuery("mat-dialog-container:has(mat-toolbar.mat-primary:textEquals(" + fixed.modalName + "))") : wmjQuery("body"); if (fixed._tagName === "INPUT") { res = modal.find(fixed._tagName + fixed._classQuery + "[placeHolder=" + fixed.fieldName + "]"); } else { res = modal.find(fixed._tagName + fixed._classQuery + ":textEquals(" + fixed.fieldName + ")"); } if (res.length === 0) { if (fixed._tagName === "INPUT") { res = modal.find(fixed._tagName + fixed._classQuery + "[placeHolder^=" + fixed.fieldName + "]"); } else { res = modal.find(fixed._tagName + fixed._classQuery + ":contains(" + fixed.fieldName + ")"); } } return res;
},
'-166206867': function(fixed, dollars, __ctx, ftHelper, wmjQuery) { let res = wmjQuery(fixed._tagName + ":textEquals(" + fixed.text + "):deepui_visible"); if (res.length === 0) { res = wmjQuery(fixed._tagName + ":contains(" + fixed.text + "):deepui_visible"); } return res;
},
'-1021372265': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return new wmjQuery("[class*='" + fixed._tgtClass + "']:last")},
'-2081606880': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return new wmjQuery(".mat-list-item-content:directContains(" + fixed.tgtTxt + ") .data-num")},
'-1421924800': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[role=dialog]").find("mat-toolbar").filter(":containsTextNodeIgnore("+fixed.elemTxt+")");},
'-354703810': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".btn-box").find("[class*='tooltip-trigger']").find("button.save-button-width")},
'-2100904729': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".mat-button-wrapper").filter(":containsTextNode("+fixed.elemTxt+")").children("span");},
'-1270239597': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("a.reportButton").filter("[href*='"+fixed._hrefAttr+"']").find("mat-icon").next();}
          };
        };
        a['cb-platformFTs'](obj);
      }
    })(window && window._walkmeInternals);
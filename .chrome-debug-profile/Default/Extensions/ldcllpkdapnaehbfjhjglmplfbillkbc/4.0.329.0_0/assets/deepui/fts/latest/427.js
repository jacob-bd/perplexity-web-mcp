(function(a) {
      if(a && typeof a['cb-platformFTs'] !== 'undefined') {
        var obj = {};
        obj.getData = function() {
          return {
            '58096918': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".mat-mdc-tab-header").find("[role='tab']").filter(":containsTextNode("+fixed.elmTxt+")");},
'104239046': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".mat-mdc-nav-list").find("a").filter(":containsTextNode("+ fixed.tgtElemText +")");},
'796718049': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("li").filter("[aria-controls="+fixed._lmAttr+"]");},
'963209955': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".mat-mdc-select").filter("[id="+fixed._selectId+"]").find(".mat-mdc-select-value");},
'1333910802': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".cl-side-nav-container").find(".mat-expansion-panel-header-title").filter(":containsTextNode("+fixed.elmtxt+")");},
'1585227872': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("form[name="+fixed._nameAttr+"]").find(".row").first();},
'1968736865': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".mat-expansion-panel-header").find(".menu-text").filter(":containsTextNode("+fixed.elmTxt+")");},
'2126668881': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("label").filter(":containsTextNode("+fixed.labelTxt+")").closest(".ers-field").find(".form-control");},
'-1359315385': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("ers-toolbar").find("span").filter(":containsTextNode("+fixed.tgtText+")");},
'-1055574163': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".headerElement").find("label").find("span").filter(":containsTextNode("+fixed.elemTxt+")");},
'-244841744': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const targetOptions = wmjQuery("label").filter(":containsTextNode("+fixed.labelTxt+")").closest(".ers-field").find(".form-control");
return targetOptions.length > 1 ? targetOptions.filter(":mt_visible") : targetOptions;},
'-500984577': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".mat-mdc-nav-list").find(".menu-text").filter(":containsTextNode("+fixed.elmTxt+")");},
'-1285968791': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".mat-mdc-tab-header").find(".mdc-tab__text-label").find("span").filter(":directContains("+fixed.elmTxt+")");},
'-739711737': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".cl-side-nav-container").find(".mat-expansion-panel-header-title").filter(":containsTextNode("+fixed.elmTxt+")").find(".fa-angle-down");},
'-759667601': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".footer").find("button").filter(":containsTextNode("+fixed.elmtxt+")");},
'-1433502594': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("label").filter(":containsTextNode("+fixed.labeltxt+")").closest("div");},
'-1563641820': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".navigation-btn").filter(":containsTextNode("+fixed.elmtxt+")");},
'-1985000105': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("label").filter(":containsTextNode("+fixed.labeltxt+")").closest("mat-form-field").closest("div");},
'-1154280493': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("label").filter(":containsTextNode("+fixed.labelTxt+")").closest(".mat-mdc-form-field").find(".mat-mdc-select-value");},
'-2082922192': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".drop-menu-text").find("span").filter(":containsTextNode("+fixed.elemText+")");},
'-2142392857': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".mat-mdc-nav-list").find(".subLabelWrapper").filter(":containsTextNode("+fixed.elmTxt+")");}
          };
        };
        a['cb-platformFTs'](obj);
      }
    })(window && window._walkmeInternals);
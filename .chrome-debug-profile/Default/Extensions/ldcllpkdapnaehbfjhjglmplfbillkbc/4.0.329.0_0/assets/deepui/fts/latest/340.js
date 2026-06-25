(function(a) {
      if(a && typeof a['cb-platformFTs'] !== 'undefined') {
        var obj = {};
        obj.getData = function() {
          return {
            '108952339': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("section").filter("[data-testid='"+fixed._dataAttr+"']").parent("div");},
'493986451': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".form-field-label-text").filter(":containsTextNode("+fixed.LabelText+")").closest("div").parent("div").next("div[data-testid='field-inner-cell']").find(".notranslate");},
'568915702': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("input").filter("[name="+fixed._elemAttr+"]");},
'1089638356': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("input").filter("[data-testid="+fixed._elemAttr+"]");},
'1257606002': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const expandedTab = wmjQuery("[id*=secondary-nav]").find("a").filter("[href_production*="+fixed._hrefProd+"]").find(".secondary-nav-tab-label").filter(":mt_visible");
return expandedTab.length > 0 ? expandedTab : wmjQuery("[id*=secondary-nav]").find("div").filter("[data-href*='projects']").find("span[class$='ListViewItem-content']");},
'1604938090': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const targetOptions = wmjQuery("[id*=secondary-nav]").find("[data-testid*='"+fixed._outerDataAttr+"']").find(".secondary-nav-tab-label, a").filter(":mt_visible");
return targetOptions.length > 1 ? targetOptions.filter(".secondary-nav-tab-label") : targetOptions;},
'1636781064': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".secondary-nav-tab-label,span[class$='-ListViewItem-content']").filter(":containsTextNode("+fixed.btnText+")");},
'1759623396': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const expandedTab = wmjQuery("[id*=secondary-nav]").find("a").filter("[href_production*="+fixed._hrefProd+"]").find(".secondary-nav-tab-label").filter(":mt_visible");
return expandedTab.length > 0 ? expandedTab : wmjQuery("[id*=secondary-nav]").find("a").filter("[href_production*="+fixed._hrefProd+"]");},
'-464994349': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const targetOptions = wmjQuery("label").filter(":containsTextNode("+fixed.lmCardArticleTxt+")").parent(); 
return targetOptions.length > 1 ? targetOptions.filter(":mt_visible") : targetOptions;},
'-2099258041': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[role='row']").filter("[data-href="+fixed._data_href+"]").find("[class*='ListViewItem-grid']");}
          };
        };
        a['cb-platformFTs'](obj);
      }
    })(window && window._walkmeInternals);
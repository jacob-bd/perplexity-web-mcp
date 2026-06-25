(function(a) {
      if(a && typeof a['cb-platformFTs'] !== 'undefined') {
        var obj = {};
        obj.getData = function() {
          return {
            '66631472': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("span").filter(":containsTextNode("+fixed.headerText+")").closest(":header").closest(".visual-title-container");},
'112269448': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".a-cardui").filter("[id="+fixed._parentID+"]").find("a").filter("[href$="+fixed._hrefAttr+"]");},
'232535290': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("button").filter("[data-automation-id="+fixed._elemAttr+"]");},
'249541154': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(":header").filter("[data-automation-context='"+fixed._headerText+"']").closest(".grid-layout-block-content").parent();},
'521125273': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".vega-toolbar-section-left ").find("button").filter("[data-automation-id="+fixed._tgtLmAttr+"]");},
'1000293397': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".title").filter("[data-automation-id="+fixed._lmAttr+"]");},
'1791358195': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".nav-bar-body").find("a").filter("[data-automation-id="+fixed._lmAttr+"]");},
'-495748567': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".title").filter(":containsTextNode("+fixed.lmText+")");},
'-2133264176': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(":header").filter("[data-automation-context='"+fixed._headerText+"']").closest(".grid-layout-block-content").parent();},
'-1227050033': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".VegaAlertMessage").filter(":containsTextNode("+fixed.lmText+")");},
'-1181041787': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".VegaAlert").find(".VegaAlertMessage");}
          };
        };
        a['cb-platformFTs'](obj);
      }
    })(window && window._walkmeInternals);